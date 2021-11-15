import { React, useState } from "react"
import SearchTwoTones from "@material-ui/icons/SearchTwoTone"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"

export default function BarraPesquisa({aoEnviar}){
    const listaExemplos = ["Berlim", "Nintendo", "Isaac Asimov", "Sonic", "Super Mario Bros",
        "Pluto", "Mickey Mouse", "Caim", "Nero", "Capadocia", "Hermes Trismegistus" ]
    
    let exemplo = listaExemplos[ Math.floor( Math.random() * listaExemplos.length ) ]

    const [conteudoPesquisa, setConteudoPesquisa] = useState("")   


    return <form onSubmit={(event) => {
            event.preventDefault()
            aoEnviar(conteudoPesquisa)
        }}>
        <IconButton type="submit" sx={{ color: "action.active", mr: 1, my: 1.5 }}>
                <SearchTwoTones/>
        </IconButton>
        <div style={{width: "90%", float: "right"}}>
            <TextField 
                onChange={(event) => {
                    setConteudoPesquisa(event.target.value);
                }}
                placeholder={`Ex.: ${exemplo}`}
                id="pesquisa" 
                variant="standard" 
                margin="normal" 
                fullWidth
            />
        </div>
    </form>
}