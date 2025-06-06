const {
    Almaverso,
    // TESTNOTIFICATIONS,
    Sociodemographic
} = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const { authenticateToken } = require("../Auth/AuthMiddleware");
const Push_Malla_Administartivo = express.Router();
const cors = require('cors');

const Collaborator_Dimensioning_Staff = require('./Dimensionamiento_And_Novelty_Staff/Collaborator_Dimensioning_Staff');
const Collaborator_Novelty_Staff = require('./Dimensionamiento_And_Novelty_Staff/Collaborator_Novelty_Staff');



Push_Malla_Administartivo.use(cors());
Push_Malla_Administartivo.use(express.json());
Push_Malla_Administartivo.use(express.urlencoded({ extended: false }));


Push_Malla_Administartivo.put('/API/UPDATE-PUSH_MALLA_ADMINISTARTIVO/v2/', authenticateToken, async (req, res) => {
    // const connection = mysql.createConnection(TESTNOTIFICATIONS);
    const io = req.io;

    const connection = mysql.createConnection(Almaverso);
    const connectionSocio = mysql.createConnection(Sociodemographic);
    const data = req.body;
    const keys = Object.keys(data);
    const errorMessages = [];
    let hasError = false; // Bandera para verificar si se encuentra un error
    io.emit('progreso', 'Iniciando el proceso de inserción de turnos');


    io.emit('progreso', 'Verificando formato de fehas');
    for (const key of keys) {
        const dataItem = data[key];
        const fecha = dataItem.Fecha;

        // Expresión regular para verificar el formato de fecha 'yyyy-mm-dd'
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        try {
            // Verificar si la fecha cumple con el formato requerido
            if (!regex.test(fecha)) {
                throw new Error(`La fecha '${fecha}' esta en un formato incorrecto. Fila '${key}'`);
            }

        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }

    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }

    io.emit('progreso', 'Verificando servicios');
    // Verificar que el servicio exista en la tabla T_Socio
    for (const key of keys) {
        const dataItem = data[key];
        const servicio = dataItem.Servicio;

        const verifyService = `SELECT Servicio FROM T_Socio WHERE Servicio IN (?)`;

        try {
            const [results] = await connectionSocio.promise().query(verifyService, [servicio]);
            if (results.length === 0) {
                throw new Error(`Este servicio '${servicio}' no existe en el socio. Fila '${key}'`);
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }

    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }
    io.emit('progreso', 'Servicios verificados');

    io.emit('progreso', 'Verificando novedades');
    // Verificar que las novedades que se van a insertar existan en la tabla T_Shifts_Novelties
    for (const key of keys) {
        const dataItem = data[key];
        const novedad = dataItem.Novedad;

        const verifyNovedad = `SELECT Codigo_Novedad FROM T_Shifts_Novelties WHERE Codigo_Novedad IN (?)`;

        try {
            const [results] = await connection.promise().query(verifyNovedad, [novedad]);
            if (results.length === 0) {
                throw new Error(`La novedad de turno '${novedad}' no existe. Fila '${key}'`);
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }
    io.emit('progreso', 'Novedades verificadas');

    io.emit('progreso', 'Verificando que los turnos cuenten con turnos');
    for (const key of keys) {
        const itemData = data[key];
        const Novedad = itemData.Novedad;
        const Turno_Ini = itemData.Turno_Ini;
        const Turno_Fin = itemData.Turno_Fin;

        if (Novedad === 'TUR' && (Turno_Ini === '00:00:00' || Turno_Ini === '00:00' && Turno_Fin === '00:00:00' || Turno_Fin === '00:00')) {
            errorMessages.push(`La novedad '${Novedad}' de la fila '${key}' no contiene horas, por favor verifica los campos`);
            hasError = true;
            break;
        }


    }

    if (hasError) {
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }

    io.emit('progreso', 'Verificando retiros');
    // Verificar que en los turnos no haya nadie en retiro, esto se verifica en T_Socio
    for (const key of keys) {
        const state = 'Retiro';
        const itemData = data[key];
        const documento = itemData.Documento;

        const stateQuery = `SELECT Estado_Empleado FROM T_Socio WHERE Documento IN (?) AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento IN (?))`;

        try {
            const [results] = await connectionSocio.promise().query(stateQuery, [documento, documento]);
            const StateActive = results[0].Estado_Empleado;
            if (StateActive === 'Retiro') {
                throw new Error(`El asesor identificado con el documento '${documento}', se encuentra en estado de '${state}'. Fila '${key}'`);
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }
    io.emit('progreso', 'data sin retiros');

    io.emit('progreso', 'Verificando campos vacios');
    //verificar Campos vacios
    for (const key of keys) {
        const dataItemsFields = data[key];
        if (
            dataItemsFields.Fecha === '' || dataItemsFields.Fecha === undefined || dataItemsFields.Fecha === null || !dataItemsFields.Fecha ||
            dataItemsFields.Documento === '' || dataItemsFields.Documento === undefined || dataItemsFields.Documento === null || !dataItemsFields.Documento ||
            dataItemsFields.Servicio === '' || dataItemsFields.Servicio === undefined || dataItemsFields.Servicio === null || !dataItemsFields.Servicio ||
            dataItemsFields.Novedad === '' || dataItemsFields.Novedad === undefined || dataItemsFields.Novedad === null || !dataItemsFields.Novedad ||
            dataItemsFields.Horas_Laboradas === '' || dataItemsFields.Horas_Laboradas === undefined || dataItemsFields.Horas_Laboradas === null || !dataItemsFields.Horas_Laboradas ||
            dataItemsFields.Turno_Ini === '' || dataItemsFields.Turno_Ini === undefined || dataItemsFields.Turno_Ini === null || !dataItemsFields.Turno_Ini ||
            dataItemsFields.Turno_Fin === '' || dataItemsFields.Turno_Fin === undefined || dataItemsFields.Turno_Fin === null || !dataItemsFields.Turno_Fin ||
            dataItemsFields.Dialogo_Ini === '' || dataItemsFields.Dialogo_Ini === undefined || dataItemsFields.Dialogo_Ini === null || !dataItemsFields.Dialogo_Ini ||
            dataItemsFields.Dialogo_Fin === '' || dataItemsFields.Dialogo_Fin === undefined || dataItemsFields.Dialogo_Fin === null || !dataItemsFields.Dialogo_Fin ||
            dataItemsFields.Des_1_Ini === '' || dataItemsFields.Des_1_Ini === undefined || dataItemsFields.Des_1_Ini === null || !dataItemsFields.Des_1_Ini ||
            dataItemsFields.Des_1_Fin === '' || dataItemsFields.Des_1_Fin === undefined || dataItemsFields.Des_1_Fin === null || !dataItemsFields.Des_1_Fin ||
            dataItemsFields.Des_2_Ini === '' || dataItemsFields.Des_2_Ini === undefined || dataItemsFields.Des_2_Ini === null || !dataItemsFields.Des_2_Ini ||
            dataItemsFields.Des_2_Fin === '' || dataItemsFields.Des_2_Fin === undefined || dataItemsFields.Des_2_Fin === null || !dataItemsFields.Des_2_Fin ||
            dataItemsFields.Des_3_Ini === '' || dataItemsFields.Des_3_Ini === undefined || dataItemsFields.Des_3_Ini === null || !dataItemsFields.Des_3_Ini ||
            dataItemsFields.Des_3_Fin === '' || dataItemsFields.Des_3_Fin === undefined || dataItemsFields.Des_3_Fin === null || !dataItemsFields.Des_3_Fin ||
            dataItemsFields.Lunch_Ini === '' || dataItemsFields.Lunch_Ini === undefined || dataItemsFields.Lunch_Ini === null || !dataItemsFields.Lunch_Ini ||
            dataItemsFields.Lunch_Fin === '' || dataItemsFields.Lunch_Fin === undefined || dataItemsFields.Lunch_Fin === null || !dataItemsFields.Lunch_Fin ||
            dataItemsFields.Training_1_Ini === '' || dataItemsFields.Training_1_Ini === undefined || dataItemsFields.Training_1_Ini === null || !dataItemsFields.Training_1_Ini ||
            dataItemsFields.Training_1_Fin === '' || dataItemsFields.Training_1_Fin === undefined || dataItemsFields.Training_1_Fin === null || !dataItemsFields.Training_1_Fin ||
            dataItemsFields.Training_2_Ini === '' || dataItemsFields.Training_2_Ini === undefined || dataItemsFields.Training_2_Ini === null || !dataItemsFields.Training_2_Ini ||
            dataItemsFields.Training_2_Fin === '' || dataItemsFields.Training_2_Fin === undefined || dataItemsFields.Training_2_Fin === null || !dataItemsFields.Training_2_Fin ||
            dataItemsFields.Lac_Ini === '' || dataItemsFields.Lac_Ini === undefined || dataItemsFields.Lac_Ini === null || !dataItemsFields.Lac_Ini ||
            dataItemsFields.Lac_Fin === '' || dataItemsFields.Lac_Fin === undefined || dataItemsFields.Lac_Fin === null || !dataItemsFields.Lac_Fin
        ) {
            errorMessages.push(`Campo vacio. Fila '${key}'`);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }
    io.emit('progreso', 'Sin campos vacios');
    //validacion de la fecha día actual o posteriores
    function formatDate(dateParts) {
        const year = dateParts[0];
        const month = String(dateParts[1]).padStart(2, '0');
        const day = String(dateParts[2]).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    io.emit('progreso', 'Verificando fechas');
    for (const key of keys) {
        const dateItem = data[key];

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const dateParts = dateItem.Fecha;
        const formattedCurrentDate = formatDate([currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()]);

        if (dateParts <= formattedCurrentDate) {
            errorMessages.push(`La fecha de la fila '${key}' debe ser de días posteriores`);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages)
    }
    io.emit('progreso', 'Fechas validadas');

    io.emit('progreso', 'Verificando turnos');
    //validamos que solo las novedades TUR FOR VOT puedan cargar turnos 
    for (const key of keys) {
        const dataItemsShifts = data[key];
        const novedad = dataItemsShifts.Novedad;
        if ((novedad === 'TUR' || novedad === 'FOR' || novedad === 'VOT') && (
            dataItemsShifts.Turno_Ini === '00:00:00' ||
            dataItemsShifts.Turno_Fin === '00:00:00')) {
            errorMessages.push(`La novedad '${novedad}' debe tener horas programadas. Fila '${key}'`);
            hasError = true;
            break;
        };
    };
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages)
    };
    io.emit('progreso', 'Turnos validados');

    io.emit('progreso', 'Verificando resto de novedades');
    //validamos el resto de novedades
    for (const key of keys) {
        const dataItemsShifts = data[key];
        const novedad = dataItemsShifts.Novedad;
        if ((
            novedad === 'PAB' ||
            novedad === 'LDF' ||
            novedad === 'ICCP' ||
            novedad === 'SC' ||
            novedad === 'LMA' ||
            novedad === 'DPAG' ||
            novedad === 'LR' ||
            novedad === 'LPA' ||
            novedad === 'SOP' ||
            novedad === 'DES' ||
            novedad === 'RET' ||
            novedad === 'SUS' ||
            novedad === 'LNR' ||
            novedad === 'VAC' ||
            novedad === 'JVOT'
        ) && (
                dataItemsShifts.Horas_Laboradas > 0 ||
                dataItemsShifts.Turno_Ini > '00:00:00' ||
                dataItemsShifts.Turno_Fin > '00:00:00' ||
                dataItemsShifts.Dialogo_Ini > '00:00:00' ||
                dataItemsShifts.Dialogo_Fin > '00:00:00' ||
                dataItemsShifts.Des_1_Ini > '00:00:00' ||
                dataItemsShifts.Des_1_Fin > '00:00:00' ||
                dataItemsShifts.Des_2_Ini > '00:00:00' ||
                dataItemsShifts.Des_2_Fin > '00:00:00' ||
                dataItemsShifts.Des_3_Ini > '00:00:00' ||
                dataItemsShifts.Des_3_Fin > '00:00:00' ||
                dataItemsShifts.Lunch_Ini > '00:00:00' ||
                dataItemsShifts.Lunch_Fin > '00:00:00' ||
                dataItemsShifts.Training_1_Ini > '00:00:00' ||
                dataItemsShifts.Training_1_Fin > '00:00:00' ||
                dataItemsShifts.Training_2_Ini > '00:00:00' ||
                dataItemsShifts.Training_2_Fin > '00:00:00' ||
                dataItemsShifts.Lac_Ini > '00:00:00' ||
                dataItemsShifts.Lac_Fin > '00:00:00'
            )) {
            errorMessages.push(`La novedad '${novedad}' NO debe tener horas programadas. Fila:'${key}'`);
            hasError = true;
            break;
        }
    };
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages)
    }

    io.emit('progreso', 'Verificando turnos duplicados');
    // Verificar si ya se ha encontrado el documento y la fecha
    const documents = {}; // Objeto para almacenar documentos y fechas encontrados
    for (const key of keys) {
        const dataItem = data[key];
        const documento = dataItem.Documento;
        const fecha = dataItem.Fecha;

        if (documents.hasOwnProperty(documento) && documents[documento] === fecha) {
            errorMessages.push(`Duplicado encontrado para el documento '${documento}' y la fecha '${fecha}'. Fila '${key}'`);
            hasError = true;
            break;
        };

        // Registrar el documento y la fecha en el objeto
        documents[documento] = fecha;
    }
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    };
    io.emit('progreso', 'Verificando turnos duplicados');

    io.emit('progreso', 'Verificando documentos ');
    //validar que el documento a insertar se encuentre en el socio
    for (const key of keys) {
        const dataItem = data[key];
        const documento = dataItem.Documento;

        // const verifyDocumento = `SELECT Documento FROM T_Socio WHERE Documento = ?`;
        const verifyDocumento = `SELECT Documento FROM T_Socio WHERE Documento IN (?) AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento IN (?))`;

        try {
            const [results] = await connectionSocio.promise().query(verifyDocumento, [documento, documento]);
            if (results.length === 0) {
                throw new Error(`Este documento '${documento}' es inexistente. Fila '${key}'`);
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            break;
        }
    }
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }


    //verificamos que los turnos a insertar (esa persona n este en la maya de ejecutivos, y si la persona esta como SOP los reemplaze comparando la fecha)
    // Verificamos que los turnos a insertar (esa persona no esté en la malla de ejecutivos,
    // y si la persona está como SOP, los reemplace comparando la fecha)
    io.emit('progreso', 'Verificando que no hayan turnos en otras mallas');
    for (const key of keys) {
        const dataItem = data[key];
        const documento = dataItem.Documento;
        const fecha = dataItem.Fecha;

        const sql = `SELECT * FROM T_Shifts WHERE Documento IN (?) AND Fecha IN (?)`;

        try {
            const [results] = await connection.promise().query(sql, [documento, fecha]);
            if (results.length > 0) {
                const novedad = results[0].Novedad;
                if (novedad !== 'SOP') {
                    throw new Error(`Este documento '${documento}' tiene turnos cargados en la malla operativa para el día '${fecha}'. Por favor, comunícate con los analistas de 'WF'`);
                }
            }
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
            continue;
        }

        // Insertar los datos en la tabla T_Shifts independientemente de si hay resultados o no
        const horasLaboradasDecimal = parseFloat(dataItem.Horas_Laboradas);
        const valuesInsert = [
            dataItem.Fecha,
            dataItem.Documento,
            dataItem.Servicio,
            dataItem.Novedad,
            horasLaboradasDecimal,
            dataItem.Turno_Ini,
            dataItem.Turno_Fin,
            dataItem.Dialogo_Ini,
            dataItem.Dialogo_Fin,
            dataItem.Des_1_Ini,
            dataItem.Des_1_Fin,
            dataItem.Des_2_Ini,
            dataItem.Des_2_Fin,
            dataItem.Des_3_Ini,
            dataItem.Des_3_Fin,
            dataItem.Lunch_Ini,
            dataItem.Lunch_Fin,
            dataItem.Training_1_Ini,
            dataItem.Training_1_Fin,
            dataItem.Training_2_Ini,
            dataItem.Training_2_Fin,
            dataItem.Lac_Ini,
            dataItem.Lac_Fin
        ];

        const sqlInsert = `INSERT INTO T_Shifts_Staff (
        Fecha, 
        Documento, 
        Servicio, 
        Novedad, 
        Horas_Laboradas, 
        Turno_Ini, 
        Turno_Fin, 
        Dialogo_Ini, 
        Dialogo_Fin, 
        Des_1_Ini, 
        Des_1_Fin, 
        Des_2_Ini, 
        Des_2_Fin, 
        Des_3_Ini, 
        Des_3_Fin, 
        Lunch_Ini, 
        Lunch_Fin, 
        Training_1_Ini, 
        Training_1_Fin, 
        Training_2_Ini, 
        Training_2_Fin, 
        Lac_Ini, Lac_Fin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        Fecha = VALUES(Fecha), 
        Documento = VALUES(Documento), 
        Servicio = VALUES(Servicio), 
        Novedad = VALUES(Novedad),
        Horas_Laboradas = VALUES(Horas_Laboradas), 
        Turno_Ini = VALUES(Turno_Ini), 
        Turno_Fin = VALUES(Turno_Fin),
        Dialogo_Ini = VALUES(Dialogo_Ini), 
        Dialogo_Fin = VALUES(Dialogo_Fin), 
        Des_1_Ini = VALUES(Des_1_Ini),
        Des_1_Fin = VALUES(Des_1_Fin), 
        Des_2_Ini = VALUES(Des_2_Ini), 
        Des_2_Fin = VALUES(Des_2_Fin),
        Des_3_Ini = VALUES(Des_3_Ini), 
        Des_3_Fin = VALUES(Des_3_Fin), 
        Lunch_Ini = VALUES(Lunch_Ini),
        Lunch_Fin = VALUES(Lunch_Fin), 
        Training_1_Ini = VALUES(Training_1_Ini),
        Training_1_Fin = VALUES(Training_1_Fin), 
        Training_2_Ini = VALUES(Training_2_Ini),
        Training_2_Fin = VALUES(Training_2_Fin), Lac_Ini = VALUES(Lac_Ini), 
        Lac_Fin = VALUES(Lac_Fin)`;

        try {
            await connection.promise().query(sqlInsert, valuesInsert);
        } catch (error) {
            errorMessages.push(error.message);
            hasError = true;
        }
    }

    // Si hay errores, devolver el mensaje de error y terminar la función
    if (hasError) {
        connection.end();
        connectionSocio.end();
        return res.status(400).send(errorMessages);
    }




    // Si no hay errores, insertar los datos en la tabla T_Shifts
    try {
        await connection.promise().beginTransaction();
        io.emit('progreso', 'Insertando turnos programados en la malla');
        // Actualizar o insertar los registros en la tabla T_Shifts
        for (const key of keys) {
            const itemData = data[key];
            const horasLaboradasDecimal = parseFloat(itemData.Horas_Laboradas);
            const valuesInsert = [
                itemData.Fecha,
                itemData.Documento,
                itemData.Servicio,
                itemData.Novedad,
                horasLaboradasDecimal,
                itemData.Turno_Ini,
                itemData.Turno_Fin,
                itemData.Dialogo_Ini,
                itemData.Dialogo_Fin,
                itemData.Des_1_Ini,
                itemData.Des_1_Fin,
                itemData.Des_2_Ini,
                itemData.Des_2_Fin,
                itemData.Des_3_Ini,
                itemData.Des_3_Fin,
                itemData.Lunch_Ini,
                itemData.Lunch_Fin,
                itemData.Training_1_Ini,
                itemData.Training_1_Fin,
                itemData.Training_2_Ini,
                itemData.Training_2_Fin,
                itemData.Lac_Ini,
                itemData.Lac_Fin
            ];

            const sqlUpdate = `INSERT INTO T_Shifts_Staff (
        Fecha, 
        Documento, 
        Servicio, 
        Novedad, 
        Horas_Laboradas, 
        Turno_Ini, 
        Turno_Fin, 
        Dialogo_Ini, 
        Dialogo_Fin, 
        Des_1_Ini, 
        Des_1_Fin, 
        Des_2_Ini, 
        Des_2_Fin, 
        Des_3_Ini, 
        Des_3_Fin, 
        Lunch_Ini, 
        Lunch_Fin, 
        Training_1_Ini, 
        Training_1_Fin, 
        Training_2_Ini, 
        Training_2_Fin, 
        Lac_Ini, Lac_Fin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                        Fecha = VALUES(Fecha), 
                        Documento = VALUES(Documento), 
                        Servicio = VALUES(Servicio), 
                        Novedad = VALUES(Novedad),
                        Horas_Laboradas = VALUES(Horas_Laboradas), 
                        Turno_Ini = VALUES(Turno_Ini), 
                        Turno_Fin = VALUES(Turno_Fin),
                        Dialogo_Ini = VALUES(Dialogo_Ini), 
                        Dialogo_Fin = VALUES(Dialogo_Fin), 
                        Des_1_Ini = VALUES(Des_1_Ini),
                        Des_1_Fin = VALUES(Des_1_Fin), 
                        Des_2_Ini = VALUES(Des_2_Ini), 
                        Des_2_Fin = VALUES(Des_2_Fin),
                        Des_3_Ini = VALUES(Des_3_Ini), 
                        Des_3_Fin = VALUES(Des_3_Fin), 
                        Lunch_Ini = VALUES(Lunch_Ini),
                        Lunch_Fin = VALUES(Lunch_Fin), 
                        Training_1_Ini = VALUES(Training_1_Ini),
                        Training_1_Fin = VALUES(Training_1_Fin), 
                        Training_2_Ini = VALUES(Training_2_Ini),
                        Training_2_Fin = VALUES(Training_2_Fin), Lac_Ini = VALUES(Lac_Ini), 
                        Lac_Fin = VALUES(Lac_Fin)`;

            await connection.promise().query(sqlUpdate, valuesInsert);
        }

        // Confirmar la transacción
        await connection.promise().commit();
        connection.end();
        connectionSocio.end();

        const callback = () => { };
        setTimeout(() => {
            Collaborator_Dimensioning_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            });
            Collaborator_Novelty_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            })
        }, 5000);
        io.emit('progreso', 'se han insertado los turnos programados en la malla');

        return res.status(200).send('Turnos cargados exitosamente');
    } catch (error) {
        // Deshacer la transacción en caso de error
        await connection.promise().rollback();
        connection.end();
        connectionSocio.end();
        return res.status(500).send('Error al actualizar e insertar los registros');
    }
});

module.exports = Push_Malla_Administartivo;

