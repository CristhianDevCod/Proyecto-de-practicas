import React from 'react'

const DetailsNomina = ({ Modal, Button, handleCloseModal, selectedDetails, openModal, minDate, maxDate, formDataNovelties, handleEditDateCal, handleAcceptNotificationNovelties, handleEditDateAISL, formDataNoveltiesAISL }) => {

    const handleKeyDown = (e) => {
        e.preventDefault();
    }

    return (
        <Modal
            title={<div className='modal-title details-label-boss mb-4'>Detalles de novedad laboral</div>}
            width={1000}
            footer={null}
            open={openModal}
            onCancel={handleCloseModal}
        >
            {selectedDetails && (
                <>

                    <div className='details-container mb-3'>
                        <div className='details-row'>
                            <div className='details-label'>Fecha Solicitud </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Fecha_Solicitud}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Hora Solicitud</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Hora_Solicitud}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Nombre Completo</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Nombre_Completo}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Cliente Área</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Cliente_Area}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Cargo</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Cargo}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Servicio</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Servicio}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Tipo Solicitud</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Tipo_Solicitud}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Fecha Inicio Novedad</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Fecha_Inicio_Novedad}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Fecha Fin Novedad</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Fecha_Fin_Novedad}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Días Calendario</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Dias_Calendario}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Días Laborales</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Dias_Laborales}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Tiempo en dinero</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Time_Money}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Días</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.How_Long}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Numero de la Incapacidad</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Numero_Incapacidad}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Numero Diagnostico</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Numero_Diagnostico}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Nombre Diagnostico</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Nombre_Incapacidad}</div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Motivo</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Motivo}</div>
                        </div>

                        <div className='details-row'>
                            <div className='details-label'>Nota Jefe Inmediato </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Observacion_Jefe_Inmediato ? selectedDetails.Observacion_Jefe_Inmediato : '-'}</div>
                        </div>

                        <div className='details-row'>
                            <div className='details-label'>Nota Planeación </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Observacion_Planeacion ? selectedDetails.Observacion_Planeacion : '-'}</div>
                        </div>


                        <div className='details-row'>
                            <div className='details-label'>Nota Gerente </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Observacion_Gerente_Area ? selectedDetails.Observacion_Gerente_Area : '-'}</div>
                        </div>

                        <div className='details-row'>
                            <div className='details-label'>Nota Punto Helpi </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                            <div className='details-value'>{selectedDetails.Observacion_Gestion_Humana ? selectedDetails.Observacion_Gestion_Humana : '-'}</div>
                        </div>


                    </div>

                    {selectedDetails.Tipo_Solicitud === 'CAL' ? (
                        <>
                            <div className='details-label'>Editar</div>

                            <div className='row align-items-center p-1'>
                                <div className='col mb-3'>
                                    <label htmlFor='fechaInicioNovedadEdit' className='form-label d-flex'>
                                        Fecha Inicio Novedad
                                    </label>
                                    <input
                                        type='date'
                                        // min={minDate}
                                        // max={maxDate}
                                        onKeyDown={handleKeyDown}
                                        className='form-control'
                                        id='fechaInicioNovedadEdit'
                                        onChange={handleEditDateCal}
                                        name='Fecha_Inicio_Novedad_Editar'
                                        value={formDataNovelties.Fecha_Inicio_Novedad_Editar}
                                    />
                                </div>

                                <div className='col mb-3'>
                                    <label htmlFor='fechaFinNovedad' className='form-label d-flex'>
                                        Fecha Fin Novedad
                                    </label>
                                    <input
                                        type='date'
                                        max={maxDate}
                                        id='fechaFinNovedad'
                                        className='form-control'
                                        onKeyDown={handleKeyDown}
                                        onChange={handleEditDateCal}
                                        name='Fecha_Fin_Novedad_Editar'
                                        value={formDataNovelties.Fecha_Fin_Novedad_Editar}
                                        min={formDataNovelties.Fecha_Inicio_Novedad_Editar}
                                    />
                                </div>
                            </div>


                            <div className=''>
                                <label htmlFor='observacionEditado' className='form-label d-flex'>
                                    Motivo
                                </label>
                                <textarea
                                    id='observacionEditado'
                                    className='form-control'
                                    name='Motivo'
                                    onChange={handleEditDateCal}
                                    value={formDataNovelties.Motivo}
                                />
                            </div>

                            <div className='d-flex justify-content-end'>
                                <div className='p-2 mb-2'>
                                    <Button size='sm' variant='soft' color='neutral' onClick={handleCloseModal}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className='p-2 mb-2'>
                                    <Button size='sm' variant='soft' color='success' disabled={!formDataNovelties.Fecha_Inicio_Novedad_Editar || !formDataNovelties.Fecha_Fin_Novedad_Editar} onClick={handleAcceptNotificationNovelties}>
                                        Aceptar
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : ''}

                    {selectedDetails.Tipo_Solicitud === 'AISL' ? (
                        <>
                            <div className='details-label'>Editar</div>
                            <div className='row align-items-center p-1'>
                                <div className='col mb-3'>
                                    <label htmlFor='fechaInicioNovedadEdit' className='form-label d-flex'>
                                        Tipo de Novedad
                                    </label>
                                    <select type='' className='form-select' name='Tipo_Novedad_Editar' value={formDataNoveltiesAISL.Tipo_Novedad_Editar} onChange={handleEditDateAISL}>
                                        <option value='' >Seleccione...</option>
                                        <option value='VAC' >VACACIONES</option>
                                        <option value='LNR' >LICENCIA NO REMUNERADA</option>
                                    </select>
                                </div>

                                <div className='col mb-3'>

                                </div>
                            </div>

                            <div className='row align-items-center p-1'>
                                <div className='col mb-3'>
                                    <label htmlFor='fechaInicioNovedadEdit' className='form-label d-flex'>
                                        Fecha Inicio Novedad
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        onKeyDown={handleKeyDown}
                                        id='fechaInicioNovedadEdit'
                                        onChange={handleEditDateAISL}
                                        name='Fecha_Inicio_Novedad_Editar'
                                        disabled={!formDataNoveltiesAISL.Tipo_Novedad_Editar}
                                        value={formDataNoveltiesAISL.Fecha_Inicio_Novedad_Editar}
                                    />
                                </div>

                                <div className='col mb-3'>
                                    <label htmlFor='fechaFinNovedad' className='form-label d-flex'>
                                        Fecha Fin Novedad
                                    </label>
                                    <input
                                        type='date'
                                        max={maxDate}
                                        id='fechaFinNovedad'
                                        className='form-control'
                                        onKeyDown={handleKeyDown}
                                        onChange={handleEditDateAISL}
                                        name='Fecha_Fin_Novedad_Editar'
                                        value={formDataNoveltiesAISL.Fecha_Fin_Novedad_Editar}
                                        min={formDataNoveltiesAISL.Fecha_Inicio_Novedad_Editar}
                                        disabled={!formDataNoveltiesAISL.Fecha_Inicio_Novedad_Editar}
                                    />
                                </div>
                            </div>


                            <div className=''>
                                <label htmlFor='observacionEditado' className='form-label d-flex'>
                                    Motivo
                                </label>
                                <textarea
                                    id='observacionEditado'
                                    className='form-control'
                                    name='Motivo'
                                    onChange={handleEditDateAISL}
                                    value={formDataNoveltiesAISL.Motivo}
                                />
                            </div>

                            <div className='d-flex justify-content-end'>
                                <div className='p-2 mb-2'>
                                    <Button size='sm' variant='soft' color='neutral' onClick={handleCloseModal}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className='p-2 mb-2'>
                                    <Button size='sm' variant='soft' color='success' disabled={!formDataNoveltiesAISL.Fecha_Inicio_Novedad_Editar || !formDataNoveltiesAISL.Fecha_Fin_Novedad_Editar} onClick={handleAcceptNotificationNovelties}>
                                        Aceptar
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : ''}
                </>
            )
            }
        </Modal >
    )
}

export default DetailsNomina