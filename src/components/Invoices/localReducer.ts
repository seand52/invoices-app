export const initialState = {
  showModal: false,
  action: null as 'added' | 'modified' | 'deleted' | null,
  selectedInvoiceId: null as string | null,
};

export type InvoiceComponentState = typeof initialState;

interface ToggleModal {
  type: 'TOGGLE_MODAL';
}

interface CloseModal {
  type: 'CLOSE_MODAL';
}

interface DeleteInvoice {
  type: 'DELETE_INVOICE';
}

type Actions = ToggleModal | DeleteInvoice | CloseModal;

export const reducer = (
  state: InvoiceComponentState,
  action: Actions,
): InvoiceComponentState => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        showModal: !state.showModal,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false,
      };
    case 'DELETE_INVOICE':
      return {
        ...state,
        action: 'deleted',
        showModal: false,
      };
  }
};
