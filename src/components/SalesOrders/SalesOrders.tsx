import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteSalesOrder,
  resetSuccess,
  searchOne,
} from 'store/actions/SalesOrderActions';
import { InitialState } from 'store';
import { getSalesOrderState } from 'selectors/salesOrders';
import Overview from 'components/Overview/Overview';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { SalesOrderState } from 'store/reducers/salesOrdersReducer';
import { navigate } from '@reach/router';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  searchOne: (id) => void;
  deleteSalesOrder: (id: string) => void;
  resetSuccess: () => void;
  salesOrderState: SalesOrderState;
}

interface Data {
  id: string;
  client: string;
  totalPrice: string;
  date: string;
  paymentType: string;
  actions: 'actions';
}

export interface SalesOrdersHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  nested?: { key: 'client'; property: string }[];
}

const headCells: SalesOrdersHeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: true,
    label: 'Client',
    nested: [{ key: 'client', property: 'name' }],
  },
  {
    id: 'totalPrice',
    numeric: false,
    disablePadding: true,
    label: 'Price',
  },

  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'paymentType', numeric: false, disablePadding: true, label: 'Payment' },
  { id: 'actions', numeric: false, disablePadding: true, label: '' },
];

const SalesOrders = ({
  path,
  searchAll,
  salesOrderState,
  resetSuccess,
  deleteSalesOrder: deleteSalesOrderAction,
}: Props) => {
  const [search, setSearch] = useState('');
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({
      url: 'http://localhost:3000/api/sales-orders?page=1&limit=10',
    });
  }, []);

  useEffect(() => {
    if (salesOrderState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Sales Order ${localState.action} correctly`,
        }),
      );
      resetSuccess();
      navigate('/sales-orders');
    }
  }, [salesOrderState.success, resetSuccess]);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
  };

  const onAddNewSalesOrder = e => {
    e.preventDefault();
    navigate('/sales-order/new');
  };

  const deleteSalesOrder = (ids: string[]) => {
    deleteSalesOrderAction(ids[0]);
    localDispatch({ type: 'DELETE_SALES_ORDER' });
  };

  const editSalesOrder = (id: string) => {
    navigate(`/sales-order/${id}/edit`);
  };

  const onNextPage = newPage => {
    searchAll({
      url: `http://localhost:3000/api/sales-orders?page=${newPage}&limit=${salesOrderState.salesOrders.itemCount}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    searchAll({
      url: `http://localhost:3000/api/sales-orders?page=${salesOrderState.salesOrders.currentPage}&limit=${rowsPerPage}`,
    });
  };
  return (
    <div>
      <Layout
        main={
          salesOrderState.loading ? (
            <p>Loading... </p>
          ) : (
            <Overview
              editItem={editSalesOrder}
              deleteItem={deleteSalesOrder}
              tableHeader={headCells}
              tableData={salesOrderState.salesOrders}
              onAddNew={onAddNewSalesOrder}
              onSearchChange={onSearchChange}
              onSubmitSearch={submitSearch}
              onNextPage={onNextPage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          )
        }
      />
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    salesOrderState: getSalesOrderState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchOne: id => dispatch(searchOne(id)),
    deleteSalesOrder: id => dispatch(deleteSalesOrder(id)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrders);
