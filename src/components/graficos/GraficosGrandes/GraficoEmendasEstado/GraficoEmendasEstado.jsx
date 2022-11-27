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

ChartJS.register(ArcElement, Tooltip, Legend, Title);
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
          display: true,
          text: 'Valor de Emendas Pagas por Partido',
      },
  },
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

export default function GraficoEmendasEstado({emendasUniversidades, universidades, styleBox, styleGrafico}) {
  const [labels, updateLabels] = useListState([]);
  const [datasets, updateDatasets] = useListState([]);
  const [legenda, setLegenda] = useListState([]);


  /**
   * ! Ver como pegar o total pago para depois separar por UO
   * @param {Array<EmendaUniversidade>} emendasUniversidades 
   * @returns {Array<Object>} emendasUo
   * * Para cada ano, criar o reduce de cada uo e adicionar no array por ano
   */
  function getEmendasUoAno(emendasUniversidades, ano, universidades) {
    return emendasUniversidades.reduce((acc, obj) => {
      if (obj.ano === ano) {
        let chave = obj["nroUo"];

        if(!acc[chave]) {
          acc[chave] = []
        };

        let universidade = universidades.find(universidade => {
          return universidade.uo === obj.nroUo
        })

        acc[chave].push({
          ano: obj.ano,
          rp: obj.rp,
          autor: obj.autor,
          tipoAutor: obj.tipoAutor,
          partido: obj.partido,
          ufAutor: obj.ufAutor,
          nroEmenda: obj.nroEmenda,
          orgao: obj.orgao,
          uo: obj.uo,
          acao: obj.acao,
          localizador: obj.localizador,
          gnd: obj.gnd,
          modalidade: obj.modalidade,
          naturezaDespesa: obj.naturezaDespesa,
          dotacaoInicialEmenda: obj.dotacaoInicialEmenda,
          dotacaoAtualEmenda: obj.dotacaoAtualEmenda,
          empenhado: obj.empenhado,
          liquidado: obj.liquidado,
          pago: obj.pago,
          nroUo: obj.nroUo,
        });
      }
      return acc
    }, {})
  }

  function getEmendasPorUoAnos(emendasUniversidades, anos) {
    return anos.reduce((acc, ano) => {
      if(!acc[ano]) {
        acc[ano] = []
      };

      acc[ano].push(getEmendasUoAno(emendasUniversidades, ano))
      return acc
    })
  }

  /**
   * 
   * @param {Array<EmendasUniversidade>} emendasUniversidades = [
   *  {
   *    siglaUniversidade: "UFRJ",
   *    emendas: []]
   *  }, 
   *  ...
   * ]
   */
  function getDataGrafico(emendasUniversidades) {
    let data = [];
    let localLabels = [];
    let colors = [];
    let borderColors = [];
    let localLegenda = [];
    
    emendasUniversidades.forEach(emenda => {
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
            valor: emenda.pago
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
    if(emendasUniversidades && emendasUniversidades.length > 0){
      getDataGrafico(emendasUniversidades);
    }
  }, [emendasUniversidades]);

  return labels.length > 0 ? <Box className='container-grafico-partido' style={styleBox}>
    <Pie data={{labels: labels, datasets: datasets}} options={options} style={styleGrafico}/>
    <Typography variant="subtitle1" component="h4" style={{marginLeft: "10px"}} >Legenda</Typography>
    <List style={{overflow: "auto", height: "100px", maxHeight: "100px"}}>
      {
        legenda.map(partido => {
          return <ListItem style={{color: partido.cor, paddingBottom: 0}}>
            <ListItemText primary={partido.nome} secondary={`R$ ${partido.valor}`} primaryTypographyProps={{ style: styleLegendaMainText }} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
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
