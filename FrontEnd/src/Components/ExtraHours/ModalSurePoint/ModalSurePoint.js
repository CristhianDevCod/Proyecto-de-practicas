import React from 'react';

const ModalSurePoint = ({ Modal, openModalSurePoint, handleCloseModalSurePoint, Button, onSubmit }) => {
    return (
        <Modal
            title=''
            width={800}
            footer={null}
            open={openModalSurePoint}
            onCancel={handleCloseModalSurePoint}
        >
            <div className='card border-light'>
                <div className='card-body'>

                    <div className='alert alert-warning' role='alert' style={{ fontSize: '18px', marginBottom: '20px' }}>
                        <strong>¡Recuerda!</strong> Una vez que finalices el turno programado, cierra la aplicación "Sistema de Punto" y vuelve a abrirla para que se reflejen tus horas extras.
                    </div>

                    <div className='d-flex justify-content-end'>
                        <div className='p-2'>
                            <Button variant='soft' color='success' size='sm' onClick={onSubmit}>
                                Solicitar
                            </Button>
                        </div>
                        <div className='p-2'>
                            <Button variant='soft' color='neutral' size='sm' onClick={handleCloseModalSurePoint}>
                                Cancelar
                            </Button >
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default ModalSurePoint;