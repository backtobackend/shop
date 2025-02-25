import {IBaseCrud} from '../../interfaces/base-crud.interface';
import {CreateProductDto} from '../dto/create-product.dto';
import {ResponseProductDto} from '../dto/response-product.dto';
import {PaginationDto} from '../../querying/dto/pagination.dto';
import {ReturnProductsWithCount} from './ReturnProductsWithCount.interface';

export interface IProductCrud extends IBaseCrud<CreateProductDto, ResponseProductDto> {
    findAll(paginationDto: PaginationDto): Promise<any>;
}