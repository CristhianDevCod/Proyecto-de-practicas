import React from 'react';
import LogotipoA from '../../../../Assets/LogotipoA.png'

const DetailsNotificationNovelties = ({ Modal, openDetails, hanldeCloseModalDetails, seletedNotificationNovelties, Grid, ItemContentModal }) => {
    return (
        <Modal
            width={1000}
            footer={null}
            open={openDetails}
            onCancel={hanldeCloseModalDetails}
        >
            <div style={Styles.WatermarkContainer}>
                <img src={LogotipoA} alt="Marca de agua" style={Styles.WatermarkImage} />
            </div>
            <div style={Styles.AntModalBody}>
                {seletedNotificationNovelties && (

                    <>
                        <Grid container spacing={2} alignItems="center" width='100%' justifyContent='center'>
                            <Grid item>
                                <img src={LogotipoA} alt="Marca de agua" style={Styles.Logo} />
                            </Grid>
                            <Grid item xs>
                                <ItemContentModal className='mb-3'>
                                    <div style={Styles.titles_Form}>NOVEDAD LABORAL</div>
                                </ItemContentModal>

                                <ItemContentModal sx={Styles}>
                                    <div style={Styles.titles_Form}>{seletedNotificationNovelties.Nombre_Completo}</div>
                                </ItemContentModal>
                            </Grid>
                            <Grid item>
                                <ItemContentModal className='mb-3'>
                                    <div style={Styles.titles_Form}>{seletedNotificationNovelties.Fecha_Solicitud}</div>
                                </ItemContentModal>

                                <ItemContentModal>
                                    <div style={Styles.titles_Form}>{seletedNotificationNovelties.Hora_Solicitud}</div>
                                </ItemContentModal>
                            </Grid>
                        </Grid>

                        <hr />

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='cliente' className='form-label d-flex'>
                                    Cliente Area
                                </label>
                                {seletedNotificationNovelties && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{seletedNotificationNovelties.Cliente_Area}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='cargo' className='form-label d-flex'>
                                    Cargo
                                </label>
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedNotificationNovelties.Cargo}</div>
                                </div>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='servicio' className='form-label d-flex'>
                                    Servicio
                                </label>
                                {seletedNotificationNovelties && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{seletedNotificationNovelties.Servicio}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                            </div>
                        </div>

                        <hr />

                        <div className='details-label-boss'>Solicitud</div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Tipo_Solicitud' className='form-label d-flex'>
                                    Tipo Solicitud
                                </label>
                                {seletedNotificationNovelties && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{seletedNotificationNovelties.Tipo_Solicitud}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Fecha_Inicio_Novedad' className='form-label d-flex'>
                                    Fecha Inicio Novedad
                                </label>
                                {seletedNotificationNovelties && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{seletedNotificationNovelties.Fecha_Inicio_Novedad}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Fecha_Fin_Novedad' className='form-label d-flex'>
                                    Fecha Fin Novedad
                                </label>
                                <div className='text-muted'>
                                    <div className='datails-value'>{seletedNotificationNovelties.Fecha_Fin_Novedad}</div>
                                </div>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Dias_Calendario' className='form-label d-flex'>
                                    Dias Calendario
                                </label>
                                {seletedNotificationNovelties && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{seletedNotificationNovelties.Dias_Calendario}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Dias_Laborales' className='form-label d-flex'>
                                    Dias Laborales
                                </label>
                                <div className='text-muted'>
                                    <div className='datails-value'>{seletedNotificationNovelties.Dias_Laborales}</div>
                                </div>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Time_Money' className='form-label d-flex'>
                                    Tiempo en Dinero
                                </label>
                                {seletedNotificationNovelties && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{seletedNotificationNovelties.Time_Money}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='How_Long' className='form-label d-flex'>
                                    ¿Cuanto tiempo?
                                </label>
                                <div className='text-muted'>
                                    <div className='title-metas'>{seletedNotificationNovelties.How_Long}</div>
                                </div>
                            </div>
                        </div>


                        <div className='row align-items-center'>
                            {seletedNotificationNovelties.Numero_Incapacidad && (
                                <div className='col mb-3'>
                                    <label style={Styles.titles_Form} htmlFor='Numero_Incapacidad' className='form-label d-flex'>
                                        Numero Incapacidad
                                    </label>
                                    {seletedNotificationNovelties && (
                                        <div className='text-muted'>
                                            <div className='details-value' >{seletedNotificationNovelties.Numero_Incapacidad}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {seletedNotificationNovelties.Numero_Diagnostico && (

                                <div className='col mb-3'>
                                    <label style={Styles.titles_Form} htmlFor='Numero_Diagnostico' className='form-label d-flex'>
                                        Numero Diagnostico
                                    </label>
                                    <div className='text-muted'>
                                        <div className='title-metas'>{seletedNotificationNovelties.Numero_Diagnostico}</div>
                                    </div>
                                </div>
                            )}

                            {seletedNotificationNovelties.Nombre_Incapacidad && (

                                <div className='col mb-3'>
                                    <label style={Styles.titles_Form} htmlFor='Nombre_Incapacidad' className='form-label d-flex'>
                                        Nombre Incapacidad
                                    </label>
                                    <div className='text-muted'>
                                        <div className='title-metas'>{seletedNotificationNovelties.Nombre_Incapacidad}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='details-label-boss'>Motivo</div>
                        <div className='text-muted'>{seletedNotificationNovelties.Motivo}</div>

                        <hr />


                        <div className='details-label-boss'>Escalamientos</div>

                        <div className='details-label-boss'>Jefe Inmediato</div>
                        <div className='row aling-items-center mb-2'>
                            <div className='col mb-3'>
                                <div className='details-label'>Fecha </div>
                                <div className='details-value' >{seletedNotificationNovelties.Fecha_Respuesta_Jefe_Inmediato ? seletedNotificationNovelties.Fecha_Respuesta_Jefe_Inmediato : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Hora </div>
                                <div className='details-value' >{seletedNotificationNovelties.Hora_Respuesta_Jefe_Inmediato ? seletedNotificationNovelties.Hora_Respuesta_Jefe_Inmediato : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Aprobador </div>
                                <div className='details-value' >{seletedNotificationNovelties.Aprobador_Jefe_Inmediato ? seletedNotificationNovelties.Aprobador_Jefe_Inmediato : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Estado </div>
                                <div className='details-value' >{seletedNotificationNovelties.Estado_Marcado_Jefe_Inmediato ? seletedNotificationNovelties.Estado_Marcado_Jefe_Inmediato : '-'}</div>
                            </div>
                        </div>

                        <div className='details-row'>
                            <div className='details-label'>Nota Jefe Inmediato </div>
                        </div>

                        <div className='text-muted'>{seletedNotificationNovelties.Observacion_Jefe_Inmediato}</div>

                        <hr />

                        <div className='details-label-boss'>Gerente</div>
                        <div className='row aling-items-center mb-2'>
                            <div className='col mb-3'>
                                <div className='details-label'>Fecha </div>
                                <div className='details-value' >{seletedNotificationNovelties.Fecha_Respuesta_Gerente_Area ? seletedNotificationNovelties.Fecha_Respuesta_Gerente_Area : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Hora </div>
                                <div className='details-value' >{seletedNotificationNovelties.Hora_Respuesta_Gerente_Area ? seletedNotificationNovelties.Hora_Respuesta_Gerente_Area : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Aprobador </div>
                                <div className='details-value' >{seletedNotificationNovelties.Aprobador_Gerente_Area ? seletedNotificationNovelties.Aprobador_Gerente_Area : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Estado </div>
                                <div className='details-value' >{seletedNotificationNovelties.Estado_Marcado_Gerente_Area ? seletedNotificationNovelties.Estado_Marcado_Gerente_Area : '-'}</div>
                            </div>
                        </div>

                        <div className='details-row'>
                            <div className='details-label'>Nota Gerente </div>
                        </div>

                        <div className='text-muted'>{seletedNotificationNovelties.Observacion_Gerente_Area}</div>

                        <hr />

                        <div className='details-label-boss'>Planeación</div>
                        <div className='row aling-items-center mb-2'>
                            <div className='col mb-3'>
                                <div className='details-label'>Fecha </div>
                                <div className='details-value' >{seletedNotificationNovelties.Fecha_Respuesta_Planeacion ? seletedNotificationNovelties.Fecha_Respuesta_Planeacion : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Hora </div>
                                <div className='details-value' >{seletedNotificationNovelties.Hora_Respuesta_Planeacion ? seletedNotificationNovelties.Hora_Respuesta_Planeacion : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Aprobador </div>
                                <div className='details-value' >{seletedNotificationNovelties.Aprobador_Planeacion ? seletedNotificationNovelties.Aprobador_Planeacion : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Estado </div>
                                <div className='details-value' >{seletedNotificationNovelties.Estado_Marcado_Planeacion ? seletedNotificationNovelties.Estado_Marcado_Planeacion : '-'}</div>
                            </div>
                        </div>

                        <div className='details-row'>
                            <div className='details-label'>Nota Planeación </div>
                        </div>

                        <div className='text-muted'>{seletedNotificationNovelties.Observacion_Planeacion}</div>

                        <hr />


                        <div className='details-label-boss'>Nómina</div>
                        <div className='row aling-items-center mb-2'>
                            <div className='col mb-3'>
                                <div className='details-label'>Fecha </div>
                                <div className='details-value' >{seletedNotificationNovelties.Fecha_Aprobador_Gestion_Humana ? seletedNotificationNovelties.Fecha_Aprobador_Gestion_Humana : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Hora </div>
                                <div className='details-value' >{seletedNotificationNovelties.Hora_Aprobador_Gestion_Humana ? seletedNotificationNovelties.Hora_Aprobador_Gestion_Humana : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Aprobador </div>
                                <div className='details-value' >{seletedNotificationNovelties.Aprobador_Gestion_Humana ? seletedNotificationNovelties.Aprobador_Gestion_Humana : '-'}</div>
                            </div>
                            <div className='col mb-3'>
                                <div className='details-label'>Estado </div>
                                <div className='details-value' >{seletedNotificationNovelties.Estado_Marcado_Gestion_Humana ? seletedNotificationNovelties.Estado_Marcado_Gestion_Humana : '-'}</div>
                            </div>
                        </div>
                        <div className='details-row'>
                            <div className='details-label'>Nota Punto Helpi </div>
                        </div>
                        <div className='text-muted'>{seletedNotificationNovelties.Observacion_Gestion_Humana}</div>
                    </>

                )}
            </div>
        </Modal>
    );
};

const Styles = {
    WatermarkContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alingSelf: 'center',
        justifyContent: 'center',
    },
    WatermarkImage: {
        marginTop: '15%',
        position: 'absolute',
        opacity: '0.09', /* Ajusta la opacidad según lo necesario */
        zIndex: '0',
        width: '70%', /* Ajusta el tamaño según lo necesario */
        height: 'auto',
        pointerEvents: 'none', /* Esto asegura que no interfiera con otros elementos */
    },
    ModalTitle: {
        position: 'relative',
        zIndex: 1, /* Asegura que el título esté por encima de la marca de agua */
    },
    AntModalBody: {
        position: 'relative',
        zIndex: 1, // Asegura que el contenido del modal esté por encima de la marca de agua
        // height: '400px', // Ajusta según la altura del contenido
        overflowY: 'auto', // Añade el scroll vertical
        padding: '20px', // Ajusta según sea necesario
    },
    Logo: {
        width: '70px',
        height: '70px',
    },
    titles_Form: {
        fontSize: '15px',
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        color: 'black'
    },
};

export default DetailsNotificationNovelties;


