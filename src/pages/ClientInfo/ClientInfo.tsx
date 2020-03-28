import React, { useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import DashboardLayout from 'components/Dashboard/DashboardLayout/DashboardLayout';
import BarChartComponent from 'components/Charts/BarChart/BarChart';
import ClientDetailInfo from 'components/Clients/ClientDefailInfo/ClientDetailInfo';
import RadarChartComponent from 'components/Charts/RadarChart/RadarChart';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import { searchById } from 'store/actions/clientActions';
import { connect } from 'react-redux';
import { ClientState } from 'store/reducers/clientsReducer';

interface Props {
  clientId: string;
  clientState: ClientState;
  searchById: (id) => void;
}

export enum ErrorTypes {
  CLIENT_LOAD = 'CLIENT_LOAD_ERR',
  SALES_DATA_LOAD = 'CLIENT_SALES_ERR',
  TOP_PRODUCTS_LOAD = 'TOP_PRODUCTS_LOAD_ERR',
}
export const ClientInfo = ({ clientId, clientState, searchById }: Props) => {
  useEffect(() => {
    searchById(clientId);
  }, []);
  return (
    <Layout
      main={
        <DashboardLayout
          main={
            <BarChartComponent barChartData={clientState.spendData['2020']} />
          }
          leftItem={
            <ClientDetailInfo
              clientErr={clientState.error}
              clientInfo={clientState.selectedClient}
            />
          }
          rightItem={<RadarChartComponent data={clientState.popularProducts} />}
        />
      }
    />
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    clientState: getClientsState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchById: id => dispatch(searchById(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
