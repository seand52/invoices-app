import { Client } from 'api/responses/clients.type';
import { TaxOption } from 'data/taxOptions';
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

interface ToggleLoading {
  type: 'TOGGLE_LOADING';
}

interface FindClients {
  type: 'FIND_CLIENTS';
}

interface FindClientsOk {
  type: 'FIND_CLIENTS_OK';
  payload: Client[];
}

interface FindClientsFailed {
  type: 'FIND_CLIENTS_FAILED';
  payload: [];
}

interface UpdateSettings {
  type: 'UPDATE_SETTINGS';
  payload: {
    field: keyof InvoiceSettings;
    value: any;
  };
}

interface UpdateTaxes {
  type: 'UPDATE_TAXES';
  payload: TaxOption[];
}

interface AddProductRow {
  type: 'ADD_PRODUCT';
}

interface DeleteProductRow {
  type: 'DELETE_PRODUCT';
  payload: string;
}

interface SelectProduct {
  type: 'SELECT_PRODUCT';
  payload: {
    product: InvoiceProducts;
    uuid: string;
  };
}

interface ChangeQuantity {
  type: 'CHANGE_QUANTITY';
  payload: {
    uuid: string;
    newQuantity: number;
  };
}
type Actions =
  | ToggleLoading
  | FindClients
  | FindClientsOk
  | FindClientsFailed
  | UpdateSettings
  | UpdateTaxes
  | AddProductRow
  | DeleteProductRow
  | SelectProduct
  | ChangeQuantity;

export const reducer = (
  state: InvoiceDetailsState,
  action: Actions,
): InvoiceDetailsState => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        clientLoading: !state.clientLoading,
      };
    case 'FIND_CLIENTS':
      return {
        ...state,
        clientLoading: true,
      };
    case 'FIND_CLIENTS_OK':
      return {
        ...state,
        clientLoading: false,
        clientsFound: action.payload,
      };
    case 'FIND_CLIENTS_FAILED':
      return {
        ...state,
        clientLoading: false,
        clientsFound: action.payload,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'UPDATE_TAXES':
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
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          { id: null, quantity: 1, uuid: uuidv4(), price: 0 },
        ],
      };
    case 'DELETE_PRODUCT':
      const newProducts = state.products.filter(
        item => item.uuid !== action.payload,
      );
      return {
        ...state,
        products: newProducts,
      };
    case 'SELECT_PRODUCT':
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
    case 'CHANGE_QUANTITY': {
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
