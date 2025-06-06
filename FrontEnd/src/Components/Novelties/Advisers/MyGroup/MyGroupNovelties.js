import {
    Tab,
    Box,
    Tabs,
    Grid,
    Modal,
    React,
    useState,
    TextField,
    useEffect,
    useContext,
    useCallback,
    DoneRoundedIcon,
    CloseRoundedIcon,
    SearchRoundedIcon,
    ArrowLeftRoundedIcon,
    ArrowRightRoundedIcon,
    FileDownloadRoundedIcon,
    WarningRoundedIcon,
    CheckRoundedIcon
} from '../../../../Exports-Modules/Exports';

import * as XLSX from 'xlsx';
import Button from '@mui/joy/Button';
import { esES } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';



import {
    a11yProps,
    PAGE_SIZE,
    ItemContent,
    CustomTabPanel,
    StyledDataGrid,
    CustomPagination,
    CustomNoRowsOverlay,
    ItemContentModal,
} from '../Styles/Styles';
import './Styles/Styles.css';

import { UserProfileContext } from '../../../../Context/ProfileContex';
import { NotificationsContextNoveltie } from '../../../../Context/ContextNotificationNoveltie';

import Service from '../../../../Machine/Service';
import DetailsMyGroup from './DetailsMyGroup/DetailsMyGroup';
import HistoryRegisters from './HistoryRegisters/HistoryRegisters';
import { getAllListNoveltiesClient, getAllMyGroupNovelties, getAllMyGroupNoveltiesHistory } from '../../../../API/API';
import GenerateNoveltieForAdviser from './GenerateNoveltieForAdviser/GenerateNoveltieForAdviser';
import apiClient from '../../../../Service/Service';
import AcceptsAndRejectMyGroup from './AcceptsAndRejectMyGroup/AcceptsAndRejectMyGroup';


