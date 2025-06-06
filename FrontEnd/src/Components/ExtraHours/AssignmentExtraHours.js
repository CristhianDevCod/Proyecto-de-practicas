import {
    Modal,
    React,
    useState,
    useEffect,
    useContext,
    useCallback,
    CheckRoundedIcon,
    CircularProgress,
    SearchRoundedIcon,
    PublishRoundedIcon
} from '../../Exports-Modules/Exports';

import Button from '@mui/joy/Button';

import './Styles/Styles.css';
import Service from '../../Machine/Service';
import { getShiftsNow } from '../../API/API';
import apiClient from '../../Service/Service';
import TablesAssigment from './TablesAssigment';
import { NotificationsContextNoveltie } from '../../Context/ContextNotificationNoveltie';

const AssignmentExtraHours = () => {
    const { Servidor } = Service();
    const {
        api,
        loading,
        TurnoIni,
        TurnoFin,
        setTurnoFin,
        setTurnoIni,
        contextHolder,
        setFormHourExtra,
        formHourExtra,
        warningMessage,
        isHourInputChanged,
        documentDataBuscado,
        setDocumentDataBuscado,
        handleFormDataHoursExtra

    } = useContext(NotificationsContextNoveltie);



    // Estado para la fecha de asignación
    const [asigmentDate, setAsigmentDate] = useState('');
    const [documentShiftNow, setDocumentShiftNow] = useState([]);

    const [message, setMessages] = useState('');
    const [messageValidation, setMessagesValidation] = useState('');
    const [isHourExtraAllowed, setIsHourExtraAllowed] = useState(false);



    // Función para formatear las horas 
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        return `${hour}:${minute}`;
    };
    

    // DATOS PARA BUSCAR EL ASESOR POR DOCUMENTO
    const getDataBuscarAsesor = useCallback(async () => {
        try {
            if (asigmentDate && documentDataBuscado) {
                const response = await getShiftsNow(documentDataBuscado, asigmentDate);
                setDocumentShiftNow(response);
            } else {
                return [];
            }
        } catch (error) {
            setMessages(error);
        } finally {
            setMessages('');
        }
    }, [documentDataBuscado, asigmentDate]);

    useEffect(() => {
        if (asigmentDate && documentDataBuscado) {
            getDataBuscarAsesor();
        }

    }, [getDataBuscarAsesor, asigmentDate, documentDataBuscado]);

    // Función para asignar la fecha a 
    const handleSetDateToNow = (e) => {
        setAsigmentDate(e.target.value);
    };

    
    const clearAllInputs = () => {
        setFormHourExtra({ Hora_Extra_Ini: '', Hora_Extra_Fin: '' });
        setAsigmentDate('');
        setDocumentDataBuscado('');
        setDocumentShiftNow([]);
        setIsHourExtraAllowed(false);
        setMessagesValidation('');
    };




    const handleAsigmentHourExtra = async () => {
        try {
            const response = await apiClient.put(`http://${Servidor}/API/UPDATE/HOUR/EXTRA/FOR/ADVISERS/${asigmentDate}/${documentDataBuscado}/${formHourExtra.Hora_Extra_Ini}/${formHourExtra.Hora_Extra_Fin}`);
            if (response.data.message) {
                api.success({
                    message: response.data.message,
                });
                // Limpiar la página después de asignar
                clearAllInputs();
            } else {
                api.error({
                    message: 'Ocurrió un problema al asignar las horas extras',
                });
            }
        } catch (error) {
            api.error({
                message: error.response?.data?.message,
            });
        }
    };

    const handleCheckAvailability = () => {
        const selectedHourAsDate = new Date(`${asigmentDate} ${formHourExtra.Hora_Extra_Ini}:00`);
        const Turno_Ini = new Date(`${asigmentDate} ${documentShiftNow.Turnos[0].Turno_Ini}`);
        const Turno_Fin = new Date(`${asigmentDate} ${documentShiftNow.Turnos[0].Turno_Fin}`);

        setIsHourExtraAllowed(selectedHourAsDate >= Turno_Fin || selectedHourAsDate < Turno_Ini);

        // Verificar si la hora seleccionada está dentro del rango del turno
        if (selectedHourAsDate > Turno_Ini && selectedHourAsDate < Turno_Fin) {
            setMessagesValidation('Está intentando pedir horas extras dentro del mismo horario del turno.');

            // Limpiar los campos de hora inicial y horas extras
            setFormHourExtra({ Hora_Extra_Ini: '', Hora_Extra_Fin: '' });

            // Opcionalmente, limpiar otros datos si lo necesitas
            setAsigmentDate('');
            setDocumentDataBuscado('');
            setDocumentShiftNow('');
            return;
        }

        // if (documentShiftNow.Turnos[0].Turno_Ini === "00:00:00" && documentShiftNow.Turnos[0].Turno_Fin === "00:00:00") {
        //     setMessagesValidation("No se le puede asignar horas extras, ya que no tiene turno");
        //     ClearInputs(); // Limpia los campos de horas extras
        //     setAsigmentDate(''); // Limpia la fecha de asignación
        //     setDocumentDataBuscado(''); // Limpia el campo de búsqueda del documento
        //     setDocumentShiftNow('');
        //     return; // Salir de la función
        // }


        // Si pasa todas las validaciones, limpia los mensajes de validación previos
        setMessagesValidation('');
    };



    return (
        <>
            {contextHolder}


            <TablesAssigment
                Modal={Modal}
                Button={Button}
                message={message}
                loading={loading}
                TurnoFin={TurnoFin}
                TurnoIni={TurnoIni}
                formatTime={formatTime}
                setTurnoIni={setTurnoIni}
                setTurnoFin={setTurnoFin}
                asigmentDate={asigmentDate}
                formHourExtra={formHourExtra}
                warningMessage={warningMessage}
                clearAllInputs={clearAllInputs}
                documentShiftNow={documentShiftNow}
                CircularProgress={CircularProgress}
                CheckRoundedIcon={CheckRoundedIcon}
                messageValidation={messageValidation}
                SearchRoundedIcon={SearchRoundedIcon}
                handleSetDateToNow={handleSetDateToNow}
                PublishRoundedIcon={PublishRoundedIcon}
                isHourInputChanged={isHourInputChanged}
                isHourExtraAllowed={isHourExtraAllowed}
                documentDataBuscado={documentDataBuscado}
                setDocumentDataBuscado={setDocumentDataBuscado}
                handleAsigmentHourExtra={handleAsigmentHourExtra}
                handleCheckAvailability={handleCheckAvailability}
                handleFormDataHoursExtra={handleFormDataHoursExtra}

            />




        </>

    )
}

export default AssignmentExtraHours;