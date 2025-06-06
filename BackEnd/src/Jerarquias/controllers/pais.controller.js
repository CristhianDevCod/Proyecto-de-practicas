import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);


export const getPaises = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tbl_pais ORDER BY id_pais ASC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los paises:", error);
    res.status(500).json({ message: "Error al obtener los paises" });
  } finally {
    connection.release();
  }
};

export const getPaisesActivos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tbl_pais WHERE estado_pais = 1 ORDER BY id_pais ASC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los paises:", error);
    res.status(500).json({ message: "Error al obtener los paises" });
  } finally {
    connection.release();
  }
};

export const getPaisById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tbl_pais WHERE id_pais = ?",
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener el pais específico:", error);
    res.status(500).json({ message: "Error al obtener el pais" });
  } finally {
    connection.release();
  }
};

export const createPais = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombrePais, estadoPais } = req.body;

    const [existingCanalAt] = await connection.query(
      "SELECT * FROM tbl_pais WHERE nombre_pais = ?",
      [nombrePais]
    );

    if (existingCanalAt.length > 0) {
      return res.status(200).json({
        message: "Ya existe un servicio pool el nombre indicado",
        resp: 0,
      });
    }

    await connection.query(
      "INSERT INTO tbl_pais (nombre_pais, estado_pais) VALUES (?, ?)",
      [nombrePais, estadoPais]
    );

    res.status(201).json({ message: "Pais creado exitosamente", resp: 1 });
  } catch (error) {
    console.error("Error al crear el pais:", error);
    return res.status(500).json({ message: "Error al crear el pais", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updatePais = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombrePais, estadoPais } = req.body;

    await connection.query(
      "UPDATE tbl_pais SET nombre_pais = ?, estado_pais= ? WHERE id_pais = ?",
      [nombrePais, estadoPais, id]
    );

    res.status(200).json({ message: "Pais actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error("Error al actualizar el pais:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el pais", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deletePais = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoPais } = req.body;

    await connection.query(
      "UPDATE tbl_pais SET estado_pais = ? WHERE id_pais = ?",
      [estadoPais, id]
    );

    res.status(200).json({ message: "Pais bloqueada exitosamente" });
  } catch (error) {
    console.error("Error al bloquear el pais:", error);
    return res.status(500).json({ message: "Error al bloquear el pais" });
  } finally {
    connection.release();
  }
};

