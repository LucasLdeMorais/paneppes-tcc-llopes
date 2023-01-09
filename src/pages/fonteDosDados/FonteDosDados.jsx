import "./fonteDosDados.css";
import { Container, Paper, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Link, TableContainer} from "@mui/material";
import React from "react";
import { comoFuncionaEmendasParlamentares, oQueSaoEmendasParlamentares } from "../../constants/mensagens";
import CaixaTexto from '../../components/caixaTexto/CaixaTexto';
import BreadcrumbsWithRouter from "../../components/BreadcrumbsWithRouter";
import { withRouter } from "react-router-dom";



const FonteDosDados = (props) => {
    const history = props;
    const acoes = [
        "20RK",
        "20GK",
        "8282",
        "15R3",
        "4002",
        "0487",
        "152X",
        "20X8",
        "21D8",
        "7XE3",
        "157D",
        "156Y",
        "14XN",
        "2A82",
        "4909",
        "4086"
    ]
    return (
        <Container className='container'>
            <BreadcrumbsWithRouter links={[{texto: "Principal", endPagina: "/"},{texto: "Entendendo as Emendas", endPagina: "/SaberMais"}]} history={history} className={"breadcrumbs"}/>
            <Paper elevation={3} style={{width: '100%', height: 'max-content'}} className='painel'>
                <Box style={{width: '100%', height: 'max-content'}}>
                    <Typography component='h2' variant='h4' style={{marginBottom: "5px"}} >Fonte das Informações</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                        Todos os dados levantados sobre emendas parlamentares destinadas a universidades federais foram obtidas através do <Link style={{cursor: "pointer"}} onClick={() => window.open("https://www1.siop.planejamento.gov.br/QvAJAXZfc/opendoc.htm?document=IAS%2FExecucao_Orcamentaria.qvw&host=QVS%40pqlk04&anonymous=true&sheet=SH06", '_blank').focus()}>Painel do Orçamento</Link> do Sistema Integrado de Orçamento e Planejamento - o SIOP.
                        A filtragem dos dados foi feita com base nas ações orçamentárias. São estas:
                    </Typography>
                    <TableContainer style={{maxHeight: "300px", overflow: "auto", margin: "10px 0 25px 0"}}>
                        <Table stickyHeader>
                            <TableHead style={{cursor: "default", textAlign: "left"}}>
                                <TableRow>
                                    <TableCell style={{width: "120px"}}>Código de Ação Orçamentária</TableCell>
                                    <TableCell style={{width: "100px"}}>Descrição</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {acoes.map(acao => {
                                    return <TableRow>
                                        <TableCell style={{width: "120px"}}>{acao}</TableCell>
                                        <TableCell style={{width: "100px"}}>Descrição</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                        Informações adicionais sobre as emendas foram obtidas a partir dos sites oficiais do Senado e da Câmara dos Deputados
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default withRouter(FonteDosDados);