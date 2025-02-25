import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Payment} from './entity/payment.entity';
import {Repository} from 'typeorm';
import {IPayment} from './interface/payment.interface';
import {OrdersService} from '../orders/orders.service';
import {OrderStatus} from '../orders/enums/order-status.enum';
import {Order} from '../orders/entities/order.entity';
import {plainToInstance} from 'class-transformer';
import {ResponseOrderDto} from '../orders/dto/response-order.dto';
import {ResponseUserDto} from '../users/dto/response-user.dto';
import {Role} from '../auth/roles/role.enum';
import {compareId} from '../auth/utils/compare-id.util';
import {PAYMENT_SERVISE} from './services/payment-factory.service';
import {PaymentServiceInterface} from './interface/payment-service.interface';

@Injectable()
export class PaymentService implements IPayment<ResponseOrderDto> {
    constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>,
                private ordersService: OrdersService,
                @Inject(PAYMENT_SERVISE) private paymentService: PaymentServiceInterface,
                @InjectRepository(Order) private orderRepository: Repository<Order>) {
    }

    //TODO need 2 payment services, class GetPaymentMethod that get query param and return it, then useFactory get
    // this param and return one of available payment method
    async payOrder(id: string, user: ResponseUserDto): Promise<ResponseOrderDto> {
        const order = await this.ordersService.findOne(id)
        this.paymentService.pay(id)
        console.log('before promise')
        const promise = Promise.resolve(100)
        promise.then(data => console.log('promise.resolve = ', data))
        console.log('after promise.resolve')
        if (!order) throw new NotFoundException(`Order not found`);
        if (user.role !== Role.ADMIN) {
            compareId(order.user.id, user.id)
        }
        if (order.payment) throw new ConflictException('order has been paid already');
        order['payment'] = this.paymentRepository.create()
        order.status = OrderStatus.AWAITING_SHIPMENT;
        const newOrder = await this.orderRepository.save(order);
        console.log('after save')
        return plainToInstance(ResponseOrderDto, newOrder)
    }
}
