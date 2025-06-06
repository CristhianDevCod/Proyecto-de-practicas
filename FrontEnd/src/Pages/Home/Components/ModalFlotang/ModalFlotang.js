import React from 'react';
import Button from '@mui/joy/Button';
import { Modal } from '../../../../Exports-Modules/Exports';

const ModalFlotang = ({ modalOpen, handleModalClose }) => {
    return (
        <Modal
            width={700}
            footer={null}
            open={modalOpen}
            onCancel={handleModalClose}
        >
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1 text-center'>
                            <div className='text-muted form-label'>Reporte de inquietud</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='p-2 flex-grow-1'>
                        <label className='text-muted form-label' htmlFor='InputHorasExtra'>Tipo de inquietud</label>
                        <select className='form-select form-select-sm'>
                            <option value=''>Seleccione...</option>
                            <option value='30'>Novedad</option>
                            <option value='60'>Nomina</option>
                            <option value='90'>Turnos</option>
                            <option value='120'>Turnos dobles</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='motivo' className='form-label d-flex'>
                            Comentario
                        </label>
                        <textarea
                            className='form-control'
                            placeholder='Escribe una pequeña descripción sobre tu inquietud'
                        />
                    </div>
                    <div className='d-flex flex-row-reverse'>
                        <div className='p-2'>
                            <Button variant='soft' color='danger' size='sm' onClick={handleModalClose} >
                                Cancelar
                            </Button>
                        </div>
                        <div className='p-2'>
                            <Button variant='soft' color='success' size='sm' >
                                Enviar
                            </Button>
                        </div>
                    </div>

                </div>


            </div>

        </Modal>
    );
};

export default ModalFlotang;