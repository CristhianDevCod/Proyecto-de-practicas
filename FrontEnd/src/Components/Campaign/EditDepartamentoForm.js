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

export default function EditDepartamentoForm({ selectedDepartamento, departamentoData, handleCloseModalEdit, fetchDepartamentoData }) {
  const { Servidor } = Service();
  const [nombreDepartamento, setNombreDepartamento] = useState('');
  const [estadoDepartamento, setEstadoDepartamento] = useState('');
  const [idPais, setIdPais] = useState('');
  const [idPaisNew, setIdPaisNew] = useState('');
  const [nombrePais, setNombrePais] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [paisesData, setPaisesData] = useState([]);
  const [paisError, setPaisError] = useState(false);
  const [estadoError, setEstadoError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    const fetchPaises = async () => {
      try {

        const response = await apiClient.get(`http://${Servidor}/paisesActivos`);
        
        // console.log("Datos obtenidos con éxito del servidor backend");
  
        setPaisesData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchPaises();
  }, [Servidor]);

  useEffect(() => {
    if (departamentoData && departamentoData.length > 0) {
      const departamento = departamentoData[0];
      setNombreDepartamento(departamento.nombre_depto_estado || '');
      setIdPais(departamento.pais_id || '');
      setNombrePais(departamento.nombre_pais || '');
      setEstadoDepartamento(departamento.estado_depto_estado === 1 ? 'activo' : 'inactivo');
    }
  }, [departamentoData]);

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
    if (nombreDepartamento.trim() === '') {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (estadoDepartamento.trim() === '') {
      setEstadoError(true);
      return;
    } else {
      setEstadoError(false);
    }
    if (!idPaisNew) {
      setPaisError(true);
      return;
    } else {
      setPaisError(false);
    }

    const estadoNumerico = estadoDepartamento === 'activo' ? 1 : 0;

    try {
      const url = `http://${Servidor}/deptoEstados/${selectedDepartamento.id_depto_estado}`;
      const data = {
        nombreDeptoEstado: nombreDepartamento.toUpperCase(),
        paisId: idPaisNew === '' ? idPais : idPaisNew,
        estadoDeptoEstado: estadoNumerico
      };
    
      // Usa apiClient.put en lugar de fetch
      const response = await apiClient.put(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      // El setTimeout es redundante si solo quieres manejar la respuesta
      // Después de verificar que la solicitud fue exitosa
      if (response.ok) {
        // Refetch the departamento data
        fetchDepartamentoData();
      }
  
      // console.log('Datos enviados con éxito al servidor backend');
    
      // La respuesta ya está en response.data
      const responseData = response.data;
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
      setNombreDepartamento(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handlePaisChange = (e) => {
    const selectedValue = e.target.value;
    const selectedPais = paisesData.find(pais => pais.id_pais === selectedValue);
    setIdPaisNew(selectedValue);
    setPaisError(selectedValue === '');
    // console.log("Imprimiendo desde editdepartamentoform: ", selectedValue);
  };

  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoDepartamento(selectedValue);
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
          label="Nombre del Departamento"
          value={nombreDepartamento}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          error={nombreError}
          helperText={nombreError ? 'Campo obligatorio, ingresa solo texto' : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="País Asignado"
          value={nombrePais}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled
        />
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={paisError}>
          <InputLabel id="select-pais-label">Seleccione un nuevo País</InputLabel>
          <Select
            labelId="select-pais-label"
            id="select-pais"
            value={idPaisNew}
            label="Seleccione un nuevo País"
            onChange={handlePaisChange}
          >
            {paisesData.map((pais) => (
              <MenuItem key={pais.id_pais} value={pais.id_pais}>
                {pais.nombre_pais}
              </MenuItem>
            ))}
          </Select>
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
            <div style={{ color: '#f44336', marginTop: '3px', marginLeft: '14px', fontSize: '0.875rem', fontFamily: 'Roboto' }}>
              Por favor, selecciona el estado
            </div>
          )}
        </FormControl>
        <Button variant="contained" type="submit" color='primary' startIcon={<SaveRoundedIcon />} fullWidth>
          Guardar Cambios
        </Button>
        <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ClearRoundedIcon />} onClick={handleBack} color="error" fullWidth >
          Cerrar
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Departamento editado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un departamento con ese nombre!
        </Alert>
      )}
    </Stack>
  );
}
