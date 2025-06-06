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
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

export default function EditDepartamentoForm({ selectedSede, sedeData, handleCloseModalEdit }) {
  const { Servidor } = Service();
  const [nombreSede, setNombreSede] = useState('');
  const [estadoSede, setEstadoSede] = useState('');
  const [idCiudad, setIdCiudad] = useState('');
  const [idCiudadNew, setIdCiudadNew] = useState('');
  const [nombreCiudad, setNombreCiudad] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [ciudadesData, setCiudadesData] = useState([]);
  const [ciudadError, setCiudadError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/ciudadesActivas`);
        const data = await response.data;
        setCiudadesData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchCiudades();
  }, [Servidor]);

  useEffect(() => {
    if (sedeData && sedeData.length > 0) {
      const sede = sedeData[0];
      setNombreSede(sede.nombre_sede || '');
      setIdCiudad(sede.ciudad_id || '');
      setNombreCiudad(sede.nombre_ciudad || '');
      setEstadoSede(sede.estado_sede === 1 ? 'activo' : 'inactivo');
    }
  }, [sedeData]);

  useEffect(() => {
    if (alert === 1) {
      const timer = setTimeout(() => {
        setAlert(-1);
        handleCloseModalEdit();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [alert, handleCloseModalEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreSede.trim() === '') {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (estadoSede.trim() === '') {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    if (!idCiudadNew) {
      setCiudadError(true);
      return;
    } else {
      setCiudadError(false);
    }

    const estadoNumerico = estadoSede === 'activo' ? 1 : 0;

    try {
      const url = `http://${Servidor}/sedes/${selectedSede.id_sede}`;
      const data = {
        nombreSede: nombreSede.toUpperCase(),
        ciudadId: idCiudadNew === '' ? idCiudad : idCiudadNew,
        estadoSede: estadoNumerico
      };

      const response = await apiClient.put(url, data, {
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

  // const handleCiudadChange = (e) => {
  //   const selectedValue = e.target.value;
  //   const selectedPais = ciudadesData.find(pais => pais.id_pais === selectedValue);
  //   setIdCiudadNew(selectedValue);
  //   setNombreCiudadNew(selectedPais ? selectedPais.nombre_pais : '');
  //   setCiudadError(selectedValue === '');
  // };
  const handleCiudadChange = (e) => {
    const selectedValue = e.target.value;
    // const selectedPais = ciudadesData.find(pais => pais.id_pais === selectedValue);
    setIdCiudadNew(selectedValue);
    setCiudadError(selectedValue === '');
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoSede(selectedValue);
    setEstadoError(selectedValue.trim() === '');
  };

  const handleBack = () => {
    handleCloseModalEdit();
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
          helperText={nombreError ? 'Campo obligatorio, ingresa solo texto' : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Ciudad Asignado"
          value={nombreCiudad}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled
        />
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={ciudadError}>
          <InputLabel id="select-ciudad-label">Seleccione una nueva ciudad</InputLabel>
          <Select
            labelId="select-ciudad-label"
            id="select-ciudad"
            value={idCiudadNew}
            label="Seleccione una nueva ciudad"
            onChange={handleCiudadChange}
          >
            {ciudadesData.map((ciudad) => (
              <MenuItem key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                {ciudad.nombre_ciudad}
              </MenuItem>
            ))}
          </Select>
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
        <Button variant="contained" type="submit" startIcon={<SaveRoundedIcon />} fullWidth>
          Guardar Cambios
        </Button>
        <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ClearRoundedIcon />} onClick={handleBack} color="error" fullWidth >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Sede editado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe una sede con ese nombre!
        </Alert>
      )}
    </Stack>
  );
}
