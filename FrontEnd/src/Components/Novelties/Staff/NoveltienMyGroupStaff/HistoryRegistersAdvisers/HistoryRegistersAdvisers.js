
import {
    React,
    Modal,
    useState,
    useEffect,
    TextField,
    useContext,
    useCallback,
    SearchRoundedIcon
} from '../../../../../Exports-Modules/Exports';
import { esES } from '@mui/x-data-grid';

import Button from '@mui/joy/Button';



import '../../Styles/Styles.css';
import { GETALLMYGROUPNOVELTIESHISTORYADVISERS } from '../../../../../API/API';
import { CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid } from '../../Styles/Styles';
import { UserProfileContext } from '../../../../../Context/ProfileContex';
import DetailsNotificationNovelties from '../Details/DetailsNotificationNovelties';

const HistoryRegistersAdviders = () => {
    const { fullName } = useContext(UserProfileContext);
    const [openDetails, setOpenDetails] = useState(false);
    const [dataNovelties, setDataNovelties] = useState([]);
    const [seletedNotificationNovelties, setSeletedNotificationNovelties] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });




    const hanldeOpenModalDetails = () => {
        setOpenDetails(true);
    };

    const hanldeCloseModalDetails = () => {
        setOpenDetails(false);
    };



    //EFECTO PARA OBTENER LOS REGISTROS DE NOVEDADES 
    const getDataNovelties = useCallback(async () => {
        try {
            setLoading(false);
            const response = await GETALLMYGROUPNOVELTIESHISTORYADVISERS(fullName[0].Documento);
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


    //MANEJADOR PARA VER EL DETALLE SEGUN LA COLUMNA SELECCIONADA EN LA TABLA 
    const handelDetailsNovelties = (message) => {
        setSeletedNotificationNovelties(message);
    };

    const renderConditionsRows = (novelties) => {
        if (novelties.Estado_Marcado_Jefe_Inmediato === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Planeacion === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Gerente_Area === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Gestion_Humana === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === '' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === 'Aceptado') {
            return 'Filled';
        } else {
            return 'PartiallyFilled';
        }
    }

    const renderStateNoveltie = (novelties) => {
        if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === 'Aceptado') {
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
        { field: 'Fecha_Solicitud', headerName: 'Fecha solicitud', flex: 1 },
        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
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
                    <Button size='sm' color='primary' variant='soft' onClick={() => { handelDetailsNovelties(params.row); hanldeOpenModalDetails(); }}><SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        }
    ];

    const filteredItems = Array.isArray(dataNovelties) && dataNovelties.filter(item =>
        item.Usuario_Red.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Documento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Cliente_Area.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className='card-body'>
                <div className='d-flex align-items-center'>
                    <div className='flex-grow-1 '>
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
                            getRowClassName={(params) => `super-app-theme--${renderConditionsRows(params.row)}`}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            slots={{
                                noRowsOverlay: CustomNoRowsOverlay,
                                pagination: CustomPagination
                            }}
                        />
                    ) : (CustomNoRowsOverlay())}
                </div>
            </div>
            {/* COMPONENETE PARA VER EL DETALLE DE EL LISTADO DE LAS NOVEDADES */}
            <DetailsNotificationNovelties
                Modal={Modal}
                openDetails={openDetails}
                hanldeCloseModalDetails={hanldeCloseModalDetails}
                seletedNotificationNovelties={seletedNotificationNovelties}
            />

        </>
    )
}

export default HistoryRegistersAdviders;