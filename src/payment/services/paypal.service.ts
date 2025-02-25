import {Injectable} from '@nestjs/common';

@Injectable()
export class PaypalService {
    constructor() {
        console.log('PAYPAL...')
    }

    pay(id: string) {
        console.log(`pay using payoneer for ${id} order`)
    }
}