const MyGroupNovelties = () => {
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const { api, contextHolder, formDataNoveltiesSupervisor, handleformDataNoveltiesSupervisor, submitNoveltieSupervisor, listAdvisers, errorMessage, daysBetweenSupervisor, socket } = useContext(NotificationsContextNoveltie);

    const [data, SetData] = useState([]);
    const [dataHistory, SetDataHistory] = useState([]);
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [observacion, setObservacion] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [listNovelties, setListNovelties] = useState([]);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [openModalOpenAndRejects, setOpenModalOpenAndReject] = useState(false);
    const [openModalOpenAndAccepts, setOpenModalOpenAndAccepts] = useState(false);
    const [openModalGenerateNoveltie, setOpenModalGenerateNoveltie] = useState(false);


    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


    //manejadore de los tabs 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //SELECCIONAR EL DETALLE
    const handleDetailsMyGroup = (details) => {
        setSelectedDetails(details);
    };

    //MANEJADORES DE EL MODAL DE GENERAR NOVEDADES
    const handleOpenModalGenerateNoveltie = () => {
        setOpenModalGenerateNoveltie(true);
    }
    const handleCloseModalGenerateNoveltie = () => {
        setOpenModalGenerateNoveltie(false);
    }



    //MANEJADORES DE EL MODAL DE DETALLES 
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }




    // Obtener la fecha actual para calcular el valor máximo del campo de entrada 'mes'
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
    const maxMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // Formatear el mes a dos dígitos

    // Establecer el valor máximo del campo de entrada 'mes'
    const maxDate = `${currentYear}-${maxMonth}`;

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const exportDataNovelties = async () => {
        setIsLoadingExport(true);
        try {
            const month = `${selectedMonth}-01`;
            const Documento = fullName && fullName.map((items) => items.Documento);
            const response = await apiClient.get(`http://${Servidor}/API/GET/NOVELTIES/ADVISER-FOR-BOSS/${month}/${Documento}`)
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

    const getDataForBoss = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllMyGroupNovelties(fullName[0].Documento);
            if (response) {
                SetData(response);
            }

        } catch (error) {
            // Manejo de errores si es necesario
        } finally {
            setLoading(false);
        }
    }, [fullName]);
    const getDataForBossHistory = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllMyGroupNoveltiesHistory(fullName[0].Documento);
            if (response) {
                SetDataHistory(response);
            }

        } catch (error) {
            // Manejo de errores si es necesario
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    // En el hook useEffect

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataForBoss();
        }
    }, [fullName, getDataForBoss]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataForBossHistory();
        }
    }, [fullName, getDataForBossHistory]);


    // LISTADO DE NOVEDADES
    const GetListNovelties = async () => {
        const DATA = await getAllListNoveltiesClient();
        setListNovelties(DATA || []);
    };

    useEffect(() => {
        GetListNovelties();
    }, [])

    const handleSubmitNoveltieSupervisor = () => {
        submitNoveltieSupervisor();
        formDataNoveltiesSupervisor.Fecha_Inicio_Novedad = '';
        formDataNoveltiesSupervisor.Fecha_Fin_Novedad = '';
        formDataNoveltiesSupervisor.Tipo_Solicitud = '';
        formDataNoveltiesSupervisor.Motivo = '';
        formDataNoveltiesSupervisor.Dias_Laborales = '';
        formDataNoveltiesSupervisor.Asesor = '';

        formDataNoveltiesSupervisor.Number_Iccp = '';
        formDataNoveltiesSupervisor.Number_Diag = '';
        formDataNoveltiesSupervisor.Name_Diag = '';
        handleCloseModalGenerateNoveltie();
    }

    const renderStateNoveltie = (novelties) => {
        if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === 'Aceptado') {
            return 'Aprobado'
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Rechazado') {
            return 'Rechazado';
        } else if (novelties.Estado_Marcado_Gerente_Area === 'Rechazado') {
            return 'Rechazado';
        } else if (novelties.Estado_Marcado_Planeacion === 'Rechazado') {
            return 'Rechazado';
        } else if (novelties.Estado_Marcado_Gerente_Area === 'Rechazado') {
            return 'Rechazado';
        } else if (novelties.Estado_Marcado_Gestion_Humana === 'Rechazado') {
            return 'Rechazado';
        } else {
            return 'Pendiente'
        }
    };


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
            field: 'Estado',
            headerName: 'Estado',
            flex: 1,
            renderCell: (params) => {
                return (
                    renderStateNoveltie(params.row)
                );
            }

        },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button size='sm' color='primary' variant='soft' onClick={() => { handleDetailsMyGroup(params.row); handleOpenModal(); }}><SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        }
    ];

    const handleObservacion = (e) => {
        setObservacion(e.target.value);
    };

    const handleOpenModalAcceptsAndRejectAccepts = (DATA) => {
        setOpenModalOpenAndAccepts(true);
        setSelected(DATA);
    };
    const handleCloseModalAcceptsAndRejectAccepts = () => {
        setOpenModalOpenAndAccepts(false);
    };
    const handleOpenModalAcceptsAndRejectReject = (DATA) => {
        setOpenModalOpenAndReject(true);
        setSelected(DATA);
    };
    const handleCloseModalAcceptsAndRejectReject = () => {
        setOpenModalOpenAndReject(false);
    };


    //FUNCION PARA QUE EL MANAGER ACEPTE LA SOLICITUD
    const handleAcceptNotificationNovelties = (index) => {
        if (socket && selected) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento = fullName && fullName.map((data) => data.Documento);
            socket.emit("sendNotificationOfBoss", {
                ...selected,
                Id: selected.Id,
                Aprobador_Jefe_Inmediato: `${Name} ${LastName}`,
                Documento_Aprobador_Jefe_Inmediato: `${Documento}`,
                Observacion_Jefe_Inmediato: observacion,
            });
            api.success({
                message: "Has aceptado la solicitud",
            });
        }
        SetData((prevData) => prevData.filter((item) => item.Id !== selected.Id));
        handleCloseModalAcceptsAndRejectAccepts();
    };

    //FUNCION PARA QUE EL MANAGER RECHACE LA SOLICITUD
    const handleRejectNotificationNoveltie = (index) => {
        if (socket && selected) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento = fullName && fullName.map((data) => data.Documento);
            socket.emit("rejectNotificationNoveltiesBoss", {
                ...selected,
                Id: selected.Id,
                Aprobador_Jefe_Inmediato: `${Name} ${LastName}`,
                Documento_Aprobador_Jefe_Inmediato: `${Documento}`,
                Observacion_Jefe_Inmediato: observacion,
            });
            api.success({
                message: "Has rechazado la solicitud",
            });
        }
        SetData((prevData) => prevData.filter((item) => item.Id !== selected.Id));
        handleCloseModalAcceptsAndRejectReject();
    };


    const columns2 = [
        { field: 'Codigo', headerName: 'Codigo', flex: 1 },
        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Cliente_Area', headerName: 'Cliente Area', flex: 1 },
        { field: 'Servicio', headerName: 'Servicio', flex: 1 },
        { field: 'Tipo_Solicitud', headerName: 'Tipo Solicitud', flex: 1 },
        { field: 'Fecha_Inicio_Novedad', headerName: 'Fecha Inicio Novedad', flex: 1 },
        { field: 'Fecha_Fin_Novedad', headerName: 'Fecha Fin Novedad', flex: 1 },
        {
            field: 'Pre-aprobar',
            headerName: 'Pre-aprobar',
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="d-flex">
                        <div className="">
                            <Button
                                variant="soft"
                                size="sm"
                                color="danger"
                                onClick={() =>
                                    handleOpenModalAcceptsAndRejectReject(params.row)
                                }
                            >
                                {" "}
                                <CloseRoundedIcon fontSize="small" />
                            </Button>
                        </div>
                        <div className="ms-2">
                            <Button
                                variant="soft"
                                size="sm"
                                color="success"
                                onClick={() =>
                                    handleOpenModalAcceptsAndRejectAccepts(params.row)
                                }
                            >
                                {" "}
                                <CheckRoundedIcon fontSize="small" />
                            </Button>
                        </div>
                    </div>
                );
            }

        },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button size='sm' color='primary' variant='soft' onClick={() => { handleDetailsMyGroup(params.row); handleOpenModal(); }}><SearchRoundedIcon fontSize='small' /></Button>
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
    const filteredItemsHistory = Array.isArray(dataHistory) && dataHistory.filter(item =>
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
            <ItemContent className='mb-5'>
                <div className='text-center'>
                    <div className='mb-0 title-generate'>Solicitudes</div>
                </div>
            </ItemContent>

            <ItemContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleChange} aria-label='all info for adviser'>
                        <Tab label='Pre-aprobar solicitudes' {...a11yProps(0)} />
                        <Tab label='Historial de solicitudes' {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {loading ? (<div className='spinner-border text-warning' role='status' />) : (
                        <StyledDataGrid
                            rowHeight={40}
                            columns={columns2}
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
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <HistoryRegisters
                        esES={esES}
                        data={data}
                        Button={Button}
                        Divider={Divider}
                        maxDate={maxDate}
                        loading={loading}
                        columns={columns}
                        TextField={TextField}
                        PAGE_SIZE={PAGE_SIZE}
                        searchQuery={searchQuery}
                        filteredItemsHistory={filteredItemsHistory}
                        selectedMonth={selectedMonth}
                        StyledDataGrid={StyledDataGrid}
                        setSearchQuery={setSearchQuery}
                        paginationModel={paginationModel}
                        isLoadingExport={isLoadingExport}
                        handleOpenModal={handleOpenModal}
                        DoneRoundedIcon={DoneRoundedIcon}
                        CustomPagination={CustomPagination}
                        CloseRoundedIcon={CloseRoundedIcon}
                        handleMonthChange={handleMonthChange}
                        SearchRoundedIcon={SearchRoundedIcon}
                        setPaginationModel={setPaginationModel}
                        exportDataNovelties={exportDataNovelties}
                        CustomNoRowsOverlay={CustomNoRowsOverlay}
                        handleDetailsMyGroup={handleDetailsMyGroup}
                        ArrowLeftRoundedIcon={ArrowLeftRoundedIcon}
                        ArrowRightRoundedIcon={ArrowRightRoundedIcon}
                        FileDownloadRoundedIcon={FileDownloadRoundedIcon}
                        handleOpenModalGenerateNoveltie={handleOpenModalGenerateNoveltie}
                    />
                </CustomTabPanel>

            </ItemContent >




            {/* DETALLES DEL LA SOLICITUD SOLICITADO POR EL ASESOR */}
            <GenerateNoveltieForAdviser
                Modal={Modal}
                Button={Button}
                daysBetweenSupervisor={daysBetweenSupervisor}
                listAdvisers={listAdvisers}
                errorMessage={errorMessage}
                listNovelties={listNovelties}
                openModalGenerateNoveltie={openModalGenerateNoveltie}
                formDataNoveltiesSupervisor={formDataNoveltiesSupervisor}
                handleSubmitNoveltieSupervisor={handleSubmitNoveltieSupervisor}
                handleCloseModalGenerateNoveltie={handleCloseModalGenerateNoveltie}
                handleformDataNoveltiesSupervisor={handleformDataNoveltiesSupervisor}
            />

            {/* PRE APUEBA O RECHA LAS SOLICITUDES SOLICITADAS POR EL ASESO  */}
            <AcceptsAndRejectMyGroup
                Modal={Modal}
                Button={Button}
                observacion={observacion}
                handleObservacion={handleObservacion}
                WarningRoundedIcon={WarningRoundedIcon}
                openModalOpenAndAccepts={openModalOpenAndAccepts}
                openModalOpenAndRejects={openModalOpenAndRejects}
                handleRejectNotificationNoveltie={handleRejectNotificationNoveltie}
                handleAcceptNotificationNovelties={handleAcceptNotificationNovelties}
                handleCloseModalAcceptsAndRejectReject={handleCloseModalAcceptsAndRejectReject}
                handleCloseModalAcceptsAndRejectAccepts={handleCloseModalAcceptsAndRejectAccepts}
            />


            {/* DETALLES DEL LA SOLICITUD SOLICITADO POR EL ASESOR */}
            <DetailsMyGroup
                Grid={Grid}
                Modal={Modal}
                openModal={openModal}
                selectedDetails={selectedDetails}
                ItemContentModal={ItemContentModal}
                handleCloseModal={handleCloseModal}
            />

        </>
    )
}

export default MyGroupNovelties