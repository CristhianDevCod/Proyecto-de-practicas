import Service from "../Machine/Service";
import apiClient from "../Service/Service";

const { Servidor } = Service();
const API = {
  GETUSERPERMISSIONS: (username) =>
    `http://${Servidor}/API/GET-USER-PERMISSIONS/${username}`,

  FullName: `http://${Servidor}/Full-information/:Fullname`,
  Blood_Factor: `http://${Servidor}/API/get/Blood_Factor/`,
  Blood_Group: `http://${Servidor}/API/get/Blood_Group/`,
  Ethnic_Group: `http://${Servidor}/API/get/Ethnic_Group/`,
  Gender: `http://${Servidor}/API/get/Gender/`,
  Language: `http://${Servidor}/API/get/Language/`,
  Language_Level: `http://${Servidor}/API/get/Language_Level/`,
  Marital_Status: `http://${Servidor}/API/get/Marital_Status/`,
  Semester_Study: `http://${Servidor}/API/get/Semester_Study/`,
  Status_Study: `http://${Servidor}/API/get/Status_Study/`,
  Type_Document: `http://${Servidor}/API/get/Type_Document/`,
  Complementary_Study: `http://${Servidor}/API/get/Complementary_Study/`,
  Postgraduate_Study: `http://${Servidor}/API/get/Postgraduate_Study/`,
  Undergraduate_Study: `http://${Servidor}/API/get/Undergraduate_Study/`,
  Type_Vehicle: `http://${Servidor}/API/get/Type_Vehicle/`,
  Vehicle: `http://${Servidor}/API/get/Vehicle/`,
  Country: `http://${Servidor}/API/get/Country/`,
  Country_State: `http://${Servidor}/API/get/Country_State/`,
  Type_Id: `http://${Servidor}/API/get/Type_Id/`,
  Pc_Home: `http://${Servidor}/API/get/Pc_Home/`,
  Internet: `http://${Servidor}/API/get/Internet/`,
  Internet_Speed: `http://${Servidor}/API/get/Internet_Speed/`,
  SO: `http://${Servidor}/API/get/SO/`,
  RAM: `http://${Servidor}/API/get/RAM/`,

  PushMalla: `http://${Servidor}/API/UPDATE-PUSH_MALLA/v1/`,

  // ! IMPORTA LAS HORAS ASIGNADAS
  PushHoursExtra: `http://${Servidor}/API/UPDATE-PUSH_HOURS_EXTRA/`,

  getUSerPermissions: `http://${Servidor}/API/GET-LIST-USERS/PERMISSIONS/`,
  getListCargoPermissions: `http://${Servidor}/API/GET-LIST-CARGO/PERMISSIONS/`,
  getPermissionsByCargo: `http://${Servidor}/API/UPDATE-USER-PERMISSIONS/`,

  getAllListClients: `http://${Servidor}/API/GET-LIST-CLIENT/PERMISSIONS/`,

  getAllListNovelties: `http://${Servidor}/API/GET-ALL-NOVELTIES`,

  getAllCargos: `http://${Servidor}/API/GET/LIST-CARGOS/FOR/CHANGES`,

  // ! HOME OBTENER LOS PERSIMOS DE LOS USUARIOS
  GETALLUSERSROLES: (Usuario_Red) =>
    `http://${Servidor}/API/GET-USER-PERMISSIONS/${Usuario_Red}`,

  // ! LISTA DE PERMISOS PARA LOS MODULOS SOCIO / EXPORTE
  getAllListPermissionsForModules: (Usuario_Red) =>
    `http://${Servidor}/API/GET-USER-PERMISSIONS-CLIENT/${Usuario_Red}`,

  // * MODULO TURNOS - MIS CAMBIOS
  getAllMyChanges: (Documento) =>
    `http://${Servidor}/API/GET-LIST-NOTIFICATIONS/${Documento}/`,

  // ? MODULOS NOVEDADES
  getAllMyNovelties: (Usuario_Red) =>
    `http://${Servidor}/API/GET/ALL-DATA-NOVELTIE/USERS/${Usuario_Red}`,
  getAllMyGroupNovelties: (Documento) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-BOSS/${Documento}`,
  getAllMyGroupNoveltiesHistory: (Documento) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-BOSS/HISTORY/${Documento}`,
  getAllMyGroupNoveltiesStaffNovelties: (Documento) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-BOSS/STAFF/NOVELTIES/${Documento}`,
  GETALLMYGROUPNOVELTIESHISTORYADVISERS: (Documento) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-BOSS/HISTORY/ADVISER/${Documento}`,
  getAllWfmNovelties: (Cliente) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-WFM/${Cliente}/`,
  getAllManagersNovelties: (Cliente) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-Manager/${Cliente}/`,
  getAllNominaNovelties: (Cliente) =>
    `http://${Servidor}/API/GET/ALL-DATA-FOR-NOMINA/${Cliente}`,
  getShiftsNow: (Documento, now) =>
    `http://${Servidor}/API/GET/SHIFTS-NOW-FOR/ADVISERS/${Documento}/${now}`,
  getAllDataHistoryHourExtra: (Documento) =>
    `http://${Servidor}/API/GET/HISTORI-HOURS-EXTRA/ADVISERS/${Documento}/`,
  getSupervisorForHourExtra: (myJefeInmediato) =>
    `http://${Servidor}/API/GET-LIST-SUPERVISOR/${myJefeInmediato}`,
  getListAdviserForSupervisor: (Documento) =>
    `http://${Servidor}/API/GET/LIST-FOR-SUPERVISOR/GENERATE/NOVELTIE-FOR-SUPERVISOR/${Documento}`,
  getAllPetitionsHourExtra: (Cliente) =>
    `http://${Servidor}/API/GET/DATA-HOURS-EXTRA-ADVISER-FOR-GTR/${Cliente}`,
  getAllListShiftsNowForGtr: (now) =>
    `http://${Servidor}/API/GET/SHIFTS-NOW-FOR/GTR/${now}`,
  getAllPetitionsHourExtraMyGroup: (Documento) =>
    `http://${Servidor}/API/GET/DATA-HOURS-EXTRA-ADVISER-FOR-BOSS/MY-GROUP/${Documento}`,
  getAllListShiftsNowForSupervisor: (now, Documento) =>
    `http://${Servidor}/API/GET/SHIFTS-NOW-FOR/BOSS/MY-GROUP/${now}/${Documento}`,

  // NOVEDADES PENDIENTES - RECHAZADOS - ACEPTADOS
  NoveltiesPendingCount: (Usuario_Red) =>
    `http://${Servidor}/API/GET/LENGTH/REQUEST-NOVELTIES-PENDING/${Usuario_Red}`,
  NoveltiesAcceptsCount: (Usuario_Red) =>
    `http://${Servidor}/API/GET/LENGTH/REQUEST-NOVELTIES-ACCEPTS/${Usuario_Red}`,
  NoveltiesRejectsCount: (Usuario_Red) =>
    `http://${Servidor}/API/GET/LENGTH/REQUEST-NOVELTIES-REJECTS/${Usuario_Red}`,

  // ? MODULO DE NOMINA O PAYROLL
  getAllDataMyPayroll: (Documento) =>
    `http://${Servidor}/API/GET/PAYROLL/${Documento}`,
  getAllDataMyPayrollHourExtra: (Documento) =>
    `http://${Servidor}/API/GET/PAYROLL/HOUR/EXTRA/${Documento}`,

  // ! SUPERVISOR PARA LAS NOTIFICACIONES
  GETSUPERVISORFORNOTIFICATION: (Documento_Jefe_Inmediato_Recibe) =>
    `http://${Servidor}/API/GET-LIST-SUPERVISOR/${Documento_Jefe_Inmediato_Recibe}`,

  //TODO: MODULO NOMINA - IMPUNTUALIDADES
  getAllTardinessForBoss: (Documento_Jefe_Inmediato) =>
    `http://${Servidor}/API/GET/TARDINESS/RESPORTS/BOSS/${Documento_Jefe_Inmediato}`,
  getAllTardinessForBossStaff: (Documento_Jefe_Inmediato) =>
    `http://${Servidor}/API/GET/TARDINESS/RESPORTS/BOSS-STAFF/${Documento_Jefe_Inmediato}`,
  getAllTardinessForBossStaffList: (Documento_Jefe_Inmediato) =>
    `http://${Servidor}/API/GET/TARDINESS/RESPORTS/BOSS-STAFF/LIST/${Documento_Jefe_Inmediato}`,
  getAllTardiness: (Usuario_Red) =>
    `http://${Servidor}/API/GET/TARDINESS/RESPORTS/${Usuario_Red}`,

  //TODO: MODULO NOMINA - IMPUNTUALIDADES NOMINA
  GETLISTTARDINESSNOIMINA: (Cliente) =>
    `http://${Servidor}/API/GET/TARDINESS/REPORTS/NOMINA/V1/${Cliente}`,

  //TODO: MODULO NOMINA - IMPUNTUALIDADES FORMACION
  GETALLTADINESSFORMACION: (Cliente) =>
    `http://${Servidor}/API/GET/TARDINESS/REPORTS/FORMACIONES/WFM/GTR/V1/${Cliente}`,

  // * OBTIENE EL LISTADO DE EL TIPO DE IMPUNTUALIDADES
  getAllListTypeTardiness: `http://${Servidor}/API/GET/LIST/TYPE_TARDINESS/`,

  //!OBTNER EL LISTADO DE PERMISOS PARA EL USUARIO SELECCIONADO CLIENTE NOVEDAD
  PERMISSIONSCLIENTSNOVELTIES: (Usuario_Red) =>
    `http://${Servidor}/API/GET-USER-PERMISSIONS-CLIENT/NOVEDADES/${Usuario_Red}`,
  //!OBTNER EL LISTADO DE PERMISOS PARA EL USUARIO SELECCIONADO CLIENTE NOMINA
  PERMISSIONSCLIENTSNOMINA: (Usuario_Red) =>
    `http://${Servidor}/API/GET-USER-PERMISSIONS-CLIENT/NOMINA/${Usuario_Red}`,

  //* VALIDAMOS SI EL DÍA A TOMAR CONTIENE AL TURNO DE CIERRE, SI ES ASÍ LE INHABILITAMOS EL BOTÓN
  VALIDATESHIFTCLOSE: (Documento, Dia_Descanso_Actual) =>
    `http://${Servidor}/API/VERIFY-DAY/DISABLE/${Documento}/${Dia_Descanso_Actual}`,

  //* OBTIENE LAS FECHAS DE CORTES DE LA NOMINA 
  GETCOURTDATES: `http://${Servidor}/API/GET/CORTES/NOMINA/`,
  AddCourtDatesPayrroll: `http://${Servidor}/API/INSERT/CORTES/NOMINA/`,

  //Obtener todos los kpis
  GETALLKPI: `http://${Servidor}/API/GET-ALL-KPIS/`,
  //Obtener todos los kpis filtrados para servicios
  GETALLKPISERVICIOSFILTRADO: `http://${Servidor}/API/GET-ALL-KPIS-SERVICIOS/FILTRADOS/`,
  //Obtener todos los kpis administrativos
  GETALLKPISADMINISTRATIVOS: `http://${Servidor}/API/GET-ALL-KPIS-AREAS/ADMINISTRATIVOS/`,
  //Obtener todos los tipos de kpis
  GETTYPEALLKPI: `http://${Servidor}/API/GET/TYPE-ALL-KPIS/`,
  //Obtener todos los reportes kpis
  GETREPORALLKPI: `http://${Servidor}/API/GET/REPO-ALL-KPIS/`,
  //Obtener todos los reportes kpis
  GETFORMATALLKPI: `http://${Servidor}/API/GET/FORMAT-ALL-KPIS/`,
  //Obtener todos las periodicidades
  GETPERIODIALLKPI: `http://${Servidor}/API/GET/PERIODI-ALL-KPIS/`,
  //Obtener todas las clasificaciones
  GETCLASIFICA: `http://${Servidor}/API/GET/CLASIFICA-ALL-KPIS/`,
  //Obtener todas los procesos
  GETPROCESOS: `http://${Servidor}/API/GET/PROCESO-ALL-KPIS/`,
  //Obtener todas los responsables UPD
  GETALLRESPONSABLESUPD: `http://${Servidor}/API/GET/RESPONSABLE-ALL-UPD/`,

  //Obtener los Logs
  GETALLLOGKPI: `http://${Servidor}/API/GET/LOGKPI-ALL/`,

  //Obtener los Logs
  GETALLLOGKPIFILTER: `http://${Servidor}/API/GET/LOGKPI-ALL-FILTER/`,

  //Obtener servicios
  GETALLJERARQUIAS: `http://${Servidor}/API/GET/ALL-JERARQUIAS/`,

  //Obtener kpis asociados a servicios
  GETALLKPISSERVICIOS: `http://${Servidor}/API/GET-ALL-KPIS-SERVICIOS/`,

  //Obtiene todas las areas
  GETALLAREASPROCESO: `http://${Servidor}/API/GET/ALL-AREAS-PROCESO/`,

  //Obtener kpis asociados a servicios
  GETALLKPISAREAS: `http://${Servidor}/API/GET-ALL-KPIS-AREAS/`,
  //Registro - Update masivo de kpis
  INSERTUPDATEMASIVOSKPI: `http://${Servidor}/API/INSERT-UPDATE/RESULTADOS/`,
  //obtiene los kpis de forma masiva
  GETALLMETASOPERATIVAS: `http://${Servidor}/API/GET-ALL/METAS-OPERATIVAS/`,

  // Obtiene todos los usuarios
  GETALLUSERSACTIVE: `http://${Servidor}/API/GET-LIST-USERS/ACTIVE/`,
  // Obtiene un usuario por numero de documento
  GETSINGLEUSERBYDOCUMENT: `http://${Servidor}/API/GET-USER-BY-DOCUMENT/`,

  GETALLCOLLABORATORJERARQUIAS: `http://${Servidor}/API/GET-ALL-COLLABORATOR/JERARQUIAS/`,
  // Obtener todos los clientes
  GETALLCLIENTEJERARQUIAS: `http://${Servidor}/API/GET-ALL-CLIENTE/JERARQUIAS/`,
  // Obtener todas las operaciones 
  GETALLOPERACIONJERARQUIAS: `http://${Servidor}/API/GET-ALL-OPERACION/JERARQUIAS/`,
  // Obtener todas las operaciones 
  GETALLSEGMENTOJERARQUIAS: `http://${Servidor}/API/GET-ALL-SEGMENTO/JERARQUIAS/`,
  // Obtener todos los servicios
  GETALLSERVICIOJERARQUIAS: `http://${Servidor}/API/GET-ALL-SERVICIO/JERARQUIAS/`,

  GETALLCOLLABORATORMASIVEKPI: `http://${Servidor}/API/GET-ALL-COLLABORATOR/MASSIVE-KPIS/`,

  // End point para insertar o actualizar registros personas kpis
  INSERTUPDATECOLLABORATORKPIS: `http://${Servidor}/API/INSERT-UPDATE/ALL-COLABORATOR/`,
  // End point para insertar o actualizar registros personas kpis
  GETALLKPISINDIVIDUAL: `http://${Servidor}/API/GET-ALL-KPIS-INDIVIDUAL/`,

  GETALLKPISASIGNABLESINDIVIDUAL: `http://${Servidor}/API/GET-ALL-KPIS-SERVICIOS-INDIVIDUAL/`,

  INSERTUPDATESINGLECOLLABORATOR: `http://${Servidor}/API/INSERT-UPDATE/SINGLE-COLLABORATOR/`,

  // Endpoint para obtener de forma masiva todas los resultados Operativs
  GETALLRESULTADOSOPERATIVOS: `http://${Servidor}/API/GET-ALL/RESULTADOS-OPERATIVAS/`,
  // EndPoint para cargue masivo Resultados Operativos
  INSERTUPDATERESULTADOSOPERATIVOS: `http://${Servidor}/API/INSERT-UPDATE/Resultados-Operativos/`,
};

