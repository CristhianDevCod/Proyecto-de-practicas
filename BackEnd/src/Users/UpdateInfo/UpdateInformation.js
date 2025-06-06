import { Sociodemographic } from '../../BDconfig'

const mysql = require('mysql2');
const express = require('express');
const UpdateInfo = express.Router();
const cors = require('cors');
const { authenticateToken } = require('../../Auth/AuthMiddleware');
UpdateInfo.use(cors());
UpdateInfo.use(express.json());
UpdateInfo.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Sociodemographic);


UpdateInfo.get('/API/get/Blood_Factor/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Blood_Factor`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });


});

UpdateInfo.get('/API/get/Blood_Group/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Blood_Group`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Ethnic_Group/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Ethnic_Group`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Gender/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Gender`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }

            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Language/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Language`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Language_Level/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Language_Level`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});


UpdateInfo.get('/API/get/Marital_Status/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Marital_Status`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});


UpdateInfo.get('/API/get/Semester_Study/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Semester_Study`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }

            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Status_Study/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Status_Study`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Type_Document/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Tipe_Id`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});


UpdateInfo.get('/API/get/Complementary_Study/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Type_Complementary_Study`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Postgraduate_Study/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Type_Postgraduate_Study`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Undergraduate_Study/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Type_Undergraduate_Study`;
            connection.query(sql, (err, result) => {
                connection.release();

                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Type_Vehicle/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Type_Vehicle`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Vehicle/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Vehicle`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
})

UpdateInfo.get('/API/get/Country', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Country`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send('Error: ' + err);
                } else {
                    if (result.length > 0) {
                        return res.send(result);
                    }
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/Country_State/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Country_State WHERE id_pais = '43' ORDER BY estado ASC`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send('Error: ' + err);
                } else {
                    if (result.length > 0) {
                        return res.send(result);
                    }
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});



UpdateInfo.get('/API/get/Pc_Home/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Home_Computer`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else if (result.length > 0) {
                    res.status(200).send(result);
                };
            })
        } catch (error) {
            res.status(500).send(error, 'Error interno en el server')
        }
    });
});

UpdateInfo.get('/API/get/Internet/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Internet`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else if (result.length > 0) {
                    res.status(200).send(result);
                }
            })
        } catch (error) {
            res.status(500).send(err, 'Error interno del server')
        }
    });
});

UpdateInfo.get('/API/get/Internet_Speed/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Internet_Speed`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send(err)
                } else if (result.length > 0) {
                    res.status(200).send(result);
                }
            });
        } catch (error) {
            res.status(500).send(err, 'Error interno del server')
        }
    });
});

UpdateInfo.get('/API/get/SO/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_SO`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send(err)
                } else if (result.length > 0) {
                    res.status(200).send(result);
                }
            })
        } catch (error) {
            res.status(500).send(err, 'Error interno del servidor');
        }
    });
});

UpdateInfo.get('/API/get/RAM/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_RAM`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else if (result.length > 0) {
                    res.status(200).send(result);
                }
            })
        } catch (error) {
            res.status(500).send(error, 'Error interno sel server');
        }
    });
});



UpdateInfo.get('/API/get/Country_State/:id_pais', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const id_pais = req.params.id_pais;
            const sql = `SELECT * FROM T_Country_State WHERE id_pais = ? ORDER BY estado ASC`;
            connection.query(sql, [id_pais], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send('Error: ' + err);
                } else {
                    if (result.length > 0) {
                        return res.send(result);
                    };
                };
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        };
    });
});


