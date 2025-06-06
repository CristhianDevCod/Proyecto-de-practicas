import { React, useState, useEffect, useContext, useCallback, CloseRoundedIcon, DoneRoundedIcon, ArrowLeftRoundedIcon, ArrowRightRoundedIcon, Modal, WarningRoundedIcon, FileDownloadRoundedIcon } from '../../Exports-Modules/Exports';
import * as XLSX from 'xlsx';
import Button from '@mui/joy/Button';
import Service from '../../Machine/Service';

import { NotificationsContextNoveltie } from '../../Context/ContextNotificationNoveltie';
import { UserProfileContext } from '../../Context/ProfileContex';
import './Styles/Styles.css';
import Modals from './Modals/Modals';
import { getAllListShiftsNowForSupervisor, getAllPetitionsHourExtraMyGroup } from '../../API/API';
import apiClient from '../../Service/Service';

const ExtraHoursMyGroup = () => {
    const { socket, api, contextHolder } = useContext(NotificationsContextNoveltie);
    const { fullName } = useContext(UserProfileContext);
    const { Servidor } = Service();
    const [data, setData] = useState([]);
    const [dataShifts, setDataShifts] = useState([]);
    const [originData, setOriginData] = useState([]);
    const [observaciones, setObservaciones] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const [loading, setLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [loadingExport, setLoadingExport] = useState(false);


    // FUNCION PARA OBTENER LA FECHA ACTUAL
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const now = `${year}-${month}-${day}`;

    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    const getPeticionsHoursExtra = useCallback(async () => {
        setLoading(true);
        try {
            const Documento = fullName && fullName.map((data) => data.Documento);
            const response = await getAllPetitionsHourExtraMyGroup(Documento);
            setData(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getPeticionsHoursExtra();
        }
    }, [getPeticionsHoursExtra, fullName]);

    // EFECTO PARA OBTENER EL LISTADO DE TURNOS ACTUALES Y MOSTRARSELOS A LOS GTR
    useEffect(() => {
        const getPeticionsHoursExtra = async () => {
            try {
                const Documento = fullName && fullName.map((data) => data.Documento);
                const response = await getAllListShiftsNowForSupervisor(now, Documento);
                setDataShifts(response);
                setOriginData(response);
            } catch (error) {
            }
        };
        getPeticionsHoursExtra();
    }, [Servidor, now, fullName]);

    const timePetitions = 500;
    // MANEJADOR DE ACEPTADO PARA LAS HORAS EXTRAS
    const handleAcceptHourExtra = () => {
        if (socket && selectedHour) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento_Jefe = fullName && fullName.map((data) => data.Documento);
            const Estado = 'Aceptado';
            socket.emit('acceptHoursExtra', {
                ...selectedHour,
                Fecha_Aprobador: now,
                Hora_Aprobador: time,
                Nombre_Aprobador: `${Name} ${LastName}`,
                Documento_Aprobador: Documento_Jefe,
                Observaciones: observaciones,
                Estado
            });
            setSelectedHour(null);
            setTimeout(() => {
                getPeticionsHoursExtra();
            }, timePetitions);
            handleCloseModalAccept();
            api.success({
                message: `¡Éxito!`,
                description: 'Horas extras aceptadas!!!.'
            });
        }
    };

    // MANEJADOR DE RECHAZADO PARA LAS HORAS EXTRAS
    const handleRejectHourExtra = () => {
        if (socket && selectedHour) {
            const Name = fullName && fullName.map((data) => data.Nombres);
            const LastName = fullName && fullName.map((data) => data.Apellidos);
            const Documento_Jefe = fullName && fullName.map((data) => data.Documento);
            const Estado = 'Rechazado';
            socket.emit('rejectHoursExtra', {
                ...selectedHour,
                Id: selectedHour.Id,
                Fecha_Aprobador: now,
                Hora_Aprobador: time,
                Nombre_Aprobador: `${Name} ${LastName}`,
                Documento_Aprobador: Documento_Jefe,
                Observaciones: observaciones,
                Estado
            });
            setSelectedHour(null);
            setTimeout(() => {
                getPeticionsHoursExtra();
            }, timePetitions);
            handleCloseModalReject();
            api.success({
                message: `¡Éxito!`,
                description: 'Horas extras rechazadas!!!.'
            });
        }
    };

    const handleRefresTable = async () => {
        setLoading(true); // Activa el estado loading

        try {
            await getPeticionsHoursExtra();
            setLoading(false); // Desactiva el estado loading después de obtener los datos
        } catch (error) {
            console.log(error);
            setLoading(false); // Desactiva el estado loading en caso de error
        }
    };


    // FUNCION PARA BUSCAR EL NOMBRE DEL CARGO
    // FUNCION PARA FILTRAR LOS DATOS BASADOS EN LA BÚSQUEDA
    const Filtrar = (search) => {
        const resultSearch = originData.filter((element) => {
            // Verificar si el campo Usuario_Red está vacío o si incluye el término de búsqueda
            if (element.Usuario_Red && element.Usuario_Red.toString().toLowerCase().includes(search.toLowerCase())) {
                return true; // Retornar true si se encuentra el término de búsqueda en Usuario_Red
            }
            // También permitir la búsqueda si el campo Usuario_Red está vacío
            if (!element.Usuario_Red && search.trim() === '') {
                return true; // Retornar true si el campo Usuario_Red está vacío y no hay término de búsqueda
            }
            return false; // Retornar false si no se cumple ninguna de las condiciones anteriores
        });
        setDataShifts(resultSearch); // Actualizar los datos filtrados en el estado
    };

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        Filtrar(e.target.value);
    };

    // PAGINACION DE LA TABLA
    const handleShowNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleShowPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // PAGINACION
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, dataShifts.length);
    const currentPageData = dataShifts.slice(startIndex, endIndex);

    // MANEJADOR DEL MODAL
    const handleOpenModalAccept = (hour) => {
        setSelectedHour(hour);
        setOpenAccept(true);
    };

    const handleCloseModalAccept = () => {
        setOpenAccept(false);
        setSelectedHour(null);
    };


    const handleOpenModalReject = (hour) => {
        setSelectedHour(hour);
        setOpenReject(true);
    };
    const handleCloseModalReject = () => {
        setOpenReject(false);
        setSelectedHour(null);
    };


    const handlesetObservaciones = (e) => {
        setObservaciones(e.target.value);
    }

    //FUNCION PARA FORMATEAR LAS HORAS 
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        return `${hour}:${minute}`;
    };

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


    const ExportHourExtra = async () => {
        setLoadingExport(true);
        try {
            const month = `${selectedMonth}-01`;
            let Documento = fullName.map((item) => {
                return item.Documento;
            });
            const response = await apiClient.get(`http://${Servidor}/API/GET/DATA-HOURS-EXPORT-ADVISER-FOR-BOOS/${month}/${Documento}`)
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
                const FileName = `Horas Extras ${selectedMonth}.xlsx`;
                XLSX.writeFile(wb, FileName);
            }
            setLoadingExport(false);

            // Mostrar notificación de éxito si se descargaron resultados
            if (data.length > 0) {
                api.success({
                    message: 'Éxito',
                    description: 'La descarga se ha completado con éxito.',
                });
            }
            const focusListener = () => {
                setLoadingExport(false);
                window.removeEventListener('focus', focusListener);
            };
            window.addEventListener('focus', focusListener);
        } catch (error) {
            setLoadingExport(false);
            api.error({
                message: 'Error',
                description: 'Ha ocurrido un error al exportar las horas extras. Porfavor selecciona un mes diferente'
            })

        }
    };

    const calculateEndTime = (startTime, duration) => {
        if (typeof startTime !== 'string' || !/^\d{2}:\d{2}$/.test(startTime)) {
            // Si startTime no es una cadena en el formato HH:MM, devuelve '00:00'
            return '00:00';
        }
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const totalStartMinutes = startHour * 60 + startMinute; // Convert start time to total minutes
        const totalEndMinutes = totalStartMinutes + parseInt(duration); // Add duration to total minutes
        const endHour = Math.floor(totalEndMinutes / 60); // Calculate hours from total minutes
        const endMinute = totalEndMinutes % 60; // Calculate remaining minutes
        const formattedEndHour = endHour.toString().padStart(2, '0');
        const formattedEndMinute = endMinute.toString().padStart(2, '0');
        // console.log(`${formattedEndHour}:${formattedEndMinute}`);
        return `${formattedEndHour}:${formattedEndMinute}`;
    };
    return (
        <>
            {contextHolder}
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1 text-center'>
                            <div className='mb-0 title-generate-hours-extra-GTR'>Solicitudes</div>
                        </div>
                    </div>
                </div>
            </div >

            <div className='row'>
                <div className='col-sm-8'>
                    <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                        <div className='card-body'>
                            <div className='d-flex'>
                                <div className='p-2 flex-grow-1'>
                                    <div className='mb-0 title-generate-hours-extra-GTR'>Solicitudes horas extras</div>
                                </div>
                                <div className='p-2'>
                                    <input
                                        name='Mes'
                                        type='month'
                                        max={maxDate}
                                        id='seleccioneMes'
                                        value={selectedMonth}
                                        className='form-control'
                                        onChange={handleMonthChange}
                                    />
                                </div>
                                <div className='p-2'>
                                    {loadingExport ? (
                                        <Button loading variant='solid' size='sm' />
                                    ) : (
                                        <Button variant='soft' color='primary' size='sm' disabled={!selectedMonth} onClick={ExportHourExtra}><FileDownloadRoundedIcon fontSize='small' /></Button>
                                    )}
                                </div>
                                <div className='p-2'>
                                    <Button variant='soft' size='sm' color='warning' disabled={loading} onClick={() => handleRefresTable()}>
                                        {loading ? 'Cargando...' : 'Actualizar tabla'}
                                    </Button>
                                </div>
                            </div>
                            {loading ? (
                                <div className='text-center'>
                                    <div className='spinner-border' role='status'>
                                        <span className='visually-hidden'>Cargando...</span>
                                    </div>
                                </div>
                            ) :
                                <table className='table table-borderless table-hover table-sm'>
                                    <thead>
                                        <tr className='thead-title'>
                                            <th className='text-muted'>Usuario Red</th>
                                            <th className='text-muted'>Nombre</th>
                                            <th className='text-muted'>Servicio</th>
                                            <th className='text-muted'>Fecha Turno</th>
                                            <th className='text-muted'>Turno Ini</th>
                                            <th className='text-muted'>Turno Fin</th>
                                            <th className='text-muted'>H. Extra Inicio</th>
                                            <th className='text-muted'>H. Extra Fin</th>
                                            <th className='text-muted'>Escalamiento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(data) && data.map((hours) => {
                                            return (
                                                <tr className='' key={hours.Id}>
                                                    <th className='text-muted'>{hours.Usuario_Red}</th>
                                                    <th className='text-muted'>{hours.Nombre_Completo}</th>
                                                    <th className='text-muted'>{hours.Servicio}</th>
                                                    <th className='text-muted'>{hours.Fecha_Turno}</th>
                                                    <th className='text-muted'>{formatTime(hours.Hora_Ini)}</th>
                                                    <th className='text-muted'>{formatTime(hours.Hora_Fin)}</th>
                                                    <th className='text-muted'>{formatTime(hours.Hora_Extra_Ini)}</th>
                                                    <th className='text-muted'>{calculateEndTime(formatTime(hours.Hora_Extra_Ini), hours.Hora_Extra_Fin)}</th>

                                                    <th className='text-muted'>
                                                        <div className='d-flex'>
                                                            <div className=''>
                                                                <Button size='sm' color='danger' variant='soft' onClick={() => handleOpenModalReject(hours)}><CloseRoundedIcon fontSize='small' /></Button>
                                                            </div>
                                                            <div className='ms-2'>
                                                                <Button size='sm' color='success' variant='soft' onClick={() => handleOpenModalAccept(hours)}><DoneRoundedIcon fontSize='small' /></Button>
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>

                <div className='col-sm-4'>
                    <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded' style={{ marginLeft: '2%' }}>
                        <div className='card-body'>
                            <div className='d-flex'>
                                <div className='p-1 flex-grow-1'>
                                    <div className='mb-0 title-generate-hours-extra-GTR'>Turnos del {now}</div>
                                </div>
                                <div className='p-1'>
                                    <div className='mb-0 text-muted'>Número de registros: {dataShifts.length}</div>
                                </div>
                            </div>

                            <div className='d-flex'>
                                <div className='p-2 flex-grow-1'>
                                    <input value={busqueda} onChange={handleBusqueda} placeholder='Buscar...' type='search' className='form-control form-control-sm' />
                                </div>
                                <div className='p-2'>
                                    {currentPage > 1 && (
                                        <Button variant='soft' color='primary' size='sm' onClick={handleShowPreviousPage}><ArrowLeftRoundedIcon fontSize='medium' /></Button>
                                    )}
                                </div>
                                <div className='p-2'>
                                    {currentPage * rowsPerPage < dataShifts.length && (
                                        <Button variant='soft' color='primary' size='sm' onClick={handleShowNextPage}><ArrowRightRoundedIcon fontSize='medium' /></Button>
                                    )}
                                </div>
                            </div>

                            <table className='table table-borderless table-hover table-sm'>
                                <thead>
                                    <tr className='thead-title'>
                                        <th className='text-muted'>Documento</th>
                                        <th className='text-muted'>Fecha</th>
                                        <th className='text-muted'>Inicio</th>
                                        <th className='text-muted'>Hora Salida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(dataShifts) && currentPageData.map((shifts) => {
                                        return (
                                            <tr className='' key={`${shifts.Documento}_${shifts.Fecha}_${shifts.Usuario_Red}`}>
                                                <th className='text-muted'>{shifts.Usuario_Red ? shifts.Usuario_Red.toString() : 'Not-User'}</th>
                                                <th className='text-muted'>{shifts.Fecha}</th>
                                                <th className='text-muted'>{formatTime(shifts.Turno_Ini)}</th>
                                                <th className='text-muted'>{formatTime(shifts.Turno_Fin)}</th>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                                    
            <Modals
                Modal={Modal}
                Button={Button}
                openAccept={openAccept}
                openReject={openReject}
                observaciones={observaciones}
                WarningRoundedIcon={WarningRoundedIcon}
                handleAcceptHourExtra={handleAcceptHourExtra}
                handleRejectHourExtra={handleRejectHourExtra}
                handleCloseModalAccept={handleCloseModalAccept}
                handleCloseModalReject={handleCloseModalReject}
                handlesetObservaciones={handlesetObservaciones}
            />

        </>
    );
};

export default ExtraHoursMyGroup;
