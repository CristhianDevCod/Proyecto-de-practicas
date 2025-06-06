import { React, Modal, notification, useState, useEffect } from '../../Exports-Modules/Exports';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    Divider

} from '@mui/material';
import { Input } from 'antd';
import Config from '../../Auth/Config';
import './Styles/StylesNotification.css';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';
const { TextArea } = Input;
const DetailsNotification = ({ openModal, handleCancelProfile, selectedNotification, handleRejectNotification, acceptChangeMessage, Mensaje_Recibe, handleMensajeRecibe, handleAcceptChangeMessage, handleAcceptChangeMessageSupervisor, acceptChangeSupervisor, handleRejectNotificationSupervisor1a1, handleRejectNotificationSupervisor, rejectErrorChangeSupervisor, AutoRejectChangeMessageSupervisorDayRest, toggleDrawer }) => {
    const { Servidor } = Service();
    const { changesShifts, changesShiftsDayRest } = Config();
    const [api, contextHolder] = notification.useNotification();
    const [userChangeList, setUserListChange] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubtmitChange = async () => {
        const Documento1 = selectedNotification.Documento_Envia;
        const Documento2 = selectedNotification.Documento_Recibe;
        const Fecha = selectedNotification.Dia_Trabajo_Actual;
        try {
            await apiClient.put(changesShifts, { Documento1, Documento2, Fecha })
                .then(({ data }) => {
                    api.success({
                        message: `${data.message}`,
                        duration: 15
                    });
                    acceptChangeSupervisor(selectedNotification);
                })
                .catch(({ response }) => {
                    api.error({
                        message: `${response.data.error}`,
                        duration: 15
                    });
                    rejectErrorChangeSupervisor(selectedNotification)
                });
        } catch (error) {
            console.log(error);
        }
    };


    //evento para el cambio día de descanso
    const onSubtmitChangeDayRest = async () => {
        try {
            const Documento1 = selectedNotification.Documento_Envia;
            const Documento2 = selectedNotification.Documento_Recibe;
            const FechaInicio = selectedNotification.Dia_Descanso_Actual;
            const FechaFin = selectedNotification.Dia_Descanso_Futuro;

            await apiClient.put(changesShiftsDayRest, { Documento1, Documento2, FechaInicio, FechaFin })
                .then(({ data }) => {
                    api.success({
                        message: `${data.data}`,
                        duration: 15
                    });
                    handleAcceptChangeMessageSupervisor(selectedNotification);
                })
                .catch(({ response }) => {
                    api.error({
                        message: `${response.data.error}, por lo tanto este cambio será rechazado`,
                        duration: 15
                    });
                    AutoRejectChangeMessageSupervisorDayRest(selectedNotification);
                });
        } catch (error) {
            api.error({
                message: `${error.response.data}`,
            });
        }
    };



    //OBTIENE LOS TURNOS DE LOS ASESORES PARA MOSTRARSE LO A LOS SUPER 
    useEffect(() => {
        const getListChanges = async () => {
            setLoading(true);
            if (openModal && selectedNotification) {
                const Fecha_envio = selectedNotification.Dia_Trabajo_Actual;
                const Documento_Envia = selectedNotification.Documento_Envia;
                const Documento_Recibe = selectedNotification.Documento_Recibe;
                try {
                    const changeDetailsPromises = [
                        apiClient.get(`http://${Servidor}/API/GET-SHIFT-ADVISERS/${Documento_Envia}/${Fecha_envio}`),
                        apiClient.get(`http://${Servidor}/API/GET-SHIFT-ADVISERS/${Documento_Recibe}/${Fecha_envio}`),
                    ];
                    const changeDetailsResponses = await Promise.allSettled(changeDetailsPromises);
                    const successfulResponses = changeDetailsResponses
                        .filter((response) => response.status === 'fulfilled')
                        .map((response) => response.value.data);
                    setLoading(false);
                    setUserListChange(successfulResponses);
                } catch (error) {
                    setLoading(false);
                    console.error('Error al obtener la lista de cambios', error);
                }
            }
        };

        getListChanges();
    }, [openModal, selectedNotification, Servidor]);


    const esSupervisor2 = selectedNotification?.esSupervisor;
    const esSupervisor = selectedNotification?.Respuesta_Recibe === 'Aceptado';

    return (
        <>
            {contextHolder}
            <Modal width={600} open={openModal} footer={null} onCancel={handleCancelProfile}>

                {selectedNotification && selectedNotification.Tipo_Cambio === 'Día descanso' ? (
                    <>
                        <Box
                            p={3}
                            sx={{
                                position: 'relative',
                                maxWidth: 600,
                                margin: '0 auto',
                                borderRadius: 3,
                                height: 'auto',
                            }}
                        >

                            <Box textAlign="center" mb={2}>
                                <Typography
                                    variant="h5"
                                    fontWeight="600"
                                    mt={2}
                                    sx={{ fontFamily: 'Nunito' }}
                                >
                                    Solicitud de Cambio de Día de Descanso
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                {/* Detalles del Cambio y Tipo de Cambio */}
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Detalles del cambio
                                            </Typography>
                                            {selectedNotification && (
                                                <>
                                                    <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                        Día descanso actual: {selectedNotification.Dia_Descanso_Actual}
                                                    </Typography>
                                                    <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                        Día descanso futuro: {selectedNotification.Dia_Descanso_Futuro}
                                                    </Typography>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Tipo de cambio
                                            </Typography>
                                            {selectedNotification && (
                                                <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                    {selectedNotification.Tipo_Cambio}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Información del Asesor */}
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Asesor (Envia)
                                            </Typography>
                                            {selectedNotification && (
                                                <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                    {selectedNotification.Nombre_Completo_Envia}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Asesor (Recibe)
                                            </Typography>
                                            {selectedNotification && (
                                                <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                    {selectedNotification.Nombre_Completo_Recibe}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Divider Line */}
                            <Box my={3} sx={{ borderBottom: '1px dashed #ccc', width: '100%' }} />

                            {/* Motivo de Envío */}
                            {selectedNotification && selectedNotification.Mensaje_Envia && (
                                <Box mt={3}>
                                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Motivo de envío
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                mt={1}
                                                sx={{ fontFamily: 'Nunito' }}
                                            >
                                                {selectedNotification.Mensaje_Envia}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}

                            {/* Motivo de Recibido */}
                            {(esSupervisor || esSupervisor2) && (
                                <Box mt={3}>
                                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Motivo de recibido
                                            </Typography>
                                            {selectedNotification && (
                                                <Typography
                                                    variant="body1"
                                                    mt={1}
                                                    sx={{ fontFamily: 'Nunito' }}
                                                >
                                                    {selectedNotification.Mensaje_Recibe}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}

                            {/* TextArea para mensaje */}
                            {!(esSupervisor || esSupervisor2) && (
                                <Box mt={3}>
                                    <TextArea
                                        label="Mensaje"
                                        aria-multiline
                                        rows={4}
                                        variant='outlined'
                                        value={Mensaje_Recibe}
                                        onChange={handleMensajeRecibe}
                                        placeholder="Escribe un mensaje..."
                                        maxLength={150}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Box>
                            )}

                            {/* Botones de acción */}
                            <Box display="flex" justifyContent="flex-end" mt={3}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    sx={{
                                        marginRight: 2,
                                        color: 'white',
                                    }}
                                    onClick={() =>
                                        esSupervisor || esSupervisor2
                                            ? onSubtmitChangeDayRest()
                                            : handleAcceptChangeMessage(selectedNotification)
                                    }
                                >
                                    Aceptar
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="medium"
                                    onClick={() =>
                                        esSupervisor || esSupervisor2
                                            ? handleRejectNotificationSupervisor(selectedNotification)
                                            : handleRejectNotification(selectedNotification)
                                    }
                                >
                                    Rechazar
                                </Button>

                            </Box>
                        </Box>
                    </>

                ) : (
                    <Box p={3} sx={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Box textAlign="center" mb={2}>
                                    <Typography variant="h5" fontWeight="600" mt={2} sx={{ fontFamily: 'Nunito' }}>
                                        Solicitud de Cambio de Turno
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    {/* Detalles del Cambio y Tipo de Cambio */}
                                    <Grid item xs={6}>
                                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Detalles del cambio
                                                </Typography>
                                                {selectedNotification && (
                                                    <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                        Día {selectedNotification.Dia_Trabajo_Actual}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Tipo de cambio
                                                </Typography>
                                                {selectedNotification && (
                                                    <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                        {selectedNotification.Tipo_Cambio}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Información del Asesor */}
                                    <Grid item xs={6}>
                                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Box display="flex" alignItems="center">
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Asesor (Envia) {selectedNotification && selectedNotification.Hora_Envio}
                                                    </Typography>
                                                </Box>
                                                {selectedNotification && (
                                                    <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                        {selectedNotification.Nombre_Completo_Envia}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Box display="flex" alignItems="center">
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Asesor (Recibe) {selectedNotification && selectedNotification.Hora_Respuesta}
                                                    </Typography>
                                                </Box>
                                                {selectedNotification && (
                                                    <Typography mt={1} sx={{ fontFamily: 'Nunito' }}>
                                                        {selectedNotification.Nombre_Completo_Recibe}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>

                                {/* Divider Line */}
                                <Divider sx={{ my: 3, border: 'dashed' }} />

                                <div className='container'>
                                    <div className='row align-items-start'>
                                        <div className='col'>
                                            {(esSupervisor || (esSupervisor2 && userChangeList[0])) && (
                                                <div>
                                                    {userChangeList[0] && userChangeList[0].map(change => (
                                                        <div className='content-data' key={`${change.Fecha}_${change.Documento}`}>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Novedad}</div>
                                                                <div>Novedad</div>
                                                            </div>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Horas_Laboradas}</div>
                                                                <div>Horas</div>
                                                            </div>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Turno_Ini}</div>
                                                                <div>Turno Inicio</div>
                                                            </div>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Turno_Fin}</div>
                                                                <div>Turno Fin</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className='col'>
                                            {(esSupervisor || (esSupervisor2 && userChangeList[1])) && (
                                                <div>
                                                    {userChangeList[1] && userChangeList[1].map(change => (
                                                        <div className='content-data' key={`${change.Fecha}_${change.Documento}`}>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Novedad}</div>
                                                                <div>Novedad</div>
                                                            </div>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Horas_Laboradas}</div>
                                                                <div>Horas</div>
                                                            </div>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Turno_Ini}</div>
                                                                <div>Turno Inicio</div>
                                                            </div>
                                                            <div className='content-data-info'>
                                                                <div className='text-muted'>{change.Turno_Fin}</div>
                                                                <div>Turno Fin</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Motivo de Envío */}
                                {selectedNotification && selectedNotification.Mensaje_Envia ? (
                                    <Box mt={3}>
                                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Motivo de envío
                                                </Typography>
                                                <Typography variant="body1" mt={1}>
                                                    {selectedNotification.Mensaje_Envia}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ) : null}

                                {/* Motivo de Recibido */}
                                {(esSupervisor || esSupervisor2) && (
                                    <Box mt={3}>
                                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Motivo de recibido
                                                </Typography>
                                                {selectedNotification && (
                                                    <Typography variant="body1" mt={1}>
                                                        {selectedNotification.Mensaje_Recibe}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )}

                                {/* TextArea para mensaje */}
                                {!(esSupervisor || esSupervisor2) && (
                                    <Box mt={3}>
                                        <TextArea
                                            label="Mensaje"
                                            aria-multiline
                                            rows={4}
                                            variant='outlined'
                                            value={Mensaje_Recibe}
                                            onChange={handleMensajeRecibe}
                                            placeholder="Escribe un mensaje..."
                                            maxLength={150}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                )}

                                {/* Botones de acción */}
                                <Box display="flex" justifyContent="flex-end" mt={3}>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        sx={{
                                            marginRight: 2,
                                            color: 'white',
                                        }}
                                        onClick={() =>
                                            esSupervisor || esSupervisor2
                                                ? onSubtmitChange()
                                                : acceptChangeMessage(selectedNotification)
                                        }
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="medium"

                                        onClick={() =>
                                            esSupervisor || esSupervisor2
                                                ? handleRejectNotificationSupervisor1a1(selectedNotification)
                                                : handleRejectNotification(selectedNotification)
                                        }
                                    >
                                        Rechazar
                                    </Button>

                                </Box>
                            </>
                        )}
                    </Box>

                )}




            </Modal >
        </>
    );
};

export default DetailsNotification;
