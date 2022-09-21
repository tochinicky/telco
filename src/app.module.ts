import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AirtelMiddleware, GloMiddleware, MtnMiddleware, PhoneNumberMiddleware, _9MobileMiddleware } from 'src/libs/src/middleware/phonenumberValidator.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PhoneNumberMiddleware, MtnMiddleware,AirtelMiddleware,GloMiddleware,_9MobileMiddleware)
      .forRoutes({ path: 'which-telco', method: RequestMethod.GET });
  }
}
