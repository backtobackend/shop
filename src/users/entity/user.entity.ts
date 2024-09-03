import {Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Column} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string
    @Column({type: 'varchar', length: 50})
    name: string
    @Column({type: 'varchar', length: 50})
    email: string
    @Column({type: 'varchar', length: 50})
    password: string
    @Column({type: 'varchar', length: 50})
    phone: string
}