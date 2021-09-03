import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { LoggerService } from './server/services';
import { AllExceptionsFilter } from './server/filters';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as nocache from 'nocache';
import * as compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService)
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.use(cookieParser());
  app.use(nocache());
  app.use(helmet());
  app.use(compression());
  await app.listen(8080, () => {
    console.log('Server started @ http://localhost:8080/');
  });
}
bootstrap();
