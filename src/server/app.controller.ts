import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller()
export class AppController {

  @Get()
  root(): string {
    const indexHTML = readFileSync('dist/index.html', {encoding: 'utf8'});


    return indexHTML;
  }
}
