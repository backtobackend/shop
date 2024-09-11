import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './order.entity';
import {Product} from '../../product/entities/product.entity';
import {Expose} from 'class-transformer';
import {RegistryDates} from '../../common/embedded/registry-dates.embedded';

@Entity('order_items')
export class OrderItem {
    @PrimaryColumn()
    orderId: string
    @PrimaryColumn()
    productId: string
    @Column({type: 'int', nullable: false})
    quantity: number;
    @Column({type: 'decimal', nullable: false, scale: 2, precision: 6})
    price: number

    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE'})
    @JoinColumn()
    order: Order

    @ManyToOne(() => Product, (product) => product.items)
    @JoinColumn()
    product: Product

    @Column(() => RegistryDates)
    registryDates: RegistryDates

    @Expose()
    get subTotal() {
        return this.price * this.quantity;
    }
}