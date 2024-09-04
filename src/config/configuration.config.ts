import * as process from 'node:process';
import 'dotenv/config'

export default () => ({
    database: {
        type: process.env.POSTGRESQL_TYPE,
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        username: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DATABASE,
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
        // autoLoadEntities: true,
        // synchronize: true,
        migrationsTableName: 'migrations'
    }
})