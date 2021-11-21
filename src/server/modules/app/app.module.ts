import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GqlModule, XsrfModule } from '../';
import { LoggerModule } from '../logger';
import { AppController } from './controllers';
import { AllExceptionsFilter } from './filters';
import { SessionIdMiddleware } from './middleware';

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
