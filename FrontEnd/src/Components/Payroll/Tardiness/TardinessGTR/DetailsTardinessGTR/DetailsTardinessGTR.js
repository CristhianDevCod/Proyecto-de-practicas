import React from 'react'

const DetailsTardinessGTR = ({ Modal, seletedDetails, open, handleCloseModalDetailsTardiness, ItemContentModal }) => {
    return (
        <>
            <Modal
                title={<h2 className='modal-title text-muted mb-4'>Detalles de {seletedDetails && (<>{seletedDetails.Tipo_Impuntualidad}</>)}</h2>}
                open={open}
                footer={null}
                onCancel={handleCloseModalDetailsTardiness}>
                <ItemContentModal>
                    {seletedDetails && (
                        <div>
                            <div className='text-muted'>
                                Nombre / Apellidos
                                <div className='title-metas'>{seletedDetails.Nombre_Completo}</div>
                            </div>

                            <div className='text-muted'>
                                Documento de Identidad
                                <div className='title-metas'>{seletedDetails.Documento}</div>
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
                                Tipo de impuntualidad
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Tipo_Impuntualidad}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha Inicio Impuntualidad
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Fecha_Solicitud ? seletedDetails.Fecha_Solicitud: '-'}</div>
                                </div>
                            )}
                        </div>

                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha Fin Impuntualidad
                            </label>
                            {seletedDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedDetails.Fecha_Fin_Solicitud ? seletedDetails.Fecha_Fin_Solicitud : '-'}</div>
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
                            Descripcion de la Impuntualidad
                        </label>
                        {seletedDetails && (
                            <div className='text-muted'>
                                <div className='title-metas'>{seletedDetails.Descripcion}</div>
                            </div>
                        )}
                    </div>

                </div>


            </Modal>
        </>
    )
}

export default DetailsTardinessGTR