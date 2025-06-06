import { React, useEffect, useState, ArrowLeftRoundedIcon, ArrowRightRoundedIcon, Modal, notification } from '../../Exports-Modules/Exports'
import Button from '@mui/joy/Button';
import Service from '../../Machine/Service';
import { User_Permissions, getAllCargos } from '../../API/API';
import apiClient from '../../Service/Service';

const ChangePositions = () => {
    const [api, contextHolder] = notification.useNotification();
    const { Servidor } = Service();
    const [dataUsers, setData] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [listCargos, setListCargos] = useState([]);
    const [originData, setOriginData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [selectUser, setSelectUser] = useState(null);
    const [newPosition, setNewPosition] = useState('');

    const rowsPerPage = 15;

    const getData = async () => {
        const data = await User_Permissions();
        setData(data);
        setOriginData(data);
    };

    const getDataCargos = async () => {
        const data = await getAllCargos();
        setListCargos(data);
    };

    useEffect(() => {
        getData();
        getDataCargos();
    }, []);


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



    //Función de filtro por nombre o por el avaya
    const Filtrar = (search) => {
        var resultSeacrh = originData.filter((element) => {
            if (
                element.Documento.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                element.Nombres.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                element.Usuario_Red.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
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

    const handleChangePosition = (name) => {
        setOpenModal(true);
        setSelectUser(name);
    };
    const handleCloseChangePosition = () => {
        setOpenModal(false);
    };

    const onSubmitChange = async () => {
        try {
            const response = await apiClient.put(`http://${Servidor}/API/UPDATE/POSITION/USER/${newPosition}/${selectUser.Documento}`)
            if (response) {
                api.success({
                    message: `${response.data}`,
                    duration: 5,
                })
                setOpenModal(false);
                getData();
            } else {
                console.log('Error');
            }
            // setOpenModal(false);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            {contextHolder}
            <div className='text-center'>
                <div className='mb-0 title-import'>Permisos para usuarios</div>
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
                                <th className='font-weight-bold' scope='col'>Cargo</th>
                                <th className='font-weight-bold' scope='col'>Cliente</th>
                                <th className='font-weight-bold' scope='col'>Servicios</th>
                                <th className='font-weight-bold' scope='col'>Cambio cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData && currentPageData.map((data) => (
                                <tr key={data.Documento}>
                                    <td className='text-muted'>{data.Documento}</td>
                                    <td className='text-muted'>{data.Nombres} {data.Apellidos}</td>
                                    <td className='text-muted'>{data.Usuario_Red}</td>
                                    <td className='text-muted'>{data.Cargo}</td>
                                    <td className='text-muted'>{data.Cliente_Area}</td>
                                    <td className='text-muted'>{data.Servicio}</td>
                                    <td>
                                        <button onClick={() => handleChangePosition(data)} className='btn btn-secondary btn-sm' type='button'>
                                            <i className='bi bi-key-fill' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Modal
                        width={1000}
                        title='Cambio de cargo'
                        footer={null}
                        open={openModal}
                        onCancel={handleCloseChangePosition}
                    >
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th >Documento</th>
                                    <th >Nombre</th>
                                    <th >Usuario Red</th>
                                    <th >Cliente</th>
                                    <th >Cargo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectUser && (
                                    <tr>
                                        <th scope='row'>{selectUser.Documento}</th>
                                        <td>{`${selectUser.Nombres} ${selectUser.Apellidos}`}</td>
                                        <td>{selectUser.Usuario_Red}</td>
                                        <td>{selectUser.Cliente_Area}</td>
                                        <td>{selectUser.Cargo}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <select
                            type='text'
                            value={newPosition}
                            className='form-select'
                            placeholder='Nuevo Cargo'
                            onChange={(e) => setNewPosition(e.target.value)}
                        >
                            <option value=''>Nuevo Cargo</option>
                            {listCargos && listCargos.map((cargos) => {
                                return (
                                    <option key={cargos.ID_Cargo} value={cargos.Cargo}>{cargos.Cargo}</option>
                                )
                            })}
                        </select>
                        <button onClick={onSubmitChange} disabled={!newPosition} className='btn btn-primary mt-3'>Guardar Cambio</button>
                    </Modal>




                </div>
            </div>
        </>
    );
};

export default ChangePositions;
