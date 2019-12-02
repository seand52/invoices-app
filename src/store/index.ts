import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import * as users from 'store/reducers/userReducer';
import * as clients from 'store/reducers/clientsReducer';
import * as products from 'store/reducers/productsReducer';
import sagas from './sagas/index';

//@ts-ignore
const rootReducer = combineReducers({
  //@ts-ignore
  [users.key]: users.reducer,
  [clients.key]: clients.reducer,
  [products.key]: products.reducer,
});

const initialState = {
  [users.key]: users.initialState,
  [clients.key]: clients.initialState,
  [products.key]: products.initialState,
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
