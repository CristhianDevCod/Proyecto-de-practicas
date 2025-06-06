import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getTipoServicios = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_tipo_servicio ORDER BY id_tipo_servicio ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los tipos de servicio:', error);
    res.status(500).json({ message: "Error al obtener los tipos de servicio" });
  } finally {
    connection.release();
  }
};

export const getTipoServiciosActivos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_tipo_servicio WHERE estado_tipo_servicio = 1 ORDER BY id_tipo_servicio ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los tipos de servicio:', error);
    res.status(500).json({ message: "Error al obtener los tipos de servicio" });
  } finally {
    connection.release();
  }
};

export const getTipoServicioById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_tipo_servicio WHERE id_tipo_servicio = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el tipo de servicio:', error);
    res.status(500).json({ message: "Error al obtener el tipo de servicio" });
  } finally {
    connection.release();
  }
};

export const createTipoServicio = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreTipoServicio, estadoTipoServicio } = req.body;

    const [existingTipoServ] = await connection.query(
      "SELECT * FROM tbl_tipo_servicio WHERE nombre_tipo_servicio = ?",
      [nombreTipoServicio]
    );

    if (existingTipoServ.length > 0) {
      console.log('existe el tipo de servicio');
      return res.status(200).json({ message: 'Ya existe un servicio con el nombre indicado', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_tipo_servicio (nombre_tipo_servicio, estado_tipo_servicio) VALUES (?, ?)",
      [nombreTipoServicio, estadoTipoServicio]
    );

    res.status(201).json({ message: "Tipo de servicio creado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el tipo de servicio:', error);
    return res.status(500).json({ message: "Error al crear el tipo de servicio", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateTipoServicio = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreTipoServicio, estadoTipoServicio } = req.body;

    await connection.query(
      "UPDATE tbl_tipo_servicio SET nombre_tipo_servicio = ?, estado_tipo_servicio = ? WHERE id_tipo_servicio = ?",
      [nombreTipoServicio, estadoTipoServicio, id]
    );

    res.status(200).json({ message: "Tipo de servicio actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el tipo de servicio:', error);
    return res.status(500).json({ message: "Error al actualizar el tipo de servicio", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteTipoServicio = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoTipoServicio } = req.body;

    await connection.query(
      "UPDATE tbl_tipo_servicio SET estado_tipo_servicio = ? WHERE id_tipo_servicio = ?",
      [estadoTipoServicio, id]
    );

    res.status(200).json({ message: "Tipo de servicio bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el tipo de servicio:', error);
    return res.status(500).json({ message: "Error al bloquear el tipo de servicio" });
  } finally {
    connection.release();
  }
};

