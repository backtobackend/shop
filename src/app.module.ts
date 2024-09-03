import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {GlobalModule} from './common/global.module';

@Module({
    imports: [GlobalModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
