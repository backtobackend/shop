import {Injectable} from '@nestjs/common';

@Injectable()
export class PayoneerService {
    constructor() {
        console.log('PAYONEER...')
    }

    pay(id:string){
        console.log(`pay using paypal for ${id} order`)
    }
}