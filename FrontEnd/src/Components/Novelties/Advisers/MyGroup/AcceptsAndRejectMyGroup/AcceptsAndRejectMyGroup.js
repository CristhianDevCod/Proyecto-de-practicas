import React from 'react'

const AcceptsAndRejectMyGroup = ({ Modal, openModalOpenAndAccepts, handleCloseModalAcceptsAndRejectAccepts, WarningRoundedIcon, handleCloseModalAcceptsAndRejectReject, Button, handleObservacion, observacion, handleRejectNotificationNoveltie, handleAcceptNotificationNovelties, openModalOpenAndRejects }) => {
    return (
        <>
            <Modal
                title={
                    <div className='mb-3 d-flex'>
                        <div className='p-2'>
                            <WarningRoundedIcon color='warning' fontSize='medium' />
                        </div>
                        <div className='p-2'>
                            <p className='lead'>¿Deseas pre-aprobar esta novedad?</p>
                        </div>
                    </div>
                }
                footer={null}
                open={openModalOpenAndAccepts}
                onCancel={handleCloseModalAcceptsAndRejectAccepts}
            >

                <div className='p-2 mb-2'>
                    <div className=''>
                        <label htmlFor='floatingTextarea2' className='text-muted'>Observación</label>
                        <textarea
                            value={observacion}
                            onChange={handleObservacion}
                            className='form-control'
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='neutral' onClick={handleCloseModalAcceptsAndRejectAccepts}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='success' onClick={handleAcceptNotificationNovelties}>
                            Aceptar
                        </Button>
                    </div>
                </div>

            </Modal >

            <Modal
                title={
                    <div className='mb-3 d-flex'>
                        <div className='p-2'>
                            <WarningRoundedIcon color='warning' fontSize='medium' />
                        </div>
                        <div className='p-2'>
                            <p className='lead'>¿Deseas rechazar esta novedad?</p>
                        </div>
                    </div>
                }
                footer={null}
                open={openModalOpenAndRejects}
                onCancel={handleCloseModalAcceptsAndRejectReject}
            >
                <div className='p-2 mb-2'>
                    <div className=''>
                        <label htmlFor='floatingTextarea2' className='text-muted'>Observación</label>
                        <textarea
                            value={observacion}
                            onChange={handleObservacion}
                            className='form-control'
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='neutral' onClick={handleCloseModalAcceptsAndRejectAccepts}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2 mb-2'>
                        <Button size='sm' variant='soft' color='success' onClick={handleRejectNotificationNoveltie} >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default AcceptsAndRejectMyGroup;