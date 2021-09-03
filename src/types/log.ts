export enum LogLevel {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info',
  LOG = 'log',
  WARN = 'warn'
}
export enum LogCode {
  REQUEST = 0,
  EXCEPTION = 1,
}


export interface LogMessage {
  // Required
  code: LogCode;
  message: string;

  // Optional
  level?: LogLevel;
  feature?: string;
  method?: string;
  protocol?: string;
  path?: string;
  url?: string;
  agent?: string;
  token?: string;
  correlationId?: string,
  error?: any;
}

