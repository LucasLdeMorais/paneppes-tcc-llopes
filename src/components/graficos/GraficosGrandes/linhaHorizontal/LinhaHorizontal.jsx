import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineController,
    LineElement,
} from 'chart.js';
import React from 'react';
import "./linhaHorizontal.css";
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useListState } from '@mantine/hooks';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineController, 
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);
const options = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        tooltip: {
            position: 'nearest'
        },
        title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
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
    }
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

function LinhaHorizontal({emendasUniversidades, anos, styleBox, styleGrafico}) {
    
    const [datasets, setDatasets] = useListState([]);

    useEffect(() => {
        if(emendasUniversidades && emendasUniversidades.length > 0){
            getDatasets(emendasUniversidades)
        }
    },[emendasUniversidades])

    // * function getDatasets
    /**
     * @param emendasUniversidades [ ..., {
     *      universidade: UFRJ
     *      pagoEmendasAno: [ ..., 2500000, 1500000 ]
     *    }
     *  ]
     * 
     * @return [ ...,
     *  {
     *    label: UFRJ,
     *    data: [ ..., 2500000, 1500000 ],
     *    borderColor: 'rgb('150','150','150')',
     *    backgroundColor: 'rgba('150', '150', '150', 0.5 )',
     *    tension: 0.2,
     *    fill: false
     *  }
     * ]
     */ 
    function getDatasets(universidades) {
        const datasets = []
        universidades.forEach(universidade => {
            const colorRgb = randomPastelColorRGB()
            const color = getRgbString(colorRgb, false)
            datasets.push({
                label: universidade.siglaUniversidade,
                data: universidade.pagoEmendasAno,
                borderColor: color,
                backgroundColor: color,
                tension: 0.2,
                fill: false
            })
        })
        setDatasets.setState(datasets)
    }

    return(<>
                { datasets.length > 0 ? <Line className={"grafico-linhas"} style={styleGrafico} data={{
                    labels: anos,
                    datasets: datasets
                }} options={options}/> : <></>}
         </>)
}
export default LinhaHorizontal;