import { React, useState } from "react"
import BarraPesquisa from './components/Pesquisa/BarraPesquisa';
import ListaResultados from "./components/ListaResultados/ListaResultados";
// TODO utilizar a pesquisaSparql desacoplada 
// import pesquisaSparql from "./pesquisaSparql"
import pesquisaResource from "./pesquisaResource";
import { Container, CircularProgress, Button } from "@material-ui/core"
import RefreshTwoTone from "@material-ui/icons/RefreshTwoTone"
import axios from "axios"
import ForceGraph2D from "react-force-graph-2d";

export default function App() {
  const [resultadoPesquisaResource, setResultadoPesquisaResource] = useState(false)
  // const [resultadoPesquisaSparql, setResultadoPesquisaSparql] = useState(false)
  const [resultadoPesquisaSparqlFrom, setResultadoPesquisaSparqlFrom] = useState([])
  const [resultadoPesquisaSparqlTo, setResultadoPesquisaSparqlTo] = useState([])
  const [itemListaSelecionado, setItemListaSelecionado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [grafo, setGrafo] = useState({ nodes: [], links: [] })

  return (
    <div className="App">
        <Container component="article" maxWidth="sm">
          <BarraPesquisa aoEnviar={handleSubmitResource}/>
          { loading && !(resultadoPesquisaResource) ? <CircularProgress style={{marginLeft: "50%", marginTop: "0"}}/> : 
            <ListaResultados resultados={resultadoPesquisaResource} handleClickItemLista={handleClickItemLista}/>
          }
          <br></br>
          <Button variant="contained" endIcon={<RefreshTwoTone/>} onClick={handleRecarregarGrafo} width="50%">
            Recarregar Grafo
          </Button>
          {  grafo.nodes !== [] ?
            <ForceGraph2D
              graphData = { grafo }
              nodeLabel = "name"
              linkDirectionalArrowLength = { 3.5 }
              linkDirectionalArrowRelPos = { 1 }
              linkCurvature = { 0.25 }
              onNodeDragEnd = { node => {
                node.fx = node.x;
                node.fy = node.y;
                node.fz = node.z;
              }}
              onNodeClick={ node => {
                handleClickNode(node)
              }}
            /> : <></>

            // TODO <Grafo data={grafo} handleClickNode={handleClickNode}/>

          }
        </Container>
    </div>
  );

  function handleSubmitResource(palavraChave) {
    if(palavraChave === false)
      return
    setLoading(true)

    // TODO setVisibilityGrafo(false)

    pesquisaResource(palavraChave).then((resultado) => {
      const Resource = resultado
      setResultadoPesquisaResource(Resource)
      setLoading(false)
    })
  }

  async function handleClickNode(node) {
    if(node.tag === "Root")
      return
    setItemListaSelecionado(node.resource)
    await pesquisaSparql(node.resource)
  }

  async function handleClickItemLista(itemLista) {
    setItemListaSelecionado(itemLista)

    // TODO setResultadoPesquisaResourceVisibility(false)

    await pesquisaSparql(itemListaSelecionado).then( () =>{
        gerarGrafo()
    })
  }

  async function handleRecarregarGrafo(){
    await pesquisaSparql(itemListaSelecionado).then( () =>{
        gerarGrafo()
    })
  }

  // TODO utilizar a pesquisaSparql desacoplada 
  //
  // function handleClickItemLista(itemLista) {
  //   pesquisaSparql(itemLista).then((resultado) => {
  //     const PesquisaSparql = resultado
  //     setResultadoPesquisaSparql(PesquisaSparql)
  //   })
  // }

  async function pesquisaSparql(itemLista) {
    await pesquisaSparqlFrom(itemLista).then(  
      await pesquisaSparqlTo(itemLista)
    )
  }

  async function pesquisaSparqlFrom(itemLista) {
    const resource = itemLista
    const base = "https://dbpedia.org/sparql"
    const defaultGraphUri = encodeURIComponent(`default-graph-uri=http://dbpedia.org`).replaceAll("%3D", "=")
    const query = encodeURIComponent(`query=select+?ResourceFrom+?page+where+{+?ResourceFrom+dbo:wikiPageWikiLink+<${resource}>+.+?page+foaf:primaryTopic+?ResourceFrom+}`).replaceAll("%2B","+").replaceAll("%3D", "=")
    const format = "format=" + encodeURIComponent("application/sparql-results+json").replaceAll("%2D", "-")
    const timeout = "timeout=3000"
    const signalVoid = "signal_void=on"
    const signalUnconnected = "signal_unconnected=on"

    const url = base + "?" + defaultGraphUri + "&" + query + "&" + format + "&" + timeout + "&" + signalVoid + "&" + signalUnconnected
    
    try {
      await axios.get(url).then( resposta => {
        setResultadoPesquisaSparqlFrom(resposta.data.results.bindings)
      })
    } catch(e) {
      console.log(e)
    }
  }

  async function pesquisaSparqlTo(itemLista) {
    const resource = itemLista
    const base = "https://dbpedia.org/sparql"
    const defaultGraphUri = encodeURIComponent(`default-graph-uri=http://dbpedia.org`).replaceAll("%3D", "=")
    const query = encodeURIComponent(`query=select+?ResourceTo+?page+where+{+<${resource}>+dbo:wikiPageWikiLink+?ResourceTo+.+?page+foaf:primaryTopic+?ResourceTo+}`).replaceAll("%2B","+").replaceAll("%3D", "=")
    const format = "format=" + encodeURIComponent("application/sparql-results+json").replaceAll("%2D", "-")
    const timeout = "timeout=3000"
    const signalVoid = "signal_void=on"
    const signalUnconnected = "signal_unconnected=on"

    const url = base + "?" + defaultGraphUri + "&" + query + "&" + format + "&" + timeout + "&" + signalVoid + "&" + signalUnconnected
    
    try {
      await axios.get(url).then( resposta => {
        setResultadoPesquisaSparqlTo(resposta.data.results.bindings)
      })
    } catch(e) {
      console.log(e)
    }
  }

  //TODO Desacoplar geração do grafo

  function gerarGrafo() {
    if(resultadoPesquisaSparqlFrom === [] || resultadoPesquisaSparqlTo === [])
      return

    let id = 0
    let nodes = []
    let links = []

    nodes.push({
      "id": id++,
      "name": `${itemListaSelecionado}`,
      "val": 2, //tamanho
      "color": "#8c92ac",
      "tag": "Root"
    })

    resultadoPesquisaSparqlFrom.forEach((elemento) => {
      links.push({
        "source": id,
        "target": 0
      })
      nodes.push({
        "id": id++,
        "name": `${elemento.page.value}`,
        "resource": `${elemento.ResourceFrom.value}`,
        "val": 2, //tamanho
        "color": "#1ea2a4",
        "tag": "From"
      })
    })

    resultadoPesquisaSparqlTo.forEach((elemento) => {
      links.push({
        "source": 0,
        "target": id
      })
      nodes.push({
        "id": id++,
        "name": `${elemento.page.value}`,
        "resource": `${elemento.ResourceTo.value}`,
        "val": 2, //tamanho
        "color": "#e35259",
        "tag": "To"
      })
    })

    setGrafo({
      "nodes": nodes,
      "links": links
    })
  }
}