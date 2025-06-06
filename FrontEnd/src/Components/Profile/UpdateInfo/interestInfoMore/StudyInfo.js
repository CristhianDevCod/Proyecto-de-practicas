import React from 'react'

const StudyInfo = ({ formCount, setFormCount, selectOptionsUnderStudy, selectOptionsSemesterStudy, selectOptionsStatusStyudy, data, formData, handleChangeDates }) => {
    return (
        <>
            <form
                className='row'
                name='dynamic_form_nest_item'
                style={{
                    maxWidth: '100%',
                    width: '100%',
                    marginTop: '2%',
                }}
                autoComplete='off'
            >

                {Array.from({ length: formCount }).map((_, index) => (
                    <div
                        key={index}
                        className='d-flex'
                        style={{
                            width: '100%',
                            marginBottom: 8,
                        }}
                        align='baseline'
                    >
                        {/* estudio prefrado */}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Estudio Pregrado' : index === 1 ? 'Estudio Pregrado Secundario' : 'Estudio Pregrado Terciario'}</label>
                            {data[index === 0 ? 'Estudio_Pregrado' : index === 1 ? 'Estudio_Pregrado_Secundario' : 'Estudio_Pregrado_Terciario'] ? (
                                <input
                                    className='form-control'
                                    placeholder='Llenar'
                                    name={index === 0 ? 'Estudio_Pregrado' : index === 1 ? 'Estudio_Pregrado_Secundario' : 'Estudio_Pregrado_Terciario'}
                                    defaultValue={data[index === 0 ? 'Estudio_Pregrado' : index === 1 ? 'Estudio_Pregrado_Secundario' : 'Estudio_Pregrado_Terciario']}
                                    onChange={handleChangeDates}
                                />
                            ) : (!data[index === 0 ? 'Estudio_Pregrado' : index === 1 ? 'Estudio_Pregrado_Secundario' : 'Estudio_Pregrado_Terciario'] &&
                                <input
                                    className='form-control'
                                    placeholder='Llenar'
                                    name={index === 0 ? 'Estudio_Pregrado' : index === 1 ? 'Estudio_Pregrado_Secundario' : 'Estudio_Pregrado_Terciario'}
                                    value={formData[index === 0 ? 'Estudio_Pregrado' : index === 1 ? 'Estudio_Pregrado_Secundario' : 'Estudio_Pregrado_Terciario'] || ''}
                                    onChange={handleChangeDates}
                                />
                            )}
                        </div>


                        {/* Tipo de estudio */}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Tipo Estudio Pregrado' : index === 1 ? 'Tipo Estudio Pregrado Secundario' : 'Tipo Estudio Pregrado Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario'}
                                value={formData[index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario']}>
                                            {data[index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario']}
                                        </option>
                                        {selectOptionsUnderStudy &&
                                            selectOptionsUnderStudy.map((options) => (
                                                options.estudio_pregrado !== data[index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario'] && (
                                                    <option
                                                        key={options.id_estudio_pregrado}
                                                        value={options.estudio_pregrado}
                                                    >
                                                        {options.estudio_pregrado}
                                                    </option>
                                                )
                                            ))}
                                    </>
                                ) : (
                                    !data[index === 0 ? 'Tipo_Estudio_Pregrado' : index === 1 ? 'Tipo_Estudio_Pregrado_Secundario' : 'Tipo_Estudio_Pregrado_Terciario'] && selectOptionsUnderStudy &&
                                    selectOptionsUnderStudy.map((options) => (
                                        <option
                                            key={options.id_estudio_pregrado}
                                            value={options.estudio_pregrado}
                                        >
                                            {options.estudio_pregrado}
                                        </option>
                                    )))}
                            </select>
                        </div>

                        {/* semestre */}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? ' Semestre Pregrado' : index === 1 ? 'Semestre Pregrado Secundario' : 'Semestre Pregrado Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario'}
                                value={formData[index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario']}>
                                            {data[index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario']}
                                        </option>
                                        {selectOptionsSemesterStudy &&
                                            selectOptionsSemesterStudy.map((options) => (
                                                options.id_semestre !== data[index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario'] && (
                                                    <option
                                                        key={options.id_semestre}
                                                        value={options.id_semestre}
                                                    >
                                                        {options.id_semestre}
                                                    </option>
                                                )
                                            ))}
                                    </>
                                ) : (
                                    !data[index === 0 ? 'Semestre_Pregrado' : index === 1 ? 'Semestre_Pregrado_Secundario' : 'Semestre_Pregrado_Terciario'] && selectOptionsSemesterStudy &&
                                    selectOptionsSemesterStudy.map((options) => (
                                        <option
                                            key={options.id_semestre}
                                            value={options.id_semestre}
                                        >
                                            {options.id_semestre}
                                        </option>
                                    )))}
                            </select>
                        </div>


                        {/* estado  */}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Estado Estudio Pregrado' : index === 1 ? 'Estado Estudio Pregrado Secundario' : 'Estado Estudio Pregrado Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario'}
                                value={formData[index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario']}>
                                            {data[index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario']}
                                        </option>
                                        {selectOptionsStatusStyudy &&
                                            selectOptionsStatusStyudy.map((options) => (
                                                options.estado_estudio !== data[index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario'] && (
                                                    <option
                                                        key={options.id_estado_estudio}
                                                        value={options.estado_estudio}
                                                    >
                                                        {options.estado_estudio}
                                                    </option>
                                                )
                                            ))}
                                    </>
                                ) : (
                                    !data[index === 0 ? 'Estado_Estudio_Pregrado' : index === 1 ? 'Estado_Estudio_Pregrado_Secundario' : 'Estado_Estudio_Pregrado_Terciario'] && selectOptionsStatusStyudy &&
                                    selectOptionsStatusStyudy.map((options) => (
                                        <option
                                            key={options.id_estado_estudio}
                                            value={options.estado_estudio}
                                        >
                                            {options.estado_estudio}
                                        </option>
                                    )))}
                            </select>
                        </div>

                        <button
                            type='button'
                            className='btn btn btn-close btn-sm'
                            onClick={() => setFormCount((prevCount) => prevCount - 1)}
                            disabled={formCount <= 0}
                            style={{ marginLeft: '8px', marginTop: '5%' }}
                        />
                    </div>
                ))}

                <div className='d-grid gap-2'>
                    <button
                        className='btn btn-outline-primary'
                        type='button'
                        onClick={() => {
                            if (formCount < 3) {
                                setFormCount((prevCount) => prevCount + 1);
                            }
                        }}
                        disabled={formCount >= 3}
                    >
                        Añadir Estudios
                    </button>
                </div>
            </form>
        </>
    )
}

export default StudyInfo