import "./index.css";
import { Container, Paper, Typography, Box} from "@mui/material";
import React from "react";
import { comoFuncionaEmendasParlamentares, oQueSaoEmendasParlamentares } from "../../constants/mensagens";
import CaixaTexto from './../../components/caixaTexto/CaixaTexto';
import BreadcrumbsWithRouter from "../../components/BreadcrumbsWithRouter";
import { withRouter } from "react-router-dom";



const ParaSaberMais = (props) => {
  const history = props;
  return (
    <Container className='container'>
        <BreadcrumbsWithRouter links={[{texto: "Principal", endPagina: "/"},{texto: "Entendendo as Emendas", endPagina: "/SaberMais"}]} history={history} className={"breadcrumbs"}/>
        <Paper elevation={3} style={{width: '100%', height: 'max-content'}} className='painel'>
            <Box style={{width: '100%', height: 'max-content'}}>
                <Typography component='h2' variant='h4' style={{marginBottom: "5px"}} >Entendendo as Emendas</Typography>
                <Typography component='h4' variant='subtitle2' style={{marginBottom: "10px", color: "grey"}} fontStyle={"italic"}>Clique em uma das áreas azuis para visualizar a informação</Typography>
                <Typography component='h3' variant='h6' style={{marginBottom: "10px"}} >Emendas Parlamentares</Typography>
                <CaixaTexto titulo={"O que são"} corpo={
                  <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>
                    A emenda ao orçamento é um instrumento que permite a deputados e senadores realizarem alterações no Projeto de Lei Orçamentária Anual - o PLOA. Trata-se de um mecanismo que permite que estes parlamentares possam opinar e reivindicar reajustes orçamentários em função de seus compromissos políticos.
                  </Typography> 
                }/>
                <CaixaTexto titulo={"Como funcionam"} corpo={comoFuncionaEmendasParlamentares}/>
                <CaixaTexto titulo={"Tipos de Emendas"} corpo={<>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Existem quatro tipos de emendas ao orçamento federal: individuais, de bancada, de comissão e de relator.</Typography> 
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas individuais:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Emendas individuais são de autoria individual - tal como o nome sugere - de cada parlamentar, que pode sugerir até vinte e cinco emendas ao PLOA e estas devem seguir as exigências dispostas na Lei de Diretrizes Orçamentárias - a LDO (<i>Resolução 1/06 do Congresso Nacional, 2006</i>).</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de Bancada:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas de bancada, também conhecidas como emendas coletivas, são as de iniciativa de bancadas estaduais e regionais, composta por grupos de parlamentares de determinados estados, municípios ou regiões inteiras do território brasileiro (<i>Resolução 1/06 do Congresso Nacional, 2006</i>)</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de Comissão:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas de comissão são aquelas propostas pelas comissões técnicas e permanentes do Senado e da Câmara dos Deputados (<i>Resolução 1/06 do Congresso Nacional, 2006</i>).</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas da Relator:</Typography> 
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas da relator - ou de relatoria - são emendas sugeridas pelo relator geral escolhido anualmente dentre o corpo de deputados e senadores da câmara.</Typography>
                </>}/>
                <Typography component='h3' variant='h6' style={{marginBottom: "10px"}} >Orçamento das Universidades Federais</Typography>
                <CaixaTexto titulo={"Como é feito"} corpo={oQueSaoEmendasParlamentares}/>
                <CaixaTexto titulo={"Papel das Emendas no Orçamento das Universidades"} corpo={comoFuncionaEmendasParlamentares}/>
            </Box>
        </Paper>
    </Container>
  );
}

export default withRouter(ParaSaberMais);