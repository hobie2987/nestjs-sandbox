import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeadersInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // const req = context.switchToHttp().getRequest();

    // req.headers.authorization = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l';
    // req.headers['external-user-profile'] = 'ABCDEFGHIFJKLMNOP';

    return next.handle();
  }
}
