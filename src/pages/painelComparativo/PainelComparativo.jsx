import './index.css';
import { Box, Container } from '@mui/system';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import LinhaHorizontal from '../../components/graficos/GraficosGrandes/linhaHorizontal/LinhaHorizontal';
import { anos } from '../../constants'
import { recuperaEmendasUniversidade, recuperaListaUniversidades } from '../../services/emendasService/'
import React, { useState, useEffect, useRef } from 'react';
import { useListState } from '@mantine/hooks';
import SeletorUniversidades from '../../components/seletorUniversidades/SeletorUniversidades';
import PainelSemUniversidadeSelecionada from '../../components/PainelComparativo/PainelSemUniversidadeSelecionada/PainelSemUniversidadeSelecionada';
import PainelDetalhesUniversidade from '../../components/PainelComparativo/PainelDetalhesUniversidade/PainelDetalhesUniversidade';
import BreadcrumbsWithRouter from '../../components/BreadcrumbsWithRouter/BreadcrumbsWithRouter';
import { withRouter } from "react-router-dom";
  // TODO: Olhar no figma exemplos de dashboard
  // TODO: Fazer ajustes relacionados ao desempenho da aplicação em redes mais lentas
    // * CHECK! TODO: Baixar emendas de acordo com as universidades selecionadas 
  // * CHECK! TODO: Separar emendas obtidas a partir das respectivas universidades
  // TODO: Documentar todas as funções e só manter o que está sendo utilizado de fato
  // * CHECK! TODO: Colocar o display de paineis separado
  // * CHECK! TODO: Seletor de anos por painel com menu dropdown
  // TODO: Gerar Cor junto com as Emendas da Universidade

function PainelComparativo(props) {
  const { history } = props;
  const [ listaUniversidades, setListaUniversidades ] = useListState([])
  const [ emendas, setEmendas ] = useListState([])
  const [ listaPaineis, updateListaPaineis ] = useListState([])
  const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([])
  const [ emendasAnoUniversidades, setEmendasAnoUniversidades ] = useListState([])
  const shouldGetListaUniversidades = useRef(true)
  const loadingUniversidades = listaUniversidades.length === 0;
  const loadingGrafico = emendas.length !== 0 && universidadesSelecionadas.length !== 0;
  const [ valorAutocomplete, setValorAutocomplete ] = useState()
  const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)

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

  async function handleRecuperaEmendasUniversidade(universidade) {
    try {
      if (emendas.includes(value => value.sigla === universidade.sigla)) {
        return
      }
      const data = await recuperaEmendasUniversidade(universidade)
      setEmendas.append(data)
      return data.emendas
    } catch(e) {
      console.log(e.message)
    }
  }

  // TODO: Revisar necessidade
  function handleSetTotalAnosUniversidades(universidades){
    universidades.forEach(universidade => calculaTotalAnosUniversidade(emendas, universidade, anos))
  }

  // TODO: Revisar se está certinho
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
  
  // * function getTotalAnosUniversidades
  /**
   * 
    @returns  emendasPorAnoUniversidades [
      {
        universidade: UFRJ,
        emendas: [ 2500000, ... ]
      },
      {
        universidade: UFF,
        emendas: [ 1250000, ... ]
      },
      ...
    ]
  */
  function getTotalAnosUniversidades(emendas, universidades, anos) {
    const emendasPorAnoUniversidades = []
    if(emendas.length === 0 || universidades.length === 0) {
      return
    }
    universidades.forEach( universidade => {
      let emendasAnosUniversidade = {
        universidade: universidade.sigla,
        emendas: []
      }
      emendasAnosUniversidade['emendas'] = calculaTotalAnosUniversidade(emendas, universidade, anos)
      emendasPorAnoUniversidades.push(emendasAnosUniversidade)
    })
    return emendasPorAnoUniversidades
  }

  function handleSetAutocompleteAberto(value) {
    setAutocompleteAberto(value);
  }

  function handleSetValorAutocomplete(value) {
    setValorAutocomplete(value);
  }
  
  // TODO: Colocar o dislay de paineis separado
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

  useEffect(() => {
    if(shouldGetListaUniversidades.current) {
      handleRecuperaListaUniversidades()
    }
  })

  return (<Container className='main-container' component={'main'}>
    <BreadcrumbsWithRouter props={props} history={history} links={[{texto:"Principal", endPagina: "/"}, {texto:"Painel Comparativo", endPagina: "/PainelComparativo"}]} />
    <Box style={{width: "100%"}}>
      <SeletorUniversidades temAcoes loadingUniversidades={loadingUniversidades} listaUniversidades={listaUniversidades} recarregar={handleRecarregar} removerTudo={handleRemoverTudo} selecionarUniversidade={handleAdicionarUniversidade} valorAutocomplete={valorAutocomplete} autocompleteAberto={autocompleteAberto} setValorAutocomplete={handleSetValorAutocomplete} changeAutocompleteAberto={handleSetAutocompleteAberto}></SeletorUniversidades>
    </Box>
    <Grid container spacing={2} className='grid-principal'>
      <Grid item xs={12}>
        <Paper className='painelGrafico' elevation={3}>
          <Box className='header-painel' style={{ marginBottom: 10 }}>
            <Typography component='h3' variant='h5' style={{ padding: 15 }}>Total Pago em Emendas Por Universidade</Typography>
          </Box>
          {
            emendasAnoUniversidades.length > 0 ? <LinhaHorizontal emendasUniversidades={emendasAnoUniversidades} anos={anos}/> : 
            <> 
              { 
                loadingGrafico ? <Box className='box-loading-grafico'>
                  <CircularProgress color="inherit" size={40} />
                </Box> : <Box className='box-grafico-vazio' style={{height: "50px", color: "grey"}}>
                  <Typography variant="h5">Adicione uma Universidade ao gráfico</Typography>
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
