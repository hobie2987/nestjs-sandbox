import { Injectable } from '@nestjs/common';
import { LogLevel, LogMessage } from '../../../types';

@Injectable()
export class LoggerService {
  log = (message: LogMessage, level?: LogLevel): void => {
    message.level = (level || message.level) || LogLevel.LOG;
    const log = JSON.stringify(message);
    console[message.level](log);
  };

  debug = (message: LogMessage): void => this.log(message, LogLevel.DEBUG);
  error = (message: LogMessage): void => this.log(message, LogLevel.ERROR);
  info = (message: LogMessage): void => this.log( message, LogLevel.INFO);
  warn = (message: LogMessage): void => this.log(message, LogLevel.WARN);
}
