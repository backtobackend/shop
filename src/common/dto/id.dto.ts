import {IsNotEmpty, IsUUID} from 'class-validator';

export class IdDTO {
    @IsUUID()
    @IsNotEmpty()
    id: string
}