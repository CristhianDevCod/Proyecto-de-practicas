const { Sociodemographic, Almaverso } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const ExportsShifts = express.Router();
const { authenticateToken } = require('../Auth/AuthMiddleware');
const cors = require('cors');

ExportsShifts.use(cors());



const poolAlmaverso = mysql.createPool(Almaverso);
const poolSocio = mysql.createPool(Sociodemographic);


//ENDPOINT PARA OBTENER LOS TURNOS COMPLETOS SIN ALGUNA MODIFICACION 
ExportsShifts.get('/API/GET-EXPORT/SHIFTS/', authenticateToken, (req, res) => {
    const startDate = req.query.startDate; // Obtén la fecha de inicio de la solicitud
    const endDate = req.query.endDate;     // Obtén la fecha de fin de la solicitud

    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            //filtrar por el rango de fechas
            const sql = `SELECT * FROM T_Shifts WHERE Fecha BETWEEN ? AND ?`;
            connection.query(sql, [startDate, endDate], (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    res.status(404).send('No se encontraron datos en el rango de fechas especificado');
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    });
});
//ENDPOINT PARA OBTENER LOS TURNOS COMPLETOS SIN ALGUNA MODIFICACION 
ExportsShifts.get('/API/GET-EXPORT/SHIFTS/v2', authenticateToken, (req, res) => {
    const Service = req.query.Service;
    const startDate = req.query.startDate; // Obtén la fecha de inicio de la solicitud
    const endDate = req.query.endDate;     // Obtén la fecha de fin de la solicitud

    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            //filtrar por el rango de fechas
            const sql = `SELECT * FROM T_Shifts WHERE Fecha BETWEEN ? AND ? AND Servicio = ?`;
            connection.query(sql, [startDate, endDate, Service], (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    res.status(404).send('No se encontraron datos en el rango de fechas especificado');
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    });
});


//ENDPOINT PARA OBTENER LOS TURNOS Y REEMPLAZAR EL DOCUMENTO POR EL USUARIO DE RED
ExportsShifts.get('/API/GET-EXPORT/SHIFTS-OPERATIVO/', authenticateToken, (req, res) => {
    const Service = req.query.Service;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Primera consulta para obtener los registros de T_Shifts
    poolAlmaverso.getConnection((err, connection1) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }

        try {
            const sql1 = `SELECT * FROM T_Shifts WHERE Fecha BETWEEN ? AND ? AND Servicio = ?`;
            connection1.query(sql1, [startDate, endDate, Service], (error1, result1) => {
                connection1.release();
                if (error1) {
                    res.status(500).send('Error interno del servidor');
                } else {
                    // Segunda consulta para obtener los correspondientes Usuario_Red de T_Socio
                    poolSocio.getConnection((err2, connection2) => {
                        if (err2) {
                            res.status(500).send('Error interno del servidor');
                        }

                        try {
                            const documentos = result1.map((row) => row.Documento).join("','");
                            const sql2 = `SELECT Documento, Usuario_Red FROM T_Socio WHERE Documento IN ('${documentos}')`;
                            connection2.query(sql2, (error2, result2) => {
                                connection2.release();
                                if (error2) {
                                    res.status(500).send('Error interno del servidor');
                                } else {
                                    // Combina los resultados
                                    const mapUsuarioRed = {};
                                    result2.forEach((row) => {
                                        mapUsuarioRed[row.Documento] = row.Usuario_Red;
                                    });

                                    // Reemplaza el campo Documento con Usuario_Red en los resultados de T_Shifts
                                    const resultsWithUsuarioRed = result1.map((row) => ({
                                        ...row,
                                        Usuario_Red: mapUsuarioRed[row.Documento],
                                    }));

                                    res.status(200).send(resultsWithUsuarioRed);
                                }
                            });
                        } catch (error2) {
                            res.status(500).send('Error interno del servidor');
                        }
                    });
                }
            });
        } catch (error1) {
            res.status(500).send('Error interno del servidor');
        }
    });
});



//ENDPOINT PARA OBTENER LOS TURNOS COMPLETOS ADMINISTARTIVOS COMPLETOS 
ExportsShifts.get('/API/GET-EXPORT/SHIFTS-ADMINISTARTIVOS/v2', authenticateToken, (req, res) => {
    const startDate = req.query.startDate; // Obtén la fecha de inicio de la solicitud
    const endDate = req.query.endDate;     // Obtén la fecha de fin de la solicitud

    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            //filtrar por el rango de fechas
            const sql = `SELECT * FROM T_Shifts_Staff WHERE Fecha BETWEEN ? AND ?`;
            connection.query(sql, [startDate, endDate], (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    res.status(404).send('No se encontraron datos en el rango de fechas especificado');
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    });
});

//ENDPOINT PARA OBTENER LOS TURNOS Y REEMPLAZAR EL DOCUMENTO POR EL USUARIO DE RED
ExportsShifts.get('/API/GET-EXPORT/SHIFTS-ADMINISTRATIVOS/', authenticateToken, (req, res) => {
    const Service = req.query.Service;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Primera consulta para obtener los registros de T_Shifts
    poolAlmaverso.getConnection((err, connection1) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }

        try {
            const sql1 = `SELECT * FROM T_Shifts_Staff WHERE Fecha BETWEEN ? AND ? AND Servicio = ?`;
            connection1.query(sql1, [startDate, endDate, Service], (error1, result1) => {
                connection1.release();
                if (error1) {
                    res.status(500).send('Error interno del servidor');
                } else {
                    // Segunda consulta para obtener los correspondientes Usuario_Red de T_Socio
                    poolSocio.getConnection((err2, connection2) => {
                        if (err2) {
                            res.status(500).send('Error interno del servidor');
                        }

                        try {
                            const documentos = result1.map((row) => row.Documento).join("','");
                            const sql2 = `SELECT Documento, Usuario_Red FROM T_Socio WHERE Documento IN ('${documentos}')`;
                            connection2.query(sql2, (error2, result2) => {
                                connection2.release();
                                if (error2) {
                                    res.status(500).send('Error interno del servidor');
                                } else {
                                    // Combina los resultados
                                    const mapUsuarioRed = {};
                                    result2.forEach((row) => {
                                        mapUsuarioRed[row.Documento] = row.Usuario_Red;
                                    });

                                    // Reemplaza el campo Documento con Usuario_Red en los resultados de T_Shifts
                                    const resultsWithUsuarioRed = result1.map((row) => ({
                                        ...row,
                                        Usuario_Red: mapUsuarioRed[row.Documento],
                                    }));

                                    res.status(200).send(resultsWithUsuarioRed);
                                }
                            });
                        } catch (error2) {
                            res.status(500).send('Error interno del servidor');
                        }
                    });
                }
            });
        } catch (error1) {
            res.status(500).send('Error interno del servidor');
        }
    });
});



module.exports = ExportsShifts;
