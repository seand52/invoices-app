import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteClient,
  resetSuccess,
} from 'store/actions/clientActions';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import { ClientState } from 'store/reducers/clientsReducer';
import Overview from 'components/Overview/Overview';
import SimpleModal from 'components/SimpleModal/SimpleModal';
import ClientDetailsForm from './ClientDetailsForm/ClientDetailsForm';
import Swal from 'sweetalert2';
import { alertProp, confirmationAlert } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { makeInvoiceClient } from 'store/actions/invoiceFormActions';
import { navigate } from '@reach/router';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  deleteClient: (id: string) => void;
  resetSuccess: () => void;
  makeInvoiceForClient: (id, name) => void;
  clientState: ClientState;
}

interface Data {
  name: string;
  email: string;
  telephone1: string;
  telephone2: string;
  address: string;
  city: string;
  actions: 'actions';
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  {
    id: 'telephone1',
    numeric: false,
    disablePadding: true,
    label: 'Telephone',
  },

  { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
  { id: 'city', numeric: false, disablePadding: true, label: 'City' },
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
    label: 'New Invoice',
    value: 'newInvoice',
  },
];

const Clients = ({
  searchAll,
  clientState,
  resetSuccess,
  deleteClient: deleteClientAction,
  makeInvoiceForClient,
}: Props) => {
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/clients?page=1&limit=10' });
  }, []);

  useEffect(() => {
    if (clientState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Client ${localState.action} correctly`,
        }),
      );
      resetSuccess();
    }
  }, [clientState.success]);

  const onSearchChange = e => {
    localDispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const submitSearch = e => {
    e.preventDefault();
    if (localState.search !== '') {
      searchAll({
        url: `http://localhost:3000/api/clients?page=1&limit=10&name=${localState.search}`,
      });
    } else {
      searchAll({
        url: `http://localhost:3000/api/clients?page=1&limit=10`,
      });
    }
  };

  const onSearchClear = () => {
    localDispatch({ type: 'SET_SEARCH', payload: '' });
    searchAll({
      url: `http://localhost:3000/api/clients?page=1&limit=10`,
    });
  };

  const onAddNewClient = e => {
    e.preventDefault();
    localDispatch({ type: 'ADD_CLIENT' });
  };

  const deleteClient = (ids: string[]) => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to delete the client?',
        confirmButtonText: 'Yes, delete it!',
      }),
    ).then(result => {
      if (result.value) {
        deleteClientAction(ids[0]);
        localDispatch({ type: 'DELETE_CLIENT' });
      }
    });
  };

  const editClient = (id: string) => {
    localDispatch({ type: 'EDIT_CLIENT', payload: id });
  };

  const onNextPage = newPage => {
    searchAll({
      url: `http://localhost:3000/api/clients?page=${newPage}&limit=${clientState.clients.rowsPerPage}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    searchAll({
      url: `http://localhost:3000/api/clients?page=${clientState.clients.currentPage}&limit=${rowsPerPage}`,
    });
  };

  const makeNewInvoiceForClient = (id, name) => {
    makeInvoiceForClient(id, name);
    navigate('invoices/new');
  };
  console.log(localState);
  return (
    <div>
      <Layout
        main={
          <Overview
            title='Clients'
            searchState={localState.search}
            newInvoice={makeNewInvoiceForClient}
            tableActions={tableActions}
            onSearchClear={onSearchClear}
            loading={clientState.loading}
            editItem={editClient}
            deleteItem={deleteClient}
            tableHeader={headCells}
            tableData={clientState.clients}
            onAddNew={onAddNewClient}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            error={clientState.error}
          />
        }
      />
      <SimpleModal
        open={localState.showModal}
        closeModal={() => localDispatch({ type: 'TOGGLE_MODAL' })}
      >
        <ClientDetailsForm selectedClient={localState.selectedClientId} />
      </SimpleModal>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    clientState: getClientsState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    deleteClient: id => dispatch(deleteClient(id)),
    resetSuccess: () => dispatch(resetSuccess()),
    makeInvoiceForClient: (id, name) => dispatch(makeInvoiceClient(id, name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
