import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  StyledListItemButton,
} from "./Styles/Styles";
import {
  Box,
  Logs,
  lazy,
  List,
  Logo2,
  Admin,
  React,
  Badge,
  Drawer,
  AppBar,
  Toolbar,
  Imports,
  Feeling,
  Exports,
  MenuIcon,
  useState,
  FeedIcon,
  PropTypes,
  IconButton,
  useContext,
  CssBaseline,
  drawerWidth,
  ListItemIcon,
  ExpandMoreIcon,
  LanRoundedIcon,
  StopRoundedIcon,
  TuneRoundedIcon,
  PlaceRoundedIcon,
  BuildRoundedIcon,
  PublicRoundedIcon,
  GroupsRoundedIcon,
  AlarmOnRoundedIcon,
  NotificationRecived,
  LanguageRoundedIcon,
  MoreTimeRoundedIcon,
  SettingsRoundedIcon,
  GroupAddRoundedIcon,
  DomainAddRoundedIcon,
  AccessTimeRoundedIcon,
  PsychologyRoundedIcon,
  RocketLaunchRoundedIcon,
  FileDownloadRoundedIcon,
  RequestQuoteRoundedIcon,
  ScheduleSendRoundedIcon,
  MapsHomeWorkRoundedIcon,
  ContactPhoneRoundedIcon,
  ReduceCapacityRoundedIcon,
  EventAvailableRoundedIcon,
  FiberManualRecordRoundedIcon,
  AdminPanelSettingsRoundedIcon,
  ContentPasteSearchRoundedIcon,
  MiscellaneousServicesRoundedIcon,
  PrecisionManufacturingRoundedIcon,
} from "../../Exports-Modules/Exports";
import { useNavigate, Outlet } from "react-router-dom";

import "./Styles/Styles.css";

import Service from "../../Machine/Service";
import { LogsContext } from "../../Context/LogsContext";
import { GETUSERPERMISSIONS } from "../../API/API";

const Survey = lazy(() => import("../../Components/Survey/Survey"));
const LogOut = lazy(() => import("../../Components/LogOut/LogOut"));
const MyGroup = lazy(() => import("../../Components/MyGroup/MyGroup"));
const ExportsWFM = lazy(() => import("./Components/Master/ExportsWFM"));
const MyShifts = lazy(() => import("../../Components/Shifts/MyShifts"));
const MyPayroll = lazy(() => import("../../Components/Payroll/MyPayroll"));
const CourtDates = lazy(() => import("../../Components/Payroll/CourtDates"));
const PaisesHome = lazy(() => import("../../Components/Pages/PaisesHome"));
const DepartamentosHome = lazy(() => import("../../Components/Pages/DepartamentosHome"));
const CiudadesHome = lazy(() => import("../../Components/Pages/CiudadesHome"));
const SedesHome = lazy(() => import("../../Components/Pages/SedesHome"));
const SistemasDeGestionHome = lazy(() => import("../../Components/Pages/SistemasDeGestionHome"));
const TiposDeServicioHome = lazy(() => import("../../Components/Pages/TiposDeServicioHome"));
const CanalDeAtencionHome = lazy(() => import("../../Components/Pages/CanalDeAtencionHome"));
const SectoresClienteHome = lazy(() => import("../../Components/Pages/SectoresClienteHome"));
const JerarquiasHome = lazy(() => import("../../Components/Pages/JerarquiasHome"));
const OperacionesHome = lazy(() => import("../../Components/Pages/OperacionesHome"));
const CreateOperacion = lazy(() => import("../../Components/Pages/CreateOperacion"));
const OperacionesClienteHome = lazy(() => import("../../Components/Pages/OperacionesClienteHome"));
const WFM = lazy(() => import("../../Components/Novelties/Advisers/WFM/WFM"));
const MyChanges = lazy(() => import("../../Components/MyChanges/MyChanges"));
const ImportAdmin = lazy(() => import("../../Components/Imports/ImportAdmin"));
const ExtraHours = lazy(() => import("../../Components/ExtraHours/ExtraHours"));
const AssignmentExtraHours = lazy(() => import("../../Components/ExtraHours/AssignmentExtraHours"));
const ContainerHome = lazy(() => import("./Components/Container/ContainerHome"));
const ExpSession = lazy(() => import("../../Components/ExpSessions/ExpSession"));
const ImgEveryDay = lazy(() => import("../../Components/ImgEveryDay/ImgEveryDay"));
const ExtraWork = lazy(() => import('../../Components/ExtraWork/Extra_Work'));
const Noveltie = lazy(() => import("../../Components/Novelties/Advisers/Noveltie"));
const Tardiness = lazy(() => import("../../Components/Payroll/Tardiness/Tardiness"));
const DrawerComponents = lazy(() => import("./Components/Drawer/DrawerComponents"));
const Nomina = lazy(() => import("../../Components/Novelties/Advisers/Nomina/Nomina"));
const ExtraHoursGTR = lazy(() => import("../../Components/ExtraHours/ExtraHoursGTR"));
const Manager = lazy(() => import("../../Components/Novelties/Advisers/Manager/Manager"));
const ExtraHoursMyGroup = lazy(() => import("../../Components/ExtraHours/ExtraHoursMyGroup"));
const TardinessWFM = lazy(() => import("../../Components/Payroll/Tardiness/TardinessWFM/TardinessWFM"));
const TardinessGTR = lazy(() => import("../../Components/Payroll/Tardiness/TardinessGTR/TardinessGTR"));
const MyGroupNovelties = lazy(() => import("../../Components/Novelties/Advisers/MyGroup/MyGroupNovelties"));
const TardinessNomina = lazy(() => import("../../Components/Payroll/Tardiness/TardinessNomina/TardinessNomina"));
const TardinessMyGroup = lazy(() => import("../../Components/Payroll/Tardiness/TardinessMyGroup/TardinessMyGroup"));
const TardinessFormacion = lazy(() => import("../../Components/Payroll/Tardiness/TardinessFormacion/TardinessFormacion"));

