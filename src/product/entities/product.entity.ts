import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RegistryDates} from '../../common/embedded/registry-dates.embedded';
import {Category} from '../../category/entities/category.entity';
import {OrderItem} from '../../orders/entities/order-item.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid', {name: 'product_id'})
    id: string
    @Column({type: 'varchar', length: 100, unique: true})
    name: string
    @Column({type: 'varchar', length: 300, nullable: true})
    description?: string;
    @Column({type: 'decimal', precision: 6, scale: 2})
    price: number;
    @Column(() => RegistryDates, {prefix: false})
    registryDates: RegistryDates
    @Column({type: 'uuid', nullable: true})
    categoryId: string

    @ManyToMany(() => Category, (category) => category.products, {eager: true})
    @JoinTable({
        name: 'product_category',
        joinColumn: {name: 'product_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'category_id', referencedColumnName: 'id'},
    })
    categories: Category[]

    @OneToMany(() => OrderItem, (item) => item.product)
    items: OrderItem[]

    get orders() {
        return this.items.map(item => item.order);
    }

    constructor(entity: Partial<Product>) {
        Object.assign(this, entity)
    }
}
