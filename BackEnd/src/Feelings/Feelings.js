import { authenticateToken } from '../Auth/AuthMiddleware';
import { Almaverso } from '../BDconfig';

//COMENTARIO PRUEBA
const mysql = require('mysql2');
const express = require('express');
const feeling = express.Router();
const cors = require('cors');
// const AuthMiddleware = require('../Auth/AuthMiddleware');

feeling.use(cors());
feeling.use(express.json());
feeling.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);

feeling.post('/API/FEELING', authenticateToken, (req, res) => {
    const Usuario_Red = req.body.Usuario_Red;
    const Documento = req.body.Documento;
    const Nombre = req.body.Nombre;
    const Cargo = req.body.Cargo;
    const Cliente = req.body.Cliente;
    const Servicio = req.body.Servicio;
    const Jefe_Inmediato = req.body.Jefe_Inmediato;

    const Sentimiento = req.body.Sentimiento;
    const Comentario = req.body.Comentario;

    const value = new Date();
    var date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    var time = value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();


    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `INSERT INTO T_Feeling (Fecha, Hora, Usuario_Red, Documento, Nombre, Cargo, Cliente, Servicio, Jefe_Inmediato, Sentimiento, Comentario ) VALUES ('${date}', '${time}', '${Usuario_Red}', '${Documento}', '${Nombre}', '${Cargo}', '${Cliente}', '${Servicio}', '${Jefe_Inmediato}', '${Sentimiento}', '${Comentario}')`
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    return res.status(400).send('No se pudo guardar el sentimiento');
                } else {
                    return res.status(200).send('Sentimiento guardado');
                }
            });
        }
        catch (error) {
            return res.send('Hubo un error')
        }
    });
})

feeling.get('/API/SELECTMYFEELING/V1/:Usuario_Red', authenticateToken, (req, res) => {
    const Usuario_Red = req.params.Usuario_Red;
    const value = new Date();
    var date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT Usuario_Red, Fecha FROM T_Feeling WHERE Usuario_Red = '${Usuario_Red}' AND Fecha = '${date}'`
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    return res.status(500).send('Error en el servidor')
                } else if (result.length > 0) {
                    return res.status(200).send({ Respondio: false })
                } else {
                    return res.status(200).send({ Respondio: true })
                }
            });
        }
        catch (error) {
            return res.status(500).send('Hubo un error')
        }
    });
});

module.exports = feeling