const KPI = lazy(() => import("../../Components/KPI/SubModulos/Sub_Kpi"))
const GestionKPI = lazy(() => import("../../Components/KPI/SubModulos/Sub_GestionKpi"))
const AsignacionKPIs = lazy(() => import("../../Components/KPI/SubModulos/AsignacionKPIs/AsignacionKPIs"));
const GestionMetas = lazy(() => import("../../Components/KPI/SubModulos/Metas/GestionMetas"));
const Resultados = lazy(() => import("../../Components/KPI/SubModulos/Resultados/Resultados"));

// ?==================================================================================================================
// ?===================                                 NOVEDAD  STAFFF                               ================
// ?==================================================================================================================

const NoveltieStaff = lazy(() => import("../../Components/Novelties/Staff/NoveltiesStaff/NoveltieStaff"));
const TardinessStaff = lazy(() => import("../../Components/Payroll/Tardiness/TardinessStaff/TardinessStaff"));
const NoveltiesMyGroupStaff = lazy(() => import("../../Components/Novelties/Staff/NoveltienMyGroupStaff/NoveltiesMyGroupStaff"));
const TardinessMyGroupStaff = lazy(() => import("../../Components/Payroll/Tardiness/TardinessMyGroupStaff/TardinessMyGroupStaff"));

// Plan Capacidad
const HomeCapacity = lazy(() => import("../../Components/Capacity/HomeCapacity"));

