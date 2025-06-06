import React from 'react'

const Shifts = ({ shiftFound, formatTime }) => {
    return (
        <div className='cursor-pointer-cards d-flex justify-content-center'>
            {shiftFound.Novedad === 'TUR' ? (
                <div className='box-day-TUR'>
                    <div className='title-TUR'>
                        <div className='title-TUR-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-TUR'><i className='bi bi-clock' /></div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'DES' ? (
                <div className='box-day-DES'>
                    <div className='box-container-DES'>
                        <div className='title-DES'>
                            <div className='title-DES-display'>{shiftFound.Novedad}</div>
                            <div className='icon-day-DES'>
                                -
                            </div>
                        </div>
                        <div>
                            <div className='container-horas'>
                                {` ${formatTime(shiftFound.Turno_Ini)}`}
                            </div>
                        </div>
                        <div className='mrg-button'>
                            <div className='container-horas'>
                                {` ${formatTime(shiftFound.Turno_Fin)}`}
                            </div>
                        </div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'SUS' ? (
                <div className='box-day-PAB-SC-RET-SUS'>
                    <div className='title-PAB-SC-RET-SUS'>
                        <div className='title-PAB-SC-RET-SUS-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-PAB-SC-RET-SUS'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'PAB' ? (
                <div className='box-day-PAB-SC-RET-SUS'>
                    <div className='title-PAB-SC-RET-SUS'>
                        <div className='title-PAB-SC-RET-SUS-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-PAB-SC-RET-SUS'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'SC' ? (
                <div className='box-day-PAB-SC-RET-SUS'>
                    <div className='title-PAB-SC-RET-SUS'>
                        <div className='title-PAB-SC-RET-SUS-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-PAB-SC-RET-SUS'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'RET' ? (
                <div className='box-day-PAB-SC-RET-SUS'>
                    <div className='title-PAB-SC-RET-SUS'>
                        <div className='title-PAB-SC-RET-SUS-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-PAB-SC-RET-SUS'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'LDF' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'LMA' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'DPAG' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'LR' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'LPA' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'VAC' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'JVOT' ? (
                <div className='box-day-LR-LPA-DPAG-LMA'>
                    <div className='title-LR-LPA-DPAG-LMA'>
                        <div className='title-LR-LPA-DPAG-LMA-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-LR-LPA-DPAG-LMA'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'ICCP' ? (
                <div className='box-day-ICCP-LNR'>
                    <div className='title-ICCP-LNR'>
                        <div className='title-ICCP-LNR-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-ICCP-LNR'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'LNR' ? (
                <div className='box-day-ICCP-LNR'>
                    <div className='title-ICCP-LNR'>
                        <div className='title-ICCP-LNR-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-ICCP-LNR'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'FOR' ? (
                <div className='box-day-FOR'>
                    <div className='title-FOR'>
                        <div className='title-FOR-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-FOR'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'SOP' ? (
                <div className='box-day-FOR'>
                    <div className='title-FOR'>
                        <div className='title-FOR-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-FOR'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'VOT' ? (
                <div className='box-day-VOT'>
                    <div className='title-VOT'>
                        <div className='title-VOT-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-VOT'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>

                    <div className='mrg-button'>
                        <div className='container-horas'>{`${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : shiftFound.Novedad === 'LLT' ? (
                <div className='box-day-VOT'>
                    <div className='title-FOR'>
                        <div className='title-FOR-display'>{shiftFound.Novedad}</div>
                        <div className='icon-day-FOR'>
                            -
                        </div>
                    </div>

                    <div>
                        <div className='container-horas'>{`EDaaASADASD${formatTime(shiftFound.Turno_Ini)}`}</div>
                    </div>
D 
                    <div className='mrg-button'>
                        <div className='container-horas'>{`ASDAS D asd SDAS${formatTime(shiftFound.Turno_Fin)}`}</div>
                    </div>
                </div>
            ) : ('-')}

        </div>
    )
}

export default Shifts