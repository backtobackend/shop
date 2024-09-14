import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {HashService} from '../auth/hash/hash.service';
import {AuthModule} from '../auth/auth.module';
import {UsersSubscriber} from './subscribers/users.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService, UsersSubscriber],
})
export class UsersModule {
}
