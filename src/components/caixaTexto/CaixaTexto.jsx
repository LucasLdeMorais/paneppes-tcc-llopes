import "./index.css";
import React from 'react';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Close, ExpandMore } from '@mui/icons-material';
import { Paper } from '@mui/material';

export default function CaixaTexto({titulo, corpo}) {

    const [mostrarConteudo, setMostrarConteudo] = useState(false);

    function handleMostrarConteudo(event) {
        event.preventDefault();
        setMostrarConteudo(!mostrarConteudo)
    }

    return <Paper className={"box-caixa-texto"} elevation={3}>
        {mostrarConteudo? <Close onClick={(e) => handleMostrarConteudo(e)} className={"icone-header-caixa-texto"}/> : <ExpandMore onClick={(e) => handleMostrarConteudo(e)} className={"icone-header-caixa-texto"}/>}
        <Box className={mostrarConteudo? "header-caixa-texto" : "header-caixa-texto-fechado"} onClick={(e) => handleMostrarConteudo(e)}>
            <Typography className={"titulo-caixa-texto"} component='h4' variant='h6'>{titulo}</Typography>
        </Box>
        { mostrarConteudo? <Box className={"box-corpo-caixa-texto"} style={{padding: "10px"}}>
                {corpo}
            </Box> : 
        <></> }
    </Paper>
    
}