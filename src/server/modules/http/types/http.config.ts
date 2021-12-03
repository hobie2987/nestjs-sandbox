import { HttpModuleOptions } from '@nestjs/axios';

export const HttpConfig: HttpModuleOptions = {
  timeout: 10000, // 10 seconds
  timeoutErrorMessage: 'Request timed out after 10 seconds',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  method: 'GET',
  withCredentials: false,
  responseType: 'json',
};
