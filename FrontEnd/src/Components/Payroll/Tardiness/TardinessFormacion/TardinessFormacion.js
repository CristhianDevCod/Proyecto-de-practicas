import { React, useState, useEffect, useContext, SearchRoundedIcon, CircularProgress, TextField, CloseRoundedIcon, DoneRoundedIcon, Modal, WarningRoundedIcon, useCallback, notification } from '../../../../Exports-Modules/Exports';
import { Button } from '@mui/joy';
import { esES } from '@mui/x-data-grid';

import '../../Styles/Styles.css'

import { ItemContent, ItemContentModal, CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid } from '../../Styles/Styles';
import { UserProfileContext } from '../../../../Context/ProfileContex';
import { GETALLTADINESSFORMACION, PERMISSIONSCLIENTSNOMINA } from '../../../../API/API';

import Service from '../../../../Machine/Service';
import AcceptsAndRejectsTardinessFormacion from './AcceptsAndRejects/AcceptsAndRejectsTardinessFormacion';
import DetailsTardinessFormacion from './DetailsTardinessFormacion/DetailsTardinessFormacion';
import apiClient from '../../../../Service/Service';

const TardinessFormacion = () => {
    const [api, contextHolder] = notification.useNotification();
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [seletedDetails, setSeletedDetails] = useState(null);

    const [open, setOpen] = useState(false);
    const [openAcceptsAndRejects, setOpenAcceptsAndRejects] = useState(false);
    const [openRejects, setOpenRejects] = useState(false);

    const [Observacion_1, setObservacion_1] = useState('');
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const responseCliente = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = responseCliente.map((item) => item.Cliente_Permiso);
            const response = await GETALLTADINESSFORMACION(Cliente); // Pasar el documento al llamar a la función
            const filteredData = response.filter(item => item.Tipo_Impuntualidad === 'FORMACION' || item.Tipo_Impuntualidad === 'FORMACION NESTING');
            setData(filteredData || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
        } catch (error) {
            // setError(error);
        } finally {
            setLoading(false);
        }
    }, [fullName]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    //MODAL DE ACEPTAR
    const handleOpenAccepts = (item) => {
        setSeletedDetails(item);
        setOpenAcceptsAndRejects(true);
    }

    const handleCloseAccepts = (Item) => {
        setOpenAcceptsAndRejects(false);
    }

    //MODAL DE CANCELAR

    const handleOpenCancel = (item) => {
        setSeletedDetails(item);
        setOpenRejects(true);
    }

    const handleCloseCancel = (Item) => {
        setOpenRejects(false);
    }

    const clearCells = () => {
        setObservacion_1('');
    };

    const onSubmit = async (Estado) => {
        let Estado_Marcado_Aprobador_1 = Estado;
        if (fullName && seletedDetails && Estado_Marcado_Aprobador_1) {

            const Aprobador_1 = fullName.map((item) => `${item.Nombres} ${item.Apellidos}`);
            const Documento_1 = fullName.map((item) => item.Documento);
            await apiClient.put(`http://${Servidor}/API/REJECTSORACCEPTS/TARDINESS/${seletedDetails.Id}`, { Aprobador_1, Documento_1, Estado_Marcado_Aprobador_1, Observacion_1 });
            fetchData();
            clearCells();
            handleCloseCancel();
            handleCloseAccepts();
            setData(prevData => prevData.filter(item => item.Id !== seletedDetails.Id));
            api.success({
                message: 'Éxito!!!',
                description: `La solicitud ha sido ${Estado_Marcado_Aprobador_1} correctamente!!!`

            });
        } else {
            api.error({
                message: 'Error!!!',
                description: `No se ha podido realizar la solicitud correctamente!!!`

            });
        }
    }

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
        {
            field: 'Accion',
            headerName: 'Escalamientos',
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className='d-flex'>
                        <div className='p-1'>
                            <Button variant='soft' color='danger' size='sm' onClick={() => { handleOpenCancel(params.row) }}>
                                <CloseRoundedIcon fontSize='small' color='error' />
                            </Button>
                        </div>

                        <div className='p-1'>
                            <Button variant='soft' color='success' size='sm' onClick={() => { handleOpenAccepts(params.row) }}>
                                <DoneRoundedIcon fontSize='small' color='success' />
                            </Button>
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


    return (
        <>
            {contextHolder}
            <ItemContent className='mb-4'>
                <div className='text-center'>
                    <div className='mb-0 title-metas'>Solicitudes Formación</div>
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

            <AcceptsAndRejectsTardinessFormacion
                Modal={Modal}
                Button={Button}
                onSubmit={onSubmit}
                openRejects={openRejects}
                Observacion_1={Observacion_1}
                seletedDetails={seletedDetails}
                ItemContentModal={ItemContentModal}
                setObservacion_1={setObservacion_1}
                handleCloseCancel={handleCloseCancel}
                handleCloseAccepts={handleCloseAccepts}
                WarningRoundedIcon={WarningRoundedIcon}
                openAcceptsAndRejects={openAcceptsAndRejects}
            />


            <DetailsTardinessFormacion
                open={open}
                Modal={Modal}
                seletedDetails={seletedDetails}
                ItemContentModal={ItemContentModal}
                handleCloseModalDetailsTardiness={handleCloseModalDetailsTardiness}
            />
        </>
    )
}

export default TardinessFormacion