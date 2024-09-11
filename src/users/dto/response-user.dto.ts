import {Exclude, Expose} from 'class-transformer';
import {Order} from '../../orders/entities/order.entity';

@Exclude()
export class ResponseUserDto {
    @Expose()
    id: string
    @Expose()
    name: string
    @Expose()
    email: string;
    @Expose()
    phone: number
    @Expose()
    orders:Order[]
}