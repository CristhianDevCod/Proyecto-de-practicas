import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const FinOperacionPage = ({handleBack, handleComponentSelect}) => {
  // const router = useNavigate();

  const handleBackClosed = () => {
    handleBack();
  }

  const handleBackHome = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Home Operaciones')
    }
  }

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="50vh" 
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <CheckCircleOutlineIcon style={{ fontSize: 50, color: 'green' }} />
        <Typography variant="h5" gutterBottom>
          ¡Operación creada con éxito!
        </Typography>
        <Typography variant="body1" gutterBottom>
          La operación se ha creado correctamente.
        </Typography>
        <Button variant="contained" style={{ marginTop: '10px' }} startIcon={<ArrowBackRoundedIcon />} onClick={handleBack ? handleBackClosed : handleBackHome} color="success" fullWidth >
          Volver
        </Button>
      </Paper>
    </Box>
  );
};

export default FinOperacionPage;
