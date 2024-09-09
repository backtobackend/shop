import {
    ArrayNotEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {IdDTO} from '../../common/dto/id.dto';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    price: number
    @IsUUID()
    categoryId: string
}
