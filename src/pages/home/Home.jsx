import "./home.css";
import { Container, Grid, Paper, Typography } from "@mui/material";
import EmendasPorAno from "../../components/graficos/emendasPorAno/EmendasPorAno";

export default function Home() {
  return (
    <Container className='container'>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Paper className='painelGrafico' elevation={3}>
            <Typography component='h3' variant='h6' style={{marginBottom:10}}>Gráfico</Typography>
            <EmendasPorAno grid />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
