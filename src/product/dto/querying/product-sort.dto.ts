import {ProductFilterDto} from './product-filter.dto';
import {IsOptional, IsString} from 'class-validator';

type SortByType = 'name' | 'price'

export class ProductSortDto extends ProductFilterDto {
    @IsOptional()
    @IsString()
    readonly sort?: SortByType = 'name'
}