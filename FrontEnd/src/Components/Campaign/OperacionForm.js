import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ClienteForm from './ClienteForm';
import OperacionInicialForm from './OperacionInicialForm';
import SegmentoForm from './SegmentoForm';
import ServicioForm from './ServicioForm';
import SkillForm from './SkillForm';
import AsignarBasesForm from './AsignarBasesForm';
import FinOperacionPage from './FinOperacionPage';

export default function OperacionForm({ handleComponentSelect }) {

  const [step, setStep] = useState(1);
  const [canalAtencionId, setCanalAtencionId] = useState('');

  const handleCanalAtencionChange = (id) => {
    setCanalAtencionId(id);
  };

  const [clienteData, setClienteData] = useState({
    id: null,
    nombre: '',
    estado: '',
    sector: ''
  });

  const [operacionData, setOperacionData] = useState({
    id: null,
    nombre: '',
    estado: '',
    clienteId: null
  });

  const [segmentoData, setSegmentoData] = useState({
    id: null,
    nombre: '',
    estado: '',
    operacionId: null
  });

  const [servicioData, setServicioData] = useState({
    id: null,
    nombre: '',
    pais: '',
    departamento: '',
    ciudad: '',
    sede: '',
    tipoServicio: '',
    canalAtencion: '',
    recargoNocturno: '',
    recargoDomFest: '',
    estado: '',
    segmentoId: null
  });

  const [skillData, setSkillData] = useState({
    id: null,
    nombre: '',
    sistemaGestion: '',
    fechaInicio: '',
    estado: '',
    servicioId: null,
    skills: [{ nombreSkill: '', idSistemaGestion: '', fechaInicio: null, estadoSkill: 'activo', error: null }]
  });

  const handleClienteSaved = (id, nombre, estado, sector) => {
    setClienteData({
      id: id,
      nombre: nombre,
      estado: estado,
      sector: sector
    });
    setStep(2);
  };

  const handleOperacionSaved = (id, nombre, estado) => {
    setOperacionData({
      id: id,
      nombre: nombre,
      estado: estado,
      clienteId: clienteData.id
    });
    setStep(3);
  };

  const handleSegmentoSaved = (id, nombre, estado) => {
    setSegmentoData({
      id: id,
      nombre: nombre,
      estado: estado,
      operacionId: operacionData.id
    });
    setStep(4);
  };

  const handleServicioSaved = (id, nombre, pais, departamento, ciudad, sede, tipoServicio, canalAtencion, recargoNocturno, recargoDomFest, fechaFinServicio,
    modeloPlaneacion, unidadFactura, facturable, idioma, estado) => {
    setServicioData({
      id: id,
      nombre: nombre,
      pais: pais,
      departamento: departamento,
      ciudad: ciudad,
      sede: sede,
      tipoServicio: tipoServicio,
      canalAtencion: canalAtencion,
      recargoNocturno: recargoNocturno,
      recargoDomFest: recargoDomFest,
      fechaFinServicio: fechaFinServicio,
      modeloPlaneacion: modeloPlaneacion,
      unidadFactura: unidadFactura,
      facturable: facturable,
      idioma: idioma,
      estado: estado,
      segmentoId: segmentoData.id
    });
    setStep(5);
  };

  const handleObjetoSaved = (idObjeto, nombreSkill, estadoSkill, servicioId) => {
    setSkillData({
      id: idObjeto,
      nombre: nombreSkill,
      estado: estadoSkill,
      servicioId: servicioId,
      skills: skillData.skills
    });
    setStep(6);
  };

  const handleBaseSaved = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Home Operaciones')
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  return (
    <Grid container spacing={2}>
      {/* Timeline */}
      <Grid item xs={12} md={4}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={step === 1 ? 'primary' : 'grey'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Paso 1: Cliente</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={step === 2 ? 'primary' : 'grey'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Paso 2: Operación</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={step === 3 ? 'primary' : 'grey'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Paso 3: Segmento</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={step === 4 ? 'primary' : 'grey'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Paso 4: Servicio</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={step === 5 ? 'primary' : 'grey'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Paso 5: Skill</TimelineContent>
          </TimelineItem>
          {canalAtencionId === "Outbound" || canalAtencionId === "OUTBOUND" || canalAtencionId === "outbound" ? (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color={step === 6 ? 'primary' : 'grey'} />
              </TimelineSeparator>
              <TimelineContent>Paso 6: Asignar Bases</TimelineContent>
            </TimelineItem>
          ) : (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color={step === 6 ? 'primary' : 'grey'} />
              </TimelineSeparator>
              <TimelineContent>Paso 6: Fin</TimelineContent>
            </TimelineItem>
          )}
        </Timeline>
      </Grid>
      <Grid item xs={12} md={8}>
        {/* Formulario Cliente */}
        {step === 1 && <ClienteForm
          onClienteSaved={handleClienteSaved}
          handleComponentSelect={handleComponentSelect}
          initialData={clienteData} />}

        {/* Formulario Operación */}
        {step === 2 && <OperacionInicialForm
          clienteId={clienteData.id}
          clienteNombre={clienteData.nombre}
          onOperacionSaved={handleOperacionSaved}
          initialDataOpe={operacionData}
          handleBack={handleBack} />}


        {/* Formulario Segmento */}
        {step === 3 && <SegmentoForm
          operacionId={operacionData.id}
          operacionNombre={operacionData.nombre}
          onSegmentoSaved={handleSegmentoSaved}
          initialDataSeg={segmentoData}
          handleBack={handleBack} />}


        {/* Formulario Servicio */}
        {step === 4 && <ServicioForm
          segmentoId={segmentoData.id}
          segmentoNombre={segmentoData.nombre}
          onCanalAtencionChange={handleCanalAtencionChange}
          onServicioSaved={handleServicioSaved}
          initialDataServ={servicioData}
          handleBack={handleBack} />}


        {/* Formulario Skills */}
        {step === 5 && <SkillForm
          key={`skill-form-${servicioData.id}`}
          handleComponentSelect={handleComponentSelect}
          servicioId={servicioData.id}
          servicioNombre={servicioData.nombre}
          onObjetoSaved={handleObjetoSaved}
          initialDataSkill={skillData || { skills: [] }}
          setSkillData={setSkillData}
          handleBack={handleBack} />}
        {canalAtencionId === "Outbound" || canalAtencionId === "OUTBOUND" || canalAtencionId === "outbound" ? (
          step === 6 && <AsignarBasesForm
            servicioId={servicioData.id}
            servicioNombre={servicioData.nombre}
            onBaseSaved={handleBaseSaved}
          />
        ) : (
          step === 6 && <FinOperacionPage handleComponentSelect={handleComponentSelect}
          />
        )}
      </Grid>
    </Grid>
  );
}
