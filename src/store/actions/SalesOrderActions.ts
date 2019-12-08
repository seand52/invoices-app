import {
  SalesOrdersPaginated,
  FullSalesOrderDetails,
} from 'api/responses/sales-orders.type';
import { ICreateSalesOrder } from 'forms/formValidations/add-sales-oder';

export const SEARCH_ALL = 'SALES_ORDERSEARCH_ALL';
export const SEARCH_ALL_OK = 'SALES_ORDERSEARCH_ALL_OK';
export const SEARCH_ALL_FAILED = 'SALES_ORDERSEARCH_ALL_FAILED';

export const SEARCH_ONE = 'SALES_ORDER:SEARCH_ONE';
export const SEARCH_ONE_OK = 'SALES_ORDER:SEARCH_ONE_OK';
export const SEARCH_ONE_FAILED = 'SALES_ORDER:SEARCH_ONE_FAILED';

export const DELETE = 'SALES_ORDER:DELETE';
export const DELETE_OK = 'SALES_ORDER:DELETE_OK';
export const DELETE_FAILED = 'SALES_ORDER:DELETE_FAILED';

export const NEW_SALES_ORDER = 'SALES_ORDER:NEW_SALES_ORDER';
export const NEW_SALES_ORDER_OK = 'SALES_ORDER:NEW_SALES_ORDER_OK';
export const NEW_SALES_ORDER_FAILED = 'SALES_ORDER:NEW_SALES_ORDER_FAILED';

export const UPDATE_SALES_ORDER = 'SALES_ORDER:UPDATE_SALES_ORDER';
export const UPDATE_SALES_ORDER_OK = 'SALES_ORDER:UPDATE_SALES_ORDER_OK';
export const UPDATE_SALES_ORDER_FAILED =
  'SALES_ORDER:UPDATE_SALES_ORDER_FAILED';

export const RESET_SUCCESS = 'SALES_ORDER::RESET_SUCCESS';
export interface SearchAll {
  type: typeof SEARCH_ALL;
}

export const searchAll = ({ url }: { url: string }) => ({
  type: SEARCH_ALL,
  payload: url,
});

export interface SearchAllOk {
  type: typeof SEARCH_ALL_OK;
  payload: SalesOrdersPaginated;
}

export const searchAllOk = (data: SalesOrdersPaginated) => ({
  type: SEARCH_ALL_OK,
  payload: data,
});

export interface SearchAllFailed {
  type: typeof SEARCH_ALL_FAILED;
  payload: string;
}

export interface SearchOne {
  type: typeof SEARCH_ONE;
  payload: string;
}

export const searchOne = id => ({
  type: SEARCH_ONE,
  payload: id,
});

export interface SearchOneOk {
  type: typeof SEARCH_ONE_OK;
  payload: string;
}

export const searchOneOk = (data: FullSalesOrderDetails) => ({
  type: SEARCH_ONE_OK,
  payload: data,
});

export interface SearchOneFailed {
  type: typeof SEARCH_ONE_FAILED;
  payload: string;
}

export const searchOneFailed = message => ({
  type: SEARCH_ONE_FAILED,
  payload: message,
});
export const searchAllFailed = () => ({
  type: SEARCH_ALL_FAILED,
  payload: 'There was an error retrieving your sales order',
});

export interface DeleteSalesOrder {
  type: typeof DELETE;
  payload: string;
}

export const deleteSalesOrder = (id: string) => ({
  type: DELETE,
  payload: id,
});

export interface DeleteSalesOrderOk {
  type: typeof DELETE_OK;
  payload: string;
}

export const deleteSalesOrderOk = (data: SalesOrdersPaginated) => ({
  type: DELETE_OK,
  payload: data,
});

export interface DeleteSalesOrderFailed {
  type: typeof DELETE_FAILED;
  payload: string;
}

export const deleteSalesOrderFailed = (message: string) => ({
  type: DELETE_FAILED,
  payload: 'There was an error deleting your SalesOrders',
});

export interface NewSalesOrder {
  type: typeof NEW_SALES_ORDER;
  payload: ICreateSalesOrder;
}

export const newSalesOrder = (data: ICreateSalesOrder) => ({
  type: NEW_SALES_ORDER,
  payload: data,
});

export interface NewSalesOrderOk {
  type: typeof NEW_SALES_ORDER_OK;
  payload: any;
}

export const newSalesOrderOk = (data: string) => ({
  type: NEW_SALES_ORDER_OK,
  payload: data,
});

export interface NewSalesOrderFailed {
  type: typeof NEW_SALES_ORDER_FAILED;
  payload: string;
}

export const newSalesOrderFailed = (message: string) => ({
  type: NEW_SALES_ORDER_FAILED,
  payload: 'There was an error creating this sales order',
});

export interface UpdateSalesOrder {
  type: typeof UPDATE_SALES_ORDER;
  payload: ICreateSalesOrder;
}

export const updateSalesOrder = (data: ICreateSalesOrder, id: string) => ({
  type: UPDATE_SALES_ORDER,
  payload: { data, id },
});

export interface UpdateSalesOrderOk {
  type: typeof UPDATE_SALES_ORDER_OK;
  payload: any;
}

export const updateSalesOrderOk = (data: string) => ({
  type: UPDATE_SALES_ORDER_OK,
  payload: data,
});

export interface UpdateSalesOrderFailed {
  type: typeof UPDATE_SALES_ORDER_FAILED;
  payload: string;
}

export const updateSalesOrderFailed = (message: string) => ({
  type: UPDATE_SALES_ORDER_FAILED,
  payload: 'There was an error creating this sales order',
});

export interface ResetSuccess {
  type: typeof RESET_SUCCESS;
}

export const resetSuccess = () => ({
  type: RESET_SUCCESS,
});