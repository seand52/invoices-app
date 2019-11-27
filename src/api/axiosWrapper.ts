import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const _token = window.sessionStorage.getItem('token');

interface Options<T> {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: T;
  headers?: { Authorization: string };
}
const request = function(options: Options<any>, headers: { auth: boolean }) {
  const onSuccess = function(response) {
    console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  options = headers.auth
    ? {
        ...options,
        headers: {
          Authorization: `Bearer ${_token}`,
        },
      }
    : options;
  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
