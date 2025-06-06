import React, { useState, useEffect, useContext } from 'react'

import Service from '../../../Machine/Service';
import { UserProfileContext } from '../../../Context/ProfileContex';
import apiClient from '../../../Service/Service';


const Feeling = ({ XLSX, api, contextHolder }) => {
    const { userProfile } = useContext(UserProfileContext);
    const { Servidor } = Service();
    const [isLoading, setIsLoading] = useState(false);
    const [listClientPermissions, setListClientPermissions] = useState([]);

    useEffect(() => {
        const getAllDataFeeling = async () => {
            try {
                const response = await apiClient.get(`http://${Servidor}/API/GET-USER-PERMISSIONS-CLIENT/${userProfile.user}`)
                if (response.status === 200) {
                    const data = await response.data;
                    setListClientPermissions(data);
                } else {
                    api.error({
                        message: 'No se puedo obtner los permiso para el exporte de Feeling'
                    })
                }
            } catch (error) {
                api.error({
                    message: 'Error al obtnener los datos para exportalos'
                });
            }
        }
        getAllDataFeeling();
    }, [api, userProfile.user, Servidor]);

    const exportToXLSX = async () => {
        setIsLoading(true);
        try {
            let Clientes = listClientPermissions.map((item) => {
                return item.Cliente_Permiso;
            });
            const Cliente = Clientes.join(',');
            const response = await apiClient.get(`http://${Servidor}/API/EXPORTS/DATA/FEELING/${Cliente}`);
            const data = response.data;

            if (data.lenght === 0) {
                api.info({
                    message: 'Información',
                    description: 'No hay resultados para el mes seleccionado.',
                });
            } else {
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const fullFileName = `Feeling.xlsx`;
                XLSX.writeFile(wb, fullFileName);
            }

            setIsLoading(true);
            if (data.length > 0) {
                api.success({
                    message: 'Éxito',
                    description: 'La descarga se ha completado con éxito.',
                });
            }
            // Agregar un event listener para el evento 'focus'
            const focusListener = () => {
                setIsLoading(false); // Reactivar el botón después de que el usuario regrese a la ventana
                window.removeEventListener('focus', focusListener); // Eliminar el event listener
            };


            // Agregar el event listener al evento 'focus'
            window.addEventListener('focus', focusListener);
        } catch (error) {
            console.error('Error exporting data:', error);
            setIsLoading(false);
        }
    };


    return (
        <>
            {contextHolder}
            <div className='d-flex'>
                <div className='p-2 flex-grow-1 align-self-center'>
                    <div className='title-exports-shifts'>
                        <i className='bi bi-grid-fill' id='icons-files-exports' /> Feeling
                    </div>
                </div>
                <div className='d-flex align-self-end'>

                </div>
                <div className='p-2 align-self-center'>
                    <button className='btn btn-sm btn-primary'
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
    )
}

export default Feeling