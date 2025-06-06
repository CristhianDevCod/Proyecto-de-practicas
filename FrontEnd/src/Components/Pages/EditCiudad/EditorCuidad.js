import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import EditCiudadForm from '../../../Components/Campaign/EditCiudadForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Service from '../../../Machine/Service'
import apiClient from "../../../Service/Service";

const EditCiudadPage = ({ id, onClose }) => {
  const { Servidor } = Service();
    const [ciudadData, setCiudadData] = useState({});


  useEffect(() => {
    const fetchCiudadData = async (ciudadId) => {
      try {
        const url = `http://${Servidor}/ciudadesDepartamentos/${ciudadId}`;

        const response = await apiClient.get(url);

        if (response.status !== 200) {
          throw new Error('Error al obtener los datos');
        }

        const data = response.data;
        setCiudadData(data);
      } catch (error) {
        console.error('Error fetching ciudad data:', error);
      }
    };

    if (id) {
      fetchCiudadData(id);
    }
  }, [id, Servidor]);

            <Box>
                {/* <Sidebar /> */}
                <Container>
                    <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
                        Editar Ciudad
                    </Typography>
                    <EditCiudadForm ciudadId={id} ciudadData={ciudadData} onClose={onClose} />
                </Container>
            </Box>

  return (
    <div>
      <Helmet>
        <title>Editar Ciudad</title>
        <meta name="description" content="Editar ciudad existente en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>


      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Editar Ciudad
          </Typography>
          <EditCiudadForm ciudadId={id} ciudadData={ciudadData} onClose={onClose} />
        </Container>
      </Box>

    </div>
  );
}

export default EditCiudadPage;
