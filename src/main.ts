import { NestFactory } from '@nestjs/core';
import { AppModule, AppOptions } from '@app';
import cookieParser from 'cookie-parser';
import nocache from 'nocache';
import compression from 'compression';
import dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
  const env = dotenv.config().parsed;
  const app = await NestFactory.create(AppModule, AppOptions);
  app.use(cookieParser());
  app.use(nocache());
  app.use(compression());
  await app.listen(env.PORT, () => {
    console.log(`Server started @ ${env.HOST}:${env.PORT}/`);
  });
}
bootstrap();