function Home(props) {
  const { Servidor } = Service();
  const { handleLogs } = useContext(LogsContext);
  const navigate = useNavigate();
  const { ventana } = props;
  const [userRoles, setUserRoles] = React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] =
    React.useState("Mis Turnos");
  const [open, setOpen] = useState("WFM");
  const [selectModule, isSelectModule] = useState(false);
  const [, setMessageError] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setOpen(newExpanded ? panel : false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    navigate(`/home/${component.replace(/\s+/g, "-")}`);
    isSelectModule(component);
  };

  React.useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const token = localStorage.getItem("_Secure-next-auth.session-token");
        const response = await GETUSERPERMISSIONS(
          localStorage.getItem("username"),
          token
        );
        setUserRoles(response);
      } catch (error) {
        setMessageError("No se puedo obtener los datos");
      }
    };

    fetchUserRoles();
  }, [Servidor]);

  const drawer = (
    <DrawerComponents
      open={open}
      List={List}
      Badge={Badge}
      Logo2={Logo2}
      FeedIcon={FeedIcon}
      Accordion={Accordion}
      userRoles={userRoles}
      handleLogs={handleLogs}
      handleChange={handleChange}
      ListItemIcon={ListItemIcon}
      selectModule={selectModule}
      LanRoundedIcon={LanRoundedIcon}
      ExpandMoreIcon={ExpandMoreIcon}
      StopRoundedIcon={StopRoundedIcon}
      TuneRoundedIcon={TuneRoundedIcon}
      AccordionDetails={AccordionDetails}
      PlaceRoundedIcon={PlaceRoundedIcon}
      AccordionSummary={AccordionSummary}
      BuildRoundedIcon={BuildRoundedIcon}
      PublicRoundedIcon={PublicRoundedIcon}
      GroupsRoundedIcon={GroupsRoundedIcon}
      AlarmOnRoundedIcon={AlarmOnRoundedIcon}
      MoreTimeRoundedIcon={MoreTimeRoundedIcon}
      LanguageRoundedIcon={LanguageRoundedIcon}
      SettingsRoundedIcon={SettingsRoundedIcon}
      GroupAddRoundedIcon={GroupAddRoundedIcon}
      DomainAddRoundedIcon={DomainAddRoundedIcon}
      StyledListItemButton={StyledListItemButton}
      AccessTimeRoundedIcon={AccessTimeRoundedIcon}
      PsychologyRoundedIcon={PsychologyRoundedIcon}
      handleComponentSelect={handleComponentSelect}
      MapsHomeWorkRoundedIcon={MapsHomeWorkRoundedIcon}
      RequestQuoteRoundedIcon={RequestQuoteRoundedIcon}
      RocketLaunchRoundedIcon={RocketLaunchRoundedIcon}
      ScheduleSendRoundedIcon={ScheduleSendRoundedIcon}
      FileDownloadRoundedIcon={FileDownloadRoundedIcon}
      ContactPhoneRoundedIcon={ContactPhoneRoundedIcon}
      EventAvailableRoundedIcon={EventAvailableRoundedIcon}
      ReduceCapacityRoundedIcon={ReduceCapacityRoundedIcon}
      FiberManualRecordRoundedIcon={FiberManualRecordRoundedIcon}
      ContentPasteSearchRoundedIcon={ContentPasteSearchRoundedIcon}
      AdminPanelSettingsRoundedIcon={AdminPanelSettingsRoundedIcon}
      MiscellaneousServicesRoundedIcon={MiscellaneousServicesRoundedIcon}
      PrecisionManufacturingRoundedIcon={PrecisionManufacturingRoundedIcon}
    />
  );

  const container =
    ventana !== undefined ? () => ventana().document.body : undefined;
  const renderComponent = () => {
    switch (selectedComponent) {
      // COMPONENTES

      //MODULO DE TURNOS
      case "Mis Turnos":
        return <MyShifts />;
      case "Mi Equipo":
        return <MyGroup />;
      case "Importables":
        return <Imports />;
      case "Mis Cambios":
        return <MyChanges />;
      case "Importe Administrativo":
        return <ImportAdmin />;
      case "Exporte Turnos":
        return <ExportsWFM userRoles={userRoles} />;

      //MODULO DE NOVEDADES
      case "Mis Novedades":
        return <Noveltie />;

      case "Mis Novedades Staff":
        return <NoveltieStaff />;
      case "Novedades Mi Equipo Staff":
        return <NoveltiesMyGroupStaff />;

      case "Solicitudes Mi Equipo":
        return <MyGroupNovelties />;
      case "Solicitudes WFM":
        return <WFM />;
      case "Solicitudes Manager":
        return <Manager />;
      case "Solicitudes Nomina":
        return <Nomina />;
      case "Horas Extras":
        return <ExtraHours />;
      case "Horas Extras GTR":
        return <ExtraHoursGTR />;
      case "Horas Extras Mi Equipo":
        return <ExtraHoursMyGroup />;
      case "Asignacion Horas Extras":
        return <AssignmentExtraHours />;

      //MAESTRO
      case "Maestro":
        return <Exports userRoles={userRoles} />;

      //LOGS
      case "Logs":
        return <Logs />;

      //NOMINA
      case "Mi Nómina":
        return <MyPayroll handleComponentSelect={handleComponentSelect} />;
      case "Cortes Nomina":
        return <CourtDates />;
      case "Tardiness":
        return <Tardiness />;
      case "Tardiness Staff":
        return <TardinessStaff />;
      case "Tardiness My Group":
        return <TardinessMyGroup />;
      case "Tardiness My Group Staff":
        return <TardinessMyGroupStaff />;
      case "Tardiness Formacion":
        return <TardinessFormacion />;
      case "Tardiness GTR":
        return <TardinessGTR />;
      case "Tardiness WFM":
        return <TardinessWFM />;
      case "Tardiness Nomina":
        return <TardinessNomina />;

      //CASO CAMPAÑA
      //Ubicaciones
      case "Paises":
        return <PaisesHome />;
      case "Departamentos":
        return <DepartamentosHome />;
      case "Ciudades":
        return <CiudadesHome />;
      case "Sedes":
        return <SedesHome />;

      //Parametros
      case "Sistemas De Gestión":
        return <SistemasDeGestionHome />;
      case "Tipos De Servicio":
        return <TiposDeServicioHome />;
      case "Canal De Atención":
        return <CanalDeAtencionHome />;
      case "Sectores Cliente":
        return <SectoresClienteHome />

      //Jerarquías
      case "Home Jerarquías":
        return <JerarquiasHome />;

      //Operaciones
      case "Home Operaciones":
        return < OperacionesHome handleComponentSelect={handleComponentSelect} />;
      case "Crear Operación":
        return < CreateOperacion handleComponentSelect={handleComponentSelect} />;
      case "Operaciones Por Cliente":
        return < OperacionesClienteHome handleComponentSelect={handleComponentSelect} />


      //CAPACIDAD
      case "Plan De Capacidad":
        return <HomeCapacity />;

      // MODULO KPI
      case "KPI":
        return <KPI />;
      case "GestionKPI":
        return <GestionKPI />;
      case "Asignacion KPIs":
        return < AsignacionKPIs handleComponentSelect={handleComponentSelect} />
      case "Gestion Metas":
        return < GestionMetas handleComponentSelect={handleComponentSelect} />
      case "Gestion Resultados":
        return < Resultados handleComponentSelect={handleComponentSelect} userRoles={userRoles} />


      //ADMINISTRADOR
      case "Permisos":
        return <Admin />;

      default:
        return <div>Select a component from the menu</div>;
    }
  };

  return (
    <ContainerHome
      ExtraWork={ExtraWork}
      userRoles={userRoles}
      Box={Box}
      Survey={Survey}
      ImgEveryDay={ImgEveryDay}
      AppBar={AppBar}
      Drawer={Drawer}
      LogOut={LogOut}
      Outlet={Outlet}
      drawer={drawer}
      Feeling={Feeling}
      Toolbar={Toolbar}
      MenuIcon={MenuIcon}
      container={container}
      ExpSession={ExpSession}
      IconButton={IconButton}
      mobileOpen={mobileOpen}
      CssBaseline={CssBaseline}
      drawerWidth={drawerWidth}
      renderComponent={renderComponent}
      handleDrawerToggle={handleDrawerToggle}
      NotificationRecived={NotificationRecived}
      handleComponentSelect={handleComponentSelect}
    />
  );
}

Home.propTypes = {
  ventana: PropTypes.func,
};

export default Home;
