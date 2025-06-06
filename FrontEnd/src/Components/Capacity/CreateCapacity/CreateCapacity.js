
import React, { useState, useEffect } from 'react';
import apiClient from "../../../Service/Service";
import Service from "../../../Machine/Service";
import ReactSelect from "react-select";
import FilePath from './Formato/Planeacion_LP_2024.xlsx';
import ExcelJS from 'exceljs';

const CreateCapacity = ({ XLSX, api, contextHolder }) => {
    const { Servidor } = Service();

    // ESTADOS PARA MANEJAR EL MES SELECCIONADO, EL ESTADO DE CARGA Y EL ARCHIVO
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [selectedCliente, setSelectedCliente] = useState(null);
    const [idClienteSelected, setIdClienteSelected] = useState("");
    const [nombreClienteSelected, setNombreClienteSelected] = useState("");
    const [clientesData, setClientesData] = useState([]);
    const [nombreError, setNombreError] = useState(false);

    // CALCULAR EL VALOR MÁXIMO PARA EL CAMPO DE ENTRADA "MES"
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const maxMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    const maxDate = `${currentYear}-${maxMonth}`;

    // FUNCIÓN PARA EXPORTAR DATOS A UN ARCHIVO EXCEL RESPETANDO EL FORMATO DE LA PLANTILLA DE ORIGEN
    const exportToXLSX = async () => {
        setIsLoading(true);
        try {
            const mes = selectedMonth; // El mes seleccionado
            const response = await apiClient.get(`http://${Servidor}/API/GET/CAPACIDAD-LP/${mes}`);
            const data = response.data;

            if (data.length === 0) {
                api.info({
                    message: 'Información',
                    description: 'No hay resultados para el mes seleccionado.',
                });
            } else {
                // Cargar la plantilla de Excel
                const templateUrl = FilePath; // Ruta de la plantilla
                const response = await fetch(templateUrl);
                const arrayBuffer = await response.arrayBuffer();
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(arrayBuffer);

                // Obtener la primera hoja de la plantilla
                const worksheet = workbook.worksheets[0];

                // Llenar datos en la hoja sin alterar el formato
                data.forEach((item, index) => {
                    const rowIndex = index + 2; // Comienza desde la fila 2 (encabezados en la fila 1)
                    const row = worksheet.getRow(rowIndex);

                    row.getCell(1).value = item.FechaInicioMes;       // Columna A
                    row.getCell(2).value = item.IdServicio;           // Columna B
                    row.getCell(3).value = item.TipoSemana;           // Columna C
                    row.getCell(4).value = item.Forecast;             // Columna D
                    row.getCell(5).value = item.NsPlaneado;           // Columna E
                    row.getCell(6).value = item.NAtencionPlaneado;    // Columna F
                    row.getCell(7).value = item.ContactoPlaneado;     // Columna G
                    row.getCell(8).value = item.EfectividadPlaneada;  // Columna H
                    row.getCell(9).value = item.AhtPlaneado;         // Columna I
                    row.getCell(10).value = item.AbsPlaneado;         // Columna J
                    row.getCell(11).value = item.ItiPlaneado;         // Columna K
                    row.getCell(12).value = item.RotacionPlaneada;    // Columna L
                    row.getCell(13).value = item.SimultaneidadPlaneada; // Columna M
                    row.getCell(14).value = item.AgReqConexion;       // Columna N
                    row.getCell(15).value = item.AgAusencias;         // Columna O
                    row.getCell(16).value = item.AgRotacion;          // Columna P
                    row.getCell(17).value = item.PuestosReqAg;        // Columna Q
                    row.getCell(18).value = item.PuestosReqStaff;     // Columna R
                    row.getCell(19).value = item.HorasConexion;       // Columna S
                    row.getCell(20).value = item.HorasProductivas;    // Columna T
                    row.getCell(21).value = item.HorasOcupadas;       // Columna U

                    row.commit(); // Guarda los cambios en la fila
                });

                // Exportar el archivo actualizado
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'Planeacion_LP_Actualizada.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                api.success({
                    message: 'Éxito',
                    description: 'La descarga se ha completado con éxito.',
                });
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error al exportar datos:', error);
            setIsLoading(false);
            api.error({
                message: 'Error',
                description: 'Ocurrió un error al exportar los datos. Por favor intenta nuevamente.',
            });
        }
    };

    // Función auxiliar para convertir un string a ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };
    
    // FUNCIÓN PARA MANEJAR EL CAMBIO DE MES
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // FUNCIÓN PARA MANEJAR EL CAMBIO DE ARCHIVO
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // FUNCIÓN PARA SUBIR UN ARCHIVO AL SERVIDOR
    const uploadFile = async () => {
        if (!file) {
            api.warning({
                message: 'Advertencia',
                description: 'Por favor selecciona un archivo antes de cargar.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsLoading(true);
            const response = await apiClient.post(`http://${Servidor}/API/UPLOAD/CAPACIDAD-LP`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            api.success({
                message: 'Éxito',
                description: response.data.message,
            });
            setFile(null);
        } catch (error) {
            setIsLoading(false);
            const errors = error.response?.data?.errores || [];
            if (errors.length > 0) {
                errors.forEach(err => {
                    api.error({
                        message: 'Error de Validación',
                        description: `Línea ${err.line}: ${err.message}`,
                    });
                });
            } else {
                api.error({
                    message: 'Error',
                    description: 'Ha ocurrido un error al cargar el archivo.',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchClientes = async () => {
          try {
            const response = await apiClient.get(`http://${Servidor}/clientesActivos`);
            const data = await response.data;
            setClientesData(data);
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
    
        fetchClientes();
    }, [Servidor]);

    const handleChange = (selectedOption) => {
        if (selectedOption) {
          setSelectedCliente(selectedOption);
          setIdClienteSelected(selectedOption.value ? selectedOption.value : "");
          setNombreClienteSelected(
            selectedOption.label ? selectedOption.label : ""
          );
        } else {
          setSelectedCliente(null);
          setIdClienteSelected("");
          setNombreClienteSelected("");
        }
    };

    // FUNCIÓN PARA EXPORTAR DATOS A UN ARCHIVO EXCEL
    const exportToXLSXListServices = async () => {
        setIsLoading(true);
        try {
            const idCliente = idClienteSelected;
            const response = await apiClient.get(`http://${Servidor}/API/GET/CAPACIDAD-LP/LISTADO-SERVICIOS/${idCliente}`);
            const data = response.data;

            if (data.length === 0) {
                api.info({
                    message: 'Información',
                    description: 'No hay resultados para el cliente seleccionado.',
                });
            } else {
                const filteredData = data.map(item => ({
                    IdCliente: item.id_cliente,
                    NombreCliente: item.nombre_cliente,
                    IdOperacion: item.id_operacion,
                    NombreOperacion: item.nombre_operacion,
                    IdSegmento: item.id_segmento,
                    NombreSegmento: item.nombre_segmento,
                    IdServicio: item.id_servicio,
                    NombreServicio: item.nombre_servicio
                }));

                const ws = XLSX.utils.json_to_sheet(filteredData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Listado de Servicios');
                const fullFileName = 'Listado_servicios.xlsx';
                XLSX.writeFile(wb, fullFileName);
            }

            setIsLoading(false);

            if (data.length > 0) {
                api.success({
                    message: 'Éxito',
                    description: 'La descarga se ha completado con éxito.',
                });
            }

            window.addEventListener('focus', () => setIsLoading(false), { once: true });
        } catch (error) {
            console.error('Error exporting data:', error);
            setIsLoading(false);
            api.error({
                message: 'Error',
                description: 'Ha ocurrido un error al exportar los datos. Intenta nuevamente.',
            });
        }
    };

    return (
        <>
            {contextHolder}
    
            {/* CARD PARA LA PRIMERA FILA */}
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="p-2 flex-grow-1">
                            <div className="title-exports-shifts">
                                <p>
                                    <b>¡Importante!</b> Puedes buscar un cliente y descargar un listado de todos los servicios con sus respectivos ID, te servirá como guía para la planeación.
                                </p>
                            </div>
                        </div>
                        <div className="p-2 flex-fill">
                            <ReactSelect
                                options={clientesData.map((cliente) => ({
                                    value: cliente.id_cliente,
                                    label: cliente.nombre_cliente,
                                }))}
                                onChange={handleChange}
                                placeholder="Seleccionar cliente"
                                isClearable
                                isSearchable
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: "56px",
                                        width: "100%",
                                        borderRadius: "4px",
                                        borderColor: nombreError ? "#f44336" : base.borderColor,
                                    }),
                                }}
                            />
                        </div>
                        <div className="p-2">
                            <button
                                className="btn btn-sm btn-warning"
                                disabled={!selectedCliente}
                                onClick={exportToXLSXListServices}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-download" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* CARD PARA LA SEGUNDA FILA */}
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="p-2 flex-grow-1">
                            <div className="title-exports-shifts">
                                <i className="bi bi-grid-fill" id="icons-files-exports" /> 
                                Planeación Largo Plazo
                            </div>
                        </div>
                        <div className="p-2">
                            <input
                                id="monthPicker"
                                className="form-control"
                                type="month"
                                name="mes"
                                max={maxDate}
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />
                        </div>
                        <div className="p-2">
                            <button
                                className="btn btn-sm btn-primary"
                                disabled={!selectedMonth}
                                onClick={exportToXLSX}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-download" />
                                )}
                            </button>
                        </div>
                        <div className="p-2">
                            <input 
                                type="file" 
                                className="form-control" 
                                onChange={handleFileChange} 
                            />
                        </div>
                        <div className="p-2">
                            <button
                                className="btn btn-sm btn-success"
                                disabled={!file}
                                onClick={uploadFile}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-upload" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );    
};

export default CreateCapacity;
