import { antaresJerarquias, Sociodemographic } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(antaresJerarquias);
const pool2 = mysql.createPool(Sociodemographic);

export const getJerarquias = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query("SELECT * FROM tbl_jerarquia ORDER BY id_jerarquia ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las jerarquias:', error);
    res.status(500).json({ message: "Error al obtener las jerarquias" });
  } finally {
    if (connection) connection.release();
  }
};

export const getJerarquiaById = async (req, res) => {
  let connection;
  const id = parseInt(req.params.id);
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query("SELECT * FROM tbl_jerarquia WHERE id_jerarquia = ?", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la jerarquía específica:', error);
    res.status(500).json({ message: "Error al obtener la jerarquía específica" });
  } finally {
    if (connection) connection.release();
  }
};

export const checkJerarquiaByOperacion = async (req, res) => {
  let connection;
  const idOperacion = parseInt(req.params.id_operacion);
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT COUNT(*) as count FROM tbl_operaciones_jerarquia WHERE id_operacion = ?", [idOperacion]);
    res.status(200).json({ hasJerarquia: rows[0].count > 0 });
  } catch (error) {
    res.status(500).json({ message: "Error al comprobar la jerarquía" });
  } finally {
    if (connection) connection.release();
  }
};

export const getJerarquiaByOperacionId = async (req, res) => {
  let connection1;
  let connection2;
  const idOperacion = parseInt(req.params.id_operacion);

  try {
    connection1 = await pool.getConnection();
    connection2 = await pool2.getConnection();

    const [areas] = await connection1.query(`
      SELECT j.id_jerarquia, j.nombre_jerarquia, a.id_area, a.nombre_area, j.nombre_jerarquia AS nombre_personalizado
      FROM tbl_jerarquia j
      JOIN tbl_area a ON j.area_id = a.id_area
      JOIN tbl_operaciones_jerarquia oj ON j.id_jerarquia = oj.id_jerarquia
      WHERE oj.id_operacion = ?
    `, [idOperacion]);

    const [roles] = await connection1.query(`
      SELECT rj.rol_id, r.nombre_rol, rj.id_jerarquia, rj.id_empleado
      FROM tbl_roles_jerarquia rj
      JOIN tbl_rol r ON rj.rol_id = r.id_rol
      WHERE rj.id_jerarquia IN (SELECT id_jerarquia FROM tbl_operaciones_jerarquia WHERE id_operacion = ?)
    `, [idOperacion]);

    const personasIds = [...new Set(roles.map(role => role.id_empleado))];

    let personas = [];
    if (personasIds.length > 0) {
      const [personasData] = await connection2.query(`
        SELECT DISTINCT Documento, Nombres, Apellidos
        FROM T_socio
        WHERE Documento IN (?)
      `, [personasIds]);
      personas = personasData;
    }

    const data = areas.map(area => {
      const areaRoles = roles.filter(role => role.id_jerarquia === area.id_jerarquia);

      const rolesMap = {};

      areaRoles.forEach(role => {
        const roleKey = role.rol_id;

        if (!rolesMap[roleKey]) {
          rolesMap[roleKey] = {
            id_rol: role.rol_id,
            nombre_rol: role.nombre_rol,
            personas: [],
          };
        }

        const persona = personas.find(persona => persona.Documento === role.id_empleado);

        if (persona) {
          rolesMap[roleKey].personas.push({
            Documento: persona.Documento,
            Nombres: persona.Nombres || "Nombre no definido",
            Apellidos: persona.Apellidos || "Apellido no definido",
          });
        }
      });

      const rolesWithPeople = Object.values(rolesMap);

      return {
        id_area: area.id_area,
        nombre_personalizado: area.nombre_personalizado,
        nombre_area: area.nombre_area,
        roles: rolesWithPeople,
      };
    });

    res.status(200).json({ areas: data });
  } catch (error) {
    console.error("Error al obtener la jerarquía específica:", error);
    res.status(500).json({ message: "Error al obtener la jerarquía específica" });
  } finally {
    if (connection1) connection1.release();
    if (connection2) connection2.release();
  }
};

export const createJerarquia = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const { areas, id_operacion } = req.body;

    const valuesJerarquia = [];
    const valuesRoles = [];
    const idJerarquias = {};

    for (const area of areas) {
      const { id_area, nombre_personalizado } = area;
      const nombrePersonalizadoMayus = (nombre_personalizado || `Jerarquía de área ${id_area}`).toUpperCase();
      if (!idJerarquias[id_area]) {
        valuesJerarquia.push([nombrePersonalizadoMayus, id_area]);
      }
    }

    const [resultJerarquia] = await connection.query(`
      INSERT INTO tbl_jerarquia (nombre_jerarquia, area_id)
      VALUES ?
    `, [valuesJerarquia]);

    for (const [index, area] of areas.entries()) {
      const { id_area } = area;
      idJerarquias[id_area] = resultJerarquia.insertId + index;
    }

    for (const area of areas) {
      const { id_area, roles } = area;
      for (const role of roles) {
        const { id_rol, personas } = role;
        for (const persona of personas) {
          valuesRoles.push([idJerarquias[id_area], id_rol, persona]);
        }
      }
    }

    await connection.query(`
      INSERT INTO tbl_roles_jerarquia (id_jerarquia, rol_id, id_empleado)
      VALUES ?
    `, [valuesRoles]);

    const valuesOperacionesJerarquia = Object.values(idJerarquias).map((idJerarquia) => [id_operacion, idJerarquia]);

    await connection.query(`
      INSERT INTO tbl_operaciones_jerarquia (id_operacion, id_jerarquia)
      VALUES ?
    `, [valuesOperacionesJerarquia]);

    res.status(201).json({ message: "Jerarquía creada exitosamente" });
  } catch (error) {
    console.error('Error al crear la jerarquía:', error);
    res.status(500).json({ message: "Error al crear la jerarquía" });
  } finally {
    if (connection) connection.release();
  }
};

