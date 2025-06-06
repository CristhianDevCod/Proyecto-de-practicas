import { React, useState, useEffect, useContext, SearchRoundedIcon, CircularProgress, TextField, CloseRoundedIcon, DoneRoundedIcon, Modal, WarningRoundedIcon, useCallback, notification, FileDownloadRoundedIcon } from '../../../../Exports-Modules/Exports';
import { Button } from '@mui/joy';

import '../../Styles/Styles.css'
import * as XLSX from 'xlsx';
import { esES } from '@mui/x-data-grid';


import { ItemContent, ItemContentModal } from '../../Styles/Styles';
import { CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid } from './Styles/Styles';
import { UserProfileContext } from '../../../../Context/ProfileContex';
import { GETLISTTARDINESSNOIMINA, PERMISSIONSCLIENTSNOMINA } from '../../../../API/API';
import Service from '../../../../Machine/Service';
import AcceptsAndRejectsTardinessNomina from './AcceptsAndRejects/AcceptsAndRejectsTardinessNomina';
import DetailsTardinessNomina from './DetailsTardinessNomina/DetailsTardinessNomina';
import apiClient from '../../../../Service/Service';

const TardinessMyGroup = () => {
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
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');

    const [Observacion_2, setObservacion_1] = useState('');
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = response.map((item) => item.Cliente_Permiso);
            const TardinessMyGroupNomina = await GETLISTTARDINESSNOIMINA(Cliente);
            // Combina los resultados en un solo array
            const combinedData = [
                ...TardinessMyGroupNomina.aprobados,
                ...TardinessMyGroupNomina.tiposImpuntualidad
            ];
            const filterData = combinedData.filter(item =>
                item.Tipo_Impuntualidad !== 'LLAMADA LARGA' &&
                item.Tipo_Impuntualidad !== 'NO HAY PUESTOS' &&
                item.Tipo_Impuntualidad !== 'SALIDA TEMPRANO JUSTIFICADA'
            );
            setData(filterData || []); // Si la respuesta es null o undefined, establece un array vacío
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
    }, [fetchData, fullName]);

    const renderSupport = (support) => {
        if (support.Numero_Apolo) {
            return `Apolo #${support.Numero_Apolo}`
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

    const onSubmit = async (Estado) => {
        let Estado_Marcado_Aprobador_2 = Estado;
        if (fullName && seletedDetails && Estado_Marcado_Aprobador_2) {

            if (
                (seletedDetails.Tipo_Impuntualidad === 'INCAPACIDAD POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' ||
                    seletedDetails.Tipo_Impuntualidad === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' ||
                    seletedDetails.Tipo_Impuntualidad === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' ||
                    seletedDetails.Tipo_Impuntualidad === 'LICENCIA DE MATERNIDAD' ||
                    seletedDetails.Tipo_Impuntualidad === 'LICENCIA DE PATERNIDAD (LEY MARIA)' ||
                    seletedDetails.Tipo_Impuntualidad === 'LICENCIA POR LUTO' ||
                    seletedDetails.Tipo_Impuntualidad === 'SANCION POR PROCESO DISCIPLINARIO' ||
                    seletedDetails.Tipo_Impuntualidad === 'CAMALIDAD DOMESTICA DEBIDAMENTE COMPROBADA' ||
                    seletedDetails.Tipo_Impuntualidad === 'INCIDENCIA CON USUARIO' ||
                    seletedDetails.Tipo_Impuntualidad === 'INCIDENCIA TECNICA' ||
                    seletedDetails.Tipo_Impuntualidad === 'LACTANCIA') && Estado_Marcado_Aprobador_2 === 'Aceptado'
            ) {

                const Aprobador_2 = fullName.map((item) => `${item.Nombres} ${item.Apellidos}`);
                const Documento_2 = fullName.map((item) => item.Documento);

                const Documento = seletedDetails.Documento;
                const Tipo_Impuntualidad = seletedDetails.Tipo_Impuntualidad;
                const Fecha_Solicitud = seletedDetails.Fecha_Solicitud;
                const Fecha_Fin_Solicitud = seletedDetails.Fecha_Fin_Solicitud;

                await apiClient.put(`http://${Servidor}/API/REJECTSORACCEPTS/TARDINESS/NOMINA/V2/${seletedDetails.Id}`, {
                    Aprobador_2,
                    Documento_2,
                    Estado_Marcado_Aprobador_2,
                    Observacion_2,

                    Documento,
                    Tipo_Impuntualidad,
                    Fecha_Solicitud,
                    Fecha_Fin_Solicitud
                });
                fetchData();
                handleCloseCancel();
                handleCloseAccepts();
                setData(prevData => prevData.filter(item => item.Id !== seletedDetails.Id));
                api.success({
                    message: 'Éxito!!!',
                    description: `La solicitud ha sido ${Estado_Marcado_Aprobador_2} correctamente!!!`

                });
            } else {

                const Documento_2 = fullName.map((item) => item.Documento);
                const Aprobador_2 = fullName.map((item) => `${item.Nombres} ${item.Apellidos}`);

                const Documento = seletedDetails.Documento;
                const Tipo_Impuntualidad = seletedDetails.Tipo_Impuntualidad;
                const Fecha_Solicitud = seletedDetails.Fecha_Solicitud;
                const Fecha_Fin_Solicitud = seletedDetails.Fecha_Fin_Solicitud;

                await apiClient.put(`http://${Servidor}/API/REJECTSORACCEPTS/TARDINESS/NOMINA/${seletedDetails.Id}`, {
                    Aprobador_2,
                    Documento_2,
                    Estado_Marcado_Aprobador_2,
                    Observacion_2,

                    Documento,
                    Tipo_Impuntualidad,
                    Fecha_Solicitud,
                    Fecha_Fin_Solicitud
                });
                fetchData();
                handleCloseCancel();
                handleCloseAccepts();
                setData(prevData => prevData.filter(item => item.Id !== seletedDetails.Id));
                api.success({
                    message: 'Éxito!!!',
                    description: `La solicitud ha sido ${Estado_Marcado_Aprobador_2} correctamente!!!`

                });
            }

        } else {
            api.error({
                message: 'Error!!!',
                description: `No se ha podido realizar la solicitud correctamente!!!`

            });
        }
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
    const maxDates = `${currentYear}-${maxMonth}`;

    const exportDataTardinesNomina = async () => {
        setIsLoadingExport(true);
        try {
            const month = `${selectedMonth}-01`;
            const response = await apiClient.get(`http://${Servidor}/API/GET/TARDINESS/ALL/NOMINA/V2/${month}`)
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
                const FileName = `Reportes de ausencias e impuntualidades.xlsx`;
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
                    <div className='mb-0 title-metas'>Solicitudes Nómina</div>
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
                                    Número de registros: {data.length}
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
                                <div className='p-2 d-flex'>
                                    <input
                                        name='Mes'
                                        type='month'
                                        max={maxDates}
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
                                        <Button variant='soft' color='primary' size='sm' disabled={!selectedMonth} onClick={exportDataTardinesNomina}><FileDownloadRoundedIcon fontSize='small' /></Button>
                                    )}
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

            <AcceptsAndRejectsTardinessNomina
                Modal={Modal}
                Button={Button}
                onSubmit={onSubmit}
                openRejects={openRejects}
                Observacion_2={Observacion_2}
                seletedDetails={seletedDetails}
                ItemContentModal={ItemContentModal}
                setObservacion_1={setObservacion_1}
                handleCloseCancel={handleCloseCancel}
                handleCloseAccepts={handleCloseAccepts}
                WarningRoundedIcon={WarningRoundedIcon}
                openAcceptsAndRejects={openAcceptsAndRejects}
            />


            <DetailsTardinessNomina
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