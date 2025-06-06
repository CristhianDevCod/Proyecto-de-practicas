import React from 'react'

const Headers = ({ HourglassFullRoundedIcon, conbinedChangesPending, CheckRoundedIcon, conbinedChangesAccept, CloseRoundedIcon, conbinedChangesReject, Card, CardContent, Divider, loading, CircularProgress }) => {
    return (
        <>
            <Card className='mb-2'>
                <div className='container-title-itercambio'>
                    <div className='text-muted title-intercambio'>Intercambios de turnos</div>
                </div>
                <CardContent sx={{ display: 'flex' }}>
                    {/* en curso */}
                    <div className='d-flex border-light container-curso'>
                        <div className='container-icon'>
                            <HourglassFullRoundedIcon fontSize='large' className='color-icon-curso' />
                        </div>
                        <div className='p-1' style={{ marginLeft: '5%' }}>
                            <div className='text-muted-titles'>En curso:</div>
                            {loading ? (<CircularProgress variant='indeterminate' color='primary' size={10} />) : (
                                conbinedChangesPending && (<div className='text-muted-lenght'>{conbinedChangesPending.length}</div>)
                            )}
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
                            {loading ? (<CircularProgress variant='indeterminate' color='primary' size={10} />) : (conbinedChangesAccept && (<div className='text-muted-lenght'>{conbinedChangesAccept.length}</div>))}
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
                            {loading ? (<CircularProgress variant='indeterminate' color='primary' size={10} />) : (conbinedChangesReject && (<div className='text-muted-lenght'>{conbinedChangesReject.length}</div>))}
                        </div>
                    </div>

                </CardContent>
            </Card>


        </>
    )
}

export default Headers