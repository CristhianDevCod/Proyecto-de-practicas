import { React, useEffect, useState, Skeleton, useContext, useCallback, CheckRoundedIcon, CircularProgress, CloseRoundedIcon, Grid, Box, CheckCircleRoundedIcon, CalendarMonthRoundedIcon, RunningWithErrorsRoundedIcon, ManageHistoryRoundedIcon, QuestionMarkRoundedIcon, ReduceCapacityRoundedIcon, ReportProblemRoundedIcon } from '../../Exports-Modules/Exports';
import { UserProfileContext } from '../../Context/ProfileContex';
import './Styles/Styles.css';


import { esES } from '@mui/x-data-grid';
import { CustomPagination, PAGE_SIZE, StyledDataGrid, CustomNoRowsOverlay, Item, ItemContent } from './Styles/Styles';

import Headers from './Headers';
import Recharge from './Recharge';
import HourExtra from './HourExtra';
import MyPayrollPie from './MyPayrollPie';
import MyPayrollCharts from './MyPayrollCharts';
import { getAllDataMyPayroll, GETCOURTDATES } from '../../API/API';

const MyPayroll = ({ handleComponentSelect }) => {
    const { fullName } = useContext(UserProfileContext);
    const [loading, setLoading] = useState(true);
    const [dataPayroll, setDataPayroll] = useState([]);
    const [dataPayrollHourExtra, setDataPayrollHourExtra] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });
    const [maxMonth, setMaxMonth] = useState('');
    const [dataCourtDates, setDataCourtDates] = useState([]);

    //columnas de la tabla 
    const columns = [
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        { field: 'turno_entrada', headerName: 'Hora Entrada', flex: 1 },
        { field: 'turno_salida', headerName: 'Hora Salida', flex: 1 },
        { field: 'horas_dimensionadas_hora', headerName: 'Horas Programadas', flex: 1 },
        { field: 'log_in', headerName: 'Log In', flex: 1 },
        { field: 'log_out', headerName: 'Log Out', flex: 1 },
        { field: 'horas_presente', headerName: 'Horas Presentes', flex: 1 },
        {
            field: 'novedad_ausencia', headerName: 'Novedad', flex: 1,
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', color: params.value === 'OK' ? '#149025' : '#ff444e' }}>
                    {params.value}
                </span>
            )
        },
        { field: 'JUSTIFICADO', headerName: 'Justificado', flex: 1 }
    ];

    function getMonthNumber(date) {
        const target = new Date(date);
        return target.getMonth() + 1;
    }


    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const monthNumber = getMonthNumber(today);

        // Formatear la fecha actual
        const formattedDate = `${year}-${monthNumber < 10 ? '0' + monthNumber : monthNumber}`;
        setMaxMonth(formattedDate);
        setSelectedMonth(formattedDate); // Establecer la semana actual
        document.getElementById('monthInput').value = formattedDate;
    }, []);

    const getCourtsDates = useCallback(async () => {
        try {
          setLoading(true);
          const data = await GETCOURTDATES();
          const todayParts = new Date().toISOString().split('T')[0].split('-');
          const todayDate = new Date(
            Number(todayParts[0]),
            Number(todayParts[1]) - 1,
            Number(todayParts[2])
          ); 
          const dateIn7Days = new Date(todayDate);
          dateIn7Days.setDate(dateIn7Days.getDate() + 7);
          dateIn7Days.setHours(23, 59, 59, 999);
          const filteredData = data.filter((item) => {
            const paymentDate = new Date(item.fecha_pago);
            return paymentDate >= todayDate && paymentDate <= dateIn7Days;
          });
          setLoading(false);
          setDataCourtDates(filteredData.length > 0 ? [filteredData[0]] : []);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      }, []);



    useEffect(() => {
        getCourtsDates();
    }, [getCourtsDates])


    const getDataMyPayroll = useCallback(async () => {
        try {
            setLoading(true);
            const Documento = fullName && fullName.find((data) => data.Usuario_Red)?.Documento;
            const [year, month] = selectedMonth.split('-');
            const startDate = `${year}-${month.padStart(2, '0')}-01`;
            const lastDay = new Date(year, month, 0).getDate();
            const endDate = `${year}-${month.padStart(2, '0')}-${lastDay}`;

            const response = await getAllDataMyPayroll(Documento);
            // Filtrar los datos según el rango de fechas
            const filteredData = selectedMonth && response.payrollData.filter(item => {
                const itemDate = new Date(item.fecha);
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
            });
            const filteredDataHourExtra = selectedMonth && response.extraHourData.filter(item => {
                const itemDate = new Date(item.fecha);
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
            });
            setDataPayroll(filteredData);
            setDataPayrollHourExtra(filteredDataHourExtra);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName, selectedMonth]);


    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataMyPayroll();
        }
    }, [getDataMyPayroll, fullName]);

    // TURNOS CUMPLIDOS
    const sizeData1 = dataPayroll
        ? dataPayroll.filter(item => {
            const novedad = item.novedad;
            const horasPresente = parseFloat(item.horas_presente);
            const horasDimensionadas = parseFloat(item.horas_dimensionadas_hora);
            return novedad === 'TUR' && horasPresente >= horasDimensionadas;
        }).length
        : 0;
    // TURNOS NO CUMPLIDOS 
    const sizeData2 = dataPayroll
        ? dataPayroll.filter(item => {
            const novedad = item.novedad_ausencia
            const horasPresente = parseFloat(item.horas_presente);
            const horasDimensionadas = parseFloat(item.horas_dimensionadas_hora);
            return horasPresente < horasDimensionadas && novedad !== 'OK';
        }).length
        : 0;

    //TUIRNOS PROGRAMADOS 
    //dataPayroll
    const countShifts = dataPayroll ? dataPayroll.filter(item => {
        const novedad = (item.novedad === 'TUR');
        return novedad
    }).length : 0;

    //IMPUNTUALIDAD     
    const Tardiness = dataPayroll ? dataPayroll.filter(item => {
        const inpuntialidad = (item.novedad_ausencia === 'IMPUNTUALIDAD NO JUSTIFICADA NO REMUNERADA');
        return inpuntialidad;
    }).length : 0;

    //IMPUNTUALIDAD JUSTIFICADA 
    const TardinessJustify = dataPayroll ? dataPayroll.filter(item => {
        const tardinessJustify = (
            item.novedad_ausencia === 'IMPUNTUALIDAD JUSTIFICADA REMUNERADA' ||
            item.novedad_ausencia === 'FORMACION NESTING' ||
            item.novedad_ausencia === 'INCIDENCIA CON USUARIO' ||
            item.novedad_ausencia === 'INCIDENCIA TECNICA' ||
            item.novedad_ausencia === 'LACTANCIA' ||
            item.novedad_ausencia === 'LLAMADA LARGA' ||
            item.novedad_ausencia === 'NO HAY PUESTOS' ||
            item.novedad_ausencia === 'SALIDA TEMPRANO JUSTIFICADA'

        );
        return tardinessJustify;
    }).length : 0;

    //AUSENCIA
    const Absence = dataPayroll ? dataPayroll.filter(item => {
        const Absence =
            item.novedad_ausencia === 'FORMACION' ||
            item.novedad_ausencia === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' ||
            item.novedad_ausencia === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' ||
            item.novedad_ausencia === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' ||
            item.novedad_ausencia === 'LICENCIA DE MATERNIDAD' ||
            item.novedad_ausencia === 'LICENCIA DE PATERNIDAD (LEY MARIA)' ||
            item.novedad_ausencia === 'LICENCIA NO REMUNERADA' ||
            item.novedad_ausencia === 'LICENCIA POR LUTO' ||
            item.novedad_ausencia === 'LICENCIA REMUNERADA' ||
            item.novedad_ausencia === 'SANCION POR PROCESO DISCIPLINARIO' ||
            item.novedad_ausencia === 'VACACION' ||
            item.novedad_ausencia === 'DIA DE LA FAMILIA' ||
            item.novedad_ausencia === 'CAMALIDAD DOMESTICA DEBIDAMENTE COMPROBADA' ||
            item.novedad_ausencia === 'AUSENCIA JUSTIFICADA REMUNERADA' ||
            item.novedad_ausencia === 'AUSENCIA NO JUSTIFICADA NO REMUNERADA';
        return Absence;
    }).length : 0;

    //AUNSENCIA JUSTIFICADA 
    const AbsenceJustify = dataPayroll ? dataPayroll.filter(item => {
        const Absence =
            item.novedad_ausencia === 'FORMACION' ||
            item.novedad_ausencia === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' ||
            item.novedad_ausencia === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' ||
            item.novedad_ausencia === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' ||
            item.novedad_ausencia === 'LICENCIA DE MATERNIDAD' ||
            item.novedad_ausencia === 'LICENCIA DE PATERNIDAD (LEY MARIA)' ||
            item.novedad_ausencia === 'LICENCIA NO REMUNERADA' ||
            item.novedad_ausencia === 'LICENCIA POR LUTO' ||
            item.novedad_ausencia === 'LICENCIA REMUNERADA' ||
            item.novedad_ausencia === 'SANCION POR PROCESO DISCIPLINARIO' ||
            item.novedad_ausencia === 'VACACION' ||
            item.novedad_ausencia === 'DIA DE LA FAMILIA' ||
            item.novedad_ausencia === 'CAMALIDAD DOMESTICA DEBIDAMENTE COMPROBADA' ||
            item.novedad_ausencia === 'AUSENCIA JUSTIFICADA REMUNERADA';
        return Absence;
    }).length : 0;


    //AUSENCIA NO JUSTIFICADA 
    const AusenciaNoJustificada = dataPayroll ? dataPayroll.filter(item => {
        const Absence = (item.novedad_ausencia === 'AUSENCIA NO JUSTIFICADA NO REMUNERADA'); return Absence;
    }).length : 0;


    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        setSelectedMonth(newMonth);
    };

    function renderColorState(params) {
        if (params.novedad_ausencia === 'OK') {
            return 'Filled';
        } else {
            return 'Rejected';
        }
    }


    return (
        <>

            <Headers
                Box={Box}
                Grid={Grid}
                Item={Item}
                Absence={Absence}
                loading={loading}
                Skeleton={Skeleton}
                Tardiness={Tardiness}
                sizeData1={sizeData1}
                sizeData2={sizeData2}
                countShifts={countShifts}
                dataCourtDates={dataCourtDates}
                AbsenceJustify={AbsenceJustify}
                TardinessJustify={TardinessJustify}
                CloseRoundedIcon={CloseRoundedIcon}
                CircularProgress={CircularProgress}
                CheckRoundedIcon={CheckRoundedIcon}
                handleComponentSelect={handleComponentSelect}
                AusenciaNoJustificada={AusenciaNoJustificada}
                CheckCircleRoundedIcon={CheckCircleRoundedIcon}
                QuestionMarkRoundedIcon={QuestionMarkRoundedIcon}
                ReportProblemRoundedIcon={ReportProblemRoundedIcon}
                CalendarMonthRoundedIcon={CalendarMonthRoundedIcon}
                ManageHistoryRoundedIcon={ManageHistoryRoundedIcon}
                ReduceCapacityRoundedIcon={ReduceCapacityRoundedIcon}
                RunningWithErrorsRoundedIcon={RunningWithErrorsRoundedIcon}
            />

            <div className='d-flex' style={{ marginTop: '2%' }}>
                <div className='p-2 flex-grow-1'></div>
                <div className='p-2'>
                    <input
                        type='month'
                        list='months'
                        id='monthInput'
                        max={maxMonth}
                        value={selectedMonth}
                        label='Seleccionar mes'
                        onChange={handleMonthChange}
                        className='form-control form-control-sm'
                    />
                </div>
            </div>

            <Grid container rowSpacing={1} spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                    {loading ? <Skeleton width={70} animation='wave' /> : <div className='title-horas-nomina'>Metas</div>}
                    <ItemContent>
                        {dataPayroll.length > 0 ? (
                            <MyPayrollCharts dataPayroll={dataPayroll} Skeleton={Skeleton} loading={loading} />
                        ) : (
                            loading ? (
                                <Skeleton width={150} animation='wave' />
                            ) : (
                                <div className='text-muted'>
                                    No tienes información sobre tus horas nómina
                                </div>
                            )
                        )}
                    </ItemContent>
                </Grid>

                <Grid item xs={6} >
                    {loading ? <Skeleton width={70} animation='wave' /> : <div className='title-horas-nomina'>Novedades</div>}
                    <ItemContent className='p-2 d-flex align-items-center'>
                        {dataPayroll.length > 0 ? (
                            <MyPayrollPie Skeleton={Skeleton} loading={loading} dataPayroll={dataPayroll} />
                        ) : (
                            loading ? (
                                <Skeleton width={150} animation='wave' />
                            ) : (
                                <div className='text-muted'>
                                    No tienes información sobre tus horas nómina
                                </div>
                            )
                        )}
                    </ItemContent>
                </Grid>
            </Grid>


            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2%' }}>
                <Grid item xs={6}>
                    <div className='title-horas-nomina'>Recargos</div>
                    <ItemContent>
                        {dataPayroll.length > 0 ? (<Recharge dataPayroll={dataPayroll} loading={loading} Skeleton={Skeleton} />) : (loading ? <Skeleton animation='wave' /> : (
                            <div className='text-muted'>
                                No tienes información sobre tus recargos
                            </div>
                        ))}
                    </ItemContent>
                </Grid>
                <Grid item xs={6}>
                    <div className='title-horas-nomina'>Horas Extras</div>
                    <ItemContent>
                        {dataPayroll.length > 0 ? (<HourExtra dataPayrollHourExtra={dataPayrollHourExtra} loading={loading} Skeleton={Skeleton} />) : (loading ? <Skeleton animation='wave' /> : (
                            <div className='text-muted'>
                                No tienes información sobre tus horas extras
                            </div>
                        ))}
                    </ItemContent>
                </Grid>
            </Grid>

            <div style={{ marginTop: '2%' }}>
                <div className='d-inline-flex'>
                    {loading ? <Skeleton width={100} animation='wave' /> : (
                        <div className='container-title-horas-nomina'>
                            <div className='title-horas-nomina'>Registros</div>
                        </div>
                    )}
                </div>
                <ItemContent >
                    {loading && (
                        <div className='row'>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                            <div className='col'>
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                                <Skeleton width={100} animation='wave' />
                            </div>
                        </div>
                    )}
                    <div style={{ height: '100%', width: '100%' }}>
                        {!loading && (
                            <StyledDataGrid
                                rowHeight={20}
                                columns={columns}
                                rows={dataPayroll}
                                pageSizeOptions={[PAGE_SIZE]}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                getRowId={(data) => `${data.fecha}_${data.id_cedula}_${data.avaya}`}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                getRowClassName={(params) => `super-app-theme--${renderColorState(params.row)}`}
                                slots={{
                                    noRowsOverlay: CustomNoRowsOverlay,
                                    pagination: CustomPagination,
                                }}
                            />
                        )}
                    </div>
                </ItemContent>
            </div>
        </ >
    )
}

export default MyPayroll


