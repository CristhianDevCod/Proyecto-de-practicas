import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";

const {Servidor} = Service();

const SegmentoFormPopPup = ({
  onClose,
  onSegmentoSaved,
  operacionId,
  operacionNombre,
  initialDataSeg,
}) => {
  const [isNewSeg, setIsNewSeg] = useState(true);
  const [nombreSegmento, setNombreSegmento] = useState(
    initialDataSeg?.nombre || ""
  );
  const [estadoSegmento, setEstadoSegmento] = useState(
    initialDataSeg?.estado || "activo"
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialDataSeg?.id) {
      setIsNewSeg(false);
    }
  }, [initialDataSeg]);

  const handleSave = async (closeAfterSave = true) => {

    if (!nombreSegmento.trim() || !estadoSegmento.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const estadoNumerico = estadoSegmento === 'activo' ? 1 : 0;

    try {
      const url = initialDataSeg.id
        ? `http://${Servidor}/segmentos/${initialDataSeg.id}`
        : `http://${Servidor}/segmentos`;
      
      const method = initialDataSeg.id ? 'put' : 'post'; 
    
      const data = {
        nombreSegmento: nombreSegmento.toUpperCase(),
        estadoSegmento: estadoNumerico,
        operacionId: operacionId,
      };
    
      // Realiza la solicitud con apiClient
      await apiClient({
        method: method,
        url: url,
        data: data
      });
    
      onSegmentoSaved();
    
      if (closeAfterSave) {
        onClose();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Vas agregar un segmento nuevo a la operación:
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginBottom: "10px" }}
        sx={{ fontWeight: "bold" }}
      >
        {operacionNombre}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nombre del segmento"
          value={nombreSegmento}
          onChange={(e) => setNombreSegmento(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estadoSegmento}
            onChange={(e) => setEstadoSegmento(e.target.value)}
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
        {error && <Alert severity="error">{error}</Alert>}
        <Divider />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={isNewSeg ? <AddCircleOutlineIcon /> : <UpdateIcon />}
              onClick={handleSave}
            >
            {isNewSeg ? "Guardar y Cerrar" : "Actualizar y Cerrar"}
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default SegmentoFormPopPup;
