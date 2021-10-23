import { AxiosRequestConfig } from 'axios';

export const DEFAULT_CONFIG: AxiosRequestConfig = {
  timeout: 10000, // 10 seconds
  timeoutErrorMessage: 'Request Timeout',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  method: 'GET',
  withCredentials: false,
  responseType: 'json',
};
