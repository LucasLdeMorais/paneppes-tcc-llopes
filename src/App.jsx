import "./App.css";
import React, { useState, lazy, Suspense} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

const Universidades = lazy(() => import("./pages/universidades/Universidades"));
const PainelComparativo = lazy(() => import("./pages/painelComparativo/PainelComparativo"));
const Parlamentares = lazy(() => import("./pages/parlamentares/Parlamentares"));
const ParaSaberMais = lazy(() => import("./pages/paraSaberMais/ParaSaberMais"));
const FonteDosDados = lazy(() => import("./pages/fonteDosDados/FonteDosDados"));
const Home = lazy(() => import("./pages/home/Home"));

function App() {
  const [aberto, setAberto] = useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const handleAbrirGaveta = (e) => {
    e.preventDefault();
    setAberto(true);
  };

  const handleFecharGaveta = (e) => {
    e.preventDefault();
    setAberto(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Topbar aberto={aberto} abreGaveta={handleAbrirGaveta} />
          <Sidebar aberto={aberto} fechaGaveta={handleFecharGaveta} />
          <Container component="div" sx={{ flexGrow: 1, p: 3 }} className={"container-application"} style={{marginTop: '20px'}}>
            <Switch>
              <Suspense fallback={
                <Box className='carregando-pagina-app'>
                  <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                  <Typography component='h5' variant='h6' style={{}}>Carregando...</Typography>
                </Box>
              }>
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
                <Route path="/FonteDosDados">
                  <FonteDosDados />
                </Route>
              </Suspense>
            </Switch>
          </Container>
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
