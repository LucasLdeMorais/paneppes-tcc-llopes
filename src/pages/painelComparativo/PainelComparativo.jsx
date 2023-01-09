import './index.css';
import { Box, Container } from '@mui/system';
import { CircularProgress, ClickAwayListener, Grid, Paper, Typography } from '@mui/material';
import LinhaHorizontal from '../../components/graficos/GraficosGrandes/linhaHorizontal/LinhaHorizontal';
import { anos } from '../../constants/compartilhado'
import { recuperaEmendasUniversidade, recuperaListaUniversidades } from '../../services/emendasService/'
import React, { useState, useEffect, useRef } from 'react';
import { useListState } from '@mantine/hooks';
import SeletorUniversidades from '../../components/seletorUniversidades/SeletorUniversidades';
import PainelSemUniversidadeSelecionada from '../../components/PainelComparativo/PainelSemUniversidadeSelecionada/PainelSemUniversidadeSelecionada';
import PainelDetalhesUniversidade from '../../components/PainelComparativo/PainelDetalhesUniversidade/PainelDetalhesUniversidade';
import BreadcrumbsWithRouter from '../../components/BreadcrumbsWithRouter/BreadcrumbsWithRouter';
import { withRouter } from "react-router-dom";
import { Tooltip } from '@mui/material';
import { Icon } from '@mui/material';
import { IconButton } from '@mui/material';
import { Help, Warning } from '@mui/icons-material';

// TODO: Gerar Cor junto com as Emendas da Universidade

