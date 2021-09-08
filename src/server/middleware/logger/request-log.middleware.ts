import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../services';
import { LogCode } from '../../../types';

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: () => void): any {
    this.logger.info({
      code: LogCode.REQUEST,
      message: 'Request log',
      method: req.method.toUpperCase(),
      protocol: req.protocol,
      path: req.originalUrl,
      agent: req.get('User-Agent'),
      token: req.cookies['XSRF-TOKEN'] || '-',
      correlationId: req.get('X-Correlation-Id') || res.get('X-Correlation-Id')
    });
    next();
  }
}
