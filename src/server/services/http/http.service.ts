import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoggerService } from '../logger/logger.service';
import { LogCode, LogLevel, LogMessage } from '../../../types';
import { DEFAULT_CONFIG } from './default.config';

@Injectable()
export class HttpService {
  constructor(private logger: LoggerService) {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      config['startTime'] = Date.now();
    });
  }

  public get = (url: string): Promise<any> => this.request({ url });
  public post = (url: string, data: any): Promise<any> =>
    this.request({ url, method: 'POST', data });

  private async request(config: AxiosRequestConfig): Promise<any> {
    try {
      const response: AxiosResponse = await axios.request({
        ...DEFAULT_CONFIG,
        ...config,
      });
      this.log(LogLevel.INFO, LogCode.HTTP_SUCCESS, response);
      return response.data;
    } catch (error) {
      this.log(LogLevel.ERROR, LogCode.HTTP_FAILURE, error);
      throw new Error(error.message);
    }
  }

  private log(level: LogLevel, logCode: LogCode, response: any): void {
    const { message, statusText, config, code, status, isAxiosError } =
      response;
    const isError = response instanceof Error || isAxiosError;
    this.logger.log({
      level,
      code: logCode,
      feature: 'http.service',
      message: message || statusText,
      method: config?.method,
      url: config?.url,
      status: code || status,
      error: isError ? response : undefined,
      duration: config ? Date.now() - config.startTime : undefined,
    } as LogMessage);
  }
}
