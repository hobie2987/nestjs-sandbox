import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {AppController} from './app.controller';
import { CsrfMiddleware } from './middleware';
import { DataModule } from './graphql/data.module';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(CsrfMiddleware)
    //     .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
