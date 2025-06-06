import React, { useContext, useEffect, useState } from 'react';
import Service from '../../../Machine/Service';
import { UserProfileContext } from '../../../Context/ProfileContex'
import apiClient from '../../../Service/Service';

// Componente para generar el exporte del socio completo
const SocioCompleto = ({ XLSX, api, contextHolder }) => {
    const { userProfile } = useContext(UserProfileContext);
    const { Servidor } = Service();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [listClientPermissions, setListClientPermissions] = useState([]);


    useEffect(() => {
        const getListClients = async () => {
            try {
                const response = await apiClient.get(`http://${Servidor}/API/GET-USER-PERMISSIONS-CLIENT/${userProfile.user}`)
    
                if (response.status === 200) {
                    const permissions =  response.data;
                    setListClientPermissions(permissions);
                 
                } else {
                    api.error({
                        message: 'No se puedo obtener los permiso para el exporte del socio completo'
                    })
                }
            } catch (error) {
                api.error({
                    message: 'Error al obtnener los datos para exportalos'
                });
            }

        }

        getListClients();
    }, [api, userProfile.user, Servidor])

    // Obtener la fecha actual para calcular el valor máximo del campo de entrada "mes"
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
    const maxMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // Formatear el mes a dos dígitos

    // Establecer el valor máximo del campo de entrada "mes"
    const maxDate = `${currentYear}-${maxMonth}`;
    const exportToXLSX = async () => {
        setIsLoading(true);
        try {
            const mes = `${selectedMonth}-01`;

            let Clientes = listClientPermissions.map((item) => {
                return item.Cliente_Permiso;
            });
            const Cliente = Clientes.join(',');
            const response = await apiClient.get(`http://${Servidor}/API/EXPORTS/DATA/SOCIODEMOGRAPHY-COMPLETE/${mes}/${Cliente}`);
            const data = response.data;

            if (data.length === 0) {
                // Mostrar notificación de que no hay resultados para el mes seleccionado
                api.info({
                    message: 'Información',
                    description: 'No hay resultados para el mes seleccionado.',
                });
            } else {
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const fullFileName = `Sociodemográfico Completo.xlsx`;
                XLSX.writeFile(wb, fullFileName);
            }

            setIsLoading(false);

            // Mostrar notificación de éxito si se descargaron resultados
            if (data.length > 0) {
                api.success({
                    message: 'Éxito',
                    description: 'La descarga se ha completado con éxito.',
                });
            }

            const focusListener = () => {
                setIsLoading(false);
                window.removeEventListener('focus', focusListener);
            };
            window.addEventListener('focus', focusListener);
        } catch (error) {
            console.error('Error exporting data:', error);
            setIsLoading(false);
            // Mostrar notificación de error si la descarga falla
            api.error({
                message: 'Error',
                description: 'Ha ocurrido un error al exportar los datos. Porfavor selecciona otro mes',
            });
        }
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
    return (
        <>
            {contextHolder}
            <div className='d-flex'>
                <div className='p-2 flex-grow-1 align-self-center'>
                    <div className='title-exports-shifts'>
                        <i className='bi bi-grid-fill' id='icons-files-exports' /> Sociodemográfico Completo
                    </div>
                </div>
                <div className='p-2'>
                    <input
                        id='monthPicker'
                        className='form-control'
                        type='month'
                        name='mes'
                        max={maxDate}
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    />
                </div>
                <div className='p-2'>
                    <button
                        className='btn btn-sm btn-primary'
                        disabled={!selectedMonth}
                        onClick={exportToXLSX}
                    >
                        {isLoading ? (
                            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                        ) : (
                            <i className='bi bi-download' />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SocioCompleto;
