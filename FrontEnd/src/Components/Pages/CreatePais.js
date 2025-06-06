import { Helmet } from "react-helmet";
import React, { useState } from 'react';
import PaisForm from '../Campaign/PaisForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CrearPaisPage() {
  const [alert, setAlert] = useState(-1);

  return (
    <div>
      <Helmet>
        <title>Crear País</title>
        <meta name="description" content="Crear nuevo país en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Crear Nuevo País
          </Typography>
          <PaisForm onAlertChange={setAlert} alert={alert} />
        </Container>
      </Box>

    </div>
  );
}
