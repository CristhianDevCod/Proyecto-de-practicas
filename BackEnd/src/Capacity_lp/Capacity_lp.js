import { authenticateToken } from '../Auth/AuthMiddleware';
import { Almaverso } from '../BDconfig';
import { convertirSerialAFecha, ExcelDateToJSDate } from './Utilities_lp';

import multer from 'multer';
import XLSX from 'xlsx';

const mysql = require('mysql2');
const express = require('express');
const Capacity_lp = express.Router();
const cors = require('cors');
const upload = multer();

Capacity_lp.use(cors());
Capacity_lp.use(express.json());
Capacity_lp.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);

//ENDPOINT PARA DESCARGAR EXCEL A PARTIR DE UNA CONSULTA
Capacity_lp.get('/API/GET/CAPACIDAD-LP/:mesSeleccionado', authenticateToken, async (req, res, next) => {
    const mesSeleccionado = req.params.mesSeleccionado; // DEBE SER UNA FECHA EN FORMATO "YYYY-MM"

    // VERIFICAR EL FORMATO DEL MES
    const mesRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (!mesRegex.test(mesSeleccionado)) {
        return res.status(400).send('El parámetro "mes" debe tener el formato "YYYY-MM".');
    }

    try {
        const exportCharge = () =>
            new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.log('ESTE ES EL ERROR # 1:', err);
                        reject('Error en el servidor');
                        return;
                    }

                    try {
                        // CREAR LA FECHA SELECCIONADA
                        const [year, month] = mesSeleccionado.split('-');
                        const primerDiaDelMes = new Date(Number(year), Number(month) - 1, 1);
                        const ultimoDiaDelMes = new Date(Number(year), Number(month), 0);

                        // FORMATEAR LA FECHA "YYYY-MM-DD"
                        const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
                        const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];

                        // CONSULTA PARA OBTENER LOS PLANES DE CAPACIDAD DEL MES SELECCIONADO
                        const sql = `
                SELECT 
                  DATE_FORMAT(FechaInicioMes, '%Y-%m-%d') AS FechaInicioMes,
                  IdServicio,
                  TipoSemana,
                  Forecast,
                  NsPlaneado,
                  NAtencionPlaneado,
                  ContactoPlaneado,
                  EfectividadPlaneada,
                  AhtPlaneado,
                  AbsPlaneado,
                  ItiPlaneado,
                  RotacionPlaneada,
                  SimultaneidadPlaneada,
                  AgReqConexion,
                  AgAusencias,
                  AgRotacion,
                  PuestosReqAg,
                  PuestosReqStaff,
                  HorasConexion,
                  HorasProductivas,
                  HorasOcupadas
                FROM PLAN_CAPACIDAD.planeacion_lp
                WHERE DATE(FechaInicioMes) BETWEEN ? AND ?;
              `;

                        connection.query(sql, [fechaInicio, fechaFin], (err, result) => {
                            if (err) {
                                console.log('ESTE ES EL ERROR # 2:', err);
                                reject('Error en el servidor');
                            } else if (result.length === 0) {
                                reject(`No hay datos para el rango de fechas ${fechaInicio} a ${fechaFin}`);
                            } else {
                                resolve(result);
                            }
                        });
                    } catch (error) {
                        console.log('ERROR INTERNO EN EL SERVIDOR:', error);
                        reject('Error interno del servidor');
                    } finally {
                        // LIBERAR LA CONEXIÓN EN EL BLOQUE FINALLY
                        connection.release();
                    }
                });
            });

        // OBTENER LOS DATOS PRINCIPALES
        const resultExport = await exportCharge();

        if (resultExport.length === 0) {
            return res.status(404).send('No hay resultados');
        }

        res.status(200).json(resultExport); // DEVOLVER LOS DATOS EN FORMATO JSON
    } catch (error) {
        console.error('ERROR INTERNO DEL SERVIDOR:', error);
        next(error);
    }
});

