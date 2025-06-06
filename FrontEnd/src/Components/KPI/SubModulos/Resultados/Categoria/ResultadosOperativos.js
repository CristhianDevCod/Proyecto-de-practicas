import { useContext, useEffect, useRef, useState } from 'react';
import {
    GETALLRESULTADOSOPERATIVOS,
    INSERTUPDATERESULTADOSOPERATIVOS
} from '../../../../../API/API.js';
import Alert from '@mui/material/Alert';
import * as XLSX from 'xlsx';
import { Typography } from '../../../../../Exports-Modules/Exports.js';
import { UserProfileContext } from '../../../../../Context/ProfileContex.js';
import { GenericCalendar } from '../../../../ReusablesModulo/Calendar/GenericCalendar.js';

// Obtener dos arreglos de semana actual y previa
function obtenerRangoSemanal(fechaActual) {
    // Clonamos para no mutar
    const date = new Date(fechaActual);

    // 1) Lunes de la semana actual
    const dow = date.getDay();                       // 0=dom ... 1=lun ... 6=sáb
    const diffToMon = (dow + 6) % 7;                 // cuántos días restar para llegar al lunes
    const monday = new Date(date);
    monday.setDate(date.getDate() - diffToMon);

    // 2) arregloA = lunes a viernes
    const arregloA = [];
    for (let i = 0; i < 5; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        arregloA.push(d);
    }

    // 3) Domingo de la misma semana (un día antes del lunes)
    const sundayThis = new Date(monday);
    sundayThis.setDate(monday.getDate() - 1);

    // 4) Domingo de la semana anterior
    const prevSunday = new Date(sundayThis);
    prevSunday.setDate(sundayThis.getDate() - 7);

    // 5) arregloB: desde sundayThis → prevSunday (exclusive), solo mes actual
    const arregloB = [];
    // const month = date.getMonth();
    let cursor = new Date(sundayThis);
    while (cursor > prevSunday) {
        arregloB.push(new Date(cursor));
        cursor.setDate(cursor.getDate() - 1);
    }

    return { arregloA, arregloB };
}

//Fecha para cargue de datos
function fechaFormateadaBBDD(date) {
    let year = date.getFullYear();
    //valor entre 1 y 12
    let monthNum = date.getMonth();
    let day = date.getDate();
    //Si el mes es diciembre, ajustamos para el siguente mes
    if (monthNum === 12) {
        monthNum = 1;
        year++;
    } else {
        monthNum++;
    }

    const month = String(monthNum).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
}

// Obtener string del mes
const obtenerTextoMes = (fecha) => {
    return fecha.toLocaleDateString('es-CO', { month: 'long' });
}

