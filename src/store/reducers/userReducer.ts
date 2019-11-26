import {
  LoginAction,
  LOGIN,
  LoginOkAction,
  LOGIN_OK,
  LoginFailedAction,
  LOGIN_FAILED,
} from 'store/actions/userActions';

export const initialState = {
  token: null as string | null,
  isLoggedIn: false as boolean,
  loading: false as boolean,
  error: null as null | string,
};

export const key = 'userInfo';

export type UserState = typeof initialState;

type Actions = LoginAction | LoginOkAction | LoginFailedAction;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_OK:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        token: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
  }
  return state;
};
