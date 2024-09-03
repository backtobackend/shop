import {IsIn, IsInt, IsPositive} from 'class-validator';
import {Type} from 'class-transformer';

export class IdDTO {
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    id: number
}