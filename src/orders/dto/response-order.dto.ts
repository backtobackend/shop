import {Exclude, Expose} from 'class-transformer';
import {OrderStatus} from '../enums/order-status.enum';

@Exclude()
export class ResponseOrderDto {
    @Expose()
    id: string
    @Expose()
    orderStatus: OrderStatus
}