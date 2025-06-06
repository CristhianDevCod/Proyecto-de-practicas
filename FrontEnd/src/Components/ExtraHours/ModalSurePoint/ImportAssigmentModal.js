import React, { useState, useRef } from 'react';
import { notification, Skeleton, SimCardDownloadRoundedIcon, VisibilityRoundedIcon, PublishRoundedIcon, ArrowLeftRoundedIcon, ArrowRightRoundedIcon } from '../../../Exports-Modules/Exports';
import Button from '@mui/joy/Button';
import FilePathAssigment from './FormatoAssigment/FormatoCargueHorasExtras.xlsx';
import * as XLSX from 'xlsx';
import { PushHoursExtra } from '../../../API/API';
import apiClient from '../../../Service/Service';
import '../../Imports/Styles/Styles.css';

const ImportAssigmentModal = ({ Modal, open, hanldeCloseModal }) => {
    
    const { pushHoursExtra } = PushHoursExtra();
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
    const rowsPerPage = 15;

    const fileInputRef = useRef(null);

    const handleShowNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleShowPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const getFormattedDate = (value, columnIndex) => {
        if (columnIndex === 1) {
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
            const date = new Date(1900, 0, value - 1);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
        return value;
    };

    const formatTime = (value) => {
        const timeObj = new Date();
        timeObj.setHours(Math.floor(value * 24));
        timeObj.setMinutes(Math.round((value * 24 * 60) % 60));

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
                    message: 'El archivo ha cambiado. Por favor, haga clic en Ver horas extras para visualizar los nuevos datos.',
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
        setVerTurnosClicked(false);
        // Limpia el valor del input de archivo
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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

    const handlePushMalla = () => {
        setIsLoading(true);
        if (emptyCells.length > 0) {
            api.error({
                message: `El archivo contiene celdas vacías`,
                duration: 60
            });
            setIsLoading(false);
            return;
        }

        apiClient.put(pushHoursExtra, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                api.success({
                    message: `${response.data}`,
                    duration: 60
                });
                setIsLoading(false);

                resetFileData()
                hanldeCloseModal()

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
        link.href = FilePathAssigment;  // Ruta local del archivo Excel
        link.download = 'Formato Cargue Horas Extras.xlsx';
        link.click();
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <>
                        <h2 className='modal-title text-muted mb-4'>Importe Masivo Horas Extras</h2>
                    </>
                }
                open={open}
                width={1200}
                onCancel={hanldeCloseModal}
                footer={null}
            >
                <div className='card border-light shadow-sm bg-body rounded'>
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
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className='p-2 btn-group' role='group'>
                                <Button variant='soft' color='primary' size='sm' startDecorator={<VisibilityRoundedIcon fontSize='sm' />} onClick={handleUpload} >
                                    Ver horas extras
                                </Button>
                            </div>
                            <div className='p-2 btn-group' role='group'>
                                <Button variant='soft' color='success' size='sm' startDecorator={<PublishRoundedIcon fontSize='sm' />} onClick={handlePushMalla} disabled={isLoading || !verTurnosClicked}>
                                    {isLoading ? 'Cargando...' : 'Cargar horas extras'}
                                </Button>
                            </div>
                        </div>

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
                                                <div className='border-light table-responsive-sm-two' id='table-import-malla'>
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
            </Modal>
        </>
    );
};

export default ImportAssigmentModal;
