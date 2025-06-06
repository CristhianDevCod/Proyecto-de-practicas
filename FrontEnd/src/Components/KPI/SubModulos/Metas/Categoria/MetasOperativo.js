import { useContext, useEffect, useRef, useState } from 'react';
import { GETALLMETASOPERATIVAS, INSERTUPDATEMASIVOSKPI } from '../../../../../API/API.js';
import DualMonthCalendars from './DualMonthCalendars.js';
import Alert from '@mui/material/Alert';
import * as XLSX from 'xlsx';
import { Typography } from '../../../../../Exports-Modules/Exports.js';
import { UserProfileContext } from '../../../../../Context/ProfileContex.js';

//Función para obtener fechas
function obtenerFechasFinal(fechaActual) {
    const ahora = fechaActual;
    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth(); // 0 (enero) a 11 (diciembre)

    // Arreglo A: Días del mes actual (última semana)
    // Se determina el último dias del mes actual 
    const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);
    const diasHabilesCargue = [];

    //Iniciamos desde el último día del mes y retrocedemos.
    //Solo se agregan días detro del mes actual y que sean lunes (1) a viernes (5)
    let diaIterado = new Date(ultimoDiaMes);
    while (diasHabilesCargue.length < 7) {
        //Si el día ya no pertenece al mes actual, detenemos la búsqueda
        if (diaIterado.getMonth() !== mesActual) break;

        const diaSemana = diaIterado.getDay();
        //En javascript: 0 = domingo, 6 = sábado; se aceptan solo 1 a 5 (lunes a viernes)
        if (diaSemana >= 1 && diaSemana <= 5) {
            //Agregamos una copia del día para evitar mutaciones
            diasHabilesCargue.push(new Date(diaIterado));
        }
        //Retrocedemos un día
        diaIterado.setDate(diaIterado.getDate() - 1);
    }

    //Para mayor claridad cronológica, invertimos el arreglo 
    diasHabilesCargue.reverse();

    //ArregloB: todos los días del siguiente mes
    let anioSiguiente = anioActual;
    let mesSiguiente = mesActual + 1;
    if (mesSiguiente > 11) {
        mesSiguiente = 0;
        anioSiguiente++; //Si el mes actual es diciembre, el siguiente mes es enero
    }

    //Se determina el npumero de días del siguiente mes
    const ultimoDiaSiguienteMes = new Date(anioSiguiente, mesSiguiente + 1, 0).getDate();
    const diasSiguienteMes = [];

    //Se determina el número de días del siguiente mes
    for (let dia = 1; dia <= ultimoDiaSiguienteMes; dia++) {
        diasSiguienteMes.push(new Date(anioSiguiente, mesSiguiente, dia));
    }

    return { diasHabilesCargue, diasSiguienteMes }
}

