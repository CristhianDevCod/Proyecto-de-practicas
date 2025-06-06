import React, { createContext, useContext, useState } from 'react';
import { UserProfileContext } from './ProfileContex';
import Config from '../Auth/Config';
import apiClient from '../Service/Service';
export const LogsContext = createContext();
export const LogsContextProvider = ({ children }) => {
    const { userProfile } = useContext(UserProfileContext);
    const { LogsRegister } = Config();
    
    const [Modulo_Visitado, setVisitedModules] = useState([]);

    const handleLogs = async (module, subModule, Accion, file) => {
        try {
            const value = new Date();
            const date = value.getFullYear() + '-' + (value.getMonth() + 1).toString().padStart(2, '0') + '-' + value.getDate().toString().padStart(2, '0');
            const time = value.getHours().toString().padStart(2, '0') + ':' + value.getMinutes().toString().padStart(2, '0') + ':' + value.getSeconds().toString().padStart(2, '0');

            // Crear el objeto de datos para el registro de log
            const logData = {
                Accion_Realizada: Accion,
                Fecha_Logueo: date,
                Fecha_Visita_Modulo: date,
                Hora_Logueo: time,
                Hora_Visita_Modulo: time,
                Modulo_Visitado: module,
                Submodulo_Visitado: subModule,
                Usuario_Red: userProfile.user,
                file: file
            };
            setVisitedModules([...Modulo_Visitado, module]);
            await apiClient.put(LogsRegister, logData);
        } catch (error) {
            console.log('error');
        }
    }

    return (
        <LogsContext.Provider value={{ handleLogs, Modulo_Visitado }}>
            {children}
        </LogsContext.Provider>
    )
} 
