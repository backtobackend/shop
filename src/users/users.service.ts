import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {IUserCrud} from './interface/user-crud.interface';
import {ResponseUserDto} from './dto/response-user.dto';
import {plainToInstance} from 'class-transformer';
import {PatchUserDto} from './dto/patch-user.dto';
import {PaginationDto} from './dto/pagination.dto';
import {DEFAULT_PAGE_SIZE} from '../common/utils/global.constants';

@Injectable()
export class UsersService implements IUserCrud {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
    }

    async create(createDto: CreateUserDto): Promise<ResponseUserDto> {
        const newUser = await this.usersRepository.createQueryBuilder().insert().into(User).values(createDto).execute()
        if (newUser.identifiers.length < 1) throw new NotFoundException('User creation failed');
        return plainToInstance(ResponseUserDto, {id: newUser.identifiers[0].id, ...createDto});
    }

    async remove(id: string): Promise<string> {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User does not exist');
        const deleted = await this.usersRepository.createQueryBuilder().delete().from(User).where('id = :id', {id}).execute()
        if (deleted.affected < 1) throw new NotFoundException('User was not deleted');
        return `user ${id} was deleted`
    }


    async update(id: string, updateDto: PatchUserDto): Promise<ResponseUserDto> {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User does not exist');
        const updated = await this.usersRepository.createQueryBuilder().update(User).set(updateDto).where('id = :id', {id}).execute()
        if (updated.affected < 1) throw new BadRequestException('User was not updated');
        return plainToInstance(ResponseUserDto, updateDto)
    }

    async findOne(id: string): Promise<ResponseUserDto> {
        const user = await this.usersRepository.createQueryBuilder('users').where('users.id = :id', {id}).getOne()
        return plainToInstance(ResponseUserDto, user)
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseUserDto[]> {
        const {offset, limit = DEFAULT_PAGE_SIZE.USER} = paginationDto
        const users = await this.usersRepository.createQueryBuilder('users').skip(offset).limit(limit).getMany()
        return plainToInstance(ResponseUserDto, users)
    }
}
