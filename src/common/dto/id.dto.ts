import {IsIn, IsInt, IsNotEmpty, IsPositive, IsUUID} from 'class-validator';
import {Type} from 'class-transformer';

export class IdDTO {
    @IsUUID()
    @IsNotEmpty()
    id: string
}