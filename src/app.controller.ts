import { Controller, Get, Request, Response } from '@nestjs/common';
import { Verify } from 'src/libs/src/verify.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/which-telco')
  getHello(@Response() res) {
    const data =res.result as Verify
    console.log(data)
    res.json( this.appService.getHello(data));
  }
  @Get('/auto-complete')
  autoComplete(phoneNumber: string) {
    //res.json( this.appService.getHello(data));
  }
}
