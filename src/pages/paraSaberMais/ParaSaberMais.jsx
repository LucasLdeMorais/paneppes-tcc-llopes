import "./index.css";
import { ArrowDownward, NavigateNext } from '@mui/icons-material'
import { Container, Paper, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText, IconButton } from "@mui/material";
import React, { useState } from "react";
import { comoFuncionaEmendasParlamentares, oQueSaoEmendasParlamentares, tiposEmendasParlamentares } from "../../mensagens";
import CaixaTexto from './../../components/caixaTexto/CaixaTexto';



const ParaSaberMais = () => {
  return (
    <Container className='container'>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} className='breadcrumbs'>
            <Link 
                component='h2' 
                variant="subtitle1" 
                underline="hover" 
                color="inherit" 
                href="/">
                Entendendo as Emendas
            </Link>
        </Breadcrumbs>
        <Paper elevation={3} style={{width: '100%', height: 'max-content'}} className='painel'>
            <Box style={{width: '100%', height: 'max-content'}}>
                <Typography component='h2' variant='h4' style={{marginBottom: "5px"}} >Entendendo as Emendas</Typography>
                <Typography component='h4' variant='subtitle2' style={{marginBottom: "10px", color: "grey"}} fontStyle={"italic"}>Clique em uma das áreas azuis para visualizar a informação</Typography>
                <Typography component='h3' variant='h6' style={{marginBottom: "10px"}} >Emendas Parlamentares</Typography>
                <CaixaTexto titulo={"O que são"} corpo={oQueSaoEmendasParlamentares}/>
                <CaixaTexto titulo={"Como funcionam"} corpo={comoFuncionaEmendasParlamentares}/>
                <CaixaTexto titulo={"Tipos de Emendas"} corpo={tiposEmendasParlamentares}/>
                <Typography component='h3' variant='h6' style={{marginBottom: "10px"}} >Orçamento das Universidades Federais</Typography>
                <CaixaTexto titulo={"Como é feito"} corpo={oQueSaoEmendasParlamentares}/>
                <CaixaTexto titulo={"Papel das Emendas no Orçamento das Universidades"} corpo={comoFuncionaEmendasParlamentares}/>
            </Box>
        </Paper>
    </Container>
  );
}

export default ParaSaberMais;