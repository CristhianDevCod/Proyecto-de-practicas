const { Sociodemographic, Almaverso } = require('../BDconfig');

const mysql = require('mysql2');
const express = require('express');
const { authenticateToken } = require("../Auth/AuthMiddleware");
const GetListUsers = express.Router();
const cors = require('cors');
GetListUsers.use(cors());
GetListUsers.use(express.json());
GetListUsers.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
const pool2 = mysql.createPool(Sociodemographic);

//OBTIENE LA LISTA DE USUARIOS QUE SEAN DE MI MISMO CARGO, SERVICIO, Y CLIENTE
GetListUsers.get('/API/GET-LIST-USERS-SERVICE-DAY-REST/:Cargo/:Servicio/:Cliente', authenticateToken, (req, res) => {
    const { Cargo, Cliente, Servicio } = req.params;
    
    pool2.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            // Determinar los valores de Cliente_Area
            const clienteAreaFilter = Cliente === 'LATAM MED' || Cliente === 'LATAM BOG' ? ['LATAM MED', 'LATAM BOG'] : [Cliente];

            const sql = `
                SELECT Documento, Nombres, Apellidos, ID_Imagen, Cargo, Cliente_Area, Servicio, Documento_Jefe_Inmediato, Jefe_Inmediato, Jefe, Usuario_Red 
                FROM T_Socio 
                WHERE Cargo = ? 
                AND Cliente_Area IN (?) 
                AND Servicio = ? 
                AND Estado_Empleado = 'Activo' 
                AND Fecha_Corte = (
                    SELECT MAX(Fecha_Corte) 
                    FROM T_Socio 
                    WHERE Cargo = ? 
                    AND Cliente_Area IN (?) 
                    AND Servicio = ? 
                    AND Estado_Empleado = 'Activo'
                )`;

            connection.query(sql, [Cargo, clienteAreaFilter, Servicio, Cargo, clienteAreaFilter, Servicio], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    res.status(200).send(result);
                } else {
                    res.status(200).send('No hay resultados');
                };
            });
        } catch (error) {
            connection.release();
            return res.status(500).send('Error en el servidor');
        }
    });
});





GetListUsers.get('/API/GET-LIST-USERS-SERVICE/:Cargo/:Servicio/:Cliente/:DiaTrabajo', authenticateToken, (req, res) => {
    const { Cargo, Cliente, Servicio, DiaTrabajo } = req.params;

    let shiftsData;
    let socioData;

    // Usar pool para acceder a T_Shifts
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const shiftsSql = `SELECT * FROM T_Shifts WHERE Fecha = ?`;
            connection.query(shiftsSql, [DiaTrabajo], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                }
                shiftsData = result;

                // Usar pool2 para acceder a T_Socio
                pool2.getConnection((err, connection2) => {
                    if (err) {
                        connection2.release();
                        return res.status(500).send('Error interno del servidor');
                    }
                    try {
                        // Determinar los valores de Cliente_Area
                        const clienteAreaFilter = Cliente === 'LATAM MED' || Cliente === 'LATAM BOG' ? ['LATAM MED', 'LATAM BOG'] : [Cliente];

                        const socioSql = `
                            SELECT 
                            Documento, 
                            Nombres, 
                            Apellidos, 
                            ID_Imagen,
                            Cargo,
                            Cliente_Area,
                            Servicio,
                            Documento_Jefe_Inmediato,
                            Jefe_Inmediato,
                            Jefe,
                            Usuario_Red 
                            FROM T_Socio 
                            WHERE 
                            Cargo = ? 
                            AND Cliente_Area IN (?) 
                            AND Servicio = ? 
                            AND Documento IN (?)
                            AND Estado_Empleado = 'Activo' 
                            AND Fecha_Corte = (
                                SELECT MAX(Fecha_Corte) 
                                FROM T_Socio 
                                WHERE Cargo = ? 
                                AND Cliente_Area IN (?) 
                                AND Servicio = ? 
                                AND Documento IN (?) 
                                AND Estado_Empleado = 'Activo'
                            )`;

                        const documentos = shiftsData.map((item) => item.Documento);
                        connection2.query(socioSql, [Cargo, clienteAreaFilter, Servicio, documentos, Cargo, clienteAreaFilter, Servicio, documentos], (err, result2) => {
                            connection2.release();
                            if (err) {

                                return res.status(500).send('Error interno del servidor');
                            }
                            socioData = result2;


                            // Realizar la unión de datos aquí
                            const combinedData = combineData(shiftsData, socioData);

                            if (combinedData.length > 0) {

                                return res.status(200).send(combinedData);

                            } else {

                                return res.status(200).send(`No hay personas disponibles para cambiar de turno en este día '${DiaTrabajo}'`);
                            }
                        });
                    } catch (error) {
                        connection2.release();
                        return res.status(500).send('Error en el servidor');
                    }
                });
            });
        } catch (error) {
            connection.release();
            return res.status(500).send('Error en el servidor');
        }
    });
});

