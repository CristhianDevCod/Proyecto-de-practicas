import { React, useEffect, useState, notification, ArrowLeftRoundedIcon, ArrowRightRoundedIcon } from '../../Exports-Modules/Exports'
import Button from '@mui/joy/Button';
import { PERMISSIONSCLIENTSNOVELTIES, User_Permissions, getAllListClient } from '../../API/API';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

const AddClientPermissionsNoveltie = () => {
    const [api, contextHolder] = notification.useNotification();
    const { Servidor } = Service();
    const [dataUsers, setData] = useState([]);
    const [dataClient, setDataClient] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [busqueda, setBusqueda] = useState('');
    const [originData, setOriginData] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    const [selectedClients, setSelectedClients] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [action, setActionArray] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [areAllPermissionsSelected, setAreAllPermissionsSelected] = useState(false);
    const rowsPerPage = 15;
    const getData = async () => {
        const data = await User_Permissions();
        setData(data);
        setOriginData(data);
    };
    const getDataClient = async () => {
        const data = await getAllListClient();
        setDataClient(data);
    };

    useEffect(() => {
        getData();
        getDataClient();
    }, []);


    const clearPermissions = () => {
        setSelectedClients([]);
        setUserPermissions([]);
    };

    //Función de filtro por nombre o por el avaya
    const Filtrar = (search) => {
        var resultSeacrh = originData.filter((element) => {
            if (
                element.Documento.toString().toLowerCase().includes(search.toLowerCase()) ||
                element.Nombres.toString().toLowerCase().includes(search.toLowerCase()) ||
                element.Apellidos.toString().toLowerCase().includes(search.toLowerCase()) ||
                element.Usuario_Red.toString().toLowerCase().includes(search.toLowerCase())
            ) {
                return element;
            }
            return false;
        });
        setData(resultSeacrh);
    };


    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        Filtrar(e.target.value);
    };

    const handleClientClick = (clientName) => {
        setSelectUser(clientName);
        getUserPermissions(clientName);
    };


    const handleClientClickClient = (clientName, isChecked) => {
        setActionArray(isChecked ? 'insert' : 'delete');
        if (clientName === 'selectAll') {
            // Si se selecciona/deselecciona 'Seleccionar todos', actualiza todos los permisos y checkboxes.
            setSelectAll(isChecked);
            setSelectedClients(isChecked ? dataClient.map((client) => client.Nombre_Cliente_Permisos) : []);
            return;
        }

        setSelectedClients((prevSelectedClients) => {
            if (isChecked) {
                return [...prevSelectedClients, clientName];
            } else {
                // return clientName;
                return prevSelectedClients.filter((name) => name !== clientName);
            }
        });

        setUserPermissions((prevPermissions) => {
            if (!isChecked) {
                return prevPermissions.filter((p) => p.Cliente_Permiso !== clientName);
            } else {
                return [...prevPermissions, { Cliente_Permiso: clientName }];
            }
        });
    };

    const getUserPermissions = async (usuarioRed) => {
        // Realiza una solicitud para obtener los permisos del usuario utilizando la ruta del endpoint
        try {
            const response = await PERMISSIONSCLIENTSNOVELTIES(usuarioRed);
            if (response.length > 0) {
                clearPermissions();
                setUserPermissions(response);
            } else {
                clearPermissions();
                api.error({
                    message: `El usuario ${usuarioRed} no tiene permisos asignados`
                })
            }
        } catch (error) {
            clearPermissions();
            api.error({ message: 'ERROR', description: 'Error en la solicitud' });
        }
    };

    const selectAllPermissions = () => {
        const allClientNames = dataClient.map((client) => client.Nombre_Cliente_Permisos);
        const existingPermissions = userPermissions.map((permiso) => permiso.Cliente_Permiso);

        const permissionsToInsert = allClientNames.filter((clientName) => !existingPermissions.includes(clientName));

        // Actualiza los estados con los nuevos permisos seleccionados.
        setSelectedClients([...selectedClients, ...permissionsToInsert]);
        setUserPermissions([...userPermissions, ...permissionsToInsert.map((clientName) => ({ Cliente_Permiso: clientName }))]);
    };



    useEffect(() => {
        // Verifica si todos los permisos individuales están seleccionados
        const allPermissionsSelected = dataClient.filter((client) =>
            selectedClients.includes(client.Nombre_Cliente_Permisos) || userPermissions.some((permiso) => permiso.Cliente_Permiso === client.Nombre_Cliente_Permisos)
        );
        setAreAllPermissionsSelected(allPermissionsSelected);
    }, [dataClient, selectedClients, userPermissions]);


    const savePermissions = async () => {
        try {
            const clientePermiso = userPermissions.map((permiso) => permiso.Cliente_Permiso);
            const permisosMarcados = selectedClients;
            const permissionsDelete = clientePermiso.filter((permiso) => !permisosMarcados.includes(permiso));

            if (action === 'delete') {
                // Realiza la eliminación de permisos desmarcados
                const response = await apiClient.put(`http://${Servidor}/API/INSERT-PERMISSIONS-CLIENT/PUT/NOVEDADES/`, {
                        action: action,
                        Cliente_Permiso: permissionsDelete,
                        Usuario_Red: selectUser,
                });

                if (!response.status === 200) {
                    clearPermissions();
                    api.error({ message: 'Error', description: 'Error al eliminar permisos.', duration: 15 });
                    return;
                }
            } else if (action === 'insert') {
                selectAllPermissions();
                const response = await apiClient.put(`http://${Servidor}/API/INSERT-PERMISSIONS-CLIENT/PUT/NOVEDADES/`, {    
                        action: action,
                        Cliente_Permiso: permisosMarcados,
                        Usuario_Red: selectUser,
                });

                if (!response.status === 200) {
                    clearPermissions();
                    api.error({ message: 'Error', description: 'Error al insertar permisos.', duration: 15 });
                    return;
                }
            }

            api.success({
                message: 'Éxito!',
                description: 'Permisos actualizados correctamente!',
                duration: 15
            });
            clearPermissions();
        } catch (error) {
            clearPermissions();
            api.error({ message: 'Error', description: 'Error al guardar permisos.', duration: 15 });
        }
    };

    //paginacion de la tabla
    const handleShowNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handleShowPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    //paginacion
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, dataUsers.length);
    const currentPageData = dataUsers.slice(startIndex, endIndex);








    return (
        <>
            {contextHolder}
            <div className='text-center'>
                <div className='mb-0 title-import'>Permisos de clientes novedades</div>
            </div>

            <div className='card border-light'>
                <div className='card-body'>
                    <div className='d-flex bd-highlight'>
                        <div className='p-2 flex-grow-1 bd-highlight'>
                            <div className='p-2 me-auto'></div>
                        </div>
                        <div className='p-2 bd-highlight mb-3'>
                            <input value={busqueda} onChange={handleBusqueda} placeholder='Buscar...' type='search' className='form-control p-2' />
                        </div>
                        <div className='p-2'>
                            {currentPage > 1 && (
                                <Button variant='solid' color='primary' size='sm' onClick={handleShowPreviousPage}><ArrowLeftRoundedIcon fontSize='medium' /></Button>
                            )}
                        </div>
                        <div className='p-2'>
                            {currentPage * rowsPerPage < dataUsers.length && (
                                <Button variant='solid' color='primary' size='sm' onClick={handleShowNextPage}><ArrowRightRoundedIcon fontSize='medium' /></Button>
                            )}
                        </div>
                    </div>
                    <table className='table table-sm table-borderless table-hover'>
                        <thead >
                            <tr>
                                <th className='font-weight-bold' scope='col'>Documento</th>
                                <th className='font-weight-bold' scope='col'>Nombre</th>
                                <th className='font-weight-bold' scope='col'>Usuario red</th>
                                <th className='font-weight-bold' scope='col'>Permisos cliente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData && currentPageData.map((data) => (
                                <tr key={data.Documento}>
                                    <td className='text-muted'>{data.Documento}</td>
                                    <td className='text-muted'>{data.Apellidos} {data.Nombres}</td>
                                    <td className='text-muted'>{data.Usuario_Red}</td>
                                    <td>
                                        <button onClick={() => handleClientClick(data.Usuario_Red)} className='btn btn-secondary btn-sm' type='button' data-bs-toggle='modal' data-bs-target='#ModalPermissionsClient'>
                                            <i className='bi bi-key-fill' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className='modal fade' id='ModalPermissionsClient' tabIndex='-1' data-bs-backdrop='static' data-bs-keyboard='false' aria-hidden='true'>
                <div className='modal-dialog  modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-title text-lowercase' id='exampleModalLabel'>Permisos para: <div className='text-lowercase fw-bolder'>{selectUser}</div></div>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='d-flex'>
                                <div className='d-flex'>
                                    <div className='p-2 flex-grow-1'>
                                        listado de Clientes
                                    </div>
                                    <div className='p-2'>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={selectAll}
                                                onChange={(e) => handleClientClickClient('selectAll', e.target.checked)}
                                            />
                                            <label className='form-check-label'>
                                                {areAllPermissionsSelected ? 'seleccionar todos los permisos' : 'seleccionar todos los permisos'}
                                            </label>
                                        </div>
                                    </div>
                                    <div className='p-2'>

                                    </div>
                                </div>
                            </div>

                            {dataClient && dataClient.map((client) => (
                                <tr key={client.Id_Cliente_Permisos}>
                                    <td>
                                        <input
                                            type='checkbox'
                                            checked={selectedClients.includes(client.Nombre_Cliente_Permisos) || userPermissions.some((permiso) => permiso.Cliente_Permiso === client.Nombre_Cliente_Permisos)}
                                            onChange={(e) => handleClientClickClient(client.Nombre_Cliente_Permisos, e.target.checked)}
                                        />
                                    </td>
                                    <td>{client.Nombre_Cliente_Permisos}</td>
                                </tr>
                            ))}
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={savePermissions}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default AddClientPermissionsNoveltie;


