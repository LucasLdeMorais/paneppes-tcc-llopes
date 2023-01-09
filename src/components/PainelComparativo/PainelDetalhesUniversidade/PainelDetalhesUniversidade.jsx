import "./index.css";
import React from 'react';
import { Paper, Typography, Box, IconButton, Tooltip, ClickAwayListener } from '@mui/material';
import Painel from '../../paineis/Painel';
import GraficoEmendasAcao from '../../graficos/GraficosPequenos/GraficoEmendasAcao/GraficoEmendasAcao';
import GraficoEmendasPartido from '../../graficos/GraficosPequenos/GraficoEmendasPartido';
import SeletorAnos from '../../seletorAnos/SeletorAnos';
import { useState } from 'react';
import { ArrowDownward, ArrowUpward, Help } from '@mui/icons-material';
import ListaEmendas from '../../tabelas/listaEmendas';
import { Button } from '@mui/material';

// ? Filtragem por ano deve ser feita no componente pai e passar o array filtrado no emendasUniversidade

const PainelDetalhesUniversidade = ({titulo, handleRemover, indice, emendasUniversidade, anos }) => {
    const [ anoSelecionado, setAnoSelecionado ] = useState("2022");
    const [ listaAberta, setListaAberta ] = useState(false);
    const [ statusAjudaPainelComparativo, setStatusAjudaPainelComparativo ] = useState(false);

    const BotaoLista = () => {
        return listaAberta? <Tooltip arrow title={"Fechar tabela de emendas"}>
            <Button startIcon={<ArrowUpward/>} size={"small"} onClick={() => { setListaAberta(!listaAberta) }}>
                Fechar tabela de emendas
            </Button>
        </Tooltip>: <Tooltip arrow title={"Abrir tabela de emendas"}>
            <Button startIcon={<ArrowDownward/>} size={"small"} onClick={() => { setListaAberta(!listaAberta) }}>
                Abrir tabela de emendas
            </Button>
        </Tooltip>
    }

    function handleSetAnoSelecionado(Ano) {
        console.log(Ano)
        setAnoSelecionado(Ano)
    }

    const totalPago = emendasUniversidade.reduce((acc, obj) => {
        if (anoSelecionado) {
            if(obj.ano === parseInt(anoSelecionado)){
                return acc + obj.pago
            }
            return acc
        } else {
            return acc + obj.pago
        }
    }, 0)


    const totalEmpenhado = emendasUniversidade.reduce((acc, obj) => {
        if (anoSelecionado) {
            if(obj.ano === parseInt(anoSelecionado)){
                return acc + obj.empenhado
            }
            return acc
        } else {
            return acc + obj.empenhado
        }
    }, 0)

    const emendas = anoSelecionado !== 0? emendasUniversidade.filter(ele => ele.ano === parseInt(anoSelecionado)) : emendasUniversidade

    function abrirAjudaPainelDetalhesUniversidade() {
        setStatusAjudaPainelComparativo(true)
    }

    function fecharAjudaPainelDetalhesUniversidade() {
        setStatusAjudaPainelComparativo(false)
    }

    const AjudaPainelDetalhesUniversidade = ({open, abrir, fechar}) => {
        return  <Box style={{float: "right"}}>
          <ClickAwayListener onClickAway={fechar}>
            <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} onClose={fechar} title={<React.Fragment>
                <Typography color="inherit">Como utilizar:</Typography>
                <Typography variant='subtitle2' color="inherit">Selecionar Ano:</Typography>
                {"Selecione um ano na barra de seleção abaixo para que os gráficos mostrem os dados referentes a emendas pagas no ano selecionado."}
                <Typography variant='subtitle2' color="inherit">Remover Universidade:</Typography>
                {"Para Remover, desça a tela até o painel da espectiva universidade e clique no símbolo \"x\" no cabeçalho (em azul)."}
                <Typography variant='subtitle2' color="inherit">Abrir Tabela de Emendas da Universidade:</Typography>
                {"Clique no botão escrito \"Abrir tabela de emendas\" logo abaixo dos gráficos de pizza. Para fechar, bastar clicar no botão novamente."}
                <hr/>
                <u>{'Link para guia completo'}</u>
            </React.Fragment>} placement='right'>
                <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Box>
    }

    return (
        <Painel titulo={ titulo } subtitulo={"Passe o cursor do mouse sobre as fatias do gráfico visualizar os respectivos valores"}tooltip={<AjudaPainelDetalhesUniversidade abrir={abrirAjudaPainelDetalhesUniversidade} fechar={fecharAjudaPainelDetalhesUniversidade} open={statusAjudaPainelComparativo}/>} header removivel removerItem={handleRemover} tamanho={ "grande" } componente={ 
            <>
                <Box id={"box-seletor-anos-painel-detalhes"}>
                    <SeletorAnos setAnoSelecionado={handleSetAnoSelecionado} anoSelecionado={anoSelecionado} anos={anos}/>
                </Box>
                <Box id={"box-cards-painel-detalhes"}>
                    <Paper elevation={2} style={{padding: "10px", width: "max-content", display: "inline-block"}}>
                        <Typography variant="subtitle1" style={{}}><b>Total empenhado{anoSelecionado? ` ${anoSelecionado}`:""}:</b> {`R$ ${totalEmpenhado.toLocaleString()}`}</Typography>
                    </Paper>
                    <Paper elevation={2} style={{padding: "10px", width: "max-content", display: "inline-block", marginLeft: "15px"}}>
                        <Typography variant="subtitle1" style={{}}><b>Total pago{anoSelecionado? ` ${anoSelecionado}`:""}:</b> {`R$ ${totalPago.toLocaleString()}`}</Typography>
                    </Paper>
                </Box>
                <Box id={"box-graficos-painel-detalhes"}>
                    <GraficoEmendasPartido titulo={"Emendas pagas por partido"} emendasUniversidade={emendas} styleBox={{float: "left", width: "500px"}} styleGrafico={{maxHeight: "250px"}}  anoSelecionado={anoSelecionado}/>
                    <GraficoEmendasAcao titulo={"Emendas pagas por ação"} emendasUniversidade={emendas} styleBox={{float: "right", width: "500px", marginLeft: "20px"}} styleGrafico={{maxHeight: "250px"}}  anoSelecionado={anoSelecionado}/>  
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