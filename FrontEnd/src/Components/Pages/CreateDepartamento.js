import { Helmet } from "react-helmet";
import React from 'react';
import DepartamentoForm from '../Campaign/DepartamentoForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CrearDepartamentoPage({ onClose }) {

  return (
    <div>
      <Helmet>
        <title>Crear Departamento</title>
        <meta name="description" content="Crear nuevo departamento en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Crear Nuevo Departamento
          </Typography>
          <DepartamentoForm onClose={onClose} />
        </Container>
      </Box>

    </div>
  );
}
