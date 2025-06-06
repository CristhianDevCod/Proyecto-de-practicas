import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

// Obtener todas las áreas
export const getAreas = async (req, res) => {
  let connection;
  try {
    // Obtener la conexión del pool
    connection = await pool.getConnection();

    // Ejecutar la consulta directamente usando el cliente de promesas
    const [rows] = await connection.query("SELECT * FROM tbl_area ORDER BY id_area ASC");

    // Responder con los datos obtenidos
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las áreas:', error.message);
    res.status(500).json({ message: "Error al obtener las áreas" });
  } finally {
    // Liberar la conexión si fue asignada
    if (connection) connection.release();
  }
};


// Obtener un área por ID
export const getAreaById = async (req, res) => {
  let connection;
  const id = parseInt(req.params.id);
  try {
    connection = await pool.getConnection();

    const result = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM tbl_area WHERE id_area = ?", [id], (error, rows) => {
        if (error) {
          return reject(new Error('Error en la consulta: ' + error.message));
        }
        resolve(rows);
      });
    });

    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontró el área especificada" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener el área específica:', error.message);
    res.status(500).json({ message: "Error al obtener el área" });
  } finally {
    if (connection) connection.release();
  }
};

// Crear una nueva área
export const createArea = async (req, res) => {
  let connection;
  try {
    const { nombreArea, estadoArea } = req.body;
    connection = await pool.getConnection();

    const existingArea = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM tbl_area WHERE nombre_area = ?", [nombreArea], (error, rows) => {
        if (error) {
          return reject(new Error('Error en la consulta: ' + error.message));
        }
        resolve(rows);
      });
    });

    if (existingArea.length > 0) {
      return res.status(200).json({ message: 'El nombre del área ya existe', resp: 0 });
    }

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tbl_area (nombre_area, estado_area) VALUES (?, ?)",
        [nombreArea, estadoArea],
        (error, result) => {
          if (error) {
            return reject(new Error('Error en la inserción: ' + error.message));
          }
          resolve(result);
        }
      );
    });

    res.status(201).json({ message: "Área creada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el área:', error.message);
    return res.status(500).json({ message: "Error al crear el área", resp: 0 });
  } finally {
    if (connection) connection.release();
  }
};

// Actualizar un área
export const updateArea = async (req, res) => {
  let connection;
  try {
    const id = parseInt(req.params.id);
    const { nombreArea, estadoArea } = req.body;
    connection = await pool.getConnection();

    const existingArea = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM tbl_area WHERE nombre_area = ? AND id_area != ?",
        [nombreArea, id],
        (error, rows) => {
          if (error) {
            return reject(new Error('Error en la consulta: ' + error.message));
          }
          resolve(rows);
        }
      );
    });

    if (existingArea.length > 0) {
      return res.status(200).json({ message: 'El nombre del área ya existe', resp: 0 });
    }

    await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE tbl_area SET nombre_area = ?, estado_area = ? WHERE id_area = ?",
        [nombreArea, estadoArea, id],
        (error, result) => {
          if (error) {
            return reject(new Error('Error en la actualización: ' + error.message));
          }
          resolve(result);
        }
      );
    });

    res.status(200).json({ message: "Área actualizada exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el área:', error.message);
    return res.status(500).json({ message: "Error al actualizar el área", resp: 0 });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar (bloquear) un área
export const deleteArea = async (req, res) => {
  let connection;
  try {
    const id = parseInt(req.params.id);
    const { estadoArea } = req.body;
    connection = await pool.getConnection();

    await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE tbl_area SET estado_area = ? WHERE id_area = ?",
        [estadoArea, id],
        (error, result) => {
          if (error) {
            return reject(new Error('Error en la actualización: ' + error.message));
          }
          resolve(result);
        }
      );
    });

    res.status(200).json({ message: "Área bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el área:', error.message);
    return res.status(500).json({ message: "Error al bloquear el área" });
  } finally {
    if (connection) connection.release();
  }
};
