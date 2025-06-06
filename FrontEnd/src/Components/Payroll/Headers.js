import React from 'react';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import { Tooltip } from '@mui/material';
const Headers = ({ CircularProgress, CloseRoundedIcon, loading, sizeData1, sizeData2, Grid, Item, Box, CheckCircleRoundedIcon, CalendarMonthRoundedIcon, RunningWithErrorsRoundedIcon, ManageHistoryRoundedIcon, QuestionMarkRoundedIcon, ReduceCapacityRoundedIcon, ReportProblemRoundedIcon, countShifts, Tardiness, Absence, TardinessJustify, AusenciaNoJustificada, AbsenceJustify, dataCourtDates, handleComponentSelect }) => {
    const mes = Array.isArray(dataCourtDates) && dataCourtDates.map(m => m.mes);
    const fecha_pago = Array.isArray(dataCourtDates) && dataCourtDates.map(d => d.fecha_pago);
    const inicio_corte = Array.isArray(dataCourtDates) && dataCourtDates.map(d => d.inicio_corte);
    const fin_corte = Array.isArray(dataCourtDates) && dataCourtDates.map(d => d.fin_corte);
    return (
        <>
            <div className='title-horas-nomina'>Corte en curso</div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} >
                        <div className='text-muted-titles'>Mes</div>
                        <Tooltip title='Ver historial fechas cortes' onClick={() => handleComponentSelect('Cortes Nomina')} sx={{ cursor: 'pointer' }}>
                            <Item elevation={10}>
                                <div className='d-flex justify-content-between'>
                                    <div className='p-2'>
                                        <CalendarMonthRoundedIcon fontSize='medium' color='primary' />
                                    </div>
                                    <div className='p-2 d-flex align-items-center'>
                                        <div className='text-muted-titles'>
                                            {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center title-horas-nomina'>{mes}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                        <div className='text-muted-titles'>Fecha del pago</div>
                        <Tooltip title='Ver historial fechas cortes' onClick={() => handleComponentSelect('Cortes Nomina')} sx={{ cursor: 'pointer' }}>
                            <Item elevation={10}>
                                <div className='d-flex justify-content-between'>
                                    <div className='p-2'>
                                        <LocalAtmRoundedIcon fontSize='medium' color='success' />
                                    </div>
                                    <div className='p-2 d-flex align-items-center'>
                                        <div className='text-muted-titles'>
                                            {loading ? (<CircularProgress variant='indeterminate' color='success' />) : (<div className='card-text text-center title-horas-nomina'>{fecha_pago}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                        <div className='text-muted-titles'>Fecha Inicio Corte</div>
                        <Tooltip title='Ver historial fechas cortes' onClick={() => handleComponentSelect('Cortes Nomina')} sx={{ cursor: 'pointer' }}>
                            <Item elevation={10}>
                                <div className='d-flex justify-content-between'>
                                    <div className='p-2'>
                                        <TodayRoundedIcon fontSize='medium' color='warning' />
                                    </div>
                                    <div className='p-2 d-flex align-items-center'>
                                        <div className='text-muted-titles'>
                                            {loading ? (<CircularProgress variant='indeterminate' color='warning' />) : (<div className='card-text text-center title-horas-nomina'>{inicio_corte}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                        <div className='text-muted-titles'>Fecha Fin corte</div>
                        <Tooltip title='Ver historial fechas cortes' onClick={() => handleComponentSelect('Cortes Nomina')} sx={{ cursor: 'pointer' }}>
                            <Item elevation={10}>
                                <div className='d-flex justify-content-between'>
                                    <div className='p-2'>
                                        <InsertInvitationRoundedIcon fontSize='medium' color='success' />
                                    </div>
                                    <div className='p-2 d-flex align-items-center'>
                                        <div className='text-muted-titles'>
                                            {loading ? (<CircularProgress variant='indeterminate' color='success' />) : (<div className='card-text text-center title-horas-nomina'>{fin_corte}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Tooltip>
                    </Grid>

                </Grid>
            </Box>

            <div className='title-horas-nomina'>Horas nómina</div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {/* TURNOS CUMPLIDOS*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <CheckCircleRoundedIcon fontSize='large' className='color-icon-accepts' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Turnos cumplidos</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{sizeData1}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/* TURNOS NO CUMPLIDOS*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <CloseRoundedIcon fontSize='large' className='color-icon-reject' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Turnos no cumplidos</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (
                                        <CircularProgress variant='indeterminate' color='primary' />
                                    ) : (<div className='card-text text-center metas-sp-lenght'>{sizeData2}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/* TURNOS PROGRAMADOS*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>

                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <CalendarMonthRoundedIcon fontSize='large' color='primary' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Turnos programados</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{countShifts}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/*IMPUNTUALIDAD NO JUSTIFICADA*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <RunningWithErrorsRoundedIcon fontSize='large' color='warning' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Impuntualidad NO Justificada</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{Tardiness}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/*IMPUNTUALIDAD JUSTIFICADA*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <ManageHistoryRoundedIcon fontSize='large' color='success' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Impuntualidad Justificada</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{TardinessJustify}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/*AUSENCIA*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <QuestionMarkRoundedIcon fontSize='large' className='color-icon-reject' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Ausencia</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{Absence && Absence}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/*AUSENCIA JUSTIFICADA*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <ReduceCapacityRoundedIcon fontSize='large' color='primary' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Ausencia Justificada</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{AbsenceJustify && AbsenceJustify}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    {/* AUSENCIA NO JUSTIFICADA*/}
                    <Grid item xs={12} sm={6} md={3} >
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <ReportProblemRoundedIcon fontSize='large' color='warning' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Ausencia NO Justificada</div>
                                </div>
                                <div className='p-2'>
                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<div className='card-text text-center metas-sp-lenght'>{AusenciaNoJustificada}</div>)}
                                </div>
                            </div>
                        </Item>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Headers