//* AcceptChangeShifts enviar el mensaje a el supervisor en caso de ser aceptado por el receptor 
function AcceptChangeShifts(socket, context) {
    const { users, getUserSocket, updateAcceptMensajeEnDB, updateAcceptMensajeEnDBUnread, callback } = context;
    socket.on('acceptChange', ({
        Id_Cambio,
        id,
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
        Fecha_Respuesta,
        Hora_Envio,
        Hora_Respuesta,
        Jefe_Inmediato_Envia,
        Jefe_Inmediato_Recibe,
        Mensaje_Envia,
        Mensaje_Recibe,
        Respuesta_Recibe,
        Nombre_Completo_Envia,
        Nombre_Completo_Recibe,
        Servicio_Envia,
        Servicio_Recibe,
        Tipo_Cambio,
        Usuario_Red_Supervisor,
        Usuario_Red_SupervisorSend,

        Usuario_Red_Recibe,
    }) => {
        const firstSupervisor = getUserSocket(Usuario_Red_Supervisor);
        const SecondSupervisor = getUserSocket(Usuario_Red_SupervisorSend);
        if (firstSupervisor || SecondSupervisor) {
            const acceptChange = {
                Id_Cambio,
                id,
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
                Mensaje_Recibe,
                Respuesta_Recibe,
                Nombre_Completo_Envia: Nombre_Completo_Recibe,
                Nombre_Completo_Recibe: Nombre_Completo_Envia,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Recibe,
                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend,

                AcceptButton: 'Aceptado',
                ShowTextMessage: true,
                esSupervisor: true

            };
            if (firstSupervisor) {
                firstSupervisor.emit('getNotification', acceptChange);
            }
            if (SecondSupervisor) {
                SecondSupervisor.emit('getNotification', acceptChange);
            }
            if (id) {
                updateAcceptMensajeEnDB(
                    id,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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
                updateAcceptMensajeEnDBUnread(
                    Id_Cambio,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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
            const pendingMessage = {
                Id_Cambio,
                id,
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
                Mensaje_Recibe,
                Respuesta_Recibe,
                Nombre_Completo_Envia: Nombre_Completo_Recibe,
                Nombre_Completo_Recibe: Nombre_Completo_Envia,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Recibe,
                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend,

                AcceptButton: 'Aceptado',
                ShowTextMessage: true,
                esSupervisor: true
            };
            if (users[Usuario_Red_Supervisor || Usuario_Red_SupervisorSend]) {
                users[Usuario_Red_Supervisor || Usuario_Red_SupervisorSend].pendingMessages.push(pendingMessage);
            } else {
                users[Usuario_Red_Supervisor || Usuario_Red_SupervisorSend] = {
                    socketId: null,
                    username: Usuario_Red_Supervisor || Usuario_Red_SupervisorSend,
                    pendingMessages: [pendingMessage]
                };
            }
            if (id) {
                updateAcceptMensajeEnDB(
                    id,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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
                updateAcceptMensajeEnDBUnread(
                    Id_Cambio,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
                    (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else if (result.length === 0) {
                            callback(null);
                        } else {
                            callback(result);
                        }
                    });
            }


        }


    });
};

//* AcceptChangeShiftsForSupervisor acepta el cambio de turno el supervisor 1a1
function AcceptChangeShiftsForSupervisor(socket, context) {
    const { callback, updateAcceptMensajeEnDBOneToOne, updateAcceptMensajeEnDBOneToOneUnread } = context;
    socket.on('acceptChangeSupervisors', ({
        Id_Cambio,
        id,
        Documento_Jefe_Inmediato_Envia,
        Jefe_Inmediato_Envia,
        Documento_Aprobador_Final,
        Documento_Jefe_Inmediato_Recibe,
        Estado_Marcacion_Final,
        Fecha_Marcacion_Final,
        Hora_Marcacion_Final,
        Jefe_Inmediato_Recibe,
        Nombre_Aprobador_Final
    }) => {

        if (id) {
            updateAcceptMensajeEnDBOneToOne(
                id,
                Documento_Aprobador_Final = Documento_Jefe_Inmediato_Recibe || Documento_Jefe_Inmediato_Envia,
                Estado_Marcacion_Final,
                Fecha_Marcacion_Final,
                Hora_Marcacion_Final,
                Nombre_Aprobador_Final = Jefe_Inmediato_Recibe || Jefe_Inmediato_Envia,
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
            updateAcceptMensajeEnDBOneToOneUnread(
                Id_Cambio,
                Documento_Aprobador_Final = Documento_Jefe_Inmediato_Recibe || Documento_Jefe_Inmediato_Envia,
                Estado_Marcacion_Final,
                Fecha_Marcacion_Final,
                Hora_Marcacion_Final,
                Nombre_Aprobador_Final = Jefe_Inmediato_Recibe || Documento_Jefe_Inmediato_Envia,
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

//* AcceptChangeShiftDayRest el asesor acepta el cambio de día descanso
function AcceptChangeShiftDayRest(socket, context) {
    const { users, getUserSocket, updateAcceptMensajeEnDBDayRest, updateAcceptMensajeEnDBDayRestUnread, callback } = context;
    socket.on('acceptChangeDayRest', ({
        Id_Cambio,
        id,
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
        Fecha_Respuesta,
        Hora_Envio,
        Hora_Respuesta,
        Jefe_Inmediato_Envia,
        Jefe_Inmediato_Recibe,
        Mensaje_Envia,
        Mensaje_Recibe,
        Respuesta_Recibe,
        Nombre_Completo_Envia,
        Nombre_Completo_Recibe,
        Servicio_Envia,
        Servicio_Recibe,
        Tipo_Cambio,
        Usuario_Red_Supervisor,
        Usuario_Red_SupervisorSend,

        Usuario_Red_Recibe
    }) => {
        const receiverSupervisor = getUserSocket(Usuario_Red_Supervisor);
        const SecondReceiverSupervisor = getUserSocket(Usuario_Red_SupervisorSend);
        if (receiverSupervisor || SecondReceiverSupervisor) {
            const acceptChange = {
                Id_Cambio,
                id,
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
                Nombre_Completo_Envia: Nombre_Completo_Recibe,
                Nombre_Completo_Recibe: Nombre_Completo_Envia,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Recibe,
                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend,

                AcceptButton: 'Aceptado',
                esSupervisor: true,
                NotificationDayRestOption: true

            };

            if (receiverSupervisor) {
                receiverSupervisor.emit('getNotification', acceptChange);
            }
            if (SecondReceiverSupervisor) {
                SecondReceiverSupervisor.emit('getNotification', acceptChange);
            }
            if (id) {
                updateAcceptMensajeEnDBDayRest(
                    id,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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
                updateAcceptMensajeEnDBDayRestUnread(
                    Id_Cambio,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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
            const pendingMessage = {
                Id_Cambio,
                id,
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
                Nombre_Completo_Envia: Nombre_Completo_Recibe,
                Nombre_Completo_Recibe: Nombre_Completo_Envia,
                Servicio_Envia,
                Servicio_Recibe,
                Tipo_Cambio,
                Usuario_Red_Recibe,
                Usuario_Red_Supervisor,
                Usuario_Red_SupervisorSend
            };
            if (users[Usuario_Red_Supervisor || Usuario_Red_SupervisorSend]) {
                users[Usuario_Red_Supervisor || Usuario_Red_SupervisorSend].pendingMessages.push(pendingMessage);
            } else {
                users[Usuario_Red_Supervisor || Usuario_Red_SupervisorSend] = {
                    socketId: null,
                    username: Usuario_Red_Supervisor || Usuario_Red_SupervisorSend,
                    pendingMessages: [pendingMessage]
                };
            }
            if (id) {
                updateAcceptMensajeEnDBDayRest(
                    id,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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
                updateAcceptMensajeEnDBDayRestUnread(
                    Id_Cambio,
                    Fecha_Respuesta,
                    Hora_Respuesta,
                    Respuesta_Recibe = 'Aceptado',
                    Mensaje_Recibe,
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

//*AcceptChangeShiftDayRestForSupervisor el supervisor acepta el cambio de día descanso
function AcceptChangeShiftDayRestForSupervisor(socket, context) {
    const { updateAcceptMensajeEnDBSupervisor, updateAcceptMensajeEnDBSupervisorUnread, callback } = context;
    socket.on('acceptChangeDayRestSupervisor', ({
        Id_Cambio,
        id,
        Documento_Aprobador_Final,
        Estado_Marcacion_Final,
        Fecha_Marcacion_Final,
        Hora_Marcacion_Final,
        Nombre_Aprobador_Final

    }) => {
        if (id) {
            updateAcceptMensajeEnDBSupervisor(
                id,
                Fecha_Marcacion_Final,
                Hora_Marcacion_Final,
                Documento_Aprobador_Final,
                Nombre_Aprobador_Final,
                Estado_Marcacion_Final,

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
            updateAcceptMensajeEnDBSupervisorUnread(
                Id_Cambio,
                Fecha_Marcacion_Final,
                Hora_Marcacion_Final,
                Documento_Aprobador_Final,
                Nombre_Aprobador_Final,
                Estado_Marcacion_Final,

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

module.exports = { AcceptChangeShifts, AcceptChangeShiftsForSupervisor, AcceptChangeShiftDayRest, AcceptChangeShiftDayRestForSupervisor };