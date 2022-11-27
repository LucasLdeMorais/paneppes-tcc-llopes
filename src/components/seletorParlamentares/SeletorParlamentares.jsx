
import { Box } from '@mui/system';
import "./index.css"
import { Autocomplete, TextField, CircularProgress, IconButton } from '@mui/material';
import React from 'react';
import { Add, DeleteForever, Refresh, Remove } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Paper } from '@mui/material';

function SeletorParlamentares({ loadingParlamentares, erroListaParlamentares, recarregarLista, temAcoes, removerTudo, listaParlamentares, selecionarParlamentar, valorAutocomplete, autocompleteAberto, setValorAutocomplete, changeAutocompleteAberto}) {

    //const loading = autocompleteAberto && listaParlamentares.length === 0;
    //const [valorAutocomplete, setValorAutocomplete] = useState({""});
    function onChange(event, newValue) {
        event.preventDefault();
        temAcoes?  setValorAutocomplete(newValue) : selecionarParlamentar(newValue);
        changeAutocompleteAberto(false)
    }

    function handleSetAutocompleteAberto(event, value) {
        event.preventDefault();
        changeAutocompleteAberto(value)
    }

    function handleRecarregarLista(event) {
        event.preventDefault();
        recarregarLista()
    }

    function handleRemoverTudo(event) {
        event.preventDefault();
        removerTudo()
    }

    function handleSelecionarParlamentar(event, value) {
        event.preventDefault();
        selecionarParlamentar(value)
    }

    return <Box style={{width: "100%"}}>
        <Paper className={"paper-autocomplete-parlamentares"} style={{height: "55px"}}>
            <Autocomplete
                className={temAcoes? "autocomplete-acoes-seletor-parlamentares" : "autocomplete-sem-acoes-seletor-parlamentares"}
                onOpen={(e) => handleSetAutocompleteAberto(e, true)}
                onClose={(e) => handleSetAutocompleteAberto(e, false)}
                value={ valorAutocomplete }
                onChange={ (e, newValue) => onChange(e, newValue) }
                loading={ loadingParlamentares }
                options={ listaParlamentares? listaParlamentares: [] }
                getOptionLabel={(option) => `${option.nome} - ${option.partido} - ${option.ufAutor}`}
                noOptionsText={erroListaParlamentares? "Erro ao carregar dados do servidor":"Vazio"}
                renderInput={(params) => <TextField {...params} 
                    label="Parlamentares Federais"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {loadingParlamentares ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                />}
                renderOption={(props, listaParlamentares) => (
                    <Box component="li" {...props} key={listaParlamentares._id}>
                        {listaParlamentares.nome} - {listaParlamentares.partido} - {listaParlamentares.ufAutor}
                    </Box>
                )}
            />
        </Paper>
        <Box className="box-botoes-seletor-parlamentares">
            { temAcoes && <>
                <Tooltip arrow title={"Adicionar"}>
                    <IconButton className="icon-button" onClick={(event) => { handleSelecionarParlamentar(event, valorAutocomplete) }}>
                        <Add></Add>
                    </IconButton>
                </Tooltip>
                <Tooltip arrow title={"Remover tudo"}>
                    <IconButton className="icon-button" onClick={(event) => { handleRemoverTudo(event) }}>
                        <DeleteForever></DeleteForever>
                    </IconButton>
                </Tooltip>
            </> }
        </Box>
    </Box>
}

export default SeletorParlamentares;