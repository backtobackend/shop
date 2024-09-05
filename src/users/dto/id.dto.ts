import {IsIn, IsInt, IsPositive, IsUUID} from 'class-validator';
import {Type} from 'class-transformer';

export class IdDTO {
    @IsUUID()
    id: string
}