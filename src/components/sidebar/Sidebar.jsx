import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  ClickAwayListener
} from "@mui/material";
import { 
  AttachMoney,
  AccountBalance,
  Analytics,
  Code,
  ChevronLeft,
  CompareArrows,
  Groups,
  Source
} from "@mui/icons-material";
import { withRouter } from "react-router-dom";

const Sidebar = (props) => {
  const { history } = props;
  const itemsList = {
    principal: [{
      text: "Principal",
      icon: <Analytics />,
      onClick: () => history.push("/")
    },
    {
      text: "Universidades",
      icon: <AccountBalance />,
      onClick: () => history.push("/Universidades")
    },
    {
      text: "Painel Comparativo",
      icon: <CompareArrows />,
      onClick: () => history.push("/PainelComparativo")
    },
    {
      text: "Parlamentares",
      icon: <Groups />,
      onClick: () => history.push("/Parlamentares")
    }],
    saberMais: [{
      text: "Entendendo as Emendas",
      icon: <AttachMoney />,
      onClick: () => history.push("/SaberMais")
    }],
    infoAdicionais: [{
      text: "Fonte dos Dados",
      icon: <Source />,
      onClick: () => history.push("/FonteDosDados")
    },{
      text: "Código-fonte",
      icon: <Code />,
      onClick: () => window.open("https://github.com/LucasLdeMorais/lucas-lopes-tcc", '_blank').focus()
    }]
  };
  
  return (
    
    <MUIDrawer open={props.aberto} variant="temporary" className='drawer' sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '250px' },
    }}>
      <Box>
        <ClickAwayListener onClickAway={(e) => {props.fechaGaveta(e)}}>
          <List>
            <ListItem key="fecharGaveta">
              <ListItemIcon>
                <IconButton onClick={(e) => {props.fechaGaveta(e)}}>
                  <ChevronLeft />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary='Fechar'/>
            </ListItem>
            <ListItem key={'principal'}>
              <ListItemText primary={'Painéis'}/>
            </ListItem>
            {itemsList.principal.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText secondary={text} />
                </ListItem>
              );
            })}
            <Divider />
            <ListItem key={'paraSaberMais'}>
              <ListItemText primary={'Para saber mais'} />
            </ListItem>
            {itemsList.saberMais.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText secondary={text} />
                </ListItem>
              );
            })}
            <Divider />
            <ListItem key={'infoAdicionais'}>
              <ListItemText primary={'Informações adicionais'} />
            </ListItem>
            {itemsList.infoAdicionais.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText secondary={text}/>
                </ListItem>
              );
            })}
          </List>
        </ClickAwayListener>
      </Box>
    </MUIDrawer>
  );
};

export default withRouter(Sidebar);