import {
  React,
  useState,
  useEffect,
  useContext,
  Modal,
  notification,
  Box,
  Paper,
  CircularProgress,
} from "../../Exports-Modules/Exports";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/joy";

import Service from "../../Machine/Service";
import { UserProfileContext } from "../../Context/ProfileContex";


import img1 from "./Img/1.png";
import img2 from "./Img/2.png";
import img3 from "./Img/3.png";
import img4 from "./Img/4.png";
import img5 from "./Img/5.png";
import img6 from "./Img/6.png";
import img7 from "./Img/7.png";
import Cortes_Nomina from "./Img/Cortes_Nomina.png";
import Plan_Carrera from "./Img/Plan_Carrera.jpeg";

import apiClient from "../../Service/Service";

const ImgEveryDay = () => {
  const { fullName } = useContext(UserProfileContext);
  const { Servidor } = Service();
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  //?STEPS PARA MOSTRAR LAS IMAGENES
  const steps = [

    {
      label: "1",
      imgs: Plan_Carrera,
    },
    {
      label: "2",
      imgs: Cortes_Nomina,
    },
    {
      label: "3",
      imgs: img1,
    },
    {
      label: "4",
      imgs: img2,
    },
    {
      label: "5",
      imgs: img3,
    },
    {
      label: "6",
      imgs: img4,
    },
    {
      label: "7",
      imgs: img5,
    },
    {
      label: "8",
      imgs: img6,
    },
    {
      label: "9",

      imgs: img7,
    },
  ];

  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setLoading(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    // Simulamos una carga de imagen durante 2 segundos
    const timeout = setTimeout(() => {
      setLoading(false); // Desactivamos el estado de carga después de 2 segundos
    }, 1000);
    return () => clearTimeout(timeout); // Limpiamos el timeout si el componente se desmonta antes de que se complete
  }, [activeStep]);

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

  //!ENVENTO PARA REVISAR SI LA PERSONA A VISTO LAS IMAGENES EN INSERTA LA VISTA
  const insertValor = async (event) => {
    event.preventDefault();
    setOpen(false);
    apiClient.post(`http://${Servidor}/API/IMGEVERYDAY/`, {
      Documento,
      Usuario_Red,
      Nombre_Completo,
      Cargo,
      Servicio,
      Cliente,
      Sede,
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

  //!EFECTO PARA REVISAR SI LA PERSONA A VISTO LAS IMAGENES
  useEffect(() => {
    apiClient
      .get(
        `http://${Servidor}/API/IMGEVERYDAY/V1/${localStorage.getItem(
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

  const renderImgStepers = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          {/* <div className="text-muted">{steps[activeStep].label}</div> */}
        </Paper>
        <Box sx={{ width: "100%", p: 2 }}>
          <img
            style={{ width: "100%", height: "700px" }}
            src={steps[activeStep].imgs}
            alt={steps[activeStep].label}
          />
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <>
              {activeStep === maxSteps - 1 ? (
                <Button
                  variant="soft"
                  color="danger"
                  size="md"
                  onClick={insertValor}
                >
                  Cerrar
                </Button>
              ) : (
                <Button
                  variant="soft"
                  color="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Siguiente{" "}
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              )}
            </>
          }
          backButton={
            <Button
              variant="soft"
              color="primary"
              size="md"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Atras
            </Button>
          }
        />
      </Box>
    );
  };

  return (
    <>
      {contextHolder}
      <Modal
        onCancel={insertValor}
        title={
          <div className="d-flex">
            <div className="p-2">
              <div className="text-muted">¿SABIAS QUE?</div>
            </div>
          </div>
        }
        width={800}
        open={open}
        footer={null}
      >
        {loading ? ( // Si está cargando, mostramos el símbolo de carga
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          renderImgStepers()
        )}
      </Modal >
    </>
  );
};

export default ImgEveryDay;
