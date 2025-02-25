import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {IdDTO} from '../common/dto/id.dto';
import {ResponseCategoryDto} from './dto/response-category.dto';
import {RequireRole} from '../auth/decorators/role.decorator';
import {Role} from '../auth/roles/role.enum';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @RequireRole([Role.MANAGER])
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get('all')
    async findAll(@Query() paginationDto: PaginationDto): Promise<ResponseCategoryDto[]> {
        return this.categoryService.findAll(paginationDto);
    }

    @Get(':id')
    async findOne(@Param() {id}: IdDTO): Promise<ResponseCategoryDto> {
        return this.categoryService.findOne(id);
    }

    @RequireRole([Role.MANAGER])
    @Patch(':id')
    async update(@Param() {id}: IdDTO, @Body() updateDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryService.update(id, updateDto);
    }

    @RequireRole([Role.MANAGER])
    @Delete(':id')
    async remove(@Param() {id}: IdDTO): Promise<string> {
        return this.categoryService.remove(id);
    }
}
