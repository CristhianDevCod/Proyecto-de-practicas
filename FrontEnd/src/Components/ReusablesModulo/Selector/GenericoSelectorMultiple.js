import React, { useState, useEffect, useRef } from "react";
import {
    Checkbox,
    Box,
    Tooltip,
    Grid,
    Typography,
    TextField,
    Modal,
    Button
} from "@mui/material";
// import { Checkbox, Button, Box, Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    getAutocompleteProsition,
    baseStyle,
    posicionCentral,
    posicionDinamica,
    estilosLi,
    estilosCheck,
    estilosDetalles,
} from './estilosSelector.js';
import { RemoveRedEyeRoundedIcon } from "../../../Exports-Modules/Exports.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const GenericSelectorMultiple = ({
    data = [],
    labelProp,
    inputLabel = 'Multi Select',
    columns = {},
    isEditable = false,
    initialSelected = [],
    onSelectionChange
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [options, setOptions] = useState(data);
    const [selected, setSelected] = useState([]);

    const autocompleteRef = useRef(null);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const { top, left } = getAutocompleteProsition(autocompleteRef);
    const style = { ...baseStyle, ...(isSmallScreen ? posicionCentral : posicionDinamica(top, left)) };

    // Inicializar opciones y selección
    useEffect(() => {
        setOptions(data);
        // Preseleccionar objetos cuyo labelProp está en initialSelected
        const initialSel = data.filter(item => initialSelected.includes(item[labelProp]));
        setSelected(initialSel);
    }, [data, initialSelected, labelProp]);

    // Notificar cambios de selección
    const handleChange = (_, arrKPIs) => {
        setSelected(arrKPIs);
        if (onSelectionChange) onSelectionChange(arrKPIs);
    };

    // Abrir modal de detalles
    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    const showDetails = columns && Object.keys(columns).length > 0;
    const label = inputLabel || labelProp;

    return (
        <div>
            <Autocomplete
                multiple
                options={options}
                readOnly={!isEditable}
                value={selected}
                disableCloseOnSelect
                open={openAutocomplete}
                onChange={handleChange}
                onOpen={() => setOpenAutocomplete(true)}
                onClose={() => { if (!openModal) setOpenAutocomplete(false); }}
                getOptionLabel={(option) => String(option[labelProp] || "")}
                renderOption={(props, option, { selected }) => (
                    <li
                        {...props}
                        key={option[labelProp] + '_opt'}
                        style={estilosLi}
                    >
                        <Box sx={estilosCheck}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                sx={{ mr: 1 }}
                                checked={selected}
                            />
                            <Typography variant="body1">{option[labelProp]}</Typography>
                        </Box>
                        {showDetails && (
                            <Tooltip title="Ver detalles" placement="right-start">
                                <Button
                                    sx={estilosDetalles}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewDetails(option);
                                    }}
                                >
                                    <RemoveRedEyeRoundedIcon />
                                </Button>
                            </Tooltip>
                        )}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} label={label} placeholder={`Selecciona ${label}`} />
                )}
                style={{ width: 400 }}
                ref={autocompleteRef}
            />

            {showDetails && openModal && selectedItem && (
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } } }}
                >
                    <Box sx={{ ...style, width: 400, padding: '20px' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            {selectedItem[labelProp]}
                        </Typography>
                        <Grid container spacing={2}>
                            {Object.entries(columns).map(([header, propKey]) => (
                                <Grid item size={6} key={propKey}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label={header}
                                        value={selectedItem[propKey] ?? 'No disponible'}
                                        slotProps={{ input: { readOnly: true } }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default GenericSelectorMultiple;
