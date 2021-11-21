import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GqlModule, XsrfModule, LoggerModule } from '@modules';
import { AppController } from './controllers/app/app.controller';
import { AllExceptionsFilter } from './filters/all-exceptions/all-exceptions.filter';
import { SessionIdMiddleware } from './middleware/session-id/session-id.middleware';

@Module({
  imports: [
    GqlModule,
    LoggerModule,
    XsrfModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(SessionIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
