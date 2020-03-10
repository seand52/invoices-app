import React from 'react';
import Layout from 'components/Layout/Layout';
import DashboardLayout from 'components/Dashboard/DashboardLayout/DashboardLayout';
import BarChartComponent from 'components/Charts/BarChart/BarChart';
import ClientDetailInfo from 'components/Clients/ClientDefailInfo/ClientDetailInfo';
import RadarChartComponent from 'components/Charts/RadarChart/RadarChart';

interface Props {
  clientId: string;
}
export default function ClientInfo({ clientId }: Props) {
  return (
    <Layout
      main={
        <DashboardLayout
          main={<BarChartComponent />}
          leftItem={<ClientDetailInfo />}
          rightItem={<RadarChartComponent />}
        />
      }
    />
  );
}
