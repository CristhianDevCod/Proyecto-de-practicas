import {
    React,
    useState,
    useContext,
    useEffect,
    Modal,
    Grid,
    Box,
    TextField,
    CheckRoundedIcon,
    CloseRoundedIcon,
    SearchRoundedIcon,
    HourglassFullRoundedIcon,
    useCallback,
} from '../../../Exports-Modules/Exports';
import { esES } from '@mui/x-data-grid';

import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';


import { CustomNoRowsOverlay, Item, ItemContentCards, ItemContent, StyledDataGrid, PAGE_SIZE, CustomPagination, ItemContentModal } from './Styles/Styles';
import GenerateRequest from './GenerateRequest/GenerateRequest';
import DetailsNotificationNovelties from './Details/DetailsNotificationNovelties'

import './Styles/Styles.css';
import Header from './Header/Header';
import { getAllListNoveltiesClient, getAllMyNovelties } from '../../../API/API';
import { UserProfileContext } from '../../../Context/ProfileContex';
import { NotificationsContextNoveltie } from '../../../Context/ContextNotificationNoveltie';

//HOOKS
import { NoveltiesPending, NoveltiesAccepts, NoveltiesRejects } from './Hooks/Hooks';


const Noveltie = () => {
    const { fullName } = useContext(UserProfileContext);
    const { formDataNovelties, handleformDataNovelties, handleSubmitNoveltie, contextHolder, daysBetween, validErrors, Codigo } = useContext(NotificationsContextNoveltie);
    const nolveltiePending = NoveltiesPending(fullName);
    const nolveltieAccepts = NoveltiesAccepts(fullName);
    const nolveltieRejects = NoveltiesRejects(fullName);
    const [open, setOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [listNovelties, setListNovelties] = useState([]);
    const [dataNovelties, setDataNovelties] = useState([]);
    const [seletedNotificationNovelties, setSeletedNotificationNovelties] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


    //MANEJADORES DE EL MODAL DE SOLICITUDES
    const hanldeOpenModal = () => {
        setOpen(true);
    };

    const hanldeCloseModal = () => {
        setOpen(false);
    };


    const hanldeCloseModalDetails = () => {
        setOpenDetails(false);
    };

    const hanldeOpenModalDetails = () => {
        setOpenDetails(true);
    };

    // LISTADO DE NOVEDADES
    const GetListNovelties = async () => {
        const DATA = await getAllListNoveltiesClient();
        setListNovelties(DATA);
    };

    useEffect(() => {
        GetListNovelties();
    }, []);


    //EFECTO PARA OBTENER LOS REGISTROS DE NOVEDADES 
    const getDataNovelties = useCallback(async () => {
        try {
            setLoading(false);
            const response = await getAllMyNovelties(fullName[0].Usuario_Red);
            setDataNovelties(response);

        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }, [fullName]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataNovelties();
        };
    }, [getDataNovelties, fullName]);

    //MAXIMO DE DÍAS PARA PEDIR LA NOVEDAD 
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const thirtyDaysLater = new Date(tomorrow);
    thirtyDaysLater.setUTCDate(thirtyDaysLater.getUTCDate() + 30);
    const maxDate = thirtyDaysLater.toISOString().split('T')[0];

    //MANEJADOR PARA VER EL DETALLE SEGUN LA COLUMNA SELECCIONADA EN LA TABLA 
    const handelDetailsNovelties = (message) => {
        setSeletedNotificationNovelties(message);
    };


    //MANDAMOS LA SOLICITUD Y LINPIAMOS LOS ESTADOS 
    const sendRequest = () => {
        handleSubmitNoveltie();
        formDataNovelties.Fecha_Inicio_Novedad = '';
        formDataNovelties.Fecha_Fin_Novedad = '';
        formDataNovelties.Dias_Laborales = '';
        formDataNovelties.Tipo_Solicitud = '';
        formDataNovelties.Motivo = '';
        formDataNovelties.Time_Money = '';
        formDataNovelties.How_Long = '';
        formDataNovelties.Number_Iccp = '';
        formDataNovelties.Number_Diag = '';
        formDataNovelties.Name_Diag = '';
        setTimeout(() => {
            getDataNovelties();
        }, 500);
        hanldeCloseModal();

    };


    const filteredItems = Array.isArray(dataNovelties) && dataNovelties.filter(item =>
        item.Usuario_Red.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Documento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Cliente_Area.toLowerCase().includes(searchQuery.toLowerCase())
    );




    const renderConditionsRows = (novelties) => {
        if (novelties.Estado_Marcado_Planeacion === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Planeacion === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Gerente_Area === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === '' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Planeacion === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Planeacion === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Planeacion === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === 'Aceptado' && novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado') {
            return 'Filled';
        } else {
            return 'PartiallyFilled';
        }
    }

    const renderStateNoveltie = (novelties) => {
        if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === 'Aceptado') {
            return 'Aprobado'
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Rechazado') {
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
        { field: 'Fecha_Solicitud', headerName: 'Fecha Solicitud', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Tipo_Solicitud', headerName: 'Tipo Solicitud', flex: 1 },
        { field: 'Fecha_Inicio_Novedad', headerName: 'Fecha Inicio Novedad', flex: 1 },
        { field: 'Fecha_Fin_Novedad', headerName: 'Fecha Fin Novedad', flex: 1 },
        {
            field: 'Estado', headerName: 'Estado', flex: 1,
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
                    <Button size='sm' color='primary' variant='soft' onClick={() => { handelDetailsNovelties(params.row); hanldeOpenModalDetails(); }}><SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        }
    ];

    return (
        <>
            {contextHolder}
            <Header
                Box={Box}
                Grid={Grid}
                Item={Item}
                Card={Card}
                loading={loading}
                Divider={Divider}
                CardContent={CardContent}
                ItemContentCards={ItemContentCards}
                nolveltiePending={nolveltiePending}
                nolveltieAccepts={nolveltieAccepts}
                nolveltieRejects={nolveltieRejects}
                CheckRoundedIcon={CheckRoundedIcon}
                CloseRoundedIcon={CloseRoundedIcon}
                HourglassFullRoundedIcon={HourglassFullRoundedIcon}
            />

            {Codigo ? (
                <div className='alert alert-success' role='alert'>Código de novedad generado: {Codigo}</div>
            ) : ''}
            <ItemContent className='card border-light'>
                <div className='card-body'>
                    <div className='d-flex align-items-center'>
                        <div className='flex-grow-1 text-muted'>
                            Número de registros: {filteredItems && filteredItems.length && filteredItems.length}
                        </div>
                        <div className='p-2'></div>

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
                            <Button variant='soft' color='primary' size='sm' onClick={hanldeOpenModal}>Solicitar novedad</Button>
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        {!loading && Array.isArray(dataNovelties) ? (

                            <StyledDataGrid
                                rowHeight={40}
                                columns={columns}
                                rows={filteredItems}
                                pageSizeOptions={[PAGE_SIZE]}
                                paginationModel={paginationModel}
                                getRowId={(data) => data.Id}
                                onPaginationModelChange={setPaginationModel}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                getRowClassName={(params) => `super-app-theme--${renderConditionsRows(params.row)}`}
                                slots={{
                                    noRowsOverlay: CustomNoRowsOverlay,
                                    pagination: CustomPagination
                                }}
                            />

                        ) : (CustomNoRowsOverlay())}
                    </div>
                </div>
            </ItemContent>
            {/* COMPONENETE PARA VER EL DETALLE DE EL LISTADO DE LAS NOVEDADES */}
            <DetailsNotificationNovelties
                Grid={Grid}
                Modal={Modal}
                openDetails={openDetails}
                ItemContentModal={ItemContentModal}
                hanldeCloseModalDetails={hanldeCloseModalDetails}
                seletedNotificationNovelties={seletedNotificationNovelties}
            />


            {/* COMPONENTE PARA GENERAR LA NOVEDAD */}
            <GenerateRequest
                open={open}
                Modal={Modal}
                Button={Button}
                minDate={minDate}
                maxDate={maxDate}
                fullName={fullName}
                daysBetween={daysBetween}
                validErrors={validErrors}
                sendRequest={sendRequest}
                listNovelties={listNovelties}
                hanldeCloseModal={hanldeCloseModal}
                formDataNovelties={formDataNovelties}
                handleformDataNovelties={handleformDataNovelties}

            />
        </>
    )
}

export default Noveltie;