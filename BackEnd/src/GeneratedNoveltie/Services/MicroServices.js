const { Almaverso, AlmaversoSystemPoint } = require('../../BDconfig');
const express = require('express');
const MicroServices = express();
const cors = require('cors');
const mysql = require('mysql2');

MicroServices.use(cors());

const pool = mysql.createPool(Almaverso);
const Sistema_Punto = mysql.createPool(AlmaversoSystemPoint);

const callback = () => { };

//FUNCION PARA GUARDAR LAS NOVEDADES ENVIADAS 
function SaveNotificationNoveltie(
    Id,
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
    Jefe_Inmediato) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(null, 'Error interno del servidor');
        }
        try {
            const query = `INSERT INTO T_Novelties_Notifications (
                Id, 
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




                ) VALUES(
                 '${Id}',
                 '${Codigo}',
                 '${Fecha_Solicitud}',
                 '${Hora_Solicitud}',
                 '${Documento}',
                 '${Usuario_Red}',
                 '${Nombre_Completo}',
                 '${Cliente_Area}',
                 '${Cargo}',
                 '${Servicio}',
                 '${Tipo_Solicitud}',
                 '${Fecha_Inicio_Novedad}',
                 '${Fecha_Fin_Novedad}',
                 '${Dias_Calendario}',
                 '${Dias_Laborales}',
                 '${Motivo}',
                 '${Time_Money}',
                 '${How_Long}',
                 '${Numero_Incapacidad}',
                 '${Numero_Diagnostico}',
                 '${Nombre_Diagnostico}',
                 '${Documento_Jefe_Inmediato}',
                 '${Jefe_Inmediato}'
                 )`;

            connection.query(query, (error, results) => {
                connection.release(); // Cierra la conexión después de la consulta
                if (error) {
                    console.log(error);
                    callback('Error al guardar el mensaje en la base de datos:', error);
                } else if (results.length === 0) {
                    callback('Mensaje guardado en la base de datos');
                } else {
                    callback('Mensaje guardado en la base de datos');
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, 'Error interno del server');
        };
    });
};
//FUNCION PARA GUARDAR LAS NOVEDADES ENVIADAS DE STAFF 
function sendNotificationNoveltiesStaff(
    Id,
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
    Jefe_Inmediato) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(null, 'Error interno del servidor');
        }
        try {
            const query = `INSERT INTO T_Novelties_Notifications (
                Id, 
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

                Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato



                ) VALUES(
                 '${Id}',
                 '${Codigo}',
                 '${Fecha_Solicitud}',
                 '${Hora_Solicitud}',
                 '${Documento}',
                 '${Usuario_Red}',
                 '${Nombre_Completo}',
                 '${Cliente_Area}',
                 '${Cargo}',
                 '${Servicio}',
                 '${Tipo_Solicitud}',
                 '${Fecha_Inicio_Novedad}',
                 '${Fecha_Fin_Novedad}',
                 '${Dias_Calendario}',
                 '${Dias_Laborales}',
                 '${Motivo}',
                 '${Time_Money}',
                 '${How_Long}',
                 '${Numero_Incapacidad}',
                 '${Numero_Diagnostico}',
                 '${Nombre_Diagnostico}',
                 '${Documento_Jefe_Inmediato}',
                 '${Jefe_Inmediato}',

                 '${Fecha_Solicitud}',
                 '${Hora_Solicitud}',
                 '-',
                 '-',
                 '-',
                 '-'
                 )`;

            connection.query(query, (error, results) => {
                connection.release(); // Cierra la conexión después de la consulta
                if (error) {
                    console.log(error);
                    callback('Error al guardar el mensaje en la base de datos:', error);
                } else if (results.length === 0) {
                    callback('Mensaje guardado en la base de datos');
                } else {
                    callback('Mensaje guardado en la base de datos');
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, 'Error interno del server');
        };
    });
};



//!FUNCIONES DE ACEPTADOS NOVEDADES ASESOR

