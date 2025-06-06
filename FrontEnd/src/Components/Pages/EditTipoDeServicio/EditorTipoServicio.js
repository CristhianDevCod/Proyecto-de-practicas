import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import EditTipoDeServicioForm from '../../../Components/Campaign/EditTipoDeServicioForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Service from '../../../Machine/Service';
import apiClient from '../../../Service/Service';

const EditarTipoDeServicioPage = ({ id, onClose }) => {
  const { Servidor } = Service();

  const [setAlert] = useState(-1);
  const [tipoDeServicioData, setTipoDeServicioData] = useState({});


  useEffect(() => {

    const fetchTipoDeServicioData = async (tipoDeServicioId) => {
      try {
        const response = await apiClient.get(`http://${Servidor}/tipoServicios/${tipoDeServicioId}`);
        const data = await response.data;
        setTipoDeServicioData(data);
      } catch (error) {
        console.error('Error fetching area data:', error);
      }
    };
    if (id) {
      fetchTipoDeServicioData(id);
    }
  }, [id, Servidor]);

  return (
    <div>
      <Helmet>
        <title>Editar Tipo de Servicio</title>
        <meta name="description" content="Editar tipo de servicio existente en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Editar Tipo de Servicio
          </Typography>
          <EditTipoDeServicioForm tipoDeServicioId={id} tipoDeServicioData={tipoDeServicioData} onAlertChange={setAlert} onClose={onClose} />
        </Container>
      </Box>

    </div>
  );
}

export default EditarTipoDeServicioPage;
