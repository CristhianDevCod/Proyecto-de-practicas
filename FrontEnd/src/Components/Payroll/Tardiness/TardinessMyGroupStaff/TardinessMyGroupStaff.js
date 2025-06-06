import { React, useState, useEffect, useContext, SearchRoundedIcon, CircularProgress, TextField, CloseRoundedIcon, DoneRoundedIcon, Modal, WarningRoundedIcon, useCallback, notification, Box, Tabs, Tab } from '../../../../Exports-Modules/Exports';
import { Button } from '@mui/joy';
import { esES } from '@mui/x-data-grid';
import '../../Styles/Styles.css'

import { ItemContent, ItemContentModal, CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid, a11yProps, CustomTabPanel } from '../../Styles/Styles';
import { UserProfileContext } from '../../../../Context/ProfileContex';
import { getAllTardinessForBossStaff, getAllTardinessForBossStaffList } from '../../../../API/API';
import DetailsTardinessGroup from './DetailsTardinessGroup/DetailsTardinessGroup';
import AcceptsAndRejectsTardinessGroup from './AcceptsAndRejects/AcceptsAndRejectsTardinessGroup';
import Service from '../../../../Machine/Service';
import apiClient from '../../../../Service/Service';

const TardinessMyGroupStaff = () => {
    const [api, contextHolder] = notification.useNotification();
    const { Servidor } = Service();
    const { fullName } = useContext(UserProfileContext);
    const [value, setValue] = React.useState(0);

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [seletedDetails, setSeletedDetails] = useState(null);


    const [open, setOpen] = useState(false);
    const [openAcceptsAndRejects, setOpenAcceptsAndRejects] = useState(false);
    const [openRejects, setOpenRejects] = useState(false);

    const [Observacion_1, setObservacion_1] = useState('');
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

    //manejadore de los tabs 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllTardinessForBossStaff(fullName[0].Documento); // Pasar el documento al llamar a la función
            // Filtrar los reportes para excluir aquellos de Tipo_Impuntualidad "FORMACIÓN"
            const filteredData = response.filter(item =>
                item.Tipo_Impuntualidad === 'LICENCIA NO REMUNERADA' ||
                item.Tipo_Impuntualidad === 'LICENCIA REMUNERADA' ||
                item.Tipo_Impuntualidad === 'VACACION' ||
                item.Tipo_Impuntualidad === 'DIA DE LA FAMILIA' ||
                item.Tipo_Impuntualidad === 'SALIDA TEMPRANO JUSTIFICADA');
            setData(filteredData || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
        } catch (error) {
            // setError(error);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    const fetchDatas = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllTardinessForBossStaffList(fullName[0].Documento); // Pasar el documento al llamar a la función
            setData2(response || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
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

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            fetchDatas();
        }
    }, [fullName, fetchDatas]);

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

            await apiClient.put(`http://${Servidor}/API/REJECTSORACCEPTS/TARDINESS/MYGROUP/STAFF/${seletedDetails.Id}`, { Aprobador_1, Documento_1, Estado_Marcado_Aprobador_1, Observacion_1 });
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

    const renderStatus = (tardiness) => {
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

    const columns = [
        { field: 'Fecha_Solicitud', headerName: 'Fecha Solicitud', flex: 1 },
        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Nombre_Completo', headerName: 'Nombre Completo', flex: 1 },
        { field: 'Cliente_area', headerName: 'Cliente Area', flex: 1 },
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
            field: 'Escalamiento',
            headerName: 'Escalamiento',
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
            }

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
    const columns2 = [
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
    const filteredItems2 = Array.isArray(data2) && data2.filter(item =>
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
                    <div className='mb-0 title-metas'>Solicitudes</div>
                </div>
            </ItemContent>

            <div style={{ width: '100%' }}>
                {loading ? (
                    <CircularProgress /> // Mostrar indicador de carga mientras se obtienen los datos
                ) : (
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

                        <ItemContent>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                <Tabs value={value} onChange={handleChange} aria-label='all info for adviser'>
                                    <Tab label='Historial de solicitudes' {...a11yProps(0)} />
                                    <Tab label='Solicitudes mi equipo' {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
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
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
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
                                {Array.isArray(data) && (

                                    <StyledDataGrid
                                        rowHeight={40}
                                        columns={columns2}
                                        rows={filteredItems2}
                                        pageSizeOptions={[PAGE_SIZE]}
                                        paginationModel={paginationModel}
                                        getRowId={(data) => data.Id}
                                        onPaginationModelChange={setPaginationModel}
                                        getRowClassName={(params) => `super-app-theme--${renderStatus(params.row)}`}
                                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                        slots={{
                                            noRowsOverlay: CustomNoRowsOverlay,
                                            pagination: CustomPagination
                                        }}
                                    />
                                )}
                            </CustomTabPanel>

                        </ItemContent >
                    </div>
                )}
            </div >

            <AcceptsAndRejectsTardinessGroup
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

export default TardinessMyGroupStaff;