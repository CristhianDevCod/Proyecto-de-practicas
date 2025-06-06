import {
    Tab,
    Tabs,
    React,
    Modal,
    useState,
    TextField,
    useEffect,
    useContext,
    DoneRoundedIcon,
    CloseRoundedIcon,
    SearchRoundedIcon,
    WarningRoundedIcon,
    ArrowLeftRoundedIcon,
    ArrowRightRoundedIcon,
    FileDownloadRoundedIcon,
    Box,
    useCallback,
} from '../../../../Exports-Modules/Exports';
import { esES } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import Button from '@mui/joy/Button';
import Divider from '@mui/material/Divider';


import './Styles/Styles.css';
import { CustomNoRowsOverlay, ItemContent, CustomTabPanel, CustomPagination, a11yProps, PAGE_SIZE, StyledDataGrid } from '../Styles/Styles';

import { UserProfileContext } from '../../../../Context/ProfileContex';
import { NotificationsContextNoveltie } from '../../../../Context/ContextNotificationNoveltie';

import Service from '../../../../Machine/Service';
import DetailsMyGroup from './DetailsMyGroup/DetailsMyGroup';
import HistoryRegisters from './HistoryRegisters/HistoryRegisters';
import { getAllListNoveltiesClient, getAllMyGroupNoveltiesStaffNovelties } from '../../../../API/API';
import AcceptsAndRejectMyGroup from './AcceptsAndRejectMyGroup/AcceptsAndRejectMyGroup';
import GenerateNoveltieForAdviser from './GenerateNoveltieForAdviser/GenerateNoveltieForAdviser';
import HistoryRegistersAdviders from './HistoryRegistersAdvisers/HistoryRegistersAdvisers';
import apiClient from '../../../../Service/Service';


const NoveltiesMyGroupStaff = () => {
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const { socket, api, contextHolder, formDataNoveltiesSupervisor, handleformDataNoveltiesSupervisor, submitNoveltieSupervisor, listAdvisers, errorMessage, daysBetweenSupervisor } = useContext(NotificationsContextNoveltie);

    const [data, SetData] = useState([]);
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [observacion, setObservacion] = useState('');
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

    const handleObservacion = (e) => {
        setObservacion(e.target.value);
    }

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
    //FUNCION PARA QUE EL JEFE INMEDIATO RECHACE LA SOLICITUD
    const handleRejectNotificationNoveltie = () => {
        if (socket && selected) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento = fullName && fullName.map((data) => data.Documento);
            socket.emit('rejectNotificationNoveltiesStaff', {
                ...selected,
                Id: selected.Id,
                Aprobador_Jefe_Inmediato: `${Name} ${LastName}`,
                Documento_Aprobador_Jefe_Inmediato: `${Documento}`,
                Observacion_Jefe_Inmediato: observacion
            });
            api.success({
                message: 'Has rechazado la solicitud',
            });
            handleCloseModalAcceptsAndRejectReject();
        }
        // Actualizar datos en el estado para eliminar el registro rechazado
        SetData(prevData => prevData.filter(item => item.Id !== selected.Id));

    };

    //FUNCION PARA QUE EL JEFE INMEDIATO ACEPTE LA SOLICITUD
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

            socket.emit('sendNotificationToWFMStaff', {
                ...selected,
                Id: selected.Id,
                Aprobador_Jefe_Inmediato: `${Name} ${LastName}`,
                Documento_Aprobador_Jefe_Inmediato: `${Documento}`,
                Observacion_Jefe_Inmediato: observacion

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

        // Actualizar datos en el estado para eliminar el registro rechazado
        SetData(prevData => prevData.filter(item => item.Id !== selected.Id));

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
            // Verifica que fullName tenga un elemento antes de acceder a él
            if (fullName.length > 0 && fullName[0].Documento) {
                const response = await getAllMyGroupNoveltiesStaffNovelties(fullName[0].Documento);
                if (response) {
                    SetData(response);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    useEffect(() => {
        if (fullName.length > 0) {
            getDataForBoss();
        }
    }, [fullName, getDataForBoss]);
    useState(() => {

        if (fullName && fullName.length > 0) {
            getDataForBoss();
        }
    }, [fullName, getDataForBoss]);


    // LISTADO DE NOVEDADES
    const GetListNovelties = async () => {
        const DATA = await getAllListNoveltiesClient();
        setListNovelties(DATA);
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
                            <Button size='sm' color='danger' variant='soft' onClick={() => handleOpenModalAcceptsAndRejectReject(params.row)}><CloseRoundedIcon fontSize='small' /></Button>
                        </div>
                        <div className='ms-2'>
                            <Button size='sm' color='success' variant='soft' onClick={() => handleOpenModalAcceptsAndRejectAccepts(params.row)}><DoneRoundedIcon fontSize='small' /></Button>
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


    return (
        <>
            {contextHolder}
            <ItemContent className='mb-4'>
                <div className='text-center'>
                    <div className='mb-0 title-generate'>Solicitudes</div>
                </div>
            </ItemContent>







            <ItemContent >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleChange} aria-label='all info for adviser'>
                        <Tab label='Historial de solicitudes' {...a11yProps(0)} />
                        <Tab label='Solicitudes mi equipo' {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
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
                        filteredItems={filteredItems}
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
                        handleOpenModalAcceptsAndRejectReject={handleOpenModalAcceptsAndRejectReject}
                        handleOpenModalAcceptsAndRejectAccepts={handleOpenModalAcceptsAndRejectAccepts}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <HistoryRegistersAdviders />
                </CustomTabPanel>

            </ItemContent>




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

            {/* DETALLES DEL LA SOLICITUD SOLICITADO POR EL ASESOR */}
            < DetailsMyGroup
                Modal={Modal}
                openModal={openModal}
                selectedDetails={selectedDetails}
                handleCloseModal={handleCloseModal}
            />

            {/* COMPONENTES DE DOBLE VALIDADOR DE ACEPTAR Y RECHAZAR */}
            <AcceptsAndRejectMyGroup
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
        </>
    )
}

export default NoveltiesMyGroupStaff