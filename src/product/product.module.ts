import {Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductController} from './product.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {CategoryService} from '../category/category.service';
import {Category} from '../category/entities/category.entity';
import {FilesModule} from '../files/files.module';
import {ProductSubscriber} from './subscribers/product.subscriber';
import {QueryingModule} from '../querying/querying.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category]), ProductModule, FilesModule, QueryingModule],
    controllers: [ProductController],
    providers: [ProductService, CategoryService, ProductSubscriber],
    exports: [ProductService],
})
export class ProductModule {
}
