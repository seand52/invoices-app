import { ClientsPaginated } from 'api/responses/clients.type';
import { ICreateClient } from 'forms/formValidations/add-client';

export const SEARCH_ALL = 'CLIENTS:SEARCH_ALL';
export const SEARCH_ALL_OK = 'CLIENTS:SEARCH_ALL_OK';
export const SEARCH_ALL_FAILED = 'CLIENTS:SEARCH_ALL_FAILED';

export const DELETE = 'CLIENTS::DELETE';
export const DELETE_OK = 'CLIENTS::DELETE_OK';
export const DELETE_FAILED = 'CLIENTS::DELETE_FAILED';

export const NEW_CLIENT = 'CLIENTS::NEW_CLIENT';
export const NEW_CLIENT_OK = 'CLIENTS::NEW_CLIENT_OK';
export const NEW_CLIENT_FAILED = 'CLIENTS::NEW_CLIENT_FAILED';

export const UPDATE_CLIENT = 'CLIENTS::UPDATE_CLIENT';
export const UPDATE_CLIENT_OK = 'CLIENTS::UPDATE_CLIENT_OK';
export const UPDATE_CLIENT_FAILED = 'CLIENTS::UPDATE_CLIENT_FAILED';

export const RESET_SUCCESS = 'CLIENTS::RESET_SUCCESS';
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

export interface NewClient {
  type: typeof NEW_CLIENT;
  payload: ICreateClient;
}

export const newClient = (data: ICreateClient) => ({
  type: NEW_CLIENT,
  payload: data,
});

export interface NewClientOk {
  type: typeof NEW_CLIENT_OK;
  data: any;
}

export const newClientOk = data => ({
  type: NEW_CLIENT_OK,
  payload: data,
});

export interface NewClientFailed {
  type: typeof NEW_CLIENT_FAILED;
  payload: string;
}

export const newClientFailed = (message: string) => ({
  type: NEW_CLIENT_FAILED,
  payload: 'There was an error creating this client',
});

export interface UpdateClient {
  type: typeof UPDATE_CLIENT;
  payload: ICreateClient;
}

export const updateClient = (data: ICreateClient, id: string) => ({
  type: UPDATE_CLIENT,
  payload: { data, id },
});

export interface UpdateClientOk {
  type: typeof UPDATE_CLIENT_OK;
  data: any;
}

export const updateClientOk = data => ({
  type: UPDATE_CLIENT_OK,
  payload: data,
});

export interface UpdateClientFailed {
  type: typeof UPDATE_CLIENT_FAILED;
  payload: string;
}

export const updateClientFailed = (message: string) => ({
  type: UPDATE_CLIENT_FAILED,
  payload: 'There was an error creating this client',
});

export interface ResetSuccess {
  type: typeof RESET_SUCCESS;
}

export const resetSuccess = () => ({
  type: RESET_SUCCESS,
});