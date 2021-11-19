import { CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { RequestLogMiddleware } from './logger/request-log.middleware';
import { SessionIdMiddleware } from './session-id/session-id.middleware';

export { CorrelationIdMiddleware, RequestLogMiddleware, SessionIdMiddleware };

export const MIDDLEWARE = [
  CorrelationIdMiddleware,
  RequestLogMiddleware,
  SessionIdMiddleware,
];
