import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {Order} from './order.entity';
import {Product} from '../../product/entities/product.entity';

@Entity('order_items')
export class OrderItem {
    @PrimaryColumn()
    orderId: number
    @PrimaryColumn()
    productId: number
    @Column({type: 'int', nullable: false})
    quantity: number;
    @Column({type: 'decimal', nullable: false, scale: 2, precision: 6})
    price: number

    @ManyToOne(() => Order, (order) => order.items)
    @JoinColumn({name: 'order_id'})
    order: Order

    @ManyToOne(() => Product, (product) => product.items)
    @JoinColumn({name: 'product_id'})
    product: Product
}