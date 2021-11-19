import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpMethod } from '../../types/http-method.enum';
import crypto from 'crypto';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method.toUpperCase();
    const xsrfHeader = request.get('X-XSRF-TOKEN');
    const xsrfCookie = request.cookies['XSRF-TOKEN'];

    if (method === HttpMethod.POST) {
      return xsrfCookie && xsrfCookie === xsrfHeader;
    }

    if (!xsrfCookie) {
      const token = crypto.randomBytes(16).toString('hex').toUpperCase();
      response.cookie('XSRF-TOKEN', token, {
        path: '/',
        secure: false,
      });
    }

    return true;
  }
}
