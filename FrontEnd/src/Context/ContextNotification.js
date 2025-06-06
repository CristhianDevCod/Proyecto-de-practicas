import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { notification } from 'antd';
import io from 'socket.io-client';


import { UserProfileContext } from './ProfileContex';
import Service from '../Machine/Service';
import { GETSUPERVISORFORNOTIFICATION, VALIDATESHIFTCLOSE } from '../API/API';
import apiClient from '../Service/Service';

const { Servidor, Notification } = Service();

const serverURL = `http://${Notification}`; //ip local 
// const serverURL = 'http://10.96.16.37:8889'; //ip de la vm 

export const NotificationsContext = createContext();
export const NotificationsContextPrivider = ({ children }) => {
  const { userProfile, fullName } = useContext(UserProfileContext);

  const [userProfileForSocket, setUserProfileForSocket] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [dataDayRest, setdataDayRest] = useState('');
  const [dataDayRestNext, setdataDayRestNext] = useState('');


  const [Usuario_Red_Envia, setSender] = useState('');
  const [Mensaje_Envia, setTextArea] = useState('');
  const [Mensaje_Recibe, setMensaje_Recibe] = useState('');
  const [Usuario_Red_Recibe, setRecipient] = useState('');
  const [Dia_Trabajo_Actual, setDateNotification] = useState('');

  //SEUPERVISOR DEL USUARIO QUIEN RECIBE EL CAMBIO DE TURNO
  const [Supervisor, setSupervisor] = useState([]);
  const [Usuario_Red_Supervisor, setSupervisorUser] = useState('');

  const [Documento_Recibe, setDocumento_Recibe] = useState('');
  const [Nombre_Completo_Recibe, setNombre_Recibe] = useState('');
  const [Cargo_Recibe, setCargo_Recibe] = useState('');
  const [Cliente_Area_Recibe, setCliente_Area_Recibe] = useState('');
  const [Servicio_Recibe, setServicio_Recibe] = useState('');
  const [idImage_User_Recibe, setID_Image_User_Recibe] = useState('');
  const [Documento_Jefe_Inmediato_Recibe, setDocumento_Jefe_Inmediato_Recibe] = useState('');
  const [Jefe_Inmediato_Recibe, setJefe_Inmediato_Recibe] = useState('');
  const [Jefe_Aprobador_Final, setJefe_Aprobador_Final] = useState('');
  //
  const [Documento_Aprobador_Final, setDocumento_Aprobador_Final] = useState('');
  const [Nombre_Aprobador_Final, setNombre_Aprobador_Final] = useState('');


  //SEUPERVISOR DEL USUARIO QUIEN ENVIA EL CAMBIO DE TURNO
  const [SupervisorSend, setSupervisorSend] = useState([]);
  const [Usuario_Red_SupervisorSend, setSupervisorUserSend] = useState('');

  const [Documento_Envia, setDocumento_Envia] = useState('');
  const [Nombre_Completo_Envia, setNombre_Envia] = useState('');
  const [Cargo_Envia, setCargo_Envia] = useState('');
  const [Cliente_Area_Envia, setCliente_Area_Envia] = useState('');
  const [Servicio_Envia, setServicio_Envia] = useState('');
  const [idImage_User_Envia, setID_Image_User_Envia] = useState('');
  const [Documento_Jefe_Inmediato_Envia, setDocumento_Jefe_Inmediato_Envia] = useState('');
  const [Jefe_Inmediato_Envia, setJefe_Inmediato_Envia] = useState('');
  const [Jefe_Aprobador_Final2, setJefe_Aprobador_Final2] = useState('');

  const [Documento_Coordinador_Envia, setDocumento_Coordinador_Envia] = useState('');
  const [Documento_Coordinador_Recibe, setDocumento_Coordinador_Recibe] = useState('');

  const [notificationCount, setNotificationCount] = useState([]);
  const [socket, setSocket] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [errorMessagesDayRest, setErrorMessagesDayRest] = useState({});
  const [pendingMessages, setPendingMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userListDayRest, setUserListDayRest] = useState([]);

  const [isCurrentUserJefeInmediato, setIsCurrentUserJefeInmediato] = useState(false);
  const [optionSelect, setOptionSelect] = useState('Día trabajo');
  const [, setMessages] = useState('');

  //! ESTADO PARA VALIDAR SI EL DÍA A TOMAR CONTIENE AL TURNO DE CIERRE, SI ES ASÍ LE INHABILITAMOS EL BOTÓN
  const [validateShiftDisabled, setValidShiftDisabled] = useState();

  const handleSelectComponent = (e) => {
    setOptionSelect(e.target.value);
  };

  //OBTIENE EL LISTADO DE PERSONAS POSIBLES PARA PODER EJERCER UN CAMBIO DE TURNO SEGUN RL CARGO EL SERVICIO Y EL CLIENTE 

  useEffect(() => {
    if (Dia_Trabajo_Actual) {
      if (fullName && fullName.length > 0) {
        const servicios = fullName.map((data) => data.Servicio);
        const cliente = fullName.map((data) => data.Cliente_Area);
        const Cargo = fullName.map((data) => data.Cargo);

        apiClient.get(`http://${Servidor}/API/GET-LIST-USERS-SERVICE/${Cargo}/${servicios}/${cliente}/${Dia_Trabajo_Actual}`)
          .then((response) => response.data)
          .then((data) => {
            // Verificar si hay datos disponibles
            if (data.length > 0) {
              setUserList(data);
            } else {
              setUserList([]); // Establecer userList como vacío si no hay datos
            }
          })
          .catch((error) => {
            setUserList([]); // Manejar el error estableciendo userList como vacío
          });
      }
    }
  }, [Dia_Trabajo_Actual, fullName]);

  //! VALIDAMOS SI EL DÍA A TOMAR CONTIENE AL TURNO DE CIERRE, SI ES ASÍ LE INHABILITAMOS EL BOTÓN
  const ValidateShiftsClose = useCallback(async () => {
    if (Dia_Trabajo_Actual) {
      if (fullName && fullName.length > 0) {
        const Documento = fullName && fullName.map((data) => data.Documento);
        const data = await VALIDATESHIFTCLOSE(Documento, Dia_Trabajo_Actual);

        setValidShiftDisabled(data);
      }
    }
  }, [Dia_Trabajo_Actual, fullName]);

  useEffect(() => {
    if (fullName && fullName.length > 0) {
      ValidateShiftsClose();
    }
  }, [fullName, Dia_Trabajo_Actual, ValidateShiftsClose]);

  //OBTIENE EL LISTADO DE PERSONAS POSIBLES PARA PODER EJERCER UN CAMBIO DE TURNO SEGUN RL CARGO EL SERVICIO Y EL CLIENTE 
  const getListUsersDayRest = useCallback(async () => {
    try {
      if (fullName && fullName.length > 0) {
        const servicios = fullName.map((data) => data.Servicio);
        const cliente = fullName.map((data) => data.Cliente_Area);
        const Cargo = fullName.map((data) => data.Cargo);
        const response = await apiClient.get(`http://${Servidor}/API/GET-LIST-USERS-SERVICE-DAY-REST/${Cargo}/${servicios}/${cliente}`);
        setUserListDayRest(response.data);
      }
    } catch (error) {
      setMessages(error.message);
    }
  }, [fullName]);

  //OBTINE EL SUPERVISOR DEL USUARIO QUE RECIBE EL CAMBIO DE TURNO 
  const getSupervisor = useCallback(async () => {
    try {
      const response = await GETSUPERVISORFORNOTIFICATION(Documento_Jefe_Inmediato_Recibe);
      // console.log(response);

      setSupervisor(response);
    } catch (error) {
      setMessages(error.message);
    } finally {
      setMessages('');
    }
  }, [Documento_Jefe_Inmediato_Recibe]);




  //OBTINE EL SUPERVISOR DEL USUARIO QUE ENVIA EL CAMBIO DE TURNO 
  const getSupervisorSend = useCallback(async () => {
    try {
      const response = await GETSUPERVISORFORNOTIFICATION(Documento_Jefe_Inmediato_Envia);
      setSupervisorSend(response);
    } catch (error) {
      setMessages(error.message);
    } finally {
      setMessages('');
    }
  }, [Documento_Jefe_Inmediato_Envia]);

  useEffect(() => {
    getListUsersDayRest();
  }, [getListUsersDayRest]);

  useEffect(() => {
    if (Documento_Jefe_Inmediato_Recibe && Documento_Jefe_Inmediato_Recibe.length > 0) {
      getSupervisor();
    }
  }, [getSupervisor, Documento_Jefe_Inmediato_Recibe]);

  useEffect(() => {
    if (Documento_Jefe_Inmediato_Envia && Documento_Jefe_Inmediato_Envia.length > 0) {
      getSupervisorSend();
    }
  }, [getSupervisorSend, Documento_Jefe_Inmediato_Envia]);


  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  //OBTINE TODA LA INFORMACION DE EL USUARIO SELECCIONADO EN EL SELECCIONADO EN EL 
  //CAMPO DE RECEPTOR PARA SOLICITARLE EL CAMBIO DE TURNO A LA PERSONA SELCCIONADA 
  const handleRecipientChange = (event) => {
    const selectedUser = event.target.value;
    setRecipient(selectedUser);
    const selectedUserDocument = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Documento) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Documento) || '';
    const selectedUserName = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Nombres) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Nombres) || '';
    const Apellidos = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Apellidos) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Apellidos) || '';
    const selectedUserID_Imagen = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.ID_Imagen) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.ID_Imagen) || '';
    const selectedCargoRecibe = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Cargo) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Cargo) || '';
    const selectedCliente_Area_Recibe = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Cliente_Area) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Cliente_Area) || '';
    const selectedServicio = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Servicio) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Servicio) || '';
    const selectedDocumento_Jefe_Inmediato_Recibe = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Documento_Jefe_Inmediato) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Documento_Jefe_Inmediato) || '';
    const selectedJefe_Inmediato_Recibe = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Jefe_Inmediato) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Jefe_Inmediato) || '';
    const selectedJefe_Aprobador_Final = (Array.isArray(userList) && userList.find((user) => user.Usuario_Red === selectedUser)?.Jefe) || (Array.isArray(userListDayRest) && userListDayRest.find((user) => user.Usuario_Red === selectedUser)?.Jefe) || '';
    setDocumento_Recibe(selectedUserDocument);
    setNombre_Recibe(`${Apellidos} ${selectedUserName}`);
    setID_Image_User_Recibe(selectedUserID_Imagen);
    setCargo_Recibe(selectedCargoRecibe);
    setCliente_Area_Recibe(selectedCliente_Area_Recibe);
    setServicio_Recibe(selectedServicio);
    setDocumento_Jefe_Inmediato_Recibe(selectedDocumento_Jefe_Inmediato_Recibe);
    setJefe_Inmediato_Recibe(selectedJefe_Inmediato_Recibe);
    setDocumento_Aprobador_Final(selectedUserDocument);
    setNombre_Aprobador_Final(`${Apellidos} ${selectedUserName}`);
    setJefe_Aprobador_Final(selectedJefe_Aprobador_Final);
  };

  const handleDateChange = (event) => {
    setDateNotification(event.target.value);
  };

  const handleDateDayRest = (event) => {
    setdataDayRest(event.target.value);
  }

  const handleDateDayRestNext = (e) => {
    setdataDayRestNext(e.target.value);
  }

  const onChange = (e) => {
    setTextArea(e.target.value);
  };
  const handleMensajeRecibe = (e) => {
    setMensaje_Recibe(e.target.value);
  };

  useEffect(() => {
    setUserProfileForSocket(userProfile.user);
  }, [userProfile.user]);

  //LOGICA PARA OBTENER EL MENSAJE RECIBIDO
  useEffect(() => {
    if (userProfileForSocket) {
      const newSocket = io(serverURL, {
        auth: {
          user: {
            username: userProfileForSocket,
          },
        },
        transports: ['websocket'],
        withCredentials: true,
      });

      const handleNotification = (notification) => {
        setNotificationCount((prev) => [...prev, notification]);
        setPendingMessages((prevMessages) => [...prevMessages, notification]);
        api.info({
          message: `Nuevo Mensaje De: ${notification.Nombre_Completo_Envia}`,
        });
      };



      newSocket.on('pendingMessages', (messages) => {
        setPendingMessages(messages);
      });

      newSocket.on('getNotification', handleNotification);

      setSocket(newSocket);

      return () => {
        newSocket.off('getNotification', handleNotification);
        newSocket.disconnect();
      };
    }
  }, [api, userProfileForSocket]);

  useEffect(() => {
    if (userProfile.user && fullName.length > 0) {
      const currentUserJefeInmediato = fullName.some((user) => user.Usuario_Red === userProfile.user && user.Jefe_Inmediato);
      setIsCurrentUserJefeInmediato(currentUserJefeInmediato);
    }
  }, [userProfile, fullName]);


  //VALIDAMOS QUE LOS CAMPOS A MANDAR NO SEAN VACIOS, DIA TRABAJO
  const validatesChanges = () => {
    const errors = {};

    if (Dia_Trabajo_Actual === '') {
      errors.Dia_Trabajo_Actual = 'Este campo es obligatorio';
    }

    if (Usuario_Red_Recibe === '') {
      errors.Usuario_Red_Recibe = 'Este campo es obligatorio';
    }
    if (optionSelect === '') {
      errors.optionSelect = 'Este campo es obligatorio';
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  //VALIDAMOS QUE LOS CAMPOS A MANDAR NO SEAN VACIOS, DIA DESCANSO
  const validateDayRest = () => {
    const errors = {};
    if (dataDayRest === '') {
      errors.dataDayRest = 'Este campo es obligatorio';
    }

    if (dataDayRestNext === '') {
      errors.dataDayRestNext = 'Este campo es obligatorio';
    }

    if (Usuario_Red_Recibe === '') {
      errors.Usuario_Red_Recibe = 'Este campo es obligatorio';
    }
    setErrorMessagesDayRest(errors);
    return Object.keys(errors).length === 0;
  }


  //OBTIENE EL USUARIO DE RED DEL SUPERVISOR QUIEN RECIBE EL CAMBIO DE TURNOS
  useEffect(() => {
    const getSupervisorUser = (Array.isArray(Supervisor) && Supervisor.find((data) => data.Usuario_Red)?.Usuario_Red) || '';
    const documento_Jefe_Inmediatos = (Array.isArray(Supervisor) && Supervisor.find((data) => data.Usuario_Red)?.Documento_Jefe_Inmediato) || '';
    setDocumento_Coordinador_Recibe(documento_Jefe_Inmediatos)
    setSupervisorUser(getSupervisorUser);

  }, [Supervisor]);
  //OBTIENE EL USUARIO DE RED DEL SUPERVISOR QUIEN ENVIA EL CAMBIO DE TURNOS
  useEffect(() => {
    const getSupervisorUser = (Array.isArray(SupervisorSend) && SupervisorSend.find((data) => data.Usuario_Red)?.Usuario_Red) || '';
    const documento_Jefe_Inmediatos = (Array.isArray(SupervisorSend) && SupervisorSend.find((data) => data.Usuario_Red)?.Documento_Jefe_Inmediato) || '';
    setDocumento_Coordinador_Envia(documento_Jefe_Inmediatos);
    setSupervisorUserSend(getSupervisorUser);
  }, [SupervisorSend]);



  //OBTIENE TODA LA INFORMACIO0N COMPLETA EL CUAL ENVIA EL CAMBIO DE TURNO 
  useEffect(() => {
    if (userProfile.user && fullName.length > 0) {
      const userDocument = (Array.isArray(fullName) && fullName.find((data) => data.Usuario_Red === userProfile.user)?.Documento) || '';
      const selectedUserName = (Array.isArray(fullName) && fullName.find((data) => data.Usuario_Red === userProfile.user)?.Nombres) || '';
      const Apellidos = (Array.isArray(fullName) && fullName.find((data) => data.Usuario_Red === userProfile.user)?.Apellidos) || '';
      const selectedIdImageUser = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.ID_Imagen) || '';
      const selectedCargoEnvia = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.Cargo) || '';
      const selectedCliente_Area_Envia = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.Cliente_Area) || '';
      const selectedServicioEnvia = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.Servicio) || '';
      const selectedDocumento_Jefe_Inmediato_Envia = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.Documento_Jefe_Inmediato) || '';
      const selectedJefe_Inmediato_Envia = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.Jefe_Inmediato) || '';
      const selectedJefe_Aprobador_Final = (Array.isArray(fullName) && fullName.find((user) => user.Usuario_Red === userProfile.user)?.Jefe) || '';
      setDocumento_Envia(userDocument);
      setNombre_Envia(`${Apellidos} ${selectedUserName}`);
      setID_Image_User_Envia(selectedIdImageUser);
      setCargo_Envia(selectedCargoEnvia);
      setCliente_Area_Envia(selectedCliente_Area_Envia);
      setServicio_Envia(selectedServicioEnvia);
      setDocumento_Jefe_Inmediato_Envia(selectedDocumento_Jefe_Inmediato_Envia);
      setJefe_Inmediato_Envia(selectedJefe_Inmediato_Envia);
      setJefe_Aprobador_Final2(selectedJefe_Aprobador_Final);
    }
  }, [userProfile, fullName]);

  const value = new Date();
  var Hora_Envio = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
  const Fecha_Envio = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();

  const Dia_Trabajo_Futuro = Dia_Trabajo_Actual;
  const Tipo_Cambio = optionSelect;
  const Dia_Descanso_Actual = dataDayRest;
  const Dia_Descanso_Futuro = dataDayRestNext;

  //ENVIAMOS EL ACAMBIO DE TURNO DÍA TRABAJO
  const handleSubmit = () => {
    const isValid = validatesChanges();

    if (isValid) {
      api.success({
        message: '¡Cambio enviado correctamente!',
      });

      if (socket) {
        const AcceptButton = 'Aceptado'
        socket.emit('sendNotification', {
          Cargo_Envia,
          Cargo_Recibe,
          Cliente_Area_Envia,
          Cliente_Area_Recibe,
          Documento_Envia,
          Documento_Jefe_Inmediato_Envia,
          Documento_Jefe_Inmediato_Recibe,
          Dia_Trabajo_Actual,
          Dia_Trabajo_Futuro,
          Documento_Recibe,
          Fecha_Envio,
          Hora_Envio,
          Jefe_Inmediato_Envia,
          Jefe_Inmediato_Recibe,
          Mensaje_Envia,
          Mensaje_Recibe,
          Nombre_Completo_Envia,
          Nombre_Completo_Recibe,
          Servicio_Envia,
          Servicio_Recibe,
          Tipo_Cambio,
          Usuario_Red_Envia,
          Usuario_Red_Recibe,
          Usuario_Red_Supervisor,
          Usuario_Red_SupervisorSend,
          idImage_User_Envia,
          AcceptButton,
          Documento_Coordinador_Envia,
          Documento_Coordinador_Recibe,
        });
      }
    }
  };

  //ENVIAMOS EL ACAMBIO DE TURNO DÍA TRABAJO
  const handleSubmitDayRest = () => {
    const isValid = validateDayRest();

    if (isValid) {
      api.success({
        message: '¡Cambio dia descanso enviado correctamente!',
      });

      if (socket) {
        const AcceptButton = 'Aceptado'
        socket.emit('sendNotificationDayRest', {
          Cargo_Envia,
          Cargo_Recibe,
          Cliente_Area_Envia,
          Cliente_Area_Recibe,
          Documento_Envia,
          Documento_Jefe_Inmediato_Envia,
          Documento_Jefe_Inmediato_Recibe,
          Dia_Trabajo_Actual: Dia_Descanso_Futuro,
          Dia_Trabajo_Futuro: Dia_Descanso_Actual,
          Dia_Descanso_Actual,
          Dia_Descanso_Futuro,
          Documento_Recibe,
          Fecha_Envio,
          Hora_Envio,
          Jefe_Inmediato_Envia,
          Jefe_Inmediato_Recibe,
          Mensaje_Envia,
          Mensaje_Recibe,
          Nombre_Completo_Envia,
          Nombre_Completo_Recibe,
          Servicio_Envia,
          Servicio_Recibe,
          Tipo_Cambio,
          Usuario_Red_Envia,
          Usuario_Red_Recibe,
          Usuario_Red_Supervisor,
          Usuario_Red_SupervisorSend,
          idImage_User_Envia,
          AcceptButton,
          Documento_Coordinador_Envia,
          Documento_Coordinador_Recibe,

        });
      }
    }
  }

  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  //PONEMOS LOS CAMPOS VACIOS EN EL MOMENTO DE QUE 
  const resetForm = () => {
    setDateNotification('');
    setRecipient('');
    setTextArea('');
    setdataDayRest('');
    setdataDayRestNext('');

  };


  return (
    <NotificationsContext.Provider
      value={{
        api,
        socket,
        minDate,
        userList,
        userListDayRest,



        Mensaje_Recibe,
        Usuario_Red_Supervisor,
        Usuario_Red_SupervisorSend,
        errorMessages,
        errorMessagesDayRest,
        contextHolder,
        pendingMessages,
        notificationCount,

        idImage_User_Envia,
        Documento_Aprobador_Final,
        Nombre_Aprobador_Final,
        Cargo_Envia,
        Cargo_Recibe,
        Cliente_Area_Envia,
        Cliente_Area_Recibe,
        Documento_Envia,
        Documento_Jefe_Inmediato_Envia,
        Documento_Jefe_Inmediato_Recibe,
        Documento_Recibe,
        Dia_Trabajo_Actual,
        Hora_Envio,
        Mensaje_Envia,
        Nombre_Completo_Envia,
        Nombre_Completo_Recibe,
        Servicio_Envia,
        Servicio_Recibe,
        Tipo_Cambio,
        Usuario_Red_Envia,
        Usuario_Red_Recibe,
        idImage_User_Recibe,
        Jefe_Inmediato_Recibe,
        Jefe_Aprobador_Final,
        Jefe_Aprobador_Final2,
        isCurrentUserJefeInmediato,
        optionSelect,
        dataDayRest,
        dataDayRestNext,
        resetForm,
        validateShiftDisabled,

        onChange,
        setSender,
        setTextArea,
        setUserList,
        handleSubmit,
        handleSubmitDayRest,
        setRecipient,
        handleDateChange,
        setPendingMessages,
        handleSenderChange,
        handleMensajeRecibe,
        setDocumento_Recibe,
        setDateNotification,
        setNotificationCount,
        handleRecipientChange,
        handleSelectComponent,
        handleDateDayRest,
        handleDateDayRestNext
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
