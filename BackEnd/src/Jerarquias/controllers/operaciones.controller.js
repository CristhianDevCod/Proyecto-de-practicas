import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getOperaciones = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_operaciones ORDER BY id_operaciones ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener todas las operaciones jerarquías:', error);
    res.status(500).json({ message: "Error al obtener todas las operaciones jerarquías" });
  } finally {
    connection.release();
  }
};

//FUNCIÓN PARA MOSTRAR TODAS LAS OPERACIONES QUE ESTÉN COMPLETAS O NO Y EN ESTADO ACTIVO
export const getOperacionesTotals = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`
      SELECT 
        cli.id_cliente, 
        cli.nombre_cliente,
        ope.id_operacion, 
        ope.nombre_operacion,  
        seg.id_segmento, 
        seg.nombre_segmento, 
        serv.id_servicio, 
        serv.nombre_servicio,
        GROUP_CONCAT(DISTINCT mob.id_objeto) AS ids_objetos, 
        GROUP_CONCAT(DISTINCT mob.nombre_objeto) AS nombres_objetos,
        GROUP_CONCAT(DISTINCT bou.id_base) AS ids_bases,
        GROUP_CONCAT(DISTINCT bou.nombre_base) AS nombres_bases
    FROM 
        tbl_cliente AS cli
        LEFT JOIN tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id AND ope.estado_operacion = 1
        LEFT JOIN tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion AND seg.estado_segmento = 1
        LEFT JOIN tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento AND serv.estado_servicio = 1
        LEFT JOIN tbl_maestra_ob AS mob ON mob.servicio_id = serv.id_servicio AND mob.estado_skill = 1
        LEFT JOIN tbl_bases_outbound AS bou ON bou.servicio_id = serv.id_servicio
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
        cli.id_cliente DESC;
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener todas las operaciones jerarquías:', error);
    res.status(500).json({ message: "Error al obtener todas las operaciones jerarquías" });
  } finally {
    connection.release();
  }
};

export const getOperacionByIdCliente = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  const idOper = parseInt(req.params.idOper);
  const idServ = parseInt(req.params.idServicio);
  try {
    const [rows] = await connection.query(`
      SELECT 
          cli.id_cliente, 
          cli.nombre_cliente,
          cli.estado_cliente,
          cli.sector_cliente_id,
          secc.nombre_sector_cliente,
          ope.id_operacion, 
          ope.nombre_operacion,
          ope.estado_operacion,
          seg.id_segmento,
          seg.nombre_segmento,
          seg.estado_segmento,
          serv.id_servicio, 
          serv.nombre_servicio,
          pa.id_pais,
          pa.nombre_pais,
          de.id_depto_estado,
          de.nombre_depto_estado,
          ciu.id_ciudad,
          ciu.nombre_ciudad,
          ciu.zona_horaria,
          sed.id_sede,
          sed.nombre_sede,
          tserv.id_tipo_servicio,
          tserv.nombre_tipo_servicio,
          serv.gen_recargo_noc,
          serv.gen_recargo_dom_fest,
          serv.estado_servicio,
          GROUP_CONCAT(mob.id_objeto) AS ids_objetos, 
          GROUP_CONCAT(mob.nombre_objeto) AS nombres_objetos,
          GROUP_CONCAT(serv.canal_atencion_id) AS id_canales_antencion,
          GROUP_CONCAT(cana.nombre_canal_atencion) AS nombres_canales_atencion,
          GROUP_CONCAT(mob.fecha_inicio) AS fechas_inicio,
          GROUP_CONCAT(mob.sist_gestion_id) AS ids_sistemas_gestion,
          GROUP_CONCAT(sistg.nombre_sist_gestion) AS nombres_sistemas_gestion,
          GROUP_CONCAT(mob.estado_skill) AS estados_objetos,
          GROUP_CONCAT(bou.id_base) AS ids_bases
      FROM 
          tbl_cliente AS cli
          LEFT JOIN tbl_sector_cliente AS secc ON cli.sector_cliente_id = secc.id_sector_cliente
          LEFT JOIN tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id 
          LEFT JOIN tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion 
          LEFT JOIN tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento 
          LEFT JOIN tbl_pais AS pa ON serv.pais_id = pa.id_pais 
          LEFT JOIN tbl_depto_estado AS de ON serv.depto_id = de.id_depto_estado 
          LEFT JOIN tbl_ciudad AS ciu ON serv.ciudad_id = ciu.id_ciudad 
          LEFT JOIN tbl_sede AS sed ON serv.sede_id = sed.id_sede
          LEFT JOIN tbl_tipo_servicio AS tserv ON serv.tipo_servicio_id = tserv.id_tipo_servicio
          LEFT JOIN tbl_maestra_ob AS mob ON mob.servicio_id = serv.id_servicio
          LEFT JOIN tbl_canal_atencion AS cana ON cana.id_canal_atencion = serv.canal_atencion_id
          LEFT JOIN tbl_sist_de_gestion AS sistg ON sistg.id_sist_gestion = mob.sist_gestion_id
          LEFT JOIN tbl_bases_outbound AS bou ON bou.servicio_id = serv.id_servicio
      WHERE 
          cli.id_cliente = ?
      AND 
        ope.id_operacion = ?
      AND
        serv.id_servicio =?
      GROUP BY 
          cli.id_cliente, 
          cli.nombre_cliente,
          ope.id_operacion, 
          ope.nombre_operacion, 
          seg.id_segmento, 
          seg.nombre_segmento, 
          serv.id_servicio, 
          serv.nombre_servicio;
    `, [id, idOper, idServ]);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la operación jerarquía en específico:', error);
    res.status(500).json({ message: "Error al obtener la operación jerarquía en específico" });
  } finally {
    connection.release();
  }
};

export const getOperacionByIdClienteSelected = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query(`
      SELECT 
          cli.id_cliente, 
          cli.nombre_cliente,
          ope.id_operacion, 
          ope.nombre_operacion, 
          seg.id_segmento, 
          seg.nombre_segmento,
          serv.id_servicio,
          serv.nombre_servicio,
          mob.id_objeto,
          mob.nombre_objeto,
          mob.fecha_inicio,
          cana.id_canal_atencion,
          cana.nombre_canal_atencion,
          sistg.nombre_sist_gestion,
          pa.nombre_pais,
          de.nombre_depto_estado,
          ciu.nombre_ciudad,
          ciu.zona_horaria,
          sed.nombre_sede,
          tserv.nombre_tipo_servicio,
          serv.gen_recargo_noc,
          serv.gen_recargo_dom_fest,
          bou.id_base,
          bou.nombre_base,
          bou.fecha_recibido
      FROM 
          tbl_cliente AS cli
          LEFT JOIN tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id AND ope.estado_operacion = 1
          LEFT JOIN tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion AND seg.estado_segmento = 1
          LEFT JOIN tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento AND serv.estado_servicio = 1
          LEFT JOIN tbl_maestra_ob AS mob ON mob.servicio_id = serv.id_servicio AND mob.estado_skill = 1
          LEFT JOIN tbl_pais AS pa ON serv.pais_id = pa.id_pais
          LEFT JOIN tbl_depto_estado AS de ON serv.depto_id = de.id_depto_estado
          LEFT JOIN tbl_ciudad AS ciu ON serv.ciudad_id = ciu.id_ciudad
          LEFT JOIN tbl_sede AS sed ON serv.sede_id = sed.id_sede
          LEFT JOIN tbl_tipo_servicio AS tserv ON serv.tipo_servicio_id = tserv.id_tipo_servicio
          LEFT JOIN tbl_canal_atencion AS cana ON cana.id_canal_atencion = serv.canal_atencion_id
          LEFT JOIN tbl_sist_de_gestion AS sistg ON sistg.id_sist_gestion = mob.sist_gestion_id
          LEFT JOIN tbl_bases_outbound AS bou ON bou.servicio_id = serv.id_servicio
      WHERE 
          cli.id_cliente = ?
      ORDER BY 
          ope.id_operacion, 
          seg.id_segmento, 
          serv.id_servicio, 
          mob.id_objeto,
          bou.id_base;
    `, [id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las operaciones del cliente en específico:', error);
    res.status(500).json({ message: "Error al obtener las operaciones del cliente en específico:" });
  } finally {
    connection.release();
  }
};

export const getOperacionByIdClienteSelectedNew = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query(`
      SELECT 
          cli.id_cliente, 
          cli.nombre_cliente,
          ope.id_operacion, 
          ope.nombre_operacion, 
          seg.id_segmento, 
          seg.nombre_segmento,
          serv.id_servicio,
          serv.nombre_servicio,
          mob.id_objeto,
          mob.nombre_objeto,
          mob.fecha_inicio,
          cana.id_canal_atencion,
          cana.nombre_canal_atencion,
          sistg.nombre_sist_gestion,
          pa.nombre_pais,
          de.nombre_depto_estado,
          ciu.nombre_ciudad,
          ciu.zona_horaria,
          sed.nombre_sede,
          tserv.nombre_tipo_servicio,
          serv.gen_recargo_noc,
          serv.gen_recargo_dom_fest,
          bou.id_base,
          bou.nombre_base,
          bou.fecha_recibido
      FROM 
          tbl_cliente AS cli
          LEFT JOIN tbl_operacion AS ope ON cli.id_cliente = ope.cliente_id
          LEFT JOIN tbl_segmento AS seg ON seg.operacion_id = ope.id_operacion
          LEFT JOIN tbl_servicio AS serv ON serv.segmento_id = seg.id_segmento
          LEFT JOIN tbl_maestra_ob AS mob ON mob.servicio_id = serv.id_servicio
          LEFT JOIN tbl_pais AS pa ON serv.pais_id = pa.id_pais
          LEFT JOIN tbl_depto_estado AS de ON serv.depto_id = de.id_depto_estado 
          LEFT JOIN tbl_ciudad AS ciu ON serv.ciudad_id = ciu.id_ciudad 
          LEFT JOIN tbl_sede AS sed ON serv.sede_id = sed.id_sede
          LEFT JOIN tbl_tipo_servicio AS tserv ON serv.tipo_servicio_id = tserv.id_tipo_servicio
          LEFT JOIN tbl_canal_atencion AS cana ON cana.id_canal_atencion = serv.canal_atencion_id
          LEFT JOIN tbl_sist_de_gestion AS sistg ON sistg.id_sist_gestion = mob.sist_gestion_id
          LEFT JOIN tbl_bases_outbound AS bou ON bou.servicio_id = serv.id_servicio
      WHERE 
          cli.id_cliente = ?
      ORDER BY 
          ope.id_operacion, 
          seg.id_segmento, 
          serv.id_servicio, 
          mob.id_objeto,
          bou.id_base;
    `, [id]);

    // Agregar encabezados para deshabilitar la caché
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las operaciones del cliente en específico:', error);
    res.status(500).json({ message: "Error al obtener las operaciones del cliente en específico:" });
  } finally {
    connection.release();
  }
};

export const getOperacionesById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_operaciones WHERE id_operaciones = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la operación jerarquía en específico:', error);
    res.status(500).json({ message: "Error al obtener la operación jerarquía en específico" });
  } finally {
    connection.release();
  }
};

export const createOperaciones = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { jerarquiaID, servicioId, estadoOperaciones } = req.body;

    await connection.query(
      "INSERT INTO tbl_operacion (jerarquia_id, servicio_id, estado_operaciones) VALUES (?, ?, ?)",
      [jerarquiaID, servicioId, estadoOperaciones]
    );

    res.status(201).json({ message: "Operación jerarquía creada exitosamente" });
  } catch (error) {
    console.error('Error al crear la operación jerarquía:', error);
    return res.status(500).json({ message: "Error al crear la operación jerarquía" });
  } finally {
    connection.release();
  }
};

export const updateOperaciones = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { jerarquiaID, servicioId, estadoOperaciones } = req.body;

    await connection.query(
      "UPDATE tbl_operaciones SET jerarquia_id = ?, servicio_id = ?, estado_operaciones = ? WHERE id_operacion = ?",
      [jerarquiaID, servicioId, estadoOperaciones, id]
    );

    res.status(200).json({ message: "Operación jerarquía actualizada exitosamente" });
  } catch (error) {
    console.error('Error al actualizar la operación jerarquía:', error);
    return res.status(500).json({ message: "Error al actualizar la operación jerarquía" });
  } finally {
    connection.release();
  }
};

export const deleteOperaciones = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoOperaciones } = req.body;

    await connection.query(
      "UPDATE tbl_operaciones SET estado_operaciones = ? WHERE id_operaciones = ?",
      [estadoOperaciones, id]
    );

    res.status(200).json({ message: "Operación jerarquía bloqueada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al bloquear la operación jerarquía:', error);
    return res.status(500).json({ message: "Error al bloquear la operación jerarquía", resp: 0 });
  } finally {
    connection.release();
  }
};
