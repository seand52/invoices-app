import axios from 'axios';

const clientWithBaseUrl = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const clientWithoutBaseUrl = axios.create({
  baseURL: '',
});

const _token = window.sessionStorage.getItem('token');

interface Options<T> {
  url: string;
  useBaseUrl?: boolean;
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
    console.log('full error is', error.response);
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
    if (error.status && error.status === 400) {
      return Promise.reject(
        'You have made a bad request. Check that all the data is correct',
      );
    }
    if (error.status && error.status !== 500) {
      return Promise.reject(error.response || error.message);
    }
    return Promise.reject(
      'Sorry, there was an unexpected error. Please try again later',
    );
  };
  options = headers.auth
    ? {
        ...options,
        headers: {
          Authorization: `Bearer ${_token}`,
        },
      }
    : options;
  return options.useBaseUrl
    ? clientWithBaseUrl(options)
        .then(onSuccess)
        .catch(onError)
    : clientWithoutBaseUrl(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;
