import {
    TextField,
    useState,
    useRef,
    useEffect
} from '../../../../../../Exports-Modules/Exports'
import {
    Autocomplete,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Tooltip
} from "@mui/material";
import Typography from '@mui/material/Typography';
import {
    GETALLCLIENTEJERARQUIAS,
    GETALLOPERACIONJERARQUIAS,
    GETALLSEGMENTOJERARQUIAS,
    GETALLSERVICIOJERARQUIAS,
    // GETALLCOLLABORATORJERARQUIAS
} from '../../../../../../API/API';
import { stylePadre, styleToolTip } from './stylesForm';

// Estado inicial del formulario
const initialFormState = {
    asignacion: 'opr',
    // Campos operativos
    cliente: null,
    operacion: null,
    segmento: null,
    servicio: null,
    // Campos administrativos
    proceso: null,
    area: null
};

const FormularioAsignacion = ({
    setTableActive,
    setServicioDB,
    setOperacionDB,
    loading: dataDisponible,
    descargarPlantilla,
    cargueMasivos,
}) => {
    const [form, setForm] = useState(initialFormState);
    const [isValidForm, setIsValidForm] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [operaciones, setOperaciones] = useState([]);
    const [segmentos, setSegmentos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const downloadInputRef = useRef(null);
    const uploadInputRef = useRef(null);

    useEffect(() => {
        const fetchClientes = async () => {
            if (initialFormState.asignacion === 'opr') {
                try {
                    const clienteResponse = await GETALLCLIENTEJERARQUIAS();
                    const clientesData = Array.isArray(clienteResponse.data) ? clienteResponse.data : []
                    setClientes(clientesData);
                } catch (error) {
                    console.error(error.message);
                }
            }
        };

        fetchClientes();
    }, [form.asignacion]);

    useEffect(() => {
        const fetchOperaciones = async () => {
            if (form.cliente) {
                try {
                    const operacionResponse = await GETALLOPERACIONJERARQUIAS({ id: form.cliente['id_cliente'] });
                    const operacionData = Array.isArray(operacionResponse.data) ? operacionResponse.data : []
                    setOperaciones(operacionData);
                } catch (error) {
                    console.error(error.message);
                }
                return;
            }
        }
        fetchOperaciones()
    }, [form.cliente])

    useEffect(() => {
        const fetchOperaciones = async () => {
            if (form.operacion) {
                try {
                    const segmentoRespuesta = await GETALLSEGMENTOJERARQUIAS({ id: form.operacion['id_operacion'] });
                    const segmentoData = Array.isArray(segmentoRespuesta.data) ? segmentoRespuesta.data : []
                    setSegmentos(segmentoData);
                } catch (error) {
                    console.error(error.message);
                }
                return;
            }
        }
        fetchOperaciones()
    }, [form.operacion])

    useEffect(() => {
        const fetchSegmento = async () => {
            if (form.segmento) {
                try {
                    // console.log('El dato segmento: ', form.segmento);
                    const servicioResponse = await GETALLSERVICIOJERARQUIAS({ id: form.segmento['id_segmento'] });
                    const servicioData = Array.isArray(servicioResponse.data) ? servicioResponse.data : []
                    setServicios(servicioData)
                } catch (error) {
                    console.error(error.message);
                }
                return;
            }
        }
        fetchSegmento();
    }, [form.segmento])

    // Informar al padre los campos de busqueda
    useEffect(() => {
        if (form.servicio) {
            setServicioDB(form.servicio)
        }
    }, [form.servicio, setServicioDB])
    useEffect(() => {
        if (form.operacion) {
            setOperacionDB(form.operacion);
        }
    }, [form.operacion, setOperacionDB]);

    // Función para manejar cambios en los campos del formulario
    const handleAutoComplete = (field, idKey) => (e, value) => {
        // Calculamos el nuevo form: si no hay value, guardamos null
        const updatedForm = {
            ...form,
            [field]: value ? value[idKey] : null
        };
        // 1) Actualizamos el estado
        setForm(updatedForm);
        // 2) Validamos sobre el estado ya modificado
        validateForm(updatedForm);
    };

    // Validar si el formulario está completo
    const validateForm = currentForm => {
        // Claves relevantes para la validación
        const requiredFields = currentForm.asignacion === 'opr'
            ? ['cliente', 'operacion', 'segmento', 'servicio']
            : ['proceso', 'area'];

        const isValid = requiredFields.every(
            field => currentForm[field] !== null && currentForm[field] !== ''
        );
        setIsValidForm(isValid);
        setTableActive(isValid);
    };

    // Ejemplo de manejo de cambios en un campo de tipo radio
    const handleRadioChange = (e) => {
        const newAsignacion = e.target.value;
        const updatedForm = {
            ...form,
            asignacion: newAsignacion
        };
        setForm(updatedForm);
        validateForm(updatedForm);
    };

    return (
        <>
            {/* Area de asignación Operativo || Estaf */}
            <div >
                <FormControl style={{ height: '85px' }}>
                    <FormLabel
                    >Asignación</FormLabel>
                    <RadioGroup
                        value={form.asignacion}
                        onChange={handleRadioChange}
                        style={stylePadre}
                    >
                        <FormControlLabel
                            disabled
                            value="adm"
                            control={<Radio />}
                            label="Administrativo"
                        />
                        <FormControlLabel
                            value="opr"
                            control={<Radio />}
                            label="Operativo"
                        />
                        <Tooltip title="Este campo es obligatorio" placement="top-start">
                            <p style={{ ...styleToolTip, top: '-37px' }}>*</p>
                        </Tooltip>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="d-flex gap-3 justify-content-between align-items-center flex-wrap, mt-5">
                {/* Formulario Operativo */}
                {
                    form.asignacion === 'opr' && (
                        <>
                            {/* Cliente */}
                            <Autocomplete
                                style={stylePadre}
                                options={clientes}
                                getOptionLabel={(opt) => opt?.nombre_cliente || ''}
                                isOptionEqualToValue={(option, value) => option.id_cliente === value.id_cliente}
                                value={form.cliente}
                                onChange={(e, value) => {
                                    const updatedForm = {
                                        ...form,
                                        cliente: value
                                    };
                                    setForm(updatedForm);
                                    validateForm(updatedForm);
                                }}
                                disabled={form.asignacion === '' || clientes.length === 0}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            label="Cliente"
                                            variant="outlined"
                                        />
                                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                                            <p style={styleToolTip}>*</p>
                                        </Tooltip>
                                    </>
                                )}
                            />
                            {/* Operación */}
                            <Autocomplete
                                style={stylePadre}
                                options={operaciones}
                                getOptionLabel={(opt) => opt?.nombre_operacion || ''}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={form.operacion}
                                onChange={(e, value) => {
                                    const updatedForm = {
                                        ...form,
                                        operacion: value
                                    };
                                    setForm(updatedForm);
                                    validateForm(updatedForm);
                                }}
                                disabled={form.cliente === '' || clientes.length === 0}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            label="Operación"
                                            variant="outlined"
                                        />
                                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                                            <p style={styleToolTip}>*</p>
                                        </Tooltip>
                                    </>
                                )}
                            />
                            {/* Segmento */}
                            <Autocomplete
                                style={stylePadre}
                                options={segmentos}
                                getOptionLabel={opt => opt?.nombre_segmento || ''}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={form.segmento}
                                onChange={(e, value) => {
                                    const updatedForm = {
                                        ...form,
                                        segmento: value
                                    };
                                    setForm(updatedForm);
                                    validateForm(updatedForm);
                                }}
                                disabled={form.operacion === '' || operaciones.length === 0}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            label="Segmento" variant="outlined"
                                        />
                                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                                            <p style={styleToolTip}>*</p>
                                        </Tooltip>
                                    </>
                                )}
                            />
                            {/* Servicio */}
                            <Autocomplete
                                style={stylePadre}
                                options={servicios}
                                getOptionLabel={opt => opt?.nombre_servicio || ''}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={form.servicio}
                                onChange={(e, value) => {
                                    const updatedForm = {
                                        ...form,
                                        servicio: value
                                    };
                                    setForm(updatedForm);
                                    validateForm(updatedForm);
                                }}
                                disabled={form.segmento === '' || servicios.length === 0}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            label="Servicio"
                                            variant="outlined"
                                        />
                                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                                            <p style={styleToolTip}>*</p>
                                        </Tooltip>
                                    </>
                                )}
                            />
                        </>
                    )
                }
                {/* Formulario Administrativo */}
                {
                    form.asignacion === 'adm' && (
                        <>
                            {/* Proceso */}
                            <Autocomplete
                                style={stylePadre}
                                // options={options}
                                getOptionLabel={(opt) => opt.label}
                                value={form.proceso}
                                onChange={handleAutoComplete('proceso')}
                                disabled={form.asignacion === ''}
                                renderInput={(params) => (
                                    <>
                                        <TextField {...params} label="Proceso" variant="outlined" />
                                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                                            <p style={styleToolTip}>*</p>
                                        </Tooltip>
                                    </>
                                )}
                            />
                            {/* Operación */}
                            <Autocomplete
                                style={stylePadre}
                                // options={options}
                                getOptionLabel={(opt) => opt.label}
                                value={form.ara}
                                onChange={handleAutoComplete('area')}
                                disabled={!form.ara}
                                renderInput={(params) => (
                                    <>
                                        <TextField {...params} label="Área" variant="outlined" />
                                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                                            <p style={styleToolTip}>*</p>
                                        </Tooltip>
                                    </>
                                )}
                            />
                        </>
                    )
                }

            </div>

            {/* Botones para descarga o cargue de datos */}
            <div className='d-flex gap-5 my-3 justify-content-center mt-4 mb-5'>
                <div className='d-flex align-items-center justify-content-between gap-3'>
                    <Typography variant="h5" gutterBottom>
                        Descargar Plantilla
                    </Typography>

                    {/* Input de archivo oculto */}
                    <input
                        type='file'
                        accept='.xlsx, .xls'
                        ref={downloadInputRef}
                        style={{ display: 'none' }}
                    />
                    {/* Botón para cargar plantilla de excel */}
                    <button
                        className="btn btn-sm btn-warning"
                        disabled={!isValidForm && !dataDisponible}
                        onClick={() => {
                            descargarPlantilla()
                        }}>
                        {
                            dataDisponible
                                ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                                : (<i className="bi bi-download fs-5" />)
                        }
                    </button>
                </div>


                <div className='d-flex align-items-center justify-content-between gap-3'>
                    <Typography variant="h5" gutterBottom>
                        Cargue masivos
                    </Typography>

                    {/* Input de archivo oculto */}
                    <input
                        type='file'
                        accept='.xlsx, .xls'
                        ref={uploadInputRef}
                        style={{ display: 'none' }}
                        onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) cargueMasivos(file)
                        }}
                    />
                    {/* Botón para cargar plantilla de excel */}
                    <button
                        className="btn btn-sm btn-success"
                        disabled={!isValidForm && !dataDisponible}
                        onClick={() => uploadInputRef.current?.click()}>
                        {
                            dataDisponible
                                ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                                : (<i className="bi bi-upload fs-5" />)
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default FormularioAsignacion;