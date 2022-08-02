import Chart from "../../components/graficos/GraficosGrandes/chart/Chart";
import "./painel.css";
import { NavigateNext, AddTwoTone, CloseTwoTone } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Box, IconButton,
    Link, Breadcrumbs, CardContent, CardActionArea, List, ListItem, ListItemText, CircularProgress, Tooltip, Select, MenuItem }
    from "@mui/material";
import React, { useEffect, useState } from "react";
import { axios } from 'axios';
import api from '../../services/api'
import GraficoTorta from "../../components/graficos/GraficosPequenos/pieChart/GraficoTorta";
import { useListState } from "@mantine/hooks";
import PainelCriacao from './../../components/paineis/PainelCriacao';
import Painel from "../../components/paineis/Painel";
import GraficoComparativoAno from './../../components/graficos/GraficosGrandes/graficoComprativoAno/GraficoComparativoAno';

export default function PainelComparativo(props) {
    
    const [ listaPaineis, updateListaPaineis ] = useListState([
        {
            titulo: "Titulo",
            componente: <GraficoTorta/>,
            tamanho: "pequeno"
        },
        {
            titulo: "Titulo",
            componente: <GraficoTorta/>,
            tamanho: "pequeno"
        },
        {
            titulo: "Titulo",
            componente: <GraficoTorta/>,
            tamanho: "pequeno"
        }
    ])
    const [ universidade, setUniversidade ] = useState(null)
    const [ listaUniversidades, setListaUniversidades ] = useListState([])
    const [ universidadesSelecionadas, setUniversidadesSelecionadas ] = useListState([])
    const [ autocompleteAberto, setAutocompleteAberto ] = useState(false)
    const [ anoSelecionado, setAnoSelecionado ] = useState(0)
    const loading = autocompleteAberto && listaUniversidades.length === 0;

    const listaComponentes = [
        {
            componente: <GraficoTorta />, 
            titulo: "torta", 
            key: "torta"
        }
    ]

    useEffect(()=> {
        if (listaUniversidades.length === 0){
            recuperaListaUniversidades()
        }
    }, [])

    async function recuperaListaUniversidades() {
        await api.get('/universidades').then((response) => { setListaUniversidades.setState(response.data) })
    }

    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
    }

    function handleSelecionarUniversidade(universidade) {
        if(!(universidadesSelecionadas.includes(universidade))) {
            setUniversidadesSelecionadas.append(universidade)
        }
        console.log(universidadesSelecionadas)
    }

    function handleSelectComponente(tituloComponente) {
        listaComponentes.forEach((item) => {
            if(item.titulo === tituloComponente) {
                return item.componente
            }
        })
        return <></>
    }

    return (
        <Container className='container'>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} className='breadcrumbs'>
                <Link
                    component='h2'
                    variant="subtitle1"
                    underline="hover"
                    color="inherit"
                    href="/">
                    Principal
                </Link>
                <Link
                    component='h2'
                    variant="subtitle1"
                    underline="hover"
                    color="inherit"
                    href="/Painel"
                    aria-current="page"
                >
                    Painel Comparativo
                </Link>
            </Breadcrumbs>
            <Grid container spacing={2} >
                <Box style={{width: "100%"}}>
                    <Autocomplete
                        id="combo-box-universidades"
                        style={{float: "left", width: "94%", marginTop: "15px",marginLeft: "15px"}}
                        open={autocompleteAberto}
                        onOpen={ (event) => { setAutocompleteAberto(true)} }
                        onClose={ (event) => { setAutocompleteAberto(false)} }
                        onChange={(event, value) => {
                            setUniversidade(value)
                        }}
                        loading={ loading }
                        value={universidade}
                        options={listaUniversidades}
                        getOptionLabel={(option) => `${option.nome}`}
                        noOptionsText="vazio"
                        filterOptions={(x) => x}
                        renderInput={(params) => <TextField {...params} 
                            label="Universidades Federais"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                        />}
                        renderOption={(props, listaUniversidades) => (
                            <Box component="li" {...props} key={listaUniversidades._id}>
                                {listaUniversidades.nome} - {listaUniversidades.sigla}
                            </Box>
                        )}
                    />
                    <IconButton style={{float: "right", marginTop: "22px"}} onClick={() => { handleSelecionarUniversidade(universidade) }}>
                        <AddTwoTone></AddTwoTone>
                    </IconButton>
                </Box>
                <Painel tamanho={"grande"} grid dataKey="Active User" style={{height: "min-content", marginBottom: "50px"}} componente={
                    <Box style={{}}>
                        <Chart data={{}} style={{marginTop: "10px"}}/>
                    </Box>
                } titulo={"Grafico"} />
                {
                    listaPaineis.map((item, indice) => {
                        return <Painel titulo={ item.titulo } tamanho={ "grande" } componente={ <div className="charts"><GraficoTorta/><GraficoTorta/></div> } indice={ indice } />
                    })
                }
                {/* { 
                    (listaPaineis.length <= 6)? <PainelCriacao adicionarItem={updateListaPaineis.append} listaComponentes={listaComponentes}/> : <></>
                } */}
            </Grid>
        </Container>
    );
}
