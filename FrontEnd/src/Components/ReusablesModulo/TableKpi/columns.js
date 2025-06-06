import CustomizedSwitch from "./CustomizedSwitch";
import { IconButton } from "@mui/joy";
import { Button } from "@mui/joy";
import {
    EditRoundedIcon,
    RemoveRedEyeRoundedIcon
} from "../../../Exports-Modules/Exports";
// import BotonEstado from "./BotonEstado";
import BotonEstado from "./BotonEstado";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

//Función genérica para renderizar texto
const renderText = (map, idKey, defaultValue = 'No asignado') => (params) => {
    const value = map[params.row[idKey]] || defaultValue;
    return <p>{value}</p>
}

//Funcipon genérica para renderizar botones
const renderButton = (icon, onClick, options = {}) => (params) => (
    <Button
        variant={options.variant || 'soft'}
        size={options.size || 'sm'}
        color={options.color || 'primary'}
        disabled={options.disabled ? options.disabled(params.row) : false}
        onClick={() => onClick(params.row)}
    >
        {icon}
    </Button>
)
//-------------------------------

//Columna: Estado
const colEstado = () => ({
    field: 'estado_kpi_id',
    headerName: "Estado",
    flex: 1.5,
    renderCell: (params) => <BotonEstado valor={params.value} />
})
//Columna: Nombre
const colNombre = {
    field: "nombre_kpi",
    headerName: "Nombre",
    flex: 2.5
}
//Columna: Nombre
const colID = {
    field: "id_kpi",
    headerName: "Id KPI",
    flex: 2.5
}
//Columna: Detalles 
const colDetalles = (handleDetalles) => ({
    field: "detalles",
    headerName: "Ver Detalles",
    flex: 1,
    renderCell: renderButton(<RemoveRedEyeRoundedIcon color="primary" />, handleDetalles)
})
//Columna: Editar
const colEditar = (handleEditar, tipo = 'Editar', isActive = false) => ({
    field: "editar",
    headerName: tipo,
    flex: 1,
    renderCell: renderButton(
        <EditRoundedIcon fontSize="small" />,
        handleEditar,
        {
            color: "warning",
            disabled: (row) => isActive ? false : (row.estado_kpi_id === 1 || row.estado_kpi_id === 3),
            // disabled: (row) => row.estado_kpi_id === 1 || row.estado_kpi_id === 3
        },
    )
});
//Columna: Habilitar 
const colHabilitar = (handleHabilitar) => ({
    field: "habilitar",
    headerName: "Habilitar",
    flex: 1,
    renderCell: (params) => (
        <IconButton
            onClick={() => {
                if (params.row.estado_kpi_id === 2 || params.row.estado_kpi_id === 3) {
                    handleHabilitar(params.row);
                }
            }}
            sx={{
                "&:hover": { background: "transparent" },
                backgroundColor: "transparent"
            }}>
            <CustomizedSwitch estado={params.row.estado_kpi_id} />
        </IconButton>
    )
})
//Columna: Gestor de kpi
const colGestorKPI = (usuariosLog) => ({
    field: "usuario",
    headerName: "Gestor KPI",
    flex: 2,
    renderCell: (params) => {
        //Buscar en el array de logs la entrada que corresponda al id_kpi del kpi actual
        const logEntry = Array.isArray(usuariosLog)
            ? usuariosLog.find(log => log.id_kpi === params.row.id_kpi)
            : null;
        return <p>{logEntry ? logEntry.usuario : 'No disponible'}</p>
    }
});
//Columna: Descripcion
const colUltimoMensaje = (usuariosLog) => ({
    field: "descripcion",
    headerName: "Último mensaje",
    flex: 2,
    renderCell: (params) => {
        const logEntry = Array.isArray(usuariosLog)
            ? usuariosLog.find(log => log.id_kpi === params.row.id_kpi)
            : null;
        return <p>{logEntry ? logEntry.descripcion : "Sin mensaje"}</p>
    }
});
//Columna: Accion
const colAccionKpi = (usuariosLog) => ({
    field: "accion",
    headerName: "Acción KPI",
    flex: 1.5,
    renderCell: (params) => {
        const logEntry = Array.isArray(usuariosLog)
            ? usuariosLog.find(log => log.id_kpi === params.row.id_kpi)
            : null;
        return <p>{logEntry ? logEntry.accion : "Sin acción"}</p>
    }
})
//Columna: Tipo
const colTipo = (typeKpiMap) => ({
    field: "tipo_kpi_id",
    headerName: "Tipo",
    flex: 2,
    renderCell: renderText(typeKpiMap, "tipo_kpi_id")
});
//Columna: Meta
const colMeta = {
    field: "meta_kpi",
    headerName: "Meta",
    flex: 1.5
}
//Columna: Responsable
const colResponsable = {
    field: "responsable_upd",
    headerName: "Responsable",
    flex: 2,
}
//Columna: Periocidad
const colPeriodicidad = (periodiKpiMap) => ({
    field: "periodicidad_id",
    headerName: "Periodicidad",
    flex: 1,
    renderCell: renderText(periodiKpiMap, "periodicidad_id")
});

