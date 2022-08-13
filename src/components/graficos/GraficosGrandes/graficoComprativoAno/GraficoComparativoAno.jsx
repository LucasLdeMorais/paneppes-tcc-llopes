import "./graficoComparativoAno.css";
import { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useListState } from '@mantine/hooks';
  


function getEmendasTotaisPorAno(emendasParl) {
  if (emendasParl.length === 0){
    return null
  }
  const dadosObjeto = emendasParl.reduce((acc, curr) => {
    acc[`${curr.uo}`] = curr.pago
    acc[`ano`] = `${curr.ano}`
    return acc
  })
  console.log(dadosObjeto)
  return dadosObjeto
}

export default function GraficoComparativoAno({ emendas, universidades, dataKey, grid, style}) {
  // const [universidadesState, setUniversidadesState] = useListState(universidades)
  const [data, setData] = useListState([])

  useEffect(() => {
    if ( data.length === 0 ) {
      setData.setState(getEmendasTotaisPorAno(emendas))
    }
  })

  return (
      <ResponsiveContainer width="100%"  aspect={4 / 1}>
        <LineChart data={() => {
            if (data.length > 0){
              return data
            } else {
              return [{
                  ano: 2015
                },
                {
                  ano: 2016
                },
                {
                  ano: 2017
                }
              ]} 
          }} >
          <XAxis dataKey="ano" stroke="#5550bd" />
          <YAxis dataKey="pago" stroke="#5550bd" />
          {
            universidades.map((universidade, index) => {
              return <Line type="monotone" dataKey={universidade} stroke="#5550bd" key={index}/>
            })
          }
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
  );
}
