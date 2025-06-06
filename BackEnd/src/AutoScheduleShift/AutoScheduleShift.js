const { TESTNOTIFICATIONS, Sociodemographic, Almaverso } = require('../BDconfig');
const express = require('express');
const mysql = require('mysql2');
const AutoScheduleShift = express.Router();
const cors = require('cors');

AutoScheduleShift.use(cors());
AutoScheduleShift.use(express.json());
AutoScheduleShift.use(express.urlencoded({ extended: false }));

const Collaborator_Dimensioning_Staff = require('../Imports/Dimensionamiento_And_Novelty_Staff/Collaborator_Dimensioning_Staff');
const Collaborator_Novelty_Staff = require('../Imports/Dimensionamiento_And_Novelty_Staff/Collaborator_Novelty_Staff');

const pool = mysql.createPool(TESTNOTIFICATIONS);
const SociodemographicDB = mysql.createPool(Sociodemographic);
const AlmaversoDB = mysql.createPool(Almaverso);

const callback = () => { };

//obtiene los cargos a los cuales se les debe cargar el turno en caso tal no lo tenga 
function getAllJobPositions() {
    return new Promise((resolve, reject) => {
        AlmaversoDB.getConnection((error, connection) => {
            if (error) {
                reject(error);
            }
            try {
                const sql = `SELECT * FROM T_Shifts_Jobs`;
                connection.query(sql, (error, results) => {
                    connection.release();

                    if (error) {
                        connection.release();
                        reject(error);
                    } else {
                        const cargos = results.map((item) => item.Cargo);
                        resolve(cargos);
                    }
                });
            } catch (error) {
                connection.release();
            }
        });
    });
}

//obtiene el cargo normalizado
function getCargoNormalizado(cargo) {
    return new Promise((resolve, reject) => {
        AlmaversoDB.getConnection((error, connection) => {
            if (error) {
                reject(error);
            }

            const sql = `SELECT id_Cargo_Oficial, Cargo_Oficial FROM T_Jobs_Traductor WHERE Cargo_Normalizado = ?`;
            connection.query(sql, [cargo], (error, results) => {
                connection.release();
                if (error) {
                    connection.release();
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null); // Puedes manejar esto según tus necesidades
                } else {
                    const id_Cargo_Oficial = results.map((item) => item.id_Cargo_Oficial);
                    resolve(id_Cargo_Oficial);
                }
            });
        });
    });
}
//obtiene el cargo oficial
function getCargoOficial(id_Cargo_Oficial) {
    return new Promise((resolve, reject) => {
        AlmaversoDB.getConnection((error, connection) => {
            if (error) {
                reject(error);
            }

            const sql = `SELECT Cargo_Oficial FROM T_Jobs_Traductor WHERE id_Cargo_Oficial IN (?)`;

            connection.query(sql, [id_Cargo_Oficial], (error, results) => {
                connection.release();

                if (error) {
                    connection.release();
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    const cargoOficial = results.map((item) => item.Cargo_Oficial);
                    resolve(cargoOficial);
                }
            });
        });
    });
}


//OBTIENE TODOS LOS DOCUMENTOS DE LAS PERSONAS ACTIVAS 
function getActiveEmployeesByCargoOficial(cargoOficial) {
    return new Promise((resolve, reject) => {
        SociodemographicDB.getConnection((error, connection) => {
            if (error) {
                reject(error);
            }

            const sql = `SELECT Documento FROM T_Socio WHERE Estado_Empleado = 'Activo' AND Cargo IN (?) AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Estado_Empleado = 'Activo' AND Cargo IN (?))`;

            connection.query(sql, [cargoOficial, cargoOficial], (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve([]);
                } else {
                    const documentos = results.map(result => result.Documento);
                    resolve(documentos);
                }
            });
        });
    });
}

