// Este es el archivo dónde se crean las conexiones a la base de datos que vayamos a 
// utilizar. 

//!                 ================================================================                 ///!
//!                 =                         PUERTO Y HOST                        =                 ///!
//!                 ================================================================                 ///!


import { config as dotenv } from 'dotenv';
dotenv();

const HOST = process.env.HOST;
 
 const PORT = process.env.PORT_LOCAL;
 const PORT_NOTIFICATIONS = process.env.PORT_NOTIFICATIONS_LOCAL;
 const PORT_NOTIFICATIONS_NOVELTIES = process.env.PORT_NOTIFICATIONS_NOVELTIES_LOCAL;
 const PORT_NOTIFICATIONS_SUERVEY = process.env.PORT_NOTIFICATIONS_SUERVEY;

// const PORT = process.env.PORT_LOCAL;
// const PORT_NOTIFICATIONS = process.env.PORT_NOTIFICATIONS;
// const PORT_NOTIFICATIONS_NOVELTIES = process.env.PORT_NOTIFICATIONS_NOVELTIES;
//  const PORT_NOTIFICATIONS_SUERVEY = process.env.PORT_NOTIFICATIONS_SUERVEY;

module.exports = { PORT, HOST, PORT_NOTIFICATIONS, PORT_NOTIFICATIONS_NOVELTIES, PORT_NOTIFICATIONS_SUERVEY };