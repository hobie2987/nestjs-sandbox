import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogController } from './controllers/log.controller';
import { LoggerService } from './services/logger.service';
import { LogRequestInterceptor } from './interceptors/log-request.interceptor';

@Module({
  imports: [],
  controllers: [LogController],
  providers: [
    LoggerService,
    { provide: APP_INTERCEPTOR, useClass: LogRequestInterceptor },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
