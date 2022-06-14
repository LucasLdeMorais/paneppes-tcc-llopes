import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Universidades from "./pages/universidades/Universidades";
import { Box, Container } from "@mui/material";

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
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
