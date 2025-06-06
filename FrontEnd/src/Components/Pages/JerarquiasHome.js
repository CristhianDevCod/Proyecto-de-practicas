import { Helmet } from "react-helmet";
import JerarquiaTable from '../Campaign/JerarquiaTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function CrearJerarquiaPage() {

  return (
    <div>
      <Helmet>
        <title>Home Jerarquías</title>
        <meta name="description" content="Crear nueva jerarquía para una operación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Box>
        <Container>
          <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
            <div className='card-body'>
              <div className='text-center'>
                <div className='mb-0 title-Export'>Home Jerarquías</div>
              </div>
            </div>
          </div>
          <JerarquiaTable/>
        </Container>
      </Box>
    </div>
  );
}
