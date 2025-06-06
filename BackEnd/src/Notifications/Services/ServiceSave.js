const { Almaverso } = require('../../BDconfig');
const express = require('express');
const ServiceSave = express();
const cors = require('cors');
const mysql = require('mysql2');

ServiceSave.use(cors());

const pool = mysql.createPool(Almaverso);
// ESTOS SON LAS FUINCIONES CORRESPONDIENTES A DÍAS DE TRABAJOS
//Guardar mensaje dia de trabajo 
const callback = () => { };

function guardarMensajeEnBD(
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
    Documento_Coordinador_Recibe
) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, 'Error interno del servidor');
        }
        try {
            const query = 'INSERT INTO T_Shifts_Notifications (Id_Notificacion, Cargo_Envia, Cargo_Recibe, Cliente_Area_Envia, Cliente_Area_Recibe, Dia_Trabajo_Actual, Dia_Trabajo_Futuro, Documento_Envia, Documento_Jefe_Inmediato_Envia, Documento_Jefe_Inmediato_Recibe, Documento_Recibe, Fecha_Envio, Hora_Envio, Jefe_Inmediato_Envia, Jefe_Inmediato_Recibe, Mensaje_Envia, Nombre_Completo_Envia, Nombre_Completo_Recibe, Servicio_Envia, Servicio_Recibe, Tipo_Cambio, Usuario_Red_Envia, Usuario_Red_Recibe, Documento_Coordinador_1, Documento_Coordinador_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
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
                Documento_Coordinador_Recibe
            ];
            connection.query(query, values, (error, results) => {
                connection.release(); // Cierra la conexión después de la consulta
                if (error) {
                    console.log(error);
                    callback('Error al guardar el mensaje en la base de datos:', error);
                } else if (results) {
                    callback('Mensaje guardado en la base de datos');
                }
            });
        } catch (error) {
            callback(error, 'Error interno del server');
        };
    });
};
//Actualiza el mensaje de día de tabajo en caso tal de ser aceptado por asesor
function updateAcceptMensajeEnDB(id, Fecha_Respuesta, Hora_Respuesta, Respuesta_Recibe, Mensaje_Recibe, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Fecha_Respuesta = '${Fecha_Respuesta}', Hora_Respuesta = '${Hora_Respuesta}', Respuesta_Recibe = '${Respuesta_Recibe}', Mensaje_Recibe = '${Mensaje_Recibe}' WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });

};
//Actualiza el mensaje de día de tabajo en caso tal de ser aceptado por asesor y estaba ausente
function updateAcceptMensajeEnDBUnread(Id_Cambio, Fecha_Respuesta, Hora_Respuesta, Respuesta_Recibe, Mensaje_Recibe, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Fecha_Respuesta = '${Fecha_Respuesta}', Hora_Respuesta = '${Hora_Respuesta}', Respuesta_Recibe = '${Respuesta_Recibe}', Mensaje_Recibe = '${Mensaje_Recibe}' WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });

};

//Actualiza el mensaje de día de tabajo en caso tal de ser aceptado por asesor
function updateAcceptMensajeEnDBOneToOne(id, Documento_Aprobador_Final, Estado_Marcacion_Final, Fecha_Marcacion_Final, Hora_Marcacion_Final, Nombre_Aprobador_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Estado_Marcacion_Final = '${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}', Hora_Marcacion_Final = '${Hora_Marcacion_Final}' WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    });

};
//Actualiza el mensaje de día de tabajo en caso tal de ser aceptado por asesor y estaba usente
function updateAcceptMensajeEnDBOneToOneUnread(Id_Cambio, Documento_Aprobador_Final, Estado_Marcacion_Final, Fecha_Marcacion_Final, Hora_Marcacion_Final, Nombre_Aprobador_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}',
            Documento_Aprobador_Final = '${Documento_Aprobador_Final}',
            Estado_Marcacion_Final = '${Estado_Marcacion_Final}',
            Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}',
            Hora_Marcacion_Final = '${Hora_Marcacion_Final}' WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error, 'Error');
                    callback(error, null);
                } else if (result.length === 0) {
                    console.log(error, 'No se puedo actualizar');
                } else {
                    console.log(result, 'actualizado');
                    callback(null, result);
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    });

};


