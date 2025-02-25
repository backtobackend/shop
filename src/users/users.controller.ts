import {
    Body, ConflictException,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {IdDTO} from '../common/dto/id.dto';
import {ResponseUserDto} from './dto/response-user.dto';
import {PatchUserDto} from './dto/patch-user.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {SoftDeleteDto} from '../common/dto/soft-delete.dto';
import {Public} from '../auth/decorators/is-public.decorator';
import {User} from '../auth/decorators/user.decorator';
import {IUserRequest} from '../auth/interface/user-request.interface';
import {LoginDto} from '../auth/dto/login.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Public()
    @Post()
    async create(@Body() createDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.usersService.create(createDto)
    }

    @Public()
    @Patch('recover')
    recover(@Body() loginDto: LoginDto): Promise<ResponseUserDto> {
        return this.usersService.recover(loginDto)
    }

    @Patch(':id')
    async patch(@Param() {id}: IdDTO, @Body() updateDto: PatchUserDto, @User() user: ResponseUserDto): Promise<ResponseUserDto> {
        return this.usersService.update(id, updateDto, user)
    }

    @Delete(':id')
    async delete(@Param() {id}: IdDTO, @Query() {soft}: SoftDeleteDto, @User() user: ResponseUserDto): Promise<string> {
        return this.usersService.remove(id, soft, user)
    }

    @Get('all')
    async getAll(@Query() paginationDto: PaginationDto): Promise<ResponseUserDto[]> {
        return this.usersService.findAll(paginationDto)
    }

    @Get(':id')
    async get(@Param() {id}: IdDTO): Promise<ResponseUserDto> {
        return this.usersService.findOne(id)
    }
}
