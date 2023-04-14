import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health-check')
  get() {
    return { status: 'ok' };
  }
}
