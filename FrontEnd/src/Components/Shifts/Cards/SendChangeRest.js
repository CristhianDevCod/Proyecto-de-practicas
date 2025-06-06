import {
  React,
  useContext,
  useEffect,
  useState,
} from "../../../Exports-Modules/Exports";
import { UserProfileContext } from "../../../Context/ProfileContex";
import { Input } from "antd";
import Service from "../../../Machine/Service";
import apiClient from "../../../Service/Service";

const { TextArea } = Input;
const SendChangeRest = ({
  minDate,
  userProfile,
  Usuario_Red_Recibe,
  handleRecipientChange,
  userListDayRest,
  onChange,
  Mensaje_Envia,
  handleDateDayRest,
  handleDateDayRestNext,
  dataDayRestNext,
  dataDayRest,
  errorMessagesDayRest,
  handleRequestSubmitDayRest,
  handleSenderChange,
  Documento_Recibe,
  isButtonDisabled,
  Button,
}) => {
  const { Servidor } = Service();
  const { fullName } = useContext(UserProfileContext);
  const [restDays, setRestDays] = useState([]);
  const [selectedCompanionRestDays, setSelectedCompanionRestDays] = useState(
    []
  );
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const Documento = fullName.map((data) => data.Documento);
    apiClient
      .get(`http://${Servidor}/API/GET/DAY-REST-FOR-DISABLE/${Documento}`)
      .then((response) => {
        setRestDays(response.data);
      })
      .catch((error) =>
        console.error("Error al obtener las fechas con descanso")
      );
  }, [userProfile.user, fullName, Servidor]);

  useEffect(() => {
    if (Documento_Recibe) {
      apiClient.get(
        `http://${Servidor}/API/GET/DAY-REST-FOR-DISABLE-COMPANERO/${Documento_Recibe}`
      )
        .then((response) => response.data)
        .then((data) => {
          setSelectedCompanionRestDays(data);
        })
        .catch((error) =>
          console.error(
            "Error al obtener las fechas de descanso del compañero",
            error
          )
        );
    } else {
      setSelectedCompanionRestDays([]);
    }
  }, [Documento_Recibe, Servidor]);

  useEffect(() => {
    setSelectedCompanionRestDays([]);
  }, [Documento_Recibe]);
  return (
    <div className="p-2">
      <div className="row g-3">
        <div className="col"></div>
        <div className="col">
          <div className="text-muted">Buscar</div>
          <input
            className="form-control"
            placeholder="Buscar asesor"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col">
          <div className="text-muted">Yo</div>
          <input
            className="form-control"
            disabled
            value={userProfile.user}
            onChange={handleSenderChange}
          />
        </div>
        <div className="col">
          <div className="text-muted">Receptor</div>
          {userListDayRest && (
            <select
              className="form-select"
              value={Usuario_Red_Recibe}
              onChange={(e) => {
                handleRecipientChange(e);
              }}
            >
              <option value="">Selecciona un usuario</option>
              {Array.isArray(userListDayRest) &&
                userListDayRest
                  .filter((data) =>
                    `${data.Apellidos} ${data.Nombres}`
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((data) => (
                    <option key={data.Documento} value={data.Usuario_Red}>
                      {data.Apellidos} {data.Nombres}
                    </option>
                  ))}
            </select>
          )}
          {errorMessagesDayRest.Usuario_Red_Recibe && (
            <div id="invalid-feedback-change">
              {errorMessagesDayRest.Usuario_Red_Recibe}
            </div>
          )}
        </div>
      </div>

      <div className="row g-3">
        <div className="col">
          <div className="text-muted">¿Qué día descanso?</div>
          <select
            className="form-select"
            value={dataDayRest}
            onChange={handleDateDayRest}
          >
            <option>Descanso a cambiar</option>
            {Array.isArray(restDays) && restDays.map((data) => (
              <option key={data.Fecha} value={data.Fecha}>
                {data.Fecha}
              </option>
            ))}
          </select>

          {errorMessagesDayRest.dataDayRest && (
            <div id="invalid-feedback-change">
              {errorMessagesDayRest.dataDayRest}
            </div>
          )}
        </div>
        <div className="col">
          <div className="text-muted">¿Qué día descansa tu compañero?</div>
          <select
            className="form-select"
            type="date"
            value={dataDayRestNext}
            onChange={handleDateDayRestNext}
            min={minDate}
            disabled={!Usuario_Red_Recibe}
          >
            <option>Descanso compañero</option>
            {Array.isArray(selectedCompanionRestDays) &&
              selectedCompanionRestDays.map((data) => (
                <option key={data.Fecha} value={data.Fecha}>
                  {data.Fecha}
                </option>
              ))}
          </select>
          {errorMessagesDayRest.dataDayRestNext && (
            <div id="invalid-feedback-change">
              {errorMessagesDayRest.dataDayRestNext}
            </div>
          )}
        </div>
      </div>

      <div className="" style={{ marginTop: "5%" }}>
        <div className="text-muted">Motivo del cambio</div>
        <TextArea
          showCount
          maxLength={150}
          value={Mensaje_Envia}
          onChange={onChange}
          style={{
            height: 120,
            marginBottom: 24,
          }}
          placeholder="Mensaje"
        />
      </div>

      <div className="container-solicitar-buttom">
        <Button
          variant="solid"
          size="sm"
          onClick={handleRequestSubmitDayRest}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Espere...</span>
            </div>
          ) : (
            "Solicitar"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SendChangeRest;
