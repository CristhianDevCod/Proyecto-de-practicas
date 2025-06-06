import { authenticateToken } from '../Auth/AuthMiddleware';
import { Almaverso } from '../BDconfig';

const mysql = require('mysql2');
const express = require('express');
const ImgEveryDay = express.Router();
const cors = require('cors');

ImgEveryDay.use(cors());
ImgEveryDay.use(express.json());
ImgEveryDay.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
//hola 
ImgEveryDay.get('/API/IMGEVERYDAY/V1/:Usuario_Red', authenticateToken, (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            const Usuario_Red = req.params.Usuario_Red;
            const value = new Date();
            var date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();

            const sql = `SELECT * FROM T_Img_Every_Day WHERE Usuario_Red = '${Usuario_Red}' AND Fecha_Visto = '${date}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
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

ImgEveryDay.post('/API/IMGEVERYDAY/', authenticateToken, (req, res) => {

    const Documento = req.body.Documento;
    const Usuario_Red = req.body.Usuario_Red;
    const Nombre_Completo = req.body.Nombre_Completo;
    const Cargo = req.body.Cargo;
    const Servicio = req.body.Servicio;
    const Cliente = req.body.Cliente;
    const Sede = req.body.Sede;

    const value = new Date();
    var Fecha_Visto = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    var Hora_Visto = value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();


    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `INSERT INTO T_Img_Every_Day (Documento, Usuario_Red, Nombre_Completo, Cargo, Servicio, Cliente, Sede, Fecha_Visto, Hora_Visto) VALUES (
                '${Documento}',
                '${Usuario_Red}',
                '${Nombre_Completo}',
                '${Cargo}',
                '${Servicio}',
                '${Cliente}',
                '${Sede}',
                '${Fecha_Visto}',
                '${Hora_Visto}'
            )`
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    res.status(400).send('No se pudo guardar el registro');
                } else {
                    res.status(200).send('Gracias por tu visita');
                }
            });
        }
        catch (error) {
            res.send('Hubo un error')
        }
    });
})

module.exports = ImgEveryDay