function SaveAcceptNotificationNoveltieBoss(Fecha_Respuesta_Jefe_Inmediato, Hora_Respuesta_Jefe_Inmediato, Aprobador_Jefe_Inmediato, Documento_Aprobador_Jefe_Inmediato, Estado_Marcado_Jefe_Inmediato, Observacion_Jefe_Inmediato, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET 
            Fecha_Respuesta_Jefe_Inmediato = '${Fecha_Respuesta_Jefe_Inmediato}', 
            Hora_Respuesta_Jefe_Inmediato = '${Hora_Respuesta_Jefe_Inmediato}', 
            Aprobador_Jefe_Inmediato = '${Aprobador_Jefe_Inmediato}', 
            Documento_Aprobador_Jefe_Inmediato = '${Documento_Aprobador_Jefe_Inmediato}', 
            Estado_Marcado_Jefe_Inmediato = '${Estado_Marcado_Jefe_Inmediato}', 
            Observacion_Jefe_Inmediato = '${Observacion_Jefe_Inmediato}' WHERE Id = '${Id}'`;

            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};


//FUNCION PARA ACEPTAR LAS NOVEDADES POR LOS  GERENTES
function SaveAcceptNotificationNoveltieManager(Fecha_Respuesta_Gerente_Area, Hora_Respuesta_Gerente_Area, Aprobador_Gerente_Area, Documento_Aprobador_Gerente_Area, Estado_Marcado_Gerente_Area, Observacion_Gerente_Area, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET Fecha_Respuesta_Gerente_Area = '${Fecha_Respuesta_Gerente_Area}', Hora_Respuesta_Gerente_Area = '${Hora_Respuesta_Gerente_Area}', Aprobador_Gerente_Area = '${Aprobador_Gerente_Area}', Documento_Aprobador_Gerente_Area = '${Documento_Aprobador_Gerente_Area}', Estado_Marcado_Gerente_Area = '${Estado_Marcado_Gerente_Area}', Observacion_Gerente_Area = '${Observacion_Gerente_Area}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

//FUNCION PARA ACEPTAR LAS NOVEDADES POR LOS ANALISTAS DE WFM 
function SaveAcceptNotificationNoveltieWFM(Fecha_Respuesta_Planeacion, Hora_Respuesta_Planeacion, Aprobador_Planeacion, Documento_Aprobador_Planeacion, Estado_Marcado_Planeacion, Observacion_Planeacion, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET Fecha_Respuesta_Planeacion = '${Fecha_Respuesta_Planeacion}', Hora_Respuesta_Planeacion = '${Hora_Respuesta_Planeacion}', Aprobador_Planeacion = '${Aprobador_Planeacion}', Documento_Aprobador_Planeacion = '${Documento_Aprobador_Planeacion}', Estado_Marcado_Planeacion = '${Estado_Marcado_Planeacion}', Observacion_Planeacion = '${Observacion_Planeacion}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};
//FUNCION PARA ACEPTAR LAS NOVEDADES POR LOS DE NOMINA 
function SaveAcceptNotificationNoveltieEND(Tipo_Novedad, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Fecha_Aprobador_Gestion_Humana, Hora_Aprobador_Gestion_Humana, Aprobador_Gestion_Humana, Documento_Aprobador_Gestion_Humana, Estado_Marcado_Gestion_Humana, Observacion_Gestion_Humana, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET 
            Tipo_Solicitud = '${Tipo_Novedad}',
            Fecha_Inicio_Novedad = '${Fecha_Inicio_Novedad}',
            Fecha_Fin_Novedad = '${Fecha_Fin_Novedad}',
            Fecha_Aprobador_Gestion_Humana = '${Fecha_Aprobador_Gestion_Humana}', 
            Hora_Aprobador_Gestion_Humana = '${Hora_Aprobador_Gestion_Humana}', 
            Aprobador_Gestion_Humana = '${Aprobador_Gestion_Humana}', 
            Documento_Aprobador_Gestion_Humana = '${Documento_Aprobador_Gestion_Humana}', 
            Estado_Marcado_Gestion_Humana = '${Estado_Marcado_Gestion_Humana}', 
            Observacion_Gestion_Humana ='${Observacion_Gestion_Humana}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    console.log('No se pudo actualizar end');
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

function SaveAcceptNotificationNoveltieENDCAL(Fecha_Aprobador_Gestion_Humana, Hora_Aprobador_Gestion_Humana, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Aprobador_Gestion_Humana, Documento_Aprobador_Gestion_Humana, Estado_Marcado_Gestion_Humana, Observacion_Gestion_Humana, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET 
            Fecha_Inicio_Novedad = '${Fecha_Inicio_Novedad}',
            Fecha_Fin_Novedad = '${Fecha_Fin_Novedad}',
            Fecha_Aprobador_Gestion_Humana = '${Fecha_Aprobador_Gestion_Humana}', 
            Hora_Aprobador_Gestion_Humana = '${Hora_Aprobador_Gestion_Humana}', 
            Aprobador_Gestion_Humana = '${Aprobador_Gestion_Humana}', 
            Documento_Aprobador_Gestion_Humana = '${Documento_Aprobador_Gestion_Humana}', 
            Estado_Marcado_Gestion_Humana = '${Estado_Marcado_Gestion_Humana}', 
            Observacion_Gestion_Humana ='${Observacion_Gestion_Humana}' 
            WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    console.log('no se actualiza');
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};




//!FUNCIONES DE ACEPTADOS Y RECHAZADOS  NOVEDADES STAFF

//FUNCION PARA ACEPTAR LAS NOVEDADES POR EL JEFE INMEDOATO O SUPERVISOR
function SaveNotificationNoveltieWFMStaff(Fecha_Respuesta_Jefe_Inmediato, Hora_Respuesta_Jefe_Inmediato, Aprobador_Jefe_Inmediato, Documento_Aprobador_Jefe_Inmediato, Estado_Marcado_Jefe_Inmediato, Observacion_Jefe_Inmediato, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET 

            Fecha_Respuesta_Jefe_Inmediato = '${Fecha_Respuesta_Jefe_Inmediato}', 
            Hora_Respuesta_Jefe_Inmediato = '${Hora_Respuesta_Jefe_Inmediato}', 
            Aprobador_Jefe_Inmediato = '${Aprobador_Jefe_Inmediato}', 
            Documento_Aprobador_Jefe_Inmediato = '${Documento_Aprobador_Jefe_Inmediato}', 
            Estado_Marcado_Jefe_Inmediato = '${Estado_Marcado_Jefe_Inmediato}', 
            Observacion_Jefe_Inmediato = '${Observacion_Jefe_Inmediato}',

            Fecha_Respuesta_Planeacion = '${Fecha_Respuesta_Jefe_Inmediato}',
            Hora_Respuesta_Planeacion = '00:00:00',
            Aprobador_Planeacion = '-',
            Documento_Aprobador_Planeacion = '-',
            Estado_Marcado_Planeacion = '${Estado_Marcado_Jefe_Inmediato}',
            Observacion_Planeacion = '-',

            Fecha_Respuesta_Gerente_Area = '${Fecha_Respuesta_Jefe_Inmediato}',
            Hora_Respuesta_Gerente_Area = '00:00:00',
            Aprobador_Gerente_Area = '-',
            Documento_Aprobador_Gerente_Area = '-',
            Estado_Marcado_Gerente_Area = '${Estado_Marcado_Jefe_Inmediato}',
            Observacion_Gerente_Area = '-'

            WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

//FUNCION PARA RECHAZAR LAS NOVEDADES POR EL JEFE INMEDOATO O SUPERVISOR
function RejectNotificationNoveltieBossStaff(Fecha_Respuesta_Jefe_Inmediato, Hora_Respuesta_Jefe_Inmediato, Aprobador_Jefe_Inmediato, Documento_Aprobador_Jefe_Inmediato, Estado_Marcado_Jefe_Inmediato, Observacion_Jefe_Inmediato, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(null, 'Error interno del servidor');
        }
        try {
            const query = `UPDATE T_Novelties_Notifications SET 
            Fecha_Respuesta_Jefe_Inmediato = '${Fecha_Respuesta_Jefe_Inmediato}',
             Hora_Respuesta_Jefe_Inmediato = '${Hora_Respuesta_Jefe_Inmediato}',
             Aprobador_Jefe_Inmediato = '${Aprobador_Jefe_Inmediato}',
             Documento_Aprobador_Jefe_Inmediato = '${Documento_Aprobador_Jefe_Inmediato}',
             Estado_Marcado_Jefe_Inmediato = '${Estado_Marcado_Jefe_Inmediato}',
             Observacion_Jefe_Inmediato = '${Observacion_Jefe_Inmediato}' WHERE Id = '${Id}'`;
            connection.query(query, (error, results) => {
                connection.release(); // Cierra la conexión después de la consulta
                if (error) {
                    callback('Error al guardar el mensaje en la base de datos:', error);
                } else if (results.length === 0) {
                    callback('Mensaje guardado en la base de datos');
                } else {
                    callback('Mensaje guardado en la base de datos');
                }
            });
        } catch (error) {
            callback(error, 'Error interno del server');
        };
    });

};





//!FUNCIONES DE RECHAZO

//FUNCION PARA RECHAZAR LAS NOVEDADES POR LOS GERENTES
function RejectNotificationNoveltieBoss(Fecha_Respuesta_Jefe_Inmediato,
    Hora_Respuesta_Jefe_Inmediato,
    Aprobador_Jefe_Inmediato,
    Documento_Aprobador_Jefe_Inmediato,
    Estado_Marcado_Jefe_Inmediato,
    Observacion_Jefe_Inmediato,
    Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET 
            Fecha_Respuesta_Jefe_Inmediato = '${Fecha_Respuesta_Jefe_Inmediato}',
            Hora_Respuesta_Jefe_Inmediato = '${Hora_Respuesta_Jefe_Inmediato}', 
            Aprobador_Jefe_Inmediato = '${Aprobador_Jefe_Inmediato}', 
            Documento_Aprobador_Jefe_Inmediato = '${Documento_Aprobador_Jefe_Inmediato}', 
            Estado_Marcado_Jefe_Inmediato = '${Estado_Marcado_Jefe_Inmediato}', 
            Observacion_Jefe_Inmediato = '${Observacion_Jefe_Inmediato}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

//FUNCION PARA RECHAZAR LAS NOVEDADES POR LOS GERENTES
function RejectNotificationNoveltieManager(Fecha_Respuesta_Gerente_Area, Hora_Respuesta_Gerente_Area, Aprobador_Gerente_Area, Documento_Aprobador_Gerente_Area, Estado_Marcado_Gerente_Area, Observacion_Gerente_Area, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET 
            Fecha_Respuesta_Gerente_Area = '${Fecha_Respuesta_Gerente_Area}', 
            Hora_Respuesta_Gerente_Area = '${Hora_Respuesta_Gerente_Area}', 
            Aprobador_Gerente_Area = '${Aprobador_Gerente_Area}',
            Documento_Aprobador_Gerente_Area = '${Documento_Aprobador_Gerente_Area}', 
            Estado_Marcado_Gerente_Area = '${Estado_Marcado_Gerente_Area}', 
            Observacion_Gerente_Area = '${Observacion_Gerente_Area}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

//FUNCION PARA RECHAZAR LAS NOVEDADES POR LOS ANALISTAS
function RejectNotificationNoveltieWfm(Fecha_Respuesta_Planeacion, Hora_Respuesta_Planeacion, Aprobador_Planeacion, Documento_Aprobador_Planeacion, Estado_Marcado_Planeacion, Observacion_Planeacion, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET Fecha_Respuesta_Planeacion = '${Fecha_Respuesta_Planeacion}', Hora_Respuesta_Planeacion = '${Hora_Respuesta_Planeacion}', Aprobador_Planeacion = '${Aprobador_Planeacion}', Documento_Aprobador_Planeacion = '${Documento_Aprobador_Planeacion}', Estado_Marcado_Planeacion = '${Estado_Marcado_Planeacion}', Observacion_Planeacion = '${Observacion_Planeacion}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

//FUNCION PARA RECHAZAR LAS NOVEDADES POR LOS DE NOMINA
function RejectNotificationNoveltieEND(Fecha_Aprobador_Gestion_Humana, Hora_Aprobador_Gestion_Humana, Aprobador_Gestion_Humana, Documento_Aprobador_Gestion_Humana, Estado_Marcado_Gestion_Humana, Observacion_Gestion_Humana, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `UPDATE T_Novelties_Notifications SET Fecha_Aprobador_Gestion_Humana = '${Fecha_Aprobador_Gestion_Humana}', Hora_Aprobador_Gestion_Humana = '${Hora_Aprobador_Gestion_Humana}', Aprobador_Gestion_Humana = '${Aprobador_Gestion_Humana}', Documento_Aprobador_Gestion_Humana = '${Documento_Aprobador_Gestion_Humana}', Estado_Marcado_Gestion_Humana = '${Estado_Marcado_Gestion_Humana}', Observacion_Gestion_Humana = '${Observacion_Gestion_Humana}' WHERE Id = '${Id}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};



// ===============================================================================
// ==🚧 HORAS EXTRAS 🚧           ==
// ===============================================================================

function SaveNotificationHoursExtra(Fecha_Solicitud, Hora_Solicitud, Nombre_Completo, Documento, Usuario_Red, Cargo, Cliente_Area, Servicio, Documento_Jefe_Inmediato, Jefe_Inmediato, Fecha_Turno, Hora_Ini, Hora_Fin, Hora_Extra_Ini, Hora_Extra_Fin, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const query = `INSERT INTO T_Generate_Hours_Extra (
                Id, 
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
                ) VALUES(?)`;
            const Values = [Fecha_Solicitud, Hora_Solicitud, Nombre_Completo, Documento, Usuario_Red, Cargo, Cliente_Area, Servicio, Documento_Jefe_Inmediato, Jefe_Inmediato, Fecha_Turno, Hora_Ini, Hora_Fin, Hora_Extra_Ini, Hora_Extra_Fin, Id];
            connection.query(query, [Values], (error, result) => {
                connection.release();
                if (error) {
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede insertar la solicitud');
                } else {
                    callback('Solicitud realizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

function AcceptNotificationHoursExtra(Fecha_Turno, Documento, Hora_Extra_Ini, Hora_Extra_Fin, Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento_Aprobador, Estado, Observaciones, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const query = `UPDATE T_Generate_Hours_Extra SET Fecha_Aprobador = '${Fecha_Aprobador}', Hora_Aprobador = '${Hora_Aprobador}', Nombre_Aprobador = '${Nombre_Aprobador}', Documento_Aprobador = '${Documento_Aprobador}', Estado = '${Estado}', Observaciones = '${Observaciones}' WHERE Id = '${Id}'`;
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    connection.release();
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede insertar la solicitud');
                } else {
                    callback('Solicitud realizada correctamente');
                    Sistema_Punto.getConnection((errSistema, connectionSistema) => {
                        if (errSistema) {
                            callback('Error interno del servidor');
                        }
                        // Realiza la multiplicación para obtener Hora_Extra_Ini
                        const startHoursMinutes = Hora_Extra_Ini.split(':');
                        const HoraExtraInicio = parseInt(startHoursMinutes[0]) * 60 + parseInt(startHoursMinutes[1]);

                        const sql = `UPDATE  ColaboradorDimensionamento SET HoraExtraInicio = '${HoraExtraInicio}', HoraExtraFim = '${Hora_Extra_Fin}' WHERE CodigoColaborador = '${Documento}' AND Data = '${Fecha_Turno}'`;
                        connectionSistema.query(sql, (errorPunto, results) => {
                            connectionSistema.release();
                            if (errorPunto) {
                                connectionSistema.release();
                                callback('Error interno del servidor');
                            } else if (results.length === 0) {
                                callback('No se pudo actualizar los turnos');
                            } else {
                                callback('Solicitud realizada correctamente');
                            }
                        });
                    });
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};
function RejectNotificationHoursExtra(Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento_Aprobador, Estado, Observaciones, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const Values = [Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento_Aprobador, Estado, Observaciones, Id]
            const query = `UPDATE T_Generate_Hours_Extra SET Fecha_Aprobador = '${Fecha_Aprobador}', Hora_Aprobador = '${Hora_Aprobador}', Nombre_Aprobador = '${Nombre_Aprobador}', Documento_Aprobador = '${Documento_Aprobador}', Estado = '${Estado}', Observaciones = '${Observaciones}' WHERE Id = '${Id}'`;
            connection.query(query, [Values], (error, result) => {
                connection.release();
                if (error) {
                    connection.release();
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede insertar la solicitud');
                } else {
                    callback('Solicitud rechazada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};

function cancelNotificationHoursExtra(Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento, Estado, Id) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const Values = [Fecha_Aprobador, Hora_Aprobador, Nombre_Aprobador, Documento, Estado, Id]
            const query = `UPDATE T_Generate_Hours_Extra SET Fecha_Aprobador = '${Fecha_Aprobador}', Hora_Aprobador = '${Hora_Aprobador}', Nombre_Aprobador = '${Nombre_Aprobador}', Documento_Aprobador = '${Documento}', Estado = '${Estado}'WHERE Id = '${Id}'`;
            connection.query(query, [Values], (error, result) => {
                connection.release();
                if (error) {
                    connection.release();
                    console.log(error);
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede insertar la solicitud');
                } else {
                    callback('Solicitud rechazada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
};



//FUNCION PARA ENVIAR UNA nOVEDAD CREADA POR EL SUPERVISOR, DADA POR EL ASESOR 
function SaveNotificationForSupervisorForAdviser(
    Id,
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
    Observacion_Jefe_Inmediato) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback('Error interno del server');
        }
        try {
            const sql = `INSERT INTO T_Novelties_Notifications (
            Id,
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
            Fecha_Respuesta_Gerente_Area,
            Hora_Respuesta_Gerente_Area,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Estado_Marcado_Gerente_Area,
            Observacion_Gerente_Area,
            Fecha_Respuesta_Planeacion,
            Hora_Respuesta_Planeacion,
            Aprobador_Planeacion,
            Documento_Aprobador_Planeacion,
            Estado_Marcado_Planeacion,
            Observacion_Planeacion

            ) VALUES(?)`;

            const VALUES = [
                Id,
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
                Fecha_Solicitud,
                Hora_Solicitud,
                '-',
                '-',
                'Aceptado',
                '-',
                Fecha_Solicitud,
                Hora_Solicitud,
                '-',
                '-',
                'Aceptado',
                '-'
            ];

            connection.query(sql, [VALUES], (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    callback('Error interno del server');
                } else if (result.length === 0) {
                    callback('No se puede actualizar la solicitud en la base de datos');
                } else {
                    callback('Solicitud actualizada correctamente');
                }
            });
        } catch (error) {
            callback('Error interno del server');
        }
    });
}







































module.exports = {
    //EVENTO DE GUARDADO DESDE QUE SE ENVIA LA SAOLICITUD
    SaveNotificationNoveltie,
    //EVENTO DE GUARDADO DESDE QUE SE ENVIA LA SAOLICITUD DE STAFF
    sendNotificationNoveltiesStaff,
    //RECHAZA LA SOLICITUD POR EL los analistas
    RejectNotificationNoveltieWfm,
    //RECHAZA LA SOLICITUD POR LOS DE NOMINA
    RejectNotificationNoveltieEND,
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
    SaveAcceptNotificationNoveltieBoss,
    RejectNotificationNoveltieBoss

};