//ESTOS SON LAS FUINCIONES CORRESPONDIENTES A DÍAS DE DESCANSOS 
//Guardar mensaje dia de descanso 
function guardarMensajeDayRestEnBD(
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
) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, 'Error interno del servidor');
        }
        try {
            const query = 'INSERT INTO T_Shifts_Notifications (Id_Notificacion, Cargo_Envia, Cargo_Recibe, Cliente_Area_Envia, Cliente_Area_Recibe, Dia_Trabajo_Actual, Dia_Trabajo_Futuro, Dia_Descanso_Actual, Dia_Descanso_Futuro, Documento_Envia, Documento_Jefe_Inmediato_Envia, Documento_Jefe_Inmediato_Recibe, Documento_Recibe, Fecha_Envio, Hora_Envio, Jefe_Inmediato_Envia, Jefe_Inmediato_Recibe, Mensaje_Envia, Nombre_Completo_Envia, Nombre_Completo_Recibe, Servicio_Envia, Servicio_Recibe, Tipo_Cambio, Usuario_Red_Envia, Usuario_Red_Recibe, Documento_Coordinador_1, Documento_Coordinador_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
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
            ];
            connection.query(query, values, (error, results) => {
                connection.release();
                if (error) {
                    callback('Error al guardar el mensaje en la base de datos:');
                } else if (results) {
                    callback('Mensaje guardado en la base de datos');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

//Actualiza el mensaje de día de tabajo en caso tal de ser aceptado por asesor
function updateAcceptMensajeEnDBDayRest(id, Fecha_Respuesta, Hora_Respuesta, Respuesta_Recibe, Mensaje_Recibe, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Fecha_Respuesta = '${Fecha_Respuesta}', Hora_Respuesta = '${Hora_Respuesta}', Respuesta_Recibe = '${Respuesta_Recibe}', Mensaje_Recibe = '${Mensaje_Recibe}' WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });

};
//Actualiza el mensaje de día de tabajo en caso tal de ser aceptado por asesor y estaba usente
function updateAcceptMensajeEnDBDayRestUnread(Id_Cambio, Fecha_Respuesta, Hora_Respuesta, Respuesta_Recibe, Mensaje_Recibe, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Fecha_Respuesta = '${Fecha_Respuesta}', Hora_Respuesta = '${Hora_Respuesta}', Respuesta_Recibe = '${Respuesta_Recibe}', Mensaje_Recibe = '${Mensaje_Recibe}' WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });

};

//Actualiza el mensaje en día de descanso en caso tal de ser aceptado por el supervisor
function updateAcceptMensajeEnDBSupervisor(id, Fecha_Marcacion_Final, Hora_Marcacion_Final, Documento_Aprobador_Final, Nombre_Aprobador_Final, Estado_Marcacion_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}', Hora_Marcacion_Final = '${Hora_Marcacion_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}', Estado_Marcacion_Final = '${Estado_Marcacion_Final}'  WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });

};
//Actualiza el mensaje en día de descanso en caso tal de ser aceptado por el supervisor y estaba ausente
function updateAcceptMensajeEnDBSupervisorUnread(Id_Cambio, Fecha_Marcacion_Final, Hora_Marcacion_Final, Documento_Aprobador_Final, Nombre_Aprobador_Final, Estado_Marcacion_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}', Hora_Marcacion_Final = '${Hora_Marcacion_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}', Estado_Marcacion_Final = '${Estado_Marcacion_Final}'  WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });

};



