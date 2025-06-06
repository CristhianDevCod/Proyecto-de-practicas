const { Almaverso } = require('../BDconfig');
const mysql = require('mysql2');
const { authenticateToken } = require("../Auth/AuthMiddleware");
const express = require('express');
const Logs = express.Router();
const cors = require('cors');
const moment = require('moment');

Logs.use(cors());
Logs.use(express.json());
Logs.use(express.urlencoded({ extended: false }));



const pool = mysql.createPool(Almaverso)
const Dia_Anterior = moment().subtract(1, 'days').format('YYYY-MM-DD');


// Middleware para el registro de logs
Logs.put('/API/SEND/LOGS', authenticateToken, async (req, res, next) => {

    const { Accion_Realizada, Fecha_Logueo, Fecha_Visita_Modulo, Hora_Logueo, Hora_Visita_Modulo, Modulo_Visitado, Submodulo_Visitado, Usuario_Red, file } = req.body;

    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const files = Buffer.from(file, 'base64');

                const sql = 'INSERT INTO T_Logs (Accion_Realizada, Fecha_Logueo, Fecha_Visita_Modulo, Hora_Logueo, Hora_Visita_Modulo, Modulo_Visitado, Submodulo_Visitado, Usuario_Red, file ) VALUES(?)';
                const VALUES = [Accion_Realizada, Fecha_Logueo, Fecha_Visita_Modulo, Hora_Logueo, Hora_Visita_Modulo, Modulo_Visitado, Submodulo_Visitado, Usuario_Red, files];

                connection.query(sql, [VALUES], (err, results) => {
                    connection.release(); // Asegúrate de liberar la conexión después de cada consulta

                    if (err) {
                        console.log(err);
                        return reject('Error al insertar en la tabla de logs');
                    } else if (results.length === 0) {
                        return reject('No se pudo insertar el log');
                    } else {
                        resolve('Log insertado correctamente!');
                    }
                });
            });
        });

        const result = await Query();

        if (!result) {
            return res.status(404).send('No se pudo insertar el log');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});


Logs.get('/API/GET/LIST-LOGS/', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error en el servidor')
                }
                const sql = `SELECT * FROM Almaverso_Antares.T_Logs WHERE Fecha_Logueo >= '${Dia_Anterior}'`
                connection.query(sql, (err, result) => {
                    connection.release();
                    if (err) {
                        return reject('Error en el servidor');
                    } else if (result.length === 0) {
                        return reject('No hay resultados');
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

module.exports = Logs;
