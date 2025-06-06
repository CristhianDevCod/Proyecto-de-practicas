import React, { useContext, createContext, useState, useCallback, useEffect } from 'react';
import { UserProfileContext } from './ProfileContex';
import io from 'socket.io-client';

import {
    getAllWfmNovelties,
    getAllNominaNovelties,
    getAllManagersNovelties,
    GETALLTADINESSFORMACION,
    PERMISSIONSCLIENTSNOMINA,
    PERMISSIONSCLIENTSNOVELTIES,
    GETLISTTARDINESSNOIMINA
} from '../API/API';
import Service from '../Machine/Service';

const { NotificationSurvey } = Service();

const serverURL = `http://${NotificationSurvey}`;

export const AllNotificationsContext = createContext();
export const AllNotificationsProvider = ({ children }) => {
    const { userProfile, fullName } = useContext(UserProfileContext);

    const [userProfileForSocket, setUserProfileForSocket] = useState(null);
    const [notificationCountAlmaSurvey, setNotificationCountSurvey] = useState([]);
    const [socketAlmaSurvey, setSocket] = useState(null);

    //contador de los cambios de turnos
    const [countChangeShifts, setCountChangeShifts] = useState([]);
    //contador de de las novedades 
    const [countNoveltiesManager, setCountNoveltiesManager] = useState([]);
    const [countNoveltiesWfm, setCountNoveltiesWfm] = useState([]);
    const [countNoveltiesNomina, setCountNoveltiesNomina] = useState([]);



    //contador de de las novedades 
    const [countTardinessFormacion, setTardinessFormacion] = useState([]);
    const [countTardinessWFM, setTardinessWFM] = useState([]);
    const [countTardinessGTR, setTardinessGTR] = useState([]);
    const [countTardinessNomina, setTardinessNomina] = useState([]);


    //contador de de las impuntualidades
    const [countTardiness, setCountTardiness] = useState([]);
    //estado de carga
    const [loading, setLoading] = useState(false);

    //tamaño de las noveades de los gerentes del area 
    const getDataForBoss = useCallback(async () => {
        setLoading(true);
        try {
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOVELTIES(Usuario_Red);

            const Cliente = response.map((item) => item.Cliente_Permiso);
            const wfmResponse = await getAllManagersNovelties(Cliente);
            setCountNoveltiesManager(wfmResponse);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    //tamaño de las noveades de los analistas de planeacion
    const getDataForWfm = useCallback(async () => {
        setLoading(true);
        try {
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOVELTIES(Usuario_Red);
            const Cliente = response.map((item) => item.Cliente_Permiso);
            const wfmResponse = await getAllWfmNovelties(Cliente);
            setCountNoveltiesWfm(wfmResponse);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    //tamaño de las noveades de los analistas de planeacion
    const getDataForNomina = useCallback(async () => {
        setLoading(true);
        try {
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = response.map((item) => item.Cliente_Permiso);
            const Nominaresponse = await getAllNominaNovelties(Cliente);
            setCountNoveltiesNomina(Nominaresponse);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);


    //tamaño de las impuntualidades de los formadores
    const tardinesFormacion = useCallback(async () => {
        try {
            setLoading(true);
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const responseCliente = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = responseCliente.map((item) => item.Cliente_Permiso);
            const response = await GETALLTADINESSFORMACION(Cliente); // Pasar el documento al llamar a la función
            const filteredData = response.filter(item => item.Tipo_Impuntualidad === 'FORMACION' || item.Tipo_Impuntualidad === 'FORMACION NESTING');
            setTardinessFormacion(filteredData || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    //tamaño de las impuntualidades de los los analistas
    const tardinessWfm = useCallback(async () => {
        try {
            setLoading(true);
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const responseCliente = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = responseCliente.map((item) => item.Cliente_Permiso);
            const response = await GETALLTADINESSFORMACION(Cliente); // Pasar el documento al llamar a la función
            const filteredData = response.filter(item =>
                item.Tipo_Impuntualidad === 'LICENCIA NO REMUNERADA' ||
                item.Tipo_Impuntualidad === 'LICENCIA REMUNERADA' ||
                item.Tipo_Impuntualidad === 'VACACION' ||
                item.Tipo_Impuntualidad === 'DIA DE LA FAMILIA'
            );
            setTardinessWFM(filteredData || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    //tamaño de las impuntualidades de los los GTR
    const tardinessGtr = useCallback(async () => {
        try {
            setLoading(true);
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const responseCliente = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = responseCliente.map((item) => item.Cliente_Permiso);
            const response = await GETALLTADINESSFORMACION(Cliente); // Pasar el documento al llamar a la función
            const filteredData = response.filter(item =>
                item.Tipo_Impuntualidad === 'LLAMADA LARGA' ||
                item.Tipo_Impuntualidad === 'NO HAY PUESTOS' ||
                item.Tipo_Impuntualidad === 'SALIDA TEMPRANO JUSTIFICADA');
            setTardinessGTR(filteredData || []); // Si la respuesta filtrada es null o undefined, establece un array vacío
        } catch (error) {
            // setError(error);
            setLoading(false);
        } finally {
        }
    }, [fullName]);

    //tamaño de las impuntualidades de punto helpi o nomina
    const tardinessNomina = useCallback(async () => {
        try {
            setLoading(true);
            const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red);
            const response = await PERMISSIONSCLIENTSNOMINA(Usuario_Red);
            const Cliente = response.map((item) => item.Cliente_Permiso);
            const TardinessMyGroupNomina = await GETLISTTARDINESSNOIMINA(Cliente);
            // Combina los resultados en un solo array
            const combinedData = [
                ...TardinessMyGroupNomina.aprobados,
                ...TardinessMyGroupNomina.tiposImpuntualidad
            ];
            const filterData = combinedData.filter(item =>
                item.Tipo_Impuntualidad !== 'LLAMADA LARGA' &&
                item.Tipo_Impuntualidad !== 'NO HAY PUESTOS' &&
                item.Tipo_Impuntualidad !== 'SALIDA TEMPRANO JUSTIFICADA'
            );
            setTardinessNomina(filterData || []); // Si la respuesta es null o undefined, establece un array vacío
        } catch (error) {
            // setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);




    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataForBoss();
            getDataForWfm();
            getDataForNomina();
            tardinesFormacion();
            tardinessWfm();
            tardinessGtr();
            tardinessNomina();
        }
    }, [getDataForBoss, getDataForWfm, getDataForNomina, tardinesFormacion, tardinessWfm, tardinessGtr, tardinessNomina, fullName]);


    useEffect(() => {
        setUserProfileForSocket(userProfile.user);
    }, [userProfile.user]);

    //LOGICA PARA OBTENER EL LOS MENSAJES DE ALMASURVEY
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
                setNotificationCountSurvey((prev) => [...prev, notification]);
            };

            newSocket.on('getNotificationAlmasurvey', handleNotification);

            setSocket(newSocket);

            return () => {
                newSocket.off('getNotificationAlmasurvey', handleNotification);
                newSocket.disconnect();
            };
        }
    }, [userProfileForSocket]);


    return (
        <AllNotificationsContext.Provider value={{
            //estado de carga 
            loading,

            //contador de los cambios de turnos
            countChangeShifts,
            setCountChangeShifts,

            //contador de de las novedades 
            countNoveltiesManager,
            countNoveltiesWfm,
            countNoveltiesNomina,

            //contador de de las impuntualidades
            countTardinessFormacion,
            countTardinessWFM,
            countTardinessGTR,
            countTardinessNomina,


            //contador de de las impuntualidades
            countTardiness,
            setCountTardiness,

            // NOTIFICACIONES DE ALMA SURVEY
            notificationCountAlmaSurvey,
            socketAlmaSurvey
        }}>
            {children}
        </AllNotificationsContext.Provider>
    );
};