import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Verify } from 'src/libs/src/verify.model';
import Trie from './libs/src/Trie';

@Injectable()
export class AppService {
  getHello(data: Verify) {
    try {
      if(data.match){
        Trie.insertItem(data.phoneNumber)
        return {
          data: {phoneNumber: data.phoneNumber,telco:data.telco},
          message: 'Phone number verified successfully'
        }
      }else{
        return{
          data:{phoneNumber: data.phoneNumber},
          message: "Phone·Number·doesn't·match·any·telco"
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  autocomplete(data:string){
     return Trie.autocomplete(data);

  }
}
