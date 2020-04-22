import React, { useState } from 'react';
import BarChartComponent from 'components/Charts/BarChart/BarChart';
import { SpendData as SpendDataType } from 'store/reducers/clientsReducer';
import { ButtonGroup, Button } from '@material-ui/core';
interface Props {
  barChartData: SpendDataType;
}

export default function SpendData({ barChartData }: Props) {
  const [year, setSelectedYear] = useState('TOTAL');
  const years = Object.keys(barChartData).map(key => key);
  const noSales = Object.keys(barChartData).length <= 1;
  console.log(barChartData);
  if (noSales) {
    return <h2>There is no data for this client yet</h2>;
  }
  console.log(barChartData);
  console.log(year);
  return (
    <div>
      <h2>Client Sales</h2>
      <ButtonGroup size='large' color='primary' aria-label='Spend data years'>
        {years &&
          years.length > 1 &&
          years.map((item, index) => (
            <Button
              key={index}
              style={
                item === year.toString()
                  ? {
                      backgroundColor: '#4654b4',
                      opacity: '0.9',
                      color: 'black',
                    }
                  : {}
              }
              onClick={() => {
                setSelectedYear(item);
              }}
            >
              {item}
            </Button>
          ))}
      </ButtonGroup>
      <BarChartComponent barChartData={barChartData[year.toString()]} />
    </div>
  );
}
