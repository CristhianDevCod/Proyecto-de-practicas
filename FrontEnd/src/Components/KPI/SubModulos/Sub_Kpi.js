import {
  useState,
  TextField,
  Typography,
  esES,
  Swal,
  useCallback,
  useContext,
  useEffect
} from "../../../Exports-Modules/Exports.js";
import '../style/styles.css';
import {
  GETALLKPI,
  GETTYPEALLKPI,
  GETPERIODIALLKPI,
  // GETALLRESPONSABLESUPD 
} from "../../../API/API.js";
import {
  CustomNoRowsOverlay,
  ItemContent,
  CustomPagination,
  PAGE_SIZE,
  StyledDataGrid,
} from "../style/styles.js";
import FormularioKPI from '../../ReusablesModulo/Formulario/FormularioKPI.js'
import { getIndicadoresKPI } from "../../ReusablesModulo/TableKpi/columns.js";
import Service from "../../../Machine/Service.js";
import { useApiData } from "../../ReusablesModulo/useApiData.js";
import { UserProfileContext } from "../../../Context/ProfileContex.js";

//variables
const nombreSub = 'Indicadores de Gestión';

const Kpi = () => {
  const { Servidor } = Service();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modoDetalles, setModoDetalles] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [kpiSeleccionado, setKpiSeleccionado] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  //Acceder a el usuario de red
  const { fullName } = useContext(UserProfileContext);
  const nombreUsuario = fullName[0].Usuario_Red;

  //Función para obtener todos los KPIs
  const getAll = useCallback(async () => {
    try {
      const response = await GETALLKPI();
      // const responseResponsa = await GETALLRESPONSABLESUPD();
      setData(response);
    } catch (error) {
      console.log("Error al obtener los datos: ", error);
    }
  }, [])
  useEffect(() => {
    getAll()
  }, [getAll])

  //Cargar los tipos de KPI
  const typeKpis = useApiData(GETTYPEALLKPI);
  const typeKpiMap = Array.isArray(typeKpis)
    ? typeKpis.reduce((acc, typeKpi) => {
      acc[typeKpi.tipo_kpi_id] = typeKpi.nombre_tipo_kpi;
      return acc;
    }, {})
    : {};

  //Cargar las periodicidades de los KPIs
  const perioKpi = useApiData(GETPERIODIALLKPI);
  const periodiKpiMap = Array.isArray(perioKpi)
    ? perioKpi.reduce((acc, perio) => {
      acc[perio.id_periodicidad] = perio.nombre_periodicidad;
      return acc;
    }, {})
    : {};

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

  //valores para bonton habilitar / deshabilitar
  // const aprobacion = 1;
  const activo = 2;

  //Evento para deshabilitar
  const handleHabilitar = (row) => {
    let mensajeMotivo = ''
    Swal.fire({
      title: `¿Deseas ${row.estado_kpi_id === activo ? 'deshabilitar' : 'habilitar'} el KPI?`,
      icon: "warning",
      text: `A continuación explica cuál es la razón por la cual ${row.estado_kpi_id === activo ? 'desactivaras' : 'activaras'} el KPI ${row.nombre_kpi}`,
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      input: 'textarea',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${row.estado_kpi_id === activo ? 'Inhabilitación' : 'Habilitación'}`,
      inputValidator: (value) => {
        //Validacion: el campo de texto no puede estar vacio
        if (!value.trim()) {
          return "Debes proporcionar una razón para continuar.";
        }

        //Tomar el valor del mensaje
        mensajeMotivo = value.trim();

        return null; //Si no hay error, retorna null
      }, didOpen: () => {
        //Acceder al DOM del modal
        const confirmButton = Swal.getConfirmButton();
        const textarea = Swal.getInput();

        //Deshabilitar el botón de confirmación inicialmente
        confirmButton.disabled = true;

        //Escuchar el evento input en el campo de texto
        textarea.addEventListener('input', () => {
          //Habilitar el botón si el campo de texto no está vacío
          confirmButton.disabled = !textarea.value.trim();
        });
      }
    }).then(async (result) => {
      if (!result.isConfirmed) {
        // Si el usuario cancela, revierte el estado del switch
      } else {
        try {
          const tipoAccion = row.estado_kpi_id === activo ? 'inhabilitacion' : 'habilitacion'
          //Llamar al endpoint para actualizar el estado del KPI
          const response = await fetch(`http://${Servidor}/API/UPDATE-KPI-ESTADO/${row.id_kpi}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            //Cambiar el estado a 1 (aprobación)
            body: JSON.stringify({
              estado_kpi_id: row.estado_kpi_id,
              mensajeMotivo: mensajeMotivo,
              usuarioRed: nombreUsuario,
              tipoAccion: tipoAccion
            }),
          });
          if (!response.ok) {
            throw new Error('Error al actualizar el estado del KPI')
          }
          //Actualizar el efecto local a 1 para reflejar el color gris inmediatamente.
          // Si la actualización fue exitosa, mostrar mensaje de éxito
          Swal.fire({
            title: "Solicitud realizada",
            text: "El KPI quedará en el nuevo estado.",
            icon: "success",
            showConfirmButton: true,
            confirmButtonColor: '#2196f3'
          });

          //Actualizar la lista de KPIs
          getAll();
        } catch (error) {
          console.log("Error: ", error);
          Swal.fire({
            title: "Error en la solicitud",
            text: "Hubo un error al actualizar el estado del KPI.",
            icon: "error"
          });
        }
      }
    });
  };

  //Algoritmo para filtrar
  const filteredItems = Array.isArray(data)
    ? data.filter((item) =>
      item.nombre_kpi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meta_kpi.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : []; //Si no hay registros retorna un arreglo vacio

  //Otener las columnas pasando las funciones como parámetros
  const columns = getIndicadoresKPI(handleDetalles, handleEditar, handleHabilitar, typeKpiMap, periodiKpiMap)

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

export default Kpi;