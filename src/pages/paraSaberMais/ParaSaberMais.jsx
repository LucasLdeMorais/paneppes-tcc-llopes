import "./index.css";
import { Container, Paper, Typography, Box} from "@mui/material";
import React from "react";
import { comoFuncionaEmendasParlamentares, oQueSaoEmendasParlamentares } from "./../../constants/mensagens/paraSaberMais";
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
                    De acordo com o <a href="https://www12.senado.leg.br/noticias/glossario-legislativo/emendas-ao-orcamento">Glossário Legislativo</a> disponível no portal oficial do Congresso Nacional, disponível no portal oficial do Senado, a emenda ao orçamento é um instrumento que permite a deputados e senadores realizarem correções sobre o PLOA. Trata-se de um mecanismo que permite que estes parlamentares possam opinar e reivindicar reajustes orçamentários em função de suas promessas e objetivos políticos.
                  </Typography> 
                }/>
                <CaixaTexto titulo={"Como funcionam"} corpo={<Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>{comoFuncionaEmendasParlamentares}</Typography>}/>
                <CaixaTexto titulo={"Tipos de Emendas (Natureza do Reajuste)"} corpo={<>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Emendas parlamentares são, essencialmente correções sugeridas ao Projeto de Lei Orçamentária Anual (PLOA). Estas correções estão sujeitas às regras aplicavéis ao tipo de reajuste sugerido. São 3 tipos de reajuste:</Typography> 
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de apropriação:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Emendas de apropriação sugerem o aumento de dotação em programação existente no PLOA ou inclusão de nova programação e,como fonte de recursos, a anulação de dotações da Reserva de Recursos ou de outras definidas no Parecer Preliminar (Manual de Emendas Orçamento da União para 2023, Congresso Nacional, 2022).</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de remanejamento:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Emendas de remanejamento sugerem aumento de dotação em programação existente no PLOA ou inclusão de nova programação e, como fonte exclusiva de recursos, a anulação de dotações constantes do projeto de lei, exceto as da Reserva de Contingência (Manual de Emendas Orçamento da União para 2023, Congresso Nacional, 2022).</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de cancelamento:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas de cancelamento sugerem a redução de dotações do projeto, em outras palavras, cancelamento de dotações (Manual de Emendas Orçamento da União para 2023, Congresso Nacional, 2022).</Typography>
                </>}/>
                <CaixaTexto titulo={"Tipos de Emendas (Autoria)"} corpo={<>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Existem quatro tipos de emendas parlamentares ao orçamento federal no que diz respeito à autoria destas emendas: individuais, de bancada, de comissão e de relator.</Typography> 
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas individuais:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Emendas individuais são de autoria individual - tal como o nome sugere - de cada parlamentar, que pode sugerir até vinte e cinco emendas ao PLOA e estas devem seguir as exigências dispostas na Lei de Diretrizes Orçamentárias - a LDO (<i>Resolução 1/06 do Congresso Nacional, 2006</i>).</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de Bancada:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas de bancada, também conhecidas como emendas coletivas, são as de iniciativa de bancadas estaduais e regionais, composta por grupos de parlamentares de determinados estados, municípios ou regiões inteiras do território brasileiro (<i>Resolução 1/06 do Congresso Nacional, 2006</i>)</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas de Comissão:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas de comissão são aquelas propostas pelas comissões técnicas e permanentes do Senado e da Câmara dos Deputados (<i>Resolução 1/06 do Congresso Nacional, 2006</i>).</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Emendas da Relator:</Typography> 
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>As emendas da relator - ou de relatoria - são emendas sugeridas pelo relator geral escolhido anualmente dentre o corpo de deputados e senadores da câmara (<i>Resolução 1/06 do Congresso Nacional, 2006</i>).</Typography>
                </>}/>
                <CaixaTexto titulo={"Etapas da Execução Orçamentária das Emendas"} corpo={<>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Entende-se como execução da despesa pública o processo de realização das despesas previstas na LOA. Este processo se dá em três etapas: empenho, liquidação e pagamento, conforme descritas na lei nº 4.320/64.</Typography> 
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Empenho:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>A etapa de empenho ocorre quando o governo oficializa a obrigação de pagamento  de despesas quando um respectivo bem for entregue ou um serviço concluído.</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Liquidação:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Na etapa de liquidação é feito o levantamento e análise dos bens que foram entregues e dos serviços que foram prestados para instituições governamentais, com fim de atestar a conformidade destes com os títulos e documentos comprobatórios.</Typography>
                    <Typography component='p' variant="h6" style={{marginTop: "10px"}}>Pagamento:</Typography>
                    <Typography className={"corpo-caixa-texto"} component='p' variant="body1" textAlign={"justify"}>Na etapa de pagamento são emitidas as ordens de pagamento que determinam que a despesa será paga. Aqui, vale destacar que os valores empenhados para pagamento mas que porventura ainda não foram pagos, ficam declarados como restos a pagar e poderão ser pagos em exercícios posteriores.</Typography>
                </>}/>
            </Box>
        </Paper>
    </Container>
  );
}

export default withRouter(ParaSaberMais);