import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class SessionIdMiddleware implements NestMiddleware {
  readonly BYTES = 1024;

  use(req: Request, res: Response, next: () => void): any {
    const sessionCookie = req.cookies['X-SESSION'];

    if (!sessionCookie) {
      const value = crypto.randomBytes(this.BYTES).toString('base64');

      res.cookie('X-SESSION', value, {
        path: '/',
        secure: false,
        httpOnly: true,
      });
    }
    next();
  }
}