export const ResultadosOperativos = ({ api, contextHolder }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fechaActual] = useState(new Date(2025, 4, 2)); //Cambiar para pruebas
    const [noEsHabil, setNoEsHabil] = useState(false);
    const [textoSemanaAnterior, setTextoSemanaAnterior] = useState('')
    const fileInputRef = useRef(null);
    const { fullName } = useContext(UserProfileContext);
    const nombreUsuario = fullName[0].Usuario_Red;
    const [ultimoDiaCargue, setUltimoDiaCargue] = useState(Date)

    const noEsDiaHabil = `Hoy ${fechaActual.getDate()} de ${obtenerTextoMes(fechaActual)} no puedes cargar datos, debido a que no es un día hábil`;

    //fecha de cargue - pruebas
    let mesActualRestablecido = new Date(2025, fechaActual.getMonth(), 1);
    const mesActualBBDD = fechaFormateadaBBDD(mesActualRestablecido)

    useEffect(() => {
        const { arregloB: diasSemanaPasada, arregloA: diasHabilesCargue } = obtenerRangoSemanal(fechaActual);
        //Comprueba si hoy es un dia habil
        const hoyEsHabil = diasHabilesCargue.some(diaHabil => {
            return diaHabil.getTime() === fechaActual.getTime()
        })

        const semanaAnterior = obtenerTextoMes(diasSemanaPasada[0]);
        setNoEsHabil(!hoyEsHabil);
        setTextoSemanaAnterior(semanaAnterior);
        // setUltimoDiaCargue(diasSemanaPasada[diasSemanaPasada.length - 1]);
        setUltimoDiaCargue(diasSemanaPasada[0]);
    }, [fechaActual]);

    //Función para descargar Excel
    const handleDownloadExcel = async () => {
        setIsLoading(true);
        try {
            // Llamada al endpoint y se pasa la fecha filtro 
            const response = await GETALLRESULTADOSOPERATIVOS(mesActualBBDD);
            // console.log(`Respuesta del endpoint: `, response);

            if (!response || !response.data) {
                api.error({
                    message: 'Error',
                    description: 'No se encontraron datos para la fecha especificada.'
                });
                return;
            }

            //Creamos el libro (workbook) y la hoja (worksheet)
            const wb = XLSX.utils.book_new();
            //Si deseas definir un encabezado fijo, puedes hacerlo así:
            const header = ['Fecha', 'ID KPI', 'Nombre KPI', 'ID Servicio', 'Nombre Servicio', 'Resultado'];
            const dataRows = [header];
            response.data.forEach(item => {
                // Opcionalmente formateamos la fecha (por ejemplo, a "YYYY-MM-DD")
                // const formattedDate = mesActualBBDD.toLocaleDateString('es-CO');
                const formattedDate = ultimoDiaCargue.toLocaleDateString();
                dataRows.push([
                    formattedDate,
                    item.kpi_id,
                    item.nombre_kpi,
                    item.servicio_id,
                    item.nombre_servicio,
                    item.resultado
                ]);
            });

            //Convertimos el array de arrays en una hoja
            const ws = XLSX.utils.aoa_to_sheet(dataRows);
            XLSX.utils.book_append_sheet(wb, ws, 'KPIS');

            //Escribimos el archivo
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Metas_KPI_${textoSemanaAnterior}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Notificar éxito
            api.success({
                message: 'Descarga exitosa',
                description: 'El archivo Excel se ha descargado correctamente.'
            });
        } catch (error) {
            console.error('Error al descargar el Excel:', error);
            api.error({
                message: 'Error',
                description: 'Ocurrió un error al descargar el Excel.'
            });
        } finally {
            setIsLoading(false);
        }
    }

    //Cargar y procesar el archivo Excel
    const handleExcelUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                // Iniciar el estado de carga
                setIsLoading(true)
                //Leemos el archivo en formato binario
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                //Convertimos la hoja a un array de arrays, iniciando en la segunda fila (ship header)
                // la opcion `range:1` salta la fila 0 (encabezados)
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });

                const dataToSend = [];
                //Iteramos cada fila (cada fila es un array)
                rows.forEach((row, index) => {
                    const kpi_id = row[1];
                    const servicio_id = row[3];
                    let resultado = row[5];

                    // Validar kpi_id
                    if (typeof kpi_id !== 'number' || !Number.isInteger(kpi_id)) {
                        console.error(`Fila ${index + 2}: kpi_id inválido (“${kpi_id}”). Se omite.`);
                        return;
                    }

                    // Validar servicio_id
                    if (typeof servicio_id !== 'number' || !Number.isInteger(servicio_id)) {
                        console.error(`Fila ${index + 2}: servicio_id inválido (“${servicio_id}”). Se omite.`);
                        return;
                    }

                    // Detectar campo vacío para resultado → null
                    if (resultado === null || resultado === undefined || resultado === '') {
                        resultado = null;
                    } else if (typeof resultado !== 'number') {
                        console.error(`Fila ${index + 2}: resultado debe ser numérico o vacío (“${resultado}”). Se omite.`);
                        return;
                    }

                    dataToSend.push({
                        kpi_id,
                        servicio_id,
                        resultado
                    });
                });

                // Verificar si se encuentran registros válidos
                if (dataToSend.length === 0) {
                    console.error('No se encontraron registros válidos en el archivo');
                    api.error({
                        message: 'Error',
                        description: 'No se encontraron filas válidas para enviar.'
                    });
                    return;
                }

                //Se arma el payload según la estructura requerida
                const payload = {
                    fecha: mesActualBBDD,
                    usuario: nombreUsuario,
                    data: dataToSend,
                };

                //Se utiliza el endpoint y se maneja la promesa con async/await
                const response = await INSERTUPDATERESULTADOSOPERATIVOS(
                    payload.fecha,
                    payload.usuario,
                    payload.data,
                );

                console.log(response)

                //Mostrar notificación de éxito
                api.success({
                    message: 'Operación exitosa',
                    description: 'Datos procesados y cargados correctamente.'
                });
            } catch (error) {
                console.error('Error procesando el archivo o enviando los datos: ', error);
                // Mostrar notificación de error
                api.error({
                    message: 'Error',
                    description: 'Error al procesar el archivo o enviar los datos'
                });
            } finally {
                setIsLoading(false)
                event.target.value = '';
            }
        };

        reader.readAsArrayBuffer(file);
    }

    return (
        <>
            {contextHolder}
            <Typography variant="h5" gutterBottom>
                {'Resultados Semanales'}
            </Typography>
            <div className='d-flex justify-content-around gap-5'>
                {/* calendario */}
                <div className='d-flex gap-4 align-items-start'>
                    <GenericCalendar
                        dateRange={obtenerRangoSemanal}
                        currentDate={fechaActual}
                    />
                </div>

                {/* Acciones */}
                <div className='d-flex flex-column justify-content-between my-5'>
                    <div className='d-flex align-items-center justify-content-between gap-4'>
                        <Typography variant="h6" gutterBottom>
                            {`Descargar plantilla de ${textoSemanaAnterior}`}
                        </Typography>

                        {/* Botón para descargar plantilla de excel */}
                        <button
                            className="btn btn-sm btn-warning"
                            disabled={isLoading}
                            onClick={handleDownloadExcel}>
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            ) : (
                                <i className="bi bi-download fs-5" />
                            )}
                        </button>
                    </div>

                    <div className='d-flex align-items-center justify-content-between gap-4'>
                        {
                            noEsHabil
                                ? <Alert
                                    severity="error"
                                    sx={{ marginTop: 4 }}>
                                    {noEsDiaHabil}
                                </Alert>
                                : <>
                                    <Typography variant="h6" gutterBottom>
                                        {`Cargar resultados de ${textoSemanaAnterior}`}
                                    </Typography>

                                    {/* Input de archivo oculto */}
                                    <input
                                        type='file'
                                        accept='.xlsx, .xls'
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleExcelUpload}></input>
                                    {/* Botón para cargar plantilla de excel */}
                                    <button
                                        className="btn btn-sm btn-success"
                                        disabled={isLoading}
                                        onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                        {
                                            isLoading
                                                ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                                                : (<i className="bi bi-upload fs-5" />)
                                        }
                                    </button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