const handleApiResponse = async (res) => {
  if (res.status === 404) {
    return {};
  } else {
    return await res.data;
  }
};




/*OBTIENE LA LISTA DE PERMISOS*/
export const GETUSERPERMISSIONS = async (username, token) => {
  const res = await apiClient.get(API.GETUSERPERMISSIONS(username), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleApiResponse(res);
};

/*FULL NAME*/
export const FullName = async () => {
  const res = await apiClient.get(API.FullName);
  return handleApiResponse(res);
};

/*get update profile*/

export const Blood_Factor = async () => {
  const res = await apiClient.get(API.Blood_Factor);
  return handleApiResponse(res);
};

export const Blood_Group = async () => {
  const res = await apiClient.get(API.Blood_Group);
  return handleApiResponse(res);
};

export const Ethnic_Group = async () => {
  const res = await apiClient.get(API.Ethnic_Group);
  return handleApiResponse(res);
};

export const Gender = async () => {
  const res = await apiClient.get(API.Gender);
  return handleApiResponse(res);
};

export const Language = async () => {
  const res = await apiClient.get(API.Language);
  return handleApiResponse(res);
};

export const Language_Level = async () => {
  const res = await apiClient.get(API.Language_Level);
  return handleApiResponse(res);
};

export const Marital_Status = async () => {
  const res = await apiClient.get(API.Marital_Status);
  return handleApiResponse(res);
};

export const Semester_Study = async () => {
  const res = await apiClient.get(API.Semester_Study);
  return handleApiResponse(res);
};

export const Status_Study = async () => {
  const res = await apiClient.get(API.Status_Study);
  return handleApiResponse(res);
};

export const Type_Document = async () => {
  const res = await apiClient.get(API.Type_Document);
  return handleApiResponse(res);
};

export const Complementary_Study = async () => {
  const res = await apiClient.get(API.Complementary_Study);
  return handleApiResponse(res);
};
export const Postgraduate_Study = async () => {
  const res = await apiClient.get(API.Postgraduate_Study);
  return handleApiResponse(res);
};
export const Undergraduate_Study = async () => {
  const res = await apiClient.get(API.Undergraduate_Study);
  return handleApiResponse(res);
};
export const Type_Vehicle = async () => {
  const res = await apiClient.get(API.Type_Vehicle);
  return handleApiResponse(res);
};
export const Vehicle = async () => {
  const res = await apiClient.get(API.Vehicle);
  return handleApiResponse(res);
};
export const Country = async () => {
  const res = await apiClient.get(API.Country);
  return handleApiResponse(res);
};
export const Country_State = async () => {
  const res = await apiClient.get(API.Country_State);
  return handleApiResponse(res);
};
export const Type_Id = async () => {
  const res = await apiClient.get(API.Type_Id);
  return handleApiResponse(res);
};

export const Pc_Home = async () => {
  const res = await apiClient.get(API.Pc_Home);
  return handleApiResponse(res);
};

export const Internet = async () => {
  const res = await apiClient.get(API.Internet);
  return handleApiResponse(res);
};

export const Internet_Speed = async () => {
  const res = await apiClient.get(API.Internet_Speed);
  return handleApiResponse(res);
};

export const SO = async () => {
  const res = await apiClient.get(API.SO);
  return handleApiResponse(res);
};

export const RAM = async () => {
  const res = await apiClient.get(API.RAM);
  return handleApiResponse(res);
};

/*Push malla*/
export const Push_Malla = async () => {
  const res = await apiClient.get(API.PushMalla);
  return handleApiResponse(res);
};


// ! PUSH DE ASIGNAR LAS HORAS EXTRAS
export const PushHoursExtra = () => {
  const pushHoursExtra = API.PushHoursExtra;
  return { pushHoursExtra };
};

//!OBTNER EL LISTADO DE PERMISOS PARA EL USUARIO SELECCIONADO CLIENTE SOCIO / EXPORTRE DE TURNOS
export const User_Permissions = async () => {
  const res = await apiClient.get(API.getUSerPermissions);
  return handleApiResponse(res);
};

export const cargoUsersPermissions = async () => {
  const res = await apiClient.get(API.getListCargoPermissions);
  return handleApiResponse(res);
};

export const getPermissionsByCargo = async () => {
  const res = await apiClient.get(API.getPermissionsByCargo);
  return handleApiResponse(res);
};

/*OBTIENE LA LISTA DE CLIENTES */
export const getAllListClient = async () => {
  const res = await apiClient.get(API.getAllListClients);
  return handleApiResponse(res);
};

/*OBTINE EL LISTADO DE NOVEDADES PARA LA SOLICITUD*/
export const getAllListNoveltiesClient = async () => {
  const res = await apiClient.get(API.getAllListNovelties);
  return handleApiResponse(res);
};

/*OBTINE EL LISTADO DE CARGOS*/
export const getAllCargos = async () => {
  const res = await apiClient.get(API.getAllCargos);
  return handleApiResponse(res);
};

// ! ===============================================================================
// ! ==🚧                       HOME - APIS 🚧                      ==
// ! ===============================================================================
// ! HOME.js

export const GETALLUSERSROLES = async (Usuario_Red) => {
  const res = await apiClient.get(API.GETALLUSERSROLES(Usuario_Red));
  return handleApiResponse(res);
};

// ! ===============================================================================
// ! ==🚧                       LISTA DE PERMISOS - APIS 🚧                      ==
// ! ===============================================================================
// ! LISTA DE PERMISOS SOCIO / EXPORTE TURNOS POR CLIENTE
export const getAllListPermissionsForModules = async (Usuario_Red) => {
  const res = await apiClient.get(API.getAllListPermissionsForModules(Usuario_Red));
  return handleApiResponse(res);
};
//!OBTNER EL LISTADO DE PERMISOS PARA EL USUARIO SELECCIONADO CLIENTE NOVEDAD
export const PERMISSIONSCLIENTSNOVELTIES = async (Usuario_Red) => {
  const res = await apiClient.get(API.PERMISSIONSCLIENTSNOVELTIES(Usuario_Red));
  return handleApiResponse(res);
};

//!OBTNER EL LISTADO DE PERMISOS PARA EL USUARIO SELECCIONADO CLIENTE NOMINA
export const PERMISSIONSCLIENTSNOMINA = async (Usuario_Red) => {
  const res = await apiClient.get(API.PERMISSIONSCLIENTSNOMINA(Usuario_Red));
  return handleApiResponse(res);
};
// ! ===============================================================================
// ! ==🚧                       LISTA DE PERMISOS - APIS 🚧                      ==
// ! ===============================================================================

// * ===============================================================================
// * ==🚧                       MODULO TURNOS - APIS 🚧                          ==
// * ===============================================================================
// * MODULO TURNOS - MIS CAMBIOS
export const getAllMyChanges = async (Documento) => {
  const res = await apiClient.get(API.getAllMyChanges(Documento));
  return handleApiResponse(res);
};
// * ===============================================================================
// * ==🚧                       MODULO TURNOS - APIS 🚧                          ==
// * ===============================================================================

// ? ===============================================================================
// ? ==🚧                       MODULO NOVEDADES - APIS 🚧                       ==
// ? ===============================================================================

// ? MODULOS NOVEDADES - MIS NOVEDADES
export const getAllMyNovelties = async (Usuario_Red) => {
  const res = await apiClient.get(API.getAllMyNovelties(Usuario_Red));
  return handleApiResponse(res);
};

// ? NOVEDADES MI EQUIPO
export const getAllMyGroupNovelties = async (Documento) => {
  const res = await apiClient.get(API.getAllMyGroupNovelties(Documento));
  return handleApiResponse(res);
};
// ? NOVEDADES MI EQUIPO HSITORIAL
export const getAllMyGroupNoveltiesHistory = async (Documento) => {
  const res = await apiClient.get(API.getAllMyGroupNoveltiesHistory(Documento));
  return handleApiResponse(res);
};
// ? NOVEDADES MI EQUIPO STAFF
export const getAllMyGroupNoveltiesStaffNovelties = async (Documento) => {
  const res = await apiClient.get(API.getAllMyGroupNoveltiesStaffNovelties(Documento));
  return handleApiResponse(res);
};

// ? NOVEDADES MI EQUIPO HISTORIAL DE ASESORES
export const GETALLMYGROUPNOVELTIESHISTORYADVISERS = async (Documento) => {
  const res = await apiClient.get(API.GETALLMYGROUPNOVELTIESHISTORYADVISERS(Documento));
  return handleApiResponse(res);
};

// ? NOVEDADES WFM
export const getAllWfmNovelties = async (Cliente) => {
  const res = await apiClient.get(API.getAllWfmNovelties(Cliente));
  return handleApiResponse(res);
};

// ? NOVEDADES GERENTE MANAGER
export const getAllManagersNovelties = async (Cliente) => {
  const res = await apiClient.get(API.getAllManagersNovelties(Cliente));
  return handleApiResponse(res);
};

// ? NOVEDADES PUNTO HELPI O NIMINA
export const getAllNominaNovelties = async (Cliente) => {
  const res = await apiClient.get(API.getAllNominaNovelties(Cliente));
  return handleApiResponse(res);
};

// ? HORAS EXTRAS TURNO ACTUAL
export const getShiftsNow = async (Documento, now) => {
  const res = await apiClient.get(API.getShiftsNow(Documento, now));
  return handleApiResponse(res);
};

// ? HORAS EXTRAS HISTORIAL
export const getAllDataHistoryHourExtra = async (Documento) => {
  const res = await apiClient.get(API.getAllDataHistoryHourExtra(Documento));
  return handleApiResponse(res);
};

// ? OBTENER EL JEFE INMEDIATO PARA MANDARLO EN LA SOLICITUD DE HORAS EXTRAS
export const getSupervisorForHourExtra = async (myJefeInmediato) => {
  const res = await apiClient.get(API.getSupervisorForHourExtra(myJefeInmediato));
  return handleApiResponse(res);
};

// ? OBTIENE EL LISTADO DE ASESORES EL CUAL EL JEFE INMEDIATO ESTA A CARGO PARA GENERAR UNA SOLICITUD POR EL SUPER EN CASO TAL EL ASESOR NO ESTA
export const getListAdviserForSupervisor = async (Documento) => {
  const res = await apiClient.get(API.getListAdviserForSupervisor(Documento));
  return handleApiResponse(res);
};

// ? //OBTIENE EL LISTADO DE HORAS PEPIDAS POR LOS ASESORES PARA MOSTRARSELOS A LOS GTR - HORAS EXTRAS
export const getAllPetitionsHourExtra = async (Cliente) => {
  const res = await apiClient.get(API.getAllPetitionsHourExtra(Cliente));
  return handleApiResponse(res);
};

// ? // OBTENER EL LISTADO DE TURNOS ACTUALES Y MOSTRARSELOS A LOS GTR - HORAS EXTRAS
export const getAllListShiftsNowForGtr = async (now) => {
  const res = await apiClient.get(API.getAllListShiftsNowForGtr(now));
  return handleApiResponse(res);
};

export const getAllPetitionsHourExtraMyGroup = async (Documento) => {
  const res = await apiClient.get(API.getAllPetitionsHourExtraMyGroup(Documento));
  return handleApiResponse(res);
};

export const getAllListShiftsNowForSupervisor = async (now, Documento) => {
  const res = await apiClient.get(API.getAllListShiftsNowForSupervisor(now, Documento));
  return handleApiResponse(res);
};

// ? OBTENER LOS TAMAÑOS EN CANTIDA DE LAS NOVEADES

export const NoveltiesPendingCount = async (Usuario_Red) => {
  const res = await apiClient.get(API.NoveltiesPendingCount(Usuario_Red));
  return handleApiResponse(res);
};
export const NoveltiesAcceptsCount = async (Usuario_Red) => {
  const res = await apiClient.get(API.NoveltiesAcceptsCount(Usuario_Red));
  return handleApiResponse(res);
};
export const NoveltiesRejectsCount = async (Usuario_Red) => {
  const res = await apiClient.get(API.NoveltiesRejectsCount(Usuario_Red));
  return handleApiResponse(res);
};

// ? ===============================================================================
// ? ==🚧                       MODULO NOVEDADES - APIS 🚧                       ==
// ? ===============================================================================

// TODO: ===============================================================================
// TODO: ==🚧                       MODULO NOMINA - APIS 🚧                          ==
// TODO: ===============================================================================

// TODO: OBTIENE TODO LOS DATOS DE MI NOMINA
export const getAllDataMyPayroll = async (Documento) => {
  const res = await apiClient.get(API.getAllDataMyPayroll(Documento));
  return handleApiResponse(res);
};

// TODO: OBTIENE TODO LOS DATOS MIS HORAS EXTRAS
export const getAllDataMyPayrollHourExtra = async (Documento) => {
  const res = await apiClient.get(API.getAllDataMyPayrollHourExtra(Documento));
  return handleApiResponse(res);
};

//TODO: MODULO NOMINA - IMPUNTUALIDADES
export const getAllTardinessForBoss = async (Documento_Jefe_Inmediato) => {
  const res = await apiClient.get(API.getAllTardinessForBoss(Documento_Jefe_Inmediato));
  return handleApiResponse(res);
};

export const getAllTardinessForBossStaff = async (Documento_Jefe_Inmediato) => {
  const res = await apiClient.get(
    API.getAllTardinessForBossStaff(Documento_Jefe_Inmediato)
  );
  return handleApiResponse(res);
};
export const getAllTardinessForBossStaffList = async (
  Documento_Jefe_Inmediato
) => {
  const res = await apiClient.get(
    API.getAllTardinessForBossStaffList(Documento_Jefe_Inmediato)
  );
  return handleApiResponse(res);
};

//TODO: MODULO NOMINA - IMPUNTUALIDADES
export const getAllTardiness = async (Usuario_Red) => {
  const res = await apiClient.get(API.getAllTardiness(Usuario_Red));
  return handleApiResponse(res);
};

//TODO: MODULO NOMINA - IMPUNTUALIDADES NOMINA
export const GETLISTTARDINESSNOIMINA = async (Cliente) => {
  const res = await apiClient.get(API.GETLISTTARDINESSNOIMINA(Cliente));
  return handleApiResponse(res);
};

//TODO: MODULO NOMINA - OBTIENE EL NUMERO DE LOS REPORTE PARA MOSTRARSELOS A FORMACION
export const GETALLTADINESSFORMACION = async (Cliente) => {
  const res = await apiClient.get(API.GETALLTADINESSFORMACION(Cliente));
  return handleApiResponse(res);
};

// TODO: ===============================================================================
// TODO: ==🚧                       MODULO KPI - APIS 🚧                          ==
// TODO: ===============================================================================

export const GETALLKPI = async () => { //Traer todos registros
  const res = await apiClient.get(API.GETALLKPI);
  return handleApiResponse(res);
};
export const GETALLKPISERVICIOSFILTRADO = async () => { //Traer todos los kpi filtrados para servicio
  const res = await apiClient.get(API.GETALLKPISERVICIOSFILTRADO);
  return handleApiResponse(res);
};
export const GETALLKPISADMINISTRATIVOS = async () => { //Traer todos los kpis administrativos
  const res = await apiClient.get(API.GETALLKPISADMINISTRATIVOS);
  return handleApiResponse(res);
};
export const GETTYPEALLKPI = async () => { //Traer todos tipos
  const res = await apiClient.get(API.GETTYPEALLKPI);
  return handleApiResponse(res);
};
export const GETALLJERARQUIAS = async () => { //Traer todas las jerarquias
  const res = await apiClient.get(API.GETALLJERARQUIAS);
  return handleApiResponse(res);
};
export const GETALLKPISSERVICIOS = async () => { //Traer todas las relaciones kpi-servicio
  const res = await apiClient.get(API.GETALLKPISSERVICIOS);
  return handleApiResponse(res);
};
export const GETALLAREASPROCESO = async () => { //Traer todas las relaciones areas y proceso
  const res = await apiClient.get(API.GETALLAREASPROCESO);
  return handleApiResponse(res);
};

export const GETALLKPISAREAS = async () => { //Traer todas las relaciones areas y KPIS
  const res = await apiClient.get(API.GETALLKPISAREAS);
  return handleApiResponse(res);
};
export const INSERTUPDATEMASIVOSKPI = async (fecha, usuario, data,) => { //Inserta de forma masiva kpis
  const res = await apiClient.post(API.INSERTUPDATEMASIVOSKPI, { fecha, usuario, data });
  return handleApiResponse(res);
};
export const GETALLMETASOPERATIVAS = async (fecha) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLMETASOPERATIVAS, { fecha });
  return handleApiResponse(res);
};
export const GETALLUSERSACTIVE = async () => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLUSERSACTIVE);
  return handleApiResponse(res);
};
export const GETSINGLEUSERBYDOCUMENT = async (documento) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETSINGLEUSERBYDOCUMENT, { documento });
  return handleApiResponse(res);
};
export const GETALLCOLLABORATORJERARQUIAS = async (operacion, servicio) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLCOLLABORATORJERARQUIAS, { operacion, servicio });
  return handleApiResponse(res);
};

