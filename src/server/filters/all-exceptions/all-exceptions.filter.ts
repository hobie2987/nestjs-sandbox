import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../services';
import { LogCode } from '../../../types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error({
      message: 'Unhandled exception',
      feature: 'all-exceptions.filter',
      error: exception,
      url: request.originalUrl,
      method: request.method,
      code: LogCode.EXCEPTION,
    });

    response.sendStatus(status);
  }
}
