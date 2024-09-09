import {Exclude, Expose} from 'class-transformer';
import {Category} from '../../category/entities/category.entity';

@Exclude()
export class ResponseProductDto {
    @Expose()
    id: string
    @Expose()
    name: string
    @Expose()
    description: string
    @Expose()
    price: number
    @Expose()
    category: Category
}