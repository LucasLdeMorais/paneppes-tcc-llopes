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
import { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { anos } from '../../../../constants/compartilhado';

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
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

function EmendasPorAno({emendasUniversidade, styleBox, styleGrafico}) {
    
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        if(emendasUniversidade){
            getDatasets(emendasUniversidade)
        }
    },[emendasUniversidade])

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
        setDatasets([
            {
                label: "Empenhado",
                data: emendas.empenhado,
                backgroundColor: 'rgb(88, 211, 97)',
                stack: 'Stack 1'
            },
            {
                label: "Liquidado",
                data: emendas.liquidado,
                backgroundColor: 'rgb(255, 237, 81)',
                stack: 'Stack 2'
            },
            {
                label: "Pago",
                data: emendas.pago,
                backgroundColor: 'rgb(25, 118, 210)',
                stack: 'Stack 3'
            }
        ])
    }

    return(<>
        <Bar className={"grafico-barras"} style={styleGrafico} data={{
            labels: anos,
            datasets: datasets
        }} options={options}/>W
    </>)
}
export default EmendasPorAno;