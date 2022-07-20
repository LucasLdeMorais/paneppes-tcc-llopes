import "./emendasParlamentares.css";
import { NavigateNext } from '@mui/icons-material'
import { Container, Paper, Typography, Link, Breadcrumbs, Box, CardContent, CardActionArea, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const EmendasParlamentares = () => {
  return (
    <Container className='container'>
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} className='breadcrumbs'>
            <Link 
                component='h2' 
                variant="subtitle1" 
                underline="hover" 
                color="inherit" 
                href="/">
                Para saber mais
            </Link>
            <Link 
                component='h2' 
                variant="subtitle1"
                underline="hover"
                color="inherit"
                href="/Parlamentars"
                aria-current="page"
            >
                Emendas Parlamentares
            </Link>
        </Breadcrumbs>
        <Paper elevation={2} style={{width: '100%', height: '100%'}} className='painel'>
            <Box style={{width: '100%', height: '70vh'}}>
                <Typography component='h3' variant='h6'>Emendas Parlamentares</Typography>
                <Typography component='h4' variant='subtitle2' sx={{ fontStyle: 'italic' }}>"O que são?"</Typography>
                <img src=""></img>
                <Typography component='p' variant="body1">De acordo com o Glossário Legislativo disponível no portal oficial do Senado, a emenda ao orçamento é um instrumento que permite a deputados e senadores realizarem alterações no Projeto de Lei Orçamentária Anual - o PLOA (Agência Senado). Trata-se de um mecanismo que permite que estes parlamentares possam opinar e reivindicar reajustes orçamentários em função de seus compromissos políticos.</Typography>
                <Typography component='p' variant="body1">Existem quatro tipos de emendas: individuais, de bancada, de comissão e de relator. Emendas individuais são de autoria individual - tal como o nome sugere - de cada parlamentar, que pode sugerir até vinte e cinco emendas ao PLOA e estas devem seguir as exigências dispostas na Lei de Diretrizes Orçamentárias - a LDO (Resolução 1/06 do Congresso Nacional, 2006).</Typography> 
                <Typography component='p' variant="body1">As emendas de bancada, também conhecidas como emendas coletivas, são as de iniciativa de bancadas estaduais e regionais, composta por grupos de parlamentares de determinados estados, municípios ou regiões inteiras do território brasileiro (Resolução 1/06 do Congresso Nacional, 2006). Já as emendas de comissão são aquelas propostas pelas comissões técnicas e permanentes do Senado e da Câmara dos Deputados (Resolução 1/06 do Congresso Nacional, 2006).</Typography>  
                <Typography component='p' variant="body1">As emendas da relatoria - ou de relator - são emendas sugeridas pelo relator geral escolhido anualmente dentre o corpo de deputados e senadores da câmara.</Typography>
            </Box>
        </Paper>
    </Container>
  );
}

export default EmendasParlamentares;