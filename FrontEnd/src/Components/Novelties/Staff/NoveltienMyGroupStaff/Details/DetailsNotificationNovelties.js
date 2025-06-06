import React from 'react';

const DetailsNotificationNovelties = ({ Modal, openDetails, hanldeCloseModalDetails, seletedNotificationNovelties }) => {
    return (
        <Modal
            title={<div className='modal-title details-label-boss mb-4'>Detalles de novedad laboral</div>}
            width={1000}
            footer={null}
            open={openDetails}
            onCancel={hanldeCloseModalDetails}
        >
            {seletedNotificationNovelties && (
                <div className='details-container'>
                    <div className='details-row'>
                        <div className='details-label'>Fecha Solicitud </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Fecha_Solicitud}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Hora Solicitud</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Hora_Solicitud}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Nombre Completo</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Nombre_Completo}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Cliente Área</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Cliente_Area}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Cargo</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Cargo}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Servicio</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Servicio}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Tipo Solicitud</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Tipo_Solicitud}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Fecha Inicio Novedad</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Fecha_Inicio_Novedad}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Fecha Fin Novedad</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Fecha_Fin_Novedad}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Días Calendario</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Dias_Calendario}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Días Laborales</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Dias_Laborales}</div>
                    </div>

                    <div className='details-row'>
                        <div className='details-label'>Tiempo en dinero</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Time_Money}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Días</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.How_Long}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Numero de la Incapacidad</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Numero_Incapacidad}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Numero Diagnostico</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Numero_Diagnostico}</div>
                    </div>
                    <div className='details-row'>
                        <div className='details-label'>Nombre Diagnostico</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Nombre_Incapacidad}</div>
                    </div>



                    <div className='details-row'>
                        <div className='details-label'>Motivo</div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Motivo}</div>
                    </div>

                    <div className='details-row'>
                        <div className='details-label'>Nota Jefe Inmediato </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Observacion_Jefe_Inmediato ? seletedNotificationNovelties.Observacion_Jefe_Inmediato : '-'}</div>
                    </div>

                    <div className='details-row'>
                        <div className='details-label'>Nota Planeación </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Observacion_Planeacion ? seletedNotificationNovelties.Observacion_Planeacion : '-'}</div>
                    </div>


                    <div className='details-row'>
                        <div className='details-label'>Nota Gerente </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Observacion_Gerente_Area ? seletedNotificationNovelties.Observacion_Gerente_Area : '-'}</div>
                    </div>

                    <div className='details-row'>
                        <div className='details-label'>Nota Punto Helpi </div><div className='details-label'><i className='bi bi-caret-right-fill'></i></div>
                        <div className='details-value'>{seletedNotificationNovelties.Observacion_Gestion_Humana ? seletedNotificationNovelties.Observacion_Gestion_Humana : '-'}</div>
                    </div>



                    <hr />

                    <div className='details-label-boss'>Escalamientos</div>

                    <div className='details-label-boss'>Jefe Inmediato</div>
                    <div className='row aling-items-center mb-2'>
                        <div className='col mb-3'>
                            <div className='details-label'>Fecha </div>
                            <div className='details-value'>{seletedNotificationNovelties.Fecha_Respuesta_Jefe_Inmediato ? seletedNotificationNovelties.Fecha_Respuesta_Jefe_Inmediato : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Hora </div>
                            <div className='details-value'>{seletedNotificationNovelties.Hora_Respuesta_Jefe_Inmediato ? seletedNotificationNovelties.Hora_Respuesta_Jefe_Inmediato : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Aprobador </div>
                            <div className='details-value'>{seletedNotificationNovelties.Aprobador_Jefe_Inmediato ? seletedNotificationNovelties.Aprobador_Jefe_Inmediato : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Estado </div>
                            <div className='details-value'>{seletedNotificationNovelties.Estado_Marcado_Jefe_Inmediato ? seletedNotificationNovelties.Estado_Marcado_Jefe_Inmediato : '-'}</div>
                        </div>
                    </div>

                    <div className='details-label-boss'>Planeación</div>
                    <div className='row aling-items-center mb-2'>
                        <div className='col mb-3'>
                            <div className='details-label'>Fecha </div>
                            <div className='details-value'>{seletedNotificationNovelties.Fecha_Respuesta_Planeacion ? seletedNotificationNovelties.Fecha_Respuesta_Planeacion : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Hora </div>
                            <div className='details-value'>{seletedNotificationNovelties.Hora_Respuesta_Planeacion ? seletedNotificationNovelties.Hora_Respuesta_Planeacion : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Aprobador </div>
                            <div className='details-value'>{seletedNotificationNovelties.Aprobador_Planeacion ? seletedNotificationNovelties.Aprobador_Planeacion : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Estado </div>
                            <div className='details-value'>{seletedNotificationNovelties.Estado_Marcado_Planeacion ? seletedNotificationNovelties.Estado_Marcado_Planeacion : '-'}</div>
                        </div>
                    </div>

                    <div className='details-label-boss'>Gerente</div>
                    <div className='row aling-items-center mb-2'>
                        <div className='col mb-3'>
                            <div className='details-label'>Fecha </div>
                            <div className='details-value'>{seletedNotificationNovelties.Fecha_Respuesta_Gerente_Area ? seletedNotificationNovelties.Fecha_Respuesta_Gerente_Area : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Hora </div>
                            <div className='details-value'>{seletedNotificationNovelties.Hora_Respuesta_Gerente_Area ? seletedNotificationNovelties.Hora_Respuesta_Gerente_Area : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Aprobador </div>
                            <div className='details-value'>{seletedNotificationNovelties.Aprobador_Gerente_Area ? seletedNotificationNovelties.Aprobador_Gerente_Area : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Estado </div>
                            <div className='details-value'>{seletedNotificationNovelties.Estado_Marcado_Gerente_Area ? seletedNotificationNovelties.Estado_Marcado_Gerente_Area : '-'}</div>
                        </div>
                    </div>

                    <div className='details-label-boss'>Nómina</div>
                    <div className='row aling-items-center mb-2'>
                        <div className='col mb-3'>
                            <div className='details-label'>Fecha </div>
                            <div className='details-value'>{seletedNotificationNovelties.Fecha_Aprobador_Gestion_Humana ? seletedNotificationNovelties.Fecha_Aprobador_Gestion_Humana : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Hora </div>
                            <div className='details-value'>{seletedNotificationNovelties.Hora_Aprobador_Gestion_Humana ? seletedNotificationNovelties.Hora_Aprobador_Gestion_Humana : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Aprobador </div>
                            <div className='details-value'>{seletedNotificationNovelties.Aprobador_Gestion_Humana ? seletedNotificationNovelties.Aprobador_Gestion_Humana : '-'}</div>
                        </div>
                        <div className='col mb-3'>
                            <div className='details-label'>Estado </div>
                            <div className='details-value'>{seletedNotificationNovelties.Estado_Marcado_Gestion_Humana ? seletedNotificationNovelties.Estado_Marcado_Gestion_Humana : '-'}</div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default DetailsNotificationNovelties;