import * as React from 'react';
import { Box, Drawer, IconButton, Badge, Card, CardContent, Button, CloseRoundedIcon, } from '../../../../Exports-Modules/Exports';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Container from '@mui/material/Container';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';

import IconSuvey from '../../../../Assets/LogoCrecer.jpeg';


import { AllNotificationsContext } from '../../../../Context/AllNotificationsContext';
const AllNotifications = ({ userRoles, handleComponentSelect }) => {
  const {
    countNoveltiesWfm,
    countTardinessWFM,
    countTardinessGTR,
    countNoveltiesNomina,
    countTardinessNomina,
    countNoveltiesManager,
    countTardinessFormacion,
    notificationCountAlmaSurvey
  } = React.useContext(AllNotificationsContext);
  const [open, setOpen] = React.useState(false);

  //!ABRIR Y CERRAR EL DRAWER
  const toggleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawerClose = () => {
    setOpen(false);
  };


  const RedirectToManager = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Solicitudes Manager');
    }
  }




  const RedirectToWfm = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Solicitudes WFM');
    }
  }
  const RedirectToNomina = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Solicitudes Nomina');
    }
  }

  const RedirectTardinessFormacion = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Tardiness Formacion');
    }
  }
  const RedirectTardinessWfm = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Tardiness WFM');
    }
  }
  const RedirectTardinessGtr = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Tardiness GTR');
    }
  }
  const RedirectTardinessNomina = () => {
    if (handleComponentSelect) {
      handleComponentSelect('Tardiness Nomina');
    }
  }


  React.useEffect(() => {
    if (handleComponentSelect) {
      toggleDrawerClose();
    }
  }, [handleComponentSelect]);






  //renderizamos las alertas de las novedades 
  function RenderAlertsNovelties() {
    const Alerts = [];

    if (countNoveltiesManager && countNoveltiesManager.length > 0) {
      userRoles.some(role => role.Id_Modulo === 2.4) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="manager-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countNoveltiesManager.length} novedades Manager pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectToManager} variant='contained'>Revisar Solicitudes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )
    }


    if (countNoveltiesWfm && countNoveltiesWfm.length > 0) {

      userRoles.some(role => role.Id_Modulo === 2.3) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="wfm-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countNoveltiesWfm.length} novedades WFM pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectToWfm} variant='contained'>Revisar Solicitudes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )
    }

    if (countNoveltiesNomina && countNoveltiesNomina.length > 0) {
      userRoles.some(role => role.Id_Modulo === 2.5) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="nomina-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countNoveltiesNomina.length} novedades Nomina pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectToNomina} variant='contained'>Revisar Solicitudes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )
    }

    return Alerts.length > 0 ? Alerts : null;
  }

  //renderizamos las alertas de las impuntualidades 
  function RenderAlertsTardiness() {
    const Alerts = [];

    if (countTardinessFormacion && countTardinessFormacion.length > 0) {
      userRoles.some(role => role.Id_Modulo === 5.4) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="manager-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countTardinessFormacion.length} reportes de formacion pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectTardinessFormacion} variant='contained'>Revisar Reportes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )

    }
    if (countTardinessWFM && countTardinessWFM.length > 0) {
      userRoles.some(role => role.Id_Modulo === 5.5) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="Wfm-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countTardinessWFM.length} reportes WFM pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectTardinessWfm} variant='contained'>Revisar Reportes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )

    }
    if (countTardinessGTR && countTardinessGTR.length > 0) {
      userRoles.some(role => role.Id_Modulo === 5.6) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="Gtr-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countTardinessGTR.length} reportes GTR pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectTardinessGtr} variant='contained'>Revisar Reportes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )

    }
    if (countTardinessNomina && countTardinessNomina.length > 0) {
      userRoles.some(role => role.Id_Modulo === 5.7) && (
        Alerts.push(
          <Card sx={{ width: '100%', marginTop: '2%' }} key="nomina-alert">
            <CardContent >
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <InfoRoundedIcon color='info' fontSize='large' />
                </div>
                <div className='flex-grow-1 ms-3'>
                  <div className="flex-grow-1">
                    Tienes {countTardinessNomina.length} reportes Nomina pendientes
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    <div className='mt-2 flex-grow-1'>
                      <Button size='small' color='info' onClick={RedirectTardinessNomina} variant='contained'>Revisar Reportes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )

    }

    return Alerts.length > 0 ? Alerts : null;
  }


  function RenderStatesNovelties() {
    if (
      (countNoveltiesManager && countNoveltiesManager.length) ||
      (countNoveltiesWfm && countNoveltiesWfm.length) ||
      (countNoveltiesNomina && countNoveltiesNomina.length)
    ) {
      return <PriorityHighRoundedIcon fontSize="small" />;
    }

    return null;
  }

  function RenderStatesTardiness() {
    if (
      (countTardinessFormacion && countTardinessFormacion.length) ||
      (countTardinessWFM && countTardinessWFM.length) ||
      (countTardinessGTR && countTardinessGTR.length) ||
      (countTardinessNomina && countTardinessNomina.length)
    ) {
      return <PriorityHighRoundedIcon fontSize="small" />;
    }

    return null;

  }


  function RenderStateAlmaSurvey() {
    if (notificationCountAlmaSurvey && notificationCountAlmaSurvey.length > 0) {
      return <PriorityHighRoundedIcon fontSize="small" />;
    } else {
      return null;
    }

  }


  function RenderAlertForAlmaSurvey() {
    const Alerts = [];
    if (notificationCountAlmaSurvey && notificationCountAlmaSurvey.length > 0) {
      Array.isArray(notificationCountAlmaSurvey) && notificationCountAlmaSurvey.forEach((n) => {
        const data = Array.isArray(n.data) && n.data
        Array.isArray(data) && data.map((l) => {
          return (
            Alerts.push(
              <Card sx={{ width: '100%', marginTop: '2%' }} key={l.id}>
                <CardContent>
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img alt='Crecer' src={IconSuvey} style={{ width: '50px', height: '50px' }} />
                    </div>
                    <div className='flex-grow-1 ms-3'>
                      <div className="flex-grow-1">
                        <div className='alert alert-primary'>
                          Tiene una nueva encuesta: {l.nombre_encuesta} por responder en almasurvey
                        </div>
                        <hr />

                        <div className='color-text-bg-secondary'>
                          Recuerda usar estas credenciales para responder las encuestas
                        </div>

                        <div className='fw-bold'>
                          Credenciales:
                        </div>
                        <div className=''>
                          Usuario: {l.documento}
                        </div>
                        <div className=''>
                          Contraseña: {l.password}
                        </div>
                      </div>
                      <div className="d-flex align-items-end flex-column">
                        <div className='mt-2 flex-grow-1'>
                          <Button
                            size='small'
                            color='info'
                            href={l.link}
                            variant='contained'
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Revisar Encuesta
                          </Button>

                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          );
        });

      });
    }

    return Alerts.length > 0 ? Alerts : null;
  }






  //TABS PARA LAS DISTINTAS  VISTAS DE NOTIFICACIONES Cambios de turnos - Novedades - impuntualidades
  const HeaderTabs = (
    <Box sx={{ marginTop: '2%', bgcolor: 'background.paper' }} >
      <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }} >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'md',
            bgcolor: 'background.level1',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },
          }}
        >
          <Badge badgeContent={RenderStatesNovelties()} color='error'>
            <Tab disableIndicator sx={{ flexGrow: 1 }}>Novedades</Tab>
          </Badge>

          <Badge badgeContent={RenderStatesTardiness()} color='error'>
            <Tab disableIndicator sx={{ flexGrow: 1 }}>Impuntualidades</Tab>
          </Badge>

          <Badge badgeContent={RenderStateAlmaSurvey()} color='error'>
            <Tab disableIndicator sx={{ flexGrow: 1 }}>AlmaSurvey</Tab>
          </Badge>
        </TabList>

        <TabPanel value={0}>
          {RenderAlertsNovelties()}
        </TabPanel>

        <TabPanel value={1}>
          {RenderAlertsTardiness()}
        </TabPanel>

        <TabPanel value={2}>
          {RenderAlertForAlmaSurvey()}
        </TabPanel>

      </Tabs>
    </Box >
  );

  function RenderConditions() {
    if (
      (countNoveltiesManager && countNoveltiesManager.length) ||
      (countNoveltiesWfm && countNoveltiesWfm.length) ||
      (countNoveltiesNomina && countNoveltiesNomina.length) ||
      (countTardinessFormacion && countTardinessFormacion.length) ||
      (countTardinessWFM && countTardinessWFM.length) ||
      (countTardinessGTR && countTardinessGTR.length) ||
      (countTardinessNomina && countTardinessNomina.length) ||
      (notificationCountAlmaSurvey && notificationCountAlmaSurvey.length)
    ) {
      return <PriorityHighRoundedIcon fontSize="small" />;
    }
  }


  const DrawerList = (
    <Box sx={{ width: '100%' }} role="presentation">
      <div className="d-flex">
        <div className="p-2 flex-grow-1" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Nunito' }}>Notificaciones</div>
        <div className="p-2" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Nunito' }}>
          <IconButton onClick={toggleDrawerClose} sx={{ borderRadius: '10px', backgroundColor: '#a7aeb932', height: '100%' }}>
            <CloseRoundedIcon color='error' fontSize='small' />
          </IconButton>
        </div>
      </div>
    </Box>
  );


  return (
    <>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {(countNoveltiesManager && countNoveltiesManager.length) ||
          (countNoveltiesWfm && countNoveltiesWfm.length) ||
          (countNoveltiesNomina && countNoveltiesNomina.length) ||

          (countTardinessFormacion && countTardinessFormacion.length) ||
          (countTardinessWFM && countTardinessWFM.length) ||
          (countTardinessGTR && countTardinessGTR.length) ||
          (countTardinessNomina && countTardinessNomina.length) ||
          (notificationCountAlmaSurvey && notificationCountAlmaSurvey.length)


          ? (
            <Badge color="error" overlap="circular" badgeContent={RenderConditions()}>
              <IconButton onClick={toggleDrawerOpen} sx={{ borderRadius: '10px', backgroundColor: '#a7aeb932', height: '100%' }}>
                <CampaignRoundedIcon className='icon-color-notification' alt='' />
              </IconButton>
            </Badge>
          ) : (
            <IconButton onClick={toggleDrawerOpen} sx={{ borderRadius: '10px', backgroundColor: '#a7aeb932', height: '100%' }}>
              <CampaignRoundedIcon className='icon-color-notification' alt='' />
            </IconButton>
          )}


        <Drawer
          anchor='right'
          open={open}
          hideBackdrop={true}
          onClose={toggleDrawerClose}
        >
          <Container fixed >
            {DrawerList}
            {HeaderTabs}
          </Container>
        </Drawer>
      </div>
    </>
  );
}
export default AllNotifications;