import {Exclude, Expose} from 'class-transformer';
import {Order} from '../../orders/entities/order.entity';
import {Role} from '../../auth/roles/role.enum';

@Exclude()
export class ResponseUserDto {
    @Expose()
    id: string
    @Expose()
    name: string
    @Expose()
    email: string;
    @Expose()
    phone: string
    @Expose()
    orders: Order[]
    @Expose()
    role: Role
}