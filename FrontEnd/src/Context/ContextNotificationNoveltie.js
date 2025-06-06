import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { notification } from 'antd';
import io from 'socket.io-client';


import Service from '../Machine/Service';
import { UserProfileContext } from './ProfileContex';
import { getAllDataHistoryHourExtra, getListAdviserForSupervisor, getShiftsNow, getSupervisorForHourExtra } from '../API/API';

const { NotificationNoveltie } = Service();

const serverURL = `http://${NotificationNoveltie}`; //ip local 
// const serverURL = 'http://10.96.16.37:8899'; //ip de la vm 

export const NotificationsContextNoveltie = createContext();
export const NotificationsContextProviderNovelties = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    //USAMOS NUESTRO CONTEXTO DE PERFI PARA OBTENER EL USUARIO
    const { userProfile, fullName } = useContext(UserProfileContext);


    //ESTADOS PARA QUE EL ASESOR PUEDA PEDIR LAS DISTINTAS SOLICITUDES
    const [formDataNovelties, setFromDataNovelties] = useState({ Fecha_Inicio_Novedad: '', Fecha_Fin_Novedad: '', Tipo_Solicitud: '', Motivo: '', Dias_Laborales: '', Time_Money: '', How_Long: '', Number_Iccp: '', Number_Diag: '', Name_Diag: '' });

    //ESTADOS PARA QUE EL SUPERVISOR PUEDA PEDIR LAS DISTINTAS SOLICITUDES POR EL ASESOR EN CASO TAL LE HAYA PASADO ALGUNA NOVEADAD
    const [formDataNoveltiesSupervisor, setFromDataNoveltiesSupervisor] = useState({ Fecha_Inicio_Novedad: '', Fecha_Fin_Novedad: '', Tipo_Solicitud: '', Motivo: '', Dias_Laborales: '', Asesor: '', Time_Money: '', How_Long: '', Number_Iccp: '', Number_Diag: '', Name_Diag: '' });

    //ESTADOS PARA QUE EL ASESOR PUEDA PEDIR LAS HORAS EXTRAS
    const [formHourExtra, setFormHourExtra] = useState({ Hora_Extra_Ini: '', Hora_Extra_Fin: '' });
    const [warningMessage, setWarningMessage] = useState('');
    const [isHourExtraAllowed, setIsHourExtraAllowed] = useState(false);
    const [TurnoIni, setTurnoIni] = useState('');
    const [TurnoFin, setTurnoFin] = useState('');
    const [isHourInputChanged, setIsHourInputChanged] = useState(false);






    //CAPTURAMOS EL USUARIO EN ESTE ESTADO
    const [userProfileForSocket, setUserProfileForSocket] = useState(null);
    //CAPTURAMOS EL SOCKET EN ESTE ESTADO
    const [socket, setSocket] = useState(null);


    //CAPTURAMOS LOS MENSAJES ES ESTOS ESTADOS 
    const [notificationCountNoveltie, setNotificationCountNoveltie] = useState([]);
    const [pendingMessagesNoveltie, setPendingMessagesNoveltie] = useState([]);

    //INFORMATION PERSONAL
    const [Documento, setDocumento] = useState('');
    const [Usuario_Red, setUsuario_Red] = useState('');
    const [Nombre_Completo, setNombre_Completo] = useState('');
    const [Cliente_Area, setCliente] = useState('');
    const [Cargo, setCargo] = useState('');
    const [Servicio, setServicio] = useState('');
    const [myJefeInmediato, setMyJefeInmediato] = useState('');

    //INFORMACION DEL JEFE INMEDIATO
    const [jefeInmediato, setJefeInmediato] = useState([]);
    const [jefeInmediatoUsuario, setJefeInmediatoUsuario] = useState('');
    const [jefeInmediatoName, setJefeInmediatoName] = useState('');

    //ESTADO PARA OBTENER LOS TURNOS ACTUALES 
    const [data, setData] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);

    //ESTADO PARA ASIGNAR HORAS EXTRAS POR ASESOR 
    const [documentDataBuscado, setDocumentDataBuscado] = useState('');
    const [documentShiftNow, setDocumentShiftNow] = useState([]);
    const [loading, setLoading] = useState(false);



    //ESTADO PARA VALIDAR LOS ERRORES 
    const [validErrors, setValidationErrors] = useState('');
    const [message, setMessages] = useState('');
    const [listAdvisers, setListAdvisers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [Codigo, setCodigo] = useState('');


    //OBTENEMOS A EL USUARIO EN REPETIDAS OCACIONES
    useEffect(() => {
        setUserProfileForSocket(userProfile.user);
    }, [userProfile.user]);




    //MANEJADOR DE ENTRADA PARA CAPTURAR LOS DATOS DE LOS INPUTS PARA LA SOLICITUD DE LA NOVEDAD 
    const handleformDataNovelties = ({ target }) => {
        const { name, value } = target;
        setFromDataNovelties({
            ...formDataNovelties,
            [name]: value
        })
    };
    //MANEJADOR DE ENTRADA PARA CAPTURAR LOS DATOS DE LOS INPUTS PARA LA SOLICITUD DE LA NOVEDAD HECHA POR EL SUPERVISOR
    const handleformDataNoveltiesSupervisor = ({ target }) => {
        const { name, value } = target;
        setFromDataNoveltiesSupervisor({
            ...formDataNoveltiesSupervisor,
            [name]: value
        });
    };

    //MANEJADOR PARA CAPTURAR LOS DATOS DE LAS HORAS EXTRAR
    const handleFormDataHoursExtra = (event) => {
        const { name, value } = event.target;
        setFormHourExtra(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Marcar que la hora ha cambiado
        setIsHourInputChanged(true);

        // Si el nombre del campo es 'Hora_Extra_Ini', restablecer el valor del select
        if (name === 'Hora_Extra_Ini') {
            setFormHourExtra((prevForm) => ({
                ...prevForm,
                Hora_Extra_Fin: ''  // Restablecer el valor del select
            }));
        }

    };




    //SUMAMOS O RESTAMOS LOS DÍAS PARA OBTENER DÍAS CALENDARIO
    const daysBetween = () => {
        const start = new Date(formDataNovelties.Fecha_Inicio_Novedad);
        const end = new Date(formDataNovelties.Fecha_Fin_Novedad);

        const timeBetween = end.getTime() - start.getTime() || start.getTime() - end.getTime();
        const daysBetween = timeBetween / (1000 * 3600 * 24);

        return daysBetween + 1;
    }

    const daysBetweenSupervisor = () => {
        const start = new Date(formDataNoveltiesSupervisor.Fecha_Inicio_Novedad);
        const end = new Date(formDataNoveltiesSupervisor.Fecha_Fin_Novedad);

        const timeBetween = end.getTime() - start.getTime() || start.getTime() - end.getTime();
        const daysBetween = timeBetween / (1000 * 3600 * 24);

        return daysBetween + 1;
    }

    //OBTIENE TODA LA INFORMACIO0N COMPLETA DEL USUARIO QUE ENVIO LA SOLICITUD DE LA NOVEDAD
    useEffect(() => {
        if (userProfile.user && fullName.length > 0) {
            const Documento = fullName.find((data) => data.Usuario_Red === userProfile.user)?.Documento || '';
            const usuario_Red = fullName.find((data) => data.Usuario_Red === userProfile.user)?.Usuario_Red || '';
            const name = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Nombres || '';
            const lastName = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Apellidos || '';
            const cliente = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Cliente_Area || '';
            const cargo = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Cargo || '';
            const servicio = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Servicio || '';
            const documento_Jefe_Inmediato = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Documento_Jefe_Inmediato || '';
            const name_Jefe_Inmediato = fullName.find((user) => user.Usuario_Red === userProfile.user)?.Jefe_Inmediato || '';
            setDocumento(Documento);
            setUsuario_Red(usuario_Red);
            setNombre_Completo(`${name} ${lastName}`);
            setCliente(cliente);
            setCargo(cargo);
            setServicio(servicio);
            setMyJefeInmediato(documento_Jefe_Inmediato);
            setJefeInmediatoName(name_Jefe_Inmediato);
        }
    }, [userProfile, fullName]);




    //OBTINE EL SUPERVISOR DEL USUARIO QUE ENVIA 
    const getJefeInmediato = useCallback(async () => {
        try {
            const response = await getSupervisorForHourExtra(myJefeInmediato);
            setJefeInmediato(response);
        } catch (error) {

        } finally {

        }
    }, [myJefeInmediato]);
    useEffect(() => {
        if (myJefeInmediato && myJefeInmediato.length > 0) {
            getJefeInmediato();
        }
    }, [getJefeInmediato, myJefeInmediato]);

    //OBTIENE EL USUARIO DE RED DEL SUPERVISOR QUIEN ENVIA
    useEffect(() => {
        if (Array.isArray(jefeInmediato) && jefeInmediato.length > 0) {
            const getSupervisorUser = jefeInmediato.find((data) => data.Usuario_Red)?.Usuario_Red || '';
            setJefeInmediatoUsuario(getSupervisorUser);
        }
    }, [jefeInmediato]);



    useEffect(() => {
        const getListUserForSupervisor = async () => {
            try {
                const Documento = fullName && fullName.map((item) => item.Documento);
                const response = await getListAdviserForSupervisor(Documento);
                if (Array.isArray(response)) {
                    setListAdvisers(response);
                } else {
                    setListAdvisers([]);
                    setErrorMessage('Error: la respuesta de la API no es válida.');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Error al obtener los datos');
            }
        }
        if (fullName && fullName.length > 0) {
            getListUserForSupervisor();
        }
    }, [api, fullName]);


    // ===============================================================================
    // ==🚧 PARA LAS HORAS EXTRAS 🚧           ==
    // ===============================================================================



    //FUNCION PARA OBTNER LA FECHA ACTUAL 
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const now = `${year}-${month}-${day}`;

    //VERIFICAMOS QUE LAS HORAS EXTRAR A PEDIR SEAN PERMITIDAS EN EL RANGO DLE TURNO ACTUAL


    const handleCheckAvailability = () => {
        const selectedHourAsDate = new Date(`${now} ${formHourExtra.Hora_Extra_Ini}:00`);
        const Turno_Ini = new Date(`${now} ${data.Turnos[0].Turno_Ini}`);
        const Turno_Fin = new Date(`${now} ${data.Turnos[0].Turno_Fin}`);

        setIsHourExtraAllowed(selectedHourAsDate >= Turno_Fin || selectedHourAsDate < Turno_Ini);

        // Verificar si la hora seleccionada está fuera del rango del turno
        if (selectedHourAsDate > Turno_Ini && selectedHourAsDate < Turno_Fin) {
            setWarningMessage('Está intentando pedir horas extras dentro del mismo horario del turno.');
        } else {
            setWarningMessage('');
        }
    };


    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const Documento = fullName.map((data) => data.Documento);
            const response = await getShiftsNow(Documento, now);
            setData(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setMessages(error);
        } finally {
            setLoading(false);
            setMessages('');
        }
    }, [fullName, now]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getData();
        }
    }, [getData, fullName]);


    // DATOS PARA BUSCAR EL ASESOR POR DOCUMENTO
    const getDataBuscarAsesor = useCallback(async () => {
        try {
            const response = await getShiftsNow(documentDataBuscado, now);
            setDocumentShiftNow(response);
        } catch (error) {
            setMessages(error);
        } finally {
            setMessages('');
        }
    }, [documentDataBuscado, now]);

    useEffect(() => {
        if (documentShiftNow && fullName && fullName.length > 0) {
            getDataBuscarAsesor();
        }
    }, [getDataBuscarAsesor, fullName, documentShiftNow]);




    const getDataHistory = useCallback(async () => {
        try {
            const Documento = fullName.map((data) => data.Documento);
            const response = await getAllDataHistoryHourExtra(Documento)
            setDataHistory(response);
        } catch (error) {
            console.log(error);
        } finally {
            // console.log('err');
        }

    }, [fullName]);

    useEffect(() => {
        if (documentShiftNow && fullName && fullName.length > 0) {
            getDataHistory();
        }
    }, [getDataHistory, fullName, documentShiftNow]);


    // ===============================================================================
    // ==🚧 PARA LAS HORAS EXTRAS 🚧           ==
    // ===============================================================================






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
                setNotificationCountNoveltie((prev) => [...prev, notification]);
                setPendingMessagesNoveltie((prevMessages) => [...prevMessages, notification]);
                // api.info({
                //     message: `Nuevo Mensaje De: `,
                // });
            };



            newSocket.on('pendingMessages', (messages) => {
                setPendingMessagesNoveltie(messages);
            });

            newSocket.on('getNotificationMessage', handleNotification);

            setSocket(newSocket);

            return () => {
                newSocket.off('getNotificationMessage', handleNotification);
                newSocket.disconnect();
            };
        }
    }, [api, userProfileForSocket]);

    //FECHAS Y HORAS EN TIEMPOR REAL
    const value = new Date();
    var Hora = value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
    const Fecha = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();

    const daysBetweens = daysBetween();
    const daysBetweensSupervisor = daysBetweenSupervisor();


    //VERIFICAMOS LOS CAMPOS VACIOS
    const validateFields = () => {
        const errors = {};
        if (formDataNovelties.Fecha_Inicio_Novedad === '') {
            errors.Fecha_Inicio_Novedad = 'Debes proporcionar una fecha inicial';
        }
        if (formDataNovelties.Fecha_Fin_Novedad === '') {
            errors.Fecha_Fin_Novedad = 'Debes proporcionar una fecha final';
        }
        if (formDataNovelties.Dias_Laborales === '') {
            errors.Dias_Laborales = '¿Cuantos días laborales son?';
        }
        if (formDataNovelties.Tipo_Solicitud === '') {
            errors.Tipo_Solicitud = 'Debes proporcionar el tipo de solicitud';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0
    };


    // Función para generar un número aleatorio entre 100000 y 999999
    const generateCode = () => {
        const code = Math.floor(Math.random() * 9000000) + 1000000;
        setCodigo(`#${code}`);
        return `#${code}`;
    };

    //ENVIAMOS EL ACAMBIO DE TURNO DÍA TRABAJO
    const handleSubmitNoveltie = () => {
        if (socket) {
            if (validateFields()) {

                socket.emit('sendNotificationNovelties', {
                    Codigo: generateCode(),
                    Fecha_Solicitud: Fecha,
                    Hora_Solicitud: Hora,
                    Documento,
                    Usuario_Red,
                    Nombre_Completo,
                    Cliente_Area,
                    Cargo,
                    Servicio,
                    Tipo_Solicitud: formDataNovelties.Tipo_Solicitud,
                    Fecha_Inicio_Novedad: formDataNovelties.Fecha_Inicio_Novedad,
                    Fecha_Fin_Novedad: formDataNovelties.Fecha_Fin_Novedad,

                    Dias_Calendario: daysBetweens,
                    Dias_Laborales: formDataNovelties.Dias_Laborales,

                    Motivo: formDataNovelties.Motivo,

                    Time_Money: formDataNovelties.Time_Money,
                    How_Long: formDataNovelties.How_Long,
                    Numero_Incapacidad: formDataNovelties.Number_Iccp,
                    Numero_Diagnostico: formDataNovelties.Number_Diag,
                    Nombre_Diagnostico: formDataNovelties.Name_Diag,



                    Documento_Jefe_Inmediato: myJefeInmediato,
                    Usuario_Red_Jefe_Inmediato: jefeInmediatoUsuario,
                    Jefe_Inmediato: jefeInmediatoName
                });
                api.success({
                    message: '¡Se ha enviado la solicitud correctamente!',
                });
            }
        }
    };

    const generateCodeSupervisor = () => {
        const code = Math.floor(Math.random() * 9000000) + 1000000;
        return `#${code}`;
    };

    //ENVIAMOS LA SOLICITUD DEL SUPERVISOR POR CAUSA DEL ASESOR
    const submitNoveltieSupervisor = () => {
        if (socket) {
            const Documento_Asesor = listAdvisers && listAdvisers.filter((item) => `${item.Nombres} ${item.Apellidos}` === formDataNoveltiesSupervisor.Asesor)[0].Documento;
            const Usuario_Red_Asesor = listAdvisers && listAdvisers.filter((item) => `${item.Nombres} ${item.Apellidos}` === formDataNoveltiesSupervisor.Asesor)[0].Usuario_Red;
            const Cliente_Asesor = listAdvisers && listAdvisers.filter((item) => `${item.Nombres} ${item.Apellidos}` === formDataNoveltiesSupervisor.Asesor)[0].Cliente_Area;
            const Cargo_Asesor = listAdvisers && listAdvisers.filter((item) => `${item.Nombres} ${item.Apellidos}` === formDataNoveltiesSupervisor.Asesor)[0].Cargo;
            const Servicio_Asesor = listAdvisers && listAdvisers.filter((item) => `${item.Nombres} ${item.Apellidos}` === formDataNoveltiesSupervisor.Asesor)[0].Servicio;

            const Jefe_Inmediato = fullName && fullName.map((item) => `${item.Nombres} ${item.Apellidos}`);
            const Documento_Jefe_Inmediato = fullName && fullName.map((item) => item.Documento);

            socket.emit('sendNotificationNoveltieSupervisor', {
                Codigo: generateCodeSupervisor(),
                Fecha_Solicitud: Fecha,
                Hora_Solicitud: Hora,
                //datos del asesor
                Documento: Documento_Asesor,
                Usuario_Red: Usuario_Red_Asesor,
                Nombre_Completo: formDataNoveltiesSupervisor.Asesor,
                Cliente_Area: Cliente_Asesor,
                Cargo: Cargo_Asesor,
                Servicio: Servicio_Asesor,
                //datos del asesor

                //datos de la solicitud
                Tipo_Solicitud: formDataNoveltiesSupervisor.Tipo_Solicitud,
                Dias_Calendario: daysBetweensSupervisor,
                Dias_Laborales: formDataNoveltiesSupervisor.Dias_Laborales,
                Fecha_Inicio_Novedad: formDataNoveltiesSupervisor.Fecha_Inicio_Novedad,
                Fecha_Fin_Novedad: formDataNoveltiesSupervisor.Fecha_Fin_Novedad,
                Motivo: formDataNoveltiesSupervisor.Motivo,

                Time_Money: formDataNoveltiesSupervisor.Time_Money,
                How_Long: formDataNoveltiesSupervisor.How_Long,
                Numero_Incapacidad: formDataNoveltiesSupervisor.Number_Iccp,
                Numero_Diagnostico: formDataNoveltiesSupervisor.Number_Diag,
                Nombre_Diagnostico: formDataNoveltiesSupervisor.Name_Diag,

                //datos del jefe inmediato
                Jefe_Inmediato,
                Documento_Jefe_Inmediato,
                Fecha_Respuesta_Jefe_Inmediato: Fecha,
                Hora_Respuesta_Jefe_Inmediato: Hora,
                Aprobador_Jefe_Inmediato: Jefe_Inmediato,
                Documento_Aprobador_Jefe_Inmediato: Documento_Jefe_Inmediato,
                Estado_Marcado_Jefe_Inmediato: 'Aceptado',
                Observacion_Jefe_Inmediato: formDataNoveltiesSupervisor.Motivo
            });
            api.success({
                message: '¡Se ha enviado la solicitud correctamente!',
            });
        }
    }


    const submitHoursExtra = () => {
        if (socket) {
            socket.emit('sendNotificationHourExtra', {
                Fecha_Solicitud: Fecha,
                Hora_Solicitud: Hora,
                Nombre_Completo: Nombre_Completo,
                Documento: Documento,
                Usuario_Red: Usuario_Red,
                Cargo: Cargo,
                Cliente_Area: Cliente_Area,
                Servicio: Servicio,
                Documento_Jefe_Inmediato: myJefeInmediato,
                Jefe_Inmediato: jefeInmediatoName,
                Fecha_Turno: Fecha,
                Hora_Ini: TurnoIni,
                Hora_Fin: TurnoFin,
                Hora_Extra_Ini: formHourExtra.Hora_Extra_Ini,
                Hora_Extra_Fin: formHourExtra.Hora_Extra_Fin,

            });
            api.success({
                message: '¡Se ha enviado la solicitud correctamente!',
            });
        }
        formHourExtra.Hora_Extra_Ini = '';
        formHourExtra.Hora_Extra_Fin = '';
    }


    return (
        <>
            {contextHolder}
            <NotificationsContextNoveltie.Provider
                value={{
                    //NOTIFICACIONES 
                    api,

                    //TIENE EL SOCKET 
                    socket,

                    contextHolder,
                    //captura los datos de entrada 
                    formDataNovelties,
                    //captura los datos de entrada supervisores
                    formDataNoveltiesSupervisor,
                    //captura los datos de entrada supervisores
                    formHourExtra,
                    setFormHourExtra,
                    //me muestra los mensajes pendientes
                    pendingMessagesNoveltie,
                    //obtiene las notificaciones
                    notificationCountNoveltie,
                    //maneja los datos de entra en inputs 
                    handleformDataNovelties,
                    //maneja los datos de entra en inputs supervisores
                    handleformDataNoveltiesSupervisor,

                    //maneja los datos de entra en inputs para las horas extras
                    documentShiftNow,
                    documentDataBuscado,
                    handleFormDataHoursExtra,
                    loading,
                    getDataBuscarAsesor,

                    //ENVENTO QUE MANDA LA SOLICITUD
                    handleSubmitNoveltie,
                    //ENVENTO QUE MANDA LA SOLICITUD SUPERVISOR
                    submitNoveltieSupervisor,
                    //OBTIENE LOS DÍAS CALANDARIOS
                    daysBetween,

                    //VALIDADOR DE ERRORES 
                    validErrors,

                    //TIENE TODOS LOS INPUTS DE ENTRADA 
                    setFromDataNovelties,

                    //ENVENTO QUE MANDA LA SOLICITUD DE LAS HORAS ESTRAS HECHA POR EL ASESOR
                    submitHoursExtra,
                    getDataHistory,

                    //esta parte es para las horas extras
                    now,
                    data,
                    setDocumentDataBuscado,
                    dataHistory,
                    message,
                    handleCheckAvailability,
                    warningMessage,
                    isHourExtraAllowed,

                    TurnoIni,
                    setTurnoIni,
                    TurnoFin,
                    setTurnoFin,
                    
                    isHourInputChanged,
                    getData,
                    listAdvisers,
                    errorMessage,
                    daysBetweenSupervisor,
                    Codigo
                }}>
                {children}
            </NotificationsContextNoveltie.Provider>
        </>
    )
};
