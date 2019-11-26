import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as users from 'reducers/userReducer';
import * as clients from 'reducers/clientsReducer';

const rootReducer = combineReducers({
  [users.key]: users.reducer,
  [clients.key]: clients.reducer,
});

const initialState = {
  [users.key]: users.initialState,
  [clients.key]: clients.initialState,
};

const composeEnhancers = composeWithDevTools({
  trace: true,
});

export const store = createStore(rootReducer, initialState, composeEnhancers());
