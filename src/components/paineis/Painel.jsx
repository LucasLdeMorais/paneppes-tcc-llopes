import "./painel.css";
import { Close } from '@mui/icons-material'
import { Grid, Paper, Typography, IconButton, Box}
    from "@mui/material";
import React from "react";

function handleTamanho(tamanho) {
    if ( tamanho === "pequeno" ) {
        return 4
    }
    if ( tamanho === "medio" ) {
        return 6
    }
    if ( tamanho === "grande" ) {
        return 12
    }
}

const Painel = ({tamanho, componente, header, indice, removerItem, removivel, titulo, style}) => {
    return <Grid item xs={handleTamanho(tamanho)} key={indice}>
        <Paper style={style} className='paper-painel' elevation={2}>
            {
                header? <Box className={'header-painel'} style={{ marginBottom: 10 }}>
                    <Typography style={{float:"left", padding: 5, paddingLeft: 10}} component='h3' variant='h6'>{titulo}</Typography>
                    { 
                        removivel? <IconButton style={{float:"right"}} onClick={(e) => {
                                e.preventDefault();
                                removerItem(indice);
                            }}>
                            <Close/>
                        </IconButton> : <></>
                    }
                </Box> : <> {
                    removivel? <IconButton style={{float:"right"}} onClick={(e) => {
                            e.preventDefault();
                            removerItem(indice);
                        }}>
                        <Close/>
                    </IconButton> : <></>
                } </>
            }
            <Box className='conteudo-painel' style={{ marginBottom: 10 }}>
                {componente}
            </Box>
        </Paper>
    </Grid>
} 
export default Painel;