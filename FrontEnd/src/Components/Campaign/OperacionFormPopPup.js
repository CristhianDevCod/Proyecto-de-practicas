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
import apiClient from "../../../src/Service/Service"

const {Servidor} = Service();

const OperacionFormPopPup = ({
  onClose,
  onOperacionSaved,
  clienteId,
  clienteNombre,
  initialDataOpe,
}) => {
  const [isNewOpe, setIsNewOpe] = useState(true);
  const [nombreOperacion, setNombreOperacion] = useState(
    initialDataOpe?.nombre || ""
  );
  const [estadoOperacion, setEstadoOperacion] = useState(
    initialDataOpe?.estado || "activo"
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialDataOpe?.id) {
      setIsNewOpe(false);
    }
  }, [initialDataOpe]);

  const handleSave = async (closeAfterSave = true) => {

    if (!nombreOperacion.trim() || !estadoOperacion.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const estadoNumerico = estadoOperacion === 'activo' ? 1 : 0;

    try {
      const url = initialDataOpe.id
        ? `http://${Servidor}/operacion/${initialDataOpe.id}`
        : `http://${Servidor}/operacion`;
      
      const method = initialDataOpe.id ? 'put' : 'post'; 
    
      const data = {
        nombreOperacion: nombreOperacion.toUpperCase(),
        estadoOperacion: estadoNumerico,
        clienteId: clienteId,
      };
    
      const response = await apiClient({
        method: method,
        url: url,
        data: data
      });
     
      const result = response.data; 
    
      onOperacionSaved();
    
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
        Vas agregar una operación nueva al cliente:
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginBottom: "10px" }}
        sx={{ fontWeight: "bold" }}
      >
        {clienteNombre}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nombre de la Operación"
          value={nombreOperacion}
          onChange={(e) => setNombreOperacion(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estadoOperacion}
            onChange={(e) => setEstadoOperacion(e.target.value)}
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
        {error && <Alert severity="error">{error}</Alert>}
        <Divider />
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={isNewOpe ? <AddCircleOutlineIcon /> : <UpdateIcon />}
              onClick={handleSave}
            >
              {isNewOpe ? "Guardar y Cerrar" : "Actualizar y Cerrar"}
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default OperacionFormPopPup;
