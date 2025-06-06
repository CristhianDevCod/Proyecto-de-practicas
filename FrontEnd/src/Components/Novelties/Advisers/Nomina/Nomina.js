import {
    Modal,
    React,
    useState,
    TextField,
    useContext,
    CloseRoundedIcon,
    CheckRoundedIcon,
    SearchRoundedIcon,
    WarningRoundedIcon,
    useCallback,
    FileDownloadRoundedIcon,
} from '../../../../Exports-Modules/Exports';
import * as XLSX from 'xlsx';
import Button from '@mui/joy/Button';
import { esES } from '@mui/x-data-grid';


import '../Styles/Styles.css';
import Service from '../../../../Machine/Service';
import { CustomNoRowsOverlay, CustomPagination, ItemContent, PAGE_SIZE, StyledDataGrid } from '../Styles/Styles';
import DetailsNomina from './DetailsNomina/DetailsNomina';
import { UserProfileContext } from '../../../../Context/ProfileContex';
import AcceptsAndRejectNomina from './AcceptsAndRejectNomina/AcceptsAndRejectNomina';
import { NotificationsContextNoveltie } from '../../../../Context/ContextNotificationNoveltie';
import { getAllNominaNovelties, PERMISSIONSCLIENTSNOMINA } from '../../../../API/API';
import apiClient from '../../../../Service/Service';

