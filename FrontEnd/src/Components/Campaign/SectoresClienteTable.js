import React, { useEffect, useState } from 'react';
import { TextField, Paper } from '@mui/material';
import { AddCircleOutlineRoundedIcon, EditRoundedIcon } from '../../Exports-Modules/Exports';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Service from '../../Machine/Service';


import SectorClienteForm from './SectorClienteForm';
import EditarSectorClientePage from '../Pages/EditSectorCliente/EditorSectorCliente';


import { CustomNoRowsOverlay, StyledDataGrid, ItemContent, PAGE_SIZE, CustomPagination } from '../../Components/StyleCampaignJS/StyleSectoresCliente'
import { esES } from '@mui/x-data-grid';
import apiClient from '../../Service/Service';


const SectoresClienteTable = () => {
  const { Servidor } = Service();
  const [searchTerm, setSearchTerm] = useState('');
  const [sectoresCliente, setSectoresCliente] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [selectDetails, setSelectDetails] = useState(null);

  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

  useEffect(() => {
    const fetchSectoresCliente = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/sectorClientes`);
        const data = await response.data;
        if (Array.isArray(data)) {
          setSectoresCliente(data);
        } else {
          console.error('Unexpected response data:', data);
          setSectoresCliente([]);
        }
      } catch (error) {
        console.error('Error fetching sectoers clientes:', error);
        setSectoresCliente([]);
      }
    };
    fetchSectoresCliente();
    const intervalId = setInterval(() => {
      fetchSectoresCliente();
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [Servidor]);

  // Abre el modal de nuevos 
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // Cierra el modal de nuevos 
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleOpenModalEdit = (id) => {
    setSelectDetails(id); // Guarda los detalles del seleccionado
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectDetails(null); // Limpia los detalles seleccionados al cerrar el modal
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredSectoresCliente = Array.isArray(sectoresCliente) ? sectoresCliente.filter((sectorCliente) =>
    (sectorCliente.nombre_sector_cliente || '').toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const columns = [
    { field: 'id_sector_cliente', headerName: 'ID', flex: 1 },
    { field: 'nombre_sector_cliente', headerName: 'Nombre del sector', flex: 1 },
    {
      field: 'estado_sector_cliente',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        const estadoValor = Number(params.row.estado_sector_cliente);
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
                Nuevo Sector Cliente
              </Button>
            </div>
          </div>


          <div className='p-2'></div>

          <div style={{ width: '100%' }}>
            <StyledDataGrid
              rowHeight={60}
              columns={columns}
              rows={filteredSectoresCliente}
              pageSizeOptions={[PAGE_SIZE]}
              paginationModel={paginationModel}
              getRowId={(data) => data.id_sector_cliente}
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
          <SectorClienteForm onClose={handleCloseModal} />
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
            <EditarSectorClientePage
              id={selectDetails.id_sector_cliente} // Pasa el ID al componente de edición
              onClose={handleCloseModalEdit}
            />
          )}
        </div>
      </Modal>

    </Paper>
  );
};

export default SectoresClienteTable;
