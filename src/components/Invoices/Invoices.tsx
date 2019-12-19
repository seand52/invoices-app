import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteInvoice,
  resetSuccess,
  searchOne,
} from 'store/actions/invoiceActions';
import { InitialState } from 'store';
import { getInvoiceState } from 'selectors/invoices';
import Overview from 'components/Overview/Overview';
import Swal from 'sweetalert2';
import { alertProp, confirmationAlert } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { InvoiceState } from 'store/reducers/invoicesReducer';
import { navigate } from '@reach/router';
import { InvoicesPaginated } from 'api/responses/invoices.type';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  searchOne: (id) => void;
  deleteInvoice: (id: string) => void;
  resetSuccess: () => void;
  invoiceState: InvoiceState;
}

interface Data {
  id: string;
  client: string;
  totalPrice: string;
  date: string;
  paymentType: string;
  actions: 'actions';
}

export interface InvoicesHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  nested?: { key: 'client'; property: string }[];
  currency?: boolean;
}

const headCells: InvoicesHeadCell[] = [
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
    currency: true,
  },

  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'paymentType', numeric: false, disablePadding: true, label: 'Payment' },
  { id: 'actions', numeric: false, disablePadding: true, label: '' },
];

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
    label: 'Delete',
    value: 'delete',
  },
  {
    label: 'Make transport',
    value: 'transport',
  },
];

const Invoices = ({
  path,
  searchAll,
  searchOne,
  invoiceState,
  resetSuccess,
  deleteInvoice: deleteInvoiceAction,
}: Props) => {
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/invoices?page=1&limit=10' });
  }, []);

  useEffect(() => {
    if (invoiceState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Invoice ${localState.action} correctly`,
        }),
      );
      resetSuccess();
      navigate('/invoices');
    }
  }, [invoiceState.success]);

  const onSearchChange = e => {
    localDispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const submitSearch = e => {
    e.preventDefault();
    if (localState.search !== '') {
      searchAll({
        url: `http://localhost:3000/api/invoices?page=1&limit=10&clientName=${localState.search}`,
      });
    } else {
      searchAll({
        url: `http://localhost:3000/api/invoices?page=1&limit=10`,
      });
    }
  };

  const onSearchClear = () => {
    localDispatch({ type: 'SET_SEARCH', payload: '' });
    searchAll({
      url: `http://localhost:3000/api/invoices?page=1&limit=10`,
    });
  };

  const onAddNewInvoice = e => {
    e.preventDefault();
    navigate('/invoices/new');
  };

  const deleteInvoice = (ids: string[]) => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to delete the client?',
        confirmButtonText: 'Yes, delete it!',
      }),
    ).then(result => {
      if (result.value) {
        deleteInvoiceAction(ids[0]);
        localDispatch({ type: 'DELETE_INVOICE' });
      }
    });
  };

  const editInvoice = (id: string) => {
    navigate(`/invoice/${id}/edit`);
  };

  const onNextPage = newPage => {
    searchAll({
      url: `http://localhost:3000/api/invoices?page=${newPage}&limit=${invoiceState.invoices.rowsPerPage}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    searchAll({
      url: `http://localhost:3000/api/invoices?page=${invoiceState.invoices.currentPage}&limit=${rowsPerPage}`,
    });
  };
  return (
    <div>
      <Layout
        main={
          <Overview<InvoicesPaginated, InvoicesHeadCell[]>
            searchState={localState.search}
            tableActions={tableActions}
            onSearchClear={onSearchClear}
            loading={invoiceState.loading}
            editItem={editInvoice}
            deleteItem={deleteInvoice}
            tableHeader={headCells}
            tableData={invoiceState.invoices}
            onAddNew={onAddNewInvoice}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            error={invoiceState.error}
          />
        }
      />
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchOne: id => dispatch(searchOne(id)),
    deleteInvoice: id => dispatch(deleteInvoice(id)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
