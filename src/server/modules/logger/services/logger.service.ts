import { Injectable } from '@nestjs/common';
import { LogLevel, LogMessage } from '../types/log';
import colorize from 'json-colorizer';

@Injectable()
export class LoggerService {
  readonly colorConfig = {
    pretty: true,
    colors: {
      STRING_KEY: 'green.bold',
      STRING_LITERAL: 'yellow',
      NUMBER_LITERAL: 'cyan.bold',
      BOOLEAN_LITERAL: 'blue.bold',
    },
  };

  log = (message: LogMessage, level?: LogLevel): void => {
    message.level = level || message.level || LogLevel.LOG;
    const log = JSON.stringify(message);
    console[message.level](colorize(log, this.colorConfig));
  };

  debug = (message: LogMessage): void => this.log(message, LogLevel.DEBUG);
  error = (message: LogMessage): void => this.log(message, LogLevel.ERROR);
  info = (message: LogMessage): void => this.log(message, LogLevel.INFO);
  warn = (message: LogMessage): void => this.log(message, LogLevel.WARN);
}
