import api from '../api';

async function recuperaListaUniversidades() {
    try {
      const data = await api.get('/universidades').then( response => {
        return response.data
      })
      return data
    } catch (e) {
      console.log(e.message)
    }
}

async function recuperaListaParlamentares() {
  try {
    const data = await api.get('/parlamentares').then( response => {
      return response.data
    })
    return data
  } catch (e) {
    console.log(e.message)
  }
}

async function recuperaListaEmendas() {
try {
    let status = 0;
    const data = await api.get('/emendas').then( response => {
      status = response.status
      return response.data
    })
    return ({
      statusCode: status,
      data: data
    })
} catch (e) {
    console.log(e.message)
    return ({
      statusCode: 400,
      message: e.message
    })
}
}

async function recuperaEmendasUniversidade(universidade) {
  let tentativas = 0
  while (tentativas <= 3) {
    try {
        const data = await api.get(`/emendas/uo?uo=${universidade.uo}`).then( response => {
          return response.data
        })
        tentativas = 4
        return {
          siglaUniversidade: universidade.sigla,
          total: data.total,
          emendas: data.emendas
        }
    } catch(e) {
      console.log(e.message)
      tentativas++
    }
  }
}

async function recuperaEmendasParlamentar(parlamentar) {
  let tentativas = 0
  while (tentativas <= 3) {
    try {
        const data = await api.get(`/emendas/autor?autor=${parlamentar.nome}`).then( response => {
          return response.data
        })
        tentativas = 4
        return {
          nomeAutor: parlamentar.nome,
          total: data.total,
          emendas: data.emendas
        }
    } catch(e) {
      console.log(e.message)
      tentativas++
    }
  }
}

export {recuperaListaUniversidades, recuperaListaEmendas, recuperaEmendasUniversidade, recuperaListaParlamentares, recuperaEmendasParlamentar}