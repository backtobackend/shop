import {
    BadRequestException, ConflictException,
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
import {PaginationDto} from '../common/dto/pagination.dto';
import {DEFAULT_PAGE_SIZE} from '../common/utils/global.constants';
import {HashService} from '../auth/hash/hash.service';

@Injectable()
export class UsersService implements IUserCrud {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>, private readonly hashService: HashService) {
    }

    async create(createDto: CreateUserDto): Promise<ResponseUserDto> {
        createDto.password = await this.hashService.hash(createDto.password);
        const newUser = await this.usersRepository.createQueryBuilder().insert().into(User).values(createDto).execute()
        if (newUser.identifiers.length < 1) throw new NotFoundException('User creation failed');
        return plainToInstance(ResponseUserDto, {id: newUser.identifiers[0].id, ...createDto});
    }

    async remove(id: string, soft?: boolean): Promise<string> {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User does not exist');
        let deleted: any
        console.log(soft)
        soft ?
            deleted = await this.usersRepository.createQueryBuilder().softDelete().from(User).where('id = :id', {id}).execute() :
            deleted = await this.usersRepository.createQueryBuilder().delete().from(User).where('id = :id', {id}).execute()
        if (deleted.affected < 1) throw new NotFoundException('User was not deleted');
        return `user ${id} was deleted`
    }


    async update(id: string, updateDto: PatchUserDto): Promise<ResponseUserDto> {
        const {password} = updateDto;
        const hashedPassword = password && (await this.hashService.hash(password));
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User does not exist');
        const updated = await this.usersRepository.createQueryBuilder().update(User).set({
            ...updateDto,
            password: hashedPassword
        }).where('id = :id', {id}).execute()
        if (updated.affected < 1) throw new BadRequestException('User was not updated');
        return plainToInstance(ResponseUserDto, updateDto)
    }

    async findOne(id: string, soft?: boolean): Promise<ResponseUserDto> {
        const user = await this.usersRepository.createQueryBuilder('users').leftJoinAndSelect('users.orders', 'orders').leftJoinAndSelect('orders.items', 'items').where('users.id = :id', {id}).getOne()
        // const user = await this.usersRepository.findOne({
        //     where: {id}, relations: {
        //         orders: true
        //     }
        // });
        return plainToInstance(ResponseUserDto, user)
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseUserDto[]> {
        const {offset, limit = DEFAULT_PAGE_SIZE.USER} = paginationDto
        const users = await this.usersRepository.createQueryBuilder('users').skip(offset).limit(limit).getMany()
        return plainToInstance(ResponseUserDto, users)
    }

    async recover(id: string): Promise<ResponseUserDto> {
        const user = await this.usersRepository.findOne({
            where: {id},
            relations: {orders: {items: true, payment: true}},
            withDeleted: true
        })
        if (!user) throw new NotFoundException('User does not exist')
        if (user.isDeleted) throw new ConflictException('user not deleted')
        const recovered = await this.usersRepository.recover(user)
        return plainToInstance(ResponseUserDto, recovered)
    }
}
