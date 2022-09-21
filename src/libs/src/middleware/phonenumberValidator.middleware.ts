import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
import { Verify } from '../verify.model';
  
  @Injectable()
export class PhoneNumberMiddleware implements NestMiddleware {
      use(req: any, res: any, next: (error?: any) => void) {
        let {phoneNumber} = req.query;
        phoneNumber = phoneNumber.replaceAll(/\s|-|(|)/g, '');
        if (!phoneNumber) {
          throw new BadRequestException('Phone number is required');
        }
        if (typeof phoneNumber !== 'string'){
          throw new BadRequestException('Phone number must be a string');
        }
        if (phoneNumber.length < 10){
          throw new BadRequestException('invalid phone number');
        }
        if(phoneNumber.length > 11){
          if (phoneNumber.startsWith('+2340')){
            phoneNumber = phoneNumber.slice(4)
          }
          if (phoneNumber.startsWith('+2340')) {
              res.phoneNumber = phoneNumber.slice(4)
              return next()
            }
      
            if (phoneNumber.startsWith('+234')) {
              res.phoneNumber = phoneNumber.slice(4)
              return next()
            }
      
            if (phoneNumber.startsWith('234')) {
              res.phoneNumber = phoneNumber.slice(3)
              return next()
            }
        }
       
        res.phoneNumber  = phoneNumber
        next();
      }
    
}
@Injectable()
export class MtnMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const match = res.phoneNumber.match(/(^(0|)(7(03|06)|8(03|06|10|13|14|16)|9(03|06))[0-9]{0,8}$)/);
        if(!match) { return next();}
        const verify:Verify = {
            match:match,
            phoneNumber:res.phoneNumber,
            telco:'MTN'
        }
        res.result = verify;
        next();

    }
}
@Injectable()
export class AirtelMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const match = res.phoneNumber.match(/(^(0|)(7(01|04|08)|8(02|08|12)|9(01|02|04))[0-9]{0,8}$)/);
    if(!match) { return next();}
        const verify:Verify = {
            match:match,
            phoneNumber:res.phoneNumber,
            telco:'Airtel'
        }
        res.result = verify;
        next();
       
  }

}
@Injectable()
export class GloMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const match = res.phoneNumber.match(/(^(0|)(7(05)|8(05|07|11|15)|9(05))[0-9]{0,8}$)/);
    if(!match) { return next();}
        const verify:Verify = {
            match:match,
            phoneNumber:res.phoneNumber,
            telco:'Glo'
        }
        res.result = verify;
        next();
  }

}
@Injectable()
export class _9MobileMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const match = res.phoneNumber.match(/(^(0|)(8(09|17|18)|9(08|09))[0-9]{0,8}$)/);
    if(!match) { return next();}
        const verify:Verify = {
            match:match,
            phoneNumber:res.phoneNumber,
            telco:'9Mobile'
        }
        res.result = verify;
        next();
  }

}
  