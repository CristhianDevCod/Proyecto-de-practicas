import { Helmet } from 'react-helmet';
import React from 'react';
import CiudadesTable from '../Campaign/CiudadesTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CiudadesHome = () => {
  return (
    <div>
      <Helmet>
        <title>Ciudades</title>
        <meta name='description' content='Listado de Ciudades' />
        <link rel='icon' href='/favicon.ico' />
      </Helmet>


      <Box>
        <Container style={{ marginTop: '10px' }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Listado de Cuidades</div>
              </div>
            </div>
          </div>
          <CiudadesTable />
        </Container>
      </Box>

    </div>
  );
};

export default CiudadesHome;
