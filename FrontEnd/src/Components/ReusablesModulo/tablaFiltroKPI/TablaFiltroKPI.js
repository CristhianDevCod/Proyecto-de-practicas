import { TextField } from "@mui/material";
// import { ItemContent } from "../../KPI/style/styles";
// import { StyledDataGrid } from "../../Logs/Styles/Styles";
import { useCallback, useEffect, useState } from "react";
import { getAllKPI } from "../TableKpi/columns.js";
import {
    CustomNoRowsOverlay,
    ItemContent,
    CustomPagination,
    PAGE_SIZE,
    StyledDataGrid,
} from "../../KPI/style/styles.js";
import { esES } from "@mui/x-data-grid";
import { GETALLKPI } from "../../../API/API.js";
import FormularioKPI from "../Formulario/FormularioKPI.js";

const TablaFiltroKPI = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [kpiSeleccionado, setKpiSeleccionado] = useState(null);
    const [modoEditar, setModoEditar] = useState(false);
    const [modoDetalles, setModoDetalles] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 3,
        page: 0,
    });

    //Función para obtener todos los KPIs
    const getAll = useCallback(async () => {
        try {
            const response = await GETALLKPI();

            setData(response);
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

    //Otener las columnas pasando las funciones como parámetros
    const columns = getAllKPI(handleDetalles)

    //Algoritmo para filtrar
    const filteredItems = Array.isArray(data)
        ? data.filter((item) => {
            const searchLower = searchQuery.toLowerCase();
            const idQuery = Number(searchQuery); //Intenta convertir a número
            return (
                item.nombre_kpi.toLowerCase().includes(searchLower) ||
                (!isNaN(idQuery) && item.id_kpi === idQuery));
        })
        : [];


    return (
        <ItemContent elevation={3}>
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
                    Número de KPIs:{" "}
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
    )
}

export default TablaFiltroKPI;