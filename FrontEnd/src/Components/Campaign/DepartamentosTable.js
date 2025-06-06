import React, { useEffect, useState } from 'react';
import { TextField, Paper } from '@mui/material';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Service from '../../Machine/Service';

import CrearDepartamento from '../Pages/CreateDepartamento';
import EditarDepartamento from '../Pages/EditDepartamento/EditDepartamento';
import { AddCircleOutlineRoundedIcon, EditRoundedIcon } from '../../Exports-Modules/Exports';

import { CustomNoRowsOverlay, StyledDataGrid, ItemContent, PAGE_SIZE, CustomPagination, } from '../../Components/StyleCampaignJS/StyleDepartamentos';
import { esES } from '@mui/x-data-grid';
import apiClient from '../../Service/Service';


const DepartamentosTable = () => {
  const { Servidor } = Service();
  const [departamentos, setDepartamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const response = await apiClient.get(`http://${Servidor}/deptoEstados`);
      const data = await response.data;
      setDepartamentos(Array.isArray(data) ? data : []);
    };

    fetchDepartamentos();

    const intervalId = setInterval(() => {
      fetchDepartamentos();
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [Servidor]);


  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

  const handleOpenModalEdit = (departamento) => {
    setSelectedDepartamento(departamento);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectedDepartamento(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDeptos = Array.isArray(departamentos)
    ? departamentos.filter((depto) =>
      (depto.nombre_depto_estado || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : [];

  
  const columns = [
    { field: 'id_depto_estado', headerName: 'ID', flex: 1 },
    { field: 'nombre_depto_estado', headerName: 'Nombre del Departamento', flex: 1 },
    {
      field: 'estado_depto_estado',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        const estadoValor = Number(params.row.estado_depto_estado);
        const estado = estadoValor === 1 ? 'Activo' : 'Inactivo';
        const color = estadoValor === 1 ? 'green' : 'red';
        return (
          <span style={{ color: color, fontWeight: 'initial', fontSize: '15px' }}>
            {estado}
          </span>
        );
      },
    },
    { field: 'nombre_pais', headerName: 'País', flex: 1 },
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
                Nuevo Departamento
              </Button>
            </div>
          </div>

          <div className='p-2'></div>

          <div style={{ width: '100%' }}>
            <StyledDataGrid
              rowHeight={50}
              columns={columns}
              rows={filteredDeptos}
              pageSizeOptions={[PAGE_SIZE]}
              paginationModel={paginationModel}
              getRowId={(data) => data.id_depto_estado}
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
          <CrearDepartamento onClose={handleCloseModalCreate} />
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
          {selectedDepartamento && (
            <EditarDepartamento
                selectedDepartamento={selectedDepartamento}
                handleCloseModalEdit={handleCloseModalEdit}
            />
          )}
        </div>
      </Modal>

    </Paper>
  );
};

export default DepartamentosTable;
