const { PORT_NOTIFICATIONS_NOVELTIES, HOST } = require('../Port-And-Host/Port-And-Host');
const {
    //EVENTO DE GUARDADO DESDE QUE SE ENVIA LA SAOLICITUD
    SaveNotificationNoveltie,
    //RECHAZA LA SOLICITUD POR EL los analistas
    RejectNotificationNoveltieWfm,
    //RECHAZA LA SOLICITUD POR LOS DE NOMINA
    RejectNotificationNoveltieEND,







    //ACTUALIZA LA NOTFICACION POR EL JEFE INMEDIATO ACEPTADO
    SaveNotificationNoveltieWFM,
    //RECHAZA LA SOLICITUD POR EL JEFEINMEDIATO
    RejectNotificationNoveltieBoss,





    //RECHAZA LA SOLICITUD POR LOS GERENTES
    RejectNotificationNoveltieManager,
    //ACTUALIZA LA NOTFICACION POR LOS DE NOMINA
    SaveAcceptNotificationNoveltieEND,
    SaveAcceptNotificationNoveltieENDCAL,
    //ACTUALIZA LA NOTFICACION POR LOS ANALISTAS ACEPTADO
    SaveAcceptNotificationNoveltieWFM,
    //ACTUALIZA LA NOTFICACION POR LOS GERENTES ACEPTADO
    SaveAcceptNotificationNoveltieManager,

    SaveNotificationNoveltieWFMStaff,
    RejectNotificationNoveltieBossStaff,


    //FUNCIONES PARA HORAS EXTRAS
    SaveNotificationHoursExtra,
    AcceptNotificationHoursExtra,
    RejectNotificationHoursExtra,
    cancelNotificationHoursExtra,

    SaveNotificationForSupervisorForAdviser,
    SaveAcceptNotificationNoveltieBoss
} = require('./Services/MicroServices')
const express = require('express');
const sendNotification = express();
const server = require('http').createServer(sendNotification);
const cors = require('cors');
const crypto = require('crypto')

sendNotification.use(cors());


// con esta funcion admite cualquier origen
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const users = {};

function isValidUser(user) {
    if (!user) {
        return false;
    } else {
        return true;
    }
};

function getUserFromUser(user) {
    return { id: user.id, username: user.username };
};

function getUserSocket(userId) {
    const user = users[userId];
    if (user) {
        return io.sockets.sockets.get(user.socketId);
    }
    return null;
};

//función crypto que proporciona Node.js para generar valores hash
function generateUniqueId() {
    const currentTimestamp = new Date().getTime().toString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha1').update(currentTimestamp + randomBytes).digest('hex');
    return hash;
}

const callback = () => { };
const receiverMessage = 'getNotificationMessage';
io.sockets.setMaxListeners(Infinity);

