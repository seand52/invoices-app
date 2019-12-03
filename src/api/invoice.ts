import request from './axiosWrapper';
import { InvoicesPaginated } from './responses/invoices.type';
import { ICreateInvoice } from 'forms/formValidations/add-invoice';

export const searchInvoices = (url): Promise<InvoicesPaginated> => {
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

export const deleteInvoice = (id): Promise<InvoicesPaginated> => {
  return request(
    {
      method: 'DELETE',
      useBaseUrl: true,
      url: `/invoices/${id}`,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const createInvoice = (data: ICreateInvoice): Promise<any> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      data,
      url: '/invoices',
    },
    { auth: true },
  );
};

export const updateInvoice = (
  data: ICreateInvoice,
  id: string,
): Promise<any> => {
  return request(
    {
      method: 'PATCH',
      useBaseUrl: true,
      data,
      url: `/invoices/${id}`,
    },
    { auth: true },
  );
};
