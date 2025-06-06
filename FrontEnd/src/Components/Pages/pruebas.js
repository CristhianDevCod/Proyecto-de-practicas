import { Helmet } from "react-helmet";
import React, { useState } from 'react';
import ReportesBiAgentes from '../Campaign/ReportesBiAgentes';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function PruebasPage() {
  const [alert, setAlert] = useState(-1);

  return (
    <div>
      <Helmet>
        <title>Prueba</title>
        <meta name="description" content="Crear nueva área en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center">
            Mis indicadores
          </Typography>
          <ReportesBiAgentes onAlertChange={setAlert} alert={alert} />
        </Container>
      </Box>

    </div>
  );
}