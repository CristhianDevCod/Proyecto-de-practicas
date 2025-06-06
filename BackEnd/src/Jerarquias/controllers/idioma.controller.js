import { almasocio } from '../../BDconfig';
const moment = require('moment');

const mysql = require('mysql2/promise');

const pool = mysql.createPool(almasocio);

export const getIdiomas= async (req, res) => {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM  idiomas WHERE estado = 1 ORDER BY id ASC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
};