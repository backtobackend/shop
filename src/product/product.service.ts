import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {DeleteResult, ILike, Repository, UpdateResult} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {ResponseProductDto} from './dto/response-product.dto';
import {CategoryService} from '../category/category.service';
import {FseService} from '../files/storage/fse.service';
import {FilePath} from '../files/constants/file.constant';
import {join} from 'node:path';
import {BASE_UPLOAD_PATH} from '../files/util/files.constant';
import {ReturnProductsWithCount} from './interface/ReturnProductsWithCount.interface';
import {IProductCrud} from './interface/product.interface';
import {DEFAULT_PAGE_SIZE} from '../querying/util/querying.constant';
import {PaginationService} from '../querying/pagination.service';
import {ProductQueryDto} from './dto/querying/product-query.dto';
import {FilteringService} from '../querying/filtering.service';

@Injectable()
export class ProductService implements IProductCrud {
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>, private categoryService: CategoryService,
                private fseService: FseService, private paginationService: PaginationService,
                private filteringService: FilteringService) {
    }

    async create(createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        const product = this.productRepo.create({
            ...createProductDto,
            categories: createProductDto.categoryIds.map(categoryId => ({id: categoryId}))
        });
        const newProduct = await this.productRepo.save(product);
        if (!newProduct) throw new BadRequestException('Category was not created');
        return plainToInstance(ResponseProductDto, newProduct);
    }

    async findAll(productQuery: ProductQueryDto): Promise<ReturnProductsWithCount> {
        const {limit = DEFAULT_PAGE_SIZE.PRODUCT, page} = productQuery
        const offset = this.paginationService.calculateOffset(page, limit);
        const products = await this.productRepo.findAndCount({
            where: {
                name: this.filteringService.contain(productQuery.name),
                price: this.filteringService.compare(productQuery.price),
                categoryId: productQuery.categoryId,
            },
            order: {[productQuery.sort]: productQuery.order},
            take: limit,
            skip: offset
        });
        const meta = this.paginationService.createMeta(limit, page, products[1])
        return {products: plainToInstance(ResponseProductDto, products[0]), meta}
    }

    async findOne(id: string): Promise<ResponseProductDto> {
        const product = await this.productRepo.findOneOrFail({where: {id}});
        return plainToInstance(ResponseProductDto, product);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ResponseProductDto> {
        return
    }

    // TODO delete product
    async remove(id: string, soft?: boolean): Promise<string> {
        const product = await this.productRepo.findOneBy({id});
        let deleted: UpdateResult | DeleteResult
        soft ? deleted = await this.productRepo.softDelete({id}) : deleted = await this.productRepo.delete({id});
        if (deleted.affected < 1) throw new InternalServerErrorException('Product was not deleted');
        if (!soft) {
            const pathTo = join(FilePath.PRODUCT.BASE, id)
            await this.fseService.delete(pathTo)
        }
        return `product ${id} was deleted`
    }

    async uploadFiles(id: string, files: Express.Multer.File[]): Promise<void> {
        await this.findOne(id)
        const pathTo = join(FilePath.PRODUCT.BASE, id, FilePath.PRODUCT.IMAGE)
        await this.fseService.validatePath(pathTo)
        const dirFilesCount = await this.fseService.getDirFileCount(join(BASE_UPLOAD_PATH, pathTo))
        this.fseService.validateMaxFilesCount(files.length, dirFilesCount)
        const fullPath = join(BASE_UPLOAD_PATH, pathTo)
        await this.upload(fullPath, files)
    }

    async upload(fullPath: string, files: Express.Multer.File[]): Promise<void> {
        await Promise.all(
            files.map(async (file) => {
                await this.fseService.saveFile(fullPath, file)
            }))
    }

    async downloadFile(id: string, filename: string) {
        return this.fseService.getFile(filename)
    }

    async getDirFileNames(pathTo: string): Promise<string[]> {
        return this.fseService.getDirFileNames(pathTo)
    }

    async deleteFile(id: string, filename: string) {
        const pathTo = join(FilePath.PRODUCT.BASE, id, FilePath.PRODUCT.IMAGE, filename)
        return this.fseService.delete(pathTo)
    }
}
