import React from 'react';

const GenerateNoveltieForAdviser = ({ Modal, openModalGenerateNoveltie, handleCloseModalGenerateNoveltie, listNovelties, formDataNoveltiesSupervisor, handleformDataNoveltiesSupervisor, handleSubmitNoveltieSupervisor, daysBetweenSupervisor, Button, listAdvisers, errorMessage }) => {


    const generateDaysArray = (start, end) => {
        const days = [];
        for (let i = start; i <= end; i++) {
            days.push(i.toString());
        }
        return days;
    };

    const ListDays = { Days: generateDaysArray(1, 31) };
    const ListDays2 = { Days: generateDaysArray(1, 180) };




    const renderConditionDaysCalendar = (daysBetweenSupervisor, formDataNoveltiesSupervisor) => {
        if (daysBetweenSupervisor() < formDataNoveltiesSupervisor.Dias_Laborales) {
            return <div className='text-danger'>Los días laborales no pueden ser mayor a los días calendarios</div>
        } else {
            return '';
        }
    };

    const disabledButtonsSend = (daysBetweenSupervisor, formDataNoveltiesSupervisor) => {
        if (daysBetweenSupervisor() >= formDataNoveltiesSupervisor.Dias_Laborales) {
            return false;
        } else if (daysBetweenSupervisor() < formDataNoveltiesSupervisor.Dias_Laborales) {
            return true;
        }
    };

    //?RENDERIZAMOS CAMPOS ADICIONALES DE LPA PARA,  numero del diagnostico
    const renderInputsEntryLPAICCPLMA = () => {
        if (formDataNoveltiesSupervisor.Tipo_Solicitud === 'ICCP' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA') {
            return (
                <>
                    <div className='row aling-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='Number_Iccp' className='form-label d-flex'>
                                Número de la Incapacidad<div id='invalid-feedback'>*</div>
                            </label>
                            <input id='Number_Iccp' className='form-control' name='Number_Iccp' value={formDataNoveltiesSupervisor.Number_Iccp} onChange={handleformDataNoveltiesSupervisor} />
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='Number_Diag' className='form-label d-flex'>
                                Número del Diagnostico<div id='invalid-feedback'>*</div>
                            </label>
                            <input id='Number_Diag' className='form-control' name='Number_Diag' value={formDataNoveltiesSupervisor.Number_Diag} onChange={handleformDataNoveltiesSupervisor} />
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='Name_Diag' className='form-label'>
                                Nombre del Diagnostico
                            </label>
                            <input id='Name_Diag' className='form-control' name='Name_Diag' value={formDataNoveltiesSupervisor.Name_Diag} onChange={handleformDataNoveltiesSupervisor} />
                        </div>
                    </div>
                </>
            );
        } else {
            return '';
        }
    }


    const renderConditionsInputsEntryLPAICCPLMA = () => {
        if ((formDataNoveltiesSupervisor.Tipo_Solicitud === 'ICCP' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA') && formDataNoveltiesSupervisor.Number_Iccp && formDataNoveltiesSupervisor.Number_Diag) {
            return false;
        } else if ((formDataNoveltiesSupervisor.Tipo_Solicitud === 'ICCP' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA') && !formDataNoveltiesSupervisor.Number_Iccp && !formDataNoveltiesSupervisor.Number_Diag) {
            return true;
        } else if ((formDataNoveltiesSupervisor.Tipo_Solicitud === 'ICCP' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA') && formDataNoveltiesSupervisor.Number_Iccp && !formDataNoveltiesSupervisor.Number_Diag) {
            return true;
        } else if ((formDataNoveltiesSupervisor.Tipo_Solicitud === 'ICCP' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA') && !formDataNoveltiesSupervisor.Number_Iccp && formDataNoveltiesSupervisor.Number_Diag) {
            return true;
        }

        else if ((formDataNoveltiesSupervisor.Tipo_Solicitud === 'LLT' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'CAL' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'AISL') && !formDataNoveltiesSupervisor.Motivo) {
            return true;
        }
        else if ((formDataNoveltiesSupervisor.Tipo_Solicitud === 'LLT' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'CAL' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'AISL') && formDataNoveltiesSupervisor.Motivo) {
            return false;
        }
    };


    const renderTimeMoney = () => {

        if (formDataNoveltiesSupervisor.Tipo_Solicitud === 'LDF' && formDataNoveltiesSupervisor.Motivo) {
            return false;
        } else if (formDataNoveltiesSupervisor.Tipo_Solicitud === 'LDF' && !formDataNoveltiesSupervisor.Motivo) {
            return true;
        }

    };

    const handleKeyDown = (e) => {
        e.preventDefault();
    }


    // Calcula la fecha mínima como 30 días antes de hoy
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    const minDate = thirtyDaysAgo.toISOString().split('T')[0];

    return (
        <Modal
            title={
                <>
                    <h2 className='modal-title text-muted mb-4'>Solicitud de novedad laboral para agente</h2>
                </>
            }
            open={openModalGenerateNoveltie}
            width={800}
            onCancel={handleCloseModalGenerateNoveltie}
            footer={null}
        >
            <div className='container mt-5' >
                <div>

                    <div className='row aling-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='tipoSolicitud' className='form-label d-flex'>
                                Tipo de solicitud<div id='invalid-feedback'>*</div>
                            </label>
                            <select className='form-select' id='tipoSolicitud'
                                value={formDataNoveltiesSupervisor.Tipo_Solicitud} name='Tipo_Solicitud' onChange={handleformDataNoveltiesSupervisor}
                            >
                                <option value=''>Seleccionar...</option>
                                {listNovelties &&
                                    listNovelties.map((option) => {
                                        if (!(option.Novedad === 'LNR' || option.Novedad === 'LDF' || option.Novedad === 'DPAG' || option.Novedad === 'JVOT' || option.Novedad === 'LPA' || option.Novedad === 'LR' || option.Novedad === 'VAC' || option.Novedad === 'VOT' || option.Novedad === 'PDA ME')) {
                                            return (
                                                <option key={option.Id_Novedad} value={option.Novedad}>
                                                    {option.Novedad} - {option.Tipo_Novedad} - {option.Tipo}
                                                </option>
                                            );
                                        }
                                        return null;
                                    })}
                            </select>
                            {formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'ICCP' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LLT' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'CAL' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'AISL' ? (
                                <div className='text-danger'>Debes de asegurarse de que hayas entregado los documentos de soporte correspondientes a gestión humana y o nómina</div>
                            ) : null}
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='forAdvisers' className='form-label d-flex'>
                                ¿Para quien es la novedad?<div id='invalid-feedback'>*</div>
                            </label>
                            <select className='form-select' id='forAdvisers'
                                value={formDataNoveltiesSupervisor.Asesor} name='Asesor' onChange={handleformDataNoveltiesSupervisor}
                            >
                                <option value=''>Seleccionar...</option>
                                {listAdvisers && listAdvisers.map((adviser) => {
                                    return (
                                        <option key={`${adviser.Documento}_${adviser.Nombres}_${adviser.Apellidos}`} value={`${adviser.Nombres} ${adviser.Apellidos}`}>{`${adviser.Nombres} ${adviser.Apellidos}`}</option>
                                    )
                                })}
                            </select>
                            {errorMessage && (
                                <div id='invalid-feedback'>{errorMessage}</div>
                            )}
                        </div>
                    </div>

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
                                className='form-control'
                                id='fechaInicioNovedad'
                                min={minDate}
                                onKeyDown={handleKeyDown}
                                onChange={handleformDataNoveltiesSupervisor}
                                value={formDataNoveltiesSupervisor.Fecha_Inicio_Novedad}
                            />
                        </div>

                        <div className='col mb-3'>
                            <label htmlFor='fechaFinNovedad' className='form-label d-flex'>
                                Fecha fin novedad<div id='invalid-feedback'>*</div>
                            </label>
                            <input
                                type='date'
                                id='fechaFinNovedad'
                                name='Fecha_Fin_Novedad'
                                className='form-control'
                                onKeyDown={handleKeyDown}
                                onChange={handleformDataNoveltiesSupervisor}
                                value={formDataNoveltiesSupervisor.Fecha_Fin_Novedad}
                                min={formDataNoveltiesSupervisor.Fecha_Inicio_Novedad}
                                disabled={!formDataNoveltiesSupervisor.Fecha_Inicio_Novedad}
                            />
                        </div>
                    </div>

                    <div className='row aling-items-center'>
                        <div className='col mb-3'>
                            {formDataNoveltiesSupervisor.Fecha_Inicio_Novedad && formDataNoveltiesSupervisor.Fecha_Fin_Novedad ? (
                                <>
                                    <label htmlFor='diasCalendario' className='form-label'>
                                        Días calendario
                                    </label>
                                    <input id='diasCalendario' className='form-control' value={daysBetweenSupervisor()} disabled />
                                </>
                            ) : ''}
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='diasLaborales' className='form-label d-flex'>
                                Días laborales<div id='invalid-feedback'>*</div>
                            </label>
                            {formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA' || formDataNoveltiesSupervisor.Tipo_Solicitud === 'LMA' ? (
                                <select id='diasLaborales' className='form-select' name='Dias_Laborales'
                                    value={formDataNoveltiesSupervisor.Dias_Laborales} onChange={handleformDataNoveltiesSupervisor}
                                >
                                    <option value=''>Seleccionar...</option>
                                    {ListDays2.Days.map((day) => {
                                        return (
                                            <option value={day} key={day}>
                                                {day}
                                            </option>
                                        )
                                    })}
                                </select>
                            ) : (
                                <select id='diasLaborales' className='form-select' name='Dias_Laborales'
                                    value={formDataNoveltiesSupervisor.Dias_Laborales} onChange={handleformDataNoveltiesSupervisor}
                                >
                                    <option value=''>Seleccionar...</option>
                                    {ListDays.Days.map((day) => {
                                        return (
                                            <option value={day} key={day}>
                                                {day}
                                            </option>
                                        )
                                    })}
                                </select>
                            )}
                        </div>
                    </div>

                    {renderConditionDaysCalendar(daysBetweenSupervisor, formDataNoveltiesSupervisor)}

                    <div className='mb-3'>
                        <label htmlFor='motivo' className='form-label d-flex'>
                            Comentario  {formDataNoveltiesSupervisor.Tipo_Solicitud === 'LDF' ? (<div id='invalid-feedback' className='p-1'>(Obligatorio, LDF)</div>) : ('')}
                        </label>
                        <textarea
                            id='motivo'
                            name='Motivo'
                            className='form-control'
                            value={formDataNoveltiesSupervisor.Motivo}
                            onChange={handleformDataNoveltiesSupervisor}
                            placeholder='Escribe una pequeña descripción sobre tu novedad'
                        />
                    </div>

                    <div className='d-flex flex-row-reverse'>
                        <div className='p-2'>
                            <Button variant='soft' color='danger' size='sm' onClick={handleCloseModalGenerateNoveltie}>
                                Cancelar
                            </Button>
                        </div>
                        <div className='p-2'>
                            <Button variant='soft' color='primary' size='sm'
                                disabled={
                                    !formDataNoveltiesSupervisor.Tipo_Solicitud ||
                                    !formDataNoveltiesSupervisor.Asesor ||
                                    !formDataNoveltiesSupervisor.Fecha_Inicio_Novedad ||
                                    !formDataNoveltiesSupervisor.Fecha_Fin_Novedad ||
                                    !formDataNoveltiesSupervisor.Dias_Laborales ||
                                    disabledButtonsSend(daysBetweenSupervisor, formDataNoveltiesSupervisor) ||
                                    renderConditionsInputsEntryLPAICCPLMA() ||
                                    renderTimeMoney()
                                }
                                onClick={() => handleSubmitNoveltieSupervisor()}
                            >Solicitar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default GenerateNoveltieForAdviser;
