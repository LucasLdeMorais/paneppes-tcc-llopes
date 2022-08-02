import "./home.css";
import { Breadcrumbs, Container, Grid, Link, Paper, Typography } from "@mui/material";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import { NavigateNext } from "@mui/icons-material";
import Chart from './../../components/graficos/GraficosGrandes/chart/Chart';

export default function Home() {
  return (
    <Container className='container'>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} style={{marginBottom:20}}>
        <Link 
            component='h2' 
            variant="subtitle1" 
            underline="hover" 
            color="inherit" 
            href="/">
            Principal
        </Link>
      </Breadcrumbs>
      <Grid container spacing={2} className='gridPrincipal'>
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
