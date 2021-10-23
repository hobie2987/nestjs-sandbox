import { CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { CsrfMiddleware } from './csrf/csrf.middleware';
import { RequestLogMiddleware } from './logger/request-log.middleware';
import { SessionIdMiddleware } from './session-id/session-id.middleware';

export { CorrelationIdMiddleware, CsrfMiddleware, RequestLogMiddleware, SessionIdMiddleware };

export const MIDDLEWARE = [
  CorrelationIdMiddleware,
  CsrfMiddleware,
  RequestLogMiddleware,
  SessionIdMiddleware
];