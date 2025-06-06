import { Almaverso } from '../BDconfig';

const mysql = require('mysql2');
const express = require('express');
const { authenticateToken } = require("../Auth/AuthMiddleware");
const Survey = express.Router();
const cors = require('cors');

Survey.use(cors());
Survey.use(express.json());
Survey.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);

Survey.get('/API/SELECTSURVEY/V1/:Usuario_Red', authenticateToken, (req, res) => {
    const Usuario_Red = req.params.Usuario_Red;

    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT Usuario_Red FROM T_Survey WHERE Usuario_Red = '${Usuario_Red}'`
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    res.status(500).send('Error en el servidor')
                } else if (result.length > 0) {
                    res.status(200).send({ Respondio: false })
                } else {
                    res.status(200).send({ Respondio: true })
                }
            });
        }
        catch (error) {
            res.status(500).send('Hubo un error')
        }
    });
});

Survey.post('/API/SERVEY', authenticateToken, (req, res) => {

    const Documento = req.body.Documento;
    const Usuario_Red = req.body.Usuario_Red;
    const Nombre_Completo = req.body.Nombre_Completo;
    const Cargo = req.body.Cargo;
    const Servicio = req.body.Servicio;
    const Cliente = req.body.Cliente;
    const Sede = req.body.Sede;
    const Pregunta_1 = req.body.Pregunta_1;
    const Respuesta_1 = req.body.Respuesta_1;
    const Pregunta_2 = req.body.Pregunta_2;
    const Respuesta_2 = req.body.Respuesta_2;
    const Pregunta_3 = req.body.Pregunta_3;
    const Respuesta_3 = req.body.Respuesta_3;
    const Pregunta_4 = req.body.Pregunta_4;
    const Respuesta_4 = req.body.Respuesta_4;

    const value = new Date();
    var Fecha_Respuesta = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    var Hora_Respuesta = value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();


    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `INSERT INTO T_Survey (Documento, Usuario_Red, Nombre_Completo, Cargo, Servicio, Cliente, Sede, Fecha_Respuesta, Hora_Respuesta, Pregunta_1, Respuesta_1, Pregunta_2, Respuesta_2, Pregunta_3, Respuesta_3, Pregunta_4, Respuesta_4 ) VALUES (
                '${Documento}',
                '${Usuario_Red}',
                '${Nombre_Completo}',
                '${Cargo}',
                '${Servicio}',
                '${Cliente}',
                '${Sede}',
                '${Fecha_Respuesta}',
                '${Hora_Respuesta}',
                '${Pregunta_1}',
                '${Respuesta_1}',
                '${Pregunta_2}',
                '${Respuesta_2}',
                '${Pregunta_3}',
                '${Respuesta_3}',
                '${Pregunta_4}',
                '${Respuesta_4}'
            )`
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    res.status(400).send('No se pudo guardar el registro');
                } else {
                    res.status(200).send('Gracias por tu respuesta');
                }
            });
        }
        catch (error) {
            res.send('Hubo un error')
        }
    });
})

module.exports = Survey