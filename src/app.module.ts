import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CsrfMiddleware} from "./middleware";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CsrfMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
