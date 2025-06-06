import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import EditSistemaDeGestionForm from '../../../Components/Campaign/EditSistemaDeGestionForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Service from '../../../Machine/Service';
import apiClient from '../../../Service/Service';

const EditarSistemaDeGestionPage = ({ id, onClose }) => {
    const { Servidor } = Service();
    const [sistemaGestionData, setSistemaGestionData] = useState({});



    useEffect(() => {
        const fetchSistemaDeGestionData = async (sistemaGestionId) => {
            try {
                const response = await apiClient.get(`http://${Servidor}/sistemasGestion/${sistemaGestionId}`);
                const data = await response.data;
                setSistemaGestionData(data);
            } catch (error) {
                console.error('Error fetching area data:', error);
            }
        };

        if (id) {
            fetchSistemaDeGestionData(id);
        }
    }, [id, Servidor]);


    return (
        <div>
            <Helmet>
                <title>Editar Sistema</title>
                <meta name="description" content="Editar sistema existente en la aplicación" />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>


            <Box>
                <Container>
                    <Typography variant="h4" component="h1" align="center">
                        Editar Área
                    </Typography>
                    <EditSistemaDeGestionForm sistemaGestionId={id} sistemaGestionData={sistemaGestionData} onClose={onClose} />
                </Container>
            </Box>

        </div>
    );
}

export default EditarSistemaDeGestionPage;
