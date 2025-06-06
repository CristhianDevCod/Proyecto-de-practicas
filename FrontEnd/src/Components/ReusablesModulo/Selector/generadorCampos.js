import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

export function generadorCampos(obj) {
    //Definir las claves que se quieren mostrar
    const camposAMostrar = [
        "descripcion_kpi",
        "responsable_upd",
        "meta_kpi",
        "periodicidad_id",
        "proceso_kpi_id",
        "tipo_kpi_id"
    ];

    return camposAMostrar.map((llave) => (
        <Grid
            item
            sx={6}
            key={llave}
        >
            <TextField
                id={llave}
                label={`${llave.charAt(0).toUpperCase()}${llave.replace(/_/g, ' ').substring(1)}`}
                defaultValue={obj[llave] || "No disponile"}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}
                disabled
            />
        </Grid>
    ));
}

export default generadorCampos;