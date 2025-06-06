import { React, useContext, useEffect, useState, Box, Menu, IconButton, NotificationsActiveRoundedIcon } from '../../Exports-Modules/Exports';
import { Divider } from '@mui/material';
import { Badge } from 'antd';

import { CustomNoRowsOverlay } from './Styles/StylesNotification';

import Config from '../../Auth/Config';
import Service from '../../Machine/Service';
import ListNotifications from './ListNotifications';
import DetailsNotification from './DetailsNotification';
import { UserProfileContext } from '../../Context/ProfileContex';
import { NotificationsContext } from '../../Context/ContextNotification';
import apiClient from '../../Service/Service'

const NotificationRecived = () => {
  const { unreadMessagesUnread } = Config();
  const { Servidor } = Service();
  const { api, socket, notificationCount, pendingMessages, setPendingMessages, contextHolder, handleRejectMessage, handleMensajeRecibe, Mensaje_Recibe, Documento_Aprobador_Final, Documento_Jefe_Inmediato_Recibe, Documento_Jefe_Inmediato_Envia, Nombre_Aprobador_Final, isCurrentUserJefeInmediato, Jefe_Aprobador_Final, Jefe_Aprobador_Final2 } = useContext(NotificationsContext);
  const { fullName } = useContext(UserProfileContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [pendingNotifications, setPendingNotifications] = useState([]);
  const [notificationSeen, setNotificationSeen] = useState({});
  const [rejectedNotificationIds, setRejectedNotificationIds] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  const [, setErrorMesage] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDetailsShifts = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
    setNotificationSeen(prevState => ({ ...prevState, [notification.id]: true }));
    handleMenuClose();
  };

  const ClearSelection = () => {
    setSelectedNotification('');
  };


  const handleCancelProfile = () => {
    setOpenModal(false);
    ClearSelection();
  };

  const removeNotificationFromTray = (notificationId) => {
    setNewNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId));
    handleCancelProfile();
  };

  const removeNotificationFromTrayUnreaded = (notificationId) => {
    setUnreadMessages((prevNotifications) => prevNotifications.filter((notification) => notification.Id_Cambio !== notificationId));
    handleCancelProfile();
  };
  const removePendindNotificationFromTray = (notificationId) => {
    setPendingMessages((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId));
    handleCancelProfile();
  };

  useEffect(() => {
    const filteredPendingNotifications = newNotifications.filter((notification) => !rejectedNotificationIds.includes(notification.id || notification.Id_Cambio));
    setNewNotifications(filteredPendingNotifications);
  }, [rejectedNotificationIds]);

  useEffect(() => {
    setNewNotifications(notificationCount);
  }, [notificationCount]);

  useEffect(() => {
    if (pendingMessages.length > 0) {
      setPendingNotifications((prevNotifications) => [...prevNotifications, ...pendingMessages]);
      setPendingMessages([]);
    }
  }, [pendingMessages, setPendingMessages]); // Agrega la dependencia aquí




  useEffect(() => {
    setNewNotifications((prevNotifications) => [...prevNotifications, ...pendingNotifications]);
  }, [pendingNotifications]);



  //Acepta el asesor la notificación la cual la redirige a el supervisor 
  const acceptButtonAsesor = 'Aceptado';
  const value = new Date();
  const FechaRespuesta = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
  const HoraRespuesta = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
  const acceptChangeMessage = (notification) => {
    if (socket) {
      const rejectMessage = Mensaje_Recibe;
      socket.emit('acceptChange', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Mensaje_Recibe: rejectMessage,
        AcceptButton: acceptButtonAsesor,
        Fecha_Respuesta: FechaRespuesta,
        Hora_Respuesta: HoraRespuesta
      });
      api.success({
        message: 'Has aceptado el cambio de turno',
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);
    }
  };


  //Acepta el cambio de turno de la notificacion el supervisor 1 a 1
  const acceptChangeSupervisor = (notification) => {
    if (socket) {
      const EstadoMarcacionFinal = 'Aceptado';
      socket.emit('acceptChangeSupervisors', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Documento_Aprobador_Final: Documento_Jefe_Inmediato_Recibe,
        Estado_Marcacion_Final: EstadoMarcacionFinal,
        Fecha_Marcacion_Final: FechaRespuesta,
        Hora_Marcacion_Final: HoraRespuesta
        // Nombre_Aprobador_Final: Jefe_Aprobador_Final
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);


    }
  };

  ///se autorechaza la notificacion en caso tal de que el cambio tenga algun error 
  const rejectErrorChangeSupervisor = (notification) => {
    if (socket) {
      const EstadoMarcacionFinal = 'Rechazado';
      socket.emit('acceptChangeSupervisors', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Documento_Aprobador_Final: Documento_Jefe_Inmediato_Recibe,
        Estado_Marcacion_Final: EstadoMarcacionFinal,
        Fecha_Marcacion_Final: FechaRespuesta,
        Hora_Marcacion_Final: HoraRespuesta
        // Nombre_Aprobador_Final: Jefe_Aprobador_Final
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);


    }
  };

  //Acepta el asesor la notificación la cual la redirige a el supervisor para los días cambio descanso
  const handleAcceptChangeMessage = (notification) => {
    if (socket) {
      const rejectMessage = Mensaje_Recibe;
      const RespuestaRecibe = 'Aceptado';
      socket.emit('acceptChangeDayRest', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Mensaje_Recibe: rejectMessage,
        AcceptButton: acceptButtonAsesor,
        Fecha_Respuesta: FechaRespuesta,
        Hora_Respuesta: HoraRespuesta,
        Respuesta_Recibe: RespuestaRecibe
      });
      api.success({
        message: 'Has aceptado el cambio de día de descanso',
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);
    }
  };


  //Acepta el cambio de turno de la notificacion el supervisor Día descanso
  const handleAcceptChangeMessageSupervisor = (notification) => {
    if (socket) {
      const EstadoMarcacionFinal = 'Aceptado';
      socket.emit('acceptChangeDayRestSupervisor', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Estado_Marcacion_Final: EstadoMarcacionFinal,
        Fecha_Marcacion_Final: FechaRespuesta,
        Hora_Marcacion_Final: HoraRespuesta,
        Documento_Aprobador_Final: Documento_Jefe_Inmediato_Recibe || Documento_Jefe_Inmediato_Envia,
        Nombre_Aprobador_Final: Jefe_Aprobador_Final || Jefe_Aprobador_Final2
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);
    }
  };
  //se autorechaza la notificacion en caso tal de que el cambio tenga algun error 
  const AutoRejectChangeMessageSupervisorDayRest = (notification) => {
    if (socket) {
      const EstadoMarcacionFinal = 'Rechazado';
      socket.emit('acceptChangeDayRestSupervisor', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Estado_Marcacion_Final: EstadoMarcacionFinal,
        Fecha_Marcacion_Final: FechaRespuesta,
        Hora_Marcacion_Final: HoraRespuesta,
        Documento_Aprobador_Final: Documento_Jefe_Inmediato_Recibe || Documento_Jefe_Inmediato_Envia,
        Nombre_Aprobador_Final: Jefe_Aprobador_Final || Jefe_Aprobador_Final2
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);
    }
  };



  //Rechaza la notificacion en caso de ser el asesor 
  const handleRejectNotification = (notification) => {
    if (socket) {
      const rejectMessage = Mensaje_Recibe;
      const rejectDocumentoAprobadorFinal = Documento_Aprobador_Final;
      const rejectNombreAprobadorFinal = Nombre_Aprobador_Final;
      const mensajeRechazado = 'Rechazado';

      socket.emit('rejectNotification', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Mensaje_Recibe: rejectMessage,
        Documento_Aprobador_Final: rejectDocumentoAprobadorFinal,
        Nombre_Aprobador_Final: rejectNombreAprobadorFinal,
        Estado_Marcacion_Final: mensajeRechazado,
      });
      api.success({
        message: 'Has rechazado el cambio de turno',
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);
    }
  };
  //Rechaza la notificacion en caso de ser el Supervisor día trabajo
  const handleRejectNotificationSupervisor1a1 = (notification) => {
    if (socket) {
      const rejectMessage = Mensaje_Recibe;
      const rejectDocumentoAprobadorFinal = Documento_Aprobador_Final;
      const rejectNombreAprobadorFinal = Nombre_Aprobador_Final;
      const mensajeRechazado = 'Rechazado';
      socket.emit('rejectNotificationSupervisor1a1', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Mensaje_Recibe: rejectMessage,
        Documento_Aprobador_Final: rejectDocumentoAprobadorFinal,
        Nombre_Aprobador_Final: rejectNombreAprobadorFinal,
        Estado_Marcacion_Final: mensajeRechazado,
      });
      api.success({
        message: 'Has rechazado el cambio de turno',
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);

    }
  };

  //Rechaza la notificacion en caso de ser el Supervisor dia descanso
  const handleRejectNotificationSupervisor = (notification) => {
    if (socket) {
      const rejectDocumentoAprobadorFinal = Documento_Aprobador_Final;
      const rejectNombreAprobadorFinal = Nombre_Aprobador_Final;
      const mensajeRechazado = 'Rechazado';
      socket.emit('rejectNotificationSupervisor', {
        ...notification,
        Id_Cambio: notification.Id_Cambio,
        id: notification.id,
        Documento_Aprobador_Final: rejectDocumentoAprobadorFinal,
        Nombre_Aprobador_Final: rejectNombreAprobadorFinal,
        Estado_Marcacion_Final: mensajeRechazado,
      });
      api.success({
        message: 'Has rechazado el cambio de turno',
      });
      handleCancelProfile();
      removeNotificationFromTray(notification.id);
      removeNotificationFromTray(notification.Id_Cambio);
      removePendindNotificationFromTray(notification.id);
      removePendindNotificationFromTray(notification.Id_Cambio);
      removeNotificationFromTrayUnreaded(notification.id);
      removeNotificationFromTrayUnreaded(notification.Id_Cambio);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.id]);
      setRejectedNotificationIds((prevIds) => [...prevIds, notification.Id_Cambio]);
    }
  };

  //o obtine los mensajes no obtenidos para mostrarselos a el asesor en caso tal no los haya respondido
  useEffect(() => {
    const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
    apiClient.get(unreadMessagesUnread, { params: { userId: Usuario_Red } })
      .then(response => {
        const NoLeidos = response ? response.data.filter(message => !message.Rechazado || !message.Aceptado) : [];
        setUnreadMessages(NoLeidos);
      })
      .catch(() => {
        setErrorMesage('No tienes mensajes pendientes');
      });
  }, [fullName, unreadMessagesUnread]);



  useEffect(() => {
    const getUnreadMessages = async (endpoint) => {
      try {
        if (fullName && fullName.length > 0) {
          const Documento = fullName.map((data) => data.Documento);
          const response = await apiClient.get(`http://${Servidor}${endpoint}/${Documento}`);
          const NoLeidos = response?.data.filter(message => !message.Rechazado && !message.Aceptado) || [];
          setUnreadMessages((prevMessages) => [...prevMessages, ...NoLeidos]);
        }

      } catch (error) {
        setErrorMesage('No tienes mensajes pendientes');
      }
    };

    getUnreadMessages('/API/UNREAD-MESSAGES/SUPERVISOR');
    getUnreadMessages('/API/UNREAD-MESSAGES/SUPERVISOR2');
    getUnreadMessages('/API/UNREAD-MESSAGES/SUPERVISOR/OF-COORDINADOR');
    getUnreadMessages('/API/UNREAD-MESSAGES/SUPERVISOR/OF-COORDINADOR2');
  }, [fullName, Servidor]);


  // Filtrar nuevas notificaciones y asegurarse de que no estén duplicadas en la lista combinada
  const filteredNewNotifications = newNotifications.filter(notification => {
    // Verificar si la notificación no está en la lista de IDs rechazados
    if (rejectedNotificationIds.includes(notification.id)) {
      return false; // Excluir notificaciones rechazadas
    }

    // Verificar si hay alguna notificación no leída que coincide con esta notificación
    if (unreadMessages.some(unreadMessage => unreadMessage.Id_Cambio === notification.id || unreadMessage.id === notification.id)) {
      return false; // Incluir notificaciones no rechazadas
    }

    return true; // Si no coincide con ninguna notificación no leída
  });

  // Crear un conjunto para evitar duplicados
  const combinedNotifications = [...filteredNewNotifications, ...unreadMessages].reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id || item.Id_Cambio === current.Id_Cambio);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);






  return (
    <div>
      {contextHolder}
      <IconButton onClick={handleClick} sx={{ borderRadius: '10px', backgroundColor: '#a7aeb932', height: '100%' }}>
        <Badge count={combinedNotifications.length}>
          <NotificationsActiveRoundedIcon className='icon-color-notification' alt='' />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id='notifications-menu'
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleMenuClose}
        slotProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 60,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Box
          sx={{
            width: 350,
            height: 600,
          }}
        >
          <div className=''>
          </div>

          <div className='d-flex'>
            <div className='p-2 flex-grow-1'>
              <div className='title-notifications'>Notificaciones</div>
            </div>
            <div className='p-2'>
            </div>
          </div>
          <Divider />

          <div className='text-muted p-2'>
            {combinedNotifications.length > 0 ? (

              <div className='scroll-width-notifications'>

                <ListNotifications
                  handleDetailsShifts={handleDetailsShifts}
                  combinedNotifications={combinedNotifications}
                  notificationSeen={notificationSeen}
                  removeNotificationFromTray={removeNotificationFromTray} />
              </div>
            ) : (CustomNoRowsOverlay())}
          </div>

          <DetailsNotification
            handleCancelProfile={handleCancelProfile}
            openModal={openModal}
            selectedNotification={selectedNotification}
            handleRejectMessage={handleRejectMessage}
            handleRejectNotification={handleRejectNotification}
            handleMensajeRecibe={handleMensajeRecibe}
            Mensaje_Recibe={Mensaje_Recibe}
            acceptChangeMessage={acceptChangeMessage}
            isCurrentUserJefeInmediato={isCurrentUserJefeInmediato}
            removeNotificationFromTray={removeNotificationFromTray}
            handleAcceptChangeMessage={handleAcceptChangeMessage}
            AutoRejectChangeMessageSupervisorDayRest={AutoRejectChangeMessageSupervisorDayRest}
            handleAcceptChangeMessageSupervisor={handleAcceptChangeMessageSupervisor}
            acceptChangeSupervisor={acceptChangeSupervisor}
            rejectErrorChangeSupervisor={rejectErrorChangeSupervisor}
            handleRejectNotificationSupervisor1a1={handleRejectNotificationSupervisor1a1}
            handleRejectNotificationSupervisor={handleRejectNotificationSupervisor} />

        </Box>
      </Menu>
    </div>
  );
};

export default NotificationRecived;