import { React, useState, useEffect, useContext, SearchRoundedIcon, CircularProgress, TextField, Modal, useCallback } from '../../../../Exports-Modules/Exports';
import { Button } from '@mui/joy';
import { esES } from '@mui/x-data-grid';

import '../../Styles/Styles.css'

import { ItemContent, ItemContentModal, CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid } from '../../Styles/Styles';
import { UserProfileContext } from '../../../../Context/ProfileContex';
import { getAllTardinessForBoss } from '../../../../API/API';
import DetailsTardinessGroup from './DetailsTardinessGroup/DetailsTardinessGroup';


const TardinessMyGroup = () => {
    const { fullName } = useContext(UserProfileContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [seletedDetails, setSeletedDetails] = useState(null);


    const [open, setOpen] = useState(false);

    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });



    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllTardinessForBoss(fullName[0].Documento); // Pasar el documento al llamar a la función

            setData(response || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
        } catch (error) {
            // setError(error);
        } finally {
            setLoading(false);
        }
    }, [fullName]);


    useEffect(() => {
        if (fullName && fullName.length > 0) {
            fetchData();
        }
    }, [fullName, fetchData]);

    const renderSupport = (support) => {
        if (support.Numero_Apolo) {
            return `Apolo ${support.Numero_Apolo}`
        } else {
            return ''
        }
    };


    //MODAL DE DETALLES
    const handleOpenModalDetailsTardiness = (item) => {
        setSeletedDetails(item);
        setOpen(true);
    };

    const handleCloseModalDetailsTardiness = () => {
        setOpen(false);
    };

    const renderStatus = (tardiness) => {
        if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Aceptado') {
            return 'Aceptado';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Rechazado') {
            return 'Rechazado';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Rechazado') {
            return 'Rechazado';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === '') {
            return 'Pendiente';
        } else {
            return 'Pendiente';
        }
    };

    const columns = [
        { field: 'Fecha_Solicitud', headerName: 'Fecha Solicitud', flex: 1 },
        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Cliente_area', headerName: 'Cliente Area', flex: 1 },
        { field: 'Servicio', headerName: 'Servicio', flex: 1 },
        { field: 'Tipo_Impuntualidad', headerName: 'Tipo Impuntualidad', flex: 1 },
        {
            field: 'Soporte',
            headerName: 'Soporte',
            flex: 1,
            renderCell: (params) => {
                renderSupport(params.row)
            }
        },
        { field: 'Estado', headerName: 'Estado', flex: 1, renderCell: (params) => { return (renderStatus(params.row)); } },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button variant='soft' color='primary' size='sm' onClick={() => { handleOpenModalDetailsTardiness(params.row) }}>
                        <SearchRoundedIcon fontSize='small' />
                    </Button>
                );
            }

        }
    ];

    const filteredItems = Array.isArray(data) && data.filter(item =>
        item.Numero_Apolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Fecha_Solicitud.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Documento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Cliente_area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Tipo_Impuntualidad.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusTardiness = (tardiness) => {
        if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Aceptado') {
            return 'Filled';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Aceptado' && tardiness.Estado_Marcado_Aprobador_2 === 'Rechazado') {
            return 'Rejected';
        } else if (tardiness.Estado_Marcado_Aprobador_1 === 'Rechazado') {
            return 'Rejected';
        } else {
            return 'PartiallyFilled';
        }
    };


    return (
        <>
            <ItemContent className='mb-4'>
                <div className='text-center'>
                    <div className='mb-0 title-metas'>Solicitudes</div>
                </div>
            </ItemContent>

            <div style={{ width: '100%' }}>
                {loading ? (
                    <CircularProgress /> // Mostrar indicador de carga mientras se obtienen los datos
                ) : (
                    <ItemContent className='card border-light'>
                        <div className='card-body'>
                            <div className='d-flex align-items-center'>
                                <div className='flex-grow-1 '>
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
                            </div>

                            <div style={{ width: '100%' }}>
                                {Array.isArray(data) && (

                                    <StyledDataGrid
                                        rowHeight={40}
                                        columns={columns}
                                        rows={filteredItems}
                                        pageSizeOptions={[PAGE_SIZE]}
                                        paginationModel={paginationModel}
                                        getRowId={(data) => data.Id}
                                        onPaginationModelChange={setPaginationModel}
                                        getRowClassName={(params) => `super-app-theme--${statusTardiness(params.row)}`}
                                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                        slots={{
                                            noRowsOverlay: CustomNoRowsOverlay,
                                            pagination: CustomPagination
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </ItemContent>
                )}
            </div >

            <DetailsTardinessGroup
                open={open}
                Modal={Modal}
                seletedDetails={seletedDetails}
                ItemContentModal={ItemContentModal}
                handleCloseModalDetailsTardiness={handleCloseModalDetailsTardiness}
            />
        </>
    )
}

export default TardinessMyGroup