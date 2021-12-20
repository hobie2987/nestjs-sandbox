import { Test } from '@nestjs/testing';
import { HelmetMiddleware } from './helmet.middleware';
import helmet from 'helmet';

jest.mock('helmet', () => jest.fn());

describe('HelmetMiddleware', () => {
  let middleware: HelmetMiddleware;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HelmetMiddleware],
    }).compile();

    middleware = module.get(HelmetMiddleware);
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

  it('Should set the CSP directives', () => {
    expect(helmet).toHaveBeenCalledWith({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
          ],
          fontSrc: [`'self'`, 'fonts.gstatic.com'],
          imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
        },
      },
    });
  });
});
