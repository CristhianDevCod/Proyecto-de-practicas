import {
  React,
  useEffect,
  useState,
  List,
  ExpandMoreIcon,
  notification,
  ArrowLeftRoundedIcon,
  ArrowRightRoundedIcon,
} from "../../Exports-Modules/Exports";
import Button from "@mui/joy/Button";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../Home/Styles/Styles";
import { cargoUsersPermissions } from "../../API/API";
import Config from "../../Auth/Config";
import Service from "../../Machine/Service";
import ListPermissions from "./ListPermissions";
import apiClient from "../../Service/Service";

const PositionPermissions = () => {
  const { Servidor } = Service();
  const { InsertAndDeletePermissions } = Config();
  const [api, contextHolder] = notification.useNotification();
  const [ListCargoUser, setListCargoUser] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [originData, setOriginData] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [id_Modulo, setIDModulo] = useState([]);
  const [action, setActionsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const getListCargoUsers = async () => {
    const data = await cargoUsersPermissions();
    setListCargoUser(data);
    setOriginData(data);
  };

  const handleIdModulo = (e) => {
    const moduleId = e.target.value;
    const updatedIdModulo = userPermissions.some(
      (p) => p.Id_Modulo === moduleId
    )
      ? id_Modulo.filter((id) => id !== moduleId)
      : [...id_Modulo, moduleId];
    setIDModulo(updatedIdModulo);
  };

  const clearPermissions = () => {
    setIDModulo([]);
    setUserPermissions([]);
    setActionsArray("");
  };

  //FUNCION EL MANEJO DE LOS CHECKBOX
  const handleCheckboxChange = (permissionId, isChecked) => {
    setUserPermissions((prevPermissions) => {
      const existingIndex = prevPermissions.findIndex(
        (p) => p.Id_Modulo === permissionId
      );
      const updatedPermissions = [...prevPermissions];
      if (isChecked && existingIndex === -1) {
        updatedPermissions.push({ Id_Modulo: permissionId });
      } else if (!isChecked && existingIndex !== -1) {
        updatedPermissions.splice(existingIndex, 1);
      }
      return updatedPermissions;
    });

    if (isChecked) {
      setActionsArray("insert");
    } else if (!isChecked) {
      setActionsArray("delete");
    }
  };

  const getUserPermission = async (nombreCargo) => {
    try {
      const response = await apiClient.get(
        `http://${Servidor}/API/UPDATE-USER-PERMISSIONS/${nombreCargo}`
      );
      
      const data = response.data;
      setUserPermissions(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        api.error({
          message: `No tiene permisos asignados`,
        });
      } else {
        api.error({
          message: `Error interno del server`,
        });
      }
    }
  };
  

  //GUARDA EL PERMISO SELECCIONADO
  const savePermissions = async () => {
    try {
      const response = await apiClient.put(InsertAndDeletePermissions, {
        action: action,
        Nombre_Cargo_Normalizado: selectUser,
        Id_Modulo: id_Modulo,
      });
  
      if (response.status === 200) { // Verifica el estado de la respuesta
        const data = response.data;
        const messages = data.split("\n");
        const insertMessage = messages[0];
        const deleteMessage = messages[1];
  
        let successMessage = "";
        if (insertMessage && deleteMessage) {
          successMessage = insertMessage + "\n" + deleteMessage;
        } else if (insertMessage) {
          successMessage = insertMessage;
        } else if (deleteMessage) {
          successMessage = deleteMessage;
        }
  
        api.success({
          message: successMessage,
        });
  
        clearPermissions();
      } else {
        api.error({
          message: `No se pudo guardar los permisos`,
        });
      }
    } catch (error) {
      api.error({
        message: `Error interno del servidor`,
      });
    }
  };
  
  useEffect(() => {
    getListCargoUsers();
  }, []);
  

  //FUNCION PARA BUSCAR EL NOMBRE DEL CARGO
  const Filtrar = (search) => {
    var resultSeacrh = originData.filter((element) => {
      if (
        element.Nombre_Cargo_Normalizado.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return element;
      }
      return false;
    });
    setListCargoUser(resultSeacrh);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    Filtrar(e.target.value);
  };

  const handleModuleClick = (name) => {
    setSelectUser(name);
    getUserPermission(name);
  };

  //paginacion de la tabla
  const handleShowNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleShowPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //paginacion
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, ListCargoUser.length);
  const currentPageData = ListCargoUser.slice(startIndex, endIndex);
  return (
    <>
      {contextHolder}
      <div className="text-center">
        <div className="mb-0 title-import">Permisos para cargos</div>
      </div>
      <div className="card border-light">
        <div className="card-body">
          <div className="d-flex">
            <div className="p-2 flex-grow-1 bd-highlight">
              <div className="p-2 me-auto"></div>
            </div>
            <div className="p-2">
              <input
                value={busqueda}
                onChange={handleBusqueda}
                placeholder="Buscar..."
                type="search"
                className="form-control p-2"
              />
            </div>
            <div className="p-2">
              {currentPage > 1 && (
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  onClick={handleShowPreviousPage}
                >
                  <ArrowLeftRoundedIcon fontSize="medium" />
                </Button>
              )}
            </div>
            <div className="p-2">
              {currentPage * rowsPerPage < ListCargoUser.length && (
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  onClick={handleShowNextPage}
                >
                  <ArrowRightRoundedIcon fontSize="medium" />
                </Button>
              )}
            </div>
          </div>
          <table className="table table-sm table-borderless table-hover">
            <thead>
              <tr>
                <th className="font-weight-bold" scope="col">
                  Cargo Normalizado
                </th>
                <th className="font-weight-bold text-center" scope="col">
                  Módulos
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageData &&
                currentPageData.map((data) => (
                  <tr key={data.Id_Normalizado}>
                    <td className="text-muted">
                      {data.Nombre_Cargo_Normalizado}
                    </td>
                    <td className="text-muted text-center">
                      <button
                        onClick={() =>
                          handleModuleClick(data.Nombre_Cargo_Normalizado)
                        }
                        className="btn btn-secondary btn-sm"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalPermissions"
                      >
                        <i className="bi bi-key-fill" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="ModalPermissions"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div
                className="modal-title text-lowercase"
                id="exampleModalLabel"
              >
                Permisos para:{" "}
                <div className="text-lowercase fw-bolder">{selectUser}</div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ListPermissions
                List={List}
                Accordion={Accordion}
                handleIdModulo={handleIdModulo}
                ExpandMoreIcon={ExpandMoreIcon}
                userPermissions={userPermissions}
                AccordionDetails={AccordionDetails}
                AccordionSummary={AccordionSummary}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={savePermissions}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionPermissions;
