import React from "react";
import "./topbar.css";
import { Menu } from "@mui/icons-material";
import { 
  AppBar,
  Box,
  IconButton, 
  Toolbar,
  Typography
} from "@mui/material";

const Topbar = (props) => {
  return (
    <AppBar position="fixed" open={props.aberto}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton onClick={(e) => props.abreGaveta(e)}>
          <Menu style={{ color: 'white' }}/>
        </IconButton>
        <Box>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            style={{ marginLeft: '10px', float: 'left' }}
          >
            PANEPPES
          </Typography>
          <Typography
            component="sub"
            variant="subtitle1"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            style={{ marginLeft: '10px', float: 'left', marginTop: '3px' }}
          >
            Painel de Análise das Emendas Parlamentares Pagas ao Ensino Superior
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Topbar;