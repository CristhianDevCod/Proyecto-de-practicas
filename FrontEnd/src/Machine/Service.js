const Service = () => {
    //!IPS DE LAS PETICIONES VM
    // const Servidor = process.env.REACT_APP_SERVIDOR; //ip vm 
    //!IP DE LOS SERVERS DE LAS MENSAJES Y NOTIFICACIONES VM
    // const Notification = process.env.REACT_APP_NOTIFICATION_VM;
    // const NotificationNoveltie = process.env.REACT_APP_NOTIFICATION_NOVELTIE_VM;
    // const NotificationSurvey = process.env.REACT_APP_PORT_NOTIFICATIONS_SUERVEY;
    
    //?IPS DE LAS PETICIONES LOCAL
    const Servidor = process.env.REACT_APP_SERVIDOR_LOCAL; //ip localhost
    //?IP DE LOS SERVERS DE LAS MENSAJES Y NOTIFICACIONES LOCAL
    const Notification = process.env.REACT_APP_NOTIFICATION_LOCAL;
    const NotificationNoveltie = process.env.REACT_APP_NOTIFICATION_NOVELTIE_LOCAL;
    const NotificationSurvey = process.env.REACT_APP_PORT_NOTIFICATIONS_SUERVEY_LOCAL;



    const accessToken = process.env.ACCESS_TOKEN
    return {
        Notification,
        NotificationNoveltie,
        Servidor,
        accessToken,
        NotificationSurvey
    }
}

export default Service;