//ESTOS SON LAS FUINCIONES CORRESPONDIENTES A LOS RECHAZOS DE LAS NOTIFICACIONES
//Actualiza el mensaje de día de tabajo en caso tal de ser rechazado por le asesor 
function updateMensajeEnDBRejectNoitification(id, Nombre_Completo_Recibe, Documento_Recibe, Estado_Marcacion_Final, Fecha_Marcacion_Final, Fecha_Respuesta, Hora_Marcacion_Final, Hora_Respuesta, Mensaje_Recibe, Respuesta_Recibe, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Estado_Marcacion_Final ='${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}', Fecha_Respuesta = '${Fecha_Respuesta}', Hora_Marcacion_Final = '${Hora_Marcacion_Final}',  Hora_Respuesta = '${Hora_Respuesta}', Mensaje_Recibe = '${Mensaje_Recibe}', Respuesta_Recibe = '${Respuesta_Recibe}', Documento_Aprobador_Final = '${Documento_Recibe}', Nombre_Aprobador_Final = '${Nombre_Completo_Recibe}'  WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });
};
//Actualiza el mensaje de día de tabajo en caso tal de ser rechazado por le asesor y ausente
function updateMensajeEnDBRejectNoitificationUnread(Id_Cambio, Estado_Marcacion_Final, Fecha_Marcacion_Final, Fecha_Respuesta, Hora_Marcacion_Final, Hora_Respuesta, Mensaje_Recibe, Respuesta_Recibe, Nombre_Completo_Recibe, Documento_Recibe, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Estado_Marcacion_Final = '${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}', Fecha_Respuesta = '${Fecha_Respuesta}', Hora_Marcacion_Final = '${Hora_Marcacion_Final}',  Hora_Respuesta = '${Hora_Respuesta}', Mensaje_Recibe = '${Mensaje_Recibe}', Respuesta_Recibe = '${Respuesta_Recibe}', Documento_Aprobador_Final = '${Documento_Recibe}', Nombre_Aprobador_Final = '${Nombre_Completo_Recibe}' WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    });
};
//Actualiza el mensaje de día de tabajo en caso tal de ser rechazado por le asesor 
function updateRejectMessageSupervisor(id, Estado_Marcacion_Final, Fecha_Marcacion_Final, Hora_Marcacion_Final, Documento_Aprobador_Final, Nombre_Aprobador_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Estado_Marcacion_Final = '${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}',  Hora_Marcacion_Final = '${Hora_Marcacion_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}'  WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }

    });

};
//Actualiza el mensaje de día de tabajo en caso tal de ser rechazado por le asesor ausente
function updateRejectMessageSupervisorUnread(Id_Cambio, Estado_Marcacion_Final, Fecha_Marcacion_Final, Hora_Marcacion_Final, Documento_Aprobador_Final, Nombre_Aprobador_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null);
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Estado_Marcacion_Final = '${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}',  Hora_Marcacion_Final = '${Hora_Marcacion_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}'  WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }

    });

};
//Actualiza el mensaje de día de tabajo en caso tal de ser rechazado por el supervisor
function updateRejectMessageSupervisor1a1(id, Estado_Marcacion_Final, Fecha_Marcacion_Final, Hora_Marcacion_Final, Documento_Aprobador_Final, Nombre_Aprobador_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null);
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Estado_Marcacion_Final = '${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}',  Hora_Marcacion_Final = '${Hora_Marcacion_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}'  WHERE Id_Notificacion = '${id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }

    });
};
//Actualiza el mensaje de día de tabajo en caso tal de ser rechazado por le asesor y ausente 
function updateRejectMessageSupervisor1a1Unread(Id_Cambio, Estado_Marcacion_Final, Fecha_Marcacion_Final, Hora_Marcacion_Final, Documento_Aprobador_Final, Nombre_Aprobador_Final, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null);
        }
        try {
            const sql = `UPDATE T_Shifts_Notifications SET Estado_Marcacion_Final = '${Estado_Marcacion_Final}', Fecha_Marcacion_Final = '${Fecha_Marcacion_Final}',  Hora_Marcacion_Final = '${Hora_Marcacion_Final}', Documento_Aprobador_Final = '${Documento_Aprobador_Final}', Nombre_Aprobador_Final = '${Nombre_Aprobador_Final}'  WHERE Id_Cambio = '${Id_Cambio}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (error) {
            callback(error, null);
        }

    });
};



module.exports = {
    guardarMensajeEnBD,
    updateAcceptMensajeEnDB,
    guardarMensajeDayRestEnBD,
    updateRejectMessageSupervisor,
    updateAcceptMensajeEnDBUnread,
    updateAcceptMensajeEnDBDayRest,
    updateAcceptMensajeEnDBOneToOne,
    updateRejectMessageSupervisor1a1,
    updateAcceptMensajeEnDBSupervisor,
    updateRejectMessageSupervisorUnread,
    updateAcceptMensajeEnDBDayRestUnread,
    updateMensajeEnDBRejectNoitification,
    updateAcceptMensajeEnDBOneToOneUnread,
    updateRejectMessageSupervisor1a1Unread,
    updateAcceptMensajeEnDBSupervisorUnread,
    updateMensajeEnDBRejectNoitificationUnread,

}