const { Almaverso } = require('../BDconfig');
const express = require('express');
const AuthomatlyReject = express();
const cors = require('cors');
const mysql = require('mysql2');


AuthomatlyReject.use(cors());
AuthomatlyReject.use(express.json());
AuthomatlyReject.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
const callback = () => { };


//RECHAZOS DE CAMBIOS DÍAS DE TRABAJO RESPUESTA RECIBE
//rechasa los cambios de turnos siempre y cuando se cumplan estas condiciones  Dia_Trabajo_Actual <= '${currentDate}' AND Respuesta_Recibe IS NULL AND Estado_Marcacion_Final IS NULL AND Dia_Descanso_Actual = '0' AND Dia_Descanso_Futuro = '0'
function rejectMessagesResponse() {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, err)
        }

        try {
            const value = new Date();
            const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
            const currentDate = new Date().toISOString().split('T')[0];
            const updateQuery = `UPDATE T_Shifts_Notifications SET 
            Fecha_Marcacion_Final = '${date}', 
            Hora_Marcacion_Final = '${time}', 
            Estado_Marcacion_Final = 'Rechazado', 
            Nombre_Aprobador_Final = 'Sistema', 
            Respuesta_Recibe = 'Rechazado'
            WHERE 
            Dia_Trabajo_Actual <= '${currentDate}' 
            AND Respuesta_Recibe IS NULL 
            AND Estado_Marcacion_Final IS NULL
            AND Dia_Descanso_Actual = '0'
            AND Dia_Descanso_Futuro = '0'
            `;
            connection.query(updateQuery, (error, results) => {
                connection.release();
                if (error) {
                    callback('Error rejecting messages:', error);
                } else if (results.length === 0) {
                    callback(null, 'Filas no afectadas')
                } else {
                    callback(`${results.affectedRows} messages rejected`);
                }
            });
        } catch (error) {
            callback(null);
        }
    });
}
//RECHAZOS DE CAMBIOS DÍAS DE TRABAJO SIN RESPUESTA RECIBE
//rechasa los cambios de turnos siempre y cuando se cumplan estas condiciones  Dia_Trabajo_Actual <= '${currentDate}' AND Estado_Marcacion_Final IS NULL AND Dia_Descanso_Actual = '0' AND Dia_Descanso_Futuro = '0'
function rejectMessagesNotResponse() {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, err)
        }

        try {
            const value = new Date();
            const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
            const currentDate = new Date().toISOString().split('T')[0];
            const updateQuery = `UPDATE T_Shifts_Notifications SET 
            Fecha_Marcacion_Final = '${date}', 
            Hora_Marcacion_Final = '${time}', 
            Estado_Marcacion_Final = 'Rechazado', 
            Nombre_Aprobador_Final = 'Sistema'
            WHERE 
            Dia_Trabajo_Actual <= '${currentDate}'
            AND Estado_Marcacion_Final IS NULL
            AND Dia_Descanso_Actual = '0'
            AND Dia_Descanso_Futuro = '0'
            `;
            connection.query(updateQuery, (error, results) => {
                connection.release();
                if (error) {
                    callback('Error rejecting messages:', error);
                } else if (results.length === 0) {
                    callback(null, 'Filas no afectadas')
                } else {
                    callback(`${results.affectedRows} messages rejected`);
                }
            });
        } catch (error) {
            callback(null);
        }
    });
}

//RECHAZOS DE CAMBIOS DÍAS DE DESCANSO RESPUESTA RECIBE
function rejectMessagesResponseDayRest() {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, err)
        }

        try {
            const value = new Date();
            const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
            const currentDate = new Date().toISOString().split('T')[0];
            const updateQuery = `UPDATE T_Shifts_Notifications SET Fecha_Marcacion_Final = '${date}', Hora_Marcacion_Final = '${time}', Estado_Marcacion_Final = 'Rechazado', Nombre_Aprobador_Final = 'Sistema', Respuesta_Recibe = 'Rechazado' WHERE (Dia_Descanso_Actual <= Dia_Descanso_Futuro AND Dia_Descanso_Actual <= '${currentDate}' OR Dia_Descanso_Futuro <= '${currentDate}') AND Dia_Trabajo_Actual = '0' AND Dia_Trabajo_Futuro = '0' AND Estado_Marcacion_Final IS NULL AND Respuesta_Recibe IS NULL`;
            connection.query(updateQuery, (error, results) => {
                connection.release();
                if (error) {
                    callback('Error rejecting messages:', error);
                } else if (results.length === 0) {
                    callback(null, 'Filas no afectadas')
                } else {
                    callback(`${results.affectedRows} messages rejected`);
                }
            });
        } catch (error) {
            callback(null);
        }
    });
}

//RECHAZOS DE CAMBIOS DÍAS DE DESCANSO SIN RESPUESTA RECIBE
function rejectMessagesNotResponseDayRest() {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, err)
        }

        try {
            const value = new Date();
            const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
            const currentDate = new Date().toISOString().split('T')[0];
            const updateQuery = `UPDATE T_Shifts_Notifications SET Fecha_Marcacion_Final = '${date}', Hora_Marcacion_Final = '${time}', Estado_Marcacion_Final = 'Rechazado', Nombre_Aprobador_Final = 'Sistema' WHERE (Dia_Descanso_Actual <= Dia_Descanso_Futuro AND Dia_Descanso_Actual <= '${currentDate}' OR Dia_Descanso_Futuro <= '${currentDate}') AND Dia_Trabajo_Actual = '0' AND Dia_Trabajo_Futuro = '0' AND Estado_Marcacion_Final IS NULL`;
            connection.query(updateQuery, (error, results) => {
                connection.release();
                if (error) {
                    callback('Error rejecting messages:', error);
                } else if (results.length === 0) {
                    callback(null, 'Filas no afectadas')
                } else {
                    callback(`${results.affectedRows} messages rejected`);
                }
            });
        } catch (error) {
            callback(null);
        }
    });
}







function scheduleAutomaticRejection() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    setTimeout(() => {
        rejectMessagesResponse();
        rejectMessagesNotResponse();
        rejectMessagesResponseDayRest();
        rejectMessagesNotResponseDayRest();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}

scheduleAutomaticRejection();

module.exports = AuthomatlyReject;
