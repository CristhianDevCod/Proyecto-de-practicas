import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import { Card, notification } from 'antd';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import './styles/Styles.css'
import PersonalInfo from './UpdateInfo/PersonalInfo';
import InterestInfo from './UpdateInfo/InterestInfo';
import AcademicInfo from './UpdateInfo/AcademicInfo';
import CorporativaInfo from './UpdateInfo/CorporativaInfo';
import { UserProfileContext } from '../../Context/ProfileContex';
import TermsAndConditions from './TermsAndConditions/TermsAndConditions';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

const steps = [
  'Información personal',
  'Información de interés',
  'Información académica',
  'Información corporativa',
  'Términos y condiones'
];

export default function HorizontalLinearStepper({ handleUpdateCancel }) {
  const { Servidor } = Service();
  const { fullName } = useContext(UserProfileContext);
  const [api, contextHolder] = notification.useNotification();
  const getInitialFormData = () => {
    if (fullName && fullName.length > 0) {
      const initialData = fullName[0];
      return {
        Genero: initialData.Genero || '',
        Tipo_Documento: initialData.Tipo_Documento || '',
        Estado_Civil: initialData.Estado_Civil || '',
        Fecha_Nacimiento: initialData.Fecha_Nacimiento || '',
        Pais_Nacimiento: initialData.Pais_Nacimiento || '',
        Departamento_Nacimiento: initialData.Departamento_Nacimiento || '',
        Ciudad_Nacimiento: initialData.Ciudad_Nacimiento || '',
        Telefono_Fijo_Principal: initialData.Telefono_Fijo_Principal || '',
        Telefono_Fijo_Secundario: initialData.Telefono_Fijo_Secundario || '',
        Telefono_Celular_Principal: initialData.Telefono_Celular_Principal || '',
        Telefono_Celular_Secundario: initialData.Telefono_Celular_Secundario || '',
        Departamento_Residencia: initialData.Departamento_Residencia || '',
        Ciudad_Residencia: initialData.Ciudad_Residencia || '',
        Zona_Residencia: initialData.Zona_Residencia || '',
        Barrio_Residencia: initialData.Barrio_Residencia || '',
        Direccion_Residencia: initialData.Direccion_Residencia || '',
        Grupo_Sanguineo: initialData.Grupo_Sanguineo || '',
        Factor_Sanguineo: initialData.Factor_Sanguineo || '',
        Correo_Personal: initialData.Correo_Personal || '',



        //info Interes
        Contacto_Emergencia: initialData.Contacto_Emergencia || '',
        Telefono_Contacto_Emergencia: initialData.Telefono_Contacto_Emergencia || '',
        Vehiculo_Propio: initialData.Vehiculo_Propio || '',
        Tipo_Vehiculo: initialData.Tipo_Vehiculo || '',
        Computador_En_Casa: initialData.Computador_En_Casa || '',
        Internet_En_Casa: initialData.Internet_En_Casa || '',
        Velocidad_Internet: initialData.Velocidad_Internet || '',
        Sistema_Operativo_Computador: initialData.Sistema_Operativo_Computador || '',
        Memoria_RAM: initialData.Memoria_RAM || '',
        Numero_Personas_A_Cargo: initialData.Numero_Personas_A_Cargo || '',
        Numero_Hijos: initialData.Numero_Hijos || '',
        Etnia: initialData.Etnia || '',
        Idioma_Nativo: initialData.Idioma_Nativo || '', //Faltan añadir otros 
        Idioma_Secundario: initialData.Idioma_Secundario || '', //Faltan añadir otros 
        Nivel_Idioma_Secundario: initialData.Nivel_Idioma_Secundario || '', //Faltan añadir otros 




        //info Academico
        Estudio_Pregrado: initialData.Estudio_Pregrado || '',
        Tipo_Estudio_Pregrado: initialData.Tipo_Estudio_Pregrado || '',
        Semestre_Pregrado: initialData.Semestre_Pregrado || '',
        Estado_Estudio_Pregrado: initialData.Estado_Estudio_Pregrado || '',
        //info Academico Secundario 
        Estudio_Pregrado_Secundario: initialData.Estudio_Pregrado_Secundario || '',
        Tipo_Estudio_Pregrado_Secundario: initialData.Tipo_Estudio_Pregrado_Secundario || '',
        Semestre_Pregrado_Secundario: initialData.Semestre_Pregrado_Secundario || '',
        Estado_Estudio_Pregrado_Secundario: initialData.Estado_Estudio_Pregrado_Secundario || '',
        //info Academico Terciario
        Estudio_Pregrado_Terciario: initialData.Estudio_Pregrado_Terciario || '',
        Tipo_Estudio_Pregrado_Terciario: initialData.Tipo_Estudio_Pregrado_Terciario || '',
        Semestre_Pregrado_Terciario: initialData.Semestre_Pregrado_Terciario || '',
        Estado_Estudio_Pregrado_Terciario: initialData.Estado_Estudio_Pregrado_Terciario || '',


        //estudios posgrados------------------------//
        Estudio_Posgrado: initialData.Estudio_Posgrado || '',
        Tipo_Estudio_Posgrado: initialData.Tipo_Estudio_Posgrado || '',
        Semestre_Posgrado: initialData.Semestre_Posgrado || '',
        Estado_Estudio_Posgrado: initialData.Estado_Estudio_Posgrado || '',
        //estudios posgrados Secundario------------------------//
        Estudio_Posgrado_Secundario: initialData.Estudio_Posgrado_Secundario || '',
        Tipo_Estudio_Posgrado_Secundario: initialData.Tipo_Estudio_Posgrado_Secundario || '',
        Semestre_Posgrado_Secundario: initialData.Semestre_Posgrado_Secundario || '',
        Estado_Estudio_Posgrado_Secundario: initialData.Estado_Estudio_Posgrado_Secundario || '',
        //estudios posgrados Terciario------------------------//
        Estudio_Posgrado_Terciario: initialData.Estudio_Posgrado_Terciario || '',
        Tipo_Estudio_Posgrado_Terciario: initialData.Tipo_Estudio_Posgrado_Terciario || '',
        Semestre_Posgrado_Terciario: initialData.Semestre_Posgrado_Terciario || '',
        Estado_Estudio_Posgrado_Terciario: initialData.Estado_Estudio_Posgrado_Terciario || '',






        //Estudios complementario------------------------//
        Estudio_Complementario: initialData.Estudio_Complementario || '',
        Tipo_Estudio_Complementario: initialData.Tipo_Estudio_Complementario || '',
        Semestre_Complementario: initialData.Semestre_Complementario || '',
        Estado_Estudio_Complementario: initialData.Estado_Estudio_Complementario || '',
        //Estudios complementario secundario------------------------//
        Estudio_Complementario_Secundario: initialData.Estudio_Complementario_Secundario || '',
        Tipo_Estudio_Complementario_Secundario: initialData.Tipo_Estudio_Complementario_Secundario || '',
        Semestre_Complementario_Secundario: initialData.Semestre_Complementario_Secundario || '',
        Estado_Estudio_Complementario_Secundario: initialData.Estado_Estudio_Complementario_Secundario || '',
        //Estudios complementario terciario------------------------//
        Estudio_Complementario_Terciario: initialData.Estudio_Complementario_Terciario || '',
        Tipo_Estudio_Complementario_Terciario: initialData.Tipo_Estudio_Complementario_Terciario || '',
        Semestre_Complementario_Terciario: initialData.Semestre_Complementario_Terciario || '',
        Estado_Estudio_Complementario_Terciario: initialData.Estado_Estudio_Complementario_Terciario || '',



        //info Corporativo
        Correo_Corporativo: initialData.Correo_Corporativo || '',



      };
    }
    return {
      Genero: '',
      Tipo_Documento: '',
      Estado_Civil: '',
      Fecha_Nacimiento: '',
      Pais_Nacimiento: '',
      Departamento_Nacimiento: '',
      Ciudad_Nacimiento: '',
      Telefono_Fijo_Principal: '',
      Telefono_Fijo_Secundario: '',
      Telefono_Celular_Principal: '',
      Telefono_Celular_Secundario: '',
      Departamento_residencia: '',
      Ciudad_Residencia: '',
      Zona_Residencia: '',
      Barrio_Residencia: '',
      Dirección_Residencia: '',
      Grupo_Sanguineo: '',
      Factor_Sanguineo: '',
      Correo_Corporativo: '',



      //info Interes
      Contacto_Emergencia: '',
      Telefono_Contacto_Emergencia: '',
      Vehiculo_Propio: '',
      Tipo_Vehiculo: '',
      Computador_En_Casa: '',
      Internet_En_Casa: '',
      Velocidad_Internet: '',
      Sistema_Operativo_Computador: '',
      Memoria_RAM: '',
      Numero_Personas_A_Cargo: '',
      Numero_Hijos: '',
      Etnia: '',
      Idioma_Nativo: '',
      Idioma_Secundario: '',
      Nivel_Idioma_Secundario: '',



      //Estudio_Pregrado
      Estudio_Pregrado: '',
      Tipo_Estudio_Pregrado: '',
      Semestre_Pregrado: '',
      Estado_Estudio_Pregrado: '',
      //Estudio_Pregrado_Secundario
      Estudio_Pregrado_Secundario: '',
      Tipo_Estudio_Pregrado_Secundario: '',
      Semestre_Pregrado_Secundario: '',
      Estado_Estudio_Pregrado_Secundario: '',
      //Estudio_Pregrado_Terciario
      Estudio_Pregrado_Terciario: '',
      Tipo_Estudio_Pregrado_Terciario: '',
      Semestre_Pregrado_Terciario: '',
      Estado_Estudio_Pregrado_Terciario: '',



      //-----------posgrado-------------//
      Estudio_Posgrado: '',
      Tipo_Estudio_Posgrado: '',
      Semestre_Posgrado: '',
      Estado_Estudio_Posgrado: '',
      //-----------posgrado secundario-------------//
      Estudio_Posgrado_Secundario: '',
      Tipo_Estudio_Posgrado_Secundario: '',
      Semestre_Posgrado_Secundario: '',
      Estado_Estudio_Posgrado_Secundario: '',

      //-----------posgrado Terciario-------------//
      Estudio_Posgrado_Terciario: '',
      Tipo_Estudio_Posgrado_Terciario: '',
      Semestre_Posgrado_Terciario: '',
      Estado_Estudio_Posgrado_Terciario: '',


      //------------Complementario------------//
      Estudio_Complementario: '',
      Tipo_Estudio_Complementario: '',
      Semestre_Complementario: '',
      Estado_Estudio_Complementario: '',

      //------------Complementario Seundario------------//
      Estudio_Complementario_Secundario: '',
      Tipo_Estudio_Complementario_Secundario: '',
      Semestre_Complementario_Secundario: '',
      Estado_Estudio_Complementario_Secundario: '',

      //------------Complementario Terciario------------//
      Estudio_Complementario_Terciario: '',
      Tipo_Estudio_Complementario_Terciario: '',
      Semestre_Complementario_Terciario: '',
      Estado_Estudio_Complementario_Terciario: '',

      //info Corporativo
      Correo_Personal: '',

    };
  };
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isFormModified, setIsFormModified] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData());
  const [validationErrors, setValidationErrors] = useState({});


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const validateFields = () => {
    const errors = {};
    if (activeStep === 0) {
      if (formData.Telefono_Celular_Principal === '' || formData.Telefono_Celular_Principal === 'NO APLICA') {
        errors.Telefono_Celular_Principal = 'Este campo es obligatorio';
      }
      if (formData.Fecha_Nacimiento === '' || formData.Fecha_Nacimiento === 'NO APLICA') {
        errors.Fecha_Nacimiento = 'Este campo es obligatorio';
      }
      if (formData.Pais_Nacimiento === '' || formData.Pais_Nacimiento === 'NO APLICA') {
        errors.Pais_Nacimiento = 'Este campo es obligatorio';
      }
      if (formData.Departamento_Nacimiento === '' || formData.Departamento_Nacimiento === 'NO APLICA') {
        errors.Departamento_Nacimiento = 'Este campo es obligatorio';
      }
      if (formData.Ciudad_Nacimiento === '' || formData.Ciudad_Nacimiento === 'NO APLICA') {
        errors.Ciudad_Nacimiento = 'Este campo es obligatorio';
      }
      if (formData.Genero === '' || formData.Genero === 'NO APLICA') {
        errors.Genero = 'Este campo es obligatorio';
      }
      if (formData.Estado_Civil === '' || formData.Estado_Civil === 'NO APLICA') {
        errors.Estado_Civil = 'Este campo es obligatorio';
      }
      if (formData.Grupo_Sanguineo === '' || formData.Grupo_Sanguineo === 'NO APLICA') {
        errors.Grupo_Sanguineo = 'Este campo es obligatorio';
      }
      if (formData.Factor_Sanguineo === '' || formData.Factor_Sanguineo === 'NO APLICA') {
        errors.Factor_Sanguineo = 'Este campo es obligatorio';
      }
      if (formData.Correo_Personal === '' || formData.Correo_Personal === 'NO APLICA') {
        errors.Correo_Personal = 'Este campo es obligatorio';
      }
      if (formData.Departamento_Residencia === '' || formData.Departamento_Residencia === 'NO APLICA') {
        errors.Departamento_Residencia = 'Este campo es obligatorio';
      }
      if (formData.Ciudad_Residencia === '' || formData.Ciudad_Residencia === 'NO APLICA') {
        errors.Ciudad_Residencia = 'Este campo es obligatorio';
      }
      if (formData.Zona_Residencia === '' || formData.Zona_Residencia === 'NO APLICA') {
        errors.Zona_Residencia = 'Este campo es obligatorio';
      }
      if (formData.Barrio_Residencia === '' || formData.Barrio_Residencia === 'NO APLICA') {
        errors.Barrio_Residencia = 'Este campo es obligatorio';
      }
      if (formData.Direccion_Residencia === '' || formData.Direccion_Residencia === 'NO APLICA') {
        errors.Direccion_Residencia = 'Este campo es obligatorio';
      }
    }
    if (activeStep === 1) {
      if (formData.Contacto_Emergencia === '' || formData.Contacto_Emergencia === 'NO APLICA') {
        errors.Contacto_Emergencia = 'Este campo es obligatorio';
      }
      if (formData.Telefono_Contacto_Emergencia === '' || formData.Telefono_Contacto_Emergencia === 'NO APLICA') {
        errors.Telefono_Contacto_Emergencia = 'Este campo es obligatorio';
      }
      if (formData.Numero_Hijos === '' || formData.Numero_Hijos === 'NO APLICA') {
        errors.Numero_Hijos = 'Este campo es obligatorio';
      }
      if (formData.Numero_Personas_A_Cargo === '' || formData.Numero_Personas_A_Cargo === 'NO APLICA') {
        errors.Numero_Personas_A_Cargo = 'Este campo es obligatorio';
      }
      if (formData.Etnia === '' || formData.Etnia === 'NO APLICA') {
        errors.Etnia = 'Este campo es obligatorio';
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0
  };



  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3) {
      const isValid = validateFields();
      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeDates = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (prevFormData[name] !== value) {
        setIsFormModified(true);
        return {
          ...prevFormData,
          [name]: value
        };
      } else {
        setIsFormModified(false);
        return prevFormData;
      }
    });
  };



  const onSubmit = () => {
    if (isFormModified) {
      if (validateFields()) {
        apiClient.put(`http://${Servidor}/API/UPDATE/ALL/DATES/${localStorage.getItem('username')}`, formData)
          .then(({ data }) => {
            api.success({
              message: `Datos actualizados correctamente`,
            });
            setIsFormModified(false);
          })
          .catch(({ response }) => {
            api.error({
              message: `${response.data}`,
            });
          });
      }

    } else {
      apiClient.put(`http://${Servidor}/API/UPDATE/ALL/DATES-ACTUALIZACION-DATE/${localStorage.getItem('username')}`)
      api.info({
        message: `No se ha actualizado ningun campo`,
      });
    }
  };


  const renderContent = () => {
    if (activeStep === 0) {
      return (
        <PersonalInfo
          formData={formData}
          handleChangeDates={handleChangeDates}
          validationErrors={validationErrors}
          setFormData={setFormData}
        />
      );
    } else if (activeStep === 1) {
      return (
        <InterestInfo
          formData={formData}
          setFormData={setFormData}
          handleChangeDates={handleChangeDates}
          validationErrors={validationErrors}
        />
      );
    } else if (activeStep === 2) {
      return (
        <AcademicInfo
          formData={formData}
          handleChangeDates={handleChangeDates}
        />
      );
    } else if (activeStep === 3) {
      return (
        <CorporativaInfo
          formData={formData}
          handleChangeDates={handleChangeDates}
        />
      );
    } else if (activeStep === 4)
      return (
        <TermsAndConditions
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          handleUpdateCancel={handleUpdateCancel}
          setActiveStep={setActiveStep}
        />
      )

    return null; // Si activeStep está fuera del rango de pasos, no se muestra nada
  };

  return (
    <>
      {contextHolder}
      <Box id='container-update-dates'>
        <Card id='backgroud-color-desing'>
          <div id='backGround-img-desing' />
          <div id='container-animated-desing'>
            <div id='area' >
              <ul id='circles'>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
                <div id='li'></div>
              </ul>
            </div >
            {
              fullName && fullName.map((data) => {
                return (
                  <div id='container-data-info' key={data.Documento}>
                    <div id='Nombre-Completo'>
                      <div className='title-full-name'>Nombres</div>
                      <div id='Nombre-Completo'>
                        {data.Nombres}
                      </div>
                    </div>

                    <div id='Documento'>
                      <div className='title-full-name'>Documento de Identidad</div>
                      <div id='Documento'>
                        {data.Documento}
                      </div>
                    </div>

                    <div id='Cargo'>
                      <div className='title-full-name'>Cargo</div>
                      <div id='Cargo'>
                        {data.Cargo}
                      </div>
                    </div>

                    <div id='Edad'>
                      <div className='title-full-name'>Edad</div>
                      <div id='Edad'>
                        {data.Edad}
                      </div>
                    </div>
                  </div>
                )
              })
            }

            <Stepper id='stepper-desing' orientation='vertical' activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step id='style-stepp-desing' key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div >

        </Card>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Datos actualizados correctamente
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </React.Fragment>
        ) : (
          <>
            <React.Fragment >
              <Card className='container-stepper-render'>
                {renderContent()}
              </Card>
            </React.Fragment>
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color='inherit'
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Atras
        </Button>
        <Button onClick={activeStep === steps.length - 1 ? null : handleNext}>
          {activeStep === steps.length - 1 ? null : 'Siguiente'}
        </Button>
      </Box>
    </>
  );
}
