import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUniversidades = createAsyncThunk("/universidades", async () => {
    return fetch("localhost:3333").then((res) => {
        res.json()
    })
})

const universidadesSlice = createSlice({
    name: "universidades",
    initialState: {
        universidades: [],
        carregando: false,
    },
    extraReducers: {
        [getUniversidades.pending]: (state, action) => {
            state.carregando = true;
        },
        [getUniversidades.fulfilled]: (state, action) => {
            state.carregando = false;
            state.universidades = action.payload;
        },
        [getUniversidades.rejected]: (state, action) => {
            state.carregando = false;
        },

    }
})

export default universidadesSlice.reducer;