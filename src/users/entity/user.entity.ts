import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RegistryDates} from '../../common/embedded/registry-dates.embedded';
import {Order} from '../../orders/entities/order.entity';
import {Role} from '../../auth/roles/role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
    id: string
    @Column({type: 'varchar', length: 50})
    name: string
    @Column({type: 'varchar', length: 50, unique: true})
    email: string
    @Column({type: 'varchar'})
    password: string
    @Column({type: 'varchar', length: 10, nullable: true})
    phone: string
    //map from embedded types to primitives
    @Column((type) => RegistryDates, {prefix: false})
    registryDates: RegistryDates
    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role

    @OneToMany(() => Order, (order) => order.user, {cascade: ['soft-remove', 'recover']})
    orders: Order[];

    get isDeleted() {
        return !!this.registryDates.deletedAt
    }
}