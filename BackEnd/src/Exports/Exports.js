const { Sociodemographic, Almaverso } = require('../BDconfig');
// const Queries = require('../Sql/Queries').default;
const mysql = require('mysql2');
const express = require('express');
const Exports = express.Router();
const cors = require('cors');
const { authenticateToken } = require('../Auth/AuthMiddleware');

Exports.use(cors());

const pool = mysql.createPool(Sociodemographic);
const poolAlmaverso = mysql.createPool(Almaverso);



//END-POINT PARA EXPORTAR EL SOCIO COMPLETO
Exports.get('/API/EXPORTS/DATA/SOCIODEMOGRAPHY-COMPLETE/:mesSeleccionado/:Clientes', authenticateToken, (req, res) => {
    const mesSeleccionado = req.params.mesSeleccionado; // Debe ser una fecha en formato "YYYY-MM-DD"
    const Clientes = req.params.Clientes.split(',');

    // Verifica si se proporcionó un mes válido
    if (!mesSeleccionado) {
        res.status(400).send('El parámetro "mes" es obligatorio');
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }

        try {
            // Formatea la fecha seleccionada y obtén el primer y último día del mes
            const fechaSeleccionada = new Date(mesSeleccionado);
            const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
            const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

            // Formatea las fechas en el formato "YYYY-MM-DD"
            const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
            const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
            const sql = `SELECT * FROM T_Socio WHERE Fecha_Corte BETWEEN ? AND ? AND Cliente_Area IN (?)`;
            connection.query(sql, [fechaInicio, fechaFin, Clientes], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error en el servidor');
                } else if (result.length === 0) {
                    return res.status(404).send('No hay datos para este mes seleccionado');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    });
});

