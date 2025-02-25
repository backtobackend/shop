import {IsOptional, IsString} from 'class-validator';
import {OrderByType} from '../util/querying.constant';

export class OrderDto {
    @IsOptional()
    @IsString()
    order: OrderByType = 'ASC'
}