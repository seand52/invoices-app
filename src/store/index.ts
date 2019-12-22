import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import * as users from 'store/reducers/userReducer';
import * as clients from 'store/reducers/clientsReducer';
import * as products from 'store/reducers/productsReducer';
import * as invoices from 'store/reducers/invoicesReducer';
import * as invoiceForm from 'store/reducers/invoiceFormReducer';
import * as salesOrders from 'store/reducers/salesOrdersReducer';
import * as navigation from 'store/reducers/navigationReducer';
import sagas from './sagas/index';

//@ts-ignore
const rootReducer = combineReducers({
  //@ts-ignore
  [users.key]: users.reducer,
  [clients.key]: clients.reducer,
  [products.key]: products.reducer,
  [invoices.key]: invoices.reducer,
  [invoiceForm.key]: invoiceForm.reducer,
  [salesOrders.key]: salesOrders.reducer,
  [navigation.key]: navigation.reducer,
});

const initialState = {
  [users.key]: users.initialState,
  [clients.key]: clients.initialState,
  [products.key]: products.initialState,
  [invoices.key]: invoices.initialState,
  [invoices.key]: invoices.initialState,
  [invoiceForm.key]: invoiceForm.initialState,
  [salesOrders.key]: salesOrders.initialState,
  [navigation.key]: navigation.initialState,
};

export type InitialState = typeof initialState;

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);
