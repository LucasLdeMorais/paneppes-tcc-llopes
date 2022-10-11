// TODO: O objetivo aqui é ter uma gráfico de pizza que mostra quanto do valor pago foi destinado para cada tipo de despesa
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/system';
import "./index.css";
import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const options = {
indexAxis: 'x',
responsive: true,
plugins: {
    legend: {
        position: 'right',
        display: true
    },
    tooltip: {
    },
    title: {
        display: true,
        text: 'Valor de Emendas Pagas por Ação'
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

export default function GraficoEmendasAcao({emendasUniversidade, styleBox, styleGrafico, anoSelecionado}) {
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
    let data = [];
    let jaAdicionadas = [];
    let localLabels = [];
    let colors = [];
    let borderColors = [];
    
    emendasUniversidade.forEach(emenda => {
      if (emenda.pago > 0) {
        if (anoSelecionado !== 0 && `${emenda.ano}` === anoSelecionado){
          if (jaAdicionadas.includes(emenda.acao.substring(0,3))){
            data[jaAdicionadas.indexOf(emenda.acao.substring(0,3))] += emenda.pago
          } else {
            const colorRgb = randomPastelColorRGB();
            colors.push(getRgbString(colorRgb, true))
            borderColors.push(getRgbString(colorRgb, true))
            jaAdicionadas.push(emenda.acao.substring(0,3))
            localLabels.push(emenda.acao.substring(7,30)+"(...)")
            data.push(emenda.pago)
          }
        } else {
          if (jaAdicionadas.includes(emenda.acao.substring(0,3))){
            data[jaAdicionadas.indexOf(emenda.acao.substring(0,3))] += emenda.pago
          } else {
            const colorRgb = randomPastelColorRGB();
            colors.push(getRgbString(colorRgb, true))
            borderColors.push(getRgbString(colorRgb, true))
            jaAdicionadas.push(emenda.acao.substring(0,3))
            localLabels.push(emenda.acao.substring(7,30)+"(...)")
            data.push(emenda.pago)
          }
        }
      }
    })
    updateDatasets.setState([{
        label: "# Pago em R$",
        data: data,
        backgroundColor: colors,
        borderColors: borderColors,
        borderWidth: 1
    }])
    updateLabels.setState(localLabels)
  }

  useEffect(() => {
    if(emendasUniversidade && emendasUniversidade.length > 0){
      getDataGrafico(emendasUniversidade, anoSelecionado);
    }
  }, [emendasUniversidade, anoSelecionado]);

  return labels.length > 0 ? <Box className='container-grafico-emendas-acao' style={styleBox}>
    <Pie data={{labels: labels, datasets: datasets}} options={options} style={styleGrafico} />
  </Box> : <Box className='container-grafico-emendas-acao' style={styleBox}>
    <Pie data={{labels: ["Sem Dados"], datasets: [{
        label: "# Pago em R$",
        data: [1],
        backgroundColor: "rgb(175, 174, 174, 0.5)",
        borderColors: "rgb(175, 174, 174)",
        borderWidth: 1
    }]}} options={options} style={styleGrafico}/>
  </Box>
}
