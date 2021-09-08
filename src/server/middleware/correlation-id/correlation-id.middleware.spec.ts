import { CorrelationIdMiddleware } from './correlation-id.middleware';
import * as uuid from 'uuid';

jest.mock('uuid');

describe('CorrelationIdMiddleware', () => {
  let middleware: CorrelationIdMiddleware;
  const request: any = { get: jest.fn() };
  const response: any = { set: jest.fn() };
  const next = jest.fn();
  const CORRELATION_ID = 'adf44ae-6330-44ab-8938-731f52976a94';
  const HEADER_ID = '5e43d62-6393-48dc-882b-b89ee4e032d8';

  beforeEach(() => {
    jest.spyOn(uuid, 'v4').mockReturnValue(CORRELATION_ID);
    middleware = new CorrelationIdMiddleware();
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

  describe('When the X-Correlation-Id header is set', () => {
    beforeEach(() => {
      request.get.mockReturnValue(HEADER_ID);
      middleware.use(request, response, next);
    });

    it('Should set the response header with the same value', () => {
      expect(response.set).toHaveBeenCalledWith('X-Correlation-Id', HEADER_ID);
    });

    it('Should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When the X-Correlation-Id header is not set', () => {
    beforeEach(() => {
      request.get.mockReturnValue(undefined);
      middleware.use(request, response, next);
    });

    it('Should generate a new Correlation ID and set the response header', () => {
      expect(response.set).toHaveBeenCalledWith('X-Correlation-Id', CORRELATION_ID);
    });

    it('Should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });
});