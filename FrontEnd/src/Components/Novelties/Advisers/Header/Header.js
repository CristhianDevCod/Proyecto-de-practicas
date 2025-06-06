import React from 'react'

const Header = ({
    Grid,
    Item,
    Box,
    Card,
    loading,
    CardContent,
    ItemContentCards,
    CheckRoundedIcon,
    CloseRoundedIcon,
    nolveltiePending,
    nolveltieAccepts,
    nolveltieRejects,
    HourglassFullRoundedIcon,
}) => {
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <div className='mb-5'>
                    <Item elevation={5}>
                        <div className='title-mis-novedades'>Mis Novedades</div>
                    </Item>

                </div>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: '5%', marginBottom: '4%' }}>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>
                            <ItemContentCards sx={{ top: -40, left: 20, zIndex: 1, width: 60, height: 60, border: '5px solid #ffffff8c', display: 'flex', bgcolor: '#f9d2b3', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                <HourglassFullRoundedIcon color='warning' />
                            </ItemContentCards>
                            <Card sx={{ bgcolor: '#dec6b26e', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <div className='spinner-border text-warning' role='status' />
                                        ) : (
                                            <div style={{ color: '#ed6c02', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Pendientes: {nolveltiePending && nolveltiePending ? (nolveltiePending.length) : `0`}
                                            </div>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>
                            <ItemContentCards sx={{ top: -40, left: 20, zIndex: 1, width: 60, height: 60, border: '5px solid #ffffff8c', display: 'flex', bgcolor: '#c0d8c1', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckRoundedIcon color='success' />
                            </ItemContentCards>
                            <Card sx={{ bgcolor: '#c0d8c16b', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <div className='spinner-border text-success' role='status' />
                                        ) : (
                                            <div style={{ color: '#2e7d32', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Aceptados: {nolveltieAccepts && nolveltieAccepts ? (nolveltieAccepts.length) : `0`}
                                            </div>

                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Box position='relative' width='100%'>
                            <ItemContentCards sx={{ top: -40, left: 20, zIndex: 1, width: 60, height: 60, border: '5px solid #ffffff8c', display: 'flex', bgcolor: '#e99797', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                <CloseRoundedIcon color='error' />
                            </ItemContentCards>
                            <Card sx={{ bgcolor: '#e9979764', borderRadius: '15px', boxShadow: 3 }}>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <div className='spinner-border text-danger' role='status' />
                                        ) : (
                                            <div style={{ color: '#d63d3d', fontWeight: 'bold', fontFamily: 'Nunito' }}>
                                                Rechazados: {nolveltieRejects && nolveltieRejects ? (nolveltieRejects.length) : `0`}
                                            </div>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default Header;