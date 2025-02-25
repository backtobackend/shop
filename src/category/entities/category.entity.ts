import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from '../../product/entities/product.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid', {name: 'category_id'})
    id: string;
    @Column({type: 'varchar', length: 50, unique: true})
    name: string;
    @Column({type: 'uuid', name: 'parent_id', nullable: true})
    parentId: string

    @ManyToOne((type) => Category, (category) => category.childCategories, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({name: 'parent_id'})
    parentCategory: Category

    @OneToMany((type) => Category, (category) => category.parentCategory)
    childCategories: Category[]

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[]
}
