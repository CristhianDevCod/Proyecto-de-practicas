import React from 'react'

const DetailsTardiness = ({ Modal, openDetails, handleCloseDetails, selectDetails, ItemContentModal }) => {
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
                title={<h2 className='modal-title text-muted mb-4'>Detalles de la {selectDetails && (<>{selectDetails.Tipo_Impuntualidad}</>)}</h2>}
                footer={null}
                open={openDetails}
                onCancel={handleCloseDetails}
                width={800}
            >
                <ItemContentModal>
                    {selectDetails && (
                        <div>
                            <div className='text-muted'>
                                Nombre / Apellidos
                                <div className='title-metas'>{selectDetails.Nombre_Completo}</div>
                            </div>

                            <div className='text-muted'>
                                Documento de Identidad
                                <div className='title-metas'>{selectDetails.Documento}</div>
                            </div>

                            <div className='text-muted'>
                                Cargo
                                <div className='title-metas'>{selectDetails.Cargo}</div>
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
                            {selectDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{selectDetails.Tipo_Impuntualidad}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha Inicio Impuntualidad
                            </label>
                            {selectDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{selectDetails.Fecha_Solicitud ? selectDetails.Fecha_Solicitud : '-'}</div>
                                </div>
                            )}
                        </div>

                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha Fin Impuntualidad
                            </label>
                            {selectDetails && (
                                <div className='text-muted'>
                                    <div className='title-metas'>{selectDetails.Fecha_Fin_Solicitud ? selectDetails.Fecha_Fin_Solicitud : '-'}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {selectDetails && selectDetails.Numero_Apolo && (
                        <div className='col mb-3'>
                            <label htmlFor='NumeroApolo' className='form-label d-flex'>
                                Número de Apolo
                            </label>
                            <div className='text-muted'>
                                <div className='title-metas'>{selectDetails.Numero_Apolo}</div>
                            </div>
                        </div>
                    )}



                    {selectDetails && selectDetails.Descripcion && (
                        <div className='mb-3'>
                            <label htmlFor='motivo' className='form-label'>
                                Descripcion de la Impuntualidad
                            </label>
                            <div className='text-muted'>
                                <div className='title-metas'>{selectDetails.Descripcion}</div>
                            </div>
                        </div>
                    )}

                    {selectDetails && selectDetails.Observacion_1 && (
                        <div className='col mb-3'>
                            <label htmlFor='Observacion_1' className='form-label d-flex'>
                                Observacion de:
                            </label>
                            <label htmlFor='Observacion_1' className='form-label'>
                                <div className='title-metas'>{selectDetails.Aprobador_1} - {selectDetails.Estado_Marcado_Aprobador_1}</div>
                            </label>
                            <div className='text-muted'>
                                <textarea
                                    readOnly
                                    defaultValue={selectDetails.Observacion_1}
                                    className='text-muted form-control'
                                />
                            </div>
                        </div>
                    )}

                    {selectDetails && selectDetails.Observacion_2 && (
                        <div className='col mb-3'>
                            <label htmlFor='Observacion_2' className='form-label d-flex'>
                                Observacion de:
                            </label>
                            <label htmlFor='Observacion_2' className='form-label'>
                                <div className='title-metas'>{selectDetails.Aprobador_2} - {selectDetails.Estado_Marcado_Aprobador_2}</div>
                            </label>
                            <div className='text-muted'>
                                <textarea
                                    readOnly
                                    defaultValue={selectDetails.Observacion_2}
                                    className='text-muted form-control'
                                />
                            </div>
                        </div>
                    )}

                    <hr />
                    {selectDetails && (
                        <>
                            <div className='row aling-items-center mb-2'>
                                <div className='col mb-3'>
                                    <div className='form-label'>Fecha </div>
                                    <div className='text-muted'>{selectDetails.Fecha_Aprobador_1 ? formatedDate(selectDetails.Fecha_Aprobador_1) : '-'}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Hora </div>
                                    <div className='text-muted'>{selectDetails.Hora_Aprobador_1}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>1er Aprobador </div>
                                    <div className='text-muted'>{selectDetails.Aprobador_1}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Estado Marcado </div>
                                    <div className='text-muted'>{selectDetails.Estado_Marcado_Aprobador_1}</div>
                                </div>
                            </div>

                            <div className='row aling-items-center mb-2'>
                                <div className='col mb-3'>
                                    <div className='form-label'>Fecha </div>
                                    <div className='text-muted'>{formatedDate(selectDetails.Fecha_Aprobador_2)}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Hora </div>
                                    <div className='text-muted'>{selectDetails.Hora_Aprobador_2}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>2do Aprobador </div>
                                    <div className='text-muted'>{selectDetails.Aprobador_2}</div>
                                </div>

                                <div className='col mb-3'>
                                    <div className='form-label'>Estado Marcado </div>
                                    <div className='text-muted'>{selectDetails.Estado_Marcado_Aprobador_2}</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </Modal>
        </>
    )
}

export default DetailsTardiness