import React, { useEffect, useState } from 'react'


import ImportAssigmentModal from './ModalSurePoint/ImportAssigmentModal';

const TablesAssigment = ({
    Button,
    Modal,
    loading,
    message,
    formatTime,
    setTurnoIni,
    setTurnoFin,
    asigmentDate,
    formHourExtra,
    clearAllInputs,
    warningMessage,
    CircularProgress,
    documentShiftNow,
    messageValidation,
    PublishRoundedIcon,
    isHourExtraAllowed,
    isHourInputChanged,
    handleSetDateToNow,
    documentDataBuscado,
    setDocumentDataBuscado,
    handleCheckAvailability,
    handleAsigmentHourExtra,
    handleFormDataHoursExtra

}) => {


    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const [isLoading, setIsLoading] = useState(false);




    // MANEJADORES DE EL MODAL DE SOLICITUDES
    const hanldeOpenModal = () => {
        setOpen(true);
    };

    const hanldeCloseModal = () => {
        setOpen(false);
    };



    const handleAsigmentHourExtraWithLoading = async () => {
        setIsLoading(true);
        await handleAsigmentHourExtra();
        setIsLoading(false);
        clearAllInputs();  // Llamamos a clearAllInputs después de asignar las horas extras
    };


    // Obtener la fecha actual
    const currentDate = new Date();
    // Establecer la hora en 00:00:00
    currentDate.setHours(0, 0, 0, 0);

    // Formatear la fecha actual en formato YYYY-MM-DD para que sea la fecha mínima
    const minDate = currentDate.toISOString().split('T')[0];

    // Configurar la fecha máxima permitida como 11 días después de hoy
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 11);
    const maxDate = futureDate.toISOString().split('T')[0];


    useEffect(() => {
        // Move setTurnoIni and setTurnoFin updates here
        if (documentShiftNow.Turnos && documentShiftNow.Turnos.length > 0) {
            const shifts = documentShiftNow.Turnos[0];
            setTurnoIni(shifts.Turno_Ini);
            setTurnoFin(shifts.Turno_Fin);
        }
    }, [documentShiftNow.Turnos, documentShiftNow.Puntos, setTurnoIni, setTurnoFin]);

    // Función para manejar el cambio de fecha
    const handleDateChange = (date) => {
        setSelectedDate(date); // Actualiza el estado de la fecha seleccionada
        handleSetDateToNow(date); // Llama a la función existente para realizar otras tareas necesarias
    };


    function colorTable(Turno_Ini, Turno_Fin) {
        if (formatTime(Turno_Ini) === '00:00' && formatTime(Turno_Fin) === '00:00') {
            return 'table-danger';
        } else {
            return 'table-success';
        }
    }

    // function validateShifts(TurnoIni, TurnoFin) {

    //     if (TurnoIni === '00:00' || TurnoIni === '00:00:00') {
    //         return true;
    //     } else if (TurnoFin === '00:00' || TurnoFin === '00:00:00') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    return (
        <>

            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1 text-center'>
                            <div className='mb-0 title-generate-hours-extra-GTR'>Asignaciones de horas extras</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='d-flex align-items-center'>
                        <div className='p-2 flex-grow-1'>
                            <Button variant='soft' size='sm' color='success' onClick={hanldeOpenModal} startDecorator={<PublishRoundedIcon fontSize='sm' />}>
                                Importe Horas Extras
                            </Button>
                        </div>
                        <div className='p-2'>
                            <div className='p-2 flex-grow-1'>
                                <label className='text-muted form-label' htmlFor='InputDocumento'>Documento al que le vas a asignar horas extras</label>
                                <input
                                    className='form-control form-control-sm'
                                    type='search'
                                    id='InputDocumento'
                                    name='Documento'
                                    placeholder='Buscar documento...'
                                    value={documentDataBuscado}
                                    onChange={(e) => setDocumentDataBuscado(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mb-0 title-generate-hours-extra'>Generar hora extra</div>
                    <div className='d-flex mb-3'>
                        <div className='p-2 flex-grow-1'>
                            <label className='text-muted form-label'>Fecha de la asignacion</label>
                            <input
                                type='date'
                                className='form-control form-control-sm'
                                min={minDate}
                                max={maxDate}
                                value={asigmentDate}
                                onChange={handleDateChange}
                                disabled={!documentDataBuscado}
                            />
                        </div>
                        <div className='p-2 flex-grow-1 '>
                            <label className='text-muted form-label' htmlFor='InputTime'>Hora Inicial</label>
                            <input
                                className='form-control form-control-sm'
                                type='time'
                                id='InputTime'
                                name='Hora_Extra_Ini'
                                value={formHourExtra.Hora_Extra_Ini}
                                onChange={handleFormDataHoursExtra}
                                disabled={!documentDataBuscado || !asigmentDate}
                            />
                        </div>

                        <div className='p-2 flex-grow-1'>
                            <label className='text-muted form-label' htmlFor='InputHorasExtra'>Horas extras</label>
                            <select
                                className='form-select form-select-sm'
                                id='InputHorasExtra'
                                value={formHourExtra.Hora_Extra_Fin}
                                name='Hora_Extra_Fin'
                                onChange={handleFormDataHoursExtra}
                                disabled={!documentDataBuscado || !asigmentDate || !formHourExtra.Hora_Extra_Ini}
                            >
                                <option value=''>Seleccione...</option>
                                <option value='30'>30 Minutos</option>
                                <option value='60'>1 Hora</option>
                                <option value='90'>1 Hora 30 Minutos</option>
                                <option value='120'>2 Horas</option>
                                <option value='150'>2 Horas 30 Minutos</option>
                                <option value='180'>3 Horas</option>
                                <option value='210'>3 Horas 30 Minutos</option>
                                <option value='240'>4 Horas</option>
                            </select>
                        </div>
                        <div className='p-2 align-self-end'>
                            <Button
                                variant='soft'
                                size='sm'
                                color='warning'
                                disabled={!formHourExtra.Hora_Extra_Ini || !formHourExtra.Hora_Extra_Fin || !(documentShiftNow.Turnos && documentShiftNow.Turnos.length > 0)}
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
                                onClick={handleAsigmentHourExtraWithLoading}
                            >
                                {isLoading ? <CircularProgress size={20} /> : 'Asignar'}
                            </Button>
                        </div>
                    </div>
                    {warningMessage && (<div className='alert alert-warning' role='alert'>{warningMessage}</div>)}
                    {messageValidation && (<div className='alert alert-warning' role='alert'>{messageValidation}</div>)}

                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1'>
                            <div className='mb-0 title-generate-hours-extra'>Turno Seleccionado</div>
                        </div>
                    </div>

                    {/* Condicional para mostrar la tabla solo si se ha seleccionado una fecha */}
                    {selectedDate && (
                        <div className='mb-5 d-flex justify-content-center'>
                            {message ? (
                                {/* <div className='text-muted'>{message.response.data}</div> */}
                            ) : (
                                loading ? (
                                    <CircularProgress variant='indeterminate' color='primary' />
                                ) : (
                                    <table className='table table-borderless table-hover'>
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
                                            {documentShiftNow.Turnos && documentShiftNow.Turnos.map((shifts) => {
                                                const Puntos = documentShiftNow.Puntos.find(punto => punto.CodigoColaborador === shifts.Documento);
                                                return (
                                                    <tr key={shifts.Documento} className={colorTable(shifts.Turno_Ini, shifts.Turno_Fin)}>
                                                        <th className='text-muted'>{shifts.Documento}</th>
                                                        <td className='text-muted'>{shifts.Fecha}</td>
                                                        <td className='text-muted'>{formatTime(shifts.Turno_Ini)}</td>
                                                        <td className='text-muted'>{formatTime(shifts.Turno_Fin)}</td>
                                                        <td className='text-muted'>{Puntos ? `${String(Math.floor(Puntos.HoraExtraInicio / 60)).padStart(2, '0')}:${String(Puntos.HoraExtraInicio % 60).padStart(2, '0')}` : '00:00'}</td>
                                                        <td className='text-muted'>{Puntos ? `${String(Math.floor(Puntos.HoraExtraFim / 60)).padStart(2, '0')}:${String(Puntos.HoraExtraFim % 60).padStart(2, '0')}` : '00:00'}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>


            <ImportAssigmentModal
                open={open}
                Modal={Modal}
                hanldeCloseModal={hanldeCloseModal}

            />

        </>
    )
}

export default TablesAssigment;