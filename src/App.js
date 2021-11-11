import Pesquisa from './components/Pesquisa/Pesquisa';
import { Container } from "@material-ui/core"

function App() {
  return (
    <div className="App">
        <Container component="article" maxWidth="sm">
          <Pesquisa aoEnviar={aoEnviar}/>
        </Container>
    </div>
  );
}

function aoEnviar(dados) {
  console.log(dados)
}

export default App;
