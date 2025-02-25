import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {BadRequestException, ConflictException, NotFoundException} from '@nestjs/common';
import {
    createMockRepository,
    genArrayOfUsers,
    genCreateUserDto,
    genUser, genUUID,
    MockRepository
} from '../testing/util/testing.util';
import {HashService} from '../auth/hash/hash.service';
import {PaginationService} from '../querying/pagination.service';
import {PaginationDto} from '../querying/dto/pagination.dto';
import spyOn = jest.spyOn;

describe('UsersService', () => {
    let service: UsersService;
    let repository: MockRepository

    const id = '45c54e87-27cd-442a-be62-057c212c31c1'

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, {
                provide: getRepositoryToken(User),
                // useValue: {
                //     createQueryBuilder: jest.fn().mockReturnValue({
                //         insert: jest.fn().mockReturnValue({
                //             into: jest.fn().mockReturnValue({
                //                 values: jest.fn().mockReturnValue({
                //                     execute: jest.fn().mockResolvedValue(dtos.userResponseDto)
                //                 })
                //             }),
                //         }),
                //     }),
                // },
                useValue: createMockRepository()
            }, {
                provide: HashService,
                useValue: createMockRepository()
            }, {
                provide: PaginationService,
                useValue: createMockRepository()
            }],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<MockRepository>(getRepositoryToken(User))
    });

    describe('findOne', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
        it('should return the user', async () => {
            const createDto = genCreateUserDto()
            const response = genUser('45c54e87-27cd-442a-be62-057c212c31c1', createDto)
            delete response.password
            repository.findOneByOrFail.mockResolvedValueOnce(response)
            const user = await service.findOne(id)
            expect(user).toEqual(response)
        })
    })

    describe('findAll', () => {
        const paginationDto: PaginationDto = {limit: 3, page: 1}

        it('should return array of users', async () => {
            let usersArr = genArrayOfUsers(3)
            usersArr = usersArr.map(user => {
                delete user.password
                return user
            })
            repository.find.mockResolvedValueOnce(usersArr)
            const users = await service.findAll(paginationDto)
            expect(users).toEqual(usersArr)
        })
    })

    describe('remove', () => {
        it('should delete user', async () => {
            const id = genUUID()
            const createDto = genCreateUserDto()
            const user = genUser(id, createDto)
            jest.spyOn(service, 'findOne').mockResolvedValueOnce(user)
            repository.softDelete.mockResolvedValueOnce({raw: [], affected: 1, generatedMaps: []})
            const deleted = await service.remove(id, true, user)
            expect(deleted).toEqual(`user ${id} was deleted`)
        })
        it('should throw NOT FOUND', async () => {
            const id = genUUID()
            const exception = new NotFoundException('Not Found')
            jest.spyOn(service, 'findOne').mockRejectedValueOnce(exception)
            let error: Error
            try {
                await service.remove(id)
            } catch (err) {
                error = err
            }
            expect(error).toEqual(exception)
        })
    })

    describe('create', () => {
        it('should create new user', async () => {
            const createDto = genCreateUserDto()
            const response = genUser('45c54e87-27cd-442a-be62-057c212c31c1', createDto)
            delete response.password
            repository.save.mockResolvedValueOnce(response)
            const user = await service.create(createDto)
            expect(user).toEqual(response)
        })
        it('should throw user was not created ', async () => {
            const createDto = genCreateUserDto()
            const exception = new ConflictException('user was not created')
            repository.create.mockResolvedValueOnce(createDto)
            repository.save.mockRejectedValueOnce(exception)
            let error: Error
            try {
                await service.create(createDto)
            } catch (err) {
                error = err
            }
            expect(error).toBe(exception)
        })
    })
});


