
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

const OperacionInicialForm = ({ onAlertChange, clienteId, clienteNombre, onOperacionSaved, initialDataOpe, handleBack, idNewOperacionClienteFormPopPup, onClose}) => {
  const {Servidor} = Service();
  const [isNewOpe, setIsNewOpe] = useState(true); 
  const [nombreOperacion, setNombreOperacion] = useState(initialDataOpe.nombre);
  const [estadoOperacion, setEstadoOperacion] = useState(initialDataOpe.estado || 'activo');
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    setNombreOperacion(initialDataOpe.nombre);
    setEstadoOperacion(initialDataOpe.estado || 'activo');
    setIsNewOpe(initialDataOpe.id === null);
  }, [initialDataOpe]);

  useEffect(() => {
    // console.log(`Cliente ID: ${clienteId}, Cliente Nombre: ${clienteNombre}`);
  }, [clienteId, clienteNombre]);

  const handleNombreOperacionChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    if (regex.test(inputValue)) {
      setNombreOperacion(inputValue);
      setNombreError(false);
    } else {
      setNombreError("No se aceptan caracteres especiales");
    }
  };  

  const handleEstadoOperacionChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoOperacion(selectedValue);
    setEstadoError(selectedValue.trim() === '');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar que el nombre no esté vacío
    if (!nombreOperacion.trim()) {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
  
    // Validar que el estado no esté vacío
    if (!estadoOperacion.trim()) {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
  
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    if (!regex.test(nombreOperacion)) {
      setNombreError(true);
      return;
    }
  
    const estadoNumerico = estadoOperacion === "activo" ? 1 : 0;
  
    try {
      const url = isNewOpe
        ? `http://${Servidor}/operacion`
        : `http://${Servidor}/operacion/${initialDataOpe.id}`;
      const method = isNewOpe ? "POST" : "PUT";
      const data = {
        nombreOperacion: nombreOperacion.toUpperCase(),
        clienteId: clienteId,
        estadoOperacion: estadoNumerico,
      };
  
      const response = await apiClient(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
  
      const responseData = await response.data;
      setAlert(responseData.resp);
  
      if (responseData.resp === 1) {
        const idOperacionNueva = responseData.idOperacion;
        onOperacionSaved(idOperacionNueva, nombreOperacion, estadoOperacion);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: 400, margin: '0 auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1" align="left" style={{ marginTop: "10px", marginBottom: "10px" }}>
          {isNewOpe ? "Crear Operación" : "Actualizar Operación"}
        </Typography>
        <TextField
          label="Cliente"
          value={clienteNombre}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled
        />
        <TextField
          label="Nombre de la operación"
          value={nombreOperacion}
          onChange={handleNombreOperacionChange}
          variant="outlined"
          fullWidth
          helperText={nombreError}
          sx={{ marginBottom: 2 }}
        />
        {nombreError &&  (
          <Alert severity="error" sx={{ marginBottom:2 }}>Campo obligatorio / Ingrese solo texto</Alert>
        )}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoOperacion}
            label="Estado"
            onChange={handleEstadoOperacionChange}
            sx={{ marginBottom:2 }}
          >
            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
          {estadoError &&  (
            <Alert severity="error" sx={{ marginBottom:2 }}>Campo obligatorio / Ingrese solo texto</Alert>
          )}
        </FormControl>
        <Button variant="contained" type="submit" startIcon={isNewOpe ? <AddCircleOutlineIcon /> : <UpdateIcon />} fullWidth>
          {isNewOpe ? "Crear Operación" : "Actualizar Operación"}
        </Button>
        {!idNewOperacionClienteFormPopPup
        ?
          <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ArrowBackRoundedIcon />} onClick={handleBack} color="success" fullWidth >
          Volver
          </Button>
        :
          <Button variant="contained" style={{ marginTop: '10px' }} onClick={onClose} color="error" fullWidth >
            Cancelar
          </Button>
        }
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Operación creada con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe una operación creada con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
};

export default OperacionInicialForm;
