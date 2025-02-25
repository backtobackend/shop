import {DataSource} from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 35432,
    username: 'postgres',
    password: '796163',
    database: 'shop',
    entities: ['dist/domain/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
})