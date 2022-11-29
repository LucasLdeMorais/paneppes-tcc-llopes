import "./painel.css";
import { Close, Warning } from '@mui/icons-material'
import { Grid, Paper, Typography, IconButton, Box, Icon}
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

const Painel = ({tamanho, subtitulo, componente, header, indice, removerItem, removivel, titulo, tooltip, style}) => {
    return <Grid item xs={handleTamanho(tamanho)} key={indice}>
        <Paper style={style} className='paper-painel' elevation={2}>
            {
                header? <Box className={'header-painel'} style={{ marginBottom: 10 }}>
                    <Typography className={"titulo-header-painel"} component='h3' variant='h6'>{titulo}</Typography>
                    {
                        tooltip? tooltip : <></>
                    }
                    { 
                        removivel? <IconButton style={{float:"right", color: "white"}} onClick={(e) => {
                                e.preventDefault();
                                removerItem(indice);
                            }}>
                            <Close/>
                        </IconButton> : <></>
                    }
                </Box> : <> {
                    removivel? <IconButton style={{float:"right", color: "white"}} onClick={(e) => {
                            e.preventDefault();
                            removerItem(indice);
                        }}>
                        <Close/>
                    </IconButton> : <></>
                } </>
            }
            {
                subtitulo? <Box className='box-subtitulo-painel'>
                    <Icon style={{color: "orange", float: "left", marginLeft:"10px", marginRight:"5px"}}>
                        <Warning />
                    </Icon>
                    <Typography component='h3' variant='caption' className="subtitulo-painel">{subtitulo}</Typography>
                </Box> : <></>
            }
            <Box className='conteudo-painel' style={{ marginBottom: 10 }}>
                {componente}
            </Box>
        </Paper>
    </Grid>
} 
export default Painel;