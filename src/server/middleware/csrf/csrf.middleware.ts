import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: () => void): any {
        const method = req.method.toUpperCase();
        const xsrfCookie = req.cookies['XSRF-TOKEN'];
        const xsrfHeader = req.header('X-XSRF-TOKEN');

        if (method === 'POST' && (!xsrfCookie || xsrfCookie !== xsrfHeader)) {
            res.sendStatus(HttpStatus.FORBIDDEN)
            return;
        }

        if (!xsrfCookie) {
            const token = crypto.randomBytes(16).toString('hex').toUpperCase();
            res.cookie('XSRF-TOKEN', token, {
               path: '/',
               secure: false
            });
        }
        next();
    }
}