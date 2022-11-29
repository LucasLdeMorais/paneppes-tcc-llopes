import "./parlamentares.css";
import { Error, Help, NavigateNext, Warning } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText, Icon, CircularProgress, IconButton, Tooltip, ClickAwayListener } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import { recuperaEmendasParlamentar, recuperaListaParlamentares } from "../../services/emendasService";
import SeletorParlamentares from './../../components/seletorParlamentares/SeletorParlamentares';
import ListaEmendasParlamentar from "../../components/tabelas/tabelaEmendasParlamentar";
import { useQuery } from "react-query";
import api from './../../services/api';
import BreadcrumbsWithRouter from "../../components/BreadcrumbsWithRouter/BreadcrumbsWithRouter";
import { withRouter } from "react-router-dom";

function Parlamentares(props) {
    const { history } = props;
    const [ parlamentar, setParlamentar ] = useState()
    const [ listaParlamentares, setListaParlamentares ] = useState([])
    const { isLoading: carregandoParlamentares, isError: temErroParlamentares, error: erroParlamentares, data: dadosParlamentares} = useQuery("recuperaListaParlamentares", 
        async () => { 
            const response = await api.get('/parlamentares');
            return response.data;
        }
    );
    const { isLoading: carregandoEmendas, isError: temErroEmendas, error: erroEmendas, data: dadosEmendas } = useQuery(["recuperaListaEmendas",{ parlamentar }], 
        async () => { 
            const response = await api.get(`/emendas/autor?autor=${parlamentar.nome}`);
            console.log("Fois")
            return response.data.emendas;
        },{
            enabled: !!parlamentar
        }
    );
    const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
    const [ anoSelecionado, setAnoSelecionado ] = useState(0)
    const [ emendas, setEmendas ] = useState([])
    const [ emendasAno, setEmendasAno ] = useState([])
    const shouldGetListaParlamentares = useRef(true)
    const loading = listaParlamentares.length === 0;
    const [ shouldBeLoadingGrafico, setShouldBeLoadingGrafico ] = useState(false)
    const [ statusAjudaParlamentares, setStatusAjudaParlamentares ] = useState(false)

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
        // setShouldBeLoadingGrafico(true)
        setParlamentar(value);
        // let emendasParlamentar;
        // emendasParlamentar = await recuperaEmendasParlamentar(value)
        // console.log(emendasParlamentar)
        // setEmendas(emendasParlamentar.emendas)
        // handleGetEmendasAno(emendasParlamentar.emendas)
        // setShouldBeLoadingGrafico(false)
    }

    function handleSetAnoSelecionado(Ano) {
        console.log(Ano)
        setAnoSelecionado(Ano)
    }

    function handleRecarregar() {
        handleRecuperaListaParlamentares()   
    }

     const GeraListaEmendas = () => {
        if(dadosEmendas === undefined){
            if(carregandoEmendas){
            return <Box className='box-tabela-vazia'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
            </Box>
            } else if(temErroEmendas) {
            return <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
            </Box>
            } else {
            return <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6'>Selecione um parlamentar</Typography>
            </Box>
            }
        } else {
            return <Box className={"box-lista-emendas-parlamentares"}>
                <SeletorAnos anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado} styleBox={styleBoxSeletorAno}/>
                <ListaEmendasParlamentar dadosEmendas={dadosEmendas} anoSelecionado={anoSelecionado} anos={anos} selecionaAno={handleSetAnoSelecionado}/>
            </Box>
        }
    }

    function abrirAjudaParlamentares() {
        setStatusAjudaParlamentares(true)
    }
    
    function fecharAjudaPainelComparativo() {
        setStatusAjudaParlamentares(false)
    }
    
    const AjudaParlamentares = ({open, abrir, fechar}) => {
        return  <Box style={{float: "right"}}>
            <ClickAwayListener onClickAway={fechar}>
            <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} onClose={fechar} title={<React.Fragment>
                <Typography color="inherit">Como utilizar:</Typography>
                <Typography variant='subtitle2' color="inherit">Selecionar Parlamentar:</Typography>
                {"Selecione um parlamentar na barra de seleção acima para que a tabela mostre os registros de emendas parlamentares direcionadas a instituições de ensino superior federais, feitas pelo autor selecionado."}
                <Typography variant='subtitle2' color="inherit">Selecionar Ano:</Typography>
                {"Selecione um ano na barra de seleção abaixo para que os gráficos mostrem os dados referentes a emendas pagas no ano selecionado."}
                <hr/>
                <u>{'Link para guia completo'}</u>
            </React.Fragment>} placement='right'>
                <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
            </Tooltip>
            </ClickAwayListener>
        </Box>
    }

    const styleBoxSeletorAno = {
        margin: "15px 0 0 15px", 
        maxWidth: "250px", 
        width: "250px"
    }

    return (
        <Container className='container-tela'>
            <BreadcrumbsWithRouter props={props} history={history} links={[{texto:"Principal", endPagina: "/"}, {texto:"Parlamentares", endPagina: "/Parlamentares"}]} className={"breadcrumbs"}/>
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
                                <Typography component='h3' variant='subtitle1' className="titulo-header-painel-parlamentares">Lista de emendas</Typography>
                                <AjudaParlamentares abrir={abrirAjudaParlamentares} fechar={fecharAjudaPainelComparativo} open={statusAjudaParlamentares}/>
                            </Box>
                            <Box className='subtitulo-painel-grafico-grande-universidades'>
                            <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                                <Warning />
                            </Icon>
                            <Typography component='h3' variant='caption' className="subtitulo-header-painel-universidades">Clique nas linhas da tabela para abrir a página referente à emenda no portal da transparência</Typography>
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
export default withRouter(Parlamentares);
