import React from 'react'

const Header = ({ HourglassFullRoundedIcon, CheckRoundedIcon, CloseRoundedIcon, nolveltiePending, nolveltieAccepts, nolveltieRejects, Grid, Item, Box }) => {
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <div className='mb-5'>
                    <Item elevation={10}>
                        <div className='title-mis-novedades'>Mis Novedades</div>
                    </Item>

                </div>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item elevation={3}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <HourglassFullRoundedIcon fontSize='large' className='color-icon-novletie-pending' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>En curso</div>
                                </div>
                                <div className='p-2'>
                                    <div>{nolveltiePending ? (<div className='text-center metas-sp-lenght'>{nolveltiePending.length}</div>) : <div className='text-center metas-sp-lenght'>0</div>}</div>
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    <Grid item xs={4}>
                        <Item elevation={3}>
                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <CheckRoundedIcon fontSize='large' className='color-icon-novletie-accepts' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Aprobados</div>
                                </div>
                                <div className='p-2'>
                                    <div>{nolveltieAccepts ? (<div className='text-center metas-sp-lenght'>{nolveltieAccepts.length}</div>) : <div className='text-center metas-sp-lenght'>0</div>}</div>
                                </div>
                            </div>
                        </Item>
                    </Grid>

                    <Grid item xs={4}>
                        <Item elevation={3}>

                            <div className='d-flex justify-content-between'>
                                <div className='p-2'>
                                    <CloseRoundedIcon fontSize='large' className='color-icon-novletie-rejects' />
                                </div>
                                <div className='p-2 d-flex align-items-center'>
                                    <div className='text-muted-titles'>Rechazados</div>
                                </div>
                                <div className='p-2'>
                                    <div>{nolveltieRejects ? (<div className='text-center metas-sp-lenght'>{nolveltieRejects.length}</div>) : <div className='text-center metas-sp-lenght'>0</div>}</div>
                                </div>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default Header