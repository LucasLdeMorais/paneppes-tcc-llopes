import { React } from "react"
import RefreshTwoTone from "@material-ui/icons/RefreshTwoTone"
import CallReceivedTwoTone from "@material-ui/icons/CallReceivedTwoTone"
import CallMadeTwoTone from "@material-ui/icons/CallMadeTwoTone"
import CompareArrowsTwoTone from '@mui/icons-material/CompareArrowsTwoTone';
import { Button, Typography, Container } from "@material-ui/core"

export default function RecursosGrafo({handleRecarregarGrafo, handleOnlyTo, handleOnlyFrom, handleAllNodes}){

    return <Container component="article" maxWidth="md">
        <Typography variant="h6" gutterBottom component="div">Recursos do Grafo:</Typography>
        <Button size="small" variant="contained" endIcon={<RefreshTwoTone/>} onClick={(event) => {handleRecarregarGrafo(event)}} width="12%">
            Recarregar
        </Button>
        <Button size="small" variant="contained" endIcon={<CallMadeTwoTone/>} onClick={(event) => {handleOnlyTo(event)}} width="25%">
            Apenas links a fora
        </Button>
        <Button size="small" variant="contained" endIcon={<CallReceivedTwoTone/>} onClick={(event) => {handleOnlyFrom(event)}} width="25%">
            Apenas links a dentro
        </Button>
        <Button size="small" variant="contained" endIcon={<CompareArrowsTwoTone/>} onClick={(event) => {handleAllNodes(event)}} width="12%">
            Todos os links
        </Button>
        <Typography variant="body1" component="div">As páginas cuja página selecionada referencia são representadas pela cor azul</Typography>
        <Typography variant="body1" component="div">As páginas que referenciam a página selecionada são representadas pela cor vermelho</Typography>
        <Typography variant="caption" display="block">
            OBS.: Caso o grafo não apresente o resultado esperado, clique em "recarregar grafo"
        </Typography>
    </Container>
}