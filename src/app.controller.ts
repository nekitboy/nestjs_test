import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/auth-local.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
    Обработка коневого роута
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Req() req) {
    return req.user;
  }
}
