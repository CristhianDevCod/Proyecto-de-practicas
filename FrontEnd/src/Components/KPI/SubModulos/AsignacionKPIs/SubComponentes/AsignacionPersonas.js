import React, {
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import FormularioAsignacion from "./AsignacionPersonas/FormularioAsignacion";
import { getAllResultsCollaborator } from "../../../../ReusablesModulo/TableKpi/columns";
import {
    esES,
    notification
} from "../../../../../Exports-Modules/Exports";
import {
    GETALLCOLLABORATORJERARQUIAS,
    GETALLCOLLABORATORMASIVEKPI,
    INSERTUPDATECOLLABORATORKPIS,
    GETALLKPISINDIVIDUAL,
    GETALLKPISASIGNABLESINDIVIDUAL,
    INSERTUPDATESINGLECOLLABORATOR
} from "../../../../../API/API";
// import { UserProfileContext } from "../../../../../Context/ProfileContex";
import { CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid } from "../../../style/styles";
import Typography from '@mui/material/Typography';
import { Alert, TextField } from "@mui/material";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
// import MultipleSelectChip from "../../../../ReusablesModulo/Selector/SelectorMultiple";
import { createRoot } from "react-dom/client";
import GenericSelectorMultiple from "../../../../ReusablesModulo/Selector/GenericoSelectorMultiple";
import { UserProfileContext } from "../../../../../Context/ProfileContex";
import TablaFiltroKPI from "../../../../ReusablesModulo/tablaFiltroKPI/TablaFiltroKPI";

const AsignacionPersonas = () => {
    const [loading, setLoading] = useState(false);
    const [isTableActive, setTableActive] = useState(false);
    const [operacionDB, setOperacionDB] = useState({});
    const [servicioDB, setServicioDB] = useState({});
    const [searchCollaborators, setSearchCollaborators] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const { fullName } = useContext(UserProfileContext);
    const usuarioGestor = fullName[0].Usuario_Red;

    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });
    const [collaborators, setCollaborators] = useState([]);
    const getAll = useCallback(async () => {
        if (
            isTableActive &&
            Object.values(servicioDB).length > 0 &&
            Object.values(operacionDB).length > 0
        ) {
            setLoading(true)
            try {
                const collaboratorsResponse = await GETALLCOLLABORATORJERARQUIAS(operacionDB.nombre_operacion, servicioDB.nombre_servicio);
                const collaboratorsData = Array.isArray(collaboratorsResponse.data) ? collaboratorsResponse.data : [];
                setCollaborators(collaboratorsData)
            } catch (error) {
                console.log("Error al obtener los datos: ", error);
            } finally {
                setLoading(false)
            }
        }
    }, [isTableActive, operacionDB, servicioDB])
    useEffect(() => {
        getAll()
    }, [getAll])

    // Función para descargar la plantilla
    const descargarPlantilla = async () => {
        try {
            // Establecer variables
            const colaboradoresData = collaborators;
            // Construir el payload para el backend
            const { items } = buildKpiPayLoad(servicioDB.id_servicio, colaboradoresData)
            // Enviar data
            const response = await GETALLCOLLABORATORMASIVEKPI(servicioDB.id_servicio, items);

            const raw = response.data;

            // Se mapea cada objeto para estructurar el excel
            const rows = raw.map(item => ({
                usuarioRed: item.usuarioRed,
                documento: item.documento,
                nombre: item.nombre,
                // Se convierte el array de kpi_id en un string
                kpi_id: Array.isArray(item.kpi_id)
                    ? item.kpi_id.join(',')
                    : item.kpi_id
            }));

            // Crear la hoja y el libro
            const ws = XLSX.utils.json_to_sheet(rows, {
                header: ['usuarioRed', 'documento', 'nombre', 'kpi_id']
            });
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'KPIs');

            // Descarga el archivo
            XLSX.writeFile(wb, 'plantilla_cargue_masivo.xlsx');
        }
        catch (err) {
            if (err.response.data.code === "NO_KPIS_FOR_SERVICE") {
                // Notificar al usuario
                api.error({
                    message: 'Error',
                    description: "Primero debes relacionar KPIs a este servicio, Puedes hacerlo en \"KPIS OPERATIVOS\"",
                    duration: 40
                });
                return;
            };
            if (err.response.data.code === "KPI_MEASURABLE_IN_PEOPLE") {
                // Notificar al usuario
                api.error({
                    message: 'Error',
                    description: "Todos los KPIs asignados a este servicio no son aplicables a personas, puedes consultar los detalles de un KPI en la tabla \"Tabla de búsqueda de KPIs\" en la parte inferior de esta página.",
                    duration: 40
                });
                return;
            }
            console.error('Error generando Excel:', err);
        }
    };

    // Función para preparar el payload
    const buildKpiPayLoad = (servicioId, collaborators) => {
        if (!Array.isArray(collaborators) || typeof servicioId !== 'number') {
            throw new Error('Error con los tipos de datos')
        }

        const items = collaborators.map(collab => {
            const { avaya: usuarioRed, cedula: documento, nombre_completo: nombre } = collab;
            if (!usuarioRed || !documento || !nombre) {
                throw new Error('Cada colaborador debe tener usuario de red, documento y nombre');
            }
            return { usuarioRed, documento, nombre };
        });
        return {
            servicio_id: servicioId,
            items
        };
    }

    // Función para realizar el cargue masivo
    const cargueMasivos = (file) => {
        const reader = new FileReader();
        console.log(reader)
        reader.onload = async (e) => {
            try {
                // Leer el contenido 
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Tomar la primera hoja
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convertir a JSON
                const rawRows = XLSX.utils.sheet_to_json(worksheet, {
                    header: ['usuarioRed', 'documento', 'nombre', 'kpi_id'],
                    defval: '' // para celdas vacías
                });

                // saltar la fila de encabezados
                const rows = rawRows.filter(r => r.usuarioRed && r.usuarioRed !== 'usuarioRed')
                    .map(r => {
                        // parsear kpi_id a array de numbers
                        const kpis = String(r.kpi_id)
                            .split(',')
                            .map(s => s.trim())
                            .filter(s => s !== '')
                            .map(Number)
                            .filter(n => !Number.isNaN(n));

                        return {
                            usuarioRed: String(r.usuarioRed).trim(),
                            documento: String(r.documento).trim(),
                            nombre: String(r.nombre).trim(),
                            kpi_id: kpis
                        };
                    });

                // Enviar al backend
                const response = await INSERTUPDATECOLLABORATORKPIS(rows, usuarioGestor);

                // Extraer los arrays de cada objeto
                const resultados = response.data;
                // Todas las inserciones únicas
                const allInserted = Array.from(
                    new Set(resultados.flatMap(r => r.insertedKpis || []))
                );
                // Todos los invalid únicos
                const allInvalid = Array.from(
                    new Set(resultados.flatMap(r => r.invalidKpis || []))
                );

                // Construir descripción
                let descripcion = `KPIs asociados, IDs: ${allInserted.join(', ')}`;
                if (allInvalid.length > 0) {
                    descripcion += `; kpis inválidos, No se agregarón a base de datos IDs: ${allInvalid.join(', ')}`;
                }

                // Notificar al usuario
                api.success({
                    message: 'Carga exitosa',
                    description: descripcion,
                    duration: 20
                });
                // Aquí se puede notificar al usuario
            } catch (err) {
                api.error({
                    message: "Error",
                    description: `Error procesando el archivo Excel: ${err}`
                });
            }
        };

        reader.onerror = (err) => {
            api.error({
                message: "Error",
                description: `Error leyendo el archivo: ${err}`,
                duration: 20
            });
        };
        reader.readAsArrayBuffer(file);
    }

    // **** Funciones de tabla
    const verAsignaciones = async (row) => {
        try {
            const { avaya, cedula } = row
            const responseAsignacionIndividual = await GETALLKPISINDIVIDUAL(avaya, cedula)
            const kpisAsignadosData = Array.isArray(responseAsignacionIndividual.data)
                ? responseAsignacionIndividual.data
                : []
            Swal.fire({
                title: `Ver KPIs Asignados`,
                icon: "info",
                html: `
                        <div style="display: flex; justify-content: space-around; margin: 30px 0px; flex-direction: column;">
                            <div style="display: flex; justify-content: space-around;">
                                <div style="display: flex; gap: 5px">
                                    <strong>Operación: </strong> <p>${row.servicio_}</p>
                                </div>
                                <div style="display: flex; gap: 5px">
                                    <strong>Servicio: </strong> <p> ${row.servicio}</p>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: center;">
                                <div style="display: flex; gap: 5px">
                                    <strong>Nombre: </strong> <p> ${row.nombre_completo}</p>
                                </div>
                            </div>    
                        </div>
                        <!-- Contenedor para renderizar el componente React -->
                        <div id="react-component-container" style="margin-top: 20px; display: flex; justify-content: center;"></div>
                    `,
                showCancelButton: true,
                cancelButtonColor: "#d33",
                showConfirmButton: false,
                didOpen: () => {
                    const popup = Swal.getPopup();
                    popup.style.width = '600px'

                    // Obtener el contenedor donde se montará el componente
                    const contianer = popup.querySelector("#react-component-container");

                    //Usar createRoot para renderizar el componente
                    const root = createRoot(contianer);

                    root.render(
                        <GenericSelectorMultiple
                            data={kpisAsignadosData}
                            labelProp="nombre_kpi"
                            inputLabel="KPIs Asignados"
                            initialSelected={kpisAsignadosData.map(k => k.nombre_kpi)}
                        />
                    );
                },
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || "Error al cargar los KPIs asignados"
            })
        }
    }
    const asignarIndividual = async (row) => {
        const { avaya, cedula, servicio, nombre_completo } = row; //Destructura el objeto
        let selectedKpiIds = []; //Almacena una selección dinamica

        // KPIs que pueden asignarse
        const response = await GETALLKPISASIGNABLESINDIVIDUAL(servicio);
        const kpisAsignablesData = Array.isArray(response) ? response : [];

        // KPIs que ya estaban asignados
        const responseAsignacionIndividual = await GETALLKPISINDIVIDUAL(avaya, cedula);
        const kpisAsignadosData = Array.isArray(responseAsignacionIndividual.data) ? responseAsignacionIndividual.data : [];
        console.log(kpisAsignadosData)

        // Si se necesitan
        let reactRoot;
        let estaAccion = ''
        let razonEdicion = ''

        // Se extraen los IDs de los asignados inicialmente 
        const initialAssignedIds = kpisAsignablesData.map(kpi => kpi.id_kpi);

        // Operaciones asignar - Editar
        Swal.fire({
            title: `Asignar KPIs`,
            icon: "info",
            html: `
                <div style="display: flex; justify-content: space-around; margin: 30px 0px; flex-direction: column;">
                    <div style="display: flex; justify-content: space-around;">
                        <div style="display: flex; gap: 5px">
                            <strong>Operación: </strong> <p>${row.servicio_}</p>
                        </div>
                        <div style="display: flex; gap: 5px">
                            <strong>Servicio: </strong> <p> ${row.servicio}</p>
                        </div>
                    </div>
                        <div style="display: flex; justify-content: center;">
                            <div style="display: flex; gap: 5px">
                                <strong>Nombre: </strong> <p> ${row.nombre_completo}</p>
                            </div>
                        </div>    
                    </div>
                <div id="react-component-container" style="margin-top: 20px; display: flex; justify-content: center;"></div>
                `,
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6", //Color azul
            confirmButtonText: 'Confirmar Asignación',
            cancelButtonText: 'Cancelar',
            didOpen: () => {
                const popup = Swal.getPopup();
                popup.style.width = '600px'

                // Obtener el contenedor donde se montará el componente
                const contianer = popup.querySelector("#react-component-container");

                //Usar createRoot para renderizar el componente
                const root = createRoot(contianer);
                reactRoot = root;
                root.render(
                    <GenericSelectorMultiple
                        data={kpisAsignablesData}
                        labelProp="nombre_kpi"
                        inputLabel="Asignación de KPIs"
                        initialSelected={kpisAsignadosData.map(k => k.nombre_kpi)}
                        isEditable
                        columns={{ Nombre: "nombre_kpi", Meta: "meta_kpi", Descripcion: "descripcion_kpi", Formula: "formula_medicion" }}
                        onSelectionChange={(arrKPIs) => {
                            console.log(arrKPIs)
                            // Se extraen solo los IDs
                            selectedKpiIds = arrKPIs.map(kpi => kpi.id_kpi);
                            // console.log('IDs seleccionados: ', selectedKpiIds)
                            // console.log('KPIs seleccionados: ', selectedKpiIds)

                            // Se compara con initialAssignedIds
                            const same =
                                selectedKpiIds.length === initialAssignedIds.length &&
                                selectedKpiIds.every(id => initialAssignedIds.includes(id));

                            // Habilitar y cambiar texto/color del botón
                            const confirmBtn = Swal.getConfirmButton();
                            if (!confirmBtn) return;

                            if (initialAssignedIds.length === 0) {
                                // Si nunca existieron asignaciones
                                estaAccion = 'Crear Relación';
                                confirmBtn.textContent = 'Confirmar Asignación';
                                confirmBtn.style.backgroundColor = '#3085d6';
                            } else if (same) {
                                // No cambiaron las asignaciones 
                                estaAccion = 'Crear Relación';
                                confirmBtn.textContent = 'Confirmar Asignación';
                                confirmBtn.style.backgroundColor = '#3085d6';
                            } else {
                                // hubo un cambio (añadido o eliminado)
                                estaAccion = 'Editar Relación';
                                confirmBtn.textContent = "Confirmar Edición"
                                confirmBtn.style.backgroundColor = "#f0ad4e";
                            }
                            // Se abilita el boton siempre que el usuario interacture
                            confirmBtn.disabled = false;
                        }}
                    />
                );

                //por defecto, botón deshabilitado hasta el primer cambio 
                const confirmBtn = Swal.getConfirmButton();
                if (confirmBtn) confirmBtn.disabled = true;
            },
        }).then((result) => {
            //Se desmonta el componente React
            if (reactRoot) reactRoot.unmount();

            //**** Manejar resultado ***** 
            if (result.isConfirmed) {
                // CONTROL DE ACCIONES DE EDITAR
                if (estaAccion === 'Editar Relación') {
                    console.log('Editar relación: ', selectedKpiIds)
                    Swal.fire({
                        title: "Confirmar edición",
                        text: "Ingrese la razón de la edición:",
                        icon: "question",
                        input: 'text',
                        inputPlaceholder: "Razón de la edición",
                        showCancelButton: true,
                        confirmButtonText: "Confirmar",
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        inputValidator: (value) => {
                            if (!value.trim()) {
                                return 'Debe ingresar una razón de edición';
                            }
                        }
                    }).then(async (result2) => {
                        if (result2.isConfirmed) {
                            //Se toma el valor de la razón 
                            razonEdicion = result2.value.trim();
                            //Se realiza la llamada al endpoint

                            try {
                                const payload = {
                                    usuarioRed: avaya,
                                    documento: cedula,
                                    nombre_completo: nombre_completo,
                                    kpiIds: selectedKpiIds,
                                    razonEdicion: razonEdicion,
                                    accionIndividual: estaAccion,
                                    usuarioGestor: usuarioGestor
                                }
                                const response = await INSERTUPDATESINGLECOLLABORATOR(payload);
                                // estaAccion: estaAccion
                                // usuarioGestor : usuarioGestor

                                //}
                                if (!response.success) {
                                    throw new Error(response.message || 'Error desconocido');
                                }
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Acción exitosa',
                                    text: `Se editó el servicio y se actualizaron ${selectedKpiIds.length} Kpis`
                                });
                                getAll();
                            } catch (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: error.message || 'Error al realizar la acción'
                                });
                            }
                        }
                    });
                } else {
                    // CONTROL DE ACCIONES DE AGREGAR
                    Swal.fire({
                        title: "Confirmar agregar",
                        text: "¿Estas seguro agregar los indicadores a esta persona?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Confirmar",
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33"
                    }).then(async (result2) => {
                        if (result2.isConfirmed) {
                            //Se realiza la llamada al endpoint
                            const payload = {
                                usuarioRed: avaya,
                                documento: cedula,
                                nombre_completo: nombre_completo,
                                kpiIds: selectedKpiIds,
                                razonEdicion: razonEdicion,
                                accionIndividual: estaAccion,
                                usuarioGestor: usuarioGestor
                            }
                            try {
                                const response = await INSERTUPDATESINGLECOLLABORATOR(payload);

                                if (!response.success) {
                                    throw new Error(response.message || 'Error desconocido');
                                }
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Acción exitosa',
                                    text: `Se asignó el servicio con ${selectedKpiIds.length} KPIS`
                                });
                                getAll();
                            } catch (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: error.message || 'Error al realizar la acción'
                                });
                            }
                        }
                    });
                }
            }
        });
    }


    // Descripcion de las columnas
    const tblCollaborator = getAllResultsCollaborator(verAsignaciones, asignarIndividual)

    // Codigo para filtrar por cedula, nombre, usuarioRed
    const filtroPersonas = Array.isArray(collaborators)
        ? collaborators.filter((colaborador) =>
            colaborador.cedula.includes(searchCollaborators) || //Celula
            colaborador.avaya.toLowerCase().includes(searchCollaborators.toLowerCase()) || //Usuario de red
            colaborador.nombre_completo.toLowerCase().includes(searchCollaborators.toLowerCase())) //Nombre usuario
        : {};

    return (
        <>
            {contextHolder}
            {/* Formulario de asignaciones masivas */}
            <Typography variant="h5" marginBottom={3}>Formulario de asignación masivo</Typography>
            <FormularioAsignacion
                setTableActive={setTableActive}
                setOperacionDB={setOperacionDB}
                setServicioDB={setServicioDB}
                loading={loading}
                descargarPlantilla={descargarPlantilla}
                cargueMasivos={cargueMasivos}
            />
            {
                loading
                    ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status"></div></div>)
                    : (
                        <>

                            <Typography variant="h5" marginBottom={3}>Tabla de asignación individual</Typography>
                            {
                                isTableActive
                                    ? (
                                        <>
                                            <div className="d-flex align-items-center">
                                                <div className="p-2 flex-grow-1 text-muted mb-4">
                                                    Número de registros:{" "}
                                                    {
                                                        filtroPersonas &&
                                                        filtroPersonas.length &&
                                                        filtroPersonas.length
                                                    }
                                                </div>
                                                <div className="p-2">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        type="search"
                                                        label="Buscar"
                                                        variant="outlined"
                                                        value={searchCollaborators}
                                                        onChange={(e) =>
                                                            setSearchCollaborators(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <StyledDataGrid
                                                rowHeight={40}
                                                columns={tblCollaborator}
                                                rows={filtroPersonas}
                                                pageSizeOptions={[PAGE_SIZE]}
                                                paginationModel={paginationModel}
                                                getRowId={(data) => data.cedula}
                                                onPaginationModelChange={setPaginationModel}
                                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                                slots={{
                                                    noRowsOverlay: CustomNoRowsOverlay,
                                                    pagination: CustomPagination,
                                                }}
                                            />
                                        </>
                                    )
                                    : (
                                        <Alert severity="warning">{'Por favor completa el formulario'}</Alert>
                                    )
                            }
                        </>
                    )
            }
            <div className="mt-4">
                <Typography variant="h5" marginBottom={3}>Tabla de búsqueda de KPIs</Typography>
                <TablaFiltroKPI />
            </div>
        </>
    )
}

export default AsignacionPersonas;