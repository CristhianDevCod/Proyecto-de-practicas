// src/Auth/Config.js
import Service from '../Machine/Service';

const Config = () => {

    const { Servidor } = Service();

    // END-POINT PARA EL INICIO DE LA SESION
    const loginURL = `http://${Servidor}/login/ActiveDirectory/`;
    // END-POINT PARA ACTUALIZAR EL PERFIL DEL USUARIO
    const fetchIdAvatar = `http://${Servidor}/API/ID_Img/${localStorage.getItem('username')}`;
    // END-POINT PARA OBTENER TODAL LA INFORMACIÓN COMPLETO DE LA PERSONA QUE ESTA INGRESANDO
    const fecthFullInformation = `http://${Servidor}/Full-information/${localStorage.getItem('username')}`;
    // END-POINT PARA SUBIR LAS MALLAS DE TURNOS
    const pushMalla = `http://${Servidor}/API/UPDATE-PUSH_MALLA/v1/`;
    // END-POINT PARA SUBIR LAS MALLAS DE TURNOS DE STAFF
    const pushMallaAdmin = `http://${Servidor}/API/UPDATE-PUSH_MALLA_ADMINISTARTIVO/v2/`;
    // END-POINT PARA INSERTAR O ELIMINAR PERMISOS
    const InsertAndDeletePermissions = `http://${Servidor}/API/INSERT-PERMISSIONS/PUT/`;
    // END-POINT PARA INSERTAR O ELIMINAR PERMISOS DE LOS CLIENTES
    const InsertAndDeletePermissionsClients = `http://${Servidor}/API/INSERT-PERMISSIONS-CLIENT/PUT/`;
    // END-POINT PARA HACER EL CAMBIO DE TURNO 1 A 1 
    const changesShifts = `http://${Servidor}/API/CHANGES-SHIFTS-ONE-TO-ONE/v1.1/`;
    // END-POINT PARA HACER EL CAMBIO DE TURNO DÍA DESCANSO
    const changesShiftsDayRest = `http://${Servidor}/API/DAY-REST/v2/`;
    // END-POINT PARA TOMAR LOS PERMISOS DEPENDIENDO DEL CARGO 
    const userPermissions = `http://${Servidor}/API/GET-USER-PERMISSIONS/${localStorage.getItem(`username`)}`;
    // END-POINT PARA OBTENER EL MENSAJE NO LEIDOS Y SE LOS MUESTRA A EL ASESOR
    const unreadMessagesUnread = `http://${Servidor}/API/UNREAD-MESSAGES`;
    // END-POINT PARA OBTENER EL MENSAJE NO LEIDOS Y SE LOS MUESTRA A EL SUPERVISOR
    const unreadMessagesUnreadSupervisor = `http://${Servidor}/API/UNREAD-MESSAGES/SUPERVISOR`;
    // END-POINT PARA OBTENER EL MENSAJE NO LEIDOS Y SE LOS MUESTRA A EL SUPERVISOR
    const unreadMessagesUnreadSupervisor2 = `http://${Servidor}/API/UNREAD-MESSAGES/SUPERVISOR2`;

    //ENPOINTS DE EXPORTABLES
    // END-POINT PARA EXPORTAR EL SOCIO A LOS ADMINISTRATIVOS
    const SocioAdministrativo = `http://${Servidor}/API/EXPORTS/DATA/SOCIODEMOGRAPHY-ADMIN/`;
    // END-POINT PARA EXPORTAR EL SOCIO COMPLETO
    const SocioCompleto = `http://${Servidor}/API/EXPORTS/DATA/SOCIODEMOGRAPHY-COMPLETE/`;
    // END-POINT PARA EXPORTAR EL SOCIO OPERATIVO
    const SocioOperativo = `http://${Servidor}/API/EXPORTS/DATA/SOCIODEMOGRAPHY-OP/`;
    // END-POINT PARA EXPORTAR TODO FEELING
    const Feeling = `http://${Servidor}/API/EXPORTS/DATA/FEELING/`;
    // END-POINT HACER EL REGISTRO DE LOGS POR CADA MODULO 
    const LogsRegister = `http://${Servidor}/API/SEND/LOGS`;
    const GetLogsRegister = `http://${Servidor}/API/GET/LIST-LOGS/`;

    return {
        Feeling,
        loginURL,
        pushMalla,
        LogsRegister,
        SocioCompleto,
        changesShifts,
        fetchIdAvatar,
        pushMallaAdmin,
        SocioOperativo,
        GetLogsRegister,
        userPermissions,
        SocioAdministrativo,
        fecthFullInformation,
        changesShiftsDayRest,
        unreadMessagesUnread,
        InsertAndDeletePermissions,
        unreadMessagesUnreadSupervisor,
        unreadMessagesUnreadSupervisor2,
        InsertAndDeletePermissionsClients,

    };
};

export default Config;
