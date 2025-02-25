import {Exclude, Expose, Type} from 'class-transformer';
import {OrderStatus} from '../enums/order-status.enum';
import {OrderItem} from '../entities/order-item.entity';
import {Payment} from '../../payment/entity/payment.entity';
import {ResponseUserDto} from '../../users/dto/response-user.dto';

@Exclude()
export class  ResponseOrderDto {
    @Expose()
    id: string
    @Expose()
    status: OrderStatus
    @Expose()
    items: OrderItem[]
    @Expose()
    payment: Payment
    @Expose()
    @Type(() => ResponseUserDto)
    user:ResponseUserDto
}