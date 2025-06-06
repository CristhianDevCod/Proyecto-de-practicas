import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Home = () => {
    const titulo = 'Análisis cualitativo de estrategias generadas por IA en la gestion de KPIs';
    const autorA = 'Cristhian David Velasquez Vega';
    const autorB = 'Helver Garcia Herrera';
    const facultad = 'Facultad de ingenieria, Universidad Iberoamericana';
    const materia = 'Investigación II';
    const docente = 'Magda Fernandez';
    const fecha = new Date().toLocaleDateString()

  return (
    <>
      <Box>
        <Paper 
            elevation={8} 
            sx={{ 
                margin: 5, 
                padding: 2,
                paddingY: 10,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
            }} >
          <Typography variant="h5" fontWeight="bold">
            {titulo}
          </Typography>
          <Typography variant="h5">
            {`${autorA} & ${autorB}`}
          </Typography>
          <Typography variant="h5">
            {facultad}
          </Typography>
          <Typography variant="h5">
            {materia}
          </Typography>
          <Typography variant="h5">
            {docente}
          </Typography>
          <Typography variant="h5">
            {fecha}
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Home;
