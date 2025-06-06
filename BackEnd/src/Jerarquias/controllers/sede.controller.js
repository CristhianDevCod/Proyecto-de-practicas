import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getSedes = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT id_sede, nombre_sede, estado_sede, ciudad_id, nombre_ciudad FROM tbl_sede AS se JOIN tbl_ciudad as ciu WHERE ciu.id_ciudad = se.ciudad_id ORDER BY id_sede ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las sedes:', error);
    res.status(500).json({ message: "Error al obtener las sedes" });
  } finally {
    connection.release();
  }
};

export const getSedesActivasCiudades = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sede WHERE ciudad_id = ? AND estado_sede = 1 ORDER BY id_sede ASC", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la sede específica:', error);
    res.status(500).json({ message: "Error al obtener la sede" });
  } finally {
    connection.release();
  }
};

export const getSedeById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sede WHERE id_sede = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la sede específica:', error);
    res.status(500).json({ message: "Error al obtener la sede" });
  } finally {
    connection.release();
  }
};

export const getSedeByIdNombreCiudad = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT id_sede, nombre_sede, estado_sede, ciudad_id, nombre_ciudad FROM tbl_sede AS se JOIN tbl_ciudad as ciu WHERE ciu.id_ciudad = se.ciudad_id AND se.id_sede = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la sede específica:', error);
    res.status(500).json({ message: "Error al obtener la sede" });
  } finally {
    connection.release();
  }
};

export const createSede = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreSede, ciudadId, estadoSede } = req.body;

    const [existingSede] = await connection.query(
      "SELECT * FROM tbl_sede WHERE nombre_sede = ?",
      [nombreSede]
    );

    if (existingSede.length > 0) {
      return res.status(200).json({ message: 'Ya existe un servicio con el nombre indicado', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_sede (nombre_sede, ciudad_id, estado_sede) VALUES (?, ?, ?)",
      [nombreSede, ciudadId, estadoSede]
    );

    res.status(201).json({ message: "Sede creado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear la sede:', error);
    return res.status(500).json({ message: "Error al crear la sede", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateSede = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreSede, ciudadId, estadoSede } = req.body;

    await connection.query(
      "UPDATE tbl_sede SET nombre_sede = ?, ciudad_id = ?, estado_sede = ? WHERE id_sede = ?",
      [nombreSede, ciudadId, estadoSede, id]
    );

    res.status(200).json({ message: "Sede actualizada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar la sede:', error);
    return res.status(500).json({ message: "Error al actualizar la sede", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteSede = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoSede } = req.body;

    await connection.query(
      "UPDATE tbl_sede SET estado_sede = ? WHERE id_sede = ?",
      [estadoSede, id]
    );

    res.status(200).json({ message: "Sede bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear la sede:', error);
    return res.status(500).json({ message: "Error al bloquear la sede" });
  } finally {
    connection.release();
  }
};