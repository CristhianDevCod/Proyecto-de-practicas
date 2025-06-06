const {
    Almaverso,
    // Almaverso2,
    // TESTNOTIFICATIONS
} = require('../BDconfig');
const express = require('express');
const UnreadMessages = express();
const cors = require('cors');
const mysql = require('mysql2');
const { authenticateToken } = require('../Auth/AuthMiddleware');

UnreadMessages.use(cors());

const pool = mysql.createPool(
    Almaverso
    // TESTNOTIFICATIONS
);
// Punto final para obtener mensajes no leídos
UnreadMessages.get('/API/UNREAD-MESSAGES', authenticateToken, (req, res) => {
    // Aquí obtén los mensajes no leídos para el usuario actual desde la base de datos
    const userId = req.query.userId; // El ID del usuario desde la solicitud GET
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Usuario_Red_Recibe = ? AND Respuesta_Recibe IS NULL`;
            connection.query(sql, [userId], (error, results) => {
                connection.release();
                if (error) {
                    res.status(500).send({ error: 'Error interno del servidor' });
                } else if (results.length === 0) {
                    res.status(200).send({ error: 'No tienes mensajes pendientes' });
                } else {
                    const unreadMessages = results[0].Respuesta_Recibe;
                    if (unreadMessages === null) {
                        return res.status(200).send(results); // Enviar los mensajes no leídos como respuesta
                    }
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });
});

UnreadMessages.get('/API/UNREAD-MESSAGES/SUPERVISOR/OF-COORDINADOR/:userId', authenticateToken, (req, res) => {
    const userId = req.params.userId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Documento_Coordinador_1 = ? AND Estado_Marcacion_Final IS NULL AND Respuesta_Recibe IS NOT NULL`
            connection.query(sql, [userId], (error, results) => {
                connection.release();
                if (error) {
                    res.status(500).send({ error: 'Error interno del servidor' });
                } else if (results.length > 0) {
                    return res.status(200).send(results); // Enviar los mensajes no leídos como respuesta
                } else {
                    return res.status(201).send('');
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });
});
UnreadMessages.get('/API/UNREAD-MESSAGES/SUPERVISOR/OF-COORDINADOR2/:userId', authenticateToken, (req, res) => {
    const userId = req.params.userId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Documento_Coordinador_2 = ? AND Estado_Marcacion_Final IS NULL AND Respuesta_Recibe IS NOT NULL`
            connection.query(sql, [userId], (error, results) => {
                connection.release();
                if (error) {
                    res.status(500).send({ error: 'Error interno del servidor' });
                } else if (results.length > 0) {
                    return res.status(200).send(results); // Enviar los mensajes no leídos como respuesta
                } else {
                    return res.status(201).send('');
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });
});

UnreadMessages.get('/API/UNREAD-MESSAGES/SUPERVISOR/:userId', authenticateToken, (req, res) => {
    const userId = req.params.userId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Documento_Jefe_Inmediato_Recibe = ? AND Estado_Marcacion_Final IS NULL AND Respuesta_Recibe IS NOT NULL`
            connection.query(sql, [userId], (error, results) => {
                connection.release();
                if (error) {
                    res.status(500).send({ error: 'Error interno del servidor' });
                } else if (results.length > 0) {
                    return res.status(200).send(results); // Enviar los mensajes no leídos como respuesta
                } else {
                    return res.status(201).send('');
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });
});
UnreadMessages.get('/API/UNREAD-MESSAGES/SUPERVISOR2/:userId', authenticateToken, (req, res) => {
    const userId = req.params.userId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        try {
            const sql = `SELECT * FROM T_Shifts_Notifications WHERE Documento_Jefe_Inmediato_Envia = ? AND Estado_Marcacion_Final IS NULL AND Respuesta_Recibe IS NOT NULL`
            connection.query(sql, [userId], (error, results) => {
                connection.release();
                if (error) {
                    res.status(500).send({ error: 'Error interno del servidor' });
                } else if (results.length === 0) {
                    res.status(200).send();
                } else {
                    return res.status(200).send(results); // Enviar los mensajes no leídos como respuesta
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });
});


module.exports = UnreadMessages;
