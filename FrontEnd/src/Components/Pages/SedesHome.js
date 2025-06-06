import React from 'react';
import { Helmet } from "react-helmet";
import SedesTable from '../Campaign/SedesTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CiudadesHome = () => {
  return (
    <div>
      <Helmet>
        <title>Sedes</title>
        <meta name="description" content="Listado de Sedes" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container style={{ marginTop: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Listado de Sedes</div>
              </div>
            </div>
          </div>
          <SedesTable />
        </Container>
      </Box>

    </div>
  );
};

export default CiudadesHome;
