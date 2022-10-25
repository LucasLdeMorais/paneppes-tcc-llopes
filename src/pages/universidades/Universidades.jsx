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
import ListaEmendas from "../../components/listaEmendas";
import PainelSemUniversidadeSelecionada from './../../components/PainelComparativo/PainelSemUniversidadeSelecionada/index';
import GraficoEmendasNaturezaBarras from "../../components/graficos/GraficosPequenos/GraficoEmendasNaturezaBarras";

export default function Universidades(props) {
    const [ universidade, setUniversidade ] = useState()
    const [ listaUniversidades, setListaUniversidades ] = useState([])
    const [ autocompleteAberto, setAutocompleteAberto ] = useState({})
    const [ anoSelecionado, setAnoSelecionado ] = useState(0)
    const [ emendas, setEmendas ] = useState([])
    const [ emendasAno, setEmendasAno ] = useState([])
    const shouldGetListaUniversidades = useRef(true)
    const loading = listaUniversidades.length === 0;
    const [shouldBeLoadingGrafico, setShouldBeLoadingGrafico] = useState(false)
  
    useEffect(() => {
        if(shouldGetListaUniversidades.current) {
            handleRecuperaListaUniversidades()
        }
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
        setEmendasAno(emendasAnoAux)
    }

    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
    }

    async function handleSetUniversidade(value) {
        setShouldBeLoadingGrafico(true)
        setUniversidade(value);
        let emendasUniversidade 
        emendasUniversidade = await recuperaEmendasUniversidade(value)
        setEmendas(emendasUniversidade.emendas)
        handleGetEmendasAno(emendasUniversidade.emendas)
        setShouldBeLoadingGrafico(false)
    }

    function handleSetAnoSelecionado(Ano) {
        console.log(Ano)
        setAnoSelecionado(Ano)
    }

    function handleRecarregar() {
        handleRecuperaListaUniversidades()   
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
            <Paper>
                <SeletorUniversidades loadingUniversidades={loading} listaUniversidades={listaUniversidades} selecionarUniversidade={handleSetUniversidade} valorAutocomplete={universidade} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetUniversidade} changeAutocompleteAberto={handleSetAutocompleteAberto} recarregar={handleRecarregar}></SeletorUniversidades>
            </Paper>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Paper className='painel-grafico-grande-universidades' elevation={3}>
                        <Box className='header-painel-grafico-grande-universidades'>
                            <Typography component='h3' variant='h5'>Valor Total de Emendas em Reais por Ano </Typography>
                        </Box>
                        { 
                            shouldBeLoadingGrafico.current ? <Box className='box-loading-grafico'>
                                <CircularProgress color="inherit" size={40} />
                            </Box> : <>
                                {
                                    emendas.length > 0 ? <EmendasPorAno emendasUniversidade={emendasAno} styleGrafico={{maxHeight: "350px", padding: "20px"}}/> : <>
                                        {
                                            !universidade? <Box className='box-grafico-grande-vazio-universidades'>
                                                <Typography variant="h5" className='texto-grafico-grande-vazio-universidades'>Selecione uma Universidade</Typography>
                                            </Box> : <Box className='box-grafico-grande-vazio-universidades'>
                                            <Typography variant="h5" className='texto-grafico-grande-vazio-universidades'>Não foram identificadas emendas destinadas a essa universidade</Typography>
                                        </Box>
                                        }
                                    </>
                                }
                            </>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="center" className='container-seletor-anos-universidades'>
                        <SeletorAnos anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                    </Grid>
                </Grid>
                { 
                    universidade?  <Grid item xs={6} style={{height: "max-content"}}>
                    <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content"}}>
                        <Box style={{height: "max-content"}}>
                                <GraficoEmendasAcao anoSelecionado={anoSelecionado} emendasUniversidade={emendas} ladoLegenda={"bottom"} styleBox={{width: "250px"}} styleGrafico={{width: "250px"}}/>
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"medio"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                }
                { 
                    universidade?  <Grid item xs={6} style={{height: "max-content"}}>
                    <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content"}}>
                        <Box style={{height: "max-content"}}>
                                <GraficoEmendasPartido anoSelecionado={anoSelecionado} emendasUniversidade={emendas} ladoLegenda={"bottom"}  styleGrafico={{height: "350px"}}/>
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"medio"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                }
                { 
                    universidade?  <Grid item xs={12} style={{height: "max-content"}}>
                        <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content", minHeight: "350px"}}>
                            <Box style={{height: "max-content", minHeight: "350px"}}>
                                <GraficoEmendasNaturezaBarras anoSelecionado={anoSelecionado} emendasUniversidade={emendas} ladoLegenda={"bottom"} styleBox={{height: "max-content", minHeight: "650px", overflow: "auto"}} styleGrafico={{height: "850px"}}/>
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"grande"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                }
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="center" className='container-seletor-anos-universidades'>
                        <Grid item xs={1}>
                            <SeletorAnos anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper className='painel-lista-emendas-universidades' elevation={2} style={{height: "max-content"}}>
                        {
                            (anoSelecionado != 0)? <Typography variant="h6" component="h3" style={{marginBottom:10}}>Emendas no ano de {anoSelecionado}</Typography> :
                            <Typography variant="h6" component="h3" style={{marginBottom:10}}>Emendas</Typography>
                        }
                        <ListaEmendas dadosEmendas={emendas} anoSelecionado={anoSelecionado}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
