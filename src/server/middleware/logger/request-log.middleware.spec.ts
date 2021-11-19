import { RequestLogMiddleware } from './request-log.middleware';
import { LoggerService } from '../../services';
import { LogCode } from '../../../types';

describe('RequestLogMiddleware', () => {
  let middleware: RequestLogMiddleware;
  const logger: LoggerService = new LoggerService();
  const response: any = { get: jest.fn() };
  const next = jest.fn();
  const request: any = {
    cookies: {},
    get: jest.fn(),
    header: jest.fn(),
    originalUrl: '/',
    method: 'get',
    protocol: 'https',
  };

  beforeEach(async () => {
    jest.spyOn(logger, 'info').mockImplementation();
    middleware = new RequestLogMiddleware(logger);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('Should exist', () => {
    expect(middleware).toBeTruthy();
  });

  it('Should log the details from the request', () => {
    middleware.use(request, response, next);
    expect(logger.info).toHaveBeenCalledWith({
      code: LogCode.REQUEST,
      message: 'Request log',
      method: request.method.toUpperCase(),
      protocol: request.protocol,
      path: request.originalUrl,
      agent: undefined,
      token: '-',
      correlationId: undefined,
    });
  });

  describe('And the User-Agent header exists', () => {
    beforeEach(() => {
      request.get.mockImplementation((headerName) => {
        return headerName === 'User-Agent' ? 'Secret Agent' : undefined;
      });
      middleware.use(request, response, next);
    });

    afterAll(() => {
      request.get.mockReset();
    });

    it('Should capture the user agent header if it exists', () => {
      expect(logger.info).toHaveBeenCalledWith({
        code: LogCode.REQUEST,
        message: 'Request log',
        method: request.method.toUpperCase(),
        protocol: request.protocol,
        path: request.originalUrl,
        agent: 'Secret Agent',
        token: '-',
        correlationId: undefined,
      });
    });
  });

  describe('When the Correlation ID header exists on the request', () => {
    beforeEach(() => {
      request.get.mockImplementation((headerName) => {
        return headerName === 'X-Correlation-Id'
          ? 'Request Header ID'
          : undefined;
      });
      middleware.use(request, response, next);
    });

    afterAll(() => {
      request.get.mockReset();
    });

    it('Should capture the Correlation ID header on the request', () => {
      expect(logger.info).toHaveBeenCalledWith({
        code: LogCode.REQUEST,
        message: 'Request log',
        method: request.method.toUpperCase(),
        protocol: request.protocol,
        path: request.originalUrl,
        agent: undefined,
        token: '-',
        correlationId: 'Request Header ID',
      });
    });
  });

  describe('When the Correlation ID header exists on the response', () => {
    beforeEach(() => {
      response.get.mockImplementation((headerName) => {
        return headerName === 'X-Correlation-Id'
          ? 'Response Header ID'
          : undefined;
      });
      middleware.use(request, response, next);
    });

    afterAll(() => {
      response.get.mockReset();
    });

    it('Should capture the Correlation ID header on the response', () => {
      expect(logger.info).toHaveBeenCalledWith({
        code: LogCode.REQUEST,
        message: 'Request log',
        method: request.method.toUpperCase(),
        protocol: request.protocol,
        path: request.originalUrl,
        agent: undefined,
        token: '-',
        correlationId: 'Response Header ID',
      });
    });
  });

  describe('When the XSRF-TOKEN cookie exists on the request', () => {
    beforeEach(() => {
      request.cookies = {
        'XSRF-TOKEN': 'Token',
      };
      middleware.use(request, response, next);
    });

    afterAll(() => {
      request.cookies = {};
    });

    it('Should capture the value of the XSRF-TOKEN cookie', () => {
      expect(logger.info).toHaveBeenCalledWith({
        code: LogCode.REQUEST,
        message: 'Request log',
        method: request.method.toUpperCase(),
        protocol: request.protocol,
        path: request.originalUrl,
        agent: undefined,
        token: 'Token',
        correlationId: undefined,
      });
    });
  });

  it('Should call next', () => {
    middleware.use(request, response, next);
    expect(next).toHaveBeenCalled();
  });
});
