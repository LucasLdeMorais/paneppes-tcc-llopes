import React, {useState} from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import { 
  PermIdentity,
  AttachMoney,
  AccountBalance,
  Analytics,
  Person,
  Info,
  Code,
  CurrencyExchange,
  ChevronLeft,
  ChevronRight
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
      text: "Parlamentares",
      icon: <PermIdentity />,
      onClick: () => history.push("/Parlamentares")
    }],
    saberMais: [{
      text: "Emendas",
      icon: <CurrencyExchange />,
      onClick: () => history.push("/SaberMais/EmendasParlamentares")
    },
    {
      text: "Financiamento do Ensino Superior",
      icon: <AttachMoney />,
      onClick: () => history.push("/SaberMais/Financiamento")
    }],
    infoAdicionais: [{
      text: "Sobre o Painel",
      icon: <Info />,
      onClick: () => history.push("/Sobre")
    },{
      text: "Código-fonte",
      icon: <Code />,
      onClick: () => history.push("/CodigoFonte")
    }]
  };
  
  return (
    <MUIDrawer open={props.aberto} variant="temporary" className='drawer' sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '224px' },
    }}>
      <Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <IconButton onClick={props.fechaGaveta}>
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
      </Box>
    </MUIDrawer>
  );
};

export default withRouter(Sidebar);