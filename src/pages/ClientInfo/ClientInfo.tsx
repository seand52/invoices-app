import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout/Layout';
import DashboardLayout from 'components/Dashboard/DashboardLayout/DashboardLayout';
import ClientDetailInfo from 'components/Clients/ClientDefailInfo/ClientDetailInfo';
import RadarChartComponent from 'components/Charts/RadarChart/RadarChart';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import {
  searchById,
  resetError,
  resetSuccess,
} from 'store/actions/clientActions';
import { connect } from 'react-redux';
import { ClientState } from 'store/reducers/clientsReducer';
import SpendData from 'components/SpendData/SpendData';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { searchAll } from 'store/actions/invoiceActions';
import { searchAll as searchAllSalesOrders } from 'store/actions/SalesOrderActions';
import SimpleTable from 'components/Clients/SimpleTable/SimpleTable';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';
import { navigate } from '@reach/router';
import { getSalesOrderState } from 'selectors/salesOrders';
import { SalesOrderState } from 'store/reducers/salesOrdersReducer';
import SimpleModal from 'components/SimpleModal/SimpleModal';
import ClientDetailsForm from 'components/Clients/ClientDetailsForm/ClientDetailsForm';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { downloadSalesOrder, downloadInvoice } from 'helpers/makeDownloadLink';
import * as invoicesApi from 'api/invoice';
import * as salesOrderApi from 'api/salesOrder';

interface Props {
  clientId: string;
  clientState: ClientState;
  invoicesState: InvoiceState;
  salesOrderState: SalesOrderState;
  searchById: (id: string) => void;
  searchAllInvoices: ({ url: string }) => void;
  searchAllSalesOrders: ({ url: string }) => void;
  resetError: () => void;
  resetSuccess: () => void;
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

const tableActions = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Edit',
    value: 'edit',
  },
  {
    label: 'Generate PDF',
    value: 'makePDF',
  },
];

export const ClientInfo = ({
  clientId,
  clientState,
  invoicesState,
  searchById,
  searchAllInvoices,
  searchAllSalesOrders,
  salesOrderState,
  resetError,
  resetSuccess,
}: Props) => {
  const [tab, setTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    searchById(clientId);
    return () => {
      resetError();
    };
  }, [clientId, searchById, resetError]);

  useEffect(() => {
    if (clientState.success) {
      setShowModal(false);
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Client updated correctly`,
        }),
      );
      resetSuccess();
    }
  }, [clientState.success, resetSuccess]);

  const handleChange = (_: any, newValue: number) => {
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

  const searchMoreInvoices = page => {
    searchAllInvoices({
      url: `${process.env.REACT_APP_API_URL}/invoices?page=${page}&limit=15&clientName=${clientState.selectedClient.name}`,
    });
  };

  const searchMoreSalesOrders = page => {
    searchAllInvoices({
      url: `${process.env.REACT_APP_API_URL}/invoices?page=${page}&limit=15&clientName=${clientState.selectedClient.name}`,
    });
  };

  const generatePdfInvoice = id => {
    invoicesApi
      .generatePdf(id)
      .then(res => {
        downloadInvoice(res.base64, res.id);
      })
      .catch(err => {
        Swal.fire(
          alertProp({
            type: 'error',
            title: 'Gee Whiz!',
            text: err.message,
          }),
        );
      });
  };

  const generatePdfSalesOrder = id => {
    salesOrderApi
      .generatePdf(id)
      .then(res => {
        downloadSalesOrder(res.base64, res.id);
      })
      .catch(err => {
        Swal.fire(
          alertProp({
            type: 'error',
            title: 'Gee Whiz!',
            text: err.message,
          }),
        );
      });
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
                <>
                  <div onClick={() => setShowModal(true)}>
                    <ClientDetailInfo
                      clientErr={clientState.error}
                      clientInfo={clientState.selectedClient}
                    />
                  </div>
                  {clientId && (
                    <SimpleModal
                      open={showModal}
                      closeModal={() => setShowModal(false)}
                    >
                      <ClientDetailsForm selectedClient={clientId} />
                    </SimpleModal>
                  )}
                </>
              }
              rightItem={
                <RadarChartComponent data={clientState.popularProducts} />
              }
            />
          )}
          {tab === 1 && (
            <>
              <h2>{clientState.selectedClient.name} Invoices</h2>
              <SimpleTable
                rows={invoicesState.invoices}
                tableActions={tableActions}
                searchMore={searchMoreInvoices}
                generatePdf={generatePdfInvoice}
                handleEdit={id => navigate(`/invoice/${id}/edit`)}
              />
            </>
          )}
          {tab === 2 && (
            <>
              <h2>{clientState.selectedClient.name} Sales Orders</h2>
              <SimpleTable
                rows={salesOrderState.salesOrders}
                handleEdit={id => navigate(`/sales-order/${id}/edit`)}
                generatePdf={generatePdfSalesOrder}
                tableActions={tableActions}
                searchMore={searchMoreSalesOrders}
              />
            </>
          )}
        </>
      }
    />
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    clientState: getClientsState(state),
    invoicesState: getInvoiceState(state),
    salesOrderState: getSalesOrderState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchById: id => dispatch(searchById(id)),
    searchAllInvoices: name => dispatch(searchAll(name)),
    searchAllSalesOrders: name => dispatch(searchAllSalesOrders(name)),
    resetError: () => dispatch(resetError()),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
