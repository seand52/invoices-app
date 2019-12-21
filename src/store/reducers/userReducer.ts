import {
  LoginAction,
  LOGIN,
  LoginOkAction,
  LOGIN_OK,
  LoginFailedAction,
  LOGIN_FAILED,
  REGISTER,
  RegisterAction,
  RegisterFailedAction,
  REGISTER_FAILED,
  REGISTER_OK,
  RegisterOk,
  ClearSuccessAction,
  CLEAR_SUCCESS,
  SubmitBusinessDetailsAction,
  SUBMIT_BUSINESS_DETAILS,
  SubmitBusinessDetailsFailedAction,
  SubmitBusinessDetailsOkAction,
  SUBMIT_BUSINESS_DETAILS_OK,
  SUBMIT_BUSINESS_DETAILS_FAILED,
  LOGOUT,
  ILogout,
} from 'store/actions/userActions';
import { BusinessInfoAPI } from 'api/responses/businessInfo.type';

export const initialState = {
  token: null as string | null,
  isLoggedIn: false as boolean,
  loading: false as boolean,
  error: null as null | string,
  success: false as boolean,
  registerStep: 1 as 1 | 2,
  businessInfo: null as BusinessInfoAPI | null,
};

export const key = 'userInfo';

export type UserState = typeof initialState;

type Actions =
  | LoginAction
  | LoginOkAction
  | LoginFailedAction
  | RegisterAction
  | RegisterFailedAction
  | RegisterOk
  | ClearSuccessAction
  | SubmitBusinessDetailsAction
  | SubmitBusinessDetailsOkAction
  | SubmitBusinessDetailsFailedAction
  | ILogout;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_OK:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        token: action.payload,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case REGISTER_OK:
      return {
        ...state,
        token: action.payload,
        loading: false,
        registerStep: state.registerStep + 1,
        error: null,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case SUBMIT_BUSINESS_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_BUSINESS_DETAILS_OK:
      return {
        ...state,
        businessInfo: action.payload,
        success: true,
        loading: false,
        errors: null,
      };
    case SUBMIT_BUSINESS_DETAILS_FAILED:
      return {
        ...state,
        error: 'There was a problem storing your business details',
        loading: false,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
  }
  return state;
};
