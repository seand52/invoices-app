import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import * as users from 'store/reducers/userReducer';
import * as clients from 'store/reducers/clientsReducer';
import sagas from './sagas/index';

const rootReducer = combineReducers({
  //@ts-ignore
  [users.key]: users.reducer,
  [clients.key]: clients.reducer,
});

const initialState = {
  [users.key]: users.initialState,
  [clients.key]: clients.initialState,
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
