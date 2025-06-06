import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getRoles = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_rol ORDER BY id_rol ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ message: "Error al obtener los roles" });
  } finally {
    connection.release();
  }
};

export const getRolById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_rol WHERE id_rol = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el rol específica:', error);
    res.status(500).json({ message: "Error al obtener el rol" });
  } finally {
    connection.release();
  }
};

export const createRol = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreRol, estadoRol } = req.body;

    const [existingRol] = await connection.query(
      "SELECT * FROM tbl_rol WHERE nombre_rol = ?",
      [nombreRol]
    );

    if (existingRol.length > 0) {
      return res.status(200).json({ message: 'Ya existe un rol pool el nombre indicado', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_rol (nombre_rol, estado_rol) VALUES (?, ?)",
      [nombreRol, estadoRol]
    );

    res.status(201).json({ message: "Rol creada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el rol:', error);
    return res.status(500).json({ message: "Error al crear el rol", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateRol = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreRol, estadoRol } = req.body;
  
    await connection.query(
      "UPDATE tbl_rol SET nombre_rol = ?, estado_rol = ? WHERE id_rol = ?",
      [nombreRol, estadoRol, id]
    );
  
    res.status(200).json({ message: "Rol actualizada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    return res.status(500).json({ message: "Error al actualizar el rol", resp: 0 });
  } finally {
    connection.release();
  }
};


export const deleteRol = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoRol } = req.body;

    await connection.query(
      "UPDATE tbl_rol SET estado_rol = ? WHERE id_rol = ?",
      [estadoRol, id]
    );

    res.status(200).json({ message: "Rol bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el rol:', error);
    return res.status(500).json({ message: "Error al bloquear el rol" });
  } finally {
    connection.release();
  }
};

