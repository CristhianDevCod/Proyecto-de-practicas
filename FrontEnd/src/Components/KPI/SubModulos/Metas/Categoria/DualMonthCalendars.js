import React, { useState, useEffect, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './EstilosCalendario/stylesCaption.css'

// Componente React que utiliza react-day-picker
const DualMonthCalendars = ({ obtenerFechasFinal, fechaActual }) => {
    // const [fechasHabiles, setFechasHabiles] = useState([]);
    // const [fechasMesSiguiente, setFechasMesSiguiente] = useState([]);
    const [fechas, setFechas] = useState({ habiles: [], siguiente: [] });

    //Calcula el primer día del mes siguiente
    const mesSiguiente = useMemo(
        () => new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 1),
        [fechaActual]
    );

    useEffect(() => {
        // const startTime = performance.now();
        // Extrae los días obtenidos desde la función obtenerFechasFianl
        const { diasSiguienteMes, diasHabilesCargue } = obtenerFechasFinal(fechaActual);
        // setFechasHabiles(diasHabilesCargue);
        // setFechasMesSiguiente(diasSiguienteMes);
        setFechas({ habiles: diasHabilesCargue, siguiente: diasSiguienteMes });
        // const endTime = performance.now();
        // console.log(`Renderizado tomó ${endTime - startTime} ms`);
    }, [obtenerFechasFinal, fechaActual]);

    //Modifiers para calendario A: marcar en verde lso días hábiles
    const modifiersA = {
        habiles: fechas.habiles
    };
    const modifiersStyleA = {
        habiles: { backgroundColor: ' #52b202', color: 'white' }
    };

    //Modifiers para calendario B: marcar en amarillo los dias del siguiente mes
    const modifiersB = {
        siguiente: fechas.siguiente
    };
    const modifiersStyleB = {
        siguiente: { backgroundColor: ' #00bcd4', color: 'white' }
    };

    return (
        <>
            {/* Calendario del mes actual Calendario A */}
            <DayPicker
                components={{ Nav: () => null }}
                defaultMonth={fechaActual}
                modifiers={modifiersA}
                modifiersStyles={modifiersStyleA}
            />

            {/* Calendario del sigueinte mes Calendario B*/}
            <DayPicker
                components={{ Nav: () => null }}
                defaultMonth={mesSiguiente}
                modifiers={modifiersB}
                modifiersStyles={modifiersStyleB}
            />
        </>
    );
};

export default DualMonthCalendars;