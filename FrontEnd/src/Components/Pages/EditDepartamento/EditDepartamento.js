import { Helmet } from "react-helmet";
import React, { useState, useEffect, useCallback } from 'react';
import EditDepartamentoForm from '../../Campaign/EditDepartamentoForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Service from '../../../Machine/Service';
import apiClient from "../../../Service/Service";

export default function EditarDepartamentoPage({ handleCloseModalEdit, selectedDepartamento }) {
  const { Servidor } = Service();

  const [departamentoData, setDepartamentoData] = useState({});

  const fetchDepartamentoData = useCallback(async (departamentoId) => {
    try {
      const response = await apiClient.get(`http://${Servidor}/deptoEstadosPais/${departamentoId}`);
      const datas = await response.data;
      setDepartamentoData(datas);
    } catch (error) {
      console.error('Error fetching departamento data:', error);
    }
  }, [Servidor]);

  useEffect(() => {
    if (selectedDepartamento.id_depto_estado) {
      fetchDepartamentoData(selectedDepartamento.id_depto_estado);
    }
  }, [fetchDepartamentoData, selectedDepartamento.id_depto_estado]);

  return (
    <div>
      <Helmet>
        <title>Editar Departamento</title>
        <meta name="description" content="Editar departamento existente en la aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Box>
        <Container>
          <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
            Editar Departamento
          </Typography>
          <EditDepartamentoForm selectedDepartamento={selectedDepartamento} departamentoData={departamentoData} handleCloseModalEdit={handleCloseModalEdit} fetchDepartamentoData={fetchDepartamentoData} />
        </Container>
      </Box>
    </div>
  );
}
