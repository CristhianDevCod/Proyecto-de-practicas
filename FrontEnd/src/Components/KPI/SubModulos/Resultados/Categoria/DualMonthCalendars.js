import React, { useState, useEffect, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './EstilosCalendario/stylesCaption.css'

// Componente React que utiliza react-day-picker
const DualMonthCalendars = ({ obtenerFechasFinal, fechaActual }) => {
    const [fechas, setFechas] = useState({
        habiles: [],
        siguiente: []
    });
    //Calcula el primer día del mes siguiente
    const mesAnterior = useMemo(
        () => new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1),
        [fechaActual]
    );

    useEffect(() => {
        const {
            arregloA: diasMesAnterior,
            arregloB: primeros10Dias
        } = obtenerFechasFinal(fechaActual);
        setFechas({
            primeros10Dias: primeros10Dias,
            mesAnterior: diasMesAnterior
        });
    }, [obtenerFechasFinal, fechaActual]);

    //Modifiers para el mes anterior
    const modifiersMesActual = { primeros10Dias: fechas.primeros10Dias };
    const modifiersStyleMesActual = { primeros10Dias: { backgroundColor: ' #52b202', color: 'white' } };

    //Modifiers para el presente mes
    const modifiersB = { mesAnterior: fechas.mesAnterior };
    const modifiersStyleB = { mesAnterior: { backgroundColor: ' #00bcd4', color: 'white' } };

    return (
        <>
            {/* Calendario del mes anterior Calendario A*/}
            <DayPicker
                components={{ Nav: () => null }}
                defaultMonth={mesAnterior}
                modifiers={modifiersB}
                modifiersStyles={modifiersStyleB}
            />

            {/* Calendario del mes actual Calendario B */}
            <DayPicker
                components={{ Nav: () => null }}
                defaultMonth={fechaActual}
                modifiers={modifiersMesActual}
                modifiersStyles={modifiersStyleMesActual}
            />
        </>
    );
};

export default DualMonthCalendars;