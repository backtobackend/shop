import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {RegistryDates} from '../../common/embedded/registry-dates.embedded';
import {Order} from '../../orders/entities/order.entity';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid', {name: 'payment_id'})
    id: string
    @Column(() => RegistryDates, {prefix: false})
    registryDates: RegistryDates;

    @OneToOne(() => Order, order => order.payment, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'order_id'})
    order: Order
}