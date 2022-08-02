import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Legend,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

const data = [
    {ano: 2019, EmendasRelator: 4000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000, total: 7000000},
    {ano: 2020, EmendasRelator: 4000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000},
    {ano: 2021, EmendasRelator: 4000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000},
    {ano: 2022, EmendasRelator: 4000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000},
    {ano: 2018, EmendasRelator: 4000000, EmendasBancada: 2000000, EmendasIndividuais: 4500000},
];

function totalEmendas(entrada) {
  return (entrada.EmendasRelator + entrada.EmendasBancada + entrada.EmendasIndividuais);
};

export default function EmendasPorAno() {
    
    return (
        <div className="chart">
            <ResponsiveContainer width="100%">
                <BarChart width={600} height={300} data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="ano"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="EmendasRelator" stackId="a" fill="#8884d8" />
                    <Bar dataKey="EmendasBancada" stackId="a" fill="#82ca9d"/>
                    <Bar dataKey="EmendasIndividuais" stackId="a" fill="#1976D2">
                        <LabelList position="top" content={totalEmendas(data)}/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