// ENN-POINT PARA EXPORTAR EL SOCIO ADMINISTRATIVO
Exports.get('/API/EXPORTS/DATA/SOCIODEMOGRAPHY-ADMIN/:mesSeleccionado/:Clientes', authenticateToken, (req, res) => {
    const mesSeleccionado = req.params.mesSeleccionado;
    const Clientes = req.params.Clientes.split(',');

    if (!mesSeleccionado) {
        res.status(400).send('El parámetro "mes" es obligatorio');
        return;
    }
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        try {
            const fechaSeleccionada = new Date(mesSeleccionado);
            const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
            const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

            // Formatea las fechas en el formato "YYYY-MM-DD"
            const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
            const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
            const getAllSocioAdmin = `SELECT 
                                        Nombres,
                                        Apellidos,
                                        Cargo,
                                        Cliente_Area,
                                        Programa_Area,
                                        Servicio,
                                        Sede,
                                        Etiquetas_Especiales_1,
                                        Etiquetas_Especiales_2,
                                        Etiquetas_Especiales_3,
                                        Fecha_Ingreso_Compania,
                                        Fecha_Ingreso_Formacion,
                                        Fecha_Ultima_Migracion,
                                        Usuario_Red,
                                        Plataforma_1,
                                        Usuario_Plataforma_1,
                                        Plataforma_2,
                                        Usuario_Plataforma_2,
                                        Plataforma_3,
                                        Usuario_Plataforma_3,
                                        Plataforma_4,
                                        Usuario_Plataforma_4,
                                        Plataforma_5,
                                        Usuario_Plataforma_5,
                                        Fecha_Nacimiento,
                                        Pais_Nacimiento,
                                        Departamento_Nacimiento,
                                        Ciudad_Nacimiento,
                                        Edad,
                                        Genero,
                                        Tipo_Documento,
                                        Estado_Civil,
                                        Etnia,
                                        Grupo_Sanguineo,
                                        Factor_Sanguineo,
                                        Centro_Costos,
                                        Tipo_De_Centro_Costos,
                                        Estado_Empleado,
                                        Tipo_de_Baja,
                                        Fecha_Aplicacion_Retiro,
                                        Fecha_Actualizacion_Retiro,
                                        Comentario_Retiro,
                                        Causal_Terminacion,
                                        Director_Area,
                                        Gerente_Responsable,
                                        Jefe,
                                        Coordinador,
                                        Jefe_Inmediato,
                                        Correo_Corporativo,
                                        Correo_Personal,
                                        Departamento_Residencia,
                                        Ciudad_Residencia,
                                        Zona_Residencia,
                                        Barrio_Residencia,
                                        Direccion_Residencia,
                                        Cubrimiento_Ruta,
                                        Telefono_Fijo_Principal,
                                        Telefono_Fijo_Secundario,
                                        Telefono_Celular_Principal,
                                        Telefono_Celular_Secundario,
                                        Contacto_Emergencia,
                                        Telefono_Contacto_Emergencia,
                                        Vehiculo_Propio,
                                        Tipo_Vehiculo,
                                        Computador_En_Casa,
                                        Internet_En_Casa,
                                        Velocidad_Internet,
                                        Sistema_Operativo_Computador,
                                        Memoria_RAM,
                                        Numero_Hijos,
                                        Numero_Personas_A_Cargo,
                                        Fondo_Pensiones,
                                        Fondo_Cesantias,
                                        Entidad_Salud,
                                        ARL,
                                        Caja_Compensacion_Familiar,
                                        Dias_Vacaciones,
                                        Estudio_Pregrado,
                                        Tipo_Estudio_Pregrado,
                                        Semestre_Pregrado,
                                        Estado_Estudio_Pregrado,
                                        Estudio_Pregrado_Secundario,
                                        Tipo_Estudio_Pregrado_Secundario,
                                        Semestre_Pregrado_Secundario,
                                        Estado_Estudio_Pregrado_Secundario,
                                        Estudio_Pregrado_Terciario,
                                        Tipo_Estudio_Pregrado_Terciario,
                                        Semestre_Pregrado_Terciario,
                                        Estado_Estudio_Pregrado_Terciario,
                                        Estudio_Posgrado,
                                        Tipo_Estudio_Posgrado,
                                        Semestre_Posgrado,
                                        Estado_Estudio_Posgrado,
                                        Estudio_Posgrado_Secundario,
                                        Tipo_Estudio_Posgrado_Secundario,
                                        Semestre_Posgrado_Secundario,
                                        Estado_Estudio_Posgrado_Secundario,
                                        Estudio_Posgrado_Terciario,
                                        Tipo_Estudio_Posgrado_Terciario,
                                        Semestre_Posgrado_Terciario,
                                        Estado_Estudio_Posgrado_Terciario,
                                        Estudio_Complementario,
                                        Tipo_Estudio_Complementario,
                                        Semestre_Complementario,
                                        Estado_Estudio_Complementario,
                                        Estudio_Complementario_Secundario,
                                        Tipo_Estudio_Complementario_Secundario,
                                        Semestre_Complementario_Secundario,
                                        Estado_Estudio_Complementario_Secundario,
                                        Estudio_Complementario_Terciario,
                                        Tipo_Estudio_Complementario_Terciario,
                                        Semestre_Complementario_Terciario,
                                        Estado_Estudio_Complementario_Terciario,
                                        Idioma_Nativo,
                                        Idioma_Secundario,
                                        Nivel_Idioma_Secundario,
                                        Idioma_Terciario,
                                        Nivel_Idioma_Terciario,
                                        Fecha_Actualizacion 
                                        FROM T_Socio 
                                        WHERE 
                                        Fecha_Corte BETWEEN ? AND ? 
                                        AND Cliente_Area IN (?) `;
            connection.query(getAllSocioAdmin, [fechaInicio, fechaFin, Clientes], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error en el servidor');
                } else if (result.length === 0) {
                    return res.status(404).send('No hay datos para este mes seleccionado');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            return res.status(500).send('Error en el servidor');
        }
    })
});


