import React from 'react'
import { Card, Typography } from 'antd';
import HotelIcon from '@mui/icons-material/Hotel';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
const { Text } = Typography;
const DataCellRender = ({ turnos, formattedDate, handleTurnoClick, formatTime }) => {
    const filteredTurnos = turnos.filter(
        (turno) => turno.Fecha === formattedDate
    );

    if (filteredTurnos.length === 0) {
        return (
            <div className='loaders-container-data'>
                <div className='loaders-cell-data-text'>
                    <Text strong></Text>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                {filteredTurnos.map((turno) => (
                    <div
                        key={`${turno.Fecha}_${turno.Documento}_${turno.Novedad}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleTurnoClick(turno)}
                    >

                        {turno.Novedad === 'DES' ? (
                            <Card.Grid className='box-day-DES'>
                                <div className='box-container-DES'>
                                    <div className='title-DES'>
                                        <div className='title-DES-display'>{turno.Novedad}</div>
                                        <div className='icon-day-DES'>
                                            <HotelIcon fontSize='small' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='container-horas'>
                                            {` ${formatTime(turno.Turno_Ini)}`}
                                        </div>
                                    </div>
                                    <div className='mrg-button'>
                                        <div className='container-horas'>
                                            {` ${formatTime(turno.Turno_Fin)}`}
                                        </div>
                                    </div>
                                </div>
                            </Card.Grid>
                        ) :
                            //VERDES
                            turno.Novedad === 'TUR' ? (
                                <Card.Grid className='box-day-TUR'>
                                    <div className='title-TUR'>
                                        <div className='title-TUR-display'>{turno.Novedad}</div>
                                        <div className='icon-day-TUR'>
                                            <AccessTimeRoundedIcon fontSize='small' />
                                        </div>
                                    </div>

                                    <div>
                                        <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                    </div>

                                    <div className='mrg-button'>
                                        <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                    </div>
                                </Card.Grid>
                            ) :
                                //ROJOS
                                turno.Novedad === 'SUS' ? (
                                    <Card.Grid className='box-day-PAB-SC-RET-SUS'>
                                        <div className='title-PAB-SC-RET-SUS'>
                                            <div className='title-PAB-SC-RET-SUS-display'>{turno.Novedad}</div>
                                            <div className='icon-day-PAB-SC-RET-SUS'>
                                                <TimerOffOutlinedIcon fontSize='small' />
                                            </div>
                                        </div>

                                        <div>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                        </div>

                                        <div className='mrg-button'>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                        </div>
                                    </Card.Grid>
                                ) : turno.Novedad === 'PAB' ? (
                                    <Card.Grid className='box-day-PAB-SC-RET-SUS'>
                                        <div className='title-PAB-SC-RET-SUS'>
                                            <div className='title-PAB-SC-RET-SUS-display'>{turno.Novedad}</div>
                                            <div className='icon-day-PAB-SC-RET-SUS'>
                                                <TimerOffOutlinedIcon fontSize='small' />
                                            </div>
                                        </div>

                                        <div>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                        </div>

                                        <div className='mrg-button'>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                        </div>
                                    </Card.Grid>
                                ) : turno.Novedad === 'SC' ? (
                                    <Card.Grid className='box-day-PAB-SC-RET-SUS'>
                                        <div className='title-PAB-SC-RET-SUS'>
                                            <div className='title-PAB-SC-RET-SUS-display'>{turno.Novedad}</div>
                                            <div className='icon-day-PAB-SC-RET-SUS'>
                                                <TimerOffOutlinedIcon fontSize='small' />
                                            </div>
                                        </div>

                                        <div>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                        </div>

                                        <div className='mrg-button'>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                        </div>
                                    </Card.Grid>
                                ) : turno.Novedad === 'RET' ? (
                                    <Card.Grid className='box-day-PAB-SC-RET-SUS'>
                                        <div className='title-PAB-SC-RET-SUS'>
                                            <div className='title-PAB-SC-RET-SUS-display'>{turno.Novedad}</div>
                                            <div className='icon-day-PAB-SC-RET-SUS'>
                                                <TimerOffOutlinedIcon fontSize='small' />
                                            </div>
                                        </div>

                                        <div>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                        </div>

                                        <div className='mrg-button'>
                                            <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                        </div>
                                    </Card.Grid>
                                ) :

                                    // MORADOS
                                    turno.Novedad === 'LDF' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <TimerOffOutlinedIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) : turno.Novedad === 'LMA' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <PregnantWomanIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) : turno.Novedad === 'DPAG' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <TimerOffOutlinedIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) : turno.Novedad === 'LR' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <TimerOffOutlinedIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) : turno.Novedad === 'LPA' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <PregnantWomanIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) : turno.Novedad === 'VAC' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <FlightTakeoffIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) : turno.Novedad === 'JVOT' ? (
                                        <Card.Grid className='box-day-LR-LPA-DPAG-LMA'>
                                            <div className='title-LR-LPA-DPAG-LMA'>
                                                <div className='title-LR-LPA-DPAG-LMA-display'>{turno.Novedad}</div>
                                                <div className='icon-day-LR-LPA-DPAG-LMA'>
                                                    <TimerOffOutlinedIcon fontSize='small' />
                                                </div>
                                            </div>

                                            <div>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                            </div>

                                            <div className='mrg-button'>
                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                            </div>
                                        </Card.Grid>
                                    ) :
                                        //NARANJAS
                                        turno.Novedad === 'ICCP' ? (
                                            <Card.Grid className='box-day-ICCP-LNR'>
                                                <div className='title-ICCP-LNR'>
                                                    <div className='title-ICCP-LNR-display'>{turno.Novedad}</div>
                                                    <div className='icon-day-ICCP-LNR'>
                                                        <TimerOffOutlinedIcon fontSize='small' />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                </div>

                                                <div className='mrg-button'>
                                                    <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                </div>
                                            </Card.Grid>
                                        ) : turno.Novedad === 'LNR' ? (
                                            <Card.Grid className='box-day-ICCP-LNR'>
                                                <div className='title-ICCP-LNR'>
                                                    <div className='title-ICCP-LNR-display'>{turno.Novedad}</div>
                                                    <div className='icon-day-ICCP-LNR'>
                                                        <TimerOffOutlinedIcon fontSize='small' />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                </div>

                                                <div className='mrg-button'>
                                                    <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                </div>
                                            </Card.Grid>
                                        ) :
                                            //AZUL2
                                            turno.Novedad === 'FOR' ? (
                                                <Card.Grid className='box-day-FOR'>
                                                    <div className='title-FOR'>
                                                        <div className='title-FOR-display'>{turno.Novedad}</div>
                                                        <div className='icon-day-FOR'>
                                                            <AutoStoriesIcon fontSize='small' />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                    </div>

                                                    <div className='mrg-button'>
                                                        <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                    </div>
                                                </Card.Grid>
                                            ) :
                                                //AZUL3
                                                turno.Novedad === 'SOP' ? (
                                                    <Card.Grid className='box-day-FOR'>
                                                        <div className='title-FOR'>
                                                            <div className='title-FOR-display'>{turno.Novedad}</div>
                                                            <div className='icon-day-FOR'>
                                                                <TimerOffOutlinedIcon fontSize='small' />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                        </div>

                                                        <div className='mrg-button'>
                                                            <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                        </div>
                                                    </Card.Grid>
                                                ) :
                                                    //SALMON
                                                    turno.Novedad === 'VOT' ? (
                                                        <Card.Grid className='box-day-VOT'>
                                                            <div className='title-VOT'>
                                                                <div className='title-VOT-display'>{turno.Novedad}</div>
                                                                <div className='icon-day-VOT'>
                                                                    <HowToVoteIcon fontSize='small' />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                            </div>

                                                            <div className='mrg-button'>
                                                                <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                            </div>
                                                        </Card.Grid>
                                                    ) :
                                                        turno.Novedad === 'PDA' ? (
                                                            <Card.Grid className='box-day-VOT'>
                                                                <div className='title-VOT'>
                                                                    <div className='title-VOT-display'>{turno.Novedad}</div>
                                                                    <div className='icon-day-VOT'>
                                                                        <HowToVoteIcon fontSize='small' />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                                </div>

                                                                <div className='mrg-button'>
                                                                    <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                                </div>
                                                            </Card.Grid>
                                                        ) :
                                                            turno.Novedad === 'PDA ME' ? (
                                                                <Card.Grid className='box-day-VOT'>
                                                                    <div className='title-VOT'>
                                                                        <div className='title-VOT-display'>{turno.Novedad}</div>
                                                                        <div className='icon-day-VOT'>
                                                                            <HowToVoteIcon fontSize='small' />
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                                    </div>

                                                                    <div className='mrg-button'>
                                                                        <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                                    </div>
                                                                </Card.Grid>
                                                            ) :
                                                                //NARANJAS
                                                                turno.Novedad === 'CAL' ? (
                                                                    <Card.Grid className='box-day-ICCP-LNR'>
                                                                        <div className='title-ICCP-LNR'>
                                                                            <div className='title-ICCP-LNR-display'>{turno.Novedad}</div>
                                                                            <div className='icon-day-ICCP-LNR'>
                                                                                <TimerOffOutlinedIcon fontSize='small' />
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <div className='container-horas'>{`${formatTime(turno.Turno_Ini)}`}</div>
                                                                        </div>

                                                                        <div className='mrg-button'>
                                                                            <div className='container-horas'>{`${formatTime(turno.Turno_Fin)}`}</div>
                                                                        </div>
                                                                    </Card.Grid>
                                                                ) :
                                                                    ('')}
                    </div>
                ))}
            </div>
        </>
    )
}

export default DataCellRender