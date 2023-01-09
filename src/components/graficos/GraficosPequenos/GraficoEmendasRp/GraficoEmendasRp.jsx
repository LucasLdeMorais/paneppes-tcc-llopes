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
import { useRef } from 'react';
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
    },
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

export default function GraficoEmendasRp({emendasUniversidades, anoSelecionado, styleBox, styleGrafico}) {
  const [labels, updateLabels] = useListState([]);
  const [datasets, updateDatasets] = useListState([]);
  const [legenda, setLegenda] = useListState([]);
  const [anoAnterior, setAno] = useState(-1);
  const shouldGetDataset = useRef(true);

  /**
   * ! Ver por que está dando ERRO
   * @param {Array<EmendaUniversidade>} emendasUniversidades 
   * @param {String<Ano>} anoSelecionado
   * @returns {{Array<String>,Array<Integer>}} emendasUo
   * * Para cada ano, criar o reduce de cada uo e adicionar no array por ano
   */
  function getEmendasRp(emendasUniversidades, anoSelecionado) {
    let colors = [];
    let borderColors = [];
    let localLegenda = [];

    const pagoRp = {
      labels: [],
      data: []
    }
    
    emendasUniversidades.forEach((obj) => {
      const confereAnoSelecionado = anoSelecionado !== 0 && `${obj.ano}` === anoSelecionado;

      if (anoSelecionado === 0 || confereAnoSelecionado) {
        //* insere os valores na primeira vez e define as cores
        if(!pagoRp.labels.find(item => item === obj.rp)) {
          const colorRgb = randomPastelColorRGB();

          pagoRp.labels.push(obj.rp);
          pagoRp.data.push(obj.pago);

          colors.push(getRgbString(colorRgb, true));
          borderColors.push(getRgbString(colorRgb, false));
          localLegenda.push({
            nome: obj.rp,
            cor: getRgbString(colorRgb, true),
            valor: 0,
            percentual: 0
          })
        } else {
          // * Se já tem, pega o indice e soma o valor
          const index = pagoRp["labels"].indexOf(obj.rp);

          pagoRp.data[index] += obj.pago;
        }
      }
    });

    if (!(pagoRp.data.length === pagoRp.data.filter(item => item === 0).length)){
      let i = 0;
      while (i < pagoRp.data.length) {
        if (pagoRp.data[i] === 0) {
          pagoRp.data.splice(i, 1);
          pagoRp.labels.splice(i, 1);
        } else {
          ++i;
        }
      }
    }
    // * Seta o valor acumulado na legenda
    const total = pagoRp.data.reduce((acc,valor) => {
      return acc += valor
    })
    localLegenda.forEach((item,index) => {
      item.valor = pagoRp.data[index];
      item.percentual = (100 * item.valor) / total;
    })
    updateDatasets.setState([{
      label: "# Pago em R$",
      data: pagoRp.data,
      backgroundColor: colors,
      borderColors: borderColors,
      borderWidth: 1
    }]);
    updateLabels.setState(pagoRp.labels);
    setLegenda.setState(localLegenda);
  }

  const styleLegendaMainText = {
    fontSize: "0.7em",
    color: "black"
  }

  useEffect(() => {
    if(shouldGetDataset.current){
      setAno(anoSelecionado);
      getEmendasRp(emendasUniversidades, anoSelecionado);
      shouldGetDataset.current = false;
    } else if (anoSelecionado !== anoAnterior){
      setAno(anoSelecionado);
      getEmendasRp(emendasUniversidades, anoSelecionado);
    }
  }, [emendasUniversidades, anoSelecionado]);

  let newLeg = legenda.sort((a,b) => b.valor - a.valor );

  return labels.length > 0 ? <Box className='container-grafico-rp' style={styleBox}>
    <Pie data={{labels: labels, datasets: datasets}} options={options} style={styleGrafico}/>
    <Typography variant="subtitle1" component="h4" style={{marginLeft: "10px"}} >Legenda</Typography>
    <List style={{overflow: "auto", height: "100px", maxHeight: "100px", width: "100%"}}>
      {
        newLeg.map((rp,index) => {
          return <ListItem style={{color: rp.cor, paddingBottom: 0}} key={index}>
              <ListItemText primary={rp.nome} secondary={`R$ ${rp.valor.toLocaleString('pt-BR')}`} primaryTypographyProps={{ style: styleLegendaMainText }} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
              <ListItemText secondary={`${roundDouble(rp.percentual, 2)}%`} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
              <ListItemIcon ><Square style={{color: rp.cor, marginLeft: "15px"}}/></ListItemIcon>
            </ListItem>
        })
      }
    </List>
  </Box> : <Box className='container-grafico-rp' style={styleBox}>
    <Pie data={{labels: ["Sem registros"], datasets: [{
        label: "# Pago em R$",
        data: [1],
        backgroundColor: "rgb(175, 174, 174, 0.5)",
        borderColors: "rgb(175, 174, 174)",
        borderWidth: 1
    }]}} options={optionsVazio} style={styleGrafico}/>
  </Box>
}
