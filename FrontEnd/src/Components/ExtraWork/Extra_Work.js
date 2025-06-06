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

import Extra_Work_Img from './Img/Img_Extra_Work.png'

const Extra_Work = () => {
    const { fullName } = useContext(UserProfileContext);
    const { Servidor } = Service();
    const [api, contextHolder] = notification.useNotification();
    const [open, setOpen] = useState(false);



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
    let Servicio = fullName.map((item) => {
        return item.Servicio;
    });
    let Cliente_Area = fullName.map((item) => {
        return item.Cliente_Area;
    });
    let Sede = fullName.map((item) => {
        return item.Sede;
    });
    let Correo_Personal = fullName.map((item) => {
        return item.Correo_Personal;
    });
    let Numero_Telefono = fullName.map((item) => {
        return item.Telefono_Celular_Principal;
    });

    const insertValor = async (event, respuesta) => {
        event.preventDefault();
        setOpen(false);
        apiClient.post(`http://${Servidor}/API/EXTRA-WORK/`, {
            Usuario_Red,
            Documento,
            Nombre_Completo,
            Cargo,
            Servicio,
            Cliente_Area,
            Sede,
            Correo_Personal,
            Numero_Telefono,
            Respuesta: respuesta,
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
        apiClient.get(
            `http://${Servidor}/API/VERIFY-EXTRA-WORK/${localStorage.getItem(
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
                <img
                    style={{ width: "100%", height: "500px" }}
                    src={Extra_Work_Img}
                    alt={Extra_Work_Img}
                />
                <div className="d-flex mr-auto-l">
                    <div className="p-2 flex-grow-1">¿Deseas participar en la convocatoria?</div>
                    <div className="p-2">
                        <Button color="success" onClick={(e) => insertValor(e, 'SI')}>SI</Button>
                    </div>
                    <div className="p-2">
                        <Button color="danger" onClick={(e) => insertValor(e, 'NO')}>NO</Button>
                    </div>
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
                                TRABAJO EXTRA
                            </div>
                        </div>
                    </div>
                }
                width={500}
                open={open}
                footer={null}
            >
                {SurveyForm()}
            </Modal>
        </>
    );
};

export default Extra_Work;
