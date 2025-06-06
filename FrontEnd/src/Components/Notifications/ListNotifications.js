import React from 'react';
import './Styles/StylesNotification.css';

const ListNotifications = ({ combinedNotifications, removeNotificationFromTray, handleDetailsShifts, notificationSeen }) => {

    return (
        <>
            {combinedNotifications && combinedNotifications.map((notification) => {
                return (
                    <div key={`${notification.Id_Notificacion}-${notification.Hora_Envio}`}>
                        <div className='content-card-notifications'>
                            <div className='container-message-design'>
                                <div className='d-flex'>
                                    <div className='p-2'>
                                        <i className='bi bi-chat-left-text-fill icon-color-notification-messages' />
                                    </div>
                                    <div className='p-2 flex-grow-1'>
                                        <div className={`text - muted ${notificationSeen[notification.Id_Notificacion] ? 'notification-seen' : ''} `}>Nuevo Mensaje • </div>
                                    </div>

                                </div>

                                <div className='container-message-text'>
                                    <div className='d-flex'>
                                        <div className='p-2'>
                                            <div className='text-uppercase text-muted'>
                                                {notification.Nombre_Completo_Envia}
                                            </div>
                                            <div className=''>
                                                {notification.Mensaje_Envia}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex flex-row-reverse'>
                                    <div className='p-2'>
                                        {notification.Estado_Marcacion_Final === 'Rechazado' ? (
                                            <button className='btn btn-success btn-sm' type='button' onClick={() => removeNotificationFromTray(notification.id)}>
                                                Aceptar
                                            </button>
                                        ) : (
                                            <button className='btn btn-primary btn-sm' type='button' onClick={() => handleDetailsShifts(notification)}>
                                                Detalles
                                            </button>
                                        )}
                                    </div>
                                    <div className='p-2 flex-fill'>
                                        <div className='title-date-hours'>{notification.Fecha_Envio} - {notification.Hora_Envio}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            })}

        </>
    )
}

export default ListNotifications;