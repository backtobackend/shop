import {ClassSerializerInterceptor, Module, NotFoundException, ValidationPipe} from '@nestjs/common';
import {GLOBAL_PIPE_OPTION} from './utils/global.constants';
import {ConfigModule} from '@nestjs/config';
import configurationConfig from '../config/configuration.config';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {AuthRoleGuard} from '../auth/guards/auth-role.guard';
import {NotFoundFilter} from '../database/exeptions/not-found/not-found.filter';
import {QueryFailedFilter} from '../database/exeptions/query-failed/query-failed.filter';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true, load: [configurationConfig], envFilePath: 'shop/.env.dev'})],
    providers: [{provide: 'APP_PIPE', useValue: new ValidationPipe(GLOBAL_PIPE_OPTION)},
        {provide: 'APP_INTERCEPTOR', useClass: ClassSerializerInterceptor},
        {provide: 'APP_GUARD', useClass: JwtAuthGuard},
        {provide: 'APP_GUARD', useClass: AuthRoleGuard},
        {provide: 'APP_FILTER', useClass: NotFoundFilter},
        {provide: 'APP_FILTER', useClass: QueryFailedFilter}
    ],
})
export class GlobalModule {
}