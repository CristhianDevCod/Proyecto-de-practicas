// import CustomizedSwitch from "./CustomizedSwitch";
import { Button } from "@mui/joy";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import BotonEstado from "./BotonEstado.jsx";
import BotonPlanDeAccion from "./BotonPlanDeAccion.jsx";

// Columna analisis de tendencia
const colTendenciaEstado = () => ({
    field: "estado_id",
    headerName: "Estado",
    flex: 1,
    renderCell: (params) => <BotonEstado valor={params.value}/>
})
const colTendenciaId = {
    field: "id",
    headerName: "Id",
    flex: 0.5
}
const colTendenciaNombre = {
    field: "nombre_kpi",
    headerName: "Nombre",
    flex: 1
}
const colTendenciaResponsable = {
    field: "responsable",
    headerName: "Responsable",
    flex: 1
}
//Columna: Detalles 
const colTendenciaDetalles = (handleDetalles) => ({
    field: "detalles",
    headerName: "Ver Detalles",
    flex: 0.7,
    renderCell: (params) => (
        <Button
            variant="soft"
            size="sm"
            color="primary"
            onClick={() => handleDetalles(params.row)}
            sx={{
                display: "flex",
                alignItems: "center",
                marginY: 0,
                padding: "4px",
                minWidth: "50px",
                height: "90%",
                marginTop: '2px'
            }}>
            <RemoveRedEyeRoundedIcon/>
        </Button>
    )
})
// Columna plan de accion
const colTendenciaPlanAccion = (actionPlaneManagement) => ({
    field: "planDeAccion",
    headerName: "Plan de Acción",
    flex: 1,
    renderCell: (params) => <BotonPlanDeAccion row={params.row} actionPlaneManagement={actionPlaneManagement}/>
})

// Tabla para analisis de tendencia
export const getAllAnalisis = (handleDetalles, actionPlaneManagement) => [
    colTendenciaEstado(),
    colTendenciaId,
    colTendenciaNombre,
    colTendenciaResponsable,
    colTendenciaDetalles(handleDetalles),
    colTendenciaPlanAccion(actionPlaneManagement),
]