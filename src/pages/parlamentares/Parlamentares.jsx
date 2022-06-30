import Chart from "../../components/graficos/chart/Chart";
import "./parlamentares.css";
import { userData } from "../../dummyData";
import { NavigateNext } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Parlamentars(props) {
  const { parlamentar, setParlamentar } = useState(false)
  const { autocompleteAberto, setAutocompleteAberto } = useState(false)
  const { ano, setAno } = useState(0)

  useEffect(() => {
      console.log('render')
    }
  )

  function handleSetParlamentar(value) {
    handleSetAutocompleteAberto(true);
    setParlamentar(value)
    ;  
  }

  function handleSetAutocompleteAberto(value) {
    setAutocompleteAberto(value);
  }

  return (
    <Container className='container'>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} className='breadcrumbs'>
            <Link 
                component='h2' 
                variant="subtitle1" 
                underline="hover" 
                color="inherit" 
                href="/">
                Principal
            </Link>
            <Link 
                component='h2' 
                variant="subtitle1"
                underline="hover"
                color="inherit"
                href="/Parlamentars"
                aria-current="page"
            >
                Parlamentares
            </Link>
        </Breadcrumbs>
        <Paper className='paperAutocomplete'>
          <Autocomplete
            id="combo-box-parlamentars"
            open={autocompleteAberto}
            onClose={() => {handleSetAutocompleteAberto(false)}}
            value={parlamentar}
            options={['UFRJ', 'UNIRIO']}
            renderInput={(params) => <TextField {...params} label="Parlamentars Federais" />}
            onChange={(event, value) => {
              event.preventDefault();
              handleSetParlamentar(value)
            }}
          />
        </Paper>
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <Grid container spacing={2} justify="center" ClassName='containerAnos'>
                    {[2017, 2018, 2019, 2020, 2021].map((Ano, index) => (
                        <Grid item xs={1}>
                            <Paper className='seletorAnos'>
                                <CardActionArea style={{height: 50, width: '100%', padding: '10px'}} onClick={(event) => {
                                    event.preventDefault()
                                    this.setAno(Ano)
                                }}>
                                    <CardContent style={{padding: 0, textAlign:'center'}}>
                                        <Typography component="h3" variant="h6">{Ano}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Paper className='painel' elevation={3}>
                    <Typography variant="h6" component="h3" style={{marginBottom:10}}>Lista de emendas</Typography>
                    <List style={{overflowY: "auto", height: '80%', width: "100%"}}>
                        {[{nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'}, 
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'}].map((emenda, index) => (
                        <ListItem button style={{cursor: "default"}}>
                            <ListItemText>{emenda.nome}</ListItemText>
                            <ListItemText>{emenda.valor}</ListItemText>
                            <ListItemText>{emenda.motivo}</ListItemText>
                        </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper className='painel' elevation={3}>
                    <Typography variant="h6" component="h3" style={{marginBottom:10}}>Ranking de Emendas para Universidades Federais</Typography>
                    <List style={{overflowY: "auto", height: '80%', width: "100%"}}>
                        {[{nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'}, 
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'}].map((emenda, index) => (
                        <ListItem button style={{cursor: "default"}}>
                            <ListItemText>{emenda.nome}</ListItemText>
                            <ListItemText>{emenda.valor}</ListItemText>
                            <ListItemText>{emenda.motivo}</ListItemText>
                        </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className='painel' elevation={3}>
                    <Typography component="h3" variant="h6">Total da Despesa: 11.000.000</Typography>
                    <Typography component="h3" variant="h6">Total da Emendas: 1.000.000</Typography>
                    <img style={{height: '75%'}} src="https://d2mvzyuse3lwjc.cloudfront.net/doc/en/UserGuide/images/2D_B_and_W_Pie_Chart/2D_B_W_Pie_Chart_1.png?v=83139"/>
                </Paper>
            </Grid>
        </Grid>
    </Container>
  );
}