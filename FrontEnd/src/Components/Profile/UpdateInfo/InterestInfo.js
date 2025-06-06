import React, { useContext, useEffect, useState } from 'react';

import '../styles/Styles.css';
import { UserProfileContext } from '../../../Context/ProfileContex';
import { Ethnic_Group, Internet, Internet_Speed, Language, Language_Level, Pc_Home, RAM, SO, Type_Vehicle, Vehicle } from '../../../API/API';
const InterestInfo = ({ formData, handleChangeDates, validationErrors }) => {
  const { fullName } = useContext(UserProfileContext);
  const [formCount, setFormCount] = useState(0);
  const [selectOptionsVehicle, setselectOptionsVehicle] = useState([]);
  const [selectOptionsVehicleType, setselectOptionsVehicleType] = useState([]);
  const [selectOptionsEtnia, setselectOptionsEtnia] = useState([]);
  const [selectOptionsLanguage, setselectOptionsLanguage] = useState([]);
  const [selectOptionsLanguageLevel, setselectOptionsLanguageLevel] = useState([]);
  const [selectOptionsPc_Home, setSelectOptionsPc_Home] = useState([]);
  const [selectOptionsInternet, setSelectOptionsInternet] = useState([]);
  const [selectOptionsInternet_Speed, setSelectOptionsInternet_Speed] = useState([]);
  const [selectOptionsSO, setSelectOptionsSO] = useState([]);
  const [selectOptionsRAM, setSelectOptionsRAM] = useState([]);
  const [, setHasData] = useState(false);


  const getVehicles = async () => {
    const data = await Vehicle();
    setselectOptionsVehicle(data)
  };

  const getTypeVehicles = async () => {
    const data = await Type_Vehicle();
    setselectOptionsVehicleType(data)
  };

  const getEtnia = async () => {
    const data = await Ethnic_Group();
    setselectOptionsEtnia(data)
  };

  const getLanguage = async () => {
    const data = await Language();
    setselectOptionsLanguage(data)
  };
  const getLanguageLevel = async () => {
    const data = await Language_Level();
    setselectOptionsLanguageLevel(data)
  };

  const getPc_Home = async () => {
    const data = await Pc_Home();
    setSelectOptionsPc_Home(data);
  };
  const getInternet = async () => {
    const data = await Internet();
    setSelectOptionsInternet(data);
  };
  const getInternet_Speed = async () => {
    const data = await Internet_Speed();
    setSelectOptionsInternet_Speed(data);
  };
  const getSO = async () => {
    const data = await SO();
    setSelectOptionsSO(data);
  };
  const getRAM = async () => {
    const data = await RAM();
    setSelectOptionsRAM(data);
  };



  useEffect(() => {
    getVehicles();
    getTypeVehicles();
    getEtnia();
    getLanguage();
    getLanguageLevel();
    getPc_Home();
    getInternet();
    getInternet_Speed();
    getSO();
    getRAM();
  }, []);

  useEffect(() => {
    if (formData) {
      setHasData(true);
    }
  }, [formData]);



  useEffect(() => {
    if (formData['Idioma_Secundario']) {
      setFormCount(1);
    }
  }, [formData]);
  useEffect(() => {
    if (formData['Idioma_Terciario']) {
      setFormCount(2);
    }
  }, [formData]);


  return (
    <>
      {fullName &&
        fullName.map((data) => {
          return (
            <div className='container-all' key={`${data.Documento}-${data.Fecha_Corte}`}>
              <div className='title-date-info'>Números contacto emergencia</div>

              <div className='row'>
                <div className='col'>
                  <div className='title-full-name d-flex'>Contacto de emergencia<div id='invalid-feedback'>*</div></div>
                  {data.Contacto_Emergencia ? (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      placeholder='Llenar'
                      name='Contacto_Emergencia'
                      defaultValue={formData.Contacto_Emergencia || data.Contacto_Emergencia}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Llenar'
                      name='Contacto_Emergencia'
                      value={formData.Contacto_Emergencia}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Contacto_Emergencia && (
                    <div id='invalid-feedback'>{validationErrors.Contacto_Emergencia}</div>
                  )}
                </div>

                <div className='col'>
                  <div className='title-full-name d-flex'>Teléfono de contacto emergencia<div id='invalid-feedback'>*</div></div>
                  {data.Telefono_Contacto_Emergencia ? (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Telefono contacto emergencia'
                      name='Telefono_Contacto_Emergencia'
                      defaultValue={formData.Telefono_Contacto_Emergencia || data.Telefono_Contacto_Emergencia}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Telefono contacto emergencia'
                      name='Telefono_Contacto_Emergencia'
                      value={formData.Telefono_Contacto_Emergencia}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Telefono_Contacto_Emergencia && (
                    <div id='invalid-feedback'>{validationErrors.Telefono_Contacto_Emergencia}</div>
                  )}
                </div>
                <div className='col'></div>
              </div>


              <div className='title-date-info'>¿Tienes vehículo?</div>
              <div className='row'>
                <div className='col'>
                  <div className='title-full-name'>Vehículo propio</div>
                  <select
                    className='form-select'
                    name='Vehiculo_Propio'
                    value={formData.Vehiculo_Propio}
                    onChange={handleChangeDates}
                  >

                    <option value=''>Seleccione</option>
                    {data.Vehiculo_Propio ? (
                      <>
                        <option value={data.Vehiculo_Propio}>{data.Vehiculo_Propio}</option>
                        {selectOptionsVehicle && selectOptionsVehicle.map((options) => (
                          options.vehiculo_propio !== data.Vehiculo_Propio && (
                            <option
                              key={options.id_vehiculo_propio}
                              value={options.vehiculo_propio}
                            >
                              {options.vehiculo_propio}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsVehicle && selectOptionsVehicle.map((options) => (
                        <option
                          key={options.id_vehiculo_propio}
                          value={options.vehiculo_propio}
                        >
                          {options.vehiculo_propio}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className='col'>
                  {formData.Vehiculo_Propio === 'SI' && (
                    <>
                      <div className='title-full-name'>Tipo Vehículo</div>
                      <select
                        className='form-select'
                        name='Tipo_Vehiculo'
                        value={formData.Tipo_Vehiculo}
                        onChange={handleChangeDates}
                      >
                        <option value=''>Seleccione</option>
                        {data.Tipo_Vehiculo ? (
                          <>
                            <option value={data.Tipo_Vehiculo}>{data.Tipo_Vehiculo}</option>
                            {selectOptionsVehicleType && selectOptionsVehicleType.map((options) => (
                              options.tipo_vehiculo !== data.Tipo_Vehiculo && (
                                <option
                                  key={options.id_tipo_vehiculo}
                                  value={options.tipo_vehiculo}
                                >
                                  {options.tipo_vehiculo}
                                </option>
                              )
                            ))}
                          </>
                        ) : (
                          selectOptionsVehicleType && selectOptionsVehicleType.map((options) => (
                            <>
                              <option key={options.id_tipo_vehiculo} value={options.tipo_vehiculo}>
                                {options.tipo_vehiculo}
                              </option>
                            </>
                          ))
                        )}
                      </select>
                    </>
                  )}
                </div>

                <div className='col'></div>
              </div>


              <div className='title-date-info'>¿Hijos o personas a cargo?</div>
              <div className='row'>
                <div className='col'>
                  <div className='title-full-name d-flex'>Número hijos<div id='invalid-feedback'>*</div></div>
                  {data.Numero_Hijos ? (
                    <input
                      maxLength={5}
                      type='number'
                      className='form-control styles-inputs-tel'
                      placeholder='Número de hijos'
                      name='Numero_Hijos'
                      defaultValue={data.Numero_Hijos ? data.Numero_Hijos : formData.Numero_Hijos}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={5}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Número de hijos'
                      name='Numero_Hijos'
                      value={formData.Numero_Hijos}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Numero_Hijos && (
                    <div id='invalid-feedback'>{validationErrors.Numero_Hijos}</div>
                  )}

                </div>

                <div className='col'>
                  <div className='title-full-name d-flex'>Número personas a cargo<div id='invalid-feedback'>*</div></div>
                  {data.Numero_Personas_A_Cargo ? (
                    <input
                      maxLength={5}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Número de personas a cargo'
                      name='Numero_Personas_A_Cargo'
                      defaultValue={formData.Numero_Personas_A_Cargo || data.Numero_Personas_A_Cargo}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={5}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Número de personas a cargo'
                      name='Numero_Personas_A_Cargo'
                      value={formData.Numero_Personas_A_Cargo}
                      onChange={handleChangeDates}
                    />
                  )}

                  {validationErrors.Numero_Personas_A_Cargo && (
                    <div id='invalid-feedback'>{validationErrors.Numero_Personas_A_Cargo}</div>
                  )}
                </div>
                <div className='col'></div>
              </div>

              <div className='title-full-name d-flex'>Etnia<div id='invalid-feedback'>*</div></div>
              <div className='row'>
                <div className='col'>
                  <select
                    className='form-select'
                    name='Etnia'
                    value={formData.Etnia}
                    onChange={handleChangeDates}
                  >
                    <option value=''>Seleccione</option>
                    {data.Etnia ? (
                      <>
                        <option value={data.Etnia}>{data.Etnia}</option>
                        {selectOptionsEtnia && selectOptionsEtnia.map((options) => (
                          options.etnia !== data.Etnia && (
                            <option
                              key={options.id_etnia}
                              value={options.etnia}
                            >
                              {options.etnia}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsEtnia && selectOptionsEtnia.map((options) => (
                        <option
                          key={options.id_etnia}
                          value={options.etnia}
                        >
                          {options.etnia}
                        </option>
                      ))
                    )}
                  </select>
                  {validationErrors.Etnia && (
                    <div id='invalid-feedback'>{validationErrors.Etnia}</div>
                  )}
                </div>
                <div className='col'></div>
                <div className='col'></div>
              </div>

              <div className='title-date-info'>¿Computador en casa?</div>
              <div className='row'>
                <div className='col'>
                  <select
                    className='form-select'
                    placeholder='Seleccione'
                    name='Computador_En_Casa'
                    value={formData.Computador_En_Casa}
                    onChange={handleChangeDates}
                  >
                    <option value=''>Seleccione</option>
                    {data.Computador_En_Casa ? (
                      <>
                        {selectOptionsPc_Home && selectOptionsPc_Home.map((options) => (
                          <option
                            key={options.Id_Computador}
                            value={options.Computador_Casa}>
                            {options.Computador_Casa}
                          </option>
                        ))}
                      </>
                    ) : (
                      selectOptionsPc_Home && selectOptionsPc_Home.map((options) => (
                        <option key={options.Id_Computador} value={options.Computador_Casa}>
                          {options.Computador_Casa}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className='col'></div>
                <div className='col'></div>
              </div>

              <div className='row'>
                {formData.Computador_En_Casa === 'SI' && (
                  <>
                    <div className='col'>
                      <div className='title-full-name'>Sistema operativo del computador en casa</div>
                      <select
                        className='form-select'
                        placeholder='Seleccione'
                        name='Sistema_Operativo_Computador'
                        value={formData.Sistema_Operativo_Computador}
                        onChange={handleChangeDates}
                      >
                        <option value=''>Seleccione</option>
                        {selectOptionsSO && selectOptionsSO.map((data) => (
                          <option value={data.Sistema_Operativo} key={data.Id_Sistema_Operativo}>{data.Sistema_Operativo}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col'>
                      <div className='title-full-name'>RAM de computador en casa</div>
                      <select
                        className='form-select'
                        placeholder='Seleccione'
                        name='Memoria_RAM'
                        value={formData.Memoria_RAM}
                        onChange={handleChangeDates}
                      >
                        <option value=''>Seleccione</option>
                        {selectOptionsRAM && selectOptionsRAM.map((data) => (
                          <option value={data.Memoria_RAM} key={data.Id_Memoria_RAM}>{data.Memoria_RAM}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col'></div>
                  </>
                )}
              </div>

              <div className='row'>
                <div className='col'>
                  <div className='title-full-name'>Internet en casa</div>
                  <select
                    className='form-select'
                    placeholder='Seleccione'
                    name='Internet_En_Casa'
                    value={formData.Internet_En_Casa}
                    onChange={handleChangeDates}
                  >
                    <option value=''>Seleccione</option>
                    {selectOptionsInternet && selectOptionsInternet.map((data) => (
                      <option value={data.Internet_Casa} key={data.Id_Internet}>{data.Internet_Casa}</option>
                    ))}
                  </select>
                </div>
                <div className='col'>
                  {formData.Internet_En_Casa === 'SI' && (
                    <>
                      <div className='title-full-name'>Velocidad internet</div>
                      <select
                        className='form-select'
                        placeholder='Seleccione'
                        name='Velocidad_Internet'
                        value={formData.Velocidad_Internet}
                        onChange={handleChangeDates}
                      >
                        <option value=''>Seleccione</option>
                        {selectOptionsInternet_Speed && selectOptionsInternet_Speed.map((data) => (
                          <option value={data.Velocidad_Internet} key={data.Id_Velocidad_Internet}>{data.Velocidad_Internet}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
                <div className='col'></div>
              </div>


              <div className='title-date-info'>Idiomas</div>
              <div className='row'>
                <div className='col'>
                  <div className='title-full-name'>Idioma nativo</div>
                  <select
                    className='form-select'
                    name='Idioma_Nativo'
                    value={formData.Idioma_Nativo}
                    onChange={handleChangeDates}
                  >
                    <option value=''>Seleccione</option>
                    {data.Idioma_Nativo ? (
                      <>
                        <option value={data.Idioma_Nativo}>{data.Idioma_Nativo}</option>
                        {selectOptionsLanguage && selectOptionsLanguage.map((options) => (
                          options.idioma !== data.Idioma_Nativo && (
                            <option
                              key={options.id_idioma}
                              value={options.idioma}
                            >
                              {options.idioma}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsLanguage && selectOptionsLanguage.map((options) => (
                        <option
                          key={options.id_idioma}
                          value={options.idioma}
                        >
                          {options.idioma}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className='col'></div>
                <div className='col'></div>
              </div>

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

                    <div className='p-2 flex-grow-1'>
                      <label for='inputEmail' className='form-label'>{index === 0 ? 'Idioma secundario' : 'Idioma terciario'}</label>
                      <select
                        className='form-select'
                        name={index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario'}
                        value={formData[index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario'] || ''}
                        onChange={handleChangeDates}
                      >
                        <option value=''>Seleccione</option>
                        {data[index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario'] ? (
                          <>
                            <option value={data[index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario']}>
                              {data[index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario']}
                            </option>
                            {selectOptionsLanguage &&
                              selectOptionsLanguage.map((options) => (
                                options.idioma !== data[index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario'] && (
                                  <option
                                    key={options.id_idioma}
                                    value={options.idioma}
                                  >
                                    {options.idioma}
                                  </option>
                                )
                              ))}
                          </>
                        ) : (
                          !data[index === 0 ? 'Idioma_Secundario' : 'Idioma_Terciario'] &&
                          selectOptionsLanguage && selectOptionsLanguage.map((options) => (
                            <option
                              key={options.id_idioma}
                              value={options.idioma}
                            >
                              {options.idioma}
                            </option>
                          )))}
                      </select>
                    </div>

                    <div className='p-2 flex-grow-1'>
                      <label for='inputPassword4' className='form-label'>{index === 0 ? 'Nivel idioma secundario' : 'Nivel idioma terciario'}</label>
                      <select
                        className='form-select'
                        name={index === 0 ? 'Nivel_Idioma_Secundario' : 'Nivel_Idioma_Terciario'}
                        value={formData[index === 0 ? 'Nivel_Idioma_Secundario' : 'Nivel_Idioma_Terciario'] || ''}
                        onChange={handleChangeDates}
                      >
                        <option value=''>Seleccione</option>

                        {data[index === 0 ? 'Nivel_Idioma_Secundario' : 'Nivel_Idioma_Terciario'] ? (
                          <>
                            <option value={data[index === 0 ? 'Nivel_Idioma_Secundario' : 'Nivel_Idioma_Terciario']}>
                              {data[index === 0 ? 'Nivel_Idioma_Secundario' : 'Nivel_Idioma_Terciario']}
                            </option>
                            {selectOptionsLanguageLevel &&
                              selectOptionsLanguageLevel.map((options) => (
                                options.nivel_idioma !== data[index === 0 ? 'Nivel_Idioma_Secundario' : 'Nievel_Idioma_Terciario'] && (
                                  <option
                                    key={options.id_nivel_idioma}
                                    value={options.nivel_idioma}
                                  >
                                    {options.nivel_idioma}
                                  </option>
                                )
                              ))}
                          </>
                        ) : (
                          !data[index === 0 ? 'Nivel_Idioma_Secundario' : 'Nivel_Idioma_Terciario'] && selectOptionsLanguageLevel &&
                          selectOptionsLanguageLevel.map((options) => (
                            <option
                              key={options.id_nivel_idioma}
                              value={options.nivel_idioma}
                            >
                              {options.nivel_idioma}
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
                      if (formCount < 2) {
                        setFormCount((prevCount) => prevCount + 1);
                      }
                    }}
                    disabled={formCount >= 2}
                  >
                    Añadir Idioma
                  </button>
                </div>
              </form>
            </div >

          );
        })}
    </>
  );
};

export default InterestInfo;
