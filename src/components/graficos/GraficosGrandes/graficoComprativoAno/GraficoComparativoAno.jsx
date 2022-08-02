import "./graficoComparativoAno.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";
import { axios } from 'axios';

async function getData(vari) {
  axios.get(`localhost:3333/universidades`)
      .then(res => {
        vari = res.data;
      })
}

export default function GraficoComparativoAno({ data, dataKey, grid, style}) {
  const dados = getData();

  return (
      <ResponsiveContainer width="100%"  aspect={4 / 1}>
        <LineChart data={dados} >
          <XAxis dataKey="ano" stroke="#5550bd" />
          {
            data.map((universidade) => {
              return <Line type="monotone" dataKey={universidade.nome} stroke="#5550bd"/>
            })
          }
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
  );
}
