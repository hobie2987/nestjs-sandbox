import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as nocache from 'nocache'
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(nocache());
  app.use(helmet());
  app.use(compression());
  await app.listen(8080, () => {
    console.log('Server started @ http://localhost:8080/')
  });
}
bootstrap();
