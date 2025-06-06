import React from 'react';
import { Helmet } from "react-helmet";
import OperacionesClienteForm from '../Campaign/OperacionesClienteForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const operacionesClienteHome = ({ handleComponentSelect }) => {
  return (
    <div>
      <Helmet>
        <title>Operaciones por cliente</title>
        <meta name="description" content="Listado de áreas" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Box>
        <Container style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Operaciones por Cliente</div>
              </div>
            </div>
          </div>
          <OperacionesClienteForm handleComponentSelect={handleComponentSelect} />
        </Container>
      </Box>

    </div>
  );
};

export default operacionesClienteHome;



