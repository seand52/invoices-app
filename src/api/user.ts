import axios from 'axios';
import { ILoginFields } from 'forms/formValidations/authentication';
import request from './axiosWrapper';

interface AuthenticationResponse {
  token: string;
}
export const authenticateUser = (
  data: ILoginFields,
): Promise<AuthenticationResponse> => {
  return request({
    method: 'POST',
    url: '/users/login',
    data,
  }).then(res => {
    debugger;
    return { token: res.access_token };
  });
};
