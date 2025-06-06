const { Almaverso, AlmaversoSystemPoint } = require('../BDconfig');
const { authenticateToken } = require("../Auth/AuthMiddleware");
const mysql = require('mysql2');
const express = require('express');
const Tardiness = express.Router();
const cors = require('cors');
const crypto = require('crypto');

Tardiness.use(cors());
Tardiness.use(express.json());
Tardiness.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
const poolNovedadesNomina = mysql.createPool(AlmaversoSystemPoint);

//función crypto que proporciona Node.js para generar valores hash
function generateUniqueId() {
    const currentTimestamp = new Date().getTime().toString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha1').update(currentTimestamp + randomBytes).digest('hex');
    return hash;
}


//?ASESOR
//?ENDPOINT PARA LA GENERACION DEL REPORTE DE IMPUNTUALIDAD
Tardiness.post('/API/SAVE/TARDINESS-REQUEST/', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send(error);
        }

        try {
            const value = new Date();
            var Hora_Solicitud = value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();

            const Id = generateUniqueId();
            const Fecha_Solicitud = req.body.dateTardiness;
            const Fecha_Fin_Solicitud = req.body.dateTardinessTwo;
            const Documento = req.body.Documento;
            const Usuario_Red = req.body.Usuario_Red;
            const Nombre_Completo = req.body.Nombre_Completo;
            const Cliente = req.body.Cliente_Area;
            const Cargo = req.body.Cargo;
            const Servicio = req.body.Servicio;
            const Tipo_Impuntualidad = req.body.typeTardiness;
            const Numero_Apolo = req.body.numberApolo;

            const Number_Iccp = req.body.Number_Iccp;
            const Number_Diag = req.body.Number_Diag;
            const Name_Diag = req.body.Name_Diag;

            const Descripcion = req.body.description;
            const Jefe_Inmediato = req.body.Jefe_Inmediato;
            const Documento_Jefe_Inmediato = req.body.Documento_Jefe_Inmediato;

            const VALUES = [Id,
                Fecha_Solicitud,
                Fecha_Fin_Solicitud,
                Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente,
                Cargo,
                Servicio,
                Tipo_Impuntualidad,
                Numero_Apolo,

                Number_Iccp,
                Number_Diag,
                Name_Diag,

                Descripcion,
                Jefe_Inmediato,
                Documento_Jefe_Inmediato
            ]

            const sql = `INSERT INTO T_Tardiness_Noveltie (
                Id, 
                Fecha_Solicitud,
                Fecha_Fin_Solicitud,
                Hora_Solicitud,
                Documento, 
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio,
                Tipo_Impuntualidad,
                Numero_Apolo,

                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,

                Descripcion,
                Jefe_Inmediato,
                Documento_Jefe_Inmediato
                ) VALUES (?)`;
            connection.query(sql, [VALUES], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(err);
                } else if (result.length === 0) {
                    return res.status(404).send('No se pudo hacer el registro de la impuntualidad');
                } else {
                    return res.status(200).send('Reporte registrado correctamente');
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });
});


//?ENDPOINT PARA LA GENERACION DEL REPORTE DE IMPUNTUALIDAD STAFF
Tardiness.post('/API/SAVE/TARDINESS-REQUEST/STAFF', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            connection.release();
            return res.status(500).send(error);
        }

        try {
            const value = new Date();
            var Hora_Solicitud = value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();

            const Id = generateUniqueId();
            const Fecha_Solicitud = req.body.dateTardiness;
            const Fecha_Fin_Solicitud = req.body.dateTardinessTwo;
            const Documento = req.body.Documento;
            const Usuario_Red = req.body.Usuario_Red;
            const Nombre_Completo = req.body.Nombre_Completo;
            const Cliente = req.body.Cliente_Area;
            const Cargo = req.body.Cargo;
            const Servicio = req.body.Servicio;
            const Tipo_Impuntualidad = req.body.typeTardiness;
            const Numero_Apolo = req.body.numberApolo;
            const Grupo = req.body.Grupo;

            const Number_Iccp = req.body.Number_Iccp;
            const Number_Diag = req.body.Number_Diag;
            const Name_Diag = req.body.Name_Diag;

            const Descripcion = req.body.description;
            const Jefe_Inmediato = req.body.Jefe_Inmediato;
            const Documento_Jefe_Inmediato = req.body.Documento_Jefe_Inmediato;

            const VALUES = [
                Id,
                Fecha_Solicitud,
                Fecha_Fin_Solicitud,
                Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente,
                Cargo,
                Servicio,
                Tipo_Impuntualidad,
                Numero_Apolo,
                Grupo,

                Number_Iccp,
                Number_Diag,
                Name_Diag,

                Descripcion,
                Jefe_Inmediato,
                Documento_Jefe_Inmediato
            ]

            const sql = `INSERT INTO T_Tardiness_Noveltie (
                Id, 
                Fecha_Solicitud,
                Fecha_Fin_Solicitud,
                Hora_Solicitud,
                Documento, 
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio,
                Tipo_Impuntualidad,
                Numero_Apolo,
                \`Group\`,

                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                
                Descripcion,
                Jefe_Inmediato,
                Documento_Jefe_Inmediato
                ) VALUES (?)`;
            connection.query(sql, [VALUES], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(err);
                } else if (result.length === 0) {
                    return res.status(404).send('No se pudo hacer el registro de la impuntualidad');
                } else {
                    return res.status(200).send('Reporte registrado correctamente');
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });
});



