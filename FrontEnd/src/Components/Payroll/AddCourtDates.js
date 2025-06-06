import { AddCourtDatesPayrrolls } from '../../API/API';
import { React, useState, Modal, Button, Box, CheckCircleRoundedIcon, notification, AddRoundedIcon } from '../../Exports-Modules/Exports';
import apiClient from '../../Service/Service';
import { Item } from './Styles/Styles';

const AddCourtDates = ({ getCourtsDates, openAddCourtDate, closeModalAddCourtDate }) => {
    const { AddCourtDatesPayrroll } = AddCourtDatesPayrrolls();
    const [api, contextHolder] = notification.useNotification();
    const [formData, setFormData] = useState({ mes: '', fecha_pago: '', inicio_corte: '', fin_corte: '', plazo_reporte_novedades: '' });

    // Obtener fecha actual y calcular el rango permitido
    const today = new Date();
    const fifteenDaysAgo = new Date(today);
    fifteenDaysAgo.setDate(today.getDate() - 20);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // const maxDate = formatDate(today);
    const minDate = formatDate(fifteenDaysAgo);

    // Generar dinámicamente el listado de meses
    const generateMonths = () => {
        const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(0, i); // Enero es mes 0
            return formatter.format(date).toUpperCase(); // Retorna el nombre del mes en mayúsculas
        });
    };
    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    function clearStates() {
        setFormData({
            mes: '',
            fecha_pago: '',
            inicio_corte: '',
            fin_corte: '',
            plazo_reporte_novedades: ''
        })
    }
    // Manejar el envío del formulario
    const handleSubmit = async () => {
        try {
            await apiClient.put(AddCourtDatesPayrroll, formData)
                .then((response) => {
                    api.success({
                        message: `${response.data}`,
                        duration: 60
                    });

                })
                .catch((error) => {
                    api.error({
                        message: `${error.response.data}`,
                        duration: 60
                    });
                });

            closeModalAddCourtDate();
            clearStates();
            getCourtsDates();
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            {contextHolder}
            <Modal
                open={openAddCourtDate}
                onCancel={closeModalAddCourtDate}
                footer={null}
            >
                <div style={{ padding: '20px' }}>

                    <Box sx={{ flexGrow: 1, mb: 5 }}>
                        <Item elevation={10}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <CheckCircleRoundedIcon fontSize='large' className='color-icon-accepts' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted'>Añadir nueva fecha de corte</div>
                                </div>
                            </div>
                        </Item>
                    </Box>
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">
                            <label htmlFor="mes" className=" text-muted form-label">Mes</label>
                            <select
                                id='mes'
                                className='form-control form-select'
                                name="mes"
                                value={formData.mes}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un mes</option>
                                {generateMonths().map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-2 flex-grow-1">
                            <label htmlFor="date_payrrol" className=" text-muted form-label">Fecha de Pago</label>
                            <input
                                id='date_payrrol'
                                className='form-control'
                                placeholder="Fecha de Pago"
                                name="fecha_pago"
                                type="date"
                                value={formData.fecha_pago}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">
                            <label htmlFor="Inicio_Corte" className=" text-muted form-label">Inicio del Corte</label>
                            <input
                                id='Inicio_Corte'
                                className='form-control'
                                placeholder="Inicio del Corte"
                                name="inicio_corte"
                                type="date"
                                min={minDate}
                                value={formData.inicio_corte}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="p-2 flex-grow-1">
                            <label htmlFor="Fin_Corte" className=" text-muted form-label">Fin del Corte</label>
                            <input
                                id='Fin_Corte'
                                className='form-control'
                                placeholder="Fin del Corte"
                                name="fin_corte"
                                type="date"
                                min={formData.inicio_corte}
                                value={formData.fin_corte}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">
                            <label htmlFor="plazo_reporte_novedades" className=" text-muted form-label">Plazo Reporte Novedades</label>
                            <input
                                id='plazo_reporte_novedades'
                                className='form-control'
                                placeholder="plazo reporte novedades"
                                name="plazo_reporte_novedades"
                                type="date"
                                min={minDate}
                                value={formData.plazo_reporte_novedades}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="p-2 flex-grow-1">
                        </div>
                    </div>


                    <Button
                        variant='outlined'
                        startIcon={<AddRoundedIcon />}
                        onClick={handleSubmit}
                        disabled={!formData.mes || !formData.fecha_pago || !formData.inicio_corte || !formData.fin_corte || !formData.plazo_reporte_novedades}
                    >
                        Agregar Fecha de Corte
                    </Button>
                </div>
            </Modal>
        </>
    );
};


export default AddCourtDates;
