const { Almaverso } = require('../BDconfig');
const express = require('express');
const RejectHourExtra = express();
const cors = require('cors');
const mysql = require('mysql2');


RejectHourExtra.use(cors());
RejectHourExtra.use(express.json());
RejectHourExtra.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
const callback = () => { };
//RECHAZA LAS HORAS EXTRAS QUE HAN SIDO EXPIRADAS
function rejectHoursExtra() {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, err)
        }

        try {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const now = `${year}-${month}-${day}`;

            var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            const updateQuery = `UPDATE T_Generate_Hours_Extra SET 
            Fecha_Aprobador = '${now}',
            Hora_Aprobador = '${time}',
            Nombre_Aprobador = 'Sistema',
            Observaciones = 'No respondido',
            Estado = 'Cancelado'
            WHERE 
            Fecha_Aprobador IS NULL AND
            Hora_Aprobador IS NULL AND
            Nombre_Aprobador IS NULL AND
            Documento_Aprobador IS NULL AND 
            Estado IS NULL AND
            Fecha_Solicitud <= '${now}'
            `;
            connection.query(updateQuery, (error, results) => {
                connection.release();
                if (error) {
                    console.log(error);
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
        rejectHoursExtra();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}

scheduleAutomaticRejection();

module.exports = RejectHourExtra;