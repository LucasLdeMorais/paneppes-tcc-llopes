import "./home.css";
import React from 'react';
import { Button, Container, Grid, Icon, Paper, Typography, Box, CircularProgress } from "@mui/material";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import { AccountBalance, CompareArrows, Groups } from "@mui/icons-material";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import { useState, useEffect } from 'react';
import { useListState } from '@mantine/hooks';
import { useRef } from 'react';
import { withRouter } from "react-router-dom";
import BreadcrumbsWithRouter from '../../components/BreadcrumbsWithRouter/BreadcrumbsWithRouter';
import GraficoEmendasRegiao from './../../components/graficos/GraficosPequenos/GraficoEmendasRegiao/index';
import GraficoEmendasPorEstado from './../../components/graficos/GraficosGrandes/graficoEmendasPorEstado/index';
import { useQuery } from "react-query";
import api from './../../services/api';
import GraficoEmendasRp from './../../components/graficos/GraficosPequenos/GraficoEmendasRp/index';

function Home(props) {
  const { history } = props;
  const [newSession, setNewSession] = useState(true);
  const [anoSelecionado, setAnoSelecionado] = useState("2022");
  //const [emendas, updateEmendas] = useListState();
  const {isLoading: carregandoEmendas, isError: temErroEmendas, error: erroEmendas, data: dadosEmendas} = useQuery("recuperaEmendas", 
    async () => { 
      const response = await api.get('/emendas');
      return response.data;
    }
  );
  const {isLoading: carregandoUniversidades, isError: temErroUniversidades, error: erroUniversidades, data: dadosUniversidades} = useQuery("recuperaListaUniversidades", 
    async () => { 
      const response = await api.get('/universidades');
      return response.data;
    }
  );
  const [listaUniversidades, updateListaUniversidades] = useListState();
  const [emendasAno, setEmendasAno] = useState();
  const shouldGetEmendasAno = useRef(true);
  const shouldGetUniversidades = useRef(true);




  function handleSetAnoSelecionado(Ano) {
    setAnoSelecionado(Ano);
  }

  const listaBotoes = [
    {
      texto: "Explorar emendas para cada Instituição",
      icone: <AccountBalance fontSize="medium" style={{color: "white"}}/>,
      onClick: () => history.push("/Universidades")
    },
    {
      texto: "Explorar emendas por Parlamentar",
      icone: <Groups fontSize="medium" style={{color: "white"}}/>,
      onClick: () => history.push("/Parlamentares")
    },
    {
      texto: "Comparar Emendas entre Instituições",
      icone: <CompareArrows fontSize="medium" style={{color: "white"}}/>,
      onClick: () => history.push("/PainelComparativo")
    },
  ]
  
  const BotaoRedirecionar = (botao, key) => {
    return (
      <Grid item xs={4} key={key}>
        <Paper className={"paper-botao-telas-home"}>
          <Button color="primary" variant="contained" className={"botao-telas-home"} onClick={botao.onClick}>
            <Icon style={{marginRight: "10px"}}>{botao.icone}</Icon>
            <Typography component='h3' variant='h6'>{botao.texto}</Typography>
          </Button>
        </Paper>
      </Grid>
    )
  }

  const GeraGraficoEmendasRegiao = () => {
    if(carregandoEmendas || carregandoUniversidades) {
      return <Box className='box-tabela-vazia'>
        <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
        <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
      </Box>
    } else if (temErroEmendas) {
      return <Box className='box-tabela-vazia'>
        <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
      </Box>
    } else if (temErroUniversidades) {
      return <Box className='box-tabela-vazia'>
        <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de universidades</Typography>
      </Box>
    } else {
      return <GraficoEmendasRegiao emendasUniversidades={dadosEmendas} universidades={dadosUniversidades} anoSelecionado={anoSelecionado} styleGrafico={{padding: "25px", maxHeight: "300px"}}/>
    }
  }

  const GeraGraficoEmendasEstados = () => {
    if(carregandoEmendas || carregandoUniversidades) {
      return <Box className='box-tabela-vazia'>
          <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
        <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
      </Box>
    } else if (temErroEmendas) {
      return <Box className='box-tabela-vazia'>
        <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
      </Box>
    } else if (temErroUniversidades) {
      return <Box className='box-tabela-vazia'>
        <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de universidades</Typography>
      </Box>
    } else {
      return <GraficoEmendasPorEstado emendasUniversidades={dadosEmendas} universidades={dadosUniversidades} anoSelecionado={anoSelecionado} styleBox={{height: "max-content"}} styleGrafico={{maxHeight: "350px", padding: "15px"}}/>
    }
  }

  const GeraGraficoEmendasRp = () => {
    if(carregandoEmendas || carregandoUniversidades) {
      return <Box className='box-tabela-vazia'>
        <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
        <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
      </Box>
    } else if (temErroEmendas) {
      return <Box className='box-tabela-vazia'>
        <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
      </Box>
    } else {
      return <GraficoEmendasRp emendasUniversidades={dadosEmendas} anoSelecionado={anoSelecionado} styleGrafico={{padding: "15px", maxHeight: "300px"}}/>
    }
  }

  const GeraGraficoEmendasAno = () => {
    debugger
    if(emendasAno === undefined){
      if(carregandoEmendas){
        return <Box className='box-grafico-grande-carregando'>
          <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
          <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
        </Box>
      } else if(temErroEmendas) {
        return <Box className='box-grafico-grande-vazio'>
          <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados de emendas</Typography>
        </Box>
      } else {
        return <Box className='box-grafico-grande-vazio'>
          <Typography component='h5' variant='h6' style={{color: "red"}}>Erro inesperado no cliente</Typography>
        </Box>
      }
    } else {
      return <EmendasPorAno styleGrafico={{maxHeight: "300px", padding: "10px"}} emendasUniversidade={emendasAno} anos={anos}/>
    }
  }

  /**
   * @param {}
   * @returns {Array<Object>} emendasAno
   * {
   *    pago: [],
   *    empenhado: []
   *  },
   */
  const reduceEmendasAno = (emendas, anos) => {
    let emendasAnos = {
      pago: [],
      empenhado: []
    }
    console.log(emendas,"aqui")
    anos.forEach((ano) => {
      let emendasAno = {
        pago: 0,
        empenhado: 0
      }
      emendas.forEach( emenda => {
        if(`${emenda.ano}` === ano) {
          emendasAno.pago += emenda.pago;
          emendasAno.empenhado += emenda.empenhado;
        }
      })
      emendasAnos.pago.push(emendasAno.pago)
      emendasAnos.empenhado.push(emendasAno.empenhado)
    })
    return emendasAnos
  }

  useEffect( () => {
    let newSession = sessionStorage.getItem("newSession");
    if (newSession === undefined || newSession=== null) {
      sessionStorage.setItem("newSession", false);
    } else {
      setNewSession(false)
    }

    if(shouldGetEmendasAno.current && dadosEmendas !== undefined ){
      setEmendasAno(reduceEmendasAno(dadosEmendas, anos));
      shouldGetEmendasAno.current = false;
    }
  },[carregandoEmendas, dadosEmendas])

  return (
    <Container className='container'>
      <BreadcrumbsWithRouter props={props} links={[{texto:"Principal", endPagina: "/"}]} className={"breadcrumbs"}/>
      <Grid container spacing={2} className='gridPrincipal'>
        {/* BOTOES */
          listaBotoes.map( (botao,index) => {
            return <Grid item xs={4} key={index}>
              <Paper className={"paper-botao-telas-home"} elevation={4}>
                <Button color="primary" variant="contained" className={"botao-telas-home"} onClick={botao.onClick}>
                  <Icon style={{marginRight: "10px"}}>{botao.icone}</Icon>
                  <Typography component='h3' variant='h6'>{botao.texto}</Typography>
                </Button>
              </Paper>
            </Grid>
          })
        }
        {/* Graficos */}
        <Grid item xs={12}>
          <Paper className='painel-grafico-grande-home' elevation={3}>
            <Box className='header-painel-grafico-home'>
              <Typography component='h3' variant='subtitle1'>Total de Emendas Pagas e empenhadas por Ano (R$)</Typography>
            </Box>
            <GeraGraficoEmendasAno />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className='painel-grafico-pequeno-home' elevation={3}>
            <Box className='header-painel-grafico-home'>
              <Typography component='h3' variant='subtitle1'>Distribuição de emendas pagas por Região</Typography>
            </Box>
            <SeletorAnos paper stylePaper={{width: "95%", margin: "9px", marginBottom: "4apx"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
            <GeraGraficoEmendasRegiao/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className='painel-grafico-pequeno-home' elevation={3}>
            <Box className='header-painel-grafico-home'>
              <Typography component='h3' variant='subtitle1'>Distribuição por Tipo de Emenda (RP)</Typography>
            </Box>
            <SeletorAnos paper stylePaper={{width: "95%", margin: "9px"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
            <GeraGraficoEmendasRp />
          </Paper>
        </Grid>
      </Grid>
        <Grid item xs={12}>
          <Paper className='painel-grafico-estados-home' elevation={3}>
            <Box className='header-painel-grafico-home'>
              <Typography component='h3' variant='subtitle1'>Distribuição de emendas pagas por Estado</Typography>
            </Box>
            <SeletorAnos paper stylePaper={{width: "97%", marginLeft: "9px", marginRight: "9px", marginTop:"9px"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
            <GeraGraficoEmendasEstados />
          </Paper>
        </Grid>
    </Container>
  );
}

export default withRouter(Home);
