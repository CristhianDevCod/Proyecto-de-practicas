import {
    GETALLJERARQUIAS,
    GETALLKPISERVICIOSFILTRADO
} from "../../../../../API/API.js";
import {
    CustomNoRowsOverlay,
    CustomPagination,
    PAGE_SIZE,
    StyledDataGrid,
} from "../../../style/styles.js";
import { getServicios } from "../../../../ReusablesModulo/TableKpi/columns.js";
import {
    React,
    useState,
    TextField,
    esES,
    useCallback,
    useEffect,
    Swal,
    useContext
} from "../../../../../Exports-Modules/Exports.js";
import apiClient from "../../../../../Service/Service.js";
import MultipleSelectChip from "../../../../ReusablesModulo/Selector/SelectorMultiple.js";
import { createRoot } from "react-dom/client";
import { UserProfileContext } from "../../../../../Context/ProfileContex.js";



const KpiOperativos = () => {
    const [loading, setLoading] = useState(false);
    const [operativos, setOperativos] = useState([]);
    const [searchOperativos, setSearchOperativos] = useState("");
    const { fullName } = useContext(UserProfileContext);
    const nombreUsuario = fullName[0].Usuario_Red;
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });


    //Función para obtener todos los KPIs
    const getAll = useCallback(async () => {
        setLoading(true)
        try {
            const responseServicios = await GETALLJERARQUIAS();
            setOperativos(responseServicios);
        } catch (error) {
            console.log("Error al obtener los datos: ", error);
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        getAll()
    }, [getAll])

    // Ver KPIS asignados
    const verServicio = async (row) => {
        try {
            //Llamada al endpoint para obtener todos los KPIs
            const response = await apiClient.get(`/API/GET-ALL-KPIS-SERVICIOS/`);

            const kpis = Array.isArray(response.data)
                ? response.data
                : response.data.data || [];

            const kpisRelacionados = kpis.filter(kpi => (
                kpi.servicio_id === row.id_servicio
            ));

            Swal.fire({
                title: `Ver KPIs Asignados`,
                icon: "info",
                html: `
                        <div style="display: flex; justify-content: space-around; margin: 30px 0px">
                            <div>
                                <div style="display: flex; gap: 5px">
                                    <strong>Cliente</strong> <p>${row.nombre_cliente}</p>
                                </div>
                                <div style="display: flex; gap: 5px">
                                    <strong>Operación</strong> <p> ${row.nombre_operacion}</p>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; gap: 5px">
                                    <strong>Segmento</strong> <p> ${row.nombre_segmento}</p>
                                </div>
                                <div style="display: flex; gap: 5px">
                                    <strong>Servicio</strong> <p> ${row.nombre_servicio}</p>
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
                        <MultipleSelectChip
                            isEditable={false}
                            initialSelectedKpis={kpisRelacionados}
                            KPIS={GETALLKPISERVICIOSFILTRADO}
                        />
                    );
                },
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Error al cargar los KPIs asignados"
            });
        }
    };

    //Evento Asignar KPI
    const asignacionOperativos = async (row) => {
        let selectedKpiIds = [];
        let reactRoot;
        const response = await apiClient.get(`/API/GET-ALL-KPIS-SERVICIOS/`);
        const kpis = Array.isArray(response.data)
            ? response.data
            : response.data.data || [];
        const kpisRelacionados = kpis.filter(kpi => kpi.servicio_id === row.id_servicio);

        let accionServicio = ''
        let razonEdicion = ''

        //Obtén los IDs de los KPI asignados originalmente
        const initialKpiIds = kpisRelacionados.map(kpi => kpi.kpi_id);

        Swal.fire({
            title: `Asignar KPIs`,
            icon: "info",
            html: `<div style="display: flex; justify-content: space-around; margin: 30px 0px">
                        <div>
                            <div style="display: flex; gap: 5px">
                                <strong>Cliente</strong> <p>${row.nombre_cliente}</p>
                            </div>
                            <div style="display: flex; gap: 5px">
                                <strong>Operación</strong> <p> ${row.nombre_operacion}</p>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; gap: 5px">
                                <strong>Segmento</strong> <p> ${row.nombre_segmento}</p>
                            </div>
                            <div style="display: flex; gap: 5px">
                                <strong>Servicio</strong> <p> ${row.nombre_servicio}</p>
                            </div>
                        </div>    
                    </div>
                    <!-- Contenedor para renderizar el componente React -->
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
                    <MultipleSelectChip
                        isEditable={true}
                        onSelectionChange={(ids) => {
                            selectedKpiIds = ids;
                            //Habilitar el botón de confirmación al detectar un cambio
                            const confirmBtn = Swal.getConfirmButton();
                            if (confirmBtn) {
                                //Función para comparar arrays (sin importar el orden)
                                const arraysEqual = (a, b) => {
                                    if (a.length !== b.length) return false;
                                    return a.every(item => b.includes(item));
                                };

                                if (initialKpiIds.length === 0) {
                                    //Servicio sin asignacionesOperativos previas, btn inicial
                                    confirmBtn.textContent = "Confirmar Asignación";
                                    confirmBtn.style.backgroundColor = "#3085d6";
                                    accionServicio = 'Crear Relación'
                                } else {
                                    //Si la selección actual es igual a la inicial 
                                    if (arraysEqual(ids, initialKpiIds)) {
                                        confirmBtn.textContent = "Confirmar Asignación";
                                        confirmBtn.style.backgroundColor = "#3085d6";
                                        accionServicio = 'Crear Relación'
                                    } else {
                                        confirmBtn.textContent = "Confirmar edición";
                                        confirmBtn.style.backgroundColor = "#f0ad4e"; //Naranja
                                        accionServicio = 'Editar Relación'
                                    }
                                }
                                confirmBtn.disabled = false;
                            }
                        }}
                        initialSelectedKpis={kpisRelacionados}
                        KPIS={GETALLKPISERVICIOSFILTRADO}
                    />
                );

                //Deshailitar inicialmente el botón de confirmación
                const confirmBtn = Swal.getConfirmButton();
                if (confirmBtn) {
                    confirmBtn.disabled = true;
                }
            },
        }).then((result) => {
            //Se desmonta el componente React
            if (reactRoot) reactRoot.unmount();

            //Manejar resultado
            if (result.isConfirmed) {
                //Si la acción es de edición, se muestra un campo obligatorio para la razón
                if (accionServicio === 'Editar Relación') {
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
                                const response = await apiClient.post(
                                    '/API/INSERT-UPDATE/JERARQUIAS-KPI/',
                                    {
                                        servicio_id: row.id_servicio,
                                        kpi_ids: selectedKpiIds,
                                        usuario: nombreUsuario,
                                        accionServicio: accionServicio,
                                        razonEdicion: razonEdicion
                                    }
                                );
                                if (!response.data?.success) {
                                    throw new Error(response.data?.message || 'Error desconocido');
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
                    Swal.fire({
                        title: "Confirmar acción",
                        text: "¿Está seguro de confirmar esta acción?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Confirmar",
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33"
                    }).then(async (result2) => {
                        if (result2.isConfirmed) {
                            //Se realiza la llamada al endpoint
                            try {
                                const response = await apiClient.post(
                                    '/API/INSERT-UPDATE/JERARQUIAS-KPI/',
                                    {
                                        servicio_id: row.id_servicio,
                                        kpi_ids: selectedKpiIds,
                                        usuario: nombreUsuario,
                                        accionServicio: accionServicio
                                    }
                                );
                                if (!response.data?.success) {
                                    throw new Error(response.data?.message || 'Error desconocido');
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
    };

    const tblServicios = getServicios(verServicio, asignacionOperativos)

    //Algoritmo para filtrar
    // console.log(operativos)
    const filtroOperativos = Array.isArray(operativos)
        ? operativos.filter((item) =>
            item.nombre_cliente.toLowerCase().includes(searchOperativos.toLowerCase()) ||
            item.nombre_operacion.toLowerCase().includes(searchOperativos.toLowerCase()) ||
            item.nombre_servicio.toLowerCase().includes(searchOperativos.toLowerCase()))
        : {};

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        )
    }

    return (
        <>
            <div className="d-flex align-items-center">
                <div className="p-2 flex-grow-1 text-muted mb-4">
                    Número de registros:{" "}
                    {filtroOperativos && filtroOperativos.length && filtroOperativos.length}
                </div>
                <div className="p-2">
                    <TextField
                        fullWidth
                        size="small"
                        type="search"
                        label="Buscar"
                        variant="outlined"
                        value={searchOperativos}
                        onChange={(e) => setSearchOperativos(e.target.value)}
                    />
                </div>
            </div>

            <StyledDataGrid
                rowHeight={40}
                columns={tblServicios}
                rows={filtroOperativos}
                pageSizeOptions={[PAGE_SIZE]}
                paginationModel={paginationModel}
                getRowId={(data) => data.id_servicio}
                onPaginationModelChange={setPaginationModel}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                    pagination: CustomPagination,
                }}
            />
        </>
    )
}

export default KpiOperativos;