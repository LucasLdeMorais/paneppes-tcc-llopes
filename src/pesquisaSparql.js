import axios from "axios"

export default async function pesquisaSparql(resource) {

  const queryFrom = `query=select+?ResourceFrom+?page+where+{+?ResourceFrom+dbo:wikiPageWikiLink+<${resource}>+.+?page+foaf:primaryTopic+?ResourceFrom+}`
  const queryTo = `query=select+?ResourceTo+?page+where+{+<${resource}>+dbo:wikiPageWikiLink+?ResourceTo+.+?page+foaf:primaryTopic+?ResourceTo+}`
  const baseUrl = "https://dbpedia.org/sparql"
  const graphUri = "http://dbpedia.org"
  const dataFormat = "application/sparql-results+json"
  const defaultTimeout = "3000"
  const defaultSignalUnconnected = "on"
  const defaultSignalVoid = "on"

  const __pesquisaSparqlApi = async (base, defaultGraphUri, query, format, timeout, signalVoid, signalUnconnected) => {
    defaultGraphUri = encodeURIComponent(defaultGraphUri).replaceAll("%3D", "=")
    query = encodeURIComponent(query).replaceAll("%2B","+").replaceAll("%3D", "=")
    format = encodeURIComponent(format).replaceAll("%2D", "-")

    const url = base + "?default-graph-uri=" + defaultGraphUri + "&" + query + "&format=" + format +
      "&timeout=" + timeout + "&signal_void=" + signalVoid + "&signal_unconnected=" + signalUnconnected
    try {
      await Promise.resolve(axios.get(url)).then( resposta => {
        return resposta.data.results.bindings
      })
    } catch(e) {
      console.log(e)
    }
  }

  return {
    pesquisaSparqlFrom: __pesquisaSparqlApi(baseUrl, graphUri, queryFrom, dataFormat, defaultTimeout, defaultSignalVoid, defaultSignalUnconnected),
    pesquisaSparqlTo: __pesquisaSparqlApi(baseUrl, graphUri, queryTo, dataFormat, defaultTimeout, defaultSignalVoid, defaultSignalUnconnected)
  }
}