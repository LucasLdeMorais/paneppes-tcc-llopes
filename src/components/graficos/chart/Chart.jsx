import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data, dataKey, grid }) {
  const dados = [
    {ano: 2015, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 7500000},
    {ano: 2016, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 6500000},
    {ano: 2017, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 4500000},
    {ano: 2018, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 9500000},
    {ano: 2019, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 2500000},
    {ano: 2020, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 7500000},
    {ano: 2021, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 8500000},
    {ano: 2022, EmendasRelator: 1000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, totalEmendas: 4500000},
  ];

  return (
    <ResponsiveContainer width="100%"  aspect={4 / 1}>
      <LineChart data={dados} >
        <XAxis dataKey="ano" stroke="#5550bd" />
        <Line type="monotone" dataKey={"totalEmendas"} stroke="#5550bd"/>
        <Tooltip />
        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
      </LineChart>
    </ResponsiveContainer>
  );
}
