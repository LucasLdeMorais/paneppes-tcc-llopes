// TODO: O objetivo aqui é ter uma gráfico de pizza que mostra quanto do valor pago foi destinado para cada tipo de despesa
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/system';
import "./index.css";
import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';
import "./index.css"
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Square } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { roundDouble } from '../../../../utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);
const options = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
        position: 'bottom',
        display: false
    },
    tooltip: {
        position: 'nearest'
    },
    title: {
        display: false,
        text: 'Valor de Emendas Pagas por Partido',
    },
    datalabels: {
      formatter: (value, ctx) => {
        let dataset = ctx.dataset;
        let soma = 0;
        dataset.data.forEach(data => {
          soma += data;
        });
        let percentage = roundDouble(((value / soma) * 100), 2) + '%';
        return percentage;
      },
      font: {
          weight: 'bold'
      }
    }
  }
};

const optionsVazio = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
        position: 'right',
        display: true
    },
    tooltip: {
        position: 'nearest',
        display: false
    },
    title: {
        display: true,
        text: 'Valor de Emendas Pagas por Partido',
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

export default function GraficoEmendasPartido({emendasUniversidade, styleBox, styleGrafico}) {
  const [labels, updateLabels] = useListState([]);
  const [datasets, updateDatasets] = useListState([]);
  const [legenda, setLegenda] = useListState([]);

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
  function getDataGrafico(emendasUniversidade) {
    let data = [];
    let localLabels = [];
    let colors = [];
    let borderColors = [];
    let localLegenda = [];
    
    emendasUniversidade.forEach(emenda => {
      if (emenda.pago > 0) {
        if (localLabels.includes(emenda.partido)){
          data[localLabels.indexOf(emenda.partido)] += emenda.pago
        } else {
          const colorRgb = randomPastelColorRGB();
          colors.push(getRgbString(colorRgb, true))
          borderColors.push(getRgbString(colorRgb, true))
          localLabels.push(emenda.partido)
          localLegenda.push({
            nome: emenda.partido,
            cor: getRgbString(colorRgb, true),
            valor: 0
          })
          data.push(emenda.pago)
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
    setLegenda.setState(localLegenda)
  }

  const styleLegendaMainText = {
    fontSize: "0.7em",
    color: "black"
  }

  useEffect(() => {
    if(emendasUniversidade && emendasUniversidade.length > 0){
      getDataGrafico(emendasUniversidade);
    }
  }, [emendasUniversidade]);

  return labels.length > 0 ? <Box className='container-grafico-partido' style={styleBox}>
    <Pie data={{labels: labels, datasets: datasets}} options={options} style={styleGrafico}/>
    <Typography variant="h7" component="h4" style={{marginLeft: "10px"}} >Legenda</Typography>
    <List style={{overflow: "auto", height: "100px", maxHeight: "100px"}}>
      {
        legenda.map((partido,index) => {
          return <ListItem style={{color: partido.cor, paddingBottom: 0}} key={index}>
            <ListItemText primary={partido.nome} secondary={`R$ ${partido.valor.toLocaleString('pt-BR')}`} primaryTypographyProps={{ style: styleLegendaMainText }} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
            <ListItemIcon ><Square style={{color: partido.cor, marginLeft: "15px"}}/></ListItemIcon>
          </ListItem>
        })
      }
    </List>
  </Box> : <Box className='container-grafico-partido' style={styleBox}>
    <Pie data={{labels: ["Sem registros"], datasets: [{
        label: "# Pago em R$",
        data: [1],
        backgroundColor: "rgb(175, 174, 174, 0.5)",
        borderColors: "rgb(175, 174, 174)",
        borderWidth: 1
    }]}} options={optionsVazio} style={styleGrafico}/>
  </Box>
}
