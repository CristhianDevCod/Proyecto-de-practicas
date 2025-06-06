import React from 'react'

const StudyPost = ({ formCount1, data, setFormCount1, formData, handleChangeDates, selectOptionsPostStudy, selectOptionsSemesterStudy, selectOptionsStatusStyudy }) => {
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

                {Array.from({ length: formCount1 }).map((_, index) => (
                    <div
                        key={index}
                        className='d-flex'
                        style={{
                            width: '100%',
                            marginBottom: 8,
                        }}
                        align='baseline'
                    >
                        {/* estudio posgrados */}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Estudio Posgrado' : index === 1 ? 'Estudio Posgrado Secundario' : 'Estudio Posgrado Terciario'}</label>
                            {data[index === 0 ? 'Estudio_Posgrado' : index === 1 ? 'Estudio_Posgrado_Secundario' : 'Estudio_Posgrado_Terciario'] ? (
                                <input
                                    className='form-control'
                                    placeholder='Llenar'
                                    name={index === 0 ? 'Estudio_Posgrado' : index === 1 ? 'Estudio_Posgrado_Secundario' : 'Estudio_Posgrado_Terciario'}
                                    defaultValue={data[index === 0 ? 'Estudio_Posgrado' : index === 1 ? 'Estudio_Posgrado_Secundario' : 'Estudio_Posgrado_Terciario']}
                                    onChange={handleChangeDates}
                                />
                            ) : (!data[index === 0 ? 'Estudio_Posgrado' : index === 1 ? 'Estudio_Posgrado_Secundario' : 'Estudio_Posgrado_Terciario'] &&
                                <input
                                    className='form-control'
                                    placeholder='Llenar'
                                    name={index === 0 ? 'Estudio_Posgrado' : index === 1 ? 'Estudio_Posgrado_Secundario' : 'Estudio_Posgrado_Terciario'}
                                    value={formData[index === 0 ? 'Estudio_Posgrado' : index === 1 ? 'Estudio_Posgrado_Secundario' : 'Estudio_Posgrado_Terciario'] || ''}
                                    onChange={handleChangeDates}
                                />
                            )}
                        </div>


                        {/* Tipo de estudio posgrados*/}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Tipo Estudio Posgrado' : index === 1 ? 'Tipo Estudio Posgrado Secundario' : 'Tipo Estudio Posgrado Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario'}
                                value={formData[index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario']}>
                                            {data[index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario']}
                                        </option>
                                        {selectOptionsPostStudy &&
                                            selectOptionsPostStudy.map((options) => (
                                                options.estudio_posgrado !== data[index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario'] && (
                                                    <option
                                                        key={options.id_estudio_posgrado}
                                                        value={options.estudio_posgrado}
                                                    >
                                                        {options.estudio_posgrado}
                                                    </option>
                                                )
                                            ))}
                                    </>
                                ) : (
                                    !data[index === 0 ? 'Tipo_Estudio_Posgrado' : index === 1 ? 'Tipo_Estudio_Posgrado_Secundario' : 'Tipo_Estudio_Posgrado_Terciario'] && selectOptionsPostStudy &&
                                    selectOptionsPostStudy.map((options) => (
                                        <option
                                            key={options.id_estudio_posgrado}
                                            value={options.estudio_posgrado}
                                        >
                                            {options.estudio_posgrado}
                                        </option>
                                    )))}
                            </select>
                        </div>

                        {/* semestre posgrados*/}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? ' Semestre Posgrado' : index === 1 ? 'Semestre Posgrado Secundario' : 'Semestre Posgrado Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario'}
                                value={formData[index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario']}>
                                            {data[index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario']}
                                        </option>
                                        {selectOptionsSemesterStudy &&
                                            selectOptionsSemesterStudy.map((options) => (
                                                options.id_semestre !== data[index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario'] && (
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
                                    !data[index === 0 ? 'Semestre_Posgrado' : index === 1 ? 'Semestre_Posgrado_SecundarioSemestre_Posgrado' : 'Semestre_Posgrado_Terciario'] && selectOptionsSemesterStudy &&
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
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Estado Estudio Posgrado' : index === 1 ? 'Estado Estudio Posgrado Secundario' : 'Estado Estudio Posgrado Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario'}
                                value={formData[index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario']}>
                                            {data[index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario']}
                                        </option>
                                        {selectOptionsStatusStyudy &&
                                            selectOptionsStatusStyudy.map((options) => (
                                                options.estado_estudio !== data[index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario'] && (
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
                                    !data[index === 0 ? 'Estado_Estudio_Posgrado' : index === 1 ? 'Estado_Estudio_Posgrado_Secundario' : 'Estado_Estudio_Posgrado_Terciario'] && selectOptionsStatusStyudy &&
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
                            onClick={() => setFormCount1((prevCount) => prevCount - 1)}
                            disabled={formCount1 <= 0}
                            style={{ marginLeft: '8px', marginTop: '5%' }}
                        />
                    </div>
                ))}

                <div className='d-grid gap-2'>
                    <button
                        className='btn btn-outline-primary'
                        type='button'
                        onClick={() => {
                            if (formCount1 < 3) {
                                setFormCount1((prevCount) => prevCount + 1);
                            }
                        }}
                        disabled={formCount1 >= 3}
                    >
                        Añadir Estudios Posgrado
                    </button>
                </div>
            </form>
        </>
    )
}

export default StudyPost