// END-POINT PARA EXPORTAR EL SOCIO OPERATIVO
Exports.get('/API/EXPORTS/DATA/SOCIODEMOGRAPHY-OP/:mesSeleccionado/:Clientes', authenticateToken, (req, res) => {
    const mesSeleccionado = req.params.mesSeleccionado;
    const Clientes = req.params.Clientes.split(',');

    if (!mesSeleccionado) {
        res.status(400).send('El parámetro "mes" es obligatorio');
        return;
    }
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        try {
            const fechaSeleccionada = new Date(mesSeleccionado);
            const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
            const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

            // Formatea las fechas en el formato "YYYY-MM-DD"
            const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
            const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
            const getAllSocioOP =
                `SELECT 
            Nombres,
            Apellidos,
            Cargo,
            Cliente_Area,
            Programa_Area,
            Servicio,
            Sede,
            Etiquetas_Especiales_1,
            Etiquetas_Especiales_2,
            Etiquetas_Especiales_3,
            Fecha_Ingreso_Compania,
            Fecha_Ingreso_Formacion,
            Fecha_Ultima_Migracion,
            Usuario_Red,
            Plataforma_1,
            Usuario_Plataforma_1,
            Plataforma_2,
            Usuario_Plataforma_2,
            Plataforma_3,
            Usuario_Plataforma_3,
            Plataforma_4,
            Usuario_Plataforma_4,
            Plataforma_5,
            Usuario_Plataforma_5,
            Fecha_Nacimiento,
            Edad,
            Genero,
            Grupo_Sanguineo,
            Factor_Sanguineo,
            Estado_Empleado,
            Tipo_de_Baja,
            Fecha_Aplicacion_Retiro,
            Fecha_Actualizacion_Retiro,
            Causal_Terminacion,
            Director_Area,
            Gerente_Responsable,
            Jefe,
            Coordinador,
            Jefe_Inmediato,
            Correo_Personal,
            Departamento_Residencia,
            Ciudad_Residencia,
            Zona_Residencia,
            Barrio_Residencia,
            Direccion_Residencia,
            Telefono_Fijo_Principal,
            Telefono_Fijo_Secundario,
            Telefono_Celular_Principal,
            Telefono_Celular_Secundario,
            Contacto_Emergencia,
            Telefono_Contacto_Emergencia,
            Vehiculo_Propio,
            Tipo_Vehiculo,
            Computador_En_Casa,
            Internet_En_Casa,
            Velocidad_Internet,
            Sistema_Operativo_Computador,
            Memoria_RAM,
            Numero_Hijos,
            Numero_Personas_A_Cargo,
            Dias_Vacaciones,
            Estudio_Pregrado,
            Tipo_Estudio_Pregrado,
            Semestre_Pregrado,
            Estado_Estudio_Pregrado,
            Estudio_Pregrado_Secundario,
            Tipo_Estudio_Pregrado_Secundario,
            Semestre_Pregrado_Secundario,
            Estado_Estudio_Pregrado_Secundario,
            Estudio_Pregrado_Terciario,
            Tipo_Estudio_Pregrado_Terciario,
            Semestre_Pregrado_Terciario,
            Estado_Estudio_Pregrado_Terciario,
            Estudio_Posgrado,
            Tipo_Estudio_Posgrado,
            Semestre_Posgrado,
            Estado_Estudio_Posgrado,
            Estudio_Posgrado_Secundario,
            Tipo_Estudio_Posgrado_Secundario,
            Semestre_Posgrado_Secundario,
            Estado_Estudio_Posgrado_Secundario,
            Estudio_Posgrado_Terciario,
            Tipo_Estudio_Posgrado_Terciario,
            Semestre_Posgrado_Terciario,
            Estado_Estudio_Posgrado_Terciario,
            Estudio_Complementario,
            Tipo_Estudio_Complementario,
            Semestre_Complementario,
            Estado_Estudio_Complementario,
            Estudio_Complementario_Secundario,
            Tipo_Estudio_Complementario_Secundario,
            Semestre_Complementario_Secundario,
            Estado_Estudio_Complementario_Secundario,
            Estudio_Complementario_Terciario,
            Tipo_Estudio_Complementario_Terciario,
            Semestre_Complementario_Terciario,
            Estado_Estudio_Complementario_Terciario,
            Idioma_Nativo,
            Idioma_Secundario,
            Nivel_Idioma_Secundario,
            Idioma_Terciario,
            Nivel_Idioma_Terciario,
            Fecha_Actualizacion FROM T_Socio 
            WHERE Fecha_Corte BETWEEN ? AND ? 
            AND Cliente_Area IN (?)`;
            connection.query(getAllSocioOP, [fechaInicio, fechaFin, Clientes], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error en el servidor');
                } else if (result.length === 0) {
                    return res.status(404).send('Not Found');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    })
});

// END-POINT PARA EXPORTAR EL FEELING
Exports.get('/API/EXPORTS/DATA/FEELING/:Clientes', authenticateToken, (req, res) => {
    const Clientes = req.params.Clientes.split(',');
    poolAlmaverso.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        try {
            const getFeelingData = `SELECT * FROM T_Feeling WHERE Cliente IN (?)`
            connection.query(getFeelingData, [Clientes], (err, result) => {
                connection.release();
                if (err) {
                    return res.status(500).send('Error en el servidor');
                } else if (result.length === 0) {
                    return res.status(404).send('Not Found');
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    })
});

module.exports = Exports;