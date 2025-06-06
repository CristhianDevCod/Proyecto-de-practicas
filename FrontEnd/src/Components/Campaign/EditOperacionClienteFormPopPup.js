
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

const EditOperacionClienteFormPopPup = ({ clienteId, operacionId, servicioId, onOperacionEdit, onClose }) => {
  const { Servidor } = Service();
  const [nombreCliente, setNombreCliente] = useState('');
  const [estadoCliente, setEstadoCliente] = useState('');
  const [nombreSectorCliente, setNombreSectorCliente] = useState('');
  const [nombreOperacion, setNombreOperacion] = useState('');
  const [estadoOperacion, setEstadoOperacion] = useState('');
  // const [operacionClienteData, setOperacionClienteData] = useState([]);
  const [idSegmento, setIdSegmento] = useState('');
  const [nombreSegmento, setNombreSegmento] = useState('');
  const [estadoSegmento, setEstadoSegmento] = useState('');
  const [idServicio, setIdServicio] = useState('');
  const [nombreServicio, setNombreServicio] = useState('');
  const [nombrePais, setNombrePais] = useState('');
  const [nombreDepto, setNombreDepto] = useState('');
  const [nombreCiudad, setNombreCiudad] = useState('');
  const [nombreSede, setNombreSede] = useState('');
  const [nombreTipoServicio, setNombreTipoServicio] = useState('');
  const [genRecargoNocturno, setGenRecargoNocturno] = useState('');
  const [genRecargoDomFest, setGenRecargoDomFest] = useState('');
  const [estadoServicio, setEstadoServicio] = useState('');
  const [objetos, setObjetos] = useState([]);
  const [formError, setFormError] = useState('');
  const [alert, setAlert] = useState(-1);
  // const router = useNavigate();

  useEffect(() => {
    const fetchOperacionCliente = async () => {
      try {
        const response = await apiClient.get(`http://${Servidor}/operacionesByIdCliente/${clienteId}/${operacionId}/${servicioId}`);

        const data = await response.data;
        // setOperacionClienteData(data);
        console.log("data del cliente seleccionado", data);        
        if (data.length > 0) {
          setNombreCliente(data[0].nombre_cliente);
          setEstadoCliente(data[0].estado_cliente === 1 ? 'activo' : 'inactivo');
          setNombreSectorCliente(data[0].nombre_sector_cliente);
          setNombreOperacion(data[0].nombre_operacion);
          setEstadoOperacion(data[0].estado_operacion === 1 ? 'activo' : 'inactivo');
          setIdSegmento(data[0].id_segmento);
          setNombreSegmento(data[0].nombre_segmento);
          setEstadoSegmento(data[0].estado_segmento === 1 ? 'activo' : 'inactivo');
          setIdServicio(data[0].id_servicio);
          setNombreServicio(data[0].nombre_servicio);
          setNombrePais(data[0].nombre_pais);
          setNombreDepto(data[0].nombre_depto_estado);
          setNombreCiudad(data[0].nombre_ciudad);
          setNombreSede(data[0].nombre_sede);
          setNombreTipoServicio(data[0].nombre_tipo_servicio);
          setGenRecargoNocturno(data[0].gen_recargo_noc === 1 ? 'Si' : 'No');
          setGenRecargoDomFest(data[0].gen_recargo_dom_fest === 1 ? 'Si' : 'No');
          setEstadoServicio(data[0].estado_servicio === 1 ? 'activo' : 'inactivo');

          const {
            ids_objetos,
            nombres_objetos,
            id_canales_antencion,
            nombres_canales_atencion,
            fechas_inicio,
            ids_sistemas_gestion,
            nombres_sistemas_gestion,
            estados_objetos
          } = data[0];

          const idsArray = ids_objetos.split(',');
          const nombresArray = nombres_objetos.split(',');
          const canalesIdsArray = id_canales_antencion.split(',');
          const canalesNombresArray = nombres_canales_atencion.split(',');
          const fechaInicioArray = fechas_inicio.split(',');
          const idsSistemasGestionArray = ids_sistemas_gestion.split(',');
          const nombresSistemasGestionArray = nombres_sistemas_gestion.split(',');
          const estadosArray = estados_objetos.split(',');


          if (idsArray.length === nombresArray.length && nombresArray.length === canalesIdsArray.length && canalesIdsArray.length === canalesNombresArray.length && canalesNombresArray.length === fechaInicioArray.length && fechaInicioArray.length === idsSistemasGestionArray.length && idsSistemasGestionArray.length === nombresSistemasGestionArray.length && nombresSistemasGestionArray.length === estadosArray.length) {
            const objetosArray = nombresArray.map((nombre, index) => ({
              id: idsArray[index],
              nombre,
              canalId: canalesIdsArray[index],
              canalNombre: canalesNombresArray[index],
              fechaInicio: fechaInicioArray[index],
              idSistemaGestion: idsSistemasGestionArray[index],
              nombreSistemaGestion: nombresSistemasGestionArray[index],
              estado: estadosArray[index] === '1' ? 'activo' : 'inactivo',
            }));
            setObjetos(objetosArray);
          } else {
            console.error('Error: Arrays lengths are not equal');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchOperacionCliente();
  }, [clienteId, operacionId, Servidor]);

  const handleEstadoClienteChange = (e) => {
    setEstadoCliente(e.target.value);
    setFormError('');
  };

  const handleEstadoOperacionChange = (e) => {
    setEstadoOperacion(e.target.value);
    setFormError('');
  };

  const handleEstadoSegmentoChange = (e) => {
    setEstadoSegmento(e.target.value);
    setFormError('');
  };

  const handleRecargoNocturnoChange = (e) => {
    const selectedValue = e.target.value;
    setGenRecargoNocturno(selectedValue);
  };

  const handleRecargoDomFestChange = (e) => {
    const selectedValue = e.target.value;
    setGenRecargoDomFest(selectedValue);
  };

  const handleEstadoServicioChange = (e) => {
    setEstadoServicio(e.target.value);
    setFormError('');
  };

  const handleObjetoChange = (index, field, value) => {
    const updatedObjetos = [...objetos];
    updatedObjetos[index][field] = value;
    setObjetos(updatedObjetos);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const estadoNumericoCliente = estadoCliente === 'activo' ? 1 : 0;
    let estadoNumericoOperacion = estadoOperacion === 'activo' ? 1 : 0;
    let estadoNumericoSegmento = estadoSegmento === 'activo' ? 1 : 0;
    let estadoNumericoServicio = estadoServicio === 'activo' ? 1 : 0;
    const ReacrgoNocturnoNum = genRecargoNocturno === 'Si' ? 1 : 0;
    const ReacrgoDomFestNum = genRecargoDomFest === 'Si' ? 1 : 0;

    // Aplicar la lógica de jerarquía
    if (estadoNumericoCliente === 0) {
      estadoNumericoOperacion = 0;
      estadoNumericoSegmento = 0;
      estadoNumericoServicio = 0;
    } else if (estadoNumericoOperacion === 0) {
      estadoNumericoSegmento = 0;
      estadoNumericoServicio = 0;
    } else if (estadoNumericoSegmento === 0) {
      estadoNumericoServicio = 0;
    }

    // Si el servicio está inactivo, desactivar los objetos
    const objetosActualizados = objetos.map(objeto => ({
      id: objeto.id,
      nombre: objeto.nombre,
      estado: estadoNumericoServicio === 0 ? 0 : (objeto.estado === 'activo' ? 1 : 0),
    }));

    try {
      const url = `http://${Servidor}/clientesEstado/${clienteId}`;
      const method = 'PUT';
      const data = {
        estadoCliente: estadoNumericoCliente,
        idOperacion: operacionId,
        estadoOperacion: estadoNumericoOperacion,
        idSegmento: idSegmento,
        estadoSegmento: estadoNumericoSegmento,
        idServicio: idServicio,
        estadoServicio: estadoNumericoServicio,
        genRecargoNocturno: ReacrgoNocturnoNum,
        genRecargoDomFestivo: ReacrgoDomFestNum,
        objetos: objetosActualizados,
      };

      const response = await apiClient(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      });

      const responseData = await response.data;
      setAlert(responseData.resp);

      setTimeout(() => {
        onOperacionEdit();
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };


  // const handleBack = () => {
  //   router.push("/OperacionesHome");
  // };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: 1200, margin: '0 auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1" align="left" style={{ marginTop: "10px", marginBottom: "10px" }}>
          Edita la operación existente
        </Typography>
        <Typography variant="p" component="p" align="left" style={{ marginTop: "10px", marginBottom: "20px" }}>
          Solo puedes editar los campos que están activos.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nombre del Cliente"
              value={nombreCliente}
              variant="outlined"
              fullWidth
              error={formError && nombreCliente.trim() === ''}
              helperText={formError && nombreCliente.trim() === '' ? 'Campo obligatorio, ingresa solo texto' : ''}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="estado-select-label">Estado Cliente</InputLabel>
              <Select
                labelId="estado-select-label"
                id="estado-select"
                value={estadoCliente}
                label="Estado"
                onChange={handleEstadoClienteChange}
                error={formError && estadoCliente.trim() === ''}
              >
                <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </Select>
              {formError && estadoCliente.trim() === '' && (
                <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Sector el Cliente"
              value={nombreSectorCliente}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          {estadoCliente.trim() === 'inactivo' ? (
            <></>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre de la Operación"
                  value={nombreOperacion}
                  variant="outlined"
                  fullWidth
                  error={formError && nombreOperacion.trim() === ''}
                  helperText={formError && nombreOperacion.trim() === '' ? 'Campo obligatorio, ingresa solo texto' : ''}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="estado-operacion-select-label">Estado Operación</InputLabel>
                  <Select
                    labelId="estado-operacion-select-label"
                    id="estado-operacion-select"
                    value={estadoOperacion}
                    label="Estado Operación"
                    onChange={handleEstadoOperacionChange}
                    error={formError && estadoOperacion.trim() === ''}
                  >
                    <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </Select>
                  {formError && estadoOperacion.trim() === '' && (
                    <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              {estadoOperacion.trim() === 'inactivo' ? (
                <></>
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre del segmento"
                      value={nombreSegmento}
                      variant="outlined"
                      fullWidth
                      error={formError && nombreSegmento.trim() === ''}
                      helperText={formError && nombreSegmento.trim() === '' ? 'Campo obligatorio, ingresa solo texto' : ''}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="estado-segmento-select-label">Estado Segmento</InputLabel>
                      <Select
                        labelId="estado-segmento-select-label"
                        id="estado-segmento-select"
                        value={estadoSegmento}
                        label="Estado Segmento"
                        onChange={handleEstadoSegmentoChange}
                        error={formError && estadoSegmento.trim() === ''}
                      >
                        <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="inactivo">Inactivo</MenuItem>
                      </Select>
                      {formError && estadoSegmento.trim() === '' && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>
                  {estadoSegmento.trim() === 'inactivo' ? (
                    <></>
                  ) : (
                    <>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Nombre del servicio"
                          value={nombreServicio}
                          variant="outlined"
                          fullWidth
                          error={formError && nombreServicio.trim() === ''}
                          helperText={formError && nombreServicio.trim() === '' ? 'Campo obligatorio, ingresa solo texto' : ''}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="País"
                          value={nombrePais}
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Departamento"
                          value={nombreDepto}
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Ciudad"
                          value={nombreCiudad}
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Sede"
                          value={nombreSede}
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Tipo de Servicio"
                          value={nombreTipoServicio}
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel id="estado-genera-select-label">¿Genera recargo nocturno?</InputLabel>
                          <Select
                            labelId="estado-genera-select-label"
                            id="estado-genera-select"
                            value={genRecargoNocturno}
                            label="Genera recargo"
                            onChange={handleRecargoNocturnoChange}
                            error={formError && genRecargoNocturno.trim() === ''}
                          >
                            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                            <MenuItem value="Si">Si</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                          {formError && genRecargoNocturno.trim() === '' && (
                            <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel id="estado-genera-select-label">¿Genera recargo dominical/festivo?</InputLabel>
                          <Select
                            labelId="estado-genera-select-label"
                            id="estado-genera-select"
                            value={genRecargoDomFest}
                            label="Genera recargo"
                            onChange={handleRecargoDomFestChange}
                            error={formError && genRecargoDomFest.trim() === ''}
                          >
                            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                            <MenuItem value="Si">Si</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                          {formError && genRecargoDomFest.trim() === '' && (
                            <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel id="estado-servicio-select-label">Estado Servicio</InputLabel>
                          <Select
                            labelId="estado-servicio-select-label"
                            id="estado-servicio-select"
                            value={estadoServicio}
                            label="Estado Servicio"
                            onChange={handleEstadoServicioChange}
                            error={formError && estadoServicio.trim() === ''}
                          >
                            <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                            <MenuItem value="activo">Activo</MenuItem>
                            <MenuItem value="inactivo">Inactivo</MenuItem>
                          </Select>
                          {formError && estadoServicio.trim() === '' && (
                            <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      {estadoServicio.trim() === 'inactivo' ? (
                        <></>
                      ) : (
                        <>
                          <Grid item xs={12} sm={12}>
                            {/* {objetos.map((objeto, index) => (
                            <Grid container spacing={2} key={objeto.id}>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  label={`Nombre Skill`}
                                  value={objeto.nombre}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  label={`Fecha Inicio`}
                                  value={objeto.fechaInicio}
                                  variant="outlined"
                                  fullWidth
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                  <InputLabel id="estado-select-label">Estado Skill</InputLabel>
                                  <Select
                                    labelId="estado-select-label"
                                    id="estado-select"
                                    value={objeto.estado}
                                    label="Estado"
                                    //onChange={handleEstadoChange}
                                    error={formError && objeto.estado.trim() === ''}
                                  >
                                    <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                                    <MenuItem value="activo">Activo</MenuItem>
                                    <MenuItem value="inactivo">Inactivo</MenuItem>
                                  </Select>
                                  {formError && objeto.estado.trim() === '' && (
                                    <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                                  )}
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`Canal de atención`}
                                  value={objeto.canalNombre}
                                  variant="outlined"
                                  fullWidth
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`Sistema Gestión`}
                                  value={objeto.nombreSistemaGestion}
                                  variant="outlined"
                                  fullWidth
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                              </Grid>
                            </Grid>
                          ))} */}
                            {objetos.map((objeto, index) => (
                              <Grid container spacing={2} key={objeto.id}>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    label={`Nombre Skill`}
                                    value={objeto.nombre}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleObjetoChange(index, 'nombre', e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    label={`Fecha Inicio`}
                                    value={objeto.fechaInicio}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <FormControl fullWidth>
                                    <InputLabel id={`estado-skill-select-label-${index}`}>Estado Skill</InputLabel>
                                    <Select
                                      labelId={`estado-skill-select-label-${index}`}
                                      id={`estado-skill-select-${index}`}
                                      value={objeto.estado}
                                      label="Estado"
                                      onChange={(e) => handleObjetoChange(index, 'estado', e.target.value)}
                                    >
                                      <MenuItem value="">Por favor, selecciona el estado</MenuItem>
                                      <MenuItem value="activo">Activo</MenuItem>
                                      <MenuItem value="inactivo">Inactivo</MenuItem>
                                    </Select>
                                    {formError && objeto.estado.trim() === '' && (
                                      <Alert severity="error" sx={{ marginTop: 2 }}>Por favor, selecciona el estado</Alert>
                                    )}
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    label={`Canal de atención`}
                                    value={objeto.canalNombre}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    label={`Sistema Gestión`}
                                    value={objeto.nombreSistemaGestion}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Divider sx={{ my: 2 }} />
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Grid>
        {alert === 1 && (
          <Alert severity="success" onClose={() => setAlert(-1)}>
            ¡Cliente actualizado con éxito!
          </Alert>
        )}
        {alert === 0 && (
          <Alert severity="error" onClose={() => setAlert(-1)}>
            ¡No se pudo actualizar al cliente!
          </Alert>
        )}
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Guardar
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={onClose}
              color="error"
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>

      </form>
    </Stack>
  );

};

export default EditOperacionClienteFormPopPup;
