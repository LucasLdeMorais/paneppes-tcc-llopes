import "./parlamentares.css";
import { Error, NavigateNext, Warning } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText, Icon } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import { recuperaEmendasParlamentar, recuperaListaParlamentares } from "../../services/emendasService";
import SeletorParlamentares from './../../components/seletorParlamentares/SeletorParlamentares';
import ListaEmendasParlamentar from "../../components/tabelas/tabelaEmendasParlamentar";
import { useQuery } from "react-query";
import api from './../../services/api';

export default function Parlamentars(props) {
    const [ parlamentar, setParlamentar ] = useState()
    const [ listaParlamentares, setListaParlamentares ] = useState([])
    const { isLoading: carregandoParlamentares, isError: temErroParlamentares, error: erroParlamentares, data: dadosParlamentares} = useQuery("recuperaListaParlamentares", 
            async () => { 
                const response = await api.get('/parlamentares');
                return response.data;
            }
        );
    const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
    const [ anoSelecionado, setAnoSelecionado ] = useState(0)
    const [ emendas, setEmendas ] = useState([])
    const [ emendasAno, setEmendasAno ] = useState([])
    const shouldGetListaParlamentares = useRef(true)
    const loading = listaParlamentares.length === 0;
    const [ shouldBeLoadingGrafico, setShouldBeLoadingGrafico ] = useState(false)

    useEffect(() => {
    })

    async function handleRecuperaListaParlamentares() {
    try {
        const data = await recuperaListaParlamentares();
        if(data){
            setListaParlamentares(data);
            shouldGetListaParlamentares.current = false;
        }
    } catch (e) {
        console.log(e.message);
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
        console.log(emendasParlamentar)
        setEmendas(emendasParlamentar.emendas)
        //handleGetEmendasAno(emendasParlamentar.emendas)
        setShouldBeLoadingGrafico(false)
    }

    function handleSetAnoSelecionado(Ano) {
        console.log(Ano)
        setAnoSelecionado(Ano)
    }

    function handleRecarregar() {
        handleRecuperaListaParlamentares()   
    }

    const GeraListaEmendas = () => {
        if (parlamentar === undefined) {
            return <Box className='box-lista-vazia'><Typography component='h5' variant='h6' style={{}}>Selecione um parlamentar para visualizar as emendas</Typography></Box>
        }
        if (parlamentar === undefined) {
            return <Box className='box-lista-vazia'><Typography component='h5' variant='h6' style={{}}>Selecione um parlamentar para visualizar as emendas</Typography></Box>
        }

        return <Box className={"box-lista-emendas-parlamentares"}>
            <SeletorAnos anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado} styleBox={{marginTop: "15px", maxWidth: "250px", width: "250px"}}/>  
            <ListaEmendasParlamentar dadosEmendas={emendas} anoSelecionado={anoSelecionado}/>
        </Box>
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
                        <SeletorParlamentares loadingParlamentares={carregandoParlamentares} erroListaParlamentares={temErroParlamentares} listaParlamentares={dadosParlamentares} selecionarParlamentar={handleSetParlamentar} valorAutocomplete={parlamentar} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetParlamentar} changeAutocompleteAberto={handleSetAutocompleteAberto}/>
                    </Box>
                </Grid> 
                <Grid item xs={12}>
                    <Paper className='painel-lista-emendas-parlamentares' elevation={3}>
                        <Box style={{width: "100%"}}>
                            <Box className='header-painel-lista-emendas-parlamentares'>
                                <Typography component='h3' variant='subtitle1'>Lista de emendas</Typography>
                            </Box>
                        </Box>
                        <GeraListaEmendas/>
                    </Paper>
                </Grid>
                {/* <Grid item xs={8}>
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
                </Grid> */}
            </Grid>
        </Container>
    );
}