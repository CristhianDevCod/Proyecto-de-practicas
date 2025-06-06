import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Typography from "@mui/material/Typography";
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";

const AsignarBasesFormPopPup = ({
  servicioId,
  servicioNombre,
  onBaseSaved,
}) => {
  const {Servidor} = Service();
  const [isNewOpe, setIsNewOpe] = useState(1);
  const [nombreBase, setNombreBase] = useState("");
  const [fechaReciboBase, setFechaReciboBase] = useState(null);
  const [formErrorFecha, setFormErrorFecha] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    // console.log(
    //   `Servicio ID: ${servicioId}, Servicio Nombre: ${servicioNombre}`
    // );
  }, [servicioId, servicioNombre]);

  const handleNombreBaseChange = (e) => {
    const inputValue = e.target.value;
    setNombreBase(inputValue);
    if (inputValue) {
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handleFechaReciboBaseChange = (date) => {
    setFechaReciboBase(date);
    if (!fechaReciboBase) {
      setFormErrorFecha("Campo obligatorio, selecciona una fecha");
    }
    setFormErrorFecha("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombreBase.trim() === "") {
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }
    if (!fechaReciboBase) {
      setFechaError(true);
      return;
    } else {
      setFechaError(false);
    }

    const fechaFormateada = fechaReciboBase.toISOString().split("T")[0];

    try {
      const url = `http://${Servidor}/bases`;
      const method = "POST";
      const data = {
        nombreBase: nombreBase.toUpperCase(),
        fechaRecibo: fechaFormateada,
        servicioId: servicioId,
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
      onBaseSaved();

    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            {isNewOpe ? "Asignar Bases" : "Actualizar Operación"}
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Nombre del Servicio"
              value={servicioNombre}
              variant="outlined"
              fullWidth
              disabled
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Nombre de la base"
              value={nombreBase}
              onChange={handleNombreBaseChange}
              variant="outlined"
              fullWidth
              helperText={nombreError}
            />
            {nombreError && <Alert severity="error">Campo obligatorio</Alert>}
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <DatePicker
              label="Fecha Recibido"
              value={fechaReciboBase}
              onChange={handleFechaReciboBaseChange}
              inputFormat="YYYY-MM-DD"
              sx={{ marginBottom: 2 }}
              renderInput={(params) => <TextField {...params} />}
            />
            {fechaError && <Alert severity="error">Campo obligatorio</Alert>}
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            startIcon={<AssignmentTurnedInIcon />}
            fullWidth
          >
            Guardar Asignación
          </Button>
        </form>
        {alert === 1 && (
          <Alert severity="success" onClose={() => setAlert(-1)}>
            Asignación creada con éxito
          </Alert>
        )}
        {alert === 0 && (
          <Alert severity="error" onClose={() => setAlert(-1)}>
            ¡No fue posible crear la asignación!
          </Alert>
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default AsignarBasesFormPopPup;
