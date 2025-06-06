import React, { useEffect, useState } from 'react';
import { TextField, Paper } from '@mui/material';
import { AddCircleOutlineRoundedIcon, EditRoundedIcon } from '../../Exports-Modules/Exports';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Service from '../../Machine/Service';


import PaisForm from './PaisForm';
import EditarPaisPage from '../Pages/EditPais/EditorPais';


import { CustomNoRowsOverlay, StyledDataGrid, ItemContent, PAGE_SIZE, CustomPagination } from '../../Components/StyleCampaignJS/StylePaises';
import { esES } from '@mui/x-data-grid';
import apiClient from '../../Service/Service';

const PaisesTable = () => {
  const { Servidor } = Service();
  const [paises, setPaises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [selectDetails, setSelectDetails] = useState(null);

  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

  useEffect(() => {
    const fetchPaises = async () => {
      const response = await apiClient.get(`http://${Servidor}/paises`);
      const data = await response.data;
      setPaises(Array.isArray(data) ? data : []);
    };

    fetchPaises();

    const intervalId = setInterval(() => {
      fetchPaises();
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


  const filteredPaises = Array.isArray(paises)
    ? paises.filter((id) =>
      (id.nombre_pais || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : [];

  const columns = [
    { field: 'id_pais', headerName: 'ID', flex: 1 },
    { field: 'nombre_pais', headerName: 'Nombre del País', flex: 1 },
    {
      field: 'estado_pais',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        const estadoValor = Number(params.row.estado_pais);
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
          onClick={() => handleOpenModalEdit(params.row)} // Pasa los datos al abrir el modal
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
                Nuevo pais
              </Button>
            </div>
          </div>


          <div className='p-2'></div>

          <div style={{ width: '100%' }}>
            <StyledDataGrid
              rowHeight={60}
              columns={columns}
              rows={filteredPaises}
              pageSizeOptions={[PAGE_SIZE]}
              paginationModel={paginationModel}
              getRowId={(data) => data.id_pais}
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
        open={openModal}
        onClose={handleCloseModal}>
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            margin: '50px auto',
            maxWidth: '500px',
            borderRadius: '10px',
          }}
        >
          <PaisForm onClose={handleCloseModal} />
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
            <EditarPaisPage
              id={selectDetails.id_pais} // Pasa el ID al componente de edición
              onClose={handleCloseModalEdit}
            />
          )}
        </div>
      </Modal>


    </Paper>
  );
};

export default PaisesTable;

