import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import EditPaisForm from '../../../Components/Campaign/EditPaisForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Service from '../../../Machine/Service';
import apiClient from '../../../Service/Service';

const EditarPaisPage = ({ id, onClose }) => {
  const { Servidor } = Service();

  const [paisData, setPaisData] = useState({});

  useEffect(() => {
    const fetchPaisData = async (paisId) => {
      try {
        const response = await apiClient.get(`http://${Servidor}/paises/${paisId}`);
        const data = await response.data;
        setPaisData(data);
      } catch (error) {
        console.error('Error fetching país data:', error);
      }
    };

    if (id) {
      fetchPaisData(id);
    }
  }, [id, Servidor]);

  return (
    <div>
      <Helmet>
        <title>Editar País</title>
        <meta name="description" content="Editar país existente en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Box>
        <Container>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Editar País
          </Typography>
          <EditPaisForm paisId={id} paisData={paisData} onClose={onClose} />
        </Container>
      </Box>
    </div>
  );
}

export default EditarPaisPage;
