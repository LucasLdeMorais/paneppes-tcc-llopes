import Chart from "../../components/chart/Chart";
import "./universidades.css";
import { userData } from "../../dummyData";
import { NavigateNext } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText } from "@mui/material";

export default function Universidades(props) {
  return (
    <Container style={{marginTop: '30px', width: '90%'}}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />} 
        style={{marginBottom: "20px"}}>
        <Link underline="hover" color="inherit" href="/">
          Principal
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/Universidades"
          aria-current="page"
        >
          Universidades
        </Link>
      </Breadcrumbs>
      <Grid>
        <Paper>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Lauro', 'Chaves']}
            renderInput={(params) => <TextField {...params} label="Universidades Federais" />}
          />
        </Paper>
        <Paper>
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
        </Paper>
        <Box ClassName='containerAnos'>
          {[2017, 2018, 2019, 2020, 2021].map((Ano, index) => (
            <Paper className='seletorAnos'>
              <CardActionArea>
                <CardContent style={{
                  height: 50,
                  padding: 0,
                  textAlign: 'center'
                  }}>
                  <Typography variant='h6' style={{
                    paddingTop: 9
                  }}>{Ano}</Typography>
                </CardContent>
              </CardActionArea>
            </Paper>
          ))}
        </Box>
        <Box>
          <Paper style={{width: '250px', height: '250px'}}>
            <Typography variant="h6">Total da Despesa: 11.000.000</Typography>
            <Typography variant="h6">Total da Emendas: 1.000.000</Typography>
          </Paper>
          <Paper style={{width: '250px', padding: '10px'}}>
            <Typography variant="h6">Emendas por Parlamentar</Typography>
            <List style={{overflowY: "scroll", height: '250px'}}>
              {[{nome: 'Jorge', valor: '500.000'}, {nome: 'Jorge', valor: '500.000'}, {nome: 'Jorge', valor: '500.000'}].map((emenda, index) => (
                <ListItem button style={{cursor: "default"}}>
                  <ListItemText>{emenda.nome}: {emenda.valor}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
}
