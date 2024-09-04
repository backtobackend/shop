import {ConfigService, registerAs} from '@nestjs/config';
import {config as dotenvConfig} from 'dotenv';
import {DataSource, DataSourceOptions} from 'typeorm';

const configService = new ConfigService()

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 35432,
    username: `postgres`,
    password: `796163`,
    database: `shop`,
    entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    // autoLoadEntities: true,
    // synchronize: false,
})