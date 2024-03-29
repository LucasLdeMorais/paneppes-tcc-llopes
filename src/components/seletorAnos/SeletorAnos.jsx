import "./seletorAnos.css";
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Paper } from '@mui/material';

const SeletorAnos = ({anos, setAnoSelecionado, anoSelecionado, styleBox, stylePaper, paper}) => {
    function handleSetAnoSelecionado(e, value) {
        e.preventDefault();
        setAnoSelecionado(value)
    }

    const Seletor = () => {
        return <FormControl id="select-ano"style={styleBox}>
            <InputLabel id="select-ano-label">Ano</InputLabel>
            <Select
                labelId="select-ano"
                id="select-ano"
                value={anoSelecionado}
                label="Anos"
                defaultValue="Selecione um ano"
                onChange={(e, value) =>{
                    handleSetAnoSelecionado(e, value.props.value) 
                }}
            >
                {
                    !(anos === undefined) ? <MenuItem className="select-ano-menu-item" value={0} index={anos.length + 1}  key="acumulado">Acumulado (desde 2015)</MenuItem> : <></>
                }
                {
                    !(anos === undefined) ? anos.map((Ano, index) => (
                        <MenuItem className="select-ano-menu-item" value={Ano} index={index} key={`ano ${Ano}`}>{Ano}</MenuItem>
                    )) : <></>
                }
            </Select>
        </FormControl>
    }

    return (paper? <Paper style={stylePaper}>
        <Seletor/>
    </Paper>: <Seletor/> )
}

export default SeletorAnos;
