const { Almaverso, Sociodemographic } = require('../BDconfig');
const mysql = require('mysql2');
const express = require('express');
const Push_Malla = express.Router();
const cors = require('cors');

// Módulos propios
const Collaborator_Dimensioning = require('./Dimensionamiento_And_Novelty_Advisers/Collaborator_Dimensioning');
const Collaborator_Novelty = require('./Dimensionamiento_And_Novelty_Advisers/Collaborator_Novelty');
const { authenticateToken } = require('../Auth/AuthMiddleware');

// Middlewares
Push_Malla.use(cors());
Push_Malla.use(express.json());
Push_Malla.use(express.urlencoded({ extended: false }));

Push_Malla.put('/API/UPDATE-PUSH_MALLA/v1/', authenticateToken, async (req, res) => {
  const io = req.io;
  const connectionCambiar = mysql.createConnection(Almaverso);
  const connectionSocio = mysql.createConnection(Sociodemographic);

  const data = req.body;
  const keys = Object.keys(data);
  const errorMessages = [];
  let hasError = false; // Bandera para verificar si se encuentra un error en cualquier validación

  io.emit('progreso', 'Iniciando el proceso de inserción de turnos');

  // -------------------------------------------------------------------------
  // 1. VALIDAR FORMATO DE FECHA
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando formato de fechas');
  for (const key of keys) {
    const dataItem = data[key];
    const fecha = dataItem.Fecha;

    // Expresión regular para verificar el formato de fecha 'yyyy-mm-dd'
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    try {
      // Verificar si la fecha cumple con el formato requerido
      if (!regex.test(fecha)) {
        throw new Error(`La fecha '${fecha}' está en un formato incorrecto. Fila '${key}'`);
      }
    } catch (error) {
      errorMessages.push(error.message);
      hasError = true;
      break;
    }
  }

  // -------------------------------------------------------------------------
  // 2. VALIDAR QUE TODOS LOS SERVICIOS EXISTEN (un solo query)
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando servicios');
  try {
    // Extraer todos los servicios
    const allServices = Object.values(data).map(item => item.Servicio);
    // Eliminar duplicados
    const uniqueServices = [...new Set(allServices)];

    // Un solo SELECT para todos los servicios
    const verifyService = `SELECT Servicio FROM T_Socio WHERE Servicio IN (?)`;
    const [serviceResults] = await connectionSocio.promise().query(verifyService, [uniqueServices]);

    // Crear un Set con los servicios que sí existen
    const foundServices = new Set(serviceResults.map(row => row.Servicio));

    // Verificar cuáles servicios faltan
    const missingServices = uniqueServices.filter(serv => !foundServices.has(serv));

    // Si faltan servicios, generamos los errores
    if (missingServices.length > 0) {
      missingServices.forEach(serv => {
        errorMessages.push(`Este servicio '${serv}' no existe en el socio.`);
      });
      hasError = true;
    }

  } catch (error) {
    errorMessages.push(error.message);
    hasError = true;
  }

  // Si ya hubo error, retornamos
  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }
  io.emit('progreso', 'Servicios verificados');


  // -------------------------------------------------------------------------
  // 3. VALIDAR QUE TODAS LAS NOVEDADES EXISTEN (un solo query)
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando novedades');
  try {
    // Extraer todas las novedades
    const allNovelties = Object.values(data).map(item => item.Novedad);
    // Eliminar duplicados
    const uniqueNovelties = [...new Set(allNovelties)];

    // Un solo SELECT para todas las novedades
    const verifyNovedad = `SELECT Codigo_Novedad FROM T_Shifts_Novelties WHERE Codigo_Novedad IN (?)`;
    const [noveltiesResults] = await connectionCambiar.promise().query(verifyNovedad, [uniqueNovelties]);

    // Crear un Set con las novedades que sí existen
    const foundNovelties = new Set(noveltiesResults.map(row => row.Codigo_Novedad));

    // Verificar cuáles novedades faltan
    const missingNovelties = uniqueNovelties.filter(nov => !foundNovelties.has(nov));

    // Si faltan novedades, generamos los errores
    if (missingNovelties.length > 0) {
      missingNovelties.forEach(nov => {
        errorMessages.push(`La novedad de turno '${nov}' no existe.`);
      });
      hasError = true;
    }

  } catch (error) {
    errorMessages.push(error.message);
    hasError = true;
  }

  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }
  io.emit('progreso', 'Novedades verificadas');


  // -------------------------------------------------------------------------
  // 4. VALIDAR QUE LAS NOVEDADES 'TUR' TENGAN HORAS DE TURNO
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando que los turnos cuenten con horas');
  for (const key of keys) {
    const itemData = data[key];
    const { Novedad, Turno_Ini, Turno_Fin } = itemData;

    if (Novedad === 'TUR') {
      // Si es 'TUR' y no hay horas, error
      if (
        (Turno_Ini === '00:00:00' || Turno_Ini === '00:00') &&
        (Turno_Fin === '00:00:00' || Turno_Fin === '00:00')
      ) {
        errorMessages.push(`La novedad '${Novedad}' de la fila '${key}' no contiene horas. Verifica los campos.`);
        hasError = true;
        break;
      }
    }
  }

  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }

  // -------------------------------------------------------------------------
  // 5. VALIDAR QUE EL EMPLEADO NO ESTÉ EN 'Retiro'
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // 5. VALIDAR QUE EL EMPLEADO NO ESTÉ EN 'Retiro'
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando retiros');

  try {
    const allDocuments = Object.keys(data).map(key => data[key].Documento);
    const uniqueDocuments = [...new Set(allDocuments)];
    const docsQuery = `
    SELECT t.Documento, t.Estado_Empleado
    FROM T_Socio AS t
    JOIN (
      SELECT Documento, MAX(Fecha_Corte) AS MaxFecha
      FROM T_Socio
      WHERE Documento IN (?)
      GROUP BY Documento
    ) AS x
      ON t.Documento = x.Documento
      AND t.Fecha_Corte = x.MaxFecha
  `;

    const [rowsDocs] = await connectionSocio.promise().query(docsQuery, [uniqueDocuments]);

    const docStateMap = new Map();
    for (const row of rowsDocs) {
      docStateMap.set(String(row.Documento), row.Estado_Empleado);
    }
    for (const key of keys) {
      const { Documento } = data[key];
      const docComoString = String(Documento);

      if (!docStateMap.has(docComoString)) {
        errorMessages.push(
          `El documento '${Documento}' no existe en T_Socio. Fila '${key}'`
        );
        hasError = true;
        break;
      }

      if (docStateMap.get(docComoString) === 'Retiro') {
        errorMessages.push(
          `El asesor con documento '${Documento}' está en estado 'Retiro'. Fila '${key}'`
        );
        hasError = true;
        break;
      }
    }

    if (hasError) {
      connectionCambiar.end();
      connectionSocio.end();
      return res.status(400).send(errorMessages);
    }

    io.emit('progreso', 'Data sin retiros');

  } catch (error) {
    // Si falla la consulta o algo interno
    errorMessages.push(error.message);
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }



  // -------------------------------------------------------------------------
  // 6. VALIDAR CAMPOS VACÍOS
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando campos vacíos');
  for (const key of keys) {
    const f = data[key];
    if (
      !f.Fecha || !f.Documento || !f.Servicio || !f.Novedad || !f.Horas_Laboradas || !f.Turno_Ini || !f.Turno_Fin ||
      !f.Dialogo_Ini || !f.Dialogo_Fin || !f.Des_1_Ini || !f.Des_1_Fin || !f.Des_2_Ini || !f.Des_2_Fin || !f.Des_3_Ini ||
      !f.Des_3_Fin || !f.Lunch_Ini || !f.Lunch_Fin || !f.Training_1_Ini || !f.Training_1_Fin || !f.Training_2_Ini ||
      !f.Training_2_Fin || !f.Lac_Ini || !f.Lac_Fin) {
      errorMessages.push(`Campo vacío. Fila '${key}'`);
      hasError = true;
      break;
    }
  }

  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }
  io.emit('progreso', 'Sin campos vacíos');

  // -------------------------------------------------------------------------
  // 7. VALIDAR FECHAS >= DIA ACTUAL
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando fechas >= día actual');
  function formatDate(dateParts) {
    const [year, month, day] = dateParts.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  for (const key of keys) {
    const dateItem = data[key];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const dateParts = dateItem.Fecha;
    const formattedCurrentDate = formatDate([
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    ].join('-'));

    if (dateParts < formattedCurrentDate) {
      errorMessages.push(`La fecha de la fila '${key}' debe ser igual o posterior a hoy`);
      hasError = true;
      break;
    }
  }
  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }
  io.emit('progreso', 'Fechas validadas');

  // -------------------------------------------------------------------------
  // 8. VALIDAR QUE SOLO TUR, FOR, VOT TENGAN HORAS PROGRAMADAS
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando turnos (TUR, FOR, VOT deben tener horas)');
  for (const key of keys) {
    const { Novedad, Turno_Ini, Turno_Fin } = data[key];
    if ((Novedad === 'TUR' || Novedad === 'FOR' || Novedad === 'VOT') &&
      (Turno_Ini === '00:00:00' || Turno_Fin === '00:00:00')) {
      errorMessages.push(`La novedad '${Novedad}' debe tener horas programadas. Fila '${key}'`);
      hasError = true;
      break;
    }
  }
  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }
  io.emit('progreso', 'Turnos validados');

  // -------------------------------------------------------------------------
  // 9. VALIDAR QUE EL RESTO DE NOVEDADES NO TENGAN HORAS PROGRAMADAS
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando resto de novedades');
  const novedadSinHoras = [
    'PAB', 'LDF', 'ICCP', 'SC', 'LMA', 'DPAG', 'LR', 'LPA', 'SOP',
    'DES', 'RET', 'SUS', 'LNR', 'VAC', 'JVOT'
  ];
  for (const key of keys) {
    const d = data[key];
    if (
      novedadSinHoras.includes(d.Novedad) &&
      (
        d.Horas_Laboradas > 0 ||
        d.Turno_Ini > '00:00:00' ||
        d.Turno_Fin > '00:00:00' ||
        d.Dialogo_Ini > '00:00:00' ||
        d.Dialogo_Fin > '00:00:00' ||
        d.Des_1_Ini > '00:00:00' ||
        d.Des_1_Fin > '00:00:00' ||
        d.Des_2_Ini > '00:00:00' ||
        d.Des_2_Fin > '00:00:00' ||
        d.Des_3_Ini > '00:00:00' ||
        d.Des_3_Fin > '00:00:00' ||
        d.Lunch_Ini > '00:00:00' ||
        d.Lunch_Fin > '00:00:00' ||
        d.Training_1_Ini > '00:00:00' ||
        d.Training_1_Fin > '00:00:00' ||
        d.Training_2_Ini > '00:00:00' ||
        d.Training_2_Fin > '00:00:00' ||
        d.Lac_Ini > '00:00:00' ||
        d.Lac_Fin > '00:00:00'
      )
    ) {
      errorMessages.push(`La novedad '${d.Novedad}' NO debe tener horas programadas. Fila:'${key}'`);
      hasError = true;
      break;
    }
  }
  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }

  // -------------------------------------------------------------------------
  // 10. VERIFICAR DUPLICADOS (Documento + Fecha)
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando turnos duplicados');
  const documents = {};
  for (const key of keys) {
    const dataItem = data[key];
    const { Documento, Fecha } = dataItem;

    if (documents.hasOwnProperty(Documento) && documents[Documento] === Fecha) {
      errorMessages.push(
        `Duplicado encontrado para el documento '${Documento}' y la fecha '${Fecha}'. Fila '${key}'`
      );
      hasError = true;
      break;
    }
    documents[Documento] = Fecha;
  }
  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }
  io.emit('progreso', 'Sin registros duplicados');


  // -------------------------------------------------------------------------
  // 11. VERIFICAR QUE NO TENGAN TURNOS CARGADOS EN OTRAS MALLAS (T_Shifts_Staff)
  //    E INSERTAR (O ACTUALIZAR) EN T_Shifts
  // -------------------------------------------------------------------------
  io.emit('progreso', 'Verificando que no hayan turnos en otras mallas');
  for (const key of keys) {
    const dataItem = data[key];
    const { Documento, Fecha } = dataItem;

    // 12.1 Validamos si ya existe en T_Shifts_Staff
    const sqlCheck = `SELECT Documento,Fecha FROM T_Shifts_Staff WHERE Documento IN (?) AND Fecha IN (?)`;

    try {
      const [results] = await connectionCambiar.promise().query(sqlCheck, [Documento, Fecha]);
      if (results.length > 0) {
        throw new Error(
          `El documento '${Documento}' tiene turnos en malla administrativa para el día '${Fecha}'. ` +
          `Fila '${key}'. Por favor, comunícate con los analistas de WFM.`
        );
      }
    } catch (error) {
      errorMessages.push(error.message);
      hasError = true;
      continue; // seguimos recorriendo para mostrar todos los errores posibles
    }

    // 12 Insertar (o actualizar) en T_Shifts
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

    const sqlInsert = `
      INSERT INTO T_Shifts (
        Fecha, Documento, Servicio, Novedad, Horas_Laboradas, 
        Turno_Ini, Turno_Fin, Dialogo_Ini, Dialogo_Fin,
        Des_1_Ini, Des_1_Fin, Des_2_Ini, Des_2_Fin,
        Des_3_Ini, Des_3_Fin, Lunch_Ini, Lunch_Fin,
        Training_1_Ini, Training_1_Fin, Training_2_Ini, Training_2_Fin,
        Lac_Ini, Lac_Fin
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        Training_2_Fin = VALUES(Training_2_Fin),
        Lac_Ini = VALUES(Lac_Ini),
        Lac_Fin = VALUES(Lac_Fin)
    `;

    try {
      await connectionCambiar.promise().query(sqlInsert, valuesInsert);
    } catch (error) {
      errorMessages.push(error.message);
      hasError = true;
    }
  }

  // Si hubo errores en el proceso anterior:
  if (hasError) {
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(400).send(errorMessages);
  }

  // -------------------------------------------------------------------------
  // 13. CONFIRMAR LA INSERCIÓN/ACTUALIZACIÓN FINAL (T_Shifts)
  // -------------------------------------------------------------------------
  try {
    io.emit('progreso', 'Insertando turnos programados en la malla');
    await connectionCambiar.promise().beginTransaction();

    // Recorremos de nuevo para asegurar la escritura final en T_Shifts
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

      const sqlUpdate = `
        INSERT INTO T_Shifts (
          Fecha, Documento, Servicio, Novedad, Horas_Laboradas, 
          Turno_Ini, Turno_Fin, Dialogo_Ini, Dialogo_Fin,
          Des_1_Ini, Des_1_Fin, Des_2_Ini, Des_2_Fin,
          Des_3_Ini, Des_3_Fin, Lunch_Ini, Lunch_Fin,
          Training_1_Ini, Training_1_Fin, Training_2_Ini, Training_2_Fin,
          Lac_Ini, Lac_Fin
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          Training_2_Fin = VALUES(Training_2_Fin),
          Lac_Ini = VALUES(Lac_Ini),
          Lac_Fin = VALUES(Lac_Fin)
      `;

      await connectionCambiar.promise().query(sqlUpdate, valuesInsert);
    }

    // Confirmamos la transacción
    await connectionCambiar.promise().commit();
    connectionCambiar.end();
    connectionSocio.end();

    // Llamadas finales a otros procesos
    const callback = () => { };
    setTimeout(() => {
      // Actualizar dimensionamiento
      Collaborator_Dimensioning((err, result) => {
        if (err) {
          callback(null, err);
        } else if (result.length === 0) {
          callback(null);
        } else {
          callback(null, result);
        }
      });
      // Actualizar novedades
      Collaborator_Novelty((err, result) => {
        if (err) {
          callback(null, err);
        } else if (result.length === 0) {
          callback(null);
        } else {
          callback(null, result);
        }
      });
    }, 5000);

    io.emit('progreso', 'Se han insertado los turnos programados en la malla');
    return res.status(200).send('Turnos cargados exitosamente');

  } catch (error) {
    // Si algo falla en la transacción, hacemos rollback
    await connectionCambiar.promise().rollback();
    connectionCambiar.end();
    connectionSocio.end();
    return res.status(500).send('Error al actualizar e insertar los registros: ' + error.message);
  }
});

module.exports = Push_Malla;