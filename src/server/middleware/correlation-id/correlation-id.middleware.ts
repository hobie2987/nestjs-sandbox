import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as uuid from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    const correlationId = req.get('X-Correlation-Id') || uuid.v4();
    res.set('X-Correlation-Id', correlationId);
    next();
  }
}
