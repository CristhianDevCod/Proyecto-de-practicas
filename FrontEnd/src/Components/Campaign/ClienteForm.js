import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import UpdateIcon from "@mui/icons-material/Update";
import Typography from "@mui/material/Typography";
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";

const { Servidor } = Service();

const ClienteForm = ({ onAlertChange, onClienteSaved, initialData, handleComponentSelect }) => {
  const [isNewClient, setIsNewClient] = useState(true);
  const [nombreCliente, setNombreCliente] = useState(initialData.nombre);
  const [estadoCliente, setEstadoCliente] = useState(initialData.estado || "activo");
  const [sectoresClienteData, setSectoresClienteData] = useState([]);
  const [idSectorCliente, setIdSectorCliente] = useState(initialData.sector);
  const [formError, setFormError] = useState("");
  const [alert, setAlert] = useState(-1);

  // const router = useNavigate();

  useEffect(() => {
    setNombreCliente(initialData.nombre);
    setEstadoCliente(initialData.estado || "activo");
    setIdSectorCliente(initialData.sector);
    setIsNewClient(initialData.id === null);
  }, [initialData]);

  useEffect(() => {
    const fetchSectoresCliente = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/sectorClientes`); // Usa apiClient con la URL completa
        const data = response.data; // Obtén los datos directamente de la propiedad 'data'
        setSectoresClienteData(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchSectoresCliente();
  }, []);
  

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    if (regex.test(inputValue)) {
      setNombreCliente(inputValue);
      setFormError(false);
    } else {
      setFormError("No se aceptan carácteres especiales");
    }
  };
  
  const handleEstadoChange = (e) => {
    const selectedValue = e.target.value;
    setEstadoCliente(selectedValue);
    setFormError("");
  };

  const handleSectorClienteChange = (e) => {
    const selectedValue = e.target.value;
    setIdSectorCliente(selectedValue);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar campos
    if (!nombreCliente.trim() || !estadoCliente.trim() || !idSectorCliente) {
      setFormError("Todos los campos son obligatorios");
      return;
    }
  
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s\d]*$/;
    if (!regex.test(nombreCliente)) {
      setFormError("Ingresa solo texto o números");
      return;
    }
  
    const estadoNumerico = estadoCliente === "activo" ? 1 : 0;
  
    try {
      const url = isNewClient
        ? `http://${Servidor}/clientes`
        : `http://${Servidor}/clientes/${initialData.id}`;
      const method = isNewClient ? "POST" : "PUT";
      const data = {
        nombreCliente: nombreCliente.toUpperCase(),
        sectorClienteId: idSectorCliente,
        estadoCliente: estadoNumerico,
      };
  
      const response = await apiClient(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
  
      const responseData = await response.data;
      setAlert(responseData.resp);
  
      if (responseData.resp === 1) {
        const idClienteNuevo = responseData.idCliente;
        onClienteSaved(
          idClienteNuevo,
          nombreCliente,
          estadoCliente,
          idSectorCliente
        );
      } else {
        setFormError("Error al guardar en el servidor");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setFormError("Ocurrió un error al guardar");
    }
  };  

  const handleBack = () => {
    handleComponentSelect('Home Operaciones');
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: 400, margin: "0 auto" }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          component="h1"
          align="left"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          {isNewClient ? "Crear Cliente" : "Actualizar Cliente"}
        </Typography>
        <TextField
          label="Nombre del Cliente"
          value={nombreCliente}
          onChange={handleNombreChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          error={Boolean(formError && nombreCliente.trim() === "")}
          helperText={formError && nombreCliente.trim() === "" ? formError : ""}
        />
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="estado-select-label">Estado</InputLabel>
          <Select
            labelId="estado-select-label"
            id="estado-select"
            value={estadoCliente}
            label="Estado"
            onChange={handleEstadoChange}
            error={Boolean(formError && estadoCliente.trim() === "")}
          >
            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
          {formError && estadoCliente.trim() === "" && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {formError}
            </Alert>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="select-sector-label">Seleccione un sector</InputLabel>
          <Select
            labelId="select-sector-label"
            id="select-sector"
            value={idSectorCliente}
            label="Seleccione un Sector"
            onChange={handleSectorClienteChange}
            error={Boolean(formError && !idSectorCliente)}
          >
            <MenuItem value="">Por favor, selecciona el sector</MenuItem>
            {sectoresClienteData.map((sectorCliente) => (
              <MenuItem
                key={sectorCliente.id_sector_cliente}
                value={sectorCliente.id_sector_cliente}
              >
                {sectorCliente.nombre_sector_cliente}
              </MenuItem>
            ))}
          </Select>
          {formError && !idSectorCliente && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {formError}
            </Alert>
          )}
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          startIcon={isNewClient ? <AddCircleOutlineIcon /> : <UpdateIcon />}
          fullWidth
        >
          {isNewClient ? "Crear Cliente" : "Actualizar Cliente"}
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          color="success"
          fullWidth
        >
          Volver
        </Button>
      </form>
      {alert === 1 && (
        <Alert severity="success" onClose={() => setAlert(-1)}>
          Cliente creado con éxito
        </Alert>
      )}
      {alert === 0 && (
        <Alert severity="error" onClose={() => setAlert(-1)}>
          ¡Ya existe un cliente creado con ese mismo nombre!
        </Alert>
      )}
    </Stack>
  );
};

export default ClienteForm;
