import { Helmet } from "react-helmet";
import React, { useState } from 'react';
import OperacionForm from '../Campaign/OperacionForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function CrearOperacionPage({ handleComponentSelect }) {
  const [alert, setAlert] = useState(-1);

  return (
    <div>
      <Helmet>
        <title>Crear Operación</title>
        <meta name="description" content="Crear nueva servicio en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Crear Nueva Operación</div>
              </div>
            </div>
          </div>
          <OperacionForm onAlertChange={setAlert} handleComponentSelect={handleComponentSelect} alert={alert} />
        </Container>
      </Box>

    </div>
  );
}
