import React from 'react';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';

const DisconnectAdviser = () => {
    return (
        <div className='card text-center'>
            <div className='card-body'>
                <CloudOffOutlinedIcon fontSize='large' sx={{ width: '50px', height: '50px' }} />
                <h5 className='card-title text-muted'>Sin turno programado</h5>
            </div>
        </div>
    )
}

export default DisconnectAdviser