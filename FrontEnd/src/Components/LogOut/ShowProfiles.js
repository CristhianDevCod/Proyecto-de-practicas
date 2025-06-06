import React from 'react'

const ShowProfiles = ({ Modal, openModal, handleCancelProfile, perfil, Box, value, handleChange, StylesTabs, StyledTab, Avatar, randomImage1, randomImage2, randomImage3, randomImage4, randomImage5, randomImage6, randomImage7, randomImage8, randomImage9, a11yProps, TabPanel, IconButton, handleLeftScroll, imagesFile1, selectFashion, handleRightScroll, handleLeftScroll1, ArrowBackIosRoundedIcon, ArrowForwardIosRoundedIcon, imagesFile2, selectBeautiful, handleRightScroll1, handleLeftScroll2, imagesFile3, selectRandom, handleRightScroll2 }) => {
    return (
        <>
            <Modal
                className='modal-transparent-style'
                width='1150px'
                open={openModal}
                footer={null}
                onCancel={handleCancelProfile}
            >
                <div className='avatar-profile-views'>
                    {perfil && (
                        <Avatar
                            variant='rounded'
                            className='width-avatar'
                            sizes='large'
                            alt=''
                            src={Array.isArray(perfil) ? perfil[0] : perfil}
                        />
                    )}
                </div>

                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.paper',
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <StylesTabs
                        orientation='vertical'
                        variant='scrollable'
                        value={value}
                        onChange={handleChange}
                        aria-label='Vertical tabs example'
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <StyledTab
                            label={
                                <div className='card-container-icons-logout'>
                                    <div className='Title-Tabs-icons-logOut'>
                                        <div className='text-muted'>Fashion</div>
                                    </div>
                                </div>
                            }
                            icon={
                                <>
                                    <Avatar src={randomImage1} alt='' sizes='small' />
                                    <Avatar src={randomImage2} alt='' sizes='small' />
                                    <Avatar src={randomImage3} alt='' sizes='small' />
                                </>
                            }
                            iconPosition='end'
                            {...a11yProps(0)}
                        />
                        <StyledTab
                            label={
                                <div className='card-container-icons-logout'>
                                    <div className='Title-Tabs-icons-logOut'>
                                        <div className='text-muted'>Beautiful</div>
                                    </div>
                                </div>
                            }
                            icon={
                                <>
                                    <Avatar src={randomImage4} alt='' sizes='small' />
                                    <Avatar src={randomImage5} alt='' sizes='small' />
                                    <Avatar src={randomImage6} alt='' sizes='small' />
                                </>
                            }
                            iconPosition='end'
                            {...a11yProps(1)}
                        />
                        <StyledTab
                            label={
                                <div className='card-container-icons-logout'>
                                    <div className='Title-Tabs-icons-logOut'>
                                        <div className='text-muted'>Random</div>
                                    </div>
                                </div>
                            }
                            icon={
                                <>
                                    <Avatar src={randomImage7} alt='' sizes='small' />
                                    <Avatar src={randomImage8} alt='' sizes='small' />
                                    <Avatar src={randomImage9} alt='' sizes='small' />
                                </>
                            }
                            iconPosition='end'
                            {...a11yProps(2)}
                        />
                    </StylesTabs>

                    <TabPanel value={value} index={0}>
                        <div className='contained-button-imgs'>
                            <IconButton
                                className='scroll-btn right-btn'
                                color='primary'
                                aria-label='icons'
                                component='label'
                                onClick={handleLeftScroll}
                            >
                                <ArrowBackIosRoundedIcon />
                            </IconButton>
                            <div className='list-imgs' value='Pines1'>
                                <div className='scroll-container'>
                                    <div className='container-images-widths'>
                                        {imagesFile1.map((imagen, index) => (
                                            <img
                                                style={{ width: '100px', height: '100px' }}
                                                alt=''
                                                key={index}
                                                src={imagen}
                                                onClick={() => selectFashion(index)}
                                                className={imagen.seleccionado ? 'seleccionado' : ''}
                                            />
                                        ))}
                                    </div>

                                </div>
                            </div>
                            <IconButton
                                className='scroll-btn right-btn'
                                color='primary'
                                aria-label='icons'
                                component='label'
                                onClick={handleRightScroll}
                            >
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </div>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <div className='contained-button-imgs'>
                            <IconButton
                                className='scroll-btn right-btn'
                                color='primary'
                                aria-label='icons'
                                component='label'
                                onClick={handleLeftScroll1}
                            >
                                <ArrowBackIosRoundedIcon />
                            </IconButton>
                            <div className='list-imgs' value='Pines2'>
                                <div className='scroll-container'>
                                    <div className='container-images-widths'>
                                        {imagesFile2.map((imagen, index) => (
                                            <img
                                                style={{ width: '100px', height: '100px' }}
                                                alt=''
                                                key={index}
                                                src={imagen}
                                                onClick={() => selectBeautiful(index)}
                                                className={imagen.seleccionado ? 'seleccionado' : ''}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <IconButton
                                className='scroll-btn right-btn'
                                color='primary'
                                aria-label='icons'
                                component='label'
                                onClick={handleRightScroll1}
                            >
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </div>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <div className='contained-button-imgs'>
                            <IconButton
                                className='scroll-btn right-btn'
                                color='primary'
                                aria-label='icons'
                                component='label'
                                onClick={handleLeftScroll2}
                            >
                                <ArrowBackIosRoundedIcon />
                            </IconButton>
                            <div className='list-imgs' value='Pines3'>
                                <div className='scroll-container'>
                                    <div className='container-images-widths'>
                                        {imagesFile3.map((imagen, index) => (
                                            <img
                                                style={{ width: '100px', height: '100px' }}
                                                alt=''
                                                key={index}
                                                src={imagen}
                                                onClick={() => selectRandom(index)}
                                                className={imagen.seleccionado ? 'seleccionado' : ''}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <IconButton
                                className='scroll-btn right-btn'
                                color='primary'
                                aria-label='icons'
                                component='label'
                                onClick={handleRightScroll2}
                            >
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </div>
                    </TabPanel>
                </Box>
            </Modal>
        </>
    )
}

export default ShowProfiles