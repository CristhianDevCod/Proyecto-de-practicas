import React from 'react';
import LogotipoA from '../../../../../Assets/LogotipoA.png';


const DetailsWFM = ({ Modal, handleCloseModal, selectedDetails, openModal, Grid, ItemContentModal }) => {


    return (
        <Modal
            title={<div className='modal-title details-label-boss mb-4'>Detalles de novedad laboral</div>}
            width={1000}
            footer={null}
            open={openModal}
            onCancel={handleCloseModal}
        >
            <div style={Styles.WatermarkContainer}>
                <img src={LogotipoA} alt="Marca de agua" style={Styles.WatermarkImage} />
            </div>
            <div style={Styles.AntModalBody}>
                {selectedDetails && (

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
                                    <div style={Styles.titles_Form}>{selectedDetails.Nombre_Completo}</div>
                                </ItemContentModal>
                            </Grid>
                            <Grid item>
                                <ItemContentModal className='mb-3'>
                                    <div style={Styles.titles_Form}>{selectedDetails.Fecha_Solicitud}</div>
                                </ItemContentModal>

                                <ItemContentModal>
                                    <div style={Styles.titles_Form}>{selectedDetails.Hora_Solicitud}</div>
                                </ItemContentModal>
                            </Grid>
                        </Grid>

                        <hr />

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='cliente' className='form-label d-flex'>
                                    Cliente Area
                                </label>
                                {selectedDetails && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{selectedDetails.Cliente_Area}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='cargo' className='form-label d-flex'>
                                    Cargo
                                </label>
                                <div className='text-muted'>
                                    <div className='title-metas'>{selectedDetails.Cargo}</div>
                                </div>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='servicio' className='form-label d-flex'>
                                    Servicio
                                </label>
                                {selectedDetails && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{selectedDetails.Servicio}</div>
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
                                {selectedDetails && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{selectedDetails.Tipo_Solicitud}</div>
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
                                {selectedDetails && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{selectedDetails.Fecha_Inicio_Novedad}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Fecha_Fin_Novedad' className='form-label d-flex'>
                                    Fecha Fin Novedad
                                </label>
                                <div className='text-muted'>
                                    <div className='datails-value'>{selectedDetails.Fecha_Fin_Novedad}</div>
                                </div>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Dias_Calendario' className='form-label d-flex'>
                                    Dias Calendario
                                </label>
                                {selectedDetails && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{selectedDetails.Dias_Calendario}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Dias_Laborales' className='form-label d-flex'>
                                    Dias Laborales
                                </label>
                                <div className='text-muted'>
                                    <div className='datails-value'>{selectedDetails.Dias_Laborales}</div>
                                </div>
                            </div>
                        </div>

                        <div className='row align-items-center'>
                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='Time_Money' className='form-label d-flex'>
                                    Tiempo en Dinero
                                </label>
                                {selectedDetails && (
                                    <div className='text-muted'>
                                        <div className='details-value' >{selectedDetails.Time_Money}</div>
                                    </div>
                                )}
                            </div>

                            <div className='col mb-3'>
                                <label style={Styles.titles_Form} htmlFor='How_Long' className='form-label d-flex'>
                                    ¿Cuanto tiempo?
                                </label>
                                <div className='text-muted'>
                                    <div className='title-metas'>{selectedDetails.How_Long}</div>
                                </div>
                            </div>
                        </div>


                        <div className='row align-items-center'>
                            {selectedDetails.Numero_Incapacidad && (
                                <div className='col mb-3'>
                                    <label style={Styles.titles_Form} htmlFor='Numero_Incapacidad' className='form-label d-flex'>
                                        Numero Incapacidad
                                    </label>
                                    {selectedDetails && (
                                        <div className='text-muted'>
                                            <div className='details-value' >{selectedDetails.Numero_Incapacidad}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedDetails.Numero_Diagnostico && (

                                <div className='col mb-3'>
                                    <label style={Styles.titles_Form} htmlFor='Numero_Diagnostico' className='form-label d-flex'>
                                        Numero Diagnostico
                                    </label>
                                    <div className='text-muted'>
                                        <div className='title-metas'>{selectedDetails.Numero_Diagnostico}</div>
                                    </div>
                                </div>
                            )}

                            {selectedDetails.Nombre_Incapacidad && (

                                <div className='col mb-3'>
                                    <label style={Styles.titles_Form} htmlFor='Nombre_Incapacidad' className='form-label d-flex'>
                                        Nombre Incapacidad
                                    </label>
                                    <div className='text-muted'>
                                        <div className='title-metas'>{selectedDetails.Nombre_Incapacidad}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='details-label-boss'>Motivo</div>
                        <div className='details-value'>{selectedDetails.Motivo ? selectedDetails.Motivo : ''}</div>

                    </>

                )}
            </div>

        </Modal >
    )
}


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

export default DetailsWFM