//?ENDPOINT PARA OBTENER EL NUMERO DE REPORTES APROBADOS 
Tardiness.get('/API/GET/LENGTH/REPORTS/ACCEPTS/:Documento', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Documento = req.params.Documento;
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE Estado_Marcado_Aprobador_1 = 'Aceptado' AND  Estado_Marcado_Aprobador_2 = 'Aceptado' AND Documento = ?`;
            connection.query(sql, [Documento], (error, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('0');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

//?ENDPOINT PARA OBTENER EL NUMERO DE REPORTES RECHAZADOS
Tardiness.get('/API/GET/LENGTH/REPORTS/REJECTS/:Documento', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Documento = req.params.Documento;
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE 
            Documento = '${Documento}' AND
            Estado_Marcado_Aprobador_1 = 'Aceptado' AND  Estado_Marcado_Aprobador_2 = 'Rechazado' OR 
            Estado_Marcado_Aprobador_1 = 'Rechazado' AND Documento = '${Documento}'`;
            connection.query(sql, [Documento], (error, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('0');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

//?ENDPOINT PARA OBTENER EL NUMERO DE REPORTES EN CURSO
Tardiness.get('/API/GET/LENGTH/REPORTS/PENDING/:Documento', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Documento = req.params.Documento;
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE 
            Documento = '${Documento}' AND
            Estado_Marcado_Aprobador_1 IS NULL AND 
            Estado_Marcado_Aprobador_2 IS NULL OR 
            Estado_Marcado_Aprobador_1 = 'Aceptado' AND 
            Estado_Marcado_Aprobador_2 IS NULL AND
            Documento = '${Documento}'`;
            connection.query(sql, [Documento], (error, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('0');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

//?ENDPOINT PARA OBTNER LOS REPORTES GENERADOS 
Tardiness.get('/API/GET/TARDINESS/RESPORTS/:Usuario_Red', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Usuario_Red = req.params.Usuario_Red;
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE Usuario_Red = ?`;
            connection.query(sql, [Usuario_Red], (error, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

//?OBTENER LA LISTA DE IMPUNTUALIDADES 
Tardiness.get('/API/GET/LIST/TYPE_TARDINESS/', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const sql = `SELECT * FROM T_Type_Tardiness`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(204).send('No hay resultados');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});


//!SUPERVISOR
//!ENDPOINT PARA OBTNER LOS REPORTES GENERADOS DE IMPUNTUALIDAD Y MOSTRARSELOS A EL SUPERVISOR
Tardiness.get('/API/GET/TARDINESS/RESPORTS/BOSS/:Documento', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Documento = req.params.Documento;
            const Grupo = '-';
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE 
            \`Group\` = '${Grupo}' AND
            Documento_Jefe_Inmediato = '${Documento}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

//!ENDPOINT PARA OBTNER LOS REPORTES GENERADOS DE IMPUNTUALIDAD Y MOSTRARSELOS A JEFE INMEDIATO DE STAFF
Tardiness.get('/API/GET/TARDINESS/RESPORTS/BOSS-STAFF/:Documento', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Documento = req.params.Documento;
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE 
            Fecha_Aprobador_1 IS NULL AND 
            Hora_Aprobador_1 IS NULL AND 
            Documento_1 IS NULL AND 
            \`Group\` = 'STAFF' AND
            Documento_Jefe_Inmediato = ?`;
            connection.query(sql, [Documento], (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

Tardiness.get('/API/GET/TARDINESS/RESPORTS/BOSS-STAFF/LIST/:Documento', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Documento = req.params.Documento;
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE 
            \`Group\` = 'STAFF' AND
            Documento_Jefe_Inmediato = ?`;
            connection.query(sql, [Documento], (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});

//!ACEPTA O RECHAZA LA SOLICITUD EL SEUPERVISOR
Tardiness.put('/API/REJECTSORACCEPTS/TARDINESS/:Id', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const Id = req.params.Id;
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const Fecha_Aprobador_1 = `${year}-${month}-${day}`;
            const fechaSolicitudISO = new Date(req.body.Fecha_Solicitud);
            const Fecha_Fin_Solicitud = req.body.Fecha_Fin_Solicitud;

            // Obtén el año, mes y día en formato deseado
            const yearSolicitud = fechaSolicitudISO.getFullYear();
            const monthSolicitud = (fechaSolicitudISO.getMonth() + 1).toString().padStart(2, '0');
            const daySolicitud = fechaSolicitudISO.getDate().toString().padStart(2, '0');


            // Crea la cadena de fecha en el formato deseado
            const Fecha_Solicitud = `${yearSolicitud}-${monthSolicitud}-${daySolicitud}`;

            var Hora_Aprobador_1 = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();

            const { Aprobador_1, Documento_1, Estado_Marcado_Aprobador_1, Observacion_1, Documento, Tipo_Impuntualidad } = req.body;
            const sql = `UPDATE T_Tardiness_Noveltie SET Fecha_Aprobador_1 = '${Fecha_Aprobador_1}',
            Hora_Aprobador_1 = '${Hora_Aprobador_1}',
            Aprobador_1 = '${Aprobador_1}',
            Documento_1 = '${Documento_1}',
            Estado_Marcado_Aprobador_1 = '${Estado_Marcado_Aprobador_1}',
            Observacion_1 = '${Observacion_1}',

            Fecha_Aprobador_2 = '${Fecha_Aprobador_1}',
            Hora_Aprobador_2 = '${Hora_Aprobador_1}',
            Aprobador_2 = '-',
            Documento_2 = '-',
            Estado_Marcado_Aprobador_2 = '${Estado_Marcado_Aprobador_1}',
            Observacion_2 = '-'

            WHERE Id = '${Id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    poolNovedadesNomina.getConnection((errorNovedad, connectionNovedades) => {
                        if (errorNovedad) {
                            return res.status(500).send('Error interno del servidor');
                        } else {
                            const sql = `UPDATE BI_WFM.AL_NOVEDADES_NOMINA SET novedad_ausencia = '${Tipo_Impuntualidad}', observacion_ticket = '${Tipo_Impuntualidad} / ${Fecha_Aprobador_1}' WHERE id_cedula = '${Documento}' AND fecha BETWEEN '${Fecha_Solicitud}' AND '${Fecha_Fin_Solicitud}' AND novedad = 'TUR'`;
                            connectionNovedades.query(sql, (errNovedad, resultNovedad) => {
                                connectionNovedades.release();
                                if (errNovedad) {
                                    console.log(errNovedad);
                                    return res.status(500).send('Error interno del servidor');
                                } else if (resultNovedad.length > 0) {
                                    return res.status(200).send('Listo!');
                                } else {
                                    return res.status(204).send('No se pudo actualizar la novedad en la tabla de nomina');
                                }
                            });
                        }
                    });
                } else {
                    return res.status(204).send('No hay resultados');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

Tardiness.put('/API/REJECTSORACCEPTS/TARDINESS/MYGROUP/STAFF/:Id', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const Id = req.params.Id;
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const Fecha_Aprobador_1 = `${year}-${month}-${day}`;
            const fechaSolicitudISO = new Date(req.body.Fecha_Solicitud);
            const Fecha_Fin_Solicitud = req.body.Fecha_Fin_Solicitud;

            // Obtén el año, mes y día en formato deseado
            const yearSolicitud = fechaSolicitudISO.getFullYear();
            const monthSolicitud = (fechaSolicitudISO.getMonth() + 1).toString().padStart(2, '0');
            const daySolicitud = fechaSolicitudISO.getDate().toString().padStart(2, '0');


            // Crea la cadena de fecha en el formato deseado
            const Fecha_Solicitud = `${yearSolicitud}-${monthSolicitud}-${daySolicitud}`;

            var Hora_Aprobador_1 = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();

            const { Aprobador_1, Documento_1, Estado_Marcado_Aprobador_1, Observacion_1, Documento, Tipo_Impuntualidad } = req.body;
            const sql = `UPDATE T_Tardiness_Noveltie SET Fecha_Aprobador_1 = '${Fecha_Aprobador_1}',
            Hora_Aprobador_1 = '${Hora_Aprobador_1}',
            Aprobador_1 = '${Aprobador_1}',
            Documento_1 = '${Documento_1}',
            Estado_Marcado_Aprobador_1 = '${Estado_Marcado_Aprobador_1}',
            Observacion_1 = '${Observacion_1}'

            WHERE Id = '${Id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(204).send('No hay resultados');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});

//!ACEPTA O RECHAZA LA SOLICITUD EL SEUPERVISOR
Tardiness.put('/API/REJECTSORACCEPTS/TARDINESS/WFM/:Id', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const Id = req.params.Id;
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const Fecha_Aprobador_1 = `${year}-${month}-${day}`;


            var Hora_Aprobador_1 = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();

            const { Aprobador_1, Documento_1, Estado_Marcado_Aprobador_1, Observacion_1 } = req.body;
            const sql = `UPDATE T_Tardiness_Noveltie SET Fecha_Aprobador_1 = '${Fecha_Aprobador_1}',
            Hora_Aprobador_1 = '${Hora_Aprobador_1}',
            Aprobador_1 = '${Aprobador_1}',
            Documento_1 = '${Documento_1}',
            Estado_Marcado_Aprobador_1 = '${Estado_Marcado_Aprobador_1}',
            Observacion_1 = '${Observacion_1}'

            WHERE Id = '${Id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(204).send('No hay resultados');
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});



//!ACEPTA O RECHAZA LA SOLICITUD EL SEUPERVISOR STAFF
Tardiness.put('/API/REJECTSORACCEPTS/TARDINESS/STAFF:Id', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            res.status(500).send('Error interno del servidor');
        }

        try {
            const Id = req.params.Id;
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const Fecha_Aprobador_1 = `${year}-${month}-${day}`;

            var Hora_Aprobador_1 = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();

            const { Aprobador_1, Documento_1, Estado_Marcado_Aprobador_1, Observacion_1 } = req.body;
            const sql = `UPDATE T_Tardiness_Noveltie SET 
            Fecha_Aprobador_1 = '${Fecha_Aprobador_1}',
            Hora_Aprobador_1 = '${Hora_Aprobador_1}',
            Aprobador_1 = '${Aprobador_1}',
            Documento_1 = '${Documento_1}',
            Estado_Marcado_Aprobador_1 = '${Estado_Marcado_Aprobador_1}',
            Observacion_1 = '${Observacion_1}' WHERE Id = '${Id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(204).send('No hay resultados');
                }
            });
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    });
});


//*NOMINA
//*ENDPOINT PARA OBTNER LOS REPORTES GENERADOS DE IMPUNTUALIDAD Y MOSTRARSELOS A NOMINA
Tardiness.get('/API/GET/TARDINESS/REPORTS/NOMINA/V1/:Cliente', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            const Cliente_Area = req.params.Cliente.split(',');

            const sql1 = `SELECT * FROM T_Tardiness_Noveltie WHERE 
                Fecha_Aprobador_1 IS NOT NULL AND 
                Estado_Marcado_Aprobador_1 = 'Aceptado' AND
                Fecha_Aprobador_2 IS NULL AND 
                Hora_Aprobador_2 IS NULL AND 
                Documento_2 IS NULL AND
                Cliente_area IN (?)`;

            connection.query(sql1, [Cliente_Area], (error1, result1) => {
                if (error1) {
                    connection.release();
                    return res.status(500).send(error1);
                } else if (result1.length === 0) {
                    connection.release();
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    const tiposImpuntualidad = [
                        'INCAPACIDAD POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL',
                        'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS',
                        'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS',
                        'LICENCIA DE MATERNIDAD',
                        'LICENCIA DE PATERNIDAD (LEY MARIA)',
                        'LICENCIA POR LUTO',
                        'SANCION POR PROCESO DISCIPLINARIO',
                        'CAMALIDAD DOMESTICA DEBIDAMENTE COMPROBADA',
                        'INCIDENCIA CON USUARIO',
                        'INCIDENCIA TECNICA',
                        'LACTANCIA'
                    ];

                    const sql2 = `SELECT * FROM T_Tardiness_Noveltie WHERE 
                        Fecha_Aprobador_1 IS NULL AND 
                        Hora_Aprobador_1 IS NULL AND 
                        Documento_1 IS NULL AND
                        Estado_Marcado_Aprobador_1 IS NULL AND
                        Fecha_Aprobador_2 IS NULL AND 
                        Hora_Aprobador_2 IS NULL AND 
                        Documento_2 IS NULL AND

                        Tipo_Impuntualidad IN (?) AND
                        Cliente_area IN (?)`;

                    connection.query(sql2, [tiposImpuntualidad, Cliente_Area], (error2, result2) => {
                        connection.release();
                        if (error2) {
                            console.log(error2);
                            return res.status(500).send(error2);
                        } else if (result2.length === 0) {
                            return res.status(204).send('No hay resultados');
                        } else {
                            const combinedResults = {
                                aprobados: result1,
                                tiposImpuntualidad: result2
                            };
                            return res.status(200).send(combinedResults);
                        }

                    });
                }

            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});


//*ACEPTA O RECHAZA LA SOLICITUD GRUPO DE NÓMINA Y GTR
Tardiness.put('/API/REJECTSORACCEPTS/TARDINESS/NOMINA/:Id', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const Id = req.params.Id;
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const Fecha_Aprobador_2 = `${year}-${month}-${day}`;

            var Hora_Aprobador_2 = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();

            const { Aprobador_2, Documento_2, Estado_Marcado_Aprobador_2, Observacion_2, Documento, Tipo_Impuntualidad } = req.body;

            // Obtén la fecha del cuerpo de la solicitud
            const fechaSolicitudISO = new Date(req.body.Fecha_Solicitud);
            const Fecha_Fin_Solicitud = req.body.Fecha_Fin_Solicitud;

            // Obtén el año, mes y día en formato deseado
            const yearSolicitud = fechaSolicitudISO.getFullYear();
            const monthSolicitud = (fechaSolicitudISO.getMonth() + 1).toString().padStart(2, '0');
            const daySolicitud = fechaSolicitudISO.getDate().toString().padStart(2, '0');


            // Crea la cadena de fecha en el formato deseado
            const Fecha_Solicitud = `${yearSolicitud}-${monthSolicitud}-${daySolicitud}`;

            const sql = `UPDATE T_Tardiness_Noveltie SET 
            Fecha_Aprobador_2 = '${Fecha_Aprobador_2}',
             Hora_Aprobador_2 = '${Hora_Aprobador_2}',
             Aprobador_2 = '${Aprobador_2}',
             Documento_2 = '${Documento_2}',
             Estado_Marcado_Aprobador_2 = '${Estado_Marcado_Aprobador_2}',
             Observacion_2 = '${Observacion_2}' 
             WHERE Id = '${Id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    return res.status(204).send('No hay resultados');
                } else {
                    return res.status(200).send('Listo!');
                }
            });
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    });
});

//*ACEPTA O RECHAZA LA SOLICITUD GRUPO DE NÓMINA Y GTR V2
Tardiness.put('/API/REJECTSORACCEPTS/TARDINESS/NOMINA/V2/:Id', authenticateToken, (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send('Error interno del servidor');
        }

        try {
            const Id = req.params.Id;
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const Fecha_Aprobador_2 = `${year}-${month}-${day}`;

            var Hora_Aprobador_2 = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();

            const { Aprobador_2, Documento_2, Estado_Marcado_Aprobador_2, Observacion_2, Documento, Tipo_Impuntualidad } = req.body;

            // Obtén la fecha del cuerpo de la solicitud
            const fechaSolicitudISO = new Date(req.body.Fecha_Solicitud);
            const Fecha_Fin_Solicitud = req.body.Fecha_Fin_Solicitud;

            // Obtén el año, mes y día en formato deseado
            const yearSolicitud = fechaSolicitudISO.getFullYear();
            const monthSolicitud = (fechaSolicitudISO.getMonth() + 1).toString().padStart(2, '0');
            const daySolicitud = fechaSolicitudISO.getDate().toString().padStart(2, '0');


            // Crea la cadena de fecha en el formato deseado
            const Fecha_Solicitud = `${yearSolicitud}-${monthSolicitud}-${daySolicitud}`;

            const sql = `UPDATE T_Tardiness_Noveltie SET 

            Fecha_Aprobador_1 = '${Fecha_Aprobador_2}',
            Hora_Aprobador_1 = '${Hora_Aprobador_2}',
            Aprobador_1 = '${Aprobador_2}',
            Documento_1 = '${Documento_2}',
            Estado_Marcado_Aprobador_1 = '${Estado_Marcado_Aprobador_2}',
            Observacion_1 = '${Observacion_2}',

            Fecha_Aprobador_2 = '${Fecha_Aprobador_2}',
            Hora_Aprobador_2 = '${Hora_Aprobador_2}',
            Aprobador_2 = '${Aprobador_2}',
            Documento_2 = '${Documento_2}',
            Estado_Marcado_Aprobador_2 = '${Estado_Marcado_Aprobador_2}',
            Observacion_2 = '${Observacion_2}' 
            WHERE Id = '${Id}'`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error interno del servidor');
                } else if (result.length === 0) {
                    return res.status(204).send('No hay resultados');
                } else {
                    poolNovedadesNomina.getConnection((errorNovedad, connectionNovedades) => {
                        if (errorNovedad) {
                            return res.status(500).send('Error interno del servidor');
                        } else {
                            const sql = `UPDATE BI_WFM.AL_NOVEDADES_NOMINA SET novedad_ausencia = '${Tipo_Impuntualidad}', observacion_ticket = '${Tipo_Impuntualidad} / ${Fecha_Aprobador_2}' WHERE id_cedula = '${Documento}' AND fecha BETWEEN '${Fecha_Solicitud}' AND '${Fecha_Fin_Solicitud}' AND novedad = 'TUR'`;
                            connectionNovedades.query(sql, (errNovedad, resultNovedad) => {
                                connectionNovedades.release();
                                if (errNovedad) {
                                    console.log(errNovedad);
                                    return res.status(500).send('Error interno del servidor');
                                } else if (resultNovedad.length > 0) {
                                    return res.status(200).send('Listo!');
                                } else {
                                    return res.status(204).send('No se pudo actualizar la novedad en la tabla de nomina');
                                }
                            });
                        }
                    });
                }
            });
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    });
});


//*OBTIENE SOLO LOS REPORTES QUE SEAN DE TIPO FORMACION
Tardiness.get('/API/GET/TARDINESS/REPORTS/FORMACIONES/WFM/GTR/V1/:Cliente', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const Cliente = req.params.Cliente.split(',');
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE 
            Cliente_area IN (?) AND
            Fecha_Aprobador_1 IS NULL AND 
            Hora_Aprobador_1 IS NULL AND 
            Documento_1 IS NULL
            `;
            connection.query(sql, [Cliente], (error, result) => {
                connection.release();
                if (error) {
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });
});



//DESCARGAR TODO DE LAS AUSENCIAS E IMPUNTUALIDADES
Tardiness.get('/API/GET/TARDINESS/ALL/NOMINA/V2/:monthSeleted', authenticateToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const monthSeleted = req.params.monthSeleted;
            const fechaSeleccionada = new Date(monthSeleted);

            const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
            const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

            // Formatea las fechas en el formato "YYYY-MM-DD"
            const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
            const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
            const sql = `SELECT * FROM T_Tardiness_Noveltie WHERE Fecha_Solicitud BETWEEN '${fechaInicio}' AND '${fechaFin}'`;
            connection.query(sql, (error, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send(error);
                } else if (result.length === 0) {
                    return res.status(204).send('No se pudo obtener las impuntualidades');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send(error);
        }
    });
});




module.exports = Tardiness;