// Función para combinar los datos
function combineData(shiftsData, socioData) {
    const combinedData = [];

    for (const shift of shiftsData) {
        // Encuentra los socios que coinciden en Documento y verifican otros campos
        const matchingSocios = socioData.filter((socio) => { return socio.Documento === shift.Documento && socio.Servicio === shift.Servicio; });
        if (matchingSocios.length > 0) {
            // Si hay coincidencias, agrega el turno y los socios que coinciden
            const combinedEntry = { ...shift, matchingSocios };
            combinedData.push(combinedEntry);
        }
    }

    return combinedData;
}


// VALIDAMOS SI EL DÍA A TOMAR CONTIENE AL TURNO DE CIERRE, SI ES ASÍ LE INHABILITAMOS EL BOTÓN
GetListUsers.get('/API/VERIFY-DAY/DISABLE/:Documento/:Dia_Trabajo_Actual', authenticateToken, (req, res) => {
    const { Dia_Trabajo_Actual, Documento } = req.params
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        } else {
            try {
                const sql = "SELECT Fecha, Turno_Fin FROM T_Shifts_Staff WHERE Documento = ? AND Fecha = ?";
                connection.query(sql, [Documento, Dia_Trabajo_Actual], (err, result) => {
                    connection.release(); // Libera la conexión de vuelta al pool
                    if (err) {
                        return res.status(500).send({
                            err: err
                        });
                    } else if (result.length === 0) {
                        return res.status(204).send('ok');
                    } else {
                        const turnoFin = result[0].Turno_Fin;
                        if (turnoFin === '23:45:00' || turnoFin === '23:45') {
                            return res.status(200).send(true);
                        } else {
                            return res.status(200).send(false);
                        }
                    }
                });
            } catch (error) {
                connection.release(); // Asegura liberar la conexión en caso de error
                return res.status(500).send({
                    error: error
                });
            }
        }
    });
});


//OPTIENE LA LISTA DE SUPERVISORES
GetListUsers.get('/API/GET-LIST-SUPERVISOR/:Documento_Jefe_Inmediato', authenticateToken, (req, res) => {
    const Documento_Jefe_Inmediato = req.params.Documento_Jefe_Inmediato;
    pool2.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Socio WHERE Documento = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento = ?)`;
            connection.query(sql, [Documento_Jefe_Inmediato, Documento_Jefe_Inmediato], (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else if (result.length === 0) {
                    res.status(204).send('No hay resultado');
                } else {
                    res.status(200).send(result);
                }
            });
        }
        catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });
});

GetListUsers.get('/API/GET-LIST-NOTIFICATIONS/:Documento_Envia/', authenticateToken, (req, res) => {
    const Documento_Envia = req.params.Documento_Envia;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Documento_Envia = ?`
            connection.query(sql, [Documento_Envia], (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send('Error en el servidor');
                } else if (result.length === 0) {
                    res.status(200).send({ Id_Cambio: 'No hay resultados' });
                } else {
                    res.status(200).send(result)
                }
            })
        }
        catch (error) {
            res.status(500).send('Error interno del servidor');
        }

    })

});

GetListUsers.get('/API/GET-LIST-NOTIFICATIONS-RECIBE/:Documento_Recibe/', authenticateToken, (req, res) => {
    const Documento_Recibe = req.params.Documento_Recibe;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Documento_Recibe = ?`
            connection.query(sql, [Documento_Recibe], (err, result) => {
                if (err) {
                    res.status(500).send('Error en el servidor');
                } else if (result.length === 0) {
                    res.status(200).send({ error: 'No hay resultados' });
                } else {
                    res.status(200).send(result)
                }

            })
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    })

});


module.exports = GetListUsers;
