import request from './axiosWrapper';
import { ClientsPaginated } from './responses/clients.type';

export const searchClients = (url): Promise<ClientsPaginated> => {
  return request(
    {
      method: 'GET',
      useBaseUrl: false,
      url,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};
