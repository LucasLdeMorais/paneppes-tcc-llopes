
import "./index.css"
import { Typography } from '@mui/material';
import Painel from '../../paineis/Painel';

const PainelSemUniversidadeSelecionada = () => {
    return (
        <Painel tamanho={ "grande" } componente={ 
            <Typography id={"typography-painel-sem-universidade-selecionada"} variant='h4'>
                Adicione uma Universidade ao gráfico para ver mais detalhes aqui
            </Typography>
        } style={{backgroundColor: "#878787"}}/>
    )
}

export default PainelSemUniversidadeSelecionada