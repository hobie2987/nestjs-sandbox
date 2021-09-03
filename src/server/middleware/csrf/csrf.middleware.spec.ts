import { HttpStatus } from '@nestjs/common';
import { CsrfMiddleware } from './csrf.middleware';
import * as crypto from 'crypto';

describe('CsrfMiddleware', () => {
  let middleware: CsrfMiddleware;
  const request: any = { method: 'get', cookies: {}, header: jest.fn() };
  const response: any = { cookie: jest.fn(), sendStatus: jest.fn() };
  const next = jest.fn();
  const TOKEN = '274FF46F5FEF2CACBAFE21B4EFD97258';

  beforeEach(() => {
    request.cookies = {};
    request.header.mockReturnValue(undefined);
    jest.spyOn(crypto, 'randomBytes').mockImplementation(() => {
      return { toString: () => TOKEN };
    });
    middleware = new CsrfMiddleware();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  describe('Scenario: When the request method is not POST', () => {
    beforeEach(() => {
      request.method = 'GET';
    });

    describe('And the XSRF-TOKEN cookie does not exist on the request', () => {
      beforeEach(() => {
        request.cookies = {};
        middleware.use(request, response, next);
      });

      it('Should set the XSRF-TOKEN cookie on the response', () => {
        expect(response.cookie).toHaveBeenCalledWith('XSRF-TOKEN', TOKEN, {
          path: '/',
          secure: false,
        });
      });

      it('Should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And the cookie does exist on the request', () => {
      beforeEach(() => {
        request.cookies = { 'XSRF-TOKEN': TOKEN };
        middleware.use(request, response, next);
      });

      it('Should not set the cookie on the response', () => {
        expect(response.cookie).not.toHaveBeenCalled();
      });

      it('Should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('Scenario: When the request method is POST', () => {
    beforeEach(() => {
      request.method = 'POST';
    });

    describe('And the XSRF-TOKEN cookie does not exist on the request', () => {
      beforeEach(() => {
        request.cookies = {};
        middleware.use(request, response, next);
      });

      it('Should send a 403 FORBIDDEN status', () => {
        expect(response.sendStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
      });

      it('Should not call next', () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe('And the X-XSRF-TOKEN header does not exist on the request', () => {
      beforeEach(() => {
        request.cookies = { 'XSRF-TOKEN': TOKEN };
        request.header.mockReturnValue(undefined);
        middleware.use(request, response, next);
      });

      it('Should send a 403 FORBIDDEN status ', () => {
        expect(response.sendStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
      });

      it('Should not call next', () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe('And the XSRF-TOKEN cookie value does not match the X-XSRF-TOKEN header', () => {
      beforeEach(() => {
        request.cookies = { 'XSRF-TOKEN': TOKEN };
        request.header.mockReturnValue('ABC123DEF456GHI789JKL012MNO345PQ');
        middleware.use(request, response, next);
      });

      it('Should send a 403 FORBIDDEN status', () => {
        expect(response.sendStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
      });

      it('Should not call next', () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe('And then XSRF_TOKEN cookie value matches the X-XSRF-TOKEN header', () => {
      beforeEach(() => {
        request.cookies = { 'XSRF-TOKEN': TOKEN };
        request.header.mockReturnValue(TOKEN);
        middleware.use(request, response, next);
      });

      it('Should not send a 403 FORBIDDEN status', () => {
        expect(response.sendStatus).not.toHaveBeenCalled();
      });

      it('Should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
