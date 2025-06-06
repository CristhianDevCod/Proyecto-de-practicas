import React from 'react'

const Header = ({ Card, CardContent, HourglassFullRoundedIcon, hourExtraPending, Divider, CheckRoundedIcon, hourExtraAccepts, CloseRoundedIcon, hourExtraRejects, loading, CircularProgress }) => {
    return (
        <>
            <Card className='mb-2'>
                <div className='container-title-itercambio'>
                    <div className='text-muted title-intercambio'>Horas extras</div>
                </div>
                <CardContent sx={{ display: 'flex' }}>
                    {/* en curso */}
                    <div className='d-flex border-light container-curso'>
                        <div className='container-icon'>
                            <HourglassFullRoundedIcon fontSize='large' className='color-icon-curso' />
                        </div>
                        <div className='p-1' style={{ marginLeft: '5%' }}>
                            <div className='text-muted-titles'>En curso:</div>
                            {loading ? (<CircularProgress variant='indeterminate' color='primary' size={10} />) : (hourExtraPending && (<div className='text-muted-lenght'>{hourExtraPending.length}</div>))}
                        </div>
                    </div>
                    <Divider orientation='vertical' flexItem />
                    {/* Aprobados  */}
                    <div className='d-flex border-light container-aprobados'>
                        <div className='container-icon-aprobados'>
                            <CheckRoundedIcon fontSize='large' className='color-icon-accepts' />
                        </div>
                        <div className='p-1' style={{ marginLeft: '5%' }}>
                            <div className='text-muted-titles'>Aprobados:</div>
                            {loading ? (<CircularProgress variant='indeterminate' color='primary' size={10} />) : (hourExtraAccepts && (<div className='text-muted-lenght'>{hourExtraAccepts.length}</div>))}
                        </div>
                    </div>
                    <Divider orientation='vertical' flexItem />
                    {/* Rechazados */}
                    <div className='d-flex border-light container-rechazados'>
                        <div className='container-icon-rechazados'>
                            <CloseRoundedIcon fontSize='large' className='color-icon-reject' />
                        </div>
                        <div className='p-1' style={{ marginLeft: '5%' }}>
                            <div className='text-muted-titles'>Rechazados:</div>
                            {loading ? (<CircularProgress variant='indeterminate' color='primary' size={10} />) : (hourExtraRejects && (<div className='text-muted-lenght'>{hourExtraRejects.length}</div>))}
                        </div>
                    </div>

                </CardContent>
            </Card>

        </>
    )
}

export default Header;