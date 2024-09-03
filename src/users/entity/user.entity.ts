import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {RegistryDates} from '../../common/embedded/registry-dates.embedded';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
    id: string
    @Column({type: 'varchar', length: 50})
    name: string
    @Column({type: 'varchar', length: 50})
    email: string
    @Column({type: 'varchar', length: 50})
    password: string
    @Column({type: 'varchar', length: 50})
    phone: string
    //map from embedded types to primitives
    @Column((type) => RegistryDates, {prefix: false})
    registryDates: RegistryDates
}