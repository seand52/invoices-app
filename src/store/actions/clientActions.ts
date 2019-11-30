import { ClientsPaginated } from 'api/responses/clients.type';

export const SEARCH_ALL = 'CLIENTS:SEARCH_ALL';
export const SEARCH_ALL_OK = 'CLIENTS:SEARCH_ALL_OK';
export const SEARCH_ALL_FAILED = 'CLIENTS:SEARCH_ALL_FAILED';

export const DELETE = 'CLIENTS::DELETE';
export const DELETE_OK = 'CLIENTS::DELETE_OK';
export const DELETE_FAILED = 'CLIENTS::DELETE_FAILEd';

export interface SearchAll {
  type: typeof SEARCH_ALL;
}

export const searchAll = ({ url }: { url: string }) => ({
  type: SEARCH_ALL,
  payload: url,
});

export interface SearchAllOk {
  type: typeof SEARCH_ALL_OK;
  payload: ClientsPaginated;
}

export const searchAllOk = (data: ClientsPaginated) => ({
  type: SEARCH_ALL_OK,
  payload: data,
});

export interface SearchAllFailed {
  type: typeof SEARCH_ALL_FAILED;
  payload: string;
}

export const searchAllFailed = () => ({
  type: SEARCH_ALL_FAILED,
  payload: 'There was an error retrieving your clients',
});

export interface DeleteClient {
  type: typeof DELETE;
  payload: string;
}

export const deleteClient = (id: string) => ({
  type: DELETE,
  payload: id,
});

export interface DeleteClientOk {
  type: typeof DELETE_OK;
  payload: string;
}

export const deleteClientOk = (data: ClientsPaginated) => ({
  type: DELETE_OK,
  payload: data,
});

export interface DeleteClientFailed {
  type: typeof DELETE_FAILED;
  payload: string;
}

export const deleteClientFailed = (message: string) => ({
  type: DELETE_FAILED,
  payload: 'There was an error deleting your clients',
});
