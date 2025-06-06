import React from 'react';

const GenerateRequest = ({ Modal, open, hanldeCloseModal, listNovelties, minDate, formDataNovelties, handleformDataNovelties, sendRequest, daysBetween, maxDate, validErrors, Button, }) => {


    const ListDays = { Days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'] }

    //!RENDERIZAR LAS CONDIONES DE LOS DIAS COLENADRIOS PARA QUE LOS PUEDAN SER MAYORES A LOS DIAS CALENDARIOS
    const renderConditionDaysCalendar = (daysBetween, formDataNovelties) => {
        if (daysBetween() < formDataNovelties.Dias_Laborales) {
            return <div className='text-danger'>Los días laborales no pueden ser mayor a los días calendarios</div>
        } else if (formDataNovelties.How_Long >= daysBetween()) {
            return <div className='text-danger'>Los días en dinero no puede ser mayores o iguales a los días calendarios</div>
        } else {
            return '';
        }
    };


    const disabledButtonsSend = (daysBetween, formDataNovelties) => {
        if (daysBetween() >= formDataNovelties.Dias_Laborales) {
            return false;
        } else if (daysBetween() < formDataNovelties.Dias_Laborales) {
            return true;
        } else if (formDataNovelties.How_Long >= daysBetween()) {
            return true;
        } else if (formDataNovelties.How_Long < daysBetween()) {
            return false;
        }
    };

    // ?REBDERIZAR SI LA PERSONA VA HA TOMAR TIEMPO EN DINERO
    const renderTimeMoney = () => {

        if (formDataNovelties.Tipo_Solicitud === 'VAC' && formDataNovelties.Time_Money === 'SI' && formDataNovelties.How_Long && formDataNovelties.Motivo) {
            return false;
        } else if (formDataNovelties.Tipo_Solicitud === 'VAC' && !formDataNovelties.Motivo) {
            return true;
        } else if (formDataNovelties.Tipo_Solicitud === 'LNR' && formDataNovelties.Motivo) {
            return false;
        } else if (formDataNovelties.Tipo_Solicitud === 'LNR' && !formDataNovelties.Motivo) {
            return true;
        } else if (formDataNovelties.Tipo_Solicitud === 'PDA ME' && formDataNovelties.Motivo) {
            return false;
        } else if (formDataNovelties.Tipo_Solicitud === 'PDA ME' && !formDataNovelties.Motivo) {
            return true;
        } else if (formDataNovelties.Tipo_Solicitud === 'DPAG' && formDataNovelties.Motivo) {
            return false;
        } else if (formDataNovelties.Tipo_Solicitud === 'DPAG' && !formDataNovelties.Motivo) {
            return true;
        } else if ((formDataNovelties.Tipo_Solicitud !== 'VAC' || formDataNovelties.Tipo_Solicitud !== 'LNR' || formDataNovelties.Tipo_Solicitud !== 'PDA ME' || formDataNovelties.Tipo_Solicitud !== 'DPAG')) {
            return false;
        }

    };

    //?RENDERIZAMOS CAMPOS ADICIONALES DE VAC PARA SABER SI VA HA TOMAR TIEMPO EN DINERO Y CUANTOS DIAS 
    const renderInputsEntryVAC = () => {
        if (formDataNovelties.Tipo_Solicitud === 'VAC') {
            return (
                <>
                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='MONEY_TIME' className='form-label d-flex'>
                                ¿Vas a tomar tiempo en dinero?<div id='invalid-feedback'>*</div>
                            </label>
                            <select className='form-select' id='MONEY_TIME' value={formDataNovelties.Time_Money} name='Time_Money' onChange={handleformDataNovelties}>
                                <option value=''>Seleccione...</option>
                                <option value='SI'>SI</option>
                                <option value='NO'>NO</option>
                            </select>
                        </div>
                        {formDataNovelties.Time_Money === 'SI' && (
                            <div className='col mb-3'>
                                <label htmlFor='HOW_LONG' className='form-label d-flex'>
                                    ¿Cuanto días vas a sacar en dinero?<div id='invalid-feedback'>*</div>
                                </label>
                                <select className='form-select' id='HOW_LONG' value={formDataNovelties.How_Long} name='How_Long' onChange={handleformDataNovelties}>
                                    <option value=''>Seleccione...</option>
                                    {ListDays.Days.map((day) => {
                                        return (
                                            <option value={day} key={day}>
                                                {day} - días
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        )}
                    </div>
                </>
            );
        }
    };


    //?RENDERIZAMOS CAMPOS ADICIONALES DE LPA PARA,  numero del diagnostico
    const renderInputsEntryLPAICCPLMA = () => {
        if (formDataNovelties.Tipo_Solicitud === 'LPA') {
            return (
                <>
                    <div className='row aling-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='Number_Iccp' className='form-label d-flex'>
                                Número de la Incapacidad<div id='invalid-feedback'>*</div>
                            </label>
                            <input id='Number_Iccp' className='form-control' name='Number_Iccp' value={formDataNovelties.Number_Iccp} onChange={handleformDataNovelties} />
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='Number_Diag' className='form-label d-flex'>
                                Número del Diagnostico<div id='invalid-feedback'>*</div>
                            </label>
                            <input id='Number_Diag' className='form-control' name='Number_Diag' value={formDataNovelties.Number_Diag} onChange={handleformDataNovelties} />
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='Name_Diag' className='form-label'>
                                Nombre del Diagnostico
                            </label>
                            <input id='Name_Diag' className='form-control' name='Name_Diag' value={formDataNovelties.Name_Diag} onChange={handleformDataNovelties} />
                        </div>
                    </div>
                </>
            );
        } else {
            return '';
        }
    }

    const renderConditionsInputsEntryLPAICCPLMA = () => {
        if (formDataNovelties.Tipo_Solicitud === 'LPA' && formDataNovelties.Number_Iccp && formDataNovelties.Number_Diag) {
            return false;
        } else if (formDataNovelties.Tipo_Solicitud === 'LPA' && !formDataNovelties.Number_Iccp && !formDataNovelties.Number_Diag) {
            return true;
        } else if (formDataNovelties.Tipo_Solicitud === 'LPA' && formDataNovelties.Number_Iccp && !formDataNovelties.Number_Diag) {
            return true;
        } else if (formDataNovelties.Tipo_Solicitud === 'LPA' && !formDataNovelties.Number_Iccp && formDataNovelties.Number_Diag) {
            return true;
        }
    };




    const handleKeyDown = (e) => {
        e.preventDefault();
    }

    return (
        <Modal
            title={
                <>
                    <h2 className='modal-title text-muted mb-4'>Solicitud de novedad laboral</h2>
                </>
            }
            open={open}
            width={800}
            onCancel={hanldeCloseModal}
            footer={null}
        >
            <div className='container mt-5' >
                <div>

                    <div className='mb-3'>
                        <label htmlFor='tipoSolicitud' className='form-label d-flex'>
                            Tipo de solicitud<div id='invalid-feedback'>*</div>
                        </label>
                        <select className='form-select' id='tipoSolicitud' value={formDataNovelties.Tipo_Solicitud} name='Tipo_Solicitud' onChange={handleformDataNovelties}>
                            <option value=''>Seleccionar...</option>
                            {listNovelties &&
                                listNovelties.map((option) => {
                                    if (!(option.Novedad === 'ICCP' || option.Novedad === 'LLT' || option.Novedad === 'LMA' || option.Novedad === 'CAL' || option.Novedad === 'AISL')) {
                                        return (
                                            <option key={option.Id_Novedad} value={option.Novedad}>
                                                {option.Novedad} - {option.Tipo_Novedad} - {option.Tipo}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}
                        </select>
                        {validErrors.Tipo_Solicitud && (
                            <div id='invalid-feedback'>{validErrors.Tipo_Solicitud}</div>
                        )}
                    </div>




                    {formDataNovelties.Tipo_Solicitud === 'VOT' || formDataNovelties.Tipo_Solicitud === 'JVOT' || formDataNovelties.Tipo_Solicitud === 'LMA' || formDataNovelties.Tipo_Solicitud === 'LPA' || formDataNovelties.Tipo_Solicitud === 'LLT' || formDataNovelties.Tipo_Solicitud === 'AISL' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado los documentos de soporte correspondientes a gestión humana y o nómina</div>
                    ) : null}

                    <div>
                        {renderInputsEntryLPAICCPLMA()}
                    </div>

                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                                Fecha inicio novedad<div id='invalid-feedback'>*</div>
                            </label>
                            <input
                                type='date'
                                name='Fecha_Inicio_Novedad'
                                min={minDate}
                                max={maxDate}
                                className='form-control'
                                id='fechaInicioNovedad'
                                onKeyDown={handleKeyDown}
                                onChange={handleformDataNovelties}
                                value={formDataNovelties.Fecha_Inicio_Novedad}
                            />
                            {validErrors.Fecha_Inicio_Novedad && (
                                <div id='invalid-feedback'>{validErrors.Fecha_Inicio_Novedad}</div>
                            )}
                        </div>

                        <div className='col mb-3'>
                            <label htmlFor='fechaFinNovedad' className='form-label d-flex'>
                                Fecha fin novedad<div id='invalid-feedback'>*</div>
                            </label>
                            <input
                                type='date'
                                min={formDataNovelties.Fecha_Inicio_Novedad}
                                // max={maxDate}
                                id='fechaFinNovedad'
                                name='Fecha_Fin_Novedad'
                                className='form-control'
                                onKeyDown={handleKeyDown}
                                onChange={handleformDataNovelties}
                                value={formDataNovelties.Fecha_Fin_Novedad}
                                disabled={!formDataNovelties.Fecha_Inicio_Novedad}
                            />
                            {validErrors.Fecha_Fin_Novedad && (
                                <div id='invalid-feedback'>{validErrors.Fecha_Fin_Novedad}</div>
                            )}
                        </div>
                    </div>

                    <div className='row aling-items-center'>
                        <div className='col mb-3'>
                            {formDataNovelties.Fecha_Inicio_Novedad && formDataNovelties.Fecha_Fin_Novedad ? (
                                <>
                                    <label htmlFor='diasCalendario' className='form-label'>
                                        Días calendario
                                    </label>
                                    <input id='diasCalendario' className='form-control' value={daysBetween()} disabled />
                                </>
                            ) : ''}
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='diasLaborales' className='form-label d-flex'>
                                Días laborales<div id='invalid-feedback'>*</div>
                            </label>
                            <select id='diasLaborales' className='form-select' name='Dias_Laborales' value={formDataNovelties.Dias_Laborales} onChange={handleformDataNovelties}>
                                <option value=''>Seleccionar...</option>
                                {ListDays.Days.map((day) => {
                                    return (
                                        <option value={day} key={day}>
                                            {day}
                                        </option>
                                    )
                                })}
                            </select>
                            {validErrors.Dias_Laborales && (
                                <div id='invalid-feedback'>{validErrors.Dias_Laborales}</div>
                            )}
                        </div>
                    </div>


                    <div>
                        {renderInputsEntryVAC()}
                    </div>

                    <div>
                        {renderConditionDaysCalendar(daysBetween, formDataNovelties)}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='motivo' className='form-label d-flex'>
                            Comentario {formDataNovelties.Tipo_Solicitud === 'VAC' || formDataNovelties.Tipo_Solicitud === 'LNR' || formDataNovelties.Tipo_Solicitud === 'PDA ME' || formDataNovelties.Tipo_Solicitud === 'DPAG' ? (<div id='invalid-feedback' className='p-1'>(Obligatorio, VAC, LNR, PDA ME, DPAG)</div>) : ('')}
                        </label>
                        <textarea
                            id='motivo'
                            name='Motivo'
                            className='form-control'
                            value={formDataNovelties.Motivo}
                            onChange={handleformDataNovelties}
                            placeholder='Escribe una pequeña descripción sobre tu novedad'
                        />
                    </div>

                    <div className='d-flex flex-row-reverse'>
                        <div className='p-2'>
                            <Button variant='soft' color='danger' size='sm' onClick={hanldeCloseModal}>
                                Cancelar
                            </Button>
                        </div>
                        <div className='p-2'>
                            <Button variant='soft' disabled={
                                !formDataNovelties.Tipo_Solicitud ||
                                !formDataNovelties.Fecha_Inicio_Novedad ||
                                !formDataNovelties.Fecha_Fin_Novedad ||
                                !formDataNovelties.Dias_Laborales ||
                                disabledButtonsSend(daysBetween, formDataNovelties) ||
                                renderTimeMoney() ||
                                renderConditionsInputsEntryLPAICCPLMA()
                            } color='primary' size='sm' onClick={sendRequest}>Solicitar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default GenerateRequest;
