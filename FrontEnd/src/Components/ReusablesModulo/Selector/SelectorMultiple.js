import { Checkbox, Button, Box, Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Container from "@mui/material/Container";
import { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import capitalizeFirstLetterInArrays from "./utils";
import generadorCampos from "./generadorCampos";
import { getAutocompleteProsition, baseStyle, posicionCentral, posicionDinamica } from './estilosSelector.js'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultipleSelectChip = ({ isEditable, onSelectionChange, initialSelectedKpis = [], KPIS }) => {
    //Controles de modal
    const [openModal, setOpenModal] = useState(false);
    const [selectedKPI, setSelectedKPI] = useState(null);
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    //Carga de kpis
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([])
    //Referencia para el autocomplete
    const autocompleteRef = useRef(null);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const { top, left } = getAutocompleteProsition(autocompleteRef);

    //Función que abra la modal y setea el KPI seleccionado
    const handleViewDetails = (kpi) => {
        const nuevoKpi = capitalizeFirstLetterInArrays(kpi);
        setSelectedKPI(nuevoKpi);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    //Funcion para obtener todos los KPIs
    const getAll = useCallback(async () => {
        let listadoKPIs = [{}]
        try {
            const response = await KPIS();
            listadoKPIs = response.filter(kpi => kpi.estado_kpi_id !== 3) //Filtra aquellos inactivos
            setData(listadoKPIs);
        } catch (error) {
            console.log("Error al obtener los datos: ", error);
        }
    }, [KPIS])
    useEffect(() => {
        getAll()
    }, [getAll])

    //Cuando se cargue la data y se tenga la prop initialSelectedKpis, 
    //Se actualzia el estado "selected" con los kpis que coinciden en el id
    useEffect(() => {
        if (data.length > 0 && initialSelectedKpis.length > 0) {
            const selectedKpiIds = initialSelectedKpis.map(item => item.kpi_id);
            const initialSelected = data.filter(kpi => selectedKpiIds.includes(kpi.id_kpi));
            setSelected(initialSelected)
        }
    }, [data, initialSelectedKpis]);

    // Estilos condicionales
    const conditionalStyle = isSmallScreen ? posicionCentral : posicionDinamica(top, left);

    // Combina los estilos
    const style = { ...baseStyle, ...conditionalStyle };

    //Manejar cambios en la sección
    const handleChange = (_, newValue) => {
        setSelected(newValue);
        //Extraer solo los IDS de los KPIs seleccionados
        const selectedIds = newValue.map(kpi => kpi.id_kpi);

        //Notificar al componente padre si existe la prop
        if (onSelectionChange) {
            onSelectionChange(selectedIds)
        }
    }

    return (
        <div>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={data}
                readOnly={!isEditable}
                value={selected}
                disableCloseOnSelect
                open={openAutocomplete}
                onChange={handleChange}
                onOpen={() => setOpenAutocomplete(true)}
                onClose={() => {
                    //Si la modal está abierta, evitamos que se cierre el autocomplete.
                    if (openModal) return;
                    setOpenAutocomplete(false);
                }}
                getOptionLabel={(kpi) => kpi.nombre_kpi ? String(kpi.nombre_kpi) : ""}
                renderOption={(props, option, { selected }) => {
                    //Se extrae la key manualmente y el resto de props
                    const { key, ...restProps } = props;
                    return (
                        <li
                            key={key}
                            {...restProps}
                            style={{
                                ...props.style,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Container>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />

                                {/* Nombre del KPI */}
                                {option.nombre_kpi}
                            </Container>

                            {/* Boton para ver detalles que abre la modal*/}
                            <span
                                onMouseDown={(e) => {
                                    e.preventDefault(); //Evita que se dispare el comportamiento por defecto
                                    e.stopPropagation(); //Evita que el evento se propague al Autocompletar
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Tooltip title="Ver detalles" placement="right-start">
                                    <Button
                                        sx={{
                                            marginLeft: "10px",
                                            padding: "2px",
                                            minWidth: "32px",
                                            alignSelf: "end",
                                        }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewDetails(option);
                                        }}
                                    >
                                        <RemoveRedEyeIcon />
                                    </Button>
                                </Tooltip>
                            </span>
                        </li>
                    );
                }}
                style={{ width: 400 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Selección de KPIs"
                        placeholder="Selecciona los KPI"
                    />
                )}
                ref={autocompleteRef} //Se asigna la referencia
            />

            {/* Modal que se muestra con los detalles */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                slotProps={{
                    backdrop: {
                        style: { backgroundColor: "transparent" },
                    },
                }}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{ ...style, width: 480, position: "relative", padding: "20px" }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        marginBottom="20px"
                        gutterBottom
                    >
                        <p>KPI {selectedKPI?.nombre_kpi || "No disponible"}</p>
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Renderiza los campos de la vista de forma dinamica */}
                        {generadorCampos(selectedKPI || {})}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default MultipleSelectChip;