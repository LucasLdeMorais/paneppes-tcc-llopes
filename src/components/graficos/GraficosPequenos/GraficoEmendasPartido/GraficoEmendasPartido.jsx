import React, { useRef, useState } from 'react';
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

export default function GraficoEmendasPartido({emendasUniversidade, anoSelecionado, styleBox, styleGrafico, titulo}) {
  const [labels, updateLabels] = useListState([]);
  const [datasets, updateDatasets] = useListState([]);
  const [legenda, setLegenda] = useListState([]);
  const [anoAnterior, setAnoAnterior] = useState(-1);
  const [emendasAnterior, setEmendasAnterior] = useState();
  const shouldGetDataset = useRef(true);

  function getEmendasPartido(emendasUniversidade, anoSelecionado) {
    let colors = [];
    let borderColors = [];
    let localLegenda = [];

    const pagoPartido = {
      labels: [],
      data: []
    }
    
    emendasUniversidade.forEach((obj) => {
      const confereAnoSelecionado = anoSelecionado !== 0 && `${obj.ano}` === anoSelecionado;

      if (anoSelecionado === 0 || confereAnoSelecionado) {
        //* insere os valores na primeira vez e define as cores
        if(!pagoPartido.labels.find(item => item === obj.partido)) {
          const colorRgb = randomPastelColorRGB();

          pagoPartido.labels.push(obj.partido);
          pagoPartido.data.push(obj.pago);

          colors.push(getRgbString(colorRgb, true));
          borderColors.push(getRgbString(colorRgb, false));
          localLegenda.push({
            nome: obj.partido,
            cor: getRgbString(colorRgb, true),
            valor: 0,
            percentual: 0
          })
        } else {
          // * Se já tem, pega o indice e soma o valor
          const index = pagoPartido["labels"].indexOf(obj.partido);

          pagoPartido.data[index] += obj.pago;
        }
      }
    });
    
    if (!(pagoPartido.data.length === pagoPartido.data.filter(item => item === 0).length)){
      let i = 0;
      while (i < pagoPartido.data.length) {
        if (pagoPartido.data[i] === 0) {
          pagoPartido.data.splice(i, 1);
          pagoPartido.labels.splice(i, 1);
        } else {
          ++i;
        }
      }
    }

    // * Seta o valor acumulado na legenda
    let total = 0;
    if (pagoPartido.data.length > 0){
        total = pagoPartido.data.reduce((acc,valor) => {
          return acc += valor
        });
    }

    localLegenda.forEach((item,index) => {
      item.valor = pagoPartido.data[index];
      item.percentual = (100 * item.valor) / total;
    })

    updateDatasets.setState([{
      label: "# Pago em R$",
      data: pagoPartido.data,
      backgroundColor: colors,
      borderColors: borderColors,
      borderWidth: 1,
      total: total
    }]);
    updateLabels.setState(pagoPartido.labels);
    setLegenda.setState(localLegenda);
  }

  const styleLegendaMainText = {
    fontSize: "0.7em",
    color: "black"
  }

  useEffect(() => {
    if(shouldGetDataset.current && emendasUniversidade.length > 0){
      setAnoAnterior(anoSelecionado);
      setEmendasAnterior(emendasUniversidade);
      getEmendasPartido(emendasUniversidade, anoSelecionado);
      shouldGetDataset.current = false;
    } 
    if ((anoSelecionado !== anoAnterior) && emendasUniversidade.length > 0){
      setAnoAnterior(anoSelecionado);
      getEmendasPartido(emendasUniversidade, anoSelecionado);
    }
    if (emendasUniversidade !== emendasAnterior) {
      setEmendasAnterior(emendasUniversidade);
      getEmendasPartido(emendasUniversidade, anoSelecionado);
    }
  }, [emendasUniversidade, anoSelecionado]);

  let newLeg = legenda.sort((a,b) => b.valor - a.valor );
  
  if ( datasets.length > 0 && datasets[0].total > 0 ){
    return <Box className='container-grafico-partido' style={styleBox}>
    { 
      titulo && <Typography variant="subtitle1" component="h4" className={"titulo-grafico"} >{titulo}</Typography>
    }
    <Pie data={{labels: labels, datasets: datasets}} options={options} style={styleGrafico}/>
    <Typography variant="subtitle1" component="h4" style={{marginLeft: "10px"}} >Legenda</Typography>
    <List style={{overflow: "auto", height: "100px", maxHeight: "100px"}}>
      {
        newLeg.map((partido,index) => {
          if (partido.valor > 0) {
            return <ListItem style={{color: partido.cor, paddingBottom: 0}} key={index}>
              <ListItemText primary={partido.nome} secondary={`R$ ${partido.valor.toLocaleString('pt-BR')}`} primaryTypographyProps={{ style: styleLegendaMainText }} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
              <ListItemText secondary={`${roundDouble(partido.percentual, 2)}%`} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
              <ListItemIcon ><Square style={{color: partido.cor, marginLeft: "15px"}}/></ListItemIcon>
            </ListItem>
          }
          return <></>
        })
      }
    </List>
  </Box>
  }
  return <Box className='container-grafico-emendas-acao' style={styleBox}>
    { 
      titulo && <Typography variant="subtitle1" component="h4" className={"titulo-grafico"} >{titulo}</Typography>
    }
    <Box className='box-tabela-vazia'>
      <Typography component='h5' variant='h6' style={{}}>Sem registros</Typography>
    </Box>
  </Box>
}
