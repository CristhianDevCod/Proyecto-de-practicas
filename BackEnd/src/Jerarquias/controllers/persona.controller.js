import { Sociodemographic } from "../../BDconfig";
const mysql = require("mysql2/promise");

const pool = mysql.createPool(Sociodemographic);

export const getPersonsByCargo = async (req, res) => {
    let connection;
    const cargo = req.params.cargo;

    try {
        connection = await pool.getConnection();

        // Consulta SQL ajustada
        const [rows] = await connection.query(
            `SELECT Nombres, Apellidos, Documento, Correo_Corporativo, Telefono_Fijo_Principal, Telefono_Celular_Principal, Estado_Empleado 
             FROM T_socio 
             WHERE Estado_Empleado = 'Activo' 
             AND Cargo LIKE ?
             GROUP BY Documento;`,
            [`%${cargo}%`] // Utilizar el operador LIKE para hacer coincidir cualquier parte del nombre del cargo
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener las personas por cargo:', error);
        res.status(500).json({ message: "Error al obtener las personas por cargo" });
    } finally {
        if (connection) connection.release();
    }
};
