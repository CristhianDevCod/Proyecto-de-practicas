const { AlmaversoSystemPoint, Almaverso } = require('../../BDconfig');
const mysql = require('mysql2');

const pool = mysql.createPool(AlmaversoSystemPoint);
const poolAlmaverso = mysql.createPool(Almaverso);

const callback = () => { };
//Funcion para insertar a la tabla de dimensionamineto los turnos transformados para que sea legible para  sistema de puntos 

function AuthomatlyInsertCollaborator_Dimensioning_Staff() {
    poolAlmaverso.getConnection((errAlmaverso, connectionAlmaverso) => {
        if (errAlmaverso) {
            callback(null)
        }
        const value = new Date();
        const year = value.getFullYear();
        const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
        const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
        const DataAtualizado = `${year}-${month}-${day}`;

        const selectDataFromShifts = `SELECT Documento, Fecha, Turno_Ini, Turno_Fin FROM T_Shifts_Staff WHERE DATE_FORMAT(Fecha, '%Y-%m-%d') >= '${DataAtualizado}'`;
        connectionAlmaverso.query(selectDataFromShifts, (errQuery, result) => {
            connectionAlmaverso.release();
            if (errQuery) {
                connection.release();
                return callback(errQuery);
            } else if (result.length === 0) {
                callback(null);
            } else {
                const values = result.map(row => {
                    const startHoursMinutes = row.Turno_Ini.split(':');
                    const startTotalMinutes = parseInt(startHoursMinutes[0]) * 60 + parseInt(startHoursMinutes[1]);

                    const endHoursMinutes = row.Turno_Fin.split(':');
                    const endTotalMinutes = parseInt(endHoursMinutes[0]) * 60 + parseInt(endHoursMinutes[1]);

                    let totalMinutes;
                    if (endTotalMinutes < startTotalMinutes) {
                        totalMinutes = endTotalMinutes + 1440 - startTotalMinutes;
                    } else {
                        totalMinutes = endTotalMinutes - startTotalMinutes;
                    }

                    return [row.Documento, row.Fecha, startTotalMinutes, totalMinutes, DataAtualizado];
                });
                pool.getConnection((err, connection) => {
                    if (err) {
                        callback(null);
                    }
                    try {
                        const insertDataCollaborator_Dimensioning = `INSERT INTO ColaboradorDimensionamento (CodigoColaborador, Data, Inicio, CargaHoraria, DataAtualizado) VALUES ? ON DUPLICATE KEY UPDATE CodigoColaborador = VALUES(CodigoColaborador), Data = VALUES(Data), Inicio = VALUES(Inicio), CargaHoraria = VALUES(CargaHoraria), DataAtualizado = VALUES(DataAtualizado)`;
                        connection.query(insertDataCollaborator_Dimensioning, [values], (errInsert, resultInsert) => {
                            connection.release();
                            if (errInsert) {
                                console.log(errInsert);
                                return callback(errInsert);
                            }
                            callback(null, resultInsert);
                            console.log('listo el pollo');
                        });
                    } catch (error) {
                        callback(error);
                    }
                });

            }
        });
    });
}


function scheduleAutomaticRejection() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    // const millisecondsUntilMidnight = 10000;

    setTimeout(() => {
        AuthomatlyInsertCollaborator_Dimensioning_Staff();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}
scheduleAutomaticRejection();

module.exports = AuthomatlyInsertCollaborator_Dimensioning_Staff;

