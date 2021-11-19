import { Test } from '@nestjs/testing';
import axios, { AxiosResponse } from 'axios';
import { HttpService } from './http.service';
import { DEFAULT_CONFIG } from './default.config';
import { LoggerService } from '../logger/logger.service';
import { LogCode, LogLevel } from '../../../types';

describe('HttpService', () => {
  let service: HttpService;
  let logger: LoggerService;
  const url = 'https://api.service.net/api/data';
  const startTime = 1635005518113;
  const response: AxiosResponse = {
    config: {},
    data: 'DATA',
    status: 200,
    statusText: 'OK',
    request: {},
    headers: {},
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        { provide: LoggerService, useValue: { log: jest.fn() } },
        HttpService,
      ],
    }).compile();

    service = module.get(HttpService);
    logger = module.get(LoggerService);

    jest.spyOn(logger, 'log').mockImplementation();
    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(startTime)
      .mockReturnValueOnce(startTime + 1000);
    jest.spyOn(axios, 'request').mockImplementation((config) => {
      axios.interceptors.request['handlers'][0].fulfilled(config); //set startTIme on config
      response.config = config;
      return Promise.resolve(response);
    });
  });

  afterEach(() => {
    response.config = {};
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('Should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('When performing a GET request', () => {
    let actual;
    beforeEach(async () => {
      actual = await service.get(url);
    });

    it('Should set the request method as GET', () => {
      expect(axios.request).toHaveBeenCalledWith({
        ...DEFAULT_CONFIG,
        method: 'GET',
        startTime,
        url,
      });
    });

    it('Should log to request was successful', () => {
      expect(logger.log).toHaveBeenCalledWith({
        level: LogLevel.INFO,
        code: LogCode.HTTP_SUCCESS,
        feature: 'http.service',
        message: response.statusText,
        method: 'GET',
        url: url,
        status: response.status,
        error: undefined,
        duration: 1000,
      });
    });

    it('Should resolve with the response data', () => {
      expect(actual).toEqual(response.data);
    });
  });

  describe('When performing a POST request', () => {
    const body = { user: 'User', password: 'Password' };
    beforeEach(async () => {
      await service.post(url, body);
    });

    it('Should set the request method as POST', () => {
      expect(axios.request).toHaveBeenCalledWith({
        ...DEFAULT_CONFIG,
        method: 'POST',
        data: body,
        startTime,
        url,
      });
    });
  });

  describe('When the request fails', () => {
    const error = {
      config: {},
      message: 'Internal Server Error',
      isAxiosError: true,
      name: 'AxiosError',
      code: 500,
      request: {},
      response: {},
    };

    beforeEach(async () => {
      jest.spyOn(axios, 'request').mockImplementation((config) => {
        axios.interceptors.request['handlers'][0].fulfilled(config); //set startTIme on config
        error.config = config;
        return Promise.reject(error);
      });
      await service.get(url).catch((e) => e);
    });

    afterEach(() => {
      error.config = {};
    });

    it('Should log the error', () => {
      expect(logger.log).toHaveBeenCalledWith({
        level: LogLevel.ERROR,
        code: LogCode.HTTP_FAILURE,
        feature: 'http.service',
        message: error.message,
        method: 'GET',
        url: url,
        status: error.code,
        error: error,
        duration: 1000,
      });
    });
  });

  describe('When a generic error occurs', () => {
    const error = new Error('Oops, something broke');
    beforeEach(async () => {
      jest.spyOn(axios, 'request').mockRejectedValue(error);
      await service.get(url).catch((e) => e);
    });

    it('Should log the error', () => {
      expect(logger.log).toHaveBeenCalledWith({
        level: LogLevel.ERROR,
        code: LogCode.HTTP_FAILURE,
        feature: 'http.service',
        message: error.message,
        method: undefined,
        url: undefined,
        status: undefined,
        error: error,
        duration: undefined,
      });
    });
  });
});
