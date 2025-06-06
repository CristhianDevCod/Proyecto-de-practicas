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

export default function SedeForm({ onClose }) {
  const { Servidor } = Service();
  const [nombreSede, setNombreSede] = useState('');
  const [estadoSede, setEstadoSede] = useState('activo');
  const [idCiudad, setIdCiudad] = useState('');
  const [ciudadData, setCiudadesData] = useState([]);
  const [nombreError, setNombreError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [ciudadError, setCiudadError] = useState(false);
  const [alert, setAlert] = useState(-1);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/ciudadesActivas`);
        const data = await response.data;
        setCiudadesData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
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
    if (nombreSede.trim() === '') {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (idCiudad === '') {
      setCiudadError(true);
      return;
    } else {
      setCiudadError(false);
    }
    if (estadoSede.trim() === '') {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    const estadoNumerico = estadoSede === 'activo' ? 1 : 0;

    try {
      const url = `http://${Servidor}/sedes`;
      const data = {
        nombreSede: nombreSede.toUpperCase(),
        ciudadId: idCiudad,
        estadoSede: estadoNumerico
      };

      const response = await apiClient.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // console.log('Datos enviados con éxito al servidor backend');

      const responseData = await response.data;
      setAlert(responseData.resp);

      // console.log('Respuesta del backend código estado:', responseData);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }

    setNombreSede('');
    setIdCiudad('');
    setEstadoSede('');
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    if (regex.test(inputValue) || inputValue === '') {
      setNombreSede(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handlePaisChange = (e) => {
    const selectedValue = e.target.value;
    setIdCiudad(selectedValue);
    setCiudadError(selectedValue === '');
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoSede(selectedValue);
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
          label="Nombre de la sede"
          value={nombreSede}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          error={nombreError}
          sx={{ marginBottom: 2 }}
        />
        {nombreError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>Campo obligatorio / Ingrese solo texto</Alert>
        )}
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={ciudadError}>
          <InputLabel id="select-ciudad-label">Seleccione una ciudad</InputLabel>
          <Select
            labelId="select-ciudad-label"
            id="select-ciudad"
            value={idCiudad}
            label="Seleccione una ciudad"
            onChange={handlePaisChange}
            sx={{ marginBottom: 2 }}
          >
            {ciudadData.map((ciudad) => (
              <MenuItem key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                {ciudad.nombre_ciudad}
              </MenuItem>
            ))}
          </Select>
          {ciudadError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>Campo obligatorio / Ingrese solo texto</Alert>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={estadoError}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoSede}
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
        <div>
        </div>
        <Button variant="contained" color='success' type="submit" startIcon={<AddCircleOutlineIcon />} fullWidth>
          Crear Sede
        </Button>
        <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ClearRoundedIcon />} onClick={handleBack} color="error" fullWidth >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Sede creada con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un sede creada con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
}
