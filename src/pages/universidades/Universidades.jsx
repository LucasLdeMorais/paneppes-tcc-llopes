import "./universidades.css";
import { dadosEmendas } from "../../dummyData";
import { NavigateNext } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Box,
    Link, Breadcrumbs, CardContent, CardActionArea, List, ListItem, ListItemText, CircularProgress, Tooltip }
    from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import GraficoEmendasAcao from "../../components/graficos/GraficosPequenos/GraficoEmendasAcao/GraficoEmendasAcao";
import SeletorUniversidades from './../../components/seletorUniversidades/SeletorUniversidades';
import { recuperaEmendasUniversidade, recuperaListaUniversidades } from "../../services/emendasService";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import GraficoEmendasNatureza from './../../components/graficos/GraficosPequenos/GraficoEmendasNatureza/GraficoEmendasNatureza';
import GraficoEmendasPartido from './../../components/graficos/GraficosPequenos/GraficoEmendasPartido/index';
import ListaEmendas from "../../components/tabelas/listaEmendas";
import PainelSemUniversidadeSelecionada from './../../components/PainelComparativo/PainelSemUniversidadeSelecionada/index';
import GraficoEmendasNaturezaBarras from "../../components/graficos/GraficosPequenos/GraficoEmendasNaturezaBarras";
import api from './../../services/api';
import { useQuery } from 'react-query';

