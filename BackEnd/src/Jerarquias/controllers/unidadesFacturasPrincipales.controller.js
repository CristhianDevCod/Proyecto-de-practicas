import { antaresJerarquias } from '../../BDconfig';
const moment = require('moment');

const mysql = require('mysql2/promise');

const pool = mysql.createPool(antaresJerarquias);

export const getUnidadesFacturasPrincipalesActivas= async (req, res) => {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM tbl_unidad_factura_principal ORDER BY id_unidad_factura ASC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
};


