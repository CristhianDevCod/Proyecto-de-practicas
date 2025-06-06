import { Box, Grid, IconButton, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const DetallesModal = ({progresoData, detallesData}) => {
  return (
    <Grid container spacing={2}>
      {/* Primera columna */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="h6" gutterBottom textAlign={"center"}>
          Progreso
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 200,
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: 2,
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Periodo</TableCell>
                <TableCell>Avance Real</TableCell>
                <TableCell>Avance Esperado</TableCell>
                <TableCell>Resultado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {progresoData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.periodo}</TableCell>
                  <TableCell>{row.real}</TableCell>
                  <TableCell>{row.esperado}</TableCell>
                  <TableCell>{row.resultado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            mt: 2,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            height: "150px",
            overflow: "auto",
          }}
        >
          <Stack spacing={2}>
            <Box display={"flex"} alignItems={"center"}>
              <CancelIcon color="primary" sx={{ mr: 1 }} />
              <Typography>Analisis inteligente</Typography>
            </Box>
            <Typography variant="body2">
              Este es un texto largo que explica las observaciones del análisis
              inteligente. Si supera el tamaño del contenedor, se habilitará el
              scroll automático para facilitar su lectura. Este es un texto
              largo que explica las observaciones del análisis inteligente. Si
              supera el tamaño del contenedor, se habilitará el scroll
              automático para facilitar su lectura. Este es un texto largo que
              explica las observaciones del análisis inteligente. Si supera el
              tamaño del contenedor, se habilitará el scroll automático para
              facilitar su lectura.
            </Typography>
          </Stack>
        </Box>
      </Grid>

      {/* Segunda columna */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="h6" gutterBottom>
          Detalles
        </Typography>
        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            height: "300px",
            overflow: "auto",
          }}
        >
          <Grid container spacing={2}>
            {detallesData.map((detalle, index) => (
              <Grid size={{ xs: 12 }} key={index}>
                <Typography variant="body2" color="textSecondary">
                  {detalle.clave}:
                </Typography>
                <Typography>{detalle.valor}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export { DetallesModal };
