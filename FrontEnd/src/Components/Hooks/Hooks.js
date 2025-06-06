import { useState, useEffect } from 'react';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';
//ARCHIVO PRINCIPAL PARA LOS HOOKS PERSONALIZADOS 

//ME PERIMITE OBTENER LOS TURNOS SEGUN LOS USUARIOS QUE HAN INGRESADOS 
const { Servidor } = Service();
export const Turnos = (fullName, setLoading) => {
    const [turnos, setTurnos] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true); // Indica que se está cargando los turnos
        const fetchTurnos = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    setLoading(true); // Indica que se está cargando los turnos
                    const documentos = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/shifts/advisers/${documentos.join(',')}/`);
                    setTurnos(response.data);
                    setLoading(false); // Indica que la carga ha finalizado
                }
            } catch (error) {
                setErrorMessage('Error al obtener los turnos');
                setLoading(false); // Indica que la carga ha finalizado en caso de error
            }
        };

        fetchTurnos();
    }, [fullName, setLoading]); // La dependencia de setLoading garantiza que se ejecute cuando este estado cambie

    return turnos;
};

//OBTINE EL NÚMERO DE ENCURSO POR EL SUPERVISOR PARA MOSTRARSELO A LOS ASESORES EN CASO DE SER ENCURSO
export const ChangesPending = (fullName) => {
    const [dataMyChangesPending, setDataMyChangesPending] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getLengthmessagePending = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/GET/LENGHT-NOTIFICATIONS/ENCURSO/${Documento}`);
                    setDataMyChangesPending(response.data);
                    // setTimeout(() => {
                    //     getLengthmessagePending();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener los mensajes');
            }
        }

        getLengthmessagePending();
    }, [fullName]);

    return dataMyChangesPending;
};
//OBTINE EL NÚMERO DE ACEPTADOS POR EL SUPERVISOR PARA MOSTRARSELO A LOS ASESORES EN CASO DE SER ACEPTADOS
export const ChangesLengthAccept = (fullName) => {
    const [dataMyChangesLengthAccept, setDataMyChangesLengthAccept] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getLengthmessageAccept = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/GET/LENGHT-NOTIFICATIONS/ACCEPT/${Documento}`);
                    setDataMyChangesLengthAccept(response.data);
                    // setTimeout(() => {
                    //     getLengthmessageAccept();
                    // }, 5000);
                }
            } catch (error) {

                setErrorMessage('Error al obtener los mensajes');
            }
        };

        getLengthmessageAccept();
    }, [fullName]);
    return dataMyChangesLengthAccept;
};
//OBTINE EL NÚMERO DE RECHAZADOS POR EL SUPERVISOR PARA MOSTRARSELO A LOS ASESORES EN CASO DE SER RECHAZADOS
export const UseFetchTurnos = (fullName) => {
    const [dataMyChangesLength, setDataMyChangesLength] = useState([]);
    const [, setErrorMessage] = useState('');


    useEffect(() => {
        const getLengthmessage = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/GET/LENGHT-NOTIFICATIONS/${Documento}`);
                    setDataMyChangesLength(response.data);
                    // setTimeout(() => {
                    //     getLengthmessage();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener los mensajes');
            }
        }

        getLengthmessage();
    }, [fullName]);

    return dataMyChangesLength;
};


//OBTIENE EL NUMERO DE ESTADO EN CURSO CUANDO EL 1ER USUARIO ENVIA LA NOTIFICACION A EL 2DO ASESOR 
//ENTONCES EL 2DO ASESOR YA PASA A ESTADO DE TENER ENCURSO DEL EL 1ER ASESOR 
export const GetChangesPendingCompany = (fullName) => {
    const [changesPending, setChangesPending] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getChangesPendingCompany = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/GET/LENGHT-NOTIFICATIONS/ENCURSO/COMPANY/${Documento}`);
                    setChangesPending(response.data);
                    // setTimeout(() => {
                    //     getChangesPendingCompany();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener los mensajes');
            }
        }
        getChangesPendingCompany();
    }, [fullName]);
    return changesPending;
};

//OBTIENE EL NUMERO DE ESTADO EN APROBADO CUANDO EL 1ER USUARIO ENVIA LA NOTIFICACION A EL 2DO ASESOR
//ENTONCES EL 2DO ASESOR YA PASA A ESTADO DE TENER APROBADO DEL EL 1ER ASESOR
export const GetChangesAcceptCompany = (fullName) => {
    const [changesAccept, setChangesAccept] = useState([]);
    const [, setErrorMessage] = useState('');
    useEffect(() => {
        const getChangesAcceptCompany = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/GET/LENGHT-NOTIFICATIONS/ACCEPT/COMPANY/${Documento}`);
                    setChangesAccept(response.data);
                    // setTimeout(() => {
                    //     getChangesAcceptCompany();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener los mensajes');
            }
        }
        getChangesAcceptCompany();
    }, [fullName]);
    return changesAccept;
};

//OBTIENE EL NUMERO DE ESTADO EN RECHAZADO CUANDO EL 1ER USUARIO ENVIA LA NOTIFICACION A EL 2DO ASESOR
//ENTONCES EL 2DO ASESOR YA PASA A ESTADO DE TENER RECHAZADO DEL EL 1ER ASESOR
export const GetChangesRejectCompany = (fullName) => {
    const [getChangesRejectCompany, setChangesReject] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getChangesRejectCompany = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/GET/LENGHT-NOTIFICATIONS/REJECT/COMPANY/${Documento}`);
                    setChangesReject(response.data);
                    // setTimeout(() => {
                    //     getChangesRejectCompany();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener los mensajes');
            }
        }
        getChangesRejectCompany();
    }, [fullName]);
    return getChangesRejectCompany;
};





//OBTINE EL NUMERO DE NOVEDADES DE HORAS EXTRAS ENVIADAS POR EL ASESOR
export const GetLengthPending = (fullName) => {
    const [hourExtraPending, setHourExtraPending] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getLengthPending = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/HOURS-EXTRA-PENDING/LENGTH/${Documento}`);
                    setHourExtraPending(response.data);
                    // Realizar la próxima llamada después de 5 segundos (ajusta según tus necesidades)
                    // setTimeout(() => {
                    //     getLengthPending();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener el tamaño de las solicitudes');
            };
        };
        getLengthPending();
    }, [fullName]);
    return hourExtraPending;
};
export const GetLengthAccepts = (fullName) => {
    const [hourExtraAccepts, setHourExtraPending] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getLengthAccepts = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/HOURS-EXTRA-ACCEPTS/LENGTH/${Documento}`);
                    setHourExtraPending(response.data);
                    // setTimeout(() => {
                    //     getLengthAccepts();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener el tamaño de las solicitudes');
            };
        };
        getLengthAccepts();
    }, [fullName]);
    return hourExtraAccepts;
};

export const GetLengthRejects = (fullName) => {
    const [hourExtraRejects, setHourExtraPending] = useState([]);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        const getLengthRejects = async () => {
            try {
                if (fullName && fullName.length > 0) {
                    const Documento = fullName.map((data) => data.Documento);
                    const response = await apiClient.get(`http://${Servidor}/API/HOURS-EXTRA-REJECTS/LENGTH/${Documento}`);
                    setHourExtraPending(response.data);
                    // setTimeout(() => {
                    //     getLengthRejects();
                    // }, 5000);
                }
            } catch (error) {
                setErrorMessage('Error al obtener el tamaño de las solicitudes');
            };
        };
        getLengthRejects();
    }, [fullName]);
    return hourExtraRejects;
};