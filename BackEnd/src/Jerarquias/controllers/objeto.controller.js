import { antaresJerarquias } from "../../BDconfig";
const moment = require('moment');
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);

export const getObjetos = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_maestra_ob ORDER BY id_objeto ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los objetos:', error);
    res.status(500).json({ message: "Error al obtener los objetos" });
  } finally {
    connection.release();
  }
};

export const getObjetoById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query("SELECT * FROM tbl_maestra_ob WHERE id_objeto = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el objeto en específico:', error);
    res.status(500).json({ message: "Error al obtener el objeto en específico" });
  } finally {
    connection.release();
  }
};

export const createObjeto = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const skills = req.body; // El cuerpo de la solicitud es un array de skills

    const insertedIds = [];

    // Inicia una transacción
    await connection.beginTransaction();

    for (const skill of skills) {
      const { nombreObjeto, fechaInicio, sistGestionId, estadoSkill, servicioId } = skill;
      const formattedDate = moment(fechaInicio).format('YYYY-MM-DD');

      // Inserta cada skill en la base de datos
      await connection.query(
        "INSERT INTO tbl_maestra_ob (nombre_objeto, fecha_inicio, sist_gestion_id, estado_skill, servicio_id) VALUES (?, ?, ?, ?, ?)",
        [nombreObjeto, formattedDate, sistGestionId, estadoSkill, servicioId]
      );

      // Se obtiene el ID del objeto recien insertado
      const [insertedIdResult] = await connection.query("SELECT LAST_INSERT_ID() as id");
      const insertedId = insertedIdResult[0].id;

      insertedIds.push(insertedId); // Almacena los IDs insertados
    }

    // Confirma la transacción
    await connection.commit();

    res.status(201).json({ message: "Objetos creados exitosamente", resp: 1, idObjeto: insertedIds });
  } catch (error) {
    console.error('Error al crear los objetos:', error);

    // Revertir la transacción en caso de error
    await connection.rollback();

    return res.status(500).json({ message: "Error al crear los objetos", resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateObjeto = async (req, res) => {
  const connection = await pool.getConnection();
  const objetos = req.body;

  try {
    // Inicia una transacción
    await connection.beginTransaction();

    // Ejecutar todas las consultas UPDATE en paralelo
    const queries = objetos.map(async (objeto) => {
      const { id, nombreObjeto, fechaInicio, fechaFin, sistGestionId, estadoSkill } = objeto;
      const Fecha_Inicio = moment(fechaInicio).format('YYYY-MM-DD');
      const Fecha_Fin = moment(fechaFin).format('YYYY-MM-DD');

      // Ejecutar la consulta UPDATE para cada objeto
      await connection.query(
        "UPDATE tbl_maestra_ob SET nombre_objeto = ?, fecha_inicio = ?, fecha_fin = ?, sist_gestion_id = ?, estado_skill = ? WHERE id_objeto = ?",
        [nombreObjeto, Fecha_Inicio, Fecha_Fin, sistGestionId, estadoSkill, id]
      );
    });

    // Esperar a que todas las consultas se completen
    await Promise.all(queries);

    // Confirmar la transacción
    await connection.commit();

    res.status(200).json({ resp: 1, message: "Objetos actualizados exitosamente" });
  } catch (error) {
    console.error('Error al actualizar los objetos:', error);

    // Revertir la transacción en caso de error
    await connection.rollback();

    res.status(500).json({ resp: 0, message: "Error al actualizar los objetos" });
  } finally {
    connection.release();
  }
};


export const deleteObjeto = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoSkill } = req.body;

    await connection.query(
      "UPDATE tbl_maestra_ob SET estado_skill = ? WHERE id_objeto = ?",
      [estadoSkill, id]
    );

    res.status(200).json({ message: "Objeto bloqueado exitosamente" });
  } catch (error) {
    console.error('Error al bloquear el objeto:', error);
    return res.status(500).json({ message: "Error al bloquear el objeto" });
  } finally {
    connection.release();
  }
};

