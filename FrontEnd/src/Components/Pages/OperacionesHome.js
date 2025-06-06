import React from 'react';
import { Helmet } from 'react-helmet';
import OperacionesTable from '../Campaign/OperacionesTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const OperacionesHome = ({ handleComponentSelect }) => {
  return (
    <div>
      <Helmet>
        <title>Operaciones</title>
        <meta name='description' content='Listado de operaciones' />
        <link rel='icon' href='/favicon.ico' />
      </Helmet>


      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Container
          maxWidth='xl'
          style={{ marginTop: '20px', marginBottom: '20px', padding: 0 }}
        >
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Lista de Operaciones</div>
              </div>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <OperacionesTable handleComponentSelect={handleComponentSelect} />
          </Box>
        </Container>
      </Box>

    </div>
  );
};

export default OperacionesHome;
