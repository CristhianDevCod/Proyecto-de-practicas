import {
  Modal,
  React,
  useState,
  useEffect,
  TextField,
  useContext,
  useCallback,
  CloseRoundedIcon,
  CheckRoundedIcon,
  SearchRoundedIcon,
  WarningRoundedIcon,
  Grid,
} from "../../../../Exports-Modules/Exports";
import Button from "@mui/joy/Button";
import { esES } from "@mui/x-data-grid";

import "../Styles/Styles.css";
import DetailsManager from "./DetailsManager/DetailsManager";
import { UserProfileContext } from "../../../../Context/ProfileContex";
import AcceptsAndRejectManager from "./AcceptsAndRejectManager/AcceptsAndRejectManager";
import {
  PERMISSIONSCLIENTSNOVELTIES,
  getAllManagersNovelties,
} from "../../../../API/API";
import { NotificationsContextNoveltie } from "../../../../Context/ContextNotificationNoveltie";
import {
  CustomNoRowsOverlay,
  ItemContent,
  CustomPagination,
  PAGE_SIZE,
  StyledDataGrid,
  ItemContentModal,
} from "../Styles/Styles";

const Manager = () => {
  const { fullName } = useContext(UserProfileContext);
  const { socket, api, contextHolder } = useContext(
    NotificationsContextNoveltie
  );

  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [observacion, setObservacion] = useState("");
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [openModalOpenAndRejects, setOpenModalOpenAndReject] = useState(false);
  const [openModalOpenAndAccepts, setOpenModalOpenAndAccepts] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const getDataForBoss = useCallback(async () => {
    setLoading(true);
    try {
      const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
      const response = await PERMISSIONSCLIENTSNOVELTIES(Usuario_Red);

      const Cliente = response.map((item) => item.Cliente_Permiso);
      const wfmResponse = await getAllManagersNovelties(Cliente);
      SetData(wfmResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [fullName]);

  useEffect(() => {
    if (fullName && fullName.length > 0) {
      getDataForBoss();
    }
  }, [getDataForBoss, fullName]);

  const handleObservacion = (e) => {
    setObservacion(e.target.value);
  };

  const handleOpenModalAcceptsAndRejectAccepts = (DATA) => {
    setOpenModalOpenAndAccepts(true);
    setSelected(DATA);
  };
  const handleCloseModalAcceptsAndRejectAccepts = () => {
    setOpenModalOpenAndAccepts(false);
  };

  const handleOpenModalAcceptsAndRejectReject = (DATA) => {
    setOpenModalOpenAndReject(true);
    setSelected(DATA);
  };
  const handleCloseModalAcceptsAndRejectReject = () => {
    setOpenModalOpenAndReject(false);
  };

  //FUNCION PARA QUE EL MANAGER ACEPTE LA SOLICITUD
  const handleAcceptNotificationNovelties = (index) => {
    if (socket && selected) {
      const Name = fullName && fullName.map((data) => data.Nombres);
      const LastName = fullName && fullName.map((data) => data.Apellidos);
      const Documento = fullName && fullName.map((data) => data.Documento);
      socket.emit("sendNotificationToPayrrol", {
        ...selected,
        Id: selected.Id,
        Aprobador_Gerente_Area: `${Name} ${LastName}`,
        Documento_Aprobador_Gerente_Area: `${Documento}`,
        Observacion_Gerente_Area: observacion,
      });
      api.success({
        message: "Has aceptado la solicitud",
      });
    }
    SetData((prevData) => prevData.filter((item) => item.Id !== selected.Id));
    handleCloseModalAcceptsAndRejectAccepts();
  };

  //FUNCION PARA QUE EL MANAGER RECHACE LA SOLICITUD
  const handleRejectNotificationNoveltie = (index) => {
    if (socket && selected) {
      const Name = fullName && fullName.map((data) => data.Nombres);
      const LastName = fullName && fullName.map((data) => data.Apellidos);
      const Documento = fullName && fullName.map((data) => data.Documento);
      socket.emit("rejectNotificationNoveltiesManager", {
        ...selected,
        Id: selected.Id,
        Aprobador_Gerente_Area: `${Name} ${LastName}`,
        Documento_Aprobador_Gerente_Area: `${Documento}`,
        Observacion_Gerente_Area: observacion,
      });
      api.success({
        message: "Has rechazado la solicitud",
      });
    }
    SetData((prevData) => prevData.filter((item) => item.Id !== selected.Id));
    handleCloseModalAcceptsAndRejectReject();
  };

  //SELECCIONAR EL DETALLE
  const handleDetailsMyGroup = (details) => {
    setSelectedDetails(details);
  };

  //MANEJADORES DE EL MODAL DE DETALLES
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    { field: "Codigo", headerName: "Codigo", flex: 1 },
    { field: "Documento", headerName: "Documento", flex: 1 },
    { field: "Nombre_Completo", headerName: "Nombre Completo", flex: 1 },
    { field: "Servicio", headerName: "Servicios", flex: 1 },
    { field: "Cliente_Area", headerName: "Cliente Area", flex: 1 },
    { field: "Tipo_Solicitud", headerName: "Tipo Solicitud", flex: 1 },
    {
      field: "Fecha_Inicio_Novedad",
      headerName: "Fecha Inicio Novedad",
      flex: 1,
    },
    { field: "Fecha_Fin_Novedad", headerName: "Fecha Fin Novedad", flex: 1 },
    {
      field: "Accion",
      headerName: "Escalamientos",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <div className="">
              <Button
                variant="soft"
                size="sm"
                color="danger"
                onClick={() =>
                  handleOpenModalAcceptsAndRejectReject(params.row)
                }
              >
                {" "}
                <CloseRoundedIcon fontSize="small" />
              </Button>
            </div>
            <div className="ms-2">
              <Button
                variant="soft"
                size="sm"
                color="success"
                onClick={() =>
                  handleOpenModalAcceptsAndRejectAccepts(params.row)
                }
              >
                {" "}
                <CheckRoundedIcon fontSize="small" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      field: "Detalles",
      headerName: "Detalles",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="soft"
            size="sm"
            color="primary"
            onClick={() => {
              handleDetailsMyGroup(params.row);
              handleOpenModal();
            }}
          >
            {" "}
            <SearchRoundedIcon fontSize="small" />
          </Button>
        );
      },
    },
  ];
  const filteredItems =
    Array.isArray(data) &&
    data.filter(
      (item) =>
        item.Usuario_Red.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        item.Documento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Cliente_Area.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      {contextHolder}
      <ItemContent className="mb-5" elevation={10}>
        <div className="text-center">
          <div className="title-mis-novedades">Solicitudes</div>
        </div>
      </ItemContent>

      <ItemContent elevation={3}>
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

        {loading ? (
          CustomNoRowsOverlay()
        ) : Array.isArray(data) ? (
          <StyledDataGrid
            rowHeight={40}
            columns={columns}
            rows={filteredItems}
            pageSizeOptions={[PAGE_SIZE]}
            paginationModel={paginationModel}
            getRowId={(data) => data.Id}
            onPaginationModelChange={setPaginationModel}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              pagination: CustomPagination,
            }}
          />
        ) : (
          CustomNoRowsOverlay()
        )}

        <AcceptsAndRejectManager
          Modal={Modal}
          Button={Button}
          observacion={observacion}
          handleObservacion={handleObservacion}
          WarningRoundedIcon={WarningRoundedIcon}
          openModalOpenAndAccepts={openModalOpenAndAccepts}
          openModalOpenAndRejects={openModalOpenAndRejects}
          handleRejectNotificationNoveltie={handleRejectNotificationNoveltie}
          handleAcceptNotificationNovelties={handleAcceptNotificationNovelties}
          handleCloseModalAcceptsAndRejectReject={
            handleCloseModalAcceptsAndRejectReject
          }
          handleCloseModalAcceptsAndRejectAccepts={
            handleCloseModalAcceptsAndRejectAccepts
          }
        />

        <DetailsManager
          Grid={Grid}
          Modal={Modal}
          openModal={openModal}
          selectedDetails={selectedDetails}
          ItemContentModal={ItemContentModal}
          handleCloseModal={handleCloseModal}
        />
      </ItemContent>
    </>
  );
};

export default Manager;
