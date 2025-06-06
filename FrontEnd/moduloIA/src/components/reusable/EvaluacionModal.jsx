import { Button, Grid, Input } from '@mui/joy';
import { Alert, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { CampoFecha } from './CampoFecha';
import Swal from 'sweetalert2';
import { IAComponent } from './IAComponent';

const EvaluacionModal = ({ kpiSeleccionado, onClose, onPlanCreated }) => {
    // Determinar si hay datos de plan existentes
    const hasExistingPlan = kpiSeleccionado.accion_inmediata !== null;

    // Flujo: nuevo plan o edit/view
    const [mode, setMode] = useState(hasExistingPlan ? 'view' : 'start');

    // Form State
    // Estado del formulario, inicializar a partir del plan existente si está presente
    const [accionInmediata, setAccionInmediata] = useState(
        hasExistingPlan ? kpiSeleccionado.accion_inmediata : ''
    );
    const [responsableEncargado, setResponsableEncargado] = useState(
        hasExistingPlan ? kpiSeleccionado.persona_asignada_uRed : ''
    );
    const [selectedDate, setSelectedDate] = useState(
        hasExistingPlan ? new Date(kpiSeleccionado.fecha_plazo_maximo) : undefined
    );
    const [sugerenciaIA, setSugerenciaIA] = useState('')

    // Validar la integridad del formulario
    const isFormComplete =
        accionInmediata.trim() !== '' &&
        responsableEncargado.trim() !== '' &&
        selectedDate instanceof Date;


    console.log(kpiSeleccionado)
    // Función para gestionar la aprobación del plan
    const crearPlan = () => {
        console.log('Data que necesito procesar: ');
        console.log('Acción inmediata: ', accionInmediata);
        console.log('responsable: ', responsableEncargado);
        console.log('fecha: ', selectedDate);
        console.log('Indicador objetivo: ', kpiSeleccionado.kpi_id);

        // Simular el éxito o el fracaso
        const success = true;
        if (success) {
            // Mover foco fuera del modal para evitar error aria-hidden
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            // Asegurar que el foco quede en el body
            document.body.focus();
            onPlanCreated(true);
            onClose();
        } else {
            onPlanCreated(false);
        }
        Swal.fire({
            title: success ? 'Operación exitosa' : 'Error',
            text: success ? 'Plan creado correctamente.' : 'No se pudo aprobar el plan.',
            icon: success ? 'success' : 'error',
            confirmButtonColor: '#2196f3',
        });
    };

    // Pantalla de bienvenida cuando no existe ningún plan y no se ha iniciado
    if (mode === 'start') {
        return (
            <Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    minHeight={300}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Typography>
                        Actualmente, este indicador no ha iniciado un plan de ación.
                    </Typography>
                    <Typography>¿Deseas iniciarlo ahora?</Typography>
                    <Button
                        variant="soft"
                        color="success"
                        sx={{ mt: 3 }}
                        size="md"
                        onClick={() => setMode('form')}
                    >
                        Iniciar Plan
                    </Button>
                </Box>
                <Alert severity="info">{`${kpiSeleccionado.cantidad_fallo ? kpiSeleccionado.cantidad_fallo : '1'}/3 Fallos antes del ciclo de mejora`}</Alert>
            </Box>
        );
    }

    // Creación o edición
    if (mode === 'form') {
        return (
            <Grid container direction="column">
                <Typography align="center" variant="h5">
                    Formulario del plan de acción
                </Typography>

                <Box display="flex" justifyContent="space-around">
                    {/* Inputs */}
                    <Grid xs={12} sm={6}>
                        <Box p={2} maxWidth={400}>
                            <Typography mb={1}>Acción inmediata a tomar:</Typography>
                            <textarea
                                rows={4}
                                style={{
                                    minHeight: 80,
                                    // maxHeight: 200,
                                    minWidth: 350,
                                    padding: 10,
                                    border: '2px solid #ddd',
                                    borderRadius: 5,
                                    resize: 'none',
                                    overflow: 'auto',
                                    alignSelf: 'flex-start',
                                }}
                                value={accionInmediata}
                                onChange={(e) => setAccionInmediata(e.target.value)}
                                placeholder="Definir la acción inmediata a tomar"
                            />

                            <Typography mb={1}>Responsable encargado:</Typography>
                            <Input
                                placeholder="Responsable encargado"
                                value={responsableEncargado}
                                onChange={(e) => setResponsableEncargado(e.target.value)}
                                sx={{ mb: 2, border: '1px solid #ddd' }}
                            />

                            <Typography mb={1}>Fecha Límite:</Typography>
                            <CampoFecha
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                        </Box>
                    </Grid>

                    {/* AI Analysis Panel */}
                    <Box
                        xs={12}
                        sm={6}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={1}
                        sx={{ paddingTop: '20px' }}
                    >
                        <IAComponent 
                            titulo="plan de acción" 
                            id_plan_accion={kpiSeleccionado.id_plan_accion}
                            valorCampo={sugerenciaIA}
                            setValorCampo={setSugerenciaIA}
                            estadoIndicador={kpiSeleccionado.estado_id}/>
                    </Box>
                </Box>

                {/* Footer with alert and submit */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Alert severity={hasExistingPlan ? 'warning' : 'info'}>
                        {hasExistingPlan
                            ? `${kpiSeleccionado.planDeAccion.numeroFallo}/3 Fallos antes del ciclo de mejora`
                            : '1/3 Fallos antes del ciclo de mejora'}
                    </Alert>
                    <Button
                        variant="soft"
                        color="success"
                        size="lg"
                        disabled={!isFormComplete}
                        onClick={crearPlan}
                    >
                        Aprobar Plan
                    </Button>
                </Box>
            </Grid>
        );
    }

    // modo edición de un plan existente
    return (
        <Grid container direction="column">
            <Typography align="center" variant="h5">
                Plan de acción
            </Typography>
            <Box display="flex" justifyContent="space-between">
                <Box flexBasis={200} p={2}>
                    <Typography mb={1}>{'Acción correctiva decidida:'}</Typography>
                    <textarea
                        rows={4}
                        style={{
                            height: 200,
                            minWidth: 350,
                            padding: 10,
                            border: '2px solid #ddd',
                            borderRadius: 5,
                            resize: 'none',
                            overflow: 'auto',
                            alignSelf: 'flex-start',
                        }}
                        readOnly
                        value={kpiSeleccionado.accion_inmediata}
                    />
                </Box>

                <Box flexBasis={250} mt={1} display="flex" flexDirection="column" gap={2}>
                    <Box>
                        <Typography mb={1}>Responsable encargado:</Typography>
                        <Input
                            value={kpiSeleccionado.persona_asignada_uRed}
                            readOnly
                            sx={{ border: '1px solid #ddd' }}
                        />
                    </Box>
                    <Box>
                        <Typography mb={1}>Fecha Límite:</Typography>
                        <CampoFecha
                            selectedDate={new Date(kpiSeleccionado.fecha_plazo_maximo)}
                            setSelectedDate={setSelectedDate}
                            isEditable
                        />
                    </Box>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Alert
                    severity={kpiSeleccionado.cantidad_fallo !== 1 ? 'warning' : 'info'}
                >
                    {`${kpiSeleccionado.cantidad_fallo}/3 Fallos antes del ciclo de mejora`}
                </Alert>
                <Button
                    variant="soft"
                    color="warning"
                    size="lg"
                    disabled={!isFormComplete}
                    onClick={() => setMode('form')}
                >
                    Editar
                </Button>
            </Box>
        </Grid>
    );
};

export { EvaluacionModal };
