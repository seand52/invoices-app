import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { SpendData } from 'store/reducers/clientsReducer';
const data = [
  {
    name: 'January',
    spend: 0,
  },

  {
    name: 'February',
    spend: 0,
  },
  {
    name: 'March',
    spend: 112,
  },
  {
    name: 'April',
    spend: 50,
  },
  {
    name: 'May',
    spend: 0,
  },
  {
    name: 'June',
    spend: 0,
  },
  {
    name: 'July',
    spend: 0,
  },
  {
    name: 'August',
    spend: 0,
  },
  {
    name: 'September',
    spend: 0,
  },
  {
    name: 'October',
    spend: 0,
  },
  {
    name: 'November',
    spend: 0,
  },
  {
    name: 'December',
    spend: 0,
  },
];

interface Props {
  barChartData: SpendData;
}
const BarChartComponent = ({ barChartData }: Props) => {
  if (!barChartData) {
    return <h2>No data was found for this client yet</h2>;
  }
  console.log(barChartData);
  return (
    <div>
      <h2>Client Sales</h2>
      <BarChart width={1400} height={500} data={barChartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis style={{ marginTop: '50x' }} dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='spend' fill='#8884d8' />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
