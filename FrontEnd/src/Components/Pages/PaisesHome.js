import React from "react";
import { Helmet } from "react-helmet";
// import Header from '../Campaign/Header';
// import Sidebar from '../Campaign/Slidebar';
import PaisesTable from '../Campaign/PaisesTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

function PaisesHome() {
  return (
    <div>
      <Helmet>
        <title>Países</title>
        <meta name="description" content="Listado de Paises" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* <Header /> */}

      <Box>
        {/* <Sidebar /> */}
        <Container style={{ marginTop: "10px" }}>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Listado de Paises</div>
              </div>
            </div>
          </div>
          <PaisesTable />
        </Container>
      </Box>
    </div>
  );
}

export default PaisesHome;