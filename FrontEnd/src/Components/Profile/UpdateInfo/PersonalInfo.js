import React, { useContext, useEffect, useState } from 'react';
import Service from '../../../Machine/Service';



import { UserProfileContext } from '../../../Context/ProfileContex';
import { Gender, Marital_Status, Blood_Group, Blood_Factor, Country_State, Type_Id, Country } from '../../../API/API';
import '../styles/Styles.css';
import apiClient from '../../../Service/Service';

const PersonalInfo = ({ formData, handleChangeDates, validationErrors, setFormData }) => {
  const { Servidor } = Service();
  const { fullName } = useContext(UserProfileContext);
  const [selectOptionsGender, setSelectOptionsGender] = useState([]);
  const [selectOptionsMarital, setSelectOptionsMarital] = useState([]);
  const [selectOptionsBlood, setSelectOptionsBlood] = useState([]);
  const [selectOptionsFactor, setSelectOptionsFactor] = useState([]);
  const [selectOptionsCountryState, setSelectOptionsCountryState] = useState([]);
  const [selectOptionsType_Id, setSelectOptionsType_Id] = useState([]);
  const [selectOptionsCountry, setSelectOptionsCountry] = useState([]);




  const getGender = async () => {
    const data = await Gender();
    setSelectOptionsGender(data);
  }

  const getMarital_Status = async () => {
    const data = await Marital_Status();
    setSelectOptionsMarital(data);
  }
  const getBlood_Group = async () => {
    const data = await Blood_Group();
    setSelectOptionsBlood(data);
  }
  const getBlood_Factor = async () => {
    const data = await Blood_Factor();
    setSelectOptionsFactor(data);
  }
  const getCountryState = async () => {
    const data = await Country_State();
    setSelectOptionsCountryState(data);
  }

  const getType_Id = async () => {
    const data = await Type_Id();
    setSelectOptionsType_Id(data);
  }
  const getcountry = async () => {
    const data = await Country();
    setSelectOptionsCountry(await data);
  }

  useEffect(() => {
    getcountry();
    getGender();
    getType_Id();
    getBlood_Group();
    getCountryState();
    getBlood_Factor();
    getMarital_Status();
  }, []);

  const [states, setSat] = useState([]);
  const [countryid, setCountryid] = useState('');

  const dasbledInput = true;


  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/API/get/Country_State/${countryid}`);
        setSat(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (countryid) {
      getStates();
    }
  }, [countryid, Servidor]);

  const handlecountry = (event) => {
    const countryId = Number(event.target.value);
    const selectedCountry = selectOptionsCountry.find((options) => options.id_pais === countryId);
    const countryName = selectedCountry ? selectedCountry.pais : '';
    setCountryid(countryId);
    handleChangeDates(event, countryName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      Pais_Nacimiento: countryName,
    }));
    event.preventDefault();
  }

  const getMaxDate = () => {
    const today = new Date();
    const restYears = 15;
    const restDate = 365.25 * 24 * 60 * 60 * 1000; //365.25 * 15 - dateToday
    const maxDateDay = today.getTime() - (restYears * restDate);
    const maxDate = new Date(maxDateDay);
    const maxDateString = maxDate.toISOString().split('T')[0];
    return maxDateString;
  };




  return (
    <form>
      {fullName &&
        fullName.map((data) => {
          return (
            <form className='container-all' key={`${data.Documento}_${data.Fecha_Corte}_${data.Fecha_Actualizacion}`}>

              <div className='title-date-info'>Información personal</div>
              <div className='title-full-name' id='invalid-feedback'>Los campos con '*' son obligatorios </div>

              <div className='d-flex'>
                <div className='p-2 flex-grow-1'>
                  <div className='d-flex title-full-name'>Género<div id='invalid-feedback'>*</div></div>
                  <select
                    placeholder='Seleccione'
                    className='form-select'
                    name='Genero'
                    value={formData.Genero}
                    onChange={handleChangeDates}
                  >
                    {data.Genero ? (
                      <>
                        <option value={data.Genero}>{data.Genero}</option>
                        {selectOptionsGender && selectOptionsGender.map((options) => (
                          options.genero !== data.Genero && (
                            <option
                              key={options.id_genero}
                              value={options.genero}
                            >
                              {options.genero}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsGender && selectOptionsGender.map((options) => (
                        <>
                          <option
                            key={options.id_genero}
                            value={options.genero}
                          >
                            {options.genero}
                          </option>
                        </>
                      ))
                    )}
                  </select>
                  {validationErrors.Genero && (
                    <div id='invalid-feedback'>{validationErrors.Genero}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name'>Tipo de documento</div>
                  <select
                    placeholder='Seleccione'
                    className='form-select'
                    name='Tipo_Documento'
                    value={formData.Tipo_Documento}
                    onChange={handleChangeDates}
                  >
                    {data.Tipo_Documento ? (
                      <>
                        <option value={data.Tipo_Documento}>{data.Tipo_Documento}</option>
                        {selectOptionsType_Id && selectOptionsType_Id.map((options) => (
                          options.tipo_id !== data.Tipo_Documento && (
                            <option
                              key={options.id_tipo_id}
                              value={options.tipo_id}
                            >
                              {options.tipo_id}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsType_Id && selectOptionsType_Id.map((options) => (
                        <>
                          <option
                            key={options.id_tipo_id}
                            value={options.tipo_id}
                          >
                            {options.tipo_id}
                          </option>
                        </>
                      ))
                    )}
                  </select>
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='d-flex title-full-name'>Estado civil<div id='invalid-feedback'>*</div></div>
                  <select
                    className='form-select'
                    name='Estado_Civil'
                    value={formData.Estado_Civil}
                    onChange={handleChangeDates}
                  >
                    {data.Estado_Civil ? (
                      <>
                        <option value={data.Estado_Civil}>{data.Estado_Civil}</option>
                        {selectOptionsMarital && selectOptionsMarital.map((options) => (
                          options.estado_civil !== data.Estado_Civil && (
                            <option
                              key={options.id_estado_civil}
                              value={options.estado_civil}
                            >
                              {options.estado_civil}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsMarital && selectOptionsMarital.map((options) => (
                        <>
                          <option
                            key={options.id_estado_civil}
                            value={options.estado_civil}
                          >
                            {options.estado_civil}
                          </option>
                        </>
                      ))
                    )}
                  </select>
                  {validationErrors.Estado_Civil && (
                    <div id='invalid-feedback'>{validationErrors.Estado_Civil}</div>
                  )}
                </div>
              </div>



              <div className='title-date-info'>Información de nacimiento</div>
              <div className='d-flex'>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Fecha nacimiento<div id='invalid-feedback'>*</div></div>
                  {data.Fecha_Nacimiento ? (
                    <input
                      max={getMaxDate()}
                      className='form-control'
                      type='date'
                      placeholder='Fecha nacimiento'
                      name='Fecha_Nacimiento'
                      value={formData.Fecha_Nacimiento.split('T')[0] || data.Fecha_Nacimiento.split('T')[0]}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      max={getMaxDate()}
                      type='date'
                      className='form-control'
                      placeholder='Fecha nacimiento'
                      name='Fecha_Nacimiento'
                      value={formData.Fecha_Nacimiento && formData.Fecha_Nacimiento.split('T')[0]}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Fecha_Nacimiento && (
                    <div id='invalid-feedback'>{validationErrors.Fecha_Nacimiento}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className=' d-flex title-full-name'>País nacimiento<div id='invalid-feedback'>*</div></div>
                  <select
                    placeholder='Seleccione'
                    className='form-select'
                    name='Pais_Nacimiento'
                    value={countryid}
                    onChange={handlecountry}
                  >
                    {data.Pais_Nacimiento ? (
                      <>
                        <option value={data.Pais_Nacimiento}>{data.Pais_Nacimiento}</option>
                        {selectOptionsCountry.map((options) => (
                          options.pais !== data.Pais_Nacimiento && (
                            <option
                              key={options.id_pais}
                              value={options.id_pais}
                            >
                              {options.pais}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsCountry.map((options) => (
                        <>
                          <option
                            key={options.id_pais}
                            value={options.id_pais}
                          >
                            {options.pais}
                          </option>
                        </>
                      ))
                    )}
                  </select>

                  {validationErrors.Pais_Nacimiento && (
                    <div id='invalid-feedback'>{validationErrors.Pais_Nacimiento}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Depart. nacimiento<div id='invalid-feedback'>*</div></div>
                  <select
                    placeholder='Seleccione'
                    className='form-select'
                    name='Departamento_Nacimiento'
                    value={formData.Departamento_Nacimiento}
                    onChange={handleChangeDates}
                  >
                    {data.Departamento_Nacimiento ? (
                      <>
                        <option value={data.Departamento_Nacimiento}>{data.Departamento_Nacimiento}</option>
                        {states.map((options) => (
                          options.estado !== data.Departamento_Nacimiento && (
                            <option
                              key={options.id_estado}
                              value={options.estado}
                            >
                              {options.estado}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      states.map((options) => (
                        <option
                          key={options.id_estado}
                          value={options.estado}
                        >
                          {options.estado}
                        </option>
                      ))
                    )}
                  </select>

                  {validationErrors.Departamento_Nacimiento && (
                    <div id='invalid-feedback'>{validationErrors.Departamento_Nacimiento}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='d-flex title-full-name'>Ciudad nacimiento<div id='invalid-feedback'>*</div></div>
                  {data.Ciudad_Nacimiento ? (
                    <input
                      className='form-control'
                      placeholder='Llenar'
                      name='Ciudad_Nacimiento'
                      defaultValue={formData.Ciudad_Nacimiento || data.Ciudad_Nacimiento}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      className='form-control'
                      placeholder='Llenar'
                      name='Ciudad_Nacimiento'
                      value={formData.Ciudad_Nacimiento}
                      onChange={handleChangeDates}
                    />
                  )}

                  {validationErrors.Ciudad_Nacimiento && (
                    <div id='invalid-feedback'>{validationErrors.Ciudad_Nacimiento}</div>
                  )}
                </div>
              </div>


              <div className='title-date-info'>Teléfonos de contacto</div>
              <div className='d-flex'>
                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name'>Teléfono fijo principal</div>

                  {data.Telefono_Fijo_Principal ? (
                    <input
                      maxLength={10}
                      type='number'
                      className='form-control styles-inputs-tel'
                      placeholder='Opcional'
                      name='Telefono_Fijo_Principal'
                      defaultValue={formData.Telefono_Fijo_Principal || data.Telefono_Fijo_Principal}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={10}
                      type='number'
                      className='form-control styles-inputs-tel'
                      placeholder='Opcional'
                      name='Telefono_Fijo_Principal'
                      value={formData.Telefono_Fijo_Principal}
                      onChange={handleChangeDates}
                    />
                  )}

                  <div className='title-full-name d-flex'>Correo personal<div id='invalid-feedback'>*</div></div>
                  {data.Correo_Personal ? (
                    <input
                      className='form-control'
                      placeholder='Llenar'
                      name='Correo_Personal'
                      defaultValue={formData.Correo_Personal || data.Correo_Personal}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      className='form-control'
                      placeholder='Llenar'
                      name='Correo_Personal'
                      value={formData.Correo_Personal}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Correo_Personal && (
                    <div id='invalid-feedback'>{validationErrors.Correo_Personal}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name'>Teléfono fijo secundario</div>
                  {data.Telefono_Fijo_Secundario ? (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Opcional'
                      name='Telefono_Fijo_Secundario'
                      defaultValue={formData.Telefono_Fijo_Secundario || data.Telefono_Fijo_Secundario}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={15}
                      type='number'
                      className='form-control styles-inputs-tel'
                      placeholder='Opcional'
                      name='Telefono_Fijo_Secundario'
                      value={formData.Telefono_Fijo_Secundario}
                      onChange={handleChangeDates}
                    />
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Teléfono celular principal<div id='invalid-feedback'>*</div></div>
                  {data.Telefono_Celular_Principal ? (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Llenar'
                      name='Telefono_Celular_Principal'
                      defaultValue={formData.Telefono_Celular_Principal || data.Telefono_Celular_Principal}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      placeholder='Llenar'
                      name='Telefono_Celular_Principal'
                      value={formData.Telefono_Celular_Principal}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Telefono_Celular_Principal && (
                    <div id='invalid-feedback'>{validationErrors.Telefono_Celular_Principal}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name'>Teléfono celular secundario</div>
                  {data.Telefono_Celular_Secundario ? (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Opcional'
                      name='Telefono_Celular_Secundario'
                      defaultValue={formData.Telefono_Celular_Secundario || data.Telefono_Celular_Secundario}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      maxLength={15}
                      className='form-control styles-inputs-tel'
                      type='number'
                      placeholder='Opcional'
                      name='Telefono_Celular_Secundario'
                      value={formData.Telefono_Celular_Secundario}
                      onChange={handleChangeDates}
                    />
                  )}
                </div>
              </div>

              <div className='title-residencial-info'>Información residencial</div>

              <div className='d-flex'>
                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Departamento residencia<div id='invalid-feedback'>*</div></div>

                  <select
                    disabled={dasbledInput}
                    className='form-select'
                    name='Departamento_Residencia'
                    value={formData.Departamento_Residencia}
                    onChange={handleChangeDates}
                  >
                    {data.Departamento_Residencia ? (
                      <>
                        <option value={data.Departamento_Residencia}>{data.Departamento_Residencia}</option>
                        {selectOptionsCountryState && selectOptionsCountryState.map((options) => (
                          options.estado !== data.Departamento_Residencia && (
                            <option
                              key={options.id_estado}
                              value={options.estado}
                            >
                              {options.estado}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsCountryState && selectOptionsCountryState.map((options) => (
                        <option
                          key={options.id_estado}
                          value={options.estado}
                        >
                          {options.estado}
                        </option>
                      ))
                    )}
                  </select>
                  {validationErrors.Departamento_Residencia && (
                    <div id='invalid-feedback'>{validationErrors.Departamento_Residencia}</div>
                  )}

                  <div className='title-full-name d-flex'>Dirección residencia<div id='invalid-feedback'>*</div></div>
                  {data.Direccion_Residencia ? (
                    <input
                      disabled={dasbledInput}
                      className='form-control'
                      placeholder='Llenar'
                      name='Direccion_Residencia'
                      defaultValue={formData.Direccion_Residencia || data.Direccion_Residencia}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      disabled={dasbledInput}
                      className='form-control'
                      placeholder='Llenar'
                      name='Direccion_Residencia'
                      value={formData.Direccion_Residencia}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Direccion_Residencia && (
                    <div id='invalid-feedback'>{validationErrors.Direccion_Residencia}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Ciudad residencia<div id='invalid-feedback'>*</div></div>
                  {data.Ciudad_Residencia ? (
                    <input
                      disabled={dasbledInput}
                      className='form-control'
                      placeholder='Llenar'
                      name='Ciudad_Residencia'
                      defaultValue={formData.Ciudad_Residencia || data.Ciudad_Residencia}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      disabled={dasbledInput}
                      className='form-control'
                      placeholder='Llenar'
                      name='Ciudad_Residencia'
                      value={formData.Ciudad_Residencia}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Ciudad_Residencia && (
                    <div id='invalid-feedback'>{validationErrors.Ciudad_Residencia}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Zona residencia<div id='invalid-feedback'>*</div></div>
                  {data.Zona_Residencia ? (
                    <input
                      disabled={dasbledInput}
                      maxLength={15}
                      className='form-control'
                      placeholder='Llenar'
                      name='Zona_Residencia'
                      defaultValue={formData.Zona_Residencia || data.Zona_Residencia}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      disabled={dasbledInput}
                      maxLength={15}
                      className='form-control'
                      placeholder='Llenar'
                      name='Zona_Residencia'
                      value={formData.Zona_Residencia}
                      onChange={handleChangeDates}
                    />
                  )}
                  {validationErrors.Zona_Residencia && (
                    <div id='invalid-feedback'>{validationErrors.Zona_Residencia}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Barrio residencia<div id='invalid-feedback'>*</div></div>
                  {data.Barrio_Residencia ? (
                    <input
                      disabled={dasbledInput}
                      className='form-control'
                      placeholder='Llenar'
                      name='Barrio_Residencia'
                      defaultValue={formData.Barrio_Residencia || data.Barrio_Residencia}
                      onChange={handleChangeDates}
                    />
                  ) : (
                    <input
                      disabled={dasbledInput}
                      className='form-control'
                      placeholder='Llenar'
                      name='Barrio_Residencia'
                      value={formData.Barrio_Residencia}
                      onChange={handleChangeDates}
                    />
                  )}

                  {validationErrors.Barrio_Residencia && (
                    <div id='invalid-feedback'>{validationErrors.Barrio_Residencia}</div>
                  )}
                </div>
              </div>


              <div className='title-residencial-info'>Información médica</div>

              <div className='d-flex'>
                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Grupo sanguineo<div id='invalid-feedback'>*</div></div>
                  <select
                    className='form-select'
                    name='Grupo_Sanguineo'
                    value={formData.Grupo_Sanguineo}
                    onChange={handleChangeDates}
                  >
                    {data.Grupo_Sanguineo ? (
                      <>
                        <option value={data.Grupo_Sanguineo}>{data.Grupo_Sanguineo}</option>
                        {selectOptionsBlood && selectOptionsBlood.map((options) => (
                          options.grupo_sanguineo !== data.Grupo_Sanguineo && (
                            <option
                              key={options.id_grupo}
                              value={options.grupo}
                            >
                              {options.grupo_sanguineo}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsBlood && selectOptionsBlood.map((options) => (
                        <option
                          key={options.id_grupo}
                          value={options.grupo}
                        >
                          {options.grupo_sanguineo}
                        </option>
                      ))
                    )}
                  </select>
                  {validationErrors.Grupo_Sanguineo && (
                    <div id='invalid-feedback'>{validationErrors.Grupo_Sanguineo}</div>
                  )}
                </div>

                <div className='p-2 flex-grow-1'>
                  <div className='title-full-name d-flex'>Factor sanguineo<div id='invalid-feedback'>*</div></div>

                  <select
                    className='form-select'
                    name='Factor_Sanguineo'
                    value={formData.Factor_Sanguineo}
                    onChange={handleChangeDates}
                  >
                    {data.Factor_Sanguineo ? (
                      <>
                        <option value={data.Factor_Sanguineo}>{data.Factor_Sanguineo}</option>
                        {selectOptionsFactor && selectOptionsFactor.map((options) => (
                          options.factor !== data.Factor_Sanguineo && (
                            <option
                              key={options.id_factor}
                              value={options.factor}
                            >
                              {options.factor}
                            </option>
                          )
                        ))}
                      </>
                    ) : (
                      selectOptionsFactor && selectOptionsFactor.map((options) => (
                        <option
                          key={options.id_factor}
                          value={options.factor}
                        >
                          {options.factor}
                        </option>
                      ))
                    )}
                  </select>
                  {validationErrors.Factor_Sanguineo && (
                    <div id='invalid-feedback'>{validationErrors.Factor_Sanguineo}</div>
                  )}
                </div>
              </div>
            </form>
          );
        })}
    </form>
  );
};

export default PersonalInfo;
