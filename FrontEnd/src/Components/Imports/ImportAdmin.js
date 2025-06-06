import { React, useState, useEffect,  notification, Skeleton, useContext, SimCardDownloadRoundedIcon, VisibilityRoundedIcon, PublishRoundedIcon, ArrowLeftRoundedIcon, ArrowRightRoundedIcon } from '../../Exports-Modules/Exports';
import * as XLSX from 'xlsx';
import Button from '@mui/joy/Button';
import FilePath from './Formato/FormatoCargueTurnos.xlsx';

import './Styles/Styles.css';
import Config from '../../Auth/Config';
import { LogsContext } from '../../Context/LogsContext';
import apiClient from '../../Service/Service';
import { io } from 'socket.io-client';
import Service from '../../Machine/Service';



const ImportAdmin = () => {
    const { Servidor } = Service();
    const { handleLogs } = useContext(LogsContext);
    const { pushMallaAdmin } = Config();
    const [api, contextHolder] = notification.useNotification();
    const [emptyCells, setEmptyCells] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [verTurnosClicked, setVerTurnosClicked] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [progressMessages, setProgressMessages] = useState([]);
    const rowsPerPage = 15;


    useEffect(() => {
        const socket = io(Servidor); // Conéctate al servidor WebSocket

        // Escucha los mensajes de progreso
        socket.on('progreso', (message) => {
            setProgressMessages(message);
        });

        // Limpia la conexión al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, [Servidor]);

    const handleShowNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleShowPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };


    const getFormattedDate = (value, columnIndex) => {
        if (columnIndex === 0) {
            const date = new Date(1900, 0, value - 1);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
        return value;
    };

    const formattedFloat = (value, columnIndex) => {
        if (columnIndex === 4) {
            return parseFloat(value).toFixed(2);
        }
        return value
    };

    const formatTime = (value) => {
        const timeObj = new Date();
        timeObj.setHours(Math.trunc(value * 24));
        timeObj.setMinutes(Math.floor((value * 24 * 60) % 60));
        timeObj.setSeconds(Math.ceil((value * 24 * 60 * 60) % 60));

        const hours = String(timeObj.getHours()).padStart(2, '0');
        const minutes = String(timeObj.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    };


    const handleUpload = () => {
        if (selectedFile) {
            if (selectedFile === fileLoaded) {
                const formattedData = fileData.map((row, rowIndex) => {
                    Object.keys(row).forEach((key, columnIndex) => {
                        const value = row[key];
                        try {
                            if (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value < 1) {
                                row[key] = formatTime(value);
                            } else if (typeof value === 'number' && Number.toString(value) && value >= 1) {
                                row[key] = getFormattedDate(value, columnIndex);
                            } else if (value === '') {
                                setEmptyCells((prevEmptyCells) => [
                                    ...prevEmptyCells,
                                    { rowIndex, columnIndex }
                                ]);
                            }
                        } catch (error) {
                            console.log('error en el formateo de las fechas', error);
                        }
                    });
                    return row;
                });
                setData(formattedData);
                setVerTurnosClicked(true);
                setFileUploaded(true);
            } else {
                api.warning({
                    message: 'El archivo ha cambiado. Por favor, haga clic en "Ver turnos" para visualizar los nuevos datos.',
                    duration: 15
                });
            }
        } else {
            api.warning({
                message: 'Por favor seleccione un archivo',
                duration: 15
            });
        }
    };

    const resetFileData = () => {
        setSelectedFile(null);
        setLoading(true);
        setData([]);
        setEmptyCells([]);
        setFileUploaded(false);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const acceptedFormats = ['.xlsx', '.xls', '.xlsm'];
        try {
            if (file && acceptedFormats.includes(file.name.substr(file.name.lastIndexOf('.')))) {
                resetFileData();
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });

                    if (workbook.SheetNames.length > 1) {
                        api.error({
                            message: 'El archivo debe contener solo una hoja de cálculo.',
                            duration: 15
                        });
                        return;
                    }

                    setSelectedFile(file);
                    setLoading(false);

                    setFileLoaded(file);
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const dataXLSX = XLSX.utils.sheet_to_json(sheet);
                    setFileData(dataXLSX);
                };

                if (selectedFile && selectedFile.name === file.name) {
                    setData([]);
                    setEmptyCells([]);
                }
                reader.readAsBinaryString(file);
            }
        } catch (error) {
            api.error({
                message: `Archivo no válido. Por favor, selecciona un archivo en formato Excel. ${error}`,
                duration: 15
            });
        }
    };

    const Base64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error)
            };
            reader.readAsDataURL(file);
        });
    };


    const handlePushMalla = async () => {
        setIsLoading(true);
        if (emptyCells.length > 0) {
            api.error({
                message: `El archivo contiene celdas vacías`,
                duration: 60
            });
            setIsLoading(false);
            return;
        }
        apiClient.put(pushMallaAdmin, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const file = await Base64(selectedFile);
                // Quita el encabezado 'data:...' para obtener solo el contenido Base64
                const base64 = file.replace(/^data:.*;base64,/, '');

                handleLogs('WFM', 'TURNOS - Importe Administrativo', 'Cargó turnos', base64)
                api.success({
                    message: `${response.data}`,
                    duration: 60
                });
                setIsLoading(false);
            })
            .catch((error) => {
                api.error({
                    message: `${error.response.data}`,
                    duration: 60
                });
                setIsLoading(false);
            });
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, data.length);

    const currentPageData = data.slice(startIndex, endIndex);



    const downloadExcelFile = () => {
        const link = document.createElement('a');
        link.href = FilePath;  // Ruta local del archivo Excel
        link.download = 'Formato Cargue Turnos.xlsx';
        link.click();
    };

    return (
        <>
            {contextHolder}
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='text-center'>
                        <h3 className='mb-0 title-import'>Importe de Turnos Administrativo</h3>
                    </div>
                </div>
            </div>

            <div className='card border-light bg-body shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1'>
                            <Button variant='soft' color='success' size='sm' startDecorator={<SimCardDownloadRoundedIcon fontSize='sm' />} onClick={downloadExcelFile}>
                                Descargar Plantilla
                            </Button>
                        </div>
                        <div className='p-2'>
                            <input
                                className='form-control form-control-sm'
                                accept='.xlsx, .xls, .xlsm'
                                id='formFileSm'
                                type='file'
                                onChange={handleFileUpload}
                            />
                        </div>
                        <div className='p-2 btn-group' role='group'>
                            <Button variant='soft' color='primary' size='sm' startDecorator={<VisibilityRoundedIcon fontSize='sm' />} onClick={handleUpload} >
                                Ver turnos
                            </Button>
                        </div>
                        <div className='p-2 btn-group' role='group'>
                            <Button variant='soft' color='success' size='sm' startDecorator={<PublishRoundedIcon fontSize='sm' />} onClick={handlePushMalla} disabled={isLoading || !verTurnosClicked}>
                                {isLoading ? 'Cargando...' : 'Cargar turnos'}
                            </Button>
                        </div>
                    </div>

                    {progressMessages && progressMessages.length > 0 && (
                        <div className='alert alert-info' role='alert'>
                            {progressMessages}
                        </div>
                    )}


                    <div className='d-flex'>
                        <div className='p-2 flex-grow-1 '>
                            <div className='text-muted'>Número de filas {data.length}</div>
                        </div>
                        <div className='p-2'>
                            {currentPage > 1 && (
                                <Button variant='soft' color='primary' size='sm' onClick={handleShowPreviousPage}>
                                    <ArrowLeftRoundedIcon fontSize='medium' />
                                </Button>
                            )}
                            {currentPage * rowsPerPage < data.length && (
                                <Button variant='soft' color='primary' size='sm' onClick={handleShowNextPage}>
                                    <ArrowRightRoundedIcon fontSize='medium' />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className='p-2'>
                        <div id='content-info-xlsx'>
                            <div className='' id='xlsx-data'>
                                {loading ? (
                                    <>
                                        <div className=''>
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                            <Skeleton variant='rectangular' className='skeleton-loading' />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {fileUploaded && currentPageData.length > 0 && (
                                            <div className='border-light table-responsive-sm' id='table-import-malla'>
                                                <div className=''>
                                                    <table className='table table-sm table-hover mb-0'>
                                                        <thead className='table-light'>
                                                            <tr className='text-muted fw-bold'>
                                                                {Object.keys(data[0]).map((key) => (
                                                                    <th key={key}>{key}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {currentPageData.map((_, rowIndex) => (
                                                                <tr key={rowIndex} className='text-muted fw-normal'>
                                                                    {Object.keys(data[0]).map((key, columnIndex) => {
                                                                        const value = data[rowIndex + startIndex][key];
                                                                        const isEmptyCell = emptyCells.some(
                                                                            (cell) => cell.rowIndex === rowIndex + startIndex && cell.columnIndex === columnIndex
                                                                        );
                                                                        return (
                                                                            <td key={`${rowIndex}-${columnIndex}`} className={isEmptyCell ? 'table-danger' : ''}>
                                                                                {columnIndex === 4 ? formattedFloat(value, columnIndex) : value}
                                                                            </td>
                                                                        );
                                                                    })}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default ImportAdmin;



