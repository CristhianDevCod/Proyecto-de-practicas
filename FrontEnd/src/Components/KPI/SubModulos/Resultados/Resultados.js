import {
  Box,
  Tab,
  Tabs,
  Typography,
  notification,
  useState
} from "../../../../Exports-Modules/Exports.js";
import '../../style/styles.css';
import {
  CustomTabPanel,
  ItemContent,
} from "../../style/styles.js";
import { ResultadosStaff } from "./Categoria/ResultadosStaff.js";
import { ResultadosOperativos } from "./Categoria/ResultadosOperativos.js"
import Alert from '@mui/material/Alert';

//variables
const nombreSub = 'Gestión de Resultados';

const Resultados = ({ userRoles }) => {
  const [api, contextHolder] = notification.useNotification();
  const [tab, setTab] = useState(0);

  //Manejador de los tabs
  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  return (
    <>
      <ItemContent elevation={10} sx={{ marginY: '2rem' }}>
        <div className="text-center">
          <div className="title-mis-novedades">
            <Typography variant="h4" gutterBottom>
              {nombreSub}
            </Typography>
          </div>
        </div>
      </ItemContent>

      <ItemContent elevation={3} sx={{ marginY: '2rem', padding: '1rem' }}>
        <Box>
          <Tabs value={tab} onChange={handleChange} aria-label="Navegar por los tipos de resultados">
            {userRoles.some(role => role.Id_Modulo === 10.51) && (
              <Tab label="Resultados Operativos" />
            )}
            {userRoles.some(role => role.Id_Modulo === 10.52) && (
              <Tab label="Resultados Staff" />
            )}
            {userRoles.some(role => role.Id_Modulo === 10.53) && (
              <Tab label="Resultados Personales" />
            )}
          </Tabs>
        </Box>

        {/* Comprobar permisos del usuario */}
        {userRoles.some(
          role => role.Id_Modulo === 10.51 ||
            role.Id_Modulo === 10.52 ||
            role.Id_Modulo === 10.53
        ) ? (
          <>
            <CustomTabPanel value={tab} index={0}>
              <ResultadosOperativos api={api} contextHolder={contextHolder} />
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
              <ResultadosStaff api={api} contextHolder={contextHolder} />
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={2}>
              {"Sección en desarrollo"}
            </CustomTabPanel>
          </>
        )
          :
          (
            <CustomTabPanel value={tab} index={0}>
              <Alert severity="info">No cuentas con los permisos necesarios. Informa al administrador para que te otorguen el permiso de ingreso.</Alert>
            </CustomTabPanel>
          )
        }
      </ItemContent>
    </>
  );
};

export default Resultados;