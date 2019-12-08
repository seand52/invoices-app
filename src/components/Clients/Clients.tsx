import React, { useEffect, useState, useReducer } from 'react';
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
import { alertProp } from 'utils/swal';
import { initialState, reducer } from './localReducer';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  deleteClient: (id: string) => void;
  resetSuccess: () => void;
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

const Clients = ({
  path,
  searchAll,
  clientState,
  resetSuccess,
  deleteClient: deleteClientAction,
}: Props) => {
  const [search, setSearch] = useState('');
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
    setSearch(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    if (search !== '') {
      searchAll({
        url: `http://localhost:3000/api/clients?page=1&limit=10&name=${search}`,
      });
    } else {
      searchAll({
        url: `http://localhost:3000/api/clients?page=1&limit=10`,
      });
    }
  };

  const onSearchClear = () => {
    setSearch('');
    searchAll({
      url: `http://localhost:3000/api/clients?page=1&limit=10`,
    });
  };

  const onAddNewClient = e => {
    e.preventDefault();
    localDispatch({ type: 'ADD_CLIENT' });
  };

  const deleteClient = (ids: string[]) => {
    deleteClientAction(ids[0]);
    localDispatch({ type: 'DELETE_CLIENT' });
  };

  const editClient = (id: string) => {
    localDispatch({ type: 'EDIT_CLIENT', payload: id });
  };

  const onNextPage = newPage => {
    searchAll({
      url: `http://localhost:3000/api/clients?page=${newPage}&limit=${clientState.clients.itemCount}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    searchAll({
      url: `http://localhost:3000/api/clients?page=${clientState.clients.currentPage}&limit=${rowsPerPage}`,
    });
  };
  return (
    <div>
      <Layout
        main={
          <Overview
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
