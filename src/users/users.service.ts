import {
    BadRequestException, ConflictException, ForbiddenException,
    Injectable,
    NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {IUserCrud} from './interface/user-crud.interface';
import {ResponseUserDto} from './dto/response-user.dto';
import {plainToInstance} from 'class-transformer';
import {PatchUserDto} from './dto/patch-user.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {Role} from '../auth/roles/role.enum';
import {compareId} from '../auth/utils/compare-id.util';
import {LoginDto} from '../auth/dto/login.dto';
import {HashService} from '../auth/hash/hash.service';
import {DEFAULT_PAGE_SIZE} from '../querying/util/querying.constant';
import {PaginationService} from '../querying/pagination.service';

@Injectable()
export class UsersService implements IUserCrud {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
                private readonly hashService: HashService, private paginationService: PaginationService) {
    }

    async create(createDto: CreateUserDto): Promise<ResponseUserDto> {
        // const newUser = await this.usersRepository.createQueryBuilder().insert().into(User).values(createDto).execute()
        // console.log('=>(users.service.ts:30) newUser', newUser);
        // if (newUser.identifiers.length < 1) throw new NotFoundException('User creation failed');
        const user = this.usersRepository.create(createDto);
        const newUser = await this.usersRepository.save(user);
        // if(!newUser) throw new NotFoundException();
        return plainToInstance(ResponseUserDto, newUser);
    }

    async remove(id: string, soft?: boolean, users?: ResponseUserDto): Promise<string> {
        const user = await this.findOne(id)
        // if (users.role !== Role.ADMIN) {
        //     compareId(id, users.id)
        //     if (!soft) throw new ForbiddenException('Forbidden resource');
        // }
        let deleted: any
        soft ?
            deleted = deleted = await this.usersRepository.softDelete({id: id}) :
            // deleted = await this.usersRepository.createQueryBuilder().delete().from(User).where('id = :id', {id}).execute()
            deleted = await this.usersRepository.delete({id})
        if (deleted.affected < 1) throw new NotFoundException('User was not deleted');
        return `user ${id} was deleted`
    }

    async update(id: string, updateDto: PatchUserDto, users: ResponseUserDto): Promise<ResponseUserDto> {
        const user = await this.usersRepository.preload({id, ...updateDto})
        // if (users.role !== Role.ADMIN) {
        //     compareId(id, users.id)
        // }
        if (!user) throw new BadRequestException('User was not updated');
        await this.usersRepository.save(user);
        return plainToInstance(ResponseUserDto, user)
    }

    async findOne(id: string): Promise<ResponseUserDto> {
        // const user = await this.usersRepository.createQueryBuilder('users').leftJoinAndSelect('users.orders', 'orders').leftJoinAndSelect('orders.items', 'items').where('users.id = :id', {id}).getOne()
        const user = await this.usersRepository.findOneByOrFail({id})
        // if (!user) throw new NotFoundException('User was not found');
        return plainToInstance(ResponseUserDto, user)
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseUserDto[]> {
        const {limit = DEFAULT_PAGE_SIZE.PRODUCT, page} = paginationDto
        const offset = this.paginationService.calculateOffset(page, limit);
        // const users = await this.usersRepository.createQueryBuilder('users').skip(offset).limit(limit).getMany()
        const users = await this.usersRepository.find({skip: offset, take: limit})
        return plainToInstance(ResponseUserDto, users)
    }

    async recover(loginDto: LoginDto): Promise<ResponseUserDto> {
        const {email, password} = loginDto
        const user = await this.usersRepository.findOne({
            where: {email},
            relations: {orders: {items: true, payment: true}},
            withDeleted: true
        })
        if (!user || !await this.hashService.compare(password, user.password)) throw new UnauthorizedException('Invalid email or password');
        if (!user.isDeleted) throw new ConflictException('user not deleted')
        const recovered = await this.usersRepository.recover(user)
        return plainToInstance(ResponseUserDto, recovered)
    }
}
