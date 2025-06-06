import {
    Modal,
    React,
    useState,
    useEffect,
    TextField,
    useContext,
    useCallback,
    notification,
    CloseRoundedIcon,
    CheckRoundedIcon,
    SearchRoundedIcon,
    WarningRoundedIcon,
    FileDownloadRoundedIcon,
    Grid
} from '../../../../Exports-Modules/Exports';
import * as XLSX from 'xlsx';
import { esES } from '@mui/x-data-grid';
import Button from '@mui/joy/Button';
import '../Styles/Styles.css';
import { CustomNoRowsOverlay, ItemContent, CustomPagination, PAGE_SIZE, StyledDataGrid, ItemContentModal } from '../Styles/Styles';
import { UserProfileContext } from '../../../../Context/ProfileContex';
import { NotificationsContextNoveltie } from '../../../../Context/ContextNotificationNoveltie';
import DetailsWFM from './Details/DetailsWFM';
import AcceptsAndRejectWFM from './AcceptsAndRejectWFM/AcceptsAndRejectWFM';
import { PERMISSIONSCLIENTSNOVELTIES, getAllWfmNovelties } from '../../../../API/API';
import Service from '../../../../Machine/Service';
import apiClient from '../../../../Service/Service';


const WFM = () => {
    const [api, contextHolder] = notification.useNotification();
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const { socket } = useContext(NotificationsContextNoveltie);

    const [data, SetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [observacion, setObservacion] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [openModalOpenAndRejects, setOpenModalOpenAndReject] = useState(false);
    const [openModalOpenAndAccepts, setOpenModalOpenAndAccepts] = useState(false);

    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

    //EFECTO PARA OBTENER ELE LISTADOD DE SOLICITUDES DE NOVEDADES

    const getDataForBoss = useCallback(async () => {
        setLoading(true);
        try {
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOVELTIES(Usuario_Red);
            const Cliente = response.map((item) => item.Cliente_Permiso);
            const wfmResponse = await getAllWfmNovelties(Cliente);
            SetData(wfmResponse);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataForBoss();
        }
    }, [getDataForBoss, fullName]);

    const handleObservacion = (e) => {
        setObservacion(e.target.value);
    }

    const handleOpenModalAcceptsAndRejectAccepts = (DATA) => {
        setOpenModalOpenAndAccepts(true);
        setSelected(DATA);
    }
    const handleCloseModalAcceptsAndRejectAccepts = () => {
        setOpenModalOpenAndAccepts(false);
    }

    const handleOpenModalAcceptsAndRejectReject = (DATA) => {
        setOpenModalOpenAndReject(true);
        setSelected(DATA);
    }
    const handleCloseModalAcceptsAndRejectReject = () => {
        setOpenModalOpenAndReject(false);
    }

    //FUNCION PARA QUE EL ANALISTA ACEPTE LA SOLICITUD
    const handleAcceptNotificationNovelties = async () => {
        if (socket && selected) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento = fullName && fullName.map((data) => data.Documento);

            const documento = selected.Documento;
            const Servicio = selected.Servicio;
            const Tipo_Solicitud = selected.Tipo_Solicitud;
            const Fecha_Inicio_Novedad = selected.Fecha_Inicio_Novedad;
            const Fecha_Fin_Novedad = selected.Fecha_Fin_Novedad;


            socket.emit('sendNotificationToManager', {
                ...selected,
                Id: selected.Id,
                Aprobador_Planeacion: `${Name} ${LastName}`,
                Documento_Aprobador_Planeacion: `${Documento}`,
                Observacion_Planeacion: observacion

            });
            api.success({
                message: 'Has aceptado la solicitud',
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
            handleCloseModalAcceptsAndRejectAccepts();
        }
        SetData(prevData => prevData.filter(item => item.Id !== selected.Id));
    }

    //FUNCION PARA QUE EL ANALISTA RECHACE LA SOLICITUD
    const handleRejectNotificationNoveltie = (index) => {
        if (socket && selected) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento = fullName && fullName.map((data) => data.Documento);
            socket.emit('rejectNotificationNoveltiesWfm', {
                ...selected,
                Id: selected.Id,
                Aprobador_Planeacion: `${Name} ${LastName}`,
                Documento_Aprobador_Planeacion: `${Documento}`,
                Observacion_Planeacion: observacion

            });
            api.success({
                message: 'Has rechazado la solicitud',
            });
            handleCloseModalAcceptsAndRejectReject();
        }
        SetData(prevData => prevData.filter(item => item.Id !== selected.Id));
    };


    //SELECCIONAR EL DETALLE
    const handleDetailsMyGroup = (details) => {
        setSelectedDetails(details);
    };

    //MANEJADORES DE EL MODAL DE DETALLES 
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }




    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // Obtener la fecha actual para calcular el valor máximo del campo de entrada 'mes'
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
    const maxMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // Formatear el mes a dos dígitos

    // Establecer el valor máximo del campo de entrada 'mes'
    const maxDate = `${currentYear}-${maxMonth}`;



    const exportDataNovelties = async () => {
        setIsLoadingExport(true);
        try {
            const month = `${selectedMonth}-01`;
            const response = await apiClient.get(`http://${Servidor}/API/GET/NOVELTIES/ADVISER-FOR-WFM/${month}/`)
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
                const FileName = `Novedades WFM.xlsx`;
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

    const columns = [
        { field: 'Codigo', headerName: 'Codigo', flex: 1 },
        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Servicio', headerName: 'Servicios', flex: 1 },
        { field: 'Cliente_Area', headerName: 'Cliente Area', flex: 1 },
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
                            <Button variant='soft' size='sm' color='danger' onClick={() => handleOpenModalAcceptsAndRejectReject(params.row)}> <CloseRoundedIcon fontSize='small' /></Button>
                        </div>
                        <div className='ms-2'>
                            <Button variant='soft' size='sm' color='success' onClick={() => handleOpenModalAcceptsAndRejectAccepts(params.row)}> <CheckRoundedIcon fontSize='small' /></Button>
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
                    <Button variant='soft' size='sm' color='primary' onClick={() => { handleDetailsMyGroup(params.row); handleOpenModal(); }}> <SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        }
    ];

    const filteredItems = Array.isArray(data) && data.filter(item =>
        item.Usuario_Red.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Documento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Cliente_Area.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {contextHolder}
            <ItemContent elevation={10} className='mb-5'>
                <div className='text-center'>
                    <div className='title-mis-novedades'>Solicitudes</div>
                </div>
            </ItemContent>

            <ItemContent elevation={3}>
                <div className='d-flex align-items-center'>
                    <div className='flex-grow-1 text-muted align-self-center'>
                        <div className='p-2'>
                            Número de registros pendientes: {Array.isArray(filteredItems) && filteredItems.length}
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

                    <div className='p-2'>
                        <input
                            name='Mes'
                            type='month'
                            max={maxDate}
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
                    Array.isArray(data) ?
                        (<>
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
                        </>)
                        : (CustomNoRowsOverlay()))}



                <AcceptsAndRejectWFM
                    Modal={Modal}
                    Button={Button}
                    observacion={observacion}
                    handleObservacion={handleObservacion}
                    WarningRoundedIcon={WarningRoundedIcon}
                    openModalOpenAndAccepts={openModalOpenAndAccepts}
                    openModalOpenAndRejects={openModalOpenAndRejects}
                    handleRejectNotificationNoveltie={handleRejectNotificationNoveltie}
                    handleAcceptNotificationNovelties={handleAcceptNotificationNovelties}
                    handleCloseModalAcceptsAndRejectAccepts={handleCloseModalAcceptsAndRejectAccepts}
                    handleCloseModalAcceptsAndRejectReject={handleCloseModalAcceptsAndRejectReject}
                />

                <DetailsWFM
                    Grid={Grid}
                    Modal={Modal}
                    openModal={openModal}
                    selectedDetails={selectedDetails}
                    ItemContentModal={ItemContentModal}
                    handleCloseModal={handleCloseModal}
                />
            </ItemContent>
        </div >
    )
}

export default WFM