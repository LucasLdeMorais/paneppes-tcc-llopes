import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Universidades from "./pages/universidades/Universidades";
import EmendasParlamentares from "./pages/emendasParlamentares/EmendasParlamentares";
import { Box, Container } from "@mui/material";
import Parlamentares from "./pages/parlamentares/Parlamentares";
import FinanciamentoUniversidadesFederais from "./pages/financiamentoUniversidadesFederais/FinanciamentoUniversidadesFederais";

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
        <Container component="main" sx={{ flexGrow: 1, p: 3 }} style={{marginTop: '20px'}}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Universidades">
              <Universidades />
            </Route>
            <Route path="/Parlamentares">
              <Parlamentares />
            </Route>
            <Route path="/SaberMais/EmendasParlamentares">
              <EmendasParlamentares />
            </Route>
            <Route path="/SaberMais/FinanciamentoUniversidadesFederais">
              <FinanciamentoUniversidadesFederais />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
