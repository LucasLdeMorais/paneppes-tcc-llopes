import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Box } from "@mui/material";
import "./index.css"

export default function TabelaEmendasParlamentar({anoSelecionado, dadosEmendas}) {
    
    const ItemTabela = ({emenda, index}) => {
        return <Tooltip placement="bottom-start" title={`Clique para abrir o detalhamento da emenda ${emenda.ano}${emenda.nroEmenda} proposta pelo ${emenda.tipoAutor.toLowerCase()} ${emenda.autor}`}>
            <TableRow hover onClick={() => {window.open(`https://www.portaltransparencia.gov.br/emendas/detalhe?codigoEmenda=${emenda.ano}${emenda.nroEmenda}&ordenarPor=data&direcao=asc`, "_blank")}} button style={{cursor: "pointer", height: "min-content"}} key={index}>
                <TableCell className="listItem" style={{width: "200px"}}>{emenda.uo.substring(8,)}</TableCell>
                <TableCell className="listItem" style={{width: "200px"}}>{`${emenda.ano}${emenda.nroEmenda}`}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{`R$ ${emenda.empenhado},00`}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{`R$ ${emenda.pago},00`}</TableCell>
                <TableCell className="listItem" style={{width: "100px"}}>{emenda.ano}</TableCell>
                <TableCell className="listItem" style={{width: "150px"}}>{emenda.naturezaDespesa.replace(RegExp("^(.*?)-"), "")}</TableCell>
                <TableCell className="listItem" style={{width: "400px", textAlign: "left"}}>{emenda.acao.replace(RegExp("^(.*?)-"), "")}</TableCell>
            </TableRow>
        </Tooltip>
    }

    const Tabela = ({corpo}) => {
        return <TableContainer style={{overflow: "auto", maxHeight: "400px"}}>
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
        if (dadosEmendas.length === 0) {
            return <Box className='box-tabela-vazia'>
                <Typography component='h5' variant='h6' style={{}}>Não há registro de emendas</Typography>
            </Box>
        }
        if (anoSelecionado) {
            const emendasFiltradas = dadosEmendas.filter(obj => obj.ano === parseInt(anoSelecionado) && (obj.pago > 0 || obj.empenhado > 0));
            return emendasFiltradas.length !== 0?
                <Tabela corpo={emendasFiltradas.map((emenda, index) => { return <ItemTabela emenda={emenda} index={index}/> })}/> :
                <Box className='box-tabela-vazia'>
                    <Typography component='h5' variant='h6' style={{}}>Não há registro de emendas para o ano selecionado</Typography>
                </Box>
        }

        const itensTabela = dadosEmendas.filter(obj => obj.pago > 0 || obj.empenhado > 0).map((emenda, index) => { 
            return <ItemTabela emenda={emenda} index={index}/> 
        })

        return <Tabela corpo={itensTabela}/>
    }

    return <RenderTabela />
}
