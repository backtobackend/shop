import {ResponseProductDto} from '../dto/response-product.dto';
import {PaginationMeta} from '../../querying/interfaces/pagination-meta.interface';

export interface ReturnProductsWithCount {
    products: ResponseProductDto[];
    meta: PaginationMeta
}