import { React } from "react"

export default function ListaResultados({resultados}){
    if(resultados) {
        return <ol style={{height: "15em", overflow: "hidden", overflowY: "scroll"}}>
            { resultados ? resultados.map((resultado) => (<>
                <li key={"sr" + resultados.indexOf(resultado)}>
                    <div><a>{resultado.label[0].replaceAll(/<\/?[^>]+(>|$)/g, "")}</a></div>
                    <div>ResourceLink: <a href={resultado.resource[0]}>{resultado.resource[0]}</a></div>
                    <div>Search score: {resultado.score[0]}</div>
                </li>
                <hr/>
            </>)) : null}
        </ol>
    }
    return <></>
}