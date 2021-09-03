import { CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { CsrfMiddleware } from './csrf/csrf.middleware';
import { RequestLogMiddleware } from './logger/request-log.middleware';

export { CorrelationIdMiddleware, CsrfMiddleware, RequestLogMiddleware };

export const MIDDLEWARE =[
  CorrelationIdMiddleware,
  RequestLogMiddleware,
  CsrfMiddleware,
];