const Nomina = () => {
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const { socket, api, contextHolder } = useContext(NotificationsContextNoveltie);

    const [data, SetData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [observacion, setObservacion] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [openModalOpenAndAccepts, setOpenModalOpenAndAccepts] = useState(false);
    const [openModalOpenAndRejects, setOpenModalOpenAndReject] = useState(false);
    const [formDataNovelties, setFromDataNovelties] = useState({ Fecha_Inicio_Novedad_Editar: '', Fecha_Fin_Novedad_Editar: '', Motivo: '' });
    const [formDataNoveltiesAISL, setFromDataNoveltiesAISL] = useState({ Fecha_Inicio_Novedad_Editar: '', Fecha_Fin_Novedad_Editar: '', Motivo: '', Tipo_Novedad_Editar: '' });
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });



    const getDataForBoss = useCallback(async () => {
        setLoading(true);
        try {
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = response.map((item) => item.Cliente_Permiso);
            const Nominaresponse = await getAllNominaNovelties(Cliente);
            SetData(Nominaresponse);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    useState(() => {
        if (fullName && fullName.length > 0) {
            getDataForBoss();
        }
    }, [getDataForBoss, fullName]);

    const handleObservacion = (e) => {
        setObservacion(e.target.value);
    }


    const handleOpenModalAcceptsAndRejectAccepts = (params) => {
        setOpenModalOpenAndAccepts(true);
        setSelected(params.row);
    }
    const handleCloseModalAcceptsAndRejectAccepts = () => {
        setOpenModalOpenAndAccepts(false);
    }

    const handleOpenModalAcceptsAndRejectReject = (params) => {
        setOpenModalOpenAndReject(true);
        setSelected(params.row);
    }
    const handleCloseModalAcceptsAndRejectReject = () => {
        setOpenModalOpenAndReject(false);
    }

    //MANEJADORES DE EL MODAL DE DETALLES 
    const handleOpenModal = (params) => {
        setOpenModal(true);
        setSelected(params.row);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }


    //FUNCIONES DE EDICION DE LAS FECHAS DE LAS NOVEDADES
    const handleEditDateCal = ({ target }) => {
        const { name, value } = target;
        setFromDataNovelties({
            ...formDataNovelties,
            [name]: value
        })
    };

    //FUNCIONES DE EDICION DE LAS FECHAS DE LAS NOVEDADES DE AISLAMINETO
    const handleEditDateAISL = ({ target }) => {
        const { name, value } = target;
        setFromDataNoveltiesAISL({
            ...formDataNoveltiesAISL,
            [name]: value
        })
    };



    //MAXIMO DE DÍAS PARA PEDIR LA NOVEDAD 
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const thirtyDaysLater = new Date(tomorrow);
    thirtyDaysLater.setUTCDate(thirtyDaysLater.getUTCDate() + 30);
    const minDate = tomorrow.toISOString().split('T')[0];
    const maxDate = thirtyDaysLater.toISOString().split('T')[0];

    //FUNCION PARA QUE EL PUNTO HELPI ACEPTE LA SOLICITUD
    const handleAcceptNotificationNovelties = async () => {
        if (!socket) return;

        const Name = fullName && fullName.map((data) => data.Nombres);
        const LastName = fullName && fullName.map((data) => data.Apellidos);
        const Documento = fullName && fullName.map((data) => data.Documento);

        const documento = selected.Documento;
        const Servicio = selected.Servicio;

        const Tipo_Solicitud = selected.Tipo_Solicitud;

        //?MANDA LA INFO DE CALAMIDAD EN CASO TAL LOS DE NIMINA LO MODIFIQUE 
        if (socket && selectedDetails && selectedDetails.Tipo_Solicitud === 'CAL') {
            const Fecha_Inicio_Novedad = formDataNovelties.Fecha_Inicio_Novedad_Editar;
            const Fecha_Fin_Novedad = formDataNovelties.Fecha_Fin_Novedad_Editar;
            const Motivo = formDataNovelties.Motivo;

            socket.emit('sendNotificationToENDCAL', {
                ...selectedDetails,
                Id: selectedDetails.Id,
                Fecha_Inicio_Novedad: Fecha_Inicio_Novedad,
                Fecha_Fin_Novedad: Fecha_Fin_Novedad,
                Aprobador_Gestion_Humana: `${Name} ${LastName}`,
                Documento_Aprobador_Gestion_Humana: `${Documento}`,
                Observacion_Gestion_Humana: Motivo
            });
            api.success({
                message: 'Has aceptado la solicitud, y editado la novedad correctamente!',
            });
            try {
                // ! ACTUALIZA LOS TURNOS DE ACUERDO A LA NOVEDAD DE CALAMIDAD

                await apiClient.put(`http://${Servidor}/API/UPDATE/SHIFTS-FOR-NOMINA/ACCEPTS/`, { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud, Servicio })
                    .then(({ data }) => {

                    })
                    .catch(({ response }) => {
                        api.success({
                            message: `${response.data}`
                        });
                    });
            } catch (error) {
                console.log(error);
            }
            // ! ACTUALIZA LA TABLA DE NOVEDADES NOMINA  
            if (['LDF', 'LMA', 'LLT', 'ICCP', 'CAL'].includes(Tipo_Solicitud)) {
                try {
                    await apiClient.put(`http://${Servidor}/API/UPDATE/AL_NOVEDADES_NOMINA/`, { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud });
                } catch (error) {
                    console.log(error);
                    api.error({
                        message: `${error.response.data}`
                    });
                }
            }
            SetData(prevData => prevData.filter(item => item.Id !== selected.Id));
            handleCloseModal();
            handleCloseModalAcceptsAndRejectAccepts();

        }
        //?MANDA LA INFO DE AISLAMIENTO EN CASO TAL LOS DE NIMINA LO MODIFIQUE 
        else if (socket && selectedDetails && selectedDetails.Tipo_Solicitud === 'AISL') {
            const Fecha_Inicio_Novedad = formDataNoveltiesAISL.Fecha_Inicio_Novedad_Editar;
            const Fecha_Fin_Novedad = formDataNoveltiesAISL.Fecha_Fin_Novedad_Editar;
            const Tipo_Novedad = formDataNoveltiesAISL.Tipo_Novedad_Editar;
            const Motivo = formDataNoveltiesAISL.Motivo;

            socket.emit('sendNotificationToAISL', {
                ...selectedDetails,
                Id: selectedDetails.Id,
                Tipo_Novedad,
                Fecha_Inicio_Novedad: Fecha_Inicio_Novedad,
                Fecha_Fin_Novedad: Fecha_Fin_Novedad,
                Aprobador_Gestion_Humana: `${Name} ${LastName}`,
                Documento_Aprobador_Gestion_Humana: `${Documento}`,
                Observacion_Gestion_Humana: Motivo
            });
            api.success({
                message: 'Has aceptado la solicitud, y editado la novedad correctamente!',
            });
            try {
                // ! ACTUALIZA LOS TURNOS DE ACUERDO A LA NOVEDAD DE CALAMIDAD

                await apiClient.put(`http://${Servidor}/API/UPDATE/SHIFTS-FOR-NOMINA/ACCEPTS/AISL`, { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Novedad, Servicio })
                    .then(({ data }) => {

                    })
                    .catch(({ response }) => {
                        api.success({
                            message: `${response.data}`
                        });
                    });
            } catch (error) {
                console.log(error);
            }
            // ! ACTUALIZA LA TABLA DE NOVEDADES NOMINA  
            if (['LDF', 'LMA', 'LLT', 'ICCP', 'CAL'].includes(Tipo_Solicitud)) {
                try {
                    await apiClient.put(`http://${Servidor}/API/UPDATE/AL_NOVEDADES_NOMINA/`, { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud });
                } catch (error) {
                    console.log(error);
                    api.error({
                        message: `${error.response.data}`
                    });
                }
            }
            SetData(prevData => prevData.filter(item => item.Id !== selected.Id));
            handleCloseModal();
            handleCloseModalAcceptsAndRejectAccepts();
        }
        //?MANDA LA INFO
        else if (socket && selected) {
            const Fecha_Inicio_Novedad = selected.Fecha_Inicio_Novedad;
            const Fecha_Fin_Novedad = selected.Fecha_Fin_Novedad;
            socket.emit('sendNotificationToEND', {
                ...selected,
                Id: selected.Id,
                Tipo_Solicitud,
                Aprobador_Gestion_Humana: `${Name} ${LastName}`,
                Documento_Aprobador_Gestion_Humana: `${Documento}`,
                Observacion_Gestion_Humana: observacion
            });
            api.success({
                message: 'Has aceptado la solicitud',
            });
            try {
                await apiClient.put(`http://${Servidor}/API/UPDATE/SHIFTS-FOR-NOMINA/ACCEPTS/`, { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud, Servicio })
                    .then(({ data }) => {

                    })
                    .catch(({ response }) => {

                        api.error({
                            message: `${response.data}`
                        });
                    });
            } catch (error) {
                console.log(error);
            }


            if (['LDF', 'LMA', 'LLT', 'ICCP', 'CAL'].includes(Tipo_Solicitud)) {
                try {
                    await apiClient.put(`http://${Servidor}/API/UPDATE/AL_NOVEDADES_NOMINA/`, { documento, Fecha_Inicio_Novedad, Fecha_Fin_Novedad, Tipo_Solicitud });
                } catch (error) {
                    console.log(error);
                    api.error({
                        message: `${error.response.data}`
                    });
                }
            }
            SetData(prevData => prevData.filter(item => item.Id !== selected.Id));
            handleCloseModalAcceptsAndRejectAccepts();
        }



    }


    //FUNCION PARA QUE EL MANAGER RECHACE LA SOLICITUD
    const handleRejectNotificationNoveltie = () => {
        if (socket && selected) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento = fullName && fullName.map((data) => data.Documento);
            socket.emit('rejectNotificationNoveltiesEND', {
                ...selected,
                Id: selected.Id,
                Aprobador_Gestion_Humana: `${Name} ${LastName}`,
                Documento_Aprobador_Gestion_Humana: `${Documento}`,
                Observacion_Gestion_Humana: observacion
            });
            api.success({
                message: 'Has rechazado la solicitud',
            });
            handleCloseModalAcceptsAndRejectReject();
            SetData(prevData => prevData.filter(item => item.Id !== selected.Id));
        }
    };

    //SELECCIONAR EL DETALLE
    const handleDetailsMyGroup = (params) => {
        setSelectedDetails(params.row);
    };

    const renderDisabledTypeRequest = (params) => {
        if (params.row.Tipo_Solicitud === 'AISL') {
            return true;
        } else {
            return false;
        }
    }

    const columns = [
        { field: 'Codigo', headerName: 'Codigo', flex: 1 },
        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Cliente_Area', headerName: 'Cliente Area', flex: 1 },
        { field: 'Servicio', headerName: 'Servicio', flex: 1 },
        { field: 'Tipo_Solicitud', headerName: 'Tipo Solicitud', flex: 1 },
        { field: 'Fecha_Inicio_Novedad', headerName: 'Fecha Inicio Novedad', flex: 1 },
        { field: 'Fecha_Fin_Novedad', headerName: 'Fecha Fin Novedad', flex: 1 },
        {
            field: 'Accion',
            headerName: 'Escalamientos',
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className='d-flex'>
                        <div className=''>
                            <Button variant='soft' color='danger' size='sm' onClick={() => handleOpenModalAcceptsAndRejectReject(params)}> <CloseRoundedIcon fontSize='small' /></Button>
                        </div>
                        <div className='ms-2'>
                            <Button variant='soft' color='success' disabled={renderDisabledTypeRequest(params)} size='sm' onClick={() => handleOpenModalAcceptsAndRejectAccepts(params)}> <CheckRoundedIcon fontSize='small' /></Button>
                        </div>
                    </div>
                );
            },
        },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button variant='soft' color='primary' size='sm' onClick={() => { handleDetailsMyGroup(params); handleOpenModal(params); }}> <SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        }
    ];



    const exportDataNovelties = async () => {
        setIsLoadingExport(true);
        try {
            const month = `${selectedMonth}-01`;
            const response = await apiClient.get(`http://${Servidor}/API/GET/NOVELTIES/ADVISER-FOR-NOMINA/${month}`)
            const data = response.data;

            if (data.length === 0) {
                api.info({
                    message: `Informacion`,
                    description: `No hay resultados para el mes seleccionado`
                });
            } else {
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const FileName = `Novedades.xlsx`;
                XLSX.writeFile(wb, FileName);
            }
            setIsLoadingExport(false);

            // Mostrar notificación de éxito si se descargaron resultados
            if (data.length > 0) {
                api.success({
                    message: 'Éxito',
                    description: 'La descarga se ha completado con éxito.',
                });
            }
            const focusListener = () => {
                setIsLoadingExport(false);
                window.removeEventListener('focus', focusListener);
            };
            window.addEventListener('focus', focusListener);
        } catch (error) {
            setIsLoadingExport(false);
            api.error({
                message: 'Error',
                description: 'Ha ocurrido un error al exportar los datos. Porfavor selecciona un mes diferente'
            })

        }
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // Obtener la fecha actual para calcular el valor máximo del campo de entrada 'mes'
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
    const maxMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // Formatear el mes a dos dígitos

    // Establecer el valor máximo del campo de entrada 'mes'
    const maxDates = `${currentYear}-${maxMonth}`;



    const filteredItems = Array.isArray(data) && data.filter(item =>
        item.Usuario_Red.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Documento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Cliente_Area.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {contextHolder}
            <ItemContent elevation={10} className='mb-5'>
                <div className='text-center'>
                    <div className='title-mis-novedades'>Solicitudes</div>
                </div>
            </ItemContent>

            <ItemContent elevation={3}>
                <div className='card-body'>
                    <div className='d-flex align-items-center'>
                        <div className='flex-grow-1 text-muted'>
                            <div className='p-2'>
                                Número de registros: {filteredItems && filteredItems.length && filteredItems.length}
                            </div>
                        </div>

                        <div className='p-2'>
                            <TextField
                                fullWidth
                                size='small'
                                type='search'
                                label='Buscar'
                                variant='outlined'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className='p-2 d-flex'>
                            <input
                                name='Mes'
                                type='month'
                                max={maxDates}
                                id='seleccioneMes'
                                value={selectedMonth}
                                className='form-control'
                                onChange={handleMonthChange}
                            />
                        </div>

                        <div className='p-2'>
                            {isLoadingExport ? (
                                <Button loading variant='solid' size='sm' />
                            ) : (
                                <Button variant='soft' color='primary' size='sm' disabled={!selectedMonth} onClick={exportDataNovelties}><FileDownloadRoundedIcon fontSize='small' /></Button>
                            )}
                        </div>

                    </div>

                    {loading ? (CustomNoRowsOverlay()) : (
                        <StyledDataGrid
                            rowHeight={40}
                            columns={columns}
                            rows={filteredItems}
                            pageSizeOptions={[PAGE_SIZE]}
                            paginationModel={paginationModel}
                            getRowId={(data) => data.Id}
                            onPaginationModelChange={setPaginationModel}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            slots={{
                                noRowsOverlay: CustomNoRowsOverlay,
                                pagination: CustomPagination
                            }}
                        />

                    )}
                </div>

                <AcceptsAndRejectNomina
                    Modal={Modal}
                    Button={Button}
                    observacion={observacion}
                    handleObservacion={handleObservacion}
                    WarningRoundedIcon={WarningRoundedIcon}
                    openModalOpenAndRejects={openModalOpenAndRejects}
                    openModalOpenAndAccepts={openModalOpenAndAccepts}
                    handleRejectNotificationNoveltie={handleRejectNotificationNoveltie}
                    handleAcceptNotificationNovelties={handleAcceptNotificationNovelties}
                    handleCloseModalAcceptsAndRejectReject={handleCloseModalAcceptsAndRejectReject}
                    handleCloseModalAcceptsAndRejectAccepts={handleCloseModalAcceptsAndRejectAccepts}
                />

                <DetailsNomina
                    Modal={Modal}
                    Button={Button}
                    maxDate={maxDate}
                    minDate={minDate}
                    openModal={openModal}
                    selectedDetails={selectedDetails}
                    handleCloseModal={handleCloseModal}
                    formDataNovelties={formDataNovelties}
                    handleEditDateCal={handleEditDateCal}
                    handleEditDateAISL={handleEditDateAISL}
                    formDataNoveltiesAISL={formDataNoveltiesAISL}
                    handleAcceptNotificationNovelties={handleAcceptNotificationNovelties}
                />
            </ItemContent >
        </>
    )
}

export default Nomina