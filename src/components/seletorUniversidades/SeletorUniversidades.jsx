
import { Box } from '@mui/system';
import { Autocomplete, TextField, CircularProgress, IconButton } from '@mui/material';
import React from 'react';
import { AddTwoTone, RefreshTwoTone, RemoveTwoTone } from '@mui/icons-material';
import { useState } from 'react';

function SeletorUniversidades({ loadingUniversidades, handleRemoverTudo, listaUniversidades, handleSelecionarUniversidade, valorAutocomplete, autocompleteAberto, setValorAutocomplete, handleSetAutocompleteAberto}) {

    //const loading = autocompleteAberto && listaUniversidades.length === 0;
    //const [valorAutocomplete, setValorAutocomplete] = useState({""});

    return <Box style={{width: "100%"}}>
        <Autocomplete
            id="combo-box-universidades"
            style={{float: "left", width: "92%"}}
            onOpen={handleSetAutocompleteAberto(true)}
            onClose={handleSetAutocompleteAberto(false)}
            value={ valorAutocomplete }
            onChange={ (event, newValue) => { event.preventDefault(); setValorAutocomplete(newValue)} }
            loading={ loadingUniversidades }
            options={ listaUniversidades }
            getOptionLabel={(option) => option.nome}
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
          <IconButton style={{marginTop: "8px"}} onClick={() => { handleSelecionarUniversidade(valorAutocomplete) }}>
              <AddTwoTone></AddTwoTone>
          </IconButton>
          <IconButton style={{marginTop: "8px"}} onClick={() => { handleRemoverTudo() }}>
              <RefreshTwoTone></RefreshTwoTone>
          </IconButton>
    </Box>
}

export default SeletorUniversidades;