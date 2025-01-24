import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(@Request() req:any): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("payload",req.user);
    return this.appService.getHello();
  }
}
