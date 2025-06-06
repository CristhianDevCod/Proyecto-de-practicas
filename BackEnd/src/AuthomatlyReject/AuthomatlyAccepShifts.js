const { Almaverso } = require('../BDconfig');
const express = require('express');
const AuthomatlyAcceptShifts = express();
const cors = require('cors');
const mysql = require('mysql2');

AuthomatlyAcceptShifts.use(cors());
AuthomatlyAcceptShifts.use(express.json());
AuthomatlyAcceptShifts.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);

const callback = () => { };

function rejectMessages() {
    pool.getConnection((err, connection) => {
        if (err) {
            return callback('Error interno del servidor');
        }

        try {
            const currentDate = new Date();
            const midnight = new Date(currentDate);
            midnight.setHours(24, 0, 0, 0);
            const queryDays = `SELECT Dia_Descanso_Actual, Dia_Descanso_Futuro FROM T_Shifts_Notifications`
            connection.query(queryDays, (errQueryDays, resultQueryDays) => {
                connection.release();
                if (errQueryDays) {
                    callback('Error interno del servidor');
                } else if (resultQueryDays.length === 0) {
                    callback('No hay resultado');
                } else {
                    const diaDescansoActual = resultQueryDays[0].Dia_Descanso_Actual;
                    const diaDescansoFuturo = resultQueryDays[0].Dia_Descanso_Futuro;

                    // Comparando los valores y tomando el menor de los dos
                    const menorDiaDescanso = Math.min(diaDescansoActual, diaDescansoFuturo);
                    if (menorDiaDescanso <= midnight) {
                        const updateQuery = `UPDATE T_Shifts_Notifications SET Respuesta_Recibe = 'Aceptado', Estado_Marcacion_Final = 'Aceptado', Nombre_Aprobador_Final = 'Sistema' WHERE (Dia_Descanso_Actual <= '${midnight.toISOString()}' OR Dia_Descanso_Futuro <= '${midnight.toISOString()}') AND Estado_Marcacion_Final IS NULL`;
                        connection.query(updateQuery, (error, results) => {
                            connection.release();
                            if (error) {
                                callback('Error rejecting messages:', error);
                            } else if (results.length === 0) {
                                callback(`No se aceptarón mensajes`);
                            } else {

                                const sql = `SELECT Dia_Descanso_Actual, Dia_Descanso_Futuro, Documento_Envia, Documento_Recibe FROM T_Shifts_Notifications`
                                connection.query(sql, (errGet, resultsGet) => {
                                    connection.release();
                                    if (errGet) {
                                        callback(`Error interno del servidor`);
                                    } else if (resultsGet.length === 0) {
                                        callback('No hay turnos a cambiar');
                                    } else {
                                        resultsGet.forEach((shiftData) => {
                                            const Dia_Descanso_Actual = shiftData.Dia_Descanso_Actual;
                                            const Dia_Descanso_Futuro = shiftData.Dia_Descanso_Futuro;
                                            const Documento_Envia = shiftData.Documento_Envia;
                                            const Documento_Recibe = shiftData.Documento_Recibe;

                                            if (Documento_Envia === '' || Documento_Recibe === '') {
                                                return callback(`Se requieren dos ejecutivos para poder ejercer un cambio 1 a 1, por lo tanto revisa los campos vacios`)
                                            } else {
                                                if (!Dia_Descanso_Actual || Dia_Descanso_Futuro === '') {
                                                    return callback('Se debe proporcionar la fecha para el día que se desea cambiar');
                                                }
                                            }

                                            const selectShiftAdviser = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`
                                            connection.query(selectShiftAdviser, [Documento_Envia, Dia_Descanso_Actual], (err, result) => {
                                                connection.release();
                                                if (err) throw err;
                                                if (result.length === 0) {
                                                    return callback(`El ejecutivo '${Documento_Envia}' no tiene turnos cargados`);
                                                } else if (Documento_Envia === Documento_Recibe) {
                                                    return callback('No se puede ejercer un cambio con el mismo ejecutivo');
                                                } else {
                                                    const Des_1_Fin = result[0].Des_1_Fin;
                                                    const Des_1_Ini = result[0].Des_1_Ini;
                                                    const Des_2_Fin = result[0].Des_2_Fin;
                                                    const Des_2_Ini = result[0].Des_2_Ini;
                                                    const Des_3_Fin = result[0].Des_3_Fin;
                                                    const Des_3_Ini = result[0].Des_3_Ini;
                                                    const Dialogo_Fin = result[0].Dialogo_Fin;
                                                    const Dialogo_Ini = result[0].Dialogo_Ini;
                                                    // const Documento_Envia = result[0].Documento;
                                                    const Fecha = result[0].Fecha;
                                                    const Horas_Laboradas = result[0].Horas_Laboradas;
                                                    const Lac_Fin = result[0].Lac_Fin;
                                                    const Lac_Ini = result[0].Lac_Ini;
                                                    const Lunch_Fin = result[0].Lunch_Fin;
                                                    const Lunch_Ini = result[0].Lunch_Ini;
                                                    const Novedad = result[0].Novedad;
                                                    const Servicio = result[0].Servicio;
                                                    const Training_1_Fin = result[0].Training_1_Fin;
                                                    const Training_1_Ini = result[0].Training_1_Ini;
                                                    const Training_2_Fin = result[0].Training_2_Fin;
                                                    const Training_2_Ini = result[0].Training_2_Ini;
                                                    const Turno_Fin = result[0].Turno_Fin;
                                                    const Turno_Ini = result[0].Turno_Ini;

                                                    const selectShiftAdviser2 = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`
                                                    connection.query(selectShiftAdviser2, [Documento_Envia, Dia_Descanso_Futuro], (error, results) => {
                                                        connection.release();
                                                        if (error) throw error;

                                                        if (results.length === 0) {
                                                            return callback(`El ejecutivo '${Documento_Envia}' no tiene turnos cargados`);
                                                        } else {

                                                            const Des_1_Fin1 = results[0].Des_1_Fin;
                                                            const Des_1_Ini1 = results[0].Des_1_Ini;
                                                            const Des_2_Fin1 = results[0].Des_2_Fin;
                                                            const Des_2_Ini1 = results[0].Des_2_Ini;
                                                            const Des_3_Fin1 = results[0].Des_3_Fin;
                                                            const Des_3_Ini1 = results[0].Des_3_Ini;
                                                            const Dialogo_Fin1 = results[0].Dialogo_Fin;
                                                            const Dialogo_Ini1 = results[0].Dialogo_Ini;
                                                            // const Documento_Envia = results[0].Documento;
                                                            const Fecha1 = results[0].Fecha;
                                                            const Horas_Laboradas1 = results[0].Horas_Laboradas;
                                                            const Lac_Fin1 = results[0].Lac_Fin;
                                                            const Lac_Ini1 = results[0].Lac_Ini;
                                                            const Lunch_Fin1 = results[0].Lunch_Fin;
                                                            const Lunch_Ini1 = results[0].Lunch_Ini;
                                                            const Novedad1 = results[0].Novedad;
                                                            const Servicio1 = results[0].Servicio;
                                                            const Training_1_Fin1 = results[0].Training_1_Fin;
                                                            const Training_1_Ini1 = results[0].Training_1_Ini;
                                                            const Training_2_Fin1 = results[0].Training_2_Fin;
                                                            const Training_2_Ini1 = results[0].Training_2_Ini;
                                                            const Turno_Fin1 = results[0].Turno_Fin;
                                                            const Turno_Ini1 = results[0].Turno_Ini;

                                                            const selectShiftAdviser3 = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`
                                                            connection.query(selectShiftAdviser3, [Documento_Recibe, Dia_Descanso_Actual], (error, resultado) => {
                                                                connection.release();
                                                                if (error) throw error;

                                                                if (resultado.length === 0) {
                                                                    return callback(`El ejecutivo '${Documento_Recibe}' no tiene turnos cargados`);
                                                                } else {
                                                                    const Des_1_Fin2 = resultado[0].Des_1_Fin;
                                                                    const Des_1_Ini2 = resultado[0].Des_1_Ini;
                                                                    const Des_2_Fin2 = resultado[0].Des_2_Fin;
                                                                    const Des_2_Ini2 = resultado[0].Des_2_Ini;
                                                                    const Des_3_Fin2 = resultado[0].Des_3_Fin;
                                                                    const Des_3_Ini2 = resultado[0].Des_3_Ini;
                                                                    const Dialogo_Fin2 = resultado[0].Dialogo_Fin;
                                                                    const Dialogo_Ini2 = resultado[0].Dialogo_Ini;
                                                                    // const Documento_Recibe = resultado[0].Documento;
                                                                    const Fecha2 = resultado[0].Fecha;
                                                                    const Horas_Laboradas2 = resultado[0].Horas_Laboradas;
                                                                    const Lac_Fin2 = resultado[0].Lac_Fin;
                                                                    const Lac_Ini2 = resultado[0].Lac_Ini;
                                                                    const Lunch_Fin2 = resultado[0].Lunch_Fin;
                                                                    const Lunch_Ini2 = resultado[0].Lunch_Ini;
                                                                    const Novedad2 = resultado[0].Novedad;
                                                                    const Servicio2 = resultado[0].Servicio;
                                                                    const Training_1_Fin2 = resultado[0].Training_1_Fin;
                                                                    const Training_1_Ini2 = resultado[0].Training_1_Ini;
                                                                    const Training_2_Fin2 = resultado[0].Training_2_Fin;
                                                                    const Training_2_Ini2 = resultado[0].Training_2_Ini;
                                                                    const Turno_Fin2 = resultado[0].Turno_Fin;
                                                                    const Turno_Ini2 = resultado[0].Turno_Ini;

                                                                    const selectShiftAdviser4 = `SELECT * FROM T_Shifts WHERE Documento = ? AND Fecha = ?`
                                                                    connection.query(selectShiftAdviser4, [Documento_Recibe, Dia_Descanso_Futuro], (error, resultados) => {
                                                                        connection.release();
                                                                        if (error) throw error;
                                                                        if (resultados.length === 0) {
                                                                            return callback(`El ejecutivo '${Documento_Recibe}' no tiene turnos cargados`);
                                                                        } else {

                                                                            const Des_1_Fin3 = resultados[0].Des_1_Fin;
                                                                            const Des_1_Ini3 = resultados[0].Des_1_Ini;
                                                                            const Des_2_Fin3 = resultados[0].Des_2_Fin;
                                                                            const Des_2_Ini3 = resultados[0].Des_2_Ini;
                                                                            const Des_3_Fin3 = resultados[0].Des_3_Fin;
                                                                            const Des_3_Ini3 = resultados[0].Des_3_Ini;
                                                                            const Dialogo_Fin3 = resultados[0].Dialogo_Fin;
                                                                            const Dialogo_Ini3 = resultados[0].Dialogo_Ini;
                                                                            // const Documento3 = resultados[0].Documento;
                                                                            const Fecha3 = resultados[0].Fecha;
                                                                            const Horas_Laboradas3 = resultados[0].Horas_Laboradas;
                                                                            const Lac_Fin3 = resultados[0].Lac_Fin;
                                                                            const Lac_Ini3 = resultados[0].Lac_Ini;
                                                                            const Lunch_Fin3 = resultados[0].Lunch_Fin;
                                                                            const Lunch_Ini3 = resultados[0].Lunch_Ini;
                                                                            const Novedad3 = resultados[0].Novedad;
                                                                            const Servicio3 = resultados[0].Servicio;
                                                                            const Training_1_Fin3 = resultados[0].Training_1_Fin;
                                                                            const Training_1_Ini3 = resultados[0].Training_1_Ini;
                                                                            const Training_2_Fin3 = resultados[0].Training_2_Fin;
                                                                            const Training_2_Ini3 = resultados[0].Training_2_Ini;
                                                                            const Turno_Fin3 = resultados[0].Turno_Fin;
                                                                            const Turno_Ini3 = resultados[0].Turno_Ini;


                                                                            if (Horas_Laboradas === Horas_Laboradas2) {
                                                                                return callback('Los ejecutivos se encuentran en turnos el mismno día')
                                                                            } else if (Horas_Laboradas1 === Horas_Laboradas3) {
                                                                                return callback('Los ejecutivos se encuentran en turnos el mismno día')
                                                                            }



                                                                            const UPDATE = `UPDATE T_Shifts SET  
                                                                            Des_1_Fin = '${Des_1_Fin}',
                                                                            Des_1_Ini = '${Des_1_Ini}',
                                                                            Des_2_Fin = '${Des_2_Fin}',
                                                                            Des_2_Ini = '${Des_2_Ini}',
                                                                            Des_3_Fin = '${Des_3_Fin}',
                                                                            Des_3_Ini = '${Des_3_Ini}',
                                                                            Dialogo_Fin = '${Dialogo_Fin}',
                                                                            Dialogo_Ini = '${Dialogo_Ini}',
                                                                            Fecha = '${Fecha}',
                                                                            Horas_Laboradas = '${Horas_Laboradas}',
                                                                            Lac_Fin = '${Lac_Fin}',
                                                                            Lac_Ini = '${Lac_Ini}',
                                                                            Lunch_Fin = '${Lunch_Fin}',
                                                                            Lunch_Ini = '${Lunch_Ini}',
                                                                            Novedad = '${Novedad}',
                                                                            Servicio = '${Servicio}',
                                                                            Training_1_Fin = '${Training_1_Fin}',
                                                                            Training_1_Ini = '${Training_1_Ini}',
                                                                            Training_2_Fin = '${Training_2_Fin}',
                                                                            Training_2_Ini = '${Training_2_Ini}',
                                                                            Turno_Fin = '${Turno_Fin}',
                                                                            Turno_Ini = '${Turno_Ini}'
                                                                            WHERE Documento = '${Documento_Recibe}' AND Fecha = '${Dia_Descanso_Actual}' `;
                                                                            connection.query(UPDATE, (err) => {
                                                                                connection.release();
                                                                                if (err) {
                                                                                    return callback(err);
                                                                                } else {
                                                                                    const UPDATE1 = `UPDATE T_Shifts SET 
                                                                                    Des_1_Fin = '${Des_1_Fin1}',
                                                                                    Des_1_Ini = '${Des_1_Ini1}',
                                                                                    Des_2_Fin = '${Des_2_Fin1}',
                                                                                    Des_2_Ini = '${Des_2_Ini1}',
                                                                                    Des_3_Fin = '${Des_3_Fin1}',
                                                                                    Des_3_Ini = '${Des_3_Ini1}',
                                                                                    Dialogo_Fin = '${Dialogo_Fin1}',
                                                                                    Dialogo_Ini = '${Dialogo_Ini1}',
                                                                                    Fecha = '${Fecha1}',
                                                                                    Horas_Laboradas = '${Horas_Laboradas1}',
                                                                                    Lac_Fin = '${Lac_Fin1}',
                                                                                    Lac_Ini = '${Lac_Ini1}',
                                                                                    Lunch_Fin = '${Lunch_Fin1}',
                                                                                    Lunch_Ini = '${Lunch_Ini1}',
                                                                                    Novedad = '${Novedad1}',
                                                                                    Servicio = '${Servicio1}',
                                                                                    Training_1_Fin = '${Training_1_Fin1}',
                                                                                    Training_1_Ini = '${Training_1_Ini1}',
                                                                                    Training_2_Fin = '${Training_2_Fin1}',
                                                                                    Training_2_Ini = '${Training_2_Ini1}',
                                                                                    Turno_Fin = '${Turno_Fin1}',
                                                                                    Turno_Ini = '${Turno_Ini1}'
                                                                                    WHERE Documento = '${Documento_Recibe}' AND Fecha = '${Dia_Descanso_Futuro}' `;
                                                                                    connection.query(UPDATE1, (err) => {
                                                                                        connection.release();
                                                                                        if (err) {
                                                                                            return callback(err);
                                                                                        } else {
                                                                                            const UPDATE2 = `UPDATE T_Shifts SET 
                                                                                            Des_1_Fin = '${Des_1_Fin2}',
                                                                                            Des_1_Ini = '${Des_1_Ini2}',
                                                                                            Des_2_Fin = '${Des_2_Fin2}',
                                                                                            Des_2_Ini = '${Des_2_Ini2}',
                                                                                            Des_3_Fin = '${Des_3_Fin2}',
                                                                                            Des_3_Ini = '${Des_3_Ini2}',
                                                                                            Dialogo_Fin = '${Dialogo_Fin2}',
                                                                                            Dialogo_Ini = '${Dialogo_Ini2}',
                                                                                            Fecha = '${Fecha2}',
                                                                                            Horas_Laboradas = '${Horas_Laboradas2}',
                                                                                            Lac_Fin = '${Lac_Fin2}',
                                                                                            Lac_Ini = '${Lac_Ini2}',
                                                                                            Lunch_Fin = '${Lunch_Fin2}',
                                                                                            Lunch_Ini = '${Lunch_Ini2}',
                                                                                            Novedad = '${Novedad2}',
                                                                                            Servicio = '${Servicio2}',
                                                                                            Training_1_Fin = '${Training_1_Fin2}',
                                                                                            Training_1_Ini = '${Training_1_Ini2}',
                                                                                            Training_2_Fin = '${Training_2_Fin2}',
                                                                                            Training_2_Ini = '${Training_2_Ini2}',
                                                                                            Turno_Fin = '${Turno_Fin2}',
                                                                                            Turno_Ini = '${Turno_Ini2}'
                                                                                            WHERE Documento = '${Documento_Envia}' AND Fecha = '${Dia_Descanso_Actual}' `;
                                                                                            connection.query(UPDATE2, (err) => {
                                                                                                connection.release();
                                                                                                if (err) {
                                                                                                    return callback(err);
                                                                                                } else {
                                                                                                    const UPDATE3 = `UPDATE T_Shifts SET 
                                                                                                    Des_1_Fin = '${Des_1_Fin3}',
                                                                                                    Des_1_Ini = '${Des_1_Ini3}',
                                                                                                    Des_2_Fin = '${Des_2_Fin3}',
                                                                                                    Des_2_Ini = '${Des_2_Ini3}',
                                                                                                    Des_3_Fin = '${Des_3_Fin3}',
                                                                                                    Des_3_Ini = '${Des_3_Ini3}',
                                                                                                    Dialogo_Fin = '${Dialogo_Fin3}',
                                                                                                    Dialogo_Ini = '${Dialogo_Ini3}',
                                                                                                    Fecha = '${Fecha3}',
                                                                                                    Horas_Laboradas = '${Horas_Laboradas3}',
                                                                                                    Lac_Fin = '${Lac_Fin3}',
                                                                                                    Lac_Ini = '${Lac_Ini3}',
                                                                                                    Lunch_Fin = '${Lunch_Fin3}',
                                                                                                    Lunch_Ini = '${Lunch_Ini3}',
                                                                                                    Novedad = '${Novedad3}',
                                                                                                    Servicio = '${Servicio3}',
                                                                                                    Training_1_Fin = '${Training_1_Fin3}',
                                                                                                    Training_1_Ini = '${Training_1_Ini3}',
                                                                                                    Training_2_Fin = '${Training_2_Fin3}',
                                                                                                    Training_2_Ini = '${Training_2_Ini3}',
                                                                                                    Turno_Fin = '${Turno_Fin3}',
                                                                                                    Turno_Ini = '${Turno_Ini3}'
                                                                                                    WHERE Documento = '${Documento_Envia}' AND Fecha = '${Dia_Descanso_Futuro}' `;
                                                                                                    connection.query(UPDATE3, (err) => {
                                                                                                        connection.release();
                                                                                                        if (err) {
                                                                                                            return callback(err)
                                                                                                        } else {
                                                                                                            return callback('Cambio día descanso realizado con exito')
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }

                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        });
                                        callback(`${results.affectedRows} messages rejected`);
                                    }

                                });
                            }
                        });
                    } else {
                        callback('No se cumple la condición para actualizar');
                    }
                }
            });

        }
        catch (error) {
            callback('Error en el servidor');
        }
    })
}


function scheduleAutomaticRejection() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    setTimeout(() => {
        rejectMessages();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}
scheduleAutomaticRejection();
module.exports = AuthomatlyAcceptShifts;
