import "./painel.css";
import { CloseTwoTone } from '@mui/icons-material'
import { Grid, Paper, Typography, IconButton, Box}
    from "@mui/material";
import React from "react";

function handleTamanho(tamanho) {
    if ( tamanho === "pequeno" ) {
        return 4
    }
    if ( tamanho === "medio" ) {
        return 8
    }
    if ( tamanho === "grande" ) {
        return 12
    }
}

const Painel = ({tamanho, componente, indice, removerItem, removivel, titulo, style}) => {
    return <Grid item xs={handleTamanho(tamanho)} key={indice}>
        <Paper style={style} className='painel' elevation={2}>
            <Box>
                {
                    () => {  
                        titulo? (removivel? <Typography style={{float:"left"}} component='h3' variant='h6'>{titulo}</Typography> : <Typography component='h3' variant='h6'>{titulo}</Typography>) : <></> }
                }
                {
                    removivel? <IconButton style={{float:"right"}} onClick={(e) => {
                        e.preventDefault();
                        removerItem(indice);
                    }}>
                        <CloseTwoTone/>
                    </IconButton> : <></>
                }
            </Box>
            {componente}
        </Paper>
    </Grid>
} 
export default Painel;