import { React, useState, useEffect } from "react"
import BarraPesquisa from './components/Pesquisa/BarraPesquisa';
import ListaResultados from "./components/ListaResultados/ListaResultados";
// import pesquisaSparql from "./pesquisaSparql"
import pesquisaResource from "./pesquisaResource";
import { Container, CircularProgress } from "@material-ui/core"
import ForceGraph3D from "react-force-graph-3d";
import axios from "axios"

export default function App() {
  const [resultadoPesquisaResource, setResultadoPesquisaResource] = useState(false)
  // const [resultadoPesquisaSparql, setResultadoPesquisaSparql] = useState(false)
  const [resultadoPesquisaSparqlFrom, setResultadoPesquisaSparqlFrom] = useState([])
  const [resultadoPesquisaSparqlTo, setResultadoPesquisaSparqlTo] = useState([])
  const [itemListaSelecionado, setItemListaSelecionado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [grafo, setGrafo] = useState({ nodes: [], links: [] })

  useEffect(() => {
    console.log({"To": resultadoPesquisaSparqlTo,"From": resultadoPesquisaSparqlFrom})

    console.log(grafo)
  });

  return (
    <div className="App">
        <Container component="article" maxWidth="sm">
          <BarraPesquisa aoEnviar={handleSubmitResource}/>
          { loading && !(resultadoPesquisaResource) ? <CircularProgress style={{marginLeft: "50%", marginTop: "0"}}/> : 
            <ListaResultados resultados={resultadoPesquisaResource} handleClickItemLista={handleClickItemLista}/>
          }
          { grafo.nodes !== [] ?
            <ForceGraph3D
              graphData={grafo}
              nodeLabel="name"
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              linkCurvature={0.25}
              onNodeDragEnd={ node => {
                node.fx = node.x;
                node.fy = node.y;
                node.fz = node.z;
              }}
            /> : <CircularProgress style={{marginLeft: "50%", marginTop: "0"}}/>
          }
        </Container>
    </div>
  );

  function handleSubmitResource(palavraChave) {
    if(palavraChave === false)
      return
    setLoading(true)
    pesquisaResource(palavraChave).then((resultado) => {
      const Resource = resultado
      setResultadoPesquisaResource(Resource)
      setLoading(false)
    })
  }

  function handleClickItemLista(itemLista) {
    setItemListaSelecionado(itemLista)
    pesquisaSparql(itemLista).then( gerarGrafo() )
    
  }
  

  // function handleClickItemLista(itemLista) {
  //   pesquisaSparql(itemLista).then((resultado) => {
  //     const PesquisaSparql = resultado
  //     setResultadoPesquisaSparql(PesquisaSparql)
  //   })
  // }

  async function pesquisaSparql(itemLista) {
    await pesquisaSparqlFrom(itemLista).then( () => { 
      pesquisaSparqlTo(itemLista)
    })
    gerarGrafo()
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
      let resposta = await axios.get(url)
      setResultadoPesquisaSparqlFrom(resposta.data.results.bindings)
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
      let resposta = await axios.get(url)
      setResultadoPesquisaSparqlTo(resposta.data.results.bindings)
    } catch(e) {
      console.log(e)
    }
  }

  function gerarGrafo() {
    if(resultadoPesquisaSparqlFrom === [] || resultadoPesquisaSparqlTo === []) {
      return
    }

    let id = 0

    let nodes = []
    let links = []

    nodes.push({
      "id": id++,
      "name": `${itemListaSelecionado}`,
      "val": 2 //tamanho
    })
    resultadoPesquisaSparqlFrom.map((elemento) => {
      console.log(elemento.page.value)
      console.log(`id:${id}`)
      links.push({
        "source": id,
        "target": 0
      })
      nodes.push({
        "id": id++,
        "name": `${elemento.page.value}`,
        "val": 2 //tamanho
      })
      console.log(`id:${id}`)
    })
    resultadoPesquisaSparqlTo.map((elemento) => {
      links.push({
        "source": 0,
        "target": id
      })
      nodes.push({
        "id": id++,
        "name": `${elemento.page.value}`,
        "val": 2 //tamanho
      })
    })
    
    setGrafo({
      "nodes": nodes,
      "links": links
    })
  }
}
