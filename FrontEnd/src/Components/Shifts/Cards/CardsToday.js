import { React, Box, AccessTimeRoundedIcon, EmojiFoodBeverageIcon, LocalPizzaOutlinedIcon, SpatialAudioOffOutlinedIcon, ConnectWithoutContactOutlinedIcon, ChildCareOutlinedIcon } from '../../../Exports-Modules/Exports';

import '../Styles/Styles.css';
import DisconnectAdviser from './DisconnectAdviser';

function CardsToday({ turnos, formatTime }) {
    const today = new Date().toISOString().slice(0, 10);
    const showCloudIcon = turnos.every(data => data.Fecha !== today || data.Novedad !== 'TUR');

    return (
        <>
            {turnos && turnos.map((data) => {
                return (
                    <div
                        key={`${data.Fecha}_${data.Documento}_${data.Novedad}`}
                        id='container-box-today'
                    >
                        {data.Fecha === today && data.Novedad === 'TUR' ? (
                            <>
                                <Box className='modal-day-TUR'>
                                    <div className='content-data'>
                                        <div className='content-data-nov'>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{data.Novedad}</div>
                                                <div id='name-shifts'>Novedad</div>
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{data.Horas_Laboradas}</div>
                                                <div id='name-shifts'>Total</div>
                                            </div>
                                        </div>

                                        <Box className='border-dashed-TUR' />

                                        {/* conteido de horas */}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <AccessTimeRoundedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Turno_Ini)}</div>
                                                <div id='name-shifts'>Hora inicial</div>
                                            </div>
                                        </div>

                                        {/* contenido del 1er decanso */}

                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <EmojiFoodBeverageIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Des_1_Ini)} - {formatTime(data.Des_1_Fin)}</div>
                                                <div id='name-shifts'>1er descanso</div>
                                            </div>
                                        </div>

                                        {/* contenido del 2do decanso */}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <EmojiFoodBeverageIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Des_2_Ini)} - {formatTime(data.Des_2_Fin)}</div>
                                                <div id='name-shifts'>2do descanso</div>
                                            </div>
                                        </div>

                                        {/* contenido del 3er decanso */}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <EmojiFoodBeverageIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Des_3_Ini)} - {formatTime(data.Des_3_Fin)}</div>
                                                <div id='name-shifts'>3er descanso</div>
                                            </div>
                                        </div>


                                        {/* contenido del almuerzo */}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <LocalPizzaOutlinedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Lunch_Ini)} - {formatTime(data.Lunch_Fin)}</div>
                                                <div id='name-shifts'>Almuerzo</div>
                                            </div>
                                        </div>

                                        {/* contenido dialogo */}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <SpatialAudioOffOutlinedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Dialogo_Ini)} - {formatTime(data.Dialogo_Fin)}</div>
                                                <div id='name-shifts'>Diálogo</div>
                                            </div>
                                        </div>

                                        {/* contenido capacitación */}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <ConnectWithoutContactOutlinedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Training_1_Ini)} - {formatTime(data.Training_1_Fin)}</div>
                                                <div id='name-shifts'>1ra capacitación</div>
                                            </div>
                                        </div>
                                        {/* contenido capacitación 2*/}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <ConnectWithoutContactOutlinedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Training_2_Ini)} - {formatTime(data.Training_2_Ini)}</div>
                                                <div id='name-shifts'>2do capacitación</div>
                                            </div>
                                        </div>

                                        {/* contenido Lactancia*/}
                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <ChildCareOutlinedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Lac_Ini)} - {formatTime(data.Lac_Fin)}</div>
                                                <div id='name-shifts'>Lactancia</div>
                                            </div>
                                        </div>

                                        <div className='content-data-nov'>
                                            <div className='content-data-icon-TUR'>
                                                <AccessTimeRoundedIcon />
                                            </div>
                                            <div className='content-data-info'>
                                                <div className='text-muted'>{formatTime(data.Turno_Fin)}</div>
                                                <div id='name-shifts'>Final de Turno</div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </>
                        ) : null}
                    </div>
                );
            })}
            {showCloudIcon && <DisconnectAdviser />}
        </>
    )
}

export default CardsToday;