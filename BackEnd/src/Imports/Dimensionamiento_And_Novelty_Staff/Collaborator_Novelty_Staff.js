const { AlmaversoSystemPoint, Almaverso } = require('../../BDconfig');
const mysql = require('mysql2');

const pool = mysql.createPool(AlmaversoSystemPoint);
const poolAlmaverso = mysql.createPool(Almaverso);
const callback = () => { };
function AuthomatlyInsertCollaborator_Novelty_Staff() {
    poolAlmaverso.getConnection((errAlmaverso, connectionAlmaverso) => {
        if (errAlmaverso) {
            return callback(errAlmaverso);
        }
        try {
            const value = new Date();
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
            const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
            const DataAtualizado = `${year}-${month}-${day}`;

            const sql = `SELECT Documento, Fecha, Novedad FROM T_Shifts_Staff WHERE Fecha >= '${DataAtualizado}'`;
            connectionAlmaverso.query(sql, (errQuery, result) => {
                connectionAlmaverso.release();
                if (errQuery) {
                    console.log(errQuery);
                    return callback(errQuery);
                } else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            callback(null);
                        }
                        try {
                            const value = new Date();
                            const DataAtualizado = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                            const values = result.map(row => [row.Documento, row.Fecha, row.Novedad, DataAtualizado]);
                            const sql = `INSERT INTO ColaboradorNovedades (CodigoColaborador, Data, Novedad, DataAtualizado) VALUES ? ON DUPLICATE KEY UPDATE CodigoColaborador = VALUES(CodigoColaborador), Data = VALUES(Data), Novedad = VALUES(Novedad), DataAtualizado = VALUES(DataAtualizado) `;
                            connection.query(sql, [values], (errInsert, resultInsert) => {
                                connection.release();
                                if (errInsert) {
                                    console.log(errInsert);
                                    return callback(errInsert);
                                }
                                console.log('Listo');
                                callback(null, resultInsert);
                            });

                        } catch (error) {
                            callback(error);
                        }
                    });
                }
            });
        } catch (error) {
            callback(error);
        }
    });
}

function scheduleAutomaticRejection() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    // const millisecondsUntilMidnight = 10000;

    setTimeout(() => {
        AuthomatlyInsertCollaborator_Novelty_Staff();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}
scheduleAutomaticRejection();

module.exports = AuthomatlyInsertCollaborator_Novelty_Staff;
