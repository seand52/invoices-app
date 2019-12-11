import * as SalesOrderActions from '../actions/SalesOrderActions';
import {
  SalesOrdersPaginated,
  FullSalesOrderDetails,
} from 'api/responses/sales-orders.type';

export const initialState = {
  salesOrders: {} as SalesOrdersPaginated,
  loading: false as boolean,
  error: null as string | null,
  success: false as boolean,
  selectedSalesOrderDetails: {} as FullSalesOrderDetails,
  base64SalesOrder: '' as string,
};

export enum SalesOrderSettingKeys {
  CLIENTID = 'client',
  DATE = 'date',
  TRANSPORTPRICE = 'transportPrice',
  PAYMENTYPE = 'paymentType',
  TAX = 'tax',
}

export const key = 'salesOrders';

export type SalesOrderState = typeof initialState;

type Actions =
  | SalesOrderActions.SearchAll
  | SalesOrderActions.SearchAllOk
  | SalesOrderActions.SearchAllFailed
  | SalesOrderActions.SearchOne
  | SalesOrderActions.SearchOneOk
  | SalesOrderActions.SearchOneFailed
  | SalesOrderActions.DeleteSalesOrder
  | SalesOrderActions.DeleteSalesOrderOk
  | SalesOrderActions.DeleteSalesOrderFailed
  | SalesOrderActions.UpdateSalesOrder
  | SalesOrderActions.UpdateSalesOrderOk
  | SalesOrderActions.UpdateSalesOrderFailed
  | SalesOrderActions.NewSalesOrder
  | SalesOrderActions.NewSalesOrderOk
  | SalesOrderActions.NewSalesOrderFailed
  | SalesOrderActions.ResetSuccess
  | SalesOrderActions.TransformToInvoice
  | SalesOrderActions.TransformToInvoiceOk
  | SalesOrderActions.TransformToInvoiceFailed;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SalesOrderActions.SEARCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.SEARCH_ALL_OK:
      return {
        ...state,
        salesOrders: action.payload,
        loading: false,
      };
    case SalesOrderActions.SEARCH_ALL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SalesOrderActions.SEARCH_ONE:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.SEARCH_ONE_OK:
      return {
        ...state,
        loading: false,
        selectedSalesOrderDetails: action.payload,
      };
    case SalesOrderActions.SEARCH_ONE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SalesOrderActions.DELETE:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SalesOrderActions.DELETE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case SalesOrderActions.NEW_SALES_ORDER:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.NEW_SALES_ORDER_OK:
      return {
        ...state,
        loading: false,
        success: true,
        base64SalesOrder: action.payload,
      };
    case SalesOrderActions.NEW_SALES_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SalesOrderActions.UPDATE_SALES_ORDER:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.UPDATE_SALES_ORDER_OK:
      return {
        ...state,
        loading: false,
        success: true,
        base64SalesOrder: action.payload,
      };
    case SalesOrderActions.UPDATE_SALES_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SalesOrderActions.TRANSFORM_TO_INVOICE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case SalesOrderActions.TRANSFORM_TO_INVOICE_OK:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case SalesOrderActions.TRANSFORM_TO_INVOICE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case SalesOrderActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
