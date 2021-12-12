import { React, useState, useEffect } from "react"
import BarraPesquisa from './components/Pesquisa/BarraPesquisa';
import ListaResultados from "./components/ListaResultados/ListaResultados";
// import pesquisaSparql from "./pesquisaSparql"
import pesquisaResource from "./pesquisaResource";
import { Container, CircularProgress } from "@material-ui/core"
import { SigmaContainer } from "react-sigma-v2";
import "react-sigma-v2/lib/react-sigma-v2.css";
import axios from "axios"

export default function App() {
  const [resultadoPesquisaResource, setResultadoPesquisaResource] = useState(false)
  const [resultadoPesquisaSparqlFrom, setResultadoPesquisaSparqlFrom] = useState(false)
  const [resultadoPesquisaSparqlTo, setResultadoPesquisaSparqlTo] = useState(false)
  const [loading, setLoading] = useState(false);

  // "nodes": [
  //   {
  //     "key": "0.0",
  //     "attributes": {
  //       "x": 268.72385,
  //       "y": 91.18155,
  //       "size": 22.714287,
  //       "label": "Myriel",
  //       "color": "#D8482D"
  //     }
  //   }
  // ]

  // "edges": [
  //   {
  //     "key": "0",
  //     "source": "1.0",
  //     "target": "0.0",
  //     "attributes": {
  //       "size": 1
  //     }
  //   }
  // ]


  useEffect(() => { 
    console.log(resultadoPesquisaSparqlFrom)
    console.log(resultadoPesquisaSparqlTo)
  })

  return (
    <div className="App">
        <Container component="article" maxWidth="sm">
          <BarraPesquisa aoEnviar={handleSubmitResource}/>
          { loading ? <CircularProgress style={{marginLeft: "50%", marginTop: "0"}}/> : 
            <ListaResultados resultados={resultadoPesquisaResource} handleClickItemLista={handleClickItemLista}/>
          }
        </Container>
    </div>
  );

  function handleSubmitResource(palavraChave) {
    setLoading(true)
    pesquisaResource(palavraChave).then((resultado) => {
      const Resource = resultado
      setResultadoPesquisaResource(Resource)
      setLoading(false)
    })
  }


  function handleClickItemLista(itemLista) {
    pesquisaSparql(itemLista)
  }

  // async function pesquisaResource(palavraChave) {
  //   try {
  //     setResultadoPesquisaResource(false)
  //     setLoading(true)
  //     let resposta = await axios.get('http://lookup.dbpedia.org/api/search', {
  //       params: {
  //         format: "JSON",
  //         query: palavraChave
  //       }
  //     })
  //     setResultadoPesquisaResource(resposta.data.docs)
  //     setLoading(false)
  //   } catch(e){
  //     console.log(e)
  //   }
  // }

  // Para o PesquisaSparqlV2
  //  function handleClickItemLista(itemLista) {
  //   pesquisaSparql(itemLista).finally((result) => {
  //     setResultadoPesquisaSparql(result)
  //   })
  // }

  async function pesquisaSparql(itemLista) {
    await pesquisaSparqlFrom(itemLista)
    await pesquisaSparqlTo(itemLista)
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
}
