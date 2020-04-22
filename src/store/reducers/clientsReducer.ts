import * as ClientActions from '../actions/clientActions';
import { ClientsPaginated, Client } from 'api/responses/clients.type';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { ErrorTypes } from 'pages/ClientInfo/ClientInfo';
import { PopularProducts } from 'components/Charts/RadarChart/RadarChart';

export interface ChartData {
  name: string;
  spend: number;
}
export interface SpendData {
  [key: number]: ChartData[];
}
export const initialState = {
  clients: {} as ClientsPaginated,
  selectedClient: {} as Client,
  spendData: {} as SpendData,
  popularProducts: [] as PopularProducts,
  loading: false as boolean,
  error: null as string | null,
  formLoading: false as boolean,
  formError: null as string | null,
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
  | ClientActions.SearchByName
  | ClientActions.searchById
  | ClientActions.searchByIdOk
  | ClientActions.searchByIdFailed
  | ClientActions.ResetError;
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
      Swal.fire(
        alertProp({
          text: action.payload,
          title: 'Gee whiz',
          type: 'error',
        }),
      );
      return {
        ...state,
        loading: false,
        success: false,
      };
    case ClientActions.NEW_CLIENT:
      return {
        ...state,
        formLoading: true,
      };
    case ClientActions.NEW_CLIENT_OK:
      return {
        ...state,
        formLoading: false,
        success: true,
      };
    case ClientActions.NEW_CLIENT_FAILED:
      return {
        ...state,
        formLoading: false,
        success: false,
        formError: action.payload,
      };
    case ClientActions.UPDATE_CLIENT:
      return {
        ...state,
        formLoading: true,
      };
    case ClientActions.UPDATE_CLIENT_OK:
      return {
        ...state,
        formLoading: false,
        success: true,
      };
    case ClientActions.UPDATE_CLIENT_FAILED:
      return {
        ...state,
        formLoading: false,
        success: false,
        formError: action.payload,
      };
    case ClientActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };

    case ClientActions.RESET_ERROR:
      return {
        ...state,
        formError: null,
        error: null,
      };
    case ClientActions.SEARCH_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ClientActions.SEARCH_BY_ID_OK:
      return {
        ...state,
        loading: false,
        selectedClient: action.payload.clientInfo,
        spendData: action.payload.spendData,
        popularProducts: action.payload.popularProducts,
      };
    case ClientActions.SEARCH_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: ErrorTypes.CLIENT_LOAD,
      };

    default:
      return state;
  }
};
