import {IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description?: string;
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: number
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;
}
