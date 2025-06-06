import { antaresJerarquias } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);


export const getClientes = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_cliente ORDER BY id_cliente ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ message: "Error al obtener los clientes" });
  } finally {
    connection.release();
  }
};

export const getClienteById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_cliente WHERE id_cliente = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el cliente específico:', error);
    res.status(500).json({ message: "Error al obtener los clientes" });
  } finally {
    connection.release();
  }
};

export const getClientesActivos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_cliente WHERE estado_cliente = '1' ORDER BY id_cliente ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ message: "Error al obtener los clientes" });
  } finally {
    connection.release();
  }
};

export const createCliente = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { nombreCliente, sectorClienteId, estadoCliente } = req.body;

    await connection.query(
      "INSERT INTO tbl_cliente (nombre_cliente, sector_cliente_id, estado_cliente) VALUES (?, ?, ?)",
      [nombreCliente, sectorClienteId, estadoCliente]
    );

    const [insertedIdResult] = await connection.query("SELECT LAST_INSERT_ID() as id");
    const insertedId = insertedIdResult[0].id;

    res.status(201).json({ message: "Cliente creado exitosamente", resp: 1, idCliente: insertedId });
  } catch (error) {
    console.error('Error al crear el Cliente:', error);
    return res.status(500).json({ message: "Error al crear el cliente", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateCliente = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { nombreCliente, sectorClienteId, estadoCliente } = req.body;

    await connection.query(
      "UPDATE tbl_cliente SET nombre_cliente = ?, sector_cliente_id = ?, estado_cliente = ? WHERE id_cliente = ?",
      [nombreCliente, sectorClienteId, estadoCliente, id]
    );

    res.status(200).json({ message: "Cliente actualizado exitosamente", resp: 1, idCliente: id });
  } catch (error) {
    console.error('Error al actualizar el Cliente:', error);
    return res.status(500).json({ message: "Error al actualizar el cliente", resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteCliente = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoCliente } = req.body;

    await connection.query(
      "UPDATE tbl_cliente SET estado_cliente = ? WHERE id_cliente = ?",
      [estadoCliente, id]
    );

    res.status(200).json({ message: "Cliente bloqueado exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el cliente:', error);
    return res.status(500).json({ message: "Error al bloquear el cliente" });
  } finally {
    connection.release();
  }
};

export const updateClienteEstado = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { 
      estadoCliente, 
      estadoOperacion, 
      idOperacion, 
      idSegmento, 
      estadoSegmento, 
      idServicio, 
      estadoServicio, 
      genRecargoNocturno, 
      genRecargoDomFestivo,
      objetos 
    } = req.body;

    // Iniciar transacción
    await connection.beginTransaction();

    // Actualizar estado del cliente
    await connection.query(
      "UPDATE tbl_cliente SET estado_cliente = ? WHERE id_cliente = ?",
      [estadoCliente, id]
    );

    // Actualizar estado de operación
    if (idOperacion) {
      await connection.query(
        "UPDATE tbl_operacion SET estado_operacion = ? WHERE id_operacion = ?",
        [estadoOperacion, idOperacion]
      );
    }

    // Actualizar estado de segmento
    if (idSegmento) {
      await connection.query(
        "UPDATE tbl_segmento SET estado_segmento = ? WHERE id_segmento = ?",
        [estadoSegmento, idSegmento]
      );
    }

    // Actualizar estado de servicio
    if (idServicio) {
      await connection.query(
        "UPDATE tbl_servicio SET gen_recargo_noc = ?, gen_recargo_dom_fest = ?, estado_servicio = ?  WHERE id_servicio = ?",
        [genRecargoNocturno, genRecargoDomFestivo, estadoServicio, idServicio]
      );
    }

    // Actualizar tabla maestra pool los objetos
    if (objetos && objetos.length > 0) {
      for (const objeto of objetos) {
        await connection.query(
          "UPDATE tbl_maestra_ob SET nombre_objeto = ?, estado_skill = ? WHERE id_objeto = ?",
          [objeto.nombre, objeto.estado, objeto.id]
        );
      }
    }

    // Confirmar transacción
    await connection.commit();

    res.status(200).json({ message: "Operación actualizada exitosamente", resp: 1, idCliente: id });
  } catch (error) {
    await connection.rollback(); // Revertir transacción en caso de error
    console.error('Error al actualizar la operación:', error);
    return res.status(500).json({ message: "Error al actualizar la operación", resp: 0 });
  } finally {
    connection.release();
  }
};





