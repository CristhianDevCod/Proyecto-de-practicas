import {
  React,
  useContext,
  useEffect,
  useState,
  Box,
} from "../../Exports-Modules/Exports";

import { Modal, ModalDialog } from "@mui/joy";
import { Typography, Input, Button, notification } from "antd";
import "./Styles/Styles.css";

import { UserProfileContext } from "../../Context/ProfileContex";
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";

const { Text } = Typography;
const Feeling = () => {
  const { Servidor, accessToken } = Service();
  const { fullName } = useContext(UserProfileContext);
  const [api, contextHolder] = notification.useNotification();
  const [showForm, setShowForm] = useState(false);
  const [isVisble, setIsVisible] = useState(true);
  const [disble, isDisabled] = useState(true);
  const [Sentimiento, setValor] = useState("");
  const [Comentario, setDescription] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleTouched(event) {
    const Sentimiento = event.target.value;
    setValor(Sentimiento);
    isDisabled(!true);
  }

  function handleDescription(event) {
    const Comentario = event.target.value;
    setDescription(Comentario);
  }

  let Usuario_Red = localStorage.getItem("username");
  let Documento = fullName.map((item) => {
    return item.Documento;
  });
  let Nombre = fullName.map((item) => {
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
  let Jefe_Inmediato = fullName.map((item) => {
    return item.Jefe_Inmediato;
  });

  const insertValor = async (event) => {
    event.preventDefault();
    setIsVisible(false);
    apiClient.post(`http://${Servidor}/API/FEELING`, {
        Usuario_Red,
        Documento,
        Nombre,
        Cargo,
        Cliente,
        Servicio,
        Jefe_Inmediato,
        Sentimiento,
        Comentario,
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
        `http://${Servidor}/API/SELECTMYFEELING/V1/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.Respondio === false) {
          setShowForm(false);
        } else {
          if (data.Respondio === true) {
            setShowForm(true);
          }
        }
      });
  }, [Servidor, accessToken]);

  return (
    <div className="modal-my-feelings">
      {contextHolder}
      <div>
        {showForm && (
          <Modal
            open={isVisble}
            sx={{
              lg: "sm",
              border: "none",
              borderColor: "transparent",
              height: "100%",
            }}
          >
            <ModalDialog className="modal-feelings">
              <Box className="modal-feelings-content">
                <div className="modal-feelings-content-margin">
                  <Box className="header-feelings">
                    <Text className="title-feelings">!HOLA¡</Text>
                    <Text className="title-feelings">¿Qué sientes hoy?</Text>
                  </Box>
                  <div className="container-content-modal">
                    <Box className="container-animated-modal">
                      <div className="planet-animated">
                        <div className="blackhole">
                          <span className="ring" />
                        </div>
                      </div>
                      <Text className="content-interrogatios">?</Text>
                    </Box>
                  </div>

                  <Box className="content-feelings">
                    <div className="content-text-feelings">
                      <Button
                        onClick={handleTouched}
                        value="Alegria"
                        className="text-feelings-Alegría"
                      />
                      <Button
                        onClick={handleTouched}
                        value="Enojo"
                        className="text-feelings-Enojo"
                      />
                      <Button
                        onClick={handleTouched}
                        value="Frustracion"
                        className="text-feelings-Frustración"
                      />
                      <Button
                        onClick={handleTouched}
                        value="Tristeza"
                        className="text-feelings-Tristeza"
                      />
                      <Button
                        onClick={handleTouched}
                        value="Motivacion"
                        className="text-feelings-Motivación"
                      />
                      <Button
                        onClick={handleTouched}
                        value="Gratitud"
                        className="text-feelings-Gratitud"
                      />
                      <Button
                        onClick={handleTouched}
                        value="Tranquilidad"
                        className="text-feelings-Tranquilidad"
                      />
                    </div>
                  </Box>

                  <label htmlFor="" style={{ color: "#ffffff" }}>
                    Opcional
                  </label>
                  <Box className="container-input-button">
                    <div className="container-input-label">
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Cuéntanos, ¿por qué te sientes así?"
                        value={Comentario}
                        name="Description"
                        onChange={handleDescription}
                      />
                    </div>

                    <div className="container-button-send">
                      <Button
                        disabled={disble}
                        className="button-send"
                        onClick={insertValor}
                      >
                        Enviar
                      </Button>
                    </div>
                  </Box>
                </div>
              </Box>
            </ModalDialog>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Feeling;
