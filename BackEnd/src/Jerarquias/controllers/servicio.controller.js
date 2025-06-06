import { antaresJerarquias } from '../../BDconfig';
const moment = require('moment');

const mysql = require('mysql2/promise');

const pool = mysql.createPool(antaresJerarquias);

export const getServicios = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM tbl_servicio ORDER BY id_servicio ASC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  } finally {
    connection.release();
  }
};

export const getServicioById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query(
      'SELECT * FROM tbl_servicio WHERE id_servicio = ?',
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el servicio en específico:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener el servicio en específico' });
  } finally {
    connection.release();
  }
};

export const createServicio = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const {
      nombreServicio,
      paisId,
      deptoId,
      ciudadId,
      sedeId,
      tipoServicioId,
      canalAtencionId,
      genRecargoNocturno,
      genRecargoDomFestivo,
      fechaFinServicio,
      modeloPlaneacion,
      unidadFacturaId,
      esFacturable,
      idiomaId,
      segmentoId,
      estadoServicio,
    } = req.body;
    
    const formattedDate = moment(fechaFinServicio).format('YYYY-MM-DD');

    await connection.query(
      'INSERT INTO tbl_servicio (nombre_servicio, pais_id, depto_id, ciudad_id, sede_id, tipo_servicio_id, canal_atencion_id, gen_recargo_noc, gen_recargo_dom_fest, fecha_fin_servicio, modelo_planeacion, unidad_factura_id, es_facturable, idioma_id, segmento_id, estado_servicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nombreServicio,
        paisId,
        deptoId,
        ciudadId,
        sedeId,
        tipoServicioId,
        canalAtencionId,
        genRecargoNocturno,
        genRecargoDomFestivo,
        formattedDate,
        modeloPlaneacion,
        unidadFacturaId,
        esFacturable,
        idiomaId,
        segmentoId,
        estadoServicio,
      ]
    );

    // Obtén el ID del servicio recién insertado
    const [insertedIdResult] = await connection.query('SELECT LAST_INSERT_ID() as id');
    const insertedId = insertedIdResult[0].id;

    // Obtén el nombre del servicio y el nombre de la operación recién insertados
    const [servicioResult] = await connection.query(
      `SELECT 
          serv.nombre_servicio, 
          ope.nombre_operacion 
      FROM 
          tbl_servicio AS serv
      LEFT JOIN 
          tbl_segmento AS seg ON serv.segmento_id = seg.id_segmento AND seg.estado_segmento = 1
      LEFT JOIN 
          tbl_operacion AS ope ON seg.operacion_id = ope.id_operacion AND ope.estado_operacion = 1
      WHERE 
          serv.id_servicio = ?
        AND 
          serv.estado_servicio = 1;
      `,
      [insertedId]
    );
    const nombreServicioNuevo = servicioResult[0].nombre_servicio;
    const nombreOperacionNueva = servicioResult[0].nombre_operacion;

    console.log(
      'idServicio: ',
      insertedId,
      'nombreServicio: ',
      nombreServicioNuevo,
      'nombreOperacion: ',
      nombreOperacionNueva
    );

    // Envía la respuesta pool el id, el nombre del servicio y el nombre de la operación
    res
      .status(201)
      .json({
        message: 'Servicio creado exitosamente',
        resp: 1,
        idServicio: insertedId,
        nombreServicio: nombreServicioNuevo,
        nombreOperacion: nombreOperacionNueva,
      });
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    return res
      .status(500)
      .json({ message: 'Error al crear el servicio', resp: 0 });
  } finally {
    connection.release();
  }
};

