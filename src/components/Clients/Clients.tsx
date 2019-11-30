import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import { searchAll } from 'store/actions/clientActions';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import { ClientState } from 'store/reducers/clientsReducer';
import Overview from 'components/Overview/Overview';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  clientState: ClientState;
}

const clientsTable = [
  'name',
  'email',
  'telephone1',
  'telephone2',
  'address',
  'city',
];
const Clients = ({ path, searchAll, clientState }: Props) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/clients?page=1&limit=3' });
  }, []);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const submitSearch = e => {
    console.log(search);
    e.preventDefault();
  };

  const onAddNewClient = e => {
    e.preventDefault();
    console.log('add new client');
  };
  return (
    <div>
      <Layout
        main={
          clientState.loading ? (
            <p>Loading... </p>
          ) : (
            <Overview
              clientsTableHeader={clientsTable}
              tableData={clientState.clients}
              onAddNew={onAddNewClient}
              onSearchChange={onSearchChange}
              onSubmitSearch={submitSearch}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
