import React from 'react'

const ReportsTardiness = ({
    open,
    Modal,
    Button,
    fullName,
    onSubmit,
    Name_Diag,
    Number_Iccp,
    Number_Diag,
    handleClose,
    numberApolo,
    description,
    typeTardiness,
    dateTardiness,
    listTardiness,
    handleName_Diag,
    ItemContentModal,
    dateTardinessTwo,
    handleNumber_Iccp,
    handleNumber_Diag,
    handleNumberApolo,
    handleDescription,
    handleTypeTardiness,
    handleDateTardiness,
    selectTypeTardiness,
    setSelectTypeTardiness,
    handleDateTardinessTwo
}) => {
    // Obtener la fecha actual
    const currentDate = new Date();
    // Establecer la hora en 00:00:00
    currentDate.setHours(0, 0, 0, 0);
    // Formatear la fecha actual en formato YYYY-MM-DD
    const maxDate = currentDate.toISOString().split('T')[0];

    // Obtener la fecha actual
    const today = new Date();


    // Formatear la fecha actual en yyyy-mm-dd
    const todayStr = today.toISOString().split('T')[0];
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 30);
    const pastDateStr = pastDate.toISOString().split('T')[0];

    const pastDate2 = new Date(today);
    pastDate2.setDate(pastDate2.getDate() - 15);
    const pastDateStr2 = pastDate2.toISOString().split('T')[0];

    function disabledOptiuons(typeTardiness, dateTardiness, dateTardinessTwo, numberApolo, selectTypeTardiness) {
        if (typeTardiness === 'INCIDENCIA CON USUARIO' && !dateTardiness && !numberApolo) {
            return true;
        } else if (typeTardiness === 'INCIDENCIA CON USUARIO' && dateTardiness && !numberApolo) {
            return true;
        } else if (typeTardiness === 'INCIDENCIA CON USUARIO' && dateTardiness && numberApolo) {
            return false;
        }

        if (selectTypeTardiness === 'IMPUNTUALIDAD' && !typeTardiness) {
            return true;
        } else if (selectTypeTardiness === 'IMPUNTUALIDAD' && typeTardiness) {
            return false;
        }

        else if (typeTardiness === 'INCIDENCIA TECNICA' && !dateTardiness && !numberApolo) {
            return true;
        } else if (typeTardiness === 'INCIDENCIA TECNICA' && dateTardiness && !numberApolo) {
            return true;
        } else if (typeTardiness === 'INCIDENCIA TECNICA' && dateTardiness && numberApolo) {
            return false;
        }
        else if (!typeTardiness && !dateTardiness) {
            return true;
        } else if (!typeTardiness && dateTardiness) {
            return true;
        } else if (typeTardiness && !dateTardiness) {
            return true;
        } else if (typeTardiness && dateTardiness) {
            return false;
        }

        if (selectTypeTardiness === 'AUSENCIA' && !typeTardiness && !dateTardiness && !dateTardinessTwo) {
            return true;
        } else if (selectTypeTardiness === 'AUSENCIA' && typeTardiness && !dateTardiness && !dateTardinessTwo) {
            return true;
        } else if (selectTypeTardiness === 'AUSENCIA' && typeTardiness && dateTardiness && !dateTardinessTwo) {
            return true;
        } else if (selectTypeTardiness === 'AUSENCIA' && typeTardiness && dateTardiness && dateTardinessTwo) {
            return false;
        }
    }


    const handleKeyDown = (e) => {
        e.preventDefault();
    }




    const renderInputsDates = (typeTardiness, selectTypeTardiness) => {
        if (typeTardiness === 'URGENCIA MEDICA') {
            return (
                <div className='col mb-3'>
                    <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                        Fecha Impuntualidad<div id='invalid-feedback'>*</div>
                    </label>
                    <input
                        type='date'
                        disabled={!typeTardiness}
                        value={dateTardiness}
                        id='fechaInicioNovedad'
                        onKeyDown={handleKeyDown}
                        className='form-control'
                        name='Fecha_Inicio_Novedad'
                        onChange={handleDateTardiness}
                        max={todayStr}
                        min={pastDateStr}
                    />
                </div>
            );

        } else if (selectTypeTardiness === 'AUSENCIA') {
            return (
                <div className='col mb-3'>
                    <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                        Fecha Impuntualidad<div id='invalid-feedback'>*</div>
                    </label>
                    <input
                        type='date'
                        disabled={!typeTardiness}
                        max={maxDate}
                        value={dateTardiness}
                        onKeyDown={handleKeyDown}
                        id='fechaInicioNovedad'
                        className='form-control'
                        name='Fecha_Inicio_Novedad'
                        onChange={handleDateTardiness}
                        min={pastDateStr}
                    />

                    <label htmlFor='dateTardinessTwo' className='form-label d-flex'>
                        Fecha Fin Impuntualidad<div id='invalid-feedback'>*</div>
                    </label>
                    <input
                        type='date'
                        disabled={!dateTardiness}
                        max={maxDate}
                        min={dateTardiness}
                        value={dateTardinessTwo}
                        onKeyDown={handleKeyDown}
                        id='dateTardinessTwo'
                        className='form-control'
                        name='Fecha_Inicio_Novedad'
                        onChange={handleDateTardinessTwo}
                    />
                </div>
            );
        } else {
            return (
                <div className='col mb-3'>
                    <label htmlFor='fechaInicioNovedad' className='form-label d-flex'>
                        Fecha Inicio Impuntualidad<div id='invalid-feedback'>*</div>
                    </label>
                    <input
                        type='date'
                        disabled={!typeTardiness}
                        max={maxDate}
                        min={pastDateStr2}
                        value={dateTardiness}
                        onKeyDown={handleKeyDown}
                        id='fechaInicioNovedad'
                        className='form-control'
                        name='Fecha_Inicio_Novedad'
                        onChange={handleDateTardiness}
                    />
                </div>
            );
        }
    }

    //!RENDERIZAMOS MAS CAMPOS EN CASO TAL HAYAN SELECCIONADO ESTAS AUSENCIAS
    //?'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS'
    //?'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS'
    //?'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL'
    //?'LICENCIA DE MATERNIDAD'
    //?'LICENCIA DE PATERNIDAD (LEY MARIA)'
    function renderMoreInputs(typeTardiness) {
        if (
            typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' ||
            typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' ||
            typeTardiness === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' ||
            typeTardiness === 'LICENCIA DE MATERNIDAD' ||
            typeTardiness === 'LICENCIA DE PATERNIDAD (LEY MARIA)'
        ) {
            return (
                <>
                    <div className='row aling-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='Number_Iccp' className='form-label d-flex'>
                                Número de la Incapacidad<div id='invalid-feedback'>*</div>
                            </label>
                            <input id='Number_Iccp' className='form-control' name='Number_Iccp' value={Number_Iccp} onChange={handleNumber_Iccp} />
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='Number_Diag' className='form-label d-flex'>
                                Número del Diagnostico<div id='invalid-feedback'>*</div>
                            </label>
                            <input id='Number_Diag' className='form-control' name='Number_Diag' value={Number_Diag} onChange={handleNumber_Diag} />
                        </div>
                        <div className='col mb-3'>
                            <label htmlFor='Name_Diag' className='form-label'>
                                Nombre del Diagnostico
                            </label>
                            <input id='Name_Diag' className='form-control' name='Name_Diag' value={Name_Diag} onChange={handleName_Diag} />
                        </div>
                    </div>
                </>
            );
        } else {
            return '';
        }
    }

    function disabledOptionsIccpLpaLma(typeTardiness, Number_Iccp, Number_Diag) {
        if (typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' && Number_Iccp && Number_Diag) {
            return false;
        } else if (typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' && !Number_Iccp && !Number_Diag) {
            return true;
        }
        else if (typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' && Number_Iccp && !Number_Diag) {
            return true;
        }

        else if (typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' && Number_Iccp && Number_Diag) {
            return false;
        }
        else if (typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' && !Number_Iccp && !Number_Diag) {
            return true;
        }
        else if (typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' && Number_Iccp && !Number_Diag) {
            return true;
        }

        else if (typeTardiness === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' && Number_Iccp && Number_Diag) {
            return false;
        }
        else if (typeTardiness === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' && !Number_Iccp && !Number_Diag) {
            return true;
        }
        else if (typeTardiness === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' && Number_Iccp && !Number_Diag) {
            return true;
        }

        else if (typeTardiness === 'LICENCIA DE MATERNIDAD' && Number_Iccp && Number_Diag) {
            return false;
        }
        else if (typeTardiness === 'LICENCIA DE MATERNIDAD' && !Number_Iccp && !Number_Diag) {
            return true;
        }
        else if (typeTardiness === 'LICENCIA DE MATERNIDAD' && Number_Iccp && !Number_Diag) {
            return true;
        }

        else if (typeTardiness === 'LICENCIA DE PATERNIDAD (LEY MARIA)' && Number_Iccp && Number_Diag) {
            return false;
        }
        else if (typeTardiness === 'LICENCIA DE PATERNIDAD (LEY MARIA)' && !Number_Iccp && !Number_Diag) {
            return true;
        }
        else if (typeTardiness === 'LICENCIA DE PATERNIDAD (LEY MARIA)' && Number_Iccp && !Number_Diag) {
            return true;
        }
    }

    function disabledOptonsCommnents(typeTardiness, description) {
        if (typeTardiness === 'FORMACION' && !description) {
            return true;
        } else if (typeTardiness === 'LICENCIA NO REMUNERADA' && !description) {
            return true;
        } else if (typeTardiness === 'LICENCIA REMUNERADA' && !description) {
            return true;
        } else if (typeTardiness === 'VACACION' && !description) {
            return true;
        } else if (typeTardiness === 'DIA DE LA FAMILIA' && !description) {
            return true;
        } else if (typeTardiness === 'FORMACION NESTING' && !description) {
            return true;
        } else if (typeTardiness === 'INCIDENCIA CON USUARIO' && !description) {
            return true;
        } else if (typeTardiness === 'INCIDENCIA TECNICA' && !description) {
            return true;
        } else if (typeTardiness === 'LACTANCIA' && !description) {
            return true;
        } else if (typeTardiness === 'LLAMADA LARGA' && !description) {
            return true;
        } else if (typeTardiness === 'NO HAY PUESTOS' && !description) {
            return true;
        } else if (typeTardiness === 'SALIDA TEMPRANO JUSTIFICADA' && !description) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Modal
            title={<h2 className='modal-title text-muted mb-4'>Reporte de Impuntualidad / Ausencia</h2>}
            width={800}
            open={open}
            footer={null}
            onCancel={handleClose}
        >
            <ItemContentModal>
                {fullName && fullName.map((data) => {
                    return (
                        <div key={`${data.Documento}_${data.Fecha_Corte}`} >
                            <div className='text-muted'>
                                Nombre / Apellidos
                                <div className='title-metas'>{data.Nombres} {data.Apellidos}</div>
                            </div>

                            <div className='text-muted'>
                                Documento de Identidad
                                <div className='title-metas'>{data.Documento}</div>
                            </div>

                            <div className='text-muted'>
                                Cargo
                                <div className='title-metas'>{data.Cargo}</div>
                            </div>
                        </div>
                    )
                })}
            </ItemContentModal>

            <div className='container mt-5' >
                <div>

                    <div className='d-flex mb-2'>
                        <div className='flex-fill'>
                            <label htmlFor='tipoImpuntualidad/Ausencia' className='form-label d-flex'>
                                Tipo<div id='invalid-feedback'>*</div>
                            </label>
                            <select
                                className='form-select'
                                value={selectTypeTardiness}
                                id='tipoImpuntualidad/Ausencia'
                                onChange={(e) => setSelectTypeTardiness(e.target.value)}
                            >
                                <option value=''>Seleccione...</option>
                                <option value='AUSENCIA'>AUSENCIA</option>
                                <option value='IMPUNTUALIDAD'>IMPUNTUALIDAD</option>
                            </select>
                        </div>
                    </div>

                    <div className='row align-items-center'>
                        <div className='col mb-3'>
                            <label htmlFor='tipoSolicitud' className='form-label d-flex'>
                                Tipo de impuntualidad<div id='invalid-feedback'>*</div>
                            </label>
                            <select disabled={!selectTypeTardiness} value={typeTardiness} onChange={handleTypeTardiness} className='form-select' id='tipoSolicitud' name='Tipo_Solicitud' >
                                <option value=''>Seleccionar...</option>
                                {Array.isArray(listTardiness) && listTardiness.map((item) => (
                                    (selectTypeTardiness === '' || item.Type === selectTypeTardiness) &&
                                    <option key={item.ID} value={item.Name_Tardiness}>{item.Type_Tardiness}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    {typeTardiness === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL' || typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD > A TRES DIAS' || typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD < A TRES DIAS' || typeTardiness === 'LICENCIA DE MATERNIDAD' || typeTardiness === 'LICENCIA DE PATERNIDAD (LEY MARIA)' || typeTardiness === 'LICENCIA POR LUTO' || typeTardiness === 'SANCION POR PROCESO DISCIPLINARIO' || typeTardiness === 'CAMALIDAD DOMESTICA DEBIDAMENTE COMPROBADA' ? (
                        <div className='text-danger'>!!!NO OLVIDES LLEVAR LOS DOCUMENTOS PROBATORIOS A NOMINA PARA QUE LA NOVEDAD SEA APROBADA¡¡¡</div>
                    ) : null}

                    {renderMoreInputs(typeTardiness)}


                    {renderInputsDates(typeTardiness, selectTypeTardiness)}

                    {typeTardiness === 'INCIDENCIA CON USUARIO' || typeTardiness === 'INCIDENCIA TECNICA' ? (
                        <div className='col mb-3'>
                            <label htmlFor='NumeroApolo' className='form-label d-flex'>
                                Número de Apolo<div id='invalid-feedback'>*</div>
                            </label>
                            <input
                                type='search'
                                id='NumeroApolo'
                                value={numberApolo}
                                name='Numero_Apolo'
                                className='form-control'
                                onChange={handleNumberApolo}
                            />
                        </div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'URGENCIA MEDICA' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte médico a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'CONSULTA MEDICA' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte médico a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'INCAPACIDAD  POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL > 3 DIAS' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD  MAYOR A TRES DIAS' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte médico a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'INCAPACIDAD MEDICA POR ENFERMEDAD MENOR A TRES DIAS' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte médico a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'LICENCIA DE MATERNIDAD' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'LICENCIA DE MATRIMONIO' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'LICENCIA DE PATERNIDAD (LEY MARIA)' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte a punto helpi y / o nómina</div>
                    ) : ('')}

                    {typeTardiness && typeTardiness === 'LICENCIA POR LUTO' ? (
                        <div className='text-danger'>Debes de asegurarse de que hayas entregado el soporte a punto helpi y / o nómina</div>
                    ) : ('')}

                    <div className='mb-3'>
                        <label htmlFor='motivo' className='form-label'>
                            Descripcion de la Impuntualidad {(
                                typeTardiness === 'FORMACION' ||
                                typeTardiness === 'LICENCIA NO REMUNERADA' ||
                                typeTardiness === 'LICENCIA REMUNERADA' ||
                                typeTardiness === 'VACACION' ||
                                typeTardiness === 'FORMACION NESTING' ||
                                typeTardiness === 'INCIDENCIA CON USUARIO' ||
                                typeTardiness === 'INCIDENCIA TECNICA' ||
                                typeTardiness === 'LACTANCIA' ||
                                typeTardiness === 'LLAMADA LARGA' ||
                                typeTardiness === 'NO HAY PUESTOS' ||
                                typeTardiness === 'SALIDA TEMPRANO JUSTIFICADA' ||
                                (typeTardiness === 'DIA DE LA FAMILIA')
                            ) && (
                                    <div className='text-danger'>
                                        Obligatorio
                                    </div>
                                )}
                        </label>

                        <textarea
                            id='motivo'
                            name='Motivo'
                            value={description}
                            className='form-control'
                            onChange={handleDescription}
                            placeholder='Escribe una pequeña descripción sobre tu novedad'
                        />
                    </div>

                    <div className='d-flex flex-row-reverse'>
                        <div className='p-2'>
                            <Button variant='soft' color='danger' size='sm' onClick={handleClose}>Cancelar</Button>
                        </div>
                        <div className='p-2'>
                            <Button
                                variant='soft'
                                color='primary'
                                disabled={
                                    disabledOptiuons(typeTardiness, dateTardiness, dateTardinessTwo, numberApolo, selectTypeTardiness) ||
                                    disabledOptionsIccpLpaLma(typeTardiness, Number_Iccp, Number_Diag) ||
                                    disabledOptonsCommnents(typeTardiness, description)
                                }
                                size='sm'
                                onClick={() => onSubmit()}>
                                Enviar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default ReportsTardiness;