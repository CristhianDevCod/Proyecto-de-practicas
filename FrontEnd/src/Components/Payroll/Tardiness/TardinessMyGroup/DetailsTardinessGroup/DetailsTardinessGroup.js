import React from 'react'

const DetailsTardinessGroup = ({ Modal, seletedDetails, open, handleCloseModalDetailsTardiness, ItemContentModal }) => {
    const formatedDate = (date) => {
        const dates = new Date(date);
        const day = dates.getDay();
        const month = (dates.getMonth() + 1);
        const year = dates.getFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <>
            <Modal
                width={800}
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
                                    <div className='title-metas'>{seletedDetails.Fecha_Solicitud ? seletedDetails.Fecha_Solicitud : '-'}</div>
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

                    <hr />
                    {seletedDetails && (
                        <>
                            <div className='row aling-items-center mb-2'>
                                <div className='col mb-3'>
                                    <div className='form-label'>Fecha </div>
                                    <div className='text-muted'>{seletedDetails.Fecha_Aprobador_1 ? formatedDate(seletedDetails.Fecha_Aprobador_1) : '-'}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Hora </div>
                                    <div className='text-muted'>{seletedDetails.Hora_Aprobador_1}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>1er Aprobador </div>
                                    <div className='text-muted'>{seletedDetails.Aprobador_1}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Estado Marcado </div>
                                    <div className='text-muted'>{seletedDetails.Estado_Marcado_Aprobador_1}</div>
                                </div>
                            </div>

                            <div className='row aling-items-center mb-2'>
                                <div className='col mb-3'>
                                    <div className='form-label'>Fecha </div>
                                    <div className='text-muted'>{formatedDate(seletedDetails.Fecha_Aprobador_2)}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Hora </div>
                                    <div className='text-muted'>{seletedDetails.Hora_Aprobador_2}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>2do Aprobador </div>
                                    <div className='text-muted'>{seletedDetails.Aprobador_2}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Estado Marcado </div>
                                    <div className='text-muted'>{seletedDetails.Estado_Marcado_Aprobador_2}</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>


            </Modal>
        </>
    )
}

export default DetailsTardinessGroup