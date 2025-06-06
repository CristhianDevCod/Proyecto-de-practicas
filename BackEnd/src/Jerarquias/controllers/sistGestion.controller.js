import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias)

export const getSistGestion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sist_de_gestion ORDER BY id_sist_gestion ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los sistemas de gestión:', error);
    res.status(500).json({ message: "Error al obtener los sistemas de gestión" });
  } finally {
    connection.release();
  }
};

export const getSistGestionActivos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sist_de_gestion WHERE estado_sist_gestion = 1 ORDER BY id_sist_gestion ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los sistemas de gestión:', error);
    res.status(500).json({ message: "Error al obtener los sistemas de gestión" });
  } finally {
    connection.release();
  }
};

export const getSistGestionById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sist_de_gestion WHERE id_sist_gestion = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el sistema de gestión:', error);
    res.status(500).json({ message: "Error al obtener el sistema de gestión" });
  } finally {
    connection.release();
  }
};

export const createSistGestion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreSistGestion, adminSistGestion, estadoSistGestion } = req.body;

    const [existingSistema] = await connection.query(
      "SELECT * FROM tbl_sist_de_gestion WHERE nombre_sist_gestion = ? AND admin_sist_gestion = ?",
      [nombreSistGestion, adminSistGestion]
    );

    if (existingSistema.length > 0) {
      console.log('existe el sistema');
      return res.status(200).json({ message: 'El sistema con el nombre indicado ya existe', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_sist_de_gestion (nombre_sist_gestion, admin_sist_gestion, estado_sist_gestion) VALUES (?, ?, ?)",
      [nombreSistGestion, adminSistGestion, estadoSistGestion]
    );
    res.status(201).json({ message: "Sistema de gestión creado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el sistema de gestión:', error);
    return res.status(500).json({ message: "Error al crear el sistema de gestión", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateSistGestion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreSistGestion, adminSistGestion, estadoSistGestion } = req.body;

    await connection.query(
      "UPDATE tbl_sist_de_gestion SET nombre_sist_gestion = ?, admin_sist_gestion = ?, estado_sist_gestion = ? WHERE id_sist_gestion = ?",
      [nombreSistGestion, adminSistGestion, estadoSistGestion, id]
    );

    res.status(200).json({ message: "Sistema de gestión actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el sistema de gestión:', error);
    return res.status(500).json({ message: "Error al actualizar el sistema de gestión", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteSistGestion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoSistGestion } = req.body;

    await connection.query(
      "UPDATE tbl_sist_de_gestion SET estado_sist_gestion = ? WHERE id_sist_gestion = ?",
      [estadoSistGestion, id]
    );

    res.status(200).json({ message: "Sistema de gestión bloqueada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al bloquear el sistema de gestión:', error);
    return res.status(500).json({ message: "Error al bloquear el sistema de gestión" });
  } finally {
    connection.release();
  }
};
