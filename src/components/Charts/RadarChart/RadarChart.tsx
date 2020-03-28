import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export type PopularProducts = ReadonlyArray<{
  fullMark: number;
  A: number;
  reference: string;
}>;
type RadarChartProps = {
  data: PopularProducts;
};
const RadarChartComponent = ({ data }: RadarChartProps) => {
  debugger;
  if (!data.length) {
    return <h2>No data was found for this client yet</h2>;
  }
  const maxValue = data.length && data[0].fullMark;
  return (
    <div>
      <h2>Popular Products</h2>
      <RadarChart outerRadius={90} width={870} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='reference' />
        <PolarRadiusAxis angle={30} domain={[0, maxValue]} />
        <Radar dataKey='A' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default RadarChartComponent;
