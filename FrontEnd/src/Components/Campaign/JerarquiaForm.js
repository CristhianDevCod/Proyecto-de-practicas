import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
  TextField,
  Autocomplete,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";
import { NotificationsContextNoveltie } from "../../Context/ContextNotificationNoveltie";

const JerarquiaForm = ({ onClose, idOperacion, onJerarquiaSaved  }) => {
  const { Servidor } = Service();
  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleAssignments, setRoleAssignments] = useState({});
  const [people, setPeople] = useState({});
  const [selectedPeople, setSelectedPeople] = useState({});
  const [loading, setLoading] = useState({});
  const [areaNames, setAreaNames] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { api } = useContext(NotificationsContextNoveltie);

  useEffect(() => {
    // OBTENER LISTA DE ÁREAS Y ROLES CUANDO EL COMPONENTE SE MONTA
    apiClient.get(`http://${Servidor}/areas`).then((response) => {
      setAreas(response.data);
      const initialAssignments = response.data.reduce((acc, area) => {
        acc[area.id_area] = [];
        return acc;
      }, {});
      setRoleAssignments(initialAssignments);
    });

    apiClient
      .get(`http://${Servidor}/roles`)
      .then((response) => setRoles(response.data));
  }, [Servidor]);

  // MANEJAR CAMBIO DE ROLES SELECCIONADOS PARA UN ÁREA
  const handleRoleChange = (areaId, event) => {
    const selectedRoles = event.target.value.map((roleName) => {
      const roleObj = roles.find((role) => role.nombre_rol === roleName);
      return { id_rol: roleObj.id_rol };
    });

    setRoleAssignments({
      ...roleAssignments,
      [areaId]: selectedRoles,
    });

    // OBTENER LISTA DE PERSONAS ASIGNADAS A CADA ROL SELECCIONADO
    selectedRoles.forEach(({ id_rol }) => {
      const roleObj = roles.find((role) => role.id_rol === id_rol);
      setLoading((prevState) => ({ ...prevState, [id_rol]: true }));
      apiClient
        .get(`http://${Servidor}/personas/personasByCargo/${roleObj.nombre_rol}`)
        .then((response) => {
          setPeople((prevState) => ({
            ...prevState,
            [id_rol]: response.data,
          }));
        })
        .finally(() => {
          setLoading((prevState) => ({ ...prevState, [id_rol]: false }));
        });
    });
  };

  // MANEJAR CAMBIO EN LA SELECCIÓN DE PERSONAS PARA UN ROL
  // const handlePersonChange = (roleId, selectedPersons) => {
  //   setSelectedPeople({
  //     ...selectedPeople,
  //     [roleId]: selectedPersons.map(person => person.Documento),
  //   });
  // };

  const handlePersonChange = (areaId, roleId, selectedPersons) => {
    setSelectedPeople((prevState) => ({
      ...prevState,
      [areaId]: {
        ...(prevState[areaId] || {}),
        [roleId]: selectedPersons.map((person) => person.Documento),
      },
    }));
  };

  // ELIMINAR UN ROL ASIGNADO DE UN ÁREA
  const handleRemoveRole = (areaId, roleId) => {
    const updatedRoles = roleAssignments[areaId].filter(
      (role) => role.id_rol !== roleId
    );
    setRoleAssignments({
      ...roleAssignments,
      [areaId]: updatedRoles,
    });
    setSelectedPeople({
      ...selectedPeople,
      [roleId]: undefined,
    });
  };

  // GUARDAR LA NUEVA JERARQUÍA EN EL SERVIDOR
  // const handleSaveJerarquia = () => {
  //   const nuevaJerarquia = {
  //     id_operacion: idOperacion,
  //     areas: Object.keys(roleAssignments).map((areaId) => ({
  //       id_area: parseInt(areaId, 10),
  //       nombre_personalizado: areaNames[areaId] || "",
  //       roles: roleAssignments[areaId].map((role) => ({
  //         id_rol: role.id_rol,
  //         personas: selectedPeople[role.id_rol] || [],
  //       })),
  //     })),
  //   };

  //   apiClient
  //     .post(`http://${Servidor}/jerarquias`, nuevaJerarquia)
  //     .then(() => {
  //       console.log("Jerarquía guardada con éxito");
  //       // CONFIGURAR MENSAJE Y TIPO DE SNACKBAR
  //       setSnackbarMessage("Jerarquía guardada con éxito");
  //       setSnackbarSeverity('success');
  //       setSnackbarOpen(true);
  //       // RESETEAR FORMULARIO DESPUÉS DE GUARDAR
  //       setRoleAssignments({});
  //       setSelectedPeople({});
  //       setAreaNames({});
  //       onClose(); // CERRAR EL MODAL
  //     })
  //     .catch((error) => {
  //       console.error("Error al guardar la jerarquía:", error);
  //     });
  // };

  const handleSaveJerarquia = () => {
    const nuevaJerarquia = {
      id_operacion: idOperacion, // Asegúrate de incluir el id_operacion
      areas: Object.keys(roleAssignments).map((areaId) => ({
        id_area: parseInt(areaId, 10),
        nombre_personalizado: areaNames[areaId] || "",
        roles: roleAssignments[areaId].map((role) => ({
          id_rol: role.id_rol,
          personas: selectedPeople[areaId]?.[role.id_rol] || [],
        })),
      })),
    };
  
    apiClient
      .post(`http://${Servidor}/jerarquias`, nuevaJerarquia)
      .then(() => {
        api.success({
          message: 'Éxito',
          description: 'Jerarquía guardada correctamente.',
        });
        // console.log("Jerarquía guardada con éxito");
        setSnackbarMessage("Jerarquía guardada con éxito");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setRoleAssignments({});
        setSelectedPeople({});
        setAreaNames({});
        onClose();
        onJerarquiaSaved(idOperacion);
      })
      .catch((error) => {
        api.error({
          message: 'Error',
          description: 'Error al guardar la jerarquía'
        })
        console.error("Error al guardar la jerarquía:", error);
      });
  };
  
  // FUNCION PARA VERIFICAR SI EL BOTÓN DE GUARDAR DEBE ESTAR DESACTIVADO
  // const isSaveButtonDisabled = () => {
  //   // VERIFICAR SI CADA ÁREA TIENE ROLES ASIGNADOS Y CADA ROL TIENE PERSONAS SELECCIONADAS
  //   return !areas.every((area) =>
  //     roleAssignments[area.id_area]?.length > 0 &&
  //     roleAssignments[area.id_area].every((role) =>
  //       selectedPeople[role.id_rol]?.length > 0
  //     )
  //   ) || Object.values(areaNames).some(name => name.trim() === "");
  // };
  const isSaveButtonDisabled = () => {
    // VERIFICAR SI CADA ÁREA TIENE ROLES ASIGNADOS Y CADA ROL TIENE PERSONAS SELECCIONADAS
    return (
      !areas.every((area) =>
        roleAssignments[area.id_area]?.length > 0 &&
        roleAssignments[area.id_area].every((role) =>
          selectedPeople[area.id_area]?.[role.id_rol]?.length > 0
        )
      ) || Object.values(areaNames).some((name) => name.trim() === "")
    );
  };

  // FUNCIÓN PARA ASIGNAR UN COLOR DE BORDE DIFERENTE A CADA ÁREA
  const colors = [
    "#0033A0",
    "#C8102E",
    "#007A33",
    "#FF6600",
    "#333333",
    "#5C2F91",
    "#1E8E8E",
    "#FFC107",
  ];

  const generateColor = (name) => {
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length;
    return colors[index];
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "100%",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Crear Nueva Jerarquía
      </Typography>

      <Grid container spacing={2}>
        {areas.map((area) => (
          <Grid item xs={12} key={area.id_area}>
            <Card
              variant="outlined"
              sx={{
                borderColor: generateColor(area.nombre_area),
                borderWidth: 2,
                borderStyle: "solid",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {area.nombre_area}
                </Typography>

                <TextField
                  label="Nombre para la Jerarquía"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={areaNames[area.id_area] || ""}
                  onChange={(e) =>
                    setAreaNames({
                      ...areaNames,
                      [area.id_area]: e.target.value,
                    })
                  }
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel id={`roles-${area.id_area}`}>Roles</InputLabel>
                  <Select
                    labelId={`roles-${area.id_area}`}
                    multiple
                    value={roleAssignments[area.id_area].map(
                      (role) =>
                        roles.find((r) => r.id_rol === role.id_rol).nombre_rol
                    )}
                    onChange={(event) =>
                      handleRoleChange(area.id_area, event)
                    }
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 200 },
                      },
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id_rol} value={role.nombre_rol}>
                        {role.nombre_rol}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {roleAssignments[area.id_area] &&
                  roleAssignments[area.id_area].map((role) => (
                    <Card
                      key={role.id_rol}
                      variant="outlined"
                      sx={{ marginTop: "20px", position: "relative" }}
                    >
                      <CardContent>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          Asigna un{" "}
                          {
                            roles.find((r) => r.id_rol === role.id_rol)
                              .nombre_rol
                          }
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              handleRemoveRole(area.id_area, role.id_rol)
                            }
                            sx={{
                              color: "error.main",
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Typography>
                        <Autocomplete
                          multiple // PERMITIR SELECCIONAR MÚLTIPLES PERSONAS
                          options={people[role.id_rol] || []}
                          getOptionLabel={(option) =>
                            option.Nombres + " " + option.Apellidos
                          }
                          onChange={(event, value) =>
                            handlePersonChange(area.id_area, role.id_rol, value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccionar Personas"
                              variant="outlined"
                              placeholder="Buscar personas"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {loading[role.id_rol] && (
                                      <CircularProgress
                                        color="primary"
                                        size={20}
                                      />
                                    )}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option.Documento === value.Documento
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSaveJerarquia}  disabled={isSaveButtonDisabled()}>
          Guardar Jerarquía
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ marginLeft: "10px" }}
        >
          Cancelar
        </Button>
      </Box>
      {/* SNACKBAR PARA ALERTAS */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JerarquiaForm;