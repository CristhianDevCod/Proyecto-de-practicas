import IconCircleArrow from '../Assets/IconCircleArrow';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import IconBot from '../Assets/IconBot';
import { Box, TextField } from '@mui/material';
import { Button } from '@mui/joy';
import { Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Constantes para mejorar la legibilidad
const CLASIFICACIONES = {
  1: 'norma',
  2: 'cliente',
  3: 'negocio',
};

const PROCESOS_KPI = {
  1: 'PCRC',
  2: 'PCA',
  3: 'Administrativo',
};

const TIPOS_CALCULO = {
  1: 'ascendente',
  2: 'descendente',
};

const IAComponent = ({
  titulo = 'sin titulo',
  id_plan_accion,
  valorCampo,
  setValorCampo,
}) => {
  const [kpiData, setKpiData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState(null);
  const currentAnalysisRef = useRef(null);

  // Función para obtener datos de la API - memoizada
  const obtenerDatosAPI = useCallback(async (id_plan_accion) => {
    if (!id_plan_accion) {
      throw new Error('ID del plan de acción es requerido');
    }

    setCurrentStep('Obteniendo datos del indicador...');
    setError(null);

    const response = await fetch('http://localhost:3001/API/GET-DATA-KPI-PLANACCION/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_plan_accion }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (!data?.data) {
      throw new Error('Respuesta de API inválida: no se encontraron datos');
    }

    return data.data;
  }, []);

  // Función para generar el plan de acción - memoizada
  const generarPlanAccion = useCallback(async (behavior, message) => {
    if (!message?.trim()) {
      throw new Error('Mensaje para generar plan de acción es requerido');
    }

    setCurrentStep('Generando análisis con IA...');

    const response = await fetch('http://localhost:3001/API/PLAN-ACCION-GROQ/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ behavior, message }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Error desconocido al generar plan de acción');
    }

    return data.response;
  }, []);

  // Función para generar el mensaje de IA - memoizada
  const generarMensajeIA = useCallback((data) => {
    if (!data) return '';

    return `
Nombre: ${data.nombre_kpi || 'No especificado'}
Descripción: ${data.descripcion_kpi || 'No especificada'}
Clasificación: ${CLASIFICACIONES[data.clasificacion_id] || 'No especificada'}
¿Aplica para personas?: ${data.aplica_personas_int === 1 ? 'Si aplica' : 'No aplica'}
Fórmula de medición: ${data.formula_medicion || 'No especificada'}
Proceso del indicador: ${PROCESOS_KPI[data.proceso_kpi_id] || 'No especificado'}
Tipo de cálculo: ${TIPOS_CALCULO[data.tipo_calculo_int] || 'No especificado'}
`.trim();
  }, []);

  // Función principal: primero obtengo datos, luego genero el análisis
  const manejarClickGenerar = useCallback(async () => {
    if (isGenerating) return;

    setError(null);
    setIsGenerating(true);
    const executionId = Date.now();
    currentAnalysisRef.current = executionId;

    try {
      // 1) Obtener datos del KPI
      const datosObtenidos = await obtenerDatosAPI(id_plan_accion);
      setKpiData(datosObtenidos);

      // 2) Generar mensaje y llamara IA
      if (currentAnalysisRef.current !== executionId) return; // si fue cancelado
      const mensajeIA = generarMensajeIA(datosObtenidos);

      const resultadoIA = await generarPlanAccion('plan_accion', mensajeIA);

      if (currentAnalysisRef.current !== executionId) return; // si fue cancelado
      setValorCampo(resultadoIA);
      setCurrentStep('Análisis completado exitosamente');
    } catch (err) {
      if (currentAnalysisRef.current === executionId) {
        setError(err.message);
        setValorCampo(`Error: ${err.message}\n\nNo se pudo completar el análisis.`);
      }
    } finally {
      if (currentAnalysisRef.current === executionId) {
        setIsGenerating(false);
        setTimeout(() => {
          if (currentAnalysisRef.current === executionId) {
            setCurrentStep('');
          }
        }, 3000);
      }
    }
  }, [
    id_plan_accion,
    isGenerating,
    obtenerDatosAPI,
    generarMensajeIA,
    generarPlanAccion,
    setValorCampo,
  ]);

  // Limpiar análisis al desmontar
  useEffect(() => {
    return () => {
      currentAnalysisRef.current = null;
    };
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" alignSelf="flex-start">
        <IconBot />
        <Typography ml={1}>Análisis inteligente de {titulo}</Typography>
      </Box>

      <Box
        sx={{
          height: '250px',
          width: '70%',
          maxWidth: '500px',
          minWidth: '470px',
          overflow: 'auto',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          padding: 2,
          border: '2px solid #ddd',
          borderRadius: 1,
          alignSelf: 'flex-end',
          opacity: isGenerating ? 0.7 : 1,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}
      >
        {isGenerating ? (
          <Typography>{currentStep}</Typography>
        ) : (
          // Aquí reemplazamos ReactMarkdown por un TextField editable
          <TextField
            multiline
            fullWidth
            rows={12}
            variant="outlined"
            value={valorCampo}
            onChange={(e) => setValorCampo(e.target.value)}
            disabled={isGenerating}
          />
        )}
      </Box>

      <Box display="flex" gap={2} marginTop={1} alignSelf="flex-start">
        <Button
          onClick={manejarClickGenerar}
          startDecorator={<IconCircleArrow />}
          disabled={isGenerating}
          loading={isGenerating}
        >
          {isGenerating ? 'Generando...' : 'Generar nuevo'}
        </Button>

        <Button
          color="success"
          onClick={() => {
            /* cambiar modelo */
          }}
          endDecorator={<PsychologyRoundedIcon />}
          disabled={isGenerating}
        >
          Cambiar modelo
        </Button>
      </Box>
    </Box>
  );
};


export { IAComponent };
