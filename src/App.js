import { React, useState, useEffect } from "react"
import BarraPesquisa from './components/Pesquisa/BarraPesquisa';
import ListaResultados from "./components/ListaResultados/ListaResultados";
import { Container } from "@material-ui/core"
import axios from "axios"

export default function App() {
  const [resultadoBusca, setResultadoBusca] = useState(false)

  useEffect(() => { 
    console.log(resultadoBusca)
  })

  return (
    <div className="App">
        <Container component="article" maxWidth="sm">
          <BarraPesquisa aoEnviar={pesquisa}/>
          <div id="loader" style={{display: "none"}}>Loading...</div>
          <ListaResultados resultados={resultadoBusca} />
        </Container>
    </div>
  );

  async function pesquisa(palavraChave) {
    let resposta = await axios.get('http://lookup.dbpedia.org/api/search', {
      params: {
        format: "JSON",
        query: palavraChave
      }
    })
    setResultadoBusca(resposta.data.docs)
  }
}
