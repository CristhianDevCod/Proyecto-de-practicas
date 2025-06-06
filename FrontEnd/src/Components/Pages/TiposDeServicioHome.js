import React from 'react';
import { Helmet } from "react-helmet";
import TiposDeServicioTable from '../Campaign/TiposDeServicioTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const TiposDeServicioHome = () => {
  return (
    <div>
      <Helmet>
        <title>Tipos de Servicio</title>
        <meta name="description" content="Listado de áreas" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container style={{ marginTop: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Listado de Tipos de Servicio</div>
              </div>
            </div>
          </div>
          <TiposDeServicioTable />
        </Container>
      </Box>

    </div>
  );
};

export default TiposDeServicioHome;
