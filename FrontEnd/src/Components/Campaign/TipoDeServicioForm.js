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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

export default function TipoDeServicioForm({ onClose }) {

  const { Servidor } = Service();

  const [nombreTipoDeServicio, setNombreTipoDeServicio] = useState('');
  const [estadoTipoDeServicio, setEstadoTipoDeServicio] = useState('activo');
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    if (alert === 1) {
      const timer = setTimeout(() => {
        setAlert(-1);
        // onAlertChange(-1);
        onClose()
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreTipoDeServicio.trim() === '') {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (estadoTipoDeServicio.trim() === '') {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    const estadoNumerico = estadoTipoDeServicio === 'activo' ? 1 : 0;

    try {
      const url = `http://${Servidor}/tipoServicios`;
      const data = {
        nombreTipoServicio: nombreTipoDeServicio.toUpperCase(),
        estadoTipoServicio: estadoNumerico
      };

      const response = await apiClient.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // console.log('Datos enviados con éxito al servidor backend');

      const responseData = await response.data;
      setAlert(responseData.resp);
      // onAlertChange(responseData.resp);

      // console.log('Respuesta del backend código estado:', responseData);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }

    setNombreTipoDeServicio('');
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    if (regex.test(inputValue) || inputValue === '') {
      setNombreTipoDeServicio(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoTipoDeServicio(selectedValue);
    setEstadoError(selectedValue.trim() === '');
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
      sx={{ maxWidth: 400, margin: '0 auto' }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Tipo de Servicio"
          value={nombreTipoDeServicio}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          error={nombreError}
          sx={{ marginBottom: 2 }}
        />
        {nombreError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>Campo obligatorio / Ingrese solo texto</Alert>
        )}
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={estadoError}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoTipoDeServicio}
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
        <Button variant="contained" type="submit" color='success' startIcon={<AddCircleOutlineIcon />} fullWidth>
          Crear Tipo de Servicio
        </Button>
        <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ClearRoundedIcon />} onClick={handleBack} color="error" fullWidth >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Tipo de Servicio creado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un tipo de servicio con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
}
