import { useContext, useEffect, useState } from "react";
import { Button, colors } from '@mui/joy';
import { Modal, TextField, Select, MenuItem, InputLabel, Paper, Typography } from '../../../Exports-Modules/Exports';
import { GETTYPEALLKPI, GETREPORALLKPI, GETFORMATALLKPI, GETPERIODIALLKPI, GETALLLOGKPI, GETCLASIFICA, GETPROCESOS, GETALLRESPONSABLESUPD, GETALLLOGKPIFILTER } from "../../../API/API";
import apiClient from "../../../Service/Service";
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useApiData } from "../useApiData";  // Importa tu custom hook
import { UserProfileContext } from "../../../Context/ProfileContex";
// import { Fab } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import DisableWrapper from "./DisableWrapper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


// Estado inicial del formulario
const initialFormState = {
    nombrekpi: '',
    descripcion_kpi: '',
    tipo: '',
    meta: '',
    reporte: '',
    medicion: '',
    responsable: '',
    periodicidad: '',
    formatokpi: '',
    calculo: '',
    aplicaPersonas: 0,
    clasificacion: '',
    proceso: '',
    estado: '',
    descripcion_log: '',
};

export default function FormularioKPI({ onInsertSuccess, modoDetalles, kpiData, onClose, modoEditar }) {
    //Alertas del modulo
    const MySwal = withReactContent(Swal);
    const BtnColorBlue = '#2196f3'

    // Control del modal
    const [open, setOpen] = useState(false);
    // Accede a el usuario de red
    const { fullName } = useContext(UserProfileContext);
    const nombreUsuario = fullName[0].Usuario_Red

    //Acceder a la ubicación
    const location = useLocation();
    const USUARIOGESTOR = '/home/KPI';
    const USUARIOSIG = '/home/GestionKPI';

    // Estado del formulario y detección de cambios
    const [form, setForm] = useState(initialFormState);
    const [hasChanges, setHasChanges] = useState(false);
    const [estadoKPIActual, setEstadoKPIActual] = useState(null);
    const [logHistorico, setLogHistorico] = useState([])

    // Obtener datos de la API con el custom hook
    const typeKpis = useApiData(GETTYPEALLKPI);
    const reporteKpis = useApiData(GETREPORALLKPI);
    const formatoKpis = useApiData(GETFORMATALLKPI);
    const periodicidadKpis = useApiData(GETPERIODIALLKPI);
    const clasificaciones = useApiData(GETCLASIFICA);
    const procesoskpis = useApiData(GETPROCESOS);
    const responsableUPD = useApiData(GETALLRESPONSABLESUPD);

    //Varaible de estado
    const [isReadOnli, setIsReadOnli] = useState(location.pathname === USUARIOSIG)

    const detallesKPIDeshabilitado = location.pathname === USUARIOGESTOR && modoDetalles && kpiData.estado_kpi_id === 3 ? true : false;

    //variable que recibe la descripcion
    const [razonRechazo, setRazonRechazo] = useState([{}])

    // Cargar datos del KPI en modo edición o detalles al momento de inicializar
    useEffect(() => {

        const CargarHistoricos = async () => {
            try {
                const response = await GETALLLOGKPIFILTER();
                const respuestaFiltrada = response.filter((kpi) => {
                    return kpi.id_kpi === kpiData.id_kpi
                })
                // console.log('Respuesta de la api: ', respuestaFiltrada);
                setLogHistorico(respuestaFiltrada)
            } catch (error) {
                console.log('Error al cargar datos')
            }
        }

        if (detallesKPIDeshabilitado) {
            const adquirirLogs = async () => {
                const responseLogs = await GETALLLOGKPI();
                const descripcionKpi = responseLogs.filter((kpi) => kpi.id_kpi === kpiData.id_kpi);
                if (descripcionKpi.length > 0) {
                    setRazonRechazo(descripcionKpi);
                }
            }
            adquirirLogs();
        }
        if ((modoDetalles || modoEditar) && kpiData) {
            setForm({
                nombrekpi: kpiData.nombre_kpi || '',
                tipo: kpiData.tipo_kpi_id || '',
                meta: kpiData.meta_kpi || '',
                descripcion_kpi: kpiData.descripcion_kpi || '',
                formatokpi: kpiData.formato_kpi_id || '',
                reporte: kpiData.reporte_id || '',
                medicion: kpiData.formula_medicion || '',
                responsable: kpiData.responsable_upd || '',
                periodicidad: kpiData.periodicidad_id || '',
                calculo: (kpiData.tipo_calculo?.data?.[0] || 0).toString(),
                aplicaPersonas: (kpiData.aplica_personas?.data?.[0] || 0),
                proceso: kpiData.proceso_kpi_id || '',
                clasificacion: kpiData.clasificacion_id || '',
                //Si es modo edición, se agrega 'descripcion_log'
                ...(modoEditar && { descripcion_log: '' })
            });
            // Cuando se esta en el modulo SIG se captura el sigueinte dato
            if (location.pathname === USUARIOSIG) {
                setEstadoKPIActual(kpiData.estado_kpi_id);

            }
            setOpen(true);
        }
        if (location.pathname === USUARIOSIG && modoDetalles) {
            CargarHistoricos();
            // console.log('KPI :', kpiData);
        }
        return () => { setEstadoKPIActual(null) }
    }, [modoDetalles, modoEditar, kpiData, estadoKPIActual, location, detallesKPIDeshabilitado]);

    // Manejador genérico para cambios en los campos
    const handleChange = (field) => (event) => {
        setForm(prev => ({ ...prev, [field]: event.target.value }));
        setHasChanges(true);
    };

    // Resetear el formulario
    const limpiarForm = () => {
        setForm(initialFormState);
    };

    // Cerrar el modal
    const handleClose = () => {
        setOpen(false);
        limpiarForm();
        setHasChanges(false);
        //Se reinicia isReadOnli según la ruta actual
        setIsReadOnli(location.pathname === USUARIOSIG);
        if (onClose) onClose();
    };
    // Enviar datos al backend
    const mostrarSolicitud = async () => {
        const {
            nombrekpi,
            tipo,
            meta,
            descripcion_kpi,
            formatokpi,
            reporte,
            medicion,
            responsable,
            periodicidad,
            calculo,
            descripcion_log,
            clasificacion,
            proceso
        } = form;

        // Campo obligatorio de razón modificación
        if (descripcion_log.trim() === '' && modoEditar) {
            MySwal.fire({
                icon: "error",
                title: "Campo obligatorio",
                html: "Debes completar adecuadamente <br/> el campo \"Motivo de la edición\"",
                confirmButtonText: "Entendido",
                confirmButtonColor: colors.blue[500]
            });
            return;
        }

        // Validación de campos obligatorios
        if (
            !nombrekpi ||
            !tipo ||
            !meta ||
            !descripcion_kpi ||
            !formatokpi ||
            !reporte ||
            !medicion ||
            !responsable ||
            !periodicidad ||
            !calculo ||
            !clasificacion ||
            !proceso
        ) {
            MySwal.fire({
                icon: "error",
                title: "Todos los campos son obligatorios",
                text: "Debes completar todos los campos",
                confirmButtonText: "Entendido",
                confirmButtonColor: colors.blue[500]
            });
            return;
        }

        //Contruir el payload incluyendo el nombre del usuario
        const payload = {
            ...form,
            usuario: nombreUsuario
        };

        const tituloCreacion = payload.proceso !== 3 ? 'KPI Creado' : 'Solicitud de Creación';
        const cuerpoCreacion = payload.proceso !== 3 ? 'Se han cargado los datos correctamente.' : 'Se han cargado los datos. <br> Aprobación pendiente para este KPI Staff';

        try {
            let response;
            if (modoEditar && kpiData) {
                // Para actualizacion
                response = await apiClient.put(`/API/UPDATE-KPI/${kpiData.id_kpi}`, payload);
                MySwal.fire({
                    icon: "warning",
                    title: 'Edición de KPI',
                    html: 'Se han cargado los datos.',
                    showConfirmButton: true,
                    confirmButtonColor: BtnColorBlue
                });
            } else {
                //En creación se envía el payload que incluye el usuario
                response = await apiClient.post('/API/INSERT-KPI/', payload);
                MySwal.fire({
                    icon: "success",
                    title: tituloCreacion,
                    html: cuerpoCreacion,
                    showConfirmButton: true,
                    confirmButtonColor: BtnColorBlue
                });
            }
            if (response.status === 200) {
                onInsertSuccess();
                handleClose();
            } else {
                console.error('Error al crear KPI:', response.data);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            MySwal.fire({
                icon: "error",
                title: "KPI no pudo ser creado",
                text: `Error ${error}`,
                showConfirmButton: true,
                confirmButtonColor: BtnColorBlue
            });
        }
    };
    //Función para habilitar la edición al hacer click en "Detalles"
    const habilitarEdicion = () => {
        setIsReadOnli(false)
        if (location.pathname === USUARIOSIG) {
            return;
        }
        if (location.pathname === USUARIOGESTOR) {
            mostrarSolicitud()
            return;
        }
    };

    const handleClick = () => {
        setForm((prevForm) => ({
            ...prevForm,
            aplicaPersonas: prevForm.aplicaPersonas === 1 ? 0 : 1
        }))
    }

    //--------------------funcionalidades del SIG
    const aprobacionKPI = async () => {
        if (location.pathname === USUARIOSIG) {
            const { nombrekpi } = form;

            // Implementar mensaje de confirmación
            Swal.fire({
                title: `¿Deseas aprobar el kpi ${nombrekpi}?`,
                icon: "warning",
                text: `Quedara en estado de activo este KPI`,
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonColor: '#3085d6',
                confirmButtonText: `Aprobar`,
            }).then(async (result) => {
                if (!result.isConfirmed) {
                    return;
                } else {
                    try {
                        const response = await apiClient.put(`/API/APPROVE-KPI/${kpiData.id_kpi}`, { usuarioRed: nombreUsuario });
                        if (response.status === 200) {
                            MySwal.fire({
                                icon: "success",
                                title: "KPI aprobado",
                                text: "El KPI ha sido aprobado correctamente",
                                confirmButtonText: "Entendido",
                                confirmButtonColor: colors.blue[500]
                            });
                            onInsertSuccess();
                            handleClose();
                        } else {
                            console.error("Error en la aprobación", response.data);
                        }
                    } catch (error) {
                        console.error("Error en la solicitud de aprobación", error);
                        MySwal.fire({
                            icon: "error",
                            title: "Error en la aprobación",
                            text: "No se pudo aprobar el KPI. Intente nuevamente.",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: colors.blue[500]
                        });
                    }
                }
            })
        }
    };
    const rechazarKPI = () => {
        // se comprueba que se abra donde se necesita
        if (location.pathname === USUARIOSIG) {
            const { nombrekpi } = form;

            // Implementar mensaje de confirmación
            let mesajeMotivo = '';
            Swal.fire({
                title: `¿Deseas rechazar el kpi ${nombrekpi}?`,
                icon: "warning",
                html: `A continuación explica el motivo del rechazo. <br> El kpi quedará inhabilitado.`,
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                input: 'textarea',
                cancelButtonColor: "#d33",
                confirmButtonColor: '#3085d6',
                confirmButtonText: `Rechazar`,
                inputValidator: (value) => {
                    //El campo de texto no puede estar vació 
                    if (!value.trim()) {
                        return "Debes proporcionar una razón para continuar.";
                    }
                    //Toma el valor del mensaje
                    mesajeMotivo = value.trim();
                    return null;
                }, didOpen: () => {
                    //Acceder al DOM del modal
                    const confirmButton = Swal.getConfirmButton();
                    const textarea = Swal.getInput();

                    //Desabilita el botón de confirmación inicialmente
                    confirmButton.disabled = true;

                    //Escuchar el evento de input en el campo de texto
                    textarea.addEventListener('input', () => {
                        //Habilita el boton si el campo de texto no está vacío
                        confirmButton.disabled = !textarea.value.trim()
                    });
                }
            }).then(async (result) => {
                if (!result.isConfirmed) {
                    return;
                } else {
                    try {
                        const response = await apiClient.put(`/API/REJECT-KPI/${kpiData.id_kpi}`,
                            {
                                usuarioRed: nombreUsuario,
                                mesajeMotivo: mesajeMotivo
                            });

                        if (response.status === 200) {
                            MySwal.fire({
                                icon: "success",
                                title: "KPI inhabilitado",
                                text: "El KPI ha sido inhabilitado correctamente",
                                confirmButtonText: "Entendido",
                                confirmButtonColor: colors.blue[500]
                            });

                            onInsertSuccess();
                            handleClose();
                        } else {
                            console.error("Error en la inhabilitación" + response.data);
                        }
                    } catch (error) {
                        console.error("Error en la solicitud de inhabilitar" + error);
                        MySwal.fire({
                            icon: "error",
                            title: "Error en la inhabilitación",
                            text: "No se pudo aprobar el KPI. Intente nuevamente.",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: colors.blue[500]
                        });
                    }
                }
            })
        }
    }
    const editarSIG = async () => {
        const {
            nombrekpi,
            tipo,
            meta,
            descripcion_kpi,
            formatokpi,
            reporte,
            medicion,
            responsable,
            periodicidad,
            calculo,
            descripcion_log,
        } = form;

        // Campo obligatorio de razón modificación
        if (descripcion_log.trim() === '' && modoEditar) {
            MySwal.fire({
                icon: "error",
                title: "Campo obligatorio",
                html: "Debes completar adecuadamente <br/> el campo \"Motivo de la edición\"",
                confirmButtonText: "Entendido",
                confirmButtonColor: colors.blue[500],
            });
            return;
        }

        // Validación de campos obligatorios
        if (
            !nombrekpi ||
            !tipo ||
            !meta ||
            !descripcion_kpi ||
            !formatokpi ||
            !reporte ||
            !medicion ||
            !responsable ||
            !periodicidad ||
            !calculo
        ) {
            MySwal.fire({
                icon: "error",
                title: "Todos los campos son obligatorios",
                text: "Debes completar todos los campos",
                confirmButtonText: "Entendido",
                confirmButtonColor: colors.blue[500],
            });
            return;
        }

        // Verificar si algún campo ha cambiado
        if (modoEditar && kpiData) {
            const hasChanged = Object.entries(form).some(
                ([key, value]) => kpiData[key] !== value
            );

            if (!hasChanged) {
                MySwal.fire({
                    icon: "info",
                    title: "Sin cambios detectados",
                    text: "No has realizado ningún cambio en los datos.",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: colors.blue[500],
                });
                return;
            }
        }

        // Construir el payload incluyendo el nombre del usuario
        const payload = {
            ...form,
            usuario: nombreUsuario,
        };

        try {
            if (modoEditar && kpiData) {
                // Para actualización
                await apiClient.put(`/API/UPDATE-KPI-SIG/${kpiData.id_kpi}`, payload);
                MySwal.fire({
                    icon: "success",
                    title: "Actualización correcta",
                    html: "Se han cargado los datos correctamente",
                    showConfirmButton: true,
                    confirmButtonColor: BtnColorBlue,
                });
            }
            onInsertSuccess();
        } catch (error) {
            console.error("Error en la solicitud:", error);
            MySwal.fire({
                icon: "error",
                title: "KPI no pudo ser creado",
                text: `Error ${error}`,
                showConfirmButton: true,
                confirmButtonColor: BtnColorBlue,
            });
        }
    }
    const EditarKPI = () => {
        if (location.pathname !== USUARIOSIG) {
            return;
        }
        setIsReadOnli(prev => !prev)
        editarSIG()
    }
    // -------------------------------------------

    // Variables para botones
    const crear = 'Crear';
    const editar = 'Editar';
    const cancelar = 'Cancelar';
    const guardar = 'Guardar';
    const inhabilitar = 'Inhabilitar'
    const habilitar = 'Habilitar'
    // Estados
    const inactivo = 0;
    const aprobarKPI = 1;
    const activoKPI = 2;

    //Constantes para la tabla de logs
    const colorFondoEncabezado = '#35baf6'
    const colorTextoEncabezado = '#000'


    //Determinar las propiedades del botón de acción según el modo
    const actionButtonProps = !modoEditar && !modoDetalles
        ? { color: "primary", text: crear }
        : modoEditar
            ? { color: "warning", text: editar }
            : null;

    // Estilos condicionales
    const commonStyles = {
        display: 'grid',
        gap: '16px',
        width: '100%',
        alignItems: 'center'
    };

    const gridStyles = {
        gridTemplateColumns: modoDetalles ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'
    };

    return (
        <div>
            {
                location.pathname === USUARIOGESTOR
                    ? (<Button onClick={() => setOpen(true)} size="lg" sx={{ margin: 2, fontSize: 18 }}>Crear KPI</Button>)
                    : ''
            }
            <Modal
                open={open}
                onCancel={handleClose}
                footer={null}
                width={'80%'}
                closable
                style={location.pathname === USUARIOSIG ? {
                    position: "absolute",
                    top: "3%",
                    left: "10%",
                } : {}}
            >
                {/* Primer contenedor */}
                <DisableWrapper disabled={isReadOnli || (modoDetalles && !modoEditar)}>
                    <div
                        style={{ ...commonStyles, ...gridStyles }}
                    >
                        {/* Nombre */}
                        <TextField
                            id="nombreKpi"
                            label="Nombre KPI"
                            variant="outlined"
                            value={form.nombrekpi}
                            onChange={handleChange('nombrekpi')}
                            fullWidth
                            style={{ gridColumn: '1 / 2', gridRow: '1 / 2', marginBottom: -20 }}
                        />
                        {/* Reporte */}
                        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
                            <InputLabel id="reporte-label" shrink={false}>Reporte</InputLabel>
                            <Select
                                labelId="reporte-label"
                                id="reporte"
                                value={form.reporte}
                                onChange={handleChange('reporte')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.reporte !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione reporte</em>
                                </MenuItem>
                                {Array.isArray(reporteKpis) && reporteKpis.map(option => {
                                    if (option.estado_reporte.data[0] !== inactivo) {
                                        return (<MenuItem
                                            key={option.id_reporte}
                                            value={option.id_reporte}
                                        >
                                            {option.nombre_reporte}
                                        </MenuItem>
                                        )
                                    }
                                    return null
                                })}
                            </Select>
                        </div>
                        {/* Clasificacion */}
                        <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
                            <InputLabel id="clasificacion-label" shrink={false}>Clasificación</InputLabel>
                            <Select
                                labelId="clasificacion-label"
                                id="clasificacion"
                                value={form.clasificacion}
                                onChange={handleChange('clasificacion')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.clasificacion !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione una clasificación</em>
                                </MenuItem>
                                {Array.isArray(clasificaciones) && clasificaciones.map(option => {
                                    if (option.estado_clasificacion.data[0] !== inactivo) {
                                        return (
                                            <MenuItem
                                                key={option.id_clasificacion}
                                                value={option.id_clasificacion}
                                            >
                                                {option.nombre_clasificacion}
                                            </MenuItem>
                                        )
                                    }
                                    return null;
                                })}
                            </Select>
                        </div>
                        {/* Formula de medicion */}
                        <TextField
                            id="formula-medicion"
                            label="Fórmula medición"
                            variant="outlined"
                            value={form.medicion}
                            onChange={handleChange('medicion')}
                            style={modoDetalles ? { gridColumn: '4 / 5', gridRow: '1 / 2', alignSelf: 'end' } : { gridColumn: '1 / 2', gridRow: '2 / 3' }}
                        />
                        {/* Meta */}
                        <div style={modoDetalles ? { gridColumn: '1 / 2', gridRow: '2 / 3', alignSelf: 'end' } : { gridColumn: '2 / 3', gridRow: '2 / 3' }}>
                            <TextField
                                id="meta"
                                label="Meta"
                                variant="outlined"
                                value={form.meta}
                                onChange={handleChange('meta')}
                                fullWidth
                            />
                        </div>
                        {/* Aplica para personas */}
                        <div style={modoDetalles ? { gridColumn: '4 / 5', gridRow: '2 / 3', height: '100%' } : { gridColumn: '3 / 4', gridRow: '2 / 3', height: '100%' }}>
                            <FormLabel id="label-aplica-personas">¿Este indicador aplica para personas?</FormLabel>
                            <RadioGroup
                                aria-labelledby="label-aplica-personas"
                                name="aplica-personas"
                                value={form.aplicaPersonas}
                            >
                                <FormControlLabel
                                    value={1}
                                    control={<Radio />}
                                    label="Aplica para personas"
                                    onClick={isReadOnli || (modoDetalles && !modoEditar) ? undefined : handleClick}
                                />
                            </RadioGroup>
                        </div>
                        {/* Tipo de calculo */}
                        <div style={modoDetalles ? { gridColumn: '4 / 5', gridRow: '3 / 5', height: '100%' } : { gridColumn: '3 / 4', gridRow: '3 / 5', height: '100%' }}>
                            <FormLabel id="label-tipo-calculo">Tipo de cálculo</FormLabel>
                            <RadioGroup
                                aria-labelledby="label-tipo-calculo"
                                name="tipo-calculo"
                                value={form.calculo}
                                onChange={handleChange('calculo')}
                            >
                                <FormControlLabel value={0} control={<Radio />}
                                    // disabled={modoDetalles && !modoEditar} 
                                    label="Cálculo Ascendente"
                                />
                                <FormControlLabel value={1} control={<Radio />}
                                    // disabled={modoDetalles && !modoEditar} 
                                    label="Cálculo Descendente"
                                />
                            </RadioGroup>
                        </div>
                        {/* Responsable */}
                        <div
                            style={modoDetalles
                                ? {
                                    gridColumn: '2 / 3',
                                    gridRow: '2 / 3',
                                    alignSelf: 'end'
                                }
                                : { gridColumn: '1 / 2', gridRow: '3 / 4' }}>
                            <InputLabel id="responsable-label" shrink={false}>Responsable UPD</InputLabel>
                            <Select
                                labelId="responsable-label"
                                id="responsable"
                                value={form.responsable}
                                onChange={handleChange('responsable')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.responsable !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione una responsable</em>
                                </MenuItem>
                                {Array.isArray(responsableUPD) && responsableUPD.map(option => {
                                    // if (option.estado_periodicidad.data[0] !== inactivo) {
                                    // }
                                    return (
                                        <MenuItem
                                            key={option.Documento}
                                            value={option.Documento}
                                        >
                                            {`${option.Nombres.toLowerCase()} ${option.Apellidos.toLowerCase()}`}
                                        </MenuItem>
                                    )
                                    // return null;
                                }
                                )}
                            </Select>
                        </div>
                        {/* Descripcion */}
                        <TextField
                            id="descripcion_kpi"
                            label="Descripción"
                            variant="outlined"
                            value={form.descripcion_kpi}
                            onChange={handleChange('descripcion_kpi')}
                            style={modoDetalles
                                ? {
                                    gridColumn: '3 / 4',
                                    gridRow: '2 / 3',
                                    alignSelf: 'end'
                                }
                                : {
                                    gridColumn: '2 / 3',
                                    gridRow: '3 / 4',
                                    alignSelf: 'end'
                                }}
                        />
                        {/* Periodicidad */}
                        <div style={modoDetalles ? { gridColumn: '1 / 2', gridRow: '3 / 4' } : { gridColumn: '1 / 2', gridRow: '4 / 5' }}>
                            <InputLabel id="periodicidad-label" shrink={false}>Periodicidad</InputLabel>
                            <Select
                                labelId="periodicidad-label"
                                id="periodicidad"
                                value={form.periodicidad}
                                onChange={handleChange('periodicidad')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.periodicidad !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione una periodicidad</em>
                                </MenuItem>
                                {Array.isArray(periodicidadKpis) && periodicidadKpis.map(option => {
                                    if (option.estado_periodicidad.data[0] !== inactivo) {
                                        return (
                                            <MenuItem
                                                key={option.id_periodicidad}
                                                value={option.id_periodicidad}
                                            >
                                                {option.nombre_periodicidad}
                                            </MenuItem>
                                        )
                                    }
                                    return null;
                                }
                                )}
                            </Select>
                        </div>
                        {/* Formato KPI */}
                        <div style={modoDetalles ? { gridColumn: '2 / 3', gridRow: '3 / 4' } : { gridColumn: '2 / 3', gridRow: '4 / 5' }}>
                            <InputLabel id="formato-kpi-label" shrink={false}>Formato KPI</InputLabel>
                            <Select
                                labelId="formato-kpi-label"
                                id="formato-kpi"
                                value={form.formatokpi}
                                onChange={handleChange('formatokpi')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.formatokpi !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione un tipo de formato</em>
                                </MenuItem>
                                {Array.isArray(formatoKpis) && formatoKpis.map(option => {
                                    if (option.estado_formato_kpi.data[0] !== inactivo) {
                                        return (
                                            <MenuItem
                                                key={option.id_formato_kpi}
                                                value={option.id_formato_kpi}
                                            >
                                                {option.nombre_formato_kpi}
                                            </MenuItem>
                                        )
                                    }
                                    return null;
                                })}
                            </Select>
                        </div>
                        {/* Proceso */}
                        <div style={modoDetalles ? { gridColumn: '3 / 4', gridRow: '3 / 4' } : { gridColumn: '1 / 2', gridRow: '5 / 6' }}>
                            <InputLabel id="proceso-label" shrink={false}>Proceso</InputLabel>
                            <Select
                                labelId="proceso-label"
                                id="proceso"
                                value={form.proceso}
                                onChange={handleChange('proceso')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.proceso !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione un tipo de proceso</em>
                                </MenuItem>
                                {Array.isArray(procesoskpis) && procesoskpis.map(option => {
                                    if (option.estado_proceso_kpi.data[0] !== inactivo) {
                                        return (
                                            <MenuItem
                                                key={option.id_proceso_kpi}
                                                value={option.id_proceso_kpi}
                                            >
                                                {option.nombre_proceso_kpi}
                                            </MenuItem>
                                        )
                                    }
                                    return null;
                                })}
                            </Select>
                        </div>
                        {/* requerido - tipo */}
                        <div style={modoDetalles ? { gridColumn: '1 / 2', gridRow: '4 / 5' } : { gridColumn: '2 / 3', gridRow: '5 / 6' }}>
                            <InputLabel id="select-tipo-label" shrink={false}>Requerido</InputLabel>
                            <Select
                                labelId="select-tipo-label"
                                id="select-tipo"
                                value={form.tipo}
                                onChange={handleChange('tipo')}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                                renderValue={form.tipo !== "" ? undefined : () => "Seleccione una opción"}
                            >
                                <MenuItem disabled value="">
                                    <em>Seleccione Tipo</em>
                                </MenuItem>
                                {Array.isArray(typeKpis) && typeKpis.map(option => {
                                    if (option.estado_tipo_kpi.data[0] !== inactivo) {
                                        return (
                                            <MenuItem
                                                key={option.tipo_kpi_id}
                                                value={option.tipo_kpi_id}
                                            >
                                                {option.nombre_tipo_kpi}
                                            </MenuItem>
                                        )
                                    }
                                    return null;
                                }
                                )}
                            </Select>
                        </div>

                        {/* Campo razón edición */}
                        {
                            modoEditar &&
                            (<TextField
                                id="descripcion_log"
                                label="Motivo de la edición"
                                variant="outlined"
                                value={form.descripcion_log}
                                onChange={handleChange('descripcion_log')}
                                disabled={modoDetalles && !modoEditar}
                                style={{
                                    gridColumn: '1 / 3',
                                    gridRow: '6 / 7',
                                    alignSelf: 'end'
                                }}
                            />)

                        }
                        {/* Campo razón inhabilitado */}
                        {
                            detallesKPIDeshabilitado &&
                            (<TextField
                                id="descripcion"
                                label="Razon del rechazo"
                                variant="outlined"
                                value={razonRechazo[0]?.descripcion || ''}
                                style={modoDetalles ? { gridColumn: '2 / 4', gridRow: '5 / 4', alignSelf: 'end' } : { gridColumn: '1 / 3', gridRow: '6 / 7' }}
                            />)
                        }
                        {/* Botones del formulario */}
                        {
                            // Renderizado tabla encargado SIG
                            location.pathname === USUARIOSIG && !modoDetalles ? (
                                <>
                                    <div style={{
                                        gridColumn: '3/4',
                                        gridRow: '5/6',
                                        display: 'flex',
                                        gap: '8px',
                                        flexDirection: 'column',
                                    }}>
                                        {
                                            isReadOnli ?
                                                <Button
                                                    size="lg"
                                                    variant="soft"
                                                    color="warning"
                                                    onClick={habilitarEdicion}
                                                    sx={{ padding: '10px 40px' }}
                                                >
                                                    {editar}
                                                </Button>
                                                :
                                                <>
                                                    <Button
                                                        variant="soft"
                                                        color="primary"
                                                        size="lg"
                                                        onClick={EditarKPI}
                                                    >
                                                        {guardar}
                                                    </Button>
                                                    <Button
                                                        variant="soft"
                                                        color="danger"
                                                        size="lg"
                                                        onClick={() => setIsReadOnli(prev => !prev)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </>
                                        }
                                    </div>
                                    {/* Botones de aprobación */}
                                    <div style={{
                                        gridColumn: '3 / 4',
                                        gridRow: '6 / 7',
                                        display: 'flex',
                                        gap: '8px',
                                        // marginBottom: -30,
                                        // marginRight: estadoKPIActual === aprobarKPI ? '' : 30,
                                        // justifyContent: estadoKPIActual === aprobarKPI ? 'space-around' : 'flex-end'
                                        flexDirection: 'column'

                                    }}>
                                        {/* Validar el estado del KPI */}
                                        {
                                            estadoKPIActual === activoKPI ?
                                                <Button
                                                    variant="soft"
                                                    color="danger"
                                                    size="lg"
                                                    onClick={rechazarKPI}
                                                    disabled={!isReadOnli}
                                                >
                                                    {inhabilitar}
                                                </Button>
                                                :
                                                estadoKPIActual === aprobarKPI ?
                                                    <>
                                                        <Button
                                                            variant="soft"
                                                            color="success"
                                                            size="lg"
                                                            onClick={aprobacionKPI}
                                                            disabled={!isReadOnli}
                                                        >
                                                            Aprobar
                                                        </Button>
                                                        <Button
                                                            variant="soft"
                                                            color="danger"
                                                            size="lg"
                                                            sx={{ padding: '10px 29px' }}
                                                            onClick={rechazarKPI}
                                                            disabled={!isReadOnli}
                                                        >
                                                            Rechazar
                                                        </Button>
                                                    </>
                                                    :
                                                    <Button
                                                        variant="soft"
                                                        color="success"
                                                        size="lg"
                                                        onClick={aprobacionKPI}
                                                        disabled={!isReadOnli}
                                                        sx={{ padding: '10px 30px' }}
                                                    >
                                                        {habilitar}
                                                    </Button>
                                        }
                                    </div>
                                </>
                            ) : (
                                // Si se esta en modo detalles 
                                <div style={modoDetalles ? {
                                    gridColumn: '4 / 5',
                                    gridRow: modoEditar ? '6 / 7' : '4 / 5',
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: modoEditar ? 0 : location.pathname === USUARIOGESTOR ? 0 : -30,
                                    flexDirection: 'column',
                                    // alignItems: 'flex-end'
                                    alignSelf: location.pathname !== USUARIOGESTOR ? '' : 'end'
                                } : {
                                    gridColumn: '3 / 4',
                                    gridRow: modoEditar ? '6 / 7' : '5 / 6',
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: modoEditar ? 0 : location.pathname === USUARIOGESTOR ? 0 : -30,
                                    flexDirection: 'column'
                                }}>
                                    {actionButtonProps && (
                                        <Button
                                            variant="soft"
                                            color={actionButtonProps.color}
                                            size="lg"
                                            onClick={habilitarEdicion}
                                            disabled={!hasChanges}
                                        >
                                            {actionButtonProps.text}
                                        </Button>
                                    )}
                                    <Button variant="soft" color="danger" size="lg" onClick={handleClose}>
                                        {cancelar}
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </DisableWrapper>

                {/* Segundo contenido */}
                {
                    modoDetalles && location.pathname === USUARIOSIG && (
                        <>
                            <Typography variant="h5" gutterBottom style={{ marginTop: 30 }}>
                                Historial de cambios
                            </Typography>

                            <TableContainer
                                component={Paper}
                                sx={{
                                    maxHeight: 220,
                                    marginTop: 1
                                }}
                                elevation={6}
                            >
                                <Table
                                    sx={{
                                        minWidth: 650
                                    }}
                                    aria-label="simple table"
                                    stickyHeader
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: colorFondoEncabezado, fontWeight: 'bold', color: colorTextoEncabezado }} >{'Descripción del cambio'}</TableCell>
                                            <TableCell sx={{ backgroundColor: colorFondoEncabezado, fontWeight: 'bold', color: colorTextoEncabezado }} align="right">{'Acción realizada'}</TableCell>
                                            <TableCell sx={{ backgroundColor: colorFondoEncabezado, fontWeight: 'bold', color: colorTextoEncabezado }} align="right">{'Usuario'}</TableCell>
                                            <TableCell sx={{ backgroundColor: colorFondoEncabezado, fontWeight: 'bold', color: colorTextoEncabezado }} align="right">{'Fecha'}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {logHistorico.map((kpi) => (
                                            <TableRow
                                                key={kpi.id_log}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {kpi.descripcion}
                                                </TableCell>
                                                <TableCell align="right">{kpi.accion}</TableCell>
                                                <TableCell align="right">{kpi.usuario}</TableCell>
                                                <TableCell align="right">
                                                    {`${new Date(kpi.fecha).toLocaleDateString('es-CO')} - ${new Date(kpi.fecha).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )
                }
            </Modal>
        </div >
    );
}
