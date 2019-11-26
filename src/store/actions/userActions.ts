import { ILoginFields } from 'forms/formValidations/authentication';

export const LOGIN = 'USER::LOGIN';
export const LOGIN_OK = 'USER::LOGIN_OK';
export const LOGIN_FAILED = 'USER::LOGIN_FAILED';

export interface LoginAction {
  type: typeof LOGIN;
  payload: ILoginFields;
}
export const login = (data: ILoginFields) => ({
  type: LOGIN,
  payload: data,
});

export interface LoginOkAction {
  type: typeof LOGIN_OK;
  payload: string;
}
export const loginOk = (token: string) => ({
  type: LOGIN_OK,
  payload: token,
});

export interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: string;
}

export const loginFailed = (message?: string) => ({
  type: LOGIN_FAILED,
  payload: message || 'There was a problem logging in to your account',
});
