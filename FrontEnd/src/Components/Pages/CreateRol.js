import { Helmet } from "react-helmet";
import React, { useState } from 'react';
import RolForm from '../Campaign/RolForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CrearRolPage() {
  const [alert, setAlert] = useState(-1);

  return (
    <div>
      <Helmet>
        <title>Crear Rol</title>
        <meta name="description" content="Crear nueva rol en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Crear Nuevo Rol
          </Typography>
          <RolForm onAlertChange={setAlert} alert={alert} />
        </Container>
      </Box>

    </div>
  );
}
