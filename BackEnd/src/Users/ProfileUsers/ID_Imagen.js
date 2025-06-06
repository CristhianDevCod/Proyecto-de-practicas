const { Sociodemographic } = require('../../BDconfig');

const mysql = require('mysql2');
const express = require('express');
const ID_Imagen = express.Router();
const cors = require('cors');
const { authenticateToken } = require('../../Auth/AuthMiddleware');
ID_Imagen.use(cors());
ID_Imagen.use(express.json());
ID_Imagen.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Sociodemographic)

ID_Imagen.post('/API/ID_Img/:Usuario_Red', authenticateToken, (req, res) => {
    const Usuario_Red = req.params.Usuario_Red;
    const ID_Imagen = req.body.ID_Imagen;  

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const sql = `UPDATE T_Socio SET ID_Imagen = ? WHERE Usuario_Red = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Usuario_Red = ?)`;
            connection.query(sql, [ID_Imagen, Usuario_Red, Usuario_Red], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error al actualizar el ID de imagen');
                }

                if (result.affectedRows > 0) {
                    res.status(200).send('Avatar actualizado Correctamente!');
                } else {
                    res.status(400).send('No se pudo actualizar tu perfil de Antares');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});



module.exports = ID_Imagen;
