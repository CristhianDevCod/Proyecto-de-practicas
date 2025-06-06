const {
    antaresKPI,
    antaresJerarquias,
    almasocio,
    Sociodemographic,
    KPISOCIO53,
} = require("../BDconfig"); // conexion
const mysql = require("mysql2");
const express = require("express");
const indicadoresG = express();
const cors = require("cors");
// const { authenticateToken } = require("../Auth/AuthMiddleware");
indicadoresG.use(cors());
indicadoresG.use(express.json());
indicadoresG.use(express.urlencoded({ extended: false }));

//Conexiones que implementan piscina
const poolKpi = mysql.createPool(antaresKPI);
const poolJerarquiaGETALL = mysql.createPool(antaresJerarquias);
const poolAlmaSocio = mysql.createPool(almasocio);
const poolSociodemographic = mysql.createPool(Sociodemographic);

//Conexion que implementa piscina para anteres socio kpi 53
const poolSocioKPI53 = mysql.createPool(KPISOCIO53);

//Acciones gestor kpi - no mayores a 20 caracteres
const solicitudCreacion = "Creación";
const solicitudEdicion = "Edición";
const solicitudInvalidar = "Invalidar";
const solicitudHabilitar = "Habilitar";

//Acciones SIG
const SIGAcciones = {
    editar: "SIG editar",
    aprobacion: "SIG aprueba",
    rechazo: "SIG rechaza",
    inhabilita: "SIG inhabilitar",
    habilitar: "SIG habilitar",
};

//Estados del kpi
const enAprobacion = 1;
const aprobado = 2;
const inhabilitado = 3;

// Consultas a tablas DDBB
//Endpoint para obtener todos los tipos de kpis
indicadoresG.get("/API/GET/TYPE-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);

                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM tipo_kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//EndPoint para obtener todos los reportes de los KPIs
indicadoresG.get("/API/GET/REPO-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);

                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM reporte";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//EndPoint para obtener todos los formatos de los kpis
indicadoresG.get("/API/GET/FORMAT-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);

                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM formato_kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todas las periodicidades
indicadoresG.get("/API/GET/PERIODI-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);

                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM periodicidad";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todas las clasificaciones
indicadoresG.get("/API/GET/CLASIFICA-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        return reject("Error interno del servidor: " + err.message);
                    } else {
                        const sql = "SELECT * FROM pruebas_kpi.clasificacion_kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            }
                            if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (!result || result.length === 0) {
            return res.status(404).send("No hay resultados");
        }

        return res.status(200).send(result);
    } catch (error) {
        console.error("Error en el endpoint:", error); // Imprime cualquier error que ocurra
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todas las procesos
indicadoresG.get("/API/GET/PROCESO-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        return reject("Error interno del servidor: " + err.message);
                    } else {
                        const sql = "SELECT * FROM proceso_kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            }
                            if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });

        const result = await Query();

        if (!result || result.length === 0) {
            return res.status(404).send("No hay resultados");
        }

        return res.status(200).send(result);
    } catch (error) {
        console.error("Error en el endpoint:", error); // Imprime cualquier error que ocurra
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todas las procesos
indicadoresG.get("/API/GET/RESPONSABLE-ALL-UPD/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolSociodemographic.getConnection((err, connection) => {
                    if (err) {
                        return reject("Error interno del servidor: " + err.message);
                    } else {
                        const sql =
                            "SELECT DISTINCT Documento, Nombres, Apellidos  FROM `t_socio` WHERE Servicio LIKE '%BUSINESS ANALYTICS%';";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            }
                            if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });

        const result = await Query();

        if (!result || result.length === 0) {
            return res.status(404).send("No hay resultados");
        }

        return res.status(200).send(result);
    } catch (error) {
        console.error("Error en el endpoint:", error); // Imprime cualquier error que ocurra
        return next("Error interno del servidor");
    }
});

// Consultas Submodulo
//Endpoint para obtener todas los logs
indicadoresG.get("/API/GET/LOGKPI-ALL/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor" + err.message);
                    } else {
                        // const sql = "SELECT * FROM log_kpi";
                        const sql = `
                        SELECT l.id_log, l.id_kpi, l.descripcion, l.usuario, l.accion, l.fecha FROM log_kpi l INNER JOIN (
                            SELECT id_kpi, MAX(fecha) AS max_fecha
                            FROM log_kpi
                            GROUP BY id_kpi
                        )lm ON l.id_kpi = lm.id_kpi AND l.fecha = lm.max_fecha`;
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todas los logs (para kpis)
indicadoresG.get("/API/GET/LOGKPI-ALL-FILTER/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor" + err.message);
                    }

                    const validActions = [
                        "Creación",
                        "Edición",
                        "Invalidar",
                        "Habilitar",
                    ];

                    const sql = `
                    SELECT
                        id_log,
                        id_kpi,
                        descripcion,
                        usuario,
                        accion,
                        fecha
                    FROM log_kpi
                    WHERE accion IN (?) ORDER BY fecha DESC
                `;

                    connection.query(
                        sql,
                        [validActions, validActions],
                        (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        }
                    );
                });
            });

        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return next("Error interno del servidor");
    }
});