//Funcion para autocargar el turno 
async function autoScheduleShift(cedula) {
    try {
        const latestShiftDate = await getLatestShiftDate(cedula, 'T_Shifts' || 'T_Shifts_Staff');
        if (!latestShiftDate || new Date(latestShiftDate) <= new Date()) {
            const hasShiftForToday = await hasShiftForDate(cedula, new Date());

            if (!hasShiftForToday) {
                const cargo = await getEmployeePositionAsync(cedula);
                const hasShiftInTShifts = await hasShiftForDateInTable(cedula, new Date());

                if (!hasShiftInTShifts) {
                    const hasShiftInTShiftsStaff = await hasShiftForDateInTable(cedula, new Date());

                    if (!hasShiftInTShiftsStaff) {
                        AlmaversoDB.getConnection((err, connection) => {
                            if (err) {
                                callback(null, err);
                            }
                            try {
                                const currentDate = new Date();
                                const Fecha = currentDate.toISOString().split('T')[0];

                                const Horas_Laboradas = 10.0;
                                const Turno_Ini = '08:00:00';
                                const Turno_Fin = '18:00:00';
                                const Dialogo_Ini = '00:00:00';
                                const Dialogo_Fin = '00:00:00';
                                const Des_1_Ini = '00:00:00';
                                const Des_1_Fin = '00:00:00';
                                const Des_2_Ini = '00:00:00';
                                const Des_2_Fin = '00:00:00';
                                const Des_3_Ini = '00:00:00';
                                const Des_3_Fin = '00:00:00';
                                const Lunch_Ini = '00:00:00';
                                const Lunch_Fin = '00:00:00';
                                const Training_1_Ini = '00:00:00';
                                const Training_1_Fin = '00:00:00';
                                const Training_2_Ini = '00:00:00';
                                const Training_2_Fin = '00:00:00';
                                const Lac_Ini = '00:00:00';
                                const Lac_Fin = '00:00:00';

                                const sql = `INSERT INTO T_Shifts_Staff (Fecha, Documento, Servicio, Novedad, Horas_Laboradas, Turno_Ini, Turno_Fin, Dialogo_Ini, Dialogo_Fin, Des_1_Ini, Des_1_Fin, Des_2_Ini, Des_2_Fin, Des_3_Ini, Des_3_Fin, Lunch_Ini, Lunch_Fin, Training_2_Ini, Training_2_Fin, Training_1_Ini, Training_1_Fin, Lac_Ini, Lac_Fin) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                                const values = [Fecha, cedula, cargo, 'TUR', Horas_Laboradas, Turno_Ini, Turno_Fin, Dialogo_Ini, Dialogo_Fin, Des_1_Ini, Des_1_Fin, Des_2_Ini, Des_2_Fin, Des_3_Ini, Des_3_Fin, Lunch_Ini, Lunch_Fin, Training_2_Ini, Training_2_Fin, Training_1_Ini, Training_1_Fin, Lac_Ini, Lac_Fin];


                                connection.query(sql, values, (error, results) => {
                                    connection.release();
                                    if (error) {
                                        console.log(error);
                                        callback(null, error);
                                    } else if (results.length === 0) {
                                        console.log('no se puedo insertar turnos');
                                        callback(null);
                                    } else {
                                        console.log('Datos insertados correctamente');
                                        callback(results);
                                    }
                                });
                            } catch (error) {
                                console.log('Error 1', error);
                                callback(null);
                            }
                        });
                    } else {
                        console.log('Error 2');
                        callback(null);
                    }
                } else {
                    console.log('Error 3');
                    callback(null);
                }
            } else {
                console.log('Error 4');
                callback(null);
            }
        }
    } catch (error) {
        console.log('Error 5', error);
        callback(null);
    }
}

//verifica si ya ha algun turno en alguna de los dos tablas de turnos en este caso T_Shifts y T_Shifts_Staff
async function hasShiftForDateInTable(cedula, date, tableName) {
    return new Promise((resolve, reject) => {
        AlmaversoDB.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            try {
                const formattedDate = date.toISOString().split('T')[0];
                const sql = `SELECT COUNT(*) AS Count FROM T_Shifts_Staff WHERE Documento = ? AND Fecha = ?`;
                connection.query(sql, [cedula, formattedDate], (error, results) => {
                    connection.release();
                    if (error) {
                        reject(error);
                    } else if (results.length > 0) {
                        resolve(results[0].Count > 0);
                    } else {
                        resolve([]);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}


//funcion apra obtener la ultima fecha del ultimo turno que tenga el documento
async function getLatestShiftDate(cedula, tableName) {
    AlmaversoDB.getConnection((err, connection) => {

        if (err) {
            callback(null, err);
        }
        try {
            const sql = `SELECT MAX(Fecha) AS Fecha FROM T_Shifts_Staff WHERE Documento = ?`
            connection.query(sql, [cedula], (error, results) => {
                connection.release();
                if (error) {
                    connection.release();
                    callback(null, err);
                } else if (results.length === 0) {
                    callback(null);
                } else {
                    const Fecha = results.map((item) => item.Fecha);
                    return Fecha;
                }

            });

        } catch (error) {
            callback(null);
        }
    });

}


// Función para verificar si la persona ya tiene un turno programado para la fecha dada
async function hasShiftForDate(cedula, date) {
    try {
        AlmaversoDB.getConnection((err, connection) => {
            if (err) {
                callback(null, err);
            }
            try {
                const formattedDate = date.toISOString().split('T')[0];
                const sql = 'SELECT COUNT(*) AS Count FROM T_Shifts_Staff WHERE Documento = ? AND Fecha = ?';
                connection.query(sql, [cedula, formattedDate], (error, results) => {
                    connection.release();
                    if (error) {
                        callback(null);
                    } else if (results.length === 0) {
                        callback(null);
                    } else {
                        return results[0].Count > 0;
                    }

                });

            } catch (error) {
                callback(null);
            }
        });

    } catch (error) {
        callback(null);
    }
}
//función para obtener el cargo del empleado para poder usarlo en el carge del turno
async function getEmployeePositionAsync(cedula) {
    return new Promise((resolve, reject) => {
        SociodemographicDB.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            const sql = `SELECT Cargo FROM T_Socio WHERE Documento = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento = ?)`;
            connection.query(sql, [cedula, cedula], (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    const Cargo = results[0].Cargo;
                    resolve(Cargo);
                }
            });
        });
    });
}

// Función principal para ejecutar el proceso de auto programación a la medianoche
async function autoScheduleShiftAll() {
    try {
        const cargos = await getAllJobPositions();

        for (const cargo of cargos) {
            const id_Cargo_Oficial = await getCargoNormalizado(cargo);
            const cargoOficial = await getCargoOficial(id_Cargo_Oficial);

            if (cargoOficial) {
                const documentos = await getActiveEmployeesByCargoOficial(cargoOficial);

                for (const documento of documentos) {
                    await autoScheduleShift(documento);
                }
            }
        }
    } catch (error) {
        console.error('Error en las funciones y verificaciones para autocargar los turnos:', error);
        throw error;
    }
}





// Ejecutar la función a medianoche
function schedule() {
    const now = new Date();
    const currentDay = now.getDay(); // Obtén el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)

    // Verifica si el día actual es un día hábil (de lunes a viernes)
    if (currentDay >= 1 && currentDay <= 5) {
        console.log('Turnos programados para el día ');

        // Calcula el tiempo hasta la medianoche de hoy
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 0, 0, 0, 0);
        const millisecondsUntilMidnight = midnight - now;

        setTimeout(() => {
            autoScheduleShiftAll();
            schedule();
        }, millisecondsUntilMidnight);

        setTimeout(() => {
            Collaborator_Dimensioning_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            });
            Collaborator_Novelty_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            })
        }, 5000);

    } else if (currentDay === 6) {
        // Si es sábado, programa la ejecución para el próximo lunes a medianoche
        console.log('No se ejecutará durante el fin de semana.');

        // Calcula el tiempo hasta el próximo lunes a medianoche
        const daysUntilMonday = 1 + (1 - currentDay + 7) % 7;
        const millisecondsUntilMonday = daysUntilMonday * 24 * 60 * 60 * 1000;

        setTimeout(() => {
            autoScheduleShiftAll();
            schedule();
        }, millisecondsUntilMonday);
        setTimeout(() => {
            Collaborator_Dimensioning_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            });
            Collaborator_Novelty_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            })
        }, 5000);
    } else {
        // Si es domingo, programa la ejecución para la próxima medianoche
        console.log('No se ejecutará durante el fin de semana.');

        // Calcula el tiempo hasta la próxima medianoche
        const millisecondsUntilNextMidnight = 24 * 60 * 60 * 1000;

        setTimeout(() => {
            autoScheduleShiftAll();
            schedule();
        }, millisecondsUntilNextMidnight);
        setTimeout(() => {
            Collaborator_Dimensioning_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            });
            Collaborator_Novelty_Staff((err, result) => {
                if (err) {
                    callback(null, err);
                } else if (result.length === 0) {
                    callback(null);
                } else {
                    callback(null, result);
                }
            })
        }, 5000);
    }
}

// Ejecuta la función schedule para iniciar el proceso
schedule();






module.exports = AutoScheduleShift;
