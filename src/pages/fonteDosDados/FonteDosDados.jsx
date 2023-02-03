import "./fonteDosDados.css";
import { Container, Paper, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Link, TableContainer, CircularProgress} from "@mui/material";
import React from "react";
import BreadcrumbsWithRouter from "../../components/BreadcrumbsWithRouter";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { useQuery } from "react-query";



const FonteDosDados = (props) => {
    const history = props;
    const {isLoading: carregandoUniversidades, isError: temErroUniversidades, error: erroUniversidades, data: dadosUniversidades} = useQuery("recuperaListaUniversidades", 
        async () => { 
            const response = await api.get('/universidades');
            return response.data;
        }
    );

    const GeraListaUO = () => {
        if(dadosUniversidades === undefined){
            if(carregandoUniversidades){
            return <Box className='box-grafico-grande-vazio-universidades'>
                <CircularProgress color="inherit" size={40} style={{marginBottom:"20px"}}/>
                <Typography component='h5' variant='h6' style={{}}>Carregando Lista...</Typography>
            </Box>
            } else if(temErroUniversidades) {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6' style={{color: "red"}}>Erro ao baixar dados sobre Unidades Orçamentárias</Typography>
            </Box>
            } else {
            return <Box className='box-grafico-grande-vazio-universidades'>
                <Typography component='h5' variant='h6'>Lista Vazia</Typography>
            </Box>
            }
        } else {
            return dadosUniversidades.map(universidade => {
                return <TableRow>
                    <TableCell style={{width: "120px"}}>{universidade.uo}</TableCell>
                    <TableCell style={{width: "120px"}}>{universidade.sigla}</TableCell>
                    <TableCell style={{width: "100px"}}>{universidade.nome}</TableCell>
                </TableRow>
            })
        }
    }

    return (
        <Container className='container'>
            <BreadcrumbsWithRouter links={[{texto: "Principal", endPagina: "/"},{texto: "Entendendo as Emendas", endPagina: "/SaberMais"}]} history={history} className={"breadcrumbs"}/>
            <Paper elevation={3} style={{width: '100%', height: 'max-content'}} className='painel'>
                <Box style={{width: '100%', height: 'max-content'}}>
                    <Typography component='h2' variant='h4' style={{marginBottom: "5px"}} >Fonte das Informações</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                        Todos os dados levantados sobre emendas parlamentares destinadas a universidades federais foram obtidas através do <Link style={{cursor: "pointer"}} onClick={() => window.open("https://www1.siop.planejamento.gov.br/QvAJAXZfc/opendoc.htm?document=IAS%2FExecucao_Orcamentaria.qvw&host=QVS%40pqlk04&anonymous=true&sheet=SH06", '_blank').focus()}>Painel do Orçamento</Link> do Sistema Integrado de Orçamento e Planejamento - o SIOP.
                        A filtragem dos dados foi feita com base nos identificadores de unidades orçamentárias, disponíveis no portal oficial da <a href="https://www.andifes.org.br/?p=85000">Associação Nacional dos Dirigentes das Instituições Federais de Ensino Superior</a> (ANDIFES).
                    </Typography>
                    <TableContainer style={{maxHeight: "300px", margin: "10px 0 25px 0"}}>
                        <Table stickyHeader>
                            <TableHead style={{cursor: "default", textAlign: "left"}}>
                                <TableRow>
                                    <TableCell style={{width: "120px"}}>Código de Unidade Orçamentária</TableCell>
                                    <TableCell style={{width: "70px"}}>Sigla</TableCell>
                                    <TableCell style={{width: "100px"}}>Nome</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{overflow: "auto"}}>
                                <GeraListaUO/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                        <b>Fontes oficiais utilizadas:</b> <ul>
                            <li>
                                <a href="https://www.camara.leg.br/internet/comissao/index/mista/orca/orcamento/or2023/emendas/Manual_Emendas.pdf">Manual de Emendas. Orçamento da União para 2023, PLN 32/2022.</a> Congresso Nacional, 2022.
                            </li>
                            <li>
                                <a href="https://portaldatransparencia.gov.br/programas-e-acoes/busca/lista?termo=&letraInicial=&pagina=1&tamanhoPagina=10">Programas e Ações Orçamentárias.</a> Portal da transparência, Controladoria-Geral da União, 2022.
                            </li>
                            <li>
                                <a href="https://www.andifes.org.br/?p=85000">Associação Nacional dos Dirigentes das Instituições Federais de Ensino Superior</a>
                            </li>
                            <li>
                                <a href="https://www2.senado.leg.br/bdsf/bitstream/handle/id/581601/Glossario_termos_legisla
                                    tivos_2.ed.pdf">Glossário de Termos Legislativos
                                </a>  - Grupo de Trabalho Permanente de Integração da Câmara dos Deputados com o Senado Federal
                            </li>
                            <li>
                                <a href="https://bd.camara.leg.br/bd/bitstream/handle/bdcamara/40193/glossario_termos_orcam
                                    entarios.pdf">Glossário de Termos Orçamentários
                                </a>  - Grupo de Trabalho Permanente de Integração da Câmara dos Deputados com o Senado Federal
                            </li>
                        </ul>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default withRouter(FonteDosDados);