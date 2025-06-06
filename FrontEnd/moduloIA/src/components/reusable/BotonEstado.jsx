import Button from '@mui/joy/Button';

function BotonEstado({ valor }) {
    const estado = valor

    //Calcular el tipo y el color
    const getTipoyColor = (estado) => {
        switch (estado) {
            case 1:
                return { tipo: 'Cumplimiento', color: 'success' }
            case 2:
                return { tipo: 'Plan de Acción', color: 'warning' }
            default:
                return { tipo: 'Ciclo de Mejora', color: 'danger' }
        }
    }
    const { tipo, color } = getTipoyColor(estado);

    return (
        <Button variant="soft" color={color} size='md' sx={{width: '150px'}}>
            {tipo}
        </Button>
    )
}

export default BotonEstado;