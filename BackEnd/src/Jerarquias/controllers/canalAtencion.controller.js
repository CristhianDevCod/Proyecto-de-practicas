import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getCanalesAtencion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_canal_atencion ORDER BY id_canal_atencion ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los canales de atención:', error);
    res.status(500).json({ message: "Error al obtener los canales de atención" });
  } finally {
    connection.release();
  }
};

export const getCanalesAtencionActivos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_canal_atencion WHERE estado_canal_atencion = 1 ORDER BY id_canal_atencion ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los canales de atención:', error);
    res.status(500).json({ message: "Error al obtener los canales de atención" });
  } finally {
    connection.release();
  }
};

export const getCanalAtencionById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_canal_atencion WHERE id_canal_atencion = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el canal de atención específico:', error);
    res.status(500).json({ message: "Error al obtener el canal de atención específico" });
  } finally {
    connection.release();
  }
};

export const createCanalAtencion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreCanalAtencion, estadoCanalAtencion } = req.body;

    const [existingCanalAt] = await connection.query(
      "SELECT * FROM tbl_canal_atencion WHERE nombre_canal_atencion = ?",
      [nombreCanalAtencion]
    );

    if (existingCanalAt.length > 0) {
      return res.status(200).json({ message: 'Ya existe un servicio con el nombre indicado', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_canal_atencion (nombre_canal_atencion, estado_canal_atencion) VALUES (?, ?)",
      [nombreCanalAtencion, estadoCanalAtencion]
    );

    res.status(201).json({ message: "Canal de atención creado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el canal de atención:', error);
    return res.status(500).json({ message: "Error al crear el canal de atención", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateCanalAtencion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreCanalAtencion, estadoCanalAtencion } = req.body;

    await connection.query(
      "UPDATE tbl_canal_atencion SET nombre_canal_atencion = ?, estado_canal_atencion = ? WHERE id_canal_atencion= ?",
      [nombreCanalAtencion, estadoCanalAtencion, id]
    );

    res.status(200).json({ message: "Canal de atención actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el canal de atención:', error);
    return res.status(500).json({ message: "Error al actualizar el canal de atención", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteCanalAtencion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoCanalAtencion } = req.body;

    await connection.query(
      "UPDATE tbl_canal_atencion SET estado_canal_atencion = ? WHERE id_canal_atencion = ?",
      [estadoCanalAtencion, id]
    );

    res.status(200).json({ message: "Canal de atención bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el canal de atención:', error);
    return res.status(500).json({ message: "Error al bloquear el canal de atención" });
  } finally {
    connection.release();
  }
};
