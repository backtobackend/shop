import {dataSourceConfig} from '../database/datasource.config';

export default () => ({
    database: {
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
    }
})