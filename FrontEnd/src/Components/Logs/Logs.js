import { esES } from '@mui/x-data-grid';


import './Styles/Styles.css';
import Config from '../../Auth/Config';
import { React, useEffect, useState, FileDownloadRoundedIcon } from '../../Exports-Modules/Exports';
import { CustomPagination, PAGE_SIZE, StyledDataGrid } from './Styles/Styles';
import apiClient from '../../Service/Service';
import Button from '@mui/joy/Button';


const Logs = () => {
  const { GetLogsRegister } = Config();
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });
  const [, setMessageError] = useState({});

  useEffect(() => {
    const getListLogs = async () => {
      try {
        const response = await apiClient.get(GetLogsRegister);
        const data = response.data;
        setList(data);
      } catch (error) {
        setMessageError('Error al cargar los datos');
      }
    };

    getListLogs();
  }, [GetLogsRegister]);

  function saveAsXlsxFile(file, Usuario_Red) {
    // Convertir el Buffer a un Blob
    var blob = new Blob([new Uint8Array(file.File.data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Crear un enlace para descargar el Blob
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `${Usuario_Red}.xlsx`;
    a.textContent = 'Download file!';
    document.body.appendChild(a);

    // Opcionalmente, hacer clic en el enlace para iniciar la descarga automáticamente
    a.click();

    // Limpiar después de la descarga
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }




  const columns = [
    { field: 'Usuario_Red', headerName: 'Usuario Red', flex: 1 },
    { field: 'Fecha_Logueo', headerName: 'Fecha Logueo', flex: 1 },
    { field: 'Hora_Logueo', headerName: 'Hora Logueo', flex: 1 },
    { field: 'Fecha_Visita_Modulo', headerName: 'Fecha Visita Modulo', flex: 1 },
    { field: 'Hora_Visita_Modulo', headerName: 'Hora Visita Modulo', flex: 1 },
    { field: 'Modulo_Visitado', headerName: 'Modulo Visitado', flex: 1 },
    { field: 'Submodulo_Visitado', headerName: 'Submodulo Visitado', flex: 1 },
    { field: 'Accion_Realizada', headerName: 'Accion Realizada', flex: 1 },
    {
      field: 'file',
      headerName: 'Archivo',
      flex: 1,
      renderCell: (params) => {
        return (
          <Button startDecorator={<FileDownloadRoundedIcon />} color='success' onClick={() => saveAsXlsxFile(params.row, params.row.Usuario_Red)}>
            {params.row.Usuario_Red}.xlsx
          </Button>
        );
      },
    },
  ];
  const filteredItems = list.filter(item => item.Usuario_Red.toLowerCase().includes(searchTerm.toLowerCase()));



  return (
    <>
      <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
        <div className='card-body'>
          <div className='text-center'>
            <div className='mb-0 title-mychange'>Activity Logs</div>
          </div>
        </div>
      </div>

      <div className='card border-light shadow-sm bg-body rounded'>
        <div className='d-flex '>
          <div className='p-2 flex-grow-1 '>
          </div>
          <div className='p-2 '>
            <input className='form-control my-0' type='search' placeholder='Usuario Red' aria-label='Search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div style={{ width: '100%' }}>

          <StyledDataGrid
            // rowHeight={20}
            // checkboxSelection
            columns={columns}
            rows={filteredItems}
            pageSizeOptions={[PAGE_SIZE]}
            paginationModel={paginationModel}
            getRowId={(data) => data.Id_Log}
            onPaginationModelChange={setPaginationModel}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            slots={{
              pagination: CustomPagination,
            }}
          />
        </div>
      </div>

    </>
  )
}

export default Logs