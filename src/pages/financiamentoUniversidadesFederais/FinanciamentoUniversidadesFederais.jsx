
import "./financiamento.css";
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { NavigateNext } from '@mui/icons-material';

 const FinanciamentoUniversidadesFederais = (props) => {

  useEffect(() => {
      console.log('render')
    }
  )

  return (
    <Container className='container'>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} className='breadcrumbs'>
            <Link 
                component='h2' 
                variant="subtitle1" 
                underline="hover" 
                color="inherit" 
                href="/">
                Para saber mais
            </Link>
            <Link 
                component='h2' 
                variant="subtitle1"
                underline="hover"
                color="inherit"
                href="/Parlamentars"
                aria-current="page"
            >
                Financiamento das Universidades Federais
            </Link>
        </Breadcrumbs>
        <Paper elevation={2} style={{width: '100%', height: '100%'}} className='painel'>
            <Box style={{width: '100%', height: '70vh'}}>
                <Typography component='h3' variant='h6'>Financiamento das Universidades Federais</Typography>
                <Typography component='h4' variant='subtitle2' sx={{ fontStyle: 'italic' }}>"Como é feito?"</Typography>
                <img src=""></img>
                <Typography component='p' variant="body1">Saber mais</Typography>
            </Box>
        </Paper>
    </Container>
  );
}

export default FinanciamentoUniversidadesFederais;