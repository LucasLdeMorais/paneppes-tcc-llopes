import React, { useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/system';
import "./index.css";
import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Square } from '@mui/icons-material';
import { Typography } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { roundDouble } from '../../../../utils';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);
const options = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
        position: 'right',
        display: false
    },
    tooltip: {
    },
    scales:{
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            userCallback: function(value, index, values) {
                return value.toLocaleString('pt-BR');
            }
          }
        }
      ]
    },
    title: {
        display: false,
        text: 'Valor de Emendas Pagas por Ação'
    },
    datalabels: {
      formatter: (value, ctx) => {
        let dataset = ctx.dataset;
        let soma = 0;
        dataset.data.forEach(data => {
          soma += data;
        });
        let percentage = roundDouble(((value / soma) * 100), 2) + '%';
        if (percentage === "0%") {
          return null;
        }
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

export default function GraficoEmendasAcao({emendasUniversidade, styleBox, styleGrafico, anoSelecionado, titulo}) {
  const [labels, updateLabels] = useListState([]);
  const [datasets, updateDatasets] = useListState([]);
  const [legenda, setLegenda] = useListState([]);
  const [anoAnterior, setAnoAnterior] = useState(-1);
  const [emendasAnterior, setEmendasAnterior] = useState();
  const shouldGetDataset = useRef(true);

  function getEmendasAcao(emendasUniversidade, anoSelecionado) {
    let colors = [];
    let borderColors = [];
    let localLegenda = [];

    const pagoAcao = {
      labels: [],
      data: [],
      codigos: []
    }
    
    emendasUniversidade.forEach((obj) => {
      const confereAnoSelecionado = anoSelecionado !== 0 && `${obj.ano}` === anoSelecionado;

      if (anoSelecionado === 0 || confereAnoSelecionado) {
        //* insere os valores na primeira vez e define as cores
        if(!pagoAcao.codigos.find(item => item === obj.acao.substring(0,7))) {
          const colorRgb = randomPastelColorRGB();
          pagoAcao.codigos.push(obj.acao.substring(0,7));
          pagoAcao.labels.push(`${obj.acao.substring(0,55)}(...)`);
          pagoAcao.data.push(obj.pago);

          colors.push(getRgbString(colorRgb, true));
          borderColors.push(getRgbString(colorRgb, false));
          localLegenda.push({
            nome: obj.acao.substring(7,),
            cor: getRgbString(colorRgb, true),
            valor: 0,
            percentual: 0
          })
        } else {
          // * Se já tem, pega o indice e soma o valor
          const index = pagoAcao["codigos"].indexOf(obj.acao.substring(0,7));
          pagoAcao.data[index] += obj.pago;
        }
      }
    });
    
    
    // * Seta o valor acumulado na legenda

    let total = 0;
    if (pagoAcao.data.length > 0){
        total = pagoAcao.data.reduce((acc,valor) => {
          return acc += valor
        });
    }
    localLegenda.forEach((item,index) => {
      item.valor = pagoAcao.data[index];
      item.percentual = (100 * item.valor) / total;
    });

    updateDatasets.setState([{
      label: "# Pago em R$",
      data: pagoAcao.data,
      backgroundColor: colors,
      borderColors: borderColors,
      borderWidth: 1,
      total: total
    }]);
    updateLabels.setState(pagoAcao.labels);
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
      getEmendasAcao(emendasUniversidade, anoSelecionado);
      shouldGetDataset.current = false;
    } 
    if ((anoSelecionado !== anoAnterior) && emendasUniversidade.length > 0){
      setAnoAnterior(anoSelecionado);
      getEmendasAcao(emendasUniversidade, anoSelecionado);
    }
    if (emendasUniversidade !== emendasAnterior) {
      setEmendasAnterior(emendasUniversidade);
      getEmendasAcao(emendasUniversidade, anoSelecionado);
    }
  }, [emendasUniversidade, anoSelecionado]);

  let newLeg = legenda.sort((a,b) => b.valor - a.valor );

  return datasets[0]!== undefined && datasets[0].total > 0 ? 
  <Box className='container-grafico-emendas-acao' style={styleBox}>
    { 
      titulo && <Typography variant="subtitle1" component="h4" className={"titulo-grafico"} >{titulo}</Typography>
    }
    <Pie data={{labels: labels, datasets: datasets}} options={options} style={styleGrafico} />
    <Typography variant="subtitle1" component="h4" style={{marginLeft: "10px"}} >Legenda</Typography>
    <List style={{overflow: "auto", height: "100px", maxHeight: "100px"}}>
      {
        newLeg.map((acao,index) => {
          if (acao.valor > 0) {
            return <ListItem style={{color: acao.cor, paddingBottom: 0}} key={index}>
              <ListItemText primary={`${acao.nome.substring(0,60)}(...)`} secondary={`R$ ${acao.valor.toLocaleString('pt-BR')}`} primaryTypographyProps={{ style: styleLegendaMainText }} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
              <ListItemText secondary={`${roundDouble(acao.percentual, 2)}%`} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
              <ListItemIcon ><Square style={{color: acao.cor, marginLeft: "15px"}}/></ListItemIcon>
            </ListItem>
          }
          return <></>
        })
      }
    </List>
  </Box> : 
  <Box className='container-grafico-emendas-acao' style={styleBox}>
    { 
      titulo && <Typography variant="subtitle1" component="h4" className={"titulo-grafico"}>{titulo}</Typography>
    }
    <Box className='box-grafico-acao-vazio'>
      <Typography component='h5' variant='h6' style={{}}>Sem registros</Typography>
    </Box>
  </Box>
}
