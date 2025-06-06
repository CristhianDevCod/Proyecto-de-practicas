import {
    React,
    useState,
    TextField,
    Typography,
    esES,
    useCallback,
    useEffect
} from "../../../Exports-Modules/Exports.js";
import '../style/styles.css';
import { GETALLKPI, GETALLLOGKPIFILTER } from "../../../API/API.js";
import {
    CustomNoRowsOverlay,
    ItemContent,
    CustomPagination,
    PAGE_SIZE,
    StyledDataGrid,
} from "../style/styles.js";
import FormularioKPI from '../../ReusablesModulo/Formulario/FormularioKPI.js';
import { getGestionKPIs } from "../../ReusablesModulo/TableKpi/columns.js";
// import Service from "../../../Machine/Service.js";
// import { UserProfileContext } from "../../../Context/ProfileContex.js";
import { useLocation } from "react-router-dom";

//variables
const nombreSub = 'Visualización de KPIs';

const Sub_GestionKpi = () => {

    const [data, setData] = useState([]);
    const [logs, setLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [modoDetalles, setModoDetalles] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [kpiSeleccionado, setKpiSeleccionado] = useState(null);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });

    //Obtener la ubicacion actual
    const location = useLocation();
    const gestionDeKPI = '/home/GestionKPI';
    const isActive = location.pathname === gestionDeKPI;

    //Algoritmo para filtrar
    const filteredItems = Array.isArray(data)
        ? data.filter((item) =>
            item.nombre_kpi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.meta_kpi.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : []; //Si no hay resgistros retorna un arreglo vacio

    //Función para obtener todos los KPIs
    const getAll = useCallback(async () => {
        try {
            const responseKPI = await GETALLKPI();
            const responseLogs = await GETALLLOGKPIFILTER();

            // Filtrar quellos kpis que no son administrativos
            const adminKpi = Array.isArray(responseKPI)
                ? responseKPI.filter((kpi) => {
                    return kpi.proceso_kpi_id === 3
                })
                : {};
            setData(adminKpi);
            setLogs(responseLogs);

        } catch (error) {
            console.log("Error al obtener los datos: ", error);
        }
    }, [])
    useEffect(() => {
        getAll()
    }, [getAll])

    //Función para actualizar la lista después de una inserción exitosa
    const onInsertSuccess = () => {
        getAll();
    }

    //Funciones para manejar los eventos de los iconos
    const handleDetalles = (row) => {
        setKpiSeleccionado(row); //Almacena el kpi seleccionado
        setModoDetalles(true); //Sctiva el modo detalles
        setModoEditar(false);
    }
    const handleEditar = (row) => {
        setKpiSeleccionado(row);
        setModoDetalles(false)
        setModoEditar(true)
    }

    // console.log(logs)
    //Otener las columnas pasando las funciones como parámetros
    const columns = getGestionKPIs(handleDetalles, handleEditar, logs, isActive)

    return (
        <>
            <ItemContent elevation={10} sx={{ marginY: '2rem' }}>
                <div className="text-center">
                    <div className="title-mis-novedades">
                        <Typography variant="h4" gutterBottom>
                            {nombreSub}
                        </Typography>
                    </div>
                </div>
            </ItemContent>

            <ItemContent elevation={3}>
                {/* Botones */}
                <FormularioKPI
                    onInsertSuccess={onInsertSuccess}
                    modoDetalles={modoDetalles}
                    modoEditar={modoEditar}
                    kpiData={kpiSeleccionado}
                    //Desactiva el modo detalles al cerrar
                    onClose={() => {
                        setModoDetalles(false);
                        setModoEditar(false);
                    }}

                ></FormularioKPI>

                <div className="d-flex align-items-center">
                    <div className="p-2 flex-grow-1 text-muted mb-4">
                        Número de registros:{" "}
                        {filteredItems && filteredItems.length && filteredItems.length}
                    </div>
                    <div className="p-2">
                        <TextField
                            fullWidth
                            size="small"
                            type="search"
                            label="Buscar"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <StyledDataGrid
                    rowHeight={40}
                    columns={columns}
                    rows={filteredItems}
                    pageSizeOptions={[PAGE_SIZE]}
                    paginationModel={paginationModel}
                    getRowId={(data) => data.id_kpi}
                    onPaginationModelChange={setPaginationModel}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                        pagination: CustomPagination,
                    }}
                />
            </ItemContent>
        </>
    );
};

export default Sub_GestionKpi;