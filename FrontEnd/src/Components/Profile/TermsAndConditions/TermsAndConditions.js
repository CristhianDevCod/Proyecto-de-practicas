import React, { useState } from 'react';

import { Button } from 'antd';
import '../styles/Styles.css';

const TermsAndConditions = ({ onSubmit, handleUpdateCancel, formData, setFormData, setActiveStep }) => {
    const [isCheck, setIsCheck] = useState(false);

    const handleCheck = () => {
        setIsCheck(!isCheck);
        setFormData(formData);
    };

    return (
        <>
            <div className='card border-light' id='Custom-modal-term'>
                <div id='title-terms-conditions'>
                    Términos y condiciones
                </div>

                <div className='card-body' id='container-term-and-conditions'>
                    El Empleado bajo la gravedad de juramento declara que la información que ha suministrado al Empleador, se encuentra actualizada y es verídica. De la misma manera, autoriza de manera previa y explícita a ALMACONTACT S.A.S para que recolecte y trate sus datos personales para los fines relativos a la ejecución del contrato laboral suscrito.
                </div>
                <div id='conatiner-checkbox-wrapper-19'>
                    <div className='card-text checkbox-wrapper-19'>
                        <input className='input-check-box' id='cbtest-19' type='checkbox' checked={isCheck} onChange={handleCheck} />
                        <label className='check-box' for='cbtest-19' />
                        <div id='accept-term-and-conditions'>
                            Acepto términos y condiciones
                        </div  >
                    </div>
                </div>

            </div >

            <Button id='style-button-save' onClick={() => { onSubmit(formData); handleUpdateCancel(); setActiveStep(0); }} disabled={!isCheck}>
                Actualizar Datos
            </Button >

        </>
    )
}

export default TermsAndConditions