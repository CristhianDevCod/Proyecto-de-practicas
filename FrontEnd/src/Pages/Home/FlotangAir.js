import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import { Typography } from '@mui/material';

import ModalFlotang from './Components/ModalFlotang/ModalFlotang';



const actions = [
    { icon: <ShareIcon />, name: 'Reporta tu inquietud', flex: 1 }
];

const FlotangAir = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                transform: 'translateZ(0px)',
                flexGrow: 1
            }}
        >
            <Backdrop open={open} sx={{ backgroundColor: 'transparent' }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={React.cloneElement(action.icon, { sx: { color: 'black' } })}
                        tooltipTitle={
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontSize: '1.2rem',
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    width: '200px',
                                    textAlign: 'center'
                                }}
                            >
                                {action.name}
                            </Typography>
                        }
                        tooltipOpen
                        // Aquí abrimos el modal al hacer clic en la acción
                        onClick={() => {
                            handleClose();
                            handleModalOpen();
                        }}
                    />
                ))}
            </SpeedDial>

            {/* Renderizamos el Modal */}
            <ModalFlotang
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
            />

            {children}
        </Box>
    );
};

export default FlotangAir;
