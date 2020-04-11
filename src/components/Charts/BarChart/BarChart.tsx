import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Text,
} from 'recharts';
import { ChartData } from 'store/reducers/clientsReducer';

interface Props {
  barChartData: Array<ChartData>;
}

const BarChartComponent = ({ barChartData }: Props) => {
  return (
    <div>
      <BarChart width={1400} height={500} data={barChartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        {/* 
        //@ts-ignore */}
        <YAxis label={{ value: 'Euros', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey='spend' fill='#8884d8' />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
