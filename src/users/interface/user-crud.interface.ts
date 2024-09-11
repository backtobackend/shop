import {IBaseCrud} from '../../interfaces/base-crud.interface';
import {CreateUserDto} from '../dto/create-user.dto';
import {ResponseUserDto} from '../dto/response-user.dto';

export interface IUserCrud extends IBaseCrud<CreateUserDto, ResponseUserDto> {
    recover(id: string): Promise<ResponseUserDto>
}