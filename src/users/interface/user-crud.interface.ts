import {IBaseCrud} from '../../interfaces/base-crud.interface';
import {CreateUserDto} from '../dto/create-user.dto';
import {ResponseUserDto} from '../dto/response-user.dto';
import {User} from '../entity/user.entity';
import {LoginDto} from '../../auth/dto/login.dto';

export interface IUserCrud extends IBaseCrud<CreateUserDto, ResponseUserDto> {
    recover(loginDto: LoginDto): Promise<ResponseUserDto>

    update(id: string, updateDto: any, user?: ResponseUserDto): Promise<ResponseUserDto>;

    remove(id: string, soft?: boolean, users?: ResponseUserDto,): Promise<string>;
}