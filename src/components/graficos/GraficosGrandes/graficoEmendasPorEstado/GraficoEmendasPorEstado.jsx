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
import "./index.css";
import { Bar } from 'react-chartjs-2';
import { Box, CircularProgress, ListItemIcon } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useListState } from '@mantine/hooks';
import { estados } from '../../../../constants';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Square } from '@mui/icons-material';
import { List } from '@mui/material';
import { Typography } from '@mui/material';
import { roundDouble } from '../../../../utils';
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
            text: 'Emendas pagas por estado (em R$) ',
            position: 'top'
        },
        legend: {
            display: false,
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

const ufEmenda = (emenda, listaUniversidades) => {
    try {
        const universidade = listaUniversidades.find(universidade => universidade.uo === emenda.nroUo);
        return universidade.uf;
    } catch(e){
        console.log(e.message);
    }
    
}

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

const styleLegendaMainText = {
    fontSize: "0.7em",
    color: "black"
}

function EmendasPorAno({emendasUniversidades, anoSelecionado, universidades, styleBox, styleGrafico}) {
    const [labels, updateLabels] = useListState([]);
    const [datasets, updateDatasets] = useListState([]);
    const [legenda, setLegenda] = useListState([]);
    const [anoAnterior, setAno] = useState(-1);
    const shouldGetDataset = useRef(true);

    useEffect(() => {
        if(shouldGetDataset.current){
          setAno(anoSelecionado);
          getEmendasUf(emendasUniversidades, anoSelecionado, universidades);
          shouldGetDataset.current = false;
        } else if (anoSelecionado !== anoAnterior){
          setAno(anoSelecionado);
          getEmendasUf(emendasUniversidades, anoSelecionado, universidades);
        }
      }, [emendasUniversidades, anoSelecionado, universidades]);

    function getEmendasUf(emendasUniversidades, anoSelecionado, listaUniversidades) {
        let colors = [];
        let borderColors = [];
        let localLegenda = [];

        const pagoUf = {
            labels: [],
            data: []
        }
        
        const newEmUn = emendasUniversidades.sort((a,b) => a.nroUo - b.nroUo);
        newEmUn.forEach((obj) => {
            const confereAnoSelecionado = anoSelecionado !== 0 && `${obj.ano}` === anoSelecionado;
            const uf = ufEmenda(obj, listaUniversidades)

            if (anoSelecionado === 0 || confereAnoSelecionado) {
                //* insere os valores na primeira vez e define as cores
                if(!pagoUf.labels.find(item => item === uf)) {
                const colorRgb = randomPastelColorRGB();

                pagoUf.labels.push(uf);
                pagoUf.data.push(obj.pago);

                colors.push(getRgbString(colorRgb, false));
                borderColors.push(getRgbString(colorRgb, false));
                localLegenda.push({
                    nome: uf,
                    cor: getRgbString(colorRgb, true),
                    valor: 0,
                    percentual: 0
                })
                } else {
                    // * Se já tem, pega o indice e soma o valor
                    const index = pagoUf.labels.indexOf(uf);

                    pagoUf.data[index] += obj.pago;
                }
            }
        });
        const localDatasets = []
        
        localDatasets.push({
            label: "Pago",
            data: pagoUf.data,
            backgroundColor: colors,
            borderColors: borderColors,
            borderWidth: 1
        });
        updateDatasets.setState(localDatasets);
        updateLabels.setState(pagoUf.labels);
        const total = pagoUf.data.reduce((acc,valor) => {
            return acc += valor
        });
        localLegenda.forEach((item,index) => {
            item.valor = pagoUf.data[index];
            item.percentual = (100 * item.valor) / total;
        });
        setLegenda.setState(localLegenda);
    }
    let newLeg = legenda.sort((a,b) => b.valor - a.valor );
    return(<>
        <Bar className={"grafico-barras"} style={styleGrafico} data={{
            labels: labels,
            datasets: datasets
        }} options={options}/>
        <Typography variant="subtitle1" component="h4" style={{marginLeft: "10px"}} >Legenda</Typography>
        <List style={{overflow: "auto", height: "100px", maxHeight: "100px", width: "100%"}}>
            {
                newLeg.map( (uf,index) => {
                    return <ListItem style={{color: uf.cor, paddingBottom: 0}} key={index}>
                        <ListItemText primary={uf.nome} secondary={`R$ ${uf.valor.toLocaleString('pt-BR')}`} primaryTypographyProps={{ style: styleLegendaMainText }} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
                        <ListItemText secondary={`${roundDouble(uf.percentual, 2)}%`} secondaryTypographyProps={{ style: {fontSize: "0.7em", color: "dark gray"} }}/>
                        <ListItemIcon><Square style={{color: uf.cor, marginLeft: "15px"}}/></ListItemIcon>
                    </ListItem>
                })
            }
        </List>
    </>)
}
export default EmendasPorAno;