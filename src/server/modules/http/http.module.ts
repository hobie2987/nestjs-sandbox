import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '../logger';
import { HttpLogService } from './services/http-log.service';
import { HttpConfig } from './types/http.config';

@Module({
  imports: [HttpModule.register(HttpConfig), LoggerModule],
  controllers: [],
  providers: [HttpLogService],
  exports: [HttpModule],
})
export class HttpWrapperModule {}
