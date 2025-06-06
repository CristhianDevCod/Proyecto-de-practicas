import React from 'react';
import { Helmet } from "react-helmet";
import DepartamentosTable from '../Campaign/DepartamentosTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const DepartamentosHome = () => {
  return (
    <div>
      <Helmet>
        <title>Departamentos</title>
        <meta name="description" content="Listado de Departamentos" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Box>
        <Container style={{ marginTop: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Listado de Departamentos</div>
              </div>
            </div>
          </div>
          <DepartamentosTable />
        </Container>
      </Box>

    </div>
  );
};

export default DepartamentosHome;
