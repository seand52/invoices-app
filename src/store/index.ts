import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import * as users from 'store/reducers/userReducer';
import * as clients from 'store/reducers/clientsReducer';
import * as products from 'store/reducers/productsReducer';
import * as invoices from 'store/reducers/invoicesReducer';
import * as invoiceForm from 'store/reducers/invoiceFormReducer';
import sagas from './sagas/index';

console.log(invoiceForm.reducer);
console.log(invoiceForm.initialState);
//@ts-ignore
const rootReducer = combineReducers({
  //@ts-ignore
  [users.key]: users.reducer,
  [clients.key]: clients.reducer,
  [products.key]: products.reducer,
  [invoices.key]: invoices.reducer,
  [invoiceForm.key]: invoiceForm.reducer,
});

const initialState = {
  [users.key]: users.initialState,
  [clients.key]: clients.initialState,
  [products.key]: products.initialState,
  [invoices.key]: invoices.initialState,
  [invoices.key]: invoices.initialState,
  [invoiceForm.key]: invoiceForm.initialState,
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
