
import { Box } from '@mui/system';
import "./index.css"
import { Autocomplete, TextField, CircularProgress, IconButton } from '@mui/material';
import React from 'react';
import { Add, DeleteForever, Refresh, Remove } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Paper } from '@mui/material';

function SeletorUniversidades({ loadingUniversidades, recarregarLista, temAcoes, removerTudo, listaUniversidades, selecionarUniversidade, valorAutocomplete, autocompleteAberto, setValorAutocomplete, changeAutocompleteAberto}) {

    //const loading = autocompleteAberto && listaUniversidades.length === 0;
    //const [valorAutocomplete, setValorAutocomplete] = useState({""});
    function onChange(event, newValue) {
        event.preventDefault();
        temAcoes?  setValorAutocomplete(newValue) : selecionarUniversidade(newValue);
        changeAutocompleteAberto(false)
    }

    function handleSetAutocompleteAberto(event, value) {
        event.preventDefault();
        changeAutocompleteAberto(value)
    }

    function handleRemoverTudo(event) {
        event.preventDefault();
        removerTudo()
    }

    function handleSelecionarUniversidade(event, value) {
        event.preventDefault();
        selecionarUniversidade(value)
    }

    return <Box style={{width: "100%"}}>
        <Paper className={"paper-autocomplete"} style={{height: "55px"}}>
            <Autocomplete
                className={temAcoes? "autocomplete-acoes-seletor-universidades" : "autocomplete-sem-acoes-seletor-universidades"}
                onOpen={(e) => handleSetAutocompleteAberto(e, true)}
                onClose={(e) => handleSetAutocompleteAberto(e, false)}
                value={ valorAutocomplete }
                onChange={ (e, newValue) => onChange(e, newValue) }
                loading={ loadingUniversidades }
                options={ listaUniversidades }
                getOptionLabel={(option) => `${option.nome} - ${option.sigla}`}
                noOptionsText="Vazio"
                renderInput={(params) => <TextField {...params} 
                    label="Universidades Federais"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {loadingUniversidades ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                />}
                renderOption={(props, listaUniversidades) => (
                    <Box component="li" {...props} key={listaUniversidades._id}>
                        {listaUniversidades.nome} - {listaUniversidades.sigla}
                    </Box>
                )}
            />
            <Box className="box-botoes-seletor-universidades">
                { temAcoes && <>
                    <Tooltip title={"Adicionar"}>
                        <IconButton className="icon-button" onClick={(event) => { handleSelecionarUniversidade(event, valorAutocomplete) }}>
                            <Add></Add>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Remover tudo"}>
                        <IconButton className="icon-button" onClick={(event) => { handleRemoverTudo(event) }}>
                            <DeleteForever></DeleteForever>
                        </IconButton>
                    </Tooltip>
                </> }
            </Box>
        </Paper>
    </Box>
}

export default SeletorUniversidades;