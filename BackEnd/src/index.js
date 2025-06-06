"use strict";

//---------------------💻📚dependencias para el correcto funcionamiento de la API💻📚------------------
const { PORT, HOST } = require("./Port-And-Host/Port-And-Host");

const expressModule = require("express");
const app = expressModule();
const cors = require("cors");
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server, { cors: { origin: '*' } });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "5000mb" }));

// ===============================================================================
// ==🚧 			IMPORTACIONES DE LAS RUTAS A UTILIZAR 🚧                   ==
// ===============================================================================

const Logs = require("./Logs/Logs");
const Extra = require("./Extra/Extra");
const Shifts = require("./Shifts/Shifts");
const Survey = require("./Survey/Survey");
const Payroll = require("./Payroll/Payroll");
const Exports = require("./Exports/Exports");
const Changes = require("./Changes/changes");
const feeling = require("./Feelings/Feelings");
const Tardiness = require("./Tardiness/Tardiness");
const Push_Malla = require("./Imports/Push_Malla");
const Permissions = require("./Admin/Permissions");
const Extra_Work = require('./Extra_Work/Extra_Work');
const ImgEveryDay = require("./ImgEveryDay/ImgEveryDay");
const ExportsShifts = require("./Exports/ExportsShifts");
const GetInformation = require("./Users/GetInformation");
const ActiveDirectory = require("./LDAP/ActiveDirectory");
const RejectHourExtra = require("./Extra/RejectHourExtra");
const ID_Imagen = require("./Users/ProfileUsers/ID_Imagen");
const GetListUsers = require("./Notifications/GetListUsers");
const UnreadMessages = require("./Unread-messages/Unread-messages");
const SendNotifications = require("./Notifications/SendNotifications");
const AuthomatlyReject = require("./AuthomatlyReject/AuthomatlyReject");
const UpdateInformation = require("./Users/UpdateInfo/UpdateInformation");
const GenerateNoveltie = require("./GeneratedNoveltie/GeneratedNoveltie");
// const AutoScheduleShift = require('./AutoScheduleShift/AutoScheduleShift');
const procesarRetiros = require("./AuthomatlyReject/AuthomatlyRejectShift");
const Push_Malla_Admistrativo = require("./Imports/Push_Malla_Admistrativo");
// const AuthomatlyAccepShifts = require('./AuthomatlyReject/AuthomatlyAccepShifts');
const SendNotificationsNovelties = require("./GeneratedNoveltie/SendNotificationNoveties");
const AuthomathlyUpdateTables = require("./Imports/AuthomathlyUpdate.Tables/AthomathlyUpdate.Tables");
const AthomathlyUpdateTablesStaffShifts = require("./Imports/AuthomathlyUpdateTablesStaffShifts/AthomathlyUpdate.TablesStaffShifts");

const Push_Hours_Extra = require('./ImportHoursExtra/Push_Hours_Extra');
const indicadoresG = require('./kpi/indicadoresG'); //Referencia kpi

//JERARQUIAS 
const paisRoutes = require("./Jerarquias/routes/pais.routes").default;
const deptoEstadoRoutes = require ("./Jerarquias/routes/deptoEstado.routes").default;
const ciudadRoutes = require ("./Jerarquias/routes/ciudad.routes").default;
const sedeRoutes = require ("./Jerarquias/routes/sede.routes").default;
const sistGestionRoutes = require ("./Jerarquias/routes/sistGestion.routes").default;
const tipoServicioRoutes = require ("./Jerarquias/routes/tipoServicio.routes").default;
const canalAtencionRoutes = require ("./Jerarquias/routes/canalAtencion.routes").default;
const sectorClienteRoutes = require ("./Jerarquias/routes/sectorCliente.routes").default;
const operacionRoutes = require ("./Jerarquias/routes/operacion.routes").default;
const operacionesRoutes = require ("./Jerarquias/routes/operaciones.routes").default;
const usersRoutes = require ("./Jerarquias/routes/area.routes").default;
const clienteRoutes = require ("./Jerarquias/routes/cliente.routes").default;
const segmentoRoutes = require ("./Jerarquias/routes/segmento.routes").default;
const servicioRoutes = require ("./Jerarquias/routes/servicio.routes").default;
const objetoRoutes = require ("./Jerarquias/routes/objeto.routes").default;
const rolRoutes = require ("./Jerarquias/routes/rol.routes").default;
const jerarquiaRoutes = require ("./Jerarquias/routes/jerarquia.routes").default;
const basesRoutes = require ("./Jerarquias/routes/bases.routes").default;
const personaRoutes = require ("./Jerarquias/routes/persona.routes").default;
const AlmaSurvey = require('./Service/AlmaSurvey');
const unidadesFacturasPrincipalesRoutes = require("./Jerarquias/routes/unidadesFacturasPrincipales.routes").default;
const idiomaRoutes = require("./Jerarquias/routes/idioma.routes").default;

//CAPACIDAD LP
const Capacity = require("./Capacity_lp/Capacity_lp");


// ===============================================================================
// ==🚧 Usamos las distintas rutas de las peticiones y conexiones 🚧           ==
// ===============================================================================
// Middleware para inyectar `io` en las rutas
app.use((req, res, next) => {
  req.io = io; // Inyectamos `io` en cada request para usarlo más adelante
  next();
});
// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

app

  .use(Logs)
  .use(Extra)
  .use(Shifts)
  .use(Survey)
  .use(feeling)
  .use(Changes)
  .use(Exports)
  .use(Payroll)
  .use(ID_Imagen)
  .use(Tardiness)
  .use(Push_Malla)
  .use(Extra_Work)
  .use(ImgEveryDay)
  .use(Permissions)
  .use(GetListUsers)
  .use(ExportsShifts)
  .use(GetInformation)
  .use(UnreadMessages)
  .use(ActiveDirectory)
  .use(RejectHourExtra)
  .use(GenerateNoveltie)
  .use(SendNotifications)
  .use(UpdateInformation)
  .use(procesarRetiros)
  .use(AuthomatlyReject)
  // .use(AutoScheduleShift)
  .use(AuthomathlyUpdateTables)
  .use(Push_Malla_Admistrativo)
  // .use(AuthomatlyAccepShifts)
  .use(SendNotificationsNovelties)
  .use(AthomathlyUpdateTablesStaffShifts)

  .use(Push_Hours_Extra)
  //Referencia KPI
  .use(indicadoresG)

  //JERARQUIAS
  .use(paisRoutes)
  .use(deptoEstadoRoutes)
  .use(ciudadRoutes)
  .use(sedeRoutes)
  .use(sistGestionRoutes)
  .use(canalAtencionRoutes)
  .use(sectorClienteRoutes)
  .use(operacionRoutes)
  .use(operacionesRoutes)
  .use(usersRoutes)
  .use(clienteRoutes)
  .use(segmentoRoutes)
  .use(servicioRoutes)
  .use(objetoRoutes)
  .use(rolRoutes)
  .use(jerarquiaRoutes)
  .use(basesRoutes)
  .use(tipoServicioRoutes)
  .use(personaRoutes)
  .use(unidadesFacturasPrincipalesRoutes)
  .use(idiomaRoutes)

  //CAPACIDAD LP
  .use(Capacity);

//creamos nuestro servidor con puerto en este caso 🔐3500 (inicializamo de la siguiente manera ) 🔨npm run dev🔨
server.listen(PORT, HOST, () => {
  console.log(`Server iniciado http://${HOST}:${PORT}`);
});

// comentario de pruebas
