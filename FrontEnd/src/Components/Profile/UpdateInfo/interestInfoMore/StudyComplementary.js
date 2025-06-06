import React from 'react'

const StudyComplementary = ({ formCount2, formData, setFormCount2, data, handleChangeDates, selectOptionsCompleStyudy, selectOptionsSemesterStudy, selectOptionsStatusStyudy }) => {
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

                {Array.from({ length: formCount2 }).map((_, index) => (
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
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Estudio Complementario' : index === 1 ? 'Estudio Complementario Secundario' : 'Estudio Complementario Terciario'}</label>
                            {data[index === 0 ? 'Estudio_Complementario' : index === 1 ? 'Estudio_Complementario_Secundario' : 'Estudio_Complementario_Terciario'] ? (
                                <input
                                    className='form-control'
                                    placeholder='Llenar'
                                    name={index === 0 ? 'Estudio_Complementario' : index === 1 ? 'Estudio_Complementario_Secundario' : 'Estudio_Complementario_Terciario'}
                                    defaultValue={data[index === 0 ? 'Estudio_Complementario' : index === 1 ? 'Estudio_Complementario_Secundario' : 'Estudio_Complementario_Terciario']}
                                    onChange={handleChangeDates}
                                />
                            ) : (!data[index === 0 ? 'Estudio_Complementario' : index === 1 ? 'Estudio_Complementario_Secundario' : 'Estudio_Complementario_Terciario'] &&
                                <input
                                    className='form-control'
                                    placeholder='Llenar'
                                    name={index === 0 ? 'Estudio_Complementario' : index === 1 ? 'Estudio_Complementario_Secundario' : 'Estudio_Complementario_Terciario'}
                                    value={formData[index === 0 ? 'Estudio_Complementario' : index === 1 ? 'Estudio_Complementario_Secundario' : 'Estudio_Complementario_Terciario'] || ''}
                                    onChange={handleChangeDates}
                                />
                            )}
                        </div>


                        {/* Tipo de estudio posgrados*/}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Tipo Estudio Complementario' : index === 1 ? 'Tipo Estudio Complementario Secundario' : 'Tipo Estudio Complementario Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario'}
                                value={formData[index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario']}>
                                            {data[index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario']}
                                        </option>
                                        {selectOptionsCompleStyudy &&
                                            selectOptionsCompleStyudy.map((options) => (
                                                options.estudio_complementario !== data[index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario'] && (
                                                    <option
                                                        key={options.id_estudio_complementario}
                                                        value={options.estudio_complementario}
                                                    >
                                                        {options.estudio_complementario}
                                                    </option>
                                                )
                                            ))}
                                    </>
                                ) : (
                                    !data[index === 0 ? 'Tipo_Estudio_Complementario' : index === 1 ? 'Tipo_Estudio_Complementario_Secundario' : 'Tipo_Estudio_Complementario_Terciario'] && selectOptionsCompleStyudy &&
                                    selectOptionsCompleStyudy.map((options) => (
                                        <option
                                            key={options.id_estudio_complementario}
                                            value={options.estudio_complementario}
                                        >
                                            {options.estudio_complementario}
                                        </option>
                                    )))}
                            </select>
                        </div>

                        {/* semestre posgrados*/}
                        <div className='p-1'>
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? ' Semestre Complementario' : index === 1 ? 'Semestre Complementario Secundario' : 'Semestre Complementario Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario'}
                                value={formData[index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario']}>
                                            {data[index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario']}
                                        </option>
                                        {selectOptionsSemesterStudy &&
                                            selectOptionsSemesterStudy.map((options) => (
                                                options.id_semestre !== data[index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario'] && (
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
                                    !data[index === 0 ? 'Semestre_Complementario' : index === 1 ? 'Semestre_Complementario_Secundario' : 'Semestre_Complementario_Terciario'] && selectOptionsSemesterStudy &&
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
                            <label for='inputEmail' className='form-label text-muted-labels'>{index === 0 ? 'Estado Estudio Complementario' : index === 1 ? 'Estado Estudio Complementario Secundario' : 'Estado Estudio Complementario Terciario'}</label>
                            <select
                                className='form-select'
                                name={index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario'}
                                value={formData[index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario'] || ''}
                                onChange={handleChangeDates}
                            >
                                <option value=''>Seleccione</option>
                                {data[index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario'] ? (
                                    <>
                                        <option value={data[index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario']}>
                                            {data[index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario']}
                                        </option>
                                        {selectOptionsStatusStyudy &&
                                            selectOptionsStatusStyudy.map((options) => (
                                                options.estado_estudio !== data[index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario'] && (
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
                                    !data[index === 0 ? 'Estado_Estudio_Complementario' : index === 1 ? 'Estado_Estudio_Complementario_Secundario' : 'Estado_Estudio_Complementario_Terciario'] && selectOptionsStatusStyudy &&
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
                            onClick={() => setFormCount2((prevCount) => prevCount - 1)}
                            disabled={formCount2 <= 0}
                            style={{ marginLeft: '8px', marginTop: '5%' }}
                        />
                    </div>
                ))}

                <div className='d-grid gap-2'>
                    <button
                        className='btn btn-outline-primary'
                        type='button'
                        onClick={() => {
                            if (formCount2 < 3) {
                                setFormCount2((prevCount) => prevCount + 1);
                            }
                        }}
                        disabled={formCount2 >= 3}
                    >
                        Añadir Estudios Complementarios
                    </button>
                </div>
            </form>
        </>
    )
}

export default StudyComplementary