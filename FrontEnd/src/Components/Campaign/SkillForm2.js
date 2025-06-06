
import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

const SkillForm = ({ onAlertChange, servicioId, servicioNombre, onObjetoSaved, initialDataSkill = { skills: [] }, setSkillData, handleBack }) => {

  const {Servidor} = Service();
  const [skills, setSkills] = useState(initialDataSkill.skills || [{ nombreSkill: '', idCanalAtencion: '', idSistemaGestion: '', fechaInicio: null, fechaFin: null, estadoSkill: 'activo', error: null }]);
  const [isNewSkill, setIsNewSkill] = useState(true); 
  const [canalesAtencionData, setCanalesAtencionData] = useState([]);
  const [sistemasGestionData, setSistemasGestionData] = useState([]);
  const [alert, setAlert] = useState(-1);
  const [error, setError] = useState('');


  useEffect(() => {
    if (initialDataSkill && initialDataSkill.skills) {
      setSkills(initialDataSkill.skills);
      setIsNewSkill(initialDataSkill.id === null);
    }
  }, [initialDataSkill]);


  useEffect(() => {
    // console.log(`Servicio ID: ${servicioId}, Servicio Nombre: ${servicioNombre}`);
  }, [servicioId, servicioNombre]);

  useEffect(() => {
    const fetchCanalesAtencion = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/canalesAtencion`);
        const data = await response.data;
        setCanalesAtencionData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchCanalesAtencion();
  }, []);

  useEffect(() => {
    const fetchSistemasGestion = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/sistemasGestion`);
        const data = await response.data;
        setSistemasGestionData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchSistemasGestion();
  }, []);


  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;

    if (field === 'fechaInicio' || field === 'fechaFin') {
      const { fechaInicio, fechaFin } = newSkills[index];
      if (fechaInicio && fechaFin && fechaInicio.isAfter(fechaFin)) {
        newSkills[index].error = 'La fecha de fin no puede ser menor que la fecha de inicio.';
      } else {
        newSkills[index].error = null;
      }
    }

    setSkills(newSkills);
    setSkillData({ ...initialDataSkill, skills: newSkills });
  };

  const handleAddSkill = () => {
    const newSkills = [...skills, { nombreSkill: '', idCanalAtencion: '', idSistemaGestion: '', fechaInicio: null, fechaFin: null, estadoSkill: 'activo', error: null }];
    setSkills(newSkills);
    setSkillData({ ...initialDataSkill, skills: newSkills });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
    setSkillData({ ...initialDataSkill, skills: newSkills });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const skill of skills) {
      if (skill.nombreSkill.trim() === '' || skill.idCanalAtencion === '' || skill.idSistemaGestion === '' || !skill.fechaInicio || !skill.fechaFin) {
        setError('Todos los campos son obligatorios');
        return;
      }
     if (skill.fechaInicio.isAfter(skill.fechaFin)) {
        setError('La fecha de inicio no puede ser mayor que la fecha de fin');
        return;
      }
    }

    setError(null);

    try {
      const url = `http://${Servidor}/objetos`;
      const data = skills.map(skill => ({
        nombreObjeto: skill.nombreSkill,
        canalAtencionId: skill.idCanalAtencion,
        fechaInicio: skill.fechaInicio.toISOString().split('T')[0],
        fechaFin: skill.fechaFin.toISOString().split('T')[0],
        sistGestionId: skill.idSistemaGestion,
        estadoSkill: skill.estadoSkill === 'activo' ? 1 : 0,
        servicioId: servicioId
      }));

      const response = await apiClient.post(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      });

      const responseData = await response.data;
      setAlert(responseData.resp);
      onAlertChange(responseData.resp);

      if (responseData.resp === 1) {
        const idObjetoNuevo = responseData.idObjeto;
        onObjetoSaved(idObjetoNuevo, skills.map(skill => skill.nombreSkill), skills.map(skill => skill.estadoSkill));
      }

    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2} sx={{ maxWidth: 400, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" component="h1" align="left" style={{ marginTop: '10px', marginBottom: '10px' }}>
            {isNewSkill ? "Crear Skills" : "Actualizar Skills"}
          </Typography>
          <TextField
            label="Servicio"
            value={servicioNombre}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            disabled
          />
          {skills.map((skill, index) => (
            <div key={index}>
              <TextField
                label="Nombre del skill/cola"
                value={skill.nombreSkill}
                onChange={(e) => handleSkillChange(index, 'nombreSkill', e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id={`select-canalAtencion-label-${index}`}>Seleccione un canal de atención</InputLabel>
                <Select
                  labelId={`select-canalAtencion-label-${index}`}
                  value={skill.idCanalAtencion}
                  label="Seleccione un Canal de Atención"
                  onChange={(e) => handleSkillChange(index, 'idCanalAtencion', e.target.value)}
                >
                  {canalesAtencionData.map((canalAtencion) => (
                    <MenuItem key={canalAtencion.id_canal_atencion} value={canalAtencion.id_canal_atencion}>
                      {canalAtencion.nombre_canal_atencion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id={`select-sistemaGestion-label-${index}`}>Seleccione un sistema de gestión</InputLabel>
                <Select
                  labelId={`select-sistemaGestion-label-${index}`}
                  value={skill.idSistemaGestion}
                  label="Seleccione un Sistema de Gestión"
                  onChange={(e) => handleSkillChange(index, 'idSistemaGestion', e.target.value)}
                >
                  {sistemasGestionData.map((sistemaGestion) => (
                    <MenuItem key={sistemaGestion.id_sist_gestion} value={sistemaGestion.id_sist_gestion}>
                      {`${sistemaGestion.nombre_sist_gestion} - ${sistemaGestion.admin_sist_gestion}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <DatePicker
                  label="Fecha Inicio"
                  value={skill.fechaInicio}
                  onChange={(date) => handleSkillChange(index, 'fechaInicio', date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <DatePicker
                  label="Fecha Fin"
                  value={skill.fechaFin}
                  onChange={(date) => handleSkillChange(index, 'fechaFin', date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id={`estado-select-label-${index}`}>Estado</InputLabel>
                <Select
                  labelId={`estado-select-label-${index}`}
                  value={skill.estadoSkill}
                  label="Estado"
                  onChange={(e) => handleSkillChange(index, 'estadoSkill', e.target.value)}
                >
                  <MenuItem value="activo">Activo</MenuItem>
                  <MenuItem value="inactivo">Inactivo</MenuItem>
                </Select>
              </FormControl>
              {skill.error && <Alert severity="error" sx={{ marginBottom: 3 }}>{skill.error}</Alert>}
              {index > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveSkill(index)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                >
                  Eliminar Skill
                </Button>
              )}
            </div>
          ))}
          <Button variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />} onClick={handleAddSkill} fullWidth sx={{ marginTop: 2 }}>
            Agregar Skill
          </Button>
          <Button variant="contained" type="submit" color="primary" startIcon={isNewSkill ? <AddCircleOutlineIcon /> : <UpdateIcon />} fullWidth sx={{ marginTop: 2 }}>
            {isNewSkill ? "Guardar Skills" : "Actualizar Skills"}
          </Button>
          {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
          <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ArrowBackRoundedIcon />} onClick={handleBack} color="success" fullWidth>
            Volver
          </Button>
        </form>
        {alert === 1 && (
          <Alert severity="success" onClose={() => setAlert(-1)}>
            skill creado con éxito
          </Alert>
        )}
        {alert === 0 && (
          <Alert severity="error" onClose={() => setAlert(-1)}>
            ¡Ya existe un skill creado con ese mismo nombre!
          </Alert>
        )}
      </Stack>
    </LocalizationProvider>
  );

};

export default SkillForm;

