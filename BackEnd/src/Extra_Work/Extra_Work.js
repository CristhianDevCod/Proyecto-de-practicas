import { authenticateToken } from '../Auth/AuthMiddleware';
import { Almaverso } from '../BDconfig';

//COMENTARIO PRUEBA
const mysql = require('mysql2');
const express = require('express');
const Extra_Work = express.Router();
const cors = require('cors');
// const AuthMiddleware = require('../Auth/AuthMiddleware');

Extra_Work.use(cors());
Extra_Work.use(express.json());
Extra_Work.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);

Extra_Work.post('/API/EXTRA-WORK/', authenticateToken, (req, res) => {

    const value = new Date();
    var Fecha = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    const Usuario_Red = req.body.Usuario_Red;
    const Documento = req.body.Documento;
    const Nombre_Completo = req.body.Nombre_Completo;
    const Cargo = req.body.Cargo;
    const Servicio = req.body.Servicio;
    const Cliente_Area = req.body.Cliente_Area;
    const Sede = req.body.Sede;
    const Correo_Personal = req.body.Correo_Personal;
    const Numero_Telefono = req.body.Numero_Telefono;
    const Respuesta = req.body.Respuesta;



    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `
            INSERT INTO Almaverso_Antares.Extra_Work 
            (Fecha, Usuario_Red, Documento, Nombre_Completo, Cargo, Servicio, Cliente_Area, Sede, Correo_Personal, Numero_Telefono, Respuesta) 
            VALUES (
            '${Fecha}', 
            '${Usuario_Red}', 
            '${Documento}', 
            '${Nombre_Completo}', 
            '${Cargo}', 
            '${Servicio}', 
            '${Cliente_Area}', 
            '${Sede}', 
            '${Correo_Personal}', 
            '${Numero_Telefono}', 
            '${Respuesta}')`
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    return res.status(400).send('No se pudo guardar la encuesta');
                } else {
                    return res.status(200).send('Gracias por participar');
                }
            });
        }
        catch (error) {
            return res.send('Hubo un error')
        }
    });
})

Extra_Work.get('/API/VERIFY-EXTRA-WORK/:Usuario_Red', authenticateToken, (req, res) => {
    const Usuario_Red = req.params.Usuario_Red;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor extra_work');
        }
        try {
            const sql = `SELECT Documento FROM Almaverso_Antares.Extra_Work WHERE Usuario_Red = '${Usuario_Red}'`
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

module.exports = Extra_Work