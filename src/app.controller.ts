import { Controller, Get, Param, Query, Request, Response } from '@nestjs/common';
import { Verify } from 'src/libs/src/verify.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/which-telco')
  getHello(@Response() res) {
    const data =res.result as Verify
    res.json( this.appService.getHello(data));
  }
  @Get('/auto-complete')
  autoComplete(@Query('phoneNumber') phoneNumber: string) {
    return this.appService.autocomplete(phoneNumber);
  }
}
