import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/modules/app';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import nocache from 'nocache';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(nocache());
  app.use(/^(?!\/graphql)/, helmet());
  app.use(compression());
  await app.listen(8080, () => {
    console.log('Server started @ http://localhost:8080/');
  });
}
bootstrap();
