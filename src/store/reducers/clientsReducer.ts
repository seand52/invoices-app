import * as ClientActions from '../actions/clientActions';
import { ClientsPaginated } from 'api/responses/clients.type';

export const initialState = {
  clients: {} as ClientsPaginated,
  loading: false as boolean,
  error: null as string | null,
};

export const key = 'clients';

export type ClientState = typeof initialState;

type Actions =
  | ClientActions.SearchAll
  | ClientActions.SearchAllOk
  | ClientActions.SearchAllFailed;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ClientActions.SEARCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case ClientActions.SEARCH_ALL_OK:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };
    case ClientActions.SEARCH_ALL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
