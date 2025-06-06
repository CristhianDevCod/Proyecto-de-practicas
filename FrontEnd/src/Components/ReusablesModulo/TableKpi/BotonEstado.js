import Button from '@mui/joy/Button';

function BotonEstado({ valor }) {
    const estado = valor

    //Calcular el tipo y el color
    const getTipoyColor = (estado) => {
        switch (estado) {
            case 1:
                return { tipo: 'Aprob. SIG', color: 'warning' }
            case 2:
                return { tipo: 'Activo', color: 'success' }
            default:
                return { tipo: 'Deshabilitado', color: 'danger' }
        }
    }
    const { tipo, color } = getTipoyColor(estado);

    return (
        <>
            <Button variant="soft" color={color} sx={{ width: 100 }}>
                {tipo}
            </Button>
        </>
    )
}

export default BotonEstado;