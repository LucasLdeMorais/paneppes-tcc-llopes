
import "./index.css"
import { Typography } from '@mui/material';
import Painel from '../../paineis/Painel';

const PainelSemUniversidadeSelecionada = ({tamanho, className, style}) => {
    return (
        <Painel tamanho={ tamanho } componente={ 
            <Typography id={"typography-painel-sem-universidade-selecionada"} variant='h4' textAlign={"justify"}>
                Selecione uma universidade para ver mais detalhes aqui
            </Typography>
        } style={ style }/>
    )
}

export default PainelSemUniversidadeSelecionada