import "./home.css";
import { Button, Container, Grid, Icon, Paper, Typography, Box } from "@mui/material";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import { AccountBalance, CompareArrows, Groups } from "@mui/icons-material";
import SeletorAnos from './../../components/seletorAnos/SeletorAnos';
import { anos } from "../../constants";
import { useState, useEffect } from 'react';
import { useListState } from '@mantine/hooks';
import { useRef } from 'react';
import { recuperaListaEmendas, recuperaListaUniversidades } from "../../services/emendasService";
import { withRouter } from "react-router-dom";
import BreadcrumbsWithRouter from '../../components/BreadcrumbsWithRouter/BreadcrumbsWithRouter';
import GraficoEmendasRegiao from './../../components/graficos/GraficosPequenos/GraficoEmendasRegiao/index';
import GraficoEmendasPorEstado from './../../components/graficos/GraficosGrandes/graficoEmendasPorEstado/index';

function Home(props) {
  const { history } = props;
  const [anoSelecionado, setAnoSelecionado] = useState(0);
  const [emendas, updateEmendas] = useListState();
  const [listaUniversidades, updateListaUniversidades] = useListState();
  const [emendasAno, setEmendasAno] = useState();
  const shouldGetEmendas = useRef(true);
  const shouldGetUniversidades = useRef(true);
  function handleSetAnoSelecionado(Ano) {
    setAnoSelecionado(Ano);
  }

  const listaBotoes = [
    {
      texto: "Explorar emendas para cada Universidade",
      icone: <AccountBalance fontSize="medium" style={{color: "white"}}/>,
      onClick: () => history.push("/Universidades")
    },
    {
      texto: "Explorar emendas por Parlamentar",
      icone: <Groups fontSize="medium" style={{color: "white"}}/>,
      onClick: () => history.push("/Parlamentares")
    },
    {
      texto: "Comparar Emendas entre Universidades",
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

  async function handleRecuperaListaEmendas() {
    const emendasResponse = await recuperaListaEmendas();
    if(emendasResponse.statusCode === 200){
      updateEmendas.setState(emendasResponse.data);
      setEmendasAno(reduceEmendasAno(emendas, anos));
      shouldGetEmendas.current = false;
    }
  }

  async function handleRecuperaListaUniversidades() {
    try {
      const universidadesResponse = await recuperaListaUniversidades();
      updateListaUniversidades.setState(universidadesResponse);
      shouldGetUniversidades.current = false;
    } catch(e) {
      console.log("Erro handleRecuperaListaEmendas Home",e.message)
    }
  }

  const handleGetAnoSelecionado = () => {
    return anoSelecionado
  }

  /**
   * ! Ver como pegar o total pago para depois separar por UO
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
    if(shouldGetUniversidades.current){
      handleRecuperaListaUniversidades()
    }
    if(shouldGetEmendas.current){
      handleRecuperaListaEmendas()
    }
  },[listaUniversidades,emendas])

  return (
    <Container className='container'>
      <BreadcrumbsWithRouter props={props} links={[{texto:"Principal", endPagina: "/"}]} />
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
        <Grid item xs={4}>
          <Paper className='painel-grafico-pequeno-home' elevation={3}>
            <Box className='header-painel-grafico-grande-universidades'>
              <Typography component='h3' variant='subtitle1'>Distribuição de emendas por Região</Typography>
            </Box>
            <SeletorAnos paper stylePaper={{width: "95%", margin: "9px", marginBottom: "4apx"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
            {  
              emendas.length > 0 && listaUniversidades.length > 0 ? <GraficoEmendasRegiao emendasUniversidades={emendas} universidades={listaUniversidades} anoSelecionado={anoSelecionado} styleGrafico={{padding: "20px"}}/> :
              <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
              </Box>
            }
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className='painel-grafico-pequeno-home' elevation={3}>
            <Box className='header-painel-grafico-grande-universidades'>
              <Typography component='h3' variant='subtitle1'>Distribuição de emendas por Estado</Typography>
            </Box>
            <SeletorAnos paper stylePaper={{width: "97%", marginLeft: "9px", marginRight: "9px", marginTop:"9px"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
            { 
              emendas.length > 0 && listaUniversidades.length > 0 ? <GraficoEmendasPorEstado emendasUniversidades={emendas} universidades={listaUniversidades} anoSelecionado={anoSelecionado} styleGrafico={{padding: "5px"}}/>  :
              <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
              </Box>
            }
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className='painel-grafico-pequeno-home' elevation={3}>
            <Box className='header-painel-grafico-grande-universidades'>
              <Typography component='h3' variant='subtitle1'>Total de Emendas Pagas e empenhadas por Ano (R$)</Typography>
            </Box>
            {
              emendasAno !== undefined ?
              <EmendasPorAno styleGrafico={{maxHeight: "400px", padding: "10px"}} emendasUniversidade={emendasAno} anos={anos}/> :
              <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
              </Box>
            }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='painel-grafico-pequeno-home' elevation={3}>
            <Box className='header-painel-grafico-grande-universidades'>
              <Typography component='h3' variant='subtitle1'>Universidades que mais receberam emendas</Typography>
            </Box>
            <SeletorAnos paper stylePaper={{width: "95%", margin: "9px"}} styleBox={{width: "100%"}} anos={anos} anoSelecionado={anoSelecionado} setAnoSelecionado={handleSetAnoSelecionado}/>
            {
              emendasAno !== undefined ? <></>:
              <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{}}>Carregando emendas...</Typography>
              </Box>
            }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(Home);
