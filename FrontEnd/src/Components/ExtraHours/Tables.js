import React, { useEffect } from 'react'

const Tables = ({
    esES,
    data,
    Modal,
    Button,
    loading,
    message,
    useState,
    PAGE_SIZE,
    TextField,
    formatTime,
    setTurnoIni,
    setTurnoFin,
    dataHistory,
    formHourExtra,
    warningMessage,
    StyledDataGrid,
    paginationModel,
    handleUpdateAll,
    openModalCancel,
    CustomPagination,
    CircularProgress,
    CloseRoundedIcon,
    SearchRoundedIcon,
    isHourExtraAllowed,
    isHourInputChanged,
    setPaginationModel,
    selectedModalCancel,
    CustomNoRowsOverlay,
    hanldeSelectHourExtra,
    handleOpenModalCancel,
    handleCancelHourExtra,
    handleCloseModalCancel,
    handleCheckAvailability,
    handleSelectModalCancel,
    handleFormDataHoursExtra,
    handleOpenModalSurePoint,
    handleOpenModalDetailsHourExtra,
}) => {
    const [searchQuery, setSearchQuery] = useState('');


    const filteredItems = Array.isArray(dataHistory) && dataHistory.filter(item =>
        item.Fecha_Turno.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        // Move setTurnoIni and setTurnoFin updates here
        if (data.Turnos && data.Turnos.length > 0) {
            const shifts = data.Turnos[0];
            setTurnoIni(shifts.Turno_Ini);
            setTurnoFin(shifts.Turno_Fin);
        }
    }, [data.Turnos, data.Puntos, setTurnoIni, setTurnoFin]);


    const renderConditions = (history) => {
        if (history.Estado === '' || history.Estado === null || history.Estado === undefined) {
            return 'Pendiente'
        } else if (history.Estado === 'Rechazado') {
            return 'Rechazado'
        } else if (history.Estado === 'Cancelado') {
            return 'Cancelado'
        } else {
            return 'Aceptado'
        }
    };
    const renderStateConditions = (history) => {
        if (history.Estado === '' || history.Estado === null || history.Estado === undefined) {
            return 'PartiallyFilled'
        } else if (history.Estado === 'Rechazado' || history.Estado === 'Cancelado') {
            return 'Rejected'
        } else {
            return 'Filled'
        }
    };

    const hancleCancelHorasExtras = (history) => {
        if (history.Estado === '' || history.Estado === null || history.Estado === undefined) {
            return <Button variant='soft' color='danger' size='sm' onClick={() => { handleOpenModalCancel(); handleSelectModalCancel(history); }}><CloseRoundedIcon fontSize='small' /></Button>
        } else {
            return;
        }
    }

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
        return `${formattedEndHour}:${formattedEndMinute}`;
    };

    const columns = [

        { field: 'Documento', headerName: 'Documento', flex: 1 },
        { field: 'Fecha_Turno', headerName: 'Fecha', flex: 1 },
        { field: 'Hora_Ini', headerName: 'Turno Inicio', flex: 1 },
        { field: 'Hora_Fin', headerName: 'Turno Fin', flex: 1 },
        { field: 'Hora_Extra_Ini', headerName: 'Hora Extra Inicio', flex: 1 },
        {
            field: 'Fecha_Fin_Novedad', headerName: 'Hora Extra Fin', flex: 1,
            renderCell: (params) => {
                return (
                    calculateEndTime(formatTime(params.row.Hora_Extra_Ini), params.row.Hora_Extra_Fin)
                );
            }
        },
        { field: 'Nombre_Aprobador', headerName: 'Aprobador', flex: 1 },
        {
            field: 'Estado', headerName: 'Estado', flex: 1,
            renderCell: (params) => {
                return (
                    renderConditions(params.row)
                );
            }
        },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button variant='soft' color='primary' size='sm' onClick={() => { hanldeSelectHourExtra(params.row); handleOpenModalDetailsHourExtra(); }}><SearchRoundedIcon fontSize='small' /></Button>
                );
            }

        },
        {
            field: 'Cancelar',
            headerName: 'Cancelar',
            flex: 1,
            renderCell: (params) => {
                return (
                    hancleCancelHorasExtras(params.row)
                );
            }

        }
    ];



    return (
        <>

            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1'>
                            <div className='mb-0 title-generate-hours-extra'>Turno actual</div>
                        </div>
                        <div className='p-2'>
                            <Button variant='soft' size='sm' color='warning' disabled={loading} onClick={() => handleUpdateAll()}>Actualizar todo</Button>
                        </div>
                    </div>
                    <div className='mb-5 d-flex justify-content-center'>
                        {message ? (
                            <div className='text-muted'>
                                {message.response.data}
                            </div>
                        ) : (
                            loading ? (<CircularProgress variant='indeterminate' color='primary' />) :
                                (<table className='table table-borderless table-hover'>
                                    <thead>
                                        <tr className='thead-title'>
                                            <th className='text-muted'>Documento</th>
                                            <th className='text-muted'>Fecha</th>
                                            <th className='text-muted'>Hora Inicio</th>
                                            <th className='text-muted'>Hora Fin</th>
                                            <th className='text-muted'>Hora Extra Inicio</th>
                                            <th className='text-muted'>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.Turnos && data.Turnos.map((shifts) => {
                                            const Puntos = data.Puntos.find(punto => punto.CodigoColaborador === shifts.Documento);
                                            return (
                                                <tr key={shifts.Documento} className='table-success'>
                                                    <th className='text-muted'>{shifts.Documento}</th>
                                                    <td className='text-muted'>{shifts.Fecha}</td>
                                                    <td className='text-muted'>{formatTime(shifts.Turno_Ini)}</td>
                                                    <td className='text-muted'>{formatTime(shifts.Turno_Fin)}</td>
                                                    <td className='text-muted'>{Puntos ? `${String(Math.floor(Puntos.HoraExtraInicio / 60)).padStart(2, '0')}:${String(Puntos.HoraExtraInicio % 60).padStart(2, '0')}` : '00:00'}</td>
                                                    <td className='text-muted'>{Puntos ? `${String(Math.floor(Puntos.HoraExtraFim / 60)).padStart(2, '0')}:${String(Puntos.HoraExtraFim % 60).padStart(2, '0')}` : '00:00'}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table >)
                        )}
                    </div >

                    <div className='mb-0 title-generate-hours-extra'>Generar hora extra</div>
                    <div className='d-flex mb-3'>
                        <div className='p-2 flex-grow-1 '>
                            <label className='text-muted form-label' htmlFor='InputTime'>Hora Inicial</label>
                            <input
                                className='form-control form-control-sm'
                                type='time'
                                id='InputTime'
                                name='Hora_Extra_Ini'
                                value={formHourExtra.Hora_Extra_Ini}
                                onChange={handleFormDataHoursExtra}
                            />
                        </div>

                        <div className='p-2 flex-grow-1'>
                            <label className='text-muted form-label' htmlFor='InputHorasExtra' >Horas extras</label>
                            <select className='form-select form-select-sm' type='' id='InputHorasExtra' value={formHourExtra.Hora_Extra_Fin} name='Hora_Extra_Fin' onChange={handleFormDataHoursExtra}>
                                <option value=''>Seleccione...</option>
                                <option value='30'>30 Minutos</option>
                                <option value='60'>1 Hora</option>
                                <option value='90'>1 Hora 30 Minutos</option>
                                <option value='120'>2 Horas</option>
                            </select>
                        </div>
                        <div className='p-2 align-self-end'>
                            <Button
                                variant='soft'
                                size='sm'
                                color='warning'
                                disabled={!formHourExtra.Hora_Extra_Ini || !formHourExtra.Hora_Extra_Fin}
                                onClick={handleCheckAvailability}
                            >
                                Comprobar
                            </Button>
                        </div>
                        <div className='p-2 align-self-end'>
                            <Button
                                variant='soft'
                                size='sm'
                                color='success'
                                disabled={!isHourInputChanged || !isHourExtraAllowed || !formHourExtra.Hora_Extra_Ini || !formHourExtra.Hora_Extra_Fin}
                                onClick={handleOpenModalSurePoint}
                            >
                                Solicitar
                            </Button>
                        </div>

                    </div>
                    {warningMessage ? (<div className='alert alert-warning' role='alert'>{warningMessage}</div>) : ''}
                </div >
            </div >


            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='mb-0 d-flex'>
                        <div className='flex-grow-1 title-generate-hours-extra'>
                            Historial horas extras
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


                    <div className='d-flex justify-content-center'>
                        {message ? (
                            <div className='text-muted'>
                                {message.response.data}
                            </div>
                        ) : (
                            !loading && Array.isArray(dataHistory) ? (

                                <StyledDataGrid
                                    rowHeight={40}
                                    columns={columns}
                                    rows={filteredItems}
                                    pageSizeOptions={[PAGE_SIZE]}
                                    paginationModel={paginationModel}
                                    getRowId={(data) => data.Id}
                                    onPaginationModelChange={setPaginationModel}
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    getRowClassName={(params) => `super-app-theme--${renderStateConditions(params.row)}`}
                                    slots={{
                                        noRowsOverlay: CustomNoRowsOverlay,
                                        pagination: CustomPagination
                                    }}
                                />

                            ) : (CustomNoRowsOverlay())
                        )}
                    </div >


                    <Modal
                        title=''
                        width={800}
                        footer={null}
                        open={openModalCancel}
                        onCancel={handleCloseModalCancel}
                    >
                        <div className='card border-light' >
                            <div className='card-body'>

                                <div className='alert alert-danger' role='alert' style={{ fontSize: '18px', marginBottom: '20px' }}>
                                    <div>
                                        <strong>!Upps!</strong> ¿Deseas cancelar las horas extras solicitadas?
                                    </div>
                                    <br />
                                    <div>
                                        <strong>¡Recuerda!</strong> Una vez que finalices el turno programado, cierra la aplicación "Sistema de Punto" y vuelve a abrirla para que se reflejen tus horas extras.
                                    </div>
                                </div>
                                <table className='table table-borderless table-hover'>
                                    <thead>
                                        <tr>
                                            <th className='text-muted'>Documento</th>
                                            <th className='text-muted'>Fecha</th>
                                            <th className='text-muted'>Turno Inicio</th>
                                            <th className='text-muted'>Turno Fin</th>
                                            <th className='text-muted'>Hora Extra Inicio</th>
                                            <th className='text-muted'>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedModalCancel && selectedModalCancel && (
                                            <tr className={renderStateConditions(selectedModalCancel)}>
                                                <th className='text-muted'>{selectedModalCancel.Documento}</th>
                                                <td className='text-muted'>{selectedModalCancel.Fecha_Turno}</td>
                                                <td className='text-muted'>{formatTime(selectedModalCancel.Hora_Ini)}</td>
                                                <td className='text-muted'>{formatTime(selectedModalCancel.Hora_Fin)}</td>
                                                <td className='text-muted'>{formatTime(selectedModalCancel.Hora_Extra_Ini)}</td>
                                                <td className='text-muted'>{selectedModalCancel.Hora_Extra_Fin}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className='d-flex justify-content-end'>
                                    <div className='p-2'>
                                        <Button variant='soft' color='success' size='sm' onClick={() => handleCancelHourExtra(selectedModalCancel)}>Aceptar</Button>
                                    </div>
                                    <div className='p-2'>
                                        <Button variant='soft' color='danger' size='sm' onClick={handleCloseModalCancel}  >Cancelar</Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal>
                </div >
            </div >
        </>
    )
}

export default Tables;