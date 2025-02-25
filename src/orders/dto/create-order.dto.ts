import {ArrayNotEmpty, IsNotEmpty, IsUUID, ValidateNested} from 'class-validator';
import {IdDTO} from '../../common/dto/id.dto';
import {OrderItemDto} from './order-item.dto';
import {Type} from 'class-transformer';

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    readonly user: IdDTO;
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => OrderItemDto)
    readonly items: OrderItemDto[]
}
