import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getOperacion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_operacion ORDER BY id_operacion ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las operaciones:', error);
    res.status(500).json({ message: "Error al obtener las operaciones" });
  } finally {
    connection.release();
  }
};

export const getOperacionById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_operacion WHERE id_operacion = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la operación:', error);
    res.status(500).json({ message: "Error al obtener la operación" });
  } finally {
    connection.release();
  }
};

export const createOperacion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreOperacion, clienteId, estadoOperacion } = req.body;
    await connection.query(
      "INSERT INTO tbl_operacion (nombre_operacion, cliente_id, estado_operacion) VALUES (?, ?, ?)",
      [nombreOperacion, clienteId, estadoOperacion]
    );

    // Se obtiene el ID de la operación recien insertada
    const [insertedIdResult] = await connection.query("SELECT LAST_INSERT_ID() as id");
    const insertedId = insertedIdResult[0].id;

    res.status(201).json({ message: "Operación creada exitosamente", resp: 1, idOperacion: insertedId });
  } catch (error) {
    console.error('Error al crear la operación:', error);
    return res.status(500).json({ message: "Error al crear la operación", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateOperacion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreOperacion, clienteId, estadoOperacion } = req.body;

    await connection.query(
      "UPDATE tbl_operacion SET nombre_operacion = ?, cliente_id = ?, estado_operacion = ? WHERE id_operacion = ?",
      [nombreOperacion, clienteId, estadoOperacion, id]
    );

    res.status(200).json({ message: "Operación actualizada exitosamente", resp: 1, idOperacion: id });
  } catch (error) {
    console.error('Error al actualizar la operación:', error);
    return res.status(500).json({ message: "Error al actualizar la operación", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteOperacion = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoOperacion } = req.body;

    await connection.query(
      "UPDATE tbl_operacion SET estado_operacion = ? WHERE id_operacion = ?",
      [estadoOperacion, id]
    );

    res.status(200).json({ message: "Operación bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear la operación:', error);
    return res.status(500).json({ message: "Error al bloquear la operación" });
  } finally {
    connection.release();
  }
};
