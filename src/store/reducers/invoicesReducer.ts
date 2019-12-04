import * as InvoiceActions from '../actions/invoiceActions';
import { InvoicesPaginated } from 'api/responses/invoices.type';

export const initialState = {
  invoices: {} as InvoicesPaginated,
  loading: false as boolean,
  error: null as string | null,
  success: false as boolean,
};

export enum InvoiceSettingKeys {
  CLIENTID = 'clientId',
  DATE = 'date',
  RE = 're',
  TRANSPORTPRICE = 'transportPrice',
  PAYMENTYPE = 'paymentType',
  TAX = 'tax',
}

export const key = 'invoices';

export type InvoiceState = typeof initialState;

type Actions =
  | InvoiceActions.SearchAll
  | InvoiceActions.SearchAllOk
  | InvoiceActions.SearchAllFailed
  | InvoiceActions.DeleteInvoice
  | InvoiceActions.DeleteInvoiceOk
  | InvoiceActions.DeleteInvoiceFailed
  | InvoiceActions.UpdateInvoice
  | InvoiceActions.UpdateInvoiceOk
  | InvoiceActions.UpdateInvoiceFailed
  | InvoiceActions.NewInvoice
  | InvoiceActions.NewInvoiceOk
  | InvoiceActions.NewInvoiceFailed
  | InvoiceActions.ResetSuccess;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case InvoiceActions.SEARCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.SEARCH_ALL_OK:
      return {
        ...state,
        invoices: action.payload,
        loading: false,
      };
    case InvoiceActions.SEARCH_ALL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case InvoiceActions.DELETE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case InvoiceActions.DELETE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case InvoiceActions.NEW_INVOICE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.NEW_INVOICE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case InvoiceActions.NEW_INVOICE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case InvoiceActions.UPDATE_INVOICE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.UPDATE_INVOICE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case InvoiceActions.UPDATE_INVOICE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case InvoiceActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
