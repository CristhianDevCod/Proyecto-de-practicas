import React, { useState, useEffect, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import Typography from "@mui/material/Typography";
import Service from "../../Machine/Service";
import { UserProfileContext } from "../../Context/ProfileContex";
import apiClient from "../../Service/Service";

const { Servidor } = Service();

const ServicioFormPopPup = ({
  onClose,
  onServicioSaved,
  segmentoId,
  initialDataServ,
}) => {
  const { userProfile } = useContext(UserProfileContext);
  const [isNewServ, setIsNewServ] = useState(true);
  const [nombreServicio, setNombreServicio] = useState(initialDataServ.nombre);
  const [paisesData, setPaisesData] = useState([]);
  const [idPais, setIdPais] = useState(initialDataServ.pais);
  const [departamentosData, setDepartamentosData] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState(initialDataServ.departamento);
  const [ciudadesData, setCiudadesData] = useState([]);
  const [idCiudad, setIdCiudad] = useState(initialDataServ.ciudad);
  const [sedesData, setSedesData] = useState([]);
  const [idSede, setIdSede] = useState(initialDataServ.sede);
  const [tiposServicioData, setTiposServicioData] = useState([]);
  const [unidadesFacturasData, setUnidadesFacturasData] = useState([]);
  const [idUnidadFactura, setIdUnidadFactura] = useState(initialDataServ.unidadFactura);
  const [nombreUnidadFactura, setNombreUnidadFactura] = useState('');
  const [idTipoServicio, setIdTipoServicio] = useState(initialDataServ.tipoServicio);
  const [idCanalAtencion, setIdCanalAtencion] = useState(initialDataServ.canalAtencion);
  const [nombreCanal, setNombreCanal] = useState('')
  const [canalesAtencionData, setCanalesAtencionData] = useState([]);
  const [estadoServicio, setEstadoServicio] = useState(initialDataServ.estado || "activo");
  const [recargoNocturno, setRecargoNocturno] = useState(initialDataServ.recargoNocturno);
  const [recargoDomFest, setRecargoDomFest] = useState(initialDataServ.recargoDomFest);
  const [fechaFinServicio, setFechaFinServicio] = useState(initialDataServ.fechaFinServicio);
  const [modeloPlaneacion, setModeloPlaneacion] = useState(initialDataServ.modeloPlaneacion);
  const [facturable, setFacturable] = useState(initialDataServ.facturable);
  const [idiomasData, setIdiomasData] = useState([]);
  const [idIdioma, setIdIdioma] = useState(initialDataServ.idioma);
  const [nombreIdioma, setNombreIdioma] = useState('');

  // Estado para errores individuales por campo
  const [nombreError, setNombreError] = useState(false);
  const [paisError, setPaisError] = useState(false);
  const [deptoError, setDeptoError] = useState(false);
  const [ciudadError, setCiudadError] = useState(false);
  const [sedeError, setSedeError] = useState(false);
  const [tipoServicioError, setTipoServicioError] = useState(false);
  const [canalAtencionError, setCanalAtencionError] = useState(false);
  const [estadoServicioError, setEstadoServicioError] = useState(false);
  const [recargoNocturnoError, setRecargoNocturnoError] = useState(false);
  const [recargoDomFestError, setRecargoDomFestError] = useState(false);
  const [fechaFinServicioError, setFechaFinServicioError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [modeloPlaneacionError, setModeloPlaneacionError] = useState(false);
  const [unidadFacturaError, setUnidadFacturaError] = useState(false);
  const [facturableError, setFacturableError] = useState(false);
  const [idiomaError, setIdiomaError] = useState(false);

  const [alert, setAlert] = useState(-1);

  // Estado general para el error de formulario
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setNombreServicio(initialDataServ.nombre);
    setIdPais(initialDataServ.pais);
    setIdDepartamento(initialDataServ.departamento);
    setIdCiudad(initialDataServ.ciudad);
    setIdSede(initialDataServ.sede);
    setIdTipoServicio(initialDataServ.tipoServicio);
    setIdCanalAtencion(initialDataServ.canalAtencion);
    setEstadoServicio(initialDataServ.estado || "activo");
    setRecargoNocturno(initialDataServ.recargoNocturno);
    setRecargoDomFest(initialDataServ.recargoDomFest);
    setFechaFinServicio(initialDataServ.fechaFinServicio);
    setModeloPlaneacion(initialDataServ.modeloPlaneacion);
    setIdUnidadFactura(initialDataServ.unidadFactura);
    setFacturable(initialDataServ.facturable);
    setIdIdioma(initialDataServ.idioma);
    setIsNewServ(initialDataServ.id === null);
  }, [initialDataServ]);

  const handleNombreServicioChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    
    // Validar entrada con el regex y permitir vacío
    if (regex.test(inputValue) || inputValue === "") {
      setNombreServicio(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  }; 

  // Fetch de datos para los selectores (países, departamentos, ciudades, sedes, tipos de servicio)
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const url = `http://${Servidor}/paisesActivos`;
        const response = await apiClient.get(url);

        setPaisesData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchPaises();
  }, []);

  useEffect(() => {
    if (!idPais) return;

    const fetchDepartamentos = async () => {
      try {
        const url = `http://${Servidor}/deptoEstadosActivosPaises/${idPais}`;
        const response = await apiClient.get(url);

        setDepartamentosData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchDepartamentos();
  }, [idPais]);

  useEffect(() => {
    if (!idDepartamento) return;

    const fetchCiudades = async () => {
      try {
        const url = `http://${Servidor}/ciudadesActivasDeptos/${idDepartamento}`;
        const response = await apiClient.get(url);

        setCiudadesData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchCiudades();
  }, [idDepartamento]);

  useEffect(() => {
    if (!idCiudad) return;

    const fetchSedes = async () => {
      try {
        const url = `http://${Servidor}/sedesActivasCiudades/${idCiudad}`;
        const response = await apiClient.get(url);

        setSedesData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchSedes();
  }, [idCiudad]);

  useEffect(() => {
    const fetchTiposServicio = async () => {
      try {
        const url = `http://${Servidor}/tipoServiciosActivos`;
        const response = await apiClient.get(url);

        setTiposServicioData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchTiposServicio();
  }, []);

  useEffect(() => {
    const fetchCanalesAtencion = async () => {
      try {
        const url = `http://${Servidor}/canalesAtencionActivos`;
        const response = await apiClient.get(url); // Usa apiClient.get para obtener los datos

        // Axios maneja la respuesta en response.data
        setCanalesAtencionData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchCanalesAtencion();
  }, []);

  const handlePaisChange = (e) => {
    setIdPais(e.target.value);
    setPaisError(false);
  };

  const handleDepartamentoChange = (e) => {
    setIdDepartamento(e.target.value);
    setDeptoError(false);
  };

  const handleCiudadChange = (e) => {
    setIdCiudad(e.target.value);
    setCiudadError(false);
  };

  const handleSedeChange = (e) => {
    setIdSede(e.target.value);
    setSedeError(false);
  };

  const handleTipoServicioChange = (e) => {
    setIdTipoServicio(e.target.value);
    setTipoServicioError(false);
  };

  const handleCanalAtencionChange = (e) => {
    const selectedValueId = e.target.value.id_canal_atencion;
    const selectedValueName = e.target.value.nombre_canal_atencion;
    setIdCanalAtencion(selectedValueId);
    setNombreCanal(selectedValueName)
    setCanalAtencionError(false);
  };

  const handleEstadoServicioChange = (e) => {
    setEstadoServicio(e.target.value);
    setEstadoServicioError(false);
  };

  const handleRecargoNocturnoChange = (e) => {
    setRecargoNocturno(e.target.value);
    setRecargoNocturnoError(false);
  };

  const handleRecargoDomFestChange = (e) => {
    setRecargoDomFest(e.target.value);
    setRecargoDomFestError(false);
  };

  useEffect(() => {
    if (fechaFinServicioError) {
      const timer = setTimeout(() => {
        setFechaError("");
        setFechaFinServicioError(false); // Resetea el estado de error de la fecha
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [fechaFinServicioError]);

  const handleFechaFinServicioChange = (value) => {
    const today = new Date();
    const selectedDate = new Date(value);

    if (selectedDate < today) {
      setFechaFinServicioError(true);
      setFechaError("La fecha de fin no puede ser menor que la fecha actual.");
    } else {
      setFechaFinServicioError(false);
      setFechaError("");
    }

    setFechaFinServicio(value);
  };

  useEffect(() => {
    const fetchUnidadesFacturas = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/unidades_facturas`
        );
        const data = await response.data;
        setUnidadesFacturasData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchUnidadesFacturas();
  }, []);

  const handleUnidadFacturaChange = (e) => {
    const selectedValue = e.target.value;
    const selectedUnidadFactura = unidadesFacturasData.find(unidadFactura => unidadFactura.id_unidad_factura === selectedValue);
    setIdUnidadFactura(selectedValue);
    setNombreUnidadFactura(selectedUnidadFactura ? selectedUnidadFactura.nombre_unidad_factura : '');
    if (selectedValue) {
      setUnidadFacturaError(false);
    } else {
      setUnidadFacturaError(true);
    }
  };

  const handleModeloPlaneacionChange = (e) => {
    const selectedValue = e.target.value;
    setModeloPlaneacion(selectedValue);
    if (selectedValue) {
      setModeloPlaneacionError(false);
    } else {
      setModeloPlaneacionError(true);
    }
  };

  const handleFacturableChange = (e) => {
    const selectedValue = e.target.value;
    setFacturable(selectedValue);
    if (selectedValue) {
      setFacturableError(false);
    } else {
      setFacturableError(true);
    }
  };

  useEffect(() => {
    const fetchIdiomas = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/idiomas`
        );
        const data = await response.data;        
        setIdiomasData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchIdiomas();
  }, []);

  const handleIdiomaChange = (e) => {
    const selectedValue = e.target.value; 
    const selectedIdioma = idiomasData.find(Idioma => Idioma.id === selectedValue);
    setIdIdioma(selectedValue);
    setNombreIdioma(selectedIdioma ? selectedIdioma.nombre : '');
    if (selectedValue) {
      setIdiomaError(false);
    } else {
      setIdiomaError(true);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!nombreServicio) {
      setNombreError(true);
      isValid = false;
    }
    if (!idPais) {
      setPaisError(true);
      isValid = false;
    }
    if (!idDepartamento) {
      setDeptoError(true);
      isValid = false;
    }
    if (!idCiudad) {
      setCiudadError(true);
      isValid = false;
    }
    if (!idSede) {
      setSedeError(true);
      isValid = false;
    }
    if (!idTipoServicio) {
      setTipoServicioError(true);
      isValid = false;
    }
    if (!idCanalAtencion) {
      setCanalAtencionError(true);
      isValid = false;
    }
    if (!estadoServicio) {
      setEstadoServicioError(true);
      isValid = false;
    }
    if (!recargoNocturno) {
      setRecargoNocturnoError(true);
      isValid = false;
    }
    if (!recargoDomFest) {
      setRecargoDomFestError(true);
      isValid = false;
    }
    if (!fechaFinServicio) {
      setFechaFinServicioError(true);
      setFechaError("La fecha de fin no puede estar vacía.");
      isValid = false;
    } else {
      const today = new Date();
      const selectedDate = fechaFinServicio;
      if (selectedDate < today) {
        setFechaFinServicioError(true);
        setFechaError(
          "La fecha de fin no puede ser menor que la fecha actual."
        );
        isValid = false;
      } else {
        setFechaFinServicioError(false);
        setFechaError("");
      }
    }
    if (!modeloPlaneacion) {
      setModeloPlaneacionError(true);
      isValid = false;
    }
    if (!idUnidadFactura) {
      setUnidadFacturaError(true);
      isValid = false;
    }
    if (!facturable) {
      setFacturableError(true);
      isValid = false;
    }
    if (!idIdioma) {
      setIdiomaError(true);
      isValid = false;
    }
    if (isValid) {
      setAlert(0);
      setFormError("");
    } else {
      setAlert(1);
      setFormError("Por favor completa todos los campos obligatorios");
    }
    return isValid;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const estadoNumerico = estadoServicio === "activo" ? 1 : 0;
    const ReacrgoNocturnoNum = recargoNocturno === "Si" ? 1 : 0;
    const ReacrgoDomFestNum = recargoDomFest === "Si" ? 1 : 0;
    const esFacturable = facturable === "Si" ? 1 : 0;

    try {
      const url = isNewServ
        ? `http://${Servidor}/servicios`
        : `http://${Servidor}/servicios/${initialDataServ.id}`;
      const method = isNewServ ? "POST" : "PUT";
      const data = {
        nombreServicio: nombreServicio.toUpperCase(),
        paisId: idPais,
        deptoId: idDepartamento,
        ciudadId: idCiudad,
        sedeId: idSede,
        tipoServicioId: idTipoServicio,
        canalAtencionId: idCanalAtencion,
        genRecargoNocturno: ReacrgoNocturnoNum,
        genRecargoDomFestivo: ReacrgoDomFestNum,
        segmentoId: segmentoId,
        fechaFinServicio: fechaFinServicio,
        modeloPlaneacion: modeloPlaneacion,
        unidadFacturaId: idUnidadFactura,
        esFacturable: esFacturable,
        idiomaId: idIdioma,
        estadoServicio: estadoNumerico,
      };

      const response = await apiClient({
        url: url,
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      const responseData = response.data;
      //onAlertChange(responseData.resp);

      if (responseData.resp === 1) {
        const idServicioNuevo = responseData.idServicio;
        const nombreServicioNuevo = responseData.nombreServicio; 
        onServicioSaved(
          idServicioNuevo,
          nombreServicio,
          idPais,
          idDepartamento,
          idCiudad,
          idSede,
          idTipoServicio,
          idCanalAtencion,
          recargoNocturno,
          recargoDomFest,
          fechaFinServicio,
          modeloPlaneacion,
          idUnidadFactura,
          facturable,
          idIdioma,
          estadoServicio
        );
        onClose();

        if (nombreCanal === "Outbound" || nombreCanal === "OUTBOUND" || nombreCanal === "outbound") {
          // Llamada al endpoint de formGen (constructor ti)
          const myHeaders = {
            "Content-Type": "application/json",
            "Authorization": "Basic YW50YXJlc0BhbG1hY29sLmNvOmFudGFyZXMuYWxtYWNvbDIwMjU="
          };

          const raw = {
            id_servicio: idServicioNuevo,
            nombre_servicio: nombreServicioNuevo,
            nombre: nombreServicioNuevo,
            desde: new Date().toISOString().split("T")[0],
            hasta: fechaFinServicio.toISOString().split("T")[0],
            userAD: userProfile.user,// Es necesario extraer el usuario de red desde antares
          };

          const formGenResponse = await apiClient({
            url: "https://almapps.online/formgen/public/api/v1/antares",
            method: "POST",
            headers: myHeaders,
            data: raw
          });

          const formGenResult = formGenResponse.data;
          // console.log('FormGenResult',formGenResult);

          if (formGenResult.IDCampaña) {
            const IDCampaña = formGenResult.IDCampaña;
            // console.log("IDCampaña:", IDCampaña);

            // Se guarda relación de servicio y campaña en formGen
            const relationData = {
              servicio_id: idServicioNuevo,
              campanaFormGen_id: IDCampaña,
            };

            await apiClient({
              url: `http://${Servidor}/servicios/servicios_campanas`,
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify(relationData)
            });
          }
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const renderAlert = () => {
    if (alert === 1 && formError) {
      return (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          {formError}
        </Alert>
      );
    }
    return null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ maxWidth: 400, margin: "0 auto" }}
      >
        <form onSubmit={handleSave}>
          <Typography variant="h6" component="div" gutterBottom>
            {isNewServ ? "Crear nuevo servicio" : "Editar servicio"}
          </Typography>
          <TextField
            label="Nombre del Servicio"
            value={nombreServicio}
            onChange={handleNombreServicioChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2 }}
            error={nombreError}
            helperText={nombreError}
          />
          {nombreError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {" "}
              Ingrese solo texto{" "}
            </Alert>
          )}
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={paisError}>
            <InputLabel id="pais-label">País</InputLabel>
            <Select
              labelId="pais-label"
              value={idPais}
              onChange={handlePaisChange}
            >
              {paisesData.map((pais) => (
                <MenuItem key={pais.id_pais} value={pais.id_pais}>
                  {pais.nombre_pais}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={deptoError}>
            <InputLabel id="departamento-label">Departamento</InputLabel>
            <Select
              labelId="departamento-label"
              value={idDepartamento}
              onChange={handleDepartamentoChange}
            >
              {departamentosData.map((departamento) => (
                <MenuItem
                  key={departamento.id_depto_estado}
                  value={departamento.id_depto_estado}
                >
                  {departamento.nombre_depto_estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={ciudadError}>
            <InputLabel id="ciudad-label">Ciudad</InputLabel>
            <Select
              labelId="ciudad-label"
              value={idCiudad}
              onChange={handleCiudadChange}
            >
              {ciudadesData.map((ciudad) => (
                <MenuItem key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                  {ciudad.nombre_ciudad}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={sedeError}>
            <InputLabel id="sede-label">Sede</InputLabel>
            <Select
              labelId="sede-label"
              value={idSede}
              onChange={handleSedeChange}
            >
              {sedesData.map((sede) => (
                <MenuItem key={sede.id_sede} value={sede.id_sede}>
                  {sede.nombre_sede}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={tipoServicioError}
          >
            <InputLabel id="tipo-servicio-label">Tipo de Servicio</InputLabel>
            <Select
              labelId="tipo-servicio-label"
              value={idTipoServicio}
              onChange={handleTipoServicioChange}
            >
              {tiposServicioData.map((tipoServicio) => (
                <MenuItem
                  key={tipoServicio.id_tipo_servicio}
                  value={tipoServicio.id_tipo_servicio}
                >
                  {tipoServicio.nombre_tipo_servicio}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 3 }}
            error={canalAtencionError}
          >
            <InputLabel id={`select-canalAtencion-label`}>
              Seleccione un canal de atención
            </InputLabel>
            <Select
              labelId={`select-canalAtencion-label`}
              value={idCanalAtencion}
              label="Seleccione un Canal de Atención"
              onChange={handleCanalAtencionChange}
            >
              {canalesAtencionData.map((canalAtencion) => (
                <MenuItem
                  key={canalAtencion.id_canal_atencion}
                  value={canalAtencion}
                >
                  {canalAtencion.nombre_canal_atencion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={recargoNocturnoError}
          >
            <InputLabel id="recargo-nocturno-label">
              Recargo Nocturno
            </InputLabel>
            <Select
              labelId="recargo-nocturno-label"
              value={recargoNocturno}
              onChange={handleRecargoNocturnoChange}
            >
              <MenuItem value="Si">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={recargoDomFestError}
          >
            <InputLabel id="recargo-dom-fest-label">
              Recargo Dom/Fest
            </InputLabel>
            <Select
              labelId="recargo-dom-fest-label"
              value={recargoDomFest}
              onChange={handleRecargoDomFestChange}
            >
              <MenuItem value="Si">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={fechaFinServicioError}
          >
            <DatePicker
              label="Fecha Fin Servicio"
              value={fechaFinServicio}
              onChange={handleFechaFinServicioChange}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
            {fechaError && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                {fechaError}
              </Alert>
            )}
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={modeloPlaneacionError}
          >
            <InputLabel id="estado-select-label">
              Modelo Planeación
            </InputLabel>
            <Select
              labelId="estado-select-label"
              id="estado-select"
              value={modeloPlaneacion}
              label="Modelo Planeación"
              onChange={handleModeloPlaneacionChange}
            >
              <MenuItem value="">Por favor, selecciona una opción</MenuItem>
              <MenuItem value="Conciliado cliente">Conciliado Cliente</MenuItem>
              <MenuItem value="Almacontact">AlmaContact</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={canalAtencionError}
          >
            <InputLabel id={`select-unidad-factura-label`}>
              Seleccione la unidad de factura
            </InputLabel>
            <Select
              labelId={`select-unidad-factura-label`}
              value={idUnidadFactura}
              label="Seleccione una unidad de factura"
              onChange={handleUnidadFacturaChange}
            >
              {unidadesFacturasData.map((unidadFactura) => (
                <MenuItem
                  key={unidadFactura.id_unidad_factura}
                  value={unidadFactura.id_unidad_factura}
                >
                  {unidadFactura.nombre_unidad_factura}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={recargoNocturnoError}
          >
            <InputLabel id="estado-select-label">
              ¿Facturable?
            </InputLabel>
            <Select
              labelId="estado-select-label"
              id="estado-select"
              value={facturable}
              label="Facturable"
              onChange={handleFacturableChange}
            >
              <MenuItem value="">Por favor, selecciona una opción</MenuItem>
              <MenuItem value="Si">Si</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={idiomaError}
          >
            <InputLabel id={`select-idioma-label`}>
              Seleccione un idioma
            </InputLabel>
            <Select
              labelId={`select-idioma-label`}
              value={idIdioma}
              label="Seleccione un idioma"
              onChange={handleIdiomaChange}
            >
              {idiomasData.map((idioma) => (
                <MenuItem
                  key={idioma.id}
                  value={idioma.id}
                >
                  {idioma.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={estadoServicioError}
          >
            <InputLabel id="estado-servicio-label">
              Estado del Servicio
            </InputLabel>
            <Select
              labelId="estado-servicio-label"
              value={estadoServicio}
              onChange={handleEstadoServicioChange}
            >
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
          {renderAlert()}
          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={isNewServ ? <AddCircleOutlineIcon /> : <UpdateIcon />}
            >
              {isNewServ ? "Crear Servicio" : "Actualizar Servicio"}
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </form>
      </Stack>
    </LocalizationProvider>
  );
};

export default ServicioFormPopPup;
