import React from 'react';

const Modals = ({ Modal, WarningRoundedIcon, openAccept, handleCloseModalAccept, observaciones, handlesetObservaciones, Button, handleAcceptHourExtra, openReject, handleCloseModalReject, handleRejectHourExtra }) => {
    return (
        <>
            {/*MODAL DE ACEPTADO*/}
            <Modal
                title={
                    <div className='mb-3 d-flex'>
                        <div className='p-2'>
                            <WarningRoundedIcon color='warning' fontSize='medium' />
                        </div>
                        <div className='p-2'>
                            <p className='lead'>¿Deseas aceptar las horas extras?</p>
                        </div>
                    </div>
                }
                open={openAccept}
                onCancel={handleCloseModalAccept}
                footer={null}
            >

                <div className='p-2 mb-2'>
                    <div className=''>
                        <label htmlFor='floatingTextarea2' className='text-muted'>Observación</label>
                        <textarea className='form-control' value={observaciones} onChange={handlesetObservaciones} />
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='neutral' onClick={handleCloseModalAccept}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='success' onClick={handleAcceptHourExtra}>
                            Aceptar
                        </Button>
                    </div>
                </div>

            </Modal>

            {/*MODAL DE RECHAZADO*/}
            <Modal
                title={
                    <div className='mb-3 d-flex'>
                        <div className='p-2'>
                            <WarningRoundedIcon color='warning' fontSize='medium' />
                        </div>
                        <div className='p-2'>
                            <p className='lead'>¿Deseas rechazar las horas extras?</p>
                        </div>
                    </div>
                }
                open={openReject}
                onCancel={handleCloseModalReject}
                footer={null}
            >

                <div className='p-2 mb-2'>
                    <div className=''>
                        <label htmlFor='floatingTextarea2' className='text-muted'>Observación</label>
                        <textarea className='form-control' value={observaciones} onChange={handlesetObservaciones} />
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='neutral' onClick={handleCloseModalReject}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='danger' onClick={handleRejectHourExtra}>
                            Rechazar
                        </Button>
                    </div>
                </div>

            </Modal>
        </>
    )
}

export default Modals;