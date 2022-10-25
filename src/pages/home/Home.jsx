import "./home.css";
import { Breadcrumbs, Container, Grid, Icon, Link, Paper, Typography } from "@mui/material";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import { AccountBalance, Compare, CompareArrows, Groups, NavigateNext } from "@mui/icons-material";

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
        <Grid item xs={4}>
          <Paper className='' style={{height: "50px", padding: "10px"}} elevation={3}>
            <Icon><AccountBalance style={{color: "grey"}}/></Icon>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{height: "50px", padding: "10px"}} elevation={3}>
            <Icon><Groups style={{color: "grey"}}/></Icon>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='' style={{height: "50px", padding: "10px"}} elevation={3}>
            <Icon><CompareArrows style={{color: "grey"}}/></Icon>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className='painelGrafico' elevation={3}>
            <EmendasPorAno styleGrafico={{maxHeight: "400px", padding: "10px"}} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='painelGrafico' elevation={3}>
            <EmendasPorAno styleGrafico={{maxHeight: "400px", padding: "10px"}} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='painelGrafico' elevation={3}>
            <EmendasPorAno styleGrafico={{maxHeight: "400px", padding: "10px"}} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='painelGrafico' elevation={3}>
            <EmendasPorAno styleGrafico={{maxHeight: "400px", padding: "10px"}} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
