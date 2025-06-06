import React from 'react';
import { Helmet } from "react-helmet";
import CanalDeAtencionTable from '../Campaign/CanalDeAtencionTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CanalDeAtencionHome = () => {
  return (
    <div>
      <Helmet>
        <title>Canales de Atención</title>
        <meta name="description" content="Listado de canales de atención" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Box>
        <Container style={{ marginTop: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Listado de Canales de Atención</div>
              </div>
            </div>
          </div>
          <CanalDeAtencionTable />
        </Container>
      </Box>

    </div>
  );
};

export default CanalDeAtencionHome;
