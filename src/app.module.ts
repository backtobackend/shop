import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {GlobalModule} from './common/global.module';
import {DatabaseModule} from './database/database.module';

@Module({
    imports: [GlobalModule, DatabaseModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
