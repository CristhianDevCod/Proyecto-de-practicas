import { React, useState, useContext, useEffect, Modal, CircularProgress } from '../../../Exports-Modules/Exports';
import Button from '@mui/joy/Button';


import '../Styles/Styles.css';
import { NotificationsContext } from '../../../Context/ContextNotification';
import { UserProfileContext } from '../../../Context/ProfileContex';
import SendChange from './SendChange';
import SendChangeRest from './SendChangeRest';
const ChangeRequest = () => {
  const {
    minDate,
    userList,
    onChange,
    setSender,
    resetForm,
    dataDayRest,
    optionSelect,
    handleSubmit,
    errorMessages,
    Mensaje_Envia,
    contextHolder,
    userListDayRest,
    dataDayRestNext,
    Documento_Recibe,
    handleDateChange,
    handleDateDayRest,
    Usuario_Red_Recibe,
    handleSenderChange,
    Dia_Trabajo_Actual,
    handleSubmitDayRest,
    errorMessagesDayRest,
    handleRecipientChange,
    handleSelectComponent,
    handleDateDayRestNext,
    validateShiftDisabled,
    sendNotificationDayRest
  } = useContext(NotificationsContext);
  const { userProfile } = useContext(UserProfileContext)
  const [isModal, setIsModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [resetModal, setResetModal] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (userProfile.user) {
      setSender(userProfile.user);
    }
  }, [userProfile.user, setSender]);

  useEffect(() => {
    setIsModal(false);
    if (isRequestSent) {
      const timer = setTimeout(() => {
        setIsRequestSent(false);
        setResetModal((prevState) => prevState + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isRequestSent]);

  const startCountdown = () => {
    setIsButtonDisabled(true);

    // Configurar un intervalo para actualizar el contador cada segundo
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Detener el intervalo después de 5 segundos y habilitar el botón nuevamente
    setTimeout(() => {
      clearInterval(timer);
      setIsButtonDisabled(false);
      setCountdown(5); // Reiniciar el contador
    }, 5000);
  };

  useEffect(() => {
    if (countdown > 0 && isButtonDisabled) {
      startCountdown();
    }
  }, [countdown, isButtonDisabled]);

  // Manejar el cambio de opción para reiniciar el formulario y mostrar "loading"
  const handleOptionChange = (event) => {
    handleSelectComponent(event);
    setLoading(true); // Activa el loading cuando cambia la opción
    setTimeout(() => {
      resetForm(); // Resetea el formulario después de cambiar la opción
      setLoading(false); // Desactiva el estado de carga
    }, 1000); // Duración del "loading"
  };
  const handleRequestSubmit = () => {
    handleSubmit();
    resetForm();
    startCountdown();
  };
  const handleRequestSubmitDayRest = () => {
    handleSubmitDayRest();
    startCountdown();
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
  }



  return (
    <>
      {contextHolder}

      <Button variant="solid" size='lg' onClick={handleModal}>Solicitar cambio</Button>
      <Modal width={700} onCancel={handleClose} open={isModal} footer={null} key={resetModal}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="loading-container">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className='col'>
            <div className='text-muted'>Tipo de cambio</div>
            <select
              className='form-select'
              aria-label='Default select example'
              value={optionSelect}
              onChange={handleOptionChange}
            >
              <option value='Día trabajo'>Día trabajo</option>
              <option value='Día descanso'>Día descanso</option>
            </select>
            {errorMessages.Tipo_Cambio && (
              <div id='invalid-feedback-change'>{errorMessages.Tipo_Cambio}</div>
            )}

            {/* Renderizar el componente seleccionado */}
            {optionSelect === 'Día trabajo' && (
              <SendChange
                Button={Button}
                minDate={minDate}
                onChange={onChange}
                userList={userList}
                userProfile={userProfile}
                handleKeyDown={handleKeyDown}
                errorMessages={errorMessages}
                Mensaje_Envia={Mensaje_Envia}
                isButtonDisabled={isButtonDisabled}
                handleDateChange={handleDateChange}
                Dia_Trabajo_Actual={Dia_Trabajo_Actual}
                handleSenderChange={handleSenderChange}
                Usuario_Red_Recibe={Usuario_Red_Recibe}
                handleRequestSubmit={handleRequestSubmit}
                validateShiftDisabled={validateShiftDisabled}
                handleRecipientChange={handleRecipientChange}
              />
            )}

            {optionSelect === 'Día descanso' && (
              <SendChangeRest
                Button={Button}
                minDate={minDate}
                userList={userList}
                onChange={onChange}
                userProfile={userProfile}
                dataDayRest={dataDayRest}
                Mensaje_Envia={Mensaje_Envia}
                userListDayRest={userListDayRest}
                dataDayRestNext={dataDayRestNext}
                isButtonDisabled={isButtonDisabled}
                Documento_Recibe={Documento_Recibe}
                handleDateDayRest={handleDateDayRest}
                Usuario_Red_Recibe={Usuario_Red_Recibe}
                handleSenderChange={handleSenderChange}
                handleRequestSubmit={handleRequestSubmit}
                errorMessagesDayRest={errorMessagesDayRest}
                handleRecipientChange={handleRecipientChange}
                handleDateDayRestNext={handleDateDayRestNext}
                sendNotificationDayRest={sendNotificationDayRest}
                handleRequestSubmitDayRest={handleRequestSubmitDayRest}
              />
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ChangeRequest;
