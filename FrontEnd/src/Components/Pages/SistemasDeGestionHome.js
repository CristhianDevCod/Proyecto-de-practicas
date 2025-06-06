import React from 'react';
import { Helmet } from "react-helmet";
import SistemasDeGestionTable from '../Campaign/SistemasDeGestionTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const SistemasDeGestionHome = () => {
  return (
    <div>
      <Helmet>
        <title>Sistemas De Gestión</title>
        <meta name="description" content="Listado de áreas" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container style={{ marginTop: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Lista Sistemas De Gestión</div>
              </div>
            </div>
          </div>
          <SistemasDeGestionTable />
        </Container>
      </Box>

    </div>
  );
};

export default SistemasDeGestionHome;

