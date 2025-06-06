import React from 'react';
import { Helmet } from "react-helmet";
import RolesTable from '../Campaign/RolesTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const RolesHome = () => {
  return (
    <div>
      <Helmet>
        <title>Roles</title>
        <meta name="description" content="Listado de roles" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container style={{ marginTop: "10px" }}>
          <Typography variant="h4" component="h1" align="center">
            Listado de Roles
          </Typography>
          <RolesTable />
        </Container>
      </Box>

    </div>
  );
};

export default RolesHome;
