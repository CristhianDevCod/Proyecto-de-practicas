// import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState, lazy } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OperacionFormPopPup from "./OperacionFormPopPup";
import SegmentoFormPopPup from "./SegmentoFormPopPup";
import ServicioFormPopPup from "./ServicioFormPopPup";
import SkillFormPopPup from "./SkillFormPopPup";
import NewOperacionClienteFormPopPup from "./NewOperacionClienteFormPopPup";
import EditOperacionClienteFormPopPup from "./EditOperacionClienteFormPopPup";
import Service from "../../Machine/Service";
import apiClient from "../../../src/Service/Service";
import JerarquiaForm from "./JerarquiaForm";
// import JerarquiaFormModified from "./JerarquiaFormModified";
import { Typography } from "@mui/material";
const JerarquiaFormModified = lazy(() => import("./JerarquiaFormModified"));

const OperacionesTable = ({ handleComponentSelect }) => {
  const { Servidor } = Service()
  // const router = useNavigate();
  const [operaciones, setOperaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedOperacion, setSelectedOperacion] = useState(null);
  const [selectedSegmento, setSelectedSegmento] = useState(null);
  const [selectedServicio, setSelectedServicio] = useState(null);
  // const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);



  const fetchOperaciones = useCallback(async () => {
    try {
      const response = await apiClient.get(`http://${Servidor}/operacionesTotales`);
      const data = await response.data;

      if (Array.isArray(data) && data.length > 0) {
        const updatedOperaciones = await Promise.all(
          data.map(async (operacion) => {
            try {
              const jerarquiaResponse = await apiClient.get(
                `http://${Servidor}/jerarquias/check/${operacion.id_operacion}`
              );
              const hasJerarquia = jerarquiaResponse.data.hasJerarquia; // Asegúrate de que `hasJerarquia` sea `true` o `false`
              return { ...operacion, hasJerarquia: hasJerarquia };
            } catch (error) {
              return { ...operacion, hasJerarquia: false }; // Si hay error, asegúrate de devolver `false`
            }
          })
        );
        setOperaciones(updatedOperaciones);
      } else {
        console.error("La respuesta no es un array o está vacía.");
      }
    } catch (error) {
      console.error("Error fetching operaciones:", error);
    }
  }, [Servidor]);

  useEffect(() => {
    fetchOperaciones();
  }, [fetchOperaciones]);

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleOpenModal = (action, operacion = {}) => {
    setSelectedAction(action);
    setSelectedOperacion(operacion);
    setOpenModal(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNewOperaciones = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Crear Operación')
    }
  };

  const handleNewOperacion = (cliente) => {
    setSelectedCliente(cliente);
    setSelectedAction("operacion");
    setOpenModal(true);
  };

  const handleOperacionSaved = () => {
    fetchOperaciones();
    setOpenModal(false);
  };

  const handleNewSegmento = (operacion) => {
    if (operacion.id) {
      setSelectedOperacion(operacion);
      setSelectedAction("segmento");
      setOpenModal(true);
      // setError(null);
      // setError(null);
    } else {
      handleOpenSnackbar(
        "No se puede crear un segmento sin una operación válida"
      );
    }
  };

  const handleSegmentoSaved = () => {
    fetchOperaciones();
    setOpenModal(false);
  };

  const handleJerarquiaSaved = (idOperacion) => {
    setOperaciones((prevOperaciones) =>
      prevOperaciones.map((operacion) =>
        operacion.id_operacion === idOperacion
          ? { ...operacion, hasJerarquia: true }
          : operacion
      )
    );
  };
  

  const handleNewServicio = (segmento) => {
    if (segmento.id) {
      setSelectedSegmento(segmento);
      setSelectedAction("servicio");
      setOpenModal(true);
      // setError(null);
      // setError(null);
    } else {
      handleOpenSnackbar(
        "No se puede crear un servicio sin un segmento válido"
      );
    }
  };

  const handleServicioSaved = () => {
    fetchOperaciones();
    setOpenModal(false);
  };

  // Definir la función handleNew
  const handleNew = (type) => {
    // console.log("Hola");

  };

  const [skillData, setSkillData] = useState({
    id: null,
    nombre: "",
    canalAtencion: "",
    sistemaGestion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
    servicioId: null,
    skills: [
      {
        nombreSkill: "",
        idCanalAtencion: "",
        idSistemaGestion: "",
        fechaInicio: null,
        fechaFin: null,
        estadoSkill: "activo",
        error: null,
      },
    ],
  });

  const handleNewSkill = (servicio, idObjeto, nombreSkill, estadoSkill) => {
    if (servicio.id) {
      setSkillData({
        id: idObjeto,
        nombre: nombreSkill,
        estado: estadoSkill,
        skills: skillData.skills,
      });
      setSelectedServicio(servicio);
      setSelectedAction("objetos");
      setOpenModal(true);
      // setError(null);
      // setError(null);
    } else {
      handleOpenSnackbar("No se puede crear un objeto sin un servicio válido");
    }
  };

  const handleSkillSaved = () => {
    fetchOperaciones();
    setOpenModal(false);
  };

  // Agregar nueva operación a cliente existente
  const handleNewOperacionCliente = (cliente) => {
    setSelectedCliente(cliente);
    setSelectedAction("operacionClienteExistente");
    setOpenModal(true);
  };

  // Editar una  operación a cliente existente
  const handleEditOperacionCliente = (cliente) => {
    console.log("id seleccionado", cliente);    
    setSelectedCliente(cliente);
    setSelectedAction("editOperacionClienteExistente");
    setOpenModal(true);
  };

  const handleOperacionEdit = () => {
    fetchOperaciones();
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAction(null);
    setSelectedServicio(null);
    // setSelectedSkill(null);
    // setSelectedSkill(null);
  };

  // Función que renderiza el componente de formulario adecuado según selectedAction
  const renderModalContent = () => {
    if (selectedAction === "operacion") {
      return (
        <OperacionFormPopPup
          onClose={handleCloseModal}
          idOperacion={selectedOperacion ? selectedOperacion.id_operacion : null}
          onOperacionSaved={handleOperacionSaved}
          clienteId={selectedCliente ? selectedCliente.id : ""}
          clienteNombre={selectedCliente ? selectedCliente.nombre : ""}
          initialDataOpe={{ id: null, nombre: "", estado: "activo" }}
        />
      );
    } else if (selectedAction === "segmento") {
      return (
        <SegmentoFormPopPup
          onClose={handleCloseModal}
          onSegmentoSaved={handleSegmentoSaved}
          operacionId={selectedOperacion ? selectedOperacion.id : ""}
          operacionNombre={selectedOperacion ? selectedOperacion.nombre : ""}
          initialDataSeg={{ id: null, nombre: "", estado: "activo" }}
        />
      );
    } else if (selectedAction === "servicio") {
      return (
        <ServicioFormPopPup
          onClose={handleCloseModal}
          onServicioSaved={handleServicioSaved}
          segmentoId={selectedSegmento ? selectedSegmento.id : ""}
          segmentoNombre={selectedSegmento ? selectedSegmento.nombre : ""}
          initialDataServ={{ id: null, nombre: "", estado: "activo" }}
        />
      );
    } else if (selectedAction === "objetos") {
      return (
        <SkillFormPopPup
          onClose={handleCloseModal}
          onSkillSaved={handleSkillSaved}
          setSkillData={setSkillData}
          servicioId={selectedServicio ? selectedServicio.id : ""}
          servicioNombre={selectedServicio ? selectedServicio.nombre : ""}
          initialDataSkill={{ id: null, nombre: "", estado: "activo" }}
        />
      );
    } else if (selectedAction === "operacionClienteExistente") {
      return (
        <NewOperacionClienteFormPopPup
          onClose={handleCloseModal}
          onOperacionSaved={handleOperacionSaved}
          fetchOperaciones={fetchOperaciones}
          clienteId={selectedCliente ? selectedCliente.id : ""}
          clienteNombre={selectedCliente ? selectedCliente.nombre : ""}
          initialDataOpe={{ id: null, nombre: "", estado: "activo" }}
          idNewOperacionClienteFormPopPup={{ idNewOper: 1 }}
        />
      );
    } else if (selectedAction === "editOperacionClienteExistente") {
      return (
        <EditOperacionClienteFormPopPup
          onClose={handleCloseModal}
          onOperacionEdit={handleOperacionEdit}
          clienteId={selectedCliente ? selectedCliente.id : ""}
          operacionId={selectedCliente ? selectedCliente.idOper : ""}
          servicioId={selectedCliente ? selectedCliente.idServicio : ""}
        />
      );
    } else if (selectedAction === "jerarquia") {
      if (selectedOperacion.hasJerarquia) {
        return (
          <JerarquiaFormModified
            onClose={handleCloseModal}
            idOperacion={selectedOperacion?.id_operacion}
          />
        );
      } else {
        return (
          <JerarquiaForm
            onClose={handleCloseModal}
            idOperacion={selectedOperacion?.id_operacion}
            onJerarquiaSaved={handleJerarquiaSaved}
          />
        );
      }
    }
    return null;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOperaciones = operaciones.filter(
    (operacion) =>
      (operacion.nombre_cliente || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (operacion.nombre_operacion || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (operacion.nombre_segmento || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (operacion.nombre_servicio || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (operacion.nombres_objetos || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredOperaciones.slice(startIndex, endIndex);
  // console.log(currentRows);


  return (
    <Paper>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ marginRight: 2 }}
          />
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleNewOperaciones}
          color="success"
        >
          Nueva Operación
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  ID Cliente
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  Nombre Cliente
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  Nombre Operación
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  Nombre Segmento
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  Nombre Servicio
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  Nombre Objetos
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  ¿Es Outbound?
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="bold">
                  Acciones
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {operaciones.length > 0 ? (
            <TableBody>
              {currentRows.map((operacion, index) => (
                <TableRow key={operacion.id_operacion || index}>
                  <TableCell align="center">
                    {operacion.id_cliente || (
                      <Button onClick={() => handleNew("Cliente")}>
                        Agregar Cliente
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {operacion.nombre_cliente || (
                      <Chip label="Sin Cliente" color="error" variant="outlined" />
                    )}
                  </TableCell>

                  {/* Nombre Operación con el ícono correspondiente */}
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" color={operacion.id_operacion ? "initial" : "error"}>
                        {operacion.nombre_operacion || "Sin Operaciones"}
                      </Typography>
                      {!operacion.id_operacion && (
                        <Tooltip title="Crear Operación" placement="top" arrow>
                          <IconButton
                            aria-label="edit"
                            onClick={() =>
                              handleNewOperacion({
                                id: operacion.id_cliente,
                                nombre: operacion.nombre_cliente,
                              })
                            }
                          >
                            <AddCircleIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>

                  {/* Nombre Segmento con el ícono correspondiente */}
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" color={operacion.id_segmento ? "initial" : "error"}>
                        {operacion.nombre_segmento || "Sin Segmento"}
                      </Typography>
                      {!operacion.id_segmento && (
                        <Tooltip title="Crear Segmento" placement="top" arrow>
                          <IconButton
                            aria-label="edit"
                            onClick={() =>
                              handleNewSegmento({
                                id: operacion.id_operacion,
                                nombre: operacion.nombre_operacion,
                              })
                            }
                          >
                            <AddCircleIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>

                  {/* Nombre Servicio con el ícono correspondiente */}
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" color={operacion.id_servicio ? "initial" : "error"}>
                        {operacion.nombre_servicio || "Sin Servicio"}
                      </Typography>
                      {!operacion.id_servicio && (
                        <Tooltip title="Crear Servicio" placement="top" arrow>
                          <IconButton
                            aria-label="edit"
                            onClick={() =>
                              handleNewServicio({
                                id: operacion.id_segmento,
                                nombre: operacion.nombre_segmento,
                              })
                            }
                          >
                            <AddCircleIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>

                  {/* Nombre Objetos con el ícono correspondiente */}
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body2" color={operacion.ids_objetos ? "initial" : "error"}>
                        {operacion.nombres_objetos
                          ? [...new Set(operacion.nombres_objetos.split(','))].join(', ')
                          : "Sin Objetos"}
                      </Typography>
                      {!operacion.ids_objetos && (
                        <Tooltip title="Crear Objetos" placement="top" arrow>
                          <IconButton
                            aria-label="edit"
                            onClick={() =>
                              handleNewSkill({
                                id: operacion.id_servicio,
                                nombre: operacion.nombre_servicio,
                              })
                            }
                          >
                            <AddCircleIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    {operacion.ids_bases ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <Chip label="No Aplica" color="success" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 0, justifyContent: 'center', alignItems: 'center' }}>
                      {/* Icono de editar operación */}
                      {operacion.id_operacion !== null &&
                        operacion.id_segmento !== null &&
                        operacion.id_servicio !== null &&
                        operacion.ids_objetos !== null && (
                          <Tooltip title="Editar Operación" placement="top" arrow>
                            <IconButton
                              aria-label="edit"
                              onClick={() =>
                                handleEditOperacionCliente({
                                  id: operacion.id_cliente,
                                  idOper: operacion.id_operacion,
                                  idServicio: operacion.id_servicio
                                })
                              }
                            >
                              <EditIcon style={{ color: "orange" }} />
                            </IconButton>
                          </Tooltip>
                        )}

                      {/* Icono de añadir nueva operación */}
                      <Tooltip title="Añadir Nueva Operación" placement="top" arrow>
                        <IconButton
                          aria-label="Nueva operación"
                          onClick={() =>
                            handleNewOperacionCliente({
                              id: operacion.id_cliente,
                              nombre: operacion.nombre_cliente,
                              sector: operacion.sector_cliente,
                            })
                          }
                        >
                          <AddCircleIcon color="primary" />
                        </IconButton>
                      </Tooltip>

                      {/* Icono de jerarquías */}
                      <Tooltip
                        title={
                          operacion.hasJerarquia
                            ? `Modificar Jerarquías a ${operacion.nombre_operacion}`
                            : `Añadir Jerarquías a ${operacion.nombre_operacion || "- - -"}`
                        }
                        placement="top"
                        arrow
                      >
                        <span>
                          <IconButton
                            aria-label="Jerarquías"
                            onClick={() => handleOpenModal('jerarquia', operacion)}
                            color={operacion.hasJerarquia ? "success" : "error"}
                            disabled={!operacion.id_operacion} // Deshabilitar si no hay una operación asociada
                          >
                            <AccountTreeRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Cargando operaciones...
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity="error"
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredOperaciones.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCliente ? "Agregar Operación" : "Nueva Operación"}
        </DialogTitle>
        <DialogContent>{renderModalContent()}</DialogContent>
      </Dialog>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedAction === 'jerarquia' && selectedOperacion
            ? selectedOperacion.hasJerarquia
              ? `Modificar Jerarquías a ${selectedOperacion.nombre_operacion}`
              : `Añadir Jerarquías a ${selectedOperacion.nombre_operacion}`
            : selectedCliente
              ? 'Agregar Operación'
              : 'Nueva Operación'}
        </DialogTitle>
        <DialogContent>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default OperacionesTable;
