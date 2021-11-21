import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { LogCode, LogMessage } from '../types/log';

@Injectable()
export class LogRequestInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : context.getArgByIndex(2)?.req;

    this.logger.info({
      code: LogCode.REQUEST,
      message: 'Request log',
      method: req.method.toUpperCase(),
      protocol: req.protocol,
      context: context.getType(),
      path: req.originalUrl,
      query: req.body?.query,
      agent: req.get('User-Agent'),
      token: req.cookies['XSRF-TOKEN'] || '-',
      session: req.cookies['X-SESSION'] || '-',
      auth: req.get('authorization'),
    } as LogMessage);

    return next.handle();
  }
}
