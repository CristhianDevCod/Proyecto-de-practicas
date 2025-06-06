import React from 'react'

const DetailsMyGroup = ({ Modal, handleCloseModal, selectedDetails, openModal }) => {
    return (
        <Modal
            title={<div className='modal-title details-label-boss mb-4'>Detalles de novedad laboral</div>}
            width={1000}
            footer={null}
            open={openModal}
            onCancel={handleCloseModal}
        >
            {selectedDetails && (
                <div className='details-container'>
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
                </div>
            )}

        </Modal>
    )
}

export default DetailsMyGroup