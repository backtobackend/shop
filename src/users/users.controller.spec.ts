import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {
    createMockInstance,
    createMockRepository,
    genCreateUserDto,
    genUser,
    genUUID,
    MockClass
} from '../testing/util/testing.util';

describe('UsersController', () => {
    let controller: UsersController;
    let service: MockClass<typeof UsersService>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [{provide: UsersService, useValue: createMockInstance(UsersService)}],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<MockClass<typeof UsersService>>(UsersService)
    });

    describe('create', () => {
        it('should be defined', () => {
            expect(controller).toBeDefined();
        });
        it('should create new user', async () => {
            const id = genUUID()
            const createDto = genCreateUserDto()
            const user = genUser(id, createDto)
            delete user.password
            service.create.mockResolvedValueOnce(user)
            const res = await service.create(createDto)
            expect(res).toEqual(user)
        })
    })
});
