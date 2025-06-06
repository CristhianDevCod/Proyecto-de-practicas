const { Almaverso, AlmaversoSystemPoint, Sociodemographic } = require('../BDconfig');

const mysql = require('mysql2');
const express = require('express');
const Extra = express.Router();
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const { authenticateToken } = require('../Auth/AuthMiddleware');
const moment = require('moment');

Extra.use(cors());
Extra.use(express.json());
Extra.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
const Sistema_Punto = mysql.createPool(AlmaversoSystemPoint);
const Socio = mysql.createPool(Sociodemographic);
const server = http.createServer(Extra);
const io = socketIO(server);
//OBTIENE EL TURNO ACTUAL PARA PODER PEDIR LAS HORAS EXTRAS 
Extra.get('/API/GET/SHIFTS-NOW-FOR/ADVISERS/:Documento/:now', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const now = req.params.now;
                const Documento = req.params.Documento;
                const sql = `(SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?) UNION (SELECT * FROM T_Shifts_Staff WHERE Documento = ? AND Fecha = ?)`;

                const Punto = `SELECT *  FROM ColaboradorDimensionamento WHERE CodigoColaborador = ? AND Data = ?`;
                connection.query(sql, [Documento, now, Documento, now], (error, results) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (results.length === 0) {
                        resolve(`No tienes turnos para el día ${now}`);
                    } else {
                        Sistema_Punto.getConnection((errSistemaPunto, connectionSistemaPunto) => {
                            if (errSistemaPunto) {
                                return reject('Error interno del servidor');
                            }

                            connectionSistemaPunto.query(Punto, [Documento, now], (errorColaboradorDimensionamento, resultsColaboradorDimensionamento) => {
                                connectionSistemaPunto.release();

                                if (errorColaboradorDimensionamento) {
                                    return reject('Error interno del servidor');
                                } else {
                                    // Combina los resultados de ambas consultas y envíalos en la respuesta
                                    const combinedResults = {
                                        Turnos: results,
                                        Puntos: resultsColaboradorDimensionamento,
                                    };
                                    resolve(combinedResults);
                                }
                            });
                        });
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//OBTIENE EL HISTORIAL DE HORAS EXTRAS PEDIDAS POR EL ASESOR
Extra.get('/API/GET/HISTORI-HOURS-EXTRA/ADVISERS/:Documento/', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const now = req.params.now;
                const Documento = req.params.Documento;
                const sql = `SELECT *  FROM T_Generate_Hours_Extra WHERE Documento = ?`;
                connection.query(sql, [Documento], (error, results) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (results.length === 0) {
                        resolve(`No tienes turnos para el día ${now}`);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});



//OBTIENE EL NUMERO DE HORAS EXTRAS ACEPTADAS - RECHAZADAS - EN CURSO
Extra.get('/API/HOURS-EXTRA-PENDING/LENGTH/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Documento = req.params.Documento;
                const sql = `SELECT Estado FROM T_Generate_Hours_Extra WHERE Documento = ? AND Estado IS NULL `;
                connection.query(sql, [Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('0');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});
Extra.get('/API/HOURS-EXTRA-ACCEPTS/LENGTH/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Documento = req.params.Documento;
                const sql = `SELECT Estado FROM T_Generate_Hours_Extra WHERE Documento = ? AND Estado = 'Aceptado'`;
                connection.query(sql, [Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('0')
                    } else {
                        resolve(result);
                    }
                });

            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});
Extra.get('/API/HOURS-EXTRA-REJECTS/LENGTH/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Documento = req.params.Documento;
                const sql = `SELECT Estado FROM T_Generate_Hours_Extra WHERE Estado = 'Rechazado' AND Documento = ? `;
                connection.query(sql, [Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('0')
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});







//OBTIENE EL LISTADO DE HORAS PEPIDAS POR LOS ASESORES PARA MOSTRARSELOS A LOS GTR
Extra.get('/API/GET/DATA-HOURS-EXTRA-ADVISER-FOR-GTR/:Cliente', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Cliente = req.params.Cliente.split(',');
                const sql = `SELECT * FROM T_Generate_Hours_Extra WHERE 
                Fecha_Aprobador IS NULL AND
                Hora_Aprobador IS NULL AND
                Nombre_Aprobador IS NULL AND
                Documento_Aprobador IS NULL AND
                Estado IS NULL AND
                Cliente_Area IN (?)
                `;
                connection.query(sql, [Cliente], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No hay solicitudes de horas extras por revisar');
                    } else {
                        resolve(result);
                        io.emit('actualizarDatos');
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});


//EXPORTA LAS HORAS EXTRAS SOLICITADAS POR LOS ASESORES 
Extra.get('/API/GET/DATA-HOURS-EXPORT-ADVISER-FOR-GTR/:Month/:Cliente', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Cliente = req.params.Cliente.split(',');
                const Month = req.params.Month;

                // Formatea la fecha seleccionada y obtén el primer y último día del mes
                const SeletecDate = new Date(Month);
                const FirstDayMonth = new Date(SeletecDate.getFullYear(), SeletecDate.getMonth() + 1, 1);
                const LastDayMonth = new Date(SeletecDate.getFullYear(), SeletecDate.getMonth() + 2, 0);

                // Formatea las fechas en el formato "YYYY-MM-DD"
                const FirstDay = FirstDayMonth.toISOString().split('T')[0];
                const LastDay = LastDayMonth.toISOString().split('T')[0];


                const sql = `SELECT * FROM T_Generate_Hours_Extra WHERE Fecha_Solicitud BETWEEN ? AND ? AND Nombre_Aprobador IS NOT NULL AND Documento_Aprobador IS NOT NULL AND Estado IS NOT NULL AND Cliente_Area IN (?)`;
                connection.query(sql, [FirstDay, LastDay, Cliente], (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No hay resultados');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//OBTIENE LOS TURNOS ACTUALES PARA MOSTRARSELOS A LOS GTR
Extra.get('/API/GET/SHIFTS-NOW-FOR/GTR/:now', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            Socio.getConnection((errSocio, connectionSocio) => {
                if (errSocio) {
                    return reject('Error interno del servidor');
                }
                const now = req.params.now;
                const DocumentoQuery = `SELECT Documento, Usuario_Red FROM T_Socio WHERE Estado_Empleado = 'Activo' AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio)`;
                const sql = `(SELECT * FROM T_Shifts WHERE Fecha = ?) UNION (SELECT * FROM T_Shifts_Staff WHERE Fecha = ?)`;

                connectionSocio.query(DocumentoQuery, (errorSocio, documentoResults) => {
                    connectionSocio.release();
                    if (errorSocio) {
                        return reject('Error interno del servidor');
                    } else if (documentoResults.length === 0) {
                        return reject(`No hay documentos de usuarios activos para el día ${now}`);
                    } else {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                return reject('Error interno del servidor');
                            }
                            connection.query(sql, [now, now], (error, results) => {
                                connection.release();
                                if (error) {
                                    return reject('Error interno del servidor');
                                } else if (results.length === 0) {
                                    return reject(`No hay turnos para el día ${now}`);
                                } else {
                                    // Asignar usuario de red a cada turno
                                    const turnosConUsuarioRed = results.map((turno) => {
                                        const usuarioRed = documentoResults.find((documento) => documento.Documento === turno.Documento)?.Usuario_Red;
                                        return { ...turno, Usuario_Red: usuarioRed };
                                    });

                                    resolve(turnosConUsuarioRed);
                                }
                            });
                        });
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//OBTIENE LOS TURNOS ACTUALES PARA MOSTRARSELOS A LOS JEFES INMEDIATOS 
Extra.get('/API/GET/SHIFTS-NOW-FOR/BOSS/MY-GROUP/:now/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            Socio.getConnection((errSocio, connectionSocio) => {
                if (errSocio) {
                    return reject('Error interno del servidor');
                }
                const { now, Documento } = req.params;
                const DocumentoQuery = `SELECT Documento, Usuario_Red FROM T_Socio WHERE Estado_Empleado = 'Activo' AND Documento_Jefe_Inmediato = '${Documento}' AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio)`;
                const sql = `SELECT * FROM T_Shifts_Staff WHERE Fecha = ? AND Documento IN (?)`;

                connectionSocio.query(DocumentoQuery, (errorSocio, documentoResults) => {
                    connectionSocio.release();
                    if (errorSocio) {
                        return reject('Error interno del servidor');
                    } else if (documentoResults.length === 0) {
                        resolve(`No hay documentos de usuarios activos para el día ${now}`);
                    } else {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                return reject('Error interno del servidor');
                            }
                            const documentos = documentoResults.map((documento) => documento.Documento);
                            connection.query(sql, [now, documentos], (error, results) => {
                                connection.release();
                                if (error) {
                                    return reject('Error interno del servidor');
                                } else if (results.length === 0) {
                                    resolve(`No hay turnos para el día ${now}`);
                                } else {
                                    // Asignar usuario de red a cada turno
                                    const turnosConUsuarioRed = results.map((turno) => {
                                        const usuarioRed = documentoResults.find((documento) => documento.Documento === turno.Documento)?.Usuario_Red;
                                        return { ...turno, Usuario_Red: usuarioRed };
                                    });

                                    resolve(turnosConUsuarioRed);
                                }
                            });
                        });
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//OBTIENE EL LISTADO DE HORAS PEPIDAS POR LOS DE STAFF PARA MOSTRARSELOS A LOS JEFES
Extra.get('/API/GET/DATA-HOURS-EXTRA-ADVISER-FOR-BOSS/MY-GROUP/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Documento = req.params.Documento;
                const sql = `SELECT * FROM T_Generate_Hours_Extra WHERE Fecha_Aprobador IS NULL AND
                Hora_Aprobador IS NULL AND
                Nombre_Aprobador IS NULL AND
                Documento_Aprobador IS NULL AND
                Estado IS NULL AND Documento_Jefe_Inmediato = ?`;
                connection.query(sql, [Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No hay solicitudes de horas extras por revisar');
                    } else {
                        resolve(result);
                        io.emit('actualizarDatos');
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});


//EXPORTA LAS HORAS EXTRAS SOLICITADAS POR LOS ASESORES 
Extra.get('/API/GET/DATA-HOURS-EXPORT-ADVISER-FOR-BOOS/:Month/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const Documento = req.params.Documento.split(',');
                const Month = req.params.Month;

                // Formatea la fecha seleccionada y obtén el primer y último día del mes
                const SeletecDate = new Date(Month);
                const FirstDayMonth = new Date(SeletecDate.getFullYear(), SeletecDate.getMonth() + 1, 1);
                const LastDayMonth = new Date(SeletecDate.getFullYear(), SeletecDate.getMonth() + 2, 0);

                // Formatea las fechas en el formato "YYYY-MM-DD"
                const FirstDay = FirstDayMonth.toISOString().split('T')[0];
                const LastDay = LastDayMonth.toISOString().split('T')[0];

                const sql = `SELECT * FROM T_Generate_Hours_Extra WHERE Fecha_Solicitud BETWEEN ? AND ? AND Nombre_Aprobador IS NOT NULL AND Documento_Aprobador IS NOT NULL AND Estado IS NOT NULL AND Documento_Jefe_Inmediato = ?`;
                connection.query(sql, [FirstDay, LastDay, Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No hay resultados');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});



// SELECCIONA LAS HORAS CARGADAS PARA ASIGNARLE AL ASESOR O ADMINITRATIVO LAS HORAS EXTRAS
Extra.put('/API/UPDATE/HOUR/EXTRA/FOR/ADVISERS/:Fecha_Turno/:Documento/:Hora_Extra_Ini/:Hora_Extra_Fin', authenticateToken, async (req, res) => {
    try {
        const { Fecha_Turno, Documento, Hora_Extra_Ini, Hora_Extra_Fin } = req.params;

        const Query = await new Promise((resolve, reject) => {
            Sistema_Punto.getConnection((errSistema, connectionSistema) => {
                if (errSistema) {
                    return reject('Error de conexión a la base de datos');
                }

                const sqlValidate = `SELECT Data,
                     CargaHoraria,
                     HoraExtraFim 
                     FROM ColaboradorDimensionamento 
                     WHERE CodigoColaborador = '${Documento}' AND WEEK(Data, 1) = WEEK('${Fecha_Turno}', 1) AND YEAR(Data) = YEAR('${Fecha_Turno}')`;

                connectionSistema.query(sqlValidate, [Documento, Fecha_Turno, Fecha_Turno], (error, resultValidate) => {
                    if (error) {
                        connectionSistema.release();
                        return reject('Error al validar las horas');
                    }

                    if (resultValidate.length === 0) {
                        connectionSistema.release();
                        return reject('No se encontraron registros para el colaborador en la semana especificada');
                    }

                    let totalHours = resultValidate.reduce((sum, row) => {
                        return sum + (row.CargaHoraria / 60) + (row.HoraExtraFim / 60);
                    }, 0);

                    if (totalHours > 54) {
                        connectionSistema.release();
                        return reject(`No puedes cargar horas extras para este documento ${Documento}, ya cumplió las horas semanales`);
                    }

                    const startHoursMinutes = Hora_Extra_Ini.split(':');
                    const HoraExtraInicio = parseInt(startHoursMinutes[0]) * 60 + parseInt(startHoursMinutes[1]);

                    const sql = `UPDATE ColaboradorDimensionamento SET HoraExtraInicio = ?, HoraExtraFim = ? WHERE CodigoColaborador = ? AND Data = ?`;

                    connectionSistema.query(sql, [HoraExtraInicio, Hora_Extra_Fin, Documento, Fecha_Turno], (errorUpdate, results) => {
                        connectionSistema.release();
                        if (errorUpdate) {
                            return reject('Error al actualizar las horas extras');
                        }
                        if (results.affectedRows === 0) {
                            return resolve('No se encontró el registro para actualizar');
                        }
                        resolve({ message: 'Asignación de horas extras realizada exitosamente' });
                    });
                });
            });
        });

        const result = await Query;
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
});




module.exports = Extra;

