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

async function recuperaListaEmendas() {
try {
    const data = await api.get('/emendas').then( response => {
      return response.data
    })
    return data
} catch (e) {
    console.log(e.message)
}
}

async function recuperaEmendasUniversidade(universidade) {
    try {
        const data = await api.get(`/emendas/uo?uo=${universidade.uo}`).then( response => {
        return response.data
        })
        return {
          siglaUniversidade: universidade.sigla,
          total: data.total,
          emendas: data.emendas
        }
    } catch(e) {
        console.log(e.message)
    }
}

export {recuperaListaUniversidades, recuperaListaEmendas, recuperaEmendasUniversidade}