import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getDeptoEstados = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT id_depto_estado, nombre_depto_estado, estado_depto_estado, pais_id, p.nombre_pais FROM tbl_depto_estado AS de JOIN tbl_pais AS p WHERE de.pais_id = p.id_pais ORDER BY id_depto_estado ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    res.status(500).json({ message: "Error al obtener los estados" });
  } finally {
    connection.release();
  }
};

export const getDeptoEstadosActivos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT id_depto_estado, nombre_depto_estado, estado_depto_estado, pais_id, p.nombre_pais FROM tbl_depto_estado AS de JOIN tbl_pais AS p WHERE de.pais_id = p.id_pais AND estado_depto_estado = 1 ORDER BY id_depto_estado ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    res.status(500).json({ message: "Error al obtener los estados" });
  } finally {
    connection.release();
  }
};

export const getDeptoEstadosActivosPaises = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_depto_estado WHERE pais_id = ? AND estado_depto_estado = 1 ORDER BY id_depto_estado ASC", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    res.status(500).json({ message: "Error al obtener los estados" });
  } finally {
    connection.release();
  }
};

export const getDeptoEstadoById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_depto_estado WHERE id_depto_estado = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el estado o departamento específico:', error);
    res.status(500).json({ message: "Error al obtener el estado o departamento" });
  } finally {
    connection.release();
  }
};

export const getDeptoEstadoByIdNombrePais = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT id_depto_estado, nombre_depto_estado, estado_depto_estado, pais_id, p.nombre_pais FROM tbl_depto_estado AS de JOIN tbl_pais AS p WHERE de.pais_id = p.id_pais AND id_depto_estado = ? ORDER BY id_depto_estado ASC", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el estado o departamento específico:', error);
    res.status(500).json({ message: "Error al obtener el estado o departamento" });
  } finally {
    connection.release();
  }
};

export const createDeptoEstado = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreDeptoEstado, paisId, estadoDeptoEstado } = req.body;

    const [existingDeptoEstado] = await connection.query(
      "SELECT * FROM tbl_depto_estado WHERE nombre_depto_estado = ?",
      [nombreDeptoEstado]
    );

    if (existingDeptoEstado.length > 0) {
      return res.status(200).json({ message: 'Ya existe un servicio con el nombre indicado', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_depto_estado (nombre_depto_estado, pais_id, estado_depto_estado) VALUES (?, ?, ?)",
      [nombreDeptoEstado, paisId, estadoDeptoEstado]
    );
    
    res.status(201).json({ message: "Estado o departamento creado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el estado o departamento:', error);
    return res.status(500).json({ message: "Error al crear el estado o departamento", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateDeptoEstado = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreDeptoEstado, paisId, estadoDeptoEstado } = req.body;

    await connection.query(
      "UPDATE tbl_depto_estado SET nombre_depto_estado = ?, pais_id = ?, estado_depto_estado= ? WHERE id_depto_estado = ?",
      [nombreDeptoEstado, paisId, estadoDeptoEstado, id]
    );

    res.status(200).json({ message: "Estado o departamento actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el estado o departamento:', error);
    return res.status(500).json({ message: "Error al actualizar el estado o departamento", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteDeptoEstado = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoDeptoEstado } = req.body;

    await connection.query(
      "UPDATE tbl_depto_estado SET estado_depto_estado = ? WHERE id_depto_estado = ?",
      [estadoDeptoEstado, id]
    );

    res.status(200).json({ message: "Estado o departamento bloqueado exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el estado o departamento:', error);
    return res.status(500).json({ message: "Error al bloquear el estado o departamento" });
  } finally {
    connection.release();
  }
};
