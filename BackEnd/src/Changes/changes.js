const {
    Almaverso
} = require('../BDconfig');

const mysql = require('mysql2');
const express = require('express');
const changes = express.Router();
const cors = require('cors');
const { default: Queries } = require('../Sql/Queries');
const { authenticateToken } = require('../Auth/AuthMiddleware');


changes.use(cors());
changes.use(express.json());
changes.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);

// ==============================================================================
// ==     🚧metodo PUT para cambiar de turno a los ejecutivos🚧           ==
// ==============================================================================
changes.get('/API/GET-SHIFT-ADVISERS/:Documento/:Fecha/', authenticateToken, (req, res) => {
    const { Documento, Fecha } = req.params;

    // Validar parámetros
    if (!Documento) {
        return res.status(400).send({ error: 'El ejecutivo es requerido' });
    }
    if (!Fecha) {
        return res.status(400).send({ error: 'Para poder obtener el día en específico se debe proporcionar la fecha' });
    }

    new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    })
        .then(connection => {
            return new Promise((resolve, reject) => {
                connection.query(Queries.selectShiftAdviser, [Documento, Fecha], (queryError, results) => {
                    if (queryError) {
                        reject(queryError);
                    } else {
                        resolve({ connection, results });
                    }
                });
            });
        })
        .then(({ connection, results }) => {
            if (results.length === 0) {
                res.status(404).send({ error: `El ejecutivo identificado con el documento ${Documento} no tiene turno cargado para el día ${Fecha}` });
            } else {
                res.status(200).send(results);
            }
            connection.release();
        })
        .catch(error => {
            res.status(500).send({ error: 'Error interno del servidor' });
        });
});


// Intercambia los turnos de los Ejecutivos por me dio de sus documentos y Fecha 

