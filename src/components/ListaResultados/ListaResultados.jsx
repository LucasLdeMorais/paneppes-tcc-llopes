import { React } from "react"
import { List, ListItemText, ListSubheader, ListItemButton } from "@material-ui/core"

export default function ListaResultados({resultados, handleClickItemLista}){
    return resultados ? <div>
        <List style={{position: "absolute", display: "block"}} sx={{ 
                width: '36%', 
                bgcolor: 'background.paper', 
                maxHeight: "15em",
                overflow: "hidden", 
                overflowY: "scroll", 
                zIndex: 1000
            }}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Resultados
                </ListSubheader>
            }
            > { resultados ? resultados.map((resultado) => (
                <ListItemButton 
                    onClick={(event) => {
                        event.preventDefault()
                        handleClickItemLista(resultado.resource[0])
                    }} 
                    key={"sr" + resultados.indexOf(resultado)}
                >
                    <ListItemText 
                        primary={resultado.label[0] = resultado.label[0].replaceAll(/<\/?[^>]+(>|$)/g, "")} 
                        secondary={resultado.resource[0]}
                    />
                </ListItemButton>
            )) : null }
        </List>
    </div> : <></>
}