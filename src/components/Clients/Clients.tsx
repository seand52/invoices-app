import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import { searchAll, deleteClient } from 'store/actions/clientActions';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import { ClientState } from 'store/reducers/clientsReducer';
import Overview from 'components/Overview/Overview';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  deleteClient: (id: string) => void;
  clientState: ClientState;
}

interface Data {
  name: string;
  email: string;
  telephone1: string;
  telephone2: string;
  address: string;
  city: string;
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
  { id: 'email', numeric: true, disablePadding: true, label: 'Email' },
  {
    id: 'telephone1',
    numeric: false,
    disablePadding: true,
    label: 'Telephone',
  },
  {
    id: 'telephone2',
    numeric: false,
    disablePadding: true,
    label: 'Telephone 2',
  },
  { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
  { id: 'city', numeric: false, disablePadding: true, label: 'City' },
];

const Clients = ({
  path,
  searchAll,
  clientState,
  deleteClient: deleteClientAction,
}: Props) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/clients?page=1&limit=3' });
  }, []);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
  };

  const onAddNewClient = e => {
    e.preventDefault();
  };

  const deleteClient = (ids: string[]) => {
    deleteClientAction(ids[0]);
  };

  const onNextPage = newPage => {
    searchAll({
      url: `http://localhost:3000/api/clients?page=${newPage}&limit=3`,
    });
  };
  return (
    <div>
      <Layout
        main={
          clientState.loading ? (
            <p>Loading... </p>
          ) : (
            <Overview
              deleteItem={deleteClient}
              tableHeader={headCells}
              tableData={clientState.clients}
              onAddNew={onAddNewClient}
              onSearchChange={onSearchChange}
              onSubmitSearch={submitSearch}
              onNextPage={onNextPage}
            />
          )
        }
      />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
