import React, { useState, useContext } from 'react';
import { Calendar, locale, HourglassFullRoundedIcon, CheckRoundedIcon, CloseRoundedIcon, CircularProgress } from '../../Exports-Modules/Exports';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import 'dayjs/locale/es';
import './Styles/Styles.css';

import Headers from './Headers/Headers';
import CardsToday from './Cards/CardsToday';
import ChangeRequest from './Cards/ChangeRequest';
import DataCellRender from './Cards/DataCellRender';
import ModalDetailsShifts from './Cards/ModalDetailsShifts';

import { UserProfileContext } from '../../Context/ProfileContex';
import { UseFetchTurnos, ChangesLengthAccept, Turnos, ChangesPending, GetChangesAcceptCompany, GetChangesPendingCompany, GetChangesRejectCompany } from '../Hooks/Hooks';

function TurnosCalendar() {
  // Contexto de perfil de usuario
  const { fullName } = useContext(UserProfileContext);

  const [loading, setLoading] = useState(false);
  // Hooks personalizados para obtener datos
  const turnos = Turnos(fullName, setLoading);
  const dataMyChangesLength = UseFetchTurnos(fullName);
  const dataMyChangesPending = ChangesPending(fullName);
  const dataMyChangesLengthAccept = ChangesLengthAccept(fullName);
  const changesPending = GetChangesPendingCompany(fullName);
  const changesAccept = GetChangesAcceptCompany(fullName);
  const getChangesRejectCompany = GetChangesRejectCompany(fullName);

  // Estados para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState(null);

  //Estado para indicar la carga de los recursos

  // Funciones para manejar el modal
  const handleTurnoClick = (turno) => {
    setSelectedTurno(turno);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
  };

  // Renderización de celdas de fecha
  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    if (loading) {
      return (<CircularProgress variant='indeterminate' color='primary' />);
    } else {
      return (<DataCellRender formatTime={formatTime} formattedDate={formattedDate} turnos={turnos} handleTurnoClick={handleTurnoClick} />);

    }
  };

  // Combinación de cambios pendientes, aceptados y rechazados
  const uniqueChangesPending = new Set([...dataMyChangesPending, ...changesPending]);
  const uniqueChangesAccept = new Set([...dataMyChangesLengthAccept, ...changesAccept]);
  const uniqueChangesReject = new Set([...dataMyChangesLength, ...getChangesRejectCompany]);

  const conbinedChangesPending = uniqueChangesPending.size > 0 ? [...uniqueChangesPending] : [];
  const conbinedChangesAccept = uniqueChangesAccept.size > 0 ? [...uniqueChangesAccept] : [];
  const conbinedChangesReject = uniqueChangesReject.size > 0 ? [...uniqueChangesReject] : [];

  return (
    <>
      {/* Encabezado */}
      <Headers
        Card={Card}
        loading={loading}
        Divider={Divider}
        CardContent={CardContent}
        CircularProgress={CircularProgress}
        CheckRoundedIcon={CheckRoundedIcon}
        CloseRoundedIcon={CloseRoundedIcon}
        conbinedChangesAccept={conbinedChangesAccept}
        conbinedChangesReject={conbinedChangesReject}
        conbinedChangesPending={conbinedChangesPending}
        HourglassFullRoundedIcon={HourglassFullRoundedIcon}
      />

      {/* Contenido principal */}
      <div className='card container-calendar-content '>
        <div className='container' >
          <div className='row'>
            {/* Tarjeta de hoy */}
            <Card className='col-4'>
              <CardContent>
                <div className='title-calendar-today-container'>
                  <div className='text-muted title-calendar-today'>HOY</div>
                </div>
                {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (<CardsToday turnos={turnos} formatTime={formatTime} />)}

              </CardContent>
            </Card>

            {/* Calendario */}
            <Card className='col-8'>
              <CardContent>
                <Calendar
                  style={{ borderRadius: '10px' }}
                  cellRender={dateCellRender}
                  locale={locale}
                />
                <div className='container-butoom-solicitud'>
                  <ChangeRequest />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div >

      {/* Modal */}
      <ModalDetailsShifts
        formatTime={formatTime}
        modalVisible={modalVisible}
        selectedTurno={selectedTurno}
        handleModalClose={handleModalClose}
      />
    </>
  );
}

export default TurnosCalendar;