export default function Universidades(props) {
    const [ universidade, setUniversidade ] = useState()
    const [ listaUniversidades, setListaUniversidades ] = useState([])
    const {isLoading: carregandoUniversidades, isError: temErroUniversidades, error: erroUniversidades, data: dadosUniversidades} = useQuery("recuperaListaUniversidades", 
        async () => { 
            const response = await api.get('/universidades');
            return response.data;
        }
    );
    const { isLoading: carregandoEmendas, isError: temErroEmendas, error: erroEmendas, data: dadosEmendas } = useQuery("recuperaEmendas", 
        async () => { 
            const response = await api.get(`/emendas/uo?uo=${universidade.uo}`);
            return response.data.emendas;
        },
        { enabled: !!universidade }
    );
    const [ autocompleteAberto, setAutocompleteAberto ] = useState({})
    const [ anoSelecionado, setAnoSelecionado ] = useState("2022")
    const [ emendas, setEmendas ] = useState([])
    const [ emendasAno, setEmendasAno ] = useState([])
    const shouldGetListaUniversidades = useRef(true)
    const loading = listaUniversidades.length === 0;
    const [shouldBeLoadingGrafico, setShouldBeLoadingGrafico] = useState(false)
  
    useEffect(() => {
    })

    async function handleRecuperaListaUniversidades() {
        try {
            const data = await recuperaListaUniversidades();
            if(data){
                setListaUniversidades(data)
                shouldGetListaUniversidades.current = false
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
        return emendasAnoAux;
    }

    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
    }

    const GeraGraficoEmendasAno = () =>{
        if (carregandoEmendas) {
            return <Box className='box-loading-grafico'>
                <CircularProgress color="inherit" size={40} />
            </Box>
        }
        if (temErroEmendas || temErroUniversidades) {
            return <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados do servidor</Typography>
            </Box>
        }
        if(!universidade) {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography variant="h5" className='texto-grafico-grande-vazio-universidades'>Selecione uma Universidade</Typography>
            </Box>
        }
        return dadosEmendas.length > 0? <EmendasPorAno emendasUniversidade={handleGetEmendasAno(dadosEmendas)} styleGrafico={{maxHeight: "350px", padding: "25px"}}/> :
            <Box className='box-grafico-grande-vazio-universidades'>
                <Typography variant="h5" className='texto-grafico-grande-vazio-universidades'>Não foram identificadas emendas destinadas a essa universidade</Typography>
            </Box>
    }

    const GeraTabelaEmendas = () =>{
        if (carregandoEmendas) {
            return <Box className='box-loading-grafico'>
                <CircularProgress color="inherit" size={40} />
            </Box>
        }
        if (temErroEmendas || temErroUniversidades) {
            return <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados do servidor</Typography>
            </Box>
        }
        if(!universidade) {
            return <PainelSemUniversidadeSelecionada tamanho={"grande"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
        }
        return dadosEmendas.length > 0? <Grid item xs={12}>
            <Paper className='painel-lista-emendas-universidades' elevation={2} style={{height: "max-content"}}>
                <Box className='header-painel-grafico-grande-universidades'>
                    {
                        (anoSelecionado !== 0)? <Typography variant="subtitle" component="h4">Emendas no ano de {anoSelecionado}</Typography> :
                        <Typography variant="subtitle" component="h4">Emendas</Typography>
                    }
                </Box>
                <Box className='box-seletor-anos-universidades'>
                    <SeletorAnos paper anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                </Box>
                <ListaEmendas dadosEmendas={dadosEmendas} anoSelecionado={anoSelecionado}/>
            </Paper>
        </Grid> : <Box className='box-grafico-grande-vazio-universidades'>
            <Typography variant="h5" className='texto-grafico-grande-vazio-universidades'>Não foram identificadas emendas destinadas a essa universidade</Typography>
        </Box>
    }

    async function handleSetUniversidade(value) {
        setUniversidade(value);
    }

    function handleSetAnoSelecionado(Ano) {
        setAnoSelecionado(Ano)
    }

    return (
        <Container className='container-tela-universidades'>
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
                    href="/Universidades"
                    aria-current="page"
                >
                    Universidades
                </Link>
            </Breadcrumbs>
            <SeletorUniversidades loadingUniversidades={carregandoUniversidades} listaUniversidades={dadosUniversidades} selecionarUniversidade={handleSetUniversidade} valorAutocomplete={universidade} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetUniversidade} changeAutocompleteAberto={handleSetAutocompleteAberto}></SeletorUniversidades>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Paper className='painel-grafico-grande-universidades' elevation={3}>
                        <Box className='header-painel-grafico-grande-universidades'>
                            <Typography component='h3' variant='h5'>Valor Total de Emendas em Reais por Ano</Typography>
                        </Box>
                        <GeraGraficoEmendasAno />
                    </Paper>
                </Grid>
                { 
                    universidade?  <Grid item xs={6} style={{height: "max-content"}}>
                        <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content"}}>
                            <Box className='header-painel-grafico-universidades'>
                                    <Typography component='h3' variant='subtitle1'>Distribuição de emendas por ação</Typography>
                                </Box>
                            <Box className='box-seletor-anos-universidades'>
                                <SeletorAnos paper anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                            </Box>
                            <Box style={{height: "max-content"}}>
                                <GraficoEmendasAcao anoSelecionado={anoSelecionado} emendasUniversidade={dadosEmendas} ladoLegenda={"bottom"} styleBox={{width: "100%", marginTop: "15px"}} styleGrafico={{maxHeight: "250px"}}/>
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"medio"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                }
                { 
                    universidade?  <Grid item xs={6} style={{height: "max-content"}}>
                        <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content"}}>
                            <Box className='header-painel-grafico-universidades'>
                                <Typography component='h3' variant='subtitle1'>Distribuição de emendas por Partido</Typography>
                            </Box>
                            <Box className='box-seletor-anos-universidades'>
                                <SeletorAnos paper anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                            </Box>
                            <Box style={{height: "max-content"}}>
                                <GraficoEmendasPartido anoSelecionado={anoSelecionado} emendasUniversidade={dadosEmendas} ladoLegenda={"bottom"}  styleBox={{width: "100%", marginTop: "15px"}} styleGrafico={{maxHeight: "250px"}}/>
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"medio"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                }
                {/* { 
                    universidade?  <Grid item xs={12} style={{height: "max-content"}}>
                        <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content", minHeight: "350px"}}>
                            <Box style={{height: "max-content", minHeight: "350px"}}>
                                <GraficoEmendasNaturezaBarras anoSelecionado={anoSelecionado} emendasUniversidade={emendas} ladoLegenda={"bottom"} styleBox={{height: "max-content", minHeight: "650px", overflow: "auto"}} styleGrafico={{height: "850px"}}/>
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"grande"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                } */}
                <GeraTabelaEmendas/>
            </Grid>
        </Container>
    );
}
