import React, { useState, useEffect } from 'react';
import { TextField, Paper } from '@mui/material';
import { AddCircleOutlineRounded as AddCircleOutlineRoundedIcon, EditRounded as EditRoundedIcon } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Service from '../../Machine/Service';
import JerarquiaForm from './JerarquiaForm';
import apiClient from '../../Service/Service';

import { CustomNoRowsOverlay, StyledDataGrid, ItemContent, PAGE_SIZE, CustomPagination } from '../../Components/StyleCampaignJS/StylePaises';
import { esES } from '@mui/x-data-grid';

const JerarquiaTable = () => {
  const { Servidor } = Service();
  const [jerarquias, setJerarquias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectDetails, setSelectDetails] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModalEdit = (id) => {
    setSelectDetails(id);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectDetails(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJerarquias = Array.isArray(jerarquias)
    ? jerarquias.filter((id) =>
      (id.nombre || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : [];

  const columns = [
    { field: 'id_jerarquia', headerName: 'ID', flex: 1 },
    { field: 'area', headerName: 'Área', flex: 2 },
    { field: 'roles', headerName: 'Roles', flex: 3, valueGetter: (params) => params.value.join(', ') },
    { field: 'empleados', headerName: 'Empleados', flex: 4, valueGetter: (params) => params.value.join(', ') },
    {
      field: 'Detalles',
      headerName: 'Detalles',
      flex: 1,
      renderCell: (params) => (
        <Button
          size="sm"
          color="primary"
          variant="soft"
          onClick={() => handleOpenModalEdit(params.row)}
        >
          <EditRoundedIcon fontSize="small" />
        </Button>
      ),
    },
  ];

  return (
    <Paper>
      <ItemContent className="card border-light">
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='p-2' style={{ width: '250px' }}>
              <TextField
                size='small'
                type='search'
                label='Buscar...'
                variant='outlined'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className='p-2'>
              <Button variant='soft' size='sm' color='success' onClick={handleOpenModal}>
                <AddCircleOutlineRoundedIcon fontSize='medium' color='success' className='m-1' />
                Nueva Jerarquía
              </Button>
            </div>
          </div>

          <div className='p-2'></div>

          <div style={{ width: '100%' }}>
            <StyledDataGrid
              rowHeight={60}
              columns={columns}
              rows={filteredJerarquias}
              pageSizeOptions={[PAGE_SIZE]}
              paginationModel={paginationModel}
              getRowId={(data) => data.id_jerarquia}
              onPaginationModelChange={setPaginationModel}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
                pagination: CustomPagination,
              }}
            />
          </div>
        </div>
      </ItemContent>
      
      {/* Modal para crear la jerarquía */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            margin: '20px',
            maxWidth: '980px', // Ajusta el ancho máximo del modal
            maxHeight: '80vh', // Ajusta la altura máxima del modal
            overflowY: 'auto', // Agrega scroll si el contenido es extenso
            borderRadius: '8px',
          }}
        >
          <JerarquiaForm onClose={handleCloseModal} />
        </div>
      </Modal>

      {/* Modal para editar jerarquía */}
      <Modal
        open={openModalEdit}
        onClose={handleCloseModalEdit}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            margin: '20px',
            maxWidth: '800px', // Ajusta el ancho máximo del modal
            borderRadius: '8px',
          }}
        >
          {/* Aquí puedes colocar el componente de edición */}
        </div>
      </Modal>

    </Paper>
  );
};

export default JerarquiaTable;