function PainelComparativo(props) {
  const { history } = props;
  const [ listaUniversidades, setListaUniversidades ] = useListState([]);
  const [ emendas, setEmendas ] = useListState([]);
  const [ listaPaineis, updateListaPaineis ] = useListState([]);
  const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([]);
  const [ emendasAnoUniversidades, setEmendasAnoUniversidades ] = useListState([]);
  const shouldGetListaUniversidades = useRef(true)
  const loadingUniversidades = listaUniversidades.length === 0;
  const loadingGrafico = emendas.length !== 0 && universidadesSelecionadas.length !== 0;
  const [ valorAutocomplete, setValorAutocomplete ] = useState();
  const [ autocompleteAberto, setAutocompleteAberto ] = useState(false);
  const [ statusAjudaPainelComparativo, setStatusAjudaPainelComparativo ] = useState(false);

  async function handleRecuperaListaUniversidades() {
    try {
      const data = await recuperaListaUniversidades()
      if(data){
        setListaUniversidades.setState(data)
        shouldGetListaUniversidades.current = false
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  // * function calculaTotalAnosUniversidade
  /**
   * @param Emendas [..., {
   *  _id: "62c3b7fd152066fdca6c35b3"
   *  acao: "20GK - Fomento às Ações de Graduação, Pós-Graduação, Ensino, Pesquisa e Extensão"
   *  ​​​​​ano: 2022
   *  ​​​​autor: "Chiquinho Brazão"
   *  ​​​​autor_id: "62c3a6e9152066fdca6928fa"
   *  ​​​​dotacaoAtualEmenda: 2100000
   *  ​​​​dotacaoInicialEmenda: 2100000
   *  ​​​​empenhado: 0
   *  ​​​​gnd: "3 - Outras Despesas Correntes"
   *  ​​​​liquidado: 0
   *  ​​​​localizador: "0033 - No Estado do Rio de Janeiro"
   *  ​​​​modalidade: "90 - Aplicações Diretas"
   *  ​​​​naturezaDespesa: "33900000 - Aplicações Diretas"
   *  ​​​​nro: 39410011
   *  ​​​​nroUo: 26269
   *  ​​​​orgao: "26000 - Ministério da Educação"
   *  ​​​​pago: 0
   *  ​​​​partido: "AVANTE"
   *  ​​​​rp: "6 - Emendas Individuais"
   *  ​​​​tipoAutor: "Deputado Federal"
   *  ​​​​uo: "26269 - Fundação Universidade do Rio de Janeiro"
   *  ​​​​uo_id: "62bfa47e475cf2cc4e1ff39f"
   * }]
   * 
   * @param Universidade {
   *  uo: 26269,
   *  sigla: UFRJ
   * }
   * 
   * @param Anos [..., 2021, 2022]
   * 
   * @return pagoEmendasAno {
   *   siglaUniversidade: UFRJ,
   *   emendasPorAno: [100000, 22200, 350000, 456677, 123000, 123330, 30000, 200000]
   * }
   * 
  */
   function calculaTotalAnosUniversidade(emendas, universidade, anos) {
    let pagoEmendasAno = []
    anos.forEach( ano => {
        let totalAno = 0
        emendas.forEach( emenda => {
          if (emenda.ano.toString() === ano && emenda.nroUo === universidade.uo) {
            totalAno = totalAno + emenda.pago
          }
        })
        pagoEmendasAno.push(totalAno)
    })
    return {
      siglaUniversidade: universidade.sigla,
      pagoEmendasAno: pagoEmendasAno
    }
  }

  function handleSetAutocompleteAberto(value) {
    setAutocompleteAberto(value);
  }

  function handleSetValorAutocomplete(value) {
    setValorAutocomplete(value);
  }
  
  function adicionarPainel(universidade, emendasUniversidade) {
    const painel = {
        titulo: universidade.sigla,
        universidade: universidade
    }
    updateListaPaineis.append(painel)
  }

  // * handleAdicionarUniversidade
  /**
   * * Inclui uma universidade na lista de universidades selecionadas, que serão exibidas no grafico
   * @param universidade { 
   *   _id: 1278as5d786as5d,
   *   sigla: UFRJ,
   *   uo: 26269
   * }
   * @returns emendasAnoUniversidades [
   *  {
   *    siglaUniversidade: UFRJ,
   *    emendasPorAno: [100000, 22200, 350000, 456677, 123000, 123330, 30000, 200000]
   *  }
   * ]
   */
  async function handleAdicionarUniversidade(universidade) {
    try {
      if(listaUniversidades.length !== 0){
        // Caso nao tenha na lista,faz tudo
        if (!universidadesSelecionadas.find(element => element === universidade)) {
          // Adiciona universidade selecionada na lista de selecionadas
          setUniversidadesSelecionadas.append(universidade);
          
          let emendasUniversidade
          // Já tem aquelas emendas na lista de emendas?
          // se sim
          if (!emendas.includes(value => value.sigla === universidade.sigla)) {
            // Recupera a lista de emendas daquela universidade e adiciona na lista geral de emendas
            emendasUniversidade = await recuperaEmendasUniversidade(universidade)
            setEmendas.append(emendasUniversidade)
          } else {
            // se nao
            // Pega da lista de emendas
            emendasUniversidade = emendas.filter(value => value.siglaUniversidade === universidade.sigla)
          }
          // Cria um painel que mostra dados de partidos que mais deram dinheiro e quais são as despesas que mais recebem
          adicionarPainel(universidade, emendasUniversidade.emendas)

          // Calcula o total pago em cada ano e adiciona na lista de valores pagos por ano (contém todas universidades selecionadas)
          let TotalAnosUniversidade = calculaTotalAnosUniversidade(emendasUniversidade.emendas, universidade, anos)
          
          setEmendasAnoUniversidades.append(TotalAnosUniversidade)
        }
        // Caso já tenha na lista, não faz nada
        // ? Poderia mostrar um feedback visual de erro
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  // * handleRemoverUniversidade
  /**
   * * Remove uma universidade do vetor de universidades selecionadas e suas respectivas emendas para fins de performance
   * @param universidade { 
   *   _id: 1278as5d786as5d,
   *   sigla: UFRJ,
   *   uo: 26269
   * }
   */
  async function handleRemoverUniversidade(indicePainel) {
    try {
      const universidade = listaPaineis[indicePainel].universidade;
      // Caso não tenha na lista, não faz nada
      // ? Poderia mostrar um feedback de erro
      if (universidadesSelecionadas.find(element => element === universidade)) {
        // filtra a universidade selecionada da lista de selecionadas e atribui a nova lista ao state (sem a universidade que seria removida)
        setUniversidadesSelecionadas.remove(indicePainel)

        // filtra as emendas da universidade selecionada da lista geral de emendas
        setEmendas.remove(indicePainel)

        updateListaPaineis.remove(indicePainel)

        // filtra as emendas da universidade selecionada da lista de valores pagos por ano
        setEmendasAnoUniversidades.remove(indicePainel)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  async function handleRecarregar(){
    handleRecuperaListaUniversidades()
  }

  function handleRemoverTudo() {
    try {
        setUniversidadesSelecionadas.setState([])

        setEmendas.setState([])

        updateListaPaineis.setState([])

        setEmendasAnoUniversidades.setState([])
    } catch (e) {
      console.log(e.message)
    }
  }

  function abrirAjudaPainelComparativo() {
    setStatusAjudaPainelComparativo(true)
  }

  function fecharAjudaPainelComparativo() {
    setStatusAjudaPainelComparativo(false)
  }

  const AjudaPainelComparativo = ({open, abrir, fechar}) => {
    return  <Box style={{float: "right"}}>
      <ClickAwayListener onClickAway={fechar}>
        <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} onClose={fechar} title={<React.Fragment>
            <Typography color="inherit">Como utilizar:</Typography>
            <Typography variant='subtitle2' color="inherit">Adicionar Universidade:</Typography>
            {"Selecione uma universidade na barra de seleção acima e clique no botão com o símbolo \"+\" para que o gráfico mostre os dados referentes a universidade selecionada."}
            <Typography variant='subtitle2' color="inherit">Remover Universidade:</Typography>
            {"Para Remover, desça a tela até o painel da espectiva universidade e clique no símbolo \"x\" no cabeçalho (em azul)."}
            <Typography variant='subtitle2' color="inherit">Abrir Tabela de Emendas da Universidade:</Typography>
              {"Clique no botão escrito \"Abrir tabela de emendas\" logo abaixo dos gráficos de pizza. Para fechar, bastar clicar no botão novamente."}
              <hr/>
              <u>{'Link para guia completo'}</u>
        </React.Fragment>} placement='right'>
            <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Box>
  }

  useEffect(() => {
    if(shouldGetListaUniversidades.current) {
      handleRecuperaListaUniversidades()
    }
  })

  return (<Container className='container-tela' component={'main'}>
    <BreadcrumbsWithRouter props={props} history={history} links={[{texto:"Principal", endPagina: "/"}, {texto:"Painel Comparativo", endPagina: "/PainelComparativo"}]} className={"breadcrumbs"}/>
    <Box style={{width: "100%"}}>
      <SeletorUniversidades temAcoes loadingUniversidades={loadingUniversidades} listaUniversidades={listaUniversidades} recarregar={handleRecarregar} removerTudo={handleRemoverTudo} selecionarUniversidade={handleAdicionarUniversidade} valorAutocomplete={valorAutocomplete} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetValorAutocomplete} changeAutocompleteAberto={handleSetAutocompleteAberto}></SeletorUniversidades>
    </Box>
    <Grid container spacing={2} className='grid-principal'>
      <Grid item xs={12}>
        <Paper className='painel-grafico-painel-comparativo' elevation={3}>
          <Box className='header-painel-painel-comparativo'>
            <Typography component='h3' variant='subtitle1' className='titulo-header-painel-painel-comparativo'>Total Pago em Emendas Por Universidade</Typography>
            <AjudaPainelComparativo open={statusAjudaPainelComparativo} abrir={abrirAjudaPainelComparativo} fechar={fecharAjudaPainelComparativo} />
          </Box>
          <Box className='subtitulo-painel-painel-comparativo'>
            <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                <Warning />
            </Icon>
            <Typography component='h3' variant='caption' className="subtitulo-header-painel-universidades">Passe o cursor do mouse sobre os pontos do gráfico visualizar os respectivos valores</Typography>
          </Box>
          {
            emendasAnoUniversidades.length > 0 ? <LinhaHorizontal emendasUniversidades={emendasAnoUniversidades} anos={anos}/> : 
            <> 
              { 
                loadingGrafico ? <Box className='box-loading-grafico'>
                  <CircularProgress color="inherit" size={40} />
                </Box> : <Box className='box-grafico-vazio' style={{height: "50px", color: "grey"}}>
                  <Typography component='h5' variant='h6'>Adicione uma universidade ao gráfico</Typography>
                </Box>
              }
            </> 
          }
        </Paper>
      </Grid>
      {
        listaPaineis.length > 0 ? listaPaineis.map((item, indice) => {
          return <PainelDetalhesUniversidade titulo={ item.titulo } handleRemover={handleRemoverUniversidade} indice={ indice } emendasUniversidade={
            emendas.find(emenda => emenda.siglaUniversidade === item.titulo).emendas} anos={anos} />
        }) : <PainelSemUniversidadeSelecionada tamanho={"grande"} style={{height: "300px", backgroundColor: "#878787", padding: "20px"}}/>
      }
    </Grid>
  </Container>);
}
export default withRouter(PainelComparativo);
