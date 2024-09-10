import {Exclude, Expose} from 'class-transformer';
import {OrderStatus} from '../enums/order-status.enum';
import {ResponseProductDto} from '../../product/dto/response-product.dto';
import {Product} from '../../product/entities/product.entity';
import {OrderItem} from '../entities/order-item.entity';

@Exclude()
export class ResponseOrderDto {
    @Expose()
    id: string
    @Expose()
    status: OrderStatus
    @Expose()
    items: OrderItem[]
}