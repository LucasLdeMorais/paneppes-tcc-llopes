import { Help } from "@mui/icons-material";
import { Box, ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import React from "react";

const CartaoAjuda = ({open, abrir, fechar, conteudo}) => {
    return <Box style={{float: "right"}}>
      <ClickAwayListener onClickAway={fechar}>
        <Tooltip arrow PopperProps={{disablePortal: true}} disableFocusListener disableHoverListener disableTouchListener open={open} 
        onClose={fechar} title={conteudo} placement='right'>
            <IconButton onClick={open? fechar:abrir}><Help style={{color: "white"}} /></IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Box>
}

export {CartaoAjuda};
