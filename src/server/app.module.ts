import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CONTROLLERS } from './controllers';
import {
  CorrelationIdMiddleware,
  RequestLogMiddleware,
  SessionIdMiddleware,
} from './middleware';
import { SERVICES } from './services';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
  ],
  controllers: CONTROLLERS,
  providers: SERVICES,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CorrelationIdMiddleware, SessionIdMiddleware, RequestLogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
