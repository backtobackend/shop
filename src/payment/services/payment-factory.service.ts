import {BadRequestException, Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express';
import {PaypalService} from './paypal.service';
import {PayoneerService} from './payoneer.service';

export type PAYMENT_METHODS = 'paypal' | 'payoneer'
export const PAYMENT_SERVISE = 'PAYMENT_SERVISE'

@Injectable({scope: Scope.REQUEST})
export class PaymentFactoryService {
    constructor(@Inject(REQUEST) private request: Request, private readonly paymentService1: PaypalService,
                private readonly paymentService2: PayoneerService) {
    }

    create() {
        const paymentService = <PAYMENT_METHODS>this.request?.query['payment']
        switch (paymentService) {
            case 'paypal':
                return this.paymentService1
            case 'payoneer':
                return this.paymentService2
            default:
                throw new BadRequestException('invalid payment method :', paymentService)
        }
    }
}
