import React from 'react';
import { notification } from '../../Exports-Modules/Exports';
import * as XLSX from 'xlsx';
import SocioCompletoExport from './Exportables/SocioCompleto';
import SocioAdministrativoExport from './Exportables/SocioAdministrativo';
import SocioOperativoExport from './Exportables/SocioOperativo';
import FeelingExport from './Exportables/Feeling';
import GetLogsRegisterExport from './Exportables/GetLogsRegister';


import './Styles/Styles.css';

const ContentExports = ({ userRoles }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
        <div className='card-body'>
          <div className='text-center'>
            <div className='mb-0 title-Export'>Exportables</div>
          </div>
        </div>
      </div>

      <div className='p-3 card border-light shadow-sm bg-body rounded'>
        {userRoles.some(role => role.Id_Modulo === 3.2) && (
          <SocioCompletoExport XLSX={XLSX} api={api} contextHolder={contextHolder} />
        )}

        {userRoles.some(role => role.Id_Modulo === 3.4) && (
          <SocioAdministrativoExport XLSX={XLSX} api={api} contextHolder={contextHolder} />
        )}

        {userRoles.some(role => role.Id_Modulo === 3.3) && (
          <SocioOperativoExport XLSX={XLSX} api={api} contextHolder={contextHolder} />
        )}

        {userRoles.some(role => role.Id_Modulo === 3.1) && (
          <FeelingExport XLSX={XLSX} api={api} contextHolder={contextHolder} />
        )}

        {userRoles.some(role => role.Id_Modulo === 3.5) && (
          <GetLogsRegisterExport XLSX={XLSX} api={api} contextHolder={contextHolder} />
        )}

      </div>
    </>

  );
};

export default ContentExports;
