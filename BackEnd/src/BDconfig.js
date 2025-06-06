// Este es el archivo dónde se crean las conexiones a la base de datos que vayamos a
// utilizar.

import { config as dotenv } from "dotenv";
dotenv();

// ===============================================================================
// ==🚧 le pasamos las variables de entorno que se encuentran en .env para poder==
//                      pasar la conexion correctamente 🚧                      ==
// ===============================================================================

//CONEXION PARA DE TODA LA APP PRINCIPALMENTE PARA LA FUNCIONAL
const Almaverso = {
  host: process.env.ALMAVERSO_HOST,
  user: process.env.ALMAVERSO_USER,
  password: process.env.ALMAVERSO_PASSWORD,
  database: process.env.ALMAVERSO_BD,
};
const Almaverso2 = {
  host: process.env.ALMAVERSO_HOST_LOCAL,
  user: process.env.ALMAVERSO_USER_LOCAL,
  password: process.env.ALMAVERSO_PASSWORD_LOCAL,
  database: process.env.ALMAVERSO_BD_LOCAL,
};

//CONEXION PARA SISTEMA DE PUNTO y NOMINA
const AlmaversoSystemPoint = {
  host: process.env.ALMAVERSOSYSTEMPOINT_HOST,
  user: process.env.ALMAVERSOSYSTEMPOINT_USER,
  password: process.env.ALMAVERSOSYSTEMPOINT_PASSWORD,
  database: process.env.ALMAVERSOSYSTEMPOINT_BD,
};

//CONEXION PARA SISTEMA DE PUNTO y NOMINA ANTARES
const AlmaversoSystemPointAntares = {
  host: process.env.ALMAVERSOSYSTEMPOINT_HOST_ANTARES,
  user: process.env.ALMAVERSOSYSTEMPOINT_USER_ANTARES,
  password: process.env.ALMAVERSOSYSTEMPOINT_PASSWORD_ANTARES,
  database: process.env.ALMAVERSOSYSTEMPOINT_BD_ANTARES,
};

//CONEXION PARA DE TODA LA APP PRINCIPALMENTE PARA LA INFO
const Sociodemographic = {
  host: process.env.SOCIODEMOGRAPHIC_HOST,
  user: process.env.SOCIODEMOGRAPHIC_USER,
  password: process.env.SOCIODEMOGRAPHIC_PASSWORD,
  database: process.env.SOCIODEMOGRAPHIC_BD,
};
const Sociodemographic2 = {
  host: process.env.SOCIODEMOGRAPHIC_HOST_LOCAL,
  user: process.env.SOCIODEMOGRAPHIC_USER_LOCAL,
  password: process.env.SOCIODEMOGRAPHIC_PASSWORD_LOCAL,
  database: process.env.SOCIODEMOGRAPHIC_BD_LOCAL,
};

const TESTNOTIFICATIONS = {
  host: process.env.ALMAVERSOTESTNOTICATIONS_HOST,
  user: process.env.ALMAVERSOTESTNOTICATIONS_USER,
  password: process.env.ALMAVERSOTESTNOTICATIONS_PASSWORD,
  database: process.env.ALMAVERSOTESTNOTICATIONS_BD,
};

// Conexión para kpi pruebas
const antaresKPI = {
  host: process.env.ALMAVERSO_KPI_HOST,
  user: process.env.ALMAVERSO_KPI_USER,
  password: process.env.ALMAVERSO_KPI_PASSWORD,
  database: process.env.ALMAVERSO_KPI_BD,
};

// Conexión de pruebas Socio_53
const KPISOCIO53 = {
  host: process.env.ALMAVERSO_KPI_SOCIO53_HOST,
  user: process.env.ALMAVERSO_KPI_SOCIO53_USER,
  password: process.env.ALMAVERSO_KPI_SOCIO53_PASSWORD,
  database: process.env.ALMAVERSO_KPI_SOCIO53_BD,
};

// CONEXIÓN PARA PRUEBAS DE ANTARES JERARQUÍAS
const antaresJerarquias = {
  host: process.env.ALMAVERSO_JERARQUIAS_HOST,
  user: process.env.ALMAVERSO_JERARQUIAS_USER,
  password: process.env.ALMAVERSO_JERARQUIAS_PASSWORD,
  database: process.env.ALMAVERSO_JERARQUIAS_BD,
  port: process.env.DB_PORT,
};

// CONEXIÓN PARA FORMGEN
const formgen = {
  user: process.env.DB_USER_FORMGEN,
  host: process.env.DB_HOST_FORMGEN,
  password: process.env.DB_PASSWORD_FORMGEN,
  database: process.env.DB_DATABASE_FORMGEN,
  port: process.env.DB_PORT_FORMGEN,
};

const AlmaSurveyForm = {
  user: process.env.ALMAVERSO_HOST,
  host: process.env.ALMAVERSO_USER,
  password: process.env.ALMAVERSO_PASSWORD,
  database: process.env.ALMAVERSO_BD
};

// CONEXIÓN PARA PLAN DE CAPACIDAD
const plancapacidad = {
  user: process.env.DB_USER_PLAN_CAPACIDAD,
  host: process.env.DB_HOST_PLAN_CAPACIDAD,
  password: process.env.DB_PASSWORD_PLAN_CAPACIDAD,
  database: process.env.DB_DATABASE_PLAN_CAPACIDAD,
  port: process.env.DB_PORT_PLAN_CAPACIDAD,
};

// CONEXIÓN PARA ALMASOCIO
const almasocio = {
  user: process.env.DB_ALMAVERSO_ALMASOCIO_USER,
  host: process.env.DB_ALMAVERSO_ALMASOCIO_HOST,
  password: process.env.DB_ALMAVERSO_ALMASOCIO_PASSWORD,
  database: process.env.DB_ALMAVERSO_ALMASOCIO,
  port: process.env.DB_PORT_ALMAVERSO_ALMASOCIO,
};

module.exports = {
  Almaverso,
  Almaverso2,
  Sociodemographic,
  Sociodemographic2,
  AlmaversoSystemPoint,
  TESTNOTIFICATIONS,
  AlmaversoSystemPointAntares,
  antaresJerarquias,
  formgen,
  AlmaSurveyForm,
  almasocio,
  antaresKPI,
  KPISOCIO53,
};