//Fecha para cargue de datos
function fechaFormateadaBBDD(date, siguienteMes = false) {
    let year = date.getFullYear();
    //valor entre 1 y 12
    let monthNum = siguienteMes
        ? date.getMonth() + 1
        : date.getMonth();
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

const AsignarInsertarMasivos = ({ api, contextHolder }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fechaActual] = useState(new Date(2025, 4, 19)); //Cambiar para pruebas
    // const [fechaActual] = useState(new Date()); //Cambiar para pruebas
    const [noEsHabil, setNoEsHabil] = useState(false);
    const [textoSiguienteMes, setTextoSiguienteMes] = useState('')
    const [textoMesActual, setTextoMesActual] = useState('')
    const fileInputRef = useRef(null);
    const { fullName } = useContext(UserProfileContext);
    const nombreUsuario = fullName[0].Usuario_Red;

    const noEsDiaHabil = `Hoy ${fechaActual.getDate()} de ${fechaActual.toLocaleDateString('es-CO', { month: 'long' })} no puedes cargar datos, debido a que no es un día hábil`;

    let mesActualRestablecido = new Date(2025, fechaActual.getMonth(), 1);
    const mesSiguienteBBDD = fechaFormateadaBBDD(mesActualRestablecido, true);

    useEffect(() => {
        const { diasHabilesCargue, diasSiguienteMes } = obtenerFechasFinal(fechaActual);
        //Comprueba si hoy es un dia habil
        const hoyEsHabil = diasHabilesCargue.some(diaHabil => {
            return diaHabil.getTime() === fechaActual.getTime()
        })
        const mesSiguiente = diasSiguienteMes[0].toLocaleDateString('es-CO', { month: 'long' });
        const mesActual = diasHabilesCargue[0].toLocaleDateString('es-CO', { month: 'long' });
        setNoEsHabil(!hoyEsHabil);
        setTextoSiguienteMes(mesSiguiente);
        setTextoMesActual(mesActual)
        // setArrDiasHabiles(diasHabilesCargue)
    }, [fechaActual]);



    //Función para descargar Excel
    const handleDownloadExcel = async () => {
        setIsLoading(true);
        try {
            // Llamada al endpoint y se pasa la fecha filtro 
            const response = await GETALLMETASOPERATIVAS(mesSiguienteBBDD);

            if (!response || !response.data) {
                api.error({
                    message: 'Error',
                    description: 'No se encontraron datos para la fecha especificada.',
                    duration: 20
                });
                return;
            }

            //Creamos el libro (workbook) y la hoja (worksheet)
            const wb = XLSX.utils.book_new();
            //Si deseas definir un encabezado fijo, puedes hacerlo así:
            const header = ['Fecha', 'ID Servicio', 'Nombre Servicio', 'ID KPI', 'Nombre KPI', 'Obj Pto', 'Obj wfm', 'Obj Cliente'];
            const dataRows = [header];
            response.data.forEach(item => {
                // Opcionalmente formateamos la fecha (por ejemplo, a "YYYY-MM-DD")
                const formattedDate = mesSiguienteBBDD;
                dataRows.push([
                    formattedDate,
                    item.servicio_id,
                    item.nombre_servicio,
                    item.kpi_id,
                    item.nombre_kpi,
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
            a.download = `Metas_KPI_${textoSiguienteMes}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Notificar éxito
            api.success({
                message: 'Descarga exitosa',
                description: 'El archivo Excel se ha descargado correctamente.',
                duration: 20
            });
        } catch (error) {
            console.error('Error al descargar el Excel:', error);
            api.error({
                message: 'Error',
                description: 'Ocurrió un error al descargar el Excel.',
                duration: 20
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
                setIsLoading(true);

                // Leemos el archivo en formato binario
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convertimos la hoja a un array de objetos
                const rows = XLSX.utils.sheet_to_json(worksheet, {
                    defval: null,
                    raw: false
                });

                let hasErrors = false;
                const dataToSend = [];

                // Iteramos cada fila
                rows.forEach((row, index) => {
                    const rawServicio = row["ID Servicio"];
                    const rawKpi = row["ID KPI"];
                    const rawPto = row["Obj Pto"];
                    const rawWfm = row["Obj wfm"];
                    const rawCli = row["Obj Cliente"];

                    // Validar campos obligatorios
                    if (rawServicio == null || rawKpi == null) {
                        console.error(
                            `Error en la fila ${index + 2}: los campos 'ID Servicio' y 'ID KPI' son obligatorios.`
                        );
                        api.error({
                            message: 'Error de validación',
                            description: `Fila ${index + 2}: los campos 'ID Servicio' y 'ID KPI' son obligatorios.`,
                            duration: 20
                        });
                        hasErrors = true;
                        return;
                    }

                    // Parsers
                    const servicio_id = parseInt(rawServicio, 10);
                    const kpi_id = parseInt(rawKpi, 10);

                    // Comprobar valores decimales
                    const isNumericOrNull = (value) => {
                        if (value === null || value === undefined) return false;
                        return (!isNaN(Number(value)) && (value !== ''))
                    }

                    if (
                        !isNumericOrNull(rawPto) ||
                        !isNumericOrNull(rawWfm) ||
                        !isNumericOrNull(rawCli)
                    ) {
                        console.error(`Error en fila ${index + 2}: Los objetivos deben ser valores numéricos.`);
                        api.error({
                            message: 'Error de validación',
                            description: `Fila ${index + 2}: 'Obj Pto', 'Obj wfm' y 'Obj Cliente' deben ser números válidos.`,
                            duration: 20
                        });
                        hasErrors = true;
                        return;
                    }

                    const obj_pto = rawPto;
                    const obj_wfm = rawWfm;
                    const obj_cliente = rawCli;

                    // Validaciones de tipo
                    if (!Number.isInteger(servicio_id) || !Number.isInteger(kpi_id)) {
                        console.error(`Error en la fila ${index + 2}: 'ID Servicio' y 'ID KPI' deben ser números enteros.`);
                        api.error({
                            message: 'Error de validación',
                            description: `Fila ${index + 2}: 'ID Servicio' y 'ID KPI' deben ser números enteros.`,
                            duration: 20
                        });
                        hasErrors = true;
                        return;
                    }

                    // Validar que al menos uno de los objetivos tenga valor
                    if (obj_pto === null && obj_wfm === null && obj_cliente === null) {
                        console.error(`Error en la fila ${index + 2}: Se requiere al menos un valor de objetivo.`);
                        api.error({
                            message: 'Error de validación',
                            description: `Fila ${index + 2}: Se requiere al menos un valor de objetivo.`,
                            duration: 20
                        });
                        hasErrors = true;
                        return;
                    }

                    // Verificar que los valores decimales sean válidos (no NaN)
                    const decimales = [
                        { nombre: 'Obj Pto', valor: obj_pto },
                        { nombre: 'Obj wfm', valor: obj_wfm },
                        { nombre: 'Obj Cliente', valor: obj_cliente }
                    ];

                    for (const { nombre, valor } of decimales) {
                        if (valor !== null && Number.isNaN(valor)) {
                            console.error(`Error en la fila ${index + 2}: El valor de '${nombre}' no es un número válido.`);
                            api.error({
                                message: 'Error de validación',
                                description: `Fila ${index + 2}: El valor de '${nombre}' no es un número válido.`,
                                duration: 20
                            });
                            hasErrors = true;
                            return;
                        }
                    }

                    // Agregar registro validado
                    dataToSend.push({
                        servicio_id,
                        kpi_id,
                        obj_pto,
                        obj_wfm,
                        obj_cliente
                    });
                });

                // Si hay errores, detener el proceso
                if (hasErrors) {
                    setIsLoading(false);
                    return;
                }

                // Verificar si se encuentran registros válidos
                if (dataToSend.length === 0) {
                    console.error('No se encontraron registros válidos en el archivo');
                    api.error({
                        message: 'Error',
                        description: 'No se encontraron registros válidos en el archivo',
                        duration: 20
                    });
                    setIsLoading(false);
                    return;
                }

                // Se arma el payload según la estructura requerida
                const payload = {
                    fecha: mesSiguienteBBDD,
                    usuario: nombreUsuario,
                    data: dataToSend,
                };

                // Se utiliza el endpoint y se maneja la promesa con async/await
                await INSERTUPDATEMASIVOSKPI(
                    payload.fecha,
                    payload.usuario,
                    payload.data,
                );

                // Mostrar notificación de éxito
                api.success({
                    message: 'Operación exitosa',
                    description: `Se han procesado y cargado correctamente ${dataToSend.length} registros.`,
                    duration: 20
                });
            } catch (error) {
                console.error('Error procesando el archivo o enviando los datos: ', error);
                // Mostrar notificación de error
                api.error({
                    message: 'Error',
                    description: `Error al procesar el archivo: ${error.message || 'Error desconocido'}`,
                    duration: 20
                });
            } finally {
                setIsLoading(false);
                event.target.value = '';
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <>
            {contextHolder}
            <Typography variant="h5" gutterBottom marginTop={4}>
                {'Indicadores mensuales'}
            </Typography>
            <div className='d-flex justify-content-around gap-5 mt-4'>
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
                            {`Descargar plantilla de ${textoMesActual}`}
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
                                        {`Cargar metas para ${textoSiguienteMes}`}
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

export default AsignarInsertarMasivos;
