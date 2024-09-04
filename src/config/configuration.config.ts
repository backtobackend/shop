import {dataSourceConfig} from '../database/datasource.config';

export default () => ({
    database: {
        type: 'postgres',
        host: 'localhost',
        port: 35432,
        username: 'postgres',
        password: '796163',
        database: 'shop',
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
        // autoLoadEntities: true,
        // synchronize: true,
        migrationsTableName: 'migrations'
    }
})