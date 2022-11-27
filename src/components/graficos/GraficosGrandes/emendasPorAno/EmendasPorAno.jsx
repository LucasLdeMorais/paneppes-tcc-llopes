import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    BarController,
    BarElement,
} from 'chart.js';
import React from 'react';
import "./chart.css";
import { Bar } from 'react-chartjs-2';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useListState } from '@mantine/hooks';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarController, 
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);
const options = {
    plugins: {
        title: {
            display: false,
            text: 'Emendas pagas e empenhadas por ano (em R$) ',
            position: 'top'
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value, ctx) => {
                return value.toLocaleString('pt-BR');
            },
            font: {
                weight: 'bold'
            }
        }
    },
    responsive: true,
    scales: {
        x: {
            stacked: false,
        },
        y: {
            stacked: false,
        },
    },
};

function randomPastelColorRGB(){
    var r = (Math.round(Math.random()* 127) + 127);
    var g = (Math.round(Math.random()* 127) + 127);
    var b = (Math.round(Math.random()* 127) + 127);
    return [r,g,b]
}

function getRgbString(rgb, translucido) {
    let r = rgb[0]
    let g = rgb[1]
    let b = rgb[2]
    if(translucido){
        return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5 )';
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function EmendasPorAno({emendasUniversidade, anos, styleBox, styleGrafico}) {
    
    const [datasets, setDatasets] = useListState([]);

    const anos2 = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]

    useEffect(() => {
        if(emendasUniversidade){
            getDatasets(emendasUniversidade)
        }
    },[emendasUniversidade])

    // ! Revisar
    // * function getDatasets
    /**
     * @param emendasUniversidades {
     *      universidade: UFRJ,
     *      pago: [ ..., 2500000, 1500000 ],
     *      empenhado: [ ..., 2500000, 1500000 ]
     *  }
     * 
     * @return [
     *  {
     *    label: Pago,
     *    data: [ ..., 2500000, 1500000 ],
     *    borderColor: 'rgb('150','150','150')',
     *    backgroundColor: 'rgba('150', '150', '150', 0.5 )',
     *    tension: 0.2,
     *    fill: false
     *  }
     *  {
     *    label: Empenhado,
     *    data: [ ..., 2500000, 1500000 ],
     *    borderColor: 'rgb('150','150','150')',
     *    backgroundColor: 'rgba('150', '150', '150', 0.5 )',
     *    tension: 0.2,
     *    fill: false
     *  }
     * ]
     */ 
    function getDatasets(emendas) {
        const datasets = []
        datasets.push({
            label: "Pago",
            data: emendas.pago,
            backgroundColor: 'rgb(109, 255, 124)',
            stack: 'Stack 0'
        })
        datasets.push({
            label: "Empenhado",
            data: emendas.empenhado,
            backgroundColor: 'rgb(255, 237, 81)',
            stack: 'Stack 1'
        })
        console.log("datasets:",datasets)
        setDatasets.setState(datasets)
    }

    return(<>
                <Bar className={"grafico-barras"} style={styleGrafico} data={{
                    labels: anos2,
                    datasets: datasets
                }} options={options}/>
                {/* { datasets.length > 0 ? <Bar className={"grafico-barras"} style={styleGrafico} data={{
                    labels: anos,
                    datasets: dados
                }} options={options}/> : <></>} */}
         </>)
}
export default EmendasPorAno;