import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {PaginationDto} from '../common/dto/pagination.dto';
import {IdDTO} from '../common/dto/id.dto';
import {ResponseProductDto} from './dto/response-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        return this.productService.create(createProductDto);
    }

    @Get('all')
    findAll(@Query() paginationDto: PaginationDto): Promise<ResponseProductDto[]> {
        return this.productService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param() {id}: IdDTO) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    update(@Param() {id}: IdDTO, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param() {id}: IdDTO) {
        return this.productService.remove(id);
    }
}
