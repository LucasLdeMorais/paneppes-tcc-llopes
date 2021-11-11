import { React, useState } from "react"
import SearchTwoTones from "@material-ui/icons/SearchTwoTone"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"

export default function Pesquisa({aoEnviar}){
    const [conteudoPesquisa, setConteudoPesquisa] = useState("")   
    return <div>
        <form onSubmit={(event) => {
            event.preventDefault()
            aoEnviar({ conteudoPesquisa })
        }}>
            <IconButton type="submit" sx={{ color: 'action.active', mr: 1, my: 1.5 }}>
                <SearchTwoTones/>
            </IconButton>
            <TextField 
                onChange={(event) => {
                    setConteudoPesquisa(event.target.value);
                }} 
                id="pesquisa" 
                variant="standard" 
                margin="normal" 
            />
        </form>
    </div>
}