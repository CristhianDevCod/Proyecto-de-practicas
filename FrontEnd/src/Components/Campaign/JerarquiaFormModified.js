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

const JerarquiaFormModified = ({ onClose, idOperacion }) => {
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
  const [formLoading, setFormLoading] = useState(true);
  const { api } = useContext(NotificationsContextNoveltie);

  useEffect(() => {
    // OBTENER LISTA DE ÁREAS Y ROLES CUANDO EL COMPONENTE SE MONTA
    const fetchInitialData = async () => {
      try {
        const areasResponse = await apiClient.get(`http://${Servidor}/areas`);
        setAreas(areasResponse.data || []);

        const rolesResponse = await apiClient.get(`http://${Servidor}/roles`);
        setRoles(rolesResponse.data || []);
      } catch (error) {
        console.error('Error al obtener áreas y roles:', error);
      } finally {
        setFormLoading(false);
      }
    };

    fetchInitialData();
  }, [Servidor]);

  useEffect(() => {
    const fetchData = async () => {
      if (idOperacion && idOperacion !== 0 && roles.length > 0) {
        setFormLoading(true);
        try {
          const response = await apiClient.get(`http://${Servidor}/jerarquias/operacion/${idOperacion}`);
          const data = response.data;
          // console.log("Datos de la jerarquía obtenidos: ", data);

          if (data && data.areas && data.areas.length > 0) {
            const initialAssignments = {};
            const initialSelectedPeople = {};
            const initialAreaNames = {};
            const peopleOptions = {};
            const loadingState = {};

            const peoplePromises = [];

            for (const area of data.areas) {
              initialAssignments[area.id_area] = area.roles?.map(role => ({
                id_rol: role.id_rol,
              })) || [];

              initialSelectedPeople[area.id_area] = {};
              for (const role of area.roles || []) {
                // Almacenar los documentos de las personas seleccionadas
                initialSelectedPeople[area.id_area][role.id_rol] = role.personas?.map(persona => persona.Documento) || [];

                // Obtener opciones de personas para este rol
                const roleObj = roles.find((r) => r.id_rol === role.id_rol);
                if (roleObj) {
                  loadingState[role.id_rol] = true;

                  const peoplePromise = apiClient.get(`http://${Servidor}/personas/personasByCargo/${roleObj.nombre_rol}`)
                    .then(response => {
                      const formattedPeople = response.data.map(person => ({
                        Documento: person.Documento,
                        Nombres: person.Nombres || 'Nombre no definido',
                        Apellidos: person.Apellidos || 'Apellido no definido',
                      }));
                      peopleOptions[role.id_rol] = formattedPeople;
                    })
                    .catch(error => {
                      console.error('Error al obtener personas:', error);
                    })
                    .finally(() => {
                      loadingState[role.id_rol] = false;
                    });

                  peoplePromises.push(peoplePromise);
                }
              }

              initialAreaNames[area.id_area] = area.nombre_personalizado;
            }

            await Promise.all(peoplePromises);

            setRoleAssignments(initialAssignments);
            setSelectedPeople(initialSelectedPeople);
            setAreaNames(initialAreaNames);
            setPeople(peopleOptions);
            setLoading(loadingState);
          }
        } catch (error) {
          console.error('Error al obtener la jerarquía específica:', error);
        } finally {
          setFormLoading(false);
        }
      }
    };

    fetchData();
  }, [idOperacion, Servidor, roles]);

  const handleRoleChange = (areaId, event) => {
    const selectedRoles = event.target.value.map((roleName) => {
      const roleObj = roles.find((role) => role.nombre_rol === roleName);
      return roleObj ? { id_rol: roleObj.id_rol } : null;
    }).filter(Boolean);

    setRoleAssignments({
      ...roleAssignments,
      [areaId]: selectedRoles,
    });

    // Obtener lista de personas asignadas a cada rol seleccionado
    selectedRoles.forEach(async ({ id_rol }) => {
      if (id_rol) {
        const roleObj = roles.find((role) => role.id_rol === id_rol);
        setLoading((prevState) => ({ ...prevState, [id_rol]: true }));
        try {
          const response = await apiClient.get(`http://${Servidor}/personas/personasByCargo/${roleObj.nombre_rol}`);
          const formattedPeople = response.data.map(person => ({
            Documento: person.Documento,
            Nombres: person.Nombres || 'Nombre no definido',
            Apellidos: person.Apellidos || 'Apellido no definido',
          }));
          setPeople((prevState) => ({
            ...prevState,
            [id_rol]: formattedPeople,
          }));
        } catch (error) {
          console.error('Error al obtener personas:', error);
        } finally {
          setLoading((prevState) => ({ ...prevState, [id_rol]: false }));
        }
      }
    });
  };

  // Modificar handlePersonChange para que acepte areaId y roleId
  const handlePersonChange = (areaId, roleId, selectedPersons) => {
    setSelectedPeople((prevState) => ({
      ...prevState,
      [areaId]: {
        ...(prevState[areaId] || {}),
        [roleId]: selectedPersons.map((person) => person.Documento),
      },
    }));
  };

  const handleRemoveRole = (areaId, roleId) => {
    const updatedRoles = roleAssignments[areaId]?.filter(
      (role) => role.id_rol !== roleId
    ) || [];
    setRoleAssignments({
      ...roleAssignments,
      [areaId]: updatedRoles,
    });
    setSelectedPeople((prevState) => {
      const updatedSelectedPeople = { ...prevState };
      if (updatedSelectedPeople[areaId]) {
        delete updatedSelectedPeople[areaId][roleId];
      }
      return updatedSelectedPeople;
    });
  };

  const handleUpdateJerarquia = () => {
    const updatedJerarquia = {
      // Ya no necesitamos enviar id_operacion en el cuerpo
      areas: Object.keys(roleAssignments).map((areaId) => ({
        id_area: parseInt(areaId, 10),
        nombre_personalizado: areaNames[areaId] || "",
        roles: roleAssignments[areaId]?.map((role) => ({
          id_rol: role.id_rol,
          personas: selectedPeople[areaId]?.[role.id_rol] || [],
        })) || [],
      })),
    };

    apiClient.put(`http://${Servidor}/jerarquias/modified/${idOperacion}`, updatedJerarquia)
      .then(() => {
        api.success({
          message: 'Éxito',
          description: 'Jerarquía actualizada correctamente.',
        });
        // console.log("Jerarquía actualizada con éxito");
        setSnackbarMessage("Jerarquía actualizada con éxito");
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        api.error({
          message: 'Error',
          description: 'Error al actualizar la jerarquía'
        })
        console.error('Error al actualizar la jerarquía:', error);
        setSnackbarMessage("Error al actualizar la jerarquía");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const isSaveButtonDisabled = () => {
    return !areas.every((area) =>
      roleAssignments[area.id_area]?.length > 0 &&
      roleAssignments[area.id_area].every((role) =>
        selectedPeople[area.id_area]?.[role.id_rol]?.length > 0
      )
    ) || Object.values(areaNames).some(name => name.trim() === "");
  };

  const colors = [
    "#0033A0", "#C8102E", "#007A33", "#FF6600",
    "#333333", "#5C2F91", "#1E8E8E", "#FFC107",
  ];

  const generateColor = (name) => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: "8px", padding: "20px", maxWidth: "100%", maxHeight: "calc(100vh - 40px)", overflowY: "auto" }}>
      {formLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>Modificar Jerarquía</Typography>
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
                        value={roleAssignments[area.id_area]?.map(
                          (role) =>
                            roles.find((r) => r.id_rol === role.id_rol)?.nombre_rol || ""
                        ) || []}
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
                                roles.find((r) => r.id_rol === role.id_rol)?.nombre_rol || ""
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
                              multiple
                              options={people[role.id_rol] || []}
                              getOptionLabel={(option) => `${option.Nombres} ${option.Apellidos}`.trim()}
                              onChange={(event, value) => handlePersonChange(area.id_area, role.id_rol, value)}
                              value={
                                people[role.id_rol]?.filter(person =>
                                  (selectedPeople[area.id_area]?.[role.id_rol] || []).includes(person.Documento)
                                ) || []
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
                                          <CircularProgress color="primary" size={20} />
                                        )}
                                        {params.InputProps.endAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                              noOptionsText="No hay opciones disponibles"
                              isOptionEqualToValue={(option, value) => option.Documento === value.Documento}
                            />
                          </CardContent>
                        </Card>
                      ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleUpdateJerarquia} disabled={isSaveButtonDisabled()}>
              Actualizar Jerarquía
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
          {/* Snackbar para mensajes */}
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default JerarquiaFormModified;
