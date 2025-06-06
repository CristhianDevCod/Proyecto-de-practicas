import React from 'react';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import AutoModeRoundedIcon from '@mui/icons-material/AutoModeRounded';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';


//icons wfm
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { BarChartLine, BrandAsanaIcon, Approval, AddKPI, Goal2, ArrowGoal } from '../../../../Exports-Modules/Exports';


const DrawerComponents = ({ Logo2, List, Accordion, open, handleChange, AccordionSummary, ExpandMoreIcon, SettingsRoundedIcon, AccordionDetails, userRoles, DomainAddRoundedIcon, EventAvailableRoundedIcon, LanguageRoundedIcon, PublicRoundedIcon, PrecisionManufacturingRoundedIcon, MapsHomeWorkRoundedIcon, RocketLaunchRoundedIcon, PlaceRoundedIcon, BuildRoundedIcon, TuneRoundedIcon, handleComponentSelect, ListItemIcon, StyledListItemButton, AdminPanelSettingsRoundedIcon, ContentPasteSearchRoundedIcon, FeedIcon, selectModule, FileDownloadRoundedIcon, handleLogs, ReduceCapacityRoundedIcon, GroupAddRoundedIcon, MiscellaneousServicesRoundedIcon, LanRoundedIcon, PsychologyRoundedIcon, ContactPhoneRoundedIcon, MoreTimeRoundedIcon, ScheduleSendRoundedIcon, AccessTimeRoundedIcon, GroupsRoundedIcon, RequestQuoteRoundedIcon }) => {
    return (
        <>
            <div>
                <a href='/Home' className='container-antares'>
                    <img className='logo-antares' src={Logo2} alt='' />
                </a>
            </div>
            <div className='scroll-container-home' >
                <List >
                    {/* Módulo wfm */}

                    <Accordion expanded={open === 'WFM'} onChange={handleChange('WFM')} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                            <div className='AccordionSummary-style'>
                                <SettingsRoundedIcon fontSize='small' />
                            </div>
                            <div className='title-modulos' >WFM</div>
                        </AccordionSummary>
                        <AccordionDetails>

                            {/* turnos */}
                            {userRoles.some(role => role.Id_Modulo === 1) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <EventAvailableRoundedIcon fontSize='small' className={selectModule === 'Mis Turnos' || selectModule === 'Mi Equipo' || selectModule === 'Importables' || selectModule === 'Mis Cambios' || selectModule === 'Importe Administrativo' || selectModule === 'Exporte Turnos' ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos' >TURNOS</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {userRoles.some(role => role.Id_Modulo === 1.1) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Mis Turnos');

                                                }}
                                                    className={selectModule === 'Mis Turnos' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <EventAvailableRoundedIcon fontSize='small' className={selectModule === 'Mis Turnos' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Mis Turnos' ? `title-submodules` : 'title-submodulesBefore'}>Mis Turnos</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 1.2) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Mi Equipo');

                                                }} className={selectModule === 'Mi Equipo' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <Diversity3RoundedIcon fontSize='small' className={selectModule === 'Mi Equipo' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Mi Equipo' ? `title-submodules` : 'title-submodulesBefore'}>Mi Equipo</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 1.3) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Importables');

                                                }} className={selectModule === 'Importables' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <PublishRoundedIcon fontSize='small' className={selectModule === 'Importables' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Importables' ? `title-submodules` : 'title-submodulesBefore'}>Importe Turnos</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 1.5) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Mis Cambios');

                                                }} className={selectModule === 'Mis Cambios' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <PublishedWithChangesRoundedIcon fontSize='small' className={selectModule === 'Mis Cambios' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Mis Cambios' ? `title-submodules` : 'title-submodulesBefore'}>Mis Cambios</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 1.6) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Importe Administrativo');

                                                }} className={selectModule === 'Importe Administrativo' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <PublishRoundedIcon fontSize='small' className={selectModule === 'Importe Administrativo' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Importe Administrativo' ? `title-submodules` : 'title-submodulesBefore'}>Importe Turnos Administrativos</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 1.4) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Exporte Turnos');

                                                }}
                                                    className={selectModule === 'Exporte Turnos' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <DownloadRoundedIcon fontSize='small' className={selectModule === 'Exporte Turnos' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Exporte Turnos' ? `title-submodules` : 'title-submodulesBefore'}>Exporte Turnos</div>
                                                </StyledListItemButton>
                                            )}

                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/* Novedades */}
                            {userRoles.some(role => role.Id_Modulo === 2) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <FeedIcon fontSize='small' className={selectModule === 'Mis Novedades' || selectModule === 'Mis Novedades Staff' || selectModule === 'Novedades Mi Equipo Staff' || selectModule === 'Solicitudes Mi Equipo' || selectModule === 'Solicitudes WFM' || selectModule === 'Solicitudes Manager' || selectModule === 'Solicitudes Nomina' || selectModule === 'Horas Extras' || selectModule === 'Horas Extras GTR' || selectModule === 'Horas Extras Mi Equipo' || selectModule === 'Asignacion Horas Extras' ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos' >NOVEDADES</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {userRoles.some(role => role.Id_Modulo === 2.1) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Mis Novedades');
                                                }} className={selectModule === 'Mis Novedades' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <NoteAddRoundedIcon fontSize='small' className={selectModule === 'Mis Novedades' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Mis Novedades' ? `title-submodules` : 'title-submodulesBefore'}>Mis Novedades</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 2.12) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Mis Novedades Staff');
                                                }} className={selectModule === 'Mis Novedades Staff' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <NoteAddRoundedIcon fontSize='small' className={selectModule === 'Mis Novedades Staff' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Mis Novedades Staff' ? `title-submodules` : 'title-submodulesBefore'}>Mis Novedades Staff</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 2.11) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Novedades Mi Equipo Staff');
                                                }} className={selectModule === 'Novedades Mi Equipo Staff' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <NoteAddRoundedIcon fontSize='small' className={selectModule === 'Novedades Mi Equipo Staff' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Novedades Mi Equipo Staff' ? `title-submodules` : 'title-submodulesBefore'}>Mi Equipo Staff</div>
                                                </StyledListItemButton>
                                            )}



                                            {userRoles.some(role => role.Id_Modulo === 2.2) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Solicitudes Mi Equipo');
                                                }} className={selectModule === 'Solicitudes Mi Equipo' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <Diversity3RoundedIcon fontSize='small' className={selectModule === 'Solicitudes Mi Equipo' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Solicitudes Mi Equipo' ? `title-submodules` : 'title-submodulesBefore'}>Mi Equipo</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 2.4) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Solicitudes Manager');
                                                }} className={selectModule === 'Solicitudes Manager' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <PsychologyRoundedIcon fontSize='small' className={selectModule === 'Solicitudes Manager' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Solicitudes Manager' ? `title-submodules` : 'title-submodulesBefore'}>Solicitudes Manager</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 2.3) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Solicitudes WFM');
                                                }} className={selectModule === 'Solicitudes WFM' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <ManageAccountsRoundedIcon fontSize='small' className={selectModule === 'Solicitudes WFM' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Solicitudes WFM' ? `title-submodules` : 'title-submodulesBefore'}>Solicitudes WFM</div>
                                                </StyledListItemButton>
                                            )}


                                            {userRoles.some(role => role.Id_Modulo === 2.5) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Solicitudes Nomina');
                                                }} className={selectModule === 'Solicitudes Nomina' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <AttachMoneyRoundedIcon fontSize='small' className={selectModule === 'Solicitudes Nomina' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Solicitudes Nomina' ? `title-submodules` : 'title-submodulesBefore'}>Solicitudes Nomina</div>
                                                </StyledListItemButton>
                                            )}





                                            {userRoles.some(role => role.Id_Modulo === 2.6) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Horas Extras');
                                                }} className={selectModule === 'Horas Extras' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <ScheduleSendRoundedIcon fontSize='small' className={selectModule === 'Horas Extras' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Horas Extras' ? `title-submodules` : 'title-submodulesBefore'}>Horas Extras</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 2.7) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Horas Extras GTR');
                                                }} className={selectModule === 'Horas Extras GTR' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <MoreTimeRoundedIcon fontSize='small' className={selectModule === 'Horas Extras GTR' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Horas Extras GTR' ? `title-submodules` : 'title-submodulesBefore'}>Solicitud Horas Extras GTR</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 2.8) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Horas Extras Mi Equipo');
                                                }} className={selectModule === 'Horas Extras Mi Equipo' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <MoreTimeRoundedIcon fontSize='small' className={selectModule === 'Horas Extras Mi Equipo' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Horas Extras Mi Equipo' ? `title-submodules` : 'title-submodulesBefore'}>Horas Extras Mi Equipo</div>
                                                </StyledListItemButton>
                                            )}

                                            {userRoles.some(role => role.Id_Modulo === 2.9) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Asignacion Horas Extras');
                                                }} className={selectModule === 'Asignacion Horas Extras' ? `selectModule` : ''} >
                                                    <ListItemIcon>
                                                        <AutoModeRoundedIcon fontSize='small' className={selectModule === 'Asignacion Horas Extras' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Asignacion Horas Extras' ? `title-submodules` : 'title-submodulesBefore'}>Asignacion Horas Extras</div>
                                                </StyledListItemButton>
                                            )}


                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/* Maestro */}
                            {userRoles.some(role => role.Id_Modulo === 3) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <FileDownloadRoundedIcon fontSize='small' className={selectModule === 'Maestro' ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos' >MAESTRO</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <StyledListItemButton onClick={() => {
                                                handleComponentSelect('Maestro');
                                            }} className={selectModule === 'Maestro' ? `selectModule` : ''}>
                                                <ListItemIcon>
                                                    <DownloadRoundedIcon fontSize='small' className={selectModule === 'Maestro' ? `selectModuleIcon` : ''} />
                                                </ListItemIcon>
                                                <div className={selectModule === 'Maestro' ? `title-submodules` : 'title-submodulesBefore'}>Exportables</div>
                                            </StyledListItemButton>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/* logs */}
                            {userRoles.some(role => role.Id_Modulo === 4) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <ContentPasteSearchRoundedIcon fontSize='small' className={selectModule === 'Logs' ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos' >LOGS</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {userRoles.some(role => role.Id_Modulo === 4.1) && (

                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Logs');

                                                }} className={selectModule === 'Logs' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <ContentPasteSearchRoundedIcon fontSize='small' className={selectModule === 'Logs' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Logs' ? `title-submodules` : 'title-submodulesBefore'}>Logs</div>
                                                </StyledListItemButton>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/*NÓMINA*/}
                            {userRoles.some(role => role.Id_Modulo === 5) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <AttachMoneyRoundedIcon fontSize='small' className={
                                                selectModule === 'Mi Nómina' ||
                                                    selectModule === 'Cortes Nomina' ||
                                                    selectModule === 'Tardiness' ||
                                                    selectModule === 'Tardiness My Group' ||
                                                    selectModule === 'Tardiness Formacion' ||
                                                    selectModule === 'Tardiness GTR' ||
                                                    selectModule === 'Tardiness WFM' ||
                                                    selectModule === 'Tardiness My Group Staff' ||
                                                    selectModule === 'Tardiness Nomina' ? 'selectModule' : ''}
                                            />
                                        </div>
                                        <div className='title-modulos'>NÓMINA</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <List>
                                                {userRoles.some(role => role.Id_Modulo === 5.1) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Mi Nómina');
                                                    }} className={selectModule === 'Mi Nómina' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AttachMoneyRoundedIcon fontSize='small' className={selectModule === 'Mi Nómina' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Mi Nómina' ? `title-submodules` : 'title-submodulesBefore'}>Mis Horas Nómina</div>
                                                    </StyledListItemButton>
                                                )}

                                                {userRoles.some(role => role.Id_Modulo === 5.1) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Cortes Nomina');
                                                    }} className={selectModule === 'Cortes Nomina' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AttachMoneyRoundedIcon fontSize='small' className={selectModule === 'Cortes Nomina' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Cortes Nomina' ? `title-submodules` : 'title-submodulesBefore'}>Cortes Nomina</div>
                                                    </StyledListItemButton>
                                                )}

                                                {userRoles.some(role => role.Id_Modulo === 5.2) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness');
                                                    }} className={selectModule === 'Tardiness' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AccessTimeRoundedIcon fontSize='small' className={selectModule === 'Tardiness' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness' ? `title-submodules` : 'title-submodulesBefore'}>Reportes</div>
                                                    </StyledListItemButton>
                                                )}

                                                {userRoles.some(role => role.Id_Modulo === 5.9) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness Staff');
                                                    }} className={selectModule === 'Tardiness Staff' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AccessTimeRoundedIcon fontSize='small' className={selectModule === 'Tardiness Staff' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness Staff' ? `title-submodules` : 'title-submodulesBefore'}>Reportes Staff</div>
                                                    </StyledListItemButton>
                                                )}

                                                {userRoles.some(role => role.Id_Modulo === 5.3) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness My Group');
                                                    }} className={selectModule === 'Tardiness My Group' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <GroupsRoundedIcon fontSize='small' className={selectModule === 'Tardiness My Group' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness My Group' ? `title-submodules` : 'title-submodulesBefore'}>Reportes Mi Equipo</div>
                                                    </StyledListItemButton>
                                                )}

                                                {userRoles.some(role => role.Id_Modulo === 5.8) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness My Group Staff');
                                                    }} className={selectModule === 'Tardiness My Group Staff' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <GroupsRoundedIcon fontSize='small' className={selectModule === 'Tardiness My Group Staff' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness My Group Staff' ? `title-submodules` : 'title-submodulesBefore'}>Reportes Mi Equipo Staff</div>
                                                    </StyledListItemButton>
                                                )}

                                                {userRoles.some(role => role.Id_Modulo === 5.4) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness Formacion');
                                                    }} className={selectModule === 'Tardiness Formacion' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AccessTimeRoundedIcon fontSize='small' className={selectModule === 'Tardiness Formacion' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness Formacion' ? `title-submodules` : 'title-submodulesBefore'}>Reportes Formacion</div>
                                                    </StyledListItemButton>
                                                )}
                                                {userRoles.some(role => role.Id_Modulo === 5.5) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness WFM');
                                                    }} className={selectModule === 'Tardiness WFM' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AccessTimeRoundedIcon fontSize='small' className={selectModule === 'Tardiness WFM' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness WFM' ? `title-submodules` : 'title-submodulesBefore'}>Reportes WFM</div>
                                                    </StyledListItemButton>
                                                )}
                                                {userRoles.some(role => role.Id_Modulo === 5.6) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness GTR');
                                                    }} className={selectModule === 'Tardiness GTR' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <AccessTimeRoundedIcon fontSize='small' className={selectModule === 'Tardiness GTR' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness GTR' ? `title-submodules` : 'title-submodulesBefore'}>Reportes GTR</div>
                                                    </StyledListItemButton>
                                                )}
                                                {userRoles.some(role => role.Id_Modulo === 5.7) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Tardiness Nomina');
                                                    }} className={selectModule === 'Tardiness Nomina' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <RequestQuoteRoundedIcon fontSize='small' className={selectModule === 'Tardiness Nomina' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Tardiness Nomina' ? `title-submodules` : 'title-submodulesBefore'}>Reportes Nómina</div>
                                                    </StyledListItemButton>
                                                )}
                                            </List>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/*CAMPAÑAS */}
                            {userRoles.some(role => role.Id_Modulo === 6) && (
                                <Accordion >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style '>
                                            <RocketLaunchRoundedIcon fontSize='small' className={selectModule === 'Paises' ||
                                                selectModule === 'Departamentos' || selectModule === 'Ciudades' || selectModule === 'Sedes'
                                                || selectModule === 'Sistemas De Gestión' || selectModule === 'Tipos De Servicio' ||
                                                selectModule === 'Canal De Atención' || selectModule === 'Sectores Cliente' ||
                                                selectModule === 'Home Jerarquías' || selectModule === 'Cear Jerarquía' ||
                                                selectModule === 'Home Operaciones' || selectModule === 'Crear Operación' ||
                                                selectModule === 'Operaciones Por Cliente' ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos' >CAMPAÑA</div>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        {/* UBICACIONES */}
                                        {userRoles.some(role => role.Id_Modulo === 6.1) && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                                    <div className='AccordionSummary-style-modules'>
                                                        <PlaceRoundedIcon fontSize='small' className={selectModule === 'Paises' || selectModule === 'Departamentos' || selectModule === 'Ciudades' || selectModule === 'Sedes' ? 'selectModule' : ''} />
                                                    </div>
                                                    <div className='title-modulos' >UBICACIONES</div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {userRoles.some(role => role.Id_Modulo === 6.11) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Paises');

                                                            }}
                                                                className={selectModule === 'Paises' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <PublicRoundedIcon fontSize='small' className={selectModule === 'Paises' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Paises' ? `title-submodules` : 'title-submodulesBefore'}>Paises</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.12) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Departamentos');

                                                            }} className={selectModule === 'Departamentos' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <LanguageRoundedIcon fontSize='small' className={selectModule === 'Departamentos' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Departamentos' ? `title-submodules` : 'title-submodulesBefore'}>Departamentos</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.13) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Ciudades');

                                                            }} className={selectModule === 'Ciudades' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <MapsHomeWorkRoundedIcon fontSize='small' className={selectModule === 'Ciudades' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Ciudades' ? `title-submodules` : 'title-submodulesBefore'}>Ciudades</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.14) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Sedes');

                                                            }} className={selectModule === 'Sedes' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <DomainAddRoundedIcon fontSize='small' className={selectModule === 'Sedes' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Sedes' ? `title-submodules` : 'title-submodulesBefore'}>Sedes</div>
                                                            </StyledListItemButton>
                                                        )}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                        {/* PARAMETROS */}
                                        {userRoles.some(role => role.Id_Modulo === 6.2) && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                                    <div className='AccordionSummary-style-modules'>
                                                        <TuneRoundedIcon fontSize='small' className={selectModule === 'Sistemas De Gestión' || selectModule === 'Tipos De Servicio' || selectModule === 'Canal De Atención' || selectModule === 'Sectores Cliente' ? 'selectModule' : ''} />
                                                    </div>
                                                    <div className='title-modulos' >PARAMETROS</div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {userRoles.some(role => role.Id_Modulo === 6.21) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Sistemas De Gestión');

                                                            }}
                                                                className={selectModule === 'Sistemas De Gestión' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <PrecisionManufacturingRoundedIcon fontSize='small' className={selectModule === 'Sistemas De Gestión' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Sistemas De Gestión' ? `title-submodules` : 'title-submodulesBefore'}>Sistemas De Gestión</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.22) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Tipos De Servicio');

                                                            }} className={selectModule === 'Tipos De Servicio' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <MiscellaneousServicesRoundedIcon fontSize='small' className={selectModule === 'Tipos De Servicio' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Tipos De Servicio' ? `title-submodules` : 'title-submodulesBefore'}>Tipos De Servicio</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.23) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Canal De Atención');

                                                            }} className={selectModule === 'Canal De Atención' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <ContactPhoneRoundedIcon fontSize='small' className={selectModule === 'Canal De Atención' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Canal De Atención' ? `title-submodules` : 'title-submodulesBefore'}>Canal De Atención</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.24) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Sectores Cliente');

                                                            }} className={selectModule === 'Sectores Cliente' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <LanRoundedIcon fontSize='small' className={selectModule === 'Sectores Cliente' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Sectores Cliente' ? `title-submodules` : 'title-submodulesBefore'}>Sectores Cliente</div>
                                                            </StyledListItemButton>
                                                        )}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                        {/* JERARQUÍAS */}
                                        {userRoles.some(role => role.Id_Modulo === 6.4) && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                                    <div className='AccordionSummary-style-modules'>
                                                        <AccountTreeIcon fontSize='small' className={selectModule === 'Home Jerarquias' || selectModule === 'Crear Jerarquias' ? 'selectModule' : ''} />
                                                    </div>
                                                    <div className='title-modulos' >JERARQUÍAS</div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {userRoles.some(role => role.Id_Modulo === 6.41) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Home Jerarquías');
                                                                // handleLogs('WFM', 'campaña - OPERACIONES - Home Operaciones'); 
                                                            }}
                                                                className={selectModule === 'Home Jerarquías' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <AccountTreeIcon fontSize='small' className={selectModule === 'Home Jerarquías' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Home Jerarquías' ? `title-submodules` : 'title-submodulesBefore'}>Home Jerarquías</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.42) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Crear Jerarquía');
                                                                // handleLogs('WFM', 'CAMPAÑA - OPERACIONES - Crear Operación); 
                                                            }} className={selectModule === 'Crear Jerarquía' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <AddIcon fontSize='small' className={selectModule === 'Crear Jerarquía' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Crear Jerarquía' ? `title-submodules` : 'title-submodulesBefore'}>Crear Jerarquía</div>
                                                            </StyledListItemButton>
                                                        )}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                        {/* OPERACIONES */}
                                        {userRoles.some(role => role.Id_Modulo === 6.3) && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                                    <div className='AccordionSummary-style-modules'>
                                                        <BuildRoundedIcon fontSize='small' className={selectModule === 'Home Operaciones' || selectModule === 'Crear Operación' || selectModule === 'Operaciones Por Cliente' ? 'selectModule' : ''} />
                                                    </div>
                                                    <div className='title-modulos' >OPERACIONES</div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {userRoles.some(role => role.Id_Modulo === 6.31) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Home Operaciones');

                                                            }}
                                                                className={selectModule === 'Home Operaciones' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <PsychologyRoundedIcon fontSize='small' className={selectModule === 'Home Operaciones' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Home Operaciones' ? `title-submodules` : 'title-submodulesBefore'}>Home Operaciones</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.32) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Crear Operación');

                                                            }} className={selectModule === 'Crear Operación' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <GroupAddRoundedIcon fontSize='small' className={selectModule === 'Crear Operación' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Crear Operación' ? `title-submodules` : 'title-submodulesBefore'}>Crear Operación</div>
                                                            </StyledListItemButton>
                                                        )}

                                                        {userRoles.some(role => role.Id_Modulo === 6.33) && (
                                                            <StyledListItemButton onClick={() => {
                                                                handleComponentSelect('Operaciones Por Cliente');

                                                            }} className={selectModule === 'Operaciones Por Cliente' ? `selectModule` : ''}>
                                                                <ListItemIcon>
                                                                    <ReduceCapacityRoundedIcon fontSize='small' className={selectModule === 'Operaciones Por Cliente' ? `selectModuleIcon` : ''} />
                                                                </ListItemIcon>
                                                                <div className={selectModule === 'Operaciones Por Cliente' ? `title-submodules` : 'title-submodulesBefore'}>Operaciones Por Cliente</div>
                                                            </StyledListItemButton>
                                                        )}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}

                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/*CAPACIDAD*/}
                            {userRoles.some(role => role.Id_Modulo === 7) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <ReduceCapacityIcon fontSize='small' className={
                                                selectModule === 'Plan De Capacidad' ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos'>CAPACIDAD</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <List>
                                                {userRoles.some(role => role.Id_Modulo === 7.1) && (
                                                    <StyledListItemButton onClick={() => {
                                                        handleComponentSelect('Plan De Capacidad');
                                                    }} className={selectModule === 'Plan De Capacidad' ? `selectModule` : ''}>
                                                        <ListItemIcon>
                                                            <ReduceCapacityIcon fontSize='small' className={selectModule === 'Plan De Capacidad' ? `selectModuleIcon` : ''} />
                                                        </ListItemIcon>
                                                        <div className={selectModule === 'Plan De Capacidad' ? `title-submodules` : 'title-submodulesBefore'}>Planeación LP</div>
                                                    </StyledListItemButton>
                                                )}
                                            </List>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {/*KPI*/}
                            {userRoles.some(role => role.Id_Modulo === 10.0) && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                        <div className='AccordionSummary-style-modules'>
                                            <BrandAsanaIcon fontSize='small' className={
                                                selectModule === 'KPI' || selectModule === 'GestionKPI' || selectModule === 'Asignacion KPIs' || selectModule === 'Gestion Metas' || selectModule === 'Gestion Resultados'
                                                    ? 'selectModule' : ''} />
                                        </div>
                                        <div className='title-modulos'>KPI</div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {userRoles.some(role => role.Id_Modulo === 10.1) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('KPI');
                                                }} className={selectModule === 'KPI' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <BarChartLine fontSize='small' className={selectModule === 'KPI' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'KPI' ? `title-submodules` : 'title-submodulesBefore'}>Indicadores de Gestión</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 10.2) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('GestionKPI');
                                                }} className={selectModule === 'GestionKPI' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <Approval selectModule={selectModule} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'GestionKPI' ? `title-submodules` : 'title-submodulesBefore'}>Visualización de KPIs</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 10.3) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Asignacion KPIs');

                                                }} className={selectModule === 'Asignacion KPIs' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <AddKPI fontSize='small' className={selectModule === 'Asignacion KPIs' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Asignacion KPIs' ? `title-submodules` : 'title-submodulesBefore'}>Asignación de KPIs</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 10.4) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Gestion Metas');

                                                }} className={selectModule === 'Gestion Metas' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <Goal2 fontSize='small' className={selectModule === 'Gestion Metas' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Gestion Metas' ? `title-submodules` : 'title-submodulesBefore'}>Gestión de Metas</div>
                                                </StyledListItemButton>
                                            )}
                                            {userRoles.some(role => role.Id_Modulo === 10.5) && (
                                                <StyledListItemButton onClick={() => {
                                                    handleComponentSelect('Gestion Resultados');

                                                }} className={selectModule === 'Gestion Resultados' ? `selectModule` : ''}>
                                                    <ListItemIcon>
                                                        <ArrowGoal fontSize='small' className={selectModule === 'Gestion Resultados' ? `selectModuleIcon` : ''} />
                                                    </ListItemIcon>
                                                    <div className={selectModule === 'Gestion Resultados' ? `title-submodules` : 'title-submodulesBefore'}>Gestión de Resultados</div>
                                                </StyledListItemButton>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </AccordionDetails>
                    </Accordion>

                    {/* Módulo Adminitrador */}
                    {userRoles.some(role => role.Id_Modulo === 0.0) && (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize='small' />}>
                                <div className='AccordionSummary-style'>
                                    <AdminPanelSettingsRoundedIcon fontSize='small' className={selectModule === 'Permisos' ? 'selectModule' : ''} />
                                </div>
                                <div className='title-modulos' >ADMINISTRADOR</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {userRoles.some(role => role.Id_Modulo === 0.1) && (
                                        <StyledListItemButton onClick={() => {
                                            handleComponentSelect('Permisos');

                                        }} className={selectModule === 'Permisos' ? `selectModule` : ''}>
                                            <ListItemIcon>
                                                <VpnKeyRoundedIcon fontSize='small' className={selectModule === 'Permisos' ? `selectModuleIcon` : ''} />
                                            </ListItemIcon>
                                            <div className={selectModule === 'Permisos' ? `title-submodules` : 'title-submodulesBefore'}>Permisos</div>
                                        </StyledListItemButton>
                                    )}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </List >
            </div >
        </>
    )
}

export default DrawerComponents