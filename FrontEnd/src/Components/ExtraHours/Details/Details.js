import React from 'react';

const Details = ({ Modal, openDetailsHourExtra, selectedDetailsHoursExtra, handleCloseModalDetailsHourExtra }) => {
    return (
        <>
            <Modal
                title='Descripción'
                open={openDetailsHourExtra}
                onCancel={handleCloseModalDetailsHourExtra}
                footer={null}
            >
                <div className=''>
                    {selectedDetailsHoursExtra && (
                        <>
                            <div className='d-flex mb-3'>
                                <div className='text-muted'>
                                    {selectedDetailsHoursExtra.Nombre_Aprobador ? (
                                        <>
                                            {selectedDetailsHoursExtra.Nombre_Aprobador} ha {selectedDetailsHoursExtra.Estado} tus horas extras
                                        </>
                                    ) : ['Pendiente']}
                                </div>
                                <div className='p-2'>

                                </div>
                            </div>
                            <div className='fw-bold text-muted'>Motivo</div>
                            <div className='text-muted'>
                                {selectedDetailsHoursExtra.Observaciones ? selectedDetailsHoursExtra.Observaciones : ('Sin motivos')}
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default Details