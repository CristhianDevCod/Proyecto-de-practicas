const { AlmaversoSystemPointAntares, AlmaversoSystemPoint } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const Payroll = express.Router();
const cors = require('cors');
const { authenticateToken } = require("../Auth/AuthMiddleware");

Payroll.use(cors());
Payroll.use(express.json());
Payroll.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(AlmaversoSystemPointAntares);
const poolPonto = mysql.createPool(AlmaversoSystemPoint);

//OBTIENE LA INFORMACION  DE LA NOMINA
Payroll.get('/API/GET/PAYROLL/:Cedula', authenticateToken, async (req, res, next) => {
    const Cedula = req.params.Cedula;
    try {
        // Conexión a la primera base de datos
        const firstDbQuery = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error en la conexión a la primera base de datos');
                }
                const sql = `SELECT 
                    id_cedula, 
                    DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, 
                    avaya, 
                    novedad,
                    DATE_FORMAT(turno_entrada, '%H:%i:%s') as turno_entrada, 
                    DATE_FORMAT(turno_salida, '%H:%i:%s') as turno_salida, 
                    horas_dimensionadas_hora, 
                    log_in, 
                    log_out, 
                    horas_presente, 
                    novedad_ausencia, 
                    JUSTIFICADO,
                    HORA_NOCTURNA,
                    HORA_DOMINICAL,
                    HORA_DOMINICAL_NOCTURNA,
                    HORA_FESTIVO,
                    HORA_FESTIVO_NOCTURNA
                    FROM 
                    Payroll_Hours.AL_NOVEDADES_NOMINA WHERE id_cedula = ?`;
                connection.query(sql, [Cedula], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error en la consulta a la primera base de datos');
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        // Conexión a la segunda base de datos
        const secondDbQuery = () => new Promise((resolve, reject) => {
            poolPonto.getConnection((err, connection) => {
                if (err) {
                    return reject('Error en la conexión a la segunda base de datos');
                }
                const sql = `SELECT 
                    DATE_FORMAT(fecha, '%Y-%m-%d') as fecha,
                    H_E_O,
                    E_H_N,
                    H_E_D_D,
                    H_E_F_D,
                    H_E_D_N,
                    H_E_F_N
                    FROM 
                    BI_WFM.HH_EE_Antares WHERE cedula = ?`;
                connection.query(sql, [Cedula], (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error en la consulta a la segunda base de datos');
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        // Ejecutar ambas consultas en paralelo
        const [payrollData, extraHourData] = await Promise.all([
            firstDbQuery().catch(err => { console.log(err); return []; }),
            secondDbQuery().catch(err => { console.log(err); return []; })
        ]);

        // Combinar ambos resultados
        const combinedData = {
            payrollData,
            extraHourData
        };

        // Verificar si ambas consultas no retornan datos
        if (payrollData.length === 0 && extraHourData.length === 0) {
            return res.status(404).send('No tienes información sobre tus horas nómina');
        }
        return res.status(200).send(combinedData);
    } catch (error) {
        console.log(error);
        return next('Error interno del servidor');
    }
});

//FECHAS DE CORTE, PAGOS DE NOMINA
Payroll.get('/API/GET/CORTES/NOMINA/', authenticateToken, async (req, res, next) => {
    try {
        const Cortes_Nomina = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error en la conexión a la base de datos');
                }
                const sql = `SELECT id_corte, mes, DATE_FORMAT(fecha_pago, '%Y-%m-%d') as fecha_pago, DATE_FORMAT(inicio_corte, '%Y-%m-%d') as inicio_corte, DATE_FORMAT(fin_corte, '%Y-%m-%d') as fin_corte, plazo_reporte_novedades FROM Almaverso_Antares.T_Cortes_Nomina`;
                connection.query(sql, (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error en la consulta');
                    } else if (result.length === 0) {
                        return reject('Sin información para las fechas de cortes');
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        const [cortesNomina] = await Promise.all([
            Cortes_Nomina().catch(err => { console.log(err); return []; })
        ]);


        // Verificar si ambas consultas no retornan datos
        if (cortesNomina.length === 0) {
            return res.status(404).send('No tienes información sobre las fechas de corte');
        }
        return res.status(200).send(cortesNomina);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

// END-POINT PARA AÑADIR NUEVAS FECHAS DE CORTE DE NOMINA 
Payroll.put('/API/INSERT/CORTES/NOMINA/', authenticateToken, async (req, res, next) => {
    try {
        const add_corte_nomina = () => new Promise((resolve, reject) => {
            pool.getConnection((errVerify, connectionVerify) => {
                if (errVerify) {
                    return reject('Error en la conexión a la base de datos');
                } else {
                    const mes = req.body.mes;
                    const fecha_pago = req.body.fecha_pago;
                    const inicio_corte = req.body.inicio_corte;
                    const fin_corte = req.body.fin_corte;
                    const plazo_reporte_novedades = req.body.plazo_reporte_novedades;

                    const sql_verify = `SELECT fecha_pago FROM Almaverso_Antares.T_Cortes_Nomina WHERE fecha_pago = ?`
                    connectionVerify.query(sql_verify, [fecha_pago], (errorVerify, resultVerify) => {
                        connectionVerify.release();
                        if (errorVerify) {
                            return reject('Error en la consulta #1');
                        } else if (resultVerify.length > 0) {
                            return resolve(`Esta fecha de corte, "${fecha_pago}" ya se encuentra registrada, porfavor intenta con otra fecha de corte`);
                        } else {

                            pool.getConnection((err, connection) => {
                                if (err) {
                                    return reject('Error en la conexión a la base de datos');
                                }
                                const VALUES = [mes, fecha_pago, inicio_corte, fin_corte, plazo_reporte_novedades]
                                const sql = `
                                INSERT INTO Almaverso_Antares.T_Cortes_Nomina
                                (mes, fecha_pago, inicio_corte, fin_corte, plazo_reporte_novedades)
                                VALUES(?)
                                `;
                                connection.query(sql, [VALUES], (error, result) => {
                                    connection.release();
                                    if (error) {
                                        console.log(error);

                                        return reject('Error en la consulta #2', error);
                                    } else if (result.length === 0) {
                                        return reject('No se pudo agregar una nueva fecha de corte');
                                    } else {
                                        resolve("Se ha agregado una nueva fecha de corte de nómina");
                                    }
                                });
                            });
                        }
                    });
                }
            });
        });

        const [result] = await Promise.all([
            add_corte_nomina().catch(err => { console.log(err); return []; })
        ]);


        // Verificar si ambas consultas no retornan datos
        if (result.length === 0) {
            return res.status(404).send('No se pudo agregar una nueva fecha de corte, porfavor intenta con otra fecha');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});

// END-POINT PARA EDITAR FECHAS DE CORTE DE NOMINA 
Payroll.put('/API/EDIT/CORTES/NOMINA/', authenticateToken, async (req, res, next) => {
    try {
        // Aquí recibimos el JSON
        const { mes, fechaPago, inicioCorte, finCorte, plazo_reporte_novedades, id_corte } = req.body;

        const edit_corte_nomina = () => new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject('Error en la conexión a la base de datos');
                }

                // Ojo: utilizamos values, no [values]
                const values = [mes, fechaPago, inicioCorte, finCorte, plazo_reporte_novedades, id_corte];
                const sql = `
                  UPDATE Almaverso_Antares.T_Cortes_Nomina 
                  SET mes = ?, fecha_pago = ?, inicio_corte = ?, fin_corte = ?, plazo_reporte_novedades = ?
                  WHERE id_corte = ?
                `;
                connection.query(sql, values, (error, result) => {
                    connection.release();
                    if (error) {
                        return reject('Error en la consulta #2', error);
                    } else if (result.affectedRows === 0) {
                        return reject('No se pudo actualizar la fecha del corte (id no encontrado)');
                    } else {
                        resolve("Fecha de corte actualizada correctamente!!");
                    }
                });
            });
        });

        const [result] = await Promise.all([
            edit_corte_nomina().catch(err => { console.log(err); return []; })
        ]);

        if (result.length === 0) {
            return res.status(404).send('No se pudo actualizar la fecha del corte');
        }
        return res.status(200).send(result);
    } catch (error) {
        return next('Error interno del servidor');
    }
});




module.exports = Payroll;