import {IBaseCrud} from '../../interfaces/base-crud.interface';
import {CreateProductDto} from '../dto/create-product.dto';
import {ResponseProductDto} from '../dto/response-product.dto';

export interface IProductCrud extends IBaseCrud<CreateProductDto, ResponseProductDto> {
}