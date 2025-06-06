import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Alert,
  Box,
  Grid,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchIcon from "@mui/icons-material/Search";
import ReactSelect from "react-select";
import ReplayIcon from "@mui/icons-material/Replay";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BarChartIcon from "@mui/icons-material/BarChart";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import StorageIcon from "@mui/icons-material/Storage";
import DownloadIcon from "@mui/icons-material/Download";
import Upload from '@mui/icons-material/Upload';


import OperacionFormPopPup from "./OperacionFormPopPup";
import SegmentoFormPopPup from "./SegmentoFormPopPup";
import ServicioFormPopPup from "./ServicioFormPopPup";
import SkillFormPopPup from "./SkillFormPopPup";
import AsignarBasesFormPopPup from './AsignarBasesFormPopPup';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

export default function OperacionesClienteForm({ onAlertChange, idNewBaseOperacionClienteForm, handleComponentSelect }) {
  const { Servidor } = Service()

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [idClienteSelected, setIdClienteSelected] = useState("");
  const [nombreClienteSelected, setNombreClienteSelected] = useState("");
  const [clientesData, setClientesData] = useState([]);
  const [selectedOperacion, setSelectedOperacion] = useState(null);
  const [selectedSegmento, setSelectedSegmento] = useState(null);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [nombreError, setNombreError] = useState(false);
  const [alert, setAlert] = useState(-1);
  const [clienteDetalles, setClienteDetalles] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [selectedAction, setSelectedAction] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idCampanaFormGen, setIdCampanaFormGen] = useState("");

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/clientesActivos`);
        const data = await response.data;
        setClientesData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchClientes();
  }, [Servidor]);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedCliente(selectedOption);
      setIdClienteSelected(selectedOption.value ? selectedOption.value : "");
      setNombreClienteSelected(
        selectedOption.label ? selectedOption.label : ""
      );
    } else {
      setSelectedCliente(null);
      setIdClienteSelected("");
      setNombreClienteSelected("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCliente === null) {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }

    try {

      const url = `http://${Servidor}/operacionesByIdClienteSelected/${selectedCliente.value}`;
      const response = await apiClient.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      const responseData = await response.data;
      //console.log('response en operacionesByIdClienteSelected', responseData);
      const transformedData = transformData(responseData);
      setClienteDetalles(transformedData);
      setShowForm(false);  // Oculta el formulario de búsqueda
      setAlert(1);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setAlert(0);
    }
  };

  // Función que transforma la respuesta de la API en una jerarquía de operaciones
  const transformData = (data) => {
    const operacionesMap = {};

    data.forEach((item) => {
      const {
        id_operacion,
        nombre_operacion,
        id_segmento,
        nombre_segmento,
        id_servicio,
        nombre_servicio,
        id_objeto,
        nombre_objeto,
        nombre_pais,
        nombre_depto_estado,
        nombre_ciudad,
        zona_horaria,
        nombre_sede,
        nombre_tipo_servicio,
        gen_recargo_dom_fest,
        gen_recargo_noc,
        id_canal_atencion,
        nombre_canal_atencion,
        nombre_sist_gestion,
        fecha_inicio,
        id_base,
        nombre_base,
        fecha_recibido,
      } = item;

      if (!operacionesMap[id_operacion]) {
        operacionesMap[id_operacion] = {
          id_operacion,
          nombre_operacion,
          segmentos: {},
        };
      }

      if (!operacionesMap[id_operacion].segmentos[id_segmento]) {
        operacionesMap[id_operacion].segmentos[id_segmento] = {
          id_segmento,
          nombre_segmento,
          servicios: {},
        };
      }

      if (
        !operacionesMap[id_operacion].segmentos[id_segmento].servicios[
        id_servicio
        ]
      ) {
        operacionesMap[id_operacion].segmentos[id_segmento].servicios[
          id_servicio
        ] = {
          id_servicio,
          nombre_servicio,
          nombre_pais,
          nombre_depto_estado,
          nombre_ciudad,
          zona_horaria,
          nombre_sede,
          nombre_tipo_servicio,
          id_canal_atencion,
          nombre_canal_atencion,
          gen_recargo_dom_fest,
          gen_recargo_noc,
          objetos: [],
          bases: [],
        };
      }

      const servicio =
        operacionesMap[id_operacion].segmentos[id_segmento].servicios[
        id_servicio
        ];

      // Verificar si el objeto ya existe
      if (!servicio.objetos.some((obj) => obj.id_objeto === id_objeto)) {
        servicio.objetos.push({
          id_objeto,
          nombre_objeto,
          nombre_sist_gestion,
          fecha_inicio,
        });
      }

      // Verificar si la base ya existe
      if (!servicio.bases.some((base) => base.id_base === id_base)) {
        servicio.bases.push({
          id_base,
          nombre_base,
          fecha_recibido,
        });
      }
    });

    // Convertir los objetos/skill anidados a arrays
    const operacionesArray = Object.values(operacionesMap).map((operacion) => ({
      ...operacion,
      segmentos: Object.values(operacion.segmentos).map((segmento) => ({
        ...segmento,
        servicios: Object.values(segmento.servicios),
      })),
    }));

    return operacionesArray;
  };

  const handleNewOperacionCliente = (cliente) => {
    setSelectedCliente(cliente);
    setSelectedAction("operacionClienteExistente");
    setOpenModal(true);
  };

  const handleNewSegmentoCliente = (operacion) => {
    setSelectedOperacion(operacion);
    setSelectedAction("segmento");
    setOpenModal(true);
  };

  const handleNewServicioCliente = (segmento) => {
    setSelectedSegmento(segmento);
    setSelectedAction("servicio");
    setOpenModal(true);
  };

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
    }
  };

  const handleNewBaseCliente = (servicio) => {
    setSelectedServicio(servicio);
    setSelectedAction("bases");
    setOpenModal(true);
  };

  const handleBack = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Home Operaciones');
    }
  };

  const handleReset = () => {
    setSelectedCliente(null);
    setClienteDetalles(null);
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAction(null);
  };

  const handleOperacionSaved = async () => {
    setOpenModal(false);
    try {
      await fetchOperacionesCliente(idClienteSelected);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlert(0);
    }
  };

  const handleSegmentoSaved = async () => {
    setOpenModal(false);
    try {
      await fetchOperacionesCliente(idClienteSelected);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlert(0);
    }
  };

  const handleServicioSaved = async () => {
    setOpenModal(false);
    try {
      await fetchOperacionesCliente(idClienteSelected);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlert(0);
    }
  };

  const handleSkillSaved = async () => {
    setOpenModal(false);
    try {
      await fetchOperacionesCliente(idClienteSelected);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlert(0);
    }
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

  const handleBaseSaved = async () => {
    setOpenModal(false);
    try {
      await fetchOperacionesCliente(idClienteSelected);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setAlert(0);
    }
  };

  const fetchOperacionesCliente = async (idClienteSelected) => {
    try {
      const url = `http://${Servidor}/operacionesByIdClienteSelectedNew/${idClienteSelected}`;
      const response = await apiClient.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      const responseData = await response.data;
      const transformedData = transformData(responseData);
      setClienteDetalles(transformedData);
      setShowForm(false);
      setAlert(1);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setAlert(0);
    }
  };

  // Función que renderiza el componente de formulario adecuado según selectedAction
  const renderModalContent = () => {
    if (selectedAction === "operacionClienteExistente") {
      return (
        <OperacionFormPopPup
          onClose={handleCloseModal}
          onOperacionSaved={handleOperacionSaved}
          clienteId={idClienteSelected}
          clienteNombre={nombreClienteSelected}
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
          operacionNombre={selectedSegmento ? selectedSegmento.nombreOpe : ""}
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
    } else if (selectedAction === "bases") {
      return (
        <AsignarBasesFormPopPup
          onClose={handleCloseModal}
          onBaseSaved={handleBaseSaved}
          servicioId={selectedServicio ? selectedServicio.id : ""}
          servicioNombre={selectedServicio ? selectedServicio.nombre : ""}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(-1);
      setNombreError(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [alert]);

  const handleDownloadTemplate = async (idServicio, idBase) => {
    try {
      // Primer llamado al endpoint para obtener el campanaFormGen_id
      const serviciosResponse = await apiClient.get(`http://${Servidor}/servicios/servicios_campanas/${idServicio}`, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
  
      const serviciosData = await serviciosResponse.data;
      const campanaFormGenId = serviciosData[0]?.campanaFormGen_id; // Extraer el ID
  
      if (!campanaFormGenId) {
        setErrorMessage('La campaña no existe en FormGen');
        setOpen(true);
        return;
      }
  
      // Segundo llamado al endpoint para descargar la plantilla, incluyendo idBase en el cuerpo de la solicitud
      const templateResponse = await apiClient.post(`http://${Servidor}/bases/generate-template`, 
        JSON.stringify({ id_campana: campanaFormGenId, id_base: idBase }), 
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          responseType: 'blob' // Configura axios para recibir un blob
        }
      );
  
      // Crear un enlace para descargar el archivo
      const blob = templateResponse.data; // Axios devuelve el blob en `data`
      const link = document.createElement('a');
      const urlBlob = window.URL.createObjectURL(blob);
      link.href = urlBlob;
      link.download = `template_${campanaFormGenId}.xlsx`; // Nombre del archivo descargado
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob); // Limpiar el URL del blob
  
    } catch (error) {
      console.error('Error al obtener la plantilla:', error);
      setErrorMessage('No se ha creado el formulario en la aplicación FormGen');
      setOpen(true);
    }
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // FUNCIÓN PARA REESTABLECER EL INPUT DE ARCHIVO Y PERMITIR VOLVER A CARGARLO EN CASO DE ERROR
  const resetFileInput = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.value = "";
    }
  };

  //FUNCIÓN PARA VALIDAR LOS ENCABEZADOS DEL EXCEL Y VERIFICAR QUE SEA EL MISMO QUE SE ESTÁ CARGANDO

  const handleValidateAndUpload = async (idServicio, inputId) => {
    try {
      const response = await apiClient.get(
        `http://${Servidor}/servicios/servicios_campanas/${idServicio}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      const data = await response.data;
      const campanaFormGenId = data[0]?.campanaFormGen_id;

      if (!campanaFormGenId) {
        setErrorMessage("La campaña no existe en FormGen");
        setSeverity("error");
        setOpen(true);
        return;
      }

      setIdCampanaFormGen(campanaFormGenId);

      // Activar el input de archivo
      document.getElementById(inputId).click();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al procesar la solicitud");
      setSeverity("error");
      setOpen(true);
    }
  };

  // FUNCIÓN PARA CARGAR EL ARCHIVO EXCEL VALIDADO EN SU TOTALIDAD
  const handleFileUpload = async (event, inputId) => {
    const file = event.target.files[0];
    const id_campana = idCampanaFormGen;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id_campana", id_campana);

      try {
        const response = await fetch(`http://${Servidor}/bases/upload-file`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          setErrorMessage(data.error);
          setSeverity("error");
        } else {
          setErrorMessage(
            data.message || "Archivo procesado e insertado exitosamente en la base de datos"
          );
          setSeverity("success");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage("Error al procesar el archivo");
        setSeverity("error");
      } finally {
        setOpen(true);
        resetFileInput(inputId); // Restablecer el input de archivo para que permita continuar el proceso
      }
    }
  };

  // FUNCIÓN PARA DESCARGAR UN ARCHIVO CSV CON LOS CARGUES REALIZADOS POR EL CLIENTE (FORMGEN)
  const handleDownloadCSV = async (id_base) => {
    try {
      const response = await fetch(`http://${Servidor}/bases/download-csv/${id_base}`);

      if (response.ok) {
        // Procesar la respuesta como Blob si la solicitud fue exitosa
        const blob = await response.blob();

        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `cargues_${id_base}.csv`);
        document.body.appendChild(link);
        link.click();

        // Limpiar el enlace
        link.parentNode.removeChild(link);

        // Mostrar mensaje de éxito
        setErrorMessage("Archivo CSV descargado exitosamente");
        setSeverity("success");
      } else {
        // Obtener el error del servidor si la solicitud no fue exitosa
        const data = await response.json();
        setErrorMessage(data.error || "Error al descargar el archivo");
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error al descargar el CSV:", error);
      setErrorMessage("Error al procesar la descarga del archivo");
      setSeverity("error");
    } finally {
      setOpen(true);
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: 900, margin: "0 auto" }}
    >
      {showForm ? (
        <form onSubmit={handleSubmit} style={{ marginTop: "40px" }}>
          <ReactSelect
            options={clientesData.map((cliente) => ({
              value: cliente.id_cliente,
              label: cliente.nombre_cliente,
            }))}
            onChange={handleChange}
            placeholder="Seleccionar cliente"
            isClearable
            isSearchable
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "56px",
                borderRadius: "4px",
                borderColor: nombreError ? "#f44336" : base.borderColor,
                marginBottom: "20px",
              }),
            }}
          />
          {nombreError && (
            <Alert
              severity="error"
              onClose={() => setNombreError(false)}
              sx={{ marginBottom: "20px" }}
            >
              Para continuar, debes seleccionar un cliente.
            </Alert>
          )}
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              startIcon={<SearchIcon />}
            >
              Buscar Operaciones
            </Button>
          </Box>
        </form>
      ) : (
        <>
          {clienteDetalles && (
            <Stack
              spacing={2}
              style={{
                marginBottom: "40px",
                marginTop: "40px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                paddingBottom: "10px",
              }}
            >
              {alert === 1 && (
                <Alert severity="success" onClose={() => setAlert(-1)}>
                  Cliente encontrado con éxito
                </Alert>
              )}
              {alert === 0 && (
                <Alert severity="error" onClose={() => setAlert(-1)}>
                  Error al obtener los datos del cliente
                </Alert>
              )}
              <Box>
                <Typography variant="subtitle1" component="div">
                  Cliente:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {nombreClienteSelected}
                  </span>
                </Typography>
              </Box>
              {clienteDetalles.map((operacion) => (
                <Accordion key={operacion.id_operacion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" alignItems="center">
                      <BarChartIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          marginRight: "8px",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{
                            fontWeight: "bold",
                            color: (theme) => theme.palette.primary.main,
                          }}
                        >
                          Nombre Operación:
                        </Typography>
                        <Typography variant="body1" component="div">
                          {operacion.nombre_operacion}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction="column" spacing={2}>
                      {operacion.segmentos.map((segmento) => (
                        <Accordion key={segmento.id_segmento}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box display="flex" alignItems="center">
                              <DataSaverOnIcon
                                sx={{ color: "#ffcd38", marginRight: "8px" }}
                              />
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  component="div"
                                  sx={{ fontWeight: "bold", color: "#ffcd38" }}
                                >
                                  Nombre Segmento:
                                </Typography>
                                {!segmento.id_segmento ? (
                                  <Typography
                                    variant="body1"
                                    component="div"
                                    color="error"
                                  >
                                    No hay segmento asignado a esta operación.
                                  </Typography>
                                ) : (
                                  <Typography variant="body1" component="div">
                                    {segmento.nombre_segmento}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Stack direction="column" spacing={2}>
                              {segmento.servicios.map((servicio) => (
                                <Accordion key={servicio.id_servicio}>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                  >
                                    <Box display="flex" alignItems="center">
                                      <PermPhoneMsgIcon
                                        sx={{
                                          color: "#009688",
                                          marginRight: "8px",
                                        }}
                                      />
                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          component="div"
                                          sx={{
                                            fontWeight: "bold",
                                            color: "#009688",
                                          }}
                                        >
                                          Nombre Servicio:
                                        </Typography>
                                        {!servicio.id_servicio ? (
                                          <Typography
                                            variant="body1"
                                            component="div"
                                            color="error"
                                          >
                                            {!segmento.id_segmento
                                              ? "¡No hay un servicio! para asignar uno nuevo, debes crear primero un segmento."
                                              : "Crea un servicio"}
                                          </Typography>
                                        ) : (
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.nombre_servicio}
                                          </Typography>
                                        )}
                                      </Box>
                                    </Box>
                                  </AccordionSummary>
                                  {!servicio.id_servicio ? (
                                    <></>
                                  ) : (
                                    <AccordionSummary>
                                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            País:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.nombre_pais}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Departamento:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.nombre_depto_estado}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Ciudad:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.nombre_ciudad}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Canal de Atención:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.nombre_canal_atencion}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Zona Horaria:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.zona_horaria}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Sede:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.nombre_sede}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Recargo Nocturno:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.gen_recargo_noc === 1
                                              ? "Si"
                                              : "No"}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                          >
                                            Recargo Dom/Fest:
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            component="div"
                                          >
                                            {servicio.gen_recargo_dom_fest === 1
                                              ? "Si"
                                              : "No"}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </AccordionSummary>
                                  )}
                                  {/*OBJETOS*/}
                                  <AccordionDetails>
                                    <Stack direction="column" spacing={1}>
                                      {servicio.objetos.map((objeto) => (
                                        <Accordion key={objeto.id_objeto}>
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                          >
                                            <Box
                                              display="flex"
                                              alignItems="center"
                                            >
                                              <Diversity3Icon
                                                sx={{
                                                  color: "#3f51b5",
                                                  marginRight: "8px",
                                                }}
                                              />
                                              <Box>
                                                <Typography
                                                  variant="subtitle1"
                                                  component="div"
                                                  sx={{
                                                    fontWeight: "bold",
                                                    color: "#3f51b5",
                                                  }}
                                                >
                                                  Nombre Objeto:
                                                </Typography>
                                                {!objeto.id_objeto ? (
                                                  <Typography
                                                    variant="body1"
                                                    component="div"
                                                    color="error"
                                                  >
                                                    {!servicio.id_servicio
                                                      ? "¡No hay un objetos! para asignar uno nuevo, debes crear primero un servicio."
                                                      : "Crea un objeto"}
                                                  </Typography>
                                                ) : (
                                                  <Typography
                                                    variant="body1"
                                                    component="div"
                                                  >
                                                    {objeto.nombre_objeto}
                                                  </Typography>
                                                )}
                                              </Box>
                                            </Box>
                                          </AccordionSummary>
                                          {!objeto.id_objeto ? (
                                            <></>
                                          ) : (
                                            <AccordionSummary>
                                              <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                  <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                    sx={{ fontWeight: "bold" }}
                                                  >
                                                    Sistema de Gestión:
                                                  </Typography>
                                                  <Typography
                                                    variant="body1"
                                                    component="div"
                                                  >
                                                    {objeto.nombre_sist_gestion}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                  <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                    sx={{ fontWeight: "bold" }}
                                                  >
                                                    Fecha Inicio:
                                                  </Typography>
                                                  <Typography
                                                    variant="body1"
                                                    component="div"
                                                  >
                                                    {
                                                      new Date(
                                                        objeto.fecha_inicio
                                                      )
                                                        .toISOString()
                                                        .split("T")[0]
                                                    }
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </AccordionSummary>
                                          )}
                                        </Accordion>
                                      ))}
                                      <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                      >
                                        {!servicio.id_servicio ? (
                                          <></>
                                        ) : (
                                          <Button
                                            variant="contained"
                                            startIcon={<Diversity3Icon />}
                                            style={{
                                              backgroundColor: "#3f51b5",
                                            }}
                                            onClick={() =>
                                              handleNewSkill({
                                                id: servicio.id_servicio,
                                                nombre:
                                                  servicio.nombre_servicio,
                                              })
                                            }
                                          >
                                            Agregar Objeto
                                          </Button>
                                        )}
                                      </Box>
                                    </Stack>
                                  </AccordionDetails>
                                  {/*BASES*/}
                                  {servicio.nombre_canal_atencion === "Outbound" || servicio.nombre_canal_atencion === "OUTBOUND" || servicio.nombre_canal_atencion === "outbound" ? (
                                    <AccordionDetails>
                                      <Stack direction="column" spacing={1}>
                                        {servicio.bases.map((base) => (
                                          <Accordion key={base.id_base}>
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                            >
                                              <Box
                                                display="flex"
                                                alignItems="center"
                                              >
                                                <StorageIcon
                                                  sx={{
                                                    color: "#8bc34a",
                                                    marginRight: "8px",
                                                  }}
                                                />
                                                <Box>
                                                  <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                    sx={{
                                                      fontWeight: "bold",
                                                      color: "#8bc34a",
                                                    }}
                                                  >
                                                    Nombre Base:
                                                  </Typography>
                                                  {!base.id_base ? (
                                                    <Typography
                                                      variant="body1"
                                                      component="div"
                                                      color="error"
                                                    >
                                                      {!servicio.id_servicio
                                                        ? "¡No hay un bases! para asignar una nueva, debes crear primero un servicio."
                                                        : "Crea una base"}
                                                    </Typography>
                                                  ) : (
                                                    <Typography
                                                      variant="body1"
                                                      component="div"
                                                    >
                                                      {base.nombre_base}
                                                    </Typography>
                                                  )}
                                                </Box>
                                              </Box>
                                            </AccordionSummary>
                                            {!base.id_base ? (
                                              <></>
                                            ) : (
                                              <AccordionSummary>
                                                <Grid container spacing={2}>
                                                  <Grid item xs={4}>
                                                    <Typography
                                                      variant="subtitle1"
                                                      component="div"
                                                      sx={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Fecha Recibido:
                                                    </Typography>
                                                    <Typography
                                                      variant="body1"
                                                      component="div"
                                                    >
                                                      {
                                                        new Date(
                                                          base.fecha_recibido
                                                        )
                                                          .toISOString()
                                                          .split("T")[0]
                                                      }
                                                    </Typography>
                                                  </Grid>
                                                </Grid>
                                                <Box
                                                  display="flex"
                                                  justifyContent="flex-end"
                                                  marginTop={2}
                                                  marginRight={2}
                                                >
                                                  <Button
                                                    variant="contained"
                                                    startIcon={<DownloadIcon />}
                                                    onClick={() =>
                                                      handleDownloadTemplate(
                                                        servicio.id_servicio,
                                                        base.id_base
                                                      )
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        "#00e676",
                                                    }}
                                                  >
                                                    Plantilla
                                                  </Button>
                                                </Box>
                                                <Box display="flex" justifyContent="flex-end" marginTop={2} marginRight={2}>
                                                  <input
                                                    accept=".xlsx, .xls, .csv"
                                                    id={`upload-file-${servicio.id_servicio}`}
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={(event) =>
                                                      handleFileUpload(event, `upload-file-${servicio.id_servicio}`)
                                                    }
                                                  />
                                                  <Button
                                                    variant="contained"
                                                    startIcon={<Upload />}
                                                    component="span"
                                                    style={{ backgroundColor: "#00b0ff" }}
                                                    onClick={() =>
                                                      handleValidateAndUpload(
                                                        servicio.id_servicio,
                                                        `upload-file-${servicio.id_servicio}`
                                                      )
                                                    }
                                                  >
                                                    Subir Datos
                                                  </Button>
                                                </Box>
                                                <Box
                                                  display="flex"
                                                  justifyContent="flex-end"
                                                  marginTop={2}
                                                  marginRight={2}
                                                >
                                                  <Button
                                                    variant="contained"
                                                    startIcon={<DownloadIcon />}
                                                    onClick={() =>
                                                      handleDownloadCSV(
                                                        base.id_base
                                                      )
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        "#4aedc4",
                                                    }}
                                                  >
                                                    CSV
                                                  </Button>
                                                </Box>
                                              </AccordionSummary>
                                            )}
                                          </Accordion>
                                        ))}
                                        <Box
                                          display="flex"
                                          justifyContent="flex-end"
                                        >
                                          {!servicio.id_servicio ? (
                                            <></>
                                          ) : (
                                            <Button
                                              variant="contained"
                                              startIcon={<StorageIcon />}
                                              style={{
                                                backgroundColor: "#8bc34a",
                                              }}
                                              onClick={() =>
                                                handleNewBaseCliente({
                                                  id: servicio.id_servicio,
                                                  nombre:
                                                    servicio.nombre_servicio,
                                                })
                                              }
                                            >
                                              Agregar Base
                                            </Button>
                                          )}
                                        </Box>
                                      </Stack>
                                    </AccordionDetails>
                                  ) : (
                                    <></>
                                  )}
                                </Accordion>
                              ))}
                              <Box display="flex" justifyContent="flex-end">
                                {!segmento.id_segmento ? (
                                  <></>
                                ) : (
                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      handleNewServicioCliente({
                                        id: segmento.id_segmento,
                                        nombre: segmento.nombre_segmento,
                                        nombreOpe: operacion.nombre_operacion,
                                      })
                                    }
                                    startIcon={<PermPhoneMsgIcon />}
                                    style={{ backgroundColor: "#009688" }}
                                  >
                                    Agregar Servicio
                                  </Button>
                                )}
                              </Box>
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleNewSegmentoCliente({
                              id: operacion.id_operacion,
                              nombre: operacion.nombre_operacion,
                            })
                          }
                          color="primary"
                          startIcon={<DataSaverOnIcon />}
                          style={{ backgroundColor: "#ffcd38" }}
                        >
                          Agregar Segmento
                        </Button>
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleNewOperacionCliente({
                      id: selectedCliente.value,
                      nombre: selectedCliente.label,
                    })
                  }
                  startIcon={<BarChartIcon />}
                  color="primary"
                >
                  Agregar Operación
                </Button>
              </Box>
            </Stack>
          )}
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              startIcon={<ReplayIcon />}
              onClick={handleReset}
              color="success"
            >
              Nueva búsqueda
            </Button>
          </Box>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          color="secondary"
        >
          Volver al Home Operaciones
        </Button>
      </Box>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Agregar Operación</DialogTitle>
        <DialogContent>{renderModalContent()}</DialogContent>
      </Dialog>
    </Stack>
  );
}
