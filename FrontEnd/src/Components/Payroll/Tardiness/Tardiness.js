import {
    Box,
    Grid,
    React,
    Modal,
    useState,
    TextField,
    useEffect,
    useContext,
    useCallback,
    notification,
    AddRoundedIcon,
    CloseRoundedIcon,
    CheckRoundedIcon,
    SearchRoundedIcon,
    HourglassFullRoundedIcon,
} from '../../../Exports-Modules/Exports';
import {
    PAGE_SIZE,
    ItemContent,
    StyledDataGrid,
    ItemContentModal,
    CustomPagination,
    CustomNoRowsOverlay,
    ItemContentCards,

} from '../Styles/Styles';
import { Button } from '@mui/joy';
import { esES } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import '../Styles/Styles.css';
import Service from '../../../Machine/Service';
import ReportsTardiness from './ReportsTardiness/ReportsTardiness';
import { UserProfileContext } from '../../../Context/ProfileContex';
import DetailsTardiness from './Details/DetailsTardiness';
import { getAllTardiness, getAllListTypeTardiness } from '../../../API/API';
import apiClient from '../../../Service/Service';

const Tardiness = () => {
    const [api, contextHolder] = notification.useNotification();
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const [open, setOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectDetails, setSelectDetails] = useState(false);
    const [loading, setLoading] = useState(true);

    const [dataTardiness, setDataTardines] = useState([]);
    const [dataReportsAccepts, setDataReportsAccepts] = useState([]);
    const [dataReportsRejects, setDataReportsRejects] = useState([]);
    const [dataReportsPending, setDataReportsPending] = useState([]);

    const [selectTypeTardiness, setSelectTypeTardiness] = useState('');

    const [typeTardiness, setTypeTardiness] = useState('');
    const [dateTardiness, setDateTardiness] = useState('');
    const [dateTardinessTwo, setDateTardinessTwo] = useState('');
    const [numberApolo, setNumberApolo] = useState('');

    const [Number_Iccp, setNumber_Iccp] = useState('');
    const [Number_Diag, setNumber_Diag] = useState('');
    const [Name_Diag, setName_Diag] = useState('');


    const [description, setDescription] = useState('');

    const [listTardiness, setListTardiness] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


    const clearCells = () => {
        setSelectTypeTardiness('');
        setTypeTardiness('');
        setDateTardiness('');
        setNumberApolo('');
        setDescription('');
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        clearCells();
    };

    const handleOpenDetails = (Details) => {
        setOpenDetails(true);
        setSelectDetails(Details)
    };
    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    function handleTypeTardiness(e) {
        setTypeTardiness(e.target.value);
    };


    //Campos obligatorios para iccp lpa lma
    function handleNumber_Iccp(e) {
        setNumber_Iccp(e.target.value);
    };

    function handleNumber_Diag(e) {
        setNumber_Diag(e.target.value);
    };

    function handleName_Diag(e) {
        setName_Diag(e.target.value);
    };




    const handleDateTardiness = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDateTime = new Date();
        const colombianHour = currentDateTime.getUTCHours() - 5; // Ajuste para la hora colombiana (UTC-5)

        if ((colombianHour === 7 || colombianHour === 19) && currentDateTime.getMinutes() === 0 && currentDateTime.getSeconds() === 0) {
            // Si es la hora colombiana 07:00:00 o 19:00:00
            const selectedHour = selectedDate.getHours();
            const selectedMinute = selectedDate.getMinutes();
            const selectedSecond = selectedDate.getSeconds();

            if (selectedHour !== 7 && selectedHour !== 19) {
                // Si la hora seleccionada no es 07:00:00 ni 19:00:00, ajusta la fecha al día actual
                const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), currentDateTime.getDate(), selectedHour, selectedMinute, selectedSecond);
                setDateTardiness(newDate.toISOString().split('T')[0]);
            } else {
                setDateTardiness(e.target.value);
            }
        } else {
            setDateTardiness(e.target.value);
        }
    };

    function handleDateTardinessTwo(e) {
        setDateTardinessTwo(e.target.value);
    };
    function handleNumberApolo(e) {
        setNumberApolo(e.target.value);
    };
    function handleDescription(e) {
        setDescription(e.target.value);
    };

    let Usuario_Red = localStorage.getItem('username');
    let Documento = fullName.map((item) => {
        return item.Documento;
    });
    let Nombre_Completo = fullName.map((item) => {
        return `${item.Apellidos} ${item.Nombres}`;
    });
    let Cargo = fullName.map((item) => {
        return item.Cargo;
    });
    let Cliente_Area = fullName.map((item) => {
        return item.Cliente_Area;
    });
    let Servicio = fullName.map((item) => {
        return item.Servicio;
    });

    let Jefe_Inmediato = fullName.map((item) => {
        return item.Jefe_Inmediato;
    });
    let Documento_Jefe_Inmediato = fullName.map((item) => {
        return item.Documento_Jefe_Inmediato;
    });

    //TODO: MODULO NOMINA - OBTIENE EL NUMERO DE LOS REPORTE EN CURSO, APROBADOS, RECHAZADOS
    const getDataNovelties = useCallback(async () => {
        setLoading(true);
        if (fullName && fullName.length > 0) {
            setLoading(true);
            const Usuario_Red = fullName.map((item) => item.Usuario_Red);
            try {
                const response = await getAllTardiness(Usuario_Red);

                const FilterdataReportsAccepts = response && response.filter(d =>
                    (d.Estado_Marcado_Aprobador_1 === 'Aceptado' && d.Estado_Marcado_Aprobador_2 === 'Aceptado') ||
                    d.Estado_Marcado_Aprobador_2 === 'Aceptado'
                );

                const FilterdataReportsRejects = response && response.filter(d =>
                    d.Estado_Marcado_Aprobador_1 === 'Rechazado' || d.Estado_Marcado_Aprobador_2 === 'Rechazado'
                );

                const FilterdataReportsPending = response && response.filter(d =>
                    (d.Estado_Marcado_Aprobador_1 === '' && d.Estado_Marcado_Aprobador_2 === '') ||
                    (d.Estado_Marcado_Aprobador_1 === undefined && d.Estado_Marcado_Aprobador_2 === undefined) ||
                    (d.Estado_Marcado_Aprobador_1 === null && d.Estado_Marcado_Aprobador_2 === null) ||
                    (d.Estado_Marcado_Aprobador_1 === 'Aceptado' && d.Estado_Marcado_Aprobador_2 === '') ||
                    (d.Estado_Marcado_Aprobador_1 === 'Aceptado' && d.Estado_Marcado_Aprobador_2 === null) ||
                    (d.Estado_Marcado_Aprobador_1 === 'Aceptado' && d.Estado_Marcado_Aprobador_2 === undefined)
                );

                setDataReportsAccepts(FilterdataReportsAccepts);
                setDataReportsRejects(FilterdataReportsRejects);
                setDataReportsPending(FilterdataReportsPending);
                setDataTardines(response);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    }, [fullName, setDataTardines]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataNovelties();
        }
    }, [getDataNovelties, fullName]);

    //buscador de la tabla 
    const filteredItems = Array.isArray(dataTardiness) && dataTardiness.filter(item =>
        item.Fecha_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Hora_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Impuntualidad.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Numero_Apolo.toLowerCase().includes(searchQuery.toLowerCase())
    );









    // * OBTIENE EL LISTADO DE EL TIPO DE IMPUNTUALIDADES
    useEffect(() => {
        setLoading(true);
        const getAllListTardiness = async () => {
            const DATA = await getAllListTypeTardiness();
            setListTardiness(DATA);
            setLoading(false);
        };

        getAllListTardiness();
    }, []); // Sin dependencias para que solo se ejecute una vez al montar el componente


    
    

    const onSubmit = () => {
        apiClient.post(`http://${Servidor}/API/SAVE/TARDINESS-REQUEST/`, {
            dateTardiness,
            dateTardinessTwo,
            Documento,
            Usuario_Red,
            Nombre_Completo,
            Cliente_Area,
            Cargo,
            Servicio,
            typeTardiness,
            numberApolo,
            Number_Iccp,
            Number_Diag,
            Name_Diag,
            description,
            Jefe_Inmediato,
            Documento_Jefe_Inmediato
        })
            .then((response) => {
                
                getDataNovelties();

                api.success({
                    message: `${response.data}`,
                });
            })
            .catch((response) => {
                api.error({
                    message: `${response.data}`,
                });
            });
        getDataNovelties();
        handleClose();
        clearCells();
    }

    const statusTardiness = (tardiness) => {
        if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Aceptado') {
            return 'Filled';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Rechazado') {
            return 'Rejected';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Rechazado') {
            return 'Rejected';
        } else if (tardiness.Estado_Marcado_Aprobador_2 === 'Rechazado') {
            return 'Rejected';
        } else {
            return 'PartiallyFilled';
        }
    };

    const renderStatus = (tardiness) => {
        if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Aceptado') {
            return 'Aceptado';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Rechazado') {
            return 'Rechazado';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Rechazado') {
            return 'Rechazado';
        } else if (tardiness.Estado_Marcado_Aprobador_2 === 'Rechazado') {
            return 'Rechazado';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === '') {
            return 'Pendiente';
        } else {
            return 'Pendiente';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    //COLUMNAS DE LA TABLA 
    const columns = [

        {
            field: 'Fecha_Solicitud',
            headerName: 'Fecha Solicitud',
            flex: 1,
            renderCell: (params) => { return (formatDate(params.value)); }
        },
        { field: 'Hora_Solicitud', headerName: 'Hora Solicitud', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Tipo_Impuntualidad', headerName: 'Tipo impuntualidad', flex: 1 },
        { field: 'Numero_Apolo', headerName: 'Soporte', flex: 1 },
        { field: 'Estado', headerName: 'Estado', flex: 1, renderCell: (params) => { return (renderStatus(params.row)); } },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button size='sm' color='primary' variant='soft' onClick={() => { handleOpenDetails(params.row); }}><SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        }
    ];



    return (
        <>
            {contextHolder}
            <div className='title-horas-nomina mb-5'>Mis Ausencias</div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: '5%', marginBottom: '4%' }}>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>
                            <ItemContentCards sx={{ top: -40, left: 20, zIndex: 1, width: 60, height: 60, border: '5px solid #ffffff8c', display: 'flex', bgcolor: '#f9d2b3', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                <HourglassFullRoundedIcon color='warning' />
                            </ItemContentCards>
                            <Card sx={{ bgcolor: '#dec6b26e', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <div className='spinner-border text-warning' role='status' />
                                        ) : (
                                            <div style={{ color: '#ed6c02', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Pendientes: {dataReportsPending && dataReportsPending ? (dataReportsPending.length) : `0`}
                                            </div>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>
                            <ItemContentCards sx={{ top: -40, left: 20, zIndex: 1, width: 60, height: 60, border: '5px solid #ffffff8c', display: 'flex', bgcolor: '#c0d8c1', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckRoundedIcon color='success' />
                            </ItemContentCards>
                            <Card sx={{ bgcolor: '#c0d8c16b', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <div className='spinner-border text-success' role='status' />
                                        ) : (
                                            <div style={{ color: '#2e7d32', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Aceptados: {dataReportsAccepts && dataReportsAccepts ? (dataReportsAccepts.length) : `0`}
                                            </div>

                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>
                            <ItemContentCards sx={{ top: -40, left: 20, zIndex: 1, width: 60, height: 60, border: '5px solid #ffffff8c', display: 'flex', bgcolor: '#e99797', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                <CloseRoundedIcon color='error' />
                            </ItemContentCards>
                            <Card sx={{ bgcolor: '#e9979764', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <div className='spinner-border text-danger' role='status' />
                                        ) : (
                                            <div style={{ color: '#d63d3d', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Rechazados: {dataReportsRejects && dataReportsRejects ? (dataReportsRejects.length) : `0`}
                                            </div>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>




            <ItemContent className='card border-light'>
                <div className='d-flex'>
                    <div className='p-2 flex-grow-1'>
                        <div className='title-horas-nomina'>Reportes</div>
                    </div>
                    <div className='p-2 align-self-center'>
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
                    <div className='p-2 align-self-center'>
                        <Button variant='soft' size='sm' color='primary' onClick={() => handleOpen()}><AddRoundedIcon fontSize='medium' color='primary' />Generar Reporte</Button>
                    </div>
                </div>
                <div className='card-body'>
                    <div style={{ width: '100%' }}>
                        {Array.isArray(dataTardiness) ? (

                            <StyledDataGrid
                                rowHeight={40}
                                columns={columns}
                                rows={filteredItems}
                                pageSizeOptions={[PAGE_SIZE]}
                                paginationModel={paginationModel}
                                getRowId={(data) => data.Id}
                                onPaginationModelChange={setPaginationModel}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                getRowClassName={(params) => `super-app-theme--${statusTardiness(params.row)}`}
                                slots={{
                                    noRowsOverlay: CustomNoRowsOverlay,
                                    pagination: CustomPagination
                                }}
                            />

                        ) : (CustomNoRowsOverlay())}
                    </div>
                </div>

            </ItemContent >

            <ReportsTardiness
                open={open}
                Modal={Modal}
                Button={Button}
                fullName={fullName}
                onSubmit={onSubmit}
                Name_Diag={Name_Diag}
                Number_Iccp={Number_Iccp}
                Number_Diag={Number_Diag}
                handleClose={handleClose}
                numberApolo={numberApolo}
                description={description}
                listTardiness={listTardiness}
                typeTardiness={typeTardiness}
                dateTardiness={dateTardiness}
                handleName_Diag={handleName_Diag}
                dateTardinessTwo={dateTardinessTwo}
                ItemContentModal={ItemContentModal}
                handleNumber_Diag={handleNumber_Diag}
                handleNumber_Iccp={handleNumber_Iccp}
                handleNumberApolo={handleNumberApolo}
                handleDescription={handleDescription}
                selectTypeTardiness={selectTypeTardiness}
                handleTypeTardiness={handleTypeTardiness}
                handleDateTardiness={handleDateTardiness}
                handleDateTardinessTwo={handleDateTardinessTwo}
                setSelectTypeTardiness={setSelectTypeTardiness}
            />

            <DetailsTardiness
                Modal={Modal}
                openDetails={openDetails}
                selectDetails={selectDetails}
                ItemContentModal={ItemContentModal}
                handleCloseDetails={handleCloseDetails}
            />
        </>
    )
}

export default Tardiness;