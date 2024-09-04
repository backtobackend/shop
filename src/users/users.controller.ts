import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {IdDTO} from './dto/id.dto';
import {ResponseUserDto} from './dto/response-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async create(@Body() createDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.usersService.create(createDto)
    }

    @Get('/:id')
    async get(@Param() {id}: IdDTO): Promise<number> {
        return id
    }
}
