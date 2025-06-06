import React from 'react';
import { Box } from '@mui/material';
import { Button, Result } from 'antd';
const App = () => (
  <Box sx={{ width: '100%', height: '100vh' }}>
    <Result
      status='404'
      title='404'
      subTitle='Lo sentimos, la pagina que intentas visitar no existe.'
      extra={
        <Button type='primary' href='/'>
          ir al Inicio
        </Button>
      }
    />
  </Box>
);
export default App;
