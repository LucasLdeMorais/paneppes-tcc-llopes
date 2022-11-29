import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Box } from "@mui/material";
import "./index.css";
import React from 'react';

export default function TabelaEmendasParlamentar({anoSelecionado, dadosEmendas, anos, selecionaAno}) {
    
    const ItemTabela = ({emenda, index}) => {
        return <Tooltip arrow placement="bottom-start" title={`Clique para abrir o detalhamento da emenda ${emenda.ano}${emenda.nroEmenda} proposta pelo ${emenda.tipoAutor.toLowerCase()} ${emenda.autor}`}>
            <TableRow hover onClick={() => {window.open(`https://www.portaltransparencia.gov.br/emendas/detalhe?codigoEmenda=${emenda.ano}${emenda.nroEmenda}&ordenarPor=data&direcao=asc`, "_blank")}} button style={{cursor: "pointer", height: "min-content"}} key={index}>
                <TableCell className="listItem" style={{width: "200px"}}>{emenda.uo.substring(8,)}</TableCell>
                <TableCell className="listItem" style={{width: "200px"}}>{`${emenda.ano}${emenda.nroEmenda}`}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{`R$ ${emenda.empenhado.toLocaleString('pt-BR')}`}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{`R$ ${emenda.pago.toLocaleString('pt-BR')}`}</TableCell>
                <TableCell className="listItem" style={{width: "100px"}}>{emenda.ano}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{emenda.naturezaDespesa.replace(RegExp("^(.*?)-"), "")}</TableCell>
                <TableCell className="listItem" style={{width: "400px", textAlign: "left"}}>{emenda.acao.replace(RegExp("^(.*?)-"), "")}</TableCell>
            </TableRow>
        </Tooltip>
    }

    const Tabela = ({corpo}) => {
        return <TableContainer className={"table-container-tabela-emendas-parlamentar"}>
            <Table stickyHeader>
                <TableHead style={{cursor: "default", textAlign: "left"}}>
                    <TableRow>
                        <TableCell style={{width: "120px"}}>Universidade</TableCell>
                        <TableCell style={{width: "100px"}}>Nro. da Emenda</TableCell>
                        <TableCell style={{width: "90px"}}>Valor Empenhado</TableCell>
                        <TableCell style={{width: "90px"}}>Valor Pago</TableCell>
                        <TableCell style={{width: "20px"}}>Ano</TableCell>
                        <TableCell style={{width: "80px"}}>Natureza da despesa</TableCell>
                        <TableCell style={{width: "350px"}}>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {corpo}
                </TableBody>
            </Table>
        </TableContainer>
    }

    const RenderTabela = () => {
        let itensTabela;
        let emendasFiltradas;
        if (anoSelecionado) {
            emendasFiltradas = dadosEmendas.filter(obj => obj.ano === parseInt(anoSelecionado) && (obj.pago > 0 || obj.empenhado > 0));
        } else {
            emendasFiltradas = dadosEmendas.filter(obj => obj.pago > 0 || obj.empenhado > 0)
        }
        itensTabela = emendasFiltradas.map((emenda, index) => { return <ItemTabela emenda={emenda} index={index}/> });
        return itensTabela.length !== 0?
            <Tabela corpo={itensTabela}/> : 
            <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6'>Não há registro de emendas{ anoSelecionado && anoSelecionado !== 0? " para este ano" : ""}</Typography>
            </Box>
    }
    return <RenderTabela />
}
