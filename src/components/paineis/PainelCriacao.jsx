import "./painel.css";
import { AddTwoTone } from '@mui/icons-material'
import { Grid, Paper, Typography, IconButton, Select, MenuItem}
    from "@mui/material";
import React, { useState } from "react";
import { TextInput } from "@mantine/core";

export default function PainelCriacao({ adicionarItem, listaComponentes }) {
    const [ tamanho, setTamanho ] = useState(null)
    const [ titulo, setTitulo ] = useState(null)
    const [ componente, setComponente ] = useState(null)

    function limparStates(){
        setTamanho(null)
        setTitulo(null)
        setComponente(null)
    }

    return <Grid item xs={4}>
        <Paper className='painelCriacao' elevation={0}>
            <Typography component='h3' variant='h6' style={{marginTop: 5, marginBottom: 2, color: "white"}} >Adicionar painel</Typography>
            <Select
                labelId="selecionarTamanho"
                id="selecionarTamanho"
                label="tamanho"
                value={tamanho}
                helperText="Tamanho"
                onChange={(e) => {
                    e.preventDefault();
                    setTamanho(e.target.value);
                }}
                style={{width: "90%"}}
                required
            >
                <MenuItem value={"pequeno"} key={"pequeno"}>Pequeno (um quadrado)</MenuItem>
                <MenuItem value={"medio"} key={"medio"}>Médio (dois quadrados)</MenuItem>
                <MenuItem value={"grande"} key={"grande"}>Grande (três quadrados)</MenuItem>
            </Select>
            <TextInput
                id="inputTitulo"
                helperText="Titulo"
                value={titulo}
                required
                onChange={(e) => {
                    e.preventDefault();
                    setTitulo(e.target.value);
            }}/>
            <Select
                required
                labelId="selecionarComponente"
                id="selecionarComponente"
                label="Componente"
                helperText="Componente"
                onChange={(e) => {
                    e.preventDefault();
                    setComponente(e.target.value);
                }}
                style={{width: "90%"}}
            >
            {
                listaComponentes.map((item) => {return <MenuItem value={item.componente} key={item.key}>Grafico Torta</MenuItem>})
            }
            </Select>
            <IconButton size="large" title="Adicionar painel" onClick={(e) => {
                    e.preventDefault();
                    console.log({
                        titulo: titulo,
                        tamanho: tamanho,
                        componente: componente
                    });
                    adicionarItem({
                        titulo: titulo,
                        tamanho: tamanho,
                        componente: componente
                    });
                }}>
                <AddTwoTone/>
            </IconButton>
        </Paper>
    </Grid>
}