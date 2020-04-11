import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout/Layout';
import DashboardLayout from 'components/Dashboard/DashboardLayout/DashboardLayout';
import ClientDetailInfo from 'components/Clients/ClientDefailInfo/ClientDetailInfo';
import RadarChartComponent from 'components/Charts/RadarChart/RadarChart';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import { searchById } from 'store/actions/clientActions';
import { connect } from 'react-redux';
import { ClientState } from 'store/reducers/clientsReducer';
import SpendData from 'components/SpendData/SpendData';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { searchAll } from 'store/actions/invoiceActions';
import { searchAll as searchAllSalesOrders } from 'store/actions/SalesOrderActions';

interface Props {
  clientId: string;
  clientState: ClientState;
  searchById: (id) => void;
  searchAllInvoices: (name) => void;
  searchAllSalesOrders: (name) => void;
}

export enum ErrorTypes {
  CLIENT_LOAD = 'CLIENT_LOAD_ERR',
  SALES_DATA_LOAD = 'CLIENT_SALES_ERR',
  TOP_PRODUCTS_LOAD = 'TOP_PRODUCTS_LOAD_ERR',
}

enum TabsOptions {
  DASHBOARD = 0,
  INVOICES = 1,
  SALES_ORDERS = 2,
}
export const ClientInfo = ({
  clientId,
  clientState,
  searchById,
  searchAllInvoices,
  searchAllSalesOrders,
}: Props) => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    searchById(clientId);
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    if (newValue === TabsOptions.INVOICES) {
      searchAllInvoices({
        url: `${process.env.REACT_APP_API_URL}/invoices?page=1&limit=15&clientName=${clientState.selectedClient.name}`,
      });
    }
    if (newValue === TabsOptions.SALES_ORDERS) {
      searchAllSalesOrders({
        url: `${process.env.REACT_APP_API_URL}/sales-orders?page=1&limit=15&clientName=${clientState.selectedClient.name}`,
      });
    }
  };

  return (
    <Layout
      main={
        <>
          <Paper square>
            <Tabs
              value={tab}
              indicatorColor='primary'
              textColor='primary'
              onChange={handleChange}
            >
              <Tab label='Dashboard' />
              <Tab label='Invoices' />
              <Tab label='Sales Orders' />
            </Tabs>
          </Paper>
          {tab === 0 && (
            <DashboardLayout
              main={<SpendData barChartData={clientState.spendData} />}
              leftItem={
                <ClientDetailInfo
                  clientErr={clientState.error}
                  clientInfo={clientState.selectedClient}
                />
              }
              rightItem={
                <RadarChartComponent data={clientState.popularProducts} />
              }
            />
          )}
        </>
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
    searchAllInvoices: name => dispatch(searchAll(name)),
    searchAllSalesOrders: name => dispatch(searchAllSalesOrders(name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
