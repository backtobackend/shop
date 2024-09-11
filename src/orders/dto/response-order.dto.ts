import {Exclude, Expose} from 'class-transformer';
import {OrderStatus} from '../enums/order-status.enum';
import {OrderItem} from '../entities/order-item.entity';
import {Payment} from '../../payment/entity/payment.entity';

@Exclude()
export class ResponseOrderDto {
    @Expose()
    id: string
    @Expose()
    status: OrderStatus
    @Expose()
    items: OrderItem[]
    @Expose()
    payment: Payment
}