export const GETALLCLIENTEJERARQUIAS = async () => { //Se obtiene de forma masiva kpis
  const res = await apiClient.get(API.GETALLCLIENTEJERARQUIAS);
  return handleApiResponse(res);
};

export const GETALLOPERACIONJERARQUIAS = async (cliente) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLOPERACIONJERARQUIAS, { cliente });
  return handleApiResponse(res);
};

export const GETALLSEGMENTOJERARQUIAS = async (operacion) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLSEGMENTOJERARQUIAS, { operacion });
  return handleApiResponse(res);
};

export const GETALLSERVICIOJERARQUIAS = async (segmento) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLSERVICIOJERARQUIAS, { segmento });
  return handleApiResponse(res);
};

export const GETALLCOLLABORATORMASIVEKPI = async (servicio_id, items) => { //Se obtiene de forma masiva kpis
  const res = await apiClient.post(API.GETALLCOLLABORATORMASIVEKPI, { servicio_id, items });
  return handleApiResponse(res);
};

export const INSERTUPDATECOLLABORATORKPIS = async (items, usuarioGestor) => { //Se inserta de forma masiva los kpis
  const res = await apiClient.post(API.INSERTUPDATECOLLABORATORKPIS, { items, usuarioGestor });
  return handleApiResponse(res);
};

