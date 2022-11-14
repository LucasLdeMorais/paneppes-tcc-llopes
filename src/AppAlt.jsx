import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Universidades from "./pages/universidades/Universidades";
import PainelComparativo from "./pages/painelComparativo/PainelComparativo";
import EmendasParlamentares from "./pages/emendasParlamentares/EmendasParlamentares";
import { Box, Container } from "@mui/material";
import Parlamentares from "./pages/parlamentares/Parlamentares";
import FinanciamentoUniversidadesFederais from "./pages/financiamentoUniversidadesFederais/FinanciamentoUniversidadesFederais";
import ParaSaberMais from './pages/paraSaberMais/ParaSaberMais';
import { recuperaListaEmendas, recuperaListaUniversidades } from "./services/emendasService";

function App() {
  const [aberto, setAberto] = useState(false);
  const [emendas, setEmendas] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const shouldGetEmendas = useRef(true);
  const shouldGetUniversidades = useRef(true);

  const handleAbrirGaveta = () => {
    setAberto(true);
    console.log('Abrir:', aberto)
  };

  const handleFecharGaveta = () => {
    setAberto(false);
  };

  async function handleRecuperaListaEmendas() {
    const emendasResponse = await recuperaListaEmendas();
    if(emendasResponse.statusCode === 200){
      setEmendas(emendasResponse.data);
    }
    return emendasResponse.statusCode;
  }

  async function handleRecuperaListaUniversidades() {
    const universidadesResponse = await recuperaListaUniversidades();
    if(universidadesResponse.statusCode === 200){
      setUniversidades.setState(universidadesResponse.data);
    }
    return universidadesResponse.statusCode;
  }

  async function handleData(){
    if(shouldGetEmendas.current){
      const status = await handleRecuperaListaEmendas()
      if (status === 200) {
        shouldGetEmendas.current = false;
      }
    }
    if(shouldGetUniversidades.current){
      const status = await handleRecuperaListaUniversidades()
      if (status === 200) {
        shouldGetUniversidades.current = false;
      }
    }
  };

  useEffect(() => {
    if(shouldGetEmendas.current && shouldGetUniversidades.current) {
      handleData();
    }
  },)

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Topbar aberto={aberto} abreGaveta={handleAbrirGaveta} />
        <Sidebar aberto={aberto} fechaGaveta={handleFecharGaveta} />
        <Container component="div" sx={{ flexGrow: 1, p: 3 }} className={"container-application"} style={{marginTop: '20px'}}>
          <Switch>
            <Route exact path="/">
              <Home listaEmendas={emendas} listaUniversidades={universidades}/>
            </Route>
            <Route path="/Universidades">
              <Universidades listaEmendas={emendas} listaUniversidades={universidades}/>
            </Route>
            <Route path="/PainelComparativo">
              <PainelComparativo listaEmendas={emendas} listaUniversidades={universidades}/>
            </Route>
            <Route path="/Parlamentares">
              <Parlamentares listaEmendas={emendas}/>
            </Route>
            <Route path="/SaberMais">
              <ParaSaberMais />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
