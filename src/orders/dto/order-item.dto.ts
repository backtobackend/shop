import {IdDTO} from '../../common/dto/id.dto';
import {IsNotEmpty, IsNumber, IsUUID} from 'class-validator';

export class OrderItemDto {
    @IsUUID()
    @IsNotEmpty()
    readonly product: IdDTO
    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number;
}