import React from 'react'

const AcceptsAndRejectsTardinessWFM = ({ Modal, Button, handleCloseAccepts, openAcceptsAndRejects, seletedDetails, ItemContentModal, handleCloseCancel, openRejects, WarningRoundedIcon, onSubmit, setObservacion_1, Observacion_1 }) => {
    return (
        <>
            {/* MODAL PARA ACEPTAR LAS AUSENCIAS IMPUNTUALIDADES*/}
            <Modal
                title={
                    <div className='mb-3 d-flex'>
                        <div className='p-2'>
                            <WarningRoundedIcon color='warning' fontSize='medium' />
                        </div>
                        <div className='p-2'>
                            <p className='modal-title text-muted'>¿Deseas aceptar esta {seletedDetails && (seletedDetails.Tipo_Impuntualidad)}?</p>
                        </div>
                    </div>

                }
                width={800}
                footer={null}
                open={openAcceptsAndRejects}
                onCancel={handleCloseAccepts}
            >

                <ItemContentModal>
                    {seletedDetails && (
                        <div>
                            <div className='text-muted'>
                                Nombre / Apellidos
                                <div className='title-metas'>{seletedDetails.Nombre_Completo}</div>
                            </div>

                            <div className='text-muted'>
                                Cargo
                                <div className='title-metas'>{seletedDetails.Cargo}</div>
                            </div>
                        </div>
                    )}
                </ItemContentModal>

                <div className='container mt-5' >
                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='tipoSolicitud' className='form-label d-flex'>
                                Tipo de impuntualidad / Ausencia
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Tipo_Impuntualidad}</div>
                                </div>
                            )}
                        </div>

                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha Impuntualidad / Ausencia
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Fecha_Solicitud ? seletedDetails.Fecha_Solicitud: '-'}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {seletedDetails && seletedDetails.Numero_Apolo && (
                        <div className='col mb-3'>
                            <label htmlFor='NumeroApolo' className='form-label d-flex'>
                                Número de Apolo
                            </label>
                            <div className='text-muted'>
                                <div className='title-metas'>{seletedDetails.Numero_Apolo}</div>
                            </div>
                        </div>
                    )}


                    <div className='mb-3'>
                        <label htmlFor='motivo' className='form-label'>
                            Descripcion de la Impuntualidad / Ausencia
                        </label>
                        {seletedDetails && (
                            <div className='text-muted'>
                                <div className='title-metas'>{seletedDetails.Descripcion}</div>
                            </div>
                        )}
                    </div>

                </div>


                <div className='p-2 mb-2'>
                    <div className=''>
                        <label htmlFor='floatingTextarea2' className='text-muted'>Observación</label>
                        <textarea
                            value={Observacion_1}
                            onChange={(e) => setObservacion_1(e.target.value)}
                            className='form-control'
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='neutral' onClick={handleCloseAccepts}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='success' value='Aceptado' onClick={() => { onSubmit('Aceptado'); }} >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </Modal>


            {/* MODAL PARA ACEPTAR LAS AUSENCIAS IMPUNTUALIDADES*/}
            <Modal
                title={
                    <div className='mb-3 d-flex'>
                        <div className='p-2'>
                            <WarningRoundedIcon color='warning' fontSize='medium' />
                        </div>
                        <div className='p-2'>
                            <p className='modal-title text-muted'>¿Deseas rechazar esta {seletedDetails && (seletedDetails.Tipo_Impuntualidad)}?</p>
                        </div>
                    </div>
                }
                footer={null}
                width={800}
                open={openRejects}
                onCancel={handleCloseCancel}
            >

                <ItemContentModal>
                    {seletedDetails && (
                        <div>
                            <div className='text-muted'>
                                Nombre / Apellidos
                                <div className='title-metas'>{seletedDetails.Nombre_Completo}</div>
                            </div>

                            <div className='text-muted'>
                                Cargo
                                <div className='title-metas'>{seletedDetails.Cargo}</div>
                            </div>
                        </div>
                    )}
                </ItemContentModal>

                <div className='container mt-5' >
                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='tipoSolicitud' className='form-label d-flex'>
                                Tipo de impuntualidad / Ausencia
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Tipo_Impuntualidad}</div>
                                </div>
                            )}
                        </div>

                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha Impuntualidad / Ausencia
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Fecha_Solicitud ? seletedDetails.Fecha_Solicitud: '-'}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {seletedDetails && seletedDetails.Numero_Apolo && (
                        <div className='col mb-3'>
                            <label htmlFor='NumeroApolo' className='form-label d-flex'>
                                Número de Apolo
                            </label>
                            <div className='text-muted'>
                                <div className='title-metas'>{seletedDetails.Numero_Apolo}</div>
                            </div>
                        </div>
                    )}


                    <div className='mb-3'>
                        <label htmlFor='motivo' className='form-label'>
                            Descripcion de la Impuntualidad / Ausencia
                        </label>
                        {seletedDetails && (
                            <div className='text-muted'>
                                <div className='title-metas'>{seletedDetails.Descripcion}</div>
                            </div>
                        )}
                    </div>

                </div>


                <div className='p-2 mb-2'>
                    <div className=''>
                        <label htmlFor='floatingTextarea2' className='text-muted'>Observación</label>
                        <textarea
                            value={Observacion_1}
                            onChange={(e) => setObservacion_1(e.target.value)}
                            className='form-control'
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='neutral' onClick={handleCloseCancel}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' value='Rechazado' color='success' onClick={() => { onSubmit('Rechazado'); }} >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default AcceptsAndRejectsTardinessWFM