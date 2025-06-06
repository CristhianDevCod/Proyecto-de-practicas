const { PORT_NOTIFICATIONS_SUERVEY, HOST } = require('../Port-And-Host/Port-And-Host');
const { Almaverso, Sociodemographic } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const AlmaSurvey = express();
const server = require('http').createServer(AlmaSurvey);
const cors = require('cors');

AlmaSurvey.use(cors());

const pool = mysql.createPool(Almaverso);
const poolSocio = mysql.createPool(Sociodemographic);

// Socket.IO con soporte para CORS
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const users = {};

// Función para verificar si el usuario es válido
function isValidUser(user) {
    return !!user;
}

// Obtener los datos del usuario
function getUserFromUser(user) {
    return { id: user.id, username: user.username };
}

// Obtener el socket del usuario basado en el ID
function getUserSocket(userId) {
    const user = users[userId];
    return user ? io.sockets.sockets.get(user.socketId) : null;
}

// Función para consultar encuestas del usuario
function GetFormAlmaSurvey(Usuario_Red) {
    return new Promise((resolve, reject) => {
        poolSocio.getConnection((error, connection) => {
            try {
                if (error) {
                    reject(error);
                } else {

                    const sql = `SELECT Documento FROM T_Socio WHERE Usuario_Red = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Usuario_Red = ?)`;
                    connection.query(sql, [Usuario_Red, Usuario_Red], (err, result) => {
                        if (err) {
                            reject(err);
                        } else if (result.length === 0) {
                            reject('No se encontraron encuestas para el usuario');
                        } else {

                            pool.getConnection((error2, connection2) => {
                                if (error2) {
                                    reject(error2);
                                } else {
                                    const sql2 = `SELECT * FROM Almaverso_Antares.T_Forms_Alma_survey WHERE Documento = ? AND estado = 1`;
                                    const Documento = Array.isArray(result) && result.map((d) => d.Documento);

                                    connection2.query(sql2, [Documento], (err, result2) => {
                                        connection.release();
                                        connection2.release();
                                        if (err) {

                                            reject(err);
                                            connection.release();
                                            connection2.release();
                                        } else if (result.length === 0) {
                                            reject('No se encontraron encuestas para el usuario');
                                            connection.release();
                                            connection2.release();
                                        } else {
                                            resolve(result2);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    });
}

// Función para consultar encuestas periódicamente
function pollForChanges(Usuario_Red) {
    // setInterval(() => {
        GetFormAlmaSurvey(Usuario_Red)
            .then((result) => {
                const UserSocket = getUserSocket(Usuario_Red);
                if (UserSocket && result.length > 0) {
                    const notification = {
                        // message: `Tiene una nueva encuesta: ${nombre_encuesta} por responder en almasurvey`,
                        data: result
                    };
                    UserSocket.emit('getNotificationAlmasurvey', notification);
                }
            })
            .catch((error) => {
                console.log('Error al obtener encuestas:', error);
            });
    // }, 15000);
}

// Límite de escuchas en los sockets
io.sockets.setMaxListeners(Infinity);

// Manejo de conexiones de socket
io.on('connection', (socket) => {
    const user = socket.handshake.auth.user;

    if (isValidUser(user)) {
        const userData = getUserFromUser(user);

        // Si el usuario no existe, agregarlo
        if (!users[userData.username]) {
            users[userData.username] = {
                socketId: socket.id,
                username: userData.username,
                pendingMessages: []
            };
        } else {
            users[userData.username].socketId = socket.id;
        }

        // Iniciar la consulta periódica de encuestas para el usuario
        pollForChanges(userData.username);

        // Manejar la desconexión del usuario
        socket.on('disconnect', () => {
            delete users[userData.username];
        });

        // Manejar la notificación de encuestas
        socket.on('AlmaSurvey', () => {
            const UserSocket = getUserSocket(userData.username);
            if (UserSocket) {
                const notification = {
                    message: 'Tienes encuestas pendientes'
                };
                UserSocket.emit('getNotificationAlmasurvey', notification);
            }
        });

        // Si el usuario tiene mensajes pendientes, enviarlos
        if (users[userData.username].pendingMessages.length > 0) {
            const pendingMessages = users[userData.username].pendingMessages;
            users[userData.username].pendingMessages = []; // Limpiar los mensajes pendientes
            const receiverSocket = getUserSocket(userData.username);
            pendingMessages.forEach(() => {
                const notification = {
                    message: 'Tienes una nueva notificación'
                };
                receiverSocket.emit('getNotificationAlmasurvey', notification);
            });
        }
    }
});

// Iniciar el servidor
server.listen(PORT_NOTIFICATIONS_SUERVEY, HOST);

module.exports = AlmaSurvey;
