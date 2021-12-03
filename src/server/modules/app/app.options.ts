import { NestApplicationOptions } from '@nestjs/common';
import fs from 'fs';
import { LogLevel } from '@logger';

export const AppOptions: NestApplicationOptions = {
  cors: {
    origin: true,
    methods: ['HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
  },
  httpsOptions: {
    key: fs.readFileSync('dist/server.key'),
    cert: fs.readFileSync('dist/server.crt'),
  },
  logger: [LogLevel.LOG, LogLevel.ERROR],
};
