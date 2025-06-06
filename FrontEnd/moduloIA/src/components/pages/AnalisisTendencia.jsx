import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
    StyledDataGrid,
    CustomNoRowsOverlay,
    ItemContent,
    PAGE_SIZE,
    CustomPagination,
} from '../reusable/table';
import { useState } from 'react';
import { Container, Stack, TextField } from '@mui/material';
import { getAllAnalisis } from '../reusable/column';
import { Formulario } from '../reusable/Formulario';
import { useEffect } from 'react';

const localeTextSpanish = {
    noRowsLabel: 'No hay filas',
    noResultsOverlayLabel: 'Sin resultados',
    errorOverlayDefaultLabel: 'Ha ocurrido un error.',
};

const AnalisisTendencia = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const title = 'Análisis de tendencia plan de acción';
    const [kpiSeleccionado, setKpiSeleccionado] = useState(null);
    const [modoDetalles, setModoDetalles] = useState(false);
    const [modoEvaluacion, setModoEvaluacion] = useState(false);
    const [modoSalidaNoConforme, setModoSalidaNoConforme] = useState(false);
    const [indicadores, setIndicadores] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });
    const cumplimiento = 1;
    const planDeAccion = 2;
    const cicloDeMejora = 3;

    useEffect(() => {
        fetch('http://localhost:3001/GET-ALL/ANALISIS-PLAN-ACCION/')
            .then((response) => response.json())
            .then((data) => setIndicadores(data))
            .catch((error) => console.error('Hubo un error al obtener los datos', error));
    }, []);

    // Función para ver los detalles
    const handleDetalles = (row) => {
        // console.log(row);
        setKpiSeleccionado(row);
        setModoDetalles(true);
        setModoEvaluacion(false);
        setModoSalidaNoConforme(false);
    };

    const actionPlaneManagement = async (row) => {
        try {
            const response = await fetch('http://localhost:3001/API/GET-SNC-FILTER/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: parseInt(row.id) }), //Convertir a número si es necesario
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al obtener datos');
            }

            const result = await response.json();
            const selectedKpi = result.data[0] || {};
            setKpiSeleccionado(selectedKpi);
            // console.log(selectedKpi)

            // Usar el valor obtenido directamente
            if (selectedKpi.estado_id === cumplimiento) {
                setModoDetalles(false);
                setModoEvaluacion(false);
                setModoSalidaNoConforme(false);
            } else if (selectedKpi.estado_id === planDeAccion) {
                setModoDetalles(false);
                setModoEvaluacion(true);
                setModoSalidaNoConforme(false);
            } else if (selectedKpi.estado_id === cicloDeMejora) {
                setModoDetalles(false);
                setModoEvaluacion(false);
                setModoSalidaNoConforme(true);
            }
        } catch (err) {
            console.error('Hubo un error al obtener datos ', err);
        }
    };

    // Algoritmo para filtrar
    const filteredItems = Array.isArray(indicadores)
        ? indicadores.filter((item) =>
              item.nombre_kpi.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          )
        : [];

    const columns = getAllAnalisis(handleDetalles, actionPlaneManagement);

    return (
        <>
            <ItemContent
                elevation={10}
                sx={{
                    marginY: '2rem',
                    marginX: '2rem',
                    marginBottom: 2,
                    paddingTop: '1rem',
                }}
            >
                <Typography variant="h4" gutterBottom textAlign="center">
                    {title}
                </Typography>
            </ItemContent>

            <ItemContent
                elevation={5}
                sx={{
                    marginY: '2rem',
                    marginX: '2rem',
                    paddingX: '2rem',
                    paddingTop: '2rem',
                }}
            >
                <Formulario
                    modoDetalles={modoDetalles}
                    kpiSeleccionado={kpiSeleccionado}
                    modoEvaluacion={modoEvaluacion}
                    modoSalidaNoConforme={modoSalidaNoConforme}
                    onClose={() => {
                        setModoDetalles(false);
                        setModoEvaluacion(false);
                        setModoSalidaNoConforme(false);
                        setKpiSeleccionado(null);
                    }}
                />
                <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="textSecondary">
                        Número de registros: {filteredItems?.length || 0}
                    </Typography>

                    <TextField
                        fullWidth
                        size="small"
                        type="search"
                        label="Buscar"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: '250px' }}
                    />
                </Container>

                {/* DataGrid */}
                <StyledDataGrid
                    rowHeight={40}
                    columns={columns}
                    rows={filteredItems}
                    paginationModel={paginationModel}
                    onPaginationModelChange={(model) => setPaginationModel(model)}
                    pageSizeOptions={[PAGE_SIZE]}
                    getRowId={(data) => data.id}
                    localeText={localeTextSpanish}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                        pagination: CustomPagination,
                    }}
                />
            </ItemContent>
        </>
    );
};

export default AnalisisTendencia;