// FUNCIÓN PARA GUARDAR O ACTUALIZAR LOS REGISTROS DESPUÉS DE SER VALIDADOS
const saveDataToDatabase = async (data) => {
    try {
        // OBTENER UNA CONEXIÓN DEL POOL
        const connection = await pool.promise().getConnection();

        for (const row of data) {
            const {
                FechaInicioMes, IdServicio, TipoSemana, Forecast, NsPlaneado,
                NAtencionPlaneado, ContactoPlaneado, EfectividadPlaneada, AhtPlaneado, AbsPlaneado,
                ItiPlaneado, RotacionPlaneada, SimultaneidadPlaneada, AgReqConexion, AgAusencias,
                AgRotacion, PuestosReqAg, PuestosReqStaff, HorasConexion, HorasProductivas, HorasOcupadas
            } = row;

            // FORMATEAR LAS FECHAS ANTES DE INSERTARLAS
            const formattedFechaInicioMes = convertirSerialAFecha(FechaInicioMes);

            const query = `
                INSERT INTO planeacion_lp (
                    FechaInicioMes, IdServicio, TipoSemana, Forecast, NsPlaneado,
                    NAtencionPlaneado, ContactoPlaneado, EfectividadPlaneada, AhtPlaneado, AbsPlaneado,
                    ItiPlaneado, RotacionPlaneada, SimultaneidadPlaneada, AgReqConexion, AgAusencias,
                    AgRotacion, PuestosReqAg, PuestosReqStaff, HorasConexion, HorasProductivas, HorasOcupadas
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    TipoSemana = VALUES(TipoSemana),
                    Forecast = VALUES(Forecast),
                    NsPlaneado = VALUES(NsPlaneado),
                    NAtencionPlaneado = VALUES(NAtencionPlaneado),
                    ContactoPlaneado = VALUES(ContactoPlaneado),
                    EfectividadPlaneada = VALUES(EfectividadPlaneada),
                    AhtPlaneado = VALUES(AhtPlaneado),
                    AbsPlaneado = VALUES(AbsPlaneado),
                    ItiPlaneado = VALUES(ItiPlaneado),
                    RotacionPlaneada = VALUES(RotacionPlaneada),
                    SimultaneidadPlaneada = VALUES(SimultaneidadPlaneada),
                    AgReqConexion = VALUES(AgReqConexion),
                    AgAusencias = VALUES(AgAusencias),
                    AgRotacion = VALUES(AgRotacion),
                    PuestosReqAg = VALUES(PuestosReqAg),
                    PuestosReqStaff = VALUES(PuestosReqStaff),
                    HorasConexion = VALUES(HorasConexion),
                    HorasProductivas = VALUES(HorasProductivas),
                    HorasOcupadas = VALUES(HorasOcupadas);
            `;

            await connection.query(query, [
                formattedFechaInicioMes, IdServicio, TipoSemana, Forecast, NsPlaneado, NAtencionPlaneado,
                ContactoPlaneado, EfectividadPlaneada, AhtPlaneado, AbsPlaneado, ItiPlaneado, RotacionPlaneada,
                SimultaneidadPlaneada, AgReqConexion, AgAusencias, AgRotacion, PuestosReqAg, PuestosReqStaff,
                HorasConexion, HorasProductivas, HorasOcupadas
            ]);
        }

        console.log('Datos insertados o actualizados correctamente.');

        // LIBERAR LA CONEXIÓN EN VEZ DE CERRARLA
        connection.release();
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        throw new Error('Error al guardar los datos en la base de datos.');
    }
};


//FUNCIÓN PARA VALIDAR Y PROCESAR LOS DATOS DEL EXCEL
const validateAndProcessData = async (data) => {
    const errores = []; // ARRAY PARA ALMACENAR ERRORES DE VALIDACIÓN

    try {
        // VALIDACIÓN BÁSICA
        data.forEach((row, index) => {
            const requiredFields = [
                'FechaInicioMes', 'IdServicio', 'TipoSemana', 'Forecast',
                'NsPlaneado', 'NAtencionPlaneado', 'ContactoPlaneado', 'EfectividadPlaneada',
                'AhtPlaneado', 'AbsPlaneado', 'ItiPlaneado', 'RotacionPlaneada', 'SimultaneidadPlaneada',
                'AgReqConexion', 'AgAusencias', 'AgRotacion', 'PuestosReqAg', 'PuestosReqStaff', 'HorasConexion',
                'HorasProductivas', 'HorasOcupadas'
            ];

            requiredFields.forEach((field) => {
                if (row[field] === undefined || row[field] === null || row[field] === '') {
                    errores.push({
                        line: index + 1,
                        field,
                        message: `El campo "${field}" es obligatorio.`,
                    });
                }
            });
        });

        if (errores.length > 0) {
            throw new Error('Errores de validación detectados.');
        }

        // PROCESAR DATOS (GUARDAR EN DB)
        await saveDataToDatabase(data);
    } catch (error) {
        if (errores.length > 0) {
            // ENVIAR LOS ERRORES COMO PARTE DEL OBJERO DE ERROR
            throw { validationErrors: errores };
        }
        throw error; // OTROS ERRORES NO REALCIONADOS CON LA VALIDACIÓN
    }
};