export const updateServicio = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const {
      nombreServicio,
      paisId,
      deptoId,
      ciudadId,
      sedeId,
      tipoServicioId,
      canalAtencionId,
      genRecargoNocturno,
      genRecargoDomFestivo,
      fechaFinServicio,
      modeloPlaneacion,
      unidadFacturaId,
      esFacturable,
      idiomaId,
      segmentoId,
      estadoServicio,
    } = req.body;

    const formattedDate = moment(fechaFinServicio).format('YYYY-MM-DD');
    
    // Actualiza el servicio
    await connection.query(
      'UPDATE tbl_servicio SET nombre_servicio = ?, pais_id = ?, depto_id = ?, ciudad_id = ?, sede_id = ?, tipo_servicio_id = ?, canal_atencion_id = ?, gen_recargo_noc = ?, gen_recargo_dom_fest = ?, fecha_fin_servicio = ?, modelo_planeacion = ?, unidad_factura_id = ?, es_facturable = ?, idioma_id = ?, segmento_id = ?, estado_servicio = ?  WHERE id_servicio= ?',
      [
        nombreServicio,
        paisId,
        deptoId,
        ciudadId,
        sedeId,
        tipoServicioId,
        canalAtencionId,
        genRecargoNocturno,
        genRecargoDomFestivo,
        formattedDate,
        modeloPlaneacion,
        unidadFacturaId,
        esFacturable,
        idiomaId,
        segmentoId,
        estadoServicio,
        id,
      ]
    );

    // Obtén el nombre del servicio y el nombre de la operación actualizados
    const [servicioResult] = await connection.query(
      `SELECT 
          serv.nombre_servicio, 
          ope.nombre_operacion 
      FROM 
          tbl_servicio AS serv
      LEFT JOIN 
          tbl_segmento AS seg ON serv.segmento_id = seg.id_segmento AND seg.estado_segmento = 1
      LEFT JOIN 
          tbl_operacion AS ope ON seg.operacion_id = ope.id_operacion AND ope.estado_operacion = 1
      WHERE 
          serv.id_servicio = ?
        AND 
          serv.estado_servicio = 1;
      `,
      [id]
    );

    const nombreServicioNuevo = servicioResult[0].nombre_servicio;
    const nombreOperacionNueva = servicioResult[0].nombre_operacion;

    console.log(
      'idServicio: ',
      id,
      'nombreServicio: ',
      nombreServicioNuevo,
      'nombreOperacion: ',
      nombreOperacionNueva
    );

    // Envía la respuesta pool el id, el nombre del servicio y el nombre de la operación
    res
      .status(200)
      .json({
        message: 'Servicio actualizado exitosamente',
        resp: 1,
        idServicio: id,
        nombreServicio: nombreServicioNuevo,
        nombreOperacion: nombreOperacionNueva,
      });
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    return res
      .status(500)
      .json({ message: 'Error al actualizar el servicio', resp: 0 });
  } finally {
    connection.release();
  }
};

export const deleteServicio = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const id = parseInt(req.params.id);
    const { estadoServicio } = req.body;

    await connection.query(
      'UPDATE tbl_servicio SET estado_servicio = ? WHERE id_servicio = ?',
      [estadoServicio, id]
    );

    res.status(200).json({ message: 'Servicio bloqueado exitosamente' });
  } catch (error) {
    console.error('Error al bloquear el servicio:', error);
    return res.status(500).json({ message: 'Error al bloquear el servicio' });
  } finally {
    connection.release();
  }
};

// EndPoint de ejemplo para simular la respuesta de formGen
export const postEjemploFormGen = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(
      'ejemplo de llegada a formGen desde creación del servicio',
      req.body
    );

    // Respuesta simulada para pruebas
    const response = {
      status: 'success',
      IDCampaña: 6,
      creadoPor: 'hdiaz'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error al bloquear el servicio:', error);
    return res.status(500).json({ message: 'Error al bloquear el servicio' });
  }
};

export const createServicioCampanaFormGen = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { servicio_id, campanaFormGen_id } = req.body;
    console.log(req.body);
    
    // Validar que los campos necesarios están presentes
    if (!servicio_id || !campanaFormGen_id) {
      return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    // Inserción en la base de datos
    await connection.query(
      'INSERT INTO tbl_servicios_campanasFormGen (servicio_id, campanaFormGen_id) VALUES (?, ?)',
      [servicio_id, campanaFormGen_id]
    );

    res.status(200).json({ message: 'Relación guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la relación:', error);
    return res.status(500).json({ message: 'Error al guardar la relación' });
  } finally {
    connection.release();
  }
};

export const getServicioCampanaFormGenById = async (req, res) => {
  const connection = await pool.getConnection();
  const id = parseInt(req.params.id);
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM tbl_servicios_campanasFormGen WHERE servicio_id = ?',
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener el servicioCampaña en específico:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener el servicioCampaña en específico' });
  } finally {
    connection.release();
  }
};


