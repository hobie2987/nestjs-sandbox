import { SessionIdMiddleware } from './session-id.middleware';
import { Request } from 'express';
import * as crypto from 'crypto';

jest.mock('crypto');

describe('SessionIdMiddleware', () => {
  let middleware: SessionIdMiddleware;
  const request = { cookies: {} } as Request;
  const response = { cookie: jest.fn() } as any;
  const next = jest.fn();
  const SESSION_ID = 'session_id';
  let CRYPTO_BUFFER: Buffer;

  beforeEach(() => {
    middleware = new SessionIdMiddleware();
    CRYPTO_BUFFER = Buffer.alloc(middleware.BYTES);
    jest.spyOn(CRYPTO_BUFFER, 'toString').mockReturnValue(SESSION_ID);
    jest.spyOn(crypto, 'randomBytes').mockImplementation(() => CRYPTO_BUFFER);
  });

  afterEach(() => {
    jest.resetAllMocks();
    request.cookies = {};
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  describe('When the X-SESSION cookie exists', () => {
    beforeEach(() => {
      request.cookies['X-SESSION'] = SESSION_ID;
      middleware.use(request, response, next);
    });

    it('Should not create a new session cookie', () => {
      expect(response.cookie).not.toHaveBeenCalled();
    });

    it('Should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When the X-SESSION cookie does not exists', () => {
    beforeEach(() => {
      request.cookies = {};
      middleware.use(request, response, next);
    });

    it('Should generate a new session ID', () => {
      expect(crypto.randomBytes).toHaveBeenCalledWith(middleware.BYTES);
      expect(CRYPTO_BUFFER.toString).toHaveBeenCalledWith('base64');
    });

    it('Should create a new session cookie', () => {
      expect(response.cookie).toHaveBeenCalledWith('X-SESSION', SESSION_ID, {
        path: '/',
        secure: false,
        httpOnly: true,
      });
    });

    it('Should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });
});
