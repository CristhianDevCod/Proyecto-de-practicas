import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

export default function PaisForm({ onClose }) {
  const { Servidor } = Service();
  const [nombrePais, setNombrePais] = useState('');
  const [estadoPais, setEstadoPais] = useState('activo');
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);

  useEffect(() => {
    if (alert === 1) {
      const timer = setTimeout(() => {
        setAlert(-1);
        onClose();  // Cierra el modal automáticamente
      }, 100); // Espera antes de cerrar el modal

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
      const url = `http://${Servidor}/paises`;
      const data = {
        nombrePais: nombrePais.toUpperCase(),
        estadoPais: estadoNumerico,
      };
    
      // Realiza la solicitud POST usando apiClient
      const response = await apiClient.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      // Aquí response.data ya contiene los datos de la respuesta en formato JSON
      // console.log('Datos enviados con éxito al servidor backend');
    
      // Accede directamente a los datos de la respuesta
      const responseData = response.data;
      setAlert(responseData.resp);
      // onAlertChange(responseData.resp);
    
      // console.log('Respuesta del backend:', responseData);
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('Error al enviar los datos:', error);
    }
    
    setNombrePais('');
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
    if (onClose) {
      onClose();  // Cierra el modal
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
          label="Nombre del país"
          value={nombrePais}
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
            <div
              style={{
                color: '#f44336',
                marginTop: '3px',
                marginLeft: '14px',
                fontSize: '0.875rem',
                fontFamily: 'Roboto',
              }}
            >
              Por favor, selecciona el estado
            </div>
          )}
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
        >
          Crear Pais
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: '10px' }}
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
          País creado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un país creado con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
}
