import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getSectorClientes = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sector_cliente ORDER BY id_sector_cliente ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los sectores de los clientes:', error);
    res.status(500).json({ message: "Error al obtener los sectores clientes" });
  } finally {
    connection.release();
  }
};

export const getSectorClienteById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_sector_cliente WHERE id_sector_cliente = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el sector cliente específico:', error);
    res.status(500).json({ message: "Error al obtener el sector cliente" });
  } finally {
    connection.release();
  }
};

export const createSectorCliente = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreSectorCliente, estadoSectorCliente } = req.body;

    const [existingSectorCliente] = await connection.query(
      "SELECT * FROM tbl_sector_cliente WHERE nombre_sector_cliente = ?",
      [nombreSectorCliente]
    );

    if (existingSectorCliente.length > 0) {
      console.log('existe el área');
      return res.status(200).json({ message: 'El nombre del área ya existe', resp: 0 });
    }

    await connection.query(
      "INSERT INTO tbl_sector_cliente (nombre_sector_cliente, estado_sector_cliente) VALUES (?, ?)",
      [nombreSectorCliente, estadoSectorCliente]
    );

    res.status(201).json({ message: "Sector cliente creado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al crear el sector Cliente:', error);
    return res.status(500).json({ message: "Error al crear el sector cliente", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateSectorCliente = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreSectorCliente, estadoSectorCliente } = req.body;

    await connection.query(
      "UPDATE tbl_sector_cliente SET nombre_sector_cliente = ?, estado_sector_cliente = ? WHERE id_sector_cliente = ?",
      [nombreSectorCliente, estadoSectorCliente, id]
    );

    res.status(200).json({ message: "Sector cliente actualizado exitosamente", resp: 1 });
  } catch (error) {
    console.error('Error al actualizar el sector cliente:', error);
    return res.status(500).json({ message: "Error al actualizar el sector cliente", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteSectorCliente = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoSectorCliente } = req.body;

    await connection.query(
      "UPDATE tbl_sector_cliente SET estado_sector_cliente = ? WHERE id_sector_cliente = ?",
      [estadoSectorCliente, id]
    );

    res.status(200).json({ message: "Sector cliente bloqueado exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el sector cliente:', error);
    return res.status(500).json({ message: "Error al bloquear el sector cliente" });
  } finally {
    connection.release();
  }
};
