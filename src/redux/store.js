import { configureStore } from '@reduxjs/toolkit';
import UniversidadeReducer from './features/universidadesSlice'
import ParlamentarReducer from './features/parlamentaresSlice'

export default configureStore({
    reducer:{
        universidade: UniversidadeReducer,
        parlamentar: ParlamentarReducer
    }
})