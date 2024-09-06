import {IBaseCrud} from '../../interfaces/base-crud.interface';
import {CreateOrderDto} from '../dto/create-order.dto';
import {ResponseOrderDto} from '../dto/response-order.dto';

export interface IOrderCrud extends IBaseCrud<CreateOrderDto, ResponseOrderDto> {
}