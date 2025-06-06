import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import EditSectorClienteForm from '../../../Components/Campaign/EditSectorClienteForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Service from '../../../Machine/Service';
import apiClient from '../../../Service/Service';

const EditarSectorClientePage = ({ id, onClose }) => {

    const { Servidor } = Service();

    const [sectorClienteData, setSectorClienteData] = useState({});


    useEffect(() => {

        const fetchSectorClienteData = async (sectorClienteId) => {
            try {
                const response = await apiClient.get(`http://${Servidor}/sectorClientes/${sectorClienteId}`);
                const data = await response.data;
                setSectorClienteData(data);
            } catch (error) {
                console.error('Error fetching area data:', error);
            }
        };
        if (id) {
            fetchSectorClienteData(id);
        }
    }, [id, Servidor]);

    return (
        <div>
            <Helmet>
                <title>Editar Sector Cliente</title>
                <meta name="description" content="Editar sector existente en la aplicación" />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>


            <Box>
                <Container>
                    <Typography variant="h4" component="h1" align="center" style={{ marginTop: "10px", marginBottom: "10px" }}>
                        Editar Sector Cliente
                    </Typography>
                    <EditSectorClienteForm sectorClienteId={id} sectorClienteData={sectorClienteData}  onClose={onClose} />
                </Container>
            </Box>

        </div>
    );
}

export default EditarSectorClientePage;