import React from 'react'

const ModalDetails = ({ selectedRowData }) => {
    return (
        <div className='modal-body'>
            {selectedRowData && (
                <>
                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Nombre completo envía:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Nombre_Completo_Envia}</p>
                            <hr />
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Nombre completo recibe:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Nombre_Completo_Recibe}</p>
                            <hr />
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Fecha envío:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Fecha_Envio}</p>
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Hora de envío:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Hora_Envio}</p>
                        </div>
                    </div>


                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Día trabajo actual:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Dia_Trabajo_Actual}</p>
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Día trabajo futuro:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Dia_Trabajo_Futuro}</p>
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Día descanso actual:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Dia_Descanso_Actual}</p>
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Día descanso futuro:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Dia_Descanso_Futuro}</p>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Cliente envía:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Cliente_Area_Envia}</p>
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Cliente recibe:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Cliente_Area_Recibe}</p>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Jefe inmediato:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Jefe_Inmediato_Envia}</p>
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Tipo cambio:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Tipo_Cambio}</p>
                        </div>
                    </div>

                    <hr />
                    <div className='row mb-4'>
                        <div className='col-4'>
                            <h6 className='text-muted'>Fecha respuesta:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Fecha_Respuesta}</p>
                        </div>
                        <div className='col-4'>
                            <h6 className='text-muted'>Hora respuesta:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Hora_Respuesta}</p>
                        </div>
                        <div className='col-4'>
                            <h6 className='text-muted'>Servicio recibe:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Servicio_Recibe}</p>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-4'>
                            <h6 className='text-muted'>Jefe inmediato recibe:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Jefe_Inmediato_Recibe}</p>
                        </div>
                        <div className='col-4'>
                            <h6 className='text-muted'>Respuesta recibe:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Respuesta_Recibe}</p>
                        </div>
                        <div className='col-4'>
                            <h6 className='text-muted'>Fecha marcación final:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Fecha_Marcacion_Final}</p>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-4'>
                            <h6 className='text-muted'>Hora marcación final:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Hora_Marcacion_Final}</p>
                        </div>
                        <div className='col-4'>
                            <h6 className='text-muted'>Nombre aprobador final:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Nombre_Aprobador_Final}</p>
                        </div>
                        <div className='col-4'>
                            <h6 className='text-muted'>Estado marcación final:</h6>
                            <p className='' id='text-dates'>{selectedRowData.Estado_Marcacion_Final}</p>
                        </div>
                    </div>

                    <hr />

                    <div className='row mb-4'>
                        <div className='col-6'>
                            <h6 className='text-muted'>Mensaje envía:</h6>
                            <div id='text-dates'>
                                {selectedRowData.Mensaje_Envia}
                            </div>
                        </div>
                        <div className='col-6'>
                            <h6 className='text-muted'>Mensaje recibe:</h6>
                            <div id='text-dates'>
                                {selectedRowData.Mensaje_Recibe}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ModalDetails