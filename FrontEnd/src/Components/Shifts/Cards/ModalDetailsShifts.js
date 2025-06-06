import { React, Modal, Card, Box, Chip, AccessTimeRoundedIcon, LocalPizzaOutlinedIcon, EmojiFoodBeverageIcon, SpatialAudioOffOutlinedIcon, ConnectWithoutContactOutlinedIcon, ChildCareOutlinedIcon, TimerOffOutlinedIcon, PregnantWomanIcon, HotelIcon, FlightTakeoffIcon, CardContent } from '../../../Exports-Modules/Exports';
import '../Styles/Styles.css';
function ModalDetailsShifts({ modalVisible, handleModalClose, selectedTurno, formatTime }) {

    return (
        <>
            <Modal
                centered
                title='Resumen de turno'
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <div>
                    <Card className='mb-2'>
                        <CardContent>
                            <div className='container-chape'>
                                <div className='chip-tur'>
                                    <Chip avatar={<AccessTimeRoundedIcon />} label='Turnos' />
                                </div>
                                <div className='chip-des'>
                                    <Chip avatar={<EmojiFoodBeverageIcon />} label='Descansos' />
                                </div>
                                <div className='chip-al'>
                                    <Chip avatar={<LocalPizzaOutlinedIcon />} label='Almuerzos' />
                                </div>
                                <div className='chip-al'>
                                    <Chip avatar={<SpatialAudioOffOutlinedIcon />} label='Diálogo' />
                                </div>
                            </div>
                            <div style={{ display: 'flex' }} className='container-chape'>
                                <div className=''>
                                    <Chip avatar={<ConnectWithoutContactOutlinedIcon />} label='Capacitación' />
                                </div>
                                <div className=''>
                                    <Chip avatar={<ChildCareOutlinedIcon />} label='Lactancia' />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* VERDES */}
                    {selectedTurno && selectedTurno.Novedad === 'TUR' && (
                        <>
                            <Box className='modal-day-TUR'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-tur' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-TUR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>

                                </div>
                            </Box>
                        </>
                    )}
                    {/* AZUL 1 */}
                    {selectedTurno && selectedTurno.Novedad === 'DES' && (
                        <>
                            <Box className='modal-day-DES'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-DES' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <HotelIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-DES'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>

                                </div>
                            </Box>
                        </>
                    )}

                    {/* ROJOS */}
                    {selectedTurno && selectedTurno.Novedad === 'SUS' && (
                        <>
                            <Box className='modal-day-sus'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-sus' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <TimerOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'PAB' && (
                        <>
                            <Box className='modal-day-sus'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-sus' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <TimerOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'SC' && (
                        <>
                            <Box className='modal-day-sus'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-sus' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <TimerOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'RET' && (
                        <>
                            <Box className='modal-day-sus'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-sus' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <TimerOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-sus'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}

                    {/* MORADOS */}
                    {selectedTurno && selectedTurno.Novedad === 'LPA' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'LMA' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <PregnantWomanIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'DPAG' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'LR' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'VAC' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <FlightTakeoffIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'JVOT' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'LDF' && (
                        <>
                            <Box className='modal-day-LR-LPA-DPAG-LMA'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-LR-LPA-DPAG-LMA' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-LR-LPA-DPAG-LMA'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}

                    {/* NARANJA */}
                    {selectedTurno && selectedTurno.Novedad === 'ICCP' && (
                        <>
                            <Box className='modal-day-ICCP-LNR'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-ICCP-LNR' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'LNR' && (
                        <>
                            <Box className='modal-day-ICCP-LNR'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-ICCP-LNR' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}

                    {/* AZUL2 */}
                    {selectedTurno && selectedTurno.Novedad === 'FOR' && (
                        <>
                            <Box className='modal-day-FOR'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-FOR' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-FOR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}

                    {/* AZUL3 */}
                    {selectedTurno && selectedTurno.Novedad === 'SOP' && (
                        <>
                            <Box className='modal-day-SOP'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-SOP' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-SOP'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}

                    {/* SALMON */}
                    {selectedTurno && selectedTurno.Novedad === 'VOT' && (
                        <>
                            <Box className='modal-day-VOT'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-VOT' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'PDA' && (
                        <>
                            <Box className='modal-day-VOT'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-VOT' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                    {selectedTurno && selectedTurno.Novedad === 'PDA ME' && (
                        <>
                            <Box className='modal-day-VOT'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-VOT' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-VOT'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}

                    {/* NARANJA */}
                    {selectedTurno && selectedTurno.Novedad === 'CAL' && (
                        <>
                            <Box className='modal-day-ICCP-LNR'>
                                <div className='content-data'>
                                    <div className='content-data-nov'>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Novedad}</div>
                                            <div id='name-shifts'>Novedad</div>
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{selectedTurno.Horas_Laboradas}</div>
                                            <div id='name-shifts'>Total</div>
                                        </div>
                                    </div>

                                    <Box className='border-dashed-ICCP-LNR' />

                                    {/* conteido de horas */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <TimerOffOutlinedIcon />

                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Ini)}</div>
                                            <div id='name-shifts'>Hora inicial</div>
                                        </div>
                                    </div>

                                    {/* contenido del 1er decanso */}

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_1_Ini)} - {formatTime(selectedTurno.Des_1_Fin)}</div>
                                            <div id='name-shifts'>1er descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 2do decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_2_Ini)} - {formatTime(selectedTurno.Des_2_Fin)}</div>
                                            <div id='name-shifts'>2do descanso</div>
                                        </div>
                                    </div>

                                    {/* contenido del 3er decanso */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <EmojiFoodBeverageIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Des_3_Ini)} - {formatTime(selectedTurno.Des_3_Fin)}</div>
                                            <div id='name-shifts'>3er descanso</div>
                                        </div>
                                    </div>


                                    {/* contenido del almuerzo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <LocalPizzaOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lunch_Ini)} - {formatTime(selectedTurno.Lunch_Fin)}</div>
                                            <div id='name-shifts'>Almuerzo</div>
                                        </div>
                                    </div>

                                    {/* contenido dialogo */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <SpatialAudioOffOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Dialogo_Ini)} - {formatTime(selectedTurno.Dialogo_Fin)}</div>
                                            <div id='name-shifts'>Diálogo</div>
                                        </div>
                                    </div>

                                    {/* contenido capacitación */}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_1_Ini)} - {formatTime(selectedTurno.Training_1_Fin)}</div>
                                            <div id='name-shifts'>1ra capacitación</div>
                                        </div>
                                    </div>
                                    {/* contenido capacitación 2*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ConnectWithoutContactOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Training_2_Ini)} - {formatTime(selectedTurno.Training_2_Fin)}</div>
                                            <div id='name-shifts'>2do capacitación</div>
                                        </div>
                                    </div>

                                    {/* contenido Lactancia*/}
                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <ChildCareOutlinedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Lac_Ini)} - {formatTime(selectedTurno.Lac_Fin)}</div>
                                            <div id='name-shifts'>Lactancia</div>
                                        </div>
                                    </div>

                                    <div className='content-data-nov'>
                                        <div className='content-data-icon-ICCP-LNR'>
                                            <AccessTimeRoundedIcon />
                                        </div>
                                        <div className='content-data-info'>
                                            <div className='text-muted'>{formatTime(selectedTurno.Turno_Fin)}</div>
                                            <div id='name-shifts'>Final de Turno</div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default ModalDetailsShifts;