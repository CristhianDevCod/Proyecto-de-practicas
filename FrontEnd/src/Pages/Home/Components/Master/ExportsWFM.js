import * as XLSX from 'xlsx';
import axios from 'axios';

import './Styles/Styles.css';
import { React, notification, useContext } from '../../../../Exports-Modules/Exports';

import ExportShiftFull from './Exportables/ExportShiftFull';
import ExportShiftAdministrativo from './Exportables/ExportShiftAdministrativo';
import ExportShiftOperativo from './Exportables/ExportShiftOperativo';
import ExportShiftFullAdministrativo from './Exportables/ExportShiftFullAdministrativo';
import { UserProfileContext } from '../../../../Context/ProfileContex';



function ExportsWFM({ userRoles }) {
    const { fullName } = useContext(UserProfileContext);
    const [api, contextHolder] = notification.useNotification();


    return (
        <>
            {contextHolder}
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='text-center'>
                        <div className='mb-0 title-import'>Exporte de Turnos</div>
                    </div>
                </div>
            </div>

            <div className='p-3 card border-light shadow-sm bg-body rounded'>
                {/*turnos completos */}
                {userRoles.some(role => role.Id_Modulo === 1.41) && (
                    <ExportShiftFull api={api} XLSX={XLSX} axios={axios} fullName={fullName} />
                )}
                {/* Turnos completo Administrativo */}
                {userRoles.some(role => role.Id_Modulo === 1.42) && (
                    <ExportShiftFullAdministrativo api={api} XLSX={XLSX} axios={axios} fullName={fullName} />
                )}
                {/* Turnos Operativos */}
                {userRoles.some(role => role.Id_Modulo === 1.43) && (
                    <ExportShiftOperativo api={api} XLSX={XLSX} axios={axios} fullName={fullName} />
                )}
                {/* Turnos Administrativo */}
                {userRoles.some(role => role.Id_Modulo === 1.44) && (
                    <ExportShiftAdministrativo api={api} XLSX={XLSX} axios={axios} fullName={fullName} />
                )}

            </div>

        </>
    );
}

export default ExportsWFM;