export const GETALLKPISINDIVIDUAL = async (usuarioRed, documento) => { //Se inserta de forma masiva los kpis
  const res = await apiClient.post(API.GETALLKPISINDIVIDUAL, { usuarioRed, documento });
  return handleApiResponse(res);
};

export const GETALLKPISASIGNABLESINDIVIDUAL = async (servicio) => { //Se inserta de forma masiva los kpis
  const res = await apiClient.post(API.GETALLKPISASIGNABLESINDIVIDUAL, { servicio });
  return handleApiResponse(res);
};

export const INSERTUPDATESINGLECOLLABORATOR = async (data) => { //Se inserta de forma masiva los kpis
  const res = await apiClient.post(API.INSERTUPDATESINGLECOLLABORATOR, { data });
  return handleApiResponse(res);
};

export const GETALLRESULTADOSOPERATIVOS = async (mesActual) => { //Se inserta de forma masiva los kpis
  const res = await apiClient.post(API.GETALLRESULTADOSOPERATIVOS, { mesActual });
  return handleApiResponse(res);
};
export const INSERTUPDATERESULTADOSOPERATIVOS = async (fecha, usuario, data) => { //Se inserta de forma masiva los kpis
  const res = await apiClient.post(API.INSERTUPDATERESULTADOSOPERATIVOS, { fecha, usuario, data });
  return handleApiResponse(res);
};

