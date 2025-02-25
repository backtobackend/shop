import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {ICategoryCrud} from './interface/category.interface';
import {ResponseCategoryDto} from './dto/response-category.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from './entities/category.entity';
import {Repository} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {DEFAULT_PAGE_SIZE} from '../querying/util/querying.constant';
import {PaginationService} from '../querying/pagination.service';

@Injectable()
export class CategoryService implements ICategoryCrud {
    constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>, private paginationService: PaginationService) {
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        const newCategory = await this.categoryRepo.createQueryBuilder().insert().into(Category).values(createCategoryDto).execute();
        if (!newCategory) throw new BadRequestException('Category was not created');
        return plainToInstance(ResponseCategoryDto, newCategory);
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseCategoryDto[]> {
        const {limit = DEFAULT_PAGE_SIZE.PRODUCT, page} = paginationDto
        const offset = this.paginationService.calculateOffset(page, limit);
        const categories = await this.categoryRepo.createQueryBuilder('category').skip(offset).limit(limit).getMany()
        return plainToInstance(ResponseCategoryDto, categories)
    }

    async findOne(id: string): Promise<ResponseCategoryDto> {
        const category = await this.categoryRepo.createQueryBuilder('category').where('category.id = :id ', {id}).getOne()
        return plainToInstance(ResponseCategoryDto, category)
    }

    async update(id: string, updateDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
        const category = await this.categoryRepo.createQueryBuilder('category').where('category.id = :id', {id}).getOne()
        if (!category) throw new NotFoundException('Category was not found');
        const updated = await this.categoryRepo.createQueryBuilder().update(Category).set(updateDto).where('id = :id', {id}).execute()
        if (updated.affected < 1) throw new BadRequestException('Category was not updated');
        return plainToInstance(ResponseCategoryDto, category)
    }

    async remove(id: string): Promise<string> {
        const category = await this.categoryRepo.createQueryBuilder('category').where('category.id = :id', {id}).getOne()
        if (!category) throw new NotFoundException('Category was not found');
        const deleted = await this.categoryRepo.createQueryBuilder().delete().from(Category).where('id = :id', {id}).execute()
        if (deleted.affected < 1) throw new BadRequestException('Category was not deleted');
        return `category ${category.id} was deleted`;
    }
}
