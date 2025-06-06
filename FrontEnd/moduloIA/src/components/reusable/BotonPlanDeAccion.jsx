import Button from '@mui/joy/Button';
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon  from "@mui/icons-material/Error";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

function BotonPlanDeAccion({ row, actionPlaneManagement }) {
    // Determinar texto, color y estado del botón según las condiciones
    const getButtonProperties = (row) => {
        const {
            estado_id, 
            cantidad_fallo, 
            fecha_plazo_maximo,
            fecha_hallazgo
        } = row;

        if( estado_id === 1 && cantidad_fallo === null ){
            return {texto: "No Aplica", color: "neutral", disable: true};
        }

        if ( estado_id === 2 && cantidad_fallo < 3 && fecha_plazo_maximo === null ){
            return { texto: "Evaluar", icon: <WarningRoundedIcon color='error' fontSize='medium'/>, color: "warning"};
        }

        if ( estado_id === 2 && cantidad_fallo < 3 && fecha_plazo_maximo !== null ){
            return {texto: "Evaluar", color: "warning"};
        }

        if (estado_id === 3 && cantidad_fallo > 2 && fecha_hallazgo === null){
            return {texto: "SNC", icon: <ErrorOutlineRoundedIcon color='error' fontSize='medium'/>, color: "danger"};
        }

        if (estado_id === 3 && cantidad_fallo > 2 && fecha_hallazgo !== null){
            return {texto: "SNC", color: "danger"};
        }

        // comportamiento por defecto
        return {texto: "Desconocido", color: "neutral", disable: true};
    };

    const {texto, color, icon, disable} = getButtonProperties(row);

    return (
        <Button
            variant='soft'
            color={color}
            size='md'
            disabled={disable}
            sx={{width:"150px"}}
            startDecorator={icon}
            onClick={() => actionPlaneManagement(row)}>
            {texto}
        </Button>
    )
}

export default BotonPlanDeAccion;