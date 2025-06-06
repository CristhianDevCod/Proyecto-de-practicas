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

const SegmentoForm = ({ onAlertChange, operacionId, operacionNombre, onSegmentoSaved, initialDataSeg, handleBack }) => {
  const {Servidor} = Service();
  const [isNewSeg, setIsNewSeg] = useState(true); 
  const [nombreSegmento, setNombreSegemento] = useState(initialDataSeg.nombre);
  const [estadoSegmento, setEstadoSegemento] = useState(initialDataSeg.estado || 'activo');
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    setNombreSegemento(initialDataSeg.nombre);
    setEstadoSegemento(initialDataSeg.estado || 'activo');
    setIsNewSeg(initialDataSeg.id === null);
  }, [initialDataSeg]);

  useEffect(() => {
    // console.log(`Operación ID: ${operacionId}, Operación Nombre: ${operacionNombre}`);
  }, [operacionId, operacionNombre]);


  const handleNombreSegmentoChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    if (regex.test(inputValue) || inputValue === '') {
      setNombreSegemento(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };  

  const handleEstadoSegmentoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoSegemento(selectedValue);
    setEstadoError(selectedValue.trim() === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar que el nombre no esté vacío
    if (!nombreSegmento.trim()) {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
  
    // Validar que el estado no esté vacío
    if (!estadoSegmento.trim()) {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
  
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    if (!regex.test(nombreSegmento)) {
      setNombreError(true);
      return;
    }
  
    const estadoNumerico = estadoSegmento === "activo" ? 1 : 0;
  
    try {
      const url = isNewSeg
        ? `http://${Servidor}/segmentos`
        : `http://${Servidor}/segmentos/${initialDataSeg.id}`;
      const method = isNewSeg ? "POST" : "PUT";
      const data = {
        nombreSegmento: nombreSegmento.toUpperCase(),
        operacionId: operacionId,
        estadoSegmento: estadoNumerico,
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
        const idSegmentoNuevo = responseData.idSegmento;
        onSegmentoSaved(idSegmentoNuevo, nombreSegmento, estadoSegmento);
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
        <Typography variant="h5" component="h1" align="left" style={{marginTop:"10px", marginBottom: "10px"}}>
          {isNewSeg ? "Crear Segmento" : "Actualizar Segmento"}
        </Typography>
        <TextField
          label="Operación"
          value={operacionNombre}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled
        />
        <TextField
          label="Nombre del segmento"
          value={nombreSegmento}
          onChange={handleNombreSegmentoChange}
          variant="outlined"
          fullWidth
          helperText={nombreError}
          sx={{ marginBottom: 2 }}
        />
        {nombreError &&  (
          <Alert severity="error" sx={{ marginBottom:2 }}>Campo obligatorio / Ingrese solo texto</Alert>
        )}
        <FormControl fullWidth sx={{ marginBottom: 3 }} >
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoSegmento}
            label="Estado"
            onChange={handleEstadoSegmentoChange}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
          {estadoError &&  (
            <Alert severity="error" sx={{ marginBottom:2 }}>Campo obligatorio</Alert>
          )}
        </FormControl>
        <Button variant="contained" type="submit" startIcon={isNewSeg ? <AddCircleOutlineIcon /> : <UpdateIcon />} fullWidth>
          {isNewSeg ? "Crear Segmento" : "Actualizar Segmento"}
        </Button>
        <Button variant="contained" style={{marginTop: '10px'}} startIcon={<ArrowBackRoundedIcon />} onClick={handleBack} color="success" fullWidth >
          Volver
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Segmento creado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe una segmento creada con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
};

export default SegmentoForm;
