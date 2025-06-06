//? manejamos los eventos de rechazos en caso de ser rechazados  solo por el asesor
function RejectChangeShift(socket, context) {
    const {
        getUserSocket,
        updateMensajeEnDBRejectNoitification,
        updateMensajeEnDBRejectNoitificationUnread,
        callback,
    } = context;
    socket.on('rejectNotification', ({
        Id_Cambio,
        id,
        Cargo_Envia,
        Cargo_Recibe,
        Cliente_Area_Envia,
        Cliente_Area_Recibe,
        // Dia_Descanso_Actual,
        // Dia_Descanso_Futuro,
        Dia_Trabajo_Actual,
        Dia_Trabajo_Futuro,
        Documento_Aprobador_Final,
        Documento_Envia,
        Documento_Jefe_Inmediato_Envia,
        Documento_Jefe_Inmediato_Recibe,
        Documento_Recibe,
        Estado_Marcacion_Final,
        Fecha_Envio,
        Fecha_Marcacion_Final,
        Fecha_Respuesta,
        Hora_Envio,
        Hora_Marcacion_Final,
        Hora_Respuesta,
        Jefe_Inmediato_Envia,
        Jefe_Inmediato_Recibe,
        Mensaje_Envia,
        Mensaje_Recibe,
        Nombre_Aprobador_Final,
        Nombre_Completo_Envia,
        Nombre_Completo_Recibe,
        Respuesta_Recibe,
        Servicio_Envia,
        Servicio_Recibe,
        Tipo_Cambio,
        Usuario_Red_Envia,
        Usuario_Red_Recibe,
        Usuario_Red_Supervisor,
        Usuario_Red_SupervisorSend
    }) => {
        const receiverSocket = getUserSocket(Usuario_Red_Envia);
        const rejectMessage = `El asesor ${Nombre_Completo_Recibe} ha rechazado el cambio de turno para el día ${Dia_Trabajo_Actual} por el día ${Dia_Trabajo_Futuro}`;
        const value = new Date();
        const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
        const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
        if (receiverSocket) {
            const rejectNotification = {
                Id_Cambio,
                id,
                Cargo_Envia,
                Cargo_Recibe,
                Cliente_Area_Envia,
                Cliente_Area_Recibe,
                // Dia_Descanso_Actual,
                // Dia_Descanso_Futuro,
                Dia_Trabajo_Actual,
                Dia_Trabajo_Futuro,
                Documento_Aprobador_Final,
                Documento_Envia,
                Documento_Jefe_Inmediato_Envia,
                Documento_Jefe_Inmediato_Recibe,
                Documento_Recibe,
                Estado_Marcacion_Final: 'Rechazado',
                Fecha_Envio,
                Fecha_Marcacion_Final,
                Fecha_Respuesta,
                Hora_Envio,
                Hora_Marcacion_Final,
                Hora_Respuesta,
                Jefe_Inmediato_Envia,
                Jefe_Inmediato_Recibe,
                Mensaje_Envia: rejectMessage,
                Mensaje_Recibe,
                Nombre_Completo_Envia: Nombre_Completo_Recibe,
                Nombre_Completo_Recibe: Nombre_Completo_Envia,
                Respuesta_Recibe,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Envia: Usuario_Red_Recibe,
                Usuario_Red_Recibe: Usuario_Red_Envia,
                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend

            };

            receiverSocket.emit('getNotification', rejectNotification);
            if (id) {
                updateMensajeEnDBRejectNoitification(
                    id,
                    Nombre_Completo_Recibe,
                    Documento_Recibe,
                    Estado_Marcacion_Final = 'Rechazado',
                    Fecha_Marcacion_Final = date,
                    Fecha_Respuesta = date,
                    Hora_Marcacion_Final = time,
                    Hora_Respuesta = time,
                    Mensaje_Recibe,
                    Respuesta_Recibe = 'Rechazado',
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
                updateMensajeEnDBRejectNoitificationUnread(
                    Id_Cambio,
                    Estado_Marcacion_Final = 'Rechazado',
                    Fecha_Marcacion_Final = date,
                    Fecha_Respuesta = date,
                    Hora_Marcacion_Final = time,
                    Hora_Respuesta = time,
                    Mensaje_Recibe,
                    Respuesta_Recibe = 'Rechazado',
                    Nombre_Completo_Recibe,
                    Documento_Recibe,
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
            }
        } else {
            if (id) {
                updateMensajeEnDBRejectNoitification(
                    id,
                    Nombre_Completo_Recibe,
                    Documento_Recibe,
                    Estado_Marcacion_Final = 'Rechazado',
                    Fecha_Marcacion_Final = date,
                    Fecha_Respuesta = date,
                    Hora_Marcacion_Final = time,
                    Hora_Respuesta = time,
                    Mensaje_Recibe,
                    Respuesta_Recibe = 'Rechazado',
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
                updateMensajeEnDBRejectNoitificationUnread(
                    Id_Cambio,
                    Estado_Marcacion_Final = 'Rechazado',
                    Fecha_Marcacion_Final = date,
                    Fecha_Respuesta = date,
                    Hora_Marcacion_Final = time,
                    Hora_Respuesta = time,
                    Mensaje_Recibe,
                    Respuesta_Recibe = 'Rechazado',
                    Nombre_Completo_Recibe,
                    Documento_Recibe,
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
            }
        }
    });
}

//?manejamos los eventos de rechazos en caso de ser rechazados  solo por el Supervisor 1 a 1
function RejectChangeShiftSupervisor(socket, context) {
    const { updateRejectMessageSupervisor1a1, updateRejectMessageSupervisor1a1Unread, callback } = context;
    socket.on('rejectNotificationSupervisor1a1', ({
        Id_Cambio,
        id,
        Documento_Aprobador_Final,
        Estado_Marcacion_Final,
        Fecha_Marcacion_Final,
        Hora_Marcacion_Final,
        Nombre_Aprobador_Final
    }) => {
        const value = new Date();
        const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
        const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
        if (id) {
            updateRejectMessageSupervisor1a1(
                id,
                Estado_Marcacion_Final = 'Rechazado',
                Fecha_Marcacion_Final = date,
                Hora_Marcacion_Final = time,
                Documento_Aprobador_Final,
                Nombre_Aprobador_Final,
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
            updateRejectMessageSupervisor1a1Unread(
                Id_Cambio,
                Estado_Marcacion_Final = 'Rechazado',
                Fecha_Marcacion_Final = date,
                Hora_Marcacion_Final = time,
                Documento_Aprobador_Final,
                Nombre_Aprobador_Final,
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
        }
    });
}

//?manejamos los eventos de rechazos en caso de ser rechazados  solo por el Supervisor cambio dia de descanso
function RejectChangeDayRestShiftSupervisor(socket, context) {
    const { updateRejectMessageSupervisor, updateRejectMessageSupervisorUnread, callback } = context;
    socket.on('rejectNotificationSupervisor', ({
        Id_Cambio,
        id,
        Documento_Aprobador_Final,
        Estado_Marcacion_Final,
        Fecha_Marcacion_Final,
        Hora_Marcacion_Final,
        Nombre_Aprobador_Final
    }) => {
        const value = new Date();
        const date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
        const time = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
        if (id) {
            updateRejectMessageSupervisor(
                id,
                Estado_Marcacion_Final = 'Rechazado',
                Fecha_Marcacion_Final = date,
                Hora_Marcacion_Final = time,
                Documento_Aprobador_Final,
                Nombre_Aprobador_Final,
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
            updateRejectMessageSupervisorUnread(
                Id_Cambio,
                Estado_Marcacion_Final = 'Rechazado',
                Fecha_Marcacion_Final = date,
                Hora_Marcacion_Final = time,
                Documento_Aprobador_Final,
                Nombre_Aprobador_Final,
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
        }
    });

}


module.exports = { RejectChangeShift, RejectChangeShiftSupervisor, RejectChangeDayRestShiftSupervisor }