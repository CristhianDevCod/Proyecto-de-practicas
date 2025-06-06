import {
    React,
    useState,
    Typography,
    Box,
    Tabs,
    Tab
} from "../../../../Exports-Modules/Exports.js";
import '../../style/styles.js';
import {
    ItemContent,
    CustomTabPanel,
} from "../../style/styles.js";
import KpiOperativos from "./SubComponentes/KpiOperativos.js";
import KpiStaff from "./SubComponentes/KpiStaff.js";
import AsignacionPersonas from "./SubComponentes/AsignacionPersonas.js";

//variables
const nombreSub = 'Asignación de KPIs';

const AsignacionOperativos = () => {
    const [value, setValue] = useState(0);


    //Manejador de los tabs
    const handleChange = (event, newValue) => {
        setValue(newValue);
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

            <ItemContent elevation={3}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="all info for adviser">
                        <Tab label='KPIs Operativos' />
                        <Tab label='KPIs Staff' />
                        <Tab label='Asignación individual' />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <KpiOperativos />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <KpiStaff />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <AsignacionPersonas />
                </CustomTabPanel>
            </ItemContent>
        </>
    );
};

export default AsignacionOperativos;