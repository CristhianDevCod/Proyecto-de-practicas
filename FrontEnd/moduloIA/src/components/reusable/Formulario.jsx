import {
    Box,
    Grid,
    IconButton,
    Modal,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { DetallesModal } from './DetallesModal';
import { useEffect } from 'react';
import { EvaluacionModal } from './EvaluacionModal';
import { SalidaNoConforme } from './SalidaNoConformeModal';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #ddd',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

const Formulario = ({
    modoDetalles,
    kpiSeleccionado,
    onClose,
    modoEvaluacion,
    modoSalidaNoConforme,
}) => {
    // Cuando estoy en modo detalles
    useEffect(() => {
        if (modoDetalles) {
            console.log('Estoy en modo detalles');
        }
    }, [modoDetalles]);

    const progresoData = [
        { periodo: 'enero', real: '8,27', esperado: '9,77', resultado: '70%' },
        { periodo: 'febrero', real: '4,89', esperado: '4,51', resultado: '110%' },
        { periodo: 'marzo', real: '6,21', esperado: '6,21', resultado: '100%' },
        { periodo: 'marzo', real: '6,21', esperado: '6,21', resultado: '100%' },
        { periodo: 'marzo', real: '6,21', esperado: '6,21', resultado: '100%' },
        { periodo: 'marzo', real: '6,21', esperado: '6,21', resultado: '100%' },
        { periodo: 'marzo', real: '6,21', esperado: '6,21', resultado: '100%' },
    ];

    const detallesData = [
        { clave: 'Nombre', valor: kpiSeleccionado?.nombre || 'N/A' },
        { clave: 'Responsable', valor: kpiSeleccionado?.responsable || 'N/A' },
        { clave: 'Estado', valor: kpiSeleccionado?.estado || 'N/A' },
    ];

    return (
        <div>
            <Modal
                open={modoDetalles || modoEvaluacion || modoSalidaNoConforme}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* Botón de cierre */}
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        {' '}
                        <CancelIcon color="error" fontSize="large" />
                    </IconButton>

                    {/* Si esta en modo detalles */}
                    {modoDetalles && (
                        <DetallesModal progresoData={progresoData} detallesData={detallesData} />
                    )}
                    {/* Si esta en modo evaluación */}
                    {modoEvaluacion && (
                        <EvaluacionModal
                            kpiSeleccionado={kpiSeleccionado}
                            onClose={onClose}
                            onPlanCreated={(success) => {
                                if (success) {
                                    // aqui se pueden refrescar datos
                                    onClose();
                                } else {
                                    // se muestra algo extra
                                }
                            }}
                        />
                    )}
                    {/* Si esta en salida no conforme */}
                    {modoSalidaNoConforme && (
                        <SalidaNoConforme
                            kpiSeleccionado={kpiSeleccionado}
                            onClose={onClose}
                            onPlanCreated={(success) => {
                                if (success) {
                                    // aqui se pueden refrescar datos
                                    onClose();
                                } else {
                                    // se muestra algo extra
                                }
                            }}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    );
};
export { Formulario };
