import React, { useState, useEffect, useContext } from 'react';

import { UserProfileContext } from '../../../Context/ProfileContex';
import { Complementary_Study, Postgraduate_Study, Status_Study, Semester_Study } from '../../../API/API';

import '../styles/Styles.css';
import { Undergraduate_Study } from '../../../API/API';
import StudyInfo from './interestInfoMore/StudyInfo';
import StudyPost from './interestInfoMore/StudyPost';
import StudyComplementary from './interestInfoMore/StudyComplementary';

const AcademicInfo = ({ formData, handleChangeDates }) => {

  const { fullName } = useContext(UserProfileContext);
  const [formCount, setFormCount] = useState(0);
  const [formCount1, setFormCount1] = useState(0);
  const [formCount2, setFormCount2] = useState(0);
  //estudio pregrado
  const [selectOptionsUnderStudy, setSelectOptionsUnderStudy] = useState([]);
  //estudio complementario
  const [selectOptionsCompleStyudy, setSelectOptionsCompleStyudy] = useState([]);
  //estado del estudio
  const [selectOptionsStatusStyudy, setSelectOptionsStatusStyudy] = useState([]);
  //estudio posgrado
  const [selectOptionsPostStudy, setSelectOptionsPostStudy] = useState([]);
  //semestre estudio
  const [selectOptionsSemesterStudy, setSelectOptionsSemesterStudy] = useState([]);


  const getComplementary_Study = async () => {
    const data = await Complementary_Study();
    setSelectOptionsCompleStyudy(data);
  }
  const getStatusStudy = async () => {
    const data = await Status_Study();
    setSelectOptionsStatusStyudy(data);
  }
  const getUnderStudy = async () => {
    const data = await Undergraduate_Study();
    setSelectOptionsUnderStudy(data);
  }

  const getPostStudy = async () => {
    const data = await Postgraduate_Study();
    setSelectOptionsPostStudy(data);
  }
  const getSemesterStudy = async () => {
    const data = await Semester_Study();
    setSelectOptionsSemesterStudy(data);
  }

  useEffect(() => {
    getComplementary_Study();
    getStatusStudy();
    getUnderStudy();
    getPostStudy();
    getSemesterStudy();
  }, []);


  //efectos de estudio pregrado
  useEffect(() => {
    if (formData['Estudio_Pregrado'] || formData['Tipo_Estudio_Pregrado'] || formData['Semestre_Pregrado'] || formData['Estado_Estudio_Pregrado']) {
      setFormCount(1);
    }
  }, [formData]);
  //efectos de estudio pregrado secundarios
  useEffect(() => {
    if (formData['Estudio_Pregrado_Secundario'] || formData['Tipo_Estudio_Pregrado_Secundario'] || formData['Semestre_Pregrado_Secundario'] || formData['Estado_Estudio_Pregrado_Secundario']) {
      setFormCount(2)
    }
  }, [formData]);

  //efectos de estudio pregrado Terciario
  useEffect(() => {
    if (formData['Estudio_Pregrado_Terciario'] || formData['Tipo_Estudio_Pregrado_Terciario'] || formData['Semestre_Pregrado_Terciario'] || formData['Estado_Estudio_Pregrado_Terciario']) {
      setFormCount(3)
    }
  }, [formData]);





  //efectos de estudio posgrado
  useEffect(() => {
    if (formData['Estudio_Posgrado'] || formData['Tipo_Estudio_Posgrado'] || formData['Semestre_Posgrado'] || formData['Estado_Estudio_Posgrado']) {
      setFormCount1(1);
    }
  }, [formData]);
  //efectos de estudio posgrado secundarios
  useEffect(() => {
    if (formData['Estudio_Posgrado_Secundario'] || formData['Tipo_Estudio_Posgrado_Secundario'] || formData['Semestre_Posgrado_Secundario'] || formData['Estado_Estudio_Posgrado_Secundario']) {
      setFormCount1(2)
    }
  }, [formData]);

  //efectos de estudio posgrado Terciario
  useEffect(() => {
    if (formData['Estudio_Posgrado_Terciario'] || formData['Tipo_Estudio_Posgrado_Terciario'] || formData['Semestre_Posgrado_Terciario'] || formData['Estado_Estudio_Posgrado_Terciario']) {
      setFormCount1(3)
    }
  }, [formData]);



  //efectos de estudio complementario
  useEffect(() => {
    if (formData['Estudio_Complementario'] || formData['Tipo_Estudio_Complementario'] || formData['Semestre_Complementario'] || formData['Estado_Estudio_Complementario']) {
      setFormCount2(1);
    }
  }, [formData]);
  //efectos de estudio complementario secundarios
  useEffect(() => {
    if (formData['Estudio_Complementario_Secundario'] || formData['Tipo_Estudio_Complementario_Secundario'] || formData['Semestre_Complementario_Secundario'] || formData['Estado_Estudio_Complementario_Secundario']) {
      setFormCount2(2)
    }
  }, [formData]);

  //efectos de estudio complementario Terciario
  useEffect(() => {
    if (formData['Estudio_Complementario_Terciario'] || formData['Tipo_Estudio_Complementario_Terciario'] || formData['Semestre_Complementario_Terciario'] || formData['Estado_Estudio_Complementario_Terciario']) {
      setFormCount2(3)
    }
  }, [formData]);







  return (
    <>
      {fullName && fullName.map((data) => {
        return (
          <div key={`${data.Documento}-${data.Fecha_Corte}`}>
            <div>Estudios</div>
            <div className='container-AcademicInfo'>
              <div className='container-title-input'>


                <StudyInfo
                  data={data}
                  formData={formData}
                  formCount={formCount}
                  setFormCount={setFormCount}
                  handleChangeDates={handleChangeDates}
                  selectOptionsUnderStudy={selectOptionsUnderStudy}
                  selectOptionsStatusStyudy={selectOptionsStatusStyudy}
                  selectOptionsSemesterStudy={selectOptionsSemesterStudy}
                />

              </div>
            </div>

            <div>Estudios posgrado</div>
            <div className='container-AcademicInfo'>
              <div className='container-title-input'>

                <StudyPost
                  data={data}
                  formData={formData}
                  formCount1={formCount1}
                  setFormCount1={setFormCount1}
                  handleChangeDates={handleChangeDates}
                  selectOptionsPostStudy={selectOptionsPostStudy}
                  selectOptionsStatusStyudy={selectOptionsStatusStyudy}
                  selectOptionsSemesterStudy={selectOptionsSemesterStudy}

                />

              </div>
            </div>


            <div>Estudios complementarios</div>
            <div className='container-AcademicInfo'>
              <div className='container-title-input'>


                <StudyComplementary
                  data={data}
                  formData={formData}
                  formCount2={formCount2}
                  setFormCount2={setFormCount2}
                  handleChangeDates={handleChangeDates}
                  selectOptionsCompleStyudy={selectOptionsCompleStyudy}
                  selectOptionsStatusStyudy={selectOptionsStatusStyudy}
                  selectOptionsSemesterStudy={selectOptionsSemesterStudy}

                />
              </div>
            </div>


          </div>
        )
      })}
    </>
  );
};

export default AcademicInfo;
