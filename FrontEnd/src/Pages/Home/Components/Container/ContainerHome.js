import React from 'react';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import AllNotifications from '../Notifications/AllNotifications';

const ContainerHome = ({ Box, AppBar, drawerWidth, Toolbar, IconButton, handleDrawerToggle, MenuIcon, ExpSession, LogOut, Feeling, container, mobileOpen, Drawer, drawer, Outlet, renderComponent, CssBaseline, Survey, ImgEveryDay, NotificationRecived, handleComponentSelect, userRoles, ExtraWork }) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    className='appBar'
                    position='fixed'
                    sx={{
                        background: '#ffffff',
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: '#435573' }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <div className='p-2'>
                            <ExpSession />
                            <Breadcrumbs aria-label='breadcrumb'>
                                <Link
                                    underline='hover'
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color='inherit'
                                    href='/home'
                                >
                                    <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize='small' />
                                    Home
                                </Link>
                            </Breadcrumbs>
                        </div>
                        <Box sx={{ flexGrow: 1 }} />
                        <div className='d-flex justify-content-end'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <div className='p-2'>
                                <AllNotifications userRoles={userRoles} handleComponentSelect={handleComponentSelect} />
                            </div>
                            <div className='p-2'>
                                <NotificationRecived />
                            </div>
                            <div className='p-2'>
                                <LogOut />
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Feeling />
                <Survey />
                <ImgEveryDay />
                <ExtraWork />
                <Box
                    component='nav'
                    className='drawer-Bar'
                    sx={{ width: { sm: drawerWidth, }, flexShrink: { sm: 0 } }}
                    aria-label='mailbox folders'
                >
                    <Drawer
                        container={container}
                        variant='temporary'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant='permanent'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: '0px solid #e9e9ee', boxShadow: '3px 1px 2px #e9e9ee' },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component='main'
                    className='scroll-container-home'
                    sx={{
                        flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },
                        backgroundColor: '#fafafb',
                        // backgroundColor: '#f0f6ff',
                        height: '100vh'
                    }}
                >
                    <Toolbar />
                    <Outlet />
                    {renderComponent()}
                </Box>
            </Box>
        </>
    )
}

export default ContainerHome