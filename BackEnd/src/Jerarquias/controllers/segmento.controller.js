import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getSegmentos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_segmento ORDER BY id_segmento ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los segmentos:', error);
    res.status(500).json({ message: "Error al obtener los segmentos" });
  } finally {
    connection.release();
  }
};

export const getSegmentoById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_segmento WHERE id_segmento = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el segmento específico:', error);
    res.status(500).json({ message: "Error al obtener el segmento" });
  } finally {
    connection.release();
  }
};

export const createSegmento = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreSegmento, operacionId, estadoSegmento } = req.body;

    await connection.query(
      "INSERT INTO tbl_segmento (nombre_segmento, operacion_id, estado_segmento) VALUES (?, ?, ?)",
      [nombreSegmento, operacionId, estadoSegmento]
    );

    // Se obtiene el ID del segmento recien insertado
    const [insertedIdResult] = await connection.query("SELECT LAST_INSERT_ID() as id");
    const insertedId = insertedIdResult[0].id;

    res.status(201).json({ message: "Segmento creado exitosamente", resp: 1, idSegmento: insertedId });
  } catch (error) {
    console.error('Error al crear el segmento:', error);
    return res.status(500).json({ message: "Error al crear el segmento", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateSegmento = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreSegmento, operacionId, estadoSegmento } = req.body;

    await connection.query(
      "UPDATE tbl_segmento SET nombre_segmento = ?, operacion_id = ?, estado_segmento = ? WHERE id_segmento = ?",
      [nombreSegmento, operacionId, estadoSegmento, id]
    );

    res.status(200).json({ message: "Segmento actualizado exitosamente", resp: 1, idSegmento: id });
  } catch (error) {
    console.error('Error al actualizar el segmento:', error);
    return res.status(500).json({ message: "Error al actualizar el segmento", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteSegmento = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoSegmento } = req.body;

    await connection.query(
      "UPDATE tbl_segmento SET estado_segmento = ? WHERE id_segmento = ?",
      [estadoSegmento, id]
    );

    res.status(200).json({ message: "Segmento bloqueado exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el segmento:', error);
    return res.status(500).json({ message: "Error al bloquear el segmento" });
  } finally {
    connection.release();
  }
};
