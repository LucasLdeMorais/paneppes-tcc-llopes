import { React, useState, useEffect } from "react"
import BarraPesquisa from './components/Pesquisa/BarraPesquisa';
import ListaResultados from "./components/ListaResultados/ListaResultados";
import RecursosGrafo from "./components/RecursosGrafo/RecursosGrafo"
// TODO utilizar a pesquisaSparql desacoplada 
// import pesquisaSparql from "./pesquisaSparql"
import pesquisaResource from "./pesquisaResource";
import { Container, CircularProgress } from "@material-ui/core"
import axios from "axios"
import ForceGraph2D from "react-force-graph-2d";

export default function App() {
  const [resultadoPesquisaResource, setResultadoPesquisaResource] = useState(false)
  // const [resultadoPesquisaSparql, setResultadoPesquisaSparql] = useState(false)
  const [resultadoPesquisaSparqlFrom, setResultadoPesquisaSparqlFrom] = useState([])
  const [resultadoPesquisaSparqlTo, setResultadoPesquisaSparqlTo] = useState([])
  const [itemListaSelecionado, setItemListaSelecionado] = useState("")
  const [onlyTo, setOnlyTo] = useState(false)
  const [onlyFrom, setOnlyFrom] = useState(false)
  const [loadingLista, setLoadingLista] = useState(false)
  const [loadingGrafo, setLoadingGrafo] = useState(false)
  const [grafo, setGrafo] = useState({ nodes: [], links: [] })

  useEffect ( () => {
    console.log(grafo)
    console.log(grafo)
  })

  return (
    <div className="App">
      <Container component="article" maxWidth="lg">
        <RecursosGrafo handleRecarregarGrafo={handleRecarregarGrafo} handleOnlyTo={handleOnlyTo} handleOnlyFrom={handleOnlyFrom} handleAllNodes={handleAllNodes}/>
        <Container component="article" maxWidth="sm">
          <BarraPesquisa aoEnviar={handleSubmitResource}/>
          { loadingLista ? <CircularProgress style={{marginLeft: "50%", marginTop: "0"}}/> : 
            <ListaResultados resultados={resultadoPesquisaResource} handleClickItemLista={handleClickItemLista} />
          }
        </Container>
      </Container>
      {  loadingGrafo ? <CircularProgress style={{marginLeft: "50%", marginTop: "10%"}}/> :
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
            onNodeRightClick = { node => {
              handleNodeRightClick(node)
            }}
          />
          // TODO <Grafo data={grafo} handleClickNode={handleClickNode}/>
        }
    </div>
  );

  function handleSubmitResource(palavraChave) {
    if(palavraChave === false || palavraChave === "")
      return
    setLoadingLista(true)

    // TODO setVisibilityGrafo(false)

    pesquisaResource(palavraChave).then((resultado) => {
      const Resource = resultado
      setResultadoPesquisaResource(Resource)
      setLoadingLista(false)
    })
  }

  async function handleClickNode(node) {
    if(node.tag === "Root")
      return
    setLoadingGrafo(true)
    setItemListaSelecionado(node.resource)
    await pesquisaSparql(itemListaSelecionado).then( () =>{
      gerarGrafo()
    })
    gerarGrafo()
    setLoadingGrafo(false)
  }

  function handleNodeRightClick(node) {
    window.open(node.url, '_blank').blur()
  }

  async function handleClickItemLista(itemLista) {
    setItemListaSelecionado(itemLista)
    setResultadoPesquisaResource(false)
    setLoadingGrafo(true)
    await pesquisaSparql(itemListaSelecionado).then( () =>{
      gerarGrafo()
    })
    gerarGrafo()
    setLoadingGrafo(false)
  }

  async function handleRecarregarGrafo(event){
    event.preventDefault()
    await pesquisaSparql(itemListaSelecionado).then( () =>{
        gerarGrafo()
    })
  }

  function handleOnlyTo(event) {
    event.preventDefault()
    setOnlyTo(true)
    if(setOnlyFrom)
      setOnlyFrom(false)
    gerarGrafo()
  }

  function handleOnlyFrom (event) {
    event.preventDefault()
    setOnlyFrom(true)
    if(setOnlyTo)
      setOnlyTo(false)
    gerarGrafo()
  }

  function handleAllNodes(event) {
    event.preventDefault()
    setOnlyFrom(false)
    setOnlyTo(false)
    gerarGrafo()
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
      "name": `"${itemListaSelecionado.substr(itemListaSelecionado.lastIndexOf("/")+1).replaceAll("_"," ")}"`,
      "url": `${itemListaSelecionado}`,
      "val": 2, //tamanho
      "color": "#8c92ac",
      "tag": "Root"
    })

    if(onlyTo === false){
      resultadoPesquisaSparqlFrom.forEach((elemento) => {
        links.push({
          "source": id,
          "target": 0
        })
        nodes.push({
          "id": id++,
          "name": `"${elemento.page.value.substr(elemento.page.value.lastIndexOf("/")+1).replaceAll("_"," ")}" - Wikipedia page: ${elemento.page.value}`,
          "url": `${elemento.page.value}`,
          "resource": `${elemento.ResourceFrom.value}`,
          "val": 2, //tamanho
          "color": "#1ea2a4",
          "tag": "From"
        })
      })
    }

    if(onlyFrom === false){
      resultadoPesquisaSparqlTo.forEach((elemento) => {
        links.push({
          "source": 0,
          "target": id
        })
        nodes.push({
          "id": id++,
          "name": `"${elemento.page.value.substr(elemento.page.value.lastIndexOf("/")+1).replaceAll("_"," ")}" - Wikipedia page: ${elemento.page.value}`,
          "url": `${elemento.page.value}`,
          "resource": `${elemento.ResourceTo.value}`,
          "val": 2, //tamanho
          "color": "#e35259",
          "tag": "To"
        })
      })
    }

    setGrafo({
      "nodes": nodes,
      "links": links
    })
  }
}