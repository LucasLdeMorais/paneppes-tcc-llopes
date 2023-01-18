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
        {identificador: "20X8",
        descricao: " Prestação de Ensino de Graduação e Pós-Graduação do Instituto Tecnológico de Aeronáutica - ITA"},
        {identificador: "20RK",
        descricao: "Funcionamento de Instituições Federais de Ensino Superior"},
        {identificador: "20RX",
        descricao: "Reestruturação e Modernização dos Hospitais Universitários Federais"},
        {identificador: "21D8",
        descricao: "Adequação e Modernização dos Hospitais Universitários Federais"},
        {identificador: "2A82",
        descricao: "Prestação de Ensino de Graduação e Pós-Graduação no Instituto Militar de Engenharia"},
        {identificador: "14XN",
        descricao: "Implantação da Universidade Federal do Oeste da Bahia - UFOB"},
        {identificador: "15R3",
        descricao: "Apoio à Expansão das Instituições Federais de Ensino Superior"},
        {identificador: "157D",
        descricao: "Implantação do Hospital Universitário da Universidade Federal de Goiás"},
        {identificador: "4086",
        descricao: "Funcionamento e Gestão de Instituições Hospitalares Federais"},
        {identificador: "4909",
        descricao: "Funcionamento de Cursos de Pós-Graduação em Botânica e Meio Ambiente"},
        {identificador: "7XE3",
        descricao: "Construção do Hospital Universitário do Sertão (HUS)"},
        {identificador: "8282",
        descricao: "Reestruturação e Modernização das Instituições Federais de Ensino Superior"},
        {identificador: "20GK",
        descricao: "Fomento às Ações de Graduação, Pós-Graduação, Ensino, Pesquisa e Extensão"},
        {identificador: "219V",
        descricao: "Apoio ao Funcionamento das Instituições Federais de Educação Superior"},
        {identificador: "152X",
        descricao: "Reestruturação e Modernização das Instituições Federais de Ensino Superior"}
    ]
    return (
        <Container className='container'>
            <BreadcrumbsWithRouter links={[{texto: "Principal", endPagina: "/"},{texto: "Entendendo as Emendas", endPagina: "/SaberMais"}]} history={history} className={"breadcrumbs"}/>
            <Paper elevation={3} style={{width: '100%', height: 'max-content'}} className='painel'>
                <Box style={{width: '100%', height: 'max-content'}}>
                    <Typography component='h2' variant='h4' style={{marginBottom: "5px"}} >Fonte das Informações</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                        Todos os dados levantados sobre emendas parlamentares destinadas a universidades federais foram obtidas através do <Link style={{cursor: "pointer"}} onClick={() => window.open("https://www1.siop.planejamento.gov.br/QvAJAXZfc/opendoc.htm?document=IAS%2FExecucao_Orcamentaria.qvw&host=QVS%40pqlk04&anonymous=true&sheet=SH06", '_blank').focus()}>Painel do Orçamento</Link> do Sistema Integrado de Orçamento e Planejamento - o SIOP.
                        A filtragem dos dados foi feita com base nas ações orçamentárias citadas na seção de educação do Manual de Emendas Orçamento da União para 2023 (Congresso Nacional, 2022) com a adição de outras ações associadas a instituições de ensino superior que não estão subordinadas ao ministerio da educação: o Istituto Militar de Engenharia, o Instituto Tecnológico da Aeronáturica e o Instituto de Pesquisas Jardim Botânico do Rio de Janeiro. São estas:
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
                                        <TableCell style={{width: "120px"}}>{acao.identificador}</TableCell>
                                        <TableCell style={{width: "100px"}}>{acao.descricao}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                        <b>Fontes:</b> <ul>
                            <li>
                                <a href="https://www.camara.leg.br/internet/comissao/index/mista/orca/orcamento/or2023/emendas/Manual_Emendas.pdf">Manual de Emendas. Orçamento da União para 2023, PLN 32/2022.</a> Congresso Nacional, 2022.
                            </li>
                            <li>
                                <a href="https://portaldatransparencia.gov.br/programas-e-acoes/busca/lista?termo=&letraInicial=&pagina=1&tamanhoPagina=10">Programas e Ações Orçamentárias.</a> Portal da transparência, Controladoria-Geral da União, 2022.
                            </li>
                        </ul>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default withRouter(FonteDosDados);