import React, { useState } from 'react';
import Service from '../../../../../Machine/Service';
import apiClient from '../../../../../Service/Service';

const ExportShiftAdministrativo = ({ api, XLSX, fullName }) => {
    const { Servidor } = Service();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setIsLoading] = useState(false);
    const Servicio = fullName.map((item) => { return item.Servicio });

    const maxDays = 60;
    const maxStartDate = new Date(); // Fecha actual
    maxStartDate.setDate(maxStartDate.getDate() + 15); // 15 días en el futuro

    const handleStartDateChange = (event) => {
        const selectedDate = event.target.value;
        setStartDate(selectedDate);

        // Validar si selectedDate no está vacío
        if (selectedDate) {
            const maxEndDate = new Date(selectedDate);
            maxEndDate.setDate(new Date(selectedDate).getDate() + maxDays);
            setEndDate(maxEndDate.toISOString().split('T')[0]);
        } else {
            // Si selectedDate está vacío, reiniciar endDate
            setEndDate('');
        }
    };

    const handleEndDateChange = async (event) => {
        const selectedDate = event.target.value;
        setEndDate(selectedDate);
    };

    const handleExportClick = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`http://${Servidor}/API/GET-EXPORT/SHIFTS-ADMINISTRATIVOS/?startDate=${startDate}&endDate=${endDate}&Service=${Servicio}`);
            const data = response.data;
            

            // Filtra los datos para eliminar el campo "Documento"
            const filteredData = data.map((item) => {
                const { Documento, ...rest } = item;
                return rest;
            });

            api.success({
                message: 'Datos exportados correctamente!!!'
            });

            const ws = XLSX.utils.json_to_sheet(filteredData); // Usa los datos filtrados
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const fullFileName = `Turnos Administrativos.xlsx`;
            XLSX.writeFile(wb, fullFileName);
            setIsLoading(false);

            const focusListener = () => {
                setIsLoading(false);
                window.removeEventListener('focus', focusListener);
            };

            window.addEventListener('focus', focusListener);
        } catch (error) {
            setIsLoading(false);
            api.error({
                message: `Error al exportar los datos!!!`
            });
        };
    };
    return (
        <>
            <div className='d-flex'>
                <div className='p-2 flex-grow-1 align-self-center'>
                    <div className='title-exports-shifts'>
                        <i className='bi bi-calendar-check-fill color-icon-shift' /> Turnos Administrativo
                    </div>
                </div>
                <div className='d-flex align-self-end'>
                    <div className='p-2'>
                        <input
                            type='date'
                            id='startDate'
                            value={startDate}
                            className='form-control'
                            onChange={handleStartDateChange}
                            max={maxStartDate.toISOString().split('T')[0]} // Establecer fecha máxima
                        />
                    </div>
                    <div className='p-2'>
                        <input
                            type='date'
                            id='endDate'
                            max={endDate}
                            value={endDate}
                            min={startDate}
                            disabled={!startDate}
                            className='form-control'
                            onChange={handleEndDateChange}
                        />
                    </div>
                </div>
                <div className='p-2 align-self-center'>
                    <button className='btn btn-sm btn-primary'
                        disabled={!startDate}
                        onClick={handleExportClick}
                    >
                        {loading ? (
                            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                        ) : (
                            <i className='bi bi-download' />
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ExportShiftAdministrativo