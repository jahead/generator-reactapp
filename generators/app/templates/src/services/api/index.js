import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';

import env from '../../constants/env';
import code from './code';
import endpoint from './endpoint';

const url = endpoint[env];

const api = restful(url, fetchBackend(fetch));

api.addErrorInterceptor((error) => {
  return Promise.reject(error);
});

api.addResponseInterceptor((response) => {
  const { data } = response;
  if (data.code === code.SUCCESS) {
    return response;
  }
  return Promise.reject(new Error(data.error));
});

export default api;
