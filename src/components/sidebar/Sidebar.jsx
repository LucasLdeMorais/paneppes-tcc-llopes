import React, {useState} from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  IconButton
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
  ChevronLeft
} from "@mui/icons-material";
import { withRouter } from "react-router-dom";

const Sidebar = props => {
  const [open, setOpen] = useState(true);
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
    saberMais: [{},{}],
    infoAdicionais: [{},{}]
  };
  
  return (
    <MUIDrawer open={open} variant="persistent" className='drawer'>
      <List>
        <ListItem>
          <ListItemIcon>
            <IconButton onClick={props.handleFecharGaveta}>
              <ChevronLeft />
            </IconButton>
          </ListItemIcon>
          
        </ListItem>
        {itemsList.principal.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
        <Divider />
        {itemsList.saberMais.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
        <Divider />
        {itemsList.infoAdicionais.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Sidebar);