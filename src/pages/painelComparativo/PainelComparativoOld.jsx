import Chart from "../../components/graficos/GraficosGrandes/chart/Chart";
import "./painel.css";
import { NavigateNext, Add, Close } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Box, IconButton,
    Link, Breadcrumbs, CardContent, CardActionArea, List, ListItem, ListItemText, CircularProgress, Tooltip, Select, MenuItem }
    from "@mui/material";
import React, { useEffect, useState } from "react";
import api from '../../services/api'
import GraficoTorta from "../../components/graficos/GraficosPequenos/pieChart/GraficoTorta";
import { useListState } from "@mantine/hooks";
import PainelCriacao from '../../components/paineis/PainelCriacao';
import Painel from "../../components/paineis/Painel";
import GraficoComparativoAno from '../../components/graficos/GraficosGrandes/graficoComprativoAno/GraficoComparativoAno';

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
    const [ emendas, setEmendas ] = useListState([])
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
        if (listaUniversidades.length === 0) {
            recuperaListaUniversidades()
        }
    }, [listaUniversidades, recuperaListaUniversidades, setListaUniversidades])

    async function recuperaListaUniversidades() {
        const arr = []
        await api.get('/universidades').then((response) => { setListaUniversidades.setState(...response.data) })
        return arr
    }

    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
    }

    function handleSelecionarUniversidade(universidade) {
        if(!(universidadesSelecionadas.includes(universidade)) && universidade !== null) {
            setUniversidadesSelecionadas.append(universidade)
            setEmendas.setState(getDadosEmendasUniversidades(universidadesSelecionadas))
            console.log(emendas)
        }
    }

    function handleSelectComponente(tituloComponente) {
        listaComponentes.forEach((item) => {
            if(item.titulo === tituloComponente) {
                return item.componente
            }
        })
        return <></>
    }

    async function getDadosEmendasUniversidade(universidade) {
        const EmendasUniversidade = []
        await api.get(`/emendas/uo?uo=${universidade.uo}`).then(res => {
            EmendasUniversidade.push(...res.data.emendas)
        })
        return EmendasUniversidade
    }
      
    async function getDadosEmendasUniversidades(universidades) {
        const EmendasUniversidades = []
        universidades.forEach((universidade) => {
            EmendasUniversidades.push(getDadosEmendasUniversidade(universidade))
        })
        setEmendas.setState(EmendasUniversidades)
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
                            universidadesSelecionadas.push(value)
                        }}
                        loading={ loading }
                        value={universidade}
                        options={listaUniversidades}
                        getOptionLabel={(option) => `${option.nome}`}
                        noOptionsText="vazio"
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
                        <Add></Add>
                    </IconButton>
                </Box>
                <Painel tamanho={"grande"} grid dataKey="Active User" style={{height: "min-content", marginBottom: "50px"}} componente={
                    <Box style={{}}>
                        <GraficoComparativoAno data={emendas} universidades={listaUniversidades} style={{marginTop: "10px"}}/>
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
