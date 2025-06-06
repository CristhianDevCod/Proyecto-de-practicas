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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';


const SkillForm = ({ onAlertChange, servicioId, servicioNombre, onObjetoSaved, initialDataSkill = { skills: [] }, setSkillData, handleBack }) => {
  const { Servidor } = Service();
  const [skills, setSkills] = useState(initialDataSkill.skills || [{ nombreSkill: '', idSistemaGestion: '', fechaInicio: null, estadoSkill: 'activo', error: null }]);
  const [isNewSkill, setIsNewSkill] = useState(true);
  const [sistemasGestionData, setSistemasGestionData] = useState([]);
  // const [setAlert] = useState(-1);
  // const [setError] = useState('');
  const [formError, setFormError] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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
    const fetchSistemasGestion = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/sistemasGestionactivos`);

        const data = await response.data;
        setSistemasGestionData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchSistemasGestion();
  }, [Servidor]);

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;

    if (field === 'fechaInicio') {
      const { fechaInicio } = newSkills[index];
      if (!fechaInicio) {
        newSkills[index].error = 'La fecha de inicio es obligatoria.';
      } else {
        newSkills[index].error = null;
      }
    }

    setSkills(newSkills);
    setSkillData({ ...initialDataSkill, skills: newSkills });
  };

  const handleAddSkill = () => {
    const newSkills = [...skills, { nombreSkill: '', idSistemaGestion: '', fechaInicio: null, estadoSkill: 'activo', error: null }];
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
      if (skill.nombreSkill.trim() === '' || skill.idSistemaGestion === '' || !skill.fechaInicio) {
        setFormError('Todos los campos son obligatorios');
        return;
      }
    }

    // setError(null);
    setOpenConfirmDialog(true);
  };

  const handleConfirmSave = async (e) => {
    e.preventDefault();
    setOpenConfirmDialog(false);

    try {
      let url;
      let method;
      let data;

      if (isNewSkill) {
        url = `http://${Servidor}/objetos`;
        method = 'POST';
        data = skills.map((skill) => ({
          nombreObjeto: skill.nombreSkill.toUpperCase(),
          fechaInicio: skill.fechaInicio.toISOString().split('T')[0],
          sistGestionId: skill.idSistemaGestion,
          estadoSkill: skill.estadoSkill === 'activo' ? 1 : 0,
          servicioId: servicioId,
        }));
      } else {
        url = `http://${Servidor}/objetos/${initialDataSkill.id}`;
        method = 'PUT';
        data = skills.map((skill) => ({
          id: skill.id || initialDataSkill.id,
          nombreObjeto: skill.nombreSkill.toUpperCase(),
          fechaInicio: skill.fechaInicio.toISOString().split('T')[0],
          sistGestionId: skill.idSistemaGestion,
          estadoSkill: skill.estadoSkill === 'activo' ? 1 : 0,
          servicioId: servicioId,
        }));
      }

      const response = await apiClient(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });

      const responseData = await response.data;
      // setAlert(responseData.resp);
      // onAlertChange(responseData.resp);

      if (responseData.resp === 1) {
        const idsObjetosNuevos = responseData.idObjeto;
        onObjetoSaved(idsObjetosNuevos, skills.map((skill) => skill.nombreSkill), skills.map((skill) => skill.estadoSkill));
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleCancelSave = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2} sx={{ maxWidth: 400, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" component="h1" align="left" style={{ marginTop: '10px', marginBottom: '10px' }}>
            {isNewSkill ? 'Crear Skills' : 'Actualizar Skills'}
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
                error={formError && skill.nombreSkill.trim() === ''}
                sx={{ marginBottom: 2 }}
              />
              {formError && !skill.nombreSkill && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>Campo obligatorio</Alert>
              )}
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id={`select-sistemaGestion-label-${index}`}>Seleccione un Sistema de Gestión</InputLabel>
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
                {formError && !skill.idSistemaGestion && (
                  <Alert severity="error" sx={{ marginTop: 2 }}>Campo obligatorio</Alert>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <DatePicker
                  label="Fecha Inicio"
                  value={skill.fechaInicio}
                  onChange={(date) => handleSkillChange(index, 'fechaInicio', date)}
                  inputFormat="YYYY-MM-DD"
                  renderInput={(params) => <TextField {...params} />}
                />
                {formError && !skill.fechaInicio && (
                  <Alert severity="error" sx={{ marginTop: 2 }}>Campo obligatorio</Alert>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id={`select-estadoSkill-label-${index}`}>Seleccione un Estado</InputLabel>
                <Select
                  labelId={`select-estadoSkill-label-${index}`}
                  value={skill.estadoSkill}
                  label="Seleccione un Estado"
                  onChange={(e) => handleSkillChange(index, 'estadoSkill', e.target.value)}
                >
                  <MenuItem value="activo">Activo</MenuItem>
                  <MenuItem value="inactivo">Inactivo</MenuItem>
                </Select>
              </FormControl>
              {index > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveSkill(index)}
                  startIcon={<DeleteIcon />}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                >
                  Eliminar Skill
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddSkill}
            startIcon={<AddCircleOutlineIcon />}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Agregar Skill
          </Button>
          {formError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {formError}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={isNewSkill ? <AddCircleOutlineIcon /> : <UpdateIcon />}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            {isNewSkill ? 'Guardar Skill' : 'Actualizar Skill'}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleBack}
            startIcon={<ArrowBackRoundedIcon />}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Volver
          </Button>
        </form>
        <Dialog
          open={openConfirmDialog}
          onClose={handleCancelSave}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmar Guardado</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              ¿Estás seguro de que deseas guardar los cambios realizados en los skills?
            </Typography>
            <DialogContentText id="alert-dialog-description">
              Puedes editar la información dando Clic en el botón cancelar y devolverte a los anteriores formularios.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelSave} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmSave} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </LocalizationProvider>
  );
};

export default SkillForm;
