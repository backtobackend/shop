import {Module, Scope} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {PaymentController} from './payment.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Payment} from './entity/payment.entity';
import {OrdersModule} from '../orders/orders.module';
import {Order} from '../orders/entities/order.entity';
import {PayoneerService} from './services/payoneer.service';
import {PAYMENT_SERVISE, PaymentFactoryService} from './services/payment-factory.service';
import {PaypalService} from './services/paypal.service';

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Order]), OrdersModule],
    controllers: [PaymentController],
    providers: [PaymentService, PayoneerService, PaypalService, PaymentFactoryService,
        {
            provide: PAYMENT_SERVISE,
            useFactory: (paymentFactoryService: PaymentFactoryService) => {
                return paymentFactoryService.create()
            },
            inject: [PaymentFactoryService],
        }],
    exports: [PAYMENT_SERVISE],
})
export class PaymentModule {
}
