import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  @Get()
  index(): string {
    const indexHTML = readFileSync(`dist/index.html`, { encoding: 'utf8' });

    return indexHTML;
  }
}
