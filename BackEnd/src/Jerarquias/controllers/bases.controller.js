import { antaresJerarquias, formgen } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);
const pool2 = mysql.createPool(formgen);


import moment from 'moment';
import XLSX from 'xlsx';
import { Parser } from 'json2csv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';



// RUTA TEMPORAL PARA GUARDAR EL ARCHIVO EXCEL GENERADO
const TEMP_DIR = path.resolve('tmp');

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

export const createAsignacionBase = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreBase, fechaRecibo, servicioId } = req.body;

    await connection.beginTransaction();

    await connection.query(
      "INSERT INTO tbl_bases_outbound (nombre_base, fecha_recibido, servicio_id) VALUES (?, ?, ?)",
      [nombreBase, fechaRecibo, servicioId]
    );

    const [insertedIdResult] = await connection.query("SELECT LAST_INSERT_ID() as id");
    const insertedId = insertedIdResult[0].id;

    await connection.commit();

    res.status(201).json({ message: "Asignación creada exitosamente", resp: 1, idBase: insertedId });
  } catch (error) {
    await connection.rollback();
    console.error("Error al crear la asignación:", error);
    return res.status(500).json({ message: "Error al crear la asignación", resp: 0 });
  } finally {
    connection.release();
  }
};

export const getBasesByIds = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);

    const [rows] = await connection.query("SELECT * FROM tbl_bases_outbound WHERE id_base = ?", [id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el objeto en específico:', error);
    res.status(500).json({ message: "Error al obtener el objeto en específico" });
  } finally {
    connection.release();
  }
};

