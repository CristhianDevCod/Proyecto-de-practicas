import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import Service from '../../Machine/Service'
import apiClient from '../../Service/Service';

const EditRolForm = ({ paisId, paisData, onClose }) => {

  const{Servidor} = Service();
  const [nombrePais, setNombrePais] = useState('');
  const [estadoPais, setEstadoPais] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {

    if (paisData && paisData.length > 0) {
      const pais = paisData[0];
      setNombrePais(pais.nombre_pais || '');
      setEstadoPais(pais.estado_pais === 1 ? 'activo' : 'inactivo');
    }
  }, [paisData]);

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
    if (nombrePais.trim() === '') {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (estadoPais.trim() === '') {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    const estadoNumerico = estadoPais === 'activo' ? 1 : 0;
  
    try {
      const url = `http://${Servidor}/paises/${paisId}`;
      const data = {
        nombrePais: nombrePais.toUpperCase(),
        estadoPais: estadoNumerico
      };
    
      // Realiza la solicitud PUT usando apiClient
      const response = await apiClient.put(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      // Aquí response.data ya contiene los datos de la respuesta en formato JSON
      // console.log('Datos enviados con éxito al servidor backend');
    
      // Accede directamente a los datos de la respuesta
      const responseData = response.data;
      setAlert(responseData.resp);
    
      // console.log('Respuesta del backend:', responseData);
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    if (regex.test(inputValue) || inputValue === '') {
      setNombrePais(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoPais(selectedValue);
    setEstadoError(selectedValue.trim() === '');
  };

  const handleBack = () => {
    if(onClose){
      onClose();
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: 400, margin: '0 auto' }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del pais"
          value={nombrePais}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          error={nombreError}
          helperText={nombreError ? 'Campo obligatorio, ingresa solo texto' : ''}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={estadoError}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoPais}
            label="Estado"
            onChange={handleEstadoChange}
          >
            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
          {estadoError && (
            <div style={{ color: '#f44336', marginTop: '3px', marginLeft: '14px', fontSize: '0.875rem', fontFamily: 'Roboto' }}>
              Por favor, selecciona el estado
            </div>
          )}
        </FormControl>
        <Button variant="contained" type="submit" startIcon={<SaveRoundedIcon />} fullWidth>
          Guardar Cambios
        </Button>
        <Button variant="contained" style={{marginTop: '10px'}} startIcon={<ClearRoundedIcon />} onClick={handleBack} color="error" fullWidth >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Pais editado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un pais con ese nombre!
        </Alert>
      )}
    </Stack>
  );
}

export default  EditRolForm;