//ENDPOINT PARA CARGAR EXCEL
Capacity_lp.post('/API/UPLOAD/CAPACIDAD-LP', authenticateToken, upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha enviado un archivo.' });
        }

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ message: 'El archivo debe contener datos válidos.' });
        }

        await validateAndProcessData(data);

        res.status(200).json({ message: 'Datos procesados correctamente.' });
    } catch (error) {
        if (error.validationErrors) {
            return res.status(400).json({
                message: 'Errores de validación detectados.',
                errores: error.validationErrors, // ENVIAR LOS ERRORES DETALLADOS
            });
        }

        console.error('Error al procesar el archivo:', error);
        res.status(500).json({
            message: 'Error interno al procesar el archivo.',
            error: error.message
        });
    }
});

//ENDPOINT PARA DESCARGAR EXCEL CON EL LISTADO DE SERVICIOS SEGÚN CLIENTE ENVIADO
Capacity_lp.get('/API/GET/CAPACIDAD-LP/LISTADO-SERVICIOS/:idClienteSeleccionado', authenticateToken, async (req, res, next) => {
    const idClienteSeleccionado = req.params.idClienteSeleccionado;

    try {
        const exportCharge = () =>
            new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error('Error al obtener conexión con la base de datos:', err);
                        reject('Error en el servidor');
                        return;
                    }

                    try {
                        // CONSULTA SQL FILTRANDO POR idClienteSeleccionado
                        // const sql = `
                        //     SELECT 
                        //         cli.id_cliente, 
                        //         cli.nombre_cliente,
                        //         ope.id_operacion, 
                        //         ope.nombre_operacion,
                        //         seg.id_segmento,
                        //         seg.nombre_segmento,
                        //         serv.id_servicio, 
                        //         serv.nombre_servicio
                        //     FROM 
                        //         Alamaverso_Antares_Jerarquias.tbl_cliente AS cli
                        //         LEFT JOIN Alamaverso_Antares_Jerarquias.tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id AND ope.estado_operacion = 1
                        //         LEFT JOIN Alamaverso_Antares_Jerarquias.tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion AND seg.estado_segmento = 1
                        //         LEFT JOIN Alamaverso_Antares_Jerarquias.tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento AND serv.estado_servicio = 1
                        //     WHERE 
                        //         cli.id_cliente = ? 
                        //         AND cli.estado_cliente = 1;
                        // `;
                        const sql = `
                            SELECT 
                                cli.id_cliente, 
                                cli.nombre_cliente,
                                ope.id_operacion, 
                                ope.nombre_operacion,
                                seg.id_segmento,
                                seg.nombre_segmento,
                                serv.id_servicio, 
                                serv.nombre_servicio
                            FROM 
                                prueba_antares_jerarquias.tbl_cliente AS cli
                                LEFT JOIN prueba_antares_jerarquias.tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id AND ope.estado_operacion = 1
                                LEFT JOIN prueba_antares_jerarquias.tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion AND seg.estado_segmento = 1
                                LEFT JOIN prueba_antares_jerarquias.tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento AND serv.estado_servicio = 1
                            WHERE 
                                cli.id_cliente = ? 
                                AND cli.estado_cliente = 1;
                        `;

                        connection.query(sql, [idClienteSeleccionado], (err, result) => {
                            connection.release(); // LIBERAR LA CONEXIÓN EN CUALQUIER CASO
                            if (err) {
                                console.error('Error al ejecutar la consulta:', err);
                                reject('Error en el servidor');
                            } else if (result.length === 0) {
                                reject(`No se encontraron datos para el cliente ID: ${idClienteSeleccionado}`);
                            } else {
                                resolve(result); // DEVOLVER LOS RESULTADOS
                            }
                        });
                    } catch (error) {
                        connection.release(); // LIBERAR LA CONEXIÓN INCLUSO SI HAY ERROR INTERNO
                        reject('Error interno del servidor');
                    }
                });
            });

        // OBTENER LOS DATOS IMPORTANTES
        const resultExport = await exportCharge();

        if (resultExport.length === 0) {
            return res.status(404).send('No hay resultados');
        }

        res.status(200).json(resultExport); // DEVOLVER LOS DATOS EN FORMATO JSON
    } catch (error) {
        console.error('Error interno del servidor:', error);
        next(error); // PASAR EL ERROR AL MANEJADOR DE ERRORES
    }
});


module.exports = Capacity_lp
