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
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import UpdateIcon from "@mui/icons-material/Update";
import Typography from "@mui/material/Typography";
import Service from "../../Machine/Service";
import { UserProfileContext } from "../../Context/ProfileContex";
import apiClient from "../../Service/Service";

const { Servidor } = Service();

const ServicioForm = ({
  onCanalAtencionChange,
  segmentoId,
  segmentoNombre,
  handleBack,
  initialDataServ,
  onServicioSaved
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
  const [idTipoServicio, setIdTipoServicio] = useState(initialDataServ.tipoServicio);
  const [idCanalAtencion, setIdCanalAtencion] = useState(initialDataServ.canalAtencion);
  const [nombreCanal, setNombreCanal] = useState('')
  const [canalesAtencionData, setCanalesAtencionData] = useState([]);
  const [unidadesFacturasData, setUnidadesFacturasData] = useState([]);
  const [idUnidadFactura, setIdUnidadFactura] = useState(initialDataServ.unidadFactura);
  const [nombreUnidadFactura, setNombreUnidadFactura] = useState('');
  const [estadoServicio, setEstadoServicio] = useState(initialDataServ.estado || "activo");
  const [recargoNocturno, setRecargoNocturno] = useState(initialDataServ.recargoNocturno);
  const [recargoDomFest, setRecargoDomFest] = useState(initialDataServ.recargoDomFest);
  const [fechaFinServicio, setFechaFinServicio] = useState(initialDataServ.fechaFinServicio);
  const [modeloPlaneacion, setModeloPlaneacion] = useState(initialDataServ.modeloPlaneacion);
  const [facturable, setFacturable] = useState(initialDataServ.facturable);
  const [idiomasData, setIdiomasData] = useState([]);
  const [idIdioma, setIdIdioma] = useState(initialDataServ.idioma);
  const [nombreIdioma, setNombreIdioma] = useState('');

  const [formError, setFormError] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [paisError, setPaisError] = useState(false);
  const [deptoError, setDeptoError] = useState(false);
  const [ciudadError, setCiudadError] = useState(false);
  const [sedeError, setSedeError] = useState(false);
  const [tipoServicioError, setTipoServicioError] = useState(false);
  const [canalAtencionError, setCanalAtencionError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [recargoNocturnoError, setRecargoNocturnoError] = useState(false);
  const [recargoDomFestError, setRecargoDomFestError] = useState(false);
  const [fechaFinServicioError, setFechaFinServicioError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [modeloPlaneacionError, setModeloPlaneacionError] = useState(false);
  const [unidadFacturaError, setUnidadFacturaError] = useState(false);
  const [facturableError, setFacturableError] = useState(false);
  const [idiomaError, setIdiomaError] = useState(false);

  const [alert, setAlert] = useState(-1);
  const [alert2, setAlert2] = useState(-1);

  useEffect(() => {
    setNombreServicio(initialDataServ.nombre);
    setIdPais(initialDataServ.pais);
    setIdDepartamento(initialDataServ.departamento);
    setIdCiudad(initialDataServ.ciudad);
    setIdSede(initialDataServ.sede);
    setIdTipoServicio(initialDataServ.tipoServicio);
    setIdCanalAtencion(initialDataServ.canalAtencion);
    setNombreCanal(canalesAtencionData.find(canal => canal.id_canal_atencion === initialDataServ.canalAtencion)?.nombre_canal_atencion || '');
    setEstadoServicio(initialDataServ.estado || "activo");
    setRecargoNocturno(initialDataServ.recargoNocturno);
    setRecargoDomFest(initialDataServ.recargoDomFest);
    setFechaFinServicio(initialDataServ.fechaFinServicio);
    setModeloPlaneacion(initialDataServ.modeloPlaneacion);
    setIdUnidadFactura(initialDataServ.unidadFactura);
    setFacturable(initialDataServ.facturable);
    setIdIdioma(initialDataServ.idioma);
    setIsNewServ(initialDataServ.id === null);
  }, [initialDataServ, canalesAtencionData]);

  useEffect(() => {
  }, [segmentoId, segmentoNombre]);
  
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

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/paisesActivos`);

        const data = await response.data;
        setPaisesData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchPaises();
  }, []);

  const handlePaisChange = (e) => {
    const selectedValue = e.target.value;
    setIdPais(selectedValue);
    if (selectedValue) {
      setPaisError(false);
    } else {
      setPaisError(true);
    }
  };

  useEffect(() => {
    if (idPais === "") return; // Si no se selecciona ningún país, no ejecuta el useEffect

    const fetchDepartamentos = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/deptoEstadosActivosPaises/${idPais}`
        );

        const data = await response.data;
        setDepartamentosData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchDepartamentos();
  }, [idPais]);

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;
    setIdDepartamento(selectedValue);
    if (selectedValue) {
      setDeptoError(false);
    } else {
      setDeptoError(true);
    }
  };

  useEffect(() => {
    if (idDepartamento === "") return;

    const fetchCiudades = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/ciudadesActivasDeptos/${idDepartamento}`
        );

        const data = await response.data;
        setCiudadesData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchCiudades();
  }, [idDepartamento]);

  const handleCiudadChange = (e) => {
    const selectedValue = e.target.value;
    setIdCiudad(selectedValue);
    if (selectedValue) {
      setCiudadError(false);
    } else {
      setCiudadError(true);
    }
  };

  useEffect(() => {
    if (idCiudad === "") return;

    const fetchSedes = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/sedesActivasCiudades/${idCiudad}`
        );
        
        const data = await response.data;
        setSedesData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchSedes();
  }, [idCiudad]);

  const handleSedeChange = (e) => {
    const selectedValue = e.target.value;
    setIdSede(selectedValue);
    if (selectedValue) {
      setSedeError(false);
    } else {
      setSedeError(true);
    }
  };

  useEffect(() => {
    const fetchTiposServicio = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/tipoServiciosActivos`
        );

        const data = await response.data;
        setTiposServicioData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchTiposServicio();
  }, []);

  const handleTipoServicioChange = (e) => {
    const selectedValue = e.target.value;
    setIdTipoServicio(selectedValue);
    if (selectedValue) {
      setTipoServicioError(false);
    } else {
      setTipoServicioError(true);
    }
  };

  useEffect(() => {
    const fetchCanalesAtencion = async () => {
      try {
        const response = await apiClient.get(
          `http://${Servidor}/canalesAtencionActivos`
        );
        const data = await response.data;        
        setCanalesAtencionData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchCanalesAtencion();
  }, []);

  const handleCanalAtencionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedCanal = canalesAtencionData.find(canal => canal.id_canal_atencion === selectedValue);
    setIdCanalAtencion(selectedValue);
    setNombreCanal(selectedCanal ? selectedCanal.nombre_canal_atencion : '');
    onCanalAtencionChange(selectedCanal.nombre_canal_atencion);
    if (selectedValue) {
      setCanalAtencionError(false);
    } else {
      setCanalAtencionError(true);
    }
  };

  const handleEstadoServicioChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoServicio(selectedValue);
    if (selectedValue) {
      setEstadoError(false);
    } else {
      setEstadoError(true);
    }
  };

  const handleRecargoNocturnoChange = (e) => {
    const selectedValue = e.target.value;
    setRecargoNocturno(selectedValue);
    if (selectedValue) {
      setRecargoNocturnoError(false);
    } else {
      setRecargoNocturnoError(true);
    }
  };

  const handleRecargoDomFestChange = (e) => {
    const selectedValue = e.target.value;
    setRecargoDomFest(selectedValue);
    if (selectedValue) {
      setRecargoDomFestError(false);
    } else {
      setRecargoDomFestError(true);
    }
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
      setEstadoError(true);
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

  const handleSubmit = async (e) => {
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

      const response = await apiClient(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      const responseData = await response.data;
      setAlert2(responseData.resp);

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

        //validar que el nombre sea outbount y no estatico
        if (nombreCanal === "Outbound" || nombreCanal === "OUTBOUND" || nombreCanal === "outbound") {
          // Llamada al endpoint de formGen(constructor ti)
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append(
            "Authorization",
            "Basic YW50YXJlc0BhbG1hY29sLmNvOmFudGFyZXMuYWxtYWNvbDIwMjU="
          );

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
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            component="h1"
            align="left"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            {isNewServ ? "Crear Servicio" : "Actualizar Servicio"}
          </Typography>
          <TextField
            label="Segemento"
            value={segmentoNombre}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            disabled
          />
          <TextField
            label="Nombre del Servicio"
            value={nombreServicio}
            onChange={handleNombreServicioChange}
            variant="outlined"
            fullWidth
            helperText={nombreError}
            error={nombreError}
            sx={{ marginBottom: 2 }}
          />
          {nombreError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {" "}
              No se permiten carácteres especiales{" "}
            </Alert>
          )}
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={paisError}>
            <InputLabel id="select-pais-label">Seleccione un País</InputLabel>
            <Select
              labelId="select-pais-label"
              id="select-pais"
              value={idPais}
              label="Seleccione un País"
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
            <InputLabel id="select-departamento-label">
              Seleccione un Departamento
            </InputLabel>
            <Select
              labelId="select-departamento-label"
              id="select-departamento"
              value={idDepartamento}
              label="Seleccione un Departamento"
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
            <InputLabel id="select-ciudad-label">
              Seleccione una ciudad
            </InputLabel>
            <Select
              labelId="select-ciudad-label"
              id="select-ciudad"
              value={idCiudad}
              label="Selecciona una ciudad"
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
            <InputLabel id="select-sede-label">Seleccione una sede</InputLabel>
            <Select
              labelId="select-sede-label"
              id="select-sede"
              value={idSede}
              label="Selecciona una sede"
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
            <InputLabel id="select-tipoServicio-label">
              Seleccione un tipo de servicio
            </InputLabel>
            <Select
              labelId="select-tipoServicio-label"
              id="select-tipoServicio"
              value={idTipoServicio}
              label="Selecciona un tipo de servicio"
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
            sx={{ marginBottom: 2 }}
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
                  value={canalAtencion.id_canal_atencion}
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
            <InputLabel id="estado-select-label">
              ¿Genera recargo nocturno?
            </InputLabel>
            <Select
              labelId="estado-select-label"
              id="estado-select"
              value={recargoNocturno}
              label="Recargo Nocturno"
              onChange={handleRecargoNocturnoChange}
            >
              <MenuItem value="">Por favor, selecciona una opción</MenuItem>
              <MenuItem value="Si">Si</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={recargoDomFestError}
          >
            <InputLabel id="estado-select-label">
              ¿Genera recargo dominical/festivo?
            </InputLabel>
            <Select
              labelId="estado-select-label"
              id="estado-select"
              value={recargoDomFest}
              label="Recargo Nocturno"
              onChange={handleRecargoDomFestChange}
            >
              <MenuItem value="">Por favor, selecciona una opción</MenuItem>
              <MenuItem value="Si">Si</MenuItem>
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
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={estadoError}>
            <InputLabel id="estado-select-label">Estado</InputLabel>
            <Select
              labelId="estado-select-label"
              id="estado-select"
              value={estadoServicio}
              label="Estado"
              onChange={handleEstadoServicioChange}
            >
              <MenuItem value="">Por favor, selecciona el estado</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
          {renderAlert()}
          <Button
            variant="contained"
            type="submit"
            startIcon={isNewServ ? <AddCircleOutlineIcon /> : <UpdateIcon />}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            {isNewServ ? "Crear Servicio" : "Actualizar Servicio"}
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: "10px", marginBottom: "10px" }}
            startIcon={<ArrowBackRoundedIcon />}
            onClick={handleBack}
            color="success"
            fullWidth
          >
            Volver
          </Button>
        </form>
        {alert2 === 1 && (
          <Alert severity="success" onClose={() => setAlert(-1)}>
            Servicio creada con éxito
          </Alert>
        )}
        {alert2 === 0 && (
          <Alert severity="error" onClose={() => setAlert(-1)}>
            ¡Ya existe una servicio creada con ese mismo nombre!
          </Alert>
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default ServicioForm;
