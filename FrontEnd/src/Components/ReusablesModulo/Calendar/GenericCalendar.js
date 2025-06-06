import { useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './EstilosCalendario/stylesCaption.css'

// Componente React que utiliza react-day-picker
export const GenericCalendar = ({
    dateRange,
    currentDate
}) => {
    const { arregloA, arregloB } = dateRange(currentDate);

    // Determinar si currentDate está en la primera semana del mes (día 1 a 7)
    const isDifferentMonths = arregloA[arregloA.length - 1].getMonth() === arregloB[arregloB.length - 1].getMonth();

    //Calcular el mes anterior para el caso de dos calendarios
    const MonthArrB = useMemo(
        () => new Date(
            arregloB[arregloB.length - 1].getFullYear(),
            arregloB[arregloB.length - 1].getMonth(),
            arregloB[arregloB.length - 1].getDate(),),
        [arregloB]
    );
    // console.log('Arreglo A: ultimo dia', arregloA[arregloA.length - 1])
    console.log('Arreglo B: ', arregloB[arregloB.length - 1].getFullYear())

    // Se normaliza todas la fechas a medianoche (evita offsets)
    const normalize = (d) => {
        const dt = new Date(d);
        dt.setHours(0, 0, 0, 0);
        return dt;
    };

    //Modifiers para el arreglo A (semana actual)
    const modifiersA = { highlightedA: arregloA.map(normalize) };
    const modifiersStyleA = {
        highlightedA: {
            backgroundColor: '#52b202',
            color: 'white'
        }
    };

    //Modifiers para el arreglo B
    const modifiersB = { highlightedB: arregloB.map(normalize) };
    const modifiersStyleB = {
        highlightedB: {
            backgroundColor: '#00bcd4',
            color: 'white'
        },
    };

    // Caso general: un solo calendario mostrando ambos rangos
    return (
        <>
            <DayPicker
                numberOfMonths={isDifferentMonths ? 1 : 2}
                components={{ Nav: () => null }}
                defaultMonth={isDifferentMonths ? currentDate : MonthArrB}
                fixedWeeks
                modifiers={{ ...modifiersA, ...modifiersB }}
                modifiersStyles={{ ...modifiersStyleA, ...modifiersStyleB }}
            />
        </>
    );
};