import {User} from '../users/entity/user.entity';

export const dataSourceConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '796163',
    database: 'shop',
    entities: [User],
    synchronize: true,
}
