import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Button, Textarea } from '@mui/joy';
import { useMemo, useState } from 'react';
import { CampoFecha } from '../CampoFecha';
import { Alert, Grid, Snackbar, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { IAComponent } from '../IAComponent';

const steps = ['Definición del Hallazgo', 'Análisis de Causa', 'Ejecución del Plan'];
const MIN_CHARACTERS = 10;

const FormularioSNC = ({onClose}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Campos del formulairo
    // Parte 1
    const [fechaHallazgo, setFechaHallazgo] = useState(new Date());
    const [personaDetectoProblema, setPersonaDetectoProblema] = useState('');
    const [procesoHallazgo, setProcesoHallazgo] = useState('');
    const [interaccionCliente, setInteraccionCliente] = useState('');
    const [descripcionHallazgo, setDescripcionHallazgo] = useState('');

    // Parte 2
    const [accionInmediata, setAccionInmediata] = useState('');
    const [analisisCausaRaiz, setAnalisisCausaRaiz] = useState('');
    const [personaAutoriza, setPersonaAutoriza] = useState('');

    // Parte 3
    const [planAccion, setPlanAcciion] = useState('');
    const [responsableAccion, setResponsableAccion] = useState('');
    const [plazoMaximo, setPlazoMaximo] = useState(new Date());

    // Validación por paso
    const isStepValid = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    procesoHallazgo.trim().length > 0 &&
                    personaDetectoProblema.trim().length > 0 &&
                    interaccionCliente.trim().length > 0 &&
                    descripcionHallazgo.trim().length >= MIN_CHARACTERS
                );
            case 1:
                return (
                    accionInmediata.trim().length > 0 &&
                    analisisCausaRaiz.trim().length > 0 &&
                    personaAutoriza.trim().length > 0
                );
            case 2:
                return (
                    planAccion.trim().length > 0 &&
                    responsableAccion.trim().length > 0 &&
                    plazoMaximo instanceof Date
                );
            default:
                return false;
        }
    }, [
        activeStep,
        procesoHallazgo,
        personaDetectoProblema,
        interaccionCliente,
        descripcionHallazgo,
        accionInmediata,
        analisisCausaRaiz,
        personaAutoriza,
        planAccion,
        responsableAccion,
        plazoMaximo,
    ]);

    const handleNext = () => setActiveStep((s) => s + 1);
    const handleBack = () => setActiveStep((s) => s - 1);
    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    // Simular envío de datos a BBDD
    const enviarBBdd = async () => {
        setLoading(true);
        try {
            const payload = {
                fechaHallazgo,
                personaDetectoProblema,
                procesoHallazgo,
                interaccionCliente,
                descripcionHallazgo,
                accionInmediata,
                analisisCausaRaiz,
                personaAutoriza,
                planAccion,
                responsableAccion,
                plazoMaximo,
            };
            console.log('Enviando payload a BBDD: ', payload);
            // Simular espera de API
            await new Promise((res) => setTimeout(res, 1500));
            setSnackbar({ open: true, message: 'Datos enviados con éxito', severity: 'success' });
            setActiveStep(0); //optional: resetear formulario
        } catch (error) {
            console.log(error);
            setSnackbar({ open: true, message: 'Error al enviar datos', severity: 'error' });
        } finally {
            onClose()
            setLoading(false);
        }
    };

    const hasMetMinCharacters = descripcionHallazgo.trim().length >= MIN_CHARACTERS;

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{m:4}}>
                {activeStep === 0 && (
                    // Paso 1
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Box display={'flex'} alignItems={'center'} sx={{ my: 5 }}>
                            <Box
                                display={'flex'}
                                flexWrap={'wrap'}
                                alignItems={'center'}
                                justifyContent={'space-around'}
                            >
                                <div>
                                    <Typography>Fecha de indentificación</Typography>
                                    <CampoFecha
                                        selectedDate={fechaHallazgo}
                                        setSelectedDate={setFechaHallazgo}
                                    />
                                </div>
                                <TextField
                                    placeholder="Donde se identifico"
                                    label="Nombre del proceso"
                                    variant="outlined"
                                    value={procesoHallazgo}
                                    onChange={(e) => setProcesoHallazgo(e.target.value)}
                                />

                                <TextField
                                    label="Quien detecto el problema"
                                    placeholder="Nombre persona"
                                    variant="outlined"
                                    value={personaDetectoProblema}
                                    onChange={(e) => setPersonaDetectoProblema(e.target.value)}
                                />

                                <TextField
                                    label="Criterio de clasificación"
                                    placeholder="Interacción con el cliente"
                                    variant="outlined"
                                    value={interaccionCliente}
                                    onChange={(e) => setInteraccionCliente(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <Box sx={{ minWidth: 300 }}>
                                    <Textarea
                                        placeholder="Type in here…"
                                        label="Your text"
                                        variant="outlined"
                                        value={descripcionHallazgo}
                                        onChange={(event) =>
                                            setDescripcionHallazgo(event.target.value)
                                        }
                                        minRows={2}
                                        maxRows={6}
                                        size="lg"
                                        endDecorator={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 8,
                                                }}
                                            >
                                                {hasMetMinCharacters ? (
                                                    <CheckIcon color="success" />
                                                ) : (
                                                    <Typography
                                                        level="body-xs"
                                                        color="danger"
                                                        fontSize={12}
                                                    >
                                                        {`${MIN_CHARACTERS} caracteres minimos`}
                                                    </Typography>
                                                )}
                                                <Typography
                                                    level="body-xs"
                                                    sx={{ ml: 'auto' }}
                                                    fontSize={12}
                                                >
                                                    {`${descripcionHallazgo.length} characteres`}
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{
                                            minWidth: 350,
                                            '& .Mui-focused': {
                                                label: {
                                                    transform: 'translateY(-1.5em)',
                                                    fontSize: '0.75em',
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                )}

                {activeStep === 1 && (
                    // Paso 2
                    <>
                        <Box display={'flex'} justifyContent={'space-between'} mb={3}>
                            <IAComponent
                                valorCampo={accionInmediata}
                                setValorCampo={setAccionInmediata}
                                titulo="Acción inmediata"
                            />
                            <IAComponent
                                valorCampo={analisisCausaRaiz}
                                setValorCampo={setAnalisisCausaRaiz}
                                titulo="Causa Raiz"
                            />
                        </Box>
                        <TextField
                            label="¿Quien autoriza?"
                            placeholder="Nombre persona"
                            variant="outlined"
                            value={personaAutoriza}
                            onChange={(e) => setPersonaAutoriza(e.target.value)}
                        />
                    </>
                )}

                {activeStep === 2 && (
                    // Paso 3
                    <>
                        <Box display={'flex'} justifyContent={'space-around'}>
                            <IAComponent
                                titulo="plan de acción"
                                valorCampo={planAccion}
                                setValorCampo={setPlanAcciion}
                            />
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'space-around'}
                            >
                                <TextField
                                    label="Responsable del plan de acción"
                                    placeholder="Nombre persona"
                                    variant="outlined"
                                    value={responsableAccion}
                                    onChange={(e) => setResponsableAccion(e.target.value)}
                                />
                                <Typography style={{ marginBottom: '-25px' }}>
                                    {'Plazo máximo'}
                                </Typography>
                                <CampoFecha
                                    selectedDate={plazoMaximo}
                                    setSelectedDate={setPlazoMaximo}
                                />
                            </Box>
                        </Box>
                    </>
                )}
            </Box>

            {/* Botones de navegacion */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    color="primary"
                    size="lg"
                    variant="soft"
                >
                    Atrás
                </Button>

                <Button
                    onClick={activeStep === steps.length - 1 ? enviarBBdd : handleNext}
                    disabled={!isStepValid || loading}
                    variant="soft"
                    size="lg"
                    color="success"
                >
                    {loading ? 'procesando...' : activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
            </Box>

            {/* sackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical:'bottom', horizontal: 'center'}}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{width:'100%'}}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
        </Box>
    );
};

export { FormularioSNC };
