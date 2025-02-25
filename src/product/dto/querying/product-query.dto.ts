import {IntersectionType} from '@nestjs/swagger';
import {ProductFilterDto} from './product-filter.dto';
import {ProductSortDto} from './product-sort.dto';
import {PaginationDto} from '../../../querying/dto/pagination.dto';
import {OrderDto} from '../../../querying/dto/order.dto';

export class ProductQueryDto extends IntersectionType(ProductFilterDto, OrderDto, ProductSortDto, PaginationDto) {
}