import {
  Typography,
  notification,
  useState
} from "../../../../Exports-Modules/Exports.js";
import '../../style/styles.css';
import {
  CustomTabPanel,
  ItemContent,
} from "../../style/styles.js";
import MetasOperativo from "./Categoria/MetasOperativo.js";
import TablaFiltroKPI from "../../../ReusablesModulo/tablaFiltroKPI/TablaFiltroKPI.js";
import { Box, Tab, Tabs } from "../../../../Exports-Modules/Exports.js";

//variables
const nombreSub = 'Gestión de metas';

const GestionMetas = () => {
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="all info for adviser">
            <Tab label='Metas Operativas' />
            <Tab label='Metas Staff' disabled />
          </Tabs>
        </Box>

        <CustomTabPanel value={tab} index={0}>
          <MetasOperativo api={api} contextHolder={contextHolder} />
        </CustomTabPanel>

        <CustomTabPanel value={tab} index={1}>
          {"administrativo"}
        </CustomTabPanel>
      </ItemContent>

      {/* HERRAMIENTA DE BUSQUEDA KPI */}
      <TablaFiltroKPI />
    </>
  );
};

export default GestionMetas;