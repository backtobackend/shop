import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {Repository} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {ResponseProductDto} from './dto/response-product.dto';
import {IProductCrud} from './interface/product.interface';
import {PaginationDto} from '../common/dto/pagination.dto';
import {CategoryService} from '../category/category.service';

@Injectable()
export class ProductService implements IProductCrud {
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>, private categoryService: CategoryService) {
    }

    async create(createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        const category = await this.categoryService.findOne(createProductDto.categoryId);
        if (!category) throw new NotFoundException('Category not found');
        createProductDto['categories'] = [category]
        console.log('=>(product.service.ts:21) createProductDto', createProductDto);
        const product = await this.productRepo.createQueryBuilder().insert().into(Product).values(createProductDto).execute();
        if (!product) throw new BadRequestException('Category was not created');
        return plainToInstance(ResponseProductDto, product);
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseProductDto[]> {
        return
    }

    async findOne(id: string): Promise<ResponseProductDto> {
        // const product = await this.productRepo.createQueryBuilder('product').where('product.id = :id', {id}).getOne()
        const product = await this.productRepo.findOne({where: {id}, relations: {categories: true}});
        console.log('=>(product.service.ts:30) product', product);
        return plainToInstance(ResponseProductDto, product);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ResponseProductDto> {
        return
    }

    async remove(id: string): Promise<string> {
        return
    }
}
