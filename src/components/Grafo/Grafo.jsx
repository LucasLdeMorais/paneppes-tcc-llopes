import { React, useEffect } from "react"
import Button from "@material-ui/core/Button"
import RefreshTwoTone from "@material-ui/icons/RefreshTwoTone"
import ForceGraph2D from "react-force-graph-2d";

export default function Grafo( { dados, handleClickNode, handleRecarregarGrafo } ) {
    useEffect ( () => {
        console.log(dados)
    })

    return <>
        <Button variant="contained" endIcon={<RefreshTwoTone/>} onClick={handleRecarregarGrafo} >
            Recarregar Grafo
        </Button>
        <ForceGraph2D
            graphData={dados}
            nodeLabel="name"
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.25}
            onNodeDragEnd={ node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
            }}
            onNodeClick={ node => { handleClickNode(node) }}
        /> 
    </>
}