// version remota formgen
// ENDPOINT PARA GENERAR ARCHIVO EXCEL A PARTIR DEL JSON QUE LLEGA DE FORMGEM
export const generateTemplate = async (req, res) => {
  const { id_campana, id_base } = req.body;
  console.log('ID Campaña:', id_campana, 'ID Base:', id_base);

  try {
    // Verificar y crear la carpeta temporal si no existe
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }

    // Realizar una solicitud al endpoint externo
    // const response = await fetch(`https://almapps.online/formgen/public/api/v1/antaresTemplate`, {
    const response = await fetch(`http://10.96.16.67/formgen/public/api/v1/antaresTemplate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YW50YXJlc0BhbG1hY29sLmNvOmFudGFyZXMuYWxtYWNvbDIwMjU='
      },
      body: JSON.stringify({ id: id_campana })
    });

    if (!response.ok) {
      throw new Error('Error al obtener la plantilla');
    }

    const responseData = await response.json();
    const template = responseData.template;

    // Verificar el contenido del template
    console.log('Template content:', template);

    // Asegurarse de que el template es un array de strings
    if (!Array.isArray(template) || template.some(item => typeof item !== 'string')) {
      throw new Error('El template no tiene el formato esperado (array de strings)');
    }

    // Convertir el array de strings en un array de arrays
    const headers = template;

    // Verificar si el número de encabezados es mayor a 14
    if (headers.length <= 14) {
      console.error('El template tiene 14 o menos elementos.');
      return res.status(400).json({ error: 'El template debe tener más de 14 elementos en los encabezados' });
    }

    const modifiedTemplate = [
      headers, // Encabezados en la primera fila
      [id_campana, id_base, ...Array(headers.length - 2).fill('')] // IDs en la segunda fila
    ];

    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new();

    // Crear una hoja de trabajo con el template modificado
    const ws = XLSX.utils.aoa_to_sheet(modifiedTemplate);
    XLSX.utils.book_append_sheet(wb, ws, 'Template');

    // Ruta del archivo Excel temporal
    const filePath = path.join(TEMP_DIR, `template_${id_campana}.xlsx`);
    console.log('Saving file to:', filePath); // Imprime la ruta del archivo para verificar

    // Guardar el libro en un archivo temporal
    try {
      XLSX.writeFile(wb, filePath);
      console.log('Excel file written successfully');
    } catch (error) {
      console.error('Error writing Excel file:', error);
      return res.status(500).json({ error: 'Error writing Excel file' });
    }

    // Verificar que el archivo se ha guardado correctamente
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist after saving:', filePath);
      return res.status(500).json({ error: 'File not found after saving' });
    }

    // Enviar el archivo al cliente
    res.download(filePath, `template_${id_campana}.xlsx`, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        return res.status(500).json({ error: 'Error downloading file' });
      }

      // Eliminar el archivo temporal después de enviar la respuesta
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting temporary file:', unlinkErr);
        }
      });
    });
  } catch (error) {
    console.error('Error generating template:', error);
    res.status(500).json({ error: 'Error generating template' });
  }
};

// FUNCIÓN PARA OBTENER LA ESTRUCTURA DE LA PLANTILLA ANTES DE CARGARLA (FORMGEN)
const obtenerEncabezadosEsperados = async (id_campana) => {
  try {
    // const response = await fetch(`https://almapps.online/formgen/public/api/v1/antaresTemplate`, {
    const response = await fetch(`http://10.96.16.67/formgen/public/api/v1/antaresTemplate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YW50YXJlc0BhbG1hY29sLmNvOmFudGFyZXMuYWxtYWNvbDIwMjU='
      },
      body: JSON.stringify({ id: id_campana })
    });

    if (!response.ok) {
      throw new Error('Error al obtener la plantilla');
    }

    const { template } = await response.json();
    // Verificar el contenido del template
    console.log('Template content:', template);
    return template; // Devolver el array completo de encabezados
  } catch (error) {
    console.error('Error obteniendo encabezados esperados:', error);
    throw error;
  }
};

// DEFINIR TIPOS DE DTAOS ESPERADOS EN COLUMNA
const tiposDeDatosEsperados = {
  id_campana: 'number',
  id_base: 'number',
  id_cliente: 'string',
  nombre_cliente: 'string',
  telefono_1: 'string',
  telefono_2: 'string',
  telefono_3: 'string',
  telefono_4: 'string',
  telefono_5: 'string',
  telefono_6: 'string',
  telefono_7: 'string',
  telefono_8: 'string',
  telefono_9: 'string',
  telefono_10: 'string',
  fecha_1: 'date',
  fecha_2: 'date',
  fecha_3: 'date',
  fecha_4: 'date',
  fecha_5: 'date',
  fecha_6: 'date',
  fecha_7: 'date',
  fecha_8: 'date',
  fecha_9: 'date',
  fecha_10: 'date',
  fecha_hora_1: 'datetime',
  fecha_hora_2: 'datetime',
  fecha_hora_3: 'datetime',
  fecha_hora_4: 'datetime',
  fecha_hora_5: 'datetime',
  fecha_hora_6: 'datetime',
  fecha_hora_7: 'datetime',
  fecha_hora_8: 'datetime',
  fecha_hora_9: 'datetime',
  fecha_hora_10: 'datetime',
  numero_1: 'number',
  numero_2: 'number',
  numero_3: 'number',
  numero_4: 'number',
  numero_5: 'number',
  numero_6: 'number',
  numero_7: 'number',
  numero_8: 'number',
  numero_9: 'number',
  numero_10: 'number',
  varchar_1: 'string',
  varchar_2: 'string',
  varchar_3: 'string',
  varchar_4: 'string',
  varchar_5: 'string',
  varchar_6: 'string',
  varchar_7: 'string',
  varchar_8: 'string',
  varchar_9: 'string',
  varchar_10: 'string',
  varchar_11: 'string',
  varchar_12: 'string',
  varchar_13: 'string',
  varchar_14: 'string',
  varchar_15: 'string',
  varchar_16: 'string',
  varchar_17: 'string',
  varchar_18: 'string',
  varchar_19: 'string',
  varchar_20: 'string',
  varchar_21: 'string',
  varchar_22: 'string',
  varchar_23: 'string',
  varchar_24: 'string',
  varchar_25: 'string',
  varchar_26: 'string',
  varchar_27: 'string',
  varchar_28: 'string',
  varchar_29: 'string',
  varchar_30: 'string',
  varchar_31: 'string',
  varchar_32: 'string',
  varchar_33: 'string',
  varchar_34: 'string',
  varchar_35: 'string',
  varchar_36: 'string',
  varchar_37: 'string',
  varchar_38: 'string',
  varchar_39: 'string',
  varchar_40: 'string',
  varchar_41: 'string',
  varchar_42: 'string',
  varchar_43: 'string',
  varchar_44: 'string',
  varchar_45: 'string',
  varchar_46: 'string',
  varchar_47: 'string',
  varchar_48: 'string',
  varchar_49: 'string',
  varchar_50: 'string',
};

// FUNCIÓN PARA CONVERTIR VALOR A FECHA EN CASO DE QUE LLEGUE POR EJEMPLO: 08/06/2024
const convertirSerialAFecha = (valor) => {
  if (typeof valor === 'number') {
    const fecha = ExcelDateToJSDate(valor);
    return moment(fecha).format('YYYY-MM-DD'); // Ajusta el formato si es necesario
  }
  const formatos = ['DD-MM-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'YYYY/MM/DD'];
  for (let formato of formatos) {
    const fecha = moment(valor, formato, true);
    if (fecha.isValid()) {
      return fecha.format('YYYY-MM-DD');
    }
  }
  return null;
};

// FUNCIÓN EXTRA PARA CONVERTIR FECHAS DE EXCEL A JS
const ExcelDateToJSDate = (serial) => {
  // La fecha base en Excel (1 de enero de 1900)
  const start = new Date(Date.UTC(1900, 0, 1));
  
  // Ajuste por el año 1900 como bisiesto
  const excelLeapYearAdjustment = 1;

  // Convertir el número de serie a días y milisegundos
  const days = Math.floor(serial);
  const ms = (serial - days) * 86400000; // Parte decimal del número de serie convertida a milisegundos
  
  // Calcular la fecha en el sistema de JavaScript
  const date = new Date(start.getTime() + (days - excelLeapYearAdjustment) * 86400000 + ms);
  
  // Ajustar la fecha para la zona horaria local
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset);
};

// FUNCIÓN PARA VALIDAR ARCHIVO CARGADO (FORMGEN)
const validarArchivo = async (fileBuffer, id_campana) => {
  try {
    const encabezadosEsperados = await obtenerEncabezadosEsperados(id_campana);
    console.log('Encabezados esperados:', encabezadosEsperados);

    const workbook = XLSX.read(fileBuffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (json.length === 0) {
      throw new Error('El archivo está vacío o no contiene datos');
    }

    const encabezadosArchivo = json[0];
    const encabezadosFaltantes = encabezadosEsperados.filter(encabezado => !encabezadosArchivo.includes(encabezado));
    const encabezadosExtras = encabezadosArchivo.filter(encabezado => !encabezadosEsperados.includes(encabezado));

    if (encabezadosFaltantes.length > 0 || encabezadosExtras.length > 0) {
      throw new Error(`Encabezados no válidos. Faltan: ${encabezadosFaltantes.join(', ')}. Extras: ${encabezadosExtras.join(', ')}`);
    }

    const errores = [];

    const datos = json.slice(1).map((fila, index) => {
      let objeto = {};
      encabezadosArchivo.forEach((encabezado, i) => {
        let valor = fila[i];
        const tipoEsperado = tiposDeDatosEsperados[encabezado];

        console.log(`Fila ${index + 2}, Columna ${encabezado}:`, valor);

        if (tipoEsperado) {
          let valorValidado = valor;

          if (valor === undefined || valor === null || valor === '') {
            if (tipoEsperado === 'date' || tipoEsperado === 'datetime') {
              valorValidado = null;
            } else if (tipoEsperado === 'number') {
              valorValidado = null;
            }
          } else {
            if (tipoEsperado === 'date') {
              valorValidado = convertirSerialAFecha(valor);
              if (!valorValidado) {
                errores.push(`Fila ${index + 2}: El valor en la columna ${encabezado} no es una fecha válida.`);
              }
            } else if (tipoEsperado === 'datetime') {
              valorValidado = convertirSerialAFecha(valor);
              if (!valorValidado) {
                errores.push(`Fila ${index + 2}: El valor en la columna ${encabezado} no es una fecha/hora válida.`);
              }
            } else if (tipoEsperado === 'number') {
              valorValidado = Number(valor);
              if (isNaN(valorValidado)) {
                errores.push(`Fila ${index + 2}: El valor en la columna ${encabezado} no es un número válido.`);
              }
            } else if (tipoEsperado === 'string') {
              valorValidado = String(valor);
            }

            objeto[encabezado] = valorValidado;
          }
        } else {
          objeto[encabezado] = valor;
        }
      });

      return objeto;
    });

    if (errores.length > 0) {
      throw new Error(`Errores en el archivo:\n${errores.join('\n')}`);
    }

    return datos;

  } catch (error) {
    console.error('Error validando el archivo:', error.message);
    throw error;
  }
};

// ENDPOINT PARA CARGAR ARCHIVO Y VALIDAR CONTENIDO
export const uploadAndValidate = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error al subir el archivo:', err);
      return res.status(400).json({ error: 'Error al subir el archivo' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    const filePath = path.join(TEMP_DIR, req.file.filename);
    console.log('Archivo subido a:', filePath);

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const { id_campana } = req.body;

      const datosValidos = await validarArchivo(fileBuffer, id_campana);
      await insertarDatosEnBaseDeDatos(datosValidos);

      res.status(200).json({ message: 'Archivo cargado y validado exitosamente' });

    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      res.status(400).json({ error: error.message });
    } finally {
      // Eliminar el archivo temporal después de procesarlo
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error al eliminar el archivo temporal:', unlinkErr);
        }
      });
    }
  });
};

// FUNCIÓN QUE INSERTA LOS DATOS EN LA TABLA CARGUES DE FORMGEN
const insertarDatosEnBaseDeDatos = async (data) => {
  try {
    // Verificar si ya existe un registro con el mismo id_base
    const idBaseExistente = data[0].id_base;

    const [existingRecord] = await pool2.query(
      "SELECT id_base FROM cargues WHERE id_base = ? LIMIT 1",
      [idBaseExistente]
    );

    if (existingRecord.length > 0) {
      throw new Error(`No es posible cargar este archivo, debido a que ya existe un registro en FormGen con el mismo idBase No. ${idBaseExistente}`);
    }

    // Si no existe, proceder con la inserción
    const sql = `
      INSERT INTO cargues (
        id_campana, id_base, id_cliente, nombre_cliente, telefono_1, telefono_2, telefono_3,
        telefono_4, telefono_5, telefono_6, telefono_7, telefono_8, telefono_9, telefono_10,
        fecha_1, fecha_2, fecha_3, fecha_4, fecha_5, fecha_6, fecha_7, fecha_8, fecha_9, fecha_10,
        fecha_hora_1, fecha_hora_2, fecha_hora_3, fecha_hora_4, fecha_hora_5, fecha_hora_6, fecha_hora_7,
        fecha_hora_8, fecha_hora_9, fecha_hora_10, numero_1, numero_2, numero_3, numero_4, numero_5,
        numero_6, numero_7, numero_8, numero_9, numero_10, varchar_1, varchar_2, varchar_3, varchar_4,
        varchar_5, varchar_6, varchar_7, varchar_8, varchar_9, varchar_10, varchar_11, varchar_12,
        varchar_13, varchar_14, varchar_15, varchar_16, varchar_17, varchar_18, varchar_19, varchar_20,
        varchar_21, varchar_22, varchar_23, varchar_24, varchar_25, varchar_26, varchar_27, varchar_28,
        varchar_29, varchar_30, varchar_31, varchar_32, varchar_33, varchar_34, varchar_35, varchar_36,
        varchar_37, varchar_38, varchar_39, varchar_40, varchar_41, varchar_42, varchar_43, varchar_44,
        varchar_45, varchar_46, varchar_47, varchar_48, varchar_49, varchar_50
      ) VALUES ?
    `;

    const values = data.map(item => [
      item.id_campana, item.id_base, item.id_cliente, item.nombre_cliente, item.telefono_1, item.telefono_2, item.telefono_3,
      item.telefono_4, item.telefono_5, item.telefono_6, item.telefono_7, item.telefono_8, item.telefono_9, item.telefono_10,
      item.fecha_1, item.fecha_2, item.fecha_3, item.fecha_4, item.fecha_5, item.fecha_6, item.fecha_7, item.fecha_8, item.fecha_9, item.fecha_10,
      item.fecha_hora_1, item.fecha_hora_2, item.fecha_hora_3, item.fecha_hora_4, item.fecha_hora_5, item.fecha_hora_6, item.fecha_hora_7,
      item.fecha_hora_8, item.fecha_hora_9, item.fecha_hora_10, item.numero_1, item.numero_2, item.numero_3, item.numero_4, item.numero_5,
      item.numero_6, item.numero_7, item.numero_8, item.numero_9, item.numero_10, item.varchar_1, item.varchar_2, item.varchar_3, item.varchar_4,
      item.varchar_5, item.varchar_6, item.varchar_7, item.varchar_8, item.varchar_9, item.varchar_10, item.varchar_11, item.varchar_12,
      item.varchar_13, item.varchar_14, item.varchar_15, item.varchar_16, item.varchar_17, item.varchar_18, item.varchar_19, item.varchar_20,
      item.varchar_21, item.varchar_22, item.varchar_23, item.varchar_24, item.varchar_25, item.varchar_26, item.varchar_27, item.varchar_28,
      item.varchar_29, item.varchar_30, item.varchar_31, item.varchar_32, item.varchar_33, item.varchar_34, item.varchar_35, item.varchar_36,
      item.varchar_37, item.varchar_38, item.varchar_39, item.varchar_40, item.varchar_41, item.varchar_42, item.varchar_43, item.varchar_44,
      item.varchar_45, item.varchar_46, item.varchar_47, item.varchar_48, item.varchar_49, item.varchar_50
    ]);

    await pool2.query(sql, [values]);
    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error insertando datos en la base de datos:", error);
    throw new Error(error.message);
  }
};

// FUNCIÓN PARA GENERAR Y ENVIAR FRONT EL CSV
export const generarCSV = async (req, res) => {
  const connection = await pool2.getConnection();
  const { id } = req.params;
  try {
    const sql = `
      SELECT c.id_campana, c.id AS id_cargue, c.id_base, c.id_cliente, x.id_servicio AS id_gestion,
             c.nombre_cliente, c.telefono_1, c.telefono_2, c.telefono_3, c.telefono_4, 
             c.telefono_5, c.telefono_6, c.telefono_7 , c.telefono_8, c.telefono_9, c.telefono_10
      FROM cargues c 
      INNER JOIN campanas x ON x.id = c.id_campana
      WHERE c.id_base = ?;
    `;
    const [rows] = await connection.query(sql, [id]);
    console.log('Resultados de la consulta:', rows);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron datos en FormGen para el idBase proporcionado' });
    }

    // Configuración del archivo CSV
    const csvFields = [
      'id_campana', 'id_cargue', 'id_base', 'id_cliente', 'id_gestion',
      'nombre_cliente', 'telefono_1', 'telefono_2', 'telefono_3', 'telefono_4', 
      'telefono_5', 'telefono_6', 'telefono_7', 'telefono_8', 'telefono_9', 'telefono_10'
    ];
    const json2csvParser = new Parser({ fields: csvFields });
    const csv = json2csvParser.parse(rows);

    // Crear un archivo temporal para almacenar el CSV
    const filePath = path.join(TEMP_DIR, `cargues_${id}.csv`);
    console.log('Saving file CSV to:', filePath); // Imprime la ruta del archivo para verificar
    fs.writeFileSync(filePath, csv);

    // Enviar el archivo al cliente
    res.download(filePath, `cargues_${id}.csv`, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).json({ error: 'Error al enviar el archivo' });
      }

      // Eliminar el archivo después de enviarlo
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error al eliminar el archivo temporal:', unlinkErr);
        }
      });
    });
  } catch (error) {
    console.error('Error al generar el CSV:', error);
    res.status(500).json({ error: 'Error al generar el CSV' });
  } finally {
    connection.release();
  }
};



