import { AppController } from './app/app.controller';
import { LogController } from './log/log.controller';

export { AppController, LogController };

export const CONTROLLERS = [
  LogController,
  AppController, // Always keep last
];
