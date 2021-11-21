import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { XsrfMiddleware } from './middelware/xsrf.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class XsrfModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(XsrfMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
