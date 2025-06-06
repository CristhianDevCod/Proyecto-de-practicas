const { AlmaversoSystemPoint, Almaverso } = require('../../BDconfig');
const express = require('express');
const AuthomathlyUpdateTables = express();
const mysql = require('mysql2');
const cors = require('cors');

AuthomathlyUpdateTables.use(cors());
AuthomathlyUpdateTables.use(express.json());
AuthomathlyUpdateTables.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(AlmaversoSystemPoint);
const poolAlmaverso = mysql.createPool(Almaverso);

let lastShiftsData = [];
const callback = () => { };

// Función para verificar cambios en T_Shifts y actualizar sistema de puntos y sus novedades
const checkForChangesAndUpdate = async () => {
    try {
        const value = new Date();
        const year = value.getFullYear();
        const month = (value.getMonth() + 1).toString().padStart(2, '0'); // Añade cero al mes si es necesario
        const day = value.getDate().toString().padStart(2, '0'); // Añade cero al día si es necesario
        const Fecha = `${year}-${month}-${day}`;

        const selectQuery = `SELECT Documento, Fecha, Turno_Ini, Turno_Fin, Novedad FROM T_Shifts WHERE Fecha = '${Fecha}'`;
        const [newShiftsData] = await poolAlmaverso.promise().query(selectQuery);
        if (!arraysAreEqual(lastShiftsData, newShiftsData)) {
            // Hay cambios, actualiza las otras tablas
            await updateOtherTables(newShiftsData);
            lastShiftsData = newShiftsData;
            console.log(lastShiftsData);
        } else {
            callback('No se detectaron cambios en T_Shifts.');
        }
    } catch (error) {
        callback('Error al verificar cambios en T_Shifts:', error);
    }
};

// Compara dos arrays para verificar si son iguales
const arraysAreEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const updateOtherTables = async (shiftsData) => {
    try {
        for (const row of shiftsData) {
            const value = new Date();
            const DataAtualizado = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            const { Documento, Fecha, Turno_Ini, Turno_Fin, Novedad } = row;
            const startHoursMinutes = Turno_Ini.split(':');
            const startTotalMinutes = parseInt(startHoursMinutes[0]) * 60 + parseInt(startHoursMinutes[1]);

            const endHoursMinutes = Turno_Fin.split(':');
            const endTotalMinutes = parseInt(endHoursMinutes[0]) * 60 + parseInt(endHoursMinutes[1]);

            let totalMinutes;
            if (endTotalMinutes < startTotalMinutes) {
                totalMinutes = endTotalMinutes + 1440 - startTotalMinutes;
            } else {
                totalMinutes = endTotalMinutes - startTotalMinutes;
            }
            // Lógica para actualizar T_Collaborator_Dimensioning
            if (startTotalMinutes !== row.Turno_Ini || endTotalMinutes !== row.Turno_Fin) {
                // Actualiza solo si hay cambios
                const updateDimensioningQuery = `UPDATE ColaboradorDimensionamento SET CargaHoraria = ?, Data = ?, DataAtualizado = ?, Inicio = ? WHERE CodigoColaborador = '${Documento}' And Data = '${Fecha}'`;
                await pool.promise().query(updateDimensioningQuery, [totalMinutes, Fecha, DataAtualizado, startTotalMinutes, Documento]);

                console.log(`Filas actualizadas en otras tablas para Documento ${Documento}`);
                const updateNoveltyQuery = `UPDATE ColaboradorNovedades SET Data = ?, Novedad = ?, DataAtualizado = ? WHERE CodigoColaborador = '${Documento}' And Data = '${Fecha}'`;
                await pool.promise().query(updateNoveltyQuery, [Fecha, Novedad, DataAtualizado, Documento]);
            }
        }
    } catch (error) {
        callback('Error al actualizar otras tablas:', error);
    }
};

function scheduleAutomaticRejection() {
    const now = new Date();
    const millisecondsUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    //const millisecondsUntilMidnight = 10000;

    setTimeout(() => {
        checkForChangesAndUpdate();
        scheduleAutomaticRejection();
    }, millisecondsUntilMidnight);
}
scheduleAutomaticRejection();

module.exports = AuthomathlyUpdateTables;