export const GETREPORALLKPI = async () => { //Traer todos los reportes
  const res = await apiClient.get(API.GETREPORALLKPI);
  return handleApiResponse(res);
};
export const GETFORMATALLKPI = async () => { //Traer todos los formatos
  const res = await apiClient.get(API.GETFORMATALLKPI);
  return handleApiResponse(res);
};
export const GETPERIODIALLKPI = async () => { //Traer todos Las periodicidades
  const res = await apiClient.get(API.GETPERIODIALLKPI);
  return handleApiResponse(res);
};
export const GETCLASIFICA = async () => { //Traer todos Las clasificaciones
  const res = await apiClient.get(API.GETCLASIFICA);
  return handleApiResponse(res);
};
export const GETPROCESOS = async () => { //Traer todos los procesos
  const res = await apiClient.get(API.GETPROCESOS);
  return handleApiResponse(res);
};
export const GETALLRESPONSABLESUPD = async () => { //Traer todos los responsables UPD
  const res = await apiClient.get(API.GETALLRESPONSABLESUPD);
  return handleApiResponse(res);
};
export const GETALLLOGKPI = async () => { //Traer todos los LOGs
  const res = await apiClient.get(API.GETALLLOGKPI);
  return handleApiResponse(res);
};

export const GETALLLOGKPIFILTER = async () => { //Traer todos los LOGs filtrados
  const res = await apiClient.get(API.GETALLLOGKPIFILTER);
  return handleApiResponse(res);
};

