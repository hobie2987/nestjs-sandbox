import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import crypto from 'crypto';

@Injectable()
export class XsrfMiddleware implements NestMiddleware {
  private generateToken = () => {
    return crypto.randomBytes(16).toString('hex').toUpperCase();
  };

  use(req: Request, res: Response, next: () => void): any {
    const method = req.method.toUpperCase();
    const xsrfCookie = req.cookies['XSRF-TOKEN'];
    const xsrfHeader = req.header('X-XSRF-TOKEN');

    if (method !== 'GET' && (!xsrfCookie || xsrfCookie !== xsrfHeader)) {
      res.sendStatus(HttpStatus.FORBIDDEN);
      return;
    }

    if (!xsrfCookie) {
      const token = this.generateToken();
      res.cookie('XSRF-TOKEN', token, { path: '/', secure: false });
    }

    next();
  }
}
