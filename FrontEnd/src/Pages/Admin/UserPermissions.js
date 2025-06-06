import { React, useEffect, useState, List, ExpandMoreIcon, Typography, ArrowLeftRoundedIcon, ArrowRightRoundedIcon } from '../../Exports-Modules/Exports'
import Button from '@mui/joy/Button';

import { Accordion, AccordionSummary, AccordionDetails } from '../Home/Styles/Styles';
import { User_Permissions } from '../../API/API';

const UserPermissions = () => {
    const [dataUsers, setData] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [originData, setOriginData] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    const getData = async () => {
        const data = await User_Permissions();
        setData(data);
        setOriginData(data);
    };

    useEffect(() => {
        getData();
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

    const handleModuleClick = (name) => {
        setSelectUser(name);
    };

    const handleClientClick = (name) => {
        setSelectUser(name);
    };


    return (
        <>
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
                                <th className='font-weight-bold' scope='col'>Cliente</th>
                                <th className='font-weight-bold' scope='col'>Servicios</th>
                                <th className='font-weight-bold' scope='col'>Permisos</th>
                                <th className='font-weight-bold' scope='col'>Clientes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData && currentPageData.map((data) => (
                                <tr key={data.Documento}>
                                    <td className='text-muted'>{data.Documento}</td>
                                    <td className='text-muted'>{data.Nombres} {data.Apellidos}</td>
                                    <td className='text-muted'>{data.Usuario_Red}</td>
                                    <td className='text-muted'>{data.Cliente_Area}</td>
                                    <td className='text-muted'>{data.Servicio}</td>
                                    <td>
                                        <button onClick={() => handleModuleClick(data.Nombres)} className='btn btn-secondary btn-sm' type='button' data-bs-toggle='modal' data-bs-target='#ModalPermissionsModule'>
                                            <i className='bi bi-key-fill' />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleClientClick(data.Nombres)} className='btn btn-secondary btn-sm' type='button' data-bs-toggle='modal' data-bs-target='#ModalPermissionsClient'>
                                            <i className='bi bi-key-fill' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='modal fade' id='ModalPermissionsModule' tabIndex='-1' data-bs-backdrop='static' data-bs-keyboard='false' aria-hidden='true'>
                <div className='modal-dialog  modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-title text-lowercase' id='exampleModalLabel'>Permisos para: <div className='text-lowercase fw-bolder'>{selectUser}</div></div>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <List>

                                {/*Turnos*/}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Turnos</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.1 Mis Turnos
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.2 Turnos Mi Equipo
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.3 Importar Turnos
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.4 Exportar Turnos
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {/*Novedades*/}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Novedades</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.1 Mis Novedades
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.2 Novedades Mi Equipo
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.3 Importar Novedades
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.4 Exportar Novedades
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {/*Exportables*/}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Exportables</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    3.1 Feeling
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    3.2 Exportable Socio Completo
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    3.2 Exportable Socio Operacion
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {/* Admin */}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Admin</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    0.0 Administración
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>Guardar</button>
                        </div>
                    </div>
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
                            <List>

                                {/*Turnos*/}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Turnos</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.1 Mis Turnos
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.2 Turnos Mi Equipo
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.3 Importar Turnos
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    1.4 Exportar Turnos
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {/*Novedades*/}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Novedades</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.1 Mis Novedades
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.2 Novedades Mi Equipo
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.3 Importar Novedades
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    2.4 Exportar Novedades
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {/*Exportables*/}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Exportables</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    3.1 Feeling
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    3.2 Exportable Socio Completo
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    3.2 Exportable Socio Operacion
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                {/* Admin */}
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className='title-modulos' variant='subtitle1'>Admin</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                                                <label className='form-check-label' >
                                                    0.0 Administración
                                                </label>
                                            </div>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default UserPermissions;
