import { Helmet } from "react-helmet";
import React from 'react';
import SedeForm from '../Campaign/SedeForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CrearSedePage({onClose}) {

  return (
    <div>
      <Helmet>
        <title>Crear Sede</title>
        <meta name="description" content="Crear nueva sede en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Crear Nueva Sede
          </Typography>
          <SedeForm onClose={onClose} />
        </Container>
      </Box>

    </div>
  );
}
