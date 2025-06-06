import { Almaverso, Sociodemographic } from "../BDconfig";
const { authenticateToken } = require("../Auth/AuthMiddleware");
const mysql = require("mysql2");
const express = require("express");
const Shifts = express.Router();
const cors = require("cors");

Shifts.use(cors());
Shifts.use(express.json());
Shifts.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool(Almaverso);
const pool2 = mysql.createPool(Sociodemographic);

function getUnique(array, key1, key2) {
  return [
    ...new Map(
      array.map((item) => [`${item[key1]}-${item[key2]}`, item])
    ).values(),
  ];
}

//OBTIENE LA LISTA DE LOS TURNOS DEPENDIENDO DE EL USUARIO QUE INGRESA A LA PLATAFORMA
Shifts.get("/API/shifts/advisers/:Documento", authenticateToken, (req, res) => {
  const Documento = req.params.Documento;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error interno del servidor");
    }

    try {
      const sqlStaff = `SELECT * FROM T_Shifts_Staff WHERE Documento = ?`;
      connection.query(sqlStaff, [Documento], (queryErr, result) => {
        if (queryErr) {
          connection.release();
          return res.status(500).send("Error interno del servidor");
        } else {
          // Si no hay resultados en T_Shifts, realizar la consulta en T_Shifts_Staff
          const sql = `SELECT * FROM T_Shifts WHERE Documento = ?`;
          connection.query(sql, [Documento], (queryErrStaff, resultStaff) => {
            connection.release();
            if (queryErrStaff) {
              return res.status(500).send("Error interno del servidor");
            } else if (resultStaff.length > 0 || result.length > 0) {
              const response = [];
              const uniqueStaff = getUnique(result, "Fecha", "Documento");
              const uniqueShifts = getUnique(resultStaff, "Fecha", "Documento");
              if (result.length > 0) {
                // Remover duplicados de result¿
                response.push({
                  source: "staff",
                  data: uniqueStaff,
                });
              }

              if (resultStaff.length > 0) {
                // Remover duplicados de resultStaff
                response.push({
                  source: "shifts",
                  data: uniqueShifts,
                });
              }
              const combinedStaff = [...uniqueStaff, ...uniqueShifts];
              return res.status(200).json(combinedStaff);
            } else {
              return res.status(400).send("No hay resultados para el usuario");
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error interno del servidor");
    }
  });
});

//
Shifts.get("/API/GET/SHIFT/CHANGE-ADVISER/:Fecha/:Documento", authenticateToken, (req, res) => {
  const Fecha = req.params.Fecha;
  const Documento = req.params.Documento;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    try {
      const sql = `SELECT * FROM T_Shifts WHERE Fecha = ? AND Documento = ?`;
      connection.query(sql, [Fecha, Documento], (err, result) => {
        connection.release();
        if (err) {
          return res.status(500).send("Error interno del servidor");
        }
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send("No hay resultados para el usuario");
        }
      });
    } catch (error) {
      res.status(500).send("Error interno del server");
    }
  });
});

//OBTIENE LA LISTA DE TURNOS A CAMBIAR - SE LA MUESTRA A EL SUPERVISOR
Shifts.get("/API/GET/DAY-REST-FOR-DISABLE/:Documento", authenticateToken, (req, res) => {
  const Documento = req.params.Documento;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    try {
      const sql = `SELECT Fecha FROM T_Shifts WHERE Documento = ? AND Novedad = 'DES' AND Fecha > CURDATE()`;
      connection.query(sql, [Documento], (err, result) => {
        connection.release();
        if (err) {
          return res.status(500).send("Error interno del servidor");
        }
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send("No hay resultados para el usuario");
        }
      });
    } catch (error) {
      res.status(500).send("Error interno del server");
    }
  });
});

