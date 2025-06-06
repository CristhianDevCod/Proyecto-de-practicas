import { React, useContext, useEffect, useState, useCallback } from '../../Exports-Modules/Exports';

import { esES } from '@mui/x-data-grid';
import { UserProfileContext } from '../../Context/ProfileContex';
import './Styles/Styles.css'

import ModalDetails from './ModalDetails';
import Loading from '../Loading/Loading';

import { getAllMyChanges } from '../../API/API';

// Comentario de prueba

import { CustomPagination, PAGE_SIZE, StyledDataGrid, CustomNoRowsOverlay } from './Styles/Styles';
const MyChanges = () => {
    const { fullName } = useContext(UserProfileContext);
    const [dataMyChanges, setDataMyChanges] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [originData, setOriginData] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(true);

    const handleShowRowInfo = (params) => {
        const selectedRow = params.row;
        setSelectedRowData(selectedRow);
    };
    const columns = [
        { field: 'Fecha_Envio', headerName: 'Fecha', width: 100 },
        { field: 'Hora_Envio', headerName: 'Hora', width: 80 },
        { field: 'Tipo_Cambio', headerName: 'Tipo de cambio', width: 120 },
        { field: 'Nombre_Completo_Envia', headerName: 'Nombre completo envia', width: 180 },
        { field: 'Nombre_Completo_Recibe', headerName: 'Nombre completo recibe', width: 180 },
        { field: 'Respuesta_Recibe', headerName: 'Respuesta Recibe', width: 150 },
        { field: 'Nombre_Aprobador_Final', headerName: 'Nombre aprobador final', width: 150 },
        { field: 'Estado_Marcacion_Final', headerName: 'Estado Marcado', width: 150 },
        {
            field: 'Detalles',
            headerName: 'Detalles',
            width: 70,
            renderCell: (params) => {
                return (
                    <button type='button' className='btn btn-light btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal' onClick={() => handleShowRowInfo(params)}>
                        <i className='bi bi-search' />
                    </button>
                );
            },
        },
    ];

    const getDataMyChange = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllMyChanges(fullName[0].Documento);
            setDataMyChanges(response);
            setOriginData(response);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [fullName]);

    useEffect(() => {
        if (fullName && fullName.length > 0) {
            getDataMyChange();
        }
    }, [getDataMyChange, fullName]);



    const Filtrar = (search) => {
        var resultSeacrh = originData.filter((element) => {
            if (
                element.Fecha_Envio.toString().toLowerCase().includes(search.toLowerCase()) ||
                element.Nombre_Completo_Recibe.toString().toLowerCase().includes(search.toLowerCase())
            ) {
                return element;
            }
            return false;
        });
        setDataMyChanges(resultSeacrh);
    };

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
        Filtrar(e.target.value);
    };

    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

    return (
        <>
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='text-center'>
                        <div className='mb-0 title-mychange'>Historial de cambios</div>
                    </div>
                </div>
            </div>
            <div className='card border-light shadow-sm bg-body rounded'>
                <div className='card-body mt-3 mb-3'>
                    <div className='d-flex flex-row-reverse bd-highlight'>
                        <div className='p-2 bd-highlight'>
                            <input placeholder='Buscar...' className='form-control' type='search' value={busqueda} onChange={handleBusqueda} />
                        </div>
                    </div>
                    {loading && <Loading />}
                    <div style={{ height: '50vh', width: '100%' }}>
                        {!loading && Array.isArray(dataMyChanges) ? (
                            <StyledDataGrid
                                rowHeight={20}
                                checkboxSelection
                                columns={columns}
                                rows={dataMyChanges}
                                pageSizeOptions={[PAGE_SIZE]}
                                paginationModel={paginationModel}
                                getRowId={(data) => data.Id_Cambio}
                                onPaginationModelChange={setPaginationModel}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                slots={{
                                    pagination: CustomPagination,
                                }}
                            />
                        ) : (CustomNoRowsOverlay())}
                    </div>
                </div>
            </div>

            <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>Detalles del cambio</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
                        </div>
                        <ModalDetails selectedRowData={selectedRowData} />
                    </div>
                </div>
            </div>



        </>
    );
};

export default MyChanges;
