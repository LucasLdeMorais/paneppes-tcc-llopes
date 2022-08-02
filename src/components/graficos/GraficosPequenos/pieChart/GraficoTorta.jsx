import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./graficoTorta.css";
import { Typography } from "@mui/material";

export default function GraficoTorta() {
  const data01 = [
    { name: 'MAQUINAS E EQUIPAMENTOS ENERGETICOS', value: 402000 },
    { name: 'MATERIAL DE PROTECAO E SEGURANCA', value: 320000 },
    { name: 'MATERIAL DE EXPEDIENTE', value: 300000 },
    { name: 'Group D', value: 200000 },
    { name: 'Group E', value: 278000 },
    { name: 'Group F', value: 189000 },
  ];

  return (
      <ResponsiveContainer width="50%" height="80%">
        <PieChart >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
  );
}
