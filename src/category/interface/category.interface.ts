import {IBaseCrud} from '../../interfaces/base-crud.interface';
import {CreateCategoryDto} from '../dto/create-category.dto';
import {ResponseCategoryDto} from '../dto/response-category.dto';

export interface ICategoryCrud extends IBaseCrud<CreateCategoryDto, ResponseCategoryDto> {
}