//OBTIENE LA LISTA DE TURNOS A CAMBIAR - SE LA MUESTRA A EL SUPERVISOR
Shifts.get("/API/GET/DAY-REST-FOR-DISABLE-COMPANERO/:Documento", authenticateToken, (req, res) => {
  const Documento = req.params.Documento;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    try {
      const sql = `SELECT Fecha FROM T_Shifts WHERE Documento = ? AND Novedad = 'DES' AND Fecha > CURDATE()`;
      connection.query(sql, [Documento], (err, result) => {
        connection.release();
        if (err) {
          res.status(404).send(err);
        } else if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send("No hay resultados");
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

//OBTINE L NÚMERO DE RECHAZADOS POR EL SUPERVISOR PARA MOSTRARSELO A LOS ASESORES EN CASO DE SER RECHAZADOS
Shifts.get("/API/GET/LENGHT-NOTIFICATIONS/:Documento", authenticateToken, (req, res) => {
  const Documento = req.params.Documento;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    try {
      const sql = `SELECT Estado_Marcacion_Final FROM T_Shifts_Notifications WHERE Documento_Envia = ? AND Estado_Marcacion_Final = 'Rechazado'`;
      connection.query(sql, [Documento], (err, result) => {
        connection.release();
        if (err) {
          res.status(404).send(err);
        } else if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send();
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});
//OBTINE L NÚMERO DE ACEPTADOS POR EL SUPERVISOR PARA MOSTRARSELO A LOS ASESORES EN CASO DE SER ACEPTADOS
Shifts.get("/API/GET/LENGHT-NOTIFICATIONS/ACCEPT/:Documento", authenticateToken, (req, res) => {
  const Documento = req.params.Documento;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    try {
      const sql = `SELECT Estado_Marcacion_Final FROM T_Shifts_Notifications WHERE Documento_Envia = ? AND Estado_Marcacion_Final = 'Aceptado'`;
      connection.query(sql, [Documento], (err, result) => {
        connection.release();
        if (err) {
          res.status(404).send(err);
        } else if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send();
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});
//OBTINE L NÚMERO DE ENCURSO POR EL SUPERVISOR PARA MOSTRARSELO A LOS ASESORES EN CASO DE SER ENCURSO
Shifts.get("/API/GET/LENGHT-NOTIFICATIONS/ENCURSO/:Documento", authenticateToken, (req, res) => {
  const Documento = req.params.Documento;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    try {
      const sql = `SELECT Estado_Marcacion_Final FROM T_Shifts_Notifications WHERE Documento_Envia = ? AND Estado_Marcacion_Final is null`;
      connection.query(sql, [Documento], (err, result) => {
        connection.release();
        if (err) {
          res.status(404).send(err);
        } else if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send();
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

//OBTIENE EL NUMERO DE ESTADO EN CURSO CUANDO EL 1ER USUARIO ENVIA LA NOTIFICACION A EL 2DO ASESOR
//ENTONCES EL 2DO ASESOR YA PASA A ESTADO DE TENER ENCURSO DEL EL 1ER ASESOR
Shifts.get(
  "/API/GET/LENGHT-NOTIFICATIONS/ENCURSO/COMPANY/:Documento", authenticateToken,
  (req, res) => {
    const Documento = req.params.Documento;
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).send("Error interno del servidor");
      }
      try {
        const sql = `SELECT Estado_Marcacion_Final FROM T_Shifts_Notifications WHERE Documento_Recibe = ? AND Respuesta_Recibe = 'Aceptado' AND Estado_Marcacion_Final is null`;
        connection.query(sql, [Documento], (err, result) => {
          connection.release();
          if (err) {
            res.status(404).send(err);
          } else if (result.length > 0) {
            res.status(200).send(result);
          } else {
            res.status(200).send();
          }
        });
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
);
//OBTIENE EL NUMERO DE ESTADO EN APROBADO CUANDO EL 1ER USUARIO ENVIA LA NOTIFICACION A EL 2DO ASESOR
//ENTONCES EL 2DO ASESOR YA PASA A ESTADO DE TENER APROBADO DEL EL 1ER ASESOR
Shifts.get(
  "/API/GET/LENGHT-NOTIFICATIONS/ACCEPT/COMPANY/:Documento", authenticateToken,
  (req, res) => {
    const Documento = req.params.Documento;
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).send("Error interno del servidor");
      }
      try {
        const sql = `SELECT Estado_Marcacion_Final FROM T_Shifts_Notifications WHERE Documento_Recibe = ? AND Respuesta_Recibe = 'Aceptado' AND Estado_Marcacion_Final = 'Aceptado'`;
        connection.query(sql, [Documento], (err, result) => {
          connection.release();
          if (err) {
            res.status(404).send(err);
          } else if (result.length > 0) {
            res.status(200).send(result);
          } else {
            res.status(200).send();
          }
        });
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
);
//OBTIENE EL NUMERO DE ESTADO EN RECHAZADO CUANDO EL 1ER USUARIO ENVIA LA NOTIFICACION A EL 2DO ASESOR
//ENTONCES EL 2DO ASESOR YA PASA A ESTADO DE TENER RECHAZADO DEL EL 1ER ASESOR
Shifts.get(
  "/API/GET/LENGHT-NOTIFICATIONS/REJECT/COMPANY/:Documento", authenticateToken,
  (req, res) => {
    const Documento = req.params.Documento;
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).send("Error interno del servidor");
      }
      try {
        const sql = `SELECT Estado_Marcacion_Final FROM T_Shifts_Notifications WHERE Documento_Recibe = ? AND Respuesta_Recibe = 'Aceptado' AND Estado_Marcacion_Final = 'Rechazado'`;
        connection.query(sql, [Documento], (err, result) => {
          connection.release();
          if (err) {
            res.status(404).send(err);
          } else if (result.length > 0) {
            res.status(200).send(result);
          } else {
            res.status(200).send();
          }
        });
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
);

//OBTIENE LA LISTA DE ASESORES EL CUAL EL SUPERVISOR ESTA A CARGO
Shifts.get("/API/GET/LIST-ADVISER/FOR-BOSS/:Usuario_Red", authenticateToken, (req, res) => {
  const Usuario_Red = req.params.Usuario_Red;
  pool2.getConnection((err, connection2) => {
    if (err) {
      return res.status(500).send("Error interno del servidor");
    }
    const releaseConnectionAndRespond = (status, data) => {
      connection2.release();
      res.status(status).json(data);
    };

    try {
      const BossQuery = `SELECT Documento FROM T_Socio WHERE Usuario_Red = '${Usuario_Red}' AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Usuario_Red = '${Usuario_Red}')`;
      connection2.query(BossQuery, [Usuario_Red], (error, advisersResults) => {
        if (error) {
          releaseConnectionAndRespond(500, {
            error: "Ocurrió un error al obtener la lista de usuarios",
          });
        } else {
          const documento = advisersResults.map(
            (advisers) => advisers.Documento
          );
          const AdviserQuery = `SELECT Nombres, Apellidos, Documento, ID_Imagen, Cargo FROM T_Socio WHERE Estado_Empleado = 'Activo' AND Documento_Jefe_Inmediato = ? AND Fecha_Corte = (SELECT MAX(Fecha_Corte) FROM T_Socio WHERE Documento_Jefe_Inmediato = ?)`;

          connection2.query(
            AdviserQuery,
            [documento, documento],
            (error, listAdviserResults) => {
              if (error) {
                releaseConnectionAndRespond(500, {
                  error:
                    "Ocurrió un error al obtener los turnos de los usuarios",
                });
              } else if (listAdviserResults.length > 0) {
                const documentoAdvisers = listAdviserResults.map(
                  (adviser) => adviser.Documento
                );
                pool.getConnection((err, connection1) => {
                  if (err) {
                    releaseConnectionAndRespond(
                      500,
                      "Error al obtener conexión con la tercera base de datos"
                    );
                  }

                  // const ShiftsQuery = `SELECT * FROM T_Shifts_Staff WHERE Documento IN (?)`;
                  const ShiftsQuery = `SELECT * FROM T_Shifts WHERE Documento IN (?)`;
                  connection1.query(
                    ShiftsQuery,
                    [documentoAdvisers],
                    (error, shiftsResults) => {
                      if (error) {
                        releaseConnectionAndRespond(500, {
                          error:
                            "Ocurrió un error al obtener los turnos de los usuarios",
                        });
                      } else {
                        // const ShiftsQuery2 = `SELECT * FROM T_Shifts WHERE Documento IN (?)`;
                        const ShiftsQuery2 = `SELECT * FROM T_Shifts_Staff WHERE Documento IN (?)`;
                        connection1.query(
                          ShiftsQuery2,
                          [documentoAdvisers],
                          (error2, shiftsResults2) => {
                            if (error2) {
                              releaseConnectionAndRespond(500, {
                                error:
                                  "Ocurrió un error al obtener los turnos de los usuarios",
                              });
                            } else {
                              const uniqueShifts = [];
                              const allShifts =
                                shiftsResults.concat(shiftsResults2);
                              allShifts.forEach((shift) => {
                                // ¿Ya existe un registro igual para este documento y fecha?
                                const exists = uniqueShifts.find(
                                  (u) =>
                                    u.Documento === shift.Documento &&
                                    u.Fecha === shift.Fecha
                                );

                                // Si no existe, agregar este shift como único
                                if (!exists) {
                                  uniqueShifts.push(shift);
                                }
                              });
                              const resultadoFinal = {
                                BOSS: advisersResults,
                                ADVISER: listAdviserResults,
                                SHIFTS: uniqueShifts,
                              };

                              connection1.release();
                              releaseConnectionAndRespond(200, resultadoFinal);
                            }
                          }
                        );
                      }
                    }
                  );
                });
              } else {
                releaseConnectionAndRespond(200, "No hay resultados");
              }
            }
          );
        }
      });
    } catch (error) {
      releaseConnectionAndRespond(500, { error: "Error interno del servidor" });
    }
  });
});

Shifts.use((err, req, res, next) => {
  res.status(500).send("Error interno del servidor");
});

module.exports = Shifts;
