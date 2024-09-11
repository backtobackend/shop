import {Exclude, Expose} from 'class-transformer';
import {Order} from '../../orders/entities/order.entity';

@Exclude()
export class ResponsePaymentDto {
    @Expose()
    id: string
    @Expose()
    order: Order
}