export const updateJerarquiaModified = async (req, res) => {
  let connection;
  const id_operacion = parseInt(req.params.id);
  const { areas } = req.body;

  try {
    connection = await pool.getConnection();
    for (const area of areas) {
      const { id_area, nombre_personalizado, roles = [] } = area;

      const newName = (nombre_personalizado || "").trim().toUpperCase();

      const [existingJerarquia] = await connection.query(
        `SELECT j.id_jerarquia, j.nombre_jerarquia FROM tbl_jerarquia j
         JOIN tbl_operaciones_jerarquia oj ON j.id_jerarquia = oj.id_jerarquia
         WHERE oj.id_operacion = ? AND j.area_id = ?`,
        [id_operacion, id_area]
      );

      let idJerarquia;
      if (existingJerarquia.length > 0) {
        idJerarquia = existingJerarquia[0].id_jerarquia;
        const existingName = existingJerarquia[0].nombre_jerarquia.trim().toUpperCase();

        if (newName && newName !== existingName) {
          await connection.query(
            `UPDATE tbl_jerarquia SET nombre_jerarquia = ? WHERE id_jerarquia = ?`,
            [newName, idJerarquia]
          );
        }
      } else {
        const [resultJerarquia] = await connection.query(
          `INSERT INTO tbl_jerarquia (nombre_jerarquia, area_id) VALUES (?, ?)`,
          [newName || `JERARQUÍA DE ÁREA ${id_area}`, id_area]
        );
        idJerarquia = resultJerarquia.insertId;

        await connection.query(
          `INSERT INTO tbl_operaciones_jerarquia (id_operacion, id_jerarquia) VALUES (?, ?)`,
          [id_operacion, idJerarquia]
        );
      }

      const [existingRoles] = await connection.query(
        `SELECT DISTINCT rol_id FROM tbl_roles_jerarquia WHERE id_jerarquia = ?`,
        [idJerarquia]
      );

      const existingRolesSet = new Set(existingRoles.map(role => role.rol_id));
      const newRolesSet = new Set(roles.map(role => role.id_rol));

      const rolesToDelete = [...existingRolesSet].filter(rol_id => !newRolesSet.has(rol_id));
      if (rolesToDelete.length > 0) {
        await connection.query(
          `DELETE FROM tbl_roles_jerarquia WHERE id_jerarquia = ? AND rol_id IN (?)`,
          [idJerarquia, rolesToDelete]
        );
      }

      for (const role of roles) {
        const { id_rol, personas = [] } = role;

        const roleExists = existingRolesSet.has(id_rol);

        if (!roleExists) {
          if (personas.length > 0) {
            const values = personas.map(persona => [idJerarquia, id_rol, persona]);
            await connection.query(
              `INSERT INTO tbl_roles_jerarquia (id_jerarquia, rol_id, id_empleado) VALUES ?`,
              [values]
            );
          }
        } else {
          const [existingPersons] = await connection.query(
            `SELECT id_empleado FROM tbl_roles_jerarquia WHERE id_jerarquia = ? AND rol_id = ?`,
            [idJerarquia, id_rol]
          );

          const existingPersonsSet = new Set(existingPersons.map(person => person.id_empleado));
          const newPersonsSet = new Set(personas);

          const personsToDelete = [...existingPersonsSet].filter(id_empleado => !newPersonsSet.has(id_empleado));
          if (personsToDelete.length > 0) {
            await connection.query(
              `DELETE FROM tbl_roles_jerarquia WHERE id_jerarquia = ? AND rol_id = ? AND id_empleado IN (?)`,
              [idJerarquia, id_rol, personsToDelete]
            );
          }

          const personsToAdd = [...newPersonsSet].filter(id_empleado => !existingPersonsSet.has(id_empleado));
          if (personsToAdd.length > 0) {
            const values = personsToAdd.map(persona => [idJerarquia, id_rol, persona]);
            await connection.query(
              `INSERT INTO tbl_roles_jerarquia (id_jerarquia, rol_id, id_empleado) VALUES ?`,
              [values]
            );
          }
        }
      }
    }

    res.status(200).json({ message: "Jerarquía actualizada exitosamente" });
  } catch (error) {
    console.error('Error al actualizar la jerarquía:', error);
    res.status(500).json({ message: "Error al actualizar la jerarquía" });
  } finally {
    if (connection) connection.release();
  }
};

export const updateJerarquia = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const id = parseInt(req.params.id);
    const { areaId, nombreJerarquia } = req.body;

    await connection.query(
      "UPDATE tbl_jerarquia SET area_id = ?, nombre_jerarquia = ? WHERE id_jerarquia = ?",
      [areaId, nombreJerarquia, id]
    );

    res.status(200).json({ message: "Jerarquía actualizada exitosamente" });
  } catch (error) {
    console.error('Error al actualizar la jerarquía:', error);
    res.status(500).json({ message: "Error al actualizar la jerarquía" });
  } finally {
    if (connection) connection.release();
  }
};

export const deleteJerarquia = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const id = parseInt(req.params.id);
    const { estadoJerarquia } = req.body;

    await connection.query(
      "UPDATE tbl_jerarquia SET estado_jerarquia = ? WHERE id_jerarquia = ?",
      [estadoJerarquia, id]
    );

    res.status(200).json({ message: "Jerarquía bloqueada exitosamente" });
  } catch (error) {
    console.error('Error al bloquear la jerarquía:', error);
    res.status(500).json({ message: "Error al bloquear la jerarquía" });
  } finally {
    if (connection) connection.release();
  }
};
