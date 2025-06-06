const { Sociodemographic, Almaverso } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const Permissions = express.Router();
const cors = require('cors');
const { default: Queries } = require('../Sql/Queries');
const { authenticateToken } = require('../Auth/AuthMiddleware');

Permissions.use(cors());
Permissions.use(express.json());
Permissions.use(express.urlencoded({ extended: false }));

const poolAlmaverso = mysql.createPool(Almaverso);
const poolSociodemographic = mysql.createPool(Sociodemographic);
//!ENDPOINT obtine la lista de los usuarios para darles permisos
Permissions.get('/API/GET-LIST-USERS/PERMISSIONS/', authenticateToken, (req, res) => {
    poolSociodemographic.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT Documento, Nombres, Apellidos, Usuario_Red, Servicio, Cargo, Cliente_Area FROM T_Socio WHERE Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio) AND Estado_Empleado = 'Activo'`
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    return res.status(500).send('Error al obtener los datos');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                }
            });
        }
        catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
});




//!ENDPOINT obtine la lista de los cargos para otorgrales los permisos 
Permissions.get('/API/GET-LIST-CARGO/PERMISSIONS/', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            connection.query(Queries.getListCargos, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(err, 'error interno del servidor');
                } else {
                    return res.status(200).send(result);
                }
            });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
});

//!ENDPOINT obtine la lista de los clientes para otorgrales los permisos 
Permissions.get('/API/GET-LIST-CLIENT/PERMISSIONS/', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const Sql = `SELECT * FROM T_Client_Permissions`
            connection.query(Sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(err, 'error interno del servidor');
                } else {
                    return res.status(200).send(result);
                }
            });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
});

//!ENDPOINT ruta para saber a que modulos tiene permiso el usuario poor medio del cargo
Permissions.get('/API/GET-USER-PERMISSIONS/:username', authenticateToken, (req, res) => {
    poolSociodemographic.getConnection((err, connectionSocio) => {
        if (err) {
            res.status(404).send('Error interno del servidor');
        }
        try {
            const { username } = req.params;
            const sql = `SELECT Cargo FROM T_Socio WHERE Usuario_Red = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Usuario_Red = ?)`;
            connectionSocio.query(sql, [username, username], (error, result) => {
                connectionSocio.release();
                if (error) {
                    connectionSocio.release();
                    return res.status(500).send('Error al obtener los datos');
                } else if (result.length > 0) {
                    const userCargo = result[0].Cargo;
                    poolAlmaverso.getConnection((error, connectionAlmaverso) => {
                        if (error) {
                            return res.status(404).send('Error interno del servidor');
                        }
                        try {
                            // Consulta SQL con subconsultas para obtener los permisos del usuario
                            const sql2 = `SELECT DISTINCT jp.Id_Modulo, jp.Nombre_Cargo_Normalizado FROM T_Jobs_Permissions jp WHERE jp.Nombre_Cargo_Normalizado IN (SELECT jt.Cargo_Normalizado FROM T_Jobs_Traductor jt WHERE jt.Cargo_Oficial = ?)`
                            connectionAlmaverso.query(sql2, [userCargo], (errorAlmaverso, resultAlmaverso) => {
                                connectionAlmaverso.release();
                                if (errorAlmaverso) {
                                    return res.status(500).send('Error al obtener los datos');
                                } else if (resultAlmaverso.length > 0) {
                                    const userPermissions = resultAlmaverso.map(permission => ({
                                        Id_Modulo: parseFloat(permission.Id_Modulo),
                                    }));
                                    return res.status(200).send(userPermissions);
                                } else {
                                    return res.status(400).send({ redirect: '/' });
                                }
                            });

                        } catch (error) {
                            return res.status(500).send('Error interno del servidor');
                        }
                    });
                } else {
                    return res.status(404).send('No se encontró el usuario');
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
    // Consulta SQL para obtener el Cargo del usuario
});

//!ENDPOINT ruta para pasar el Nombre_Cargo_Normalizado para saber que permisos tiene el cargo 
Permissions.get('/API/UPDATE-USER-PERMISSIONS/:Nombre_Cargo_Normalizado', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor')
        }
        try {
            const { Nombre_Cargo_Normalizado } = req.params;
            connection.query(Queries.useCargoPermission, [Nombre_Cargo_Normalizado], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error al obtener los permisos');
                } else if (result.length > 0) {
                    const cargoPermissions = result.map(permission => ({ Id_Modulo: parseFloat(permission.Id_Modulo) }));
                    return res.status(200).send(cargoPermissions);
                } else {
                    return res.status(404).send('No se encontraron permisos para el cargo');
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
});

//!ENPOINT ruta para otorgar permisos a los cargos
Permissions.put('/API/INSERT-PERMISSIONS/PUT/', authenticateToken, (req, res) => {
    const action = req.body.action;
    const Nombre_Cargo_Normalizado = req.body.Nombre_Cargo_Normalizado;
    const Id_Modulos = req.body.Id_Modulo;
    const connection = mysql.createConnection(Almaverso);


    const getNormalizedId = () => {
        return new Promise((resolve, reject) => {
            const getListNameCargo = `SELECT Id_Normalizado FROM T_Normal_Jobs WHERE Nombre_Cargo_Normalizado = ?`
            connection.query(getListNameCargo, [Nombre_Cargo_Normalizado], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        const Id_Normalizado = results[0].Id_Normalizado;
                        resolve(Id_Normalizado);
                    } else {
                        reject(new Error('No se encontró el Nombre_Cargo_Normalizado'));
                    }
                }
            });
        });
    };

    const insertPermissions = (Id_Normalizado) => {
        return new Promise((resolve, reject) => {
            const promises = Id_Modulos.map((Id_Modulo) => {
                return new Promise((resolve, reject) => {
                    const insertModulesPermissions = `INSERT INTO T_Jobs_Permissions (Id_Normalizado, Nombre_Cargo_Normalizado, Id_Modulo) VALUES (?, ?, ?)`;
                    connection.query(insertModulesPermissions, [Id_Normalizado, Nombre_Cargo_Normalizado, Id_Modulo], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(() => {
                    resolve('Se han actualizado correctamente los permisos');
                })
                .catch((error) => {

                    reject(error);
                });
        });
    };

    const deletePermissions = (Id_Normalizado) => {

        return new Promise((resolve, reject) => {
            const promises = Id_Modulos.map((Id_Modulo) => {
                return new Promise((resolve, reject) => {
                    const deleteModulePermissions = `DELETE FROM T_Jobs_Permissions WHERE Id_Normalizado = ? AND Nombre_Cargo_Normalizado = ? AND Id_Modulo = ?`;
                    connection.query(deleteModulePermissions, [Id_Normalizado, Nombre_Cargo_Normalizado, Id_Modulo], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(() => {
                    resolve('Se han actualizado correctamente los permisos');
                })
                .catch((error) => {
                    reject(error);

                });
        });
    };


    const insertAndDelete = (action, Id_Normalizado, Id_Modulos) => {
        try {
            for (const Id_Modulo of Id_Modulos) {
                if (action === 'insertAndDelete') {
                    connection.query(Queries.insertModulesPermissions, [Id_Normalizado, Nombre_Cargo_Normalizado, Id_Modulo]);
                    connection.query(Queries.deleteModulePermissions, [Id_Normalizado, Nombre_Cargo_Normalizado, Id_Modulo]);
                }
            }
            return 'Se han actualizado correctamente los permisos';
        } catch (error) {

            throw new Error('Error al actualizar los permisos');
        }
    };





    getNormalizedId()
        .then((Id_Normalizado) => {
            if (action === 'insert') {
                return insertPermissions(Id_Normalizado);
            } else if (action === 'delete') {
                return deletePermissions(Id_Normalizado);
            } else if (action === 'insertAndDelete') {
                return insertAndDelete(Id_Normalizado);
            } else {
                throw new Error('Acción no válida');
            }
        })
        .then((message) => {
            res.status(200).send(message);
        })
        .catch((error) => {

            res.status(500).send('Error interno del servidor');
        })
        .finally(() => {
            connection.end();
        });
});



//!ENDPOINT ruta para pasar el usuario_Red para saber que permisos tiene el Usuario_Red SOCIO / EXPORTE DE TURNOS  ==========>>>>>>>  1
Permissions.get('/API/GET-USER-PERMISSIONS-CLIENT/:Usuario_Red', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor')
        }
        try {
            const { Usuario_Red } = req.params;
            const sql = `SELECT * FROM T_Master_Permissions WHERE Usuario_Red = ?`;
            connection.query(sql, [Usuario_Red], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error al obtener los permisos');
                } else if (result.length > 0) {
                    res.status(200).send(result);
                } else {
                    return res.status(204).send('No se encontraron permisos para el usuario seleccionado');
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
});

//!ENDPOINT ruta para pasar el usuario_Red para saber que permisos tiene el Usuario_Red NOVEDADES ==========>>>>>>>  2
Permissions.get('/API/GET-USER-PERMISSIONS-CLIENT/NOVEDADES/:Usuario_Red', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor')
        }
        try {
            const { Usuario_Red } = req.params;
            const sql = `SELECT * FROM T_Master_Noveltie WHERE Usuario_Red = ?`;
            connection.query(sql, [Usuario_Red], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error al obtener los permisos');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(204).send('No se encontraron permisos para el usuario seleccionado');
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
});
//!ENDPOINT ruta para pasar el usuario_Red para saber que permisos tiene el Usuario_Red NOMINA ==========>>>>>>>  3
Permissions.get('/API/GET-USER-PERMISSIONS-CLIENT/NOMINA/:Usuario_Red', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor')
        }
        try {
            const { Usuario_Red } = req.params;
            const sql = `SELECT * FROM T_Master_Nomina WHERE Usuario_Red = ?`;
            connection.query(sql, [Usuario_Red], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error al obtener los permisos');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(204).send('No se encontraron permisos para el usuario seleccionado');
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
});





//! ENDPOINT ruta para insertar y eliminar permisos para el usuario_Red PARA LOS CLIENTES 
Permissions.put('/API/INSERT-PERMISSIONS-CLIENT/PUT/', authenticateToken, (req, res) => {
    const action = req.body.action;
    const Cliente_Permiso = req.body.Cliente_Permiso; // Puede ser un solo valor o una matriz de valores
    const Usuario_Red = req.body.Usuario_Red;
    const connection = mysql.createConnection(Almaverso);

    // Función para obtener el ID normalizado de un Cliente_Permiso
    const getNormalizedId = (Cliente_Permiso) => {
        return new Promise((resolve, reject) => {
            const QuerieId = `SELECT Id_Cliente_Permisos FROM T_Client_Permissions WHERE Nombre_Cliente_Permisos = ?`;
            connection.query(QuerieId, [Cliente_Permiso], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        const Id_Cliente_Permisos = results[0].Id_Cliente_Permisos;;
                        resolve(Id_Cliente_Permisos);
                    } else {
                        reject(new Error('No se encontró el Cliente_Permiso'));
                    }
                }
            });
        });
    }

    // Función para insertar un permiso
    const insertPermission = (Id_Cliente_Permisos, Cliente_Permiso) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO T_Master_Permissions (Id_Cliente_Permiso, Cliente_Permiso, Usuario_Red) VALUES(?, ?, ?)`;
            connection.query(sql, [Id_Cliente_Permisos, Cliente_Permiso, Usuario_Red], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else if (result.length === 0) {
                    resolve('No se pudo insertar el registro');
                } else {
                    resolve('Permiso insertado correctamente');
                }
            });
        });
    };

    // Función para eliminar un permiso
    const deletePermission = (Id_Cliente_Permisos) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM T_Master_Permissions WHERE Id_Cliente_Permiso = ? AND Usuario_Red = ?`;
            connection.query(sql, [Id_Cliente_Permisos, Usuario_Red], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else if (result.length === 0) {
                    resolve('Error al eliminar el perimiso correctamente');
                } else {
                    resolve('Permiso eliminado correctamente');
                }
            });
        });
    };

    if (Array.isArray(Cliente_Permiso)) {
        // Si Cliente_Permiso es un array, ejecuta el código para manejar múltiples permisos
        const promises = Cliente_Permiso.map(async (permiso) => {
            const Id_Cliente_Permisos = await getNormalizedId(permiso);
            if (action === 'insert') {
                return insertPermission(Id_Cliente_Permisos, permiso);
            } else if (action === 'delete') {
                return deletePermission(Id_Cliente_Permisos);
            } else {
                return Promise.reject('Acción no válida');
            }
        });

        Promise.all(promises)
            .then((results) => {
                res.status(200).send(results); // Puedes devolver un array con los mensajes
            })
            .catch((error) => {
                res.status(500).send('Error interno del servidor');
            })
            .finally(() => {
                connection.end();
            });
    } else {
        // Si Cliente_Permiso no es un array, ejecuta el código para un solo permiso
        getNormalizedId(Cliente_Permiso)
            .then((Id_Cliente_Permisos) => {
                if (action === 'insert') {
                    insertPermission(Id_Cliente_Permisos, Cliente_Permiso)
                        .then((message) => {
                            res.status(200).send(message);
                        })
                        .catch((error) => {
                            res.status(500).send('Error interno del servidor');
                        });
                } else if (action === 'delete') {
                    deletePermission(Id_Cliente_Permisos)
                        .then((message) => {
                            res.status(200).send(message);
                        })
                        .catch((error) => {
                            res.status(500).send('Error interno del servidor');
                        });
                } else {
                    res.status(400).send('Acción no válida');
                }
            })
            .catch((error) => {
                res.status(500).send('Error interno del servidor');
            })
            .finally(() => {
                connection.end();
            });
    }
});

//!OBTIENE LA LISTA DE CARGOS 
Permissions.get('/API/GET/LIST-CARGOS/FOR/CHANGES', authenticateToken, (req, res) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            const Cargo = req.params.Cargo;
            const Documento = req.params.Documento;
            const sql = `SELECT * FROM T_Shifts_Jobs`;
            connection.query(sql, [Cargo, Documento], (error, result) => {
                if (error) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(404).send('No se puedo obtener la lista de cargos');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

//!ENDPOINT PARA CAMBIAR EL CARGO A LA PERSONA 
Permissions.put('/API/UPDATE/POSITION/USER/:Cargo/:Documento', authenticateToken, (req, res) => {
    poolSociodemographic.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const Cargo = req.params.Cargo;
            const Documento = req.params.Documento;
            const sql = `UPDATE T_Socio SET Cargo = '${Cargo}' WHERE Documento = '${Documento}' AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM (SELECT Fecha_Corte FROM T_Socio WHERE Documento = '${Documento}') AS Fecha_Corte_Subquery)`;
            connection.query(sql, (error, result) => {
                if (error) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.affectedRows > 0) {
                    return res.status(200).send('Cargo Actualizado correctamente!');
                } else {
                    return res.status(404).send('No se pudo actualizar el cargo');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});








//! ENDPOINT ruta para insertar y eliminar permisos para el usuario_Red PARA LOS CLIENTES DE NOVEDADES
Permissions.put('/API/INSERT-PERMISSIONS-CLIENT/PUT/NOVEDADES/', authenticateToken, (req, res) => {
    const action = req.body.action;
    const Cliente_Permiso = req.body.Cliente_Permiso; // Puede ser un solo valor o una matriz de valores
    const Usuario_Red = req.body.Usuario_Red;
    const connection = mysql.createConnection(Almaverso);

    // Función para obtener el ID normalizado de un Cliente_Permiso
    const getNormalizedId = (Cliente_Permiso) => {
        return new Promise((resolve, reject) => {
            const QuerieId = `SELECT Id_Cliente_Permisos FROM T_Client_Permissions WHERE Nombre_Cliente_Permisos = ?`;
            connection.query(QuerieId, [Cliente_Permiso], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        const Id_Cliente_Permisos = results[0].Id_Cliente_Permisos;;
                        resolve(Id_Cliente_Permisos);
                    } else {
                        reject(new Error('No se encontró el Cliente_Permiso'));
                    }
                }
            });
        });
    }

    // Función para insertar un permiso
    const insertPermission = (Id_Cliente_Permisos, Cliente_Permiso) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO T_Master_Noveltie (Id_Cliente_Permiso, Cliente_Permiso, Usuario_Red) VALUES(?, ?, ?)`;
            connection.query(sql, [Id_Cliente_Permisos, Cliente_Permiso, Usuario_Red], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.length === 0) {
                    resolve('No se pudo insertar el registro');
                } else {
                    resolve('Permiso insertado correctamente');
                }
            });
        });
    };

    // Función para eliminar un permiso
    const deletePermission = (Id_Cliente_Permisos) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM T_Master_Noveltie WHERE Id_Cliente_Permiso = ? AND Usuario_Red = ?`;
            connection.query(sql, [Id_Cliente_Permisos, Usuario_Red], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else if (result.length === 0) {
                    resolve('Error al eliminar el perimiso correctamente');
                } else {
                    resolve('Permiso eliminado correctamente');
                }
            });
        });
    };

    if (Array.isArray(Cliente_Permiso)) {
        // Si Cliente_Permiso es un array, ejecuta el código para manejar múltiples permisos
        const promises = Cliente_Permiso.map(async (permiso) => {
            const Id_Cliente_Permisos = await getNormalizedId(permiso);
            if (action === 'insert') {
                return insertPermission(Id_Cliente_Permisos, permiso);
            } else if (action === 'delete') {
                return deletePermission(Id_Cliente_Permisos);
            } else {
                return Promise.reject('Acción no válida');
            }
        });

        Promise.all(promises)
            .then((results) => {
                res.status(200).send(results); // Puedes devolver un array con los mensajes
            })
            .catch((error) => {
                res.status(500).send('Error interno del servidor');
            })
            .finally(() => {
                connection.end();
            });
    } else {
        // Si Cliente_Permiso no es un array, ejecuta el código para un solo permiso
        getNormalizedId(Cliente_Permiso)
            .then((Id_Cliente_Permisos) => {
                if (action === 'insert') {
                    insertPermission(Id_Cliente_Permisos, Cliente_Permiso)
                        .then((message) => {
                            res.status(200).send(message);
                        })
                        .catch((error) => {
                            res.status(500).send('Error interno del servidor');
                        });
                } else if (action === 'delete') {
                    deletePermission(Id_Cliente_Permisos)
                        .then((message) => {
                            res.status(200).send(message);
                        })
                        .catch((error) => {
                            res.status(500).send('Error interno del servidor');
                        });
                } else {
                    res.status(400).send('Acción no válida');
                }
            })
            .catch((error) => {
                res.status(500).send('Error interno del servidor');
            })
            .finally(() => {
                connection.end();
            });
    }
});
//! ENDPOINT ruta para insertar y eliminar permisos para el usuario_Red PARA LOS CLIENTES DE NOMINA
Permissions.put('/API/INSERT-PERMISSIONS-CLIENT/PUT/NOMINA/', authenticateToken, (req, res) => {
    const action = req.body.action;
    const Cliente_Permiso = req.body.Cliente_Permiso; // Puede ser un solo valor o una matriz de valores
    const Usuario_Red = req.body.Usuario_Red;
    const connection = mysql.createConnection(Almaverso);

    // Función para obtener el ID normalizado de un Cliente_Permiso
    const getNormalizedId = (Cliente_Permiso) => {
        return new Promise((resolve, reject) => {
            const QuerieId = `SELECT Id_Cliente_Permisos FROM T_Client_Permissions WHERE Nombre_Cliente_Permisos = ?`;
            connection.query(QuerieId, [Cliente_Permiso], (err, results) => {
                if (err) {
                    console.log(500);
                    reject(err);
                } else {
                    if (results.length > 0) {
                        const Id_Cliente_Permisos = results[0].Id_Cliente_Permisos;;
                        console.log(Id_Cliente_Permisos);
                        resolve(Id_Cliente_Permisos);
                    } else {
                        console.log('No se inderto el permiso');
                        reject(new Error('No se encontró el Cliente_Permiso'));
                    }
                }
            });
        });
    }

    // Función para insertar un permiso
    const insertPermission = (Id_Cliente_Permisos, Cliente_Permiso) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO T_Master_Nomina (Id_Cliente_Permiso, Cliente_Permiso, Usuario_Red) VALUES(?, ?, ?)`;
            connection.query(sql, [Id_Cliente_Permisos, Cliente_Permiso, Usuario_Red], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.length === 0) {
                    resolve('No se pudo insertar el registro');
                } else {
                    resolve('Permiso insertado correctamente');
                }
            });
        });
    };

    // Función para eliminar un permiso
    const deletePermission = (Id_Cliente_Permisos) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM T_Master_Nomina WHERE Id_Cliente_Permiso = ? AND Usuario_Red = ?`;
            connection.query(sql, [Id_Cliente_Permisos, Usuario_Red], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else if (result.length === 0) {
                    resolve('Error al eliminar el perimiso correctamente');
                } else {
                    resolve('Permiso eliminado correctamente');
                }
            });
        });
    };

    if (Array.isArray(Cliente_Permiso)) {
        // Si Cliente_Permiso es un array, ejecuta el código para manejar múltiples permisos
        const promises = Cliente_Permiso.map(async (permiso) => {
            const Id_Cliente_Permisos = await getNormalizedId(permiso);
            if (action === 'insert') {
                return insertPermission(Id_Cliente_Permisos, permiso);
            } else if (action === 'delete') {
                return deletePermission(Id_Cliente_Permisos);
            } else {
                return Promise.reject('Acción no válida');
            }
        });

        Promise.all(promises)
            .then((results) => {
                res.status(200).send(results); // Puedes devolver un array con los mensajes
            })
            .catch((error) => {
                res.status(500).send('Error interno del servidor');
            })
            .finally(() => {
                connection.end();
            });
    } else {
        // Si Cliente_Permiso no es un array, ejecuta el código para un solo permiso
        getNormalizedId(Cliente_Permiso)
            .then((Id_Cliente_Permisos) => {
                if (action === 'insert') {
                    insertPermission(Id_Cliente_Permisos, Cliente_Permiso)
                        .then((message) => {
                            res.status(200).send(message);
                        })
                        .catch((error) => {
                            res.status(500).send('Error interno del servidor');
                        });
                } else if (action === 'delete') {
                    deletePermission(Id_Cliente_Permisos)
                        .then((message) => {
                            res.status(200).send(message);
                        })
                        .catch((error) => {
                            res.status(500).send('Error interno del servidor');
                        });
                } else {
                    res.status(400).send('Acción no válida');
                }
            })
            .catch((error) => {
                res.status(500).send('Error interno del servidor');
            })
            .finally(() => {
                connection.end();
            });
    }
});



module.exports = Permissions;