// TODO: ===============================================================================
// TODO: ==🚧                       MODULO NOMINA - APIS 🚧                          ==
// TODO: ===============================================================================

// !: ===============================================================================
// !: ==🚧                       NOTIFICATIONS - APIS 🚧                          ==
// !: ===============================================================================

export const GETSUPERVISORFORNOTIFICATION = async (
  Documento_Jefe_Inmediato_Recibe
) => {
  const res = await apiClient.get(
    API.GETSUPERVISORFORNOTIFICATION(Documento_Jefe_Inmediato_Recibe)
  );
  return handleApiResponse(res);
};

// !: ===============================================================================
// !: ==🚧                       NOTIFICATIONS - APIS 🚧                          ==
// !: ===============================================================================

// * OBTIENE EL LISTADO DE EL TIPO DE IMPUNTUALIDADES
export const getAllListTypeTardiness = async () => {
  const res = await apiClient.get(API.getAllListTypeTardiness);
  return handleApiResponse(res);
};

// !: ===============================================================================
// !: ==🚧         // VALIDAMOS SI EL DÍA A TOMAR CONTIENE AL TURNO DE CIERRE, SI ES ASÍ LE INHABILITAMOS EL BOTÓN 🚧                          ==
// !: ===============================================================================

export const VALIDATESHIFTCLOSE = async (Documento, Dia_Trabajo_Actual) => {
  const res = await apiClient.get(API.VALIDATESHIFTCLOSE(Documento, Dia_Trabajo_Actual));

  return handleApiResponse(res);
};

export const GETCOURTDATES = async () => {
  const res = await apiClient.get(API.GETCOURTDATES);
  return handleApiResponse(res);
};

// ! PUSH DE ASIGNAR LAS HORAS EXTRAS
export const AddCourtDatesPayrrolls = () => {
  const AddCourtDatesPayrroll = API.AddCourtDatesPayrroll;
  return { AddCourtDatesPayrroll };
};
