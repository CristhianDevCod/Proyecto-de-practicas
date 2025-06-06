import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias)

export const getCiudades = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT id_ciudad, nombre_ciudad, zona_horaria, estado_ciudad, depto_estado_id, nombre_depto_estado FROM tbl_ciudad AS ciu JOIN tbl_depto_estado AS de WHERE de.id_depto_estado = ciu.depto_estado_id ORDER BY id_ciudad ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    res.status(500).json({ message: "Error al obtener las ciudades" });
  } finally {
    connection.release();
  }
};

export const getCiudadesActivas = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT id_ciudad, nombre_ciudad, zona_horaria, estado_ciudad, depto_estado_id, nombre_depto_estado FROM tbl_ciudad AS ciu JOIN tbl_depto_estado AS de WHERE de.id_depto_estado = ciu.depto_estado_id AND estado_ciudad ORDER BY id_ciudad ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    res.status(500).json({ message: "Error al obtener las ciudades" });
  } finally {
    connection.release();
  }
};

export const getCiudadesActivasDeptos = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_ciudad WHERE depto_estado_id = ? AND estado_ciudad = 1 ORDER BY id_ciudad ASC", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    res.status(500).json({ message: "Error al obtener las ciudades" });
  } finally {
    connection.release();
  }
};

export const getCiudadById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_ciudad WHERE id_ciudad = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la ciudad específica:', error);
    res.status(500).json({ message: "Error al obtener la ciudad" });
  } finally {
    connection.release();
  }
};

export const getCiudadByIdDepartamento = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT id_ciudad, nombre_ciudad, zona_horaria, estado_ciudad, depto_estado_id, nombre_depto_estado FROM tbl_ciudad AS ciu JOIN tbl_depto_estado AS de WHERE de.id_depto_estado = ciu.depto_estado_id AND ciu.id_ciudad = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la ciudad específica:', error);
    res.status(500).json({ message: "Error al obtener la ciudad" });
  } finally {
    connection.release();
  }
};

export const createCiudad = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreCiudad, zonaHoraria, deptoEstadoId, estadoCiudad } = req.body;

    const [existingCiudad] = await connection.query(
      "SELECT * FROM tbl_ciudad WHERE nombre_ciudad = ?",
      [nombreCiudad]
    );

    if (existingCiudad.length > 0) {
      return res.status(200).json({ message: 'Ya existe un servicio con el nombre indicado', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_ciudad (nombre_ciudad, zona_horaria, depto_estado_id, estado_ciudad) VALUES (?, ?, ?, ?)",
      [nombreCiudad, zonaHoraria, deptoEstadoId, estadoCiudad]
    );
  
    res.status(201).json({ message: "Ciudad creada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear la ciudad:', error);
    return res.status(500).json({ message: "Error al crear la ciudad", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateCiudad = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreCiudad, zonaHoraria, deptoEstadoId, estadoCiudad } = req.body;

    await connection.query(
      "UPDATE tbl_ciudad SET nombre_ciudad = ?, zona_horaria = ?, depto_estado_id = ?, estado_ciudad = ? WHERE id_ciudad = ?",
      [nombreCiudad, zonaHoraria, deptoEstadoId, estadoCiudad, id]
    );
  
    res.status(200).json({ message: "Ciudad actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar la ciudad:', error);
    return res.status(500).json({ message: "Error al actualizar la ciudad", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteCiudad = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoCiudad } = req.body;

    await connection.query(
      "UPDATE tbl_ciudad SET estado_ciudad = ? WHERE id_ciudad = ?",
      [estadoCiudad, id]
    );

    res.status(200).json({ message: "Ciudad bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear la ciudad:', error);
    return res.status(500).json({ message: "Error al bloquear la ciudad" });
  } finally {
    connection.release();
  }
};

