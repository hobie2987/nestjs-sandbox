import { HttpModuleOptions } from '@nestjs/axios';

export const HttpConfig: HttpModuleOptions = {
  timeout: 10000, // 10 seconds
  timeoutErrorMessage: 'Request Timeout',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  method: 'GET',
  withCredentials: false,
  responseType: 'json',
};