io.on('connection', (socket) => {
    const user = socket.handshake.auth.user;

    if (isValidUser(user)) {
        const userData = getUserFromUser(user);

        if (!users[userData.username]) {
            users[userData.username] = {
                socketId: socket.id,
                username: userData.username,
                pendingMessages: []
            };
        } else {
            users[userData.username].socketId = socket.id;
        }

        //TODO: enviamos la solicitud de asesor a jefe inmediato 
        socket.on('sendNotificationNovelties', ({
            Codigo,
            Fecha_Solicitud,
            Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio,
            Tipo_Solicitud,
            Fecha_Inicio_Novedad,
            Fecha_Fin_Novedad,
            Dias_Calendario,
            Dias_Laborales,
            Motivo,

            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,


            Documento_Jefe_Inmediato,
            Usuario_Red_Jefe_Inmediato,
            Jefe_Inmediato
        }) => {
            const Id_Notificacion = generateUniqueId();
            const receiverSocket = getUserSocket(Usuario_Red_Jefe_Inmediato);
            if (receiverSocket) {
                const notification = {
                    Codigo,
                    Id: Id_Notificacion,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato
                };
                receiverSocket.emit(receiverMessage, notification);
                SaveNotificationNoveltie(
                    Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,

                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,

                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } else {
                //si el usuario no esta conectado el mensaje se guarda como pendiente
                const pendingMessage = {
                    Id: Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato
                };


                SaveNotificationNoveltie(
                    Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
                if (users[Usuario_Red_Jefe_Inmediato]) {
                    users[Usuario_Red_Jefe_Inmediato].pendingMessages.push(pendingMessage);
                } else {
                    users[Usuario_Red_Jefe_Inmediato] = {
                        socketId: null,
                        username: Usuario_Red_Jefe_Inmediato,
                        pendingMessages: [pendingMessage]
                    };
                }

            }
        });

        //TODO: EVENTO DE ACEPTADO LOS JEFES INMEDIATOS
        socket.on('sendNotificationOfBoss', async ({
            Id,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Observacion_Jefe_Inmediato

        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Jefe_Inmediato = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Jefe_Inmediato = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Jefe_Inmediato = 'Aceptado';
                SaveAcceptNotificationNoveltieBoss(
                    Fecha_Respuesta_Jefe_Inmediato,
                    Hora_Respuesta_Jefe_Inmediato,
                    Aprobador_Jefe_Inmediato,
                    Documento_Aprobador_Jefe_Inmediato,
                    Estado_Marcado_Jefe_Inmediato,
                    Observacion_Jefe_Inmediato,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });

        //TODO: EVENTO DE ACEPTADO POR LOS GERENTES
        socket.on('sendNotificationToPayrrol', async ({
            Id,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Observacion_Gerente_Area
        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Gerente_Area = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Gerente_Area = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Gerente_Area = 'Aceptado';
                SaveAcceptNotificationNoveltieManager(
                    Fecha_Respuesta_Gerente_Area,
                    Hora_Respuesta_Gerente_Area,
                    Aprobador_Gerente_Area,
                    Documento_Aprobador_Gerente_Area,
                    Estado_Marcado_Gerente_Area,
                    Observacion_Gerente_Area,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );

            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });

        //TODO: EVENTO DE ACEPTADO POR LOS ANALISTA DE PLANEACION
        socket.on('sendNotificationToManager', async ({
            Id,
            Aprobador_Planeacion,
            Documento_Aprobador_Planeacion,
            Observacion_Planeacion
        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Planeacion = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Planeacion = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Planeacion = 'Aceptado';
                SaveAcceptNotificationNoveltieWFM(
                    Fecha_Respuesta_Planeacion,
                    Hora_Respuesta_Planeacion,
                    Aprobador_Planeacion,
                    Documento_Aprobador_Planeacion,
                    Estado_Marcado_Planeacion,
                    Observacion_Planeacion,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });


        //TODO: EVENTO DE ACEPTADO POR LOS DE NOMINA EN LA NOVEDAD DE LA CALIDAD
        socket.on('sendNotificationToENDCAL', async ({
            Id,

            Fecha_Inicio_Novedad,
            Fecha_Fin_Novedad,

            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Observacion_Gestion_Humana
        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Gestion_Humana = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Gestion_Humana = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Gestion_Humana = 'Aceptado';

                SaveAcceptNotificationNoveltieENDCAL(
                    Fecha_Respuesta_Gestion_Humana,
                    Hora_Respuesta_Gestion_Humana,

                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,

                    Aprobador_Gestion_Humana,
                    Documento_Aprobador_Gestion_Humana,
                    Estado_Marcado_Gestion_Humana,
                    Observacion_Gestion_Humana,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });

        //TODO: EVENTO DE ACEPTADO POR LOS DE NOMINA
        socket.on('sendNotificationToAISL', async ({
            Id,
            Tipo_Novedad,
            Fecha_Inicio_Novedad,
            Fecha_Fin_Novedad,
            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Observacion_Gestion_Humana
        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Gestion_Humana = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Gestion_Humana = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Gestion_Humana = 'Aceptado';
                SaveAcceptNotificationNoveltieEND(
                    Tipo_Novedad,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Fecha_Respuesta_Gestion_Humana,
                    Hora_Respuesta_Gestion_Humana,
                    Aprobador_Gestion_Humana,
                    Documento_Aprobador_Gestion_Humana,
                    Estado_Marcado_Gestion_Humana,
                    Observacion_Gestion_Humana,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });

        //TODO: EVENTO DE ACEPTADO POR LOS DE NOMINA EN LA NOVEDAD DE LA AISLAMIENTO
        socket.on('sendNotificationToEND', async ({
            Id,

            Fecha_Inicio_Novedad,
            Fecha_Fin_Novedad,

            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Observacion_Gestion_Humana
        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Gestion_Humana = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Gestion_Humana = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Gestion_Humana = 'Aceptado';

                SaveAcceptNotificationNoveltieENDCAL(
                    Fecha_Respuesta_Gestion_Humana,
                    Hora_Respuesta_Gestion_Humana,

                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,

                    Aprobador_Gestion_Humana,
                    Documento_Aprobador_Gestion_Humana,
                    Estado_Marcado_Gestion_Humana,
                    Observacion_Gestion_Humana,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });

        //TODO: EVENTO PARA PEDIR DE SUPERVISOR A ASESOR 
        socket.on('sendNotificationNoveltieSupervisor', async ({
            Codigo,
            Fecha_Solicitud,
            Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio,
            Tipo_Solicitud,
            Dias_Calendario,
            Dias_Laborales,
            Fecha_Inicio_Novedad,
            Fecha_Fin_Novedad,
            Motivo,
            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,
            Jefe_Inmediato,
            Documento_Jefe_Inmediato,
            Fecha_Respuesta_Jefe_Inmediato,
            Hora_Respuesta_Jefe_Inmediato,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Estado_Marcado_Jefe_Inmediato,
            Observacion_Jefe_Inmediato
        }) => {
            try {
                const Id_Notificacion = generateUniqueId();
                SaveNotificationForSupervisorForAdviser(
                    Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Dias_Calendario,
                    Dias_Laborales,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Jefe_Inmediato,
                    Documento_Jefe_Inmediato,
                    Fecha_Respuesta_Jefe_Inmediato,
                    Hora_Respuesta_Jefe_Inmediato,
                    Aprobador_Jefe_Inmediato,
                    Documento_Aprobador_Jefe_Inmediato,
                    Estado_Marcado_Jefe_Inmediato,
                    Observacion_Jefe_Inmediato,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);

            }
        })







        //!EVENTOS DE RECHAZO DE LA NOTIFICACION

        //ENVIAMOS EL EVENTO DE RECHAZO EN CASO TAL SEA RECHAZDO POR LOS GERENTES
        socket.on('rejectNotificationNoveltiesBoss', ({
            Id,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Observacion_Jefe_Inmediato,
        }) => {
            const value = new Date();
            const Fecha_Respuesta_Jefe_Inmediato = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const Hora_Respuesta_Jefe_Inmediato = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const Estado_Marcado_Jefe_Inmediato = 'Rechazado';
            RejectNotificationNoveltieBoss(
                Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            );
        });

        //ENVIAMOS EL EVENTO DE RECHAZO EN CASO TAL SEA RECHAZDO POR LOS GERENTES
        socket.on('rejectNotificationNoveltiesManager', ({
            Id,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Observacion_Gerente_Area,
        }) => {
            const value = new Date();
            const Fecha_Respuesta_Gerente_Area = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const Hora_Respuesta_Gerente_Area = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const Estado_Marcado_Gerente_Area = 'Rechazado';
            RejectNotificationNoveltieManager(
                Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            );
        });

        //ENVIAMOS EL EVENTO DE RECHAZO EN CASO TAL SEA RECHAZDO POR LOS ANALISTAS DE PLANEACION
        socket.on('rejectNotificationNoveltiesWfm', ({
            Id,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Observacion_Planeacion
        }) => {
            const value = new Date();
            const Fecha_Respuesta_Jefe_Inmediato = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const Hora_Respuesta_Jefe_Inmediato = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const Estado_Marcado_Jefe_Inmediato = 'Rechazado';
            RejectNotificationNoveltieWfm(
                Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Planeacion,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            );
        });

        //ENVIAMOS EL EVENTO DE RECHAZO EN CASO TAL SEA RECHAZDO POR LOS DE NOMINA
        socket.on('rejectNotificationNoveltiesEND', ({
            Id,
            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Observacion_Gestion_Humana
        }) => {
            const value = new Date();
            const Fecha_Aprobador_Gestion_Humana = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const Hora_Aprobador_Gestion_Humana = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const Estado_Marcado_Gestion_Humana = 'Rechazado';
            RejectNotificationNoveltieEND(
                Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            );
        });


        // ===============================================================================
        // ==      🚧                    NOVEDADES STAFF                            🚧 ==
        // ===============================================================================
        //TODO: enviamos la solicitud de personal staff a su jefe inmediato
        socket.on('sendNotificationNoveltiesStaff', ({
            Codigo,
            Fecha_Solicitud,
            Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio,
            Tipo_Solicitud,
            Fecha_Inicio_Novedad,
            Fecha_Fin_Novedad,
            Dias_Calendario,
            Dias_Laborales,
            Motivo,

            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,


            Documento_Jefe_Inmediato,
            Usuario_Red_Jefe_Inmediato,
            Jefe_Inmediato
        }) => {
            const Id_Notificacion = generateUniqueId();
            const receiverSocket = getUserSocket(Usuario_Red_Jefe_Inmediato);
            if (receiverSocket) {
                const notification = {
                    Codigo,
                    Id: Id_Notificacion,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato
                };
                receiverSocket.emit(receiverMessage, notification);
                SaveNotificationNoveltieStaff(
                    Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,

                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,

                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } else {
                //si el usuario no esta conectado el mensaje se guarda como pendiente
                const pendingMessage = {
                    Id: Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato
                };


                SaveNotificationNoveltieStaff(
                    Id_Notificacion,
                    Codigo,
                    Fecha_Solicitud,
                    Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud,
                    Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Documento_Jefe_Inmediato,
                    Jefe_Inmediato,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
                if (users[Usuario_Red_Jefe_Inmediato]) {
                    users[Usuario_Red_Jefe_Inmediato].pendingMessages.push(pendingMessage);
                } else {
                    users[Usuario_Red_Jefe_Inmediato] = {
                        socketId: null,
                        username: Usuario_Red_Jefe_Inmediato,
                        pendingMessages: [pendingMessage]
                    };
                }

            }
        });


        //TODO: ENVIAMOS EL EVENTO DE RECHAZO EN CASO TAL SEA RECHAZDO POR EL JEFE INMEDIATO
        socket.on('rejectNotificationNoveltiesStaff', ({
            Id,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Observacion_Jefe_Inmediato,
        }) => {
            const value = new Date();
            const Fecha_Respuesta_Jefe_Inmediato = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const Hora_Respuesta_Jefe_Inmediato = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            const Estado_Marcado_Jefe_Inmediato = 'Rechazado';
            RejectNotificationNoveltieBossStaff(
                Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            );
        });


        socket.on('sendNotificationToWFMStaff', async ({
            Id,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Observacion_Jefe_Inmediato

        }) => {
            try {
                const value = new Date();
                const Fecha_Respuesta_Jefe_Inmediato = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                const Hora_Respuesta_Jefe_Inmediato = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                const Estado_Marcado_Jefe_Inmediato = 'Aceptado';
                SaveNotificationNoveltieWFMStaff(
                    Fecha_Respuesta_Jefe_Inmediato,
                    Hora_Respuesta_Jefe_Inmediato,
                    Aprobador_Jefe_Inmediato,
                    Documento_Aprobador_Jefe_Inmediato,
                    Estado_Marcado_Jefe_Inmediato,
                    Observacion_Jefe_Inmediato,
                    Id,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                // Manejar errores en la obtención de usuarios
            }
        });






        // ===============================================================================
        // ==      🚧                    HORAS EXTRAS                            🚧    ==
        // ===============================================================================
        //EL ASESOR // STAFF MANDA LAS HORAS EXTRAS 
        socket.on('sendNotificationHourExtra', ({
            Fecha_Solicitud,
            Hora_Solicitud,
            Nombre_Completo,
            Documento,
            Usuario_Red,
            Cargo,
            Cliente_Area,
            Servicio,
            Documento_Jefe_Inmediato,
            Jefe_Inmediato,
            Fecha_Turno,
            Hora_Ini,
            Hora_Fin,
            Hora_Extra_Ini,
            Hora_Extra_Fin
        }) => {
            const Id_Notificacion = generateUniqueId();
            SaveNotificationHoursExtra(
                Id_Notificacion,
                Fecha_Solicitud,
                Hora_Solicitud,
                Nombre_Completo,
                Documento,
                Usuario_Red,
                Cargo,
                Cliente_Area,
                Servicio,
                Documento_Jefe_Inmediato,
                Jefe_Inmediato,
                Fecha_Turno,
                Hora_Ini,
                Hora_Fin,
                Hora_Extra_Ini,
                Hora_Extra_Fin,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            );

        });
        //GTR ACEPTA O RECHAZA LAS HORAS EXTRAS 
        socket.on('acceptHoursExtra', ({
            Fecha_Turno,
            Documento,
            Hora_Extra_Ini,
            Hora_Extra_Fin,
            Fecha_Aprobador,
            Hora_Aprobador,
            Nombre_Aprobador,
            Documento_Aprobador,
            Estado,
            Observaciones,
            Id

        }) => {
            AcceptNotificationHoursExtra(
                Fecha_Turno,
                Documento,
                Hora_Extra_Ini,
                Hora_Extra_Fin,
                Fecha_Aprobador,
                Hora_Aprobador,
                Nombre_Aprobador,
                Documento_Aprobador,
                Estado,
                Observaciones,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            )
        });
        socket.on('rejectHoursExtra', ({
            Fecha_Aprobador,
            Hora_Aprobador,
            Nombre_Aprobador,
            Documento_Aprobador,
            Estado,
            Observaciones,
            Id

        }) => {
            RejectNotificationHoursExtra(
                Fecha_Aprobador,
                Hora_Aprobador,
                Nombre_Aprobador,
                Documento_Aprobador,
                Estado,
                Observaciones,
                Id,
                (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result.length === 0) {
                        callback(null);
                    } else {
                        callback(result);
                    }
                }
            )
        });

        //EL ASESOR Y / O STAFF PODRA CANCELAR LAS HORAS EXTRAS SOLICITADAS 
        socket.on('cancelHourExtra', ({ Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento, Estado, Id }) => {
            cancelNotificationHoursExtra(Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento, Estado, Id, (err, result) => {
                if (err) {
                    callback(err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(result);
                }
            })
        });


















        //borrar a el usuario desconectado 
        socket.on('disconnect', () => {
            const disconnectedUser = users[userData.username];
            if (disconnectedUser) {
                delete users[userData.username];
            }
        });

        if (users[userData.username].pendingMessages.length > 0) {
            const pendingMessages = users[userData.username].pendingMessages;
            users[userData.username].pendingMessages = []; // Limpiar mensajes pendientes
            const receiverSocket = getUserSocket(userData.username);
            pendingMessages.forEach(message => {
                const {

                } = message;

                const notification = {

                };
                receiverSocket.emit(receiverMessage, notification);
            });
        }
    }
});

server.listen(PORT_NOTIFICATIONS_NOVELTIES, HOST);

module.exports = sendNotification;
