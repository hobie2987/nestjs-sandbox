import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoggerService, LogLevel, LogCode, LogMessage } from '@logger';
import { AxiosInstance } from 'axios';

@Injectable()
export class HttpLogService {
  constructor(private httpService: HttpService, private logger: LoggerService) {
    this.setInterceptors(this.httpService.axiosRef);
  }

  private setInterceptors(axiosRef: AxiosInstance): void {
    axiosRef.interceptors.request.use(this.onRequest);
    axiosRef.interceptors.response.use(this.onResponse);
  }

  private onRequest = (config: any): void => {
    return { ...config, startTime: Date.now() };
  };

  private onResponse = (response: any): void => {
    const { message, statusText, config, code, status, isAxiosError } =
      response;
    const isError = response instanceof Error || isAxiosError;
    this.logger.log({
      level: isError ? LogLevel.ERROR : LogLevel.LOG,
      code: isError ? LogCode.HTTP_FAILURE : LogCode.HTTP_SUCCESS,
      feature: 'http-log.service',
      message: message || statusText,
      method: config?.method,
      url: config?.url,
      status: code || status,
      error: isError ? response : undefined,
      duration: config ? Date.now() - config.startTime : undefined,
    } as LogMessage);

    return response;
  };
}
