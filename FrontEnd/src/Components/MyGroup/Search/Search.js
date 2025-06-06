import React from 'react'

const Search = ({ searchTerm, setSearchTerm, handleResetWeek, HandleBackWeek, currentWeekIndex, handleNextWeek, Tooltip, HomeRoundedIcon, ArrowRightRoundedIcon, ArrowLeftRoundedIcon, Button }) => {
    return (
        <>
            <div className='d-flex align-items-center'>
                <div className='p-2 flex-grow-1 title-Export'>
                    <input type='search' className='form-control' placeholder='Buscar' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className='p-2'>
                    <Tooltip title="Semana anterior">
                        <span>
                            <Button variant='soft' color='primary' size='sm' onClick={HandleBackWeek} disabled={currentWeekIndex === -1}><ArrowLeftRoundedIcon fontSize='medium' /></Button>
                        </span>
                    </Tooltip>
                </div>
                <div className='p-2 '>
                    <Tooltip title='Semana actual'>
                        <span>
                            <Button variant='soft' color='primary' size='sm' onClick={handleResetWeek} disabled={currentWeekIndex === 0}><HomeRoundedIcon fontSize='medium' /></Button>
                        </span>
                    </Tooltip>
                </div>
                <div className='p-2 '>
                    <Tooltip title='Semana posterior'>
                        <span>
                            <Button variant='soft' color='primary' size='sm' onClick={handleNextWeek} disabled={currentWeekIndex === 1}><ArrowRightRoundedIcon fontSize='medium' /></Button>
                        </span>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default Search