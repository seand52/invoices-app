import { Client } from 'api/responses/clients.type';
import { TaxOption } from 'data/taxOptions';

enum PaymentType {
  TRANSFERENCIA = 'Transferencia',
  TARJETA = 'Tarjeta',
  EFECTIVO = 'Efectivo',
}

interface InvoiceSettings {
  clientId: number | null;
  date: string | null;
  re: number | null;
  transportPrice: number | null;
  paymentType: PaymentType | null;
  tax: number | null;
}
export const initialState = {
  clientLoading: false as boolean,
  clientsFound: [] as Client[],
  settings: {
    clientId: null as number | null,
    date: new Date() as string | Date,
    re: null as number | null,
    transportPrice: null as number | null,
    paymentType: null as PaymentType | null,
    tax: null as number | null,
  },
};

export type InvoiceDetailsState = typeof initialState;

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

type Actions =
  | ToggleLoading
  | FindClients
  | FindClientsOk
  | FindClientsFailed
  | UpdateSettings
  | UpdateTaxes;

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
          re: re ? re.value : null,
          tax: tax ? tax.value : null,
        },
      };
  }
  return state;
};
