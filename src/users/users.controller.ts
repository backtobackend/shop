import {Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {IdDTO} from '../common/dto/id.dto';
import {ResponseUserDto} from './dto/response-user.dto';
import {PatchUserDto} from './dto/patch-user.dto';
import {PaginationDto} from '../common/dto/pagination.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async create(@Body() createDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.usersService.create(createDto)
    }

    @Patch(':id')
    async patch(@Param() {id}: IdDTO, @Body() updateDto: PatchUserDto): Promise<ResponseUserDto> {
        return this.usersService.update(id, updateDto)
    }

    @Delete(':id')
    async delete(@Param() {id}: IdDTO): Promise<string> {
        return this.usersService.remove(id)
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
