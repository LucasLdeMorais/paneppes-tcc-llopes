import { React, useState, useEffect } from "react"
import BarraPesquisa from './components/Pesquisa/BarraPesquisa';
import ListaResultados from "./components/ListaResultados/ListaResultados";
import pesquisaSparql from "./pesquisaSparql"
import { Container, CircularProgress } from "@material-ui/core"
import axios from "axios"

export default function App() {
  const [resultadoPesquisaResource, setResultadoPesquisaResource] = useState(false)
  const [resultadoPesquisaSparql, setResultadoPesquisaSparql] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    console.log(resultadoPesquisaSparql)
  })

  return (
    <div className="App">
        <Container component="article" maxWidth="sm">
          <BarraPesquisa aoEnviar={pesquisa}/>
          { loading ? <CircularProgress style={{marginLeft: "50%", marginTop: "0"}}/> : 
            <ListaResultados resultados={resultadoPesquisaResource} handleClickItemLista={handleClickItemLista}/>
          }
        </Container>
    </div>
  );

  async function pesquisa(palavraChave) {
    try {
      setResultadoPesquisaResource(false)
      setLoading(true)
      let resposta = await axios.get('http://lookup.dbpedia.org/api/search', {
        params: {
          format: "JSON",
          query: palavraChave
        }
      })
      setResultadoPesquisaResource(resposta.data.docs)
      setLoading(false)
    } catch(e){
      console.log(e)
    }
  }

  function handleClickItemLista(itemLista) {
    pesquisaSparql(itemLista).finally((result) => {
      setResultadoPesquisaSparql(result)
    })
  }

  // async function pesquisaSparql(itemLista) {
  //   await pesquisaSparqlFrom(itemLista)
  //   await pesquisaSparqlTo(itemLista)
  // }

  // async function pesquisaSparqlFrom(itemLista) {
  //   const resource = itemLista.resource[0]
  //   const base = "https://dbpedia.org/sparql"
  //   const defaultGraphUri = encodeURIComponent(`default-graph-uri=http://dbpedia.org`).replaceAll("%3D", "=")
  //   const query = encodeURIComponent(`query=select+?ResourceFrom+?page+where+{+?ResourceFrom+dbo:wikiPageWikiLink+<${resource}>+.+?page+foaf:primaryTopic+?ResourceFrom+}`).replaceAll("%2B","+").replaceAll("%3D", "=")
  //   const format = "format=" + encodeURIComponent("application/sparql-results+json").replaceAll("%2D", "-")
  //   const timeout = "timeout=3000"
  //   const signalVoid = "signal_void=on"
  //   const signalUnconnected = "signal_unconnected=on"

  //   const url = base + "?" + defaultGraphUri + "&" + query + "&" + format + "&" + timeout + "&" + signalVoid + "&" + signalUnconnected
    
  //   try {
  //     let resposta = await axios.get(url)
  //     setResultadoPesquisaSparqlFrom(resposta.data.results.bindings)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  // async function pesquisaSparqlTo(itemLista) {
  //   const resource = itemLista.resource[0]
  //   const base = "https://dbpedia.org/sparql"
  //   const defaultGraphUri = encodeURIComponent(`default-graph-uri=http://dbpedia.org`).replaceAll("%3D", "=")
  //   const query = encodeURIComponent(`query=select+?ResourceTo+?page+where+{+<${resource}>+dbo:wikiPageWikiLink+?ResourceTo+.+?page+foaf:primaryTopic+?ResourceTo+}`).replaceAll("%2B","+").replaceAll("%3D", "=")
  //   const format = "format=" + encodeURIComponent("application/sparql-results+json").replaceAll("%2D", "-")
  //   const timeout = "timeout=3000"
  //   const signalVoid = "signal_void=on"
  //   const signalUnconnected = "signal_unconnected=on"

  //   const url = base + "?" + defaultGraphUri + "&" + query + "&" + format + "&" + timeout + "&" + signalVoid + "&" + signalUnconnected
    
  //   try {
  //     let resposta = await axios.get(url)
  //     setResultadoPesquisaSparqlTo(resposta.data.results.bindings)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
  
}