//Descripción operativo
const colCliente = (flexOp = 1.5) => ({
    field: "nombre_cliente",
    headerName: "Cliente",
    flex: { flexOp }
})
const colOperacion = {
    field: "nombre_operacion",
    headerName: "Operación",
    flex: 1
}
const colSegmento = {
    field: "nombre_segmento",
    headerName: "Segmento",
    flex: 1
}
const colServicio = {
    field: "nombre_servicio",
    headerName: "Servicio",
    flex: 1
}
const verAsignacion = (verKpiAsignado) => ({
    field: "verAsignacion",
    headerName: "Ver Asignaciones",
    flex: 1,
    renderCell: renderButton(<RemoveRedEyeRoundedIcon color="primary" />, verKpiAsignado)
})
const gestionKPI = (verKpiAsignado) => ({
    field: "asignarKpi",
    headerName: "Asignación Kpi",
    flex: 1,
    renderCell: renderButton(<LibraryAddIcon color="success" />, verKpiAsignado, { color: 'success' })
})

//Descripción Staff
const colProceso = {
    field: "procesoNombre",
    headerName: "Proceso",
    flex: 1
}
const colArea = {
    field: "areaNombre",
    headerName: "Área",
    flex: 1
}

//Tabla KPI Staff
export const getAreas = (
    verServicio,
    asignacion
) => [
        colProceso,
        colArea,
        verAsignacion(verServicio),
        gestionKPI(asignacion)
    ]

//Tabla KPI operativo
export const getServicios = (
    verArea,
    asignacion
) => [
        colCliente(),
        colOperacion,
        colSegmento,
        colServicio,
        verAsignacion(verArea),
        gestionKPI(asignacion)
    ]

// Tabla indicadores de gestion
export const getIndicadoresKPI = (
    handleDetalles,
    handleEditar,
    handleHabilitar,
    typeKpiMap,
    periodiKpiMap
) => [
        colEstado(),
        colNombre,
        colTipo(typeKpiMap),
        colMeta,
        colResponsable,
        colPeriodicidad(periodiKpiMap),
        colDetalles(handleDetalles),
        colEditar(handleEditar),
        colHabilitar(handleHabilitar)
    ];

// Tabla de gestion de kpi
export const getGestionKPIs = (
    handleDetalles,
    handleEditar,
    usuariosLog,
    isActive
) => [
        colEstado(),
        colNombre,
        colGestorKPI(usuariosLog),
        colUltimoMensaje(usuariosLog),
        colAccionKpi(usuariosLog),
        colDetalles(handleDetalles),
        // colEditar(handleEditar, 'Editar/Aprobar', isActive),
    ]

// Tabla de Gestión de metas
export const getAllKPI = (
    handleDetalles
) => [
        colID,
        colNombre,
        colMeta,
        colDetalles(handleDetalles)
    ]

const colCellCollaborator = {
    field: "cedula",
    headerName: "Documento Colaborador",
    flex: 1
}
const colUsuarioRedCollaborator = {
    field: "avaya",
    headerName: "Usuario Red",
    flex: 1
}
const colCollaborator = {
    field: "nombre_completo",
    headerName: "Nombre Colaborador",
    flex: 2
}
const colServicioCollaborator = {
    field: "servicio",
    headerName: "Servicio",
    flex: 1
}
const colOperacionCollaborator = {
    field: "servicio_",
    headerName: "Operación",
    flex: 1
}
// Tabla asignación individual
export const getAllResultsCollaborator = (
    verDetalles,
    editarAsignacion
) => [
        colCellCollaborator,
        colUsuarioRedCollaborator,
        colCollaborator,
        colOperacionCollaborator,
        colServicioCollaborator,
        verAsignacion(verDetalles),
        gestionKPI(editarAsignacion)
    ]