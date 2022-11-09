import "./parlamentares.css";
import { NavigateNext } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import { recuperaEmendasParlamentar, recuperaListaParlamentares } from "../../services/emendasService";
import SeletorParlamentares from './../../components/seletorParlamentares/SeletorParlamentares';
import ListaEmendasParlamentar from "../../components/tabelas/listaEmendasParlamentar";

export default function Parlamentars(props) {
  const [ parlamentar, setParlamentar ] = useState()
  const [ listaParlamentares, setListaParlamentares ] = useState([])
  const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
  const [ anoSelecionado, setAnoSelecionado ] = useState(0)
  const [ emendas, setEmendas ] = useState([])
  const [ emendasAno, setEmendasAno ] = useState([])
  const shouldGetListaParlamentares = useRef(true)
  const loading = listaParlamentares.length === 0;
  const [ shouldBeLoadingGrafico, setShouldBeLoadingGrafico ] = useState(false)

  useEffect(() => {
      if(shouldGetListaParlamentares.current) {
        handleRecuperaListaParlamentares();
        console.log("effect", listaParlamentares)
      }
    }
  )

  async function handleRecuperaListaParlamentares() {
    try {
        const data = await recuperaListaParlamentares();
        if(data){
            setListaParlamentares(data)
            console.log("handleRecuperaListaParlamentares", data)
            shouldGetListaParlamentares.current = false
        }
    } catch (e) {
    console.log(e.message)
    }
}

function handleGetEmendasAno(emendas) {
    let emendasAnoAux = {
        pago: [],
        empenhado: []
    }
    
    anos.forEach(ano => {
        let pagoAno = 0
        let empenhadoAno = 0
        emendas.forEach(emenda => {
            if(emenda.ano === parseInt(ano)){
                pagoAno += emenda.pago
                empenhadoAno += emenda.empenhado
            }
        })
        emendasAnoAux.pago.push(pagoAno)
        emendasAnoAux.empenhado.push(empenhadoAno)
    })
    setEmendasAno(emendasAnoAux)
}

function handleSetAutocompleteAberto(value) {
    setAutocompleteAberto(value);
}

async function handleSetParlamentar(value) {
    setShouldBeLoadingGrafico(true)
    setParlamentar(value);
    let emendasParlamentar;
    emendasParlamentar = await recuperaEmendasParlamentar(value)
    setEmendas(emendasParlamentar.emendas)
    handleGetEmendasAno(emendasParlamentar.emendas)
    setShouldBeLoadingGrafico(false)
}

function handleSetAnoSelecionado(Ano) {
    console.log(Ano)
    setAnoSelecionado(Ano)
}

function handleRecarregar() {
    handleRecuperaListaParlamentares()   
}

  return (
    <Container className='container-tela-parlamentares'>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} className='breadcrumbs-parlamentares'>
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
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <Box className='box-seletor-parlamentares'>
                    <SeletorParlamentares loadingParlamentares={loading} listaParlamentares={listaParlamentares} selecionarParlamentar={handleSetParlamentar} valorAutocomplete={parlamentar} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetParlamentar} changeAutocompleteAberto={handleSetAutocompleteAberto} recarregar={handleRecarregar} />
                </Box>
            </Grid> 
            <Grid item xs={12}>
                <Paper className='painel-lista-emendas-parlamentares' elevation={3}>
                    <Box style={{marginBottom:15, width: "100%"}}>
                        <Typography variant="h6" component="h3" style={{float: "left", paddingTop: "10px"}}>Lista de emendas</Typography>
                        <SeletorAnos anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado} styleBox={{marginLeft: "20px"}}/>
                    </Box>
                    <ListaEmendasParlamentar dadosEmendas={emendas} anoSelecionado={anoSelecionado}/>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper className='painel' elevation={3}>
                    <Typography variant="h6" component="h3" style={{marginBottom:10}}>Ranking de Emendas para Parlamentares Federais</Typography>
                    <List style={{overflowY: "auto", height: '80%', width: "100%"}}>
                        {[{nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'}, 
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'},
                        {nome: 'Jorge', valor: '500.000', motivo: 'Limpeza lorem ipsum dolor sit amet'}].map((emenda, index) => (
                        <ListItem button style={{cursor: "default"}} key="item exemplo 2">
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