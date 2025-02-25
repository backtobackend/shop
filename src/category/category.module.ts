import {Module} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryController} from './category.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Category} from './entities/category.entity';
import {QueryingModule} from '../querying/querying.module';

@Module({
    imports: [TypeOrmModule.forFeature([Category]), QueryingModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [],
})
export class CategoryModule {
}
