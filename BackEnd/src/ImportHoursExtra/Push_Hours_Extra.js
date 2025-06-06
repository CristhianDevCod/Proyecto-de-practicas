const {
    Almaverso,
    Sociodemographic,
    AlmaversoSystemPoint
} = require('../BDconfig');
const moment = require('moment');
const mysql = require('mysql2');
const express = require('express');
const Push_Hours_Extra = express.Router();
const cors = require('cors');
const { authenticateToken } = require('../Auth/AuthMiddleware')



Push_Hours_Extra.use(cors());
Push_Hours_Extra.use(express.json());
Push_Hours_Extra.use(express.urlencoded({ extended: false }));


Push_Hours_Extra.put('/API/UPDATE-PUSH_HOURS_EXTRA/', authenticateToken, async (req, res) => {
    const connectionShifts = mysql.createConnection(Almaverso);
    const connectionAssigment = mysql.createConnection(AlmaversoSystemPoint);
    const connectionSocio = mysql.createConnection(Sociodemographic);
    const data = req.body;
    // Verifica si el archivo está vacío
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("El archivo está vacío y no es permitido su cargue.");
    }
    const keys = Object.keys(data);
    const errorMessages = [];
    let hasError = false;


    // VERIFICA QUE EL DOCUMENTO ESTE EN EL SOCIO
    for (const key of keys) {
        const dataItem = data[key];
        const documento = dataItem.CodigoColaborador;

        const verifyDocumento = `SELECT Documento FROM T_Socio WHERE Documento = '${documento}' AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento = '${documento}')`;

        try {
            const [results] = await connectionSocio.promise().query(verifyDocumento);
            if (results.length === 0) {
                throw new Error(`Este documento '${documento}' no existe. Fila '${key}'`);
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connectionAssigment.end();
        connectionShifts.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }


    // VERIFICA QUE EN EL IMPORTE NO HAYA NADIE EN RETIRO, ESTO SE VERIFICA EN T_Socio
    for (const key of keys) {
        const state = 'Retiro'
        const dataItem = data[key];
        const documento = dataItem.CodigoColaborador;

        const verifyStatus = `SELECT Estado_Empleado FROM T_Socio WHERE Documento = '${documento}' AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento = '${documento}')`;

        try {
            const [results] = await connectionSocio.promise().query(verifyStatus);
            const StateActive = results[0].Estado_Empleado;
            if (StateActive === 'Retiro') {
                throw new Error(`El usuario identificado con el documento '${documento}', se encuentra en estado de '${state}'. Fila'${key}'`);
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connectionAssigment.end();
        connectionShifts.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }

    // VERIFICA LOS CAMPOS VACIOS
    for (const key of keys) {
        const dataItemsFields = data[key];
        if (
            dataItemsFields.CodigoColaborador === '' || dataItemsFields.CodigoColaborador === undefined || dataItemsFields.CodigoColaborador === null || !dataItemsFields.CodigoColaborador ||
            dataItemsFields.Data === '' || dataItemsFields.Data === undefined || dataItemsFields.Data === null || !dataItemsFields.Data ||
            dataItemsFields.HoraExtraInicio === '' || dataItemsFields.HoraExtraInicio === undefined || dataItemsFields.HoraExtraInicio === null || !dataItemsFields.HoraExtraInicio ||
            dataItemsFields.HoraExtraFim === '' || dataItemsFields.HoraExtraFim === undefined || dataItemsFields.HoraExtraFim === null || !dataItemsFields.HoraExtraFim
            // dataItemsFields.DataAtualizado === '' || dataItemsFields.DataAtualizado === undefined || dataItemsFields.DataAtualizado === null || !dataItemsFields.DataAtualizado
        ) {
            errorMessages.push(`Campo vacio. Fila '${key}'`);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connectionAssigment.end();
        connectionShifts.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }

    // VALIDA LA FECHA DIA ACTUAL O 11 DIAS EN ADELANTE 
    for (const key of keys) {
        const dateItem = data[key];
        const Fecha = dateItem.Data;

        // Fecha actual
        const currentDate = moment().format('YYYY-MM-DD');
        const futureDate = moment(currentDate).add(11, 'days');


        if (moment(Fecha).isBefore(currentDate)) {
            errorMessages.push(`La Data(Fecha) de la fila '${key}' debe ser entre el día actual en adelante`);
            hasError = true;
            break;
        } else if (moment(Fecha).isAfter(futureDate)) {
            errorMessages.push(`La Data(Fecha) de la fila '${key}' debe ser solo hasta 11 días en adelante`);
            hasError = true;
            break;
        }
    }

    if (hasError) {
        connectionShifts.end();
        connectionAssigment.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }


    //! VERIFICA SI EL USUARIO TIENE TURNO PARA ESE DIA

    // for (const key of keys) {
    //     const dataItem = data[key];
    //     const documentShifts = dataItem.CodigoColaborador;
    //     const fecha = dataItem.Data;

    //     // Fecha actual
    //     const currentDate = moment().format('YYYY-MM-DD');
    //     const futureDate = moment(currentDate).add(11, 'days').format('YYYY-MM-DD');

    //     const verifyShifts = `
    //         SELECT * FROM colaboradorDimensionamento 
    //         WHERE CodigoColaborador = ? 
    //           AND Data = ?
    //           AND (Inicio != '0' OR CargaHoraria != '0')
    //     `;

    //     try {
    //         const [results] = await connectionAssigment.promise().query(verifyShifts, [documentShifts, fecha]);

    //         // Verificar si la fecha está dentro del rango permitido
    //         if (moment(fecha).isBefore(currentDate) || moment(fecha).isAfter(futureDate)) {
    //             throw new Error(`La fecha ${fecha} para el colaborador ${documentShifts} solo permite cargar horas extras con fechas del día actual hasta 11 días en adelante .`);
    //         }

    //         // Si no se encuentra ningún resultado, significa que no existe un turno para ese día
    //         if (results.length === 0) {
    //             throw new Error(`El colaborador con documento '${documentShifts}' no tiene un turno cargados para el día ${fecha}. No se pueden cargar horas extras sin un turno cargado.`);
    //         }

    //         // Verificar si ya existen horas extras asignadas
    //         const verifyExtraHours = `
    //             SELECT * FROM colaboradorDimensionamento 
    //             WHERE CodigoColaborador = ? 
    //               AND Data = ?
    //               AND (HoraExtraInicio IS NOT NULL OR HoraExtraFim IS NOT NULL)`;

    //         const [extraHoursResults] = await connectionAssigment.promise().query(verifyExtraHours, [documentShifts, fecha]);

    //         if (extraHoursResults.length > 0) {
    //             throw new Error(`El colaborador con documento '${documentShifts}' ya tiene horas extras asignadas para el día ${fecha}. No se pueden cargar horas extras adicionales.`);
    //         }

    //     } catch (error) {
    //         errorMessages.push(error.message);
    //         hasError = true;
    //         break;
    //     }
    // }
    // if (hasError) {
    //     connectionAssigment.end();
    //     connectionShifts.end();
    //     connectionSocio.end();
    //     return res.status(400).send(errorMessages);
    // }




    // ! VALIDACION DE LAS HORAS EXTRAS ASIGANDAS NO SUPEREN LAS 4 HORAS
    // for (const key of keys) {
    //     const dataItem = data[key];
    //     const HoraExtraInicio = dataItem.HoraExtraInicio;
    //     const HoraExtraFim = dataItem.HoraExtraFim;

    //     // Convertir las horas a minutos desde medianoche
    //     const inicio = moment(HoraExtraInicio, 'HH:mm');
    //     const fin = moment(HoraExtraFim, 'HH:mm');

    //     // Calcular la diferencia en minutos
    //     let diff = fin.diff(inicio, 'minutes');
    //     if (diff < 0) {
    //         // Si la diferencia es negativa, significa que HoraExtraFim es después de la medianoche
    //         diff = (24 * 60 - inicio.diff(moment('00:00', 'HH:mm'), 'minutes')) + fin.diff(moment('00:00', 'HH:mm'), 'minutes');
    //     }

    //     if (diff > 240) {
    //         errorMessages.push(`La diferencia entre Hora Extra Inicio y Hora Extra Fin no puede superar las 4 horas. en la fila '${key}'`);
    //         hasError = true;
    //         break;
    //     }
    // }

    // if (hasError) {
    //     connectionAssigment.end();
    //     connectionShifts.end();
    //     connectionSocio.end();
    //     return res.status(400).send(errorMessages);
    // }

    //! VALIDAR QUE NO LE PERMITA CARGAR HORAS EXTRAS SI LA PERSONA ESTA EN TURNO
    for (const key of keys) {
        const dataItem = data[key];
        const documento = dataItem.CodigoColaborador;

        const fecha = dataItem.Data;
        const horaExtraInicio = moment(dataItem.HoraExtraInicio, 'HH:mm');
        const horaExtraFin = moment(dataItem.HoraExtraFim, 'HH:mm');

        const queryShift = `
        (SELECT Fecha, Turno_Ini, Turno_Fin, Documento FROM T_Shifts WHERE Fecha = ? AND Documento = ?)
        UNION
        (SELECT Fecha, Turno_Ini, Turno_Fin, Documento FROM T_Shifts_Staff WHERE Fecha = ? AND Documento = ?)
        `;

        const [results] = await connectionShifts.promise().query(queryShift, [fecha, documento, fecha, documento]);

        if (results.length > 0) {
            const turnoInicio = moment(results[0].Turno_Ini, 'HH:mm');
            const turnoFin = moment(results[0].Turno_Fin, 'HH:mm');

            if (turnoFin.isBefore(turnoInicio)) {
                turnoFin.add(1, 'day');
            }

            if (
                (horaExtraInicio.isBetween(turnoInicio, turnoFin, null, '[]') ||
                    horaExtraFin.isBetween(turnoInicio, turnoFin, null, '[]')) ||
                (horaExtraInicio.isBefore(turnoInicio) && horaExtraFin.isAfter(turnoFin))
            ) {
                errorMessages.push(`El colaborador con documento '${documento}' Está intentando pedir horas extras dentro del mismo horario del turno. solicitadas para el día ${fecha}. en la fila '${key}'`);
                hasError = true;
                break;
            }
        }
    }

    if (hasError) {
        connectionAssigment.end();
        connectionShifts.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }



    try {
        await connectionAssigment.promise().beginTransaction();

        // Actualizar o insertar los registros en la tabla T_Shifts
        for (const key of keys) {
            const itemData = data[key];

            const HoraExtraIni = itemData.HoraExtraInicio.split(':');
            const Hora_Extra_Ini = parseInt(HoraExtraIni[0]) * 60 + parseInt(HoraExtraIni[1]);

            const documento = itemData.CodigoColaborador;
            const fechaTurno = itemData.Data;

            // Modificación aquí: multiplicamos directamente por 60 en lugar de hacer el cálculo con horas y minutos
            const Hora_Extra_Fin = parseInt(itemData.HoraExtraFim) * 60;

            let totalMinutes;
            if (Hora_Extra_Fin < Hora_Extra_Ini) {
                totalMinutes = Hora_Extra_Fin + 1440 - Hora_Extra_Ini;
            } else {
                totalMinutes = Hora_Extra_Fin - Hora_Extra_Ini;
            }

            const valuesInsert = [
                itemData.CodigoColaborador,
                itemData.Data,
                Hora_Extra_Ini,
                Hora_Extra_Fin,
                itemData.DataAtualizado
            ];

            const sqlUpdate = `
        INSERT INTO ColaboradorDimensionamento (
            CodigoColaborador, 
            Data, 
            HoraExtraInicio, 
            HoraExtraFim, 
            DataAtualizado
        ) VALUES (?, ?, ?, ?, CURDATE())
        ON DUPLICATE KEY UPDATE
            CodigoColaborador = VALUES(CodigoColaborador), 
            Data = VALUES(Data), 
            HoraExtraInicio = VALUES(HoraExtraInicio), 
            HoraExtraFim = VALUES(HoraExtraFim),
            DataAtualizado = CURDATE()`;


            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // Consultar las horas de la semana
            const queryHorasSemanales = `
           SELECT Data,
                     CargaHoraria,
                     HoraExtraFim 
                     FROM ColaboradorDimensionamento 
                     WHERE CodigoColaborador = '${documento}' AND WEEK(Data, 1) = WEEK('${fechaTurno}', 1) AND YEAR(Data) = YEAR('${fechaTurno}')
        `;
            // Ejecutar la consulta
            const [resultValidate] = await connectionAssigment.promise().query(queryHorasSemanales, [documento, fechaTurno, fechaTurno]);

            if (resultValidate.length === 0) {
                throw new Error('No se encontraron registros para el colaborador en la semana especificada');
            }

            let totalHours = resultValidate.reduce((sum, row) => {
                return sum + (row.CargaHoraria / 60) + (row.HoraExtraFim / 60);
            }, 0);

            if (totalHours >= 54) {
                throw new Error(`El colaborador con documento ${documento} ha superado las 54 horas laborales semanales`);
            } else {
                // Si no supera las 54 horas, proceder con la actualización/inserción
                await connectionAssigment.promise().query(sqlUpdate, valuesInsert);
            }
        }

        // Confirmar la transacción
        await connectionAssigment.promise().commit();
        connectionShifts.end();
        connectionSocio.end();

        return res.status(200).send('Horas extras cargadas exitosamente');
    } catch (error) {
        // Si ocurre un error, hacer rollback de la transacción
        await connectionAssigment.promise().rollback();
        connectionShifts.end();
        connectionSocio.end();
        return res.status(400).send(error.message);
    }
});

module.exports = Push_Hours_Extra;
