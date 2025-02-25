import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {OrderStatus} from '../enums/order-status.enum';
import {RegistryDates} from '../../common/embedded/registry-dates.embedded';
import {User} from '../../users/entity/user.entity';
import {Payment} from '../../payment/entity/payment.entity';
import {OrderItem} from './order-item.entity';
import {Expose} from 'class-transformer';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid', {name: 'order_id'})
    id: string
    @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.AWAITING_PAYMENT})
    status: OrderStatus
    @Column((type) => RegistryDates, {prefix: false})
    registryDates: RegistryDates;

    @ManyToOne(() => User, user => user.orders, {eager: true})
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToOne(() => Payment, payment => payment.order, {cascade: true})
    payment: Payment

    @OneToMany(() => OrderItem, (item) => item.order, {eager: true})
    items: OrderItem[]

    @Expose()
    get total() {
        return this?.items.reduce((acc, item) => acc + item.subTotal, 0);
    }
}
