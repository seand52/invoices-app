import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

export type PopularProducts = Array<{
  fullMark: number;
  A: number;
  reference: string;
}>;
type RadarChartProps = {
  data: PopularProducts;
};

const RadarChartComponent = ({ data }: RadarChartProps) => {
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
        <Radar
          dataKey='# of items sold'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default RadarChartComponent;
