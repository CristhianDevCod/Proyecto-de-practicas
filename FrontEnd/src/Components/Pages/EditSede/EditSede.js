import Helmet from 'react-helmet';
import React, { useState, useEffect, useCallback } from 'react';
import EditSedeForm from '../../Campaign/EditSedeForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Service from '../../../Machine/Service';
import apiClient from '../../../Service/Service';


export default function EditarSedePage({ handleCloseModalEdit, selectedSede }) {
  const { Servidor } = Service();
  const [sedeData, setSedeData] = useState({});

  const fetchSedeData = useCallback(async (sedeId) => {
    try {
      const response = await apiClient.get(`http://${Servidor}/sedesCiudades/${sedeId}`);
      const data = await response.data;
      setSedeData(data);
    } catch (error) {
      console.error('Error fetching sede data:', error);
    }
  }, [Servidor]);

  useEffect(() => {
    if (selectedSede.id_sede) {
      fetchSedeData(selectedSede.id_sede);
    }
  }, [fetchSedeData, selectedSede.id_sede]);

  return (
    <div>
      <Helmet>
        <title>Editar Sede</title>
        <meta name="description" content="Editar sede existente en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Editar Sede
          </Typography>
          <EditSedeForm selectedSede={selectedSede} sedeData={sedeData} handleCloseModalEdit={handleCloseModalEdit} />
        </Container>
      </Box>

    </div>
  );
}
