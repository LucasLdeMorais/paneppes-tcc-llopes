import "./universidades.css";
import { Help, Warning } from '@mui/icons-material'
import { Container, Grid, Paper, Typography, Box, CircularProgress, Tooltip, ClickAwayListener, IconButton, Icon } from "@mui/material";
import React, { useState } from "react";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import GraficoEmendasAcao from "../../components/graficos/GraficosPequenos/GraficoEmendasAcao/GraficoEmendasAcao";
import SeletorUniversidades from './../../components/seletorUniversidades/SeletorUniversidades';
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import GraficoEmendasPartido from './../../components/graficos/GraficosPequenos/GraficoEmendasPartido/index';
import ListaEmendas from "../../components/tabelas/listaEmendas";
import PainelSemUniversidadeSelecionada from './../../components/PainelComparativo/PainelSemUniversidadeSelecionada/index';
import api from './../../services/api';
import { withRouter } from "react-router-dom";
import { useQuery } from 'react-query';
import BreadcrumbsWithRouter from "../../components/BreadcrumbsWithRouter";

function Universidades(props) {
    const { history } = props;
    const [ universidade, setUniversidade ] = useState()
    const {isLoading: carregandoUniversidades, isError: temErroUniversidades, error: erroUniversidades, data: dadosUniversidades} = useQuery("recuperaListaUniversidades", 
        async () => { 
            const response = await api.get('/universidades');
            return response.data;
        }
    );
    const { isLoading: carregandoEmendas, isError: temErroEmendas, error: erroEmendas, data: dadosEmendas } = useQuery(["recuperaListaEmendas",{ universidade }], 
        async () => { 
            const response = await api.get(`/emendas/uo?uo=${universidade.uo}`);
            handleGetEmendasAno(response.data.emendas);
            return response.data.emendas;
        },{
            enabled: !!universidade
        }
    );
    const [ autocompleteAberto, setAutocompleteAberto ] = useState({})
    const [ anoSelecionado, setAnoSelecionado ] = useState("2022")
    const [ emendasAno, setEmendasAno ] = useState([])
    const [ statusAjudaUniversidades, setStatusAjudaUniversidades ] = useState(false);
    const [ statusAjudaAcao, setStatusAjudaAcao ] = useState(false);
    const [ statusAjudaPartidos, setStatusAjudaPartidos ] = useState(false);
    const [ statusAjudaTabela, setStatusAjudaTabela ] = useState(false);

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

    const GeraGraficoEmendasAcao = () => {
        if(dadosEmendas === undefined){
            if(carregandoEmendas){
            return <Box className='box-grafico-grande-vazio-universidades'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
            </Box>
            } else if(temErroEmendas) {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
            </Box>
            } else {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6'>Selecione uma universidade</Typography>
            </Box>
            }
        } else {
            return <GraficoEmendasAcao anoSelecionado={anoSelecionado} emendasUniversidade={dadosEmendas} ladoLegenda={"bottom"} styleBox={{width: "100%", marginTop: "15px"}} styleGrafico={{maxHeight: "250px"}}/>
        }
    }

    const GeraGraficoEmendasPartido = () => {
        if(dadosEmendas === undefined){
            if(carregandoEmendas){
            return <Box className='box-grafico-grande-vazio-universidades'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
            </Box>
            } else if(temErroEmendas) {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
            </Box>
            } else {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6'>Selecione uma universidade</Typography>
            </Box>
            }
        } else {
            return <GraficoEmendasPartido anoSelecionado={anoSelecionado} emendasUniversidade={dadosEmendas} ladoLegenda={"bottom"}  styleBox={{width: "100%", marginTop: "15px"}} styleGrafico={{maxHeight: "250px"}}/>
        }
    }

    const GeraListaEmendas = () => {
        if(dadosEmendas === undefined){
            if(carregandoEmendas){
            return <Box className='box-grafico-grande-vazio-universidades'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
            </Box>
            } else if(temErroEmendas) {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
            </Box>
            } else {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6'>Selecione uma universidade</Typography>
            </Box>
            }
        } else {
            return <ListaEmendas dadosEmendas={dadosEmendas} anoSelecionado={anoSelecionado}/>
        }
    }

    const GeraGraficoEmendasAno = () =>{
        if(dadosEmendas === undefined){
            if(carregandoEmendas){
            return <Box className='box-grafico-grande-vazio-universidades'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
            </Box>
            } else if(temErroEmendas) {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
            </Box>
            } else {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6'>Selecione uma universidade</Typography>
            </Box>
            }
        } else {
            return <EmendasPorAno emendasUniversidade={emendasAno} styleBox={{overflow: "auto"}} styleGrafico={{maxHeight: "350px", padding: "15px"}}/>
        }
    }

    async function handleSetUniversidade(value) {
        setUniversidade(value);
    }

    function handleSetAnoSelecionado(Ano) {
        console.log(Ano)
        setAnoSelecionado(Ano)
    }

    function abrirAjudaUniversidades() {
        setStatusAjudaUniversidades(true)
    }
    
    function fecharAjudaUniversidades() {
        setStatusAjudaUniversidades(false)
    }

    function abrirAjudaPartidos() {
        setStatusAjudaPartidos(true)
    }
    
    function fecharAjudaPartidos() {
        setStatusAjudaPartidos(false)
    }

    function abrirAjudaAcao() {
        setStatusAjudaAcao(true)
    }
    
    function fecharAjudaAcao() {
        setStatusAjudaAcao(false)
    }
    
    function abrirAjudaTabela() {
        setStatusAjudaTabela(true)
    }
    
    function fecharAjudaTabela() {
        setStatusAjudaTabela(false)
    }
    
    const AjudaUniversidades = ({open, abrir, fechar}) => {
        return  <Box style={{float: "right"}}>
            <ClickAwayListener onClickAway={fechar}>
                <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} onClose={fechar} title={<React.Fragment>
                    <Typography color="inherit">Como utilizar:</Typography>
                    <Typography variant='subtitle2' color="inherit">Selecionar Universidade:</Typography>
                    {"Selecione uma universidade na barra de seleção acima para que os gráficos mostrem os dados referentes à universidade selecionada."}<hr/>
                    <a href="/ParaSaberMais" style={{color: "white"}}>{'Link para guia completo'}</a>
                </React.Fragment>} placement='right'>
                    <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
                </Tooltip>
            </ClickAwayListener>
        </Box>
    }

    const AjudaPequenos = ({open, abrir, fechar}) => {
        return  <Box style={{float: "right"}}>
            <ClickAwayListener onClickAway={fechar}>
                <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} onClose={fechar} title={<React.Fragment>
                    <Typography color="inherit">Como utilizar:</Typography>
                    <Typography variant='subtitle2' color="inherit">Selecionar Ano:</Typography>
                    {"Selecione um ano na barra de seleção abaixo para que os gráficos mostrem os dados referentes a emendas pagas no ano selecionado."}
                    <hr/>
                    <a href="/ParaSaberMais" style={{color: "white"}}>{'Link para guia completo'}</a>
                </React.Fragment>} placement='right'>
                    <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
                </Tooltip>
            </ClickAwayListener>
        </Box>
    }

    const AjudaTabela = ({open, abrir, fechar}) => {
        return  <Box style={{float: "right"}}>
            <ClickAwayListener onClickAway={fechar}>
                <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} onClose={fechar} title={<React.Fragment>
                    <Typography color="inherit">Como utilizar:</Typography>
                    <Typography variant='subtitle2' color="inherit">Selecionar Ano:</Typography>
                    {"Selecione um ano na barra de seleção abaixo para que os gráficos mostrem os dados referentes a emendas pagas no ano selecionado."}<hr/>
                    <a href="/ParaSaberMais" style={{color: "white"}}>{'Link para guia completo'}</a>
                </React.Fragment>} placement='right'>
                    <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
                </Tooltip>
            </ClickAwayListener>
        </Box>
    }

    return (
        <Container className='container-tela'>
            <BreadcrumbsWithRouter links={[{texto: "Principal", endPagina: "/"},{texto: "Universidades", endPagina: "/Universidades"}]} history={history} className={"breadcrumbs"}/>
            <SeletorUniversidades erroListaUniversidades={temErroUniversidades} loadingUniversidades={carregandoUniversidades} listaUniversidades={dadosUniversidades} selecionarUniversidade={handleSetUniversidade} valorAutocomplete={universidade} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetUniversidade} changeAutocompleteAberto={handleSetAutocompleteAberto}></SeletorUniversidades>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Paper className='painel-grafico-grande-universidades' elevation={3}>
                        <Box className='header-painel-grafico-grande-universidades'>
                            <Typography component='h3' variant='subtitle1' className="titulo-header-painel-universidades">Valor Total de Emendas em Reais por Ano</Typography>
                            <AjudaUniversidades abrir={abrirAjudaUniversidades} fechar={fecharAjudaUniversidades} open={statusAjudaUniversidades}/>
                        </Box>
                        <Box className='subtitulo-painel-grafico-grande-universidades'>
                            <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                                <Warning />
                            </Icon>
                            <Typography component='h3' variant='caption' className="subtitulo-header-painel-universidades">Posicione o cursor do mouse sobre as barras do gráfico para visualizar os valores</Typography>
                        </Box>
                        <GeraGraficoEmendasAno />
                    </Paper>
                </Grid>
                { 
                    universidade?  <Grid item xs={6} style={{height: "max-content"}}>
                        <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content"}}>
                            <Box className='header-painel-grafico-universidades'>
                                <Typography component='h3' variant='subtitle1' className="titulo-header-painel-grafico-pequeno-universidades">Distribuição de emendas pagas por ação</Typography>
                                <AjudaPequenos abrir={abrirAjudaAcao} fechar={fecharAjudaAcao} open={statusAjudaAcao}/>
                            </Box>
                            <Box className='subtitulo-painel-grafico-grande-universidades'>
                                <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                                    <Warning />
                                </Icon>
                                <Typography component='h3' variant='caption' className="subtitulo-header-painel-universidades">Posicione o cursor do mouse sobre as fatias do gráfico para visualizar os valores</Typography>
                            </Box>
                            <SeletorAnos paper stylePaper={{width: "97%", margin: "9px", marginBottom: "4apx"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                            <Box style={{height: "max-content"}}>
                                <GeraGraficoEmendasAcao />
                            </Box>
                        </Paper> 
                    </Grid> : <PainelSemUniversidadeSelecionada tamanho={"medio"} style={{minHeight: "350px", backgroundColor: "#878787", padding: "20px"}}/>
                }
                { 
                    universidade?  <Grid item xs={6} style={{height: "max-content"}}>
                        <Paper className='painel-grafico-pequeno-universidades' elevation={2} style={{height: "max-content"}}>
                            <Box className='header-painel-grafico-universidades'>
                                <Typography component='h3' variant='subtitle1' className="titulo-header-painel-grafico-pequeno-universidades">Distribuição de emendas pagas por Partido</Typography>
                                <AjudaPequenos abrir={abrirAjudaPartidos} fechar={fecharAjudaPartidos} open={statusAjudaPartidos}/>
                            </Box>
                            <Box className='subtitulo-painel-grafico-grande-universidades'>
                                <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                                    <Warning />
                                </Icon>
                                <Typography component='h3' variant='caption' className="subtitulo-header-painel-universidades">Posicione o cursor do mouse sobre as fatias do gráfico para visualizar os valores</Typography>
                            </Box>
                            <SeletorAnos paper stylePaper={{width: "97%", margin: "9px", marginBottom: "4apx"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                            <Box style={{height: "max-content"}}>
                                <GeraGraficoEmendasPartido />
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
                { universidade? <Grid item xs={12}>
                    <Paper className='painel-lista-emendas-universidades' elevation={2} style={{height: "max-content"}}>
                        <Box className='header-tabela-emendas-universidades'>
                            {
                                (anoSelecionado !== 0)? <Typography variant="subtitle1" component="h4" className="titulo-header-painel-tabela-emendas-universidades">Emendas no ano de {anoSelecionado}</Typography> :
                                <Typography variant="subtitle" component="h4" className="titulo-header-painel-tabela-emendas-universidades">Emendas</Typography>
                            }
                            <AjudaTabela abrir={abrirAjudaTabela} fechar={fecharAjudaTabela} open={statusAjudaTabela} /> 
                        </Box>
                        <Box className='subtitulo-painel-grafico-grande-universidades'>
                            <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                                <Warning />
                            </Icon>
                            <Typography component='h3' variant='caption' className="subtitulo-header-painel-universidades">Clique nas linhas da tabela para abrir a página referente à emenda no portal da transparência</Typography>
                        </Box>
                        <SeletorAnos paper stylePaper={{width: "98%", margin: "9px", marginBottom: "4apx"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
                        <GeraListaEmendas />
                    </Paper>
                </Grid> : <PainelSemUniversidadeSelecionada tamanho={"grande"} style={{minHeight: "450px", backgroundColor: "#878787", padding: "20px"}}/>}
            </Grid>
        </Container>
    );
}
export default withRouter(Universidades);
