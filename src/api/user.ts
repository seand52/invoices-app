import {
  ILoginFields,
  IRegisterFields,
} from 'forms/formValidations/authentication';
import request from './axiosWrapper';
import { IBusinessInfo } from 'forms/formValidations/business-info';
import { BusinessInfoAPI } from './responses/businessInfo.type';

interface AuthenticationResponse {
  token: string;
}
export const authenticateUser = (
  data: ILoginFields,
): Promise<AuthenticationResponse> => {
  return request(
    {
      method: 'POST',
      url: '/users/login',
      data,
    },
    { auth: false },
  ).then(res => {
    return { token: res.access_token };
  });
};

export const registerUser = (
  data: IRegisterFields,
): Promise<AuthenticationResponse> => {
  return request(
    {
      method: 'POST',
      url: '/users/register',
      data,
    },
    { auth: false },
  ).then(res => {
    return { token: res.access_token };
  });
};

export const saveBusinessInfo = (
  data: IBusinessInfo,
): Promise<BusinessInfoAPI> => {
  return request(
    {
      method: 'POST',
      url: '/business-info',
      data,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};
