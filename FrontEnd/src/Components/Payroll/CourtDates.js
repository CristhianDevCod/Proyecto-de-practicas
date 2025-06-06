import { React, useCallback, useEffect, useState, Box, CheckCircleRoundedIcon, AddCircleOutlineRoundedIcon, Tooltip, IconButton, EditRoundedIcon, useContext, Button } from '../../Exports-Modules/Exports';
import { esES } from '@mui/x-data-grid';
import { ItemContent, StyledDataGrid, CustomPagination, CustomNoRowsOverlay, Item } from './Styles/Styles';
import { GETCOURTDATES } from '../../API/API';
import AddCourtDates from './AddCourtDates';
import EditCourtDates from './EditCourtDates';
import { UserProfileContext } from '../../Context/ProfileContex';

const CourtDates = () => {

    const PAGE_SIZE = 6;
    const { fullName } = useContext(UserProfileContext);
    const [loading, setLoading] = useState(true);
    const [dataCourtDates, setCourtDates] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });
    const [openAddCourtDate, setOpenAddCourtDate] = useState(false);
    const [openEditCourtDate, setOpenEditCourtDate] = useState(false);
    const [selectedCourtDate, setSelectedCourtDate] = useState(null);



    const getCourtsDates = useCallback(async () => {
        try {
            setLoading(true);
            const data = await GETCOURTDATES();
            setLoading(false);
            setCourtDates(data || []);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, []);

    const closeModalAddCourtDate = () => {
        setOpenAddCourtDate(false);
    };
    const openModalAddCourtDate = () => {
        setOpenAddCourtDate(true);
    };

    const closeModalEditCourtDate = () => {
        setOpenEditCourtDate(false);
        setSelectedCourtDate(null);
    };
    const openModalEditCourtDate = () => {
        setOpenEditCourtDate(true);
    };


    // Función para determinar el color de la fila basado en la fecha de pago
    function renderColorStateCulminate(row) {
        const today = new Date();
        const paymentDate = new Date(row.fecha_pago);

        if (paymentDate < today) {
            return 'Filled';
        } else if (
            paymentDate >= today &&
            paymentDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
        ) {
            return 'Open';
        } else {
            return 'PartiallyFilled';
        }
    }
    // Función para determinar el SI, PROXIMO PAGO Y NO de la fila basado en la fecha de pago
    function renderCulmateState(row) {
        const today = new Date();
        const paymentDate = new Date(row.fecha_pago);

        if (paymentDate < today) {
            return 'SI';
        } else if (
            paymentDate >= today &&
            paymentDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
        ) {
            return 'PROXIMO PAGO';
        } else {
            return 'NO';
        }
    }

    // Función para determinar el ESTILO de la fila basado en la fecha de pago
    function renderCulmateStateStyle(row) {
        const today = new Date();
        const paymentDate = new Date(row.fecha_pago);

        if (paymentDate < today) {
            return '#149025';
        } else if (
            paymentDate >= today &&
            paymentDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
        ) {
            return 'blue';
        } else {
            return '#ff444e';
        }
    }

    function EditCourtDate(params) {
        const state = renderCulmateState(params);
        if (state === 'SI') {
            return '';
        } else if (state === 'PROXIMO PAGO') {
            return '';
        } else {
            return (
                <Tooltip title='Editar fecha corte'>
                    <IconButton color='warning' onClick={() => { openModalEditCourtDate(); setSelectedCourtDate(params); }}><EditRoundedIcon /></IconButton>
                </Tooltip >
            )
        }
    }

    useEffect(() => {
        getCourtsDates();
    }, [getCourtsDates])

    //columnas de la tabla 
    const columns = [
        { field: 'mes', headerName: 'Mes', flex: 1 },
        { field: 'fecha_pago', headerName: 'Fecha Pago', flex: 1 },
        { field: 'inicio_corte', headerName: 'Inicio Corte', flex: 1 },
        { field: 'fin_corte', headerName: 'Fin Corte', flex: 1 },
        { field: 'plazo_reporte_novedades', headerName: 'Plazo Reporte Novedades', flex: 1 },
        {
            field: 'Culminado', headerName: 'Culminado', flex: 1,
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', color: renderCulmateStateStyle(params.row) }}>
                    {renderCulmateState(params.row)}
                </span>
            )
        },
        Array.isArray(fullName) && fullName.find((d) =>
            d.Usuario_Red === 'scarrera' ||
            d.Usuario_Red === 'jncardoza' ||
            d.Usuario_Red === 'rgtacha' ||
            d.Usuario_Red === 'csalazar' ||
            d.Usuario_Red === 'walvarez'
        ) ? { field: 'Editar', headerName: 'Editar', flex: 1, renderCell: (params) => (EditCourtDate(params.row)) } : ''
    ];

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 5 }}>
                <Item elevation={10}>
                    <div className='d-flex justify-content-between'>
                        <div className='p-2'>
                            <CheckCircleRoundedIcon fontSize='large' className='color-icon-accepts' />
                        </div>
                        <div className='p-2 d-flex align-items-center'>
                            <div className='text-muted-titles'>CORTES DE NOMINA</div>
                        </div>
                    </div>
                </Item>
            </Box>


            <ItemContent>
                <div className="alert alert-info fw-bold" role="alert">
                    Las fechas de corte corresponden al periodo que se toma para liquidación de Recargos, Horas Extras, Descuentos por Impuntualidad, y Descuentos por Ausencias, que serán pagados en la quincena que se indica para cada corte.
                </div>

                {Array.isArray(fullName) && fullName.find((d) =>
                    d.Usuario_Red === 'scarrera' ||
                    d.Usuario_Red === 'jncardoza' ||
                    d.Usuario_Red === 'rgtacha' ||
                    d.Usuario_Red === 'csalazar' ||
                    d.Usuario_Red === 'walvarez') ?
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1"></div>
                        <div className="p-2">
                            <Tooltip title='Añadir fecha corte'>
                                <Button variant='contained' color='success' onClick={() => openModalAddCourtDate()} startIcon={<AddCircleOutlineRoundedIcon />}>Añadir</Button>
                            </Tooltip>
                        </div>
                    </div>
                    : ''}
                <div style={{ height: '100%', width: '100%' }}>
                    {!loading && (
                        <StyledDataGrid
                            rowHeight={20}
                            columns={columns}
                            rows={dataCourtDates}
                            pageSizeOptions={[PAGE_SIZE]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            getRowId={(data) => data.id_corte}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            getRowClassName={(params) => `super-app-theme--${renderColorStateCulminate(params.row)}`}
                            slots={{
                                noRowsOverlay: CustomNoRowsOverlay,
                                pagination: CustomPagination,
                            }}
                        />
                    )}
                </div>
            </ItemContent>

            <AddCourtDates
                getCourtsDates={getCourtsDates}
                openAddCourtDate={openAddCourtDate}
                closeModalAddCourtDate={closeModalAddCourtDate}
            />

            <EditCourtDates
                getCourtsDates={getCourtsDates}
                selectedCourtDate={selectedCourtDate}
                openEditCourtDate={openEditCourtDate}
                closeModalEditCourtDate={closeModalEditCourtDate}
            />
        </>
    )
}

export default CourtDates;