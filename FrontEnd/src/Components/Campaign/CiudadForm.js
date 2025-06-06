import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Service from '../../Machine/Service'
import apiClient from "../../Service/Service";

export default function CiudadForm({  onClose }) {
  const { Servidor } = Service();
  const [nombreCiudad, setNombreCiudad] = useState("");
  const [estadoCiudad, setEstadoCiudad] = useState("activo");
  const [zonaHoraria, setZonaHoraria] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");
  const [departamentosData, setDepartamentosData] = useState([]);
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [departamentoError, setDeparartementoError] = useState(false);
  const [zonaHorariaError, setZonaHorariaError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/deptoEstadosActivos`);

        const data = response.data;
        setDepartamentosData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
  
    fetchDepartamentos();
  }, [Servidor]);  

  useEffect(() => {
    if (alert === 1) {
      const timer = setTimeout(() => {
        setAlert(-1);
        // onAlertChange(-1);
        onClose()
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [alert,  onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreCiudad.trim() === "") {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (zonaHoraria.trim() === "") {
      setZonaHorariaError(true);
      return;
    } else {
      setZonaHorariaError(false);
    }
    if (idDepartamento === "") {
      setDeparartementoError(true);
      return;
    } else {
      setDeparartementoError(false);
    }
    if (estadoCiudad.trim() === "") {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    const estadoNumerico = estadoCiudad === "activo" ? 1 : 0;

    try {
      const url = `http://${Servidor}/ciudades`;
      const data = {
        nombreCiudad: nombreCiudad.toUpperCase(),
        zonaHoraria: zonaHoraria,
        deptoEstadoId: idDepartamento,
        estadoCiudad: estadoNumerico,
      };

      const response = await apiClient.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log("Datos enviados con éxito al servidor backend");

      const responseData = await response.data;
      setAlert(responseData.resp);
      // onAlertChange(responseData.resp);

      // console.log("Respuesta del backend código estado:", responseData);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }

    setNombreCiudad("");
    setZonaHoraria("");
    setIdDepartamento("");
    setZonaHoraria("");
    setEstadoCiudad("");
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    if (regex.test(inputValue) || inputValue === "") {
      setNombreCiudad(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handleZonaHorariaChange = (e) => {
    const selectedValue = e.target.value;
    setZonaHoraria(selectedValue);
    setZonaHorariaError(selectedValue === "");
  };

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;
    setIdDepartamento(selectedValue);
    setDeparartementoError(selectedValue === "");
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoCiudad(selectedValue);
    setEstadoError(selectedValue.trim() === "");
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: 400, margin: "0 auto" }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la ciudad"
          value={nombreCiudad}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          error={nombreError}
          sx={{ marginBottom: 2 }}
        />
        {nombreError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            Campo obligatorio / Ingrese solo texto
          </Alert>
        )}
        <TextField
          label="Zona Horaria"
          value={zonaHoraria}
          onChange={handleZonaHorariaChange}
          variant="outlined"
          fullWidth
          error={zonaHorariaError}
          sx={{ marginBottom: 2 }}
        />
        {zonaHorariaError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            Campo obligatorio / Ingrese solo texto
          </Alert>
        )}
        <FormControl
          fullWidth
          sx={{ marginBottom: 3 }}
          error={departamentoError}
        >
          <InputLabel id="select-departamento-label">
            Seleccione un departamento
          </InputLabel>
          <Select
            labelId="select-departamento-label"
            id="select-departamento"
            value={idDepartamento}
            label="Seleccione un Departamento"
            onChange={handleDepartamentoChange}
            sx={{ marginBottom: 2 }}
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
          {departamentoError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              Campo obligatorio / Ingrese solo texto
            </Alert>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={estadoError}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoCiudad}
            label="Estado"
            onChange={handleEstadoChange}
          >
            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
          {estadoError && (
            <div
              style={{
                color: "#f44336",
                marginTop: "3px",
                marginLeft: "14px",
                fontSize: "0.875rem",
                fontFamily: "Roboto",
              }}
            >
              Por favor, selecciona el estado
            </div>
          )}
        </FormControl>
        <div></div>
        <Button
          variant="contained"
          type="submit"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
        >
          Crear Ciudad
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          startIcon={<ClearRoundedIcon />}
          onClick={handleBack}
          color="error"
          fullWidth
        >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Ciudad creada con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe una ciudad creada con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
}