// ---------- Area GRUD KPI -----------
//Endpoint para obtener todos los KPIs
indicadoresG.get("/API/GET-ALL-KPIS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);

                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
// Endpoint para INSERT en la tabla kpi + log
indicadoresG.post("/API/INSERT-KPI/", async (req, res, next) => {
    try {
        const data = req.body; //Datos enviados desde el frontend
        // console.log(data.proces)

        //Validación básica de campos obligatorios
        if (!data.nombrekpi || !data.tipo) {
            return res.status(400).send("Campos obligatorios faltantes");
        }

        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor: ", err.message);
                    } else {
                        //Estructura SQL para INSERT en la tabla kpi
                        const sqlInsertKpi = `
                        INSERT INTO kpi (
                            nombre_kpi,
                            descripcion_kpi,
                            tipo_kpi_id,
                            meta_kpi,
                            reporte_id,
                            formula_medicion,
                            responsable_upd,
                            periodicidad_id,
                            formato_kpi_id,
                            tipo_calculo,
                            aplica_personas,
                            clasificacion_id,
                            proceso_kpi_id,
                            estado_kpi_id
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

                        // Mapeo de valores
                        const valuesKPI = [
                            data.nombrekpi,
                            data.descripcion_kpi,
                            parseInt(data.tipo),
                            data.meta,
                            parseInt(data.reporte),
                            data.medicion,
                            data.responsable,
                            parseInt(data.periodicidad),
                            parseInt(data.formatokpi),
                            parseInt(data.calculo),
                            parseInt(data.aplicaPersonas),
                            parseInt(data.clasificacion),
                            parseInt(data.proceso),
                            aprobado,
                        ];

                        connection.query(sqlInsertKpi, valuesKPI, (error, result) => {
                            if (error) {
                                connection.release(); //Liberar aquí solo si ocurre error
                                return reject(
                                    "Error en la inserción del KPI: " + error.message
                                );
                            } else {
                                const idKpi = result.insertId; // ID del KPI recién creado

                                //Registro en la tabla log_kpi
                                const sqlInsertLog = `
                                INSERT INTO log_kpi (
                                    id_kpi,
                                    descripcion,
                                    usuario,
                                    accion
                                ) VALUES (?, ?, ?, ?);`;

                                const valuesLog = [
                                    idKpi,
                                    "Creación de nuevo indicador", //Descripción fija
                                    data.usuario,
                                    data.proceso !== inhabilitado
                                        ? solicitudCreacion
                                        : "Creación",
                                ];

                                connection.query(sqlInsertLog, valuesLog, (errorLog) => {
                                    connection.release(); //Liberar aquí después de finalizar todo
                                    if (errorLog) {
                                        return reject(
                                            "Error al registrar el log del KPI: ",
                                            errorLog.message
                                        );
                                    } else {
                                        resolve({
                                            insertId: idKpi,
                                            message: "KPI y Log creados correctamente",
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });

        const result = await Query();
        return res.status(200).send({
            status: "success",
            insertedId: result.insertId,
            message: "KPI creado correctamente",
        });
    } catch (error) {
        console.error("Error en el servidor: ", error);
        return res.status(500).send("Error interno del servidor");
    }
});
//EndPoint para Update
indicadoresG.put("/API/UPDATE-KPI/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        //Validación básica de campos obligatorios
        if (!data.nombrekpi || !data.tipo) {
            return res.status(400).send("Campos obligatorios faltantes");
        }

        //Validar existencia de campo obligatorio
        if (data.descripcion_log.trim() === "") {
            return res
                .status(400)
                .send("Error no se ha proporcionado el campo obligatorio: ");
        }

        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor: " + err.message);
                    } else {
                        //Estructura SQL para UPDATE
                        const sql = `
                        UPDATE kpi SET
                            nombre_kpi = ?,
                            descripcion_kpi = ?,
                            tipo_kpi_id = ?,
                            meta_kpi = ?,
                            reporte_id = ?,
                            formula_medicion = ?,
                            responsable_upd = ?,
                            periodicidad_id = ?,
                            formato_kpi_id = ?,
                            tipo_calculo = ?,
                            aplica_personas = ?,
                            clasificacion_id = ?,
                            proceso_kpi_id = ?,
                            estado_kpi_id = ?
                        WHERE id_kpi = ?`;
                        //Mapeo de valores
                        const values = [
                            data.nombrekpi,
                            data.descripcion_kpi,
                            parseInt(data.tipo),
                            data.meta,
                            parseInt(data.reporte),
                            data.medicion,
                            data.responsable,
                            parseInt(data.periodicidad),
                            parseInt(data.formatokpi),
                            parseInt(data.calculo),
                            parseInt(data.aplicaPersonas),
                            parseInt(data.clasificacion),
                            parseInt(data.proceso),
                            aprobado,
                            parseInt(id),
                        ];

                        connection.query(sql, values, (error, result) => {
                            if (error) {
                                connection.release();
                                return reject("Error en la actualización: " + error.message);
                            } else {
                                // Si se envía el campo descripcion_log, se inserta el registro en el log_kpi
                                if (data.descripcion_log) {
                                    const sqlInsertLog = `
                                    INSERT INTO log_kpi (
                                        id_kpi,
                                        descripcion,
                                        usuario,
                                        accion
                                    ) VALUES (?, ?, ?, ?);`;
                                    const valuesLog = [
                                        id,
                                        data.descripcion_log,
                                        data.usuario,
                                        solicitudEdicion,
                                    ];

                                    connection.query(sqlInsertLog, valuesLog, (errorLog) => {
                                        connection.release();
                                        if (errorLog) {
                                            return reject(
                                                "Error al registrar el log del KPI",
                                                errorLog.message
                                            );
                                        } else {
                                            resolve(result);
                                        }
                                    });
                                } else {
                                    connection.release();
                                    resolve(result);
                                }
                            }
                        });
                    }
                });
            });

        const result = await Query();
        return res.status(200).send({
            status: "success",
            message: "KPI actualziado correctamente",
        });
    } catch (error) {
        console.log("Error en el servidor: ", error);
        return res.status(500).send("Error interno del servidor");
    }
});
//EndPoint para actualizar estado KPI
indicadoresG.put("/API/UPDATE-KPI-ESTADO/:id", async (req, res, next) => {
    try {
        const id_kpi = parseInt(req.params.id);
        const { estado_kpi_id, mensajeMotivo, usuarioRed, tipoAccion } = req.body;
        const estaAccion =
            tipoAccion === "inhabilitacion" ? solicitudInvalidar : solicitudHabilitar;
        const nuevoEstado = estado_kpi_id === aprobado ? inhabilitado : aprobado;

        //Verificar el campo razon
        if (mensajeMotivo === "") {
            return res
                .status(403)
                .send("No se puede actualiza el estado sin proporcionar una razón");
        }

        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor: ", err.message);
                    } else {
                        //Estructura SQL para UPDATE del estado
                        const sql = `UPDATE kpi SET estado_kpi_id = ? WHERE id_kpi = ?`;
                        const values = [nuevoEstado, id_kpi];
                        connection.query(sql, values, (error, result) => {
                            if (error) {
                                connection.release();
                                return reject(
                                    "Error en la actualización del estado: ",
                                    error.message
                                );
                            } else {
                                // Se envia el log de cambio de estado
                                if (mensajeMotivo) {
                                    const sqlInsertLog = `
                                    INSERT INTO log_kpi (
                                        id_kpi,
                                        descripcion,
                                        usuario,
                                        accion
                                    ) VALUES (?, ?, ?, ?);`;

                                    const valuesLog = [
                                        id_kpi,
                                        mensajeMotivo,
                                        usuarioRed,
                                        estaAccion,
                                    ];

                                    connection.query(sqlInsertLog, valuesLog, (error, result) => {
                                        if (error) {
                                            connection.release();
                                            return reject(
                                                "Error al registrar el log del KPI",
                                                error.message
                                            );
                                        } else {
                                            resolve(result);
                                        }
                                    });
                                } else {
                                    connection.release();
                                    resolve(result);
                                }
                            }
                        });
                    }
                });
            });

        const result = await Query();
        return res.status(200).send({
            status: "success",
            message: "Estado del KPI actualizado correctamente",
        });
    } catch (error) {
        console.log("Error en el servidor: ", error);
        return res.status(500).send("Error interno del servidor");
    }
});

//-----Acciones SIG ----------
//EndPoint para Update
indicadoresG.put("/API/UPDATE-KPI-SIG/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        //Validación básica de campos obligatorios
        if (!data.nombrekpi || !data.tipo) {
            return res.status(400).send("Campos obligatorios faltantes");
        }

        //Validar existencia de campo obligatorio
        if (data.descripcion_log.trim() === "") {
            return res
                .status(400)
                .send("Error no se ha proporcionado el campo obligatorio: ");
        }

        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor: " + err.message);
                    } else {
                        //Estructura SQL para UPDATE
                        const sql = `
                        UPDATE kpi SET
                            nombre_kpi = ?,
                            descripcion_kpi = ?,
                            tipo_kpi_id = ?,
                            meta_kpi = ?,
                            reporte_id = ?,
                            formula_medicion = ?,
                            responsable_upd = ?,
                            periodicidad_id = ?,
                            formato_kpi_id = ?,
                            tipo_calculo = ?,
                            aplica_personas = ?,
                            estado_kpi_id = ?
                        WHERE id_kpi = ?`;
                        //Mapeo de valores
                        const values = [
                            data.nombrekpi,
                            data.descripcion_kpi,
                            parseInt(data.tipo),
                            data.meta,
                            parseInt(data.reporte),
                            data.medicion,
                            data.responsable,
                            parseInt(data.periodicidad),
                            parseInt(data.formatokpi),
                            parseInt(data.calculo),
                            parseInt(data.aplicaPersonas),
                            aprobado,
                            parseInt(id),
                        ];

                        connection.query(sql, values, (error, result) => {
                            if (error) {
                                connection.release();
                                return reject("Error en la actualización: " + error.message);
                            } else {
                                // Si se envía el campo descripcion_log, se inserta el registro en el log_kpi
                                if (data.descripcion_log) {
                                    const sqlInsertLog = `
                                    INSERT INTO log_kpi (
                                        id_kpi,
                                        descripcion,
                                        usuario,
                                        accion
                                    ) VALUES (?, ?, ?, ?);`;
                                    const valuesLog = [
                                        id,
                                        data.descripcion_log,
                                        data.usuario,
                                        SIGAcciones.editar,
                                    ];

                                    connection.query(sqlInsertLog, valuesLog, (errorLog) => {
                                        connection.release();
                                        if (errorLog) {
                                            return reject(
                                                "Error al registrar el log del KPI",
                                                errorLog.message
                                            );
                                        } else {
                                            resolve(result);
                                        }
                                    });
                                } else {
                                    connection.release();
                                    resolve(result);
                                }
                            }
                        });
                    }
                });
            });

        const result = await Query();
        return res.status(200).send({
            status: "success",
            message: "KPI actualziado correctamente",
        });
    } catch (error) {
        console.log("Error en el servidor: ", error);
        return res.status(500).send("Error interno del servidor");
    }
});
//EndPoint para aprobar
indicadoresG.put("/API/APPROVE-KPI/:id", async (req, res, next) => {
    try {
        const id_kpi = parseInt(req.params.id);
        const { usuarioRed } = req.body;
        const approvedState = aprobado;

        //Se actualiza el estado del KPI y se registra el log correspondiente
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor: ", err.message);
                    } else {
                        //Se actualiza el estado a aprobado
                        const sql = "UPDATE kpi SET estado_kpi_id = ? WHERE id_kpi = ?";
                        const values = [approvedState, id_kpi];
                        connection.query(sql, values, (error, result) => {
                            if (error) {
                                connection.release();
                                return reject(
                                    "Error en la actualización del estado: ",
                                    error.message
                                );
                            } else {
                                //Se consulta el último Log para determinar la acción de aprobación
                                const lastLogSql =
                                    "SELECT accion FROM log_kpi WHERE id_kpi = ? ORDER BY id_log DESC LIMIT 1";
                                connection.query(
                                    lastLogSql,
                                    [id_kpi],
                                    (errorLast, lastLogResult) => {
                                        if (errorLast) {
                                            connection.release();
                                            return reject(
                                                "Error al obtener el último log: ",
                                                errorLast.message
                                            );
                                        } else {
                                            let approvalAction;
                                            if (lastLogResult.length > 0) {
                                                const lastAction = lastLogResult[0].accion;
                                                if (lastAction === solicitudEdicion) {
                                                    approvalAction = SIGAcciones.aprobacion;
                                                } else if (lastAction === solicitudInvalidar) {
                                                    approvalAction = SIGAcciones.aprobacion;
                                                } else if (lastAction === solicitudCreacion) {
                                                    approvalAction = SIGAcciones.aprobacion;
                                                } else if (lastAction === SIGAcciones.editar) {
                                                    approvalAction = SIGAcciones.aprobacion;
                                                } else {
                                                    //Valor por defecto
                                                    approvalAction = SIGAcciones.aprobacion;
                                                }
                                            } else {
                                                approvalAction = SIGAcciones.aprobacion;
                                            }

                                            //Insertar registro en Log_kpi indicando aprobacion por SIG
                                            const logSql = `
                                    INSERT INTO log_kpi (
                                        id_kpi,
                                        descripcion,
                                        usuario,
                                        accion
                                    ) VALUES (?, ?, ?, ?);`;

                                            const logValues = [
                                                id_kpi,
                                                "Validado por SIG",
                                                usuarioRed,
                                                approvalAction,
                                            ];
                                            connection.query(
                                                logSql,
                                                logValues,
                                                (errorLog, logResult) => {
                                                    connection.release();
                                                    if (errorLog) {
                                                        return reject(
                                                            "Error al registrar el log del KPI",
                                                            errorLog.message
                                                        );
                                                    } else {
                                                        resolve(result);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        });
                    }
                });
            });
        const result = await Query();
        return res.status(200).send({
            status: "success",
            message: "KPI aprobado correctamente",
        });
    } catch (error) {
        console.log("Error en el servidor: ", error);
        return res.status(500).send("Error interno del servidor");
    }
});
//EndPoint para rechazar
indicadoresG.put("/API/REJECT-KPI/:id", async (req, res, next) => {
    try {
        const id_kpi = parseInt(req.params.id);
        const { usuarioRed, mesajeMotivo } = req.body;
        const rejectStatus = inhabilitado;

        //Se actualiza el estado del KPI y se registra el log correspondiente
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor: " + err.message);
                    } else {
                        //Se actualiza el estado a aprobado
                        const sql = "UPDATE kpi SET estado_kpi_id = ? WHERE id_kpi = ?";
                        const values = [rejectStatus, id_kpi];
                        connection.query(sql, values, (error, result) => {
                            if (error) {
                                connection.release();
                                return reject(
                                    "Error en la actualización del estado: " + error.message
                                );
                            } else {
                                //Se consulta el último Log para determinar la acción de aprobación
                                const lastLogSql =
                                    "SELECT accion FROM log_kpi WHERE id_kpi = ? ORDER BY id_log DESC LIMIT 1";
                                connection.query(
                                    lastLogSql,
                                    [id_kpi],
                                    (errorLast, lastLogResult) => {
                                        if (errorLast) {
                                            connection.release();
                                            return reject(
                                                "Error al obtener el último log: " + errorLast.message
                                            );
                                        } else {
                                            let rejectAction;
                                            if (lastLogResult.length > 0) {
                                                const lastAction = lastLogResult[0].accion;

                                                if (lastAction === solicitudEdicion) {
                                                    rejectAction = SIGAcciones.rechazo;
                                                } else if (lastAction === solicitudInvalidar) {
                                                    rejectAction = SIGAcciones.rechazo;
                                                } else if (lastAction === solicitudHabilitar) {
                                                    rejectAction = SIGAcciones.rechazo;
                                                } else if (lastAction === SIGAcciones.editar) {
                                                    rejectAction = SIGAcciones.rechazo;
                                                } else if (lastAction === SIGAcciones.aprobacion) {
                                                    rejectAction = SIGAcciones.inhabilita;
                                                } else {
                                                    //Valor por defecto
                                                    rejectAction = SIGAcciones.rechazo;
                                                }
                                            } else {
                                                rejectAction = SIGAcciones.rechazo;
                                            }

                                            //Insertar registro en Log_kpi indicando aprobacion por SIG
                                            const logSql = `
                                    INSERT INTO log_kpi (
                                        id_kpi,
                                        descripcion,
                                        usuario,
                                        accion
                                    ) VALUES (?, ?, ?, ?);`;

                                            const logValues = [
                                                id_kpi,
                                                mesajeMotivo,
                                                usuarioRed,
                                                rejectAction,
                                            ];
                                            connection.query(
                                                logSql,
                                                logValues,
                                                (errorLog, logResult) => {
                                                    connection.release();
                                                    if (errorLog) {
                                                        return reject(
                                                            "Error al registrar el log del KPI" +
                                                            errorLog.message
                                                        );
                                                    } else {
                                                        resolve(result);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        });
                    }
                });
            });
        const result = await Query();
        return res.status(200).send({
            status: "success",
            message: "KPI rechazado correctamente",
        });
    } catch (error) {
        console.log("Error en el servidor: " + error);
        return res.status(500).send("Error interno del servidor");
    }
});

//--- Asignación de kpi operativo ---
indicadoresG.get("/API/GET/ALL-JERARQUIAS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolJerarquiaGETALL.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);

                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = `SELECT 
                            cli.id_cliente, 
                            cli.nombre_cliente,
                            ope.id_operacion, 
                            ope.nombre_operacion,  
                            seg.id_segmento, 
                            seg.nombre_segmento, 
                            serv.id_servicio, 
                            serv.nombre_servicio
                        FROM 
                            tbl_cliente AS cli
                            LEFT JOIN tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id AND ope.estado_operacion = 1
                            LEFT JOIN tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion AND seg.estado_segmento = 1
                            LEFT JOIN tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento AND serv.estado_servicio = 1
                            LEFT JOIN tbl_maestra_ob AS mob ON mob.servicio_id = serv.id_servicio AND mob.estado_skill = 1
                            LEFT JOIN tbl_bases_outbound AS bou ON bou.servicio_id = serv.id_servicio AND serv.estado_servicio = 1
                        WHERE
                            cli.estado_cliente = 1
                        GROUP BY 
                            cli.id_cliente, 
                            cli.nombre_cliente,
                            ope.id_operacion, 
                            ope.nombre_operacion, 
                            seg.id_segmento, 
                            seg.nombre_segmento,
                            serv.id_servicio, 
                            serv.nombre_servicio
                        ORDER BY
                            cli.id_cliente DESC;`;
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
// Endpoint para insertar asociación de KPIs a Servicio
indicadoresG.post("/API/INSERT-UPDATE/JERARQUIAS-KPI/", async (req, res, next) => {
    try {
        const data = req.body;

        //Validación básica de campos obligatorios
        if (!data.servicio_id || !data.kpi_ids || !Array.isArray(data.kpi_ids)) {
            return res.status(400).json({
                success: false,
                message: "Se debe proporcionar un servicio y un arreglo de kpis",
            });
        }
        //Obtener una conexión usando la versión promise
        const connection = await poolKpi.promise().getConnection();
        try {
            await connection.beginTransaction();

            let logValues = [];

            if (data.kpi_ids.length > 0) {
                //Eliminar asociaciones existentes
                await connection.query(
                    `DELETE FROM servicio_kpi WHERE servicio_id = ?`,
                    [data.servicio_id]
                );

                //Insertar las nuevas asociaciones
                const values = data.kpi_ids.map((kpi_id) => [
                    data.servicio_id,
                    kpi_id,
                ]);
                await connection.query(
                    `INSERT INTO servicio_kpi (servicio_id, kpi_id)
                    VALUES ? 
                    ON DUPLICATE KEY UPDATE kpi_id = kpi_id`,
                    [values]
                );

                //Preparar logs para cada kpi seleccionado
                logValues = data.kpi_ids.map((kpi_id) => [
                    parseInt(kpi_id),
                    `Servicio id: ${data.servicio_id} Mensaje: ${data.razonEdicion ? data.razonEdicion : "asignación"
                    }`,
                    data.usuario,
                    data.accionServicio,
                ]);
            } else {
                //Si no se seleccionó niingún KPI, obtener asociaciones actuales  para registrar el log de eliminación
                const [currentAssociations] = await connection.query(
                    `SELECT kpi_id FROM servicio_kpi WHERE servicio_id = ?`,
                    [data.servicio_id]
                );

                //Eliminar todas las asociaciones
                await connection.query(
                    `DELETE FROM servicio_kpi WHERE servicio_id = ?`,
                    [data.servicio_id]
                );

                //Parar logs para cada asociación eliminada
                logValues = currentAssociations.map((row) => [
                    row.kpi_id,
                    `Servicio id: ${data.servicio_id}, Mensaje: ${data.razonEdicion ? data.razonEdicion : "asignación"
                    }`,
                    data.usuario,
                    "Eliminar Relación",
                ]);
            }

            // Insertar logs (si hay valores para insertar)
            if (logValues.length > 0) {
                await connection.query(
                    `INSERT INTO log_kpi (
                    id_kpi, 
                    descripcion, 
                    usuario, 
                    accion
                    ) VALUES ?`,
                    [logValues]
                );
            }

            await connection.commit();

            res.status(200).json({
                success: true,
                message: "Operación completada exitosamente",
            });
        } catch (transationError) {
            await connection.rollback();
            console.error("Error durante la transacción", transationError);
            res.status(500).json({
                success: false,
                message: "Error en la transacción",
                error: transationError.message,
            });
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error("Error: ", connectionError);
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: connectionError.message,
        });
    }
}
);
// Obtener todos los kpis asociados a los servicios
indicadoresG.get("/API/GET-ALL-KPIS-SERVICIOS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM servicio_kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todos los KPIs filtrados
indicadoresG.get("/API/GET-ALL-KPIS-SERVICIOS/FILTRADOS/", async (req, res, next) => {
    try {
        // 1. Obtener KPIs con datos de periodicidad, proceso y tipo
        const kpis = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => {
                if (err) return reject(`Error interno del servidor: ${err.message}`);
                const sql = `
                    SELECT
                        k.id_kpi,
                        k.nombre_kpi,
                        k.descripcion_kpi,
                        k.responsable_upd,
                        k.meta_kpi,
                        per.nombre_periodicidad  AS periodicidad_id,
                        pr.nombre_proceso_kpi    AS proceso_kpi_id,
                        tp.nombre_tipo_kpi       AS tipo_kpi_id,
                        k.estado_kpi_id
                    FROM kpi k
                    LEFT JOIN periodicidad per
                        ON k.periodicidad_id = per.id_periodicidad
                    LEFT JOIN proceso_kpi pr
                        ON k.proceso_kpi_id = pr.id_proceso_kpi
                    LEFT JOIN tipo_kpi tp
                        ON k.tipo_kpi_id = tp.tipo_kpi_id
                    WHERE k.proceso_kpi_id != ?;
                `;
                conn.query(sql, [inhabilitado], (error, results) => {
                    conn.release();
                    if (error) {
                        console.log("Este es el proble: ", error)
                        return reject("Error interno del servidor")
                    };
                    resolve(results || []);
                });
            });
        });

        if (!kpis.length) {
            return res.status(404).send("No hay resultados");
        }

        // 2. Obtener nombres de responsables desde la BD sociodemographic
        const responsablesIds = [...new Set(kpis.map(k => k.responsable_upd))].filter(id => id);
        let responsablesMap = {};
        if (responsablesIds.length) {
            const placeholders = responsablesIds.map(() => '?').join(',');
            const sqlSocio = `
        SELECT Documento, Nombres
        FROM t_socio
        WHERE Documento IN (${placeholders})
          AND Servicio LIKE '%BUSINESS ANALYTICS%';
      `;
            const rows = await new Promise((resolve, reject) => {
                poolSociodemographic.getConnection((err, conn) => {
                    if (err) return reject(`Error interno del servidor: ${err.message}`);
                    conn.query(sqlSocio, responsablesIds, (error, results) => {
                        conn.release();
                        if (error) return reject("Error interno del servidor");
                        resolve(results || []);
                    });
                });
            });
            // Mapear Documento -> Nombres
            responsablesMap = rows.reduce((acc, r) => ({ ...acc, [r.Documento]: r.Nombres }), {});
        }

        // 3. Construir respuesta final, reemplazando responsable_upd con Nombre
        const response = kpis.map(k => ({
            id_kpi: k.id_kpi,
            nombre_kpi: k.nombre_kpi,
            descripcion_kpi: k.descripcion_kpi,
            responsable_upd: responsablesMap[k.responsable_upd] || null,
            meta_kpi: k.meta_kpi,
            periodicidad_id: k.periodicidad_id,
            proceso_kpi_id: k.proceso_kpi_id,
            tipo_kpi_id: k.tipo_kpi_id,
            estado_kpi_id: k.estado_kpi_id
        }));

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en el endpoint:", error);
        return next("Error interno del servidor");
    }
}
);

//--- Asignación de kpi administrativo ---
indicadoresG.get("/API/GET/ALL-AREAS-PROCESO/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolAlmaSocio.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = `
                        SELECT
                            a.id AS areaId,
                            a.nombre AS areaNombre, 
                            a.descripcion AS areaDescripcion,
                            p.id AS procesoId,
                            p.nombre AS procesoNombre,
                            p.descripcion AS procesoDescripcion,
                            p.tipo_proceso
                        FROM
                            area a
                        INNER JOIN
                            proceso p ON a.proceso_id = p.id
                        WHERE
                            a.estado = 1
                            AND p.estado = 1;
                    `;
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();
        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }
        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
// Obtener todos los kpis asociados a los servicios
indicadoresG.get("/API/GET-ALL-KPIS-AREAS/", async (req, res, next) => {
    try {
        const Query = () =>
            new Promise((resolve, reject) => {
                poolKpi.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        return reject("Error interno del servidor" + err.message);
                    } else {
                        const sql = "SELECT * FROM areas_kpi";
                        connection.query(sql, (error, result) => {
                            connection.release();
                            if (error) {
                                return reject("Error interno del servidor");
                            } else if (result.length === 0) {
                                resolve("No hay resultados");
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            });
        const result = await Query();

        if (result.length === 0) {
            return res.status(404).send("Not Result");
        }

        return res.status(200).send(result);
    } catch (error) {
        return next("Error interno del servidor");
    }
});
//Endpoint para obtener todos los KPIs administrativos
indicadoresG.get("/API/GET-ALL-KPIS-AREAS/ADMINISTRATIVOS/", async (req, res, next) => {
    // try {
    //     const Query = () =>
    //         new Promise((resolve, reject) => {
    //             poolKpi.getConnection((err, connection) => {
    //                 if (err) {
    //                     console.log(err);

    //                     return reject("Error interno del servidor" + err.message);
    //                 } else {
    //                     const sql = "SELECT * FROM kpi WHERE proceso_kpi_id = ?";
    //                     const SQLValue = [inhabilitado];
    //                     connection.query(sql, SQLValue, (error, result) => {
    //                         connection.release();
    //                         if (error) {
    //                             return reject("Error interno del servidor");
    //                         } else if (result.length === 0) {
    //                             resolve("No hay resultados");
    //                         } else {
    //                             resolve(result);
    //                         }
    //                     });
    //                 }
    //             });
    //         });
    //     const result = await Query();

    //     if (result.length === 0) {
    //         return res.status(404).send("Not Result");
    //     }

    //     return res.status(200).send(result);
    // } catch (error) {
    //     return next("Error interno del servidor");
    // }
    try {
        // 1. Obtener KPIs con datos de periodicidad, proceso y tipo
        const kpis = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => {
                if (err) return reject(`Error interno del servidor: ${err.message}`);
                const sql = `
                    SELECT
                        k.id_kpi,
                        k.nombre_kpi,
                        k.descripcion_kpi,
                        k.responsable_upd,
                        k.meta_kpi,
                        per.nombre_periodicidad  AS periodicidad_id,
                        pr.nombre_proceso_kpi    AS proceso_kpi_id,
                        tp.nombre_tipo_kpi       AS tipo_kpi_id,
                        k.estado_kpi_id
                    FROM kpi k
                    LEFT JOIN periodicidad per
                        ON k.periodicidad_id = per.id_periodicidad
                    LEFT JOIN proceso_kpi pr
                        ON k.proceso_kpi_id = pr.id_proceso_kpi
                    LEFT JOIN tipo_kpi tp
                        ON k.tipo_kpi_id = tp.tipo_kpi_id
                    WHERE k.proceso_kpi_id != ?;
                `;
                conn.query(sql, [inhabilitado], (error, results) => {
                    conn.release();
                    if (error) {
                        console.log("Este es el proble: ", error)
                        return reject("Error interno del servidor")
                    };
                    resolve(results || []);
                });
            });
        });

        if (!kpis.length) {
            return res.status(404).send("No hay resultados");
        }

        // 2. Obtener nombres de responsables desde la BD sociodemographic
        const responsablesIds = [...new Set(kpis.map(k => k.responsable_upd))].filter(id => id);
        let responsablesMap = {};
        if (responsablesIds.length) {
            const placeholders = responsablesIds.map(() => '?').join(',');
            const sqlSocio = `
        SELECT Documento, Nombres
        FROM t_socio
        WHERE Documento IN (${placeholders})
          AND Servicio LIKE '%BUSINESS ANALYTICS%';
      `;
            const rows = await new Promise((resolve, reject) => {
                poolSociodemographic.getConnection((err, conn) => {
                    if (err) return reject(`Error interno del servidor: ${err.message}`);
                    conn.query(sqlSocio, responsablesIds, (error, results) => {
                        conn.release();
                        if (error) return reject("Error interno del servidor");
                        resolve(results || []);
                    });
                });
            });
            // Mapear Documento -> Nombres
            responsablesMap = rows.reduce((acc, r) => ({ ...acc, [r.Documento]: r.Nombres }), {});
        }

        // 3. Construir respuesta final, reemplazando responsable_upd con Nombre
        const response = kpis.map(k => ({
            id_kpi: k.id_kpi,
            nombre_kpi: k.nombre_kpi,
            descripcion_kpi: k.descripcion_kpi,
            responsable_upd: responsablesMap[k.responsable_upd] || null,
            meta_kpi: k.meta_kpi,
            periodicidad_id: k.periodicidad_id,
            proceso_kpi_id: k.proceso_kpi_id,
            tipo_kpi_id: k.tipo_kpi_id,
            estado_kpi_id: k.estado_kpi_id
        }));

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en el endpoint:", error);
        return next("Error interno del servidor");
    }
}
);
// Endpoint para insertar asociación de KPIs a áreas
indicadoresG.post("/API/INSERT-UPDATE/AREAS-KPI/", async (req, res, next) => {
    const data = req.body;

    //Validación básica de campos obligatorios
    if (!data.area_id || !data.kpi_ids || !Array.isArray(data.kpi_ids)) {
        return res.status(400).json({
            success: false,
            message: "Se debe proporcionar un servicio y un arreglo de kpis",
        });
    }

    try {
        //Obtener una conexión usando la versión promise
        const connection = await poolKpi.promise().getConnection();
        try {
            await connection.beginTransaction();

            let logValues = [];

            if (data.kpi_ids.length > 0) {
                //Eliminar asociaciones existentes
                await connection.query(`DELETE FROM areas_kpi WHERE area_id = ?`, [
                    data.area_id,
                ]);

                //Insertar las nuevas asociaciones
                const values = data.kpi_ids.map((kpi_id) => [data.area_id, kpi_id]);
                await connection.query(
                    `INSERT INTO areas_kpi (area_id, kpi_id)
                    VALUES ? 
                    ON DUPLICATE KEY UPDATE kpi_id = kpi_id`,
                    [values]
                );

                //Preparar logs para cada kpi seleccionado
                logValues = data.kpi_ids.map((kpi_id) => [
                    parseInt(kpi_id),
                    `Area id: ${data.area_id} proceso id: ${data.proceso_id} Mensaje: ${data.razonEdicion ? data.razonEdicion : "asignación"
                    }`,
                    data.usuario,
                    data.accionServicio,
                ]);
            } else {
                //Si no se seleccionó ningún KPI, obtener asociaciones actuales para registrar el log de eliminación
                const [currentAssociations] = await connection.query(
                    `SELECT kpi_id FROM areas_kpi WHERE area_id = ?`,
                    [data.area_id]
                );

                //Eliminar todas las asociaciones
                await connection.query(`DELETE FROM areas_kpi WHERE area_id = ?`, [
                    data.area_id,
                ]);

                //Para logs para cada asociación eliminada
                logValues = currentAssociations.map((row) => [
                    row.kpi_id,
                    `Area id: ${data.area_id} proceso id: ${data.proceso_id} Mensaje: ${data.razonEdicion ? data.razonEdicion : "asignación"
                    }`,
                    data.usuario,
                    "Eliminar Relación",
                ]);
            }

            // Insertar logs (si hay valores para insertar)
            if (logValues.length > 0) {
                await connection.query(
                    `INSERT INTO log_kpi (
                    id_kpi, 
                    descripcion, 
                    usuario, 
                    accion
                    ) VALUES ?`,
                    [logValues]
                );
            }

            await connection.commit();

            res.status(200).json({
                success: true,
                message: "Operación completada exitosamente",
            });
        } catch (transationError) {
            await connection.rollback();
            console.error("Error durante la transacción", transationError);
            res.status(500).json({
                success: false,
                message: "Error en la transacción",
                error: transationError.message,
            });
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error("Error: ", connectionError);
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: connectionError.message,
        });
    }
});

// Endpoint para traer todos los usuarios activos
indicadoresG.get("/API/GET-LIST-USERS/ACTIVE/", (req, res) => {
    poolSociodemographic.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send("Error interno del servidor");
        }
        try {
            const sql = `
            SELECT Documento, Usuario_Red 
            FROM t_socio 
            WHERE 
            Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM t_socio) AND 
            Estado_Empleado = 'Activo'`;

            connection.query(sql, (error, result) => {
                connection.release();

                if (error) {
                    return res.status(500).send("Error al obtener los datos");
                }

                if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(404).send({ message: "No se encontraron datos" });
                }
            });
        } catch (error) {
            return res.status(500).send("Error en el servidor", error);
        }
    });
});
// EndPoint para traer un usuario por su documento
indicadoresG.post("/API/GET-USER-BY-DOCUMENT/", (req, res) => {
    const { documento } = req.body;

    if (!documento) {
        return res
            .status(400)
            .send({ message: 'El campo "documento" es requerido' });
    }

    poolSociodemographic.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send("Error interno del servidor");
        }

        try {
            const sql = `
            SELECT Documento, Nombres, Apellidos
            FROM t_socio
            WHERE
            Documento = ? AND
            Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM t_socio) AND
            Estado_Empleado = 'Activo'`;

            connection.query(sql, [documento], (error, result) => {
                connection.release();

                if (error) {
                    return res.status(500).send("Error al obtener los datos");
                }

                if (result.length > 0) {
                    return res.status(200).send(result[0]);
                } else {
                    return res
                        .status(404)
                        .send({
                            message:
                                "No se encontró un usuario con el documento especificado",
                        });
                }
            });
        } catch (error) {
            connection.release();
            return res.status(500).send("Error en el servidor");
        }
    });
});

// End point para asignación individual / masiva
// Endpoint modificado
indicadoresG.get("/API/GET-ALL-CLIENTE/JERARQUIAS/", (req, res) => {
    poolJerarquiaGETALL.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error de conexión a la base de datos",
            });
        }

        const sql = `
        SELECT
            id_cliente,
            nombre_cliente,
            sector_cliente_id
        FROM
            tbl_cliente
        WHERE
            estado_cliente = 1
        `;

        connection.query(sql, (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Error en consulta SQL",
                });
            }

            res.status(200).json({
                success: true,
                data: results,
            });
        });
    });
});
indicadoresG.post("/API/GET-ALL-OPERACION/JERARQUIAS/", (req, res) => {
    const { cliente } = req.body;
    // console.log(cliente); { id: '2' }


    // Validar que se proporcione el cliente y su id
    if (!cliente || !cliente.id) {
        return res.status(400).json({
            success: false,
            message: "El cuerpo de la solicitud debe contener un cliente con un id."
        });
    }

    const clienteId = cliente.id;

    poolJerarquiaGETALL.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexión: ", err);
            return res.status(500).json({
                success: false,
                message: "Error de conexión a la base de datos.",
            });
        }

        const query = `
            SELECT 
                id_operacion, 
                nombre_operacion,
                cliente_id
            FROM
                tbl_operacion
            WHERE
                cliente_id = ? AND estado_operacion = 1`;

        connection.query(query, [clienteId], (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Error en consulta SQL",
                });
            }

            res.status(200).json({
                success: true,
                data: results,
            });
        });
    });
});
indicadoresG.post("/API/GET-ALL-SEGMENTO/JERARQUIAS/", (req, res) => {
    const { operacion } = req.body;

    //Validar que se proporcione la operacion
    if (!operacion || !operacion.id) {
        return res.status(400).json({
            success: false,
            message: "El cuerpo de la solicitud debe contener una operacion con un id."
        });
    }

    const operacionId = operacion.id;

    poolJerarquiaGETALL.getConnection((err, connection) => {
        if (err) {
            console.error('Error en la conexión: ', err);
            return res.status(500).json({
                success: false,
                message: "Error de conexión a la base de datos",
            });
        }

        const sql = `
            SELECT
                id_segmento,
                nombre_segmento,
                operacion_id 
            FROM
                tbl_segmento
            WHERE
                operacion_id = ? AND estado_segmento = 1`;

        connection.query(sql, [operacionId], (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Error en consulta SQL",
                });
            }

            res.status(200).json({
                success: true,
                data: results,
            });
        });
    });
});
indicadoresG.post("/API/GET-ALL-SERVICIO/JERARQUIAS/", (req, res) => {
    const { segmento } = req.body;

    // validar que se proporcione el segmento 
    if (!segmento || !segmento.id) {
        return res.status(400).json({
            success: false,
            message: "El cuerpo de la solicitud debe contener un segmento con su id."
        });
    }

    const segmentoId = segmento.id

    poolJerarquiaGETALL.getConnection((err, connection) => {
        if (err) {
            console.error('Error en la conexión: ', err);
            return res.status(500).json({
                success: false,
                message: "Error de conexión a la base de datos",
            });
        }

        const sql = `
        SELECT
            id_servicio,
            nombre_servicio,
            segmento_id
        FROM
            tbl_servicio
        WHERE 
            segmento_id = ? AND estado_servicio = 1`;

        connection.query(sql, [segmentoId], (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Error en consulta SQL",
                });
            }

            res.status(200).json({
                success: true,
                data: results,
            });
        });
    });
});
// Obtener colaboradores basado en filtro
indicadoresG.post("/API/GET-ALL-COLLABORATOR/JERARQUIAS/", async (req, res) => {
    const { operacion, servicio } = req.body;

    if (!operacion || !servicio) {
        return res.status(400).json({ success: false, message: 'Faltan campos operacion o servicio' });
    }

    const sql = `
    WITH UltimoRegistro AS (
        SELECT
            t1.cedula,
            t1.avaya,
            t1.nombre_completo,
            t1.estado,
            t1.servicio_,
            t1.servicio,
            t1.fecha_corte
        FROM
            BI.AMC_SOCIODEMOGRAFICO_LATAM t1
        INNER JOIN (
            SELECT
                cedula,
                MAX(fecha_corte) AS max_fecha
            FROM
                BI.AMC_SOCIODEMOGRAFICO_LATAM
            WHERE
                -- Se aplican los filtros de servicio
                servicio_ = ?
                AND servicio = ?
            GROUP BY
                cedula
        ) t2
            ON t1.cedula = t2.cedula
            AND t1.fecha_corte = t2.max_fecha
    )
    SELECT
        cedula,
        avaya,
        nombre_completo,
        estado,
        servicio_,
        servicio,
        fecha_corte
    FROM
        UltimoRegistro
    WHERE
        estado = 'Activo'
        AND servicio_ = ?
        AND servicio = ?;
    `;

    try {
        const [results] = await poolSocioKPI53
            .promise()
            .query(sql, [operacion, servicio, operacion, servicio]);

        return res.status(200).json({
            success: true,
            data: results,
        });
    } catch (err) {
        console.error('Error en BD:', err);
        return res.status(500).json({
            success: false,
            message: 'Error en consulta a la base de datos',
        });
    }
});
//Endpoint para obtener de forma masiva todos los kpis
indicadoresG.post("/API/GET-ALL-COLLABORATOR/MASSIVE-KPIS/", async (req, res, next) => {
    let connection;
    try {
        //Se extraen los parámetros del body
        const { items, servicio_id } = req.body;

        if (!Array.isArray(items) || !servicio_id) {
            return res
                .status(400)
                .json({ error: "Se requiere un arreglo de elementos con al menos un objeto o el servicio" });
        }

        // Obtener conexión del pool
        connection = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => {
                if (err) return reject(err);
                resolve(conn);
            });
        });

        // Helper para ejecutar queries
        const query = (sql, params = []) =>
            new Promise((resolve, reject) => {
                connection.query(sql, params, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

        const respuesta = [];

        for (const item of items) {
            const { usuarioRed, documento, nombre } = item;

            //Validación mínima
            if (!usuarioRed || !documento) {
                return res.status(400).json({
                    error:
                        "Cada item debe contener usuarioRed, documento"
                });
            }

            // Se prepara el objeto base
            const registro = {
                usuarioRed,
                documento,
                nombre,
                kpi_id: []
            };

            // 1) Se comprueba de la existencia de un registro
            const filasPersona = await query(
                `SELECT 
                    usuarioRed, documento, nombre, kpi_id
                FROM asignacion_kpi_persona
                WHERE 
                    usuarioRed = ?
                AND 
                    documento = ?
                `,
                [usuarioRed, documento]
            );

            if (filasPersona.length > 0) {
                // Se agrega cada registro encontrado
                filasPersona.forEach((f) => registro.kpi_id.push(f.kpi_id));
            } else {
                // 2) Si no hay asignaciones, se usa servicio_id
                // Consulta servicio_kpi
                const filasServicio = await query(
                    `SELECT
                        servicio_id, kpi_id
                    FROM 
                        servicio_kpi
                    WHERE servicio_id = ?`,
                    [servicio_id]
                );

                // Comprobar que el servicio tenga al menos un kpi relacionado
                if (filasServicio.length === 0) {
                    return res.status(400).json({
                        code: "NO_KPIS_FOR_SERVICE",
                        message: `No hay KPIs asociados al servicio ${servicio_id}`
                    });
                }

                // Filtrar solo los kpis con aplica_personas = 1
                const kpisValidos = [];
                for (const { kpi_id } of filasServicio) {
                    // Buscar en la tabla kpi
                    const filasKpi = await query(
                        `SELECT
                            aplica_personas + 0 AS aplica_personas
                        FROM kpi
                        WHERE id_kpi = ?`,
                        [kpi_id]
                    );

                    // Si el KPI no existe en la tabal kpi, error
                    if (filasKpi.length === 0) {
                        return res.status(500).json({
                            error: `El kpi_id ${kpi_id} no eiste en la tabla kpi`
                        });
                    }

                    // filasKpi[0].aplica_personas ya es un JS Number (0 o 1)
                    const aplica = filasKpi[0].aplica_personas;
                    // console.log(`Kpi_id=${kpi_id}, aplica_personas=${aplica}`);
                    // console.log(`Kpi_id=${kpi_id}, aplica_personas=${typeof aplica}`);

                    // Si aplica_personas = 1, lo agregamos
                    if (aplica === 1) {
                        kpisValidos.push(kpi_id);
                    }
                }

                // Si ninguno de los kpis relacionados aplica para personas, error
                if (kpisValidos.length === 0) {
                    return res.status(400).json({
                        code: "KPI_MEASURABLE_IN_PEOPLE",
                        message: "El servicio asociado no tiene un kpi medible en personas, debes relacionar uno medible para personas"
                    });
                }

                // se asgina el arreglo de kpis válidos
                registro.kpi_id = kpisValidos;
            }
            respuesta.push(registro)
        }
        return res.json({ data: respuesta });
    } catch (error) {
        console.error("Error en el endpoint Massive-kpis: ", error);
        return res.status(500).json({ error: "Error en la base de datos" });
    } finally {
        if (connection) connection.release();
    }
});
// EndPoint para cargar de forma masiva 
indicadoresG.post("/API/INSERT-UPDATE/ALL-COLABORATOR/", async (req, res, next) => {
    let connection;
    try {
        const { items, usuarioGestor } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Se requieren datos en esta operación" });
        }

        // Obtener conexión del pool
        connection = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => {
                if (err) return reject(err);
                resolve(conn);
            });
        });

        // Helper para ejecutar queries
        const query = (sql, params = []) =>
            new Promise((resolve, reject) => {
                connection.query(sql, params, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

        const results = [];

        for (const item of items) {
            const { usuarioRed, documento, nombre, kpi_id } = item;
            // Validación mínima
            if (!usuarioRed || !documento || !Array.isArray(kpi_id)) {
                results.push({ usuarioRed, documento, nombre, success: false, message: "Faltan usuarioRed, documento o KPI_id no es un arreglo" });
                continue;
            }

            // Caso especial: arreglo vacío => eliminar todas las relaciones
            if (kpi_id.length === 0) {
                // Obtener los kpi asociados antes de borrar
                const filasKpis = await query(
                    `SELECT kpi_id FROM asignacion_kpi_persona WHERE usuarioRed = ? AND documento = ?`,
                    [usuarioRed, documento]
                );

                if (filasKpis.length > 0) {
                    const toLogKpi = filasKpis[0].kpi_id; // Tomar el primer kpi_id existente
                    const deleteResult = await query(
                        `DELETE FROM asignacion_kpi_persona WHERE usuarioRed = ? AND documento = ?`,
                        [usuarioRed, documento]
                    );

                    // Insertar log
                    await query(
                        `INSERT INTO log_kpi (id_kpi, descripcion, usuario, accion) VALUES (?, ?, ?, ?)`,
                        [toLogKpi, 'operacion de cargue masivo', usuarioGestor, 'operacion']
                    );

                    results.push({
                        usuarioRed,
                        documento,
                        nombre,
                        success: true,
                        message: `Eliminadas ${deleteResult.affectedRows} relaciones de KPI existentes`,
                        deletedCount: deleteResult.affectedRows
                    });
                } else {
                    // No hay relaciones previas, no se inserta log
                    results.push({ usuarioRed, documento, nombre, success: true, message: "No había relaciones de KPI para eliminar", deletedCount: 0 });
                }

                continue;
            }

            // Verificar cada kpi
            const validKpis = [];
            const invalidKpis = [];
            for (const kpi of kpi_id) {
                const filasKpi = await query(
                    `SELECT aplica_personas + 0 AS aplica_personas FROM kpi WHERE id_kpi = ?`,
                    [kpi]
                );
                if (filasKpi.length === 0 || filasKpi[0].aplica_personas !== 1) {
                    invalidKpis.push(kpi);
                } else {
                    validKpis.push(kpi);
                }
            }

            if (validKpis.length === 0) {
                results.push({ usuarioRed, documento, nombre, success: false, message: `No hay KPIs válidos para insertar`, invalidKpis });
                continue;
            }

            // Eliminar asignaciones previas si existen
            await query(
                `DELETE FROM asignacion_kpi_persona WHERE usuarioRed = ? AND documento = ?`,
                [usuarioRed, documento]
            );

            // Insertar nuevas asignaciones
            for (const kpi of validKpis) {
                await query(
                    `INSERT INTO asignacion_kpi_persona (usuarioRed, documento, nombre, kpi_id) VALUES (?, ?, ?, ?)`,
                    [usuarioRed, documento, nombre, kpi]
                );
            }

            // Log: tomar primer kpi válido
            const logKpi = validKpis[0];
            await query(
                `INSERT INTO log_kpi (id_kpi, descripcion, usuario, accion) VALUES (?, ?, ?, ?)`,
                [logKpi, 'operacion de cargue masivo', usuarioGestor, 'operacion']
            );

            results.push({
                usuarioRed,
                documento,
                nombre,
                success: true,
                message: `Asignadas ${validKpis.length} KPIs correctamente`,
                insertedKpis: validKpis,
                invalidKpis: invalidKpis.length > 0 ? invalidKpis : undefined
            });
        }

        return res.json({ data: results });
    } catch (error) {
        console.log("Error en el endpoint INSERT UPDATE: ", error);
        return res.status(500).json({ error: "Error en la base de datos" });
    } finally {
        if (connection) connection.release();
    }
});
// EndPoint para obtener todos los KPIs asociados de forma individual
indicadoresG.post("/API/GET-ALL-KPIS-INDIVIDUAL/", async (req, res, next) => {
    let connection;
    try {
        // data que se debe recibir del front
        const { usuarioRed, documento } = req.body;
        if (!usuarioRed || !documento) {
            return res.status(400).json({ error: "Se requieren usuarioRed y documento" })
        }

        // Obtener la conexión del pool
        connection = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => {
                if (err) return reject(err);
                resolve(conn);
            });
        });

        // Helper para ejecutar queries
        const query = (sql, params = []) => new Promise((resolve, reject) => {
            connection.query(sql, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // consulta en tabla asignacion_kpi_persona filtrando por argumentos
        const asignaciones = await query(
            `SELECT 
                kpi_id
            FROM
                asignacion_kpi_persona
            WHERE
                usuarioRed = ?  AND documento = ?`,
            [usuarioRed, documento]
        );

        // Si no hay asignaciones o no hay kpi_id, retornar arreglo vacío
        if (!Array.isArray(asignaciones) || asignaciones.length === 0) {
            return res.json({ data: [] });
        }

        // Extraer todos los kpi_id de las filas
        const kpiIds = asignaciones.map(row => row.kpi_id);
        // si hay asignaciones se consulta el kpi correspondiente
        // Filtra duplicados
        const uniqueIds = [...new Set(kpiIds)];
        if (uniqueIds.length === 0) {
            return res.json({ data: [] });
        }

        // Construir placeholders y segunda consulta a la tabla kpi
        const placeholders = uniqueIds.map(() => '?').join(', ');

        // consulta a la tabla kpi usnado la columna de id_kpi
        const kpis = await query(
            `SELECT * FROM kpi WHERE id_kpi IN (${placeholders})`,
            uniqueIds
        );

        // Retorna los registros de kpi encontrados
        return res.json({ data: kpis });
    } catch (error) {
        console.error("Error en GET-ALL-KPIS-INDIVIDUAL: ", error);
        return res.status(500).json({ error: "Error en la base de datos" });
    } finally {
        if (connection) connection.release();
    }
});
// EndPoint para obtener todos los kpis de un servicio
indicadoresG.post("/API/GET-ALL-KPIS-SERVICIOS-INDIVIDUAL/", async (req, res, next) => {
    const { servicio } = req.body;

    //Validar que se reciba el nombre del servicio
    if (!servicio) {
        return res.status(400).json({ error: "Se requiere el nombre del servicio" });
    }

    try {
        // Obtener el servicio_id a partir del nombre del servicio
        const [servRows] = await poolJerarquiaGETALL.promise().query(
            `SELECT id_servicio FROM tbl_servicio WHERE nombre_servicio = ?`,
            [servicio]
        );

        if (!Array.isArray(servRows) || servRows.length === 0) {
            // Si no existe el servicio, devolvemos un array vacío o 404
            return res.status(200).json([]);
        }

        const servicio_id = servRows[0].id_servicio;

        // Obtener un arreglo de kpi_id para el servicio
        const [servicioKpiRows] = await poolKpi
            .promise()
            .query(
                `SELECT kpi_id FROM servicio_kpi WHERE servicio_id = ?`,
                [servicio_id]
            );

        if (!Array.isArray(servicioKpiRows) || servicioKpiRows.length === 0) {
            return res.status(200).json([]);
        }

        const kpiIds = servicioKpiRows.map((r) => r.kpi_id);

        // Construir placeholders para la consulta IN
        const placeholders = kpiIds.map(() => "?").join(", ");

        // Obtener los detalles de los KPIs
        const [kpiDetails] = await poolKpi
            .promise()
            .query(
                `SELECT 
                    * 
                FROM 
                    kpi 
                WHERE 
                    id_kpi IN (${placeholders})
                AND aplica_personas = 1`,
                kpiIds
            );

        return res.status(200).json(kpiDetails);
    } catch (error) {
        console.error("Error en el endpoint:", error);
        return next("Error interno del servidor");
    }
});
indicadoresG.post("/API/INSERT-UPDATE/SINGLE-COLLABORATOR/", async (req, res, next) => {
    const { data } = req.body;
    const {
        usuarioRed,
        documento,
        nombre_completo,
        kpiIds,
        razonEdicion,
        accionIndividual,
        usuarioGestor
    } = data;

    // Validación de campos
    if (!usuarioRed || !documento || !Array.isArray(kpiIds)) {
        return res.status(400).json({
            success: false,
            message: "Se requieren usuarioRed, documento y un arreglo de kpiIds"
        });
    }

    try {
        const connection = await poolKpi.promise().getConnection();
        try {
            await connection.beginTransaction();

            //Si kpiIds está vacío, obtén los kpis actuales para log de eliminación
            let logValues = [];
            if (kpiIds.length === 0) {
                const [currentRows] = await connection.query(
                    `SELECT kpi_id FROM asignacion_kpi_persona WHERE usuarioRed = ? AND documento = ?`,
                    [usuarioRed, documento]
                );
                logValues = currentRows.map(row => ([
                    row.kpi_id,
                    // `Usuario: ${usuarioRed}/${documento}, Acción: Eliminación de asociación`,
                    `Asignación individual -> Acción: Eliminación de relación, Al usuario de red: ${usuarioRed}`,
                    usuarioGestor,
                    'Eliminar KPI'
                ]));
            }

            //Borrar todas las asignaciones previas
            await connection.query(
                `DELETE FROM asignacion_kpi_persona WHERE usuarioRed = ? AND documento = ?`,
                [usuarioRed, documento]
            );

            //Si hay kpiIds nuevos, volver a asignar y preparar logs de asignación
            if (kpiIds.length > 0) {
                //Insertar asignaciones
                const assignValues = kpiIds.map(kpi_id => [
                    usuarioRed, documento, nombre_completo, kpi_id
                ]);
                await connection.query(
                    `INSERT INTO asignacion_kpi_persona 
              (usuarioRed, documento, nombre, kpi_id)
           VALUES ?`,
                    [assignValues]
                );

                //Preparar logs de asignación
                const asignLogs = kpiIds.map(kpi_id => ([
                    kpi_id,
                    `Asignación individual -> Acción: ${accionIndividual || 'Asignación'}, Motivo: ${razonEdicion || 'sin motivo'}, Al usuario de red: ${usuarioRed}`,
                    usuarioGestor,
                    accionIndividual || 'Asignar KPI'
                ]));
                logValues = logValues.concat(asignLogs);
            }

            //Insertar todos los logs
            if (logValues.length > 0) {
                await connection.query(
                    `INSERT INTO log_kpi 
             (id_kpi, descripcion, usuario, accion)
           VALUES ?`,
                    [logValues]
                );
            }

            //Commit y respuesta
            await connection.commit();
            return res.status(200).json({
                success: true,
                message: `Asignaciones procesadas: ${kpiIds.length} KPIs para ${usuarioRed}`
            });
        } catch (txErr) {
            await connection.rollback();
            console.error("Error en transacción:", txErr);
            return res.status(500).json({
                success: false,
                message: "Error en la transacción",
                error: txErr.message
            });
        } finally {
            connection.release();
        }
    } catch (connErr) {
        console.error("Error de conexión:", connErr);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: connErr.message
        });
    }
});

// **** Modulo de Metas ****
// Metas operativas
//-- Asignación masiva de KPIs ---
indicadoresG.post("/API/INSERT-UPDATE/RESULTADOS/", async (req, res, next) => {
    let connection;
    try {
        //Se extrae la fecha y el array de datos del body
        const { fecha, data, usuario } = req.body;

        //Validación básica de los parámetros
        if (!fecha || !data || !Array.isArray(data)) {
            return res
                .status(400)
                .json({ error: 'Parámetros inválidos: Se requiere "fecha" y "data"' });
        }
        connection = await poolKpi.promise().getConnection();// Se obtiene la transacción del pool        
        await connection.beginTransaction(); // Iniciar la transacción

        //Consulta SQL para inserción masiva con actualización en caso de llave duplicada.
        //la tabla tiene llave compuesta entre fecha, kpi_id
        const sqlUpsert = `
            INSERT INTO resultados_kpi (
                fecha,
                servicio_id,
                kpi_id, 
                obj_pto, 
                obj_wfm, 
                obj_cliente)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                obj_pto = VALUES(obj_pto),
                obj_wfm = VALUES(obj_wfm),
                obj_cliente = VALUES(obj_cliente)
        `;

        //Se itera por cada registro para capturar si fue inserción o actualización
        const logs = [];
        for (const r of data) {
            const params = [
                fecha,
                r.servicio_id,
                r.kpi_id,
                r.obj_pto,
                r.obj_wfm,
                r.obj_cliente,
            ];

            // Ejecutamos con connection, para que quede dentro de la transacción
            const [result] = await connection.query(sqlUpsert, params);

            // En mysql2, result.affectedRows === 1 indica inserción,
            // result.affectedRows === 2 (o result.changedRows > 0) indica actualización
            const accion = result.changedRows > 0
                ? "Actualización"
                : "Inserción";

            logs.push([
                r.kpi_id,
                `Metas operativas para ${fecha}`,
                usuario,
                accion
            ]);
        }

        // Se inserta el log en bloque
        if (logs.length) {
            const sqlLog = `
            INSERT INTO log_kpi (
                id_kpi,
                descripcion,
                usuario,
                accion
            ) VALUES ?`;
            await connection.query(sqlLog, [logs]);
        }

        // Commit y liberación
        await connection.commit();
        connection.release();

        return res.status(200).json({
            message: "Datos procesados correctamente y log guardado",
            registros: data.length,
        });
    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.log(`Error al cargar los datos o al registrar el log`, error);
        return res.status(500).json({
            error: "Error al procesar los datos",
            details: error.message,
        });
    }
});
//Endpoint para obtener de forma masiva todos los kpis
indicadoresG.post("/API/GET-ALL/METAS-OPERATIVAS/", async (req, res, next) => {
    const { fecha } = req.body;

    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return res
            .status(400)
            .json({ error: 'La fecha es requerida en el formato "YYYY-MM-DD".' });
    }

    let connKpi;
    let connJerq;
    try {
        // Obtener conexiones a ambos pools
        connKpi = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => err ? reject(err) : resolve(conn));
        });
        connJerq = await new Promise((resolve, reject) => {
            poolJerarquiaGETALL.getConnection((err, conn) => err ? reject(err) : resolve(conn));
        });

        // Obtener registros base de servicio_kpi + LEFT JOIN resultados_kpi
        const sqlBase = `
            SELECT
                sk.servicio_id, sk.kpi_id, ? AS fecha,
                r.obj_pto, r.obj_wfm, r.obj_cliente
            FROM servicio_kpi sk
            LEFT JOIN resultados_kpi r
                ON sk.servicio_id = r.servicio_id
                AND sk.kpi_id = r.kpi_id
                AND r.fecha = ?
            WHERE r.fecha = ? OR r.fecha IS NULL
            ORDER BY sk.kpi_id ASC;`

        // Ejecutar consulta con los parámetros de fecha
        const baseRows = await new Promise((resolve, reject) => {
            connKpi.query(sqlBase, [fecha, fecha, fecha], (err, results) => err ? reject(err) : resolve(results));
        });

        // Si no hay relaciones en servicio_kpi, o no existen registros, se lanza un error
        if (!baseRows.length) {
            return res
                .status(404)
                .json({ error: 'No se encontraron registros de KPI para la fecha proporcionada.' });
        }

        // Obtener nombre de servicio desde poolJerarquiaGetAll
        const servicioIds = [...new Set(baseRows.map(r => r.servicio_id))];
        const placeholdersSvc = servicioIds.map(() => '?').join(',');
        const sqlSvc = `
            SELECT
                id_servicio AS servicio_id, nombre_servicio
            FROM
                tbl_servicio
            WHERE
                id_servicio IN (${placeholdersSvc});`;
        const svcNames = await new Promise((resolve, reject) => {
            connJerq.query(sqlSvc, servicioIds, (err, results) => err ? reject(err) : resolve(results));
        });
        const svcMap = Object.fromEntries(svcNames.map(s => [s.servicio_id, s.nombre_servicio]));

        // Obtener nombres de KPI desde poolKpi
        const kpiIds = [...new Set(baseRows.map(r => r.kpi_id))];
        const placeholders = kpiIds.map(() => '?').join(',');
        const sqlKpi = `
            SELECT 
                id_kpi AS kpi_id, nombre_kpi
            FROM 
                kpi
            WHERE
                id_kpi IN (${placeholders});`;
        const kpiNames = await new Promise((resolve, reject) => {
            connKpi.query(sqlKpi, kpiIds, (err, results) => err ? reject(err) : resolve(results));
        });
        const kpiMap = Object.fromEntries(kpiNames.map(k => [k.kpi_id, k.nombre_kpi]));

        // Construir objetos de respuesta
        const data = baseRows.map(r => ({
            servicio_id: r.servicio_id,
            nombre_servicio: svcMap[r.servicio_id] || null,
            kpi_id: r.kpi_id,
            nombre_kpi: kpiMap[r.kpi_id] || null,
            obj_pto: r.obj_pto !== null ? r.obj_pto : null,
            obj_wfm: r.obj_wfm !== null ? r.obj_wfm : null,
            obj_cliente: r.obj_cliente !== null ? r.obj_cliente : null,
        }));

        // Enviar respuesta con fecha y datos
        res.json({ fecha, data });
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ error: "Error en la base de datos" });
    } finally {
        //Se libera la conexión siempre
        if (connKpi) connKpi.release();
        if (connJerq) connJerq.release();
    }
});

// *** Modulo de Resultados ***
// Resultados Operativos
// Endpoint para obtener Resultados Operativos
indicadoresG.post("/API/GET-ALL/RESULTADOS-OPERATIVAS/", async (req, res, next) => {
    const { mesActual } = req.body;

    if (!mesActual || !/^\d{4}-\d{2}-\d{2}$/.test(mesActual)) {
        return res.status(400).json({ error: 'Formato "YYYY-MM-DD" requerido.' });
    }

    let connKpi, connJerq;
    try {
        connKpi = await new Promise((r, x) =>
            poolKpi.getConnection((err, conn) => err ? x(err) : r(conn))
        );
        connJerq = await new Promise((r, x) =>
            poolJerarquiaGETALL.getConnection((err, conn) => err ? x(err) : r(conn))
        );

        // Consultar resultados con promesas
        const [resultados] = await connKpi
            .promise()
            .query(`
                SELECT
                    fecha, servicio_id, kpi_id, resultado
                FROM 
                    resultados_kpi
                WHERE fecha = ?;`, [mesActual]
            );

        if (!resultados.length) {
            return res.status(404)
                .json({ error: 'No se encontraron resultados.' });
        }

        // 2) Traer nombres de servicios
        const servicioIds = [...new Set(resultados.map(r => r.servicio_id))];
        const placeholdersSvc = servicioIds.map(() => '?').join(',');
        const [svcNames] = await connJerq
            .promise()
            .query(
                `SELECT id_servicio AS servicio_id, nombre_servicio
         FROM tbl_servicio
         WHERE id_servicio IN (${placeholdersSvc});`,
                servicioIds
            );
        const svcMap = Object.fromEntries(
            svcNames.map(s => [s.servicio_id, s.nombre_servicio])
        );

        // 3) Traer nombres de KPI
        const kpiIds = [...new Set(resultados.map(r => r.kpi_id))];
        const placeholdersKpi = kpiIds.map(() => '?').join(',');
        const [kpiNames] = await connKpi
            .promise()
            .query(
                `SELECT id_kpi AS kpi_id, nombre_kpi
         FROM kpi
         WHERE id_kpi IN (${placeholdersKpi});`,
                kpiIds
            );
        const kpiMap = Object.fromEntries(
            kpiNames.map(k => [k.kpi_id, k.nombre_kpi])
        );

        // 4) Construir respuesta
        const data = resultados.map(r => ({
            servicio_id: r.servicio_id,
            nombre_servicio: svcMap[r.servicio_id] || null,
            kpi_id: r.kpi_id,
            nombre_kpi: kpiMap[r.kpi_id] || null,
            resultado: r.resultado
        }));

        res.json({ data });
    } catch (error) {
        console.error("Error BD:", error);
        res.status(500).json({ error: "Error interno de servidor." });
    } finally {
        if (connKpi) connKpi.release();
        if (connJerq) connJerq.release();
    }
});
// EndPoint para cargue masivo Resultados Operativos
indicadoresG.post("/API/INSERT-UPDATE/Resultados-Operativos/", async (req, res, next) => {
    let rawConn, connection;
    try {
        const { fecha, data, usuario } = req.body;
        console.log("Payload recibido:", req.body);

        // Validación básica
        if (!fecha || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({
                error: 'Parámetros inválidos: se requiere "fecha" y un array "data" no vacío.'
            });
        }

        // Obtener la conexión callback y envolverla en promesa
        rawConn = await new Promise((resolve, reject) => {
            poolKpi.getConnection((err, conn) => {
                if (err) return reject(err);
                resolve(conn);
            });
        });

        //“Promisificar” la conexión
        connection = rawConn.promise();

        //Iniciar transacción
        await connection.beginTransaction();

        //SQL para upsert de valores numericos
        const sqlUpsert = `
        INSERT INTO resultados_kpi (
            fecha, servicio_id, kpi_id, resultado
        ) VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            resultado = VALUES(resultado);`;

        // SQL para "borrar" (poner null) en resultado 
        const sqlNullify = `
            UPDATE resultados_kpi
            SET resultado = NULL
            WHERE fecha = ? AND servicio_id = ? AND kpi_id = ?;`;

        const logs = [];

        for (const { servicio_id, kpi_id, resultado } of data) {
            // Validaciones por fila
            if (
                typeof servicio_id !== 'number' ||
                typeof kpi_id !== 'number'
            ) {
                throw new Error(`IDs inválids: ${JSON.stringify({ servicio_id, kpi_id })}`);
            }

            if (resultado === null) {
                // "Borrar" valor existente
                const [info] = await connection.query(sqlNullify, [fecha, servicio_id, kpi_id]);

                if (info.affectedRows > 0) {
                    logs.push([
                        kpi_id,
                        `Se eliminó resultado para ${fecha}, servicio ${servicio_id}`,
                        usuario || null,
                        'Borrado'
                    ]);
                }
                // Si no habia fila previa, se omite sin errores ni log
            } else {
                // Resultado es numérico: upsert
                if (typeof resultado !== 'number') {
                    throw new Error(`Resultado inválido en ${JSON.stringify({ servicio_id, kpi_id, resultado })}`);
                }

                // 5) Ejecutar upsert
                const [info] = await connection.query(sqlUpsert, [
                    fecha, servicio_id, kpi_id, resultado
                ]);

                const accion = info.affectedRows === 1 ? 'Inserción' : 'Actualización';
                logs.push([
                    kpi_id,
                    `Resultado operativo para fecha ${fecha}, servicio ${servicio_id}`,
                    usuario || null,
                    accion
                ]);
            }
        }

        // Insertar logs en bloque si los hay
        if (logs.length) {
            const sqlLog = `
                INSERT INTO log_kpi (
                  id_kpi, descripcion, usuario, accion
                ) VALUES ?`;
            await connection.query(sqlLog, [logs]);
        }

        // Commit y liberar
        await connection.commit();
        rawConn.release();

        return res.status(200).json({
            message: "Operación completa y log guardado",
            registrosProcesados: data.length,
            logsRegistrados: logs.length
        });

    } catch (err) {
        // Rollback y release en caso de error
        if (connection) {
            await connection.rollback();
        }
        if (rawConn) {
            rawConn.release();
        }
        console.error("Error procesando resultados operativos:", err);
        return res.status(500).json({
            error: "Error al procesar los datos",
            details: err.message
        });
    }
});

module.exports = indicadoresG;
