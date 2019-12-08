import * as ClientActions from '../actions/clientActions';
import { ClientsPaginated } from 'api/responses/clients.type';

export const initialState = {
  clients: {} as ClientsPaginated,
  loading: false as boolean,
  error: null as string | null,
  success: false as boolean,
};

export const key = 'clients';

export type ClientState = typeof initialState;

type Actions =
  | ClientActions.SearchAll
  | ClientActions.SearchAllOk
  | ClientActions.SearchAllFailed
  | ClientActions.DeleteClient
  | ClientActions.DeleteClientOk
  | ClientActions.DeleteClientFailed
  | ClientActions.NewClient
  | ClientActions.NewClientOk
  | ClientActions.NewClientFailed
  | ClientActions.ResetSuccess
  | ClientActions.UpdateClient
  | ClientActions.UpdateClientOk
  | ClientActions.UpdateClientFailed
  | ClientActions.SearchByName;
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
    case ClientActions.SEARCH_BY_NAME:
      return {
        ...state,
        clients: action.payload,
      };

    case ClientActions.DELETE:
      return {
        ...state,
        loading: true,
      };
    case ClientActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ClientActions.DELETE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case ClientActions.NEW_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case ClientActions.NEW_CLIENT_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ClientActions.NEW_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ClientActions.UPDATE_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case ClientActions.UPDATE_CLIENT_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ClientActions.UPDATE_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ClientActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
