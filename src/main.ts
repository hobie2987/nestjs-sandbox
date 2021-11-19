import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { LoggerService } from './server/services';
import { AllExceptionsFilter } from './server/filters';
import { CsrfGuard } from './server/guards';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import nocache from 'nocache';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.use(cookieParser());
  app.use(nocache());
  app.use(helmet());
  app.use(compression());
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalGuards(new CsrfGuard());
  await app.listen(8080, () => {
    console.log('Server started @ http://localhost:8080/');
  });
}
bootstrap();
