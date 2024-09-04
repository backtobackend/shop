import {HttpException, Injectable, ServiceUnavailableException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {IUserCrud} from './interface/user-crud.interface';
import {ResponseUserDto} from './dto/response-user.dto';
import {plainToInstance} from 'class-transformer';
import {PatchUserDto} from './dto/patch-user.dto';

@Injectable()
export class UsersService implements IUserCrud {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
    }

    async create(createDto: CreateUserDto): Promise<ResponseUserDto> {
        const newUser = await this.usersRepository.createQueryBuilder().insert().into(User).values(createDto).execute()
        if (newUser.identifiers.length < 1) throw new ServiceUnavailableException('User creation failed');
        return plainToInstance(ResponseUserDto, {id: newUser.identifiers[0].id, ...createDto});
    }

    async delete(deleteDto: CreateUserDto): Promise<string> {
        return ''
    }

    async patch(updateDto: PatchUserDto): Promise<string> {
        return ''
    }
}
