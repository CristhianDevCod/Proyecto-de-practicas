import React from 'react'

const HistoryRegisters = ({
    esES,
    Button,
    maxDate,
    Divider,
    loading,
    columns,
    TextField,
    PAGE_SIZE,
    searchQuery,
    filteredItemsHistory,
    selectedMonth,
    setSearchQuery,
    StyledDataGrid,
    paginationModel,
    isLoadingExport,
    CustomPagination,
    handleMonthChange,
    setPaginationModel,
    exportDataNovelties,
    CustomNoRowsOverlay,
    FileDownloadRoundedIcon,
    handleOpenModalGenerateNoveltie
}) => {

    const renderConditionsRows = (novelties) => {
        if (novelties.Estado_Marcado_Jefe_Inmediato === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Planeacion === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Gerente_Area === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Gestion_Humana === 'Rechazado') {
            return 'Rejected';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === '' && novelties.Estado_Marcado_Planeacion === '' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === '' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === '' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === '') {
            return 'PartiallyFilled';
        } else if (novelties.Estado_Marcado_Jefe_Inmediato === 'Aceptado' && novelties.Estado_Marcado_Planeacion === 'Aceptado' && novelties.Estado_Marcado_Gerente_Area === 'Aceptado' && novelties.Estado_Marcado_Gestion_Humana === 'Aceptado') {
            return 'Filled';
        } else {
            return 'PartiallyFilled';
        }
    }

    return (
        <div className=''>
            <div className='d-flex align-items-center'>
                <div className='flex-grow-1 modal-title text-muted mb-4'>
                </div>
                <div className='p-2'>
                    <TextField
                        fullWidth
                        size='small'
                        type='search'
                        label='Buscar'
                        variant='outlined'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Divider orientation='vertical' flexItem variant='middle' />
                <div className='p-2 d-flex'>
                    <input
                        name='Mes'
                        type='month'
                        max={maxDate}
                        id='seleccioneMes'
                        value={selectedMonth}
                        className='form-control'
                        onChange={handleMonthChange}
                    />
                </div>

                <div className='p-2'>
                    {isLoadingExport ? (
                        <Button loading variant='solid' size='sm' />
                    ) : (
                        <Button variant='soft' color='primary' size='sm' disabled={!selectedMonth} onClick={exportDataNovelties}><FileDownloadRoundedIcon fontSize='small' /></Button>
                    )}
                </div>
                <Divider orientation='vertical' flexItem variant='middle' />
                <div className='p-2'>
                    <Button variant='soft' color='primary' size='sm' onClick={handleOpenModalGenerateNoveltie}>Solicitar novedad agente</Button>
                </div>
            </div>
            {loading ? (CustomNoRowsOverlay()) : (
                <StyledDataGrid
                    rowHeight={40}
                    columns={columns}
                    rows={filteredItemsHistory}
                    pageSizeOptions={[PAGE_SIZE]}
                    paginationModel={paginationModel}
                    getRowId={(data) => data.Id}
                    onPaginationModelChange={setPaginationModel}
                    getRowClassName={(params) => `super-app-theme--${renderConditionsRows(params.row)}`}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                        pagination: CustomPagination
                    }}
                />

            )}
        </div>
    )
}

export default HistoryRegisters