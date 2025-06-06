const { PORT_NOTIFICATIONS, HOST } = require('../Port-And-Host/Port-And-Host');

const {
    guardarMensajeEnBD,
    updateAcceptMensajeEnDB,
    guardarMensajeDayRestEnBD,
    updateAcceptMensajeEnDBUnread,
    updateRejectMessageSupervisor,
    updateAcceptMensajeEnDBDayRest,
    updateAcceptMensajeEnDBOneToOne,
    updateRejectMessageSupervisor1a1,
    updateAcceptMensajeEnDBSupervisor,
    updateRejectMessageSupervisorUnread,
    updateMensajeEnDBRejectNoitification,
    updateAcceptMensajeEnDBDayRestUnread,
    updateAcceptMensajeEnDBOneToOneUnread,
    updateRejectMessageSupervisor1a1Unread,
    updateAcceptMensajeEnDBSupervisorUnread,
    updateMensajeEnDBRejectNoitificationUnread,
} = require('./Services/ServiceSave');
const { SendChangeShift, SendChangeShiftDayRest } = require('./Handlers/HandlerSendChangeShift/Handler');
const { RejectChangeShift, RejectChangeShiftSupervisor, RejectChangeDayRestShiftSupervisor } = require('./Handlers/HandlerRejectChangeShift/Handler');
const { AcceptChangeShifts, AcceptChangeShiftsForSupervisor, AcceptChangeShiftDayRest, AcceptChangeShiftDayRestForSupervisor } = require('./Handlers/HandlerAcceptChangeShift/Handler');

const express = require('express');
const sendNotification = express();
const server = require('http').createServer(sendNotification);
const cors = require('cors');
const crypto = require('crypto');

sendNotification.use(cors());//
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

io.sockets.setMaxListeners(Infinity);

//contexto compartido para que sea reutilizable para todas las funciones
const context = {
    users,
    isValidUser,
    getUserSocket,
    getUserFromUser,
    generateUniqueId,
    guardarMensajeEnBD,
    updateAcceptMensajeEnDB,
    guardarMensajeDayRestEnBD,
    updateAcceptMensajeEnDBUnread,
    updateRejectMessageSupervisor,
    updateAcceptMensajeEnDBDayRest,
    updateAcceptMensajeEnDBOneToOne,
    updateRejectMessageSupervisor1a1,
    updateAcceptMensajeEnDBSupervisor,
    updateRejectMessageSupervisorUnread,
    updateMensajeEnDBRejectNoitification,
    updateAcceptMensajeEnDBDayRestUnread,
    updateAcceptMensajeEnDBOneToOneUnread,
    updateRejectMessageSupervisor1a1Unread,
    updateAcceptMensajeEnDBSupervisorUnread,
    updateMensajeEnDBRejectNoitificationUnread,
    callback,
};

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
        //TODO ==========================================================================================
        //TODO ==🚧 			MANEJADORES DE ENVIAR CAMBIOS DE LOS TURNOS 🚧                        ==
        //TODO ==========================================================================================
        //TODO enviamos la notificacion a la persona especifica por medio del usuario de red
        SendChangeShift(socket, context);//*✅
        //TODO: envia los mensaje para los días de descanso
        SendChangeShiftDayRest(socket, context);//*✅

        //* ==========================================================================================
        //* ==🚧 			MANEJADORES DE ACEPTADO DE CAMBIOS DE LOS TURNOS 🚧                    ==
        //* ==========================================================================================
        //* AcceptChangeShifts enviar el mensaje a el supervisor en caso de ser aceptado por el receptor 
        AcceptChangeShifts(socket, context);//*✅
        //* AcceptChangeShiftsForSupervisor acepta el cambio de turno el supervisor 1a1
        AcceptChangeShiftsForSupervisor(socket, context);//*✅
        //* AcceptChangeShiftDayRest el asesor acepta el cambio de día descanso
        AcceptChangeShiftDayRest(socket, context);//*✅
        //* AcceptChangeShiftDayRestForSupervisor el supervisor acepta el cambio de día descanso
        AcceptChangeShiftDayRestForSupervisor(socket, context);//*✅

        //? ==========================================================================================
        //? ==🚧 			MANEJADORES DE RECHAZADOS DE CAMBIOS DE LOS TURNOS 🚧                  ==
        //? ==========================================================================================
        //? manejamos los eventos de rechazos en caso de ser rechazados  solo por el asesor
        RejectChangeShift(socket, context);//*✅
        //?manejamos los eventos de rechazos en caso de ser rechazados  solo por el Supervisor 1 a 1
        RejectChangeShiftSupervisor(socket, context);//*✅
        //?manejamos los eventos de rechazos en caso de ser rechazados  solo por el Supervisor cambio dia de descanso
        RejectChangeDayRestShiftSupervisor(socket, context);//*✅


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
                    Cargo_Envia,
                    Cargo_Recibe,
                    Cliente_Area_Envia,
                    Cliente_Area_Recibe,
                    Dia_Trabajo_Actual,
                    Dia_Trabajo_Futuro,
                    Documento_Envia,
                    Documento_Jefe_Inmediato_Envia,
                    Documento_Jefe_Inmediato_Recibe,
                    Documento_Recibe,
                    Fecha_Envio,
                    Hora_Envio,
                    Jefe_Inmediato_Envia,
                    Jefe_Inmediato_Recibe,
                    Mensaje_Envia,
                    Nombre_Completo_Envia,
                    Nombre_Completo_Recibe,
                    Servicio_Envia,
                    Servicio_Recibe,
                    Tipo_Cambio,
                    Usuario_Red_Envia,
                    Usuario_Red_Recibe,
                    Usuario_Red_Supervisor,
                    Usuario_Red_SupervisorSend

                } = message;

                const notification = {
                    Cargo_Envia,
                    Cargo_Recibe,
                    Cliente_Area_Envia,
                    Cliente_Area_Recibe,
                    Dia_Trabajo_Actual,
                    Dia_Trabajo_Futuro,
                    Documento_Envia,
                    Documento_Jefe_Inmediato_Envia,
                    Documento_Jefe_Inmediato_Recibe,
                    Documento_Recibe,
                    Fecha_Envio,
                    Hora_Envio,
                    Jefe_Inmediato_Envia,
                    Jefe_Inmediato_Recibe,
                    Mensaje_Envia,
                    Nombre_Completo_Envia,
                    Nombre_Completo_Recibe,
                    Servicio_Envia,
                    Servicio_Recibe,
                    Tipo_Cambio,
                    Usuario_Red_Envia,
                    Usuario_Red_Recibe,
                    Usuario_Red_Supervisor,
                    Usuario_Red_SupervisorSend

                };
                receiverSocket.emit('getNotification', notification);
            });
        }
    }
});

server.listen(PORT_NOTIFICATIONS, HOST);

module.exports = sendNotification;
