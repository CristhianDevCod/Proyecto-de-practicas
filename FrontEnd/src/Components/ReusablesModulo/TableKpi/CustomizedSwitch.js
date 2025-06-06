import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { colors } from '@mui/joy';

// Definir los colores para cada estado
const estadoColores = {
    1: { thumb: '#e0e0e0', track: '#b0b0b0' },  // Aprobación
    // 2: { thumb: '#fff', track: '#ff1744' },    // Activo (rojo)
    2: { thumb: '#fff', track: colors.red[500] },    // Activo (rojo)
    3: { thumb: '#fff', track: colors.green[400] },    // Inactivo (azul)
};

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, estado }) => {
    // Obtener los colores de acuerdo al estado
    const { thumb, track } = estadoColores[estado] || estadoColores[3]; // Default: estado 3 si no existe el estado

    return {
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            transform: estado === 3 ? 'translateX(0)' : 'translateX(16px)',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: track,
                    opacity: 1,
                    border: 0,
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#2ECA45',
                    }),
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#2196f3',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[100],
                ...theme.applyStyles('dark', {
                    color: theme.palette.grey[600],
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
                ...theme.applyStyles('dark', {
                    opacity: 0.3,
                }),
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
            backgroundColor: thumb, // Cambia el color del thumb basado en el estado
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: track,  // Cambia el color de fondo basado en el estado
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            ...theme.applyStyles('dark', {
                backgroundColor: '#39393D',
            }),
        },
    };
});

function CustomizedSwitch({ estado }) {
    // Deshabilita el Switch si el estado es 1 (gris y deshabilitado)
    const isDisabled = estado === 1;

    // Determina si el switch está "checked" basado en el estado
    const isChecked = estado !== 2 && estado !== 3; // estado 3: switch a la izquierda

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <IOSSwitch
                        sx={{ m: 1 }}
                        // Controla el estado del switch
                        checked={isChecked}
                        disabled={isDisabled}
                        estado={estado}
                    />
                }
            />
        </FormGroup>
    );
}

export default CustomizedSwitch;
