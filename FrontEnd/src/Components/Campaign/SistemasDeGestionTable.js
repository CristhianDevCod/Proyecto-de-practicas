import React, { useEffect, useState } from 'react';
import { TextField, Paper } from '@mui/material';

import { AddCircleOutlineRoundedIcon, EditRoundedIcon } from '../../Exports-Modules/Exports';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Service from '../../Machine/Service';

import SistemaDeGestionForm from './SistemaDeGestionForm';
import EditSistemaDeGestionForm from '../Pages/EditSistemaDeGestion/EditorSistemaGestion'

import { CustomNoRowsOverlay, StyledDataGrid, ItemContent, PAGE_SIZE, CustomPagination } from '../../Components/StyleCampaignJS/StyleSistemaGestion';
import { esES } from '@mui/x-data-grid';
import apiClient from '../../Service/Service';



const SistemasDeGestionTable = () => {
  const { Servidor } = Service();
  const [sistemaGestion, setSistemaGestion] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [selectDetails, setSelectDetails] = useState(null);


  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


  useEffect(() => {

    const fetchSistemaGestion = async () => {

      try {
        const response = await apiClient.get(`http://${Servidor}/sistemasGestion`);
        const data = await response.data;
        if (Array.isArray(data)) {
          setSistemaGestion(data);
        } else {
          console.error('Unexpected response data:', data);
          setSistemaGestion([]);
        }
      } catch (error) {
        console.error('Error fetching sistemas gestión:', error);
        setSistemaGestion([]);
      }
    };
    fetchSistemaGestion();

    const intervalId = setInterval(() => {
      fetchSistemaGestion();
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [Servidor]);

  // Abre el modal de nuevos paises
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // Cierra el modal de nuevos paises
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleOpenModalEdit = (id) => {
    setSelectDetails(id); // Guarda los detalles del país seleccionado
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectDetails(null); // Limpia los detalles seleccionados al cerrar el modal
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const filteredSistemaGestion = Array.isArray(sistemaGestion) ? sistemaGestion.filter(
    (sistema) =>
      (sistema.nombre_sist_gestion || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (sistema.admin_sist_gestion || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  ) : [];


  const columns = [
    { field: 'id_sist_gestion', headerName: 'ID', flex: 1 },
    { field: 'nombre_sist_gestion', headerName: 'Nombre del sistema', flex: 1 },
    { field: 'admin_sist_gestion', headerName: 'Administrador del sistema', flex: 1 },
    {
      field: 'estado_sist_gestion',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        const estadoValor = Number(params.row.estado_sist_gestion);
        const estado = estadoValor === 1 ? 'Activo' : 'Inactivo';
        const color = estadoValor === 1 ? 'green' : 'red';
        return (
          <span style={{ color: color, fontWeight: 'initial', fontSize: '15px' }}>
            {estado}
          </span>
        );
      },
    },
    {
      field: 'Detalles',
      headerName: 'Detalles',
      flex: 1,
      renderCell: (params) => (
        <Button
          size="sm"
          color="primary"
          variant="soft"
          onClick={() => handleOpenModalEdit(params.row)} // Pasa los datos  al abrir el modal
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
                Nuevo Sistema
              </Button>
            </div>
          </div>


          <div className='p-2'></div>

          <div style={{ width: '100%' }}>
            <StyledDataGrid
              rowHeight={60}
              columns={columns}
              rows={filteredSistemaGestion}
              pageSizeOptions={[PAGE_SIZE]}
              paginationModel={paginationModel}
              getRowId={(data) => data.id_sist_gestion}
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

      <Modal open={openModal}
        onClose={handleCloseModal}>
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            margin: '50px auto',
            maxWidth: '500px',
            borderRadius: '10px',
          }}>
          <SistemaDeGestionForm onClose={handleCloseModal}/>
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
          {selectDetails && (
            <EditSistemaDeGestionForm
              id={selectDetails.id_sist_gestion} // Pasa el ID  al componente de edición
              onClose={handleCloseModalEdit}
            />
          )}
        </div>
      </Modal>

    </Paper>
  );
};

export default SistemasDeGestionTable;
