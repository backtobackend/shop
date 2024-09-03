import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {IdDTO} from './dto/id.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async create(@Body() createDto: CreateUserDto): Promise<CreateUserDto> {
        return createDto
    }

    @Get('/:id')
    async get(@Param() {id}: IdDTO): Promise<number> {
        return id
    }
}
