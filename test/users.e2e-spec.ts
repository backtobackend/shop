import {Test, TestingModule} from '@nestjs/testing';
import {HttpServer, HttpStatus, INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';
import {UsersModule} from '../src/users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {Response} from 'express';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configurationConfig from '../src/config/configuration.config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../src/users/entity/user.entity';
import {DatabaseModule} from '@faker-js/faker';
import {NotFoundFilter} from '../src/database/exeptions/not-found/not-found.filter';
import {FilesModule} from '../src/files/files.module';
import {GLOBAL_PIPE_OPTION} from '../src/common/utils/global.constants';

const createDto = {
    'name': 'manager',
    'email': 'manager17@gmail.com',
    'password': '1234ok',
    'phone': 1234567890
}

const updateDto = {
    name: 'updated'
}

describe('Users)', () => {
    let app: INestApplication;
    let res: any
    let response: any
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, JwtModule, ConfigModule.forRoot({
                isGlobal: true,
                load: [configurationConfig],
                envFilePath: 'shop/.env.dev'
            }), TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: async (config: ConfigService) => (
                    config.get('test_database')
                ),
            })],
            providers: [{
                provide: 'APP_FILTER',
                useClass: NotFoundFilter
            }, {
                provide: 'APP_PIPE',
                useValue: new ValidationPipe(GLOBAL_PIPE_OPTION)
            }]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        app.close();
    })

    it('Create [POST /]', async () => {
        response = await request(app.getHttpServer()).post('/users').send(createDto)
        delete createDto.password
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({id: response.body.id, ...createDto, role: 'USER'});
        expect(response.body.id).toBeDefined()
    });
    it('FindAll [GET /]', async () => {
        res = await request(app.getHttpServer()).get('/users/all')
        expect(res.statusCode).toBe(200);
        expect(res.body.length > 1).toBe(true);
    });
    it('FindOne [GET /]', async () => {
        res = await request(app.getHttpServer()).get(`/users/${response.body.id}`)
        expect(res.statusCode).toBe(200);
        expect({...res.body, phone: +res.body.phone}).toEqual({id: response.body.id, ...createDto, role: 'USER'});
    });
    it('Update [PATCH /id]', async () => {
        await request(app.getHttpServer()).patch(`/users/${response.body.id}`).send(updateDto)
        const result = await request(app.getHttpServer()).get(`/users/${response.body.id}`)
        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe('updated');
    });
    it('Remove [DELETE /id]', async () => {
        let result = await request(app.getHttpServer()).get(`/users/${response.body.id}`)
        expect({...res.body, phone: +res.body.phone}).toEqual({id: response.body.id, ...createDto, role: 'USER'});
        await request(app.getHttpServer()).delete(`/users/${response.body.id}`)
        result = await request(app.getHttpServer()).get(`/users/${response.body.id}`)
        expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
});