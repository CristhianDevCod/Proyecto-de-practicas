import { useContext, useEffect, useRef, useState } from 'react';
import { GETALLMETASOPERATIVAS, INSERTUPDATEMASIVOSKPI } from '../../../../../API/API.js';
import DualMonthCalendars from './DualMonthCalendars.js';
import Alert from '@mui/material/Alert';
import * as XLSX from 'xlsx';
import { Typography } from '../../../../../Exports-Modules/Exports.js';
import { UserProfileContext } from '../../../../../Context/ProfileContex.js';

//Función para obtener fechas
function obtenerFechasFinal(fechaActual) {
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    // Arreglo A: todos los dias del mes anterior
    const mesPrevio = mes === 0 ? 11 : mes - 1;
    const anioPrevio = mes === 0 ? anio - 1 : anio;
    // Obtener número de días del mes anterior pasando día 0 al mes actual
    const diasMesPrevio = new Date(anioPrevio, mesPrevio + 1, 0).getDate();

    const arregloA = [];
    for (let d = 1; d <= diasMesPrevio; d++) {
        arregloA.push(new Date(anioPrevio, mesPrevio, d));
    }

    // Arreglo B: primeros 10 días del mes actual
    const arregloB = [];
    // Creamos fechas desde el 1 hasta el 10 del mes actual
    for (let d = 1; d <= 10; d++) {
        arregloB.push(new Date(anio, mes, d));
    }

    return { arregloA, arregloB }
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

export const ResultadosStaff = ({ api, contextHolder }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fechaActual] = useState(new Date(2025, 3, 10)); //Cambiar para pruebas
    const [noEsHabil, setNoEsHabil] = useState(false);
    const [textoMesAnterior, setTextoMesAnterior] = useState('')
    // const [textoMesActual, setTextoMesActual] = useState('')
    // const [ArrDiasHabiles, setArrDiasHabiles] = useState([])
    const fileInputRef = useRef(null);
    const { fullName } = useContext(UserProfileContext);
    const nombreUsuario = fullName[0].Usuario_Red;

    const noEsDiaHabil = `Hoy ${fechaActual.getDate()} de ${obtenerTextoMes(fechaActual)} no puedes cargar datos, debido a que no es un día hábil`;

    //fecha de cargue - pruebas
    let mesActualRestablecido = new Date(2025, fechaActual.getMonth(), 1)
    const mesSiguienteBBDD = fechaFormateadaBBDD(mesActualRestablecido)



    useEffect(() => {
        const { arregloA: diasMesAnterior, arregloB: Primeros10Dias } = obtenerFechasFinal(fechaActual);
        //Comprueba si hoy es un dia habil
        const hoyEsHabil = Primeros10Dias.some(diaHabil => {
            return diaHabil.getTime() === fechaActual.getTime()
        })

        const mesAnterior = obtenerTextoMes(diasMesAnterior[0]);
        // const mesActual = obtenerTextoMes(Primeros10Dias[0]);
        setNoEsHabil(!hoyEsHabil);
        setTextoMesAnterior(mesAnterior);
        // setTextoMesActual(mesActual)
        // setArrDiasHabiles(diasHabilesCargue)
    }, [fechaActual]);

    //Función para descargar Excel
    const handleDownloadExcel = async () => {
        setIsLoading(true);
        try {
            // Llamada al endpoint y se pasa la fecha filtro 
            const response = await GETALLMETASOPERATIVAS(mesSiguienteBBDD);
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
            const header = ['Fecha', 'Kpi_Id', 'Obj_Pto', 'Obj_wfm', 'Obj_Cliente'];
            const dataRows = [header];
            response.data.forEach(item => {
                // Opcionalmente formateamos la fecha (por ejemplo, a "YYYY-MM-DD")
                const formattedDate = new Date(item.fecha).toLocaleDateString('es-CO');
                dataRows.push([
                    formattedDate,
                    item.kpi_id,
                    item.obj_pto,
                    item.obj_wfm,
                    item.obj_cliente
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
            a.download = `Metas_KPI_${textoMesAnterior}.xlsx`;
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
                    const obj_pto = row[2];
                    const obj_wfm = row[3];
                    const obj_cliente = row[4];

                    //Validar que kpi_id sea un número y entero
                    if (typeof kpi_id !== 'number' || !Number.isInteger(kpi_id)) {
                        console.error(`Error en la fila ${index + 2}: el valor de kpi_id ${kpi_id} no es un número entero.`);
                        return;
                    }

                    // Validar que obj_pto, obj_wfm y obj_cliente sean números (decimales)
                    if (
                        typeof obj_pto !== 'number' ||
                        typeof obj_wfm !== 'number' ||
                        typeof obj_cliente !== 'number'
                    ) {
                        console.error(`Error en la fila ${index + 2}: se espera que los valores de obj_pto, obj_wfm y obj_cliente sean numéricos.`);
                        return;
                    }

                    dataToSend.push({
                        kpi_id,
                        obj_pto,
                        obj_wfm,
                        obj_cliente
                    });
                });

                // Verificar si se encuentran registros válidos
                if (dataToSend.length === 0) {
                    console.error('No se encontraron registros válidos en el archivo');
                    return;
                }

                //Se arma el payload según la estructura requerida
                const payload = {
                    fecha: mesSiguienteBBDD,
                    usuario: nombreUsuario,
                    data: dataToSend,
                };

                //Se utiliza el endpoint y se maneja la promesa con async/await
                await INSERTUPDATEMASIVOSKPI(
                    payload.fecha,
                    payload.usuario,
                    payload.data,
                );
                // console.log('Respuesta del endpoint', response);

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
            }
        };

        reader.readAsArrayBuffer(file);
    }

    return (
        <>
            {contextHolder}
            <Typography variant="h5" gutterBottom>
                {'Indicadores mensuales'}
            </Typography>
            <div className='d-flex justify-content-around gap-5'>
                {/* calendario */}
                <div className='d-flex gap-4 align-items-start'>
                    <DualMonthCalendars
                        obtenerFechasFinal={obtenerFechasFinal}
                        fechaActual={fechaActual} />
                </div>

                {/* Acciones */}
                <div className='d-flex flex-column justify-content-between my-5'>
                    <div className='d-flex align-items-center justify-content-between gap-4'>
                        <Typography variant="h6" gutterBottom>
                            {`Descargar plantilla de ${textoMesAnterior}`}
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
                                        {`Cargar resultados de ${textoMesAnterior}`}
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
