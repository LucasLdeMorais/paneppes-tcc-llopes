// TODO: O objetivo aqui é ter uma gráfico de pizza que mostra quanto do valor pago foi destinado para cada tipo de despesa
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Box } from '@mui/system';
import "./index.css";
import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const options = {
  indexAxis: 'y',
  responsive: true,
  scales: {
    x: {
        stacked: false,
    },
    y: {
        stacked: false,
    },
  },
  plugins: {
      legend: {
          position: 'bottom',
          display: false
      },
      tooltip: {
          position: 'nearest'
      },
      title: {
          display: true,
          text: 'Valor de Emendas Pagas por Natureza da Despesa',
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

export default function GraficoEmendasNaturezaBarras({emendasUniversidade, styleBox, styleGrafico, anoSelecionado}) {
  const [labels, updateLabels] = useListState([]);
  const [datasets, updateDatasets] = useListState([]);

  /**
   * 
   * @param {Array<EmendasUniversidade>} emendasUniversidade = [
   *  {
   *    siglaUniversidade: "UFRJ",
   *    emendas: []]
   *  }, 
   *  ...
   * ]
   */
  function getDataGrafico(emendasUniversidade, anoSelecionado) {
    let naturezas = [];
    let datasets = [];
    let pago = []
    let labels = [];

    emendasUniversidade.forEach(emenda => {
      if (emenda.pago > 0) {
        if (anoSelecionado !== 0 && `${emenda.ano}` === anoSelecionado){
          if (naturezas.includes(natureza => emenda.naturezaDespesa.substring(0,8) === natureza.codigo)){
            debugger
            naturezas[naturezas.indexOf(natureza => natureza.codigo === emenda.naturezaDespesa.substring(0,8))].pago += emenda.pago
          } else {
            const colorRgb = randomPastelColorRGB();
            const color = getRgbString(colorRgb, false);
            naturezas.push({
              codigo: emenda.naturezaDespesa.substring(0,8),
              nome: emenda.naturezaDespesa.substring(10,),
              pago: emenda.pago,
              cor: color
            })
          }
        } else {
          if (naturezas.includes(natureza => emenda.naturezaDespesa.substring(0,8) === natureza.codigo)){
            naturezas[naturezas.indexOf(natureza => natureza.codigo === emenda.naturezaDespesa.substring(0,8))].pago += emenda.pago
          } else {
            const colorRgb = randomPastelColorRGB();
            const color = getRgbString(colorRgb, false);
            naturezas.push({
              codigo: emenda.naturezaDespesa.substring(0,8),
              nome: emenda.naturezaDespesa.substring(10,),
              pago: emenda.pago,
              cor: color
            })
          }
        }
      }
    })

    naturezas.forEach((natureza, index, arr) => {
      debugger
      labels.push(`${natureza.nome}--`)
      datasets.push({
        label: `${natureza.nome}++`,
        data: [natureza.pago],
        backgroundColor: natureza.cor,
        stack: `Stack ${index}`
      })
    })
    updateLabels.setState(labels)
    updateDatasets.setState(datasets)
  }

  useEffect(() => {
    if(emendasUniversidade && emendasUniversidade.length > 0){
      getDataGrafico(emendasUniversidade, anoSelecionado);
    }
  }, [emendasUniversidade, anoSelecionado]);

  return datasets.length > 0 ? <Box className='container-grafico-emendas-natureza-despesa' style={styleBox}>
    <Bar data={{labels: ["Pago"], datasets: datasets}} options={options} style={styleGrafico}/>
  </Box> : <Box className='container-grafico-emendas-natureza-despesa' style={styleBox}>
    <Bar data={{labels: ["Sem Dados"], datasets: [{
        label: "Sem Dados",
        data: [1],
        backgroundColor: "rgb(175, 174, 174, 0.5)",
        borderColors: "rgb(175, 174, 174)",
        borderWidth: 1
    }]}} options={options} style={styleGrafico}/>
  </Box>
}
