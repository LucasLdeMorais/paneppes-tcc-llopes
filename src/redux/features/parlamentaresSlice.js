import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getParlamentares = createAsyncThunk("/parlamentares", async () => {
    return fetch("localhost:3333").then((res) => {
        res.json()
    })
})

const parlamentaresSlice = createSlice({
    name: "parlamentares",
    initialState: {
        parlamentares: [],
        carregando: false,
    },
    extraReducers: {
        [getParlamentares.pending]: (state, action) => {
            state.carregando = true;
        },
        [getParlamentares.fulfilled]: (state, action) => {
            state.carregando = false;
            state.parlamentares = action.payload;
        },
        [getParlamentares.rejected]: (state, action) => {
            state.carregando = false;
        },

    }
})

export default parlamentaresSlice.reducer;