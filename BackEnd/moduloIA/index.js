const {
  generateResponse,
  generateStreamResponse,
  createSystemPrompt,
} = require("./openRouterClient");
const { processMessageStream } = require("./groqCloud");
const express = require("express");
const cors = require("cors");

const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pruebas_kpi",
});

// Verificar la conexión a la base de datos
db.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
    return;
  }
  console.log("Conexión a la base de datos exitosa.");
});

// EndPoint para obtener todos los registros de plan de acción SNC
app.get("/GET-ALL/ANALISIS-PLAN-ACCION/", (req, res) => {
  const query = `
    SELECT
        p.estado_id,
        p.id_plan_accion AS id,
        k.nombre_kpi,
        CASE 
            WHEN p.estado_id = 1 THEN k.responsable_upd 
            ELSE p.persona_asignada_uRed 
        END AS responsable,
        p.fecha_plazo_maximo,
        p.cantidad_fallo,
        p.fecha_hallazgo
    FROM tbl_plan_accion_snc AS p
    LEFT JOIN kpi AS k
        ON k.id_kpi = p.kpi_id
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res
        .status(500)
        .json({ message: "Error al obtener los registros." });
    }

    // Mapear los resultados agregando las propiedades adicionales
    const mappedResults = results.map((row) => {
      return {
        cantidad_fallo: row.cantidad_fallo,
        estado_id: row.estado_id,
        id: row.id,
        nombre_kpi: row.nombre_kpi,
        responsable: row.responsable,
        fecha_plazo_maximo: row.fecha_plazo_maximo,
        fecha_hallazgo: row.fecha_hallazgo,
      };
    });

    res.json(mappedResults);
  });
});

// Endpoint consultarData para generarPlan de acción
app.post("/API/GET-DATA-KPI-PLANACCION/", (req, res) => {
  const { id_plan_accion } = req.body;

  if (!id_plan_accion) {
    return res.status(400).json({
      error: "Es necesario el id del plan de acción",
    });
  }

  // buscar el id del kpi
  const sql = `
      SELECT kpi_id
      FROM tbl_plan_accion_snc
      WHERE id_plan_accion = ?
      LIMIT 1`;

  db.query(sql, [id_plan_accion], (err1, results1) => {
    if (err1) {
      console.error("Error al consultar la tabla: ", err1);
      return res.status(500).json({
        error: "Error interno al buscar el KPI asociado",
      });
    }

    if (!results1 || results1.length === 0) {
      return res.status(404).json({
        error: "No se encotró ningun registro",
      });
    }

    const kpiId = results1[0].kpi_id;

    const sql2 = `
        SELECT
          nombre_kpi,
          descripcion_kpi,
          formula_medicion,
          proceso_kpi_id,
          tipo_kpi_id,
          meta_kpi,
          CAST(tipo_calculo AS UNSIGNED) AS tipo_calculo_int,
          CAST(aplica_personas AS UNSIGNED) AS aplica_personas_int,
          clasificacion_id
        FROM kpi
        WHERE id_kpi = ?
        LIMIT 1`;

    db.query(sql2, [kpiId], (err2, results2) => {
      if (err2) {
        console.error("Error al consultar tabla kpi ", err2);
        return res.status(500).json({
          error: "Error interno al obtener los datos del KPI",
        });
      }

      if (!results2 || results2.length === 0) {
        return res.status(404).json({
          error: "No se encontró ningún registro en kpi",
        });
      }

      const row = results2[0];
      return res.json({
        success: true,
        data: row,
      });
    });
  });
});

// Endpoint original (sin streaming)
app.post("/API/GENERATE/", async (req, res) => {
  const { messages, tipo = "general", systemPrompt } = req.body;

  try {
    // Usar sistem prompt personalizado o crear uno según el tipo
    const finalSystemPrompt = systemPrompt || createSystemPrompt(tipo);
    const response = await generateResponse(messages, finalSystemPrompt);
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint con streaming
app.post("/API/GENERATE/STREAM/", async (req, res) => {
  const { messages, tipo = "plan_accion", systemPrompt } = req.body;

  try {
    // Configurar headers para server-sent events
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "Cache-Control",
    });

    let fullResponse = "";

    // Función callback para cada chunk
    const onChunk = (chunk) => {
      fullResponse += chunk;
      // Enviar chunk al cliente
      res.write(`data: ${JSON.stringify({ chunk, fullResponse })}\n\n`);
    };

    // Usar system prompt personalizado o crear uno según el tipo
    const finalSystemPrompt = systemPrompt || createSystemPrompt(tipo);

    // Generar respuesta con streaming
    await generateStreamResponse(messages, onChunk, finalSystemPrompt);

    // Enviar mesaje final
    res.write(`data: ${JSON.stringify({ done: true, fullResponse })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

// Endpoint de croq con streaming
app.post("/API/PLAN-ACCION-GROQ/", async (req, res) => {
  try {
    const { behavior, message } = req.body;

    if (!behavior || !message) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere los campos de "behavior" y "message"',
      });
    }

    let result = await processMessageStream(behavior, message);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/API/GET-SNC-FILTER/", (req, res) => {
  const { id } = req.body;

  // Validación del ID
  if (!id || typeof id !== "number") {
    return res.status(400).json({ error: "Id válido es requerido" });
  }

  const query = `SELECT * FROM tbl_plan_accion_snc WHERE id_plan_accion = ?`;

  // Consulta a la base de datos
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los registros.",
        error: err.message,
      });
    }

    // Verificación de resultados
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron registros para el ID proporcionado.",
      });
    }

    // Respuesta exitosa
    res.json({ success: true, data: results });
  });
});

// Endpoint para crear un plan de acción o actualizar el existente
app.post("/API/CREARUPDATE/PLANACCION/", async (req, res) => {
  const { idPlanAccion, accionInmediata, responsable, fechaLimite } = req.body;

  // Validación de campos
  if (!idPlanAccion || !accionInmediata || !responsable || !fechaLimite) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = `
    INSERT INTO tbl_plan_accion_snc (
      id_plan_accion,
      accion_inmediata,
      persona_asignada_uRed,
      fecha_plazo_maximo
    ) VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      accion_inmediata       = VALUES(accion_inmediata),
      persona_asignada_uRed   = VALUES(persona_asignada_uRed),
      fecha_plazo_maximo      = VALUES(fecha_plazo_maximo);
  `;

  const params = [idPlanAccion, accionInmediata, responsable, fechaLimite];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta: ", err);
      return res
        .status(500)
        .json({ message: "Error al insertar/actualizar el registro." });
    }

    if (results.affectedRows === 1) {
      return res
        .status(201)
        .json({ message: "Registro insertado correctamente." });
    } else {
      return res
        .status(200)
        .json({ message: "Registro actualizado correctamente." });
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
