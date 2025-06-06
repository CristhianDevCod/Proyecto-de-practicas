import {
  React,
  useState,
  useEffect,
  useContext,
  Modal,
  notification,
} from "../../Exports-Modules/Exports";
import { Button } from "@mui/joy";

import { UserProfileContext } from "../../Context/ProfileContex";
import Service from "../../Machine/Service";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import apiClient from "../../Service/Service";

const Survey = () => {
  const { fullName } = useContext(UserProfileContext);
  const { Servidor } = Service();
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);

  const [Respuesta_1, setRespuesta_1] = useState("");
  const [Respuesta_2, setRespuesta_2] = useState("");
  const [Respuesta_3, setRespuesta_3] = useState("");
  const [Respuesta_4, setRespuesta_4] = useState("");

  const handleInputRespuesta_1 = (e) => {
    setRespuesta_1(e.target.value);
  };

  const handleInputRespuesta_2 = (e) => {
    setRespuesta_2(e.target.value);
  };

  const handleInputRespuesta_3 = (e) => {
    setRespuesta_3(e.target.value);
  };

  const handleInputRespuesta_4 = (e) => {
    setRespuesta_4(e.target.value);
  };
  const Pregunta_1 =
    "¿En caso de habililitarse la opción de trabajo en casa, ¿Te interesaría?";
  const Pregunta_2 =
    "¿Cuentas con espacio óptimo para realizar tus labores?, (Silla, Escritorio, etc...).";
  const Pregunta_3 = "¿Cuentas con internet mínimo de 10 megas?.";
  const Pregunta_4 =
    "¿Cuentas con un equipo que tenga sistema operativo Windows 10?. (NOTA: No puede ser MAC o versiones diferentes de Windows).";

  let Usuario_Red = localStorage.getItem("username");
  let Documento = fullName.map((item) => {
    return item.Documento;
  });
  let Nombre_Completo = fullName.map((item) => {
    return `${item.Apellidos} ${item.Nombres}`;
  });
  let Cargo = fullName.map((item) => {
    return item.Cargo;
  });
  let Cliente = fullName.map((item) => {
    return item.Cliente_Area;
  });
  let Servicio = fullName.map((item) => {
    return item.Servicio;
  });
  let Sede = fullName.map((item) => {
    return item.Sede;
  });

  const insertValor = async (event) => {
    event.preventDefault();
    setOpen(false);
    apiClient.post(`http://${Servidor}/API/SERVEY`, {
        Documento,
        Usuario_Red,
        Nombre_Completo,
        Cargo,
        Servicio,
        Cliente,
        Sede,
        Pregunta_1,
        Respuesta_1,
        Pregunta_2,
        Respuesta_2,
        Pregunta_3,
        Respuesta_3,
        Pregunta_4,
        Respuesta_4,
      })
      .then((response) => {
        api.success({
          message: `${response.data}`,
        });
      })
      .catch((response) => {
        api.error({
          message: `${response.data}`,
        });
      });
  };

  useEffect(() => {
    apiClient
      .get(
        `http://${Servidor}/API/SELECTSURVEY/V1/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.Respondio === false) {
          setOpen(false);
        } else {
          if (data.Respondio === true) {
            setOpen(true);
          }
        }
      });
  }, [Servidor]);

  const SurveyForm = () => {
    return (
      <>
        <div className="card border-light">
          <div className="card-body">
            <div>
              <label htmlFor="agreeWorkOption">
                1. ¿En caso de habililitarse la opción de trabajo en casa, ¿Te
                interesaría?.
              </label>
              <div className="mb-3">
                <select
                  name="Respuesta_1"
                  className="form-select"
                  onChange={handleInputRespuesta_1}
                  value={Respuesta_1}
                >
                  <option value="">Seleccione</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>

            {Respuesta_1 === "SI" && (
              <>
                {/* Pregunta 2 */}
                <div>
                  <label htmlFor="optimalSpace">
                    2. ¿Cuentas con espacio óptimo para realizar tus labores?,
                    (Silla, Escritorio, etc...).
                  </label>
                  <div className="mb-3">
                    <select
                      name="Respuesta_2"
                      className="form-select"
                      onChange={handleInputRespuesta_2}
                      value={Respuesta_2}
                    >
                      <option value="">Seleccione</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                {/* Pregunta 3 */}
                <div>
                  <label htmlFor="minInternetSpeed">
                    3. ¿Cuentas con internet mínimo de 10 megas?.
                  </label>
                  <div className="mb-3">
                    <select
                      name="Respuesta_3"
                      className="form-select"
                      onChange={handleInputRespuesta_3}
                      value={Respuesta_3}
                    >
                      <option value="">Seleccione</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                {/* Pregunta 4 */}
                <div>
                  <label htmlFor="windows10">
                    4. ¿Cuentas con un equipo que tenga sistema operativo
                    Windows 10?. (NOTA: No puede ser MAC o versiones diferentes
                    de Windows).
                  </label>
                  <div className="mb-3">
                    <select
                      name="Respuesta_4"
                      className="form-select"
                      onChange={handleInputRespuesta_4}
                      value={Respuesta_4}
                    >
                      <option value="">Seleccione</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {Respuesta_1 === "NO" ? (
            <Button
              variant="soft"
              color="primary"
              size="sm"
              onClick={insertValor}
            >
              Enviar
            </Button>
          ) : (
            <Button
              variant="soft"
              color="primary"
              size="sm"
              onClick={insertValor}
              disabled={
                Respuesta_1 === "" ||
                Respuesta_1 === null ||
                Respuesta_1 === undefined ||
                Respuesta_2 === "" ||
                Respuesta_2 === null ||
                Respuesta_2 === undefined ||
                Respuesta_3 === "" ||
                Respuesta_3 === null ||
                Respuesta_3 === undefined ||
                Respuesta_4 === "" ||
                Respuesta_4 === null ||
                Respuesta_4 === undefined
              }
            >
              Enviar
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <div className="d-flex">
            <div className="p-2">
              <TaskRoundedIcon fontSize="medium" color="info" />
            </div>
            <div className="p-2">
              <div className="modal-title details-label-boss mb-4">
                ENCUESTA
              </div>
            </div>
          </div>
        }
        width={800}
        open={open}
        footer={null}
      >
        {SurveyForm()}
      </Modal>
    </>
  );
};

export default Survey;
