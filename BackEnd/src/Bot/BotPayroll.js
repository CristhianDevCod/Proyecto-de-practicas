const { AlmaversoSystemPoint, Almaverso } = require('../BDconfig');
const express = require('express');
const mysql = require('mysql2');

const BotPayroll = express.Router();
const cors = require('cors');

BotPayroll.use(cors());
BotPayroll.use(express.json());
BotPayroll.use(express.urlencoded({ extended: false }));

const Sistema_Punto = mysql.createPool(AlmaversoSystemPoint);
const AlmaversoDB = mysql.createPool(Almaverso);

// Número de registros por lote
const BATCH_SIZE = 50;

// FUNCION PARA OBTENER LOS DATOS DE LA DB SISTEMA PUNTO BI_WFM
function getAllDataPayroll() {
    return new Promise((resolve, reject) => {
        Sistema_Punto.getConnection((error, connection) => {
            if (error) {
                reject(error);
                return;
            }
            try {
                const selectQuery = `SELECT * FROM BI_WFM.AL_NOVEDADES_NOMINA`;

                connection.query(selectQuery, (error, results) => {
                    connection.release();

                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            } catch (error) {
                connection.release();
                reject(error);
            }
        });
    });
}

// FUNCION PARA INSERTAR LOS DATOS A LA BASE DE ANTARES
async function insertDataPayroll(data) {
    return new Promise(async (resolve, reject) => {
        AlmaversoDB.getConnection(async (error, connection) => {
            if (error) {
                reject(error);
                return;
            }

            try {
                const insertQuery = `INSERT INTO Payroll_Hours.AL_NOVEDADES_NOMINA (
                    grupo,
                    fecha,
                    id_cedula,
                    avaya,
                    nombre,
                    servicio,
                    estado,
                    novedad,
                    horas_programadas,
                    supervisor,
                    turno_entrada,
                    turno_salida,
                    horas_dimensionadas_hora,
                    horas_dimensionas_num,
                    cambio_dia,
                    log_in,
                    log_out,
                    horas_loguin,
                    dif_log,
                    porcentaje_adh,
                    observaciones_logueo,
                    horas_deslogueo,
                    horas_exceso,
                    correccion_inicio,
                    correccion_fin,
                    novedad_ausencia,
                    tipo,
                    horas_presente,
                    horas_ausencia,
                    nuemero_soporte,
                    observacion_ticket,
                    dia,
                    tipo_dia1,
                    horas_dia1,
                    tipo_dia2,
                    horas_dia2,
                    horas_pagadas,
                    horas_descontables,
                    hora_entrada_corregida,
                    hora_salida_corregida,
                    h_n_inicio,
                    h_n_totales,
                    h_n,
                    h_d,
                    h_f,
                    h_d_n,
                    h_f_n,
                    horas_extras,
                    suma_horas,
                    HORA_NOCTURNA,
                    HORA_DOMINICAL,
                    HORA_FESTIVO,
                    HORA_DOMINICAL_NOCTURNA,
                    HORA_FESTIVO_NOCTURNA,
                    HORA_EXTRA,
                    SUMA_HORA,
                    HORA_AUX,
                    TIPO_J_NJ,
                    CONCATENADO,
                    ACTIVO,
                    APLICA_MEDICION,
                    JUSTIFICADO,
                    SEGMENTO,
                    SERVICIO_
                ) VALUES ?`;

                for (let i = 0; i < data.length; i += BATCH_SIZE) {
                    const batch = data.slice(i, i + BATCH_SIZE);
                    const values = batch.map(item => [
                        item.grupo,
                        item.fecha,
                        item.id_cedula,
                        item.avaya,
                        item.nombre,
                        item.servicio,
                        item.estado,
                        item.novedad,
                        item.horas_programadas,
                        item.supervisor,
                        item.turno_entrada,
                        item.turno_salida,
                        item.horas_dimensionadas_hora,
                        item.horas_dimensionas_num,
                        item.cambio_dia,
                        item.log_in,
                        item.log_out,
                        item.horas_loguin,
                        item.dif_log,
                        item.porcentaje_adh,
                        item.observaciones_logueo,
                        item.horas_deslogueo,
                        item.horas_exceso,
                        item.correccion_inicio,
                        item.correccion_fin,
                        item.novedad_ausencia,
                        item.tipo,
                        item.horas_presente,
                        item.horas_ausencia,
                        item.nuemero_soporte,
                        item.observacion_ticket,
                        item.dia,
                        item.tipo_dia1,
                        item.horas_dia1,
                        item.tipo_dia2,
                        item.horas_dia2,
                        item.horas_pagadas,
                        item.horas_descontables,
                        item.hora_entrada_corregida,
                        item.hora_salida_corregida,
                        item.h_n_inicio,
                        item.h_n_totales,
                        item.h_n,
                        item.h_d,
                        item.h_f,
                        item.h_d_n,
                        item.h_f_n,
                        item.horas_extras,
                        item.suma_horas,
                        item.HORA_NOCTURNA,
                        item.HORA_DOMINICAL,
                        item.HORA_FESTIVO,
                        item.HORA_DOMINICAL_NOCTURNA,
                        item.HORA_FESTIVO_NOCTURNA,
                        item.HORA_EXTRA,
                        item.SUMA_HORA,
                        item.HORA_AUX,
                        item.TIPO_J_NJ,
                        item.CONCATENADO,
                        item.ACTIVO,
                        item.APLICA_MEDICION,
                        item.JUSTIFICADO,
                        item.SEGMENTO,
                        item.SERVICIO_
                    ]);

                    await new Promise((resolveBatch, rejectBatch) => {
                        connection.query(insertQuery, [values], (error) => {
                            if (error) {
                                rejectBatch(error);
                            } else {
                                resolveBatch();
                            }
                        });
                    });
                }
                connection.release();
                resolve('Datos insertados correctamente');
                // connection.query(insertQuery, [values], (error) => {
                //     connection.release();

                //     if (error) {
                //         reject(error);
                //     } else {
                //         resolve('Datos insertados correctamente');
                //     }
                // });
            } catch (error) {
                connection.release();
                reject(error);
            }
        });
    });
}

// FUNCION PARA REALIZAR LA TRANSFERENCIA DE DATOS
async function performDataTransfer() {
    try {
        const dataToInsert = await getAllDataPayroll();
        await insertDataPayroll(dataToInsert);
        console.log('Operación completada con éxito');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// FUNCION PARA PROGRAMAR AUTOMÁTICAMENTE A MEDIANOCHE
function scheduleAutomatic() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    // const millisecondsUntilMidnight = 20000;

    setTimeout(() => {
        performDataTransfer();
        scheduleAutomatic();
    }, millisecondsUntilMidnight);
}

// LLAMAMOS A LA FUNCION PARA QUE COMIENCE A EJECUTARSE AUTOMÁTICAMENTE
scheduleAutomatic();

module.exports = BotPayroll;
