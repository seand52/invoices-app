import React from 'react';
import {
  render,
  getByTestId,
  queryAllByText,
  fireEvent,
  prettyDOM,
  act,
  waitForElement,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClientInfo, { ErrorTypes } from './ClientInfo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer, initialState } from '../../store/index';
import * as actions from '../../store/actions/clientActions';

const setup = (
  ui,
  //@ts-ignore
  { initialState, store = createStore(rootReducer, initialState) } = {},
) => {
  store.dispatch = jest.fn();
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
};

beforeEach(() => {
  jest.restoreAllMocks();
});
test('should call search by id with correct parameters', async () => {
  const mockSearchById = jest.fn();
  const props = {
    clientId: '6138',
    clientState: {},
    searchById: mockSearchById,
  };

  const { container, store } = setup(<ClientInfo {...props} />);
  await wait();
  expect(store.dispatch).toHaveBeenCalledTimes(1);
  expect(store.dispatch).toHaveBeenCalledWith(
    actions.searchById(props.clientId),
  );
});

test('should show error message in client info if there is an error', async () => {
  const state = {
    ...initialState,
    clients: {
      error: ErrorTypes.CLIENT_LOAD,
    },
  };
  const props = {
    clientState: {},
    clientId: '6138',
    searchById: jest.fn(),
  };
  const store = createStore(rootReducer, state);

  const { getByText } = setup(<ClientInfo {...props} />, {
    //@ts-ignore
    state,
    store,
  });
  await wait();
  expect(
    getByText('There was an error loading client data'),
  ).toBeInTheDocument();
});

test('should correctly show client information', async () => {
  const state = {
    ...initialState,
    clients: {
      selectedClient: {
        name: 'test',
        shopName: 'shop name',
        address: 'address',
        city: null,
        province: null,
        postcode: null,
        telephonenull: null,
        telephone2: null,
        email: null,
        documentType: null,
        documentNum: null,
      },
    },
  };
  const props = {
    clientState: {},
    clientId: '6138',
    searchById: jest.fn(),
  };
  const store = createStore(rootReducer, state);

  const { findByTestId } = setup(<ClientInfo {...props} />, {
    //@ts-ignore
    state,
    store,
  });
  await wait();
  const name = await findByTestId('name');
  const address = await findByTestId('address');
  const city = await findByTestId('city');
  expect(name.innerHTML).toEqual('<span>Name</span>: test');
  expect(address.innerHTML).toEqual('<span>Address</span>: address');
  expect(city.innerHTML).toEqual('<span>City</span>: ---');
});
