import {mock, MockProxy} from 'jest-mock-extended';
import {Repository} from 'typeorm';
import {CreateUserDto} from '../../users/dto/create-user.dto';
import {faker} from '@faker-js/faker';
import {User} from '../../users/entity/user.entity';
import {Type} from '@nestjs/common';


export  type MockRepository = MockProxy<Repository<any>>
export const createMockRepository = () => mock<Repository<any>>()
export type MockClass<T extends Type> = MockProxy<InstanceType<T>>
export const createMockInstance = <T extends Type>(Class: T) => mock<typeof Class>()

export const genCreateUserDto = (): CreateUserDto => (
    {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number()
    })

export const genUser = (id: string, createDto: CreateUserDto) => ({
    ...createDto, id, orders: [], role: 'USER'
} as User)

export const genUUID = () => faker.string.uuid()

export const genArrayOfUsers = (count: number) => {
    let users: any[] = []
    for (let i = 0; i < count; i++) {
        const uuid = faker.string.uuid()
        const user = genUser(uuid, genCreateUserDto())
        users.push(user)
    }
    return users
}