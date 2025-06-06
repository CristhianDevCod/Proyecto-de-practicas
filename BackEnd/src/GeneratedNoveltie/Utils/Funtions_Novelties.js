const mysql = require('mysql2/promise');
const { Almaverso, AlmaversoSystemPoint, Sociodemographic } = require('../../BDconfig');

const pool = mysql.createPool(Almaverso);
const poolPunto = mysql.createPool(AlmaversoSystemPoint);
const poolSocio = mysql.createPool(Sociodemographic);
//!===============================================================================
//!==🚧    FUNCIONES PARA OBTNER DATOS DE NOVEDADES PARA LOS DISTINTOS ROLES🚧 ==
//!===============================================================================

//?ENDPOINT PARA OBTENER EL LISTADO DE NOVEDADES
async function getAllDataNovelties() {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT * FROM T_Generate_Novelties`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ENDPOINT PARA OBTENER EL LISTADO DE SOLICITUDES DE NOVEDADES POR ASESOR
async function getDataForUser(Usuario_Red) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT 
                Id,
                Codigo,
                DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
                DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
                Documento,
                Usuario_Red,
                Nombre_Completo,
                Cliente_Area,
                Cargo,
                Servicio, 
                Tipo_Solicitud,
                DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
                DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
                Dias_Calendario,
                Dias_Laborales,
                Motivo,
                Time_Money,
                How_Long,
                Numero_Incapacidad,
                Numero_Diagnostico,
                Nombre_Diagnostico,
                DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
                Hora_Respuesta_Jefe_Inmediato,
                Aprobador_Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato,
                Observacion_Jefe_Inmediato,
                DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
                Hora_Respuesta_Planeacion,
                Aprobador_Planeacion,
                Documento_Aprobador_Planeacion,
                Estado_Marcado_Planeacion,
                Observacion_Planeacion,
                DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
                Hora_Respuesta_Gerente_Area,
                Aprobador_Gerente_Area,
                Documento_Aprobador_Gerente_Area,
                Estado_Marcado_Gerente_Area,
                Observacion_Gerente_Area,
                DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
                Hora_Aprobador_Gestion_Humana,
                Aprobador_Gestion_Humana,
                Documento_Aprobador_Gestion_Humana,
                Estado_Marcado_Gestion_Humana,
                Observacion_Gestion_Humana
            FROM T_Novelties_Notifications 
            WHERE Usuario_Red = ?
        `;
        const [result] = await connection.query(sql, [Usuario_Red]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS JEFES INMEDIATOS
async function getAllDataForBoss(Documento) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT  
            Id,
            Codigo,
            DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
            DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio, 
            Tipo_Solicitud,
            DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
            DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
            Dias_Calendario,
            Dias_Laborales,
            Motivo,

            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,
            
            DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
            Hora_Respuesta_Jefe_Inmediato,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Estado_Marcado_Jefe_Inmediato,
            Observacion_Jefe_Inmediato,
            DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
            Hora_Respuesta_Planeacion,
            Aprobador_Planeacion,
            Documento_Aprobador_Planeacion,
            Estado_Marcado_Planeacion,
            Observacion_Planeacion,
            DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
            Hora_Respuesta_Gerente_Area,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Estado_Marcado_Gerente_Area,
            Observacion_Gerente_Area,
            DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
            Fecha_Aprobador_Gestion_Humana,
            Hora_Aprobador_Gestion_Humana,
            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Estado_Marcado_Gestion_Humana,
            Observacion_Gestion_Humana
            FROM T_Novelties_Notifications 
            WHERE Documento_Jefe_Inmediato = ?`;
        const [result] = await connection.query(sql, [Documento]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.log('Error releasing connection:', releaseError);
            }
        }

    }
}

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS JEFES INMEDIATOS -LAS NOVEDADES PEDIDAS POR SUS ASESORES
async function getAllDataForBossViewNoveltiesForAdviser(Documento) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT  
            Id,
            Codigo,
            DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
            DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio, 
            Tipo_Solicitud,
            DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
            DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
            Dias_Calendario,
            Dias_Laborales,
            Motivo,
            
            DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
            Hora_Respuesta_Jefe_Inmediato,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Estado_Marcado_Jefe_Inmediato,
            Observacion_Jefe_Inmediato,
            DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
            Hora_Respuesta_Planeacion,
            Aprobador_Planeacion,
            Documento_Aprobador_Planeacion,
            Estado_Marcado_Planeacion,
            Observacion_Planeacion,
            DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
            Hora_Respuesta_Gerente_Area,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Estado_Marcado_Gerente_Area,
            Observacion_Gerente_Area,
            DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
            Fecha_Aprobador_Gestion_Humana,
            Hora_Aprobador_Gestion_Humana,
            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Estado_Marcado_Gestion_Humana,
            Observacion_Gestion_Humana
            FROM T_Novelties_Notifications WHERE Documento_Jefe_Inmediato = '${Documento}'`;
        const [result] = await connection.query(sql, [Documento]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS ANALISTA DE WORFORCE
async function getAllDataForWFM(Cliente) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT  
        Id,
        Codigo,
        DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
        DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
        Documento,
        Usuario_Red,
        Nombre_Completo,
        Cliente_Area,
        Cargo,
        Servicio, 
        Tipo_Solicitud,
        DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
        DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
        Dias_Calendario,
        Dias_Laborales,
        Motivo,

        Time_Money,
        How_Long,
        Numero_Incapacidad,
        Numero_Diagnostico,
        Nombre_Diagnostico,
        
        DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
        Hora_Respuesta_Jefe_Inmediato,
        Aprobador_Jefe_Inmediato,
        Documento_Aprobador_Jefe_Inmediato,
        Estado_Marcado_Jefe_Inmediato,
        Observacion_Jefe_Inmediato,
        DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
        Hora_Respuesta_Planeacion,
        Aprobador_Planeacion,
        Documento_Aprobador_Planeacion,
        Estado_Marcado_Planeacion,
        Observacion_Planeacion,
        DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
        Hora_Respuesta_Gerente_Area,
        Aprobador_Gerente_Area,
        Documento_Aprobador_Gerente_Area,
        Estado_Marcado_Gerente_Area,
        Observacion_Gerente_Area,
        DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
        Hora_Aprobador_Gestion_Humana,
        Aprobador_Gestion_Humana,
        Documento_Aprobador_Gestion_Humana,
        Estado_Marcado_Gestion_Humana,
        Observacion_Gestion_Humana
        FROM T_Novelties_Notifications WHERE 
        Cliente_Area IN (?)

        AND Fecha_Respuesta_Gerente_Area IS NOT NULL
        AND Hora_Respuesta_Gerente_Area IS NOT NULL
        AND Aprobador_Gerente_Area IS NOT NULL
        AND Documento_Aprobador_Gerente_Area IS NOT NULL
        AND Estado_Marcado_Gerente_Area IS NOT NULL  

        AND Fecha_Respuesta_Planeacion IS NULL
        AND Hora_Respuesta_Planeacion IS NULL
        AND Aprobador_Planeacion IS NULL
        AND Documento_Aprobador_Planeacion IS NULL
        AND Estado_Marcado_Planeacion IS NULL
        
        AND Fecha_Aprobador_Gestion_Humana IS NULL
        AND Hora_Aprobador_Gestion_Humana IS NULL
        AND Aprobador_Gestion_Humana IS NULL
        AND Documento_Aprobador_Gestion_Humana IS NULL
        AND Estado_Marcado_Gestion_Humana IS NULL 
        `;
        const [result] = await connection.query(sql, [Cliente]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS A LOS GERENTES
async function getAllDataForManager(Cliente) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT  
            Id,
            Codigo,
            DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
            DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio, 
            Tipo_Solicitud,
            DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
            DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
            Dias_Calendario,
            Dias_Laborales,
            Motivo,

            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,
            
            DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
            Hora_Respuesta_Jefe_Inmediato,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Estado_Marcado_Jefe_Inmediato,
            Observacion_Jefe_Inmediato,
            DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
            Hora_Respuesta_Planeacion,
            Aprobador_Planeacion,
            Documento_Aprobador_Planeacion,
            Estado_Marcado_Planeacion,
            Observacion_Planeacion,
            DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
            Hora_Respuesta_Gerente_Area,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Estado_Marcado_Gerente_Area,
            Observacion_Gerente_Area,
            DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
            Hora_Aprobador_Gestion_Humana,
            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Estado_Marcado_Gestion_Humana,
            Observacion_Gestion_Humana
            FROM T_Novelties_Notifications WHERE 

            Cliente_Area IN (?)

            AND Fecha_Respuesta_Jefe_Inmediato IS NOT NULL
            AND Hora_Respuesta_Planeacion IS NOT NULL
            AND Aprobador_Planeacion IS NOT NULL
            AND Documento_Aprobador_Planeacion IS NOT NULL
            AND Estado_Marcado_Planeacion = 'Aceptado'

            AND Fecha_Respuesta_Gerente_Area IS NULL
            AND Hora_Respuesta_Gerente_Area IS NULL
            AND Aprobador_Gerente_Area IS NULL
            AND Documento_Aprobador_Gerente_Area IS NULL
            AND Estado_Marcado_Gerente_Area IS NULL  
            
            AND Fecha_Aprobador_Gestion_Humana IS NULL
            AND Hora_Aprobador_Gestion_Humana IS NULL
            AND Aprobador_Gestion_Humana IS NULL
            AND Documento_Aprobador_Gestion_Humana IS NULL
            AND Estado_Marcado_Gestion_Humana IS NULL 
            `;
        const [result] = await connection.query(sql, [Cliente]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ENDPOINT PARA OBTENER EL LISTODO DE NOVEDADES PARA MOSTRARSELOS DE NOMINA
async function getAllDataForNomina(Cliente) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT  
            Id,
            Codigo,
            DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
            DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio, 
            Tipo_Solicitud,
            DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
            DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
            Dias_Calendario,
            Dias_Laborales,
            Motivo,

            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,
            
            DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
            Hora_Respuesta_Jefe_Inmediato,
            Aprobador_Jefe_Inmediato,
            Documento_Aprobador_Jefe_Inmediato,
            Estado_Marcado_Jefe_Inmediato,
            Observacion_Jefe_Inmediato,
            DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
            Hora_Respuesta_Planeacion,
            Aprobador_Planeacion,
            Documento_Aprobador_Planeacion,
            Estado_Marcado_Planeacion,
            Observacion_Planeacion,
            DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
            Hora_Respuesta_Gerente_Area,
            Aprobador_Gerente_Area,
            Documento_Aprobador_Gerente_Area,
            Estado_Marcado_Gerente_Area,
            Observacion_Gerente_Area,
            DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
            Hora_Aprobador_Gestion_Humana,
            Aprobador_Gestion_Humana,
            Documento_Aprobador_Gestion_Humana,
            Estado_Marcado_Gestion_Humana,
            Observacion_Gestion_Humana
            FROM T_Novelties_Notifications WHERE 

            AND Fecha_Respuesta_Gerente_Area IS NOT NULL
            AND Hora_Respuesta_Gerente_Area IS NOT NULL
            AND Aprobador_Gerente_Area IS NOT NULL
            AND Documento_Aprobador_Gerente_Area IS NOT NULL
            AND Estado_Marcado_Gerente_Area = 'Aceptado'

            AND Fecha_Respuesta_Planeacion IS NOT NULL
            AND Hora_Respuesta_Planeacion IS NOT NULL
            AND Aprobador_Planeacion IS NOT NULL
            AND Documento_Aprobador_Planeacion IS NOT NULL
            AND Estado_Marcado_Planeacion = 'Aceptado'
            
            AND Fecha_Aprobador_Gestion_Humana IS NULL
            AND Hora_Aprobador_Gestion_Humana IS NULL
            AND Aprobador_Gestion_Humana IS NULL
            AND Documento_Aprobador_Gestion_Humana IS NULL
            AND Estado_Marcado_Gestion_Humana IS NULL 
            AND Cliente_Area IN (?)
            `;
        const [result] = await connection.query(sql, [Cliente]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}


//!===============================================================================
//!==🚧    FUNCIONES DE EXPORTACIONES DE NOVEDADES PARA JEFE, NOMINA, WFM🚧    ==
//!===============================================================================

//?ENDPOINT PARA EXPORTAR LAS NOVEDADES POR EL JEFEINMEDIATO
async function ExportDataNoveltieBoss(monthSeleted, Documento) {
    let connection;
    try {
        connection = await pool.getConnection();
        const fechaSeleccionada = new Date(monthSeleted);
        const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
        const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

        // Formatea las fechas en el formato "YYYY-MM-DD"
        const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
        const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
        const sql = `SELECT 
        Id,
        Codigo,
        DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
        DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
        Usuario_Red, 
        Nombre_Completo, 
        Cliente_Area, 
        Cargo, 
        Servicio, 
        Tipo_Solicitud, 
        Dias_Calendario, 
        Dias_Laborales,
        Motivo,
        Time_Money,
        How_Long,
        Numero_Incapacidad,
        Numero_Diagnostico,
        Nombre_Diagnostico,
        DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
        Hora_Respuesta_Jefe_Inmediato,
        Aprobador_Jefe_Inmediato,
        Estado_Marcado_Jefe_Inmediato,
        DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
        Hora_Respuesta_Planeacion,
        Aprobador_Planeacion,
        Estado_Marcado_Planeacion,
        DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
        Hora_Respuesta_Gerente_Area,
        Aprobador_Gerente_Area,
        Estado_Marcado_Gerente_Area,
        DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
        Hora_Aprobador_Gestion_Humana,
        Aprobador_Gestion_Humana,
        Estado_Marcado_Gestion_Humana

        FROM T_Novelties_Notifications WHERE Fecha_Solicitud BETWEEN ? AND ? AND Documento_Jefe_Inmediato = ?`
        const [result] = await connection.query(sql, [fechaInicio, fechaFin, Documento]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ENDPOINT PARA EXPORTAR LAS NOVEDADES POR LOS DE NOMINA
async function ExportDataNoveltieNomina(monthSeleted) {
    let connection;
    try {
        connection = await pool.getConnection();
        const fechaSeleccionada = new Date(monthSeleted);
        const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
        const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

        // Formatea las fechas en el formato "YYYY-MM-DD"
        const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
        const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
        const sql = `SELECT 
            Id,
            Codigo,
            DATE_FORMAT(Fecha_Solicitud, '%Y-%m-%d') as Fecha_Solicitud,
            DATE_FORMAT(Hora_Solicitud, '%H:%i:%s') as Hora_Solicitud,
            Documento,
            Usuario_Red,
            Nombre_Completo, 
            Cliente_Area, 
            Cargo, 
            Servicio, 
            Tipo_Solicitud, 
            Dias_Calendario, 
            Dias_Laborales,

            DATE_FORMAT(Fecha_Inicio_Novedad, '%Y-%m-%d') as Fecha_Inicio_Novedad,
            DATE_FORMAT(Fecha_Fin_Novedad, '%Y-%m-%d') as Fecha_Fin_Novedad,
            
            Motivo,
            Time_Money,
            How_Long,
            Numero_Incapacidad,
            Numero_Diagnostico,
            Nombre_Diagnostico,
            DATE_FORMAT(Fecha_Respuesta_Jefe_Inmediato, '%Y-%m-%d') as Fecha_Respuesta_Jefe_Inmediato,
            Hora_Respuesta_Jefe_Inmediato,
            Aprobador_Jefe_Inmediato,
            Estado_Marcado_Jefe_Inmediato,
            DATE_FORMAT(Fecha_Respuesta_Planeacion, '%Y-%m-%d') as Fecha_Respuesta_Planeacion,
            Hora_Respuesta_Planeacion,
            Aprobador_Planeacion,
            Estado_Marcado_Planeacion,
            DATE_FORMAT(Fecha_Respuesta_Gerente_Area, '%Y-%m-%d') as Fecha_Respuesta_Gerente_Area,
            Hora_Respuesta_Gerente_Area,
            Aprobador_Gerente_Area,
            Estado_Marcado_Gerente_Area,
            DATE_FORMAT(Fecha_Aprobador_Gestion_Humana, '%Y-%m-%d') as Fecha_Aprobador_Gestion_Humana,
            Hora_Aprobador_Gestion_Humana,
            Aprobador_Gestion_Humana,
            Estado_Marcado_Gestion_Humana

            FROM T_Novelties_Notifications 
            WHERE Fecha_Solicitud BETWEEN '${fechaInicio}' AND '${fechaFin}'`
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}


//?ENDPOINT PARA EXPORTAR LAS NOVEDADES POR LOS DE WFM
async function ExportDataNoveltieWFM(monthSeleted) {
    let connection;
    try {
        connection = await pool.getConnection();
        const fechaSeleccionada = new Date(monthSeleted);
        const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
        const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 2, 0);

        // Formatea las fechas en el formato "YYYY-MM-DD"
        const fechaInicio = primerDiaDelMes.toISOString().split('T')[0];
        const fechaFin = ultimoDiaDelMes.toISOString().split('T')[0];
        const sql = `SELECT * FROM T_Novelties_Notifications WHERE Fecha_Solicitud BETWEEN ? AND ?`;
        const [result] = await connection.query(sql, [fechaInicio, fechaFin]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}


//!===============================================================================
//!==🚧       FUNCIONES PARA OBTENER EL TAMAÑO DE LAS SOLICITUDES 🚧           ==
//!===============================================================================
//?EN CURSO
async function RequestNoveltiePending(Usuario_Red) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT * FROM T_Novelties_Notifications WHERE 
            Estado_Marcado_Jefe_Inmediato IS NULL AND
            Estado_Marcado_Planeacion IS NULL AND
            Estado_Marcado_Gerente_Area IS NULL AND
            Estado_Marcado_Gestion_Humana IS NULL 
            AND Usuario_Red = '${Usuario_Red}'

            OR 

            Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
            Estado_Marcado_Planeacion IS NULL AND
            Estado_Marcado_Gerente_Area IS NULL AND
            Estado_Marcado_Gestion_Humana IS NULL 
            AND Usuario_Red = '${Usuario_Red}'
            
            OR

            Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
            Estado_Marcado_Planeacion = 'Aceptado' AND
            Estado_Marcado_Gerente_Area IS NULL AND
            Estado_Marcado_Gestion_Humana IS NULL
            AND Usuario_Red = '${Usuario_Red}'
    
            OR

            Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
            Estado_Marcado_Planeacion = 'Aceptado' AND
            Estado_Marcado_Gerente_Area = 'Aceptado' AND
            Estado_Marcado_Gestion_Humana IS NULL

            AND Usuario_Red = '${Usuario_Red}'
            `;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?APROBADOS
async function RequestNoveltieAccepts(Usuario_Red) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT * FROM T_Novelties_Notifications WHERE  
        Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
        Estado_Marcado_Planeacion = 'Aceptado' AND
        Estado_Marcado_Gerente_Area = 'Aceptado' AND
        Estado_Marcado_Gestion_Humana = 'Aceptado' AND Usuario_Red = '${Usuario_Red}'`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?RECHAZADOS
async function RequestNoveltieRejects(Usuario_Red) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `SELECT * FROM T_Novelties_Notifications WHERE  
        Estado_Marcado_Jefe_Inmediato = 'Rechazado' AND
        Estado_Marcado_Planeacion IS NULL AND
        Estado_Marcado_Gerente_Area IS NULL AND
        Estado_Marcado_Gestion_Humana IS NULL AND
        Usuario_Red = '${Usuario_Red}'
        
        OR 
        
        Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
        Estado_Marcado_Planeacion = 'Rechazado' AND
        Estado_Marcado_Gerente_Area IS NULL AND
        Estado_Marcado_Gestion_Humana IS NULL AND
        Usuario_Red = '${Usuario_Red}'
        
        OR
        
        Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
        Estado_Marcado_Planeacion = 'Aceptado' AND
        Estado_Marcado_Gerente_Area = 'Rechazado' AND
        Estado_Marcado_Gestion_Humana IS NULL AND
        Usuario_Red = '${Usuario_Red}'
        
        OR
        
        Estado_Marcado_Jefe_Inmediato = 'Aceptado' AND
        Estado_Marcado_Planeacion = 'Aceptado' AND
        Estado_Marcado_Gerente_Area = 'Aceptado' AND
        Estado_Marcado_Gestion_Humana = 'Rechazado' AND
        Usuario_Red = '${Usuario_Red}'
        
        `;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}


//!===============================================================================
//!==🚧       FUNCION PARA QUE EL SUPER PUEDE PEDIR NOVEDAD POR ASESOR  🚧     ==
//!===============================================================================
//?OBTIENE EL LISTADO DE ASESORES EL CUAL EL JEFE INMEDIATO ESTA A CARGO PARA GENERAR UNA SOLICITUD POR EL SUPER EN CASO TAL EL ASESOR NO ESTA 
async function ListAdviserForSupervisor(Documento) {
    let connection;
    try {
        connection = await poolSocio.getConnection();
        const sql = `SELECT Documento, Nombres, Apellidos, Cargo, Cliente_Area, Servicio, Usuario_Red, Estado_Empleado FROM T_Socio WHERE 
        Documento_Jefe_Inmediato = ? AND 
        Estado_Empleado = 'Activo' AND
        Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento_Jefe_Inmediato = ? AND Estado_Empleado = 'Activo')`;
        const [result] = await connection.query(sql, [Documento, Documento]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}


//!===============================================================================
//!==🚧       FUNCION POST PARA ACTUALIZAR TURNOS O NOVEDADES 🚧               ==
//!===============================================================================

//?ACTUALIZA LOS TURNOS SI NÓMINA A ACEPTADO LAS NOVEDADES
async function UpdateShiftsForNominaAccepts(documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud, Servicio) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `UPDATE T_Shifts_Staff SET 
        Des_1_Fin = '00:00:00',
        Des_1_Ini = '00:00:00',
        Des_2_Fin = '00:00:00',
        Des_2_Ini = '00:00:00',
        Des_3_Fin = '00:00:00',
        Des_3_Ini = '00:00:00',
        Dialogo_Fin = '00:00:00',
        Dialogo_Ini = '00:00:00',
        Horas_Laboradas = '0',
        Lac_Fin = '00:00:00',
        Lac_Ini = '00:00:00',
        Lunch_Fin = '00:00:00',
        Lunch_Ini = '00:00:00',
        Novedad = '${Tipo_Solicitud}',
        Servicio = '${Servicio}',
        Training_1_Fin = '00:00:00',
        Training_1_Ini = '00:00:00',
        Training_2_Fin = '00:00:00',
        Training_2_Ini = '00:00:00',
        Turno_Fin = '00:00:00',
        Turno_Ini = '00:00:00' WHERE Documento = '${documento}' AND Fecha BETWEEN '${Fecha_Inicio_Novedad}' AND '${Fecha_Fin_Novedad}'`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ACTUALIZA LOS TURNOS SI NÓMINA A ACEPTADO LAS NOVEDADES EN CASO LA NOVEDAD SEA ASIL TOMA O VAC O LICENCIA NO REMUNERADA 
async function UpdateShiftsForNominaAISL(documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Novedad, Servicio) {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `UPDATE T_Shifts_Staff SET 
        Des_1_Fin = '00:00:00',
        Des_1_Ini = '00:00:00',
        Des_2_Fin = '00:00:00',
        Des_2_Ini = '00:00:00',
        Des_3_Fin = '00:00:00',
        Des_3_Ini = '00:00:00',
        Dialogo_Fin = '00:00:00',
        Dialogo_Ini = '00:00:00',
        Horas_Laboradas = '0',
        Lac_Fin = '00:00:00',
        Lac_Ini = '00:00:00',
        Lunch_Fin = '00:00:00',
        Lunch_Ini = '00:00:00',
        Novedad = '${Tipo_Novedad}',
        Servicio = '${Servicio}',
        Training_1_Fin = '00:00:00',
        Training_1_Ini = '00:00:00',
        Training_2_Fin = '00:00:00',
        Training_2_Ini = '00:00:00',
        Turno_Fin = '00:00:00',
        Turno_Ini = '00:00:00' WHERE Documento = '${documento}' AND Fecha BETWEEN '${Fecha_Inicio_Novedad}' AND '${Fecha_Fin_Novedad}'`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}

//?ACTUALIZA LOS TURNOS SI NÓMINA A ACEPTADO LAS NOVEDADES EN CASO LA NOVEDAD SEA ASIL TOMA O VAC O LICENCIA NO REMUNERADA 
async function UpdateShiftsForNomina(documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, novedad_ausencia, Fecha) {
    let connection;
    try {
        connection = await poolPunto.getConnection();
        const sql = `UPDATE BI_WFM.AL_NOVEDADES_NOMINA SET 
        novedad_ausencia = '${novedad_ausencia}', 
        observacion_ticket = '${novedad_ausencia} / ${Fecha}' 
        WHERE id_cedula = '${documento}' AND 
        fecha BETWEEN '${Fecha_Inicio_Novedad}' AND 
        '${Fecha_Fin_Novedad}' AND novedad = 'TUR'`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Error releasing connection:', releaseError);
            }
        }
    }
}




module.exports = {
    //!===============================================================================
    getDataForUser,
    getAllDataNovelties,
    getAllDataForBoss,
    getAllDataForBossViewNoveltiesForAdviser,
    getAllDataForWFM,
    getAllDataForManager,
    getAllDataForNomina,
    //!===============================================================================
    ExportDataNoveltieBoss,
    ExportDataNoveltieNomina,
    ExportDataNoveltieWFM,
    //!===============================================================================
    RequestNoveltiePending,
    RequestNoveltieAccepts,
    RequestNoveltieRejects,
    //!===============================================================================
    ListAdviserForSupervisor,
    //!===============================================================================
    UpdateShiftsForNominaAccepts,
    UpdateShiftsForNominaAISL,
    UpdateShiftsForNomina
};
