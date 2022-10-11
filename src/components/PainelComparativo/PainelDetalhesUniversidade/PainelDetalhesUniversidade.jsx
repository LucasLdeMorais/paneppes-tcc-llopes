import "./index.css"
import { Paper, Typography, Box, IconButton, Tooltip } from '@mui/material';
import Painel from '../../paineis/Painel';
import GraficoEmendasAcao from '../../graficos/GraficosPequenos/GraficoEmendasAcao/GraficoEmendasAcao';
import GraficoEmendasPartido from '../../graficos/GraficosPequenos/GraficoEmendasPartido';
import SeletorAnos from '../../seletorAnos/SeletorAnos';
import { useState } from 'react';
import { ArrowDownwardTwoTone, ArrowUpwardTwoTone } from '@mui/icons-material';
import ListaEmendas from '../../listaEmendas';
import GraficoEmendasNatureza from './../../graficos/GraficosPequenos/GraficoEmendasNatureza/GraficoEmendasNatureza';

// ? Filtragem por ano deve ser feita no componente pai e passar o array filtrado no emendasUniversidade

const PainelDetalhesUniversidade = ({titulo, handleRemover, indice, emendasUniversidade, anos }) => {
    const [ anoSelecionado, setAnoSelecionado ] = useState(0);
    const [ listaAberta, setListaAberta ] = useState(false);

    const BotaoLista = () => {
        return listaAberta? <Tooltip title={"Abrir tabela de emendas"}>
            <IconButton size={"small"} onClick={() => { setListaAberta(!listaAberta) }}>
                <ArrowUpwardTwoTone/>
            </IconButton>
        </Tooltip>: <Tooltip title={"Fechar tabela de emendas"}>
            <IconButton size={"small"} onClick={() => { setListaAberta(!listaAberta) }}>
                <ArrowDownwardTwoTone/>
            </IconButton>
        </Tooltip>
    }

    function handleSetAnoSelecionado(Ano) {
        setAnoSelecionado(Ano)
    }
    // TODO: Fazer pegar por ano
    const totalPago = emendasUniversidade.reduce((acc, obj) => {
        return acc + obj.pago
    }, 0)

    // TODO: Fazer pegar por ano
    const totalEmpenhado = emendasUniversidade.reduce((acc, obj) => {
        return acc + obj.empenhado
    }, 0)

    return (
        <Painel titulo={ titulo } header removivel removerItem={handleRemover} tamanho={ "grande" } componente={ 
            <>
                <Box id={"box-seletor-anos-painel-detalhes"}>
                    <SeletorAnos setAnoSelecionado={handleSetAnoSelecionado} anoSelecionado={anoSelecionado} anos={anos}/>
                </Box>
                <Box id={"box-graficos-painel-detalhes"}>
                    <GraficoEmendasPartido emendasUniversidade={emendasUniversidade} styleBox={{float: "left"}} styleGrafico={{width: "360px"}}  anoSelecionado={anoSelecionado}/>
                    <GraficoEmendasAcao emendasUniversidade={emendasUniversidade} styleBox={{float: "right"}} styleGrafico={{width: "450px"}} anoSelecionado={anoSelecionado}/>  
                </Box>
                <Box id={"box-cards-painel-detalhes"}>
                    <Paper elevation={2} style={{padding: "10px", width: "max-content"}}>
                        <Typography variant="h7" style={{}}>Total empenhado{anoSelecionado? ` ${anoSelecionado}`:""}: {totalEmpenhado.toLocaleString()}</Typography>
                    </Paper>
                    <Paper elevation={2} style={{padding: "10px", marginTop: "25px", width: "max-content"}}>
                        <Typography variant="h7" style={{}}>Total pago{anoSelecionado? ` ${anoSelecionado}`:""}: {totalPago.toLocaleString()}</Typography>
                    </Paper>
                </Box>
                <Box id={"tabela-painel-detalhes"}>
                    {
                        emendasUniversidade.filter(obj => obj.pago > 0).length > 0?
                            <BotaoLista/> : <Typography style={{width: "100%", textAlign: 'center', display: "block"}}>Sem emendas pagas</Typography>
                    }
                    {
                        listaAberta? <ListaEmendas dadosEmendas={emendasUniversidade} anoSelecionado={anoSelecionado}/> : <></>
                    }
                </Box>
            </>
        } indice={ indice } style={{height: "max-content"}} />
    )
}

export default PainelDetalhesUniversidade;