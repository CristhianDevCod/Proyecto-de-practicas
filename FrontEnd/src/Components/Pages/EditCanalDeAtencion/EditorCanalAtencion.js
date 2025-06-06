import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import EditCanalDeAtencionForm from '../../../Components/Campaign/EditCanalDeAtencionForms';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Service from '../../../Machine/Service';
import apiClient from "../../../Service/Service";

const EditarCanalDeAtencionPage = ({ id, onClose }) => {

    const { Servidor } = Service();


    const [canalDeAtencionData, setCanalDeAtencionData] = useState({});


    useEffect(() => {

        const fetchCanalDeAtencionData = async (canalDeAtencionId) => {
            try {
                const response = await apiClient.get(`http://${Servidor}/canalesAtencion/${canalDeAtencionId}`);
                const data = await response.data;
                setCanalDeAtencionData(data);
            } catch (error) {
                console.error('Error fetching area data:', error);
            }
        };
        if (id) {
            fetchCanalDeAtencionData(id);
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
                    <EditCanalDeAtencionForm canalDeAtencionId={id} canalDeAtencionData={canalDeAtencionData} onClose={onClose} />
                </Container>
            </Box>

        </div>
    );
}

export default EditarCanalDeAtencionPage;
