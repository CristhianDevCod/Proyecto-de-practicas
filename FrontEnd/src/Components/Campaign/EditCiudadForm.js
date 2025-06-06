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
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

export default function EditCiudadForm({ ciudadId, ciudadData, onClose }) {
  const { Servidor } = Service();

  const [nombreCiudad, setNombreCiudad] = useState('');
  const [estadoCiudad, setEstadoCiudad] = useState('');
  const [zonaHoraria, setZonaHoraria] = useState('');
  const [idDepartamento, setIdDepartamento] = useState('');
  const [idDepartamentoNew, setIdDepartamentoNew] = useState('');
  const [nombreDepartamento, setNombreDepartamento] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [departamentosData, setDepartamentosData] = useState([]);
  const [departamentoError, setDepartamentoError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [zonaHorariaError, setZonaHorariaError] = useState(false);
  const [alert, setAlert] = useState(-1);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const url = `http://${Servidor}/deptoEstadosActivos`;
        const response = await apiClient.get(url);

        if (response.status !== 200) {
          throw new Error('Error al obtener los datos');
        }

        const data = response.data;
        setDepartamentosData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchDepartamentos();
  }, [Servidor]);

  useEffect(() => {
    if (ciudadData && ciudadData.length > 0) {
      const ciudad = ciudadData[0];
      setNombreCiudad(ciudad.nombre_ciudad || '');
      setZonaHoraria(ciudad.zona_horaria || '');
      setIdDepartamento(ciudad.depto_estado_id || '');
      setNombreDepartamento(ciudad.nombre_depto_estado || '');
      setEstadoCiudad(ciudad.estado_depto_estado === 1 ? 'activo' : 'inactivo');
    }
  }, [ciudadData]);

  useEffect(() => {
    if (alert === 1) {
      const timer = setTimeout(() => {
        setAlert(-1);
        onClose();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreCiudad.trim() === '') {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (zonaHoraria.trim() === '') {
      setZonaHorariaError(true);
      return;
    } else {
      setZonaHorariaError(false);
    }
    if (estadoCiudad.trim() === '') {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    if (!idDepartamentoNew) {
      setDepartamentoError(true);
      return;
    } else {
      setDepartamentoError(false);
    }

    const estadoNumerico = estadoCiudad === 'activo' ? 1 : 0;

    try {
      const url = `http://${Servidor}/ciudades/${ciudadId}`;
      const data = {
        nombreCiudad: nombreCiudad.toUpperCase(),
        zonaHoraria: zonaHoraria,
        deptoEstadoId: idDepartamentoNew === '' ? idDepartamento : idDepartamentoNew,
        estadoCiudad: estadoNumerico
      };

      const response = await apiClient.put(url, data);

      if (response.status !== 200) {
        throw new Error('Error al enviar los datos');
      }

      const responseData = response.data;
      setAlert(responseData.resp);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]*$/;
    if (regex.test(inputValue) || inputValue === '') {
      setNombreCiudad(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handleZonaHorariaChange = (e) => {
    const selectedValue = e.target.value;
    setZonaHoraria(selectedValue);
    setZonaHorariaError(selectedValue === '');
  };

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;
    const selectedDepartamento = departamentosData.find(depto => depto.id_depto_estado === selectedValue);
    setIdDepartamentoNew(selectedValue);
    setNombreDepartamento(selectedDepartamento ? selectedDepartamento.nombre_depto_estado : '');
    setDepartamentoError(selectedValue === '');
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoCiudad(selectedValue);
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
          label="Nombre de la ciudad"
          value={nombreCiudad}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          error={nombreError}
          helperText={nombreError ? 'Campo obligatorio, ingresa solo texto' : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Zona Horaria"
          value={zonaHoraria}
          onChange={handleZonaHorariaChange}
          variant="outlined"
          fullWidth
          error={zonaHorariaError}
          helperText={zonaHorariaError ? 'Campo obligatorio' : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Departamento Asignado"
          value={nombreDepartamento}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled
        />
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={departamentoError}>
          <InputLabel id="select-departamento-label">Seleccione un nuevo departamento</InputLabel>
          <Select
            labelId="select-departamento-label"
            id="select-departamento"
            value={idDepartamentoNew}
            label="Seleccione un nuevo departamento"
            onChange={handleDepartamentoChange}
          >
            {departamentosData.map((departamento) => (
              <MenuItem key={departamento.id_depto_estado} value={departamento.id_depto_estado}>
                {departamento.nombre_depto_estado}
              </MenuItem>
            ))}
          </Select>
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
            <div style={{ color: '#f44336', marginTop: '3px', marginLeft: '14px', fontSize: '0.875rem', fontFamily: 'Roboto' }}>
              Por favor, selecciona el estado
            </div>
          )}
        </FormControl>
        <Button variant="contained" type="submit" startIcon={<SaveRoundedIcon />} fullWidth>
          Guardar Cambios
        </Button>
        <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ClearRoundedIcon />} onClick={handleBack} color="error" fullWidth >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Ciudad editada con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe una ciudad con ese nombre!
        </Alert>
      )}
    </Stack>
  );
}
