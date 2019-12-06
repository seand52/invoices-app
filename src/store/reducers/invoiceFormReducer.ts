import * as InvoiceFormActions from '../actions/invoiceFormActions';
import { Client } from 'api/responses/clients.type';
import uuidv4 from 'uuid/v4';

enum PaymentType {
  TRANSFERENCIA = 'Transferencia',
  TARJETA = 'Tarjeta',
  EFECTIVO = 'Efectivo',
}

export interface InvoiceSettings {
  clientId: number | null;
  date: string | Date;
  re: number;
  transportPrice: number | null;
  paymentType: PaymentType | null;
  tax: number;
}

export interface InvoiceProducts {
  id: number | null;
  quantity: number;
  uuid: string;
  price: number;
}

export interface InvoiceDetailsState {
  clientLoading: boolean;
  clientsFound: Client[];
  settings: InvoiceSettings;
  products: InvoiceProducts[];
}

export const initialState: InvoiceDetailsState = {
  clientLoading: false,
  clientsFound: [],
  settings: {
    clientId: null,
    date: new Date(),
    re: 0,
    transportPrice: null,
    paymentType: null,
    tax: 0,
  },
  products: [{ id: null, quantity: 1, uuid: uuidv4(), price: 0 }],
};

export const key = 'invoiceForm';

type Actions =
  | InvoiceFormActions.ToggleLoading
  | InvoiceFormActions.FindClients
  | InvoiceFormActions.FindClientsOk
  | InvoiceFormActions.FindClientsFailed
  | InvoiceFormActions.UpdateSettings
  | InvoiceFormActions.UpdateTaxes
  | InvoiceFormActions.AddProductRow
  | InvoiceFormActions.DeleteProductRow
  | InvoiceFormActions.SelectProduct
  | InvoiceFormActions.ChangeQuantity;

export const reducer = (
  state: InvoiceDetailsState = initialState,
  action: Actions,
): InvoiceDetailsState => {
  switch (action.type) {
    case InvoiceFormActions.TOGGLE_LOADING:
      return {
        ...state,
        clientLoading: !state.clientLoading,
      };
    case InvoiceFormActions.FIND_CLIENTS:
      return {
        ...state,
        clientLoading: true,
      };
    case InvoiceFormActions.FIND_CLIENTS_OK:
      return {
        ...state,
        clientLoading: false,
        clientsFound: action.payload,
      };
    case InvoiceFormActions.FIND_CLIENTS_FAILED:
      return {
        ...state,
        clientLoading: false,
        clientsFound: action.payload,
      };
    case InvoiceFormActions.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
      };
    case InvoiceFormActions.UPDATE_TAXES:
      const re = action.payload.find(item => item.category === 're');
      const tax = action.payload.find(item => item.category === 'tax');
      return {
        ...state,
        settings: {
          ...state.settings,
          re: re ? re.value : 0,
          tax: tax ? tax.value : 0,
        },
      };
    case InvoiceFormActions.ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          { id: null, quantity: 1, uuid: uuidv4(), price: 0 },
        ],
      };
    case InvoiceFormActions.DELETE_PRODUCT:
      const newProducts = state.products.filter(
        item => item.uuid !== action.payload,
      );
      return {
        ...state,
        products: newProducts,
      };
    case InvoiceFormActions.SELECT_PRODUCT:
      const productIndex = state.products.findIndex(
        item => item.uuid === action.payload.uuid,
      );
      const productsCopy = [...state.products];
      productsCopy[productIndex] = {
        id: action.payload.product.id,
        price: action.payload.product.price,
        uuid: action.payload.product.uuid,
        quantity: productsCopy[productIndex].quantity,
      };
      return {
        ...state,
        products: productsCopy,
      };
    case InvoiceFormActions.CHANGE_QUANTITY: {
      const productIndex = state.products.findIndex(
        item => item.uuid === action.payload.uuid,
      );
      const productsCopy = [...state.products];
      productsCopy[productIndex].quantity = action.payload.newQuantity;
      return {
        ...state,
        products: productsCopy,
      };
    }
  }
  return state;
};