UpdateInfo.get('/API/get/Type_Id/', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Tipe_Id`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(404).send(err, 'Error');
                } else {
                    if (result.length > 0) {
                        return res.send(result)
                    }
                }
            })
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });

})

//VERIFICAMOS SI EL USUARIO A ACTUALIZADO SUS DATOS EN EL MES ACTUAL 
function esMesActual(fecha) {
    const fechaActual = new Date();
    const fechaComparar = new Date(fecha);
    const fechaFormateada = new Date(fechaComparar).toISOString().split('T')[0];
    return (
        fechaActual.getFullYear() === fechaComparar.getFullYear() &&
        fechaActual.getMonth() === fechaComparar.getMonth()
    );
}


UpdateInfo.get('/API/UPDATE/OR/NOT/UPDATE/DATES/:userId', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            const userId = req.params.userId;
            const sql = `SELECT Fecha_Actualizacion FROM T_Socio WHERE Usuario_Red = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Usuario_Red = ?)`;

            connection.query(sql, [userId, userId], (error, result) => {
                connection.release();
                if (error) {
                    res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    res.status(404).send('Usuario no encontrado');
                } else {
                    const fechaActualizacion = result[0].Fecha_Actualizacion;
                    // const fechaFormateada = new Date(fechaActualizacion).toISOString().split('T')[0];


                    // Verificar si la fecha de actualización no coincide con el mes actual
                    const actualizacionMesActual = esMesActual(fechaActualizacion); // Define la función esMesActual
                    if (!actualizacionMesActual) {
                        return res.status(200).send({ Actualizo: false });
                    } else {
                        return res.status(200).send({ Actualizo: true });
                    }
                }
            });
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    });
});


UpdateInfo.put('/API/UPDATE/ALL/DATES-ACTUALIZACION-DATE/:userId', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const value = new Date();
            const Fecha_Actualizacion = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const userId = req.params.userId;

            const subquery = `SELECT MAXFecha FROM (SELECT MAX(Fecha_Corte) AS MAXFecha FROM T_Socio WHERE Usuario_Red = '${userId}') AS subquery`;

            const sql = `UPDATE T_Socio SET Fecha_Actualizacion = '${Fecha_Actualizacion}' WHERE Fecha_Corte = (${subquery}) AND Usuario_Red = '${userId}'`;

            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.affectedRows === 0) {
                    return res.status(404).send('No se pudo actualizar la fecha');
                } else {
                    return res.status(200).send('Fecha actualizada correctamente');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});



UpdateInfo.put('/API/UPDATE/ALL/DATES/:Usuario_Red', authenticateToken, (req, res) => {

    const Usuario_Red = req.params.Usuario_Red;
    const Genero = req.body.Genero;
    const Tipo_Documento = req.body.Tipo_Documento;
    const Estado_Civil = req.body.Estado_Civil;
    const fechaCompleta = req.body.Fecha_Nacimiento; // '2002-10-04T05:00:00.000Z'
    const fechaPartes = fechaCompleta.split('T');
    const Fecha_Nacimiento = fechaPartes[0]; // '2002-10-04'
    const Pais_Nacimiento = req.body.Pais_Nacimiento;
    const Departamento_Nacimiento = req.body.Departamento_Nacimiento;
    const Ciudad_Nacimiento = req.body.Ciudad_Nacimiento;
    const Telefono_Fijo_Principal = req.body.Telefono_Fijo_Principal;
    const Telefono_Fijo_Secundario = req.body.Telefono_Fijo_Secundario;
    const Telefono_Celular_Principal = req.body.Telefono_Celular_Principal;
    const Telefono_Celular_Secundario = req.body.Telefono_Celular_Secundario;
    const Departamento_Residencia = req.body.Departamento_Residencia;
    const Ciudad_Residencia = req.body.Ciudad_Residencia;
    const Zona_Residencia = req.body.Zona_Residencia;
    const Barrio_Residencia = req.body.Barrio_Residencia;
    const Direccion_Residencia = req.body.Direccion_Residencia;
    const Grupo_Sanguineo = req.body.Grupo_Sanguineo;
    const Factor_Sanguineo = req.body.Factor_Sanguineo;
    const Contacto_Emergencia = req.body.Contacto_Emergencia;
    const Telefono_Contacto_Emergencia = req.body.Telefono_Contacto_Emergencia;
    const Vehiculo_Propio = req.body.Vehiculo_Propio;
    const Tipo_Vehiculo = req.body.Tipo_Vehiculo;
    const Computador_En_Casa = req.body.Computador_En_Casa;
    const Internet_En_Casa = req.body.Internet_En_Casa;
    const Velocidad_Internet = req.body.Velocidad_Internet;
    const Sistema_Operativo_Computador = req.body.Sistema_Operativo_Computador;
    const Memoria_RAM = req.body.Memoria_RAM;
    const Numero_Personas_A_Cargo = req.body.Numero_Personas_A_Cargo;
    const Numero_Hijos = req.body.Numero_Hijos;
    const Etnia = req.body.Etnia;
    const Idioma_Nativo = req.body.Idioma_Nativo;
    const Idioma_Secundario = req.body.Idioma_Secundario;
    const Nivel_Idioma_Secundario = req.body.Nivel_Idioma_Secundario;
    const Estudio_Pregrado = req.body.Estudio_Pregrado;
    const Tipo_Estudio_Pregrado = req.body.Tipo_Estudio_Pregrado;
    const Semestre_Pregrado = req.body.Semestre_Pregrado;
    const Estado_Estudio_Pregrado = req.body.Estado_Estudio_Pregrado;
    const Estudio_Pregrado_Secundario = req.body.Estudio_Pregrado_Secundario;
    const Tipo_Estudio_Pregrado_Secundario = req.body.Tipo_Estudio_Pregrado_Secundario;
    const Semestre_Pregrado_Secundario = req.body.Semestre_Pregrado_Secundario;
    const Estado_Estudio_Pregrado_Secundario = req.body.Estado_Estudio_Pregrado_Secundario;
    const Estudio_Pregrado_Terciario = req.body.Estudio_Pregrado_Terciario;
    const Tipo_Estudio_Pregrado_Terciario = req.body.Tipo_Estudio_Pregrado_Terciario;
    const Semestre_Pregrado_Terciario = req.body.Semestre_Pregrado_Terciario;
    const Estado_Estudio_Pregrado_Terciario = req.body.Estado_Estudio_Pregrado_Terciario;
    const Estudio_Posgrado = req.body.Estudio_Posgrado;
    const Tipo_Estudio_Posgrado = req.body.Tipo_Estudio_Posgrado;
    const Semestre_Posgrado = req.body.Semestre_Posgrado;
    const Estado_Estudio_Posgrado = req.body.Estado_Estudio_Posgrado;
    const Estudio_Posgrado_Secundario = req.body.Estudio_Posgrado_Secundario;
    const Tipo_Estudio_Posgrado_Secundario = req.body.Tipo_Estudio_Posgrado_Secundario;
    const Semestre_Posgrado_Secundario = req.body.Semestre_Posgrado_Secundario;
    const Estado_Estudio_Posgrado_Secundario = req.body.Estado_Estudio_Posgrado_Secundario;
    const Estudio_Posgrado_Terciario = req.body.Estudio_Posgrado_Terciario;
    const Tipo_Estudio_Posgrado_Terciario = req.body.Tipo_Estudio_Posgrado_Terciario;
    const Semestre_Posgrado_Terciario = req.body.Semestre_Posgrado_Terciario;
    const Estado_Estudio_Posgrado_Terciario = req.body.Estado_Estudio_Posgrado_Terciario;
    const Estudio_Complementario = req.body.Estudio_Complementario;
    const Tipo_Estudio_Complementario = req.body.Tipo_Estudio_Complementario;
    const Semestre_Complementario = req.body.Semestre_Complementario;
    const Estado_Estudio_Complementario = req.body.Estado_Estudio_Complementario;
    const Estudio_Complementario_Secundario = req.body.Estudio_Complementario_Secundario;
    const Tipo_Estudio_Complementario_Secundario = req.body.Tipo_Estudio_Complementario_Secundario;
    const Semestre_Complementario_Secundario = req.body.Semestre_Complementario_Secundario;
    const Estado_Estudio_Complementario_Secundario = req.body.Estado_Estudio_Complementario_Secundario;
    const Estudio_Complementario_Terciario = req.body.Estudio_Complementario_Terciario;
    const Tipo_Estudio_Complementario_Terciario = req.body.Tipo_Estudio_Complementario_Terciario;
    const Semestre_Complementario_Terciario = req.body.Semestre_Complementario_Terciario;
    const Estado_Estudio_Complementario_Terciario = req.body.Estado_Estudio_Complementario_Terciario;
    const Correo_Personal = req.body.Correo_Personal;
    const Correo_Corporativo = req.body.Correo_Corporativo;

    const value = new Date();
    const Fecha_Actualizacion = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const subquery = `SELECT MAXFecha FROM (SELECT MAX(Fecha_Corte) AS MAXFecha FROM T_Socio WHERE Usuario_Red = ?) AS subquery`;

            const sql = `UPDATE Sociodemographic.T_Socio SET 
            Genero = '${Genero}', 
            Tipo_Documento = '${Tipo_Documento}', 
            Estado_Civil = '${Estado_Civil}', 
            Fecha_Nacimiento = '${Fecha_Nacimiento}', 
            Pais_Nacimiento = '${Pais_Nacimiento}',
            Departamento_Nacimiento = '${Departamento_Nacimiento}',
            Ciudad_Nacimiento = '${Ciudad_Nacimiento}',
            Telefono_Fijo_Principal = '${Telefono_Fijo_Principal}',
            Telefono_Fijo_Secundario = '${Telefono_Fijo_Secundario}',
            Telefono_Celular_Principal = '${Telefono_Celular_Principal}',
            Telefono_Celular_Secundario = '${Telefono_Celular_Secundario}',
            Departamento_Residencia = '${Departamento_Residencia}',
            Ciudad_Residencia = '${Ciudad_Residencia}',
            Zona_Residencia = '${Zona_Residencia}',
            Barrio_Residencia = '${Barrio_Residencia}',
            Direccion_Residencia = '${Direccion_Residencia}',
            Grupo_Sanguineo = '${Grupo_Sanguineo}',
            Factor_Sanguineo = '${Factor_Sanguineo}',
            Contacto_Emergencia = '${Contacto_Emergencia}',
            Telefono_Contacto_Emergencia = '${Telefono_Contacto_Emergencia}',
            Vehiculo_Propio = '${Vehiculo_Propio}',
            Tipo_Vehiculo = '${Tipo_Vehiculo}',
            Computador_En_Casa = '${Computador_En_Casa}',
            Internet_En_Casa = '${Internet_En_Casa}',
            Velocidad_Internet = '${Velocidad_Internet}',
            Sistema_Operativo_Computador = '${Sistema_Operativo_Computador}',
            Memoria_RAM = '${Memoria_RAM}',
            Numero_Hijos = '${Numero_Hijos}',
            Numero_Personas_A_Cargo = '${Numero_Personas_A_Cargo}',
            Etnia = '${Etnia}',
            Idioma_Nativo = '${Idioma_Nativo}',
            Idioma_Secundario = '${Idioma_Secundario}',
            Nivel_Idioma_Secundario = '${Nivel_Idioma_Secundario}',

            Estudio_Pregrado = '${Estudio_Pregrado}',
            Tipo_Estudio_Pregrado = '${Tipo_Estudio_Pregrado}',
            Semestre_Pregrado = '${Semestre_Pregrado}',
            Estado_Estudio_Pregrado = '${Estado_Estudio_Pregrado}',
            Estudio_Pregrado_Secundario = '${Estudio_Pregrado_Secundario}',
            Tipo_Estudio_Pregrado_Secundario = '${Tipo_Estudio_Pregrado_Secundario}',
            Semestre_Pregrado_Secundario = '${Semestre_Pregrado_Secundario}',
            Estado_Estudio_Pregrado_Secundario = '${Estado_Estudio_Pregrado_Secundario}',
            Estudio_Pregrado_Terciario = '${Estudio_Pregrado_Terciario}',
            Tipo_Estudio_Pregrado_Terciario = '${Tipo_Estudio_Pregrado_Terciario}',
            Semestre_Pregrado_Terciario = '${Semestre_Pregrado_Terciario}',
            Estado_Estudio_Pregrado_Terciario = '${Estado_Estudio_Pregrado_Terciario}',
            
            Estudio_Posgrado = '${Estudio_Posgrado}',
            Tipo_Estudio_Posgrado = '${Tipo_Estudio_Posgrado}',
            Semestre_Posgrado = '${Semestre_Posgrado}',
            Estado_Estudio_Posgrado = '${Estado_Estudio_Posgrado}',
            Estudio_Posgrado_Secundario = '${Estudio_Posgrado_Secundario}',
            Tipo_Estudio_Posgrado_Secundario = '${Tipo_Estudio_Posgrado_Secundario}',
            Semestre_Posgrado_Secundario = '${Semestre_Posgrado_Secundario}',
            Estado_Estudio_Posgrado_Secundario = '${Estado_Estudio_Posgrado_Secundario}',
            Estudio_Posgrado_Terciario = '${Estudio_Posgrado_Terciario}',
            Tipo_Estudio_Posgrado_Terciario = '${Tipo_Estudio_Posgrado_Terciario}',
            Semestre_Posgrado_Terciario = '${Semestre_Posgrado_Terciario}',
            Estado_Estudio_Posgrado_Terciario = '${Estado_Estudio_Posgrado_Terciario}',

            Estudio_Complementario = '${Estudio_Complementario}',
            Tipo_Estudio_Complementario = '${Tipo_Estudio_Complementario}',
            Semestre_Complementario = '${Semestre_Complementario}',
            Estado_Estudio_Complementario = '${Estado_Estudio_Complementario}',
            Estudio_Complementario_Secundario = '${Estudio_Complementario_Secundario}',
            Tipo_Estudio_Complementario_Secundario = '${Tipo_Estudio_Complementario_Secundario}',
            Semestre_Complementario_Secundario = '${Semestre_Complementario_Secundario}',
            Estado_Estudio_Complementario_Secundario = '${Estado_Estudio_Complementario_Secundario}',
            Estudio_Complementario_Terciario = '${Estudio_Complementario_Terciario}',
            Tipo_Estudio_Complementario_Terciario = '${Tipo_Estudio_Complementario_Terciario}',
            Semestre_Complementario_Terciario = '${Semestre_Complementario_Terciario}',
            Estado_Estudio_Complementario_Terciario = '${Estado_Estudio_Complementario_Terciario}',


            Correo_Personal = '${Correo_Personal}',
            Correo_Corporativo = '${Correo_Corporativo}',

            Fecha_Actualizacion = '${Fecha_Actualizacion}'
            WHERE Fecha_Corte = (${subquery}) AND Usuario_Red = ?`;
            connection.query(sql, [Usuario_Red, Usuario_Red], (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    return res.status(500).send('Ha ocurrido un error interno');
                } else if (result.affectedRows > 0) {
                    return res.status(200).send('Datos actualizados');
                } else {
                    return res.status(404).send('Usuario no encontrado');
                }

            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});


module.exports = UpdateInfo;













