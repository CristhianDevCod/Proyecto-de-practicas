const { Almaverso, Sociodemographic } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const AuthomatlyRejectShift = express();
const cors = require('cors');
AuthomatlyRejectShift.use(cors());
AuthomatlyRejectShift.use(express.json());
AuthomatlyRejectShift.use(express.urlencoded({ extended: false }));

const poolAlmaverso = mysql.createPool(Almaverso);
const poolSocio = mysql.createPool(Sociodemographic);
//atrapar las respuestas
const callback = () => { };

// Función para actualizar los registros en la tabla turnos en caso tal un asesor tenia turnos cargado y se encuentra en estado de retiro 
const actualizarRegistros = (fechaFormateada, documento) => {
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            callback(null, err);
        }
        try {

            const sql = `DELETE FROM  Almaverso_Antares.T_Shifts  WHERE Fecha > ? AND Documento = ?`
            connection.query(sql, [fechaFormateada, documento], (err, results) => {
                connection.release();
                if (err) {
                    callback(null, err);
                } else if (results.length === 0) {
                    callback(null);
                } else {
                    console.log(`Turnos actualizados a retiro para el documento '${documento}'`);
                    callback(null, results);
                }
            });
        } catch (error) {
            callback(null, error);
        }
    });
};

// Función para formatear una fecha en el formato "YYYY-MM-DD"
const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Función principal que realiza las operaciones
const procesarRetiros = () => {
    poolSocio.getConnection((err, connection) => {
        if (err) {
            callback(null, err);
        }
        const sql = `SELECT Documento, Fecha_Aplicacion_Retiro FROM T_Socio WHERE Estado_Empleado = 'Retiro' AND DATE_FORMAT(Fecha_Corte, '%Y-%m-%d') >= '2024-12-31' AND   Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Estado_Empleado = 'Retiro' AND DATE_FORMAT(Fecha_Corte, '%Y-%m-%d') >= '2024-12-31')`;
        connection.query(sql, (err, results) => {
            connection.release();
            if (err) {
                callback(null, err);
            } else if (results.length === 0) {
                callback(null);
            } else {
                // Para cada registro de retiro, actualiza los registros en la tabla turnos
                results.forEach((row) => {
                    const fechaRetiro = row.Fecha_Aplicacion_Retiro;
                    const documento = row.Documento;
                    const fechaFormateada = formatearFecha(fechaRetiro);
                    actualizarRegistros(fechaFormateada, documento);
                });
            }
        }
        );
    });
};

function scheduleAutomaticRejection() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    // const millisecondsUntilMidnight = 1000;

    setTimeout(() => {
        procesarRetiros();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}
scheduleAutomaticRejection();

module.exports = AuthomatlyRejectShift;