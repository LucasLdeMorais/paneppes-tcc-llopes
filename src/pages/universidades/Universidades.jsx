import "./universidades.css";
import { dadosEmendas } from "../../dummyData";
import { NavigateNext } from '@mui/icons-material'
import { Container, Grid, Paper, Autocomplete, TextField, Typography, Box,
    Link, Breadcrumbs, CardContent, CardActionArea, List, ListItem, ListItemText, CircularProgress, Tooltip }
    from "@mui/material";
import React, { useEffect, useState } from "react";
import EmendasPorAno from "../../components/graficos/GraficosGrandes/emendasPorAno/EmendasPorAno";
import GraficoEmendasAcao from "../../components/graficos/GraficosPequenos/GraficoEmendasAcao/GraficoEmendasAcao";

export default function Universidades(props) {
  const [ universidade, setUniversidade ] = useState(null)
  const [ listaUniversidades, setListaUniversidades ] = useState([])
  const [ autocompleteAberto, setAutocompleteAberto ] = useState(null)
  const [ anoSelecionado, setAnoSelecionado ] = useState(0)
  const loading = autocompleteAberto && listaUniversidades.length === 0;

    // useEffect(() => { setListaUniversidades([
    //     {
    //         _id: "62bfa47e475cf2cc4e1ff3ae",
    //         uo: 26250,
    //         sigla: "UFRR",
    //         nome: "Universidade Federal de Roraima"
    //     },
    //     {
    //         _id: "62bfa47e475cf2cc4e1ff3af",
    //         uo: 26249,
    //         sigla: "UFRRJ",
    //         nome: "Universidade Federal Rural do Rio de Janeiro"
    //     }
    // ]) }, [setListaUniversidades])
    useEffect(() => { console.log(anoSelecionado) }, [anoSelecionado])

    function handleSetListaUniversidade(value) {
        setListaUniversidades(value);
    }

    function handleSetAutocompleteAberto(value) {
        setAutocompleteAberto(value);
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
                    href="/Universidades"
                    aria-current="page"
                >
                    Universidades
                </Link>
            </Breadcrumbs>
            <Paper className='paperAutocomplete'>
            <Autocomplete
                id="combo-box-universidades"
                open={autocompleteAberto}
                onOpen={() => { setAutocompleteAberto(true) }}
                onClose={() => { setAutocompleteAberto(false) }}
                loading={loading}
                value={universidade}
                options={[
                    {
                        "_id": "62bfa47e475cf2cc4e1ff3ae",
                        "uo": 26250,
                        "sigla": "UFRR",
                        "nome": "Universidade Federal de Roraima"
                    },
                    {
                        "_id": "62bfa47e475cf2cc4e1ff3af",
                        "uo": 26249,
                        "sigla": "UFRRJ",
                        "nome": "Universidade Federal Rural do Rio de Janeiro"
                    }
                ]}
                getOptionLabel={(option) => `${option.nome}`}
                noOptionsText="vazio"
                renderInput={(params) => <TextField {...params} 
                    label="Universidades Federais"
                    // InputProps={{
                    //     ...params.InputProps,
                    //     endAdornment: (
                    //     <React.Fragment>
                    //         {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    //         {params.InputProps.endAdornment}
                    //     </React.Fragment>
                    //     ),
                    // }}
                />}
                renderOption={(props, listaUniversidades) => (
                    <Box component="li" {...props} key={listaUniversidades._id}>
                        {listaUniversidades.nome} - {listaUniversidades.sigla}
                    </Box>
                )}
            />
            </Paper>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Paper className='painelGrafico' elevation={2}>
                        <Typography component='h3' variant='h6' style={{marginBottom:10}}>Gráfico</Typography>
                        <EmendasPorAno />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="center" className='containerAnos'>
                        <Grid item xs={3.5} ></Grid>
                        {[2015, 2016, 2017, 2018, 2019, 2020, 2021].map((Ano, index) => (
                            <Grid item xs={1} key={index}>
                                <Paper className='seletorAnos' elevation={3}>
                                    <CardActionArea style={{height: 50, width: '100%', padding: '10px'}} onClick={(event) => {
                                        event.preventDefault()
                                        if (Ano === anoSelecionado) {
                                            setAnoSelecionado(0)
                                        } else {
                                            setAnoSelecionado(Ano)
                                        }
                                    }}>
                                        <CardContent style={{padding: 0, textAlign:'center'}}>
                                            <Typography component="h3" variant="h6">{Ano}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Paper className='painel' elevation={2}>
                        {/* <Typography component="h3" variant="h6">Total da Despesa: 11.000.000</Typography>
                        <Typography component="h3" variant="h6">Total da Emendas: 1.000.000</Typography> */}
                        <Box>
                            <GraficoEmendasAcao />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className='painel' elevation={2}>
                    <Typography variant="h6" component="h3" style={{marginBottom:10}}>Texto</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className='painel' elevation={2}>
                        {
                            (anoSelecionado != 0)? <Typography variant="h6" component="h3" style={{marginBottom:10}}>Emendas no ano de {anoSelecionado}</Typography> :
                            <Typography variant="h6" component="h3" style={{marginBottom:10}}>Emendas</Typography>
                        }
                        <ListItem button style={{cursor: "default", textAlign: "left"}}>
                            <ListItemText style={{width: "120px"}}>Autor</ListItemText>
                            <ListItemText style={{width: "80px"}}>Valor pago</ListItemText>
                            <ListItemText style={{width: "20px"}}>Ano</ListItemText>
                            <ListItemText style={{width: "100px"}}>Natureza da despesa</ListItemText>
                            <ListItemText style={{width: "350px"}}>Ação</ListItemText>
                        </ListItem>
                        <List style={{overflow: "auto", height: '70%', width: "100%"}}>
                            {dadosEmendas.map((emenda, index) => (
                            <ListItem button style={{cursor: "default"}} key={index}>
                                <ListItemText className="listItem" style={{width: "200px"}}>{emenda.autor}</ListItemText>
                                <ListItemText className="listItem" style={{width: "150px"}}>{`R$ ${emenda.pago},00`}</ListItemText>
                                <ListItemText className="listItem" style={{width: "100px"}}>{emenda.ano}</ListItemText>
                                <ListItemText className="listItem" style={{width: "150px"}}>{emenda.naturezaDespesa.replace(RegExp("^(.*?)-"), "")}</ListItemText>
                                <Tooltip title={emenda.acao}>
                                    <ListItemText className="listItem" style={{width: "400px"}}>{emenda.acao.replace(RegExp("^(.*?)-"), "")}</ListItemText>
                                </Tooltip>
                            </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
