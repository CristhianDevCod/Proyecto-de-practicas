import React, { useState, useEffect } from "react";
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
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";

export default function DepartamentoForm({  onClose }) {
  const { Servidor } = Service();
  const [nombreDepartamento, setNombreDepartamento] = useState("");
  const [estadoDepartamento, setEstadoDepartamento] = useState("activo");
  const [idPais, setIdPais] = useState("");
  const [paisesData, setPaisesData] = useState([]);
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [paisError, setPaisError] = useState(false); // Cambiado a booleano
  const [alert, setAlert] = useState(-1);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        // Realiza la solicitud GET usando apiClient
        const response = await apiClient.get(`http://${Servidor}/paisesActivos`);
  
        // response.data ya contiene los datos de la respuesta en formato JSON
        setPaisesData(response.data);
      } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error("Error al obtener los datos:", error);
      }
    };
  
    fetchPaises();
  }, [Servidor]);

  useEffect(() => {
    if (alert === 1) {
      const timer = setTimeout(() => {
        setAlert(-1);
        onClose()
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreDepartamento.trim() === "") {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (idPais === "") {
      setPaisError(true);
      return;
    } else {
      setPaisError(false);
    }
    if (estadoDepartamento.trim() === "") {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    const estadoNumerico = estadoDepartamento === "activo" ? 1 : 0;

    try {
      const url = `http://${Servidor}/deptoEstados`;
      const data = {
        nombreDeptoEstado: nombreDepartamento.toUpperCase(),
        paisId: idPais,
        estadoDeptoEstado: estadoNumerico,
      };
    
      // Usa apiClient.post en lugar de fetch
      const response = await apiClient.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log("Datos enviados con éxito al servidor backend");
    
      setAlert(response.data.resp);
    
      // console.log("Respuesta del backend código estado:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
    setNombreDepartamento("");
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    if (regex.test(inputValue) || inputValue === "") {
      setNombreDepartamento(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handlePaisChange = (e) => {
    const selectedValue = e.target.value;
    setIdPais(selectedValue);
    setPaisError(selectedValue === "");
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoDepartamento(selectedValue);
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
          label="Nombre del departamento"
          value={nombreDepartamento}
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
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={paisError}>
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
          {paisError && !idPais && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              Por favor, selecciona un país
            </Alert>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={estadoError}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoDepartamento}
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
          Crear Departamento
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
          Departamento creado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un Departamento creado con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
}
