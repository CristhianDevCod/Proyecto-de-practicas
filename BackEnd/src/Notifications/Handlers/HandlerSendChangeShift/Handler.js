//TODO enviamos la notificacion a la persona especifica por medio del usuario de red
function SendChangeShift(socket, context) {
    const {
        users,
        callback,
        generateUniqueId,
        getUserSocket,
        guardarMensajeEnBD,
    } = context;

    socket.on('sendNotification', ({
        Cargo_Envia,
        Cargo_Recibe,
        Cliente_Area_Envia,
        Cliente_Area_Recibe,
        Dia_Descanso_Actual,
        Dia_Descanso_Futuro,
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
        Mensaje_Recibe,
        Nombre_Completo_Envia,
        Nombre_Completo_Recibe,
        Servicio_Envia,
        Servicio_Recibe,
        Tipo_Cambio,
        Usuario_Red_Envia,
        Usuario_Red_Recibe,
        Usuario_Red_Supervisor,
        Usuario_Red_SupervisorSend,
        idImage_User_Envia,
        AcceptButton,
        Documento_Coordinador_Envia,
        Documento_Coordinador_Recibe
    }) => {
        const Id_Notificacion = generateUniqueId();
        const receiverSocket = getUserSocket(Usuario_Red_Recibe);
        if (receiverSocket) {
            const notification = {
                id: Id_Notificacion,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                Dia_Descanso_Actual,
                Dia_Descanso_Futuro,
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
                Mensaje_Recibe,
                Nombre_Completo_Envia,
                Nombre_Completo_Recibe,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Envia,
                Usuario_Red_Recibe,

                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend,
                idImage_User_Envia,
                AcceptButton
            };
            receiverSocket.emit('getNotification', notification);
            guardarMensajeEnBD(
                Id_Notificacion,
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

                Documento_Coordinador_Envia,
                Documento_Coordinador_Recibe,
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
        } else {
            //si el usuario no esta conectado el mensaje se guarda como pendiente
            const pendingMessage = {
                id: Id_Notificacion,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                Dia_Trabajo_Actual,//
                Dia_Trabajo_Futuro,//
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
            if (users[Usuario_Red_Recibe]) {
                users[Usuario_Red_Recibe].pendingMessages.push(pendingMessage);
            } else {
                users[Usuario_Red_Recibe] = {
                    socketId: null,
                    username: Usuario_Red_Recibe,
                    pendingMessages: [pendingMessage]
                };
            }
            guardarMensajeEnBD(
                Id_Notificacion,
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
                Documento_Coordinador_Envia,
                Documento_Coordinador_Recibe,
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
        }
    });
};

//TODO: envia los mensaje para los días de descanso
function SendChangeShiftDayRest(socket, context) {
    const {
        users,
        generateUniqueId,
        getUserSocket,
        guardarMensajeDayRestEnBD,
        callback,
    } = context;
    socket.on('sendNotificationDayRest', ({
        Cargo_Envia,
        Cargo_Recibe,
        Cliente_Area_Envia,
        Cliente_Area_Recibe,
        Dia_Trabajo_Actual,
        Dia_Trabajo_Futuro,
        Dia_Descanso_Actual,
        Dia_Descanso_Futuro,
        Documento_Envia,
        Documento_Jefe_Inmediato_Envia,
        Documento_Jefe_Inmediato_Recibe,
        Documento_Recibe,
        Fecha_Envio,
        Hora_Envio,
        Jefe_Inmediato_Envia,
        Jefe_Inmediato_Recibe,
        Mensaje_Envia,
        Mensaje_Recibe,
        Nombre_Completo_Envia,
        Nombre_Completo_Recibe,
        Servicio_Envia,
        Servicio_Recibe,
        Tipo_Cambio,
        Usuario_Red_Envia,
        Usuario_Red_Recibe,
        Usuario_Red_Supervisor,
        Usuario_Red_SupervisorSend,
        Documento_Coordinador_Envia,
        Documento_Coordinador_Recibe,
    }) => {
        const Id_Notificacion = generateUniqueId();
        const receiverSocket = getUserSocket(Usuario_Red_Recibe);
        if (receiverSocket) {
            const notificationDayRest = {
                id: Id_Notificacion,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                Dia_Trabajo_Actual,
                Dia_Trabajo_Futuro,
                Dia_Descanso_Actual,
                Dia_Descanso_Futuro,
                Documento_Envia,
                Documento_Jefe_Inmediato_Envia,
                Documento_Jefe_Inmediato_Recibe,
                Documento_Recibe,
                Fecha_Envio,
                Hora_Envio,
                Jefe_Inmediato_Envia,
                Jefe_Inmediato_Recibe,
                Mensaje_Envia,
                Mensaje_Recibe,
                Nombre_Completo_Envia,
                Nombre_Completo_Recibe,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Envia,
                Usuario_Red_Recibe,
                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend,


                AcceptButton: 'Aceptado',
                NotificationDayRestOption: true
            }
            receiverSocket.emit('getNotification', notificationDayRest);
            guardarMensajeDayRestEnBD(
                Id_Notificacion,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                Dia_Trabajo_Actual,
                Dia_Trabajo_Futuro,
                Dia_Descanso_Actual,
                Dia_Descanso_Futuro,
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
                Documento_Coordinador_Envia,
                Documento_Coordinador_Recibe,
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

        } else {
            const pendingMessage = {
                id: Id_Notificacion,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                Dia_Trabajo_Actual,
                Dia_Trabajo_Futuro,
                Dia_Descanso_Actual,
                Dia_Descanso_Futuro,
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
                Usuario_Red_SupervisorSend
            };
            if (users[Usuario_Red_Recibe]) {
                users[Usuario_Red_Recibe].pendingMessages.push(pendingMessage);
            } else {
                users[Usuario_Red_Recibe] = {
                    socketId: null,
                    username: Usuario_Red_Recibe,
                    pendingMessages: [pendingMessage]
                };
            }
            guardarMensajeDayRestEnBD(
                Id_Notificacion,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                Dia_Trabajo_Actual,
                Dia_Trabajo_Futuro,
                Dia_Descanso_Actual,
                Dia_Descanso_Futuro,
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
                Documento_Coordinador_Envia,
                Documento_Coordinador_Recibe,
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
        }
    });
}


module.exports = { SendChangeShift, SendChangeShiftDayRest }