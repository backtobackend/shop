import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseProvider, DataSourceProvider} from './database.provider';

// TODO different databases in configuration->get it in databaseProvider getDataSource()-> useFactory
@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '796163',
        database: 'shop',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
    })],
    providers: [],
})
export class DatabaseModule {
}