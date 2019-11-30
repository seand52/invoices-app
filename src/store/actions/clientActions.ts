import { ClientsPaginated } from 'api/responses/clients.type';

export const SEARCH_ALL = 'CLIENTS:SEARCH_ALL';
export const SEARCH_ALL_OK = 'CLIENTS:SEARCH_ALL_OK';
export const SEARCH_ALL_FAILED = 'CLIENTS:SEARCH_ALL_FAILED';

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