changes.put('/API/CHANGES-SHIFTS-ONE-TO-ONE/v1.1/', authenticateToken, (req, res) => {
    const { Documento1, Documento2, Fecha } = req.body;

    // Validar parámetros
    if (!Documento1 || !Documento2) {
        return res.status(400).send({ error: 'Se requieren dos ejecutivos para poder ejercer un cambio 1 a 1, por lo tanto revisa los campos vacíos' });
    }
    if (!Fecha) {
        return res.status(400).send({ error: 'Se debe proporcionar la fecha para el día que se desea cambiar' });
    }

    new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    })
        .then(connection => {
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`;
                connection.query(sql, [Documento1, Fecha], (err, result) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    if (result.length === 0) {
                        connection.release();
                        return reject(`El ejecutivo '${Documento1}' no tiene turnos cargados`);
                    }
                    resolve({ connection, result });
                });
            });
        })
        .then(({ connection, result }) => {
            if (Documento1 === Documento2) {
                connection.release();
                return res.status(400).send({ error: 'No se puede ejercer un cambio con el mismo ejecutivo' });
            }

            return new Promise((resolve, reject) => {
                const sql2 = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`;
                connection.query(sql2, [Documento2, Fecha], (err, results) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    if (results.length === 0) {
                        connection.release();
                        return reject(`El ejecutivo '${Documento2}' no tiene turnos cargados`);
                    }
                    resolve({ connection, result1: result[0], result2: results[0] });
                });
            });
        })
        .then(({ connection, result1, result2 }) => {
            // Verificar compatibilidad de los turnos
            if (result1.Horas_Laboradas !== result2.Horas_Laboradas) {
                connection.release();
                return res.status(400).send({ error: `Los ejecutivos ${Documento1} y ${Documento2} no cumplen con el rango de horas, por lo tanto no se puede ejercer este cambio y será rechazado` });
            }
            if (result1.Servicio !== result2.Servicio) {
                connection.release();
                return res.status(400).send({ error: `Los ejecutivos ${Documento1} y ${Documento2} no pertenecen al mismo servicio` });
            }
            if (result1.Novedad !== result2.Novedad) {
                connection.release();
                return res.status(400).send({ error: 'Los ejecutivos no cumplen con los requisitos de novedades para realizar el cambio' });
            }
            if (result1.Fecha !== result2.Fecha) {
                connection.release();
                return res.status(400).send({ error: 'Las fechas no coinciden' });
            }
            if (result1.Lac_Ini !== result2.Lac_Ini || result1.Lac_Fin !== result2.Lac_Fin) {
                connection.release();
                return res.status(400).send({ error: 'Los ejecutivos no cuentan con las mismas horas de lactancia, por lo tanto no se puede ejercer el cambio de turno' });
            }
            if (result1.Training_1_Ini !== result2.Training_1_Ini || result1.Training_1_Fin !== result2.Training_1_Fin ||
                result1.Training_2_Ini !== result2.Training_2_Ini || result1.Training_2_Fin !== result2.Training_2_Fin) {
                connection.release();
                return res.status(400).send({ error: 'Los ejecutivos no cumplen con las horas de capacitación, por lo tanto no se puede ejercer el cambio de turno' });
            }

            // Actualizar los turnos de ambos ejecutivos

            const updateShift = (documento, shiftData) => {
                const sql = `
                UPDATE T_Shifts SET
                Des_1_Fin = ?,
                Des_1_Ini = ?,
                Des_2_Fin = ?,
                Des_2_Ini = ?,
                Des_3_Fin = ?,
                Des_3_Ini = ?,
                Dialogo_Fin = ?,
                Dialogo_Ini = ?,
                Fecha = ?,
                Horas_Laboradas = ?,
                Lac_Fin = ?,
                Lac_Ini = ?,
                Lunch_Fin = ?,
                Lunch_Ini = ?,
                Novedad = ?,
                Servicio = ?,
                Training_1_Fin = ?,
                Training_1_Ini = ?,
                Training_2_Fin = ?,
                Training_2_Ini = ?,
                Turno_Fin = ?,
                Turno_Ini = ?
                WHERE Documento = ? AND Fecha = ?`;
                const params = [
                    shiftData.Des_1_Fin,
                    shiftData.Des_1_Ini,
                    shiftData.Des_2_Fin,
                    shiftData.Des_2_Ini,
                    shiftData.Des_3_Fin,
                    shiftData.Des_3_Ini,
                    shiftData.Dialogo_Fin,
                    shiftData.Dialogo_Ini,
                    shiftData.Fecha,
                    shiftData.Horas_Laboradas,
                    shiftData.Lac_Fin,
                    shiftData.Lac_Ini,
                    shiftData.Lunch_Fin,
                    shiftData.Lunch_Ini,
                    shiftData.Novedad,
                    shiftData.Servicio,
                    shiftData.Training_1_Fin,
                    shiftData.Training_1_Ini,
                    shiftData.Training_2_Fin,
                    shiftData.Training_2_Ini,
                    shiftData.Turno_Fin,
                    shiftData.Turno_Ini,
                    documento,
                    shiftData.Fecha
                ];
                return new Promise((resolve, reject) => {
                    connection.query(sql, params, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            };

            Promise.all([updateShift(Documento1, result2), updateShift(Documento2, result1)])
                .then(() => {
                    connection.release();
                    res.status(200).send({ message: 'Cambio de turno realizado exitosamente y guardado correctamente!!!' });
                })
                .catch(updateError => {
                    connection.release();
                    res.status(500).send({ error: 'Error interno del servidor al actualizar los turnos' });
                });
        })
        .catch(error => {
            if (error.connection) error.connection.release();
            if (!res.headersSent) {
                res.status(500).send({ error: typeof error === 'string' ? error : 'Error interno del servidor' });
            }
        });
});




// ==============================================================================
// ==     🚧metodo PUT para cambios día descanSo🚧        ==
// ==============================================================================

changes.put('/API/DAY-REST/v2/', authenticateToken, (req, res) => {
    const { Documento1, Documento2, FechaInicio, FechaFin } = req.body;

    // Validar parámetros
    if (!Documento1) {
        return res.status(400).send({ error: 'El primer campo se encuentra vacío, por favor verifica el campo' });
    }
    if (!Documento2) {
        return res.status(400).send({ error: 'El segundo campo se encuentra vacío, por favor verifica el campo' });
    }
    if (!FechaInicio) {
        return res.status(400).send({ error: 'Debes proporcionar una fecha inicial' });
    }
    if (!FechaFin) {
        return res.status(400).send({ error: 'Debes proporcionar una fecha final' });
    }

    new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    })
        .then(connection => {
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`;
                connection.query(sql, [Documento1, FechaInicio], (err, result) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    if (result.length === 0) {
                        connection.release();
                        return reject(`El ejecutivo '${Documento1}' no tiene turnos cargados`);
                    }
                    resolve({ connection, result });
                });
            });
        })
        .then(({ connection, result }) => {
            if (Documento1 === Documento2) {
                connection.release();
                return res.status(400).send({ error: 'No se puede ejercer un cambio con el mismo ejecutivo' });
            }

            return new Promise((resolve, reject) => {
                const sql2 = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`;
                connection.query(sql2, [Documento1, FechaFin], (err, results) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    if (results.length === 0) {
                        connection.release();
                        return reject(`El ejecutivo '${Documento1}' no tiene turnos cargados`);
                    }
                    resolve({ connection, result1: result[0], result2: results[0] });
                });
            });
        })
        .then(({ connection, result1, result2 }) => {
            return new Promise((resolve, reject) => {
                connection.query(Queries.selectShiftAdviser, [Documento2, FechaInicio], (err, result) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    if (result.length === 0) {
                        connection.release();
                        return reject(`El ejecutivo '${Documento2}' no tiene turnos cargados`);
                    }
                    resolve({ connection, result1, result2, result3: result[0] });
                });
            });
        })
        .then(({ connection, result1, result2, result3 }) => {
            return new Promise((resolve, reject) => {
                connection.query(Queries.selectShiftAdviser, [Documento2, FechaFin], (err, result) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    if (result.length === 0) {
                        connection.release();
                        return reject(`El ejecutivo '${Documento2}' no tiene turnos cargados`);
                    }
                    resolve({ connection, result1, result2, result3, result4: result[0] });
                });
            });
        })
        .then(({ connection, result1, result2, result3, result4 }) => {
            if (result1.Horas_Laboradas === result3.Horas_Laboradas || result2.Horas_Laboradas === result4.Horas_Laboradas) {
                connection.release();
                return res.status(400).send({ error: 'Los ejecutivos se encuentran en turnos el mismo día' });
            }
            if (!['DES', 'TUR'].includes(result1.Novedad) || !['DES', 'TUR'].includes(result2.Novedad) ||
                !['DES', 'TUR'].includes(result3.Novedad) || !['DES', 'TUR'].includes(result4.Novedad)) {
                connection.release();
                return res.status(400).send({ error: `Los ejecutivos ${Documento1} y ${Documento2} contienen novedades` });
            }

            // Actualizar turnos de los ejecutivos
            const updateShift = (documento, shiftData, fecha) => {
                const sql = `
                UPDATE T_Shifts SET
                Des_1_Fin = ?,
                Des_1_Ini = ?,
                Des_2_Fin = ?,
                Des_2_Ini = ?,
                Des_3_Fin = ?,
                Des_3_Ini = ?,
                Dialogo_Fin = ?,
                Dialogo_Ini = ?,
                Fecha = ?,
                Horas_Laboradas = ?,
                Lac_Fin = ?,
                Lac_Ini = ?,
                Lunch_Fin = ?,
                Lunch_Ini = ?,
                Novedad = ?,
                Servicio = ?,
                Training_1_Fin = ?,
                Training_1_Ini = ?,
                Training_2_Fin = ?,
                Training_2_Ini = ?,
                Turno_Fin = ?,
                Turno_Ini = ?
                WHERE Documento = ? AND Fecha = ?`;
                const params = [
                    shiftData.Des_1_Fin,
                    shiftData.Des_1_Ini,
                    shiftData.Des_2_Fin,
                    shiftData.Des_2_Ini,
                    shiftData.Des_3_Fin,
                    shiftData.Des_3_Ini,
                    shiftData.Dialogo_Fin,
                    shiftData.Dialogo_Ini,
                    shiftData.Fecha,
                    shiftData.Horas_Laboradas,
                    shiftData.Lac_Fin,
                    shiftData.Lac_Ini,
                    shiftData.Lunch_Fin,
                    shiftData.Lunch_Ini,
                    shiftData.Novedad,
                    shiftData.Servicio,
                    shiftData.Training_1_Fin,
                    shiftData.Training_1_Ini,
                    shiftData.Training_2_Fin,
                    shiftData.Training_2_Ini,
                    shiftData.Turno_Fin,
                    shiftData.Turno_Ini,
                    documento,
                    fecha
                ];
                return new Promise((resolve, reject) => {
                    connection.query(sql, params, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            };

            Promise.all([
                updateShift(Documento2, result1, FechaInicio),
                updateShift(Documento2, result2, FechaFin),
                updateShift(Documento1, result3, FechaInicio),
                updateShift(Documento1, result4, FechaFin)
            ])
                .then(() => {
                    connection.release();
                    res.status(200).send({ message: 'Cambio día descanso realizado con éxito' });
                })
                .catch(updateError => {
                    connection.release();
                    res.status(500).send({ error: 'Error interno del servidor al actualizar los turnos' });
                });
        })
        .catch(error => {
            if (error.connection) error.connection.release();
            if (!res.headersSent) {
                res.status(500).send({ error: typeof error === 'string' ? error : 'Error interno del servidor' });
            }
        });
});




module.exports = changes;
