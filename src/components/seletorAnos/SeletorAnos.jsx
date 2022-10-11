import "./seletorAnos.css";
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const SeletorAnos = ({anos, setAnoSelecionado, anoSelecionado}) => {
    return (
        <Box>
            <FormControl id="select-ano">
                <InputLabel id="select-ano-label">Ano</InputLabel>
                <Select
                    labelId="select-ano"
                    id="select-ano"
                    value={anoSelecionado}
                    label="Anos"
                    defaultValue="Selecione um ano"
                    onChange={(e, value) =>{ 
                        e.preventDefault();
                        setAnoSelecionado(value.props.value) 
                    }}
                >
                    {
                        !(anos === undefined) ? <MenuItem className="select-ano-menu-item" value={0} index={anos.length + 1}>Acumulado (desde 2015)</MenuItem> : <></>
                    }
                    {
                        !(anos === undefined) ? anos.map((Ano, index) => (
                            <MenuItem className="select-ano-menu-item" value={Ano} index={index}>{Ano}</MenuItem>
                        )) : <></>
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default SeletorAnos;
