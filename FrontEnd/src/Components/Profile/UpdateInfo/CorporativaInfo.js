import React, { useContext } from 'react';
import { UserProfileContext } from '../../../Context/ProfileContex';
import '../styles/Styles.css';

const CorporativaInfo = ({ formData, handleChangeDates }) => {
  const { fullName } = useContext(UserProfileContext);

  return (
    <>
      {fullName &&
        fullName.map((data) => {
          return (
            <div key={`${data.Documento}-${data.Fecha_Corte}`} id='content-academic-dates'>
              <div className='title-sociodemografica'>Información sociodemográfica</div>

              <div id='content-academic-dates-desing'>

                <div id='container-all-for-academic' >
                  <div id='content-client-and-program'>
                    <div id='content-client-desing'>
                      <div id='title-client'>Cliente/área</div>
                      <div id='name-client'>{data.Cliente_Area}</div>
                    </div>
                    <div id='content-area-desing'>
                      <div id='title-area'>Programa/área</div>
                      <div id='name-area'>{data.Programa_Area}</div>
                    </div>
                  </div>
                  <div id='container-service-sede'>
                    <div id='container-service'>
                      <div id='title-service'>Servicio</div>
                      <div>{data.Servicio}</div>
                    </div>
                    <div id='container-sede'>
                      <div id='title-sede'>Sede</div>
                      <div>{data.Sede}</div>
                    </div>
                  </div>

                </div>

                <div id='container-jefe-and-correo'>
                  <div id='container-jefe'>
                    <div id='title-jefeInmediato'>Jefe inmediato</div>
                    <div>{data.Jefe_Inmediato}</div>
                  </div>
                  <div id='container-correo'>
                    <div id='title-correo-corporativo'>Correo corporativo</div>

                    {data.Correo_Corporativo ? (
                      <input
                        className='form-control'
                        placeholder='Correo coorporativo'
                        name='Correo_Corporativo'
                        defaultValue={data.Correo_Corporativo}
                        onChange={handleChangeDates}
                      />
                    ) : (
                      <input
                        className='form-control'
                        placeholder='Correo coorporativo'
                        name='Correo_Corporativo'
                        value={formData.Correo_Corporativo}
                        onChange={handleChangeDates}
                      />
                    )}
                  </div>
                </div>

                <div id='container-cubrimiento_Ruta'>
                  <div id='title-cubrimiento_Ruta'>Cubrimiento ruta</div>
                  <div id=''>{data.Cubrimiento_Ruta}</div>
                </div>

                <div id='container-Sociodemográfica'>
                  <div id='continer-Fondo_Pensiones'>
                    <div className='title-Fondo_Pensiones'>Fondo de pensiones</div>
                    <div >{data.Fondo_Pensiones ? data.Fondo_Pensiones : '-'}</div>
                  </div>
                  <div id='container-Fondo_Cesantias'>
                    <div className='title-Fondo_Cesantias'>Fondo de cesantias</div>
                    <div >{data.Fondo_Cesantias ? data.Fondo_Cesantias : '-'}</div>
                  </div>
                </div>

                <div id='container-Entidad_Salud'>
                  <div id='container-entidad-salud'>
                    <div className='title-Entidad_Salud'>EPS</div>
                    <div >{data.Entidad_Salud ? data.Entidad_Salud : '-'}</div>
                  </div>

                  <div id='container-arl'>
                    <div className='title-ARL'>ARL</div>
                    <div >{data.ARL ? data.ARL : '-'}</div>
                  </div>
                </div>

                <div id='container-Caja_Compensacion_Familiar'>
                  <div id='container-caja_compensacion_familiar'>
                    <div className='title-Caja_Compensacion_Familiar'>Caja de compensacion</div>
                    <div >{data.Caja_Compensacion_Familiar ? data.Caja_Compensacion_Familiar : '-'}</div>
                  </div>

                  <div id='container-Dias_Vacaciones'>
                    <div className='title-Dias_Vacaciones'>Días de vacaciones</div>
                    <div >{data.Dias_Vacaciones ? data.Dias_Vacaciones : '-'}</div>
                  </div>
                </div>



              </div>
            </div>
          );
        })}
    </>
  );
};

export default CorporativaInfo;
