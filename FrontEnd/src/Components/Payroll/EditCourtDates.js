import { React, useEffect, useState } from 'react';
import { Modal, Button, notification } from '../../Exports-Modules/Exports';
import apiClient from '../../Service/Service';
import Service from '../../Machine/Service';

const EditCourtDates = ({
    openEditCourtDate,
    closeModalEditCourtDate,
    getCourtsDates,
    selectedCourtDate
}) => {
    const { Servidor } = Service();
    const [api, contextHolder] = notification.useNotification();

    // Estados locales para los inputs
    const [mes, setMes] = useState('');
    const [fechaPago, setFechaPago] = useState('');
    const [inicioCorte, setInicioCorte] = useState('');
    const [finCorte, setFinCorte] = useState('');
    const [plazo_reporte_novedades, setplazo_reporte_novedades] = useState('');

    // Cada vez que "selectedCourtDate" cambie, llenamos los estados locales
    useEffect(() => {
        if (selectedCourtDate) {
            setMes(selectedCourtDate.mes || '');
            setFechaPago(selectedCourtDate.fecha_pago || '');
            setInicioCorte(selectedCourtDate.inicio_corte || '');
            setFinCorte(selectedCourtDate.fin_corte || '');
            setplazo_reporte_novedades(selectedCourtDate.plazo_reporte_novedades || '');
        }
    }, [selectedCourtDate]);

    const generateMonths = () => {
        const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(0, i);
            return formatter.format(date).toUpperCase();
        });
    };

    // Manejador para confirmar la edición
    const handleUpdate = async () => {
        try {
            await apiClient.put(`http://${Servidor}/API/EDIT/CORTES/NOMINA/`, { mes, fechaPago, inicioCorte, finCorte, plazo_reporte_novedades, id_corte: selectedCourtDate.id_corte })
                .then((response) => {
                    api.success({
                        message: `${response.data}`,
                        duration: 30
                    });

                })
                .catch((error) => {
                    api.error({
                        message: `${error.response.data}`,
                        duration: 30
                    });
                });
            getCourtsDates();
            closeModalEditCourtDate();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={openEditCourtDate}
                onCancel={closeModalEditCourtDate}
                footer={null}
            >
                <div style={{ padding: '1rem' }}>
                    <h3>Editar Fecha de Corte</h3>

                    <div className='mb-3'>
                        <select
                            id='mes'
                            className='form-control form-select'
                            name="mes"
                            value={mes}
                            onChange={(e) => setMes(e.target.value)}
                        >
                            <option value="">Seleccione un mes</option>
                            {generateMonths().map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label>Fecha de Pago</label>
                        <input
                            type='date'
                            className='form-control'
                            value={fechaPago}
                            onChange={(e) => setFechaPago(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label>Inicio Corte</label>
                        <input
                            type='date'
                            className='form-control'
                            value={inicioCorte}
                            onChange={(e) => setInicioCorte(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label>Fin Corte</label>
                        <input
                            type='date'
                            className='form-control'
                            value={finCorte}
                            onChange={(e) => setFinCorte(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label>Plazo Reporte Novedades</label>
                        <input
                            type='date'
                            className='form-control'
                            value={plazo_reporte_novedades}
                            onChange={(e) => setplazo_reporte_novedades(e.target.value)}
                        />
                    </div>

                    <div className='text-end'>
                        <Button
                            variant='contained'
                            color='error'
                            style={{ marginRight: '1rem' }}
                            onClick={closeModalEditCourtDate}
                        >
                            Cancelar
                        </Button>
                        <Button variant='contained' color='success' disabled={!mes || !fechaPago || !inicioCorte || !finCorte || !plazo_reporte_novedades} onClick={handleUpdate}>
                            Guardar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditCourtDates;
