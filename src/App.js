import React, { useState } from "react";
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

function App() {
  const [aberto, setAberto] = useState(false);

  const handleAbrirGaveta = () => {
    setAberto(true);
    console.log('Abrir:', aberto)
  };

  const handleFecharGaveta = () => {
    setAberto(false);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Topbar aberto={aberto} abreGaveta={handleAbrirGaveta} />
        <Sidebar aberto={aberto} fechaGaveta={handleFecharGaveta} />
        <Container component="div" sx={{ flexGrow: 1, p: 3 }} className={"container-application"} style={{marginTop: '20px'}}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Universidades">
              <Universidades />
            </Route>
            <Route path="/PainelComparativo">
              <PainelComparativo />
            </Route>
            <Route path="/Parlamentares">
              <Parlamentares />
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
