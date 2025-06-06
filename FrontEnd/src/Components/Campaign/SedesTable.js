import React, { useEffect, useState } from 'react';
import { TextField, Paper } from '@mui/material';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Service from '../../Machine/Service';

import CreateSede from '../Pages/CreateSede';
import EditSede from '../Pages/EditSede/EditSede';
import { AddCircleOutlineRoundedIcon, EditRoundedIcon } from '../../Exports-Modules/Exports';

import { CustomNoRowsOverlay, StyledDataGrid, ItemContent, PAGE_SIZE, CustomPagination } from '../../Components/StyleCampaignJS/StyleDepartamentos';
import { esES } from '@mui/x-data-grid';
import apiClient from '../../Service/Service';

const SedesTable = () => {
  const { Servidor } = Service();
  const [sedes, setSedes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [selectedSede, setSelectedSede] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/sedes`);
        const data = await response.data;
        setSedes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching sedes:', error);
      }
    };

    fetchSedes();
    
    const intervalId = setInterval(() => {
      fetchSedes();
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [Servidor]);
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

  const handleOpenModalEdit = (sede) => {
    setSelectedSede(sede);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectedSede(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSedes = Array.isArray(sedes)
    ? sedes.filter((sede) =>
      (sede.nombre_sede || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const columns = [
    { field: 'id_sede', headerName: 'ID', flex: 1 },
    { field: 'nombre_sede', headerName: 'Nombre de la Sede', flex: 1 },
    {
      field: 'estado_sede',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        const estadoValor = Number(params.row.estado_sede);
        const estado = estadoValor === 1 ? 'Activo' : 'Inactivo';
        const color = estadoValor === 1 ? 'green' : 'red';
        return (
          <span style={{ color: color, fontWeight: 'initial', fontSize: '15px' }}>
            {estado}
          </span>
        );
      },
    },
    { field: 'nombre_ciudad', headerName: 'Ciudad', flex: 1 },
    {
      field: 'Acción',
      headerName: 'Acción',
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
              <Button variant='soft' size='sm' color='success' onClick={handleOpenModalCreate}>
                <AddCircleOutlineRoundedIcon fontSize='medium' color='success' className='m-1' />
                Nueva Sede
              </Button>
            </div>
          </div>

          <div className='p-2'></div>

          <div style={{ width: '100%' }}>
            <StyledDataGrid
              rowHeight={60}
              columns={columns}
              rows={filteredSedes}
              pageSizeOptions={[PAGE_SIZE]}
              paginationModel={paginationModel}
              getRowId={(data) => data.id_sede}
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

      <Modal
        open={openModalCreate}
        onClose={handleCloseModalCreate}>
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            margin: '50px auto',
            maxWidth: '500px',
            borderRadius: '10px',
          }}
        >
          <CreateSede onClose={handleCloseModalCreate} />
        </div>
      </Modal>

      <Modal
        open={openModalEdit}
        onClose={handleCloseModalEdit}>
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            margin: '50px auto',
            maxWidth: '500px',
            borderRadius: '10px',
          }}
        >
          {selectedSede && (
            <EditSede
              selectedSede={selectedSede}
              handleCloseModalEdit={handleCloseModalEdit}
            />
          )}
        </div>
      </Modal>
    </Paper>
  );
};

export default SedesTable;
