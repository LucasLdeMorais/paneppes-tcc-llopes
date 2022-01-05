import axios from "axios"

export default async function pesquisaResource(palavraChave) {
  try {
    let resposta = await axios.get('http://lookup.dbpedia.org/api/search', {
      params: {
        format: "JSON",
        query: palavraChave
      }
    })
    return resposta.data.docs
  } catch(e){
    console.log(e)
  }
}