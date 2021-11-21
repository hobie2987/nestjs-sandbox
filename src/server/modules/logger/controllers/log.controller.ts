import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger.service';
import { LogMessage } from '../types/log';

@Controller('log')
export class LogController {
  constructor(private logger: LoggerService) {}

  @Post()
  log(@Req() req: Request, @Res() res: Response): void {
    const message: LogMessage = req.body;
    this.logger.log(message);
    res.sendStatus(HttpStatus.OK);
  }
}
