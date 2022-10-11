import { LinearScale } from '@mui/icons-material';
import { CategoryScale, Legend, PointElement, Tooltip, Chart as ChartJS } from 'chart.js';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/system';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );
const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            position: 'left'
        }
    }
}

const labels = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']

const data = {
    labels,
    datasets: [
        {
            label: 'UFRJ',
            data: [100000, 22200, 350000, 456677, 123000, 123330, 30000, 200000],
            borderColor:'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.1,
            fill: false
        },
        {
            label: 'UFF',
            data: [140000, 12200, 650000, 256677, 423000, 223330, 30000, 200000],
            borderColor:'rgb(71, 188, 159)',
            backgroundColor: 'rgba(71, 188, 159, 0.5)',  
            tension: 0.1,
            fill: false
        }
    ]
}

const LinhaHorizontal = () => {
    return (<Box className='container-grafico'><Line data={data} options={options} /></Box>)
}

export default LinhaHorizontal;