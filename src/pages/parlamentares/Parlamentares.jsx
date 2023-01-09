import "./parlamentares.css";
import { Help, Warning } from '@mui/icons-material'
import { Container, Grid, Paper, Typography, Box, Icon, CircularProgress, IconButton, Tooltip, ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants/compartilhado";
import SeletorParlamentares from './../../components/seletorParlamentares/SeletorParlamentares';
import ListaEmendasParlamentar from "../../components/tabelas/tabelaEmendasParlamentar";
import { useQuery } from "react-query";
import api from './../../services/api';
import BreadcrumbsWithRouter from "../../components/BreadcrumbsWithRouter/BreadcrumbsWithRouter";
import { withRouter } from "react-router-dom";

function Parlamentares(props) {
    const { history } = props;
    const [ parlamentar, setParlamentar ] = useState()
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
    const [ statusAjudaParlamentares, setStatusAjudaParlamentares ] = useState(false)

    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
    }

    async function handleSetParlamentar(value) {
        setParlamentar(value);
    }

    function handleSetAnoSelecionado(Ano) {
        console.log(Ano)
        setAnoSelecionado(Ano)
    }

     const GeraListaEmendas = () => {
        if(dadosEmendas === undefined){
            if(carregandoEmendas){
            return <Box className='box-tabela-emendas-vazia-parlamentar'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
            </Box>
            } else if(temErroEmendas) {
            return <Box className='box-tabela-emendas-vazia-parlamentar'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
            </Box>
            } else {
            return <Box className='box-tabela-emendas-vazia-parlamentar'>
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
            </Grid>
        </Container>
    );
}
export default withRouter(Parlamentares);
