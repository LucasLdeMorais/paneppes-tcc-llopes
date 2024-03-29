import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import React from 'react';

export default function ListaEmendas({anoSelecionado, dadosEmendas}) {
    
    const itemLista = (emenda, index) => {
        return <Tooltip arrow placement="bottom-start" title={`Clique para abrir o detalhamento da emenda ${emenda.ano}${emenda.nroEmenda} proposta pelo ${emenda.tipoAutor.toLowerCase()} ${emenda.autor}`}>
            <TableRow hover onClick={() => {window.open(`https://www.portaltransparencia.gov.br/emendas/detalhe?codigoEmenda=${emenda.ano}${emenda.nroEmenda}&ordenarPor=data&direcao=asc`, "_blank")}} button style={{cursor: "pointer", height: "min-content"}} key={index}>
                <TableCell className="listItem" style={{width: "200px"}}>{emenda.uo.substring(8,)}</TableCell>
                <TableCell className="listItem" style={{width: "200px"}}>{`${emenda.ano}${emenda.nroEmenda}`}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{`R$ ${emenda.empenhado.toLocaleString('pt-BR')}`}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{`R$ ${emenda.pago.toLocaleString('pt-BR')}`}</TableCell>
                <TableCell className="listItem" style={{width: "100px"}}>{emenda.ano}</TableCell>
                <TableCell className="listItem" style={{width: "100px"}}>{emenda.naturezaDespesa.replace(RegExp("^(.*?)-"), "")}</TableCell>
                <TableCell className="listItem" style={{width: "400px", textAlign: "left"}}>{emenda.acao.replace(RegExp("^(.*?)-"), "")}</TableCell>
            </TableRow>
        </Tooltip>
    }

    return (<TableContainer style={{overflow: "auto", maxHeight: "400px"}}>
        <Table stickyHeader>
            <TableHead style={{cursor: "default", textAlign: "left"}}>
                <TableRow>
                    <TableCell style={{width: "120px"}}>Universidade</TableCell>
                    <TableCell style={{width: "100px"}}>Nro. da Emenda</TableCell>
                    <TableCell style={{width: "90px"}}>Valor Empenhado</TableCell>
                    <TableCell style={{width: "90px"}}>Valor Pago</TableCell>
                    <TableCell style={{width: "20px"}}>Ano</TableCell>
                    <TableCell style={{width: "70px"}}>Natureza da despesa</TableCell>
                    <TableCell style={{width: "350px"}}>Ação</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/**
                 *  ? O que fazer quando vazio pra determinado ano
                 */
                 }
                {
                    dadosEmendas.length > 0? 
                        anoSelecionado?
                            dadosEmendas.filter(obj => obj.ano === parseInt(anoSelecionado) && (obj.pago > 0 || obj.empenhado > 0)).map((emenda, index) => { return itemLista(emenda, index) }) : 
                            dadosEmendas.filter(obj => obj.pago > 0 || obj.empenhado > 0).map((emenda, index) => { return itemLista(emenda, index) }) :
                    <></>
                }
            </TableBody>
        </Table>
    </TableContainer>)
}
