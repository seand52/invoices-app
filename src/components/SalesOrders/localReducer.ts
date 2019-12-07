export const initialState = {
  showModal: false,
  action: null as 'added' | 'modified' | 'deleted' | null,
  selectedSalesOrderId: null as string | null,
};

export type SalesOrderComponentState = typeof initialState;

interface ToggleModal {
  type: 'TOGGLE_MODAL';
}

interface CloseModal {
  type: 'CLOSE_MODAL';
}

interface DeleteSalesOrder {
  type: 'DELETE_SALES_ORDER';
}

type Actions = ToggleModal | DeleteSalesOrder | CloseModal;

export const reducer = (
  state: SalesOrderComponentState,
  action: Actions,
): SalesOrderComponentState => {
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
    case 'DELETE_SALES_ORDER':
      return {
        ...state,
        action: 'deleted',
        showModal: false,
      };
  }
};
