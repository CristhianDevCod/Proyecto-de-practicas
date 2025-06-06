const { Almaverso, Sociodemographic, AlmaversoSystemPoint } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const GenerateNoveltie = express.Router();
const cors = require('cors');
const { authenticateToken } = require('../Auth/AuthMiddleware');
GenerateNoveltie.use(cors());
GenerateNoveltie.use(express.json());
GenerateNoveltie.use(express.urlencoded({ extended: false }));


const pool = mysql.createPool(Almaverso);
const poolPunto = mysql.createPool(AlmaversoSystemPoint);
const poolSocio = mysql.createPool(Sociodemographic);

//ENDPOINT PARA OBTENER EL LISTADO DE NOVEDADES
GenerateNoveltie.get('/API/GET-ALL-NOVELTIES',  async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log(err);

                    return reject('Error interno del servidor' + err.message);
                } else {

                    const sql = `SELECT * FROM T_Generate_Novelties`;
                    connection.query(sql, (error, result) => {
                        connection.release();
                        if (error) {
                            console.log(error);

                            return reject('Error interno del servidor');
                        } else if (result.length === 0) {
                            resolve('No hay resultados');
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
})

//?ENDPOINT PARA OBTENER EL LISTADO DE SOLICITUDES DE NOVEDADES POR ASESOR
GenerateNoveltie.get('/API/GET/ALL-DATA-NOVELTIE/USERS/:Usuario_Red', authenticateToken, async (req, res, next) => {
    const Usuario_Red = req.params.Usuario_Red;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const sql = `SELECT 
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
    
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
    
    
                FROM T_Novelties_Notifications WHERE Usuario_Red = '${Usuario_Red}'`;
                connection.query(sql, (err, result) => {
                    connection.release();
                    if (err) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No hay resultado');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS JEFES INMEDIATOS
GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-BOSS/:Documento', authenticateToken, async (req, res, next) => {
    const Documento = req.params.Documento;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor' + err.message);
                } else {
                    const sql = `SELECT  
                    Id,
                    Codigo,
                    DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                    DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio, 
                    Tipo_Solicitud,
                    DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                    DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
        
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    
                    DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                    Hora_Respuesta_Planeacion,
                    Aprobador_Planeacion,
                    Documento_Aprobador_Planeacion,
                    Estado_Marcado_Planeacion,
                    Observacion_Planeacion,
                    DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                    Hora_Respuesta_Gerente_Area,
                    Aprobador_Gerente_Area,
                    Documento_Aprobador_Gerente_Area,
                    Estado_Marcado_Gerente_Area,
                    Observacion_Gerente_Area,
                    DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                    Fecha_Aprobador_Gestion_Humana,
                    Hora_Aprobador_Gestion_Humana,
                    Aprobador_Gestion_Humana,
                    Documento_Aprobador_Gestion_Humana,
                    Estado_Marcado_Gestion_Humana,
                    Observacion_Gestion_Humana
                    FROM T_Novelties_Notifications 
                    WHERE 
                    Aprobador_Jefe_Inmediato IS NULL AND
                    Documento_Aprobador_Jefe_Inmediato IS NULL AND
                    Estado_Marcado_Jefe_Inmediato IS NULL AND
                    Documento_Jefe_Inmediato = ?`;
                    connection.query(sql, [Documento], (error, result) => {
                        connection.release();
                        if (error) {
                            return reject('Error interno del servidor');
                        } else if (result.length === 0) {
                            resolve('No tienes solicitudes por revisar');
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});
GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-BOSS/HISTORY/:Documento', authenticateToken, async (req, res, next) => {
    const Documento = req.params.Documento;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor' + err.message);
                } else {
                    const sql = `SELECT  
                    Id,
                    Codigo,
                    DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                    DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio, 
                    Tipo_Solicitud,
                    DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                    DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                    Dias_Calendario,
                    Dias_Laborales,
                    Motivo,
        
                    Time_Money,
                    How_Long,
                    Numero_Incapacidad,
                    Numero_Diagnostico,
                    Nombre_Diagnostico,
                    Estado_Marcado_Jefe_Inmediato,
                    DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                    Hora_Respuesta_Planeacion,
                    Aprobador_Planeacion,
                    Documento_Aprobador_Planeacion,
                    Estado_Marcado_Planeacion,
                    Observacion_Planeacion,
                    DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                    Hora_Respuesta_Gerente_Area,
                    Aprobador_Gerente_Area,
                    Documento_Aprobador_Gerente_Area,
                    Estado_Marcado_Gerente_Area,
                    Observacion_Gerente_Area,
                    DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                    Fecha_Aprobador_Gestion_Humana,
                    Hora_Aprobador_Gestion_Humana,
                    Aprobador_Gestion_Humana,
                    Documento_Aprobador_Gestion_Humana,
                    Estado_Marcado_Gestion_Humana,
                    Observacion_Gestion_Humana
                    FROM T_Novelties_Notifications 
                    WHERE 
                    Documento_Jefe_Inmediato = ?`;
                    connection.query(sql, [Documento], (error, result) => {
                        connection.release();
                        if (error) {
                            return reject('Error interno del servidor');
                        } else if (result.length === 0) {
                            resolve('No tienes solicitudes por revisar');
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-BOSS/STAFF/NOVELTIES/:Documento', authenticateToken, async (req, res, next) => {
    const Documento = req.params.Documento;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { return reject('Error interno del servidor'); }
                const sql = `SELECT  
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
    
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
                FROM T_Novelties_Notifications 
                WHERE 
                
                Estado_Marcado_Gerente_Area IS NULL AND 
                Estado_Marcado_Planeacion IS NULL AND 
                Estado_Marcado_Gestion_Humana IS NULL AND
                Documento_Jefe_Inmediato = ?`;
                connection.query(sql, [Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No tienes solicitudes por revisar');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS JEFES INMEDIATOS -LAS NOVEDADES PEDIDAS POR SUS ASESORES
GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-BOSS/HISTORY/ADVISER/:Documento', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { return reject('Error interno del servidor'); }
                const Documento = req.params.Documento;
                const sql = `SELECT  
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
                
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
                FROM T_Novelties_Notifications WHERE Documento_Jefe_Inmediato = '${Documento}'`;
                connection.query(sql, (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No tienes solicitudes por revisar');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS GERENTES
GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-Manager/:Cliente', authenticateToken, async (req, res, next) => {
    const Cliente = req.params.Cliente.split(',');
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { return reject('Error interno del servidor'); }

                const sql = `SELECT  
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
    
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
                FROM T_Novelties_Notifications WHERE 
    
                Cliente_Area IN (?)
                
                AND Estado_Marcado_Jefe_Inmediato = 'Aceptado'

                AND Fecha_Respuesta_Gerente_Area IS NULL
                AND Hora_Respuesta_Gerente_Area IS NULL
                AND Aprobador_Gerente_Area IS NULL
                AND Documento_Aprobador_Gerente_Area IS NULL
                AND Estado_Marcado_Gerente_Area IS NULL  
                
                AND Hora_Respuesta_Planeacion IS NULL
                AND Aprobador_Planeacion IS NULL
                AND Documento_Aprobador_Planeacion IS NULL
                AND Estado_Marcado_Planeacion IS NULL
    
                AND Fecha_Aprobador_Gestion_Humana IS NULL
                AND Hora_Aprobador_Gestion_Humana IS NULL
                AND Aprobador_Gestion_Humana IS NULL
                AND Documento_Aprobador_Gestion_Humana IS NULL
                AND Estado_Marcado_Gestion_Humana IS NULL 
                `;
                connection.query(sql, [Cliente], (error, result) => {
                    connection.release();
                    if (error) {
                        connection.release();
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        connection.release();
                        resolve('No tienes solicitudes por revisar');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS ANALISTA DE WORFORCE
GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-WFM/:Cliente', authenticateToken, async (req, res, next) => {
    const Cliente = req.params.Cliente.split(',');
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { return reject('Error interno del servidor'); }
                const sql = `SELECT  
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
    
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
                FROM T_Novelties_Notifications WHERE 
                Cliente_Area IN (?)
                
                
                AND Fecha_Respuesta_Gerente_Area IS NOT NULL
                AND Hora_Respuesta_Gerente_Area IS NOT NULL
                AND Aprobador_Gerente_Area IS NOT NULL
                AND Documento_Aprobador_Gerente_Area IS NOT NULL
                AND Estado_Marcado_Gerente_Area = 'Aceptado'  
    
                AND Fecha_Respuesta_Planeacion IS NULL
                AND Hora_Respuesta_Planeacion IS NULL
                AND Aprobador_Planeacion IS NULL
                AND Documento_Aprobador_Planeacion IS NULL
                AND Estado_Marcado_Planeacion IS NULL
                
                AND Fecha_Aprobador_Gestion_Humana IS NULL
                AND Hora_Aprobador_Gestion_Humana IS NULL
                AND Aprobador_Gestion_Humana IS NULL
                AND Documento_Aprobador_Gestion_Humana IS NULL
                AND Estado_Marcado_Gestion_Humana IS NULL 
                `;
                connection.query(sql, [Cliente], (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No tienes solicitudes por revisar');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS DE NOMINA
GenerateNoveltie.get('/API/GET/ALL-DATA-FOR-NOMINA/:Cliente', authenticateToken, async (req, res, next) => {
    const Cliente_Area = req.params.Cliente.split(',');
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { return reject('Error interno del servidor'); }
                const sql = `SELECT  
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
    
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
                FROM T_Novelties_Notifications WHERE 
    
                Fecha_Respuesta_Gerente_Area IS NOT NULL
                AND Hora_Respuesta_Gerente_Area IS NOT NULL
                AND Aprobador_Gerente_Area IS NOT NULL
                AND Documento_Aprobador_Gerente_Area IS NOT NULL
                AND Estado_Marcado_Gerente_Area = 'Aceptado'
    
                AND Fecha_Respuesta_Planeacion IS NOT NULL
                AND Hora_Respuesta_Planeacion IS NOT NULL
                AND Aprobador_Planeacion IS NOT NULL
                AND Documento_Aprobador_Planeacion IS NOT NULL
                AND Estado_Marcado_Planeacion = 'Aceptado'
                
                AND Fecha_Aprobador_Gestion_Humana IS NULL
                AND Hora_Aprobador_Gestion_Humana IS NULL
                AND Aprobador_Gestion_Humana IS NULL
                AND Documento_Aprobador_Gestion_Humana IS NULL
                AND Estado_Marcado_Gestion_Humana IS NULL 
                AND Cliente_Area IN (?)
                `;

                connection.query(sql, [Cliente_Area], (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No tienes solicitudes por revisar');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});



//?ENDPOINT PARA EXPORTAR LAS NOVEDADES POR EL JEFEINMEDIATO
GenerateNoveltie.get('/API/GET/NOVELTIES/ADVISER-FOR-BOSS/:monthSeleted/:Documento', authenticateToken, async (req, res, next) => {
    const monthSeleted = req.params.monthSeleted; // Debe ser una fecha en formato "YYYY-MM-DD"
    const Documento = req.params.Documento;
    try {
        const Query = () => new Promise((resolve, reject) => {

            // Verifica si se proporcionó un mes válido
            if (!monthSeleted) {
                res.status(400).send('El parámetro "mes" es obligatorio');;
            }

            pool.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return reject('Error  interno del servidor');
                }
                // Formatea la fecha seleccionada y obtén el primer y último día del mes
                const fechaSeleccionada = new Date(monthSeleted);
                // const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
                // const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

                const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
                const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

                // Formatea las fechas en el formato "YYYY-MM-DD"
                const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
                const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
                const sql = `SELECT 
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Usuario_Red, 
                Nombre_Completo, 
                Cliente_Area, 
                Cargo, 
                Servicio, 
                Tipo_Solicitud, 
                Dias_Calendario, 
                Dias_Laborales,
                Motivo,
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana
    
                FROM T_Novelties_Notifications WHERE Fecha_Solicitud BETWEEN ? AND ? AND Documento_Jefe_Inmediato = ?`
                connection.query(sql, [fechaInicio, fechaFin, Documento], (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        return reject('Error  interno del servidor');
                    } else if (result.length === 0) {
                        res.status(404).send('No hay resultados para el mes seleccionado');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ENDPOINT PARA EXPORTAR LAS NOVEDADES POR LOS DE NOMINA
GenerateNoveltie.get('/API/GET/NOVELTIES/ADVISER-FOR-NOMINA/:monthSeleted/', authenticateToken, async (req, res, next) => {
    const monthSeleted = req.params.monthSeleted; // Debe ser una fecha en formato "YYYY-MM-DD"
    try {
        const Query = () => new Promise((resolve, reject) => {

            // Verifica si se proporcionó un mes válido
            if (!monthSeleted) {
                res.status(400).send('El parámetro "mes" es obligatorio');
                ;
            }

            pool.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return reject('Error  interno del servidor');
                }
                // Formatea la fecha seleccionada y obtén el primer y último día del mes
                const fechaSeleccionada = new Date(monthSeleted);

                const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
                const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

                // Formatea las fechas en el formato "YYYY-MM-DD"
                const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
                const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
                const sql = `SELECT 
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo, 
                Cliente_Area, 
                Cargo, 
                Servicio, 
                Tipo_Solicitud, 
                Dias_Calendario, 
                Dias_Laborales,
    
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                
                Motivo,
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana
    
                FROM T_Novelties_Notifications 
                WHERE Fecha_Solicitud BETWEEN '${fechaInicio}' AND '${fechaFin}'`
                connection.query(sql, (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        return reject('Error  interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No hay resultados para el mes seleccionado');
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

GenerateNoveltie.get('/API/GET/NOVELTIES/ADVISER-FOR-WFM/:monthSeleted/', authenticateToken, async (req, res, next) => {
    const monthSeleted = req.params.monthSeleted; // Debe ser una fecha en formato "YYYY-MM-DD"
    try {
        const Query = () => new Promise((resolve, reject) => {
            if (!monthSeleted) {
                res.status(400).send('El parámetro "mes" es obligatorio');
                ;
            }
            pool.getConnection((error, connection) => {
                if (error) {
                    console.log(error);
                    return reject('Error  interno del servidor');
                }
                // Formatea la fecha seleccionada y obtén el primer y último día del mes
                const fechaSeleccionada = new Date(monthSeleted);
                // const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
                // const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

                const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
                const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

                // Formatea las fechas en el formato "YYYY-MM-DD"
                const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
                const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
                const sql = `SELECT * FROM T_Novelties_Notifications WHERE Fecha_Solicitud BETWEEN ? AND ?`
                connection.query(sql, [fechaInicio, fechaFin], (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        return reject('Error  interno del servidor');
                    } else if (result.length === 0) {
                        res.status(404).send('No hay resultados para el mes seleccionado');
                    } else {
                        resolve(result);
                    }
                });
            });

        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }

    // Verifica si se proporcionó un mes válido

});


//LOS SIGUIENTES ENDPOINS SON PARA OBTENER EL TAMAÑO DE LAS SOLICITUDES 
//EN CURSO - APROBADOS - RECHAZADOS
GenerateNoveltie.get('/API/GET/LENGTH/REQUEST-NOVELTIES-PENDING/:Usuario_Red', authenticateToken, async (req, res, next) => {
    const Usuario_Red = req.params.Usuario_Red;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const sql = `SELECT * FROM T_Novelties_Notifications WHERE 
                
                Estado_Marcado_Gerente_Area IS NULL AND
                Estado_Marcado_Planeacion IS NULL AND
                Estado_Marcado_Gestion_Humana IS NULL 
                AND Usuario_Red = '${Usuario_Red}'
    
                OR 
                
                
                Estado_Marcado_Gerente_Area IS NULL AND
                Estado_Marcado_Planeacion IS NULL AND
                Estado_Marcado_Gestion_Humana IS NULL 
                AND Usuario_Red = '${Usuario_Red}'
                
                OR
    
                Estado_Marcado_Gerente_Area = 'Aceptado' AND
                Estado_Marcado_Planeacion IS NULL AND
                Estado_Marcado_Gestion_Humana IS NULL
                AND Usuario_Red = '${Usuario_Red}'
        
                OR
    
                
                Estado_Marcado_Gerente_Area = 'Aceptado' AND
                Estado_Marcado_Planeacion = 'Aceptado' AND
                Estado_Marcado_Gestion_Humana IS NULL
    
                AND Usuario_Red = '${Usuario_Red}'
                `;

                connection.query(sql, (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Erro interno del servidor');
                    } else if (result.length === 0) {
                        res.status(200).send('0');
                    } else {
                        resolve(result);
                    }
                });
            })
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

GenerateNoveltie.get('/API/GET/LENGTH/REQUEST-NOVELTIES-ACCEPTS/:Usuario_Red', authenticateToken, async (req, res, next) => {
    const Usuario_Red = req.params.Usuario_Red;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const sql = `SELECT * FROM T_Novelties_Notifications WHERE 
                Estado_Marcado_Planeacion = 'Aceptado' AND
                Estado_Marcado_Gerente_Area = 'Aceptado' AND
                Estado_Marcado_Gestion_Humana = 'Aceptado' AND Usuario_Red = '${Usuario_Red}'`;
                connection.query(sql, (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Erro interno del servidor');
                    } else if (result.length === 0) {
                        res.status(200).send('0');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});
GenerateNoveltie.get('/API/GET/LENGTH/REQUEST-NOVELTIES-REJECTS/:Usuario_Red', authenticateToken, async (req, res, next) => {
    const Usuario_Red = req.params.Usuario_Red;
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const sql = `SELECT * FROM T_Novelties_Notifications WHERE  
                
                Estado_Marcado_Planeacion IS NULL AND
                Estado_Marcado_Gerente_Area IS NULL AND
                Estado_Marcado_Gestion_Humana IS NULL AND
                Usuario_Red = '${Usuario_Red}'
                
                OR 
                
                Estado_Marcado_Planeacion = 'Rechazado' AND
                Estado_Marcado_Gerente_Area IS NULL AND
                Estado_Marcado_Gestion_Humana IS NULL AND
                Usuario_Red = '${Usuario_Red}'
                
                OR
                
                Estado_Marcado_Planeacion = 'Aceptado' AND
                Estado_Marcado_Gerente_Area = 'Rechazado' AND
                Estado_Marcado_Gestion_Humana IS NULL AND
                Usuario_Red = '${Usuario_Red}'
                
                OR
                
                Estado_Marcado_Planeacion = 'Aceptado' AND
                Estado_Marcado_Gerente_Area = 'Aceptado' AND
                Estado_Marcado_Gestion_Humana = 'Rechazado' AND
                Usuario_Red = '${Usuario_Red}'
                
                `;
                connection.query(sql, (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Erro interno del servidor');
                    } else if (result.length === 0) {
                        res.status(200).send('0');
                    } else {
                        resolve(result);
                    }
                });
            })
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//OBTIENE EL LISTADO DE ASESORES EL CUAL EL JEFE INMEDIATO ESTA A CARGO PARA GENERAR UNA SOLICITUD POR EL SUPER EN CASO TAL EL ASESOR NO ESTA 
GenerateNoveltie.get('/API/GET/LIST-FOR-SUPERVISOR/GENERATE/NOVELTIE-FOR-SUPERVISOR/:Documento', authenticateToken, async (req, res, next) => {
    const Documento = req.params.Documento;
    try {
        const Query = () => new Promise((resolve, reject) => {
            poolSocio.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                const sql = `SELECT Documento, Nombres, Apellidos, Cargo, Cliente_Area, Servicio, Usuario_Red, Estado_Empleado FROM T_Socio WHERE 
                Documento_Jefe_Inmediato = ? AND 
                Estado_Empleado = 'Activo' AND
                Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento_Jefe_Inmediato = ? AND Estado_Empleado = 'Activo')`;
                connection.query(sql, [Documento, Documento], (error, result) => {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        resolve('No tienes asesores asignadas');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//ACTUALIZA LOS TURNOS SI NÓMINA A ACEPTADO LAS NOVEDADES
GenerateNoveltie.put('/API/UPDATE/SHIFTS-FOR-NOMINA/ACCEPTS/', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                try {
                    const { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud, Servicio } = req.body;
                    const sql = `UPDATE T_Shifts_Staff SET 
                    Des_1_Fin = '00:00:00',
                    Des_1_Ini = '00:00:00',
                    Des_2_Fin = '00:00:00',
                    Des_2_Ini = '00:00:00',
                    Des_3_Fin = '00:00:00',
                    Des_3_Ini = '00:00:00',
                    Dialogo_Fin = '00:00:00',
                    Dialogo_Ini = '00:00:00',
                    Horas_Laboradas = '0',
                    Lac_Fin = '00:00:00',
                    Lac_Ini = '00:00:00',
                    Lunch_Fin = '00:00:00',
                    Lunch_Ini = '00:00:00',
                    Novedad = '${Tipo_Solicitud}',
                    Servicio = '${Servicio}',
                    Training_1_Fin = '00:00:00',
                    Training_1_Ini = '00:00:00',
                    Training_2_Fin = '00:00:00',
                    Training_2_Ini = '00:00:00',
                    Turno_Fin = '00:00:00',
                    Turno_Ini = '00:00:00' WHERE Documento = '${documento}' AND Fecha BETWEEN '${Fecha_Inicio_Novedad}' AND '${Fecha_Fin_Novedad}'`;

                    connection.query(sql, (error, result) => {
                        connection.release();
                        if (error) {
                            return reject('Error interno del servidor');
                        } else if (result.length === 0) {
                            res.status(404).send('No se pudo actualizar el turno');
                        } else {
                            res.status(200).send('Turnos actualizados correctamente');
                        }
                    });
                } catch (error) {
                    return reject('Error interno del servidor');
                }
            });

        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//?ACTUALIZA LOS TURNOS SI NÓMINA A ACEPTADO LAS NOVEDADES EN CASO LA NOVEDAD SEA ASIL TOMA O VAC O LICENCIA NO REMUNERADA 
GenerateNoveltie.put('/API/UPDATE/SHIFTS-FOR-NOMINA/ACCEPTS/AISL', authenticateToken, async (req, res, next) => {
    try {
        const Query = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error interno del servidor');
                }
                try {
                    const { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Novedad, Servicio } = req.body;
                    const sql = `UPDATE T_Shifts_Staff SET 
                    Des_1_Fin = '00:00:00',
                    Des_1_Ini = '00:00:00',
                    Des_2_Fin = '00:00:00',
                    Des_2_Ini = '00:00:00',
                    Des_3_Fin = '00:00:00',
                    Des_3_Ini = '00:00:00',
                    Dialogo_Fin = '00:00:00',
                    Dialogo_Ini = '00:00:00',
                    Horas_Laboradas = '0',
                    Lac_Fin = '00:00:00',
                    Lac_Ini = '00:00:00',
                    Lunch_Fin = '00:00:00',
                    Lunch_Ini = '00:00:00',
                    Novedad = '${Tipo_Novedad}',
                    Servicio = '${Servicio}',
                    Training_1_Fin = '00:00:00',
                    Training_1_Ini = '00:00:00',
                    Training_2_Fin = '00:00:00',
                    Training_2_Ini = '00:00:00',
                    Turno_Fin = '00:00:00',
                    Turno_Ini = '00:00:00' WHERE Documento = '${documento}' AND Fecha BETWEEN '${Fecha_Inicio_Novedad}' AND '${Fecha_Fin_Novedad}'`;

                    connection.query(sql, (error, result) => {
                        connection.release();
                        if (error) {
                            return reject('Error interno del servidor');
                        } else if (result.length === 0) {
                            res.status(404).send('No se pudo actualizar el turno');
                        } else {
                            res.status(200).send('Turnos actualizados correctamente');
                        }
                    });
                } catch (error) {
                    return reject('Error interno del servidor');
                }
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

//ACTUALIZA LAS NOVEDADES ES CASO TAL DE QUE LOS DE NOMINA ACEPTARAN X NOVEDAD
GenerateNoveltie.put('/API/UPDATE/AL_NOVEDADES_NOMINA/', authenticateToken, async (req, res, next) => {
    const { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud } = req.body;
    let novedad_ausencia;
    try {
        const Query = () => new Promise((resolve, reject) => {
            poolPunto.getConnection((error, connection) => {
                if (error) {
                    return reject('Error interno del servidor');
                    return;
                }


                const value = new Date();
                const year = value.getFullYear();
                const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
                const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
                const Fecha = `${year}-${month}-${day}`;

                if (Tipo_Solicitud === 'LDF') {
                    novedad_ausencia = 'DIA DE LA FAMILIA';
                } else if (Tipo_Solicitud === 'LMA') {
                    novedad_ausencia = 'LICENCIA DE MATERNIDAD';
                } else if (Tipo_Solicitud === 'LLT') {
                    novedad_ausencia = 'LICENCIA POR LUTO';
                } else if (Tipo_Solicitud === 'ICCP') {
                    // Calcular la diferencia en días entre las fechas
                    const diffDays = Math.floor((new Date(Fecha_Fin_Novedad) - new Date(Fecha_Inicio_Novedad)) / (1000 * 60 * 60 * 24));

                    // Determinar la novedad_ausencia según la diferencia en días
                    if (diffDays < 3) {
                        novedad_ausencia = 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS';
                    } else {
                        novedad_ausencia = 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS';
                    }
                } else if (Tipo_Solicitud === 'CAL') {
                    novedad_ausencia = 'AUSENCIA JUSTIFICADA REMUNERADA';
                }


                const sql = `UPDATE BI_WFM.AL_NOVEDADES_NOMINA SET novedad_ausencia = '${novedad_ausencia}', observacion_ticket = '${novedad_ausencia} / ${Fecha}' WHERE id_cedula = '${documento}' AND fecha BETWEEN '${Fecha_Inicio_Novedad}' AND '${Fecha_Fin_Novedad}' AND novedad = 'TUR'`;

                connection.query(sql, (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        return reject('Error interno del servidor');
                    } else if (result.length === 0) {
                        console.log('No se pudo actualizar la tabla de novedades de nomina');
                        resolve('No se pudo actualizar las novedades');
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send('Not Result');
        }

        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});








module.exports = GenerateNoveltie;