import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseProvider, DataSourceProvider} from './database.provider';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {DataSource} from 'typeorm';

// TODO different databases in configuration->get it in databaseProvider getDataSource()-> useFactory
@Module({
    imports: [TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => (
            config.get('database')
        ),
    })],
    providers: [],
})